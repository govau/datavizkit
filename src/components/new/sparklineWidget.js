
import React from 'react';

import SparklineChart from './sparklineChart';


const SparklineWidget = ({series, xAxis}) => {
  return (
    <div style={{border: '1px solid red', padding: '10px'}}>
      <h1>Sparkline Widget</h1>
      <SparklineChart series={series} xAxis={xAxis} />
    </div>
  )
};

export default SparklineWidget;
