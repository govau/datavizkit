### Multiple Category Singular Slice:

Renders slice data to each of its sectors.

Shows last point in time data. Charts with time series data longer than a single slice should use another chart type. 


    <DonutWidget series={[{
                  name: "Jan",
                  data: [
                    {"name":"Mobile","y":183},
                    {"name":"Tablet","y":30},
                    {"name":"Desktop","y":200}
                  ]
                }]}
             title="Devices used"
             units="percentage"
             type="donut"
             dateLastUpdated="2017-02-01T01:02:02.240Z"
             _singleCategory={true}
             _singleSection={false}
             minimumValue="30" />
