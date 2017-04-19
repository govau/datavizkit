
// patterns available: http://jsfiddle.net/highcharts/gqg618eb/


// fill
export const applyHighContrast = (item, idx) => {
  let patternId;
  if (idx <= 8) {
    patternId = idx;
  } else {
    patternId = idx % 8;
  }
  item.color = `url(#highcharts-default-pattern-${patternId})`;
  return item;
};


// dash
const DASH_TYPES = [
  // 'Solid',
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
