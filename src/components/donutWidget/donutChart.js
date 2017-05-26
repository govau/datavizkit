
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withLine from './withDonut';

import CustomLegend from './../customLegend/customLegend';


const DonutChart = ({children, customLegendData, displayHighContrast}) => {
  return (
    <div>
      <span className="chart">{children}</span>
      {customLegendData && customLegendData.length > 0 && <CustomLegend data={customLegendData} displayHighContrast={displayHighContrast} />}
    </div>
  )
};

const HighchartifiedDonutChart = compose(
  withHighcharts,
  withLine,
)(DonutChart);

export default HighchartifiedDonutChart;
