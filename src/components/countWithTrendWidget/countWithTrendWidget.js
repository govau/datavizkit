
const win = typeof window !== 'undefined' ? window : global;

import React from 'react';
import PropTypes from 'prop-types';

import MobileComponent from './mobile_component';
import DesktopComponent from './desktop_component';
// import {makeGetKpiColorProps} from './../../utils/highcontrastPatterns';

// const getKpiColorProps = makeGetKpiColorProps(win.DATAVIZKIT_CONFIG.KPI_COLOR_PALETTE);
//

/**
 * A sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 *
 */
const CountWithTrendWidget = (props) => {
  const {
    viewport,
    widgetColor,
    widgetIndex = 0,
    ...rest
  } = props;

  // const {colorset} = getKpiColorProps();

  const color = '' || widgetColor || colorset[widgetIndex];


  if (typeof viewport === 'undefined' || viewport === 'sm') {
    return <MobileComponent {...rest} color={color} />
  } else {
    return <DesktopComponent {...rest} color={color} />
  }
};

if (__DEV__) {
  CountWithTrendWidget.propTypes = {
    viewport: PropTypes.string,
  };
}


export default CountWithTrendWidget;
