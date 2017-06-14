### Multiple Category Singular Slice:

Renders slice data to each of its sectors.

    <DonutWidget _type="donut"
                   _coordinatesType="polar"
                   _isKpi={false}
                   chartTitle="Devices used"
                   chartDescription="This shows which devices are used to view the Performance Dashboard."
                   chartUpdatedDate="2017-02-01T01:02:02.240Z"
                   _singleCategory={true}
                   _singleSection={false}
                   series={[
                     {"name": "Jan '17", "data": [
                       {"name": "Mobile", "units": "n", "y": 183, "color": "#b6988f"}, 
                       {"name": "Tablet", "units": "n", "y": 30, "color": "#46b4ba"}, 
                       {"name": "Desktop", "units": "n", "y": 1009, "color": "#f17465"}
                     ]}
                   ]}
                   xAxis={null}
                   yAxis={null}
                   displayHighContrast={false}
                   viewport="sm" />


### Multiple Category Multiple Slices (shown as aggregate over time (many slices)):

`@todo - new feature`


### Multiple Category Multiple Slices (multiple pies)

`@todo - new feature - as example: http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/pie-donut/`
