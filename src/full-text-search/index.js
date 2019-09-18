import Dexie from 'dexie';
import stemmer from './stemmer';
import tokenizer from './tokenizer';
import trimmer from './trimmer';
import stopWords from './stopWords';

const generateTokens = (str, fieldName, ref) =>
  tokenizer(str)
    .map(s => ({
      ...s,
      word: trimmer(s.word),
    }))
    .filter(s => {
      return stopWords.indexOf(s.word) < 0 && s.word.length >= 3;
    })
    .map(s => ({
      ...s,
      word: stemmer(s.word),
    }))
    .map(s => ({
      word: s.word,
      position: s.metadata.position,
      ref,
      fieldName,
    }));

export default dexieDBInstance => {
  dexieDBInstance._createTransaction = Dexie.override(
    dexieDBInstance._createTransaction,
    function(createTransaction) {
      // Override db._createTransaction() to make sure to add _emailWords table to any transaction being modified
      // If not doing this, error will occur in the hooks unless the application code has included _emailWords in the transaction when modifying emails table.
      return function(mode, storeNames, dbSchema) {
        if (mode === 'readwrite' && storeNames.indexOf('_tokens') == -1) {
          storeNames = storeNames.slice(0); // Clone storeNames before mippling with it.
          storeNames.push('_tokens');
        }
        return createTransaction.call(this, mode, storeNames, dbSchema);
      };
    },
  );

  dexieDBInstance.records.hook('creating', function(primKey, obj, trans) {
    // Must wait till we have the auto-incremented key.
    trans._lock(); // Lock transaction until we got primary key and added all mappings. App code trying to read from _emailWords the line after having added an email must then wait until we are done writing the mappings.
    this.onsuccess = function(primKey) {
      const titleTokens = generateTokens(obj.title, 'title', primKey);
      const contentTokens = generateTokens(obj.content, 'content', primKey);
      const allTokens = [...titleTokens, ...contentTokens];
      allTokens.forEach(function(token) {
        dexieDBInstance._tokens.add(token);
      });
      trans._unlock();
    };
    this.onerror = function() {
      trans._unlock();
    };
  });

  dexieDBInstance.records.hook('updating', function(mods, primKey, obj, trans) {
    if (mods.hasOwnProperty('content') || mods.hasOwnProperty('title')) {
      dexieDBInstance._tokens
        .where('ref')
        .equals(primKey)
        .delete();

      const titleTokens = generateTokens(mods.title, 'title', primKey);
      const contentTokens = generateTokens(mods.content, 'content', primKey);
      const allTokens = [...titleTokens, ...contentTokens];
      allTokens.forEach(function(token) {
        dexieDBInstance._tokens.add(token);
      });
    }
  });

  dexieDBInstance.records.hook('deleting', function(primKey, obj, trans) {
    if (obj.content || obj.title) {
      dexieDBInstance._tokens
        .where('ref')
        .equals(primKey)
        .delete();
    }
  });
};
