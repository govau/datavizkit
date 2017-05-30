
# Architecture for building Chart 

## Requirements

* Composable and modular

Maintain the ability to swap out any _component_ including Highcharts at any point. 
The library should be able to support a Highcharts ecosystem to coexist with another 
charting framework provider including another version of Highcharts, allowing ease 
in future migration.


* Cleanly separated concerns

Components should implement simple and sensible interfaces, encapsulating primitives 
and underlying implementation details.

Specifically with regards to the Highcharts library, as it's not modular in nature, 
ensure that we maintain a singular reference to use of Highcharts globals.



# High level structure

## Widget composition

1. Highcharts as charting mechanism - withHighcharts 
2. Highcharts.chart rendering - withSparkline
3. Datavizkit Chart rendering (include other requirements not provided by Highcharts) - SparklineChart
3. Datavizkit Widget - SparklineWidget

![Diagram]('./chart-architecture-composition.png').


```
import React, {PureComponent} from 'react';
import {compose} from 'recompose';


// Highcharts methods 
// methods that access Highcharts primitives
const withHighcharts = Composed => {
  return class extends PureComponent {
    render() {
      return <Composed {...this.props} />
    }
  }
};

// Sparkline methods
// methods uniquely needed by Sparklines
const withSparkline = Composed => {
  return class extends PureComponent {
    render() {
      return (
        <Composed {...this.props}>
          <div ref={el => this.el = el} />  // will become "Chart"
        </Composed>
      );
    }
  }
};

// Rendering context to compose a "Sparkline Chart"  
// This composition should be standard, although many widgets can 
// render charts in different layouts
// owns things like legends
const SparklineChart = ({children}) => {
  return (
    <div>
      <span className="chart">{children}</span>   // transclude "Chart"
      <span>Legend</span>
    </div>
  )
};

const EnhancedSparklineChart = compose(
  withHighcharts,
  withSparkline
)(SparklineChart);



// Rendering context surrounding "Sparkline Chart" which displays
// a "Sparkline Widget" 
// Allows various layout derivatives to be possible, such as with
// title, without title.
// Owns things like tooltips, title
const SparklineWidget = () => {
  return (
    <div>
      <span>Title</span>
      <EnhancedSparklineChart />
    </div>
  )
};
```
