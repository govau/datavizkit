
import React from 'react';
import tinycolor from 'tinycolor2';

import getItemOfListFromIncrement from './getItemOfListFromIncrement';


const HIGHCONTRAST_PATTERN_COUNT = 6;
const HIGHCONTRAST_PATTERN_NAMESPACE = 'highcontrast-pattern';

const highcontrastPatterns = [
  ({id, color}) => {
    // lines

    const strokeColor = tinycolor(color).lighten(30).toString();
    return (
      <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
        <rect width="10" height="10" fill={color}></rect>
        <path d="M 0,10 l 10,-10 M -2.5,2.5 l 5,-5 M 7.5,12.5 l 5,-5" strokeWidth="1" shapeRendering="auto" stroke={strokeColor} strokeLinecap="square"></path>
      </pattern>
    );
  },
  ({id, color}) => {
    // circles
    const stroke = '#343434';
    const fill = tinycolor(color).lighten(30).toString();
    return (
      <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
        <rect width="10" height="10" fill={fill}></rect>
        <circle cx="5" cy="5" r="2" fill={color} stroke={stroke} strokeWidth="0"></circle>
      </pattern>
    );
  },
  ({id, color}) => {
    // crosses
    const strokeColor = tinycolor(color).lighten(30).toString();
    return (
      <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
        <rect width="10" height="10" fill={color}></rect>
        <path d="M 2.5,2.5l5,5M2.5,7.5l5,-5" fill="transparent" strokeWidth="1" shapeRendering="auto" stroke={strokeColor} strokeLinecap="square"></path>
      </pattern>
    );
  },
  ({id, color}) => {
    // waves
    const strokeColor = tinycolor(color).lighten(30).toString();
    return (
      <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
        <rect width="10" height="10" fill={color}></rect>
        <path d="M 0 5 c 1.25 -2.5 , 3.75 -2.5 , 5 0 c 1.25 2.5 , 3.75 2.5 , 5 0 M -5 5 c 1.25 2.5 , 3.75 2.5 , 5 0 M 10 5 c 1.25 -2.5 , 3.75 -2.5 , 5 0" fill="transparent" strokeWidth="1" shapeRendering="auto" stroke={strokeColor} strokeLinecap="square"></path>
      </pattern>
    );
  },
  ({id, color}) => {
    // lines
    const strokeColor = tinycolor(color).lighten(30).toString();
    return (
      <pattern id={id} patternUnits="userSpaceOnUse" width="10" height="10">
        <rect width="10" height="10" fill={color}></rect>
        <path d="M 0,0 l 10,10 M -2.5,7.5 l 5,5 M 7.5,-2.5 l 5,5" strokeWidth="1" shapeRendering="auto" stroke={strokeColor} strokeLinecap="square"></path>
      </pattern>
    );
  },
  ({id, color}) => {
    // circles
    const strokeColor = tinycolor(color).lighten(30).toString();
    return (
      <pattern id={id} patternUnits="userSpaceOnUse" width="20" height="20">{/* todo - investigate why this width/height is different */}
        <rect width="20" height="20" fill={color}></rect>
        <circle cx="10" cy="10" r="3" fill="transparent" stroke={strokeColor} strokeWidth="1"></circle>
      </pattern>
    );
  },
];


const makeHighcontrastPatterns = (Highcharts) => {

  return ({
    count = HIGHCONTRAST_PATTERN_COUNT,
    colors = Highcharts.getOptions().colors,
    namespace = HIGHCONTRAST_PATTERN_NAMESPACE,
  }) => {

    const arrayOfCount = Array(count).fill();

    return (
      <div aria-hidden="true" className="patterns">
        <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            {arrayOfCount.map((i, idx) => {
              const patternIdx = getItemOfListFromIncrement(highcontrastPatterns, idx);
              const Pattern = highcontrastPatterns[patternIdx];

              const colorIdx = getItemOfListFromIncrement(colors, idx);
              const color = colors[colorIdx];

              return <Pattern key={idx} color={color} id={`${namespace}-${idx}`} />
            })}
          </defs>
        </svg>
      </div>
    );
  };
};


// todo - move this elsewhere
export const NullDataLayerPattern = () => {
  return (
    <div aria-hidden="true" style={{position: 'absolute', left: '-1000px'}}>
      <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <pattern id="null-data-layer" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d="M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9" stroke="#ddd" strokeWidth="2"></path>
          </pattern>
        </defs>
      </svg>
    </div>
  )
};


export const createHighconstrastFillSeriesIteratee = condition => {
  const getHighcontrastPatternIds = () => {
    const arrayOfCount = Array(HIGHCONTRAST_PATTERN_COUNT).fill();
    return arrayOfCount.map((c, idx) => {
      return `url(#${HIGHCONTRAST_PATTERN_NAMESPACE}-${idx})`;
    });
  };
  const patternIds = getHighcontrastPatternIds();

  return (item, idx) => {
    const patternIdx = getItemOfListFromIncrement(patternIds, idx);

    item.color = condition ? patternIds[patternIdx] : void 0;
    return item;
  };
};


export const mapHighcontrastFill = (config, condition) => {
  const onFunc = createHighconstrastFillSeriesIteratee(true);
  const offFunc = createHighconstrastFillSeriesIteratee(false);

  config.series = config.series.map(condition ? onFunc : offFunc);
  return config;
};


export const mapHighcontrastFillByPoint = (config, condition) => {
  const onFunc = createHighconstrastFillSeriesIteratee(true);
  const offFunc = createHighconstrastFillSeriesIteratee(false);

  config.series = config.series.map(s => {
    s.data.map(condition ? onFunc : offFunc);
    return s;
  });
  return config;
};


export const createHighcontrastDashstyleSeriesIteratee = (condition) => {
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
  return (item, idx) => {
    const dashIdx = getItemOfListFromIncrement(dashTypes, idx);
    item.dashStyle = condition ? dashTypes[dashIdx] : 'Solid';
    return item;
  };
};

export const mapHighcontrastDashstyle = (config, condition) => {
  const onFunc = createHighcontrastDashstyleSeriesIteratee(true);
  const offFunc = createHighcontrastDashstyleSeriesIteratee(false);

  config.series = config.series.map(condition ? onFunc : offFunc);
  return config;
};


export default makeHighcontrastPatterns;
