
import React, {PureComponent} from 'react';
import omit from 'lodash/omit';
import merge from 'lodash/merge';

import {createHighcontrastDashSeriesIteratee} from './../utils/highcontrastPatterns';
import {symbolChars, valueFormats, dateFormats} from './../utils/displayFormats';


const withHeroChart = (ComposedComponent) => {

  return class extends PureComponent {

    constructor(props) {
      super(props);
      this._chartEl = null;
      this._chartConfig = null;
      this._highcontrastSeriesIteratee = createHighcontrastDashSeriesIteratee();
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
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal'
        },
        subtitle: {
          useHTML: true,
          text: `<span>Last updated <time dateTime="${dateFormats.dateTime(dateLastUpdated)}">${dateFormats.dayMonthYear(dateLastUpdated)}</time></span>`,
        },
        plotOptions: {
          line: {},
          series: { // todo 
            lineWidth: 4,
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
          enabled: true,
          shared: true,
          crosshairs: true,
          borderRadius: 8,
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
          crosshair: {
            width: 40,
            color: 'rgba(204,214,235,0.25)'
          }

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

      return this._transformForHighContrast(displayHighContrast, config);
    }

    _transformForHighContrast(should, config) {
      if (should) {
        config.series = config.series.map(this._highcontrastSeriesIteratee);
      }
      return config;
    }

    _transformPartitionedForHighContrast(should, config) {
      if (should) {
        const series = config.series.map(this._highcontrastSeriesIteratee);
        return {series};
      }
      return {};
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
