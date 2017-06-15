
import React, {Component} from 'react';
import {render} from 'react-dom';

import {NullDataLayerPattern} from './utils/highcontrastPatterns';


import ColumnWidget from './components/columnWidget/columnWidget';
import SparklineWidget from './components/sparklineWidget/sparklineWidget';
import LineWidget from './components/lineWidget/lineWidget';
import HeroWidget from './components/heroWidget/heroWidget';
import StackedColumnWidget from './components/stackedColumnWidget/stackedColumnWidget';
import DonutWidget from './components/donutWidget/donutWidget';
import CountWithTrendWidget from './components/countWithTrendWidget/countWithTrendWidget';


const series1 =  [
  { "name":"Total opportunities", "units": "percentage", "data":[null,null,13,29,42,58,74, 1]}
];
const series2 =  [
  { "name":"Total opportunities", "units": "percentage", "data":[42,58,74, null,null,13,29, 2500000]}
];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hcState: true,
      series: series1,
    }
  }
  render() {

    const {hcState} = this.state;

    return (
      <div>
        <NullDataLayerPattern />

        <button onClick={() => {this.setState({hcState: !this.state.hcState})}}>Toggle high contrast</button>


        <DonutWidget _type="donut"
                     _coordinatesType="polar"
                     _isKpi={false}
                     chartTitle="Devices used"
                     chartDescription="This shows which devices are used to view the Performance Dashboard."
                     chartUpdatedDate="2017-02-01T01:02:02.240Z"
                     _singleCategory={true}
                     _singleSection={false}
                     series={[
                       {"name": "Jan '17", "data": [
                         {"name": "Mobile", "units": "n", "y": 183, "color": "#b6988f"},
                         {"name": "Tablet", "units": "n", "y": 30, "color": "#46b4ba"},
                         {"name": "Desktop", "units": "n", "y": 1009, "color": "#f17465"}
                       ]}
                     ]}
                     xAxis={null}
                     yAxis={null}
                     displayHighContrast={hcState}
                     viewport="sm" />

        <HeroWidget displayHighContrast={hcState}
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
                      {"title":{"text":"Percentage (%)"},"opposite":false,"floor":0,"ceiling":100,"min":0,"max":100},
                      {"title":{"text":"AUD ($)"},"opposite":true}
                    ]} />

        <ColumnWidget _type="column"
                      _coordinatesType="cartesian"
                      _isKpi={false}
                      chartTitle="Number of users"
                      chartDescription="This shows the number of people visiting the Performance Dashboard each month."
                      chartUpdatedDate="2017-02-01T01:02:02.240Z"
                      _singleCategory={false}
                      _singleSection={true}
                      series={[
                        {"name":"Users","units":"n","data":[null,null,121,833,825,922,930,1038,873],"color":"#742a69"}
                      ]}
                      xAxis={[
                        {"categories":["May '16","Jun '16","Jul '16","Aug '16","Sep '16","Oct '16","Nov '16","Dec '16","Jan '17"]}
                      ]}
                      yAxis={[
                        {"title":{"text":""},"min":[]}
                      ]}
                      displayHighContrast={hcState}
                      viewport="sm" />

        <LineWidget _type="line"
                    _coordinatesType="cartesian"
                    _isKpi={false}
                    chartTitle="Dashboards viewed"
                    chartDescription="This shows the average number of service dashboards viewed each time a user visits the Performance Dashboard."
                    chartUpdatedDate="2017-02-01T01:02:02.240Z"
                    _singleCategory={false}
                    _singleSection={true}
                    series={[
                      {"name":"Page Views","units":"n","data":[null,null,2.8,3.28,2.94,3.21,2.85,2.79,2.73],"color":"#b6988f"}
                    ]}
                    xAxis={[
                      {"categories":["May '16","Jun '16","Jul '16","Aug '16","Sep '16","Oct '16","Nov '16","Dec '16","Jan '17"]}
                    ]}
                    yAxis={[
                      {"title":{"text":""},"min":[]}
                    ]}
                    displayHighContrast={hcState}
                    viewport="sm" />

        <StackedColumnWidget _type="stackedColumn"
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
                             displayHighContrast={hcState}
                             viewport="sm" />

        <SparklineWidget _type="sparkline"
                         _coordinatesType="cartesian"
                         _isKpi={false}
                         chartTitle="Total opportunities"
                         chartDescription="This is the total number of requests for digital services or specialists published by government buyers in the Digital Marketplace."
                         chartUpdatedDate="2017-02-01T23:11:18.675Z"
                         _singleCategory={false}
                         _singleSection={true}
                         series={[
                           {"name":"Total opportunities","units":"i","data":[null,null,13,29,42,58,74],"color":"#4e9774"}
                         ]}
                         xAxis={[
                           {"categories":["Jul '16","Aug '16","Sep '16","Oct '16","Nov '16","Dec '16","Jan '17"]}
                         ]}
                        yAxis={[
                          {"title":{"text":""},"min":[]}
                         ]}
                         displayHighContrast={hcState}
                         viewport="sm" />

        <CountWithTrendWidget tooltipAnchorTo="#dashboard-notes"
                              units="%"
                              viewport="sm"
                              _type="kpi-count"
                              _coordinatesType="cartesian"
                              _isKpi={true}
                              chartTitle="User satisfaction"
                              chartDescription="Overall satisfaction score includes all ratings weighted from 100% for very satisfied to 0% for very dissatisfied"
                              chartUpdatedDate="2016-11-09T01:01:01.111Z"
                              _singleCategory={false}
                              _singleSection={true}
                              series={[
                                {"name":"User satisfaction","units":"%","data":[94,97],"color":"#cf7e33"}
                              ]}
                              xAxis={[
                                {"categories":["Sep '16","Oct '16"]}
                              ]}
                              yAxis={[
                                {"title":{"text":""},"floor":0,"ceiling":100,"min":0,"max":100}
                              ]} />

      </div>
    )
  }
}

render(
  <App />, document.getElementById('root')
);
