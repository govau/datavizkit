
import React, {PureComponent} from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withColumnChart from './../withColumnChart';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const ColumnWidget = (props) => {
  return (
    <article className="chart--column card" role="article">
      <header>
        <div>Column Widget</div>
      </header>
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withColumnChart
)(ColumnWidget);

export default enhance;

