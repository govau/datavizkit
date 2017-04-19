
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withDonutChart from './../withDonutChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const DonutWidget = ({infoText, children}) => {
  return (
    <article className="chart--donut" role="article">
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
  withDonutChart
)(DonutWidget);

export default enhance;

