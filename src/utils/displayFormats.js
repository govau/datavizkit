
import Highcharts from 'highcharts';


export const symbolChars = {
  'circle': 9679,
  'diamond': 9670,
  'triangle': 9652,
  'square': 9632,
  'triangle-down': 9660 };

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
