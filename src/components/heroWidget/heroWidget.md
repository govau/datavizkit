### Mixed axes: percentages and currency

    <HeroWidget displayHighContrast={false}
                _type="hero"
                _coordinatesType="cartesian"
                _isKpi={true}
                chartTitle="Kpis"
                chartDescription={null}
                chartUpdatedDate="2017-02-01T01:02:02.240Z"
                _singleCategory={false}
                _singleSection={false}
                series={[
                  {"name":"User satisfaction","units":"%","data":[null,null,null,null,null,null,null,null,null],"color":"#cf7e33","yAxis":0},
                  {"name":"Cost per transaction","units":"$","data":[null,null,null,29.44,27.23,15.02,12.3,7.28,5.82],"color":"#7e985c","yAxis":1},
                  {"name":"Digital take-up","units":"%","data":[0,0,67,100,100,100,100,100,100],"color":"#007cc3","yAxis":0},
                  {"name":"Completion rate","units":"%","data":[null,null,73.39,90.27,84.28,60.82,63.1,63.43,66.87],"color":"#6e63a7","yAxis":0}
                ]}
                xAxis={[
                  {"categories":["May '16","Jun '16","Jul '16","Aug '16","Sep '16","Oct '16","Nov '16","Dec '16","Jan '17"]}
                ]}
                yAxis={[
                  {"title":{"text":"Percentage (%)"},"opposite":false,"floor":0,"ceiling":100,"min":0,"max":100},{"title":{"text":"AUD ($)"},"opposite":true}
                ]}/>
