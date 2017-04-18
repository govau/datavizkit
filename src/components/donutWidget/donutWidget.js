
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withDonutChart from './../withDonutChart';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const DonutWidget = (props) => {
  return (
    <article className="chart--donut" role="article">
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withDonutChart
)(DonutWidget);

export default enhance;

