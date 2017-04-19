import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withHeroChart from './../withHeroChart';

// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const HeroWidget = (props) => {
  return (
    <article className="chart--line" role="article">
      <header>
        <div>Hero Widget</div>
      </header>
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withHeroChart
)(HeroWidget);

export default enhance;
