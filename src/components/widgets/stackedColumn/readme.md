Basic Stacked Column Widget: 

    <StackedColumnWidget widget={{
      title: 'Page views by state (normal stacking)',
      dateUpdated: '22 Feb 2016'
    }} />
  
      
Basic Stacked Column Widget (percentage):

    <StackedColumnWidget 
      _singleCategory="false"
      _singleSection="false"
      type="stackedColumn"
      units="percentage"
      dateLastUpdated="2016-11-09T01:01:01.111Z"
      title="Devices used by users"
      chartConfig={{
        xAxis:{
          "categories":["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"]
        },
        series:[
          {"name":"Mobile","data":[43,48,47,49,50,51,54,55]},
          {"name":"Tablet","data":[6,6,6,2,3,5,5,5]},
          {"name":"Desktop","data":[51,46,47,49,47,44,41,40]}
        ]
      }}
      stackingType="percentage"
     />
