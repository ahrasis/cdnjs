/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * 
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 * 
 * @version 2.0.0-next.3
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else if(typeof define === 'function' && define.amd)
		define("stanford", ["d3-selection", "d3-interpolate", "d3-color", "d3-scale", "d3-brush", "d3-axis", "d3-format"], factory);
	else if(typeof exports === 'object')
		exports["stanford"] = factory(require("d3-selection"), require("d3-interpolate"), require("d3-color"), require("d3-scale"), require("d3-brush"), require("d3-axis"), require("d3-format"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["stanford"] = factory(root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"], root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__4__, __WEBPACK_EXTERNAL_MODULE__6__, __WEBPACK_EXTERNAL_MODULE__7__, __WEBPACK_EXTERNAL_MODULE__8__, __WEBPACK_EXTERNAL_MODULE__11__, __WEBPACK_EXTERNAL_MODULE__12__, __WEBPACK_EXTERNAL_MODULE__13__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 16);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _assertThisInitialized; });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__4__;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Plugin; });
/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Base class to generate billboard.js plugin
 * @class Plugin
 */

/**
 * Version info string for plugin
 * @name version
 * @static
 * @memberof Plugin
 * @type {string}
 * @example
 *   bb.plugin.stanford.version;  // ex) 1.9.0
 */
var Plugin = /*#__PURE__*/function () {
  /**
   * Constructor
   * @param {Any} options config option object
   * @private
   */
  function Plugin(options) {
    options === void 0 && (options = {}), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "$$", void 0), Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, "options", void 0), this.options = options;
  }
  /**
   * Lifecycle hook for 'beforeInit' phase.
   * @private
   */


  var _proto = Plugin.prototype;
  return _proto.$beforeInit = function $beforeInit() {}
  /**
   * Lifecycle hook for 'init' phase.
   * @private
   */
  , _proto.$init = function $init() {}
  /**
   * Lifecycle hook for 'afterInit' phase.
   * @private
   */
  , _proto.$afterInit = function $afterInit() {}
  /**
   * Lifecycle hook for 'redraw' phase.
   * @private
   */
  , _proto.$redraw = function $redraw() {}
  /**
   * Lifecycle hook for 'willDestroy' phase.
   * @private
   */
  , _proto.$willDestroy = function $willDestroy() {
    var _this = this;

    Object.keys(this).forEach(function (key) {
      _this[key] = null, delete _this[key];
    });
  }, Plugin;
}();

Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(Plugin, "version", "2.0.0-next.3");



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__6__;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__7__;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8__;

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  arc: "bb-arc",
  arcLabelLine: "bb-arc-label-line",
  arcs: "bb-arcs",
  area: "bb-area",
  areas: "bb-areas",
  axis: "bb-axis",
  axisX: "bb-axis-x",
  axisXLabel: "bb-axis-x-label",
  axisY: "bb-axis-y",
  axisY2: "bb-axis-y2",
  axisY2Label: "bb-axis-y2-label",
  axisYLabel: "bb-axis-y-label",
  bar: "bb-bar",
  bars: "bb-bars",
  brush: "bb-brush",
  button: "bb-button",
  buttonZoomReset: "bb-zoom-reset",
  chart: "bb-chart",
  chartArc: "bb-chart-arc",
  chartArcs: "bb-chart-arcs",
  chartArcsBackground: "bb-chart-arcs-background",
  chartArcsGaugeMax: "bb-chart-arcs-gauge-max",
  chartArcsGaugeMin: "bb-chart-arcs-gauge-min",
  chartArcsGaugeUnit: "bb-chart-arcs-gauge-unit",
  chartArcsTitle: "bb-chart-arcs-title",
  chartArcsGaugeTitle: "bb-chart-arcs-gauge-title",
  chartBar: "bb-chart-bar",
  chartBars: "bb-chart-bars",
  chartCircles: "bb-chart-circles",
  chartLine: "bb-chart-line",
  chartLines: "bb-chart-lines",
  chartRadar: "bb-chart-radar",
  chartRadars: "bb-chart-radars",
  chartText: "bb-chart-text",
  chartTexts: "bb-chart-texts",
  circle: "bb-circle",
  circles: "bb-circles",
  colorPattern: "bb-color-pattern",
  colorScale: "bb-colorscale",
  defocused: "bb-defocused",
  dragarea: "bb-dragarea",
  empty: "bb-empty",
  eventRect: "bb-event-rect",
  eventRects: "bb-event-rects",
  eventRectsMultiple: "bb-event-rects-multiple",
  eventRectsSingle: "bb-event-rects-single",
  focused: "bb-focused",
  gaugeValue: "bb-gauge-value",
  grid: "bb-grid",
  gridLines: "bb-grid-lines",
  legend: "bb-legend",
  legendBackground: "bb-legend-background",
  legendItem: "bb-legend-item",
  legendItemEvent: "bb-legend-item-event",
  legendItemFocused: "bb-legend-item-focused",
  legendItemHidden: "bb-legend-item-hidden",
  legendItemPoint: "bb-legend-item-point",
  legendItemTile: "bb-legend-item-tile",
  level: "bb-level",
  levels: "bb-levels",
  line: "bb-line",
  lines: "bb-lines",
  main: "bb-main",
  region: "bb-region",
  regions: "bb-regions",
  selectedCircle: "bb-selected-circle",
  selectedCircles: "bb-selected-circles",
  shape: "bb-shape",
  shapes: "bb-shapes",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions",
  target: "bb-target",
  text: "bb-text",
  texts: "bb-texts",
  title: "bb-title",
  tooltip: "bb-tooltip",
  tooltipContainer: "bb-tooltip-container",
  tooltipName: "bb-tooltip-name",
  xgrid: "bb-xgrid",
  xgridFocus: "bb-xgrid-focus",
  xgridLine: "bb-xgrid-line",
  xgridLines: "bb-xgrid-lines",
  xgrids: "bb-xgrids",
  ygrid: "bb-ygrid",
  ygridFocus: "bb-ygrid-focus",
  ygridLine: "bb-ygrid-line",
  ygridLines: "bb-ygrid-lines",
  ygrids: "bb-ygrids",
  zoomBrush: "bb-zoom-brush",
  zoomRect: "bb-zoom-rect",
  EXPANDED: "_expanded_",
  SELECTED: "_selected_",
  INCLUDED: "_included_",
  TextOverlapping: "text-overlapping"
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return loadConfig; });
/* harmony import */ var _module_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */


/**
 * Load configuration option
 * @param {object} config User's generation config value
 * @private
 */
function loadConfig(config) {
  var target,
      keys,
      read,
      thisConfig = this.config,
      find = function () {
    var key = keys.shift();
    return key && target && Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isObjectType */ "e"])(target) && key in target ? (target = target[key], find()) : key ? undefined : target;
  };

  Object.keys(thisConfig).forEach(function (key) {
    target = config, keys = key.split("_"), read = find(), Object(_module_util__WEBPACK_IMPORTED_MODULE_0__[/* isDefined */ "b"])(read) && (thisConfig[key] = read);
  });
}

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__11__;

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__12__;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__13__;

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ stanford_Stanford; });

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(1);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
var inheritsLoose = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-interpolate","commonjs2":"d3-interpolate","amd":"d3-interpolate","root":"d3"}
var external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_ = __webpack_require__(6);

// EXTERNAL MODULE: external {"commonjs":"d3-color","commonjs2":"d3-color","amd":"d3-color","root":"d3"}
var external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_ = __webpack_require__(7);

// EXTERNAL MODULE: external {"commonjs":"d3-scale","commonjs2":"d3-scale","amd":"d3-scale","root":"d3"}
var external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_ = __webpack_require__(8);

// EXTERNAL MODULE: ./src/config/classes.ts
var classes = __webpack_require__(9);

// EXTERNAL MODULE: ./src/config/config.ts
var config_config = __webpack_require__(10);

// EXTERNAL MODULE: ./src/Plugin/Plugin.ts
var Plugin = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Plugin/stanford/Options.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Stanford diagram plugin option class
 * @class StanfordOptions
 * @param {Options} options Stanford plugin options
 * @augments Plugin
 * @returns {StanfordOptions}
 * @private
 */
var Options = function () {
  return {
    /**
     * Set the color of the color scale. This function receives a value between 0 and 1, and should return a color.
     * @name colors
     * @memberof plugin-stanford
     * @type {Function}
     * @default undefined
     * @example
     *   colors: d3.interpolateHslLong(
     *      d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
     *   )
     */
    colors: undefined,

    /**
     * Specify the key of epochs values in the data.
     * @name epochs
     * @memberof plugin-stanford
     * @type {Array}
     * @default []
     * @example
     * 	epochs: [ 1, 1, 2, 2, ... ]
     */
    epochs: [],

    /**
     * Show additional lines anywhere on the chart.
     * - Each line object should consist with following options:
     *
     * | Key | Type | Description |
     * | --- | --- | --- |
     * | x1 | Number | Starting position on the x axis |
     * | y1 | Number | Starting position on the y axis |
     * | x2 | Number | Ending position on the x axis  |
     * | y2 | Number | Ending position on the y axis |
     * | class | String | Optional value. Set a custom css class to this line. |
     * @type {Array}
     * @memberof plugin-stanford
     * @default []
     * @example
     *   lines: [
     *       { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
     *       { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
     *   ]
     */
    lines: [],

    /**
     * Set scale values
     * @name scale
     * @memberof plugin-stanford
     * @type {object}
     * @property {object} [scale] scale object
     * @property {number} [scale.min=undefined] Minimum value of the color scale. Default: lowest value in epochs
     * @property {number} [scale.max=undefined] Maximum value of the color scale. Default: highest value in epochs
     * @property {number} [scale.width=20] Width of the color scale
     * @property {string|Function} [scale.format=undefined] Format of the axis of the color scale. Use 'pow10' to format as powers of 10 or a custom function. Example: d3.format("d")
     * @example
     *  scale: {
     *    max: 10000,
     *    min: 1,
     *    width: 500,
     *
     *    // specify 'pow10' to format as powers of 10
     *    format: "pow10",
     *
     *    // or specify a format function
     *    format: function(x) {
     *    	return x +"%";
     *    }
     *  },
     */
    scale_min: undefined,
    scale_max: undefined,
    scale_width: 20,
    scale_format: undefined,

    /**
     * The padding for color scale element
     * @name padding
     * @memberof plugin-stanford
     * @type {object}
     * @property {object} [padding] padding object
     * @property {number} [padding.top=0] Top padding value.
     * @property {number} [padding.right=0] Right padding value.
     * @property {number} [padding.bottom=0] Bottom padding value.
     * @property {number} [padding.left=0] Left padding value.
     * @example
     *  padding: {
     *     top: 15,
     *     right: 0,
     *     bottom: 0,
     *     left: 0
     *  },
     */
    padding_top: 0,
    padding_right: 0,
    padding_bottom: 0,
    padding_left: 0,

    /**
     * Show additional regions anywhere on the chart.
     * - Each region object should consist with following options:
     *
     *   | Key | Type | Default | Attributes | Description |
     *   | --- | --- | --- | --- | --- |
     *   | points | Array |  | | Accepts a group of objects that has x and y.<br>These points should be added in a counter-clockwise fashion to make a closed polygon. |
     *   | opacity | Number | `0.2` | &lt;optional> | Sets the opacity of the region as value between 0 and 1 |
     *   | text | Function |  | &lt;optional> | This function receives a value and percentage of the number of epochs in this region.<br>Return a string to place text in the middle of the region. |
     *   | class | String | | &lt;optional> | Se a custom css class to this region, use the fill property in css to set a background color. |
     * @name regions
     * @memberof plugin-stanford
     * @type {Array}
     * @default []
     * @example
     *   regions: [
     *       {
     *           points: [ // add points counter-clockwise
     *               { x: 0, y: 0 },
     *               { x: 40, y: 40 },
     *               { x: 0, y: 40 },
     *           ],
     *           text: function (value, percentage) {
     *               return `Normal Operations: ${value} (${percentage}%)`;
     *           },
     *           opacity: 0.2, // 0 to 1
     *           class: "test-polygon1"
     *       },
     *       ...
     *   ]
     */
    regions: []
  };
};


// CONCATENATED MODULE: ./src/Plugin/stanford/classes.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * CSS class names definition
 * @private
 */
/* harmony default export */ var stanford_classes = ({
  colorScale: "bb-colorscale",
  stanfordElements: "bb-stanford-elements",
  stanfordLine: "bb-stanford-line",
  stanfordLines: "bb-stanford-lines",
  stanfordRegion: "bb-stanford-region",
  stanfordRegions: "bb-stanford-regions"
});
// EXTERNAL MODULE: ./src/module/util.ts + 1 modules
var util = __webpack_require__(18);

// CONCATENATED MODULE: ./src/Plugin/stanford/util.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */

/**
 * Check if point is in region
 * @param {object} point Point
 * @param {Array} region Region
 * @returns {boolean}
 * @private
 */

function pointInRegion(point, region) {
  // thanks to: http://bl.ocks.org/bycoffe/5575904
  // ray-casting algorithm based on
  // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
  var x = point.x,
      y = point.value,
      inside = !1;

  for (var i = 0, j = region.length - 1; i < region.length; j = i++) {
    var xi = region[i].x,
        yi = region[i].y,
        xj = region[j].x,
        yj = region[j].y;
    yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi && (inside = !inside);
  }

  return inside;
}
/**
 * Compare epochs
 * @param {object} a Target
 * @param {object} b Source
 * @returns {number}
 * @private
 */


function compareEpochs(a, b) {
  return a.epochs < b.epochs ? -1 : a.epochs > b.epochs ? 1 : 0;
}
/**
 * Get region area
 * @param {Array} points Points
 * @returns {number}
 * @private
 */


function getRegionArea(points) {
  // thanks to: https://stackoverflow.com/questions/16282330/find-centerpoint-of-polygon-in-javascript
  for (var point1, point2, area = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) point1 = points[i], point2 = points[j], area += point1.x * point2.y, area -= point1.y * point2.x;

  return area /= 2, area;
}
/**
 * Get centroid
 * @param {Array} points Points
 * @returns {object}
 * @private
 */


function getCentroid(points) {
  for (var f, area = getRegionArea(points), x = 0, y = 0, i = 0, l = points.length, j = l - 1; i < l; j = i, i++) {
    var _point = points[i],
        _point2 = points[j];
    f = _point.x * _point2.y - _point2.x * _point.y, x += (_point.x + _point2.x) * f, y += (_point.y + _point2.y) * f;
  }

  return f = area * 6, {
    x: x / f,
    y: y / f
  };
}


// CONCATENATED MODULE: ./src/Plugin/stanford/Elements.ts


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck


/**
 * Stanford diagram plugin element class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */

var Elements_Elements = /*#__PURE__*/function () {
  function Elements(owner) {
    Object(defineProperty["a" /* default */])(this, "owner", void 0), this.owner = owner;
    // MEMO: Avoid blocking eventRect
    var elements = owner.$$.$el.main.select(".bb-chart").append("g").attr("class", stanford_classes.stanfordElements);
    elements.append("g").attr("class", stanford_classes.stanfordLines), elements.append("g").attr("class", stanford_classes.stanfordRegions);
  }

  var _proto = Elements.prototype;
  return _proto.updateStanfordLines = function updateStanfordLines(duration) {
    var $$ = this.owner.$$,
        config = $$.config,
        main = $$.$el.main,
        isRotated = config.axis_rotated,
        xvCustom = this.xvCustom.bind($$),
        yvCustom = this.yvCustom.bind($$),
        stanfordLine = main.select("." + stanford_classes.stanfordLines).style("shape-rendering", "geometricprecision").selectAll("." + stanford_classes.stanfordLine).data(this.owner.config.lines);
    stanfordLine.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var stanfordLineEnter = stanfordLine.enter().append("g");
    stanfordLineEnter.append("line").style("opacity", "0"), stanfordLineEnter.merge(stanfordLine).attr("class", function (d) {
      return stanford_classes.stanfordLine + (d.class ? " " + d.class : "");
    }).select("line").transition().duration(duration).attr("x1", function (d) {
      return isRotated ? yvCustom(d, "y1") : xvCustom(d, "x1");
    }).attr("x2", function (d) {
      return isRotated ? yvCustom(d, "y2") : xvCustom(d, "x2");
    }).attr("y1", function (d) {
      return isRotated ? xvCustom(d, "x1") : yvCustom(d, "y1");
    }).attr("y2", function (d) {
      return isRotated ? xvCustom(d, "x2") : yvCustom(d, "y2");
    }).transition().style("opacity", "1");
  }, _proto.updateStanfordRegions = function updateStanfordRegions(duration) {
    var $$ = this.owner.$$,
        config = $$.config,
        main = $$.$el.main,
        isRotated = config.axis_rotated,
        xvCustom = this.xvCustom.bind($$),
        yvCustom = this.yvCustom.bind($$),
        countPointsInRegion = this.owner.countEpochsInRegion.bind($$),
        stanfordRegion = main.select("." + stanford_classes.stanfordRegions).selectAll("." + stanford_classes.stanfordRegion).data(this.owner.config.regions);
    stanfordRegion.exit().transition().duration(duration).style("opacity", "0").remove();
    // enter
    var stanfordRegionEnter = stanfordRegion.enter().append("g");
    stanfordRegionEnter.append("polygon").style("opacity", "0"), stanfordRegionEnter.append("text").attr("transform", isRotated ? "rotate(-90)" : "").style("opacity", "0"), stanfordRegion = stanfordRegionEnter.merge(stanfordRegion), stanfordRegion.attr("class", function (d) {
      return stanford_classes.stanfordRegion + (d.class ? " " + d.class : "");
    }).select("polygon").transition().duration(duration).attr("points", function (d) {
      return d.points.map(function (value) {
        return [isRotated ? yvCustom(value, "y") : xvCustom(value, "x"), isRotated ? xvCustom(value, "x") : yvCustom(value, "y")].join(",");
      }).join(" ");
    }).transition().style("opacity", function (d) {
      return (d.opacity ? d.opacity : .2) + "";
    }), stanfordRegion.select("text").transition().duration(duration).attr("x", function (d) {
      return isRotated ? yvCustom(getCentroid(d.points), "y") : xvCustom(getCentroid(d.points), "x");
    }).attr("y", function (d) {
      return isRotated ? xvCustom(getCentroid(d.points), "x") : yvCustom(getCentroid(d.points), "y");
    }).text(function (d) {
      if (d.text) {
        var _countPointsInRegion = countPointsInRegion(d.points),
            value = _countPointsInRegion.value,
            percentage = _countPointsInRegion.percentage;

        return d.text(value, percentage);
      }

      return "";
    }).attr("text-anchor", "middle").attr("dominant-baseline", "middle").transition().style("opacity", "1");
  }, _proto.updateStanfordElements = function updateStanfordElements(duration) {
    duration === void 0 && (duration = 0), this.updateStanfordLines(duration), this.updateStanfordRegions(duration);
  }, _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return axis.isTimeSeries() ? value = util["g" /* parseDate */].call($$, value) : axis.isCategorized() && Object(util["f" /* isString */])(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        yScale = d.axis && d.axis === "y2" ? $$.scale.y2 : $$.scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, Elements;
}();


// EXTERNAL MODULE: external {"commonjs":"d3-axis","commonjs2":"d3-axis","amd":"d3-axis","root":"d3"}
var external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_ = __webpack_require__(12);

// EXTERNAL MODULE: external {"commonjs":"d3-format","commonjs2":"d3-format","amd":"d3-format","root":"d3"}
var external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_ = __webpack_require__(13);

// CONCATENATED MODULE: ./src/Plugin/stanford/ColorScale.ts


/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */





/**
 * Stanford diagram plugin color scale class
 * @class ColorScale
 * @param {Stanford} owner Stanford instance
 * @private
 */

var ColorScale_ColorScale = /*#__PURE__*/function () {
  function ColorScale(owner) {
    Object(defineProperty["a" /* default */])(this, "owner", void 0), Object(defineProperty["a" /* default */])(this, "colorScale", void 0), this.owner = owner;
  }

  var _proto = ColorScale.prototype;
  return _proto.drawColorScale = function drawColorScale() {
    var _this$owner = this.owner,
        $$ = _this$owner.$$,
        config = _this$owner.config,
        target = $$.data.targets[0],
        height = $$.state.height - config.padding_bottom - config.padding_top,
        barWidth = config.scale_width,
        barHeight = 5,
        points = Object(util["a" /* getRange */])(config.padding_bottom, height, barHeight),
        inverseScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequential"])(target.colors).domain([points[points.length - 1], points[0]]);
    this.colorScale && this.colorScale.remove(), this.colorScale = $$.$el.svg.append("g").attr("width", 50).attr("height", height).attr("class", stanford_classes.colorScale), this.colorScale.append("g").attr("transform", "translate(0, " + config.padding_top + ")").selectAll("bars").data(points).enter().append("rect").attr("y", function (d, i) {
      return i * barHeight;
    }).attr("x", 0).attr("width", barWidth).attr("height", barHeight).attr("fill", function (d) {
      return inverseScale(d);
    });
    // Legend Axis
    var axisScale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleLog"])().domain([target.minEpochs, target.maxEpochs]).range([points[0] + config.padding_top + points[points.length - 1] + barHeight - 1, points[0] + config.padding_top]),
        legendAxis = Object(external_commonjs_d3_axis_commonjs2_d3_axis_amd_d3_axis_root_d3_["axisRight"])(axisScale),
        scaleFormat = config.scale_format;
    scaleFormat === "pow10" ? legendAxis.tickValues([1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7]) : Object(util["d" /* isFunction */])(scaleFormat) ? legendAxis.tickFormat(scaleFormat) : legendAxis.tickFormat(Object(external_commonjs_d3_format_commonjs2_d3_format_amd_d3_format_root_d3_["format"])("d"));
    // Draw Axis
    var axis = this.colorScale.append("g").attr("class", "legend axis").attr("transform", "translate(" + barWidth + ",0)").call(legendAxis);
    scaleFormat === "pow10" && axis.selectAll(".tick text").text(null).filter(function (d) {
      return d / Math.pow(10, Math.ceil(Math.log(d) / Math.LN10 - 1e-12)) === 1;
    }) // Power of Ten
    .text(10).append("tspan").attr("dy", "-.7em") // https://bl.ocks.org/mbostock/6738229
    .text(function (d) {
      return Math.round(Math.log(d) / Math.LN10);
    }), this.colorScale.attr("transform", "translate(" + ($$.state.current.width - this.xForColorScale()) + ", 0)");
  }, _proto.xForColorScale = function xForColorScale() {
    return this.owner.config.padding_right + this.colorScale.node().getBBox().width;
  }, _proto.getColorScalePadding = function getColorScalePadding() {
    return this.xForColorScale() + this.owner.config.padding_left + 20;
  }, ColorScale;
}();


// CONCATENATED MODULE: ./src/Plugin/stanford/index.ts




/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
// @ts-nocheck










/**
 * Stanford diagram plugin
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 *   - Is preferable use `scatter` as data.type
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 *   - [d3-interpolate](https://github.com/d3/d3-interpolate)
 *   - [d3-color](https://github.com/d3/d3-color)
 *   - [d3-scale](https://github.com/d3/d3-scale)
 *   - [d3-brush](https://github.com/d3/d3-brush)
 *   - [d3-axis](https://github.com/d3/d3-axis)
 *   - [d3-format](https://github.com/d3/d3-format)
 * @class plugin-stanford
 * @requires d3-selection
 * @requires d3-interpolate
 * @requires d3-color
 * @requires d3-scale
 * @requires d3-brush
 * @requires d3-axis
 * @requires d3-format
 * @param {object} options Stanford plugin options
 * @augments Plugin
 * @returns {Stanford}
 * @example
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "scatter"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.stanford({
 *           colors: d3.interpolateHslLong(
 *              d3.hsl(250, 1, 0.5), d3.hsl(0, 1, 0.5)
 *           ),
 *           epochs: [ 1, 1, 2, 2, ... ],
 *           lines: [
 *                  { x1: 0, y1: 0, x2: 65, y2: 65, class: "line1" },
 *                  { x1: 0, x2: 65, y1: 40, y2: 40, class: "line2" }
 *           ],
 *           scale: {
 *           	max: 10000,
 *             	min: 1,
 *           	width: 500,
 *             	format: 'pow10',
 *           },
 *           padding: {
 *           	top: 15,
 *           	right: 0,
 *           	bottom: 0,
 *           	left: 0
 *           },
 *           regions: [
 *           	{
 *               	points: [ // add points counter-clockwise
 *               	    { x: 0, y: 0 },
 *               	    { x: 40, y: 40 },
 *               	    { x: 0, y: 40 }
 *               	],
 *               	text: function (value, percentage) {
 *               	    return `Normal Operations: ${value} (${percentage}%)`;
 *               	},
 *               	opacity: 0.2, // 0 to 1
 *               	class: "test-polygon1"
 *              },
 *             	...
 *           ]
 *        }
 *     ]
 *  });
 * @example
 *	import {bb} from "billboard.js";
 * import Stanford from "billboard.js/dist/billboardjs-plugin-stanford";
 *
 * bb.generate({
 *     plugins: [
 *        new Stanford({ ... })
 *     ]
 * })
 */

var stanford_Stanford = /*#__PURE__*/function (_Plugin) {
  function Stanford(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "config", void 0), Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "colorScale", void 0), Object(defineProperty["a" /* default */])(Object(assertThisInitialized["a" /* default */])(_this), "elements", void 0), _this.config = new Options(), Object(assertThisInitialized["a" /* default */])(_this) || Object(assertThisInitialized["a" /* default */])(_this);
  }

  Object(inheritsLoose["a" /* default */])(Stanford, _Plugin);

  var _proto = Stanford.prototype;
  return _proto.$beforeInit = function $beforeInit() {
    var _this2 = this,
        $$ = this.$$;

    $$.config.data_xSort = !1, $$.isMultipleX = function () {
      return !0;
    }, $$.showGridFocus = function () {}, $$.labelishData = function (d) {
      return d.values;
    }, $$.opacityForCircle = function () {
      return 1;
    };
    var getCurrentPaddingRight = $$.getCurrentPaddingRight.bind($$);

    $$.getCurrentPaddingRight = function () {
      return getCurrentPaddingRight() + (_this2.colorScale ? _this2.colorScale.getColorScalePadding() : 0);
    };
  }, _proto.$init = function $init() {
    var $$ = this.$$;
    config_config["a" /* loadConfig */].call(this, this.options), $$.color = this.getStanfordPointColor.bind($$), this.colorScale = new ColorScale_ColorScale(this), this.elements = new Elements_Elements(this), this.convertData(), this.initStanfordData(), this.setStanfordTooltip(), this.colorScale.drawColorScale(), this.$redraw();
  }, _proto.$redraw = function $redraw(duration) {
    this.colorScale && this.colorScale.drawColorScale(), this.elements && this.elements.updateStanfordElements(duration);
  }, _proto.getOptions = function getOptions() {
    return new Options();
  }, _proto.convertData = function convertData() {
    var data = this.$$.data.targets,
        epochs = this.options.epochs;
    data.forEach(function (d) {
      d.values.forEach(function (v, i) {
        v.epochs = epochs[i];
      }), d.minEpochs = undefined, d.maxEpochs = undefined, d.colors = undefined, d.colorscale = undefined;
    });
  }, _proto.xvCustom = function xvCustom(d, xyValue) {
    var $$ = this,
        axis = $$.axis,
        config = $$.config,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return axis.isTimeSeries() ? value = util["g" /* parseDate */].call($$, value) : axis.isCategorized() && Object(util["f" /* isString */])(value) && (value = config.axis_x_categories.indexOf(d.value)), Math.ceil($$.scale.x(value));
  }, _proto.yvCustom = function yvCustom(d, xyValue) {
    var $$ = this,
        scale = $$.scale,
        yScale = d.axis && d.axis === "y2" ? scale.y2 : scale.y,
        value = xyValue ? d[xyValue] : $$.getBaseValue(d);
    return Math.ceil(yScale(value));
  }, _proto.initStanfordData = function initStanfordData() {
    var config = this.config,
        target = this.$$.data.targets[0];
    target.values.sort(compareEpochs);
    // Get array of epochs
    var epochs = target.values.map(function (a) {
      return a.epochs;
    });
    target.minEpochs = isNaN(config.scale_min) ? Math.min.apply(Math, epochs) : config.scale_min, target.maxEpochs = isNaN(config.scale_max) ? Math.max.apply(Math, epochs) : config.scale_max, target.colors = Object(util["d" /* isFunction */])(config.colors) ? config.colors : Object(external_commonjs_d3_interpolate_commonjs2_d3_interpolate_amd_d3_interpolate_root_d3_["interpolateHslLong"])(Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(250, 1, .5), Object(external_commonjs_d3_color_commonjs2_d3_color_amd_d3_color_root_d3_["hsl"])(0, 1, .5)), target.colorscale = Object(external_commonjs_d3_scale_commonjs2_d3_scale_amd_d3_scale_root_d3_["scaleSequentialLog"])(target.colors).domain([target.minEpochs, target.maxEpochs]);
  }, _proto.getStanfordPointColor = function getStanfordPointColor(d) {
    var target = this.data.targets[0];
    return target.colorscale(d.epochs);
  }, _proto.setStanfordTooltip = function setStanfordTooltip() {
    var config = this.$$.config;
    Object(util["c" /* isEmpty */])(config.tooltip_contents) && (config.tooltip_contents = function (d, defaultTitleFormat, defaultValueFormat, color) {
      var html = "<table class=\"" + classes["a" /* default */].tooltip + "\"><tbody>";
      return d.forEach(function (v) {
        html += "<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(config.data_x) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.x) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t<th>" + defaultTitleFormat(v.id) + "</th>\n\t\t\t\t\t\t\t<th class=\"value\">" + defaultValueFormat(v.value) + "</th>\n\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t<tr class=\"" + classes["a" /* default */].tooltipName + "-" + v.id + "\">\n\t\t\t\t\t\t\t<td class=\"name\"><span style=\"background-color:" + color(v) + "\"></span>" + defaultTitleFormat("Epochs") + "</td>\n\t\t\t\t\t\t\t<td class=\"value\">" + defaultValueFormat(v.epochs) + "</td>\n\t\t\t\t\t\t</tr>";
      }), html + "</tbody></table>";
    });
  }, _proto.countEpochsInRegion = function countEpochsInRegion(region) {
    var $$ = this,
        target = $$.data.targets[0],
        total = target.values.reduce(function (accumulator, currentValue) {
      return accumulator + +currentValue.epochs;
    }, 0),
        value = target.values.reduce(function (accumulator, currentValue) {
      return pointInRegion(currentValue, region) ? accumulator + +currentValue.epochs : accumulator;
    }, 0);
    return {
      value: value,
      percentage: value === 0 ? 0 : +(value / total * 100).toFixed(1)
    };
  }, Stanford;
}(Plugin["a" /* default */]);



