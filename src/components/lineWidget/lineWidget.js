
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withLineChart from './../withLineChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const LineWidget = ({infoText, children}) => {
  return (
    <article className="chart--line" role="article">
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
  withLineChart
)(LineWidget);

export default enhance;

