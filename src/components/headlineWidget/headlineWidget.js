import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withHeroChart from './../withHeroChart';
import withSparklineRow from './../withSparklineRow';

// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const HeadlineWidget = (props) => {
  return (
    <article className="chart--column" role="article">
      <header>
        <div>Headline Widget</div>
      </header>
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withHeroChart,
  withSparkRow
)(ColumnWidget);

export default enhance;

