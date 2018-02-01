import React, { Component } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import AbstractChart from './abstractChart';
import { validChartType } from './../../helpers/propsValidators';

class AbstractWidget extends Component {
  getChart() {
    return this.abstractChart._instance;
  }

  render() {
    const config = Object.assign({}, this.props.config);

    if (get(config, 'chart.renderTo')) {
      delete config.chart.renderTo;
    }

    return (
      <div>
        <AbstractChart ref={(c) => { this.abstractChart = c; }} config={config} />
      </div>
    )
  }
}

if (__DEV__) {
  AbstractWidget.propTypes = {
    config: PropTypes.shape({
      chart: PropTypes.shape({
        type: validChartType,
        height: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
        width: PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
        ]),
      }),
      tooltip: PropTypes.shape({}),
      yAxis: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
      xAxis: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
      ]),
      series: PropTypes.array.isRequired, // todo - validSeriesData
    })
  };
}

export default AbstractWidget;
