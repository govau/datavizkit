Basic Sparkline Widget:

    <SparklineWidget chartConfig={{
                   "xAxis":{
                     "categories":["Jul","Aug","Sep","Oct","Nov","Dec","Jan"]
                   },
                   "series":[
                     { "name":"Total opportunities",
                       "data":[null,null,13,29,42,58,74],
                       "units":"number"}
                   ]
                 }}
                 title="Total opportunities"
                 type="sparkline"
                 dateLastUpdated="2017-02-01T23:11:18.675Z"
                 _singleCategory={false}
                 _singleSection={true}
                 minimumValue="13" />

Sparkline Widget for a percentage:

    <SparklineWidget chartConfig={{
                   "xAxis":{
                     "categories":["Jul","Aug","Sep","Oct","Nov","Dec","Jan"]
                   },
                   "series":[
                     { "name":"User satisfaction",
                       "data":[12,14,18,28,31,34,28],
                       "units":"percentage"}
                   ]
                 }}
                 title="User satisfaction"
                 type="sparkline"
                 dateLastUpdated="2017-02-01T23:11:18.675Z"
                 _singleCategory={false}
                 _singleSection={true}
                 minimumValue="13" />

Sparkline Widget for a monetary value:

    <SparklineWidget chartConfig={{
                   "xAxis":{
                     "categories":["Jul","Aug","Sep","Oct","Nov","Dec","Jan"]
                   },
                   "series":[
                     { "name":"Cost per transaction",
                       "data":[400,200,128,75,40,30,24],
                       "units":"money"}
                   ]
                 }}
                 title="Cost per transaction"
                 type="sparkline"
                 dateLastUpdated="2017-02-01T23:11:18.675Z"
                 _singleCategory={false}
                 _singleSection={true}
                 minimumValue="13" />
