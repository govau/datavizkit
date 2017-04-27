import Highcharts from 'highcharts';

export const symbolChars = {
  'circle': 9679,
  'diamond': 9670,
  'triangle': 9652,
  'square': 9632,
  'triangle-down': 9660 };

export const valueFormats = {
  'percentage': (val) => `${Highcharts.numberFormat(val, 2)}%`,
  'money': function(val) { return `$${val}`; }
};

export const unitFormats = {
  'money':      { 'symbol': '$', prefix: true },
  'percentage': { 'symbol': '%'}
};

export const displayLastUpdated = function(dateStr) {
  var ts = Date.parse(dateStr);

  if (isNaN(ts)) {
    return '';
  }
  else {
    var formattedDate = Highcharts.dateFormat('%e %b %Y', new Date(ts));
    return `<span>Last updated <time dateTime="${dateStr}">${formattedDate}</time></span>`;
  }
}
