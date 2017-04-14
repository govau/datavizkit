// http://api.highcharts.com/highcharts/series<column>.data
// http://api.highcharts.com/highcharts/series<pie>.data

/**

 Data can be in the form:

 data: [0, 5, 3, 5]

 * interpreted as y options


 Or (not pie):

 data: [
   [0, 6],
   [1, 2],
   [2, 6]
 ]

   * [x,y] or ['name', y]


 Or:

 data: [{
    x: 1,
    y: 1,
    name: "Point2",
    color: "#00FF00"
  }, {
    x: 1,
    y: 7,
    name: "Point1",
    color: "#FF00FF"
  }]

 * named values
 * objects are point configuration objects

 */
