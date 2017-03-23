
import React, {PureComponent} from 'react';

import withChart from './../hocs/withChart';


class PieChart extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;
  }

  componentDidMount() {
    const {chartConfig, chartOptions} = this.props;
    this.props.create(this.el, chartConfig, chartOptions);
  }

  componentWillUpdate({chartConfig, chartOptions}) {
    this.props.update(chartConfig, chartOptions);
  }

  render() {
    return <div ref={el => this.el = el}></div>
  }

}

export default withChart(PieChart);


