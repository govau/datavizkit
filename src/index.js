
import React from 'react';
import {render} from 'react-dom';


import ColumnWidget from './components/widgets/column'
import DonutWidget from './components/widgets/donut'
import LineWidget from './components/widgets/line';


/*

  library

  : export donut
  : export line
  : export bar
  : export ...

 */
//
// export default {
//   LineWidget,
//   ColumnWidget,
//   StackedColumnWidget,
//   DonutWidget
// };

const lineWidget = {
  title: 'Average session length',
  dateUpdated: '22 Feb 2016',
};

const columnWidget = {
  title: 'Number of page views',
  dateUpdated: '22 Feb 2016',
};

const donutWidget = {
  title: 'Devices used',
  dateUpdated: '22 Feb 2016',
};


render(
  <div>
    <LineWidget widget={lineWidget} />
    <ColumnWidget widget={columnWidget} />
    <DonutWidget widget={donutWidget} />

  </div>, document.getElementById('root')
);

