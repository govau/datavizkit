
import React, {PureComponent} from 'react';
import last from 'lodash/last';

import Legend from './customLegend.js';
// todo - export "Highcharts" related config ops to withHighcharts or as utils


// render a stackedColumn chart and manage stackedColumn chart stuff
const withStackedColumnChart = (ComposedComponent) => {
  return class extends PureComponent {
    constructor(props) {
      super(props);
      this.chartEl = null;
      this.state = {
        customLegend: null,
      }
    }
    componentDidMount() {
      this.props.renderChart(this.getBaseConfig(), this.getInstanceConfig());
    }
    componentWillUnmount() {
      this.props.destroyChart(this.chart);
    }
    getBaseConfig() {
      const {
        title,
        dateLastUpdated,
        stackingType,
      } = this.props;

      const boundSetState = this.setState.bind(this);

      return {
        chart: {
          type: 'column',
          events: {
            load: function() {  // equivalent to constructor callback

              var seriesData = this.series[0].data;//this is series data
              seriesData.forEach((d, idx) => {
                if (d.y === null) { //find null value in series
                  // adds plot band
                  this.xAxis[0].addPlotBand({
                    from: idx -.5,  // point back
                    to: idx + .5,   // point after
                    color: 'url(#null-data-layer)', // this color represents the null value region
                  });
                }
              });

              let customLegendData = this.series.map(s => {
                const lastData = last(s.data);
                return {
                  // key: lastData.category,
                  key: s.name,
                  y: lastData.y,
                  color: lastData.color,
                }
              });
              boundSetState({'customLegend': customLegendData});

              // "hover" over the last stackedColumn
              const lastCol = last(this.series[0].data);
              if (lastCol) {
                lastCol.onMouseOver && lastCol.onMouseOver();
              }
            },
          },
        },
        title: {
          text: title,
        },
        subtitle: {
          useHTML: true,
          text: `<span>Last updated <time dateTime="${dateLastUpdated}">${dateLastUpdated}</time></span>`,
        },
        plotOptions: {
          column: {
            stacking: stackingType
          },
          series: {
            animation: false,
            point: {
              events: {
                mouseOver: function() {
                  const sliceIdx = this.index;
                  const chartSeries = this.series.chart.series;
                  const customLegendData = chartSeries.map((s, i) => {
                    const sliceData = s.data[sliceIdx];
                    sliceData.setState('hover');
                    return {
                      key: s.name,
                      y: sliceData.y,
                      color: sliceData.color
                    }
                  });
                  boundSetState({'customLegend': customLegendData});
                },
                mouseOut: function() {
                  // todo - something weird going on here
                  const sliceIdx = this.index;
                  this.series.chart.series.forEach((s, i) => {
                    s.data[sliceIdx].setState('');
                  });
                },
              }
            },
            states: {
              hover: {
                brightness: -.2,
              },
              select: { // required because it can be selected programatically
                enabled: false
              }
            },
            allowPointSelect: false
          },
        },
        tooltip: {
          enabled: false,
        },
        yAxis: {
          title: {
            text: null
          },
        }
      };
    }
    getInstanceConfig() {
      const {
        chartConfig,
        minimumValue,
        stackingType
      } = this.props;

      const conf = {
        chart: {
          renderTo: this.chartEl
        },
        yAxis: {},
        xAxis: chartConfig.xAxis,
        series: chartConfig.series,
      };
      if (stackingType === 'normal' && minimumValue) {
        conf.yAxis.min = minimumValue;
      }

      return conf;
    }
    render() {
      const {customLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this.chartEl = el} />
          {customLegend && customLegend.length && <Legend data={customLegend} />}
        </ComposedComponent>
      )
    }
  }
};

export default withStackedColumnChart;
