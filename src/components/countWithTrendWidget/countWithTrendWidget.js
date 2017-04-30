
import React from 'react';
import PropTypes from 'prop-types';


import MobileComponent from './mobile_component';
import DesktopComponent from './desktop_component';


export const CountValue = ({value, units}) => {
  if (!value) {
    return <span className="count-value no-data">No data</span>
  }
  return (
    <span className="count-value">
        {!units && value}
      {units === '$' ?
        <span>{units && <span className="count-units">{units}</span>}{value}</span> :
        <span>{value}{units && <span className="count-units">{units}</span>}</span>
      }
      </span>
  )
};

export const TrendValue = ({value}) => {
  if (!value) {
    return null;
  }
  return (
    <span className="trend-value">
        {Number(value) > 0 ?
          <span>+{value} <i className="fa fa-arrow-up" /></span> :
          Number(value) < 0 ?
            <span>{value} <i className="fa fa-arrow-down" /></span> :
            <span>-&nbsp;</span>}
      </span>
  )
};


/**
 * A sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 *
 */
const CountWithTrendWidget = (props) => {
  const {viewport, ...rest} = props;

  if (typeof viewport === 'undefined' || viewport === 'sm') {
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
