
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withColumn from './withColumn';

import CustomLegend from './../customLegend/customLegend';


const ColumnChart = ({children, customLegendData, displayHighContrast}) => {
  return (
    <div>
      <span className="chart">{children}</span>
      {customLegendData && customLegendData.length > 0 && <CustomLegend data={customLegendData} displayHighContrast={displayHighContrast} />}
    </div>
  )
};

const HighchartifiedColumnChart = compose(
  withHighcharts,
  withColumn,
)(ColumnChart);

export default HighchartifiedColumnChart;
