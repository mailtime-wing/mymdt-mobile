// ref: https://stackoverflow.com/a/175787/7754670
export default function isNumeric(str) {
  if (typeof str === 'number') {
    return !isNaN(str);
  }

  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}
