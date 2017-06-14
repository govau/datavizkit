### Basic Stacked Column Widget: 

    <StackedColumnWidget 
      _type="stackedColumn"
        _coordinatesType="cartesian"
        _isKpi={false}
        chartTitle="Types of service"
        chartDescription="This shows which the development phase the services that have published on the Performance Dashboard are in. It also shows services that are not going through a digital transformation and other types of projects such as information websites"
        chartUpdatedDate="2017-02-01T01:02:02.240Z"
        _singleCategory={false}
        _singleSection={false}
        series={[
          {"name":"Public Beta","units":"n","data":[0,0,2,2,2,2,2,2,2],"color":"#b6988f"},
          {"name":"Pre Beta","units":"n","data":[0,0,1,3,3,3,3,3,3],"color":"#46b4ba"},
          {"name":"Non-transformational","units":"n","data":[1,1,1,1,1,1,1,1,1],"color":"#f17465"},
          {"name":"Other","units":"n","data":[0,0,0,0,0,0,0,0,0],"color":"#4e9774"}
        ]}
        xAxis={[
          {"categories":["May '16","Jun '16","Jul '16","Aug '16","Sep '16","Oct '16","Nov '16","Dec '16","Jan '17"]}
        ]}
        yAxis={[
          {"title":{"text":""},"opposite":false}
        ]}
        displayHighContrast={false}
        viewport="sm"
    />
  
      
### Basic Stacked Column Widget (percentage):

