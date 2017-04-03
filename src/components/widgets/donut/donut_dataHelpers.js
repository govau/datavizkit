
export const makeChartOptions = ({
  emitSetState = () => {},
  widget,
}) => {
  return {
    // default pie options
    chart: {
      type: 'pie',
      events: {
        load: function() {
          const customLegendData = this.series[0].data.map(d => {
            return {
              key: d.name,
              y: d.y,
              seriesName: this.series[0].name,
              color: d.color
            }
          });
          emitSetState({'customLegend': customLegendData});
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
    series: [{
      name: 'Brands',
      colorByPoint: true,
      innerSize: '50%',
      data: [{
        name: 'Microsoft Internet Explorer',
        y: 56.33
      }, {
        name: 'Chrome',
        y: 24.03,
      }, {
        name: 'Firefox',
        y: 10.38
      }, {
        name: 'Safari',
        y: 4.77
      }, {
        name: 'Opera',
        y: 0.91
      }, {
        name: 'Proprietary or Undetectable',
        y: 0.2
      }]
    }],
  };
};
