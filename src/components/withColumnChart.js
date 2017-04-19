
import React, {PureComponent} from 'react';
import last from 'lodash/last';

import Legend from './customLegend.js';
import {applyHighContrast} from './../utils/highContrastMode';


// todo - export "Highcharts" related config ops to withHighcharts or as utils


// render a column chart and manage column chart stuff
// and manages *all state*
const withColumnChart = (ComposedComponent) => {
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
      } = this.props;

      const boundSetState = this.setState.bind(this);

      return {
        chart: {
          type: 'column',
          events: {
            load: function() {  // equivalent to constructor callback

              var seriesData = this.series[0].data;//this is series data  // todo - this will be different for differnt dimensions of data
              seriesData.forEach((d, idx) => {
                if (d.y === null) { //find null value in series
                  // adds plot band
                  this.xAxis[0].addPlotBand({
                    from: idx -.5,  // point back
                    to: idx + .5,   // point after
                    color: 'url(#highcharts-default-pattern-1)', // this color represents the null value region
                  });
                }
              });

              let customLegendData = this.series.map(s => {
                const lastData = last(s.data);
                return {
                  key: s.name,
                  y: lastData.y,
                  color: lastData.color,
                }
              });
              boundSetState({'customLegend': customLegendData});

              // "hover" over the last column
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
          column: {},
          series: {
            animation: false,
            point: {
              events: {
                mouseOver: function() {
                  const sliceIdx = this.index;
                  // todo - verify this works for all data permutations
                  const customLegendData = this.series.chart.series.map(s => {
                    const sliceData = s.data[sliceIdx];
                    return {
                      key: s.name,
                      y: sliceData.y,
                      color: sliceData.color
                    }
                  });
                  boundSetState({'customLegend': customLegendData});
                }
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
        isHighContrastMode,
      } = this.props;

      let config = {
        chart: {
          renderTo: this.chartEl
        },
        yAxis: {
          min: minimumValue || 0,
        },
        xAxis: chartConfig.xAxis,
        series: chartConfig.series,
      };

      if (isHighContrastMode) {
        config.series = config.series.map(applyHighContrast);
      }

      return config;
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

export default withColumnChart;
