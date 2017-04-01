

/*

 todo

 * can have a pattern for high contrast mode
 * guard against sectors that are too small. if i have more than said number of items, combine smallest ones in to an "Other" sector - enforce by a data transformation step
 * can display units


 */


import React, {PureComponent} from 'react';
import Emitter from 'tiny-emitter';

import renderChart from './donut_chart';


const emitter = new Emitter();

/**
 * Renders a Donut and manages its surrounding state
 */
class DonutWidget extends PureComponent {

  constructor(props) {
    super(props);
    this.chartEl = null;

    emitter.on('set:state', this.manualSetState.bind(this, arguments));

    this.state = {
      fauxLegend: []
    };
  }

  componentDidMount() {
    if (this.chartEl === null) {
      throw new Error('Must provide a chart element');
    }
    renderChart({
      domNode: this.chartEl,
      onRender: function(e, target, type) {
        const decoratedData = this.series[0].data;  // pie only has 1 slice
        const fauxLegend = decoratedData.map(d => {
          return {
            color: d.color,
            key: d.name,
            value: d.y
          }
        });
        emitter.emit('set:state', {'fauxLegend': fauxLegend});
      }
    });
  }

  manualSetState(self, stateToSet) {
    // todo  set on next tick
    this.setState(stateToSet);
  }

  render() {
    const {widget: {title, dateUpdated}} = this.props;
    const {fauxLegend} = this.state;
    const datetimeUpdate = new Date(dateUpdated).toJSON();

    const chartType = 'pie';

    return (
      <article className={`chart--${chartType}`} role="article">
        <header>
          <h1>{title}</h1>
          <span>Last updated <time dateTime={datetimeUpdate}>{dateUpdated}</time></span>
          {/*<span>What is this?</span>*/}
        </header>
        <section>
          <div ref={el => this.chartEl = el} />
          {fauxLegend.length && <div className="legend">
            <table>
              <tbody>
              {fauxLegend.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <svg width="12" height="12">
                      <g className="legend--icon">
                        {item.color && <rect x="0" y="0" width="12" height="12" fill={item.color} visibility="visible" rx="6" ry="6"></rect>}
                      </g>
                    </svg>
                    <span className="legend--data-name">{item.key}</span>
                  </td>
                  <td>{item.value}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>}
        </section>
      </article>
    )
  }
}

export default DonutWidget;

