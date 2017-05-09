
import Highcharts from 'highcharts';


export const symbolChars = {
  'circle': '●',
  'diamond': '◆',
  'triangle': '▴',
  'square': '■',
  'triangle-down': '▾' };

export const valueFormats = {
  'percentage': val => `${Highcharts.numberFormat(val, 2)}%`,
  'money': function(val) { return `$${val}`; }
};

export const unitFormats = {
  'money':      { 'symbol': '$', prefix: true },
  'percentage': { 'symbol': '%'}
};

export const dateFormats = {
  dateTime: val => new Date(val).toJSON(),
  dayMonthYear: val => Highcharts.dateFormat('%e %b %Y', new Date(val)),
  monthYear: val => Highcharts.dateFormat('%b %Y', new Date(val)),
};
