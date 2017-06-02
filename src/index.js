
import React, {Component} from 'react';
import {render} from 'react-dom';

import {HighcontrastPatterns} from './components/withHighcharts';
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
        <HighcontrastPatterns />

        <button onClick={() => {this.setState({hcState: !this.state.hcState})}}>Toggle high contrast</button>


        <DonutWidget series={[
                        {name:"Jan",
                          data:[
                            {name:"Mobile",y:183},{name:"Tablet",y:30},{name:"Desktop",y:200}
                          ]}
                      ]}
                     title="Devices used"
                     type="donut"
                     dateLastUpdated="2017-02-01T01:02:02.240Z"
                     _singleCategory={true}
                     _singleSection={false}
                     minimumValue="30"
                     displayHighContrast={hcState} />


        <StackedColumnWidget
          xAxis={{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan"]}}
          series={[
            //{"name":"Public Beta", color:'red', "data":[0,0,2,2,2,2,2,2,2]},
            //{"name":"Pre Beta", color: 'url(#highcontrast-pattern-0)', "data":[0,0,1,3,3,3,3,3,3]},
            {"name":"Public Beta", "data":[0,0,2,2,2,2,2,2,2]},
            {"name":"Pre Beta", "data":[0,0,1,3,3,3,3,3,3]},
            {"name":"Non-transformational","data":[1,1,1,1,1,1,1,1,1]},
            {"name":"Other","data":[0,0,0,0,0,0,0,0,0]}
          ]}
          title="Types of service"
          type="stackedColumn"
          dateLastUpdated="2017-02-01T01:02:02.240Z"
          _singleCategory={false}
          _singleSection={false}
          stackingType="normal"
          displayHighContrast={hcState} />


        <HeroWidget
          title=""
          dateLastUpdated='23 Mar 2017'
          xAxis={{categories:["Aug","Sep","Oct","Nov","Dec","Jan","Feb"]}}
          yAxis={[{title:{text:"Percentage"}, max:100},{title:{text:"AUSD"},opposite:!0}]}
          series={[
            {name:"User satisfaction",units:"percentage",data:[null,null,45,22,18,12,38]},
            {name:"Cost per transaction",units:"money",yAxis:1,data:[null,578,442,80,27,25,24]},
            {name:"Digital take-up",units:"percentage",data:[0,0,10,12,22,27,38]},
            {name:"Completion rate",units:"percentage",data:[38,39,40,41,null,47,45]}
          ]}
          _singleCategory={true}
          _singleSection={false}
          displayHighContrast={hcState} />


        <LineWidget title='Number of page views'
                    type='column'
                    dateLastUpdated='22 Feb 2016'
                    minimumValue="20000"
                    _singleCategory={false}
                    _singleSection={false}
                    yAxis={[
                      {"title":{"text":"Percentage (%)"},"opposite":false,"floor":0,"ceiling":100,"min":0,"max":100}
                    ]}
                    xAxis={{"categories":["Nov '15","Dec '15","Jan '16","Feb '16","Mar '16","Apr '16","May '16","Jun '16","Jul '16","Aug '16","Sep '16","Oct '16","Nov '16"]}}
                    series={[
                      {"name":"1 service","units":"%","data":[59.56,59.21,58.72,58.24,57.84,57.42,56.98,56.5,55.83,55.33,54.9,54.5,54.1],"yAxis":0},
                      {"name":"2 services","units":"%","data":[24.55,24.7,24.9,25.09,25.23,25.38,25.52,25.64,25.71,25.77,25.8,25.9,26.02],"yAxis":0},
                      {"name":"3 services","units":"%","data":[11.19,11.31,11.48,11.64,11.79,11.94,12.11,12.28,12.58,12.8,13,13.1,13.27],"yAxis":0},
                      {"name":"4 services","units":"%","data":[3.69,3.74,3.81,3.89,3.97,4.05,4.14,4.25,4.46,4.61,4.7,4.8,4.94],"yAxis":0},
                      {"name":"5+ services","units":"%","data":[1.02,1.05,1.09,1.13,1.18,1.22,1.25,1.32,1.43,1.5,1.6,1.6,1.67],"yAxis":0}
                    ]}
                    displayHighContrast={hcState} />



        <button onClick={() => {this.setState({series: series1})}}>Select series 1</button>
        <button onClick={() => {this.setState({series: series2})}}>Select series 2</button>

        <ColumnWidget title='Number of page views'
                      type='column'
                      dateLastUpdated='22 Feb 2016'
                      infoText="Something amazing about this widget."
                      minimumValue="20000"
                      xAxis={{categories:["May","Jun","Jul","Aug","Sep","Oct","Nov"]}}
                      series={this.state.series}
                      _singleCategory={false}
                      _singleSection={true}
                      displayHighContrast={hcState} />



        <div>

          <SparklineWidget title="Total opportunities"
                            type="sparkline"
                            dateLastUpdated="2017-02-01T23:11:18.675Z"
                            _singleCategory={false}
                            _singleSection={true}
                            minimumValue="13"
                            series={this.state.series}
                            xAxis={{"categories":["Jul","Aug","Sep","Oct","Nov","Dec","Jan"]}} />
        </div>




        <div>
          <div style={{marginBottom: '1em', width: '300px',  display:'inline-block', float:'left'}}>
            <CountWithTrendWidget title="User satisfaction"
              infoText="Overall satisfaction score includes all ratings weighted from 100% for very satisfied, to 0% for very dissatisfied"
                                  units="%"
                                  _unitsType="percentage"
                                  idxInWidgets="0"
                                  value="8"
                                  trendValue="100"
                                  trendDate="2016-10-31T00:00:00Z" />
          </div>

          <div style={{marginBottom: '1em', width: '300px', display:'inline-block'}}>
            <CountWithTrendWidget title="Cost per transaction"
                                  infoText={null}
                                  units="$"
                                  _unitsType="money"
                                  idxInWidgets="1"
                                  value=""
                                  trendValue=""
                                  trendDate="2016-10-31T00:00:00Z" />
          </div>
        </div>



        <CountWithTrendWidget title="Digital take-up"
                              infoText={null}
                              units="%"
                              idxInWidgets="2"
                              value="92"
                              trendValue="1.09"
                              trendDate="2016-10-31T00:00:00Z" />

        <CountWithTrendWidget title="Completion rate"
                              infoText="Percentage of transactions made using the digital service."
                              units="%"
                              idxInWidgets="3"
                              value=""
                              trendValue=""
                              trendDate="2016-10-31T00:00:00Z" />

      </div>
    )
  }
}

render(
  <App />, document.getElementById('root')
);
