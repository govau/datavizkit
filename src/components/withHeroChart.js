
import React, {PureComponent} from 'react';
import omit from 'lodash/omit';
import merge from 'lodash/merge';
import {symbolChars, valueFormats} from './../utils/displayFormats';

const withHeroChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chartEl = null;
      this._chartConfig = null;
    }

    componentDidMount() {
      this._chartConfig = this.createConfig();
      this.props.renderChart(this._chartConfig);
    }

    componentWillUnmount() {
      this.props.destroyChart();
      this._chartEl = null;
      this._chartConfig = null;
    }

    createConfig() {
      const {
        title,
        dateLastUpdated,
        minimumValue,
        displayHighContrast,
        chartConfig,
      } = this.props;

      const baseConfig = {
        chart: {
          type: 'spline',
        },
        title: {
          useHTML: true,
          text: `<span>${title}</span>`,
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
        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                align: 'center',
                verticalAlign: 'bottom',
                layout: 'horizontal',
                y: 0
              }
            }
          }]
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
              enabled: false, // Can't figure out a way to hide markers on lines yet show on legend :(
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

      const instanceConfig = {
        chart: {
          renderTo: this._chartEl,
        },
        yAxis: chartConfig.yAxis,
        xAxis: merge({}, omit(chartConfig.xAxis, 'categories'), {
          labels: {
            formatter: function() {
              return chartConfig.xAxis.categories[this.value];
            }
          }
        }),
        series: chartConfig.series
      };

      const config = merge({}, baseConfig, instanceConfig);

      return config;
    }

    render() {
      return (
        <ComposedComponent {...this.props}>
          <div ref={el => this._chartEl = el} />
        </ComposedComponent>
      )
    }
  }
};

export default withHeroChart;
