//
// import isArray from 'lodash/isArray';
// import isObject from 'lodash/isObject';
// import has from 'lodash/has';
// import requirablePropType from './requirablePropType';
//
//
// export const validSeriesData = requirablePropType((props, propName, componentName) => {
//   const value = props[propName];
//
//   if (isArray(value)) {
//     const level2 = value[0];
//     if (isArray(level2)) {
//       if (!!level2[0] === false) {
//         return new Error(`${componentName} requires that you supply at least one value to ${propName}.`);
//       }
//     }
//     if (isObject(level2)) {
//       if (has(level2, ['x', 'y']) === false) {
//         return new Error(`${componentName} requires that if ${propName} supplied using object syntax that you must provide "x" and "y" values.`);
//       }
//     }
//   }
//
//   if (isObject(value)) {
//     return new Error(`${componentName} requires that ${propName} be an Array`);
//   }
// });
