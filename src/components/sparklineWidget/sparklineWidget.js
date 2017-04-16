
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withSparklineChart from './../withSparklineChart';


// render a uniquely marked up and styled custom SparklineWidget
// might also have a SparklineWidgetLarge or SparklineWidgetMonochrome
const SparklineWidget = (props) => {
  return (
    <article className="chart--sparkline card" role="article">
      <header>
        <div>Sparkline Widget</div>
      </header>
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withSparklineChart
)(SparklineWidget);

export default enhance;

