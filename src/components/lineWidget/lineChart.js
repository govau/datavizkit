
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withLine from './withLine';

import CustomLegend from './../customLegend/customLegend';


const LineChart = ({children, customLegendData, displayHighContrast}) => {
  return (
    <div>
      <span className="chart">{children}</span>
      {customLegendData && customLegendData.length > 0 && <CustomLegend data={customLegendData} displayHighContrast={displayHighContrast} />}
    </div>
  )
};

const HighchartifiedLineChart = compose(
  withHighcharts,
  withLine,
)(LineChart);

export default HighchartifiedLineChart;
