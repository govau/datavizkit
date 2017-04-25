
import React, {Component} from 'react';
import {render} from 'react-dom';

import ColumnWidget from './components/columnWidget/columnWidget.js';
import LineWidget from './components/lineWidget/lineWidget.js';
import SparklineWidget from './components/sparklineWidget/sparklineWidget.js';
import DonutWidget from './components/donutWidget/donutWidget.js';
import StackedColumnWidget from './components/stackedColumnWidget/stackedColumnWidget.js';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hcState: false,
    }
  }
  render() {
    const {hcState} = this.state;
    console.log(hcState)
    return (
      <div>
        <div aria-hidden="true" className="patterns">
          <svg height="10" width="10" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <defs>
              {/*<pattern id="null-data-layer" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11" stroke="grey" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              <pattern id="null-data-layer" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9" stroke="#ddd" strokeWidth="2"></path>
              </pattern>
              {/*<pattern id="high-contrast-pattern-2" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 3 0 L 3 10 M 8 0 L 8 10" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              {/*<pattern id="high-contrast-pattern-3" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 0 3 L 10 3 M 0 8 L 10 8" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              {/*<pattern id="high-contrast-pattern-4" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              {/*<pattern id="high-contrast-pattern-5" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 3 3 L 8 3 L 8 8 L 3 8 Z" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              {/*<pattern id="high-contrast-pattern-6" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              {/*<pattern id="high-contrast-pattern-7" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              {/*<pattern id="high-contrast-pattern-8" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 2 5 L 5 2 L 8 5 L 5 8 Z" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
              {/*<pattern id="high-contrast-pattern-9" patternUnits="userSpaceOnUse" width="10" height="10">*/}
              {/*<path d="M 0 0 L 5 10 L 10 0" stroke="currentColor" strokeWidth="2"></path>*/}
              {/*</pattern>*/}
            </defs>
          </svg>
        </div>

        <button onClick={() => {
          this.setState({hcState: !this.state.hcState})
        }}>Toggle high contrast</button>


        {/*<SparklineWidget chartConfig={{"xAxis":{*/}
        {/*"categories":["Jul","Aug","Sep","Oct","Nov","Dec","Jan"]*/}
        {/*},*/}
        {/*"series":[*/}
        {/*{"name":"Total opportunities","data":[null,null,13,29,42,58,74]}*/}
        {/*]*/}
        {/*}} title="Total opportunities"*/}
        {/*units="number"*/}
        {/*type="sparkline"*/}
        {/*dateLastUpdated="2017-02-01T23:11:18.675Z"*/}
        {/*_singleCategory={false}*/}
        {/*_singleSection={true}*/}
        {/*minimumValue="13" />*/}

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
          displayHighContrast={hcState}
        />

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

        <DonutWidget chartConfig={{"series":[{
          name: "Jan",
          data: [
            {"name":"Girls","y":183},
            {"name":"Guys","y":30},
          ]
          }]
          }} title="People used"
          units="percentage"
          type="donut"
          dateLastUpdated="2017-02-01T01:02:02.240Z"
          _singleCategory={true}
          _singleSection={false}
          minimumValue="30"
          displayHighContrast={hcState} />

        {/*<LineWidget title='Number of page views'*/}
        {/*units='number'*/}
        {/*type='column'*/}
        {/*dateLastUpdated='22 Feb 2016'*/}
        {/*minimumValue="20000"*/}
        {/*chartConfig={{*/}
        {/*"xAxis":{*/}
        {/*"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]*/}
        {/*},*/}
        {/*"series":[*/}
        {/*{"name":"Time to clear","data":[84807,48317,51420,62400,48060,37560,39300]}*/}
        {/*]*/}
        {/*}}*/}
        {/*singleCategory={false}*/}
        {/*singleSection={true}*/}
        {/*displayHighContrast={hcState} />*/}


        <ColumnWidget title='Number of page views'
                      units='number'
                      type='column'
                      dateLastUpdated='22 Feb 2016'
                      infoText="Something amazing about this widget."
                      minimumValue="20000"
                      chartConfig={{"xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]},"series":[{"name":"Time to clear","data":[84807,null,null,62400,null,37560,39300]}]}}
                      _singleCategory={false}
                      _singleSection={true}
                      displayHighContrast={hcState} />

        <ColumnWidget title='Boo of page views'
                      units='number'
                      type='column'
                      dateLastUpdated='22 Feb 2016'
                      infoText="Something amazing about this widget."
                      minimumValue="8000"
                      chartConfig={{"xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]},"series":[{"name":"Time to clear","data":[84807,62400,null,37560,39300,8000,null]}]}}
                      _singleCategory={false}
                      _singleSection={true}
                      displayHighContrast={hcState} />


      </div>
    )
  }
}

render(
  <App />, document.getElementById('root')
);
