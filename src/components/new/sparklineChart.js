
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './withHighcharts';
import withSparkline from './withSparkline';

import Count from './../count/count.js';
import TrendLegend from './../trendLegend/trendLegend.js';


const SparklineChart = ({children, countValue, countUnits, trendLegendData}) => {
  return (
    <div style={{border: '1px solid red', padding: '10px'}}>
      <h1>Sparkline Chart</h1>

      {countValue && <Count value={countValue} units={countUnits} />}
      <span className="chart">{children}</span>
      {trendLegendData && trendLegendData.length > 0 && <TrendLegend data={trendLegendData} />}
    </div>
  )
};

const HighchartifiedSparklineChart = compose(
  withHighcharts,
  withSparkline,
)(SparklineChart);

export default HighchartifiedSparklineChart;
