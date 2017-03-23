
import React from 'react';
import Highcharts from 'highcharts';

import {onNextFrame} from './../utils/DOM';


const withChart = ComposedComponent => props => {

  let chart;

  const createFn = (el, chartConfig, chartOptions) => {
    chart = new Highcharts.Chart({
      chart: {
        renderTo: el,
        ...chartConfig
      },
      ...chartOptions
    });
  };

  const updateFn = (chartConfig, chartOptions) => {
    createFn(chartConfig, chartOptions);
    onNextFrame(chart.reflow);
  };

  const destroyFn = () => {
    chart.destroy();
  };

  return <ComposedComponent create={createFn}
                            update={updateFn}
                            destroy={destroyFn} {...props} />
};

export default withChart;
