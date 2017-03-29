
import React from 'react';
import Highcharts from 'highcharts';

import {onNextFrame} from './../utils/DOM';


Highcharts.setOptions({
  colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
  chart: {
    style: {
      fontFamily: 'Open Sans,sans-serif'
    }
  }
});

export const withChart = ComposedComponent => props => {

  let chart;

  const createFn = (options) => {
    chart = new Highcharts.Chart(options);
    return chart;
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


export const BASE_CHART_OPTIONS = {
  title: {
    text: null
  },
  yAxis: {
    title: {
      text: null
    }
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false
  },
  tooltip: {
    enabled: false,
  }
};
