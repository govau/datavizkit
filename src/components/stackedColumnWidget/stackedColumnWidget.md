### Basic Stacked Column Widget: 

    <StackedColumnWidget 
      xAxis={{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"]}}
      series={[
        {"name":"Public Beta","data":[0,0,2,2,2,2,2,2,2]},
        {"name":"Pre Beta","data":[0,0,1,3,3,3,3,3,3]},
        {"name":"Non-transformational","data":[1,1,1,1,1,1,1,1,1]},
        {"name":"Other","data":[0,0,0,0,0,0,0,0,0]}
      ]}
      title="Types of service"
      units="number"
      type="stackedColumn"
      dateLastUpdated="2017-02-01T01:02:02.240Z"
      _singleCategory={false}
      _singleSection={false}
      stackingType="normal"
    />
  
      
### Basic Stacked Column Widget (percentage):

    <StackedColumnWidget 
      _singleCategory="false"
      _singleSection="false"
      type="stackedColumn"
      units="percentage"
      dateLastUpdated="2016-11-09T01:01:01.111Z"
      title="Devices used by users"
      xAxis={{
        "categories":["Mar","Apr","May","Jun","Jul","Aug","Sep","Oct"]
      }}
      series={[
        {"name":"Mobile","data":[43,48,47,49,50,51,54,55]},
        {"name":"Tablet","data":[6,6,6,2,3,5,5,5]},
        {"name":"Desktop","data":[51,46,47,49,47,44,41,40]}
      ]}
      stackingType="percentage"
     />
