
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withHeroChart from './../withHeroChart';


// render a uniquely marked up and styled custom HeroWidget
const HeroWidget = (props) => {
  return (
    <article className="chart--hero" role="article">
      <section>{props.children}</section>
    </article>
  )
};

const enhance = compose(
  withHighcharts,
  withHeroChart
)(HeroWidget);

export default enhance;
