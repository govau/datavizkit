### Single Category Single Slice:

`@todo - example`


### Single Category Many Slice:

    <LineWidget _type="line"
                  _coordinatesType="cartesian"
                  _isKpi={false}
                  chartTitle="Dashboards viewed"
                  chartDescription="This shows the average number of service dashboards viewed each time a user visits the Performance Dashboard."
                  chartUpdatedDate="2017-02-01T01:02:02.240Z"
                  _singleCategory={false}
                  _singleSection={true}
                  series={[
                    {"name":"Page Views","units":"n","data":[null,null,2.8,3.28,2.94,3.21,2.85,2.79,2.73],"color":"#b6988f"}
                  ]}
                  xAxis={[
                    {"categories":["May '16","Jun '16","Jul '16","Aug '16","Sep '16","Oct '16","Nov '16","Dec '16","Jan '17"]}
                  ]}
                  yAxis={[
                    {"title":{"text":""},"min":[]}
                  ]}
                  displayHighContrast={false}
                  viewport="sm" />
        

### Many Category Single Slice:

`@todo - example`


### Many Category Many Slice:


    <LineWidget title='Number of page views'
                units='number'
                type='column'
                dateLastUpdated='22 Feb 2016'
                minimumValue="20000"
                xAxis={[
                  {"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]}
                ]}
                series={[
                  {"name":"Time to clear","data":[84807,null,51420,62400,48060,37560,39300]},
                  {"name":"Time to fish","data":[48060,null,39300,84807,null,51420,62400]}
                ]}
                singleCategory={false} 
                singleSection={true} 
                chartDescription="" />

