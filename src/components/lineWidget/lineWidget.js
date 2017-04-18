
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withLineChart from './../withLineChart';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const LineWidget = (props) => {
  return (
    <article className="chart--line" role="article">
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withLineChart
)(LineWidget);

export default enhance;

