### Mixed axes: percentages and currency

    <HeroWidget title='Performance Dashboard'
                      dateLastUpdated='23 Mar 2017'
                      chartConfig={{
                        'xAxis': {
                          'categories':['Aug','Sep','Oct','Nov','Dec','Jan','Feb']
                        },
                        'yAxis':[{
                          'title': {
                            'text': 'Percentage'
                          }
                        },{
                          'title': {
                            'text': 'AUSD'
                          },
                          'opposite': true
                        }
                        ],
                        'series':[
                          {
                            'name':'User satisfaction',
                            'units': 'percentage',
                            'data': [null, null, 45, 22, 18, 12, 38]
                          },
                          {
                            'name':'Cost per transaction',
                            'units': 'money',
                            'yAxis': 1,
                            'data': [null, 578, 442, 80, 27, 25, 24]
                          },
                          {
                            'name':'Digital take-up',
                            'units': 'percentage',
                            'data': [0, 0, 10, 12, 22, 27, 38]
                          },
                          {
                            'name':'Completion rate',
                            'units': 'percentage',
                            'data': [38, 39, 40, 41, null, 47, 45]
                          }
                        ]
                      }}
                      _singleCategory={true}
                      _singleSection={false} />
