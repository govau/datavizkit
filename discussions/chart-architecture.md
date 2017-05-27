
# Architecture for building Chart 

## Requirements

* composable
* modular
* clean separation of concerns, should not invoke Highcharts more than once as Highcharts is not modular
* ability to swap out Highcharts at any point

[insert discussion]


todo - show evidence of how this sets us up to enable change 

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

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
          <div ref={el => this.el = el} />
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
      <span className="chart">{children}</span>
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


will render in this order:
render SparklineWidget
render withHighcharts
render withSparkline
render SparklineChart


render SparklineWidget
constructor withHighcharts
render withHighcharts
constructor withSparkline
render withSparkline
render SparklineChart
