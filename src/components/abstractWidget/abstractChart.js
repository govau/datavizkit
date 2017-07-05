
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withAbstract from './withAbstract';


const BubbleChart = ({children}) => {
  return (
    <div>
      <div className="chart">{children}</div>
    </div>
  )
};

const HighchartifiedAbstractChart = compose(
  withHighcharts,
  withAbstract,
)(BubbleChart);

export default HighchartifiedAbstractChart;

