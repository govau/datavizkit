
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withSparklineChart from './../withSparklineChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom SparklineWidget
// might also have a SparklineWidgetLarge or SparklineWidgetMonochrome
const SparklineWidget = ({infoText, children}) => {
  return (
    <article className="chart--sparkline" role="article">
      <header>
        {infoText && <Tooltip text={infoText}>
          What is this?
        </Tooltip>}
      </header>
      <section>{children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withSparklineChart
)(SparklineWidget);

export default enhance;

