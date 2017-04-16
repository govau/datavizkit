### Multiple Category Singular Slice:

Renders slice data to each of its sectors.

    <DonutWidget chartConfig={{
               "series":[{
                  name: "Jan",
                  data: [
                    {"name":"Mobile","y":183},
                    {"name":"Tablet","y":30},
                    {"name":"Desktop","y":200}
                  ]
                }]
             }}
             title="Devices used"
             units="percentage"
             type="donut"
             dateLastUpdated="2017-02-01T01:02:02.240Z"
             _singleCategory={true}
             _singleSection={false}
             minimumValue="30" />


### Multiple Category Multiple Slices (shown as aggregate over time (many slices)):

`@todo - new feature`


### Multiple Category Multiple Slices (multiple pies)

`@todo - new feature - as example: http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/pie-donut/`
