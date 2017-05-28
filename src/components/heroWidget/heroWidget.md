### Mixed axes: percentages and currency

    <HeroWidget title=''
                dateLastUpdated='23 Mar 2017'
                _singleCategory={false}
                _singleSection={false}
                minimumValue="76"
                yAxis={[
                  {"title": {"text": "Percentage (%)"}, "opposite": false},
                  {"title": {"text": "AUD ($)"}, "opposite": true}
                ]}
                xAxis={{
                  "categories": ["May '16", "Jun '16", "Jul '16", "Aug '16", "Sep '16", "Oct '16", "Nov '16"]
                }}
                series={[
                  {
                    "name": "User satisfaction",
                    "units": "%",
                    "color": "#F2B038",
                    "data": [null, null, null, null, null, 76, null],
                    "yAxis": 0
                  },
                  {
                    "name": "Cost per transaction",
                    "units": "$",
                    "color": "#75A370",
                    "data": [null, null, null, null, null, null, null],
                    "yAxis": 1
                  },
                  {
                    "name": "Completion rate",
                    "units": "%",
                    "color": "#7066A5",
                    "data": [null, null, null, null, null, null, null],
                    "yAxis": 0
                  },
                  {
                    "name": "Digital take-up",
                    "units": "%",
                    "color": "#4892C0",
                    "data": [77, 89, 90, 93, 91, 91, 92],
                    "yAxis": 0
                  }
                ]} />
