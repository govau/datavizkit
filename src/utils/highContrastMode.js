
// fill patterns available: http://jsfiddle.net/highcharts/gqg618eb/

export const makeHighContrastFill = (fillTypeIdxs = [4,5,2,6,7,3,8]) => {

  const getFillTypes = (typeIdxs) => {
    let _types = [
      'url(#high-contrast-pattern-0)',
      'url(#high-contrast-pattern-1)',
      'url(#high-contrast-pattern-2)',
      'url(#high-contrast-pattern-3)',
      'url(#high-contrast-pattern-4)',
      'url(#high-contrast-pattern-5)',
      'url(#high-contrast-pattern-6)',
      'url(#high-contrast-pattern-7)',
      'url(#high-contrast-pattern-8)',
      'url(#high-contrast-pattern-9)',
    ];
    return typeIdxs.map((typeIdx, idx) => {
      return _types[idx];
    })
  };

  const fillTypes = getFillTypes(fillTypeIdxs);
  const fillNamespace = 'high-contrast-pattern';

  return {
    getOptions: () => {
      return {
        fillTypeIdxs: fillTypeIdxs,
        fillNamespace,
      }
    },
    seriesIteratee: (item, idx) => {
      let patternIdx;
      if (idx <= fillTypes.length) {
        patternIdx = idx;
      } else {
        patternIdx = idx % fillTypes.length;
      }

      // toggle color on and off
      // todo - keep record of "lastColor" and flick to that rather than undefined
      if (!item.color) {
        item.color = fillTypes[patternIdx];
      } else {
        item.color = void 0;
      }
      return item;
    }
  }

};


// dash style patterns available: http://api.highcharts.com/highcharts/series%3Cline%3E.dashStyle

export const makeHighContrastDash = () => {
  const dashTypes = [
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
  return {
    seriesIteratee: (item, idx) => {
      let dashIdx;
      if (idx <= dashTypes.length) {
        dashIdx = idx;
      } else {
        dashIdx = idx % dashTypes.length;
      }


      // todo - toggle with solid

      item.dashStyle = dashTypes[dashIdx];
      return item;
    }
  }
};
