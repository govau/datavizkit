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

    <StackedColumnWidget type="stackedColumn"
       coordinateType="cartesian"
       title="Devices used by users"
       dateLastUpdated="2016-11-09T01:01:01.111Z"
       infoText="This shows the types of devices used by users to access the appointment booking service."
       stackingType="percent"
       viewport="md"
       displayHighContrast={false}
       _singleCategory={false}
       _singleSection={false}
       yAxis={[
         {"title": {"text": "Percentage (%)"}, "opposite": false, "floor": 0, "ceiling": 100, "min": 0, "max": 100}
       ]}
       xAxis={[
         {"categories": ["Mar '16", "Apr '16", "May '16", "Jun '16", "Jul '16", "Aug '16", "Sep '16", "Oct '16"]}
       ]}
       series={[
         {"name": "Mobile", "units": "%", "data": [43, 48, 47, 49, 50, 51, 54, 55], "yAxis": 0}, 
         {"name": "Tablet", "units": "%", "data": [6, 6, 6, 2, 3, 5, 5, 5], "yAxis": 0},
         {"name": "Desktop", "units": "%", "data": [51, 46, 47, 49, 47, 44, 41, 40], "yAxis": 0}
       ]}
     />
