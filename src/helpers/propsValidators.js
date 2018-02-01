import PropTypes from 'prop-types';

export const validAxisType = PropTypes.oneOf([
  'category',
  'linear',
  'logarithmic',
  'datetime'
]);

export const validChartType = PropTypes.oneOf([
  'area',
  'arearange',
  'areaspline',
  'areasplinerange',
  'bar',
  'boxplot',
  'bubble',
  'candlestick',
  'column',
  'columnrange',
  'errorbar',
  'flags',
  'funnel',
  'line',
  'ohlc',
  'pie',
  'polygon',
  'pyramid',
  'scatter',
  'solidgauge',
  'spline',
  'waterfall'
]);
