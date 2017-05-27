
import React from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withHero from './withHero';


const HeroChart = ({children}) => {
  return (
    <div>
      <span className="chart">{children}</span>
    </div>
  )
};

const HighchartifiedHeroChart = compose(
  withHighcharts,
  withHero,
)(HeroChart);

export default HighchartifiedHeroChart;
