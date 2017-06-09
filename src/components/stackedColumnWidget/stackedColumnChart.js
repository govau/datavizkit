
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withStackedColumn from './withStackedColumn';

import CustomLegend from './../customLegend/customLegend';


const ColumnChart = ({
  children,
  customLegendData,
  displayHighContrast,
}) => {
  return (
    <div>
      <span className="chart">{children}</span>
      {customLegendData && customLegendData.length > 0 && <CustomLegend data={customLegendData} displayHighContrast={displayHighContrast} />}
    </div>
  )
};

const HighchartifiedStackedColumnChart = compose(
  withHighcharts,
  withStackedColumn,
)(ColumnChart);

export default HighchartifiedStackedColumnChart;
