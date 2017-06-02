
import {PureComponent} from 'react';
import isObject from 'lodash/isObject';


class hasStaticProps extends PureComponent {
  constructor(props) {
    super(props);
    this.static = new Map();
    this.getStatic = this.getStatic.bind(this);
    this.setStatic = this.setStatic.bind(this);
  }
  getStatic(key) {
    return this.static.get(key);
  }
  setStatic(keyValues) {
    if (__DEV__) {
      if (!isObject(keyValues)) {
        throw new Error('keyValues supplied to setStatic must be an object');
      }
    }
    for (const key in keyValues) {
      this.static.set(key, keyValues[key]);
    }
    // hydrate static state
    this.forceUpdate();
  }
}

export default hasStaticProps;
