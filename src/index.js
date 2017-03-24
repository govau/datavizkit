
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
    text: 'Fruit Consumption'
  },
  xAxis: {
    categories: ['Apples', 'Bananas', 'Oranges']
  },
  yAxis: {
    title: {
      text: 'Fruit eaten'
    }
  },
  series: [{
    name: 'Jane',
    data: [1, 0, 4]
  }, {
    name: 'John',
    data: [5, 7, 3]
  }]
};

render(
  <ColumnChart chartOptions={chartOptions} />, document.getElementById('root')
);

