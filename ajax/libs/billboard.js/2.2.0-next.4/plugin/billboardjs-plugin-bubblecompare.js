/*!
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 *
 * billboard.js, JavaScript chart library
 * https://naver.github.io/billboard.js/
 *
 * @version 2.2.0-next.4
 * @requires billboard.js
 * @summary billboard.js plugin
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3-selection"));
	else if(typeof define === 'function' && define.amd)
		define("bb", ["d3-selection"], factory);
	else if(typeof exports === 'object')
		exports["bb"] = factory(require("d3-selection"));
	else
		root["bb"] = root["bb"] || {}, root["bb"]["plugin"] = root["bb"]["plugin"] || {}, root["bb"]["plugin"]["bubblecompare"] = factory(root["d3"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__) {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => /* binding */ BubbleCompare
});

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// EXTERNAL MODULE: external {"commonjs":"d3-selection","commonjs2":"d3-selection","amd":"d3-selection","root":"d3"}
var external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_ = __webpack_require__(1);
;// CONCATENATED MODULE: ./src/Plugin/Plugin.ts
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
    options === void 0 && (options = {}), this.$$ = void 0, this.options = void 0, this.options = options;
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

Plugin.version = "2.2.0-next.3";

;// CONCATENATED MODULE: ./src/Plugin/bubblecompare/index.ts




/**
 * Bubble compare diagram plugin.<br>
 * Compare data 3-dimensional ways: x-axis, y-axis & bubble-size.
 * - **NOTE:**
 *   - Plugins aren't built-in. Need to be loaded or imported to be used.
 *   - Non required modules from billboard.js core, need to be installed separately.
 * - **Required modules:**
 *   - [d3-selection](https://github.com/d3/d3-selection)
 * @class plugin-bubblecompare
 * @requires d3-selection
 * @param {object} options bubble compare plugin options
 * @augments Plugin
 * @returns {BubbleCompare}
 * @example
 * // Plugin must be loaded before the use.
 * <script src="$YOUR_PATH/plugin/billboardjs-plugin-bubblecompare.js"></script>
 *
 *  var chart = bb.generate({
 *     data: {
 *        columns: [ ... ],
 *        type: "bubble"
 *     }
 *     ...
 *     plugins: [
 *        new bb.plugin.bubblecompare({
 *          minR: 11,
 *          maxR: 74,
 *          expandScale: 1.1
 *        }),
 *     ]
 *  });
 * @example
 * import {bb} from "billboard.js";
 * import BubbleCompare from "billboard.js/dist/billboardjs-plugin-bubblecompare.esm";
 *
 * bb.generate({
 *     plugins: [
 *        new BubbleCompare({ ... })
 *     ]
 * })
 */

var BubbleCompare = /*#__PURE__*/function (_Plugin) {
  function BubbleCompare(options) {
    var _this;

    return _this = _Plugin.call(this, options) || this, _this.$$ = void 0, _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  _inheritsLoose(BubbleCompare, _Plugin);

  var _proto = BubbleCompare.prototype;
  return _proto.$init = function $init() {
    var $$ = this.$$;
    $$.findClosest = this.findClosest.bind(this), $$.getBubbleR = this.getBubbleR.bind(this), $$.pointExpandedR = this.pointExpandedR.bind(this);
  }, _proto.pointExpandedR = function pointExpandedR(d) {
    var baseR = this.getBubbleR(d),
        _this$options$expandS = this.options.expandScale,
        expandScale = _this$options$expandS === void 0 ? 1 : _this$options$expandS;
    return BubbleCompare.raiseFocusedBubbleLayer(d), this.changeCursorPoint(), baseR * expandScale;
  }, BubbleCompare.raiseFocusedBubbleLayer = function raiseFocusedBubbleLayer(d) {
    d.raise && (0,external_commonjs_d3_selection_commonjs2_d3_selection_amd_d3_selection_root_d3_.select)(d.node().parentNode.parentNode).raise();
  }, _proto.changeCursorPoint = function changeCursorPoint() {
    this.$$.$el.svg.select(".bb-event-rect").style("cursor", "pointer");
  }, _proto.findClosest = function findClosest(values, pos) {
    var _this2 = this,
        $$ = this.$$;

    return values.filter(function (v) {
      return v && !$$.isBarType(v.id);
    }).reduce(function (acc, cur) {
      var d = $$.dist(cur, pos);
      return d < _this2.getBubbleR(cur) ? cur : acc;
    }, 0);
  }, _proto.getBubbleR = function getBubbleR(d) {
    var _this3 = this,
        _this$options = this.options,
        minR = _this$options.minR,
        maxR = _this$options.maxR,
        curVal = this.getZData(d);

    if (!curVal) return minR;

    var _this$$$$data$targets = this.$$.data.targets.reduce(function (_ref, cur) {
      var accMin = _ref[0],
          accMax = _ref[1],
          val = _this3.getZData(cur.values[0]);

      return [Math.min(accMin, val), Math.max(accMax, val)];
    }, [1e4, 0]),
        min = _this$$$$data$targets[0],
        max = _this$$$$data$targets[1],
        size = min > 0 && max === min ? 0 : curVal / max;

    return Math.abs(size) * (maxR - minR) + minR;
  }, _proto.getZData = function getZData(d) {
    return this.$$.isBubbleZType(d) ? this.$$.getBubbleZData(d.value, "z") : d.value;
  }, BubbleCompare;
}(Plugin);

BubbleCompare.version = "0.0.1";


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })()
.default;
});