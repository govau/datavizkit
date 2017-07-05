### Bubble Chart

    <AbstractWidget config={{
    
              chart: {
                type: 'bubble',
                plotBorderWidth: 1,
                zoomType: 'xy',
                height: 500,
                width: 500,
                // renderTo: '' // todo - required
              },
    
              title: {
                text: 'Projects by status - Delivery'
              },
    
              xAxis: {
                title: {
                  text: 'Percentage completed (%)',
                },
                lineColor: "#ddd",
                gridLineWidth: 1,
                startOnTick: false,
                endOnTick: false,
                //ceiling: 110,
                // floor: -10,
                min: 0 - 10,		// dont cut off the bubble (+ bubble radius)
                max: 100 + 10,
                plotLines:[{
                  value:50,
                  dashStyle: 'solid',
                  color:'#666',
                  width:2,
                  zIndex:0
                }],
              },
    
              legend: false,
    
              yAxis: {
                title: {
                  text: 'Delivery confidence',
                },
                lineColor: "#ddd",
                gridLineWidth: 1,
                tickInterval: 1,
                startOnTick: false,
                endOnTick: false,
    //    floor: 1 - 10,	// dont cut off the bubble
                //	ceiling: 6,
                plotLines:[{
                  value:3,
                  dashStyle: 'solid',
                  color:'#666',
                  width:2,
                  zIndex:0
                }],
              },
    
              plotOptions: {
                bubble: {
                  minSize: 3,
                  maxSize: 50,
                  tooltip: {
                    // formatter: function() { // todo http://api.highcharts.com/highcharts/tooltip.formatter
                    //   return '<div class="viz-tooltip"><a href="' + this.point.link + '"><b>' + this.point.name + "</b><br/>Click for more details</a></div>"
                    // },
                  },
                  displayNegative: true,
                },
              },
    
              series: [{
                // zMax: '', // maximum Z value // todo - derive
                // zMin: '', // minimum Z value // todo - derive
                data: [
                  // x,y,z,name,color,
                  {x:59.41,y:2,z:14744906,color:"orange"},{x:26.05,y:4,z:32785011,color:"orange"},{x:89.67,y:3,z:175300000,color:"orange"},{x:35.65,y:4,z:16870000,color:"red"},{x:75.67,y:5,z:31138054,color:"orange"},{x:78.3,y:3,z:101148000,color:"orange"},{x:75.67,y:4,z:16870000,color:"red"},{x:35.65,y:4,z:457370000,color:"orange"},{x:77.39,y:1,z:24680000,color:"orange"},{x:35.65,y:4,z:46302000,color:"red"},{x:90.71,y:1,z:11140000,color:"orange"},{x:76.79,y:5,z:175300000,color:"red"},{x:77.39,y:2,z:220450000,color:"orange"},{x:77.65,y:3,z:89650000,color:"orange"},{x:59.41,y:3,z:31138054,color:"orange"},{x:35.65,y:1,z:24680000,color:"orange"},{x:35.65,y:3,z:56870000,color:"red"},{x:81.98,y:5,z:11915000,color:"red"},{x:35.65,y:1,z:150000000,color:"orange"},{x:29.71,y:4,z:32785011,color:"red"},
                  {x:100,y:4,z:457370000,color:"orange"},{x:0,y:4,z:457370000,color:"orange"},
                ]
              }]
            }} />
