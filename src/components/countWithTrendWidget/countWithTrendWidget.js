
import React from 'react';
import PropTypes from 'prop-types';

import getItemOfListFromIncrement from './../../utils/getItemOfListFromIncrement';
import MobileComponent from './mobile_component';
import DesktopComponent from './desktop_component';


/**
 * A sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 *
 */
const CountWithTrendWidget = (props) => {
  const {
    viewport,
    widgetColor,
    widgetPos,
    config,
    ...rest
  } = props;

  const color = widgetColor || getItemOfListFromIncrement(config.KPI_COLOR_PALETTE, widgetPos);

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
