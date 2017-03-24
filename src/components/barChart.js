
import React, {PureComponent} from 'react';

import {withChart} from './../hocs/withHighcharts';


class PieChart extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;
    this.state = {
      chartConfig: {
        type: 'bar'
      }
    }
  }

  componentDidMount() {
    this.props.create(this.el, this.state.chartConfig, this.props.chartOptions);
  }

  componentWillUpdate({chartOptions}, {chartConfig}) {
    this.props.update(chartConfig, chartOptions);
  }

  render() {
    const {chartConfig: {type}} = this.state;
    return <div data-charttype={type} ref={el => this.el = el}></div>
  }

}

export default withChart(PieChart);


