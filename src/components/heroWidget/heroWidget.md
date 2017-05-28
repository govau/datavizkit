### Mixed axes: percentages and currency

    <HeroWidget title=''
                type="hero"
                dateLastUpdated="2017-02-01T01:02:02.240Z"
                displayHighContrast={false}
                _singleCategory={false}
                _singleSection={false}
                yAxis={[
                  {"title": {"text": "Percentage (%)"}, "opposite": false, "floor": 0, "ceiling": 100, "min": 0, "max": 100}, 
                  {"title": {"text": "AUD ($)"}, "opposite": true}
                ]}
                xAxis={[
                  {"categories": ["May '16", "Jun '16", "Jul '16", "Aug '16", "Sep '16", "Oct '16", "Nov '16", "Dec '16", "Jan '17"]}
                ]}
                series={[
                  {
                    "name": "User satisfaction",
                    "units": "%",
                    "color": "#F2B038",
                    "data": [null, null, null, null, null, null, null, null, null],
                    "yAxis": 0
                  }, 
                  {
                    "name": "Cost per transaction",
                    "units": "$",
                    "color": "#75A370",
                    "data": [null, null, null, 29.44, 27.23, 15.02, 12.3, 7.28, 5.82],
                    "yAxis": 1
                  }, 
                  {
                    "name": "Digital take-up",
                    "units": "%",
                    "color": "#4892C0",
                    "data": [0, 0, 67, 100, 100, 100, 100, 100, 100],
                    "yAxis": 0
                  }, 
                  {
                    "name": "Completion rate",
                    "units": "%",
                    "color": "#7066A5",
                    "data": [null, null, 73.39, 90.27, 84.28, 60.82, 63.1, 63.43, 66.87],
                    "yAxis": 0
                  }
                ]} />
