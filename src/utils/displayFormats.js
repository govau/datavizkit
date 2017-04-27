export const symbolChars = {
  'circle': 9679,
  'diamond': 9670,
  'triangle': 9652,
  'square': 9632,
  'triangle-down': 9660 };

export const valueFormats = {
  'percentage': function(val) { return `${val}%`; },
  'money': function(val) { return `$${val}`; }
};

export const unitFormats = {
  'money':      { 'symbol': '$', prefix: true },
  'percentage': { 'symbol': '%'}
};