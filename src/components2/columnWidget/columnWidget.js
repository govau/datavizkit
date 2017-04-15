
import React, {PureComponent} from 'react';
import {compose} from 'recompose';

import withHighcharts from './../withHighcharts';
import withColumnChart from './../withColumnChart';


// render a uniquely marked up and styled custom ColumnWidget
// might also have a ColumnWidgetLarge or ColumnWidgetMonochrome
const ColumnWidget = (props) => {
  return (
    <div className="card">
      <div>Column Widget</div>
      <div>{props.children}</div>
    </div>
  )
};

const enhance = compose(
  withHighcharts,
  withColumnChart
)(ColumnWidget);

export default enhance;

