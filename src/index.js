
import React from 'react';
import {render} from 'react-dom';

import ColumnWidget from './components/columnWidget/columnWidget.js';
import LineWidget from './components/lineWidget/lineWidget.js';
import SparklineWidget from './components/sparklineWidget/sparklineWidget.js';
import DonutWidget from './components/donutWidget/donutWidget.js';
import StackedColumnWidget from './components/stackedColumnWidget/stackedColumnWidget.js';
import HeroWidget from './components/heroWidget/heroWidget.js';


render(
  <div>
    {/* todo - move. used for column null data layers */}
    <div aria-hidden="true" className="patterns">
      <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <pattern id="diagonal-stripe-1" patternUnits="userSpaceOnUse" width="10" height="10">
            <image xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScvPgogIDxwYXRoIGQ9J00tMSwxIGwyLC0yCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMAogICAgICAgICAgIE05LDExIGwyLC0yJyBzdHJva2U9J2JsYWNrJyBzdHJva2Utd2lkdGg9JzEnLz4KPC9zdmc+Cg==" x="0" y="0" width="10" height="10"></image>
          </pattern>
        </defs>
      </svg>
    </div>

    <SparklineWidget chartConfig={{"xAxis":{
        "categories":["Jul","Aug","Sep","Oct","Nov","Dec","Jan"]
      },
      "series":[
        {"name":"Total opportunities","data":[null,null,13,29,42,58,74]}
      ]
    }} title="Total opportunities"
                     units="number"
                     type="sparkline"
                     dateLastUpdated="2017-02-01T23:11:18.675Z"
                     _singleCategory={false}
                     _singleSection={true}
                     minimumValue="13" />

    <DonutWidget chartConfig={{"series":[{
        name: "Jan",
        data: [
          {"name":"Mobile","y":183},
          {"name":"Tablet","y":30},
          {"name":"Desktop","y":200}
        ]
      }]
    }} title="Devices used"
                 units="percentage"
                 type="donut"
                 dateLastUpdated="2017-02-01T01:02:02.240Z"
                 _singleCategory={true}
                 _singleSection={false}
                 minimumValue="30" />

    <StackedColumnWidget
      chartConfig={{
        "xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"]},
        "series":[
          {"name":"Public Beta","data":[0,0,2,2,2,2,2,2,2]},
          {"name":"Pre Beta","data":[0,0,1,3,3,3,3,3,3]},
          {"name":"Non-transformational","data":[1,1,1,1,1,1,1,1,1]},
          {"name":"Other","data":[0,0,0,0,0,0,0,0,0]}
        ]
      }}
      title="Types of service"
      units="number"
      type="stackedColumn"
      dateLastUpdated="2017-02-01T01:02:02.240Z"
      _singleCategory={false}
      _singleSection={false}
      stackingType="normal"
    />

    <LineWidget title='Number of page views'
                units='number'
                type='column'
                dateLastUpdated='22 Feb 2016'
                minimumValue="20000"
                chartConfig={{
                  "xAxis":{
                    "categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]
                  },
                  "series":[
                    {"name":"Time to clear","data":[84807,48317,51420,62400,48060,37560,39300]}
                  ]
                }}
                singleCategory={false}
                singleSection={true} />

    <ColumnWidget title='Number of page views'
                  units='number'
                  type='column'
                  dateLastUpdated='22 Feb 2016'
                  infoText="Something amazing about this widget."
                  minimumValue="20000"
                  chartConfig={{"xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]},"series":[{"name":"Time to clear","data":[84807,48317,51420,62400,null,37560,39300]}]}}
                  _singleCategory={false}
                  _singleSection={true} />

   <HeroWidget title='Performance Dashboard'
                   dateLastUpdated='23 Mar 2017'
                   chartConfig={{
                     'xAxis': [{
                       'categories':['Aug','Sep','Oct','Nov','Dec','Jan','Feb']
                     }],
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
                         'units': 'number',
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

  </div>, document.getElementById('root')
);
