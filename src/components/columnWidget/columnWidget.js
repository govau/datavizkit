
import React, {PureComponent, PropTypes} from 'react';
import deepmerge from 'deepmerge';

import {withChart} from './../../hocs/withHighcharts';


class ColumnWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.el = null;
    this.state = {
      options: {
        chart: {
          type: 'column',
          marginRight: 120
        },
        legend: {
          align: 'right',
          verticalAlign: 'bottom',
          layout: 'vertical'
        },
        title: {
          align: 'left',
          // x: 10,
        },
        credits: {
          enabled: false
        }
      }
    }
  }

  componentDidMount() {
    let _options = deepmerge(this.state.options, this.props.options);
    _options.chart.renderTo = this.el;
    this.props.create(_options);
  }

  componentWillUpdate(nextProps, nextState) {
    this.props.update(deepmerge(nextState.options, nextProps.options));
  }

  render() {
    const {options: {chart}} = this.state;
    return <div className={`chart--${chart.type}`} ref={el => this.el = el}></div>
  }

}

ColumnWidget.propTypes = {
  options: PropTypes.shape({
    // a column chart must have time-series data
    series: PropTypes.arrayOf(
      PropTypes.shape({
        data: PropTypes.array.isRequired
      }).isRequired
    ).isRequired
  }).isRequired
};

export default withChart(ColumnWidget);


