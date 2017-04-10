
// todo - not import Highcharts again
import Highcharts from 'highcharts';
import last from 'lodash/last';


export const makeChartOptions = ({
  emitSetState = () => {},
  widget,
}) => {

  const categories = Highcharts.getOptions().lang.shortMonths;

  return {
    // default column options
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
                color: 'url(#diagonal-stripe-1)', // this color represents the null value region
              });
            }
          });

          let customLegendData = this.series.map(s => {
            const lastData = last(s.data);
            return {
              // key: lastData.category,
              key: s.name,
              y: lastData.y,
              seriesName: s.name,
              color: lastData.color,
            }
          });
          emitSetState({'customLegend': customLegendData});

          // "hover" over the last column
          const lastCol = last(this.series[0].data);
          if (lastCol) {
            lastCol.onMouseOver && lastCol.onMouseOver();
          }
        },
      },
    },
    title: {
      text: widget.title,
      align: 'left',
    },
    subtitle: {
      useHTML: true,
      text: `<span>Last updated <time dateTime="${widget.dateUpdated}">${widget.dateUpdated}</time></span>`,
      align: 'left',
    },
    plotOptions: {
      column: {
        stacking: widget.stacking || 'normal'
      },
      series: {
        animation: false,
        point: {
          events: {
            mouseOver: function() {
              const sliceIdx = this.index;
              const chartSeries = this.series.chart.series
              const customLegendData = chartSeries.map((s, i) => {
                const sliceData = s.data[sliceIdx];
                return {
                  key: s.name,
                  y: sliceData.y,
                  seriesName: s.category,
                  color: sliceData.color
                }
              });
              emitSetState({'customLegend': customLegendData});
            }
          }
        },
        states: {
          hover: {
            color: 'yellow',
          },
          select: { // required because it can be selected programatically
            enabled: false
          }
        },
        allowPointSelect: false
      },
    },

    // instance props
    xAxis: {
      labels: {
        formatter: function () {
          return categories[this.value] + ' 2017';
        },
      },
    },
    yAxis: {
      title: {
        text: null
      },
      // labels: {
      //   formatter: function() {
      //     return this.value + ' (units)';
      //   }
      // }
    },
    series: [
      {
        name: "NSW",
        data: [29.9, 71.5, 106.4, null, null, 176, 135, 148.5, 216.4, null, 95.6, 54.4]
      },
      {
        name: "VIC",
        data: [12.9, 65.5, 98.4, null, null, 45, 75, 34.2, 141, null, 89, 12]
      },
      {
        name: "TAS",
        data: [5, 5, 4, null, null, 154, 12, 89, 92, null, 145, 132]
      },
      {
        name: "WA",
        data: [29.9, 71.5, 106.4, null, null, 176, 135, 148.5, 216.4, null, 95.6, 54.4]
      },
    ],
    tooltip: {
      enabled: false,
    },
  };
};
