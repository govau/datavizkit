
import React from 'react';
import PropTypes from 'prop-types';

import MobileComponent from './mobile_component';
import DesktopComponent from './desktop_component';



/**
 * A sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 *
 */
const CountWithTrendWidget = (props) => {
  const {viewport, ...rest} = props;

  if (typeof viewport === 'undefined' || viewport === 'sm' || viewport === 'md') {
    return <MobileComponent {...rest} />
  } else {
    return <DesktopComponent {...rest} />
  }
};

if (__DEV__) {
  CountWithTrendWidget.propTypes = {
    viewport: PropTypes.string,
  };
}


export default CountWithTrendWidget;
