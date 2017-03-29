
import React from 'react';
import {render} from 'react-dom';

import ColumnWidget from './components/columnWidget';
import PieWidget from './components/pieWidget';

/*

  library

  : export pie
  : export line
  : export bar
  : export ...

 */

export default {
  ColumnWidget,
  PieWidget
};




const columnWidget = {
  title: 'Number of page views',
  dateUpdated: '22 Feb 2016',
};

const pieWidget = {
  title: 'Devices used',
  dateUpdated: '22 Feb 2016',
};


render(
  <div>
    <PieWidget widget={pieWidget} />
    <ColumnWidget widget={columnWidget} />
  </div>, document.getElementById('root')
);

