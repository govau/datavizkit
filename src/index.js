
import React from 'react';
import {render} from 'react-dom';

import BarChart from './components/barChart';
import ColumnChart from './components/columnChart';

/*

  library

  : export pie
  : export line
  : export bar
  : export ...

 */

export default {
  BarChart,
  ColumnChart
};


const chartOptions = {
  title: {
    text: 'Spend'
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    layout: 'vertical',
    x: 0,
    y: 100
  },

  xAxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },

  series: [{
    data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
  }]
};

render(
  <ColumnChart options={chartOptions} />, document.getElementById('root')
);

