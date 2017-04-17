
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withStackedColumnChart from './../withStackedColumnChart';


// render a uniquely marked up and styled custom StackedColumnWidget
// might also have a StackedColumnWidgetLarge or StackedColumnWidgetMonochrome
const StackedColumnWidget = (props) => {
  return (
    <article className="chart--stackedColumn" role="article">
      <header>
        <div>StackedColumn Widget</div>
      </header>
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withStackedColumnChart
)(StackedColumnWidget);

export default enhance;

