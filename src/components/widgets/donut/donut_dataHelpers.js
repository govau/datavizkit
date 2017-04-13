
import Highcharts from 'highcharts';
import merge from 'lodash/merge';


export const makeChartOptions = ({
  emitSetState = () => {},
  chartConfig = {},
  title,
  units,
  type,
  dateLastUpdated
}) => {

  const config = merge({
    // default pie options
    chart: {
      type: 'pie',
      events: {

        load: function() {
          const customLegendData = this.series[0].data.map(d => {
            return {
              key: d.name,
              y: Highcharts.numberFormat(d.percentage, 2) + '%',
              color: d.color
            }
          });
          emitSetState({'customLegend': customLegendData});
        },
      },
    },
    title: {
      text: title,
      align: 'left',
    },
    subtitle: {
      useHTML: true,
      text: `<span>Last updated <time dateTime="${dateLastUpdated}">${dateLastUpdated}</time></span>`,
      align: 'left',
    },
    plotOptions: {
      pie: {
        animation: false,
        dataLabels: {
          enabled: false
        },
        showInLegend: true,
        states: {
          hover: {
            halo: {
              size: 0
            }
          },
          select: { // required because can be selected programmatically
            enabled: false
          }
        }
      },
      series: {}
    },

    // instance props
    series: [],   // replaced by chartConfig
  }, chartConfig);

  chartConfig.series = chartConfig.series.map(s => {
    return {...s,
      colorByPoint: true,
      innerSize: '50%',
    }
  });

  return config;

};



