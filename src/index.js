
import React from 'react';
import {render} from 'react-dom';

import LineWidget from './components/lineWidget';
import ColumnWidget from './components/columnWidget';
import DonutWidget from './components/donutWidget';

/*

  library

  : export donut
  : export line
  : export bar
  : export ...

 */

export default {
  LineWidget,
  ColumnWidget,
  DonutWidget
};




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
    <DonutWidget widget={donutWidget} />
    <ColumnWidget widget={columnWidget} />
  </div>, document.getElementById('root')
);

