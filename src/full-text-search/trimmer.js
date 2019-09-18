export default function(word) {
  return word.replace(/^\W+/, '').replace(/\W+$/, '');
}
