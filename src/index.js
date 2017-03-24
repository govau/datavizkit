
import React from 'react';
import {render} from 'react-dom';

import Bar from './components/bar';

/*

  library

  : export pie
  : export line
  : export bar
  : export ...

 */

// export default {
//   ColumnWidget: ColumnWidget
// };


const chartConfig = {
  type: 'bar'
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
  <Bar chartConfig={chartConfig} chartOptions={chartOptions} />,
  document.getElementById('root')
);

