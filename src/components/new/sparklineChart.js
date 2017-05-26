
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './withHighcharts';
import withSparkline from './withSparkline';


const SparklineChart = ({children}) => {
  return (
    <div style={{border: '1px solid red', padding: '10px'}}>
      <h1>Sparkline Chart</h1>
      <span className="chart">{children}</span>
      <span>Chart</span>
      <span>Legend</span>
    </div>
  )
};

const HighchartifiedSparklineChart = compose(
  withHighcharts,
  withSparkline,
)(SparklineChart);

export default HighchartifiedSparklineChart;
