
import React from 'react';
import PropTypes from 'prop-types';

import MobileComponent from './mobile_component';
import DesktopComponent from './desktop_component';


const getPercentageDifference = (a = null, b = null) => {
  if (!a) {
    if (!b) {
      return null;
    }
    return 100;
  }

  return (a - b).toFixed(2);
};

/**
 * A sparkline-esque chart for displaying a Count of latest data and
 * the trend line for that data.
 *
 */
const CountWithTrendWidget = (props) => {
  const {
    chartTitle,
    series,
    viewport,
    tooltipAnchorTo,
  } = props;

  const s = series[0];
  let recentValue,
    nextRecentValue,
    percentageDifferenceDate = null;

  if (s.data.length > 1) {
    recentValue = series[0].data[1];
    nextRecentValue = series[0].data[0];

    if (nextRecentValue === null) {
      percentageDifferenceDate = null;
    } else {
      percentageDifferenceDate = nextRecentValue.period_end;
    }
  } else {
    recentValue = series[0].data[0];
    nextRecentValue = '';
  }

  const percentageDifference = getPercentageDifference(recentValue, nextRecentValue);


  if (typeof viewport === 'undefined' || viewport === 'sm') {
    return <MobileComponent title={chartTitle}
                            tooltipAnchorTo={tooltipAnchorTo}
                            units={series[0].units}
                            value={recentValue}
                            trendValue={percentageDifference}
                            trendDate={percentageDifferenceDate}
                            color={series[0].color} />
  } else {
    return <DesktopComponent title={chartTitle}
                             tooltipAnchorTo={tooltipAnchorTo}
                             units={series[0].units}
                             value={recentValue}
                             trendValue={percentageDifference}
                             trendDate={percentageDifferenceDate}
                             color={series[0].color} />
  }
};

if (__DEV__) {
  CountWithTrendWidget.propTypes = {
    chartTitle: PropTypes.string,
    series: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      units: PropTypes.string,
      color: PropTypes.string,
      data: PropTypes.array.isRequired,
    })).isRequired,
    viewport: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
    tooltipAnchorTo: PropTypes.string,
  };
}


export default CountWithTrendWidget;

