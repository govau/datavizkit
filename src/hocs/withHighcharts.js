
import React from 'react';
import Highcharts from 'highcharts';

import {onNextFrame} from './../utils/DOM';


export const withChart = ComposedComponent => props => {

  let chart;

  const createFn = (options) => {
    console.log(options)
    chart = new Highcharts.Chart(options);
  };

  const updateFn = (options) => {
    createFn(options);
    onNextFrame(chart.reflow);
  };

  const destroyFn = () => {
    chart.destroy();
  };

  return <ComposedComponent create={createFn}
                            update={updateFn}
                            destroy={destroyFn} {...props} />
};
