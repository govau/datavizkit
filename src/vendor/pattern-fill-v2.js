/**
 * Highcharts pattern fill plugin
 *
 * Version         3.0.0
 * Author:         Torstein Honsi
 *                 Stephane Vanraes
 * Last revision:  2016-10-05
 * License:        MIT License
 *
 * Remark:         The latest version is not compatible with earlier versions.
 *
 * Usage:          Add a 'defs' object to the options
 *                 Create a 'patterns' array under 'defs'
 *                 Each item in this array represents a pattern
 *                 To use a pattern, set the color to `url(#id-of-pattern)'
 *
 * Options for the patterns:
 * - id:           The id for the pattern, defaults to highcharts-pattern-# with # an increasing number for each pattern without id
 * - width:        The width of the pattern, defaults to 10
 * - height:       The height of the pattern, defaults to 10
 * - opacity       A general opacity for the pattern
 * - path:         In SVG, the path for the pattern
 *                 (Note: this can be a string with only a path, or an object with d, stroke, strokeWidth and fill)
 * - image:        An image source for the pattern
 * - color:        A color to be used instead of a path
 *
 * Notes:          VML does not support the path setting
 *                 If all other fills fail (no path, image or color) the pattern will return #A0A0A0 as a color
 *                 Several patterns have been predefined, called highcharts-default-pattern-# (numbered 0-9)
 */

/*global Highcharts, document */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function (Highcharts, options) {

  const {
    fillTypes,
    fillNamespace
  } = options;
debugger
    'use strict';

    var idCounter = 0,
        wrap = Highcharts.wrap,
        each = Highcharts.each;

    /**
     * Exposed method to add a pattern to the renderer.
     */
    Highcharts.SVGRenderer.prototype.addPattern = function (id, options) {

        var pattern,
            path,
            w = options.width || 10,
            h = options.height || 10,
            ren = this;

        /**
         * Add a rectangle for solid color
         */
        function rect (fill) {
            ren.rect(0, 0, w, h)
                .attr({
                    fill: fill
                })
                .add(pattern);
        }

        if (!id) {
            id = 'highcharts-pattern-' + idCounter;
            idCounter += 1;
        }

        pattern = this.createElement('pattern').attr({
            id: id,
            patternUnits: 'userSpaceOnUse',
            width: options.width || 10,
            height: options.height || 10
        }).add(this.defs);

        // Get id
        pattern.id = pattern.element.id;

        // Use an SVG path for the pattern
        if (options.path) {

            path = options.path;

            // The background
            if (path.fill) {
                rect(path.fill);
            }

            // console.log(path.stroke || options.color || '#343434');

          // debugger
            // The pattern
            this.createElement('path').attr({
                'd': path.d || path,
                'stroke': path.stroke || options.color || '#343434',
                // 'stroke': options.color || '#343434',
                'stroke-width': path.strokeWidth || 2
            }).add(pattern);
            pattern.color = options.color;

        // Image pattern
        } else if (options.image) {

            this.image(options.image, 0, 0, options.width, options.height).add(pattern);

        // A solid color
        } else if (options.color) {

            rect(options.color);

        }

        if (options.opacity !== undefined) {
            each(pattern.element.children, function (child) {
                child.setAttribute('opacity', options.opacity);
            });
        }

        return pattern;
    };

    if (Highcharts.VMLElement) {

      throw new Error('This fork does not support VML.')

    }

    /**
     * Add the predefined patterns
     */
    function addPredefinedPatterns(renderer) {

        var colors = Highcharts.getOptions().colors;

      const namespace = fillNamespace || 'highcharts-default-pattern';

      const _patterns = [
        'M 0 0 L 10 10 M 9 -1 L 11 1 M -1 9 L 1 11',
        'M 0 10 L 10 0 M -1 1 L 1 -1 M 9 11 L 11 9',
        'M 3 0 L 3 10 M 8 0 L 8 10',
        'M 0 3 L 10 3 M 0 8 L 10 8',
        'M 0 3 L 5 3 L 5 0 M 5 10 L 5 7 L 10 7',
        'M 3 3 L 8 3 L 8 8 L 3 8 Z',
        'M 5 5 m -4 0 a 4 4 0 1 1 8 0 a 4 4 0 1 1 -8 0',
        'M 10 3 L 5 3 L 5 0 M 5 10 L 5 7 L 0 7',
        'M 2 5 L 5 2 L 8 5 L 5 8 Z',
        'M 0 0 L 5 10 L 10 0'
      ];
        each(fillTypes, function (id, i) {
            renderer.addPattern(`${namespace}-` + i, {
                path: _patterns[id],
                color: colors[i],
            });
        });
    }

    // Add patterns to the defs element
    wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {

        proceed.apply(this);

        var chart = this,
            renderer = chart.renderer,
            options = chart.options,
            patterns = options.defs && options.defs.patterns;

        // First add default patterns
        addPredefinedPatterns(renderer);

        // Add user defined patterns
        if (patterns) {
            each(patterns, function (pattern) {
                renderer.addPattern(pattern.id, pattern);
            });
        }

    });

}));
