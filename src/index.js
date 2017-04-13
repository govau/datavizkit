
import React from 'react';
import {render} from 'react-dom';


import ColumnWidget from './components/widgets/column'
import DonutWidget from './components/widgets/donut'
import LineWidget from './components/widgets/line';
import StackedColumnWidget from './components/widgets/stackedColumn'
import SparklineWidget from './components/widgets/sparkline'


const lineWidget = {
  title: 'Average session length',
  dateUpdated: '22 Feb 2016',
};

const donutWidget = {
  title: 'Devices used',
  dateUpdated: '22 Feb 2016',
};

const stackedColumnWidgetNormal = {
  title: 'Page views by state (normal stacking)',
  dateUpdated: '22 Feb 2016'
};

const stackedColumnWidgetPercentage = {
  title: 'Page views by state (percentage stacking)',
  dateUpdated: '22 Feb 2016',
  stacking: 'percent'
};

const splineWidget = {
  title: 'Approved suppliers',
  dateUpdated: '16 Mar 2017',
  previousDate: 'Jan 2017'
};

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


    <LineWidget widget={lineWidget} />
    <br/>

    <ColumnWidget title='Number of page views'
                  units='number'
                  type='column'
                  dateLastUpdated='22 Feb 2016'
                  minimumValue="20000"
                  chartConfig={{"xAxis":{"categories":["May","Jun","Jul","Aug","Sep","Oct","Nov"]},"series":[{"name":"Time to clear","data":[84807,48317,51420,62400,48060,37560,39300]}]}}
                  singleCategory={false} singleSection={true} />

    <br/>

    <DonutWidget widget={donutWidget} />
    <br />

    <StackedColumnWidget widget={stackedColumnWidgetNormal} />
    <br />

    <StackedColumnWidget widget={stackedColumnWidgetPercentage} />
    <br/>

    <SparklineWidget widget={splineWidget} />
    <br/>

  </div>, document.getElementById('root')
);