/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ getRange; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ isDefined; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ isEmpty; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ isFunction; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ isObjectType; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ isString; });
__webpack_require__.d(__webpack_exports__, "g", function() { return /* binding */ parseDate; });

// UNUSED EXPORTS: asHalfPixel, brushEmpty, callFn, capitalize, ceil10, convertInputType, deepClone, diffDomain, endall, emulateEvent, extend, getBrushSelection, getBoundingRect, getCssRules, getMinMax, getOption, getPathBox, getRandom, getRectSegList, getTranslation, getUnique, hasValue, isArray, isboolean, isNumber, isObject, isTabVisible, isUndefined, isValue, mergeArray, mergeObj, notEmpty, sanitise, setTextValue, sortValue, toArray, tplProcess

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(3);

// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(4);

// EXTERNAL MODULE: external {"commonjs":"d3-brush","commonjs2":"d3-brush","amd":"d3-brush","root":"d3"}
var external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_ = __webpack_require__(11);

// CONCATENATED MODULE: ./src/module/browser.ts
/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */

/**
 * Window object
 * @private
 */

/* eslint-disable no-new-func, no-undef */


var win = function () {
  var def = function (o) {
    return typeof o !== "undefined" && o;
  };

  return def(self) || def(window) || def(global) || def(globalThis) || Function("return this")();
}(),
    doc = win && win.document;
/* eslint-enable no-new-func, no-undef */
// EXTERNAL MODULE: ./src/config/classes.ts
var classes = __webpack_require__(9);

// CONCATENATED MODULE: ./src/module/util.ts


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var source, i = 1; i < arguments.length; i++) source = arguments[i] == null ? {} : arguments[i], i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); return target; }

/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 * @ignore
 */






var isValue = function (v) {
  return v || v === 0;
},
    isFunction = function (v) {
  return typeof v === "function";
},
    isString = function (v) {
  return typeof v === "string";
},
    isNumber = function (v) {
  return typeof v === "number";
},
    isUndefined = function (v) {
  return typeof v === "undefined";
},
    isDefined = function (v) {
  return typeof v !== "undefined";
},
    isboolean = function (v) {
  return typeof v === "boolean";
},
    ceil10 = function (v) {
  return Math.ceil(v / 10) * 10;
},
    asHalfPixel = function (n) {
  return Math.ceil(n) + .5;
},
    diffDomain = function (d) {
  return d[1] - d[0];
},
    isObjectType = function (v) {
  return typeof v === "object";
},
    isEmpty = function (o) {
  return isUndefined(o) || o === null || isString(o) && o.length === 0 || isObjectType(o) && !(o instanceof Date) && Object.keys(o).length === 0 || isNumber(o) && isNaN(o);
},
    notEmpty = function (o) {
  return !isEmpty(o);
},
    isArray = function (arr) {
  return Array.isArray(arr);
},
    isObject = function (obj) {
  return obj && !obj.nodeType && isObjectType(obj) && !isArray(obj);
};

/**
 * Get specified key value from object
 * If default value is given, will return if given key value not found
 * @param {object} options Source object
 * @param {string} key Key value
 * @param {*} defaultValue Default value
 * @returns {*}
 * @private
 */
function getOption(options, key, defaultValue) {
  return isDefined(options[key]) ? options[key] : defaultValue;
}
/**
 * Check if value exist in the given object
 * @param {object} dict Target object to be checked
 * @param {*} value Value to be checked
 * @returns {boolean}
 * @private
 */


function hasValue(dict, value) {
  var found = !1;
  return Object.keys(dict).forEach(function (key) {
    return dict[key] === value && (found = !0);
  }), found;
}
/**
 * Call function with arguments
 * @param {Function} fn Function to be called
 * @param {*} args Arguments
 * @returns {boolean} true: fn is function, false: fn is not function
 * @private
 */


function callFn(fn) {
  for (var isFn = isFunction(fn), _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];

  return isFn && fn.call.apply(fn, args), isFn;
}
/**
 * Call function after all transitions ends
 * @param {d3.transition} transition Transition
 * @param {Fucntion} cb Callback function
 * @private
 */


function endall(transition, cb) {
  var n = 0;
  transition.each(function () {
    return ++n;
  }).on("end", function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];

    --n || cb.apply.apply(cb, [this].concat(args));
  });
}
/**
 * Replace tag sign to html entity
 * @param {string} str Target string value
 * @returns {string}
 * @private
 */


function sanitise(str) {
  return isString(str) ? str.replace(/</g, "&lt;").replace(/>/g, "&gt;") : str;
}
/**
 * Set text value. If there's multiline add nodes.
 * @param {d3Selection} node Text node
 * @param {string} text Text value string
 * @param {Array} dy dy value for multilined text
 * @param {boolean} toMiddle To be alingned vertically middle
 * @private
 */


function setTextValue(node, text, dy, toMiddle) {
  if (dy === void 0 && (dy = [-1, 1]), toMiddle === void 0 && (toMiddle = !1), node && isString(text)) if (text.indexOf("\n") === -1) node.text(text);else {
    var diff = [node.text(), text].map(function (v) {
      return v.replace(/[\s\n]/g, "");
    });

    if (diff[0] !== diff[1]) {
      var multiline = text.split("\n"),
          len = toMiddle ? multiline.length - 1 : 1;
      node.html(""), multiline.forEach(function (v, i) {
        node.append("tspan").attr("x", 0).attr("dy", (i === 0 ? dy[0] * len : dy[1]) + "em").text(v);
      });
    }
  }
}
/**
 * Substitution of SVGPathSeg API polyfill
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {Array}
 * @private
 */


function getRectSegList(path) {
  /*
   * seg1 ---------- seg2
   *   |               |
   *   |               |
   *   |               |
   * seg0 ---------- seg3
   * */
  var _path$getBBox = path.getBBox(),
      x = _path$getBBox.x,
      y = _path$getBBox.y,
      width = _path$getBBox.width,
      height = _path$getBBox.height;

  return [{
    x: x,
    y: y + height
  }, // seg0
  {
    x: x,
    y: y
  }, // seg1
  {
    x: x + width,
    y: y
  }, // seg2
  {
    x: x + width,
    y: y + height
  } // seg3
  ];
}
/**
 * Get svg bounding path box dimension
 * @param {SVGGraphicsElement} path Target svg element
 * @returns {object}
 * @private
 */


function getPathBox(path) {
  var _path$getBoundingClie = path.getBoundingClientRect(),
      width = _path$getBoundingClie.width,
      height = _path$getBoundingClie.height,
      items = getRectSegList(path),
      x = items[0].x,
      y = Math.min(items[0].y, items[1].y);

  return {
    x: x,
    y: y,
    width: width,
    height: height
  };
}
/**
 * Return brush selection array
 * @param {object} {} Selection object
 * @param {object} {}.$el Selection object
 * @returns {d3.brushSelection}
 * @private
 */


function getBrushSelection(_ref) {
  var selection,
      $el = _ref.$el,
      event = external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_["event"],
      main = $el.subchart.main || $el.main;
  return event && event.type === "brush" ? selection = event.selection : main && (selection = main.select("." + classes["a" /* default */].brush).node()) && (selection = Object(external_commonjs_d3_brush_commonjs2_d3_brush_amd_d3_brush_root_d3_["brushSelection"])(selection)), selection;
}
/**
 * Get boundingClientRect.
 * Cache the evaluated value once it was called.
 * @param {HTMLElement} node Target element
 * @returns {object}
 * @private
 */


var getBoundingRect = function (node) {
  return node.rect || (node.rect = node.getBoundingClientRect());
};
/**
 * Retrun random number
 * @param {boolean} asStr Convert returned value as string
 * @returns {number|string}
 * @private
 */


function getRandom(asStr) {
  asStr === void 0 && (asStr = !0);
  var rand = Math.random();
  return asStr ? rand + "" : rand;
}
/**
 * Check if brush is empty
 * @param {object} ctx Bursh context
 * @returns {boolean}
 * @private
 */


function brushEmpty(ctx) {
  var selection = getBrushSelection(ctx);
  return !selection || selection[0] === selection[1];
}
/**
 * Deep copy object
 * @param {object} objectN Source object
 * @returns {object} Cloned object
 * @private
 */


function deepClone() {
  for (var clone = function (_clone) {
    function clone() {
      return _clone.apply(this, arguments);
    }

    return clone.toString = function () {
      return _clone.toString();
    }, clone;
  }(function (v) {
    if (isObject(v) && v.constructor) {
      var r = new v.constructor();

      for (var k in v) r[k] = clone(v[k]);

      return r;
    }

    return v;
  }), _len3 = arguments.length, objectN = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) objectN[_key3] = arguments[_key3];

  return objectN.map(function (v) {
    return clone(v);
  }).reduce(function (a, c) {
    return _objectSpread(_objectSpread({}, a), c);
  });
}
/**
 * Extend target from source object
 * @param {object} target Target object
 * @param {object} source Source object
 * @returns {object}
 * @private
 */


function extend(target, source) {
  // exclude name with only numbers
  for (var p in target === void 0 && (target = {}), isArray(source) && source.forEach(function (v) {
    return extend(target, v);
  }), source) /^\d+$/.test(p) || p in target || (target[p] = source[p]);

  return target;
}
/**
 * Return first letter capitalized
 * @param {string} str Target string
 * @returns {string} capitalized string
 * @private
 */


var capitalize = function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
},
    toArray = function (v) {
  return [].slice.call(v);
};
/**
 * Convert to array
 * @param {object} v Target to be converted
 * @returns {Array}
 * @private
 */


/**
 * Get css rules for specified stylesheets
 * @param {Array} styleSheets The stylesheets to get the rules from
 * @returns {Array}
 * @private
 */
function getCssRules(styleSheets) {
  var rules = [];
  return styleSheets.forEach(function (sheet) {
    try {
      sheet.cssRules && sheet.cssRules.length && (rules = rules.concat(toArray(sheet.cssRules)));
    } catch (e) {
      console.error("Error while reading rules from " + sheet.href + ": " + e.toString());
    }
  }), rules;
}
/**
 * Gets the SVGMatrix of an SVGGElement
 * @param {SVGElement} node Node element
 * @returns {SVGMatrix} matrix
 * @private
 */


var getTranslation = function (node) {
  var transform = node ? node.transform : null,
      baseVal = transform && transform.baseVal;
  return baseVal && baseVal.numberOfItems ? baseVal.getItem(0).matrix : {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    e: 0,
    f: 0
  };
};
/**
 * Get unique value from array
 * @param {Array} data Source data
 * @returns {Array} Unique array value
 * @private
 */


function getUnique(data) {
  var isDate = data[0] instanceof Date,
      d = (isDate ? data.map(Number) : data).filter(function (v, i, self) {
    return self.indexOf(v) === i;
  });
  return isDate ? d.map(function (v) {
    return new Date(v);
  }) : d;
}
/**
 * Merge array
 * @param {Array} arr Source array
 * @returns {Array}
 * @private
 */


function mergeArray(arr) {
  return arr && arr.length ? arr.reduce(function (p, c) {
    return p.concat(c);
  }) : [];
}
/**
 * Merge object returning new object
 * @param {object} target Target object
 * @param {object} objectN Source object
 * @returns {object} merged target object
 * @private
 */


function mergeObj(target) {
  for (var _len4 = arguments.length, objectN = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) objectN[_key4 - 1] = arguments[_key4];

  if (!objectN.length || objectN.length === 1 && !objectN[0]) return target;
  var source = objectN.shift();
  return isObject(target) && isObject(source) && Object.keys(source).forEach(function (key) {
    var value = source[key];
    isObject(value) ? (!target[key] && (target[key] = {}), target[key] = mergeObj(target[key], value)) : target[key] = isArray(value) ? value.concat() : value;
  }), mergeObj.apply(void 0, [target].concat(objectN));
}
/**
 * Sort value
 * @param {Array} data value to be sorted
 * @param {boolean} isAsc true: asc, false: desc
 * @returns {number|string|Date} sorted date
 * @private
 */


function sortValue(data, isAsc) {
  isAsc === void 0 && (isAsc = !0);
  var fn;
  return data[0] instanceof Date ? fn = isAsc ? function (a, b) {
    return a - b;
  } : function (a, b) {
    return b - a;
  } : isAsc && !data.every(isNaN) ? fn = function (a, b) {
    return a - b;
  } : !isAsc && (fn = function (a, b) {
    return a > b && -1 || a < b && 1 || a === b && 0;
  }), data.concat().sort(fn);
}
/**
 * Get min/max value
 * @param {string} type 'min' or 'max'
 * @param {Array} data Array data value
 * @returns {number|Date|undefined}
 * @private
 */


function getMinMax(type, data) {
  var res = data.filter(function (v) {
    return notEmpty(v);
  });
  return res.length ? isNumber(res[0]) ? res = Math[type].apply(Math, res) : res[0] instanceof Date && (res = sortValue(res, type === "min")[0]) : res = undefined, res;
}
/**
 * Get range
 * @param {number} start Start number
 * @param {number} end End number
 * @param {number} step Step number
 * @returns {Array}
 * @private
 */


var getRange = function (start, end, step) {
  step === void 0 && (step = 1);
  var res = [],
      n = Math.max(0, Math.ceil((end - start) / step)) | 0;

  for (var i = start; i < n; i++) res.push(start + i * step);

  return res;
},
    emulateEvent = {
  mouse: function () {
    var getParams = function () {
      return {
        bubbles: !1,
        cancelable: !1,
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0
      };
    };

    try {
      return new MouseEvent("t"), function (el, eventType, params) {
        params === void 0 && (params = getParams()), el.dispatchEvent(new MouseEvent(eventType, params));
      };
    } catch (e) {
      // Polyfills DOM4 MouseEvent
      return function (el, eventType, params) {
        params === void 0 && (params = getParams());
        var mouseEvent = doc.createEvent("MouseEvent"); // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent

        mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, win, 0, // the event's mouse click count
        params.screenX, params.screenY, params.clientX, params.clientY, !1, !1, !1, !1, 0, null), el.dispatchEvent(mouseEvent);
      };
    }
  }(),
  touch: function touch(el, eventType, params) {
    var touchObj = new Touch(mergeObj({
      identifier: Date.now(),
      target: el,
      radiusX: 2.5,
      radiusY: 2.5,
      rotationAngle: 10,
      force: .5
    }, params));
    el.dispatchEvent(new TouchEvent(eventType, {
      cancelable: !0,
      bubbles: !0,
      shiftKey: !0,
      touches: [touchObj],
      targetTouches: [],
      changedTouches: [touchObj]
    }));
  }
}; // emulate event


/**
 * Process the template  & return bound string
 * @param {string} tpl Template string
 * @param {object} data Data value to be replaced
 * @returns {string}
 * @private
 */
function tplProcess(tpl, data) {
  var res = tpl;

  for (var x in data) res = res.replace(new RegExp("{=" + x + "}", "g"), data[x]);

  return res;
}
/**
 * Get parsed date value
 * (It must be called in 'ChartInternal' context)
 * @param {Date|string|number} date Value of date to be parsed
 * @returns {Date}
 * @private
 */


function parseDate(date) {
  var parsedDate;
  if (date instanceof Date) parsedDate = date;else if (isString(date)) {
    var config = this.config,
        format = this.format;
    parsedDate = format.dataTime(config.data_xFormat)(date);
  } else isNumber(date) && !isNaN(date) && (parsedDate = new Date(+date));
  return (!parsedDate || isNaN(+parsedDate)) && console && console.error && console.error("Failed to parse x '" + date + "' to Date object"), parsedDate;
}
/**
 * Return if the current doc is visible or not
 * @returns {boolean}
 * @private
 */


function isTabVisible() {
  return !doc.hidden;
}
/**
 * Get the current input type
 * @param {boolean} mouse Config value: interaction.inputType.mouse
 * @param {boolean} touch Config value: interaction.inputType.touch
 * @returns {string} "mouse" | "touch" | null
 * @private
 */


