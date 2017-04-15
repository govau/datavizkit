
import React, {PureComponent} from 'react';
import {compose} from 'recompose';
import Highcharts from 'highcharts';


// abstract methods from the Highcharts api
const withHighcharts = (ComposedComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.renderInDOM = this.renderInDOM.bind(this);
    }
    renderInDOM(options) {
      if (!options.chart && !options.chart.renderTo) {
        throw new Error('Must provide chart.renderTo on options.')
      }
      new Highcharts.chart(options);
    }
    render() {
      return <ComposedComponent {...this.props} renderInDOM={this.renderInDOM} />
    }
  }
};

// render a column chart and manage column chart stuff
const withColumnChart = (ComposedComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.chartEl = null;
    }
    componentDidMount() {
      this.props.renderInDOM({
        ...{
          chart: {
            type: 'column'
          },
          title: {
            text: 'Monthly Average Rainfall'
          },
          xAxis: {
            categories: [
              'Oct',
              'Nov',
              'Dec'
            ],
          },
          series: [{
            name: 'Tokyo',
            data: [49.9, 71.5, 106.4]

          }, {
            name: 'New York',
            data: [83.6, 78.8, 98.5]
          }]
        },

        // instance props
        chart: {
          renderTo: this.chartEl
        }
      })
    }
    componentWillUnmount() {
      this.chartEl.destroy();
    }
    render() {
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this.chartEl = el} />
        </ComposedComponent>
      )
    }
  }
};

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


// use it <ColumnWidget data={{}} />
