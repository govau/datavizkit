
// fill patterns available: http://jsfiddle.net/highcharts/gqg618eb/

// fill
const FILL_TYPES = [
  // 'url(#highcharts-default-pattern-0)',  // reserved for null data layer
  // 'url(#highcharts-default-pattern-1)',  // not appropriate
  // 'url(#highcharts-default-pattern-4)',
  // 'url(#highcharts-default-pattern-5)',
  // 'url(#highcharts-default-pattern-2)',
  // 'url(#highcharts-default-pattern-6)',
  // 'url(#highcharts-default-pattern-7)',
  // 'url(#highcharts-default-pattern-3)',
  // 'url(#highcharts-default-pattern-8)',

  'url(#highcharts-high-contrast-pattern-0)',
  'url(#highcharts-high-contrast-pattern-1)',
  'url(#highcharts-high-contrast-pattern-2)',
  'url(#highcharts-high-contrast-pattern-3)',
  'url(#highcharts-high-contrast-pattern-4)',
  'url(#highcharts-high-contrast-pattern-5)',
  'url(#highcharts-high-contrast-pattern-6)',
  'url(#highcharts-high-contrast-pattern-7)',
  'url(#highcharts-high-contrast-pattern-8)',
];
export const applyHighContrastFill = (item, idx) => {
  let patternIdx;
  if (idx <= FILL_TYPES.length) {
    patternIdx = idx;
  } else {
    patternIdx = idx % FILL_TYPES.length;
  }
  item.color = FILL_TYPES[patternIdx];
  return item;
};


// dash style patterns available: http://api.highcharts.com/highcharts/series%3Cline%3E.dashStyle

// dash
const DASH_TYPES = [
  // 'Solid',   // reserved
  'ShortDash',
  'ShortDot',
  'ShortDashDot',
  'ShortDashDotDot',
  'Dot',
  'Dash',
  'LongDash',
  'DashDot',
  'LongDashDot',
  'LongDashDotDot',
];
export const applyHighContrastDash = (item, idx) => {
  let dashIdx;
  if (idx <= DASH_TYPES.length) {
    dashIdx = idx;
  } else {
    dashIdx = idx % DASH_TYPES.length;
  }
  item.dashStyle = DASH_TYPES[dashIdx];
  return item;
};
