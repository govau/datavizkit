
import React from 'react';
import tinycolor from 'tinycolor2';

import getPointerInLoop from './getPointerInLoop';


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


export const makeHighcontrastPatterns = (colorset, patternIds) => {
  return () => {
    return (
      <div aria-hidden="true" className="patterns">
        <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            {patternIds.map((patternId, idx) => {

              const patternIdx = getPointerInLoop(highcontrastPatterns.length, idx);
              const Pattern = highcontrastPatterns[patternIdx];

              const colorIdx = getPointerInLoop(colorset.length, idx);
              const color = colorset[colorIdx];

              return <Pattern key={idx} color={color} id={patternId} />
            })}
          </defs>
        </svg>
      </div>
    );
  }
};

export const makeGetColorProps = palettes => {
  return (widgetIndex = 0, widgetId = 10000) => {

    widgetId = Number(widgetId);

    const colorsetIndex = getPointerInLoop(palettes.length, widgetIndex);
    const colorset = palettes[colorsetIndex];

    const highcontrastPatternIds = colorset.map((c, idx) => {
      return `hc-p-${widgetId}-${idx}`;
    });

    const HighcontrastPatterns = makeHighcontrastPatterns(colorset, highcontrastPatternIds);

    return {
      colorset,
      highcontrastPatternIds,
      HighcontrastPatterns
    }
  };
};


export const mapHighcontrastFill = (config, condition, patternIds) => {

  const iterateeOn = (item, idx) => {
    const patternIdx = getPointerInLoop(patternIds.length, idx);
    const patternSrc = `url(#${patternIds[patternIdx]})`;
    item.color = patternSrc;
    return item;
  };

  const iterateeOff = (item, index) => {
    item.color = void 0;
    return item;
  };

  config.series = config.series.map(condition ? iterateeOn : iterateeOff);
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
    const dashIdx = getPointerInLoop(dashTypes.length, idx);
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
