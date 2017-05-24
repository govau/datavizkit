
import Highcharts from 'highcharts';


export const symbolChars = {
  'circle': '●',
  'diamond': '◆',
  'triangle': '▴',
  'square': '■',
  'triangle-down': '▾' };

export const symbolSvg = function(symbol) { 

};

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

export const valueWithUnits = (value, units) => {
  let op = value < 0 ? '-' : '+';
  let val = Math.abs(value);

  switch(units) {
  case '$':
    return `${op} $${val}`;
  case '%':
    return `${op} ${val}%`;
  default:
    return `${op} ${val}`;
  }
};
