
import React, {PureComponent} from 'react';
import last from 'lodash/last';
import omit from 'lodash/omit';
import Legend from './customLegend.js';
import Highcharts from 'highcharts';

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
        },
        title: {
          text: title,
        },
        legend: {
          enabled: true,
          align: 'right',
          verticalAlign: 'top',
          layout: 'vertical',
          x: 0,
          y: 100,
          itemMarginBottom: 15
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
              enabled: true, // Can't figure out a way to hide markers on lines yet show on legend :(
              states: { 
                hover: {
                  enabled: true
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
          borderRadius: 8,
          positioner: function(labelWidth, labelHeight, point) {
            return { x: point.plotX, y: this.chart.plotTop + this.chart.plotHeight - labelHeight };
          },
          pointFormatter: function() {
            const symbolChars = {
              'circle': 9679,
              'diamond': 9670,
              'triangle': 9652,
              'square': 9632,
              'triangle-down': 9660 };

            const valueFormats = {
              'percentage': function(val) { return `${val}%`; },
              'number': function(val) { return `$${val}`; }
            };
            
            var color = this.series.color;
            var symbol = symbolChars[this.series.symbol];
            var valueFormatter, value;
            
            if (valueFormatter = valueFormats[this.series.options.units]) {
              value = valueFormatter(this.y)
            }
            else { 
              value = this.y;
            }

            var labelHtml = `<span style="color:${color}; font-size: 1.5em; text-decoration: line-through;">&nbsp;&#${symbol};&nbsp;</span>`;
            var valueHtml = `<span style="float:right;">${value}</span>`

            return `<div style="width:100px;">${labelHtml}${valueHtml}</span>`;
          },
          headerFormat: '',
          useHTML: true
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
          }
        }),
        series: chartConfig.series
      };
    }
    render() {
      const {customLegend} = this.state;
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this.chartEl = el} />
        </ComposedComponent>
      )
    }
  }
};

export default withHeroChart;
