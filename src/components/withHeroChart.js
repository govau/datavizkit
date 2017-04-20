
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import omit from 'lodash/omit';
import Legend from './customLegend.js';

const withHeroChart = (ComposedComponent) => {
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
          type: 'spline',
          events: {
            load: function() {  // equivalent to constructor callback

              // var seriesData = this.series[0].data;//this is series data  // todo - this will be different for different dimensions of data
              // seriesData.forEach((d, idx) => {
              //   if (d.y === null) { //find null value in series
              //     // adds plot band
              //     this.xAxis[0].addPlotBand({
              //       from: idx -.5,  // point back
              //       to: idx + .5,   // point after
              //       color: 'url(#diagonal-stripe-1)', // this color represents the null value region
              //     });
              //   }
              // });

              let customLegendData = this.series.map(s => {
                const lastData = last(s.data);
                return {
                  key: s.name,
                  y: lastData.y,
                  color: lastData.color,
                }
              });
              boundSetState({'customLegend': customLegendData});

              // "hover" over the last line
              // const lastCol = last(this.series[0].data);
              // if (lastCol) {
              //   lastCol.onMouseOver && lastCol.onMouseOver();
              // }
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
          line: {},
          series: { // todo
            animation: false,
            marker: { 
              enabled: false,
              states: { 
                hover: {
                  enabled: true
                }
              }
            },
            point: {
              events: {
                mouseOver: function() {
                  const sliceIdx = this.index;
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
              select: { // required because can be selected programatically
                enabled: false
              }
            },
            allowPointSelect: false,
          },
        },
        tooltip: {
          enabled: true, //false,
          shared: true,
          crosshairs: true,
          positioner: function(labelWidth, labelHeight, point) {
            console.log("hooray");
            return { x: point.plotX, y: this.chart.plotTop + this.chart.plotHeight - labelHeight };
          },
          formatter: function() {
            return this.points.map(p => {
              return '<br />' + p.series.name + ': ' + p.y;
            });
          }
        },
        xAxis: {
          crosshair: true,
          // type: 'datetime', // todo - format x labels to datetime
          // Format 24 hour time to AM/PM
          // dateTimeLabelFormats: {
          //   hour: '%I:%M %P',
          //   minute: '%I %M'
          // },
          // labels: {
          //   formatter: function() {
          //     return Highcharts.dateFormat('%I:%M %P', this.value);
          //   }
          // }
        }
      };
    }
    getInstanceConfig() {
      const {
        chartConfig,
        minimumValue
      } = this.props;
      return {
        chart: {
          renderTo: this.chartEl
        },
        yAxis: chartConfig.yAxis,
        xAxis: Object.assign({}, omit(chartConfig.xAxis, 'categories'), {
          labels: {
            formatter: function() {
              return chartConfig.xAxis.categories[this.value];
            }
          },
          xCategories: chartConfig.xAxis.categories
        }),
        series: chartConfig.series
      };
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

export default withHeroChart;