function convertInputType(mouse, touch) {
  var isMobile = !1; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent#Mobile_Tablet_or_Desktop

  if (/Mobi/.test(win.navigator.userAgent) && touch) {
    // Some Edge desktop return true: https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/20417074/
    var hasTouchPoints = win.navigator && "maxTouchPoints" in win.navigator && win.navigator.maxTouchPoints > 0,
        hasTouch = "ontouchmove" in win || win.DocumentTouch && doc instanceof win.DocumentTouch; // Ref: https://github.com/Modernizr/Modernizr/blob/master/feature-detects/touchevents.js
    // On IE11 with IE9 emulation mode, ('ontouchstart' in window) is returning true

    isMobile = hasTouchPoints || hasTouch;
  }

  var hasMouse = !(!mouse || isMobile) && "onmouseover" in win;
  return hasMouse && "mouse" || isMobile && "touch" || null;
}

/***/ })
/******/ ])["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vYXNzZXJ0VGhpc0luaXRpYWxpemVkLmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vaW5oZXJpdHNMb29zZS5qcyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLXNlbGVjdGlvblwiLFwiY29tbW9uanMyXCI6XCJkMy1zZWxlY3Rpb25cIixcImFtZFwiOlwiZDMtc2VsZWN0aW9uXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9QbHVnaW4udHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtaW50ZXJwb2xhdGVcIixcImNvbW1vbmpzMlwiOlwiZDMtaW50ZXJwb2xhdGVcIixcImFtZFwiOlwiZDMtaW50ZXJwb2xhdGVcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWNvbG9yXCIsXCJjb21tb25qczJcIjpcImQzLWNvbG9yXCIsXCJhbWRcIjpcImQzLWNvbG9yXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1zY2FsZVwiLFwiY29tbW9uanMyXCI6XCJkMy1zY2FsZVwiLFwiYW1kXCI6XCJkMy1zY2FsZVwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9jb25maWcvY2xhc3Nlcy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL2NvbmZpZy9jb25maWcudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS9leHRlcm5hbCB7XCJjb21tb25qc1wiOlwiZDMtYnJ1c2hcIixcImNvbW1vbmpzMlwiOlwiZDMtYnJ1c2hcIixcImFtZFwiOlwiZDMtYnJ1c2hcIixcInJvb3RcIjpcImQzXCJ9Iiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vZXh0ZXJuYWwge1wiY29tbW9uanNcIjpcImQzLWF4aXNcIixcImNvbW1vbmpzMlwiOlwiZDMtYXhpc1wiLFwiYW1kXCI6XCJkMy1heGlzXCIsXCJyb290XCI6XCJkM1wifSIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdL2V4dGVybmFsIHtcImNvbW1vbmpzXCI6XCJkMy1mb3JtYXRcIixcImNvbW1vbmpzMlwiOlwiZDMtZm9ybWF0XCIsXCJhbWRcIjpcImQzLWZvcm1hdFwiLFwicm9vdFwiOlwiZDNcIn0iLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvT3B0aW9ucy50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9jbGFzc2VzLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvUGx1Z2luL3N0YW5mb3JkL3V0aWwudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvRWxlbWVudHMudHMiLCJ3ZWJwYWNrOi8vYmIucGx1Z2luLltuYW1lXS8uL3NyYy9QbHVnaW4vc3RhbmZvcmQvQ29sb3JTY2FsZS50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL1BsdWdpbi9zdGFuZm9yZC9pbmRleC50cyIsIndlYnBhY2s6Ly9iYi5wbHVnaW4uW25hbWVdLy4vc3JjL21vZHVsZS9icm93c2VyLnRzIiwid2VicGFjazovL2JiLnBsdWdpbi5bbmFtZV0vLi9zcmMvbW9kdWxlL3V0aWwudHMiXSwibmFtZXMiOlsiUGx1Z2luIiwib3B0aW9ucyIsIiRiZWZvcmVJbml0IiwiJGluaXQiLCIkYWZ0ZXJJbml0IiwiJHJlZHJhdyIsIiR3aWxsRGVzdHJveSIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiYXJjIiwiYXJjTGFiZWxMaW5lIiwiYXJjcyIsImFyZWEiLCJhcmVhcyIsImF4aXMiLCJheGlzWCIsImF4aXNYTGFiZWwiLCJheGlzWSIsImF4aXNZMiIsImF4aXNZMkxhYmVsIiwiYXhpc1lMYWJlbCIsImJhciIsImJhcnMiLCJicnVzaCIsImJ1dHRvbiIsImJ1dHRvblpvb21SZXNldCIsImNoYXJ0IiwiY2hhcnRBcmMiLCJjaGFydEFyY3MiLCJjaGFydEFyY3NCYWNrZ3JvdW5kIiwiY2hhcnRBcmNzR2F1Z2VNYXgiLCJjaGFydEFyY3NHYXVnZU1pbiIsImNoYXJ0QXJjc0dhdWdlVW5pdCIsImNoYXJ0QXJjc1RpdGxlIiwiY2hhcnRBcmNzR2F1Z2VUaXRsZSIsImNoYXJ0QmFyIiwiY2hhcnRCYXJzIiwiY2hhcnRDaXJjbGVzIiwiY2hhcnRMaW5lIiwiY2hhcnRMaW5lcyIsImNoYXJ0UmFkYXIiLCJjaGFydFJhZGFycyIsImNoYXJ0VGV4dCIsImNoYXJ0VGV4dHMiLCJjaXJjbGUiLCJjaXJjbGVzIiwiY29sb3JQYXR0ZXJuIiwiY29sb3JTY2FsZSIsImRlZm9jdXNlZCIsImRyYWdhcmVhIiwiZW1wdHkiLCJldmVudFJlY3QiLCJldmVudFJlY3RzIiwiZXZlbnRSZWN0c011bHRpcGxlIiwiZXZlbnRSZWN0c1NpbmdsZSIsImZvY3VzZWQiLCJnYXVnZVZhbHVlIiwiZ3JpZCIsImdyaWRMaW5lcyIsImxlZ2VuZCIsImxlZ2VuZEJhY2tncm91bmQiLCJsZWdlbmRJdGVtIiwibGVnZW5kSXRlbUV2ZW50IiwibGVnZW5kSXRlbUZvY3VzZWQiLCJsZWdlbmRJdGVtSGlkZGVuIiwibGVnZW5kSXRlbVBvaW50IiwibGVnZW5kSXRlbVRpbGUiLCJsZXZlbCIsImxldmVscyIsImxpbmUiLCJsaW5lcyIsIm1haW4iLCJyZWdpb24iLCJyZWdpb25zIiwic2VsZWN0ZWRDaXJjbGUiLCJzZWxlY3RlZENpcmNsZXMiLCJzaGFwZSIsInNoYXBlcyIsInN0YW5mb3JkRWxlbWVudHMiLCJzdGFuZm9yZExpbmUiLCJzdGFuZm9yZExpbmVzIiwic3RhbmZvcmRSZWdpb24iLCJzdGFuZm9yZFJlZ2lvbnMiLCJ0YXJnZXQiLCJ0ZXh0IiwidGV4dHMiLCJ0aXRsZSIsInRvb2x0aXAiLCJ0b29sdGlwQ29udGFpbmVyIiwidG9vbHRpcE5hbWUiLCJ4Z3JpZCIsInhncmlkRm9jdXMiLCJ4Z3JpZExpbmUiLCJ4Z3JpZExpbmVzIiwieGdyaWRzIiwieWdyaWQiLCJ5Z3JpZEZvY3VzIiwieWdyaWRMaW5lIiwieWdyaWRMaW5lcyIsInlncmlkcyIsInpvb21CcnVzaCIsInpvb21SZWN0IiwiRVhQQU5ERUQiLCJTRUxFQ1RFRCIsIklOQ0xVREVEIiwiVGV4dE92ZXJsYXBwaW5nIiwibG9hZENvbmZpZyIsImNvbmZpZyIsInJlYWQiLCJ0aGlzQ29uZmlnIiwiZmluZCIsInNoaWZ0IiwiaXNPYmplY3RUeXBlIiwidW5kZWZpbmVkIiwic3BsaXQiLCJpc0RlZmluZWQiLCJPcHRpb25zIiwiY29sb3JzIiwiZXBvY2hzIiwic2NhbGVfbWluIiwic2NhbGVfbWF4Iiwic2NhbGVfd2lkdGgiLCJzY2FsZV9mb3JtYXQiLCJwYWRkaW5nX3RvcCIsInBhZGRpbmdfcmlnaHQiLCJwYWRkaW5nX2JvdHRvbSIsInBhZGRpbmdfbGVmdCIsInBvaW50SW5SZWdpb24iLCJwb2ludCIsIngiLCJ5IiwidmFsdWUiLCJpbnNpZGUiLCJpIiwiaiIsImxlbmd0aCIsInhpIiwieWkiLCJ4aiIsInlqIiwiY29tcGFyZUVwb2NocyIsImEiLCJiIiwiZ2V0UmVnaW9uQXJlYSIsInBvaW50cyIsInBvaW50MSIsInBvaW50MiIsImwiLCJnZXRDZW50cm9pZCIsImYiLCJFbGVtZW50cyIsIm93bmVyIiwiZWxlbWVudHMiLCIkJCIsIiRlbCIsInNlbGVjdCIsImFwcGVuZCIsImF0dHIiLCJDTEFTUyIsInVwZGF0ZVN0YW5mb3JkTGluZXMiLCJkdXJhdGlvbiIsImlzUm90YXRlZCIsImF4aXNfcm90YXRlZCIsInh2Q3VzdG9tIiwiYmluZCIsInl2Q3VzdG9tIiwic3R5bGUiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZXhpdCIsInRyYW5zaXRpb24iLCJyZW1vdmUiLCJzdGFuZm9yZExpbmVFbnRlciIsImVudGVyIiwibWVyZ2UiLCJkIiwiY2xhc3MiLCJ1cGRhdGVTdGFuZm9yZFJlZ2lvbnMiLCJjb3VudFBvaW50c0luUmVnaW9uIiwiY291bnRFcG9jaHNJblJlZ2lvbiIsInN0YW5mb3JkUmVnaW9uRW50ZXIiLCJtYXAiLCJqb2luIiwib3BhY2l0eSIsInBlcmNlbnRhZ2UiLCJ1cGRhdGVTdGFuZm9yZEVsZW1lbnRzIiwieHlWYWx1ZSIsImdldEJhc2VWYWx1ZSIsImlzVGltZVNlcmllcyIsInBhcnNlRGF0ZSIsImNhbGwiLCJpc0NhdGVnb3JpemVkIiwiaXNTdHJpbmciLCJheGlzX3hfY2F0ZWdvcmllcyIsImluZGV4T2YiLCJNYXRoIiwiY2VpbCIsInNjYWxlIiwieVNjYWxlIiwieTIiLCJDb2xvclNjYWxlIiwiZHJhd0NvbG9yU2NhbGUiLCJ0YXJnZXRzIiwiaGVpZ2h0Iiwic3RhdGUiLCJiYXJXaWR0aCIsImJhckhlaWdodCIsImdldFJhbmdlIiwiaW52ZXJzZVNjYWxlIiwiZDNTY2FsZVNlcXVlbnRpYWwiLCJkb21haW4iLCJzdmciLCJheGlzU2NhbGUiLCJkM1NjYWxlTG9nIiwibWluRXBvY2hzIiwibWF4RXBvY2hzIiwicmFuZ2UiLCJsZWdlbmRBeGlzIiwiZDNBeGlzUmlnaHQiLCJzY2FsZUZvcm1hdCIsInRpY2tWYWx1ZXMiLCJpc0Z1bmN0aW9uIiwidGlja0Zvcm1hdCIsImQzRm9ybWF0IiwiZmlsdGVyIiwicG93IiwibG9nIiwiTE4xMCIsInJvdW5kIiwiY3VycmVudCIsIndpZHRoIiwieEZvckNvbG9yU2NhbGUiLCJub2RlIiwiZ2V0QkJveCIsImdldENvbG9yU2NhbGVQYWRkaW5nIiwiU3RhbmZvcmQiLCJkYXRhX3hTb3J0IiwiaXNNdWx0aXBsZVgiLCJzaG93R3JpZEZvY3VzIiwibGFiZWxpc2hEYXRhIiwidmFsdWVzIiwib3BhY2l0eUZvckNpcmNsZSIsImdldEN1cnJlbnRQYWRkaW5nUmlnaHQiLCJjb2xvciIsImdldFN0YW5mb3JkUG9pbnRDb2xvciIsImNvbnZlcnREYXRhIiwiaW5pdFN0YW5mb3JkRGF0YSIsInNldFN0YW5mb3JkVG9vbHRpcCIsImdldE9wdGlvbnMiLCJ2IiwiY29sb3JzY2FsZSIsInNvcnQiLCJpc05hTiIsIm1pbiIsIm1heCIsImQzSW50ZXJwb2xhdGVIc2xMb25nIiwiZDNIc2wiLCJkM1NjYWxlU2VxdWVudGlhbExvZyIsImlzRW1wdHkiLCJ0b29sdGlwX2NvbnRlbnRzIiwiZGVmYXVsdFRpdGxlRm9ybWF0IiwiZGVmYXVsdFZhbHVlRm9ybWF0IiwiaHRtbCIsImRhdGFfeCIsImlkIiwidG90YWwiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsInRvRml4ZWQiLCJ3aW4iLCJkZWYiLCJvIiwic2VsZiIsIndpbmRvdyIsImdsb2JhbCIsImdsb2JhbFRoaXMiLCJGdW5jdGlvbiIsImRvYyIsImRvY3VtZW50IiwiaXNWYWx1ZSIsImlzTnVtYmVyIiwiaXNVbmRlZmluZWQiLCJpc2Jvb2xlYW4iLCJjZWlsMTAiLCJhc0hhbGZQaXhlbCIsIm4iLCJkaWZmRG9tYWluIiwiRGF0ZSIsIm5vdEVtcHR5IiwiaXNBcnJheSIsImFyciIsIkFycmF5IiwiaXNPYmplY3QiLCJvYmoiLCJub2RlVHlwZSIsImdldE9wdGlvbiIsImRlZmF1bHRWYWx1ZSIsImhhc1ZhbHVlIiwiZGljdCIsImZvdW5kIiwiY2FsbEZuIiwiZm4iLCJpc0ZuIiwiYXJncyIsImVuZGFsbCIsImNiIiwiZWFjaCIsIm9uIiwiYXBwbHkiLCJzYW5pdGlzZSIsInN0ciIsInJlcGxhY2UiLCJzZXRUZXh0VmFsdWUiLCJkeSIsInRvTWlkZGxlIiwiZGlmZiIsIm11bHRpbGluZSIsImxlbiIsImdldFJlY3RTZWdMaXN0IiwicGF0aCIsImdldFBhdGhCb3giLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJpdGVtcyIsImdldEJydXNoU2VsZWN0aW9uIiwic2VsZWN0aW9uIiwiZXZlbnQiLCJkM0V2ZW50Iiwic3ViY2hhcnQiLCJ0eXBlIiwiZDNCcnVzaFNlbGVjdGlvbiIsImdldEJvdW5kaW5nUmVjdCIsInJlY3QiLCJnZXRSYW5kb20iLCJhc1N0ciIsInJhbmQiLCJyYW5kb20iLCJicnVzaEVtcHR5IiwiY3R4IiwiZGVlcENsb25lIiwiY2xvbmUiLCJjb25zdHJ1Y3RvciIsInIiLCJrIiwib2JqZWN0TiIsImMiLCJleHRlbmQiLCJzb3VyY2UiLCJwIiwidGVzdCIsImNhcGl0YWxpemUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwidG9BcnJheSIsImdldENzc1J1bGVzIiwic3R5bGVTaGVldHMiLCJydWxlcyIsInNoZWV0IiwiY3NzUnVsZXMiLCJjb25jYXQiLCJlIiwiY29uc29sZSIsImVycm9yIiwiaHJlZiIsInRvU3RyaW5nIiwiZ2V0VHJhbnNsYXRpb24iLCJ0cmFuc2Zvcm0iLCJiYXNlVmFsIiwibnVtYmVyT2ZJdGVtcyIsImdldEl0ZW0iLCJtYXRyaXgiLCJnZXRVbmlxdWUiLCJpc0RhdGUiLCJOdW1iZXIiLCJtZXJnZUFycmF5IiwibWVyZ2VPYmoiLCJzb3J0VmFsdWUiLCJpc0FzYyIsImV2ZXJ5IiwiZ2V0TWluTWF4IiwicmVzIiwic3RhcnQiLCJlbmQiLCJzdGVwIiwicHVzaCIsImVtdWxhdGVFdmVudCIsIm1vdXNlIiwiZ2V0UGFyYW1zIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJzY3JlZW5YIiwic2NyZWVuWSIsImNsaWVudFgiLCJjbGllbnRZIiwiTW91c2VFdmVudCIsImVsIiwiZXZlbnRUeXBlIiwicGFyYW1zIiwiZGlzcGF0Y2hFdmVudCIsIm1vdXNlRXZlbnQiLCJjcmVhdGVFdmVudCIsImluaXRNb3VzZUV2ZW50IiwidG91Y2giLCJ0b3VjaE9iaiIsIlRvdWNoIiwiaWRlbnRpZmllciIsIm5vdyIsInJhZGl1c1giLCJyYWRpdXNZIiwicm90YXRpb25BbmdsZSIsImZvcmNlIiwiVG91Y2hFdmVudCIsInNoaWZ0S2V5IiwidG91Y2hlcyIsInRhcmdldFRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsInRwbFByb2Nlc3MiLCJ0cGwiLCJSZWdFeHAiLCJkYXRlIiwicGFyc2VkRGF0ZSIsImZvcm1hdCIsImRhdGFUaW1lIiwiZGF0YV94Rm9ybWF0IiwiaXNUYWJWaXNpYmxlIiwiaGlkZGVuIiwiY29udmVydElucHV0VHlwZSIsImlzTW9iaWxlIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwiaGFzVG91Y2hQb2ludHMiLCJtYXhUb3VjaFBvaW50cyIsImhhc1RvdWNoIiwiRG9jdW1lbnRUb3VjaCIsImhhc01vdXNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsbURBQW1EO0FBQ2xGLENBQUM7QUFDRCxPO1FDVkE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxj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QUFPLENBQUNDLEtBQVIseUJBQW9DeUQsSUFBcEMsc0JBR0YsRUFBT0MsVUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7QUFLQSxTQUFTSSxZQUFULEdBQWlDO0FBQ2hDLFNBQU8sQ0FBQ2xKLEdBQVEsQ0FBQ21KLE1BQWpCO0FBQ0E7QUFFRDs7Ozs7Ozs7O0FBT0EsU0FBU0MsZ0JBQVQsQ0FBMEJ4QyxLQUExQixFQUEwQ2dCLEtBQTFDLEVBQW9GO0FBQ25GLE1BQUl5QixRQUFRLEtBQVosQ0FEbUYsQ0FHbkY7O0FBQ0EsTUFBSSxPQUFPL0UsSUFBUCxDQUFZM0UsR0FBTSxDQUFDMkosU0FBUCxDQUFpQkMsU0FBN0IsS0FBMkMzQixLQUEvQyxFQUFzRDtBQUNyRDtBQURxRCxRQUUvQzRCLGNBQWMsR0FBRzdKLEdBQU0sQ0FBQzJKLFNBQVAsSUFBb0Isb0JBQW9CM0osR0FBTSxDQUFDMkosU0FBL0MsSUFBNEQzSixHQUFNLENBQUMySixTQUFQLENBQWlCRyxjQUFqQixHQUFrQyxDQUZoRTtBQUFBLFFBTS9DQyxRQUFRLEdBQUksaUJBQWlCL0osR0FBakIsSUFBNEJBLEdBQU0sQ0FBQ2dLLGFBQVAsSUFBd0IzSixHQUFRLFlBQVlMLEdBQU0sQ0FBQ2dLLGFBTjVDLEVBSXJEO0FBQ0E7O0FBR0FOLFlBQVEsR0FBR0csY0FBYyxJQUFJRSxRQVJ3QjtBQVNyRDs7QUFFRCxNQUFNRSxRQUFRLEtBQUcsQ0FBQWhELEtBQUssSUFBS3lDLFFBQWIsS0FBeUIsaUJBQWlCMUosR0FBeEQ7QUFFQSxTQUFRaUssUUFBUSxJQUFJLE9BQWIsSUFBMEJQLFFBQVEsSUFBSSxPQUF0QyxJQUFrRCxJQUF6RDtBQUNBLEMiLCJmaWxlIjoiYmlsbGJvYXJkanMtcGx1Z2luLXN0YW5mb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwic3RhbmZvcmRcIiwgW1wiZDMtc2VsZWN0aW9uXCIsIFwiZDMtaW50ZXJwb2xhdGVcIiwgXCJkMy1jb2xvclwiLCBcImQzLXNjYWxlXCIsIFwiZDMtYnJ1c2hcIiwgXCJkMy1heGlzXCIsIFwiZDMtZm9ybWF0XCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInN0YW5mb3JkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiZDMtc2VsZWN0aW9uXCIpLCByZXF1aXJlKFwiZDMtaW50ZXJwb2xhdGVcIiksIHJlcXVpcmUoXCJkMy1jb2xvclwiKSwgcmVxdWlyZShcImQzLXNjYWxlXCIpLCByZXF1aXJlKFwiZDMtYnJ1c2hcIiksIHJlcXVpcmUoXCJkMy1heGlzXCIpLCByZXF1aXJlKFwiZDMtZm9ybWF0XCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJiYlwiXSA9IHJvb3RbXCJiYlwiXSB8fCB7fSwgcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdID0gcm9vdFtcImJiXCJdW1wicGx1Z2luXCJdIHx8IHt9LCByb290W1wiYmJcIl1bXCJwbHVnaW5cIl1bXCJzdGFuZm9yZFwiXSA9IGZhY3Rvcnkocm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdLCByb290W1wiZDNcIl0sIHJvb3RbXCJkM1wiXSwgcm9vdFtcImQzXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzhfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTFfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTNfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNik7XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfYXNzZXJ0VGhpc0luaXRpYWxpemVkKHNlbGYpIHtcbiAgaWYgKHNlbGYgPT09IHZvaWQgMCkge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBzZWxmO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF9pbmhlcml0c0xvb3NlKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcy5wcm90b3R5cGUpO1xuICBzdWJDbGFzcy5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJDbGFzcztcbiAgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzRfXzsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG4vKipcbiAqIEJhc2UgY2xhc3MgdG8gZ2VuZXJhdGUgYmlsbGJvYXJkLmpzIHBsdWdpblxuICogQGNsYXNzIFBsdWdpblxuICovXG4vKipcbiAqIFZlcnNpb24gaW5mbyBzdHJpbmcgZm9yIHBsdWdpblxuICogQG5hbWUgdmVyc2lvblxuICogQHN0YXRpY1xuICogQG1lbWJlcm9mIFBsdWdpblxuICogQHR5cGUge3N0cmluZ31cbiAqIEBleGFtcGxlXG4gKiAgIGJiLnBsdWdpbi5zdGFuZm9yZC52ZXJzaW9uOyAgLy8gZXgpIDEuOS4wXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsdWdpbiB7XG5cdHB1YmxpYyAkJDtcblx0cHVibGljIG9wdGlvbnM7XG5cdHN0YXRpYyB2ZXJzaW9uID0gXCIyLjAuMC1uZXh0LjNcIjtcblxuXHQvKipcblx0ICogQ29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtBbnl9IG9wdGlvbnMgY29uZmlnIG9wdGlvbiBvYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICovXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuXHRcdHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG5cdH1cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdiZWZvcmVJbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRiZWZvcmVJbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdpbml0JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRpbml0KCkge31cblxuXHQvKipcblx0ICogTGlmZWN5Y2xlIGhvb2sgZm9yICdhZnRlckluaXQnIHBoYXNlLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0JGFmdGVySW5pdCgpIHt9XG5cblx0LyoqXG5cdCAqIExpZmVjeWNsZSBob29rIGZvciAncmVkcmF3JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCRyZWRyYXcoKSB7fVxuXG5cdC8qKlxuXHQgKiBMaWZlY3ljbGUgaG9vayBmb3IgJ3dpbGxEZXN0cm95JyBwaGFzZS5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdCR3aWxsRGVzdHJveSgpIHtcblx0XHRPYmplY3Qua2V5cyh0aGlzKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHR0aGlzW2tleV0gPSBudWxsO1xuXHRcdFx0ZGVsZXRlIHRoaXNba2V5XTtcblx0XHR9KTtcblx0fVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX182X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX183X187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX184X187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRhcmM6IFwiYmItYXJjXCIsXG5cdGFyY0xhYmVsTGluZTogXCJiYi1hcmMtbGFiZWwtbGluZVwiLFxuXHRhcmNzOiBcImJiLWFyY3NcIixcblx0YXJlYTogXCJiYi1hcmVhXCIsXG5cdGFyZWFzOiBcImJiLWFyZWFzXCIsXG5cdGF4aXM6IFwiYmItYXhpc1wiLFxuXHRheGlzWDogXCJiYi1heGlzLXhcIixcblx0YXhpc1hMYWJlbDogXCJiYi1heGlzLXgtbGFiZWxcIixcblx0YXhpc1k6IFwiYmItYXhpcy15XCIsXG5cdGF4aXNZMjogXCJiYi1heGlzLXkyXCIsXG5cdGF4aXNZMkxhYmVsOiBcImJiLWF4aXMteTItbGFiZWxcIixcblx0YXhpc1lMYWJlbDogXCJiYi1heGlzLXktbGFiZWxcIixcblx0YmFyOiBcImJiLWJhclwiLFxuXHRiYXJzOiBcImJiLWJhcnNcIixcblx0YnJ1c2g6IFwiYmItYnJ1c2hcIixcblx0YnV0dG9uOiBcImJiLWJ1dHRvblwiLFxuXHRidXR0b25ab29tUmVzZXQ6IFwiYmItem9vbS1yZXNldFwiLFxuXHRjaGFydDogXCJiYi1jaGFydFwiLFxuXHRjaGFydEFyYzogXCJiYi1jaGFydC1hcmNcIixcblx0Y2hhcnRBcmNzOiBcImJiLWNoYXJ0LWFyY3NcIixcblx0Y2hhcnRBcmNzQmFja2dyb3VuZDogXCJiYi1jaGFydC1hcmNzLWJhY2tncm91bmRcIixcblx0Y2hhcnRBcmNzR2F1Z2VNYXg6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1tYXhcIixcblx0Y2hhcnRBcmNzR2F1Z2VNaW46IFwiYmItY2hhcnQtYXJjcy1nYXVnZS1taW5cIixcblx0Y2hhcnRBcmNzR2F1Z2VVbml0OiBcImJiLWNoYXJ0LWFyY3MtZ2F1Z2UtdW5pdFwiLFxuXHRjaGFydEFyY3NUaXRsZTogXCJiYi1jaGFydC1hcmNzLXRpdGxlXCIsXG5cdGNoYXJ0QXJjc0dhdWdlVGl0bGU6IFwiYmItY2hhcnQtYXJjcy1nYXVnZS10aXRsZVwiLFxuXHRjaGFydEJhcjogXCJiYi1jaGFydC1iYXJcIixcblx0Y2hhcnRCYXJzOiBcImJiLWNoYXJ0LWJhcnNcIixcblx0Y2hhcnRDaXJjbGVzOiBcImJiLWNoYXJ0LWNpcmNsZXNcIixcblx0Y2hhcnRMaW5lOiBcImJiLWNoYXJ0LWxpbmVcIixcblx0Y2hhcnRMaW5lczogXCJiYi1jaGFydC1saW5lc1wiLFxuXHRjaGFydFJhZGFyOiBcImJiLWNoYXJ0LXJhZGFyXCIsXG5cdGNoYXJ0UmFkYXJzOiBcImJiLWNoYXJ0LXJhZGFyc1wiLFxuXHRjaGFydFRleHQ6IFwiYmItY2hhcnQtdGV4dFwiLFxuXHRjaGFydFRleHRzOiBcImJiLWNoYXJ0LXRleHRzXCIsXG5cdGNpcmNsZTogXCJiYi1jaXJjbGVcIixcblx0Y2lyY2xlczogXCJiYi1jaXJjbGVzXCIsXG5cdGNvbG9yUGF0dGVybjogXCJiYi1jb2xvci1wYXR0ZXJuXCIsXG5cdGNvbG9yU2NhbGU6IFwiYmItY29sb3JzY2FsZVwiLFxuXHRkZWZvY3VzZWQ6IFwiYmItZGVmb2N1c2VkXCIsXG5cdGRyYWdhcmVhOiBcImJiLWRyYWdhcmVhXCIsXG5cdGVtcHR5OiBcImJiLWVtcHR5XCIsXG5cdGV2ZW50UmVjdDogXCJiYi1ldmVudC1yZWN0XCIsXG5cdGV2ZW50UmVjdHM6IFwiYmItZXZlbnQtcmVjdHNcIixcblx0ZXZlbnRSZWN0c011bHRpcGxlOiBcImJiLWV2ZW50LXJlY3RzLW11bHRpcGxlXCIsXG5cdGV2ZW50UmVjdHNTaW5nbGU6IFwiYmItZXZlbnQtcmVjdHMtc2luZ2xlXCIsXG5cdGZvY3VzZWQ6IFwiYmItZm9jdXNlZFwiLFxuXHRnYXVnZVZhbHVlOiBcImJiLWdhdWdlLXZhbHVlXCIsXG5cdGdyaWQ6IFwiYmItZ3JpZFwiLFxuXHRncmlkTGluZXM6IFwiYmItZ3JpZC1saW5lc1wiLFxuXHRsZWdlbmQ6IFwiYmItbGVnZW5kXCIsXG5cdGxlZ2VuZEJhY2tncm91bmQ6IFwiYmItbGVnZW5kLWJhY2tncm91bmRcIixcblx0bGVnZW5kSXRlbTogXCJiYi1sZWdlbmQtaXRlbVwiLFxuXHRsZWdlbmRJdGVtRXZlbnQ6IFwiYmItbGVnZW5kLWl0ZW0tZXZlbnRcIixcblx0bGVnZW5kSXRlbUZvY3VzZWQ6IFwiYmItbGVnZW5kLWl0ZW0tZm9jdXNlZFwiLFxuXHRsZWdlbmRJdGVtSGlkZGVuOiBcImJiLWxlZ2VuZC1pdGVtLWhpZGRlblwiLFxuXHRsZWdlbmRJdGVtUG9pbnQ6IFwiYmItbGVnZW5kLWl0ZW0tcG9pbnRcIixcblx0bGVnZW5kSXRlbVRpbGU6IFwiYmItbGVnZW5kLWl0ZW0tdGlsZVwiLFxuXHRsZXZlbDogXCJiYi1sZXZlbFwiLFxuXHRsZXZlbHM6IFwiYmItbGV2ZWxzXCIsXG5cdGxpbmU6IFwiYmItbGluZVwiLFxuXHRsaW5lczogXCJiYi1saW5lc1wiLFxuXHRtYWluOiBcImJiLW1haW5cIixcblx0cmVnaW9uOiBcImJiLXJlZ2lvblwiLFxuXHRyZWdpb25zOiBcImJiLXJlZ2lvbnNcIixcblx0c2VsZWN0ZWRDaXJjbGU6IFwiYmItc2VsZWN0ZWQtY2lyY2xlXCIsXG5cdHNlbGVjdGVkQ2lyY2xlczogXCJiYi1zZWxlY3RlZC1jaXJjbGVzXCIsXG5cdHNoYXBlOiBcImJiLXNoYXBlXCIsXG5cdHNoYXBlczogXCJiYi1zaGFwZXNcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiLFxuXHR0YXJnZXQ6IFwiYmItdGFyZ2V0XCIsXG5cdHRleHQ6IFwiYmItdGV4dFwiLFxuXHR0ZXh0czogXCJiYi10ZXh0c1wiLFxuXHR0aXRsZTogXCJiYi10aXRsZVwiLFxuXHR0b29sdGlwOiBcImJiLXRvb2x0aXBcIixcblx0dG9vbHRpcENvbnRhaW5lcjogXCJiYi10b29sdGlwLWNvbnRhaW5lclwiLFxuXHR0b29sdGlwTmFtZTogXCJiYi10b29sdGlwLW5hbWVcIixcblx0eGdyaWQ6IFwiYmIteGdyaWRcIixcblx0eGdyaWRGb2N1czogXCJiYi14Z3JpZC1mb2N1c1wiLFxuXHR4Z3JpZExpbmU6IFwiYmIteGdyaWQtbGluZVwiLFxuXHR4Z3JpZExpbmVzOiBcImJiLXhncmlkLWxpbmVzXCIsXG5cdHhncmlkczogXCJiYi14Z3JpZHNcIixcblx0eWdyaWQ6IFwiYmIteWdyaWRcIixcblx0eWdyaWRGb2N1czogXCJiYi15Z3JpZC1mb2N1c1wiLFxuXHR5Z3JpZExpbmU6IFwiYmIteWdyaWQtbGluZVwiLFxuXHR5Z3JpZExpbmVzOiBcImJiLXlncmlkLWxpbmVzXCIsXG5cdHlncmlkczogXCJiYi15Z3JpZHNcIixcblx0em9vbUJydXNoOiBcImJiLXpvb20tYnJ1c2hcIixcblx0em9vbVJlY3Q6IFwiYmItem9vbS1yZWN0XCIsXG5cdEVYUEFOREVEOiBcIl9leHBhbmRlZF9cIixcblx0U0VMRUNURUQ6IFwiX3NlbGVjdGVkX1wiLFxuXHRJTkNMVURFRDogXCJfaW5jbHVkZWRfXCIsXG5cdFRleHRPdmVybGFwcGluZzogXCJ0ZXh0LW92ZXJsYXBwaW5nXCJcbn07XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNyB+IHByZXNlbnQgTkFWRVIgQ29ycC5cbiAqIGJpbGxib2FyZC5qcyBwcm9qZWN0IGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICovXG5pbXBvcnQge2lzRGVmaW5lZCwgaXNPYmplY3RUeXBlfSBmcm9tIFwiLi4vbW9kdWxlL3V0aWxcIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnMvT3B0aW9uc1wiO1xuXG4vKipcbiAqIExvYWQgY29uZmlndXJhdGlvbiBvcHRpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVXNlcidzIGdlbmVyYXRpb24gY29uZmlnIHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gbG9hZENvbmZpZyhjb25maWc6IE9wdGlvbnMpOiB2b2lkIHtcblx0Y29uc3QgdGhpc0NvbmZpZzogT3B0aW9ucyA9IHRoaXMuY29uZmlnO1xuXHRsZXQgdGFyZ2V0O1xuXHRsZXQga2V5cztcblx0bGV0IHJlYWQ7XG5cblx0Y29uc3QgZmluZCA9ICgpID0+IHtcblx0XHRjb25zdCBrZXkgPSBrZXlzLnNoaWZ0KCk7XG5cblx0XHRpZiAoa2V5ICYmIHRhcmdldCAmJiBpc09iamVjdFR5cGUodGFyZ2V0KSAmJiBrZXkgaW4gdGFyZ2V0KSB7XG5cdFx0XHR0YXJnZXQgPSB0YXJnZXRba2V5XTtcblx0XHRcdHJldHVybiBmaW5kKCk7XG5cdFx0fSBlbHNlIGlmICgha2V5KSB7XG5cdFx0XHRyZXR1cm4gdGFyZ2V0O1xuXHRcdH1cblxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH07XG5cblx0T2JqZWN0LmtleXModGhpc0NvbmZpZykuZm9yRWFjaChrZXkgPT4ge1xuXHRcdHRhcmdldCA9IGNvbmZpZztcblx0XHRrZXlzID0ga2V5LnNwbGl0KFwiX1wiKTtcblx0XHRyZWFkID0gZmluZCgpO1xuXG5cdFx0aWYgKGlzRGVmaW5lZChyZWFkKSkge1xuXHRcdFx0dGhpc0NvbmZpZ1trZXldID0gcmVhZDtcblx0XHR9XG5cdH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX18xMV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9fMTJfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfXzEzX187IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBvcHRpb24gY2xhc3NcbiAqIEBjbGFzcyBTdGFuZm9yZE9wdGlvbnNcbiAqIEBwYXJhbSB7T3B0aW9uc30gb3B0aW9ucyBTdGFuZm9yZCBwbHVnaW4gb3B0aW9uc1xuICogQGF1Z21lbnRzIFBsdWdpblxuICogQHJldHVybnMge1N0YW5mb3JkT3B0aW9uc31cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wdGlvbnMge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXQgdGhlIGNvbG9yIG9mIHRoZSBjb2xvciBzY2FsZS4gVGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhIHZhbHVlIGJldHdlZW4gMCBhbmQgMSwgYW5kIHNob3VsZCByZXR1cm4gYSBjb2xvci5cblx0XHRcdCAqIEBuYW1lIGNvbG9yc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0Z1bmN0aW9ufVxuXHRcdFx0ICogQGRlZmF1bHQgdW5kZWZpbmVkXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICBjb2xvcnM6IGQzLmludGVycG9sYXRlSHNsTG9uZyhcblx0XHRcdCAqICAgICAgZDMuaHNsKDI1MCwgMSwgMC41KSwgZDMuaHNsKDAsIDEsIDAuNSlcblx0XHRcdCAqICAgKVxuXHRcdFx0ICovXG5cdFx0XHRjb2xvcnM6IHVuZGVmaW5lZCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTcGVjaWZ5IHRoZSBrZXkgb2YgZXBvY2hzIHZhbHVlcyBpbiB0aGUgZGF0YS5cblx0XHRcdCAqIEBuYW1lIGVwb2Noc1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge0FycmF5fVxuXHRcdFx0ICogQGRlZmF1bHQgW11cblx0XHRcdCAqIEBleGFtcGxlXG5cdFx0XHQgKiBcdGVwb2NoczogWyAxLCAxLCAyLCAyLCAuLi4gXVxuXHRcdFx0ICovXG5cdFx0XHRlcG9jaHM6IDxudW1iZXJbXT4gW10sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2hvdyBhZGRpdGlvbmFsIGxpbmVzIGFueXdoZXJlIG9uIHRoZSBjaGFydC5cblx0XHRcdCAqIC0gRWFjaCBsaW5lIG9iamVjdCBzaG91bGQgY29uc2lzdCB3aXRoIGZvbGxvd2luZyBvcHRpb25zOlxuXHRcdFx0ICpcblx0XHRcdCAqIHwgS2V5IHwgVHlwZSB8IERlc2NyaXB0aW9uIHxcblx0XHRcdCAqIHwgLS0tIHwgLS0tIHwgLS0tIHxcblx0XHRcdCAqIHwgeDEgfCBOdW1iZXIgfCBTdGFydGluZyBwb3NpdGlvbiBvbiB0aGUgeCBheGlzIHxcblx0XHRcdCAqIHwgeTEgfCBOdW1iZXIgfCBTdGFydGluZyBwb3NpdGlvbiBvbiB0aGUgeSBheGlzIHxcblx0XHRcdCAqIHwgeDIgfCBOdW1iZXIgfCBFbmRpbmcgcG9zaXRpb24gb24gdGhlIHggYXhpcyAgfFxuXHRcdFx0ICogfCB5MiB8IE51bWJlciB8IEVuZGluZyBwb3NpdGlvbiBvbiB0aGUgeSBheGlzIHxcblx0XHRcdCAqIHwgY2xhc3MgfCBTdHJpbmcgfCBPcHRpb25hbCB2YWx1ZS4gU2V0IGEgY3VzdG9tIGNzcyBjbGFzcyB0byB0aGlzIGxpbmUuIHxcblx0XHRcdCAqIEB0eXBlIHtBcnJheX1cblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEBkZWZhdWx0IFtdXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogICBsaW5lczogW1xuXHRcdFx0ICogICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXG5cdFx0XHQgKiAgICAgICB7IHgxOiAwLCB4MjogNjUsIHkxOiA0MCwgeTI6IDQwLCBjbGFzczogXCJsaW5lMlwiIH1cblx0XHRcdCAqICAgXVxuXHRcdFx0ICovXG5cdFx0XHRsaW5lczogW10sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2V0IHNjYWxlIHZhbHVlc1xuXHRcdFx0ICogQG5hbWUgc2NhbGVcblx0XHRcdCAqIEBtZW1iZXJvZiBwbHVnaW4tc3RhbmZvcmRcblx0XHRcdCAqIEB0eXBlIHtvYmplY3R9XG5cdFx0XHQgKiBAcHJvcGVydHkge29iamVjdH0gW3NjYWxlXSBzY2FsZSBvYmplY3Rcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUubWluPXVuZGVmaW5lZF0gTWluaW11bSB2YWx1ZSBvZiB0aGUgY29sb3Igc2NhbGUuIERlZmF1bHQ6IGxvd2VzdCB2YWx1ZSBpbiBlcG9jaHNcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbc2NhbGUubWF4PXVuZGVmaW5lZF0gTWF4aW11bSB2YWx1ZSBvZiB0aGUgY29sb3Igc2NhbGUuIERlZmF1bHQ6IGhpZ2hlc3QgdmFsdWUgaW4gZXBvY2hzXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3NjYWxlLndpZHRoPTIwXSBXaWR0aCBvZiB0aGUgY29sb3Igc2NhbGVcblx0XHRcdCAqIEBwcm9wZXJ0eSB7c3RyaW5nfEZ1bmN0aW9ufSBbc2NhbGUuZm9ybWF0PXVuZGVmaW5lZF0gRm9ybWF0IG9mIHRoZSBheGlzIG9mIHRoZSBjb2xvciBzY2FsZS4gVXNlICdwb3cxMCcgdG8gZm9ybWF0IGFzIHBvd2VycyBvZiAxMCBvciBhIGN1c3RvbSBmdW5jdGlvbi4gRXhhbXBsZTogZDMuZm9ybWF0KFwiZFwiKVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICBzY2FsZToge1xuXHRcdFx0ICogICAgbWF4OiAxMDAwMCxcblx0XHRcdCAqICAgIG1pbjogMSxcblx0XHRcdCAqICAgIHdpZHRoOiA1MDAsXG5cdFx0XHQgKlxuXHRcdFx0ICogICAgLy8gc3BlY2lmeSAncG93MTAnIHRvIGZvcm1hdCBhcyBwb3dlcnMgb2YgMTBcblx0XHRcdCAqICAgIGZvcm1hdDogXCJwb3cxMFwiLFxuXHRcdFx0ICpcblx0XHRcdCAqICAgIC8vIG9yIHNwZWNpZnkgYSBmb3JtYXQgZnVuY3Rpb25cblx0XHRcdCAqICAgIGZvcm1hdDogZnVuY3Rpb24oeCkge1xuXHRcdFx0ICogICAgXHRyZXR1cm4geCArXCIlXCI7XG5cdFx0XHQgKiAgICB9XG5cdFx0XHQgKiAgfSxcblx0XHRcdCAqL1xuXHRcdFx0c2NhbGVfbWluOiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxuXHRcdFx0c2NhbGVfbWF4OiA8bnVtYmVyfHVuZGVmaW5lZD4gdW5kZWZpbmVkLFxuXHRcdFx0c2NhbGVfd2lkdGg6IDxudW1iZXJ8dW5kZWZpbmVkPiAyMCxcblx0XHRcdHNjYWxlX2Zvcm1hdDogPG51bWJlcnx1bmRlZmluZWQ+IHVuZGVmaW5lZCxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgcGFkZGluZyBmb3IgY29sb3Igc2NhbGUgZWxlbWVudFxuXHRcdFx0ICogQG5hbWUgcGFkZGluZ1xuXHRcdFx0ICogQG1lbWJlcm9mIHBsdWdpbi1zdGFuZm9yZFxuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBbcGFkZGluZ10gcGFkZGluZyBvYmplY3Rcblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy50b3A9MF0gVG9wIHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcucmlnaHQ9MF0gUmlnaHQgcGFkZGluZyB2YWx1ZS5cblx0XHRcdCAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbcGFkZGluZy5ib3R0b209MF0gQm90dG9tIHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAcHJvcGVydHkge251bWJlcn0gW3BhZGRpbmcubGVmdD0wXSBMZWZ0IHBhZGRpbmcgdmFsdWUuXG5cdFx0XHQgKiBAZXhhbXBsZVxuXHRcdFx0ICogIHBhZGRpbmc6IHtcblx0XHRcdCAqICAgICB0b3A6IDE1LFxuXHRcdFx0ICogICAgIHJpZ2h0OiAwLFxuXHRcdFx0ICogICAgIGJvdHRvbTogMCxcblx0XHRcdCAqICAgICBsZWZ0OiAwXG5cdFx0XHQgKiAgfSxcblx0XHRcdCAqL1xuXHRcdFx0cGFkZGluZ190b3A6IDAsXG5cdFx0XHRwYWRkaW5nX3JpZ2h0OiAwLFxuXHRcdFx0cGFkZGluZ19ib3R0b206IDAsXG5cdFx0XHRwYWRkaW5nX2xlZnQ6IDAsXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2hvdyBhZGRpdGlvbmFsIHJlZ2lvbnMgYW55d2hlcmUgb24gdGhlIGNoYXJ0LlxuXHRcdFx0ICogLSBFYWNoIHJlZ2lvbiBvYmplY3Qgc2hvdWxkIGNvbnNpc3Qgd2l0aCBmb2xsb3dpbmcgb3B0aW9uczpcblx0XHRcdCAqXG5cdFx0XHQgKiAgIHwgS2V5IHwgVHlwZSB8IERlZmF1bHQgfCBBdHRyaWJ1dGVzIHwgRGVzY3JpcHRpb24gfFxuXHRcdFx0ICogICB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8IC0tLSB8XG5cdFx0XHQgKiAgIHwgcG9pbnRzIHwgQXJyYXkgfCAgfCB8IEFjY2VwdHMgYSBncm91cCBvZiBvYmplY3RzIHRoYXQgaGFzIHggYW5kIHkuPGJyPlRoZXNlIHBvaW50cyBzaG91bGQgYmUgYWRkZWQgaW4gYSBjb3VudGVyLWNsb2Nrd2lzZSBmYXNoaW9uIHRvIG1ha2UgYSBjbG9zZWQgcG9seWdvbi4gfFxuXHRcdFx0ICogICB8IG9wYWNpdHkgfCBOdW1iZXIgfCBgMC4yYCB8ICZsdDtvcHRpb25hbD4gfCBTZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSByZWdpb24gYXMgdmFsdWUgYmV0d2VlbiAwIGFuZCAxIHxcblx0XHRcdCAqICAgfCB0ZXh0IHwgRnVuY3Rpb24gfCAgfCAmbHQ7b3B0aW9uYWw+IHwgVGhpcyBmdW5jdGlvbiByZWNlaXZlcyBhIHZhbHVlIGFuZCBwZXJjZW50YWdlIG9mIHRoZSBudW1iZXIgb2YgZXBvY2hzIGluIHRoaXMgcmVnaW9uLjxicj5SZXR1cm4gYSBzdHJpbmcgdG8gcGxhY2UgdGV4dCBpbiB0aGUgbWlkZGxlIG9mIHRoZSByZWdpb24uIHxcblx0XHRcdCAqICAgfCBjbGFzcyB8IFN0cmluZyB8IHwgJmx0O29wdGlvbmFsPiB8IFNlIGEgY3VzdG9tIGNzcyBjbGFzcyB0byB0aGlzIHJlZ2lvbiwgdXNlIHRoZSBmaWxsIHByb3BlcnR5IGluIGNzcyB0byBzZXQgYSBiYWNrZ3JvdW5kIGNvbG9yLiB8XG5cdFx0XHQgKiBAbmFtZSByZWdpb25zXG5cdFx0XHQgKiBAbWVtYmVyb2YgcGx1Z2luLXN0YW5mb3JkXG5cdFx0XHQgKiBAdHlwZSB7QXJyYXl9XG5cdFx0XHQgKiBAZGVmYXVsdCBbXVxuXHRcdFx0ICogQGV4YW1wbGVcblx0XHRcdCAqICAgcmVnaW9uczogW1xuXHRcdFx0ICogICAgICAge1xuXHRcdFx0ICogICAgICAgICAgIHBvaW50czogWyAvLyBhZGQgcG9pbnRzIGNvdW50ZXItY2xvY2t3aXNlXG5cdFx0XHQgKiAgICAgICAgICAgICAgIHsgeDogMCwgeTogMCB9LFxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDQwLCB5OiA0MCB9LFxuXHRcdFx0ICogICAgICAgICAgICAgICB7IHg6IDAsIHk6IDQwIH0sXG5cdFx0XHQgKiAgICAgICAgICAgXSxcblx0XHRcdCAqICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcblx0XHRcdCAqICAgICAgICAgICAgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG5cdFx0XHQgKiAgICAgICAgICAgfSxcblx0XHRcdCAqICAgICAgICAgICBvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuXHRcdFx0ICogICAgICAgICAgIGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuXHRcdFx0ICogICAgICAgfSxcblx0XHRcdCAqICAgICAgIC4uLlxuXHRcdFx0ICogICBdXG5cdFx0XHQgKi9cblx0XHRcdHJlZ2lvbnM6IFtdXG5cdFx0fTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBDU1MgY2xhc3MgbmFtZXMgZGVmaW5pdGlvblxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQge1xuXHRjb2xvclNjYWxlOiBcImJiLWNvbG9yc2NhbGVcIixcblx0c3RhbmZvcmRFbGVtZW50czogXCJiYi1zdGFuZm9yZC1lbGVtZW50c1wiLFxuXHRzdGFuZm9yZExpbmU6IFwiYmItc3RhbmZvcmQtbGluZVwiLFxuXHRzdGFuZm9yZExpbmVzOiBcImJiLXN0YW5mb3JkLWxpbmVzXCIsXG5cdHN0YW5mb3JkUmVnaW9uOiBcImJiLXN0YW5mb3JkLXJlZ2lvblwiLFxuXHRzdGFuZm9yZFJlZ2lvbnM6IFwiYmItc3RhbmZvcmQtcmVnaW9uc1wiXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuXG5pbXBvcnQge2dldFJhbmdlLCBpc0VtcHR5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgcGFyc2VEYXRlfSBmcm9tIFwiLi4vLi4vbW9kdWxlL3V0aWxcIjtcblxuLyoqXG4gKiBDaGVjayBpZiBwb2ludCBpcyBpbiByZWdpb25cbiAqIEBwYXJhbSB7b2JqZWN0fSBwb2ludCBQb2ludFxuICogQHBhcmFtIHtBcnJheX0gcmVnaW9uIFJlZ2lvblxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwb2ludEluUmVnaW9uKHBvaW50LCByZWdpb24pOiBib29sZWFuIHsgLy8gdGhhbmtzIHRvOiBodHRwOi8vYmwub2Nrcy5vcmcvYnljb2ZmZS81NTc1OTA0XG5cdC8vIHJheS1jYXN0aW5nIGFsZ29yaXRobSBiYXNlZCBvblxuXHQvLyBodHRwOi8vd3d3LmVjc2UucnBpLmVkdS9Ib21lcGFnZXMvd3JmL1Jlc2VhcmNoL1Nob3J0X05vdGVzL3BucG9seS5odG1sXG5cdGNvbnN0IHggPSBwb2ludC54O1xuXHRjb25zdCB5ID0gcG9pbnQudmFsdWU7XG5cdGxldCBpbnNpZGUgPSBmYWxzZTtcblxuXHRmb3IgKGxldCBpID0gMCwgaiA9IHJlZ2lvbi5sZW5ndGggLSAxOyBpIDwgcmVnaW9uLmxlbmd0aDsgaiA9IGkrKykge1xuXHRcdGNvbnN0IHhpID0gcmVnaW9uW2ldLng7XG5cdFx0Y29uc3QgeWkgPSByZWdpb25baV0ueTtcblxuXHRcdGNvbnN0IHhqID0gcmVnaW9uW2pdLng7XG5cdFx0Y29uc3QgeWogPSByZWdpb25bal0ueTtcblxuXHRcdGNvbnN0IGludGVyc2VjdCA9ICgoeWkgPiB5KSAhPT0gKHlqID4geSkpICYmICh4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSk7XG5cblx0XHRpZiAoaW50ZXJzZWN0KSB7XG5cdFx0XHRpbnNpZGUgPSAhaW5zaWRlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiBpbnNpZGU7XG59XG5cbi8qKlxuICogQ29tcGFyZSBlcG9jaHNcbiAqIEBwYXJhbSB7b2JqZWN0fSBhIFRhcmdldFxuICogQHBhcmFtIHtvYmplY3R9IGIgU291cmNlXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY29tcGFyZUVwb2NocyhhLCBiKTogbnVtYmVyIHtcblx0aWYgKGEuZXBvY2hzIDwgYi5lcG9jaHMpIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRpZiAoYS5lcG9jaHMgPiBiLmVwb2Nocykge1xuXHRcdHJldHVybiAxO1xuXHR9XG5cblx0cmV0dXJuIDA7XG59XG5cbi8qKlxuICogR2V0IHJlZ2lvbiBhcmVhXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHMgUG9pbnRzXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmVnaW9uQXJlYShwb2ludHMpOiBudW1iZXIgeyAvLyB0aGFua3MgdG86IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE2MjgyMzMwL2ZpbmQtY2VudGVycG9pbnQtb2YtcG9seWdvbi1pbi1qYXZhc2NyaXB0XG5cdGxldCBhcmVhID0gMDtcblx0bGV0IHBvaW50MTtcblx0bGV0IHBvaW50MjtcblxuXHRmb3IgKGxldCBpID0gMCwgbCA9IHBvaW50cy5sZW5ndGgsIGogPSBsIC0gMTsgaSA8IGw7IGogPSBpLCBpKyspIHtcblx0XHRwb2ludDEgPSBwb2ludHNbaV07XG5cdFx0cG9pbnQyID0gcG9pbnRzW2pdO1xuXHRcdGFyZWEgKz0gcG9pbnQxLnggKiBwb2ludDIueTtcblx0XHRhcmVhIC09IHBvaW50MS55ICogcG9pbnQyLng7XG5cdH1cblxuXHRhcmVhIC89IDI7XG5cblx0cmV0dXJuIGFyZWE7XG59XG5cbi8qKlxuICogR2V0IGNlbnRyb2lkXG4gKiBAcGFyYW0ge0FycmF5fSBwb2ludHMgUG9pbnRzXG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudHJvaWQocG9pbnRzKSB7XG5cdGNvbnN0IGFyZWEgPSBnZXRSZWdpb25BcmVhKHBvaW50cyk7XG5cblx0bGV0IHggPSAwO1xuXHRsZXQgeSA9IDA7XG5cdGxldCBmO1xuXG5cdGZvciAobGV0IGkgPSAwLCBsID0gcG9pbnRzLmxlbmd0aCwgaiA9IGwgLSAxOyBpIDwgbDsgaiA9IGksIGkrKykge1xuXHRcdGNvbnN0IHBvaW50MSA9IHBvaW50c1tpXTtcblx0XHRjb25zdCBwb2ludDIgPSBwb2ludHNbal07XG5cblx0XHRmID0gcG9pbnQxLnggKiBwb2ludDIueSAtIHBvaW50Mi54ICogcG9pbnQxLnk7XG5cdFx0eCArPSAocG9pbnQxLnggKyBwb2ludDIueCkgKiBmO1xuXHRcdHkgKz0gKHBvaW50MS55ICsgcG9pbnQyLnkpICogZjtcblx0fVxuXG5cdGYgPSBhcmVhICogNjtcblxuXHRyZXR1cm4ge1xuXHRcdHg6IHggLyBmLFxuXHRcdHk6IHkgLyBmXG5cdH07XG59XG5cbmV4cG9ydCB7XG5cdGNvbXBhcmVFcG9jaHMsXG5cdGdldENlbnRyb2lkLFxuXHRnZXRSYW5nZSxcblx0Z2V0UmVnaW9uQXJlYSxcblx0aXNFbXB0eSxcblx0aXNGdW5jdGlvbixcblx0aXNTdHJpbmcsXG5cdHBhcnNlRGF0ZSxcblx0cG9pbnRJblJlZ2lvblxufTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8vIEB0cy1ub2NoZWNrXG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4vY2xhc3Nlc1wiO1xuaW1wb3J0IHtnZXRDZW50cm9pZCwgaXNTdHJpbmcsIHBhcnNlRGF0ZX0gZnJvbSBcIi4vdXRpbFwiO1xuXG4vKipcbiAqIFN0YW5mb3JkIGRpYWdyYW0gcGx1Z2luIGVsZW1lbnQgY2xhc3NcbiAqIEBjbGFzcyBDb2xvclNjYWxlXG4gKiBAcGFyYW0ge1N0YW5mb3JkfSBvd25lciBTdGFuZm9yZCBpbnN0YW5jZVxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRWxlbWVudHMge1xuXHRwcml2YXRlIG93bmVyO1xuXG5cdGNvbnN0cnVjdG9yKG93bmVyKSB7XG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xuXG5cdFx0Ly8gTUVNTzogQXZvaWQgYmxvY2tpbmcgZXZlbnRSZWN0XG5cdFx0Y29uc3QgZWxlbWVudHMgPSBvd25lci4kJC4kZWwubWFpbi5zZWxlY3QoXCIuYmItY2hhcnRcIilcblx0XHRcdC5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIENMQVNTLnN0YW5mb3JkRWxlbWVudHMpO1xuXG5cdFx0ZWxlbWVudHMuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRMaW5lcyk7XG5cdFx0ZWxlbWVudHMuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgQ0xBU1Muc3RhbmZvcmRSZWdpb25zKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkTGluZXMoZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzLm93bmVyO1xuXHRcdGNvbnN0IHtjb25maWcsICRlbDoge21haW59fSA9ICQkO1xuXHRcdGNvbnN0IGlzUm90YXRlZCA9IGNvbmZpZy5heGlzX3JvdGF0ZWQ7XG5cdFx0Y29uc3QgeHZDdXN0b20gPSB0aGlzLnh2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IHl2Q3VzdG9tID0gdGhpcy55dkN1c3RvbS5iaW5kKCQkKTtcblxuXHRcdC8vIFN0YW5mb3JkLUxpbmVzXG5cdFx0Y29uc3Qgc3RhbmZvcmRMaW5lID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLnN0YW5mb3JkTGluZXN9YClcblx0XHRcdC5zdHlsZShcInNoYXBlLXJlbmRlcmluZ1wiLCBcImdlb21ldHJpY3ByZWNpc2lvblwiKVxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRMaW5lfWApXG5cdFx0XHQuZGF0YSh0aGlzLm93bmVyLmNvbmZpZy5saW5lcyk7XG5cblx0XHQvLyBleGl0XG5cdFx0c3RhbmZvcmRMaW5lLmV4aXQoKS50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG5cdFx0XHQucmVtb3ZlKCk7XG5cblx0XHQvLyBlbnRlclxuXHRcdGNvbnN0IHN0YW5mb3JkTGluZUVudGVyID0gc3RhbmZvcmRMaW5lLmVudGVyKCkuYXBwZW5kKFwiZ1wiKTtcblxuXHRcdHN0YW5mb3JkTGluZUVudGVyLmFwcGVuZChcImxpbmVcIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRMaW5lRW50ZXJcblx0XHRcdC5tZXJnZShzdGFuZm9yZExpbmUpXG5cdFx0XHQuYXR0cihcImNsYXNzXCIsIGQgPT4gQ0xBU1Muc3RhbmZvcmRMaW5lICsgKGQuY2xhc3MgPyBgICR7ZC5jbGFzc31gIDogXCJcIikpXG5cdFx0XHQuc2VsZWN0KFwibGluZVwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LmR1cmF0aW9uKGR1cmF0aW9uKVxuXHRcdFx0LmF0dHIoXCJ4MVwiLCBkID0+IChpc1JvdGF0ZWQgPyB5dkN1c3RvbShkLCBcInkxXCIpIDogeHZDdXN0b20oZCwgXCJ4MVwiKSkpXG5cdFx0XHQuYXR0cihcIngyXCIsIGQgPT4gKGlzUm90YXRlZCA/IHl2Q3VzdG9tKGQsIFwieTJcIikgOiB4dkN1c3RvbShkLCBcIngyXCIpKSlcblx0XHRcdC5hdHRyKFwieTFcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZCwgXCJ4MVwiKSA6IHl2Q3VzdG9tKGQsIFwieTFcIikpKVxuXHRcdFx0LmF0dHIoXCJ5MlwiLCBkID0+IChpc1JvdGF0ZWQgPyB4dkN1c3RvbShkLCBcIngyXCIpIDogeXZDdXN0b20oZCwgXCJ5MlwiKSkpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuc3R5bGUoXCJvcGFjaXR5XCIsIFwiMVwiKTtcblx0fVxuXG5cdHVwZGF0ZVN0YW5mb3JkUmVnaW9ucyhkdXJhdGlvbjogbnVtYmVyKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkfSA9IHRoaXMub3duZXI7XG5cdFx0Y29uc3Qge2NvbmZpZywgJGVsOiB7bWFpbn19ID0gJCQ7XG5cdFx0Y29uc3QgaXNSb3RhdGVkID0gY29uZmlnLmF4aXNfcm90YXRlZDtcblx0XHRjb25zdCB4dkN1c3RvbSA9IHRoaXMueHZDdXN0b20uYmluZCgkJCk7XG5cdFx0Y29uc3QgeXZDdXN0b20gPSB0aGlzLnl2Q3VzdG9tLmJpbmQoJCQpO1xuXHRcdGNvbnN0IGNvdW50UG9pbnRzSW5SZWdpb24gPSB0aGlzLm93bmVyLmNvdW50RXBvY2hzSW5SZWdpb24uYmluZCgkJCk7XG5cblx0XHQvLyBTdGFuZm9yZC1SZWdpb25zXG5cdFx0bGV0IHN0YW5mb3JkUmVnaW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLnN0YW5mb3JkUmVnaW9uc31gKVxuXHRcdFx0LnNlbGVjdEFsbChgLiR7Q0xBU1Muc3RhbmZvcmRSZWdpb259YClcblx0XHRcdC5kYXRhKHRoaXMub3duZXIuY29uZmlnLnJlZ2lvbnMpO1xuXG5cdFx0Ly8gZXhpdFxuXHRcdHN0YW5mb3JkUmVnaW9uLmV4aXQoKS50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpXG5cdFx0XHQucmVtb3ZlKCk7XG5cblx0XHQvLyBlbnRlclxuXHRcdGNvbnN0IHN0YW5mb3JkUmVnaW9uRW50ZXIgPSBzdGFuZm9yZFJlZ2lvbi5lbnRlcigpLmFwcGVuZChcImdcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbkVudGVyLmFwcGVuZChcInBvbHlnb25cIilcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgXCIwXCIpO1xuXG5cdFx0c3RhbmZvcmRSZWdpb25FbnRlci5hcHBlbmQoXCJ0ZXh0XCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBpc1JvdGF0ZWQgPyBcInJvdGF0ZSgtOTApXCIgOiBcIlwiKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjBcIik7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbiA9IHN0YW5mb3JkUmVnaW9uRW50ZXIubWVyZ2Uoc3RhbmZvcmRSZWdpb24pO1xuXG5cdFx0Ly8gdXBkYXRlXG5cdFx0c3RhbmZvcmRSZWdpb25cblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgZCA9PiBDTEFTUy5zdGFuZm9yZFJlZ2lvbiArIChkLmNsYXNzID8gYCAke2QuY2xhc3N9YCA6IFwiXCIpKVxuXHRcdFx0LnNlbGVjdChcInBvbHlnb25cIilcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5kdXJhdGlvbihkdXJhdGlvbilcblx0XHRcdC5hdHRyKFwicG9pbnRzXCIsIGQgPT4gZC5wb2ludHMubWFwKHZhbHVlID0+IFtcblx0XHRcdFx0aXNSb3RhdGVkID8geXZDdXN0b20odmFsdWUsIFwieVwiKSA6IHh2Q3VzdG9tKHZhbHVlLCBcInhcIiksXG5cdFx0XHRcdGlzUm90YXRlZCA/IHh2Q3VzdG9tKHZhbHVlLCBcInhcIikgOiB5dkN1c3RvbSh2YWx1ZSwgXCJ5XCIpXG5cdFx0XHRdLmpvaW4oXCIsXCIpKS5qb2luKFwiIFwiKSlcblx0XHRcdC50cmFuc2l0aW9uKClcblx0XHRcdC5zdHlsZShcIm9wYWNpdHlcIiwgZCA9PiBTdHJpbmcoZC5vcGFjaXR5ID8gZC5vcGFjaXR5IDogMC4yKSk7XG5cblx0XHRzdGFuZm9yZFJlZ2lvbi5zZWxlY3QoXCJ0ZXh0XCIpXG5cdFx0XHQudHJhbnNpdGlvbigpXG5cdFx0XHQuZHVyYXRpb24oZHVyYXRpb24pXG5cdFx0XHQuYXR0cihcInhcIiwgZCA9PiAoaXNSb3RhdGVkID8geXZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInlcIikgOiB4dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieFwiKSkpXG5cdFx0XHQuYXR0cihcInlcIiwgZCA9PiAoaXNSb3RhdGVkID8geHZDdXN0b20oZ2V0Q2VudHJvaWQoZC5wb2ludHMpLCBcInhcIikgOiB5dkN1c3RvbShnZXRDZW50cm9pZChkLnBvaW50cyksIFwieVwiKSkpXG5cdFx0XHQudGV4dChkID0+IHtcblx0XHRcdFx0aWYgKGQudGV4dCkge1xuXHRcdFx0XHRcdGNvbnN0IHt2YWx1ZSwgcGVyY2VudGFnZX0gPSBjb3VudFBvaW50c0luUmVnaW9uKGQucG9pbnRzKTtcblxuXHRcdFx0XHRcdHJldHVybiBkLnRleHQodmFsdWUsIHBlcmNlbnRhZ2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0XHR9KVxuXHRcdFx0LmF0dHIoXCJ0ZXh0LWFuY2hvclwiLCBcIm1pZGRsZVwiKVxuXHRcdFx0LmF0dHIoXCJkb21pbmFudC1iYXNlbGluZVwiLCBcIm1pZGRsZVwiKVxuXHRcdFx0LnRyYW5zaXRpb24oKVxuXHRcdFx0LnN0eWxlKFwib3BhY2l0eVwiLCBcIjFcIik7XG5cdH1cblxuXHR1cGRhdGVTdGFuZm9yZEVsZW1lbnRzKGR1cmF0aW9uID0gMCk6IHZvaWQge1xuXHRcdHRoaXMudXBkYXRlU3RhbmZvcmRMaW5lcyhkdXJhdGlvbik7XG5cdFx0dGhpcy51cGRhdGVTdGFuZm9yZFJlZ2lvbnMoZHVyYXRpb24pO1xuXHR9XG5cblx0eHZDdXN0b20oZCwgeHlWYWx1ZSk6IG51bWJlciB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHtheGlzLCBjb25maWd9ID0gJCQ7XG5cdFx0bGV0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRpZiAoYXhpcy5pc1RpbWVTZXJpZXMoKSkge1xuXHRcdFx0dmFsdWUgPSBwYXJzZURhdGUuY2FsbCgkJCwgdmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoYXhpcy5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IGNvbmZpZy5heGlzX3hfY2F0ZWdvcmllcy5pbmRleE9mKGQudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoJCQuc2NhbGUueCh2YWx1ZSkpO1xuXHR9XG5cblx0eXZDdXN0b20oZCwgeHlWYWx1ZSk6IG51bWJlciB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHlTY2FsZSA9IGQuYXhpcyAmJiBkLmF4aXMgPT09IFwieTJcIiA/ICQkLnNjYWxlLnkyIDogJCQuc2NhbGUueTtcblx0XHRjb25zdCB2YWx1ZSA9IHh5VmFsdWUgPyBkW3h5VmFsdWVdIDogJCQuZ2V0QmFzZVZhbHVlKGQpO1xuXG5cdFx0cmV0dXJuIE1hdGguY2VpbCh5U2NhbGUodmFsdWUpKTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHtheGlzUmlnaHQgYXMgZDNBeGlzUmlnaHR9IGZyb20gXCJkMy1heGlzXCI7XG5pbXBvcnQge2Zvcm1hdCBhcyBkM0Zvcm1hdH0gZnJvbSBcImQzLWZvcm1hdFwiO1xuaW1wb3J0IHtzY2FsZVNlcXVlbnRpYWwgYXMgZDNTY2FsZVNlcXVlbnRpYWwsIHNjYWxlTG9nIGFzIGQzU2NhbGVMb2d9IGZyb20gXCJkMy1zY2FsZVwiO1xuaW1wb3J0IENMQVNTIGZyb20gXCIuL2NsYXNzZXNcIjtcbmltcG9ydCB7aXNGdW5jdGlvbiwgZ2V0UmFuZ2V9IGZyb20gXCIuL3V0aWxcIjtcblxuLyoqXG4gKiBTdGFuZm9yZCBkaWFncmFtIHBsdWdpbiBjb2xvciBzY2FsZSBjbGFzc1xuICogQGNsYXNzIENvbG9yU2NhbGVcbiAqIEBwYXJhbSB7U3RhbmZvcmR9IG93bmVyIFN0YW5mb3JkIGluc3RhbmNlXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvclNjYWxlIHtcblx0cHJpdmF0ZSBvd25lcjtcblx0cHJpdmF0ZSBjb2xvclNjYWxlO1xuXG5cdGNvbnN0cnVjdG9yKG93bmVyKSB7XG5cdFx0dGhpcy5vd25lciA9IG93bmVyO1xuXHR9XG5cblx0ZHJhd0NvbG9yU2NhbGUoKTogdm9pZCB7XG5cdFx0Y29uc3QgeyQkLCBjb25maWd9ID0gdGhpcy5vd25lcjtcblx0XHRjb25zdCB0YXJnZXQgPSAkJC5kYXRhLnRhcmdldHNbMF07XG5cdFx0Y29uc3QgaGVpZ2h0ID0gJCQuc3RhdGUuaGVpZ2h0IC0gY29uZmlnLnBhZGRpbmdfYm90dG9tIC0gY29uZmlnLnBhZGRpbmdfdG9wO1xuXHRcdGNvbnN0IGJhcldpZHRoID0gY29uZmlnLnNjYWxlX3dpZHRoO1xuXHRcdGNvbnN0IGJhckhlaWdodCA9IDU7XG5cdFx0Y29uc3QgcG9pbnRzID0gZ2V0UmFuZ2UoY29uZmlnLnBhZGRpbmdfYm90dG9tLCBoZWlnaHQsIGJhckhlaWdodCk7XG5cblx0XHRjb25zdCBpbnZlcnNlU2NhbGUgPSBkM1NjYWxlU2VxdWVudGlhbCh0YXJnZXQuY29sb3JzKVxuXHRcdFx0LmRvbWFpbihbcG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXSwgcG9pbnRzWzBdXSk7XG5cblx0XHRpZiAodGhpcy5jb2xvclNjYWxlKSB7XG5cdFx0XHR0aGlzLmNvbG9yU2NhbGUucmVtb3ZlKCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5jb2xvclNjYWxlID0gJCQuJGVsLnN2Zy5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcIndpZHRoXCIsIDUwKVxuXHRcdFx0LmF0dHIoXCJoZWlnaHRcIiwgaGVpZ2h0KVxuXHRcdFx0LmF0dHIoXCJjbGFzc1wiLCBDTEFTUy5jb2xvclNjYWxlKTtcblxuXHRcdHRoaXMuY29sb3JTY2FsZS5hcHBlbmQoXCJnXCIpXG5cdFx0XHQuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKDAsICR7Y29uZmlnLnBhZGRpbmdfdG9wfSlgKVxuXHRcdFx0LnNlbGVjdEFsbChcImJhcnNcIilcblx0XHRcdC5kYXRhKHBvaW50cylcblx0XHRcdC5lbnRlcigpXG5cdFx0XHQuYXBwZW5kKFwicmVjdFwiKVxuXHRcdFx0LmF0dHIoXCJ5XCIsIChkLCBpKSA9PiBpICogYmFySGVpZ2h0KVxuXHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHQuYXR0cihcIndpZHRoXCIsIGJhcldpZHRoKVxuXHRcdFx0LmF0dHIoXCJoZWlnaHRcIiwgYmFySGVpZ2h0KVxuXHRcdFx0LmF0dHIoXCJmaWxsXCIsIGQgPT4gaW52ZXJzZVNjYWxlKGQpKTtcblxuXHRcdC8vIExlZ2VuZCBBeGlzXG5cdFx0Y29uc3QgYXhpc1NjYWxlID0gZDNTY2FsZUxvZygpXG5cdFx0XHQuZG9tYWluKFt0YXJnZXQubWluRXBvY2hzLCB0YXJnZXQubWF4RXBvY2hzXSlcblx0XHRcdC5yYW5nZShbXG5cdFx0XHRcdHBvaW50c1swXSArIGNvbmZpZy5wYWRkaW5nX3RvcCArIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0gKyBiYXJIZWlnaHQgLSAxLFxuXHRcdFx0XHRwb2ludHNbMF0gKyBjb25maWcucGFkZGluZ190b3Bcblx0XHRcdF0pO1xuXG5cdFx0Y29uc3QgbGVnZW5kQXhpcyA9IGQzQXhpc1JpZ2h0KGF4aXNTY2FsZSk7XG5cdFx0Y29uc3Qgc2NhbGVGb3JtYXQgPSBjb25maWcuc2NhbGVfZm9ybWF0O1xuXG5cdFx0aWYgKHNjYWxlRm9ybWF0ID09PSBcInBvdzEwXCIpIHtcblx0XHRcdGxlZ2VuZEF4aXMudGlja1ZhbHVlcyhbMSwgMTAsIDEwMCwgMTAwMCwgMTAwMDAsIDEwMDAwMCwgMTAwMDAwMCwgMTAwMDAwMDBdKTtcblx0XHR9IGVsc2UgaWYgKGlzRnVuY3Rpb24oc2NhbGVGb3JtYXQpKSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tGb3JtYXQoc2NhbGVGb3JtYXQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZWdlbmRBeGlzLnRpY2tGb3JtYXQoZDNGb3JtYXQoXCJkXCIpKTtcblx0XHR9XG5cblx0XHQvLyBEcmF3IEF4aXNcblx0XHRjb25zdCBheGlzID0gdGhpcy5jb2xvclNjYWxlLmFwcGVuZChcImdcIilcblx0XHRcdC5hdHRyKFwiY2xhc3NcIiwgXCJsZWdlbmQgYXhpc1wiKVxuXHRcdFx0LmF0dHIoXCJ0cmFuc2Zvcm1cIiwgYHRyYW5zbGF0ZSgke2JhcldpZHRofSwwKWApXG5cdFx0XHQuY2FsbChsZWdlbmRBeGlzKTtcblxuXHRcdGlmIChzY2FsZUZvcm1hdCA9PT0gXCJwb3cxMFwiKSB7XG5cdFx0XHRheGlzLnNlbGVjdEFsbChcIi50aWNrIHRleHRcIilcblx0XHRcdFx0LnRleHQobnVsbClcblx0XHRcdFx0LmZpbHRlcihkID0+IGQgLyBNYXRoLnBvdygxMCwgTWF0aC5jZWlsKE1hdGgubG9nKGQpIC8gTWF0aC5MTjEwIC0gMWUtMTIpKSA9PT0gMSkgLy8gUG93ZXIgb2YgVGVuXG5cdFx0XHRcdC50ZXh0KDEwKVxuXHRcdFx0XHQuYXBwZW5kKFwidHNwYW5cIilcblx0XHRcdFx0LmF0dHIoXCJkeVwiLCBcIi0uN2VtXCIpIC8vIGh0dHBzOi8vYmwub2Nrcy5vcmcvbWJvc3RvY2svNjczODIyOVxuXHRcdFx0XHQudGV4dChkID0+IE1hdGgucm91bmQoTWF0aC5sb2coZCkgLyBNYXRoLkxOMTApKTtcblx0XHR9XG5cblx0XHR0aGlzLmNvbG9yU2NhbGUuYXR0cihcInRyYW5zZm9ybVwiLCBgdHJhbnNsYXRlKCR7JCQuc3RhdGUuY3VycmVudC53aWR0aCAtIHRoaXMueEZvckNvbG9yU2NhbGUoKX0sIDApYCk7XG5cdH1cblxuXHR4Rm9yQ29sb3JTY2FsZSgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLm93bmVyLmNvbmZpZy5wYWRkaW5nX3JpZ2h0ICtcblx0XHRcdHRoaXMuY29sb3JTY2FsZS5ub2RlKCkuZ2V0QkJveCgpLndpZHRoO1xuXHR9XG5cblx0Z2V0Q29sb3JTY2FsZVBhZGRpbmcoKTogbnVtYmVyIHtcblx0XHRyZXR1cm4gdGhpcy54Rm9yQ29sb3JTY2FsZSgpICsgdGhpcy5vd25lci5jb25maWcucGFkZGluZ19sZWZ0ICsgMjA7XG5cdH1cbn1cbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE3IH4gcHJlc2VudCBOQVZFUiBDb3JwLlxuICogYmlsbGJvYXJkLmpzIHByb2plY3QgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKi9cbi8vIEB0cy1ub2NoZWNrXG5pbXBvcnQge2ludGVycG9sYXRlSHNsTG9uZyBhcyBkM0ludGVycG9sYXRlSHNsTG9uZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQge2hzbCBhcyBkM0hzbH0gZnJvbSBcImQzLWNvbG9yXCI7XG5pbXBvcnQge3NjYWxlU2VxdWVudGlhbExvZyBhcyBkM1NjYWxlU2VxdWVudGlhbExvZ30gZnJvbSBcImQzLXNjYWxlXCI7XG5pbXBvcnQgQ0xBU1MgZnJvbSBcIi4uLy4uL2NvbmZpZy9jbGFzc2VzXCI7XG5pbXBvcnQge2xvYWRDb25maWd9IGZyb20gXCIuLi8uLi9jb25maWcvY29uZmlnXCI7XG5pbXBvcnQgUGx1Z2luIGZyb20gXCIuLi9QbHVnaW5cIjtcbmltcG9ydCBPcHRpb25zIGZyb20gXCIuL09wdGlvbnNcIjtcbmltcG9ydCBFbGVtZW50cyBmcm9tIFwiLi9FbGVtZW50c1wiO1xuaW1wb3J0IENvbG9yU2NhbGUgZnJvbSBcIi4vQ29sb3JTY2FsZVwiO1xuaW1wb3J0IHtjb21wYXJlRXBvY2hzLCBpc0VtcHR5LCBpc0Z1bmN0aW9uLCBpc1N0cmluZywgcGFyc2VEYXRlLCBwb2ludEluUmVnaW9ufSBmcm9tIFwiLi91dGlsXCI7XG5cbi8qKlxuICogU3RhbmZvcmQgZGlhZ3JhbSBwbHVnaW5cbiAqIC0gKipOT1RFOioqXG4gKiAgIC0gUGx1Z2lucyBhcmVuJ3QgYnVpbHQtaW4uIE5lZWQgdG8gYmUgbG9hZGVkIG9yIGltcG9ydGVkIHRvIGJlIHVzZWQuXG4gKiAgIC0gTm9uIHJlcXVpcmVkIG1vZHVsZXMgZnJvbSBiaWxsYm9hcmQuanMgY29yZSwgbmVlZCB0byBiZSBpbnN0YWxsZWQgc2VwYXJhdGVseS5cbiAqICAgLSBJcyBwcmVmZXJhYmxlIHVzZSBgc2NhdHRlcmAgYXMgZGF0YS50eXBlXG4gKiAtICoqUmVxdWlyZWQgbW9kdWxlczoqKlxuICogICAtIFtkMy1zZWxlY3Rpb25dKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1zZWxlY3Rpb24pXG4gKiAgIC0gW2QzLWludGVycG9sYXRlXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtaW50ZXJwb2xhdGUpXG4gKiAgIC0gW2QzLWNvbG9yXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtY29sb3IpXG4gKiAgIC0gW2QzLXNjYWxlXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtc2NhbGUpXG4gKiAgIC0gW2QzLWJydXNoXShodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtYnJ1c2gpXG4gKiAgIC0gW2QzLWF4aXNdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1heGlzKVxuICogICAtIFtkMy1mb3JtYXRdKGh0dHBzOi8vZ2l0aHViLmNvbS9kMy9kMy1mb3JtYXQpXG4gKiBAY2xhc3MgcGx1Z2luLXN0YW5mb3JkXG4gKiBAcmVxdWlyZXMgZDMtc2VsZWN0aW9uXG4gKiBAcmVxdWlyZXMgZDMtaW50ZXJwb2xhdGVcbiAqIEByZXF1aXJlcyBkMy1jb2xvclxuICogQHJlcXVpcmVzIGQzLXNjYWxlXG4gKiBAcmVxdWlyZXMgZDMtYnJ1c2hcbiAqIEByZXF1aXJlcyBkMy1heGlzXG4gKiBAcmVxdWlyZXMgZDMtZm9ybWF0XG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTdGFuZm9yZCBwbHVnaW4gb3B0aW9uc1xuICogQGF1Z21lbnRzIFBsdWdpblxuICogQHJldHVybnMge1N0YW5mb3JkfVxuICogQGV4YW1wbGVcbiAqICB2YXIgY2hhcnQgPSBiYi5nZW5lcmF0ZSh7XG4gKiAgICAgZGF0YToge1xuICogICAgICAgIGNvbHVtbnM6IFsgLi4uIF0sXG4gKiAgICAgICAgdHlwZTogXCJzY2F0dGVyXCJcbiAqICAgICB9XG4gKiAgICAgLi4uXG4gKiAgICAgcGx1Z2luczogW1xuICogICAgICAgIG5ldyBiYi5wbHVnaW4uc3RhbmZvcmQoe1xuICogICAgICAgICAgIGNvbG9yczogZDMuaW50ZXJwb2xhdGVIc2xMb25nKFxuICogICAgICAgICAgICAgIGQzLmhzbCgyNTAsIDEsIDAuNSksIGQzLmhzbCgwLCAxLCAwLjUpXG4gKiAgICAgICAgICAgKSxcbiAqICAgICAgICAgICBlcG9jaHM6IFsgMSwgMSwgMiwgMiwgLi4uIF0sXG4gKiAgICAgICAgICAgbGluZXM6IFtcbiAqICAgICAgICAgICAgICAgICAgeyB4MTogMCwgeTE6IDAsIHgyOiA2NSwgeTI6IDY1LCBjbGFzczogXCJsaW5lMVwiIH0sXG4gKiAgICAgICAgICAgICAgICAgIHsgeDE6IDAsIHgyOiA2NSwgeTE6IDQwLCB5MjogNDAsIGNsYXNzOiBcImxpbmUyXCIgfVxuICogICAgICAgICAgIF0sXG4gKiAgICAgICAgICAgc2NhbGU6IHtcbiAqICAgICAgICAgICBcdG1heDogMTAwMDAsXG4gKiAgICAgICAgICAgICBcdG1pbjogMSxcbiAqICAgICAgICAgICBcdHdpZHRoOiA1MDAsXG4gKiAgICAgICAgICAgICBcdGZvcm1hdDogJ3BvdzEwJyxcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHBhZGRpbmc6IHtcbiAqICAgICAgICAgICBcdHRvcDogMTUsXG4gKiAgICAgICAgICAgXHRyaWdodDogMCxcbiAqICAgICAgICAgICBcdGJvdHRvbTogMCxcbiAqICAgICAgICAgICBcdGxlZnQ6IDBcbiAqICAgICAgICAgICB9LFxuICogICAgICAgICAgIHJlZ2lvbnM6IFtcbiAqICAgICAgICAgICBcdHtcbiAqICAgICAgICAgICAgICAgXHRwb2ludHM6IFsgLy8gYWRkIHBvaW50cyBjb3VudGVyLWNsb2Nrd2lzZVxuICogICAgICAgICAgICAgICBcdCAgICB7IHg6IDAsIHk6IDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiA0MCwgeTogNDAgfSxcbiAqICAgICAgICAgICAgICAgXHQgICAgeyB4OiAwLCB5OiA0MCB9XG4gKiAgICAgICAgICAgICAgIFx0XSxcbiAqICAgICAgICAgICAgICAgXHR0ZXh0OiBmdW5jdGlvbiAodmFsdWUsIHBlcmNlbnRhZ2UpIHtcbiAqICAgICAgICAgICAgICAgXHQgICAgcmV0dXJuIGBOb3JtYWwgT3BlcmF0aW9uczogJHt2YWx1ZX0gKCR7cGVyY2VudGFnZX0lKWA7XG4gKiAgICAgICAgICAgICAgIFx0fSxcbiAqICAgICAgICAgICAgICAgXHRvcGFjaXR5OiAwLjIsIC8vIDAgdG8gMVxuICogICAgICAgICAgICAgICBcdGNsYXNzOiBcInRlc3QtcG9seWdvbjFcIlxuICogICAgICAgICAgICAgIH0sXG4gKiAgICAgICAgICAgICBcdC4uLlxuICogICAgICAgICAgIF1cbiAqICAgICAgICB9XG4gKiAgICAgXVxuICogIH0pO1xuICogQGV4YW1wbGVcbiAqXHRpbXBvcnQge2JifSBmcm9tIFwiYmlsbGJvYXJkLmpzXCI7XG4gKiBpbXBvcnQgU3RhbmZvcmQgZnJvbSBcImJpbGxib2FyZC5qcy9kaXN0L2JpbGxib2FyZGpzLXBsdWdpbi1zdGFuZm9yZFwiO1xuICpcbiAqIGJiLmdlbmVyYXRlKHtcbiAqICAgICBwbHVnaW5zOiBbXG4gKiAgICAgICAgbmV3IFN0YW5mb3JkKHsgLi4uIH0pXG4gKiAgICAgXVxuICogfSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmZvcmQgZXh0ZW5kcyBQbHVnaW4ge1xuXHRwcml2YXRlIGNvbmZpZztcblx0cHJpdmF0ZSBjb2xvclNjYWxlO1xuXHRwcml2YXRlIGVsZW1lbnRzO1xuXG5cdGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcblx0XHRzdXBlcihvcHRpb25zKTtcblx0XHR0aGlzLmNvbmZpZyA9IG5ldyBPcHRpb25zKCk7XG5cblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdCRiZWZvcmVJbml0KCk6IHZvaWQge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xuXG5cdFx0Ly8gb3ZlcnJpZGUgb24gY29uZmlnIHZhbHVlcyAmIG1ldGhvZHNcblx0XHQkJC5jb25maWcuZGF0YV94U29ydCA9IGZhbHNlO1xuXHRcdCQkLmlzTXVsdGlwbGVYID0gKCkgPT4gdHJ1ZTtcblx0XHQkJC5zaG93R3JpZEZvY3VzID0gKCkgPT4ge307XG5cdFx0JCQubGFiZWxpc2hEYXRhID0gZCA9PiBkLnZhbHVlcztcblx0XHQkJC5vcGFjaXR5Rm9yQ2lyY2xlID0gKCkgPT4gMTtcblxuXHRcdGNvbnN0IGdldEN1cnJlbnRQYWRkaW5nUmlnaHQgPSAkJC5nZXRDdXJyZW50UGFkZGluZ1JpZ2h0LmJpbmQoJCQpO1xuXG5cdFx0JCQuZ2V0Q3VycmVudFBhZGRpbmdSaWdodCA9ICgpID0+IChcblx0XHRcdGdldEN1cnJlbnRQYWRkaW5nUmlnaHQoKSArIChcblx0XHRcdFx0dGhpcy5jb2xvclNjYWxlID8gdGhpcy5jb2xvclNjYWxlLmdldENvbG9yU2NhbGVQYWRkaW5nKCkgOiAwXG5cdFx0XHQpXG5cdFx0KTtcblx0fVxuXG5cdCRpbml0KCk6IHZvaWQge1xuXHRcdGNvbnN0IHskJH0gPSB0aGlzO1xuXG5cdFx0bG9hZENvbmZpZy5jYWxsKHRoaXMsIHRoaXMub3B0aW9ucyk7XG5cdFx0JCQuY29sb3IgPSB0aGlzLmdldFN0YW5mb3JkUG9pbnRDb2xvci5iaW5kKCQkKTtcblxuXHRcdHRoaXMuY29sb3JTY2FsZSA9IG5ldyBDb2xvclNjYWxlKHRoaXMpO1xuXHRcdHRoaXMuZWxlbWVudHMgPSBuZXcgRWxlbWVudHModGhpcyk7XG5cblx0XHR0aGlzLmNvbnZlcnREYXRhKCk7XG5cdFx0dGhpcy5pbml0U3RhbmZvcmREYXRhKCk7XG5cdFx0dGhpcy5zZXRTdGFuZm9yZFRvb2x0aXAoKTtcblx0XHR0aGlzLmNvbG9yU2NhbGUuZHJhd0NvbG9yU2NhbGUoKTtcblxuXHRcdHRoaXMuJHJlZHJhdygpO1xuXHR9XG5cblx0JHJlZHJhdyhkdXJhdGlvbj86IG51bWJlcik6IHZvaWQge1xuXHRcdHRoaXMuY29sb3JTY2FsZSAmJiB0aGlzLmNvbG9yU2NhbGUuZHJhd0NvbG9yU2NhbGUoKTtcblx0XHR0aGlzLmVsZW1lbnRzICYmIHRoaXMuZWxlbWVudHMudXBkYXRlU3RhbmZvcmRFbGVtZW50cyhkdXJhdGlvbik7XG5cdH1cblxuXG5cdGdldE9wdGlvbnMoKTogT3B0aW9ucyB7XG5cdFx0cmV0dXJuIG5ldyBPcHRpb25zKCk7XG5cdH1cblxuXHRjb252ZXJ0RGF0YSgpOiB2b2lkIHtcblx0XHRjb25zdCBkYXRhID0gdGhpcy4kJC5kYXRhLnRhcmdldHM7XG5cdFx0Y29uc3QgZXBvY2hzID0gdGhpcy5vcHRpb25zLmVwb2NocztcblxuXHRcdGRhdGEuZm9yRWFjaChkID0+IHtcblx0XHRcdGQudmFsdWVzLmZvckVhY2goKHYsIGkpID0+IHtcblx0XHRcdFx0di5lcG9jaHMgPSBlcG9jaHNbaV07XG5cdFx0XHR9KTtcblxuXHRcdFx0ZC5taW5FcG9jaHMgPSB1bmRlZmluZWQ7XG5cdFx0XHRkLm1heEVwb2NocyA9IHVuZGVmaW5lZDtcblx0XHRcdGQuY29sb3JzID0gdW5kZWZpbmVkO1xuXHRcdFx0ZC5jb2xvcnNjYWxlID0gdW5kZWZpbmVkO1xuXHRcdH0pO1xuXHR9XG5cblx0eHZDdXN0b20oZCwgeHlWYWx1ZSk6IG51bWJlciB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHtheGlzLCBjb25maWd9ID0gJCQ7XG5cdFx0bGV0IHZhbHVlID0geHlWYWx1ZSA/IGRbeHlWYWx1ZV0gOiAkJC5nZXRCYXNlVmFsdWUoZCk7XG5cblx0XHRpZiAoYXhpcy5pc1RpbWVTZXJpZXMoKSkge1xuXHRcdFx0dmFsdWUgPSBwYXJzZURhdGUuY2FsbCgkJCwgdmFsdWUpO1xuXHRcdH0gZWxzZSBpZiAoYXhpcy5pc0NhdGVnb3JpemVkKCkgJiYgaXNTdHJpbmcodmFsdWUpKSB7XG5cdFx0XHR2YWx1ZSA9IGNvbmZpZy5heGlzX3hfY2F0ZWdvcmllcy5pbmRleE9mKGQudmFsdWUpO1xuXHRcdH1cblxuXHRcdHJldHVybiBNYXRoLmNlaWwoJCQuc2NhbGUueCh2YWx1ZSkpO1xuXHR9XG5cblx0eXZDdXN0b20oZCwgeHlWYWx1ZSk6IG51bWJlciB7XG5cdFx0Y29uc3QgJCQgPSB0aGlzO1xuXHRcdGNvbnN0IHtzY2FsZX0gPSAkJDtcblx0XHRjb25zdCB5U2NhbGUgPSBkLmF4aXMgJiYgZC5heGlzID09PSBcInkyXCIgPyBzY2FsZS55MiA6IHNjYWxlLnk7XG5cdFx0Y29uc3QgdmFsdWUgPSB4eVZhbHVlID8gZFt4eVZhbHVlXSA6ICQkLmdldEJhc2VWYWx1ZShkKTtcblxuXHRcdHJldHVybiBNYXRoLmNlaWwoeVNjYWxlKHZhbHVlKSk7XG5cdH1cblxuXHRpbml0U3RhbmZvcmREYXRhKCk6IHZvaWQge1xuXHRcdGNvbnN0IHtjb25maWd9ID0gdGhpcztcblx0XHRjb25zdCB0YXJnZXQgPSB0aGlzLiQkLmRhdGEudGFyZ2V0c1swXTtcblxuXHRcdC8vIFRPRE8gU1RBTkZPUkQgc2VlIGlmIChkYXRhLmpzIC0+IG9yZGVyVGFyZ2V0cykrIGNhbiBiZSB1c2VkIGluc3RlYWRcblx0XHQvLyBNYWtlIGxhcmdlciB2YWx1ZXMgYXBwZWFyIG9uIHRvcFxuXHRcdHRhcmdldC52YWx1ZXMuc29ydChjb21wYXJlRXBvY2hzKTtcblxuXHRcdC8vIEdldCBhcnJheSBvZiBlcG9jaHNcblx0XHRjb25zdCBlcG9jaHMgPSB0YXJnZXQudmFsdWVzLm1hcChhID0+IGEuZXBvY2hzKTtcblxuXHRcdHRhcmdldC5taW5FcG9jaHMgPSAhaXNOYU4oY29uZmlnLnNjYWxlX21pbikgPyBjb25maWcuc2NhbGVfbWluIDogTWF0aC5taW4oLi4uZXBvY2hzKTtcblx0XHR0YXJnZXQubWF4RXBvY2hzID0gIWlzTmFOKGNvbmZpZy5zY2FsZV9tYXgpID8gY29uZmlnLnNjYWxlX21heCA6IE1hdGgubWF4KC4uLmVwb2Nocyk7XG5cblx0XHR0YXJnZXQuY29sb3JzID0gaXNGdW5jdGlvbihjb25maWcuY29sb3JzKSA/XG5cdFx0XHRjb25maWcuY29sb3JzIDogZDNJbnRlcnBvbGF0ZUhzbExvbmcoZDNIc2woMjUwLCAxLCAwLjUpLCBkM0hzbCgwLCAxLCAwLjUpKTtcblxuXHRcdHRhcmdldC5jb2xvcnNjYWxlID0gZDNTY2FsZVNlcXVlbnRpYWxMb2codGFyZ2V0LmNvbG9ycylcblx0XHRcdC5kb21haW4oW3RhcmdldC5taW5FcG9jaHMsIHRhcmdldC5tYXhFcG9jaHNdKTtcblx0fVxuXG5cdGdldFN0YW5mb3JkUG9pbnRDb2xvcihkKSB7XG5cdFx0Y29uc3QgdGFyZ2V0ID0gdGhpcy5kYXRhLnRhcmdldHNbMF07XG5cblx0XHRyZXR1cm4gdGFyZ2V0LmNvbG9yc2NhbGUoZC5lcG9jaHMpO1xuXHR9XG5cblx0c2V0U3RhbmZvcmRUb29sdGlwKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdFx0Y29uc3Qge2NvbmZpZ30gPSB0aGlzLiQkO1xuXG5cdFx0aWYgKGlzRW1wdHkoY29uZmlnLnRvb2x0aXBfY29udGVudHMpKSB7XG5cdFx0XHRjb25maWcudG9vbHRpcF9jb250ZW50cyA9IGZ1bmN0aW9uKGQsIGRlZmF1bHRUaXRsZUZvcm1hdCwgZGVmYXVsdFZhbHVlRm9ybWF0LCBjb2xvcikge1xuXHRcdFx0XHRsZXQgaHRtbCA9IGA8dGFibGUgY2xhc3M9XCIke0NMQVNTLnRvb2x0aXB9XCI+PHRib2R5PmA7XG5cblx0XHRcdFx0ZC5mb3JFYWNoKHYgPT4ge1xuXHRcdFx0XHRcdGh0bWwgKz0gYDx0cj5cblx0XHRcdFx0XHRcdFx0PHRoPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KGNvbmZpZy5kYXRhX3gpfTwvdGg+XG5cdFx0XHRcdFx0XHRcdDx0aCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi54KX08L3RoPlxuXHRcdFx0XHRcdFx0PC90cj5cblx0XHRcdFx0XHRcdDx0cj5cblx0XHRcdFx0XHRcdFx0PHRoPiR7ZGVmYXVsdFRpdGxlRm9ybWF0KHYuaWQpfTwvdGg+XG5cdFx0XHRcdFx0XHRcdDx0aCBjbGFzcz1cInZhbHVlXCI+JHtkZWZhdWx0VmFsdWVGb3JtYXQodi52YWx1ZSl9PC90aD5cblx0XHRcdFx0XHRcdDwvdHI+XG5cdFx0XHRcdFx0XHQ8dHIgY2xhc3M9XCIke0NMQVNTLnRvb2x0aXBOYW1lfS0ke3YuaWR9XCI+XG5cdFx0XHRcdFx0XHRcdDx0ZCBjbGFzcz1cIm5hbWVcIj48c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtjb2xvcih2KX1cIj48L3NwYW4+JHtkZWZhdWx0VGl0bGVGb3JtYXQoXCJFcG9jaHNcIil9PC90ZD5cblx0XHRcdFx0XHRcdFx0PHRkIGNsYXNzPVwidmFsdWVcIj4ke2RlZmF1bHRWYWx1ZUZvcm1hdCh2LmVwb2Nocyl9PC90ZD5cblx0XHRcdFx0XHRcdDwvdHI+YDtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0cmV0dXJuIGAke2h0bWx9PC90Ym9keT48L3RhYmxlPmA7XG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdGNvdW50RXBvY2hzSW5SZWdpb24ocmVnaW9uKToge3ZhbHVlOiBudW1iZXIsIHBlcmNlbnRhZ2U6IG51bWJlcn0ge1xuXHRcdGNvbnN0ICQkID0gdGhpcztcblx0XHRjb25zdCB0YXJnZXQgPSAkJC5kYXRhLnRhcmdldHNbMF07XG5cblx0XHRjb25zdCB0b3RhbCA9IHRhcmdldC52YWx1ZXMucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlKSA9PlxuXHRcdFx0YWNjdW11bGF0b3IgKyBOdW1iZXIoY3VycmVudFZhbHVlLmVwb2NocyksIDApO1xuXG5cdFx0Y29uc3QgdmFsdWUgPSB0YXJnZXQudmFsdWVzLnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSkgPT4ge1xuXHRcdFx0aWYgKHBvaW50SW5SZWdpb24oY3VycmVudFZhbHVlLCByZWdpb24pKSB7XG5cdFx0XHRcdHJldHVybiBhY2N1bXVsYXRvciArIE51bWJlcihjdXJyZW50VmFsdWUuZXBvY2hzKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGFjY3VtdWxhdG9yO1xuXHRcdH0sIDApO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHZhbHVlLFxuXHRcdFx0cGVyY2VudGFnZTogdmFsdWUgIT09IDAgPyArKHZhbHVlIC8gdG90YWwgKiAxMDApLnRvRml4ZWQoMSkgOiAwXG5cdFx0fTtcblx0fVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuLyoqXG4gKiBXaW5kb3cgb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1uZXctZnVuYywgbm8tdW5kZWYgKi9cbmV4cG9ydCB7d2luIGFzIHdpbmRvdywgZG9jIGFzIGRvY3VtZW50fTtcblxuY29uc3Qgd2luID0gKCgpID0+IHtcblx0Y29uc3QgZGVmID0gbyA9PiB0eXBlb2YgbyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBvO1xuXG5cdHJldHVybiBkZWYoc2VsZikgfHwgZGVmKHdpbmRvdykgfHwgZGVmKGdsb2JhbCkgfHwgZGVmKGdsb2JhbFRoaXMpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0pKCk7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLW5ldy1mdW5jLCBuby11bmRlZiAqL1xuXG5jb25zdCBkb2MgPSB3aW4gJiYgd2luLmRvY3VtZW50O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTcgfiBwcmVzZW50IE5BVkVSIENvcnAuXG4gKiBiaWxsYm9hcmQuanMgcHJvamVjdCBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIEBpZ25vcmVcbiAqL1xuaW1wb3J0IHtldmVudCBhcyBkM0V2ZW50fSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge2JydXNoU2VsZWN0aW9uIGFzIGQzQnJ1c2hTZWxlY3Rpb259IGZyb20gXCJkMy1icnVzaFwiO1xuaW1wb3J0IHtkM1NlbGVjdGlvbn0gZnJvbSBcIi4uLy4uL3R5cGVzL3R5cGVzXCI7XG5pbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gXCIuL2Jyb3dzZXJcIjtcbmltcG9ydCBDTEFTUyBmcm9tIFwiLi4vY29uZmlnL2NsYXNzZXNcIjtcblxuZXhwb3J0IHtcblx0YXNIYWxmUGl4ZWwsXG5cdGJydXNoRW1wdHksXG5cdGNhbGxGbixcblx0Y2FwaXRhbGl6ZSxcblx0Y2VpbDEwLFxuXHRjb252ZXJ0SW5wdXRUeXBlLFxuXHRkZWVwQ2xvbmUsXG5cdGRpZmZEb21haW4sXG5cdGVuZGFsbCxcblx0ZW11bGF0ZUV2ZW50LFxuXHRleHRlbmQsXG5cdGdldEJydXNoU2VsZWN0aW9uLFxuXHRnZXRCb3VuZGluZ1JlY3QsXG5cdGdldENzc1J1bGVzLFxuXHRnZXRNaW5NYXgsXG5cdGdldE9wdGlvbixcblx0Z2V0UGF0aEJveCxcblx0Z2V0UmFuZG9tLFxuXHRnZXRSYW5nZSxcblx0Z2V0UmVjdFNlZ0xpc3QsXG5cdGdldFRyYW5zbGF0aW9uLFxuXHRnZXRVbmlxdWUsXG5cdGhhc1ZhbHVlLFxuXHRpc0FycmF5LFxuXHRpc2Jvb2xlYW4sXG5cdGlzRGVmaW5lZCxcblx0aXNFbXB0eSxcblx0aXNGdW5jdGlvbixcblx0aXNOdW1iZXIsXG5cdGlzT2JqZWN0LFxuXHRpc09iamVjdFR5cGUsXG5cdGlzU3RyaW5nLFxuXHRpc1RhYlZpc2libGUsXG5cdGlzVW5kZWZpbmVkLFxuXHRpc1ZhbHVlLFxuXHRtZXJnZUFycmF5LFxuXHRtZXJnZU9iaixcblx0bm90RW1wdHksXG5cdHBhcnNlRGF0ZSxcblx0c2FuaXRpc2UsXG5cdHNldFRleHRWYWx1ZSxcblx0c29ydFZhbHVlLFxuXHR0b0FycmF5LFxuXHR0cGxQcm9jZXNzXG59O1xuXG5jb25zdCBpc1ZhbHVlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdiB8fCB2ID09PSAwO1xuY29uc3QgaXNGdW5jdGlvbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1N0cmluZyA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcInN0cmluZ1wiO1xuY29uc3QgaXNOdW1iZXIgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiA9PT0gXCJudW1iZXJcIjtcbmNvbnN0IGlzVW5kZWZpbmVkID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwidW5kZWZpbmVkXCI7XG5jb25zdCBpc0RlZmluZWQgPSAodjogYW55KTogYm9vbGVhbiA9PiB0eXBlb2YgdiAhPT0gXCJ1bmRlZmluZWRcIjtcbmNvbnN0IGlzYm9vbGVhbiA9ICh2OiBhbnkpOiBib29sZWFuID0+IHR5cGVvZiB2ID09PSBcImJvb2xlYW5cIjtcbmNvbnN0IGNlaWwxMCA9ICh2OiBhbnkpOiBudW1iZXIgPT4gTWF0aC5jZWlsKHYgLyAxMCkgKiAxMDtcbmNvbnN0IGFzSGFsZlBpeGVsID0gKG46IGFueSk6IG51bWJlciA9PiBNYXRoLmNlaWwobikgKyAwLjU7XG5jb25zdCBkaWZmRG9tYWluID0gKGQ6IG51bWJlcltdKTogbnVtYmVyID0+IGRbMV0gLSBkWzBdO1xuY29uc3QgaXNPYmplY3RUeXBlID0gKHY6IGFueSk6IGJvb2xlYW4gPT4gdHlwZW9mIHYgPT09IFwib2JqZWN0XCI7XG5jb25zdCBpc0VtcHR5ID0gKG86IGFueSk6IGJvb2xlYW4gPT4gKFxuXHRpc1VuZGVmaW5lZChvKSB8fCBvID09PSBudWxsIHx8XG5cdChpc1N0cmluZyhvKSAmJiBvLmxlbmd0aCA9PT0gMCkgfHxcblx0KGlzT2JqZWN0VHlwZShvKSAmJiAhKG8gaW5zdGFuY2VvZiBEYXRlKSAmJiBPYmplY3Qua2V5cyhvKS5sZW5ndGggPT09IDApIHx8XG5cdChpc051bWJlcihvKSAmJiBpc05hTihvKSlcbik7XG5jb25zdCBub3RFbXB0eSA9IChvOiBhbnkpOiBib29sZWFuID0+ICFpc0VtcHR5KG8pO1xuXG4vKipcbiAqIENoZWNrIGlmIGlzIGFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzQXJyYXkgPSAoYXJyOiBhbnkpOiBib29sZWFuID0+IEFycmF5LmlzQXJyYXkoYXJyKTtcblxuLyoqXG4gKiBDaGVjayBpZiBpcyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmogRGF0YSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlzT2JqZWN0ID0gKG9iajogYW55KTogYm9vbGVhbiA9PiBvYmogJiYgIW9iai5ub2RlVHlwZSAmJiBpc09iamVjdFR5cGUob2JqKSAmJiAhaXNBcnJheShvYmopO1xuXG4vKipcbiAqIEdldCBzcGVjaWZpZWQga2V5IHZhbHVlIGZyb20gb2JqZWN0XG4gKiBJZiBkZWZhdWx0IHZhbHVlIGlzIGdpdmVuLCB3aWxsIHJldHVybiBpZiBnaXZlbiBrZXkgdmFsdWUgbm90IGZvdW5kXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBTb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IEtleSB2YWx1ZVxuICogQHBhcmFtIHsqfSBkZWZhdWx0VmFsdWUgRGVmYXVsdCB2YWx1ZVxuICogQHJldHVybnMgeyp9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRPcHRpb24ob3B0aW9uczogb2JqZWN0LCBrZXk6IHN0cmluZywgZGVmYXVsdFZhbHVlKTogYW55IHtcblx0cmV0dXJuIGlzRGVmaW5lZChvcHRpb25zW2tleV0pID8gb3B0aW9uc1trZXldIDogZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHZhbHVlIGV4aXN0IGluIHRoZSBnaXZlbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSBkaWN0IFRhcmdldCBvYmplY3QgdG8gYmUgY2hlY2tlZFxuICogQHBhcmFtIHsqfSB2YWx1ZSBWYWx1ZSB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGhhc1ZhbHVlKGRpY3Q6IG9iamVjdCwgdmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuXHRsZXQgZm91bmQgPSBmYWxzZTtcblxuXHRPYmplY3Qua2V5cyhkaWN0KS5mb3JFYWNoKGtleSA9PiAoZGljdFtrZXldID09PSB2YWx1ZSkgJiYgKGZvdW5kID0gdHJ1ZSkpO1xuXG5cdHJldHVybiBmb3VuZDtcbn1cblxuLyoqXG4gKiBDYWxsIGZ1bmN0aW9uIHdpdGggYXJndW1lbnRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBGdW5jdGlvbiB0byBiZSBjYWxsZWRcbiAqIEBwYXJhbSB7Kn0gYXJncyBBcmd1bWVudHNcbiAqIEByZXR1cm5zIHtib29sZWFufSB0cnVlOiBmbiBpcyBmdW5jdGlvbiwgZmFsc2U6IGZuIGlzIG5vdCBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY2FsbEZuKGZuLCAuLi5hcmdzKTogYm9vbGVhbiB7XG5cdGNvbnN0IGlzRm4gPSBpc0Z1bmN0aW9uKGZuKTtcblxuXHRpc0ZuICYmIGZuLmNhbGwoLi4uYXJncyk7XG5cdHJldHVybiBpc0ZuO1xufVxuXG4vKipcbiAqIENhbGwgZnVuY3Rpb24gYWZ0ZXIgYWxsIHRyYW5zaXRpb25zIGVuZHNcbiAqIEBwYXJhbSB7ZDMudHJhbnNpdGlvbn0gdHJhbnNpdGlvbiBUcmFuc2l0aW9uXG4gKiBAcGFyYW0ge0Z1Y250aW9ufSBjYiBDYWxsYmFjayBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZW5kYWxsKHRyYW5zaXRpb24sIGNiOiBGdW5jdGlvbik6IHZvaWQge1xuXHRsZXQgbiA9IDA7XG5cblx0dHJhbnNpdGlvblxuXHRcdC5lYWNoKCgpID0+ICsrbilcblx0XHQub24oXCJlbmRcIiwgZnVuY3Rpb24oLi4uYXJncykge1xuXHRcdFx0IS0tbiAmJiBjYi5hcHBseSh0aGlzLCAuLi5hcmdzKTtcblx0XHR9KTtcbn1cblxuLyoqXG4gKiBSZXBsYWNlIHRhZyBzaWduIHRvIGh0bWwgZW50aXR5XG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFRhcmdldCBzdHJpbmcgdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzYW5pdGlzZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG5cdHJldHVybiBpc1N0cmluZyhzdHIpID9cblx0XHRzdHIucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikgOiBzdHI7XG59XG5cbi8qKlxuICogU2V0IHRleHQgdmFsdWUuIElmIHRoZXJlJ3MgbXVsdGlsaW5lIGFkZCBub2Rlcy5cbiAqIEBwYXJhbSB7ZDNTZWxlY3Rpb259IG5vZGUgVGV4dCBub2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gdGV4dCBUZXh0IHZhbHVlIHN0cmluZ1xuICogQHBhcmFtIHtBcnJheX0gZHkgZHkgdmFsdWUgZm9yIG11bHRpbGluZWQgdGV4dFxuICogQHBhcmFtIHtib29sZWFufSB0b01pZGRsZSBUbyBiZSBhbGluZ25lZCB2ZXJ0aWNhbGx5IG1pZGRsZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0VGV4dFZhbHVlKFxuXHRub2RlOiBkM1NlbGVjdGlvbixcblx0dGV4dDogc3RyaW5nLFxuXHRkeTogbnVtYmVyW10gPSBbLTEsIDFdLFxuXHR0b01pZGRsZTogYm9vbGVhbiA9IGZhbHNlXG4pIHtcblx0aWYgKCFub2RlIHx8ICFpc1N0cmluZyh0ZXh0KSkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmICh0ZXh0LmluZGV4T2YoXCJcXG5cIikgPT09IC0xKSB7XG5cdFx0bm9kZS50ZXh0KHRleHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGRpZmYgPSBbbm9kZS50ZXh0KCksIHRleHRdLm1hcCh2ID0+IHYucmVwbGFjZSgvW1xcc1xcbl0vZywgXCJcIikpO1xuXG5cdFx0aWYgKGRpZmZbMF0gIT09IGRpZmZbMV0pIHtcblx0XHRcdGNvbnN0IG11bHRpbGluZSA9IHRleHQuc3BsaXQoXCJcXG5cIik7XG5cdFx0XHRjb25zdCBsZW4gPSB0b01pZGRsZSA/IG11bHRpbGluZS5sZW5ndGggLSAxIDogMTtcblxuXHRcdFx0Ly8gcmVzZXQgcG9zc2libGUgdGV4dFxuXHRcdFx0bm9kZS5odG1sKFwiXCIpO1xuXG5cdFx0XHRtdWx0aWxpbmUuZm9yRWFjaCgodiwgaSkgPT4ge1xuXHRcdFx0XHRub2RlLmFwcGVuZChcInRzcGFuXCIpXG5cdFx0XHRcdFx0LmF0dHIoXCJ4XCIsIDApXG5cdFx0XHRcdFx0LmF0dHIoXCJkeVwiLCBgJHtpID09PSAwID8gZHlbMF0gKiBsZW4gOiBkeVsxXX1lbWApXG5cdFx0XHRcdFx0LnRleHQodik7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBTdWJzdGl0dXRpb24gb2YgU1ZHUGF0aFNlZyBBUEkgcG9seWZpbGxcbiAqIEBwYXJhbSB7U1ZHR3JhcGhpY3NFbGVtZW50fSBwYXRoIFRhcmdldCBzdmcgZWxlbWVudFxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UmVjdFNlZ0xpc3QocGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50KToge3g6IG51bWJlciwgeTogbnVtYmVyfVtdIHtcblx0Lypcblx0ICogc2VnMSAtLS0tLS0tLS0tIHNlZzJcblx0ICogICB8ICAgICAgICAgICAgICAgfFxuXHQgKiAgIHwgICAgICAgICAgICAgICB8XG5cdCAqICAgfCAgICAgICAgICAgICAgIHxcblx0ICogc2VnMCAtLS0tLS0tLS0tIHNlZzNcblx0ICogKi9cblx0Y29uc3Qge3gsIHksIHdpZHRoLCBoZWlnaHR9ID0gcGF0aC5nZXRCQm94KCk7XG5cblx0cmV0dXJuIFtcblx0XHR7eCwgeTogeSArIGhlaWdodH0sIC8vIHNlZzBcblx0XHR7eCwgeX0sIC8vIHNlZzFcblx0XHR7eDogeCArIHdpZHRoLCB5fSwgLy8gc2VnMlxuXHRcdHt4OiB4ICsgd2lkdGgsIHk6IHkgKyBoZWlnaHR9IC8vIHNlZzNcblx0XTtcbn1cblxuLyoqXG4gKiBHZXQgc3ZnIGJvdW5kaW5nIHBhdGggYm94IGRpbWVuc2lvblxuICogQHBhcmFtIHtTVkdHcmFwaGljc0VsZW1lbnR9IHBhdGggVGFyZ2V0IHN2ZyBlbGVtZW50XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEJveChcblx0cGF0aDogU1ZHR3JhcGhpY3NFbGVtZW50XG4pOiB7eDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyfSB7XG5cdGNvbnN0IHt3aWR0aCwgaGVpZ2h0fSA9IHBhdGguZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cdGNvbnN0IGl0ZW1zID0gZ2V0UmVjdFNlZ0xpc3QocGF0aCk7XG5cdGNvbnN0IHggPSBpdGVtc1swXS54O1xuXHRjb25zdCB5ID0gTWF0aC5taW4oaXRlbXNbMF0ueSwgaXRlbXNbMV0ueSk7XG5cblx0cmV0dXJuIHtcblx0XHR4LCB5LCB3aWR0aCwgaGVpZ2h0XG5cdH07XG59XG5cbi8qKlxuICogUmV0dXJuIGJydXNoIHNlbGVjdGlvbiBhcnJheVxuICogQHBhcmFtIHtvYmplY3R9IHt9IFNlbGVjdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB7fS4kZWwgU2VsZWN0aW9uIG9iamVjdFxuICogQHJldHVybnMge2QzLmJydXNoU2VsZWN0aW9ufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZ2V0QnJ1c2hTZWxlY3Rpb24oeyRlbH0pIHtcblx0Y29uc3QgZXZlbnQgPSBkM0V2ZW50O1xuXHRjb25zdCBtYWluID0gJGVsLnN1YmNoYXJ0Lm1haW4gfHwgJGVsLm1haW47XG5cdGxldCBzZWxlY3Rpb247XG5cblx0Ly8gY2hlY2sgZnJvbSBldmVudFxuXHRpZiAoZXZlbnQgJiYgZXZlbnQudHlwZSA9PT0gXCJicnVzaFwiKSB7XG5cdFx0c2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uO1xuXHQvLyBjaGVjayBmcm9tIGJydXNoIGFyZWEgc2VsZWN0aW9uXG5cdH0gZWxzZSBpZiAobWFpbiAmJiAoc2VsZWN0aW9uID0gbWFpbi5zZWxlY3QoYC4ke0NMQVNTLmJydXNofWApLm5vZGUoKSkpIHtcblx0XHRzZWxlY3Rpb24gPSBkM0JydXNoU2VsZWN0aW9uKHNlbGVjdGlvbik7XG5cdH1cblxuXHRyZXR1cm4gc2VsZWN0aW9uO1xufVxuXG4vKipcbiAqIEdldCBib3VuZGluZ0NsaWVudFJlY3QuXG4gKiBDYWNoZSB0aGUgZXZhbHVhdGVkIHZhbHVlIG9uY2UgaXQgd2FzIGNhbGxlZC5cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IG5vZGUgVGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtvYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRCb3VuZGluZ1JlY3QgPSAobm9kZSk6IHtcblx0bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlciwgcmlnaHQ6IG51bWJlciwgYm90dG9tOiBudW1iZXIsXG5cdHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlclxufSA9PiBub2RlLnJlY3QgfHwgKG5vZGUucmVjdCA9IG5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkpO1xuXG4vKipcbiAqIFJldHJ1biByYW5kb20gbnVtYmVyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFzU3RyIENvbnZlcnQgcmV0dXJuZWQgdmFsdWUgYXMgc3RyaW5nXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldFJhbmRvbShhc1N0cjogYm9vbGVhbiA9IHRydWUpOiBudW1iZXIgfCBzdHJpbmcge1xuXHRjb25zdCByYW5kID0gTWF0aC5yYW5kb20oKTtcblxuXHRyZXR1cm4gYXNTdHIgPyBTdHJpbmcocmFuZCkgOiByYW5kO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGJydXNoIGlzIGVtcHR5XG4gKiBAcGFyYW0ge29iamVjdH0gY3R4IEJ1cnNoIGNvbnRleHRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gYnJ1c2hFbXB0eShjdHgpOiBib29sZWFuIHtcblx0Y29uc3Qgc2VsZWN0aW9uID0gZ2V0QnJ1c2hTZWxlY3Rpb24oY3R4KTtcblxuXHRpZiAoc2VsZWN0aW9uKSB7XG5cdFx0Ly8gYnJ1c2ggc2VsZWN0ZWQgYXJlYVxuXHRcdC8vIHR3by1kaW1lbnNpb25hbDogW1t4MCwgeTBdLCBbeDEsIHkxXV1cblx0XHQvLyBvbmUtZGltZW5zaW9uYWw6IFt4MCwgeDFdIG9yIFt5MCwgeTFdXG5cdFx0cmV0dXJuIHNlbGVjdGlvblswXSA9PT0gc2VsZWN0aW9uWzFdO1xuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogRGVlcCBjb3B5IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gQ2xvbmVkIG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVlcENsb25lKC4uLm9iamVjdE4pIHtcblx0Y29uc3QgY2xvbmUgPSB2ID0+IHtcblx0XHRpZiAoaXNPYmplY3QodikgJiYgdi5jb25zdHJ1Y3Rvcikge1xuXHRcdFx0Y29uc3QgciA9IG5ldyB2LmNvbnN0cnVjdG9yKCk7XG5cblx0XHRcdGZvciAoY29uc3QgayBpbiB2KSB7XG5cdFx0XHRcdHJba10gPSBjbG9uZSh2W2tdKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHI7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHY7XG5cdH07XG5cblx0cmV0dXJuIG9iamVjdE4ubWFwKHYgPT4gY2xvbmUodikpXG5cdFx0LnJlZHVjZSgoYSwgYykgPT4gKFxuXHRcdFx0ey4uLmEsIC4uLmN9XG5cdFx0KSk7XG59XG5cbi8qKlxuICogRXh0ZW5kIHRhcmdldCBmcm9tIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IHNvdXJjZSBTb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCA9IHt9LCBzb3VyY2UpOiBvYmplY3Qge1xuXHRpZiAoaXNBcnJheShzb3VyY2UpKSB7XG5cdFx0c291cmNlLmZvckVhY2godiA9PiBleHRlbmQodGFyZ2V0LCB2KSk7XG5cdH1cblxuXHQvLyBleGNsdWRlIG5hbWUgd2l0aCBvbmx5IG51bWJlcnNcblx0Zm9yIChjb25zdCBwIGluIHNvdXJjZSkge1xuXHRcdGlmICgvXlxcZCskLy50ZXN0KHApIHx8IHAgaW4gdGFyZ2V0KSB7XG5cdFx0XHRjb250aW51ZTtcblx0XHR9XG5cblx0XHR0YXJnZXRbcF0gPSBzb3VyY2VbcF07XG5cdH1cblxuXHRyZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIFJldHVybiBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHIgVGFyZ2V0IHN0cmluZ1xuICogQHJldHVybnMge3N0cmluZ30gY2FwaXRhbGl6ZWQgc3RyaW5nXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBjYXBpdGFsaXplID0gKHN0cjogc3RyaW5nKTogc3RyaW5nID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGFycmF5XG4gKiBAcGFyYW0ge29iamVjdH0gdiBUYXJnZXQgdG8gYmUgY29udmVydGVkXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCB0b0FycmF5ID0gKHY6IENTU1N0eWxlRGVjbGFyYXRpb24gfCBhbnkpOiBhbnkgPT4gW10uc2xpY2UuY2FsbCh2KTtcblxuLyoqXG4gKiBHZXQgY3NzIHJ1bGVzIGZvciBzcGVjaWZpZWQgc3R5bGVzaGVldHNcbiAqIEBwYXJhbSB7QXJyYXl9IHN0eWxlU2hlZXRzIFRoZSBzdHlsZXNoZWV0cyB0byBnZXQgdGhlIHJ1bGVzIGZyb21cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzOiBhbnlbXSkge1xuXHRsZXQgcnVsZXMgPSBbXTtcblxuXHRzdHlsZVNoZWV0cy5mb3JFYWNoKHNoZWV0ID0+IHtcblx0XHR0cnkge1xuXHRcdFx0aWYgKHNoZWV0LmNzc1J1bGVzICYmIHNoZWV0LmNzc1J1bGVzLmxlbmd0aCkge1xuXHRcdFx0XHRydWxlcyA9IHJ1bGVzLmNvbmNhdCh0b0FycmF5KHNoZWV0LmNzc1J1bGVzKSk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihgRXJyb3Igd2hpbGUgcmVhZGluZyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn06ICR7ZS50b1N0cmluZygpfWApO1xuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIHJ1bGVzO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIFNWR01hdHJpeCBvZiBhbiBTVkdHRWxlbWVudFxuICogQHBhcmFtIHtTVkdFbGVtZW50fSBub2RlIE5vZGUgZWxlbWVudFxuICogQHJldHVybnMge1NWR01hdHJpeH0gbWF0cml4XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBnZXRUcmFuc2xhdGlvbiA9IG5vZGUgPT4ge1xuXHRjb25zdCB0cmFuc2Zvcm0gPSBub2RlID8gbm9kZS50cmFuc2Zvcm0gOiBudWxsO1xuXHRjb25zdCBiYXNlVmFsID0gdHJhbnNmb3JtICYmIHRyYW5zZm9ybS5iYXNlVmFsO1xuXG5cdHJldHVybiBiYXNlVmFsICYmIGJhc2VWYWwubnVtYmVyT2ZJdGVtcyA/XG5cdFx0YmFzZVZhbC5nZXRJdGVtKDApLm1hdHJpeCA6XG5cdFx0e2E6IDAsIGI6IDAsIGM6IDAsIGQ6IDAsIGU6IDAsIGY6IDB9O1xufTtcblxuLyoqXG4gKiBHZXQgdW5pcXVlIHZhbHVlIGZyb20gYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgU291cmNlIGRhdGFcbiAqIEByZXR1cm5zIHtBcnJheX0gVW5pcXVlIGFycmF5IHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBnZXRVbmlxdWUoZGF0YTogYW55W10pOiBhbnlbXSB7XG5cdGNvbnN0IGlzRGF0ZSA9IGRhdGFbMF0gaW5zdGFuY2VvZiBEYXRlO1xuXHRjb25zdCBkID0gKGlzRGF0ZSA/IGRhdGEubWFwKE51bWJlcikgOiBkYXRhKVxuXHRcdC5maWx0ZXIoKHYsIGksIHNlbGYpID0+IHNlbGYuaW5kZXhPZih2KSA9PT0gaSk7XG5cblx0cmV0dXJuIGlzRGF0ZSA/IGQubWFwKHYgPT4gbmV3IERhdGUodikpIDogZDtcbn1cblxuLyoqXG4gKiBNZXJnZSBhcnJheVxuICogQHBhcmFtIHtBcnJheX0gYXJyIFNvdXJjZSBhcnJheVxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gbWVyZ2VBcnJheShhcnI6IGFueVtdKTogYW55W10ge1xuXHRyZXR1cm4gYXJyICYmIGFyci5sZW5ndGggPyBhcnIucmVkdWNlKChwLCBjKSA9PiBwLmNvbmNhdChjKSkgOiBbXTtcbn1cblxuLyoqXG4gKiBNZXJnZSBvYmplY3QgcmV0dXJuaW5nIG5ldyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSB0YXJnZXQgVGFyZ2V0IG9iamVjdFxuICogQHBhcmFtIHtvYmplY3R9IG9iamVjdE4gU291cmNlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gbWVyZ2VkIHRhcmdldCBvYmplY3RcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIG1lcmdlT2JqKHRhcmdldDogb2JqZWN0LCAuLi5vYmplY3ROKTogYW55IHtcblx0aWYgKCFvYmplY3ROLmxlbmd0aCB8fCAob2JqZWN0Ti5sZW5ndGggPT09IDEgJiYgIW9iamVjdE5bMF0pKSB7XG5cdFx0cmV0dXJuIHRhcmdldDtcblx0fVxuXG5cdGNvbnN0IHNvdXJjZSA9IG9iamVjdE4uc2hpZnQoKTtcblxuXHRpZiAoaXNPYmplY3QodGFyZ2V0KSAmJiBpc09iamVjdChzb3VyY2UpKSB7XG5cdFx0T2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0XHRjb25zdCB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG5cdFx0XHRpZiAoaXNPYmplY3QodmFsdWUpKSB7XG5cdFx0XHRcdCF0YXJnZXRba2V5XSAmJiAodGFyZ2V0W2tleV0gPSB7fSk7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gbWVyZ2VPYmoodGFyZ2V0W2tleV0sIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRhcmdldFtrZXldID0gaXNBcnJheSh2YWx1ZSkgP1xuXHRcdFx0XHRcdHZhbHVlLmNvbmNhdCgpIDogdmFsdWU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gbWVyZ2VPYmoodGFyZ2V0LCAuLi5vYmplY3ROKTtcbn1cblxuLyoqXG4gKiBTb3J0IHZhbHVlXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhIHZhbHVlIHRvIGJlIHNvcnRlZFxuICogQHBhcmFtIHtib29sZWFufSBpc0FzYyB0cnVlOiBhc2MsIGZhbHNlOiBkZXNjXG4gKiBAcmV0dXJucyB7bnVtYmVyfHN0cmluZ3xEYXRlfSBzb3J0ZWQgZGF0ZVxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc29ydFZhbHVlKGRhdGE6IGFueVtdLCBpc0FzYyA9IHRydWUpOiBhbnlbXSB7XG5cdGxldCBmbjtcblxuXHRpZiAoZGF0YVswXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRmbiA9IGlzQXNjID8gKGEsIGIpID0+IGEgLSBiIDogKGEsIGIpID0+IGIgLSBhO1xuXHR9IGVsc2Uge1xuXHRcdGlmIChpc0FzYyAmJiAhZGF0YS5ldmVyeShpc05hTikpIHtcblx0XHRcdGZuID0gKGEsIGIpID0+IGEgLSBiO1xuXHRcdH0gZWxzZSBpZiAoIWlzQXNjKSB7XG5cdFx0XHRmbiA9IChhLCBiKSA9PiAoYSA+IGIgJiYgLTEpIHx8IChhIDwgYiAmJiAxKSB8fCAoYSA9PT0gYiAmJiAwKTtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gZGF0YS5jb25jYXQoKS5zb3J0KGZuKTtcbn1cblxuLyoqXG4gKiBHZXQgbWluL21heCB2YWx1ZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgJ21pbicgb3IgJ21heCdcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGEgQXJyYXkgZGF0YSB2YWx1ZVxuICogQHJldHVybnMge251bWJlcnxEYXRlfHVuZGVmaW5lZH1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGdldE1pbk1heCh0eXBlOiBcIm1pblwiIHwgXCJtYXhcIiwgZGF0YTogbnVtYmVyW10gfCBEYXRlW10gfCBhbnkpOiBudW1iZXIgfCBEYXRlIHwgdW5kZWZpbmVkIHwgYW55IHtcblx0bGV0IHJlcyA9IGRhdGEuZmlsdGVyKHYgPT4gbm90RW1wdHkodikpO1xuXG5cdGlmIChyZXMubGVuZ3RoKSB7XG5cdFx0aWYgKGlzTnVtYmVyKHJlc1swXSkpIHtcblx0XHRcdHJlcyA9IE1hdGhbdHlwZV0oLi4ucmVzKTtcblx0XHR9IGVsc2UgaWYgKHJlc1swXSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRcdHJlcyA9IHNvcnRWYWx1ZShyZXMsIHR5cGUgPT09IFwibWluXCIpWzBdO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRyZXMgPSB1bmRlZmluZWQ7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufVxuXG4vKipcbiAqIEdldCByYW5nZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFN0YXJ0IG51bWJlclxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBFbmQgbnVtYmVyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RlcCBTdGVwIG51bWJlclxuICogQHJldHVybnMge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgZ2V0UmFuZ2UgPSAoc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXIsIHN0ZXAgPSAxKTogbnVtYmVyW10gPT4ge1xuXHRjb25zdCByZXM6IG51bWJlcltdID0gW107XG5cdGNvbnN0IG4gPSBNYXRoLm1heCgwLCBNYXRoLmNlaWwoKGVuZCAtIHN0YXJ0KSAvIHN0ZXApKSB8IDA7XG5cblx0Zm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgbjsgaSsrKSB7XG5cdFx0cmVzLnB1c2goc3RhcnQgKyBpICogc3RlcCk7XG5cdH1cblxuXHRyZXR1cm4gcmVzO1xufTtcblxuLy8gZW11bGF0ZSBldmVudFxuY29uc3QgZW11bGF0ZUV2ZW50ID0ge1xuXHRtb3VzZTogKCgpID0+IHtcblx0XHRjb25zdCBnZXRQYXJhbXMgPSAoKSA9PiAoe1xuXHRcdFx0YnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlLCBzY3JlZW5YOiAwLCBzY3JlZW5ZOiAwLCBjbGllbnRYOiAwLCBjbGllbnRZOiAwXG5cdFx0fSk7XG5cblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ld1xuXHRcdFx0bmV3IE1vdXNlRXZlbnQoXCJ0XCIpO1xuXG5cdFx0XHRyZXR1cm4gKGVsOiBTVkdFbGVtZW50IHwgSFRNTEVsZW1lbnQsIGV2ZW50VHlwZTogc3RyaW5nLCBwYXJhbXMgPSBnZXRQYXJhbXMoKSkgPT4ge1xuXHRcdFx0XHRlbC5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KGV2ZW50VHlwZSwgcGFyYW1zKSk7XG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdC8vIFBvbHlmaWxscyBET000IE1vdXNlRXZlbnRcblx0XHRcdHJldHVybiAoZWw6IFNWR0VsZW1lbnQgfCBIVE1MRWxlbWVudCwgZXZlbnRUeXBlOiBzdHJpbmcsIHBhcmFtcyA9IGdldFBhcmFtcygpKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG1vdXNlRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1vdXNlRXZlbnRcIik7XG5cblx0XHRcdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL01vdXNlRXZlbnQvaW5pdE1vdXNlRXZlbnRcblx0XHRcdFx0bW91c2VFdmVudC5pbml0TW91c2VFdmVudChcblx0XHRcdFx0XHRldmVudFR5cGUsXG5cdFx0XHRcdFx0cGFyYW1zLmJ1YmJsZXMsXG5cdFx0XHRcdFx0cGFyYW1zLmNhbmNlbGFibGUsXG5cdFx0XHRcdFx0d2luZG93LFxuXHRcdFx0XHRcdDAsIC8vIHRoZSBldmVudCdzIG1vdXNlIGNsaWNrIGNvdW50XG5cdFx0XHRcdFx0cGFyYW1zLnNjcmVlblgsIHBhcmFtcy5zY3JlZW5ZLFxuXHRcdFx0XHRcdHBhcmFtcy5jbGllbnRYLCBwYXJhbXMuY2xpZW50WSxcblx0XHRcdFx0XHRmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdGVsLmRpc3BhdGNoRXZlbnQobW91c2VFdmVudCk7XG5cdFx0XHR9O1xuXHRcdH1cblx0fSkoKSxcblx0dG91Y2g6IChlbDogU1ZHRWxlbWVudCB8IEhUTUxFbGVtZW50LCBldmVudFR5cGU6IHN0cmluZywgcGFyYW1zOiBhbnkpID0+IHtcblx0XHRjb25zdCB0b3VjaE9iaiA9IG5ldyBUb3VjaChtZXJnZU9iaih7XG5cdFx0XHRpZGVudGlmaWVyOiBEYXRlLm5vdygpLFxuXHRcdFx0dGFyZ2V0OiBlbCxcblx0XHRcdHJhZGl1c1g6IDIuNSxcblx0XHRcdHJhZGl1c1k6IDIuNSxcblx0XHRcdHJvdGF0aW9uQW5nbGU6IDEwLFxuXHRcdFx0Zm9yY2U6IDAuNVxuXHRcdH0sIHBhcmFtcykpO1xuXG5cdFx0ZWwuZGlzcGF0Y2hFdmVudChuZXcgVG91Y2hFdmVudChldmVudFR5cGUsIHtcblx0XHRcdGNhbmNlbGFibGU6IHRydWUsXG5cdFx0XHRidWJibGVzOiB0cnVlLFxuXHRcdFx0c2hpZnRLZXk6IHRydWUsXG5cdFx0XHR0b3VjaGVzOiBbdG91Y2hPYmpdLFxuXHRcdFx0dGFyZ2V0VG91Y2hlczogW10sXG5cdFx0XHRjaGFuZ2VkVG91Y2hlczogW3RvdWNoT2JqXVxuXHRcdH0pKTtcblx0fVxufTtcblxuLyoqXG4gKiBQcm9jZXNzIHRoZSB0ZW1wbGF0ZSAgJiByZXR1cm4gYm91bmQgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gdHBsIFRlbXBsYXRlIHN0cmluZ1xuICogQHBhcmFtIHtvYmplY3R9IGRhdGEgRGF0YSB2YWx1ZSB0byBiZSByZXBsYWNlZFxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHRwbFByb2Nlc3ModHBsOiBzdHJpbmcsIGRhdGE6IG9iamVjdCk6IHN0cmluZyB7XG5cdGxldCByZXMgPSB0cGw7XG5cblx0Zm9yIChjb25zdCB4IGluIGRhdGEpIHtcblx0XHRyZXMgPSByZXMucmVwbGFjZShuZXcgUmVnRXhwKGB7PSR7eH19YCwgXCJnXCIpLCBkYXRhW3hdKTtcblx0fVxuXG5cdHJldHVybiByZXM7XG59XG5cbi8qKlxuICogR2V0IHBhcnNlZCBkYXRlIHZhbHVlXG4gKiAoSXQgbXVzdCBiZSBjYWxsZWQgaW4gJ0NoYXJ0SW50ZXJuYWwnIGNvbnRleHQpXG4gKiBAcGFyYW0ge0RhdGV8c3RyaW5nfG51bWJlcn0gZGF0ZSBWYWx1ZSBvZiBkYXRlIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge0RhdGV9XG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBwYXJzZURhdGUoZGF0ZTogRGF0ZSB8IHN0cmluZyB8IG51bWJlciB8IGFueSk6IERhdGUge1xuXHRsZXQgcGFyc2VkRGF0ZTtcblxuXHRpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpIHtcblx0XHRwYXJzZWREYXRlID0gZGF0ZTtcblx0fSBlbHNlIGlmIChpc1N0cmluZyhkYXRlKSkge1xuXHRcdGNvbnN0IHtjb25maWcsIGZvcm1hdH0gPSB0aGlzO1xuXG5cdFx0cGFyc2VkRGF0ZSA9IGZvcm1hdC5kYXRhVGltZShjb25maWcuZGF0YV94Rm9ybWF0KShkYXRlKTtcblx0fSBlbHNlIGlmIChpc051bWJlcihkYXRlKSAmJiAhaXNOYU4oZGF0ZSkpIHtcblx0XHRwYXJzZWREYXRlID0gbmV3IERhdGUoK2RhdGUpO1xuXHR9XG5cblx0aWYgKCFwYXJzZWREYXRlIHx8IGlzTmFOKCtwYXJzZWREYXRlKSkge1xuXHRcdGNvbnNvbGUgJiYgY29uc29sZS5lcnJvciAmJlxuXHRcdFx0Y29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIHggJyR7ZGF0ZX0nIHRvIERhdGUgb2JqZWN0YCk7XG5cdH1cblxuXHRyZXR1cm4gcGFyc2VkRGF0ZTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gaWYgdGhlIGN1cnJlbnQgZG9jIGlzIHZpc2libGUgb3Igbm90XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGlzVGFiVmlzaWJsZSgpOiBib29sZWFuIHtcblx0cmV0dXJuICFkb2N1bWVudC5oaWRkZW47XG59XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IGlucHV0IHR5cGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gbW91c2UgQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUubW91c2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdG91Y2ggQ29uZmlnIHZhbHVlOiBpbnRlcmFjdGlvbi5pbnB1dFR5cGUudG91Y2hcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFwibW91c2VcIiB8IFwidG91Y2hcIiB8IG51bGxcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRJbnB1dFR5cGUobW91c2U6IGJvb2xlYW4sIHRvdWNoOiBib29sZWFuKTogXCJtb3VzZVwiIHwgXCJ0b3VjaFwiIHwgbnVsbCB7XG5cdGxldCBpc01vYmlsZSA9IGZhbHNlO1xuXG5cdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQnJvd3Nlcl9kZXRlY3Rpb25fdXNpbmdfdGhlX3VzZXJfYWdlbnQjTW9iaWxlX1RhYmxldF9vcl9EZXNrdG9wXG5cdGlmICgvTW9iaS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgdG91Y2gpIHtcblx0XHQvLyBTb21lIEVkZ2UgZGVza3RvcCByZXR1cm4gdHJ1ZTogaHR0cHM6Ly9kZXZlbG9wZXIubWljcm9zb2Z0LmNvbS9lbi11cy9taWNyb3NvZnQtZWRnZS9wbGF0Zm9ybS9pc3N1ZXMvMjA0MTcwNzQvXG5cdFx0Y29uc3QgaGFzVG91Y2hQb2ludHMgPSB3aW5kb3cubmF2aWdhdG9yICYmIFwibWF4VG91Y2hQb2ludHNcIiBpbiB3aW5kb3cubmF2aWdhdG9yICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwO1xuXG5cdFx0Ly8gUmVmOiBodHRwczovL2dpdGh1Yi5jb20vTW9kZXJuaXpyL01vZGVybml6ci9ibG9iL21hc3Rlci9mZWF0dXJlLWRldGVjdHMvdG91Y2hldmVudHMuanNcblx0XHQvLyBPbiBJRTExIHdpdGggSUU5IGVtdWxhdGlvbiBtb2RlLCAoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSBpcyByZXR1cm5pbmcgdHJ1ZVxuXHRcdGNvbnN0IGhhc1RvdWNoID0gKFwib250b3VjaG1vdmVcIiBpbiB3aW5kb3cgfHwgKHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpKTtcblxuXHRcdGlzTW9iaWxlID0gaGFzVG91Y2hQb2ludHMgfHwgaGFzVG91Y2g7XG5cdH1cblxuXHRjb25zdCBoYXNNb3VzZSA9IG1vdXNlICYmICFpc01vYmlsZSA/IChcIm9ubW91c2VvdmVyXCIgaW4gd2luZG93KSA6IGZhbHNlO1xuXG5cdHJldHVybiAoaGFzTW91c2UgJiYgXCJtb3VzZVwiKSB8fCAoaXNNb2JpbGUgJiYgXCJ0b3VjaFwiKSB8fCBudWxsO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==