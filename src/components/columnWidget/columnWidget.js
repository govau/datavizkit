
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withColumnChart from './../withColumnChart';
import Tooltip from './../tooltip';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const ColumnWidget = ({infoText, children}) => {
  return (
    <article className="chart--column" role="article">
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
  withColumnChart
)(ColumnWidget);

export default enhance;

