
import React, {Component} from 'react';
import {render} from 'react-dom';

import {HighcontrastPatterns} from './components/withHighcharts';
import {NullDataLayerPattern} from './utils/highcontrastPatterns';


import ColumnWidget from './components/columnWidget/columnWidget.js';
import LineWidget from './components/lineWidget/lineWidget.js';
import SparklineWidget from './components/sparklineWidget/sparklineWidget.js';
import DonutWidget from './components/donutWidget/donutWidget.js';
import StackedColumnWidget from './components/stackedColumnWidget/stackedColumnWidget.js';
import HeroWidget from './components/heroWidget/heroWidget.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hcState: true,
    }
  }
  render() {
    const {hcState} = this.state;

    console.log('hcState: ', hcState)

    return (
      <div>
        <NullDataLayerPattern />
        <HighcontrastPatterns />

        <button onClick={() => {
          this.setState({hcState: !this.state.hcState})
        }}>Toggle high contrast</button>


        <LineWidget title='Number of page views'
          units='number'
          type='column'
          dateLastUpdated='2017-02-22T23:11:18.675Z'
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
          singleSection={true}
          displayHighContrast={hcState} />

        <SparklineWidget chartConfig={{
          "xAxis":{
            "categories":["Jul","Aug","Sep","Oct","Nov","Dec","Jan"]
          },
          "series":[
            { "name":"Total opportunities",
              "units": "money",
              "data":[null,null,13,29,42,58,74]
            }
        ]
        }} title="Total opportunities"
        type="sparkline"
        dateLastUpdated="2017-02-01T23:11:18.675Z"
        _singleCategory={false}
        _singleSection={true}
        minimumValue="13" />


        {/*<StackedColumnWidget*/}
          {/*chartConfig={{*/}
            {/*"xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"]},*/}
            {/*"series":[*/}
              {/*{"name":"Public Beta","data":[0,0,2,2,2,2,2,2,2]},*/}
              {/*{"name":"Pre Beta","data":[0,0,1,3,3,3,3,3,3]},*/}
              {/*{"name":"Non-transformational","data":[1,1,1,1,1,1,1,1,1]},*/}
              {/*{"name":"Other","data":[0,0,0,0,0,0,0,0,0]}*/}
            {/*]*/}
          {/*}}*/}
          {/*title="Types of service"*/}
          {/*units="number"*/}
          {/*type="stackedColumn"*/}
          {/*dateLastUpdated="2017-02-01T01:02:02.240Z"*/}
          {/*_singleCategory={false}*/}
          {/*_singleSection={false}*/}
          {/*stackingType="normal"*/}
          {/*displayHighContrast={hcState}*/}
        {/*/>*/}

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
          minimumValue="30"
          displayHighContrast={hcState} />

        {/*<DonutWidget chartConfig={{"series":[{*/}
          {/*name: "Jan",*/}
          {/*data: [*/}
            {/*{"name":"Girls","y":183},*/}
            {/*{"name":"Guys","y":30},*/}
          {/*]*/}
          {/*}]*/}
          {/*}} title="People used"*/}
          {/*units="percentage"*/}
          {/*type="donut"*/}
          {/*dateLastUpdated="2017-02-01T01:02:02.240Z"*/}
          {/*_singleCategory={true}*/}
          {/*_singleSection={false}*/}
          {/*minimumValue="30"*/}
          {/*displayHighContrast={hcState} />*/}


        <ColumnWidget title='Number of page views'
                      units='number'
                      type='column'
                      dateLastUpdated='2017-02-14T23:11:18.675Z'
                      infoText="Something amazing about this widget."
                      minimumValue="20000"
                      chartConfig={{"xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]},"series":[{"name":"Time to clear","data":[84807,null,null,62400,null,37560,39300]}]}}
                      _singleCategory={false}
                      _singleSection={true}
                      displayHighContrast={hcState} />

        <ColumnWidget title='Boo of page views'
                      units='number'
                      type='column'
                      dateLastUpdated='2017-02-15T23:11:18.675Z'
                      infoText="Something amazing about this widget."
                      minimumValue="8000"
                      chartConfig={{"xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]},"series":[{"name":"Time to clear","data":[84807,62400,null,37560,39300,8000,null]}]}}
                      _singleCategory={false}
                      _singleSection={true}
                      displayHighContrast={hcState} />

       <HeroWidget title='Performance Dashboard'
                     dateLastUpdated='2017-02-01T23:11:18.675Z'
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


      </div>
    )
  }
}

render(
  <App />, document.getElementById('root')
);
