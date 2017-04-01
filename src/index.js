
import React from 'react';
import {render} from 'react-dom';
//
// import LineWidget from './components/lineWidget';
// import ColumnWidget from './components/columnWidget';
// import StackedColumnWidget from './components/stackedColumnWidget';
// import DonutWidget from './components/donutWidget';


import ColumnWidget from './components/widgets2/column'
import DonutWidget from './components/widgets2/donut'


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

    <ColumnWidget widget={lineWidget} />
    <DonutWidget widget={donutWidget} />




    {/*<LineWidget widget={lineWidget} />*/}
    {/*<DonutWidget widget={donutWidget} />*/}
    {/*<ColumnWidget widget={columnWidget} />*/}
    {/*<StackedColumnWidget widget={columnWidget} />*/}
  </div>, document.getElementById('root')
);

