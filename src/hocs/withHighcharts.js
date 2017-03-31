
import React from 'react';
import Highcharts from 'highcharts';

import {onNextFrame} from './../utils/DOM';


Highcharts.setOptions({
  colors: [
    '#4892C0',  /* light blue */
    '#75A370',  /* dark green */
    '#F5D900',  /* yellow */
    '#7066A5',  /* light purple */
    '#F8BBD0',  /* pink */
    '#47BCAC',  /* turquoise */
    '#5345AD',  /* purple */
    '#AFA545',  /* olive */
    '#CB6935',  /* orange */
  ],
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
    // enabled: false,
  }
};
