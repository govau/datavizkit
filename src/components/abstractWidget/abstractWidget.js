
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import AbstractChart from './abstractChart';
import {validAxisType, validChartType} from './../../helpers/propsValidators';
import {validSeriesData} from './../../helpers/customValidators';


const AbstractWidget = ({config}) => {

  if (get(config, 'chart.renderTo')) {
    delete config.chart.renderTo;
  }

  return (
    <div>
      <AbstractChart config={config} />
    </div>
  )
};

if (__DEV__) {
  AbstractWidget.propTypes = {

    chart: PropTypes.shape({
      type: validChartType,
      height: PropTypes.number,
      width: PropTypes.number,
    }),
    tooltip: PropTypes.shape({

    }),
    yAxis: PropTypes.arrayOf(PropTypes.shape({
      categories: PropTypes.array,
      type: validAxisType,
    })),
    xAxis: PropTypes.arrayOf(PropTypes.shape({
      categories: PropTypes.array,
      type: validAxisType,
    })),

    series: PropTypes.array.isRequired,

    // series: PropTypes.arrayOf(PropTypes.shape({
    //   data: PropTypes.arrayOf(
    //     PropTypes.oneOf([
    //       PropTypes.shape({
    //         x: PropTypes.number.isRequired,
    //         y: PropTypes.number.isRequired,
    //         z: PropTypes.number,
    //         name: PropTypes.string.isRequired,
    //         units: PropTypes.string,
    //         color: PropTypes.string,
    //       }),
    //       PropTypes.array,
    //     ])
    //   ).isRequired,
    // }).isRequired,),

  };
}

export default AbstractWidget;
