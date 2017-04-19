
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withStackedColumnChart from './../withStackedColumnChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom StackedColumnWidget
// might also have a StackedColumnWidgetLarge or StackedColumnWidgetMonochrome
const StackedColumnWidget = ({infoText, children}) => {
  return (
    <article className="chart--stackedColumn" role="article">
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
  withStackedColumnChart
)(StackedColumnWidget);

export default enhance;

