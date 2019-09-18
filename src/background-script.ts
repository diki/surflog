import Dexie from 'dexie';
import omit from 'lodash/omit';
import {
  sources,
  isRedditHomePage,
  rangeToTime,
  isTwitterHomePage,
  isGithub,
  isYoutubeVideo,
} from 'utils';
import stemmer from 'full-text-search/stemmer';
import initializeFullTextSearch from 'full-text-search';
import {
  STATISTICS_GET_STORAGE,
  STATISTICS_SET_STORAGE,
  STATISTICS_GET_USAGE,
  STATISTICS_SET_USAGE,
  MATCHES_GET,
  MATCHES_SET,
  RECORDS_ADD,
  RECORDS_DOWNLOAD,
  RECORDS_UPLOAD,
  RECORDS_UPLOAD_SUCCESS,
  RECORDS_UPLOAD_ERROR,
  RECORDS_DELETE,
  RECORDS_DELETE_ERROR,
} from 'store/contants';
import { IRecord, IMatch } from '@types';

interface Token {
  id: string;
  word: string;
  ref: string;
  fieldName: 'content' | 'title';
  position: number[];
}

class SurfLogDB extends Dexie {
  records!: Dexie.Table<IRecord, string>;
  // tslint:disable-next-line: variable-name
  _tokens!: Dexie.Table<Token, number>;

  constructor() {
    super('SurfLogDB');
    this.version(1).stores({
      records: 'id, link, title, content, lastVisitedTime, page',
      _tokens: '++, word, ref, fieldName, position',
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.records = this.table('records');
    this._tokens = this.table('_tokens');
  }
}

// create db
const db = new SurfLogDB();

initializeFullTextSearch(db);

/** listen URL changes (from content_script) for reddit, twitter and github
 * and send urlChanage event to content script
 */
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    if (isRedditHomePage(changeInfo.url)) {
      chrome.tabs.sendMessage(tabId, {
        type: 'redditURLChange',
        url: changeInfo.url,
      });
    }
    if (isTwitterHomePage(changeInfo.url)) {
      chrome.tabs.sendMessage(tabId, {
        type: 'twitterURLChange',
        url: changeInfo.url,
      });
    }

    if (isGithub(changeInfo.url)) {
      chrome.tabs.sendMessage(tabId, {
        type: 'githubURLChange',
        url: changeInfo.url,
      });
    }

    if (isYoutubeVideo(changeInfo.url)) {
      chrome.tabs.sendMessage(tabId, {
        type: 'youtubeURLChange',
        url: changeInfo.url,
      });
    }
  }
});

/**
 * messgaes coming from popup
 */
chrome.runtime.onConnect.addListener(async port => {
  port.onMessage.addListener(async msg => {
    const { type } = msg;

    if (type === STATISTICS_GET_STORAGE) {
      const st = await computeStatistics();
      chrome.runtime.sendMessage({
        type: STATISTICS_SET_STORAGE,
        payload: st,
      });
    }

    if (type === MATCHES_GET) {
      const { query, source } = msg;
      const stemmed = stemmer(query);
      const tokens = await db._tokens
        .where('word')
        .equals(stemmed)
        .toArray();
      const matches = normalizeMatches(tokens);
      const matchesWithRecords = await addRecordsToMatches(matches, source);
      chrome.runtime.sendMessage({
        type: MATCHES_SET,
        payload: matchesWithRecords,
      });
    }

    if (type === RECORDS_ADD) {
      const { value } = msg;
      const finalValue = {
        ...value,
        lastVisitedTime: Date.now(),
      };
      const { id } = finalValue;
      const existingRecord = await db.records
        .where('id')
        .equals(id)
        .toArray();

      if (existingRecord.length === 0) {
        await db.records.add(finalValue);
      } else {
        await db.records
          .where('id')
          .equals(id)
          .modify({
            ...omit(finalValue, 'id'),
            content:
              finalValue.content.length < existingRecord[0].content.length
                ? existingRecord[0].content
                : finalValue.content,
            lastVisitedTime: Date.now(),
          });
      }
    }

    if (type === RECORDS_DOWNLOAD) {
      const all = await db.records.toArray();
      chrome.runtime.sendMessage({
        type: 'allRecords',
        result: all,
      });
    }

    if (type === RECORDS_UPLOAD) {
      const { records } = msg;
      try {
        await db.records.bulkPut(records);
        chrome.runtime.sendMessage({
          type: RECORDS_UPLOAD_SUCCESS,
        });
      } catch (e) {
        chrome.runtime.sendMessage({
          type: RECORDS_UPLOAD_ERROR,
        });
      }
    }

    if (type === STATISTICS_GET_USAGE) {
      const sums = await Promise.all(
        Object.keys(sources).map(async source => {
          const count = await db.records
            .where('page')
            .equals(source)
            .count();
          return [source, count];
        }),
      );
      chrome.runtime.sendMessage({
        type: STATISTICS_SET_USAGE,
        payload: sums,
      });
    }

    if (type === RECORDS_DELETE) {
      const { source, range } = msg.payload;
      const time = rangeToTime(range);
      try {
        if (source === 'all') {
          await db.records
            .where('lastVisitedTime')
            .above(time)
            .delete();
        } else {
          await db.records
            .where('lastVisitedTime')
            .above(time)
            .and(item => item.page === source)
            .delete();
        }
      } catch (e) {
        chrome.runtime.sendMessage({
          type: RECORDS_DELETE_ERROR,
        });
      }
    }
  });
});

async function computeStatistics() {
  (await navigator.storage) &&
    navigator.storage.persist &&
    navigator.storage.persist();
  if (navigator.storage && navigator.storage.estimate) {
    const estimation = await navigator.storage.estimate();
    console.log(`Quota: ${estimation.quota}`);
    console.log(`Usage: ${estimation.usage}`);
    const count = await db.records.count();
    console.log(`Count: ${count}`);
    return {
      usage: estimation.usage,
      quota: estimation.quota,
      count,
    };
  } else {
    console.error('StorageManager not found');
  }
}

function normalizeMatches(matches: Token[]) {
  const result: Omit<IMatch, 'record'>[] = [];
  matches.forEach(match => {
    const { ref, fieldName, position }: Token = match;
    const existing = <IMatch>result.find(r => r.ref === ref);
    if (existing === undefined) {
      const newRecord = {
        ref,
        matchData: {
          [fieldName]: {
            position: [position],
          },
        },
      };
      result.push(newRecord);
    } else {
      const existingField = existing.matchData[fieldName];
      if (existingField === undefined) {
        existing.matchData[fieldName] = {
          position: [position],
        };
      } else {
        existing.matchData = {
          ...existing.matchData,
          [fieldName]: {
            position: [...existingField.position, position],
          },
        };
      }
    }
  });
  return result;
}

async function addRecordsToMatches(
  matches: Omit<IMatch, 'record'>[],
  source: string,
) {
  const ids = matches.map(r => r.ref);
  let records = await db.records
    .where('id')
    .anyOf(ids)
    .toArray();
  if (source !== 'all') {
    records = records.filter(r => r.page === source);
  }
  const fullResults = matches
    .map(r => {
      // tslint:disable-next-line: whitespace
      return {
        ...r,
        record: <IRecord>records.find(rec => rec.id === r.ref),
      };
    })
    .filter(r => r.record !== undefined)
    .sort((a, b) => b.record.lastVisitedTime - a.record.lastVisitedTime);

  return fullResults;
}
