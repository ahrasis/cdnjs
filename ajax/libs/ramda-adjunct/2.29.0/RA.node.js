(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("ramda"));
	else if(typeof define === 'function' && define.amd)
		define(["ramda"], factory);
	else if(typeof exports === 'object')
		exports["RA"] = factory(require("ramda"));
	else
		root["RA"] = factory(root["ramda"]);
})(global, function(__WEBPACK_EXTERNAL_MODULE__0__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isGeneratorFunction = _interopRequireDefault(__webpack_require__(19));

var _isAsyncFunction = _interopRequireDefault(__webpack_require__(20));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is `Function`.
 *
 * @func isFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotFunction|isNotFunction}, {@link RA.isAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isFunction(function test() { }); //=> true
 * RA.isFunction(function* test() { }); //=> true
 * RA.isFunction(async function test() { }); //=> true
 * RA.isFunction(() => {}); //=> true
 * RA.isFunction(null); //=> false
 * RA.isFunction('abc'); //=> false
 */
var isFunction = (0, _ramda.anyPass)([(0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Function')), _isGeneratorFunction["default"], _isAsyncFunction["default"]]);
var _default = isFunction;
exports["default"] = _default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if value is a `Number` primitive or object.
 *
 * @func isNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotNumber|isNotNumber}
 * @example
 *
 * RA.isNumber(5); // => true
 * RA.isNumber(Number.MAX_VALUE); // => true
 * RA.isNumber(-Infinity); // => true
 * RA.isNumber(NaN); // => true
 * RA.isNumber('5'); // => false
 */
var isNumber = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Number')));
var _default = isNumber;
exports["default"] = _default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.isIntegerPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Number = _interopRequireDefault(__webpack_require__(95));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isIntegerPonyfill = (0, _ramda.curryN)(1, _Number["default"]);
/**
 * Checks whether the passed value is an `integer`.
 *
 * @func isInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotInteger|isNotInteger}
 * @example
 *
 * RA.isInteger(0); //=> true
 * RA.isInteger(1); //=> true
 * RA.isInteger(-100000); //=> true
 *
 * RA.isInteger(0.1);       //=> false
 * RA.isInteger(Math.PI);   //=> false
 *
 * RA.isInteger(NaN);       //=> false
 * RA.isInteger(Infinity);  //=> false
 * RA.isInteger(-Infinity); //=> false
 * RA.isInteger('10');      //=> false
 * RA.isInteger(true);      //=> false
 * RA.isInteger(false);     //=> false
 * RA.isInteger([1]);       //=> false
 */

exports.isIntegerPonyfill = isIntegerPonyfill;
var isInteger = (0, _isFunction["default"])(Number.isInteger) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Number.isInteger, Number)) : isIntegerPonyfill;
var _default = isInteger;
exports["default"] = _default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is `Array`.
 *
 * @func isArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotArray|isNotArray}
 * @example
 *
 * RA.isArray([]); //=> true
 * RA.isArray(null); //=> false
 * RA.isArray({}); //=> false
 */
var isArray = (0, _ramda.curryN)(1, (0, _isFunction["default"])(Array.isArray) ? Array.isArray : (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Array')));
var _default = isArray;
exports["default"] = _default;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/* eslint-disable max-len */

/**
 * Composable shortcut for `Promise.resolve`.
 *
 * Returns a Promise object that is resolved with the given value.
 * If the value is a thenable (i.e. has a "then" method), the returned promise will
 * "follow" that thenable, adopting its eventual state.
 *
 * @func resolveP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category Function
 * @sig a -> Promise a
 * @param {*} [value=undefined] Argument to be resolved by this Promise. Can also be a Promise or a thenable to resolve
 * @return {Promise} A Promise that is resolved with the given value, or the promise passed as value, if the value was a promise object
 * @see {@link RA.rejectP|rejectP}
 * @example
 *
 * RA.resolveP(); //=> Promise(undefined)
 * RA.resolveP('a'); //=> Promise('a')
 * RA.resolveP([1, 2, 3]); //=> Promise([1, 2, 3])
 */

/* eslint-enable max-len */
var resolveP = (0, _ramda.bind)(Promise.resolve, Promise);
var _default = resolveP;
exports["default"] = _default;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is `String`.
 *
 * @func isString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotString|isNotString}
 * @example
 *
 * RA.isString('abc'); //=> true
 * RA.isString(1); //=> false
 */
var isString = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('String')));
var _default = isString;
exports["default"] = _default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Composable shortcut for `Promise.all`.
 *
 * The `allP` method returns a single Promise that resolves when all of the promises
 * in the iterable argument have resolved or when the iterable argument contains no promises.
 * It rejects with the reason of the first promise that rejects.
 *
 * @func allP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Function
 * @sig [Promise a] -> Promise [a]
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} An already resolved Promise if the iterable passed is empty. An asynchronously resolved Promise if the iterable passed contains no promises. Note, Google Chrome 58 returns an already resolved promise in this case. A pending Promise in all other cases. This returned promise is then resolved/rejected asynchronously (as soon as the stack is empty) when all the promises in the given iterable have resolved, or if any of the promises reject. See the example about "Asynchronicity or synchronicity of allP" below.
 * @see {@link RA.resolveP|resolveP}, {@link RA.rejectP|rejectP}
 * @example
 *
 * RA.allP([1, 2]); //=> Promise([1, 2])
 * RA.allP([1, Promise.resolve(2)]); //=> Promise([1, 2])
 * RA.allP([Promise.resolve(1), Promise.resolve(2)]); //=> Promise([1, 2])
 * RA.allP([1, Promise.reject(2)]); //=> Promise(2)
 */
var allP = (0, _ramda.curryN)(1, (0, _ramda.bind)(Promise.all, Promise));
var _default = allP;
exports["default"] = _default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var compareLength = (0, _ramda.curry)(function (comparator, value, list) {
  return (0, _ramda.compose)(comparator(value), _ramda.length)(list);
});
var _default = compareLength;
exports["default"] = _default;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * A function that returns `undefined`.
 *
 * @func stubUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.0.0|v1.0.0}
 * @category Function
 * @sig ... -> undefined
 * @return {undefined}
 * @example
 *
 * RA.stubUndefined(); //=> undefined
 * RA.stubUndefined(1, 2, 3); //=> undefined
 */
var stubUndefined = (0, _ramda.always)(void 0); // eslint-disable-line no-void

var _default = stubUndefined;
exports["default"] = _default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.isFinitePonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Number = _interopRequireDefault(__webpack_require__(94));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isFinitePonyfill = (0, _ramda.curryN)(1, _Number["default"]);
/**
 * Checks whether the passed value is a finite `Number`.
 *
 * @func isFinite
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotFinite|isNotFinite}
 * @example
 *
 * RA.isFinite(Infinity); //=> false
 * RA.isFinite(NaN); //=> false
 * RA.isFinite(-Infinity); //=> false
 *
 * RA.isFinite(0); // true
 * RA.isFinite(2e64); // true
 *
 * RA.isFinite('0');  // => false
 *                    // would've been true with global isFinite('0')
 * RA.isFinite(null); // => false
 *                    // would've been true with global isFinite(null)
 */

exports.isFinitePonyfill = isFinitePonyfill;

var _isFinite = (0, _isFunction["default"])(Number.isFinite) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Number.isFinite, Number)) : isFinitePonyfill;

var _default = _isFinite;
exports["default"] = _default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isUndefined = _interopRequireDefault(__webpack_require__(12));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is complement `undefined`.
 *
 * @func isNotUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.0.1|v0.0.1}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isUndefined|isUndefined}
 * @example
 *
 * RA.isNotUndefined(1); //=> true
 * RA.isNotUndefined(undefined); //=> false
 * RA.isNotUndefined(null); //=> true
 */
var isNotUndefined = (0, _ramda.complement)(_isUndefined["default"]);
var _default = isNotUndefined;
exports["default"] = _default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _stubUndefined = _interopRequireDefault(__webpack_require__(9));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is `undefined`.
 *
 * @func isUndefined
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.0.1|v0.0.1}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotUndefined|isNotUndefined}
 * @example
 *
 * RA.isUndefined(1); //=> false
 * RA.isUndefined(undefined); //=> true
 * RA.isUndefined(null); //=> false
 */
var isUndefined = (0, _ramda.equals)((0, _stubUndefined["default"])());
var _default = isUndefined;
exports["default"] = _default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNotNull = _interopRequireDefault(__webpack_require__(17));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _isOfTypeObject = _interopRequireDefault(__webpack_require__(42));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if input value is language type of `Object`.
 *
 * @func isObj
 * @aliases isObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotObj|isNotObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isObj({}); //=> true
 * RA.isObj([]); //=> true
 * RA.isObj(() => {}); //=> true
 * RA.isObj(null); //=> false
 * RA.isObj(undefined); //=> false
 */

/* eslint-enable max-len */
var isObj = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNotNull["default"], (0, _ramda.either)(_isOfTypeObject["default"], _isFunction["default"])));
var _default = isObj;
exports["default"] = _default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Composable shortcut for `Promise.reject`.
 *
 * Returns a Promise object that is rejected with the given reason.
 *
 * @func rejectP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category Function
 * @sig a -> Promise a
 * @param {*} [reason=undefined] Reason why this Promise rejected
 * @return {Promise} A Promise that is rejected with the given reason
 * @see {@link RA.resolveP|resolveP}
 * @example
 *
 * RA.rejectP(); //=> Promise(undefined)
 * RA.rejectP('a'); //=> Promise('a')
 * RA.rejectP([1, 2, 3]); //=> Promise([1, 2, 3])
 */
var rejectP = (0, _ramda.bind)(Promise.reject, Promise);
var _default = rejectP;
exports["default"] = _default;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _compareLength = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if the supplied list or string has a length equal to `valueLength`.
 *
 * @func lengthEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte},, {@link http://ramdajs.com/docs/#equals|equals}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthEq(3, [1,2,3]); //=> true
 * RA.lengthEq(3, [1,2,3,4]); //=> false
 */
var lengthEq = (0, _compareLength["default"])(_ramda.equals);
var _default = lengthEq;
exports["default"] = _default;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is `null`.
 *
 * @func isNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.1.0|v0.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotNull|isNotNull}
 * @example
 *
 * RA.isNull(1); //=> false
 * RA.isNull(undefined); //=> false
 * RA.isNull(null); //=> true
 */
var isNull = (0, _ramda.equals)(null);
var _default = isNull;
exports["default"] = _default;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNull = _interopRequireDefault(__webpack_require__(16));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is complement of `null`.
 *
 * @func isNotNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.1.0|v0.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNull|isNull}
 * @example
 *
 * RA.isNotNull(1); //=> true
 * RA.isNotNull(undefined); //=> true
 * RA.isNotNull(null); //=> false
 */
var isNotNull = (0, _ramda.complement)(_isNull["default"]);
var _default = isNotNull;
exports["default"] = _default;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is complement of `null` or `undefined`.
 *
 * @func isNotNil
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#isNil|R.isNil}
 * @example
 *
 * RA.isNotNil(null); //=> false
 * RA.isNotNil(undefined); //=> false
 * RA.isNotNil(0); //=> true
 * RA.isNotNil([]); //=> true
 */
var isNotNil = (0, _ramda.complement)(_ramda.isNil);
var _default = isNotNil;
exports["default"] = _default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var GeneratorFunction = null;
var legacyCheck = null;

try {
  GeneratorFunction = new Function('return function* () {}')().constructor; // eslint-disable-line no-new-func

  legacyCheck = (0, _ramda.is)(GeneratorFunction);
} catch (e) {
  legacyCheck = _ramda.F;
}
/**
 * Checks if input value is `Generator Function`.
 *
 * @func isGeneratorFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isNotGeneratorFunction|isNotGeneratorFunction}
 * @example
 *
 * RA.isGeneratorFunction(function* test() { }); //=> true
 * RA.isGeneratorFunction(null); //=> false
 * RA.isGeneratorFunction(function test() { }); //=> false
 * RA.isGeneratorFunction(() => {}); //=> false
 */


var isGeneratorFunction = (0, _ramda.curryN)(1, (0, _ramda.either)((0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('GeneratorFunction')), legacyCheck));
var _default = isGeneratorFunction;
exports["default"] = _default;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is `Async Function`.
 *
 * @func isAsyncFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isNotAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isAsyncFunction(async function test() { }); //=> true
 * RA.isAsyncFunction(null); //=> false
 * RA.isAsyncFunction(function test() { }); //=> false
 * RA.isAsyncFunction(() => {}); //=> false
 */
var isAsyncFunction = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('AsyncFunction')));
var _default = isAsyncFunction;
exports["default"] = _default;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks whether the passed value is iterable.
 *
 * @func isIterable
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.18.0|v2.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#The_iterable_protocol}
 * @return {boolean}
 * @example
 *
 * RA.isIterable(['arrays', 'are', 'iterable']); //=> true
 * RA.isIterable('strings are iterable, too'); //=> true
 * RA.isIterable((function* () {})()); //=> true (generator objects are both iterable and iterators)
 *
 * RA.isIterable({}); //=> false
 * RA.isIterable(-0); //=> false
 * RA.isIterable(null); //=> false
 * RA.isIterable(undefined); //=> false
 */
var isIterable = (0, _ramda.curryN)(1, function (val) {
  if (typeof Symbol === 'undefined') {
    return false;
  }

  return (0, _ramda.hasIn)(Symbol.iterator, Object(val)) && (0, _isFunction["default"])(val[Symbol.iterator]);
});
var _default = isIterable;
exports["default"] = _default;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns true if the given value is not its type's empty value; `false` otherwise.
 *
 * @func isNotEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Logic
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#isEmpty|R.isEmpty}
 * @example
 *
 * RA.isNotEmpty([1, 2, 3]); //=> true
 * RA.isNotEmpty([]); //=> false
 * RA.isNotEmpty(''); //=> false
 * RA.isNotEmpty(null); //=> true
 * RA.isNotEmpty(undefined): //=> true
 * RA.isNotEmpty({}); //=> false
 * RA.isNotEmpty({length: 0}); //=> true
 */
var isNotEmpty = (0, _ramda.complement)(_ramda.isEmpty);
var _default = isNotEmpty;
exports["default"] = _default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isArray = _interopRequireDefault(__webpack_require__(4));

var _isString = _interopRequireDefault(__webpack_require__(6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-disable max-len */

/**
 * Tests whether or not an object is similar to an array.
 *
 * @func isArrayLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.9.0|v1.9.0}
 * @licence https://github.com/ramda/ramda/blob/master/LICENSE.txt
 * @category List
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @returns {boolean} `true` if `val` has a numeric length property and extreme indices defined; `false` otherwise.
 * @see {@link RA.isNotArrayLike|isNotArrayLike}

 * @example
 *
 * RA.isArrayLike([]); //=> true
 * RA.isArrayLike(true); //=> false
 * RA.isArrayLike({}); //=> false
 * RA.isArrayLike({length: 10}); //=> false
 * RA.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */

/* eslint-enable max-len */
var isArrayLike = (0, _ramda.curryN)(1, function (val) {
  if ((0, _isArray["default"])(val)) {
    return true;
  }

  if (!val) {
    return false;
  }

  if ((0, _isString["default"])(val)) {
    return false;
  }

  if (_typeof(val) !== 'object') {
    return false;
  }

  if (val.nodeType === 1) {
    return !!val.length;
  }

  if (val.length === 0) {
    return true;
  }

  if (val.length > 0) {
    return (0, _ramda.has)(0, val) && (0, _ramda.has)(val.length - 1, val);
  }

  return false;
});
var _default = isArrayLike;
/**
 The MIT License (MIT)

 Copyright (c) 2013-2016 Scott Sauyet and Michael Hurley

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

exports["default"] = _default;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if input value is complement of `Function`.
 *
 * @func isNotFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isNotAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotFunction(function test() { }); //=> false
 * RA.isNotFunction(function* test() { }); //=> false
 * RA.isNotFunction(async function test() { }); //=> false
 * RA.isNotFunction(() => {}); //=> false
 * RA.isNotFunction(null); //=> true
 * RA.isNotFunction('abc'); //=> true
 */

/* eslint-enable max-len */
var isNotFunction = (0, _ramda.complement)(_isFunction["default"]);
var _default = isNotFunction;
exports["default"] = _default;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNotNull = _interopRequireDefault(__webpack_require__(17));

var _isOfTypeObject = _interopRequireDefault(__webpack_require__(42));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if value is object-like. A value is object-like if it's not null and has a typeof result of "object".
 *
 * @func isObjLike
 * @aliases isObjectLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotObjLike|isNotObjLike}, {@link RA.isObj|isObj}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isObjLike({}); //=> true
 * RA.isObjLike([]); //=> true
 * RA.isObjLike(() => {}); //=> false
 * RA.isObjLike(null); //=> false
 * RA.isObjLike(undefined); //=> false
 */

/* eslint-enable max-len */
var isObjLike = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNotNull["default"], _isOfTypeObject["default"]));
var _default = isObjLike;
exports["default"] = _default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if value is `Date` object.
 *
 * @func isDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotDate|isNotDate}, {@link RA.isValidDate|isValidDate}, {@link RA.isNotValidDate|isNotValidDate}
 * @example
 *
 * RA.isDate(new Date()); //=> true
 * RA.isDate('1997-07-16T19:20+01:00'); //=> false
 */
var isDate = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Date')));
var _default = isDate;
exports["default"] = _default;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNumber = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is a negative `Number` primitive or object. Zero is not considered neither
 * positive or negative.
 *
 * @func isNegative
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.15.0|v1.15.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPositive|isPositive}
 * @example
 *
 * RA.isNegative(-1); // => true
 * RA.isNegative(Number.MIN_VALUE); // => false
 * RA.isNegative(+Infinity); // => false
 * RA.isNegative(NaN); // => false
 * RA.isNegative('5'); // => false
 */
var isNegative = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNumber["default"], (0, _ramda.gt)(0)));
var _default = isNegative;
exports["default"] = _default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isInteger = _interopRequireDefault(__webpack_require__(3));

var _isFinite = _interopRequireDefault(__webpack_require__(10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks whether the passed value is a `float`.
 *
 * @func isFloat
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotFloat|isNotFloat}
 * @example
 *
 * RA.isFloat(0); //=> false
 * RA.isFloat(1); //=> false
 * RA.isFloat(-100000); //=> false
 *
 * RA.isFloat(0.1);       //=> true
 * RA.isFloat(Math.PI);   //=> true
 *
 * RA.isFloat(NaN);       //=> false
 * RA.isFloat(Infinity);  //=> false
 * RA.isFloat(-Infinity); //=> false
 * RA.isFloat('10');      //=> false
 * RA.isFloat(true);      //=> false
 * RA.isFloat(false);     //=> false
 * RA.isFloat([1]);       //=> false
 */
var isFloat = (0, _ramda.both)(_isFinite["default"], (0, _ramda.complement)(_isInteger["default"]));
var _default = isFloat;
exports["default"] = _default;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * In JavaScript, a `truthy` value is a value that is considered true
 * when evaluated in a Boolean context. All values are truthy unless
 * they are defined as falsy (i.e., except for `false`, `0`, `""`, `null`, `undefined`, and `NaN`).
 *
 * @func isTruthy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Truthy|truthy}, {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.isTruthy({}); // => true
 * RA.isTruthy([]); // => true
 * RA.isTruthy(42); // => true
 * RA.isTruthy(3.14); // => true
 * RA.isTruthy('foo'); // => true
 * RA.isTruthy(new Date()); // => true
 * RA.isTruthy(Infinity); // => true
 */
var isTruthy = (0, _ramda.curryN)(1, Boolean);
var _default = isTruthy;
exports["default"] = _default;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if value is `RegExp` object.
 *
 * @func isRegExp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotRegExp|isNotRegExp}
 * @example
 *
 * RA.isRegExp(new RegExp()); //=> true
 * RA.isRegExp(/(?:)/); //=> true
 * RA.isRegExp(1); //=> false
 */
var isRegExp = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('RegExp')));
var _default = isRegExp;
exports["default"] = _default;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var mapping = Object.freeze({
  equals: 'fantasy-land/equals',
  lte: 'fantasy-land/lte',
  compose: 'fantasy-land/compose',
  id: 'fantasy-land/id',
  concat: 'fantasy-land/concat',
  empty: 'fantasy-land/empty',
  map: 'fantasy-land/map',
  contramap: 'fantasy-land/contramap',
  ap: 'fantasy-land/ap',
  of: 'fantasy-land/of',
  alt: 'fantasy-land/alt',
  zero: 'fantasy-land/zero',
  reduce: 'fantasy-land/reduce',
  traverse: 'fantasy-land/traverse',
  chain: 'fantasy-land/chain',
  chainRec: 'fantasy-land/chainRec',
  extend: 'fantasy-land/extend',
  extract: 'fantasy-land/extract',
  bimap: 'fantasy-land/bimap',
  promap: 'fantasy-land/promap'
});
var _default = mapping;
exports["default"] = _default;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns true if the specified value is equal, in R.equals terms,
 * to at least one element of the given list or false otherwise.
 * Given list can be a string.
 *
 * Like {@link http://ramdajs.com/docs/#contains|R.contains} but with argument order reversed.
 *
 * @func contained
 * @aliases included
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @deprecated since v2.12.0; please use RA.included alias
 * @category List
 * @sig [a] -> a -> Boolean
 * @param {Array|String} list The list to consider
 * @param {*} a The item to compare against
 * @return {boolean} Returns Boolean `true` if an equivalent item is in the list or `false` otherwise
 * @see {@link http://ramdajs.com/docs/#contains|R.contains}
 * @example
 *
 * RA.contained([1, 2, 3], 3); //=> true
 * RA.contained([1, 2, 3], 4); //=> false
 * RA.contained([{ name: 'Fred' }], { name: 'Fred' }); //=> true
 * RA.contained([[42]], [42]); //=> true
 */
var contained = (0, _ramda.flip)(_ramda.contains);
var _default = contained;
exports["default"] = _default;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _compareLength = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if the supplied list or string has a length less than or equal to `valueLength`.
 *
 * @func lengthLte
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#lte|lte}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthLte(3, [1,2]); //=> true
 * RA.lengthLte(3, [1,2,3]); //=> true
 * RA.lengthLte(3, [1,2,3,4]); //=> false
 */
var lengthLte = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.lte));
var _default = lengthLte;
exports["default"] = _default;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _isNotFinite = _interopRequireDefault(__webpack_require__(49));

var _isNegative = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var repeat = function repeat(value, count) {
  var validCount = Number(count);

  if (validCount !== count) {
    validCount = 0;
  }

  if ((0, _isNegative["default"])(validCount)) {
    throw new RangeError('repeat count must be non-negative');
  }

  if ((0, _isNotFinite["default"])(validCount)) {
    throw new RangeError('repeat count must be less than infinity');
  }

  validCount = Math.floor(validCount);

  if (value.length === 0 || validCount === 0) {
    return '';
  } // Ensuring validCount is a 31-bit integer allows us to heavily optimize the
  // main part. But anyway, most current (August 2014) browsers can't handle
  // strings 1 << 28 chars or longer, so:
  // eslint-disable-next-line no-bitwise


  if (value.length * validCount >= 1 << 28) {
    throw new RangeError('repeat count must not overflow maximum string size');
  }

  var maxCount = value.length * validCount;
  validCount = Math.floor(Math.log(validCount) / Math.log(2));
  var result = value;

  while (validCount) {
    result += value;
    validCount -= 1;
  }

  result += result.substring(0, maxCount - result.length);
  return result;
};

var _default = repeat;
exports["default"] = _default;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to logic of renaming function.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @func renameKeysWith
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.5.0|v1.5.0}
 * @category Object
 * @sig (a -> b) -> {a: *} -> {b: *}
 * @param {Function} fn Function that renames the keys
 * @param {!Object} obj Provided object
 * @return {!Object} New object with renamed keys
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object-by-a-function|Ramda Cookbook}, {@link RA.renameKeys|renameKeys}
 * @example
 *
 * RA.renameKeysWith(R.concat('a'), { A: 1, B: 2, C: 3 }) //=> { aA: 1, aB: 2, aC: 3 }
 */
var renameKeysWith = (0, _ramda.curry)(function (fn, obj) {
  return (0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)((0, _ramda.over)((0, _ramda.lensIndex)(0), fn)), _ramda.fromPairs)(obj);
});
var _default = renameKeysWith;
exports["default"] = _default;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isArray = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is an empty `Array`.
 *
 * @func isEmptyArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotEmptyArray|isNotEmptyArray}
 * @example
 *
 * RA.isEmptyArray([]); // => true
 * RA.isEmptyArray([42]); // => false
 * RA.isEmptyArray({}); // => false
 * RA.isEmptyArray(null); // => false
 * RA.isEmptyArray(undefined); // => false
 * RA.isEmptyArray(42); // => false
 * RA.isEmptyArray('42'); // => false
 */
var isEmptyArray = (0, _ramda.both)(_isArray["default"], _ramda.isEmpty);
var _default = isEmptyArray;
exports["default"] = _default;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isArray = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is complement of `Array`
 *
 * @func isNotArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isArray|isArray}
 * @example
 *
 * RA.isNotArray([]); //=> false
 * RA.isNotArray(null); //=> true
 * RA.isNotArray({}); //=> true
 */
var isNotArray = (0, _ramda.complement)(_isArray["default"]);
var _default = isNotArray;
exports["default"] = _default;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNotEmpty = _interopRequireDefault(__webpack_require__(22));

var _isArray = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is not an empty `Array`.
 *
 * @func isNonEmptyArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isEmptyArray|isEmptyArray}
 * @example
 *
 * RA.isNonEmptyArray([42]); // => true
 * RA.isNonEmptyArray([]); // => false
 * RA.isNonEmptyArray({}); // => false
 * RA.isNonEmptyArray(null); // => false
 * RA.isNonEmptyArray(undefined); // => false
 * RA.isNonEmptyArray(42); // => false
 * RA.isNonEmptyArray('42'); // => false
 */
var isNonEmptyArray = (0, _ramda.both)(_isArray["default"], _isNotEmpty["default"]);
var _default = isNonEmptyArray;
exports["default"] = _default;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is `Boolean`.
 *
 * @func isBoolean
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotBoolean|isNotBoolean}
 * @example
 *
 * RA.isBoolean(false); //=> true
 * RA.isBoolean(true); //=> true
 * RA.isBoolean(null); //=> false
 */
var isBoolean = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Boolean')));
var _default = isBoolean;
exports["default"] = _default;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns `true` if the given value is its type's empty value, `null` or `undefined`.
 *
 * @func isNilOrEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#isEmpty|R.isEmpty}, {@link http://ramdajs.com/docs/#isNil|R.isNil}
 * @example
 *
 * RA.isNilOrEmpty([1, 2, 3]); //=> false
 * RA.isNilOrEmpty([]); //=> true
 * RA.isNilOrEmpty(''); //=> true
 * RA.isNilOrEmpty(null); //=> true
 * RA.isNilOrEmpty(undefined): //=> true
 * RA.isNilOrEmpty({}); //=> true
 * RA.isNilOrEmpty({length: 0}); //=> false
 */
var isNilOrEmpty = (0, _ramda.curryN)(1, (0, _ramda.either)(_ramda.isNil, _ramda.isEmpty));
var _default = isNilOrEmpty;
exports["default"] = _default;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isObj = _interopRequireDefault(__webpack_require__(13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if input value is complement of language type of `Object`.
 *
 * @func isNotObj
 * @aliases isNotObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isObj|isObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isNotObj({}); //=> false
 * RA.isNotObj([]); //=> false
 * RA.isNotObj(() => {}); //=> false
 * RA.isNotObj(null); //=> true
 * RA.isNotObj(undefined); //=> true
 */

/* eslint-enable max-len */
var isNotObj = (0, _ramda.complement)(_isObj["default"]);
var _default = isNotObj;
exports["default"] = _default;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isOfTypeObject = function isOfTypeObject(val) {
  return _typeof(val) === 'object';
};

var _default = isOfTypeObject;
exports["default"] = _default;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNull = _interopRequireDefault(__webpack_require__(16));

var _isObjLike = _interopRequireDefault(__webpack_require__(25));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isObject = (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Object'));
var isObjectConstructor = (0, _ramda.pipe)(_ramda.toString, (0, _ramda.equals)((0, _ramda.toString)(Object)));
var hasObjectConstructor = (0, _ramda.pathSatisfies)((0, _ramda.both)(_isFunction["default"], isObjectConstructor), ['constructor']);
/* eslint-disable max-len */

/**
 * Check to see if an object is a plain object (created using `{}`, `new Object()` or `Object.create(null)`).
 *
 * @func isPlainObj
 * @aliases isPlainObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotPlainObj|isNotPlainObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}
 * @example
 *
 * class Bar {
 *   constructor() {
 *     this.prop = 'value';
 *   }
 * }
 *
 * RA.isPlainObj(new Bar()); //=> false
 * RA.isPlainObj({ prop: 'value' }); //=> true
 * RA.isPlainObj(['a', 'b', 'c']); //=> false
 * RA.isPlainObj(Object.create(null); //=> true
 * RA.isPlainObj(new Object()); //=> true
 */

/* eslint-enable max-len */

var isPlainObj = (0, _ramda.curryN)(1, function (val) {
  if (!(0, _isObjLike["default"])(val) || !isObject(val)) {
    return false;
  }

  var proto = Object.getPrototypeOf(val);

  if ((0, _isNull["default"])(proto)) {
    return true;
  }

  return hasObjectConstructor(proto);
});
var _default = isPlainObj;
exports["default"] = _default;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isDate = _interopRequireDefault(__webpack_require__(26));

var _isNotNaN = _interopRequireDefault(__webpack_require__(45));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if value is valid `Date` object.
 *
 * @func isValidDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isDate|isDate}, {@link RA.isNotDate|isNotDate}, {@link RA.isNotValidDate|isNotValidDate}
 * @example
 *
 * RA.isValidDate(new Date()); //=> true
 * RA.isValidDate(new Date('a')); //=> false
 */

/* eslint-enable max-len */
var isValidDate = (0, _ramda.curryN)(1, (0, _ramda.both)(_isDate["default"], (0, _ramda.pipe)((0, _ramda.invoker)(0, 'getTime'), _isNotNaN["default"])));
var _default = isValidDate;
exports["default"] = _default;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNaN2 = _interopRequireDefault(__webpack_require__(46));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks whether the passed value is complement of `NaN` and its type is not `Number`.
 *
 * @func isNotNaN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNaN|isNaN}
 * @example
 *
 * RA.isNotNaN(NaN); // => false
 * RA.isNotNaN(Number.NaN); // => false
 * RA.isNotNaN(0 / 0); // => false
 *
 * RA.isNotNaN('NaN'); // => true
 * RA.isNotNaN(undefined); // => true
 * RA.isNotNaN({}); // => true
 * RA.isNotNaN('blabla'); // => true
 *
 * RA.isNotNaN(true); // => true
 * RA.isNotNaN(null); // => true
 * RA.isNotNaN(37); // => true
 * RA.isNotNaN('37'); // => true
 * RA.isNotNaN('37.37'); // => true
 * RA.isNotNaN(''); // => true
 * RA.isNotNaN(' '); // => true
 */
var isNotNaN = (0, _ramda.complement)(_isNaN2["default"]);
var _default = isNotNaN;
exports["default"] = _default;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.isNaNPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Number = _interopRequireDefault(__webpack_require__(85));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isNaNPonyfill = (0, _ramda.curryN)(1, _Number["default"]);
/**
 * Checks whether the passed value is `NaN` and its type is `Number`.
 * It is a more robust version of the original, global isNaN().
 *
 *
 * @func isNaN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotNaN|isNotNaN}
 * @example
 *
 * RA.isNaN(NaN); // => true
 * RA.isNaN(Number.NaN); // => true
 * RA.isNaN(0 / 0); // => true
 *
 * // e.g. these would have been true with global isNaN().
 * RA.isNaN('NaN'); // => false
 * RA.isNaN(undefined); // => false
 * RA.isNaN({}); // => false
 * RA.isNaN('blabla'); // => false
 *
 * RA.isNaN(true); // => false
 * RA.isNaN(null); // => false
 * RA.isNaN(37); // => false
 * RA.isNaN('37'); // => false
 * RA.isNaN('37.37'); // => false
 * RA.isNaN(''); // => false
 * RA.isNaN(' '); // => false
 */

exports.isNaNPonyfill = isNaNPonyfill;

var _isNaN = (0, _isFunction["default"])(Number.isNaN) ? (0, _ramda.curryN)(1, Number.isNaN) : isNaNPonyfill;

var _default = _isNaN;
exports["default"] = _default;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNumber = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is a non-negative `Number` primitive or object. This includes all positive
 * numbers and zero.
 *
 * @func isNonNegative
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPositive|isPositive}, {@link RA.isNonPositive|isNonPositive}
 * @example
 *
 * RA.isNonNegative(0); // => true
 * RA.isNonNegative(1); // => true
 * RA.isNonNegative(Infinity); // => true
 * RA.isNonNegative(Number.MAX_VALUE); // => true
 *
 * RA.isNonNegative(-Infinity); // => false
 * RA.isNonNegative(Number.MIN_VALUE); // => false
 * RA.isNonNegative(NaN); // => false
 */
var isNonNegative = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNumber["default"], (0, _ramda.flip)(_ramda.gte)(0)));
var _default = isNonNegative;
exports["default"] = _default;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Predicate for determining if a provided value is an instance of a Map.
 *
 * @func isMap
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isSet|isSet}}
 * @example
 *
 * RA.isMap(new Map()); //=> true
 * RA.isMap(new Map([[1, 2], [2, 1]])); //=> true
 * RA.isSet(new Set()); //=> false
 * RA.isSet(new Set([1,2]); //=> false
 * RA.isSet(new Object()); //=> false
 */
var isMap = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Map')));
var _default = isMap;
exports["default"] = _default;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFinite2 = _interopRequireDefault(__webpack_require__(10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks whether the passed value is complement of finite `Number`.
 *
 *
 * @func isNotFinite
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFinite|isFinite}
 * @example
 *
 * RA.isNotFinite(Infinity); //=> true
 * RA.isNotFinite(NaN); //=> true
 * RA.isNotFinite(-Infinity); //=> true
 *
 * RA.isNotFinite(0); // false
 * RA.isNotFinite(2e64); // false
 *
 * RA.isNotFinite('0');  // => true
 * RA.isNotFinite(null); // => true
 */
var isNotFinite = (0, _ramda.complement)(_isFinite2["default"]);
var _default = isNotFinite;
exports["default"] = _default;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFloat = _interopRequireDefault(__webpack_require__(28));

var _isInteger = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is a valid `Number`. A valid `Number` is a number that is not `NaN`, `Infinity`
 * or `-Infinity`.
 *
 * @func isValidNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotValidNumber|isNotValidNumber}
 * @example
 *
 * RA.isValidNumber(1); //=> true
 * RA.isValidNumber(''); //=> false
 * RA.isValidNumber(NaN); //=> false
 * RA.isValidNumber(Infinity); //=> false
 * RA.isValidNumber(-Infinity); //=> false
 */
var isValidNumber = (0, _ramda.curryN)(1, (0, _ramda.either)(_isInteger["default"], _isFloat["default"]));
var _default = isValidNumber;
exports["default"] = _default;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isInteger = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is odd integer number.
 * An odd number is an integer which is not a multiple DIVISIBLE of two.
 *
 * @func isOdd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isEven|isEven}
 * @example
 *
 * RA.isOdd(1); // => true
 * RA.isOdd(-Infinity); // => false
 * RA.isOdd(4); // => false
 * RA.isOdd(3); // => true
 */
var isOdd = (0, _ramda.curryN)(1, (0, _ramda.both)(_isInteger["default"], (0, _ramda.pipe)((0, _ramda.flip)(_ramda.modulo)(2), (0, _ramda.complement)(_ramda.equals)(0))));
var _default = isOdd;
exports["default"] = _default;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isArray = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is a pair.
 *
 * @func isPair
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#pair|R.pair}, {@link RA.isNotPair|isNotPair}
 * @example
 *
 * RA.isPair([]); // => false
 * RA.isPair([0]); // => false
 * RA.isPair([0, 1]); // => true
 * RA.isPair([0, 1, 2]); // => false
 * RA.isPair({ 0: 0, 1: 1 }); // => false
 * RA.isPair({ foo: 0, bar: 0 }); // => false
 */
var isPair = (0, _ramda.curryN)(1, (0, _ramda.both)(_isArray["default"], (0, _ramda.pipe)(_ramda.length, (0, _ramda.equals)(2))));
var _default = isPair;
exports["default"] = _default;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is the Boolean primitive `true`. Will return false for Boolean objects
 * created using the `Boolean` function as a constructor.
 *
 * @func isTrue
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFalse|isFalse}, {@link RA.isTruthy|isTruthy}, {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.isTrue(true); // => true
 * RA.isTrue(Boolean(true)); // => true
 * RA.isTrue(false); // => false
 * RA.isTrue(1); // => false
 * RA.isTrue('true'); // => false
 * RA.isTrue(new Boolean(true)); // => false
 */
var isTrue = (0, _ramda.identical)(true);
var _default = isTrue;
exports["default"] = _default;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isTruthy = _interopRequireDefault(__webpack_require__(29));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * A falsy value is a value that translates to false when evaluated in a Boolean context.
 * Falsy values are `false`, `0`, `""`, `null`, `undefined`, and `NaN`.
 *
 * @func isFalsy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2..0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Glossary/Falsy|falsy}, {@link RA.isTruthy|isTruthy}
 * @example
 *
 * RA.isFalsy(false); // => true
 * RA.isFalsy(0); // => true
 * RA.isFalsy(''); // => true
 * RA.isFalsy(null); // => true
 * RA.isFalsy(undefined); // => true
 * RA.isFalsy(NaN); // => true
 */
var isFalsy = (0, _ramda.complement)(_isTruthy["default"]);
var _default = isFalsy;
exports["default"] = _default;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Predicate for determining if a provided value is an instance of a Set.
 *
 * @func isSet
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isMap|isMap}}
 * @example
 *
 * RA.isSet(new Map()); //=> false
 * RA.isSet(new Set()); //=> true
 * RA.isSet(new Set([1,2]); //=> true
 * RA.isSet(new Object()); //=> false
 */
var isSet = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('Set')));
var _default = isSet;
exports["default"] = _default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _ap = _interopRequireDefault(__webpack_require__(119));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
 * the fantasy land Apply spec of algebraic structures.
 *
 * Lifting is specific for {@link https://github.com/scalaz/scalaz|scalaz} and {@link http://www.functionaljava.org/|functional java} implementations.
 * Old version of fantasy land spec were not compatible with this approach,
 * but as of fantasy land 1.0.0 Apply spec also adopted this approach.
 *
 * This function acts as interop for ramda <= 0.23.0 and {@link https://monet.github.io/monet.js/|monet.js}.
 *
 * More info {@link https://github.com/fantasyland/fantasy-land/issues/50|here}.
 *
 * @func liftFN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category Function
 * @sig Apply a => Number -> (a... -> a) -> (a... -> a)
 * @param {number} arity The arity of the lifter function
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function
 * @see {@link http://ramdajs.com/docs/#lift|R.lift}, {@link http://ramdajs.com/docs/#ap|R.ap}
 * @example
 *
 * const { Maybe } = require('monet');
 *
 * const add3 = (a, b, c) => a + b + c;
 * const madd3 = RA.liftFN(3, add3);
 *
 * madd3(Maybe.Some(10), Maybe.Some(15), Maybe.Some(17)); //=> Maybe.Some(42)
 * madd3(Maybe.Some(10), Maybe.Nothing(), Maybe.Some(17)); //=> Maybe.Nothing()
 */
var liftFN = (0, _ramda.curry)(function (arity, fn) {
  var lifted = (0, _ramda.curryN)(arity, fn);
  return (0, _ramda.curryN)(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var accumulator = (0, _ramda.map)(lifted, (0, _ramda.head)(args));
    var apps = (0, _ramda.slice)(1, Infinity, args);
    return (0, _ramda.reduce)(_ap["default"], accumulator, apps);
  });
});
var _default = liftFN;
exports["default"] = _default;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns a curried equivalent of the provided function, with the specified arity.
 * This function is like curryN, except that the provided arguments order is reversed.
 *
 * @func curryRightN
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.12.0|v1.12.0}
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {number} length The arity for the returned function
 * @param {Function} fn The function to curry
 * @return {Function}  A new, curried function
 * @see {@link http://ramdajs.com/docs/#curryN|R.curryN}, {@link RA.curryRight|curryRight}
 * @example
 *
 * const concatStrings = (a, b, c) => a + b + c;
 * const concatStringsCurried = RA.curryRightN(3, concatStrings);
 *
 * concatStringCurried('a')('b')('c'); // => 'cba'
 */
var curryRightN = (0, _ramda.curryN)(2, function (arity, fn) {
  return (0, _ramda.curryN)(arity, function wrapper() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return fn.apply(this, (0, _ramda.reverse)(args));
  });
});
var _default = curryRightN;
exports["default"] = _default;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _compareLength = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if the supplied list or string has a length greater than or equal to
 * `valueLength`.
 *
 * @func lengthGte
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link http://ramdajs.com/docs/#gte|gte}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthGte(3, [1,2,3,4]); //=> true
 * RA.lengthGte(3, [1,2,3]); //=> true
 * RA.lengthGte(3, [1,2]); //=> false
 */
var lengthGte = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.gte));
var _default = lengthGte;
exports["default"] = _default;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns the second argument if predicate function returns `true`,
 * otherwise the third argument is returned.
 *
 * @func defaultWhen
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Logic
 * @sig  (a -> Boolean) -> b -> a -> a | b
 * @param {!function} predicate The predicate function
 * @param {*} defaultVal The default value
 * @param {*} val `val` will be returned instead of `defaultVal` if predicate returns false
 * @return {*} The `val` if predicate returns `false`, otherwise the default value
 * @see {@link http://ramdajs.com/docs/#defaultTo|R.defaultTo}
 * @example
 *
 * RA.defaultWhen(RA.isNull, 1, null); // => 1
 * RA.defaultWhen(RA.isNull, 1, 2); // => 2
 */
var defaultWhen = (0, _ramda.curry)(function (predicate, defaultVal, val) {
  return predicate(val) ? defaultVal : val;
});
var _default = defaultWhen;
exports["default"] = _default;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * {@link http://ramdajs.com/docs/#map|R.map} function that more closely resembles Array.prototype.map.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 *
 * `mapIndexed` implementation is simple : `
 * const mapIndexed = R.addIndex(R.map);
 * `
 * @func mapIndexed
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @typedef Idx = Number
 * @sig Functor f => ((a, Idx, f a) => b) => f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`
 * @param {Array} list The list to be iterated over
 * @return {Array} The new list
 * @see {@link http://ramdajs.com/docs/#addIndex|R.addIndex}, {@link http://ramdajs.com/docs/#map|R.map}
 * @example
 *
 * RA.mapIndexed((val, idx, list) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 * //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 */
var mapIndexed = (0, _ramda.addIndex)(_ramda.map);
var _default = mapIndexed;
exports["default"] = _default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Creates a list from arguments.
 *
 * @func list
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.1.0|v1.1.0}
 * @category List
 * @sig  a... -> [a...]
 * @param {...*} items The items of the feature list
 * @return {Array} New list created from items
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#create-a-list-function|Ramda Cookbook}
 * @example
 *
 * RA.list('a', 'b', 'c'); //=> ['a', 'b', 'c']
 */
var list = (0, _ramda.unapply)(_ramda.identity);
var _default = list;
exports["default"] = _default;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _lengthEq = _interopRequireDefault(__webpack_require__(15));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns true if all items in the list are unique. `R.equals` is used to determine equality.
 *
 * @func allUnique
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.notAllUnique|notAllUnique},  {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.allUnique([ 1, 2, 3, 4 ]); //=> true
 * RA.allUnique([ 1, 1, 2, 3 ]); //=> false
 * RA.allUnique([]); //=> true
 *
 */
var allUnique = (0, _ramda.converge)(_lengthEq["default"], [_ramda.length, _ramda.uniq]);
var _default = allUnique;
exports["default"] = _default;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Acts as multiple path: arrays of paths in, array of values out. Preserves order.
 *
 * @func paths
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category List
 * @sig  [[k]] -> {k: v} - [v]
 * @param {Array} ps The property paths to fetch
 * @param {Object} obj The object to query
 * @return {Array} The corresponding values or partially applied function
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#derivative-of-rprops-for-deep-fields|Ramda Cookbook}, {@link http://ramdajs.com/docs/#props|R.props}
 * @example
 *
 * const obj = {
 *   a: { b: { c: 1 } },
 *   x: 2,
 * };
 *
 * RA.paths([['a', 'b', 'c'], ['x']], obj); //=> [1, 2]
 */
var paths = (0, _ramda.curry)(function (ps, obj) {
  return (0, _ramda.ap)([(0, _ramda.path)(_ramda.__, obj)], ps);
});
var _default = paths;
exports["default"] = _default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Create a new object with the own properties of the second object merged with
 * the own properties of the first object. If a key exists in both objects,
 * the value from the first object will be used. *
 * Putting it simply: it sets properties only if they don't exist.
 *
 * @func mergeRight
 * @deprecated since v2.12.0; available in ramda@0.26.0 as R.mergeLeft
 * @aliases mergeLeft, resetToDefault
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.6.0|v1.6.0}
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} r Destination
 * @param {Object} l Source
 * @return {Object}
 * @see {@link http://ramdajs.com/docs/#merge|R.merge}, {@link https://github.com/ramda/ramda/wiki/Cookbook#set-properties-only-if-they-dont-exist|Ramda Cookbook}
 * @example
 *
 * RA.mergeRight({ 'age': 40 }, { 'name': 'fred', 'age': 10 });
 * //=> { 'name': 'fred', 'age': 40 }
 */
var mergeRight = (0, _ramda.flip)(_ramda.merge);
var _default = mergeRight;
exports["default"] = _default;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _mergeRight = _interopRequireDefault(__webpack_require__(64));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Create a new object with the own properties of the object under the `path`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 *
 * @func mergePath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Object
 * @sig [k] -> {a} -> {k: {a}} -> {k: {a}}
 * @see {@link RA.mergeProp|mergeProp}
 * @param {!Array} path The property path of the destination object
 * @param {!Object} source The source object
 * @param {!Object} obj The object that has destination object under corresponding property path
 * @return {!Object} The new version of object
 * @example
 *
 * RA.mergePath(
 *  ['outer', 'inner'],
 *  { foo: 3, bar: 4 },
 *  { outer: { inner: { foo: 2 } } }
 * ); //=> { outer: { inner: { foo: 3, bar: 4 } }
 */
var mergePath = (0, _ramda.curry)(function (path, source, obj) {
  return (0, _ramda.over)((0, _ramda.lensPath)(path), (0, _mergeRight["default"])(source), obj);
});
var _default = mergePath;
exports["default"] = _default;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Spreads object under property path onto provided object.
 * It's like {@link RA.flattenPath|flattenPath}, but removes object under the property path.
 *
 * @func spreadPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!Array.<string|number>} path The property path to spread
 * @param {!Object} obj The provided object
 * @return {!Object} The result of the spread
 * @see {@link RA.spreadProp|spreadProp}, {@link RA.flattenPath|flattenPath}
 * @example
 *
 * RA.spreadPath(
 *   ['b1', 'b2'],
 *   { a: 1, b1: { b2: { c: 3, d: 4 } } }
 * ); // => { a: 1, c: 3, d: 4, b1: {} };
 */
var spreadPath = (0, _ramda.curryN)(2, (0, _ramda.converge)(_ramda.merge, [_ramda.dissocPath, (0, _ramda.pathOr)({})]));
var _default = spreadPath;
exports["default"] = _default;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Flattens a property path so that its fields are spread out into the provided object.
 * It's like {@link RA.spreadPath|spreadPath}, but preserves object under the property path.
 *
 * @func flattenPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!Array.<string|number>} path The property path to flatten
 * @param {!Object} obj The provided object
 * @return {!Object} The flattened object
 * @see {@link RA.flattenProp|flattenProp}, {@link RA.spreadPath|spreadPath}
 * @example
 *
 * RA.flattenPath(
 *   ['b1', 'b2'],
 *   { a: 1, b1: { b2: { c: 3, d: 4 } } }
 * ); // => { a: 1, c: 3, d: 4, b1: { b2: { c: 3, d: 4 } } };
 */
var flattenPath = (0, _ramda.curry)(function (path, obj) {
  return (0, _ramda.merge)(obj, (0, _ramda.pathOr)({}, path, obj));
});
var _default = flattenPath;
exports["default"] = _default;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns `true` if data structure focused by the given lens equals provided value.
 *
 * @func lensEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Lens s a -> b -> s -> Boolean
 * @see {@link RA.lensNotEq|lensNotEq}
 * @param {function} lens Van Laarhoven lens
 * @param {*} value The value to compare the focused data structure with
 * @param {*} data The data structure
 * @return {boolean} `true` if the focused data structure equals value, `false` otherwise
 *
 * @example
 *
 * RA.lensEq(R.lensIndex(0), 1, [0, 1, 2]); // => false
 * RA.lensEq(R.lensIndex(1), 1, [0, 1, 2]); // => true
 * RA.lensEq(R.lensPath(['a', 'b']), 'foo', { a: { b: 'foo' } }) // => true
 */
var lensEq = (0, _ramda.curryN)(3, function (lens, val, data) {
  return (0, _ramda.pipe)((0, _ramda.view)(lens), (0, _ramda.equals)(val))(data);
});
var _default = lensEq;
exports["default"] = _default;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isTrue = _interopRequireDefault(__webpack_require__(53));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if data structure focused by the given lens satisfies the predicate.
 * Note that the predicate is expected to return boolean value and will be evaluated
 * as `false` unless the predicate returns `true`.
 *
 * @func lensSatisfies
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Boolean b => (a -> b) -> Lens s a -> s -> b
 * @see {@link RA.lensNotSatisfy|lensNotSatisfy}
 * @param {Function} predicate The predicate function
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @return {boolean} `true` if the focused data structure satisfies the predicate, `false` otherwise
 *
 * @example
 *
 * RA.lensSatisfies(RA.isTrue, R.lensIndex(0), [false, true, 1]); // => false
 * RA.lensSatisfies(RA.isTrue, R.lensIndex(1), [false, true, 1]); // => true
 * RA.lensSatisfies(RA.isTrue, R.lensIndex(2), [false, true, 1]); // => false
 * RA.lensSatisfies(R.identity, R.lensProp('x'), { x: 1 }); // => false
 */
var lensSatisfies = (0, _ramda.curryN)(3, function (predicate, lens, data) {
  return (0, _ramda.pipe)((0, _ramda.view)(lens), predicate, _isTrue["default"])(data);
});
var _default = lensSatisfies;
exports["default"] = _default;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _mapping = _interopRequireDefault(__webpack_require__(31));

var _traits = __webpack_require__(184);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// we do this here for jsdocs generate properly
var of = _mapping["default"].of,
    _ap = _mapping["default"].ap,
    _map = _mapping["default"].map,
    _equals = _mapping["default"].equals,
    _concat = _mapping["default"].concat,
    _chain = _mapping["default"].chain,
    _lte = _mapping["default"].lte,
    _empty = _mapping["default"].empty,
    _contramap = _mapping["default"].contramap;
/**
 * The simplest {@link https://github.com/fantasyland/fantasy-land|fantasy-land}
 * compatible monad which attaches no information to values.
 *
 * The Identity type is a very simple type that has no interesting side effects and
 * is effectively just a container of some value. So why does it exist ?
 * The Identity type is often used as the base monad of a monad
 * transformer when no other behaviour is required.
 *
 * @memberOf RA
 * @implements
 * {@link https://github.com/fantasyland/fantasy-land#apply|Apply},
 * {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative},
 * {@link https://github.com/fantasyland/fantasy-land#functor|Functor},
 * {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid},
 * {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup},
 * {@link https://github.com/fantasyland/fantasy-land#chain|Chain},
 * {@link https://github.com/fantasyland/fantasy-land#monad|Monad},
 * {@link https://github.com/fantasyland/fantasy-land#ord|Ord},
 * {@link https://github.com/fantasyland/fantasy-land#monoid|Monoid*},
 * {@link https://github.com/fantasyland/fantasy-land#contravariant|Contravariant}
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 */

var Identity = /*#__PURE__*/function () {
  _createClass(Identity, null, [{
    key: of,

    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#applicative|Applicative} specification.
     *
     * @static
     * @sig of :: Applicative f => a -> f a
     * @param {*} value
     * @returns {RA.Identity}
     * @example
     *
     * const a = Identity.of(1); //=> Identity(1)
     */
    value: function value(_value) {
      return new Identity(_value);
    }
  }, {
    key: "of",
    value: function of(value) {
      return new Identity(value);
    }
    /**
     * @static
     */

  }, {
    key: '@@type',
    get: function get() {
      return 'RA/Identity';
    }
    /**
     * Private constructor. Use {@link RA.Identity.of|Identity.of} instead.
     *
     * @param {*} value
     * @return {RA.Identity}
     */

  }]);

  function Identity(value) {
    _classCallCheck(this, Identity);

    this.value = value;
  }
  /**
   * Catamorphism for a value.
   * @returns {*}
   * @example
   *
   * const a = Identity.of(1);
   * a.get(); //=> 1
   */


  _createClass(Identity, [{
    key: "get",
    value: function get() {
      return this.value;
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#apply|Apply} specification.
     *
     * @sig ap :: Apply f => f a ~> f (a -> b) -> f b
     * @param {RA.Identity} applyWithFn
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1).map(a => b => a + b);
     *
     * a.ap(b); //=> Identity(2)
     */

  }, {
    key: _ap,
    value: function value(applyWithFn) {
      return _traits.applyTrait[_ap].call(this, applyWithFn);
    }
  }, {
    key: "ap",
    value: function ap(applyWithFn) {
      return this[_ap](applyWithFn);
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#functor|Functor} specification.
     *
     * @sig map :: Functor f => f a ~> (a -> b) -> f b
     * @param {Function} fn
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * a.map(a => a + 1); //=> Identity(2)
     */

  }, {
    key: _map,
    value: function value(fn) {
      return _traits.functorTrait[_map].call(this, fn);
    }
  }, {
    key: "map",
    value: function map(fn) {
      return this[_map](fn);
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#setoid|Setoid} specification.
     *
     * @sig equals :: Setoid a => a ~> a -> Boolean
     * @param {RA.Identity} setoid
     * @return {boolean}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1);
     * const c = Identity.of(2);
     *
     * a.equals(b); //=> true
     * a.equals(c); //=> false
     */

  }, {
    key: _equals,
    value: function value(setoid) {
      return _traits.setoidTrait[_equals].call(this, setoid);
    }
  }, {
    key: "equals",
    value: function equals(setoid) {
      return this[_equals](setoid);
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#semigroup|Semigroup} specification.
     *
     * @sig concat :: Semigroup a => a ~> a -> a
     * @param {RA.Identity} semigroup
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1);
     * a.concat(b); //=> 2
     *
     * const c = Identity.of('c');
     * const d = Identity.of('d');
     * c.concat(d); //=> 'cd'
     *
     * const e = Identity.of(['e']);
     * const f = Identity.of(['f']);
     * e.concat(f); //=> ['e', 'f']
     */

  }, {
    key: _concat,
    value: function value(semigroup) {
      return _traits.semigroupTrait[_concat].call(this, semigroup);
    }
  }, {
    key: "concat",
    value: function concat(semigroup) {
      return this[_concat](semigroup);
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#chain|Chain} specification.
     *
     * @sig chain :: Chain m => m a ~> (a -> m b) -> m b
     * @param {Function} fn Function returning the value of the same {@link https://github.com/fantasyland/fantasy-land#semigroup|Chain}
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of(1);
     * const fn = val => Identity.of(val + 1);
     *
     * a.chain(fn).chain(fn); //=> Identity(3)
     */

  }, {
    key: _chain,
    value: function value(fn) {
      return _traits.chainTrait[_chain].call(this, fn);
    }
  }, {
    key: "chain",
    value: function chain(fn) {
      return this[_chain](fn);
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#ord|Ord} specification.
     *
     * @sig lte :: Ord a => a ~> a -> Boolean
     * @param {RA.Identity} ord
     * @return {boolean}
     * @example
     *
     * const a = Identity.of(1);
     * const b = Identity.of(1);
     * const c = Identity.of(2);
     *
     * a.lte(b); //=> true
     * a.lte(c); //=> true
     * c.lte(a); //=> false
     */

  }, {
    key: _lte,
    value: function value(ord) {
      return _traits.ordTrait[_lte].call(this, ord);
    }
  }, {
    key: "lte",
    value: function lte(ord) {
      return this[_lte](ord);
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#monoid|Monoid*} specification.
     * Partial implementation of Monoid specification. `empty` method on instance only, returning
     * identity value of the wrapped type. Using `R.empty` under the hood.
     *
     *
     * @sig empty :: Monoid m => () -> m
     * @return {RA.Identity}
     * @example
     *
     * const a = Identity.of('test');
     * const i = a.empty();
     *
     * a.concat(i); //=> Identity('string');
     * i.concat(a); //=> Identity('string');
     */

  }, {
    key: _empty,
    value: function value() {
      return this.constructor.of((0, _ramda.empty)(this.value));
    }
  }, {
    key: "empty",
    value: function empty() {
      return this[_empty]();
    }
    /**
     * Fantasy land {@link https://github.com/fantasyland/fantasy-land#contravariant|Contravariant} specification.
     *
     * @sig contramap :: Contravariant f => f a ~> (b -> a) -> f b
     * @param {Function} fn
     * @return {RA.Identity}
     * @example
     *
     * const identity = a => a;
     * const add1 = a => a + 1;
     * const divide2 = a => a / 2;
     *
     * Identity.of(divide2).contramap(add1).get()(3); //=> 2
     * Identity.of(identity).contramap(divide2).contramap(add1).get()(3); //=> 2
     * Identity.of(identity).contramap(a => divide2(add1(a))).get()(3); //=> 2
     */

  }, {
    key: _contramap,
    value: function value(fn) {
      var _this = this;

      return this.constructor.of(function (value) {
        return _this.value(fn(value));
      });
    }
  }, {
    key: "contramap",
    value: function contramap(fn) {
      return this[_contramap](fn);
    }
  }]);

  return Identity;
}();

var _default = Identity;
exports["default"] = _default;

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isString = _interopRequireDefault(__webpack_require__(6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Escapes the RegExp special characters.
 *
 * @func escapeRegExp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.21.0|v2.21.0}
 * @category String
 * @sig String -> String
 * @param {string} val the value to escape
 * @return {string}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping|MDN Regular Expressions Escaping}
 * @example
 *
 * RA.escapeRegExp('[ramda-adjunct](https://github.com/char0n/ramda-adjunct)'); //=> '\[ramda\-adjunct\]\(https://github\.com/char0n/ramda\-adjunct\)'
 */
var escapeRegExp = (0, _ramda.when)(_isString["default"], (0, _ramda.replace)(/[.*+?^${}()|[\]\\-]/g, '\\$&'));
var _default = escapeRegExp;
exports["default"] = _default;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.padStartPonyfill = exports.padStartInvoker = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _String = _interopRequireDefault(__webpack_require__(218));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var padStartInvoker = (0, _ramda.flip)((0, _ramda.invoker)(2, 'padStart'));
exports.padStartInvoker = padStartInvoker;
var padStartPonyfill = (0, _ramda.curry)(_String["default"]);
/**
 * The function pads the current string with a given string
 * (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the start of the current string.
 *
 * @func padCharsStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> Number -> String -> String
 * @param {string} padString The string to pad the current string with
 * @param {number} targetLength The length of the resulting string once the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the pad string on the start of current string
 * @see {@link RA.padStart|padStart}, {@link RA.padEnd|padEnd}, {@link RA.padCharsEnd|padCharsEnd}
 * @example
 *
 * RA.padCharsStart('-', 3, 'a'); // => '--a'
 * RA.padCharsStart('foo', 10, 'abc'); // => 'foofoofabc'
 * RA.padCharsStart('123456', 6, 'abc'); // => '123abc'
 */

exports.padStartPonyfill = padStartPonyfill;
var padCharsStart = (0, _isFunction["default"])(String.prototype.padStart) ? padStartInvoker : padStartPonyfill;
var _default = padCharsStart;
exports["default"] = _default;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.padEndInvoker = exports.padEndPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _String = _interopRequireDefault(__webpack_require__(219));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var padEndPonyfill = (0, _ramda.curry)(_String["default"]);
exports.padEndPonyfill = padEndPonyfill;
var padEndInvoker = (0, _ramda.flip)((0, _ramda.invoker)(2, 'padEnd'));
/**
 * The function pads the current string with a given string
 * (repeated, if needed) so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 *
 * @func padCharsEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> Number -> String -> String
 * @param {string} padString The string to pad the current string with
 * @param {number} targetLength The length of the resulting string once
 * the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the pad string
 * applied at the end of the current string
 * @see {@link RA.padEnd|padEnd}, {@link RA.padCharsStart|padCharsStart}, {@link RA.padStart|padStart}
 * @example
 *
 * RA.padCharsEnd('-', 3, 'a'); // => 'a--'
 * RA.padCharsEnd('foo', 10, 'abc'); // => 'abcfoofoof'
 * RA.padCharsEnd('123456', 6, 'abc'); // => 'abc123'
 */

exports.padEndInvoker = padEndInvoker;
var padCharsEnd = (0, _isFunction["default"])(String.prototype.padEnd) ? padEndInvoker : padEndPonyfill;
var _default = padCharsEnd;
exports["default"] = _default;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.resolveP = exports.noneP = exports.allP = exports.curryRight = exports.curryRightN = exports.weaveLazy = exports.weave = exports.cata = exports.liftF = exports.liftFN = exports.noop = exports.stubArray = exports.stubString = exports.stubObject = exports.stubObj = exports.stubNull = exports.stubUndefined = exports.isNaturalNumber = exports.isIndexed = exports.isSafeInteger = exports.isSymbol = exports.isSparseArray = exports.isNotSet = exports.isSet = exports.isNotRegExp = exports.isRegExp = exports.isFalsy = exports.isTruthy = exports.isFalse = exports.isTrue = exports.isPromise = exports.isThenable = exports.isNotPair = exports.isPair = exports.isEven = exports.isOdd = exports.isNotValidNumber = exports.isValidNumber = exports.isNotFloat = exports.isFloat = exports.isBigInt = exports.isNotInteger = exports.isInteger = exports.isNotFinite = exports.isFinite = exports.isNotNaN = exports.isNaN = exports.isNotMap = exports.isMap = exports.isNonNegative = exports.isNonPositive = exports.isNotNilOrEmpty = exports.isNegativeZero = exports.isPositiveZero = exports.isNegative = exports.isPositive = exports.isNotNumber = exports.isNumber = exports.isInvalidDate = exports.isNotValidDate = exports.isValidDate = exports.isNotDate = exports.isDate = exports.isNotPlainObject = exports.isNotPlainObj = exports.isPlainObject = exports.isPlainObj = exports.isNotObjectLike = exports.isNotObjLike = exports.isObjectLike = exports.isObjLike = exports.isNotObject = exports.isNotObj = exports.isObject = exports.isObj = exports.isNotFunction = exports.isFunction = exports.isNotAsyncFunction = exports.isAsyncFunction = exports.isNotGeneratorFunction = exports.isGeneratorFunction = exports.isNotArrayLike = exports.isArrayLike = exports.isNonEmptyString = exports.isNotString = exports.isEmptyString = exports.isString = exports.isNilOrEmpty = exports.isNotBoolean = exports.isBoolean = exports.isNonEmptyArray = exports.isNotArray = exports.isEmptyArray = exports.isIterable = exports.isArray = exports.isNotNil = exports.isNotNull = exports.isNull = exports.isUndefined = exports.isNotUndefined = void 0;
exports.toInt32 = exports.toInteger32 = exports.subtractNum = exports.sign = exports.trunc = exports.floor = exports.divideNum = exports.ceil = exports.round = exports.dropArgs = exports.argsPass = exports.nonePass = exports.notAllPass = exports.nor = exports.neither = exports.nand = exports.notBoth = exports.defaultWhen = exports.isNotEmpty = exports.notEqual = exports.inRange = exports.pathNotEq = exports.propNotEq = exports.lensIso = exports.lensTraverse = exports.lensNotSatisfy = exports.lensSatisfies = exports.lensNotEq = exports.lensEq = exports.zipObjWith = exports.unzipObjWith = exports.flattenPath = exports.flattenProp = exports.spreadPath = exports.spreadProp = exports.hasPath = exports.viewOr = exports.pathOrLazy = exports.omitBy = exports.mergePath = exports.mergeProp = exports.mergePaths = exports.mergeProps = exports.resetToDefault = exports.mergeLeft = exports.mergeRight = exports.renameKeyWith = exports.renameKeysWith = exports.renameKeys = exports.paths = exports.invokeArgs = exports.skipTake = exports.sortByProps = exports.notAllUnique = exports.allUnique = exports.toArray = exports.flattenDepth = exports.allEqualTo = exports.allIdenticalTo = exports.allIdentical = exports.repeatStr = exports.allEqual = exports.lengthNotEq = exports.lengthEq = exports.lengthLte = exports.lengthGte = exports.lengthLt = exports.lengthGt = exports.move = exports.included = exports.contained = exports.appendFlipped = exports.compact = exports.omitIndexes = exports.sliceTo = exports.sliceFrom = exports.reduceRightP = exports.reduceP = exports.concatRight = exports.concatAll = exports.ensureArray = exports.list = exports.pickIndexes = exports.reduceIndexed = exports.mapIndexed = exports.fnull = exports.lastP = exports.firstP = exports.anyP = exports.async = exports.dispatch = exports.sequencing = exports.seq = exports.Y = exports.allSettledP = exports.thenCatchP = exports.then = exports.thenP = exports.delayP = exports.rejectP = void 0;
exports.Identity = exports.padStart = exports.padEnd = exports.padCharsEnd = exports.padCharsStart = exports.trimCharsStart = exports.trimCharsEnd = exports.trimRight = exports.trimEnd = exports.trimLeft = exports.trimStart = exports.escapeRegExp = exports.replaceAll = exports.toUint32 = exports.toUinteger32 = void 0;

var _isNotUndefined = _interopRequireDefault(__webpack_require__(11));

exports.isNotUndefined = _isNotUndefined["default"];

var _isUndefined = _interopRequireDefault(__webpack_require__(12));

exports.isUndefined = _isUndefined["default"];

var _isNull = _interopRequireDefault(__webpack_require__(16));

exports.isNull = _isNull["default"];

var _isNotNull = _interopRequireDefault(__webpack_require__(17));

exports.isNotNull = _isNotNull["default"];

var _isNotNil = _interopRequireDefault(__webpack_require__(18));

exports.isNotNil = _isNotNil["default"];

var _isArray = _interopRequireDefault(__webpack_require__(4));

exports.isArray = _isArray["default"];

var _isIterable = _interopRequireDefault(__webpack_require__(21));

exports.isIterable = _isIterable["default"];

var _isEmptyArray = _interopRequireDefault(__webpack_require__(36));

exports.isEmptyArray = _isEmptyArray["default"];

var _isNotArray = _interopRequireDefault(__webpack_require__(37));

exports.isNotArray = _isNotArray["default"];

var _isNonEmptyArray = _interopRequireDefault(__webpack_require__(38));

exports.isNonEmptyArray = _isNonEmptyArray["default"];

var _isBoolean = _interopRequireDefault(__webpack_require__(39));

exports.isBoolean = _isBoolean["default"];

var _isNotBoolean = _interopRequireDefault(__webpack_require__(75));

exports.isNotBoolean = _isNotBoolean["default"];

var _isNilOrEmpty = _interopRequireDefault(__webpack_require__(40));

exports.isNilOrEmpty = _isNilOrEmpty["default"];

var _isString = _interopRequireDefault(__webpack_require__(6));

exports.isString = _isString["default"];

var _isEmptyString = _interopRequireDefault(__webpack_require__(76));

exports.isEmptyString = _isEmptyString["default"];

var _isNotString = _interopRequireDefault(__webpack_require__(77));

exports.isNotString = _isNotString["default"];

var _isNonEmptyString = _interopRequireDefault(__webpack_require__(78));

exports.isNonEmptyString = _isNonEmptyString["default"];

var _isArrayLike = _interopRequireDefault(__webpack_require__(23));

exports.isArrayLike = _isArrayLike["default"];

var _isNotArrayLike = _interopRequireDefault(__webpack_require__(79));

exports.isNotArrayLike = _isNotArrayLike["default"];

var _isGeneratorFunction = _interopRequireDefault(__webpack_require__(19));

exports.isGeneratorFunction = _isGeneratorFunction["default"];

var _isNotGeneratorFunction = _interopRequireDefault(__webpack_require__(80));

exports.isNotGeneratorFunction = _isNotGeneratorFunction["default"];

var _isAsyncFunction = _interopRequireDefault(__webpack_require__(20));

exports.isAsyncFunction = _isAsyncFunction["default"];

var _isNotAsyncFunction = _interopRequireDefault(__webpack_require__(81));

exports.isNotAsyncFunction = _isNotAsyncFunction["default"];

var _isFunction = _interopRequireDefault(__webpack_require__(1));

exports.isFunction = _isFunction["default"];

var _isNotFunction = _interopRequireDefault(__webpack_require__(24));

exports.isNotFunction = _isNotFunction["default"];

var _isObj = _interopRequireDefault(__webpack_require__(13));

exports.isObj = _isObj["default"];
exports.isObject = _isObj["default"];

var _isNotObj = _interopRequireDefault(__webpack_require__(41));

exports.isNotObj = _isNotObj["default"];
exports.isNotObject = _isNotObj["default"];

var _isObjLike = _interopRequireDefault(__webpack_require__(25));

exports.isObjLike = _isObjLike["default"];
exports.isObjectLike = _isObjLike["default"];

var _isNotObjLike = _interopRequireDefault(__webpack_require__(82));

exports.isNotObjLike = _isNotObjLike["default"];
exports.isNotObjectLike = _isNotObjLike["default"];

var _isPlainObj = _interopRequireDefault(__webpack_require__(43));

exports.isPlainObj = _isPlainObj["default"];
exports.isPlainObject = _isPlainObj["default"];

var _isNotPlainObj = _interopRequireDefault(__webpack_require__(83));

exports.isNotPlainObj = _isNotPlainObj["default"];
exports.isNotPlainObject = _isNotPlainObj["default"];

var _isDate = _interopRequireDefault(__webpack_require__(26));

exports.isDate = _isDate["default"];

var _isNotDate = _interopRequireDefault(__webpack_require__(84));

exports.isNotDate = _isNotDate["default"];

var _isValidDate = _interopRequireDefault(__webpack_require__(44));

exports.isValidDate = _isValidDate["default"];

var _isNotValidDate = _interopRequireDefault(__webpack_require__(86));

exports.isNotValidDate = _isNotValidDate["default"];
exports.isInvalidDate = _isNotValidDate["default"];

var _isNumber = _interopRequireDefault(__webpack_require__(2));

exports.isNumber = _isNumber["default"];

var _isNotNumber = _interopRequireDefault(__webpack_require__(87));

exports.isNotNumber = _isNotNumber["default"];

var _isPositive = _interopRequireDefault(__webpack_require__(88));

exports.isPositive = _isPositive["default"];

var _isNegative = _interopRequireDefault(__webpack_require__(27));

exports.isNegative = _isNegative["default"];

var _isPositiveZero = _interopRequireDefault(__webpack_require__(89));

exports.isPositiveZero = _isPositiveZero["default"];

var _isNegativeZero = _interopRequireDefault(__webpack_require__(90));

exports.isNegativeZero = _isNegativeZero["default"];

var _isNotNilOrEmpty = _interopRequireDefault(__webpack_require__(91));

exports.isNotNilOrEmpty = _isNotNilOrEmpty["default"];

var _isNonPositive = _interopRequireDefault(__webpack_require__(92));

exports.isNonPositive = _isNonPositive["default"];

var _isNonNegative = _interopRequireDefault(__webpack_require__(47));

exports.isNonNegative = _isNonNegative["default"];

var _isMap = _interopRequireDefault(__webpack_require__(48));

exports.isMap = _isMap["default"];

var _isNotMap = _interopRequireDefault(__webpack_require__(93));

exports.isNotMap = _isNotMap["default"];

var _isNaN = _interopRequireDefault(__webpack_require__(46));

exports.isNaN = _isNaN["default"];

var _isNotNaN = _interopRequireDefault(__webpack_require__(45));

exports.isNotNaN = _isNotNaN["default"];

var _isFinite = _interopRequireDefault(__webpack_require__(10));

exports.isFinite = _isFinite["default"];

var _isNotFinite = _interopRequireDefault(__webpack_require__(49));

exports.isNotFinite = _isNotFinite["default"];

var _isInteger = _interopRequireDefault(__webpack_require__(3));

exports.isInteger = _isInteger["default"];

var _isNotInteger = _interopRequireDefault(__webpack_require__(96));

exports.isNotInteger = _isNotInteger["default"];

var _isBigInt = _interopRequireDefault(__webpack_require__(97));

exports.isBigInt = _isBigInt["default"];

var _isFloat = _interopRequireDefault(__webpack_require__(28));

exports.isFloat = _isFloat["default"];

var _isNotFloat = _interopRequireDefault(__webpack_require__(98));

exports.isNotFloat = _isNotFloat["default"];

var _isValidNumber = _interopRequireDefault(__webpack_require__(50));

exports.isValidNumber = _isValidNumber["default"];

var _isNotValidNumber = _interopRequireDefault(__webpack_require__(99));

exports.isNotValidNumber = _isNotValidNumber["default"];

var _isOdd = _interopRequireDefault(__webpack_require__(51));

exports.isOdd = _isOdd["default"];

var _isEven = _interopRequireDefault(__webpack_require__(100));

exports.isEven = _isEven["default"];

var _isPair = _interopRequireDefault(__webpack_require__(52));

exports.isPair = _isPair["default"];

var _isNotPair = _interopRequireDefault(__webpack_require__(101));

exports.isNotPair = _isNotPair["default"];

var _isThenable = _interopRequireDefault(__webpack_require__(102));

exports.isThenable = _isThenable["default"];

var _isPromise = _interopRequireDefault(__webpack_require__(103));

exports.isPromise = _isPromise["default"];

var _isTrue = _interopRequireDefault(__webpack_require__(53));

exports.isTrue = _isTrue["default"];

var _isFalse = _interopRequireDefault(__webpack_require__(104));

exports.isFalse = _isFalse["default"];

var _isTruthy = _interopRequireDefault(__webpack_require__(29));

exports.isTruthy = _isTruthy["default"];

var _isFalsy = _interopRequireDefault(__webpack_require__(54));

exports.isFalsy = _isFalsy["default"];

var _isRegExp = _interopRequireDefault(__webpack_require__(30));

exports.isRegExp = _isRegExp["default"];

var _isNotRegExp = _interopRequireDefault(__webpack_require__(105));

exports.isNotRegExp = _isNotRegExp["default"];

var _isSet = _interopRequireDefault(__webpack_require__(55));

exports.isSet = _isSet["default"];

var _isNotSet = _interopRequireDefault(__webpack_require__(106));

exports.isNotSet = _isNotSet["default"];

var _isSparseArray = _interopRequireDefault(__webpack_require__(107));

exports.isSparseArray = _isSparseArray["default"];

var _isSymbol = _interopRequireDefault(__webpack_require__(108));

exports.isSymbol = _isSymbol["default"];

var _isSafeInteger = _interopRequireDefault(__webpack_require__(109));

exports.isSafeInteger = _isSafeInteger["default"];

var _isIndexed = _interopRequireDefault(__webpack_require__(112));

exports.isIndexed = _isIndexed["default"];

var _isNaturalNumber = _interopRequireDefault(__webpack_require__(113));

exports.isNaturalNumber = _isNaturalNumber["default"];

var _stubUndefined = _interopRequireDefault(__webpack_require__(9));

exports.stubUndefined = _stubUndefined["default"];

var _stubNull = _interopRequireDefault(__webpack_require__(114));

exports.stubNull = _stubNull["default"];

var _stubObj = _interopRequireDefault(__webpack_require__(115));

exports.stubObj = _stubObj["default"];
exports.stubObject = _stubObj["default"];

var _stubString = _interopRequireDefault(__webpack_require__(116));

exports.stubString = _stubString["default"];

var _stubArray = _interopRequireDefault(__webpack_require__(117));

exports.stubArray = _stubArray["default"];

var _noop = _interopRequireDefault(__webpack_require__(118));

exports.noop = _noop["default"];

var _liftFN = _interopRequireDefault(__webpack_require__(56));

exports.liftFN = _liftFN["default"];

var _liftF = _interopRequireDefault(__webpack_require__(120));

exports.liftF = _liftF["default"];

var _cata = _interopRequireDefault(__webpack_require__(121));

exports.cata = _cata["default"];

var _weave = _interopRequireDefault(__webpack_require__(122));

exports.weave = _weave["default"];

var _weaveLazy = _interopRequireDefault(__webpack_require__(123));

exports.weaveLazy = _weaveLazy["default"];

var _curryRightN = _interopRequireDefault(__webpack_require__(57));

exports.curryRightN = _curryRightN["default"];

var _curryRight = _interopRequireDefault(__webpack_require__(124));

exports.curryRight = _curryRight["default"];

var _allP = _interopRequireDefault(__webpack_require__(7));

exports.allP = _allP["default"];

var _noneP = _interopRequireDefault(__webpack_require__(125));

exports.noneP = _noneP["default"];

var _resolveP = _interopRequireDefault(__webpack_require__(5));

exports.resolveP = _resolveP["default"];

var _rejectP = _interopRequireDefault(__webpack_require__(14));

exports.rejectP = _rejectP["default"];

var _delayP = _interopRequireDefault(__webpack_require__(126));

exports.delayP = _delayP["default"];

var _thenP = _interopRequireDefault(__webpack_require__(127));

exports.thenP = _thenP["default"];
exports.then = _thenP["default"];

var _thenCatchP = _interopRequireDefault(__webpack_require__(128));

exports.thenCatchP = _thenCatchP["default"];

var _allSettledP = _interopRequireDefault(__webpack_require__(129));

exports.allSettledP = _allSettledP["default"];

var _Y = _interopRequireDefault(__webpack_require__(131));

exports.Y = _Y["default"];

var _seq = _interopRequireDefault(__webpack_require__(132));

exports.seq = _seq["default"];
exports.sequencing = _seq["default"];

var _dispatch = _interopRequireDefault(__webpack_require__(133));

exports.dispatch = _dispatch["default"];

var _async = _interopRequireDefault(__webpack_require__(134));

exports.async = _async["default"];

var _anyP = _interopRequireDefault(__webpack_require__(135));

exports.anyP = _anyP["default"];
exports.firstP = _anyP["default"];

var _lastP = _interopRequireDefault(__webpack_require__(137));

exports.lastP = _lastP["default"];

var _fnull = _interopRequireDefault(__webpack_require__(138));

exports.fnull = _fnull["default"];

var _mapIndexed = _interopRequireDefault(__webpack_require__(60));

exports.mapIndexed = _mapIndexed["default"];

var _reduceIndexed = _interopRequireDefault(__webpack_require__(139));

exports.reduceIndexed = _reduceIndexed["default"];

var _pickIndexes = _interopRequireDefault(__webpack_require__(140));

exports.pickIndexes = _pickIndexes["default"];

var _list = _interopRequireDefault(__webpack_require__(61));

exports.list = _list["default"];

var _ensureArray = _interopRequireDefault(__webpack_require__(141));

exports.ensureArray = _ensureArray["default"];

var _concatAll = _interopRequireDefault(__webpack_require__(142));

exports.concatAll = _concatAll["default"];

var _concatRight = _interopRequireDefault(__webpack_require__(143));

exports.concatRight = _concatRight["default"];

var _reduceP = _interopRequireDefault(__webpack_require__(144));

exports.reduceP = _reduceP["default"];

var _reduceRightP = _interopRequireDefault(__webpack_require__(145));

exports.reduceRightP = _reduceRightP["default"];

var _sliceFrom = _interopRequireDefault(__webpack_require__(146));

exports.sliceFrom = _sliceFrom["default"];

var _sliceTo = _interopRequireDefault(__webpack_require__(147));

exports.sliceTo = _sliceTo["default"];

var _omitIndexes = _interopRequireDefault(__webpack_require__(148));

exports.omitIndexes = _omitIndexes["default"];

var _compact = _interopRequireDefault(__webpack_require__(149));

exports.compact = _compact["default"];

var _appendFlipped = _interopRequireDefault(__webpack_require__(150));

exports.appendFlipped = _appendFlipped["default"];

var _contained = _interopRequireDefault(__webpack_require__(32));

exports.contained = _contained["default"];
exports.included = _contained["default"];

var _move = _interopRequireDefault(__webpack_require__(151));

exports.move = _move["default"];

var _lengthGt = _interopRequireDefault(__webpack_require__(152));

exports.lengthGt = _lengthGt["default"];

var _lengthLt = _interopRequireDefault(__webpack_require__(153));

exports.lengthLt = _lengthLt["default"];

var _lengthGte = _interopRequireDefault(__webpack_require__(58));

exports.lengthGte = _lengthGte["default"];

var _lengthLte = _interopRequireDefault(__webpack_require__(33));

exports.lengthLte = _lengthLte["default"];

var _lengthEq = _interopRequireDefault(__webpack_require__(15));

exports.lengthEq = _lengthEq["default"];

var _lengthNotEq = _interopRequireDefault(__webpack_require__(154));

exports.lengthNotEq = _lengthNotEq["default"];

var _allEqual = _interopRequireDefault(__webpack_require__(155));

exports.allEqual = _allEqual["default"];

var _repeatStr = _interopRequireDefault(__webpack_require__(156));

exports.repeatStr = _repeatStr["default"];

var _allIdentical = _interopRequireDefault(__webpack_require__(157));

exports.allIdentical = _allIdentical["default"];

var _allIdenticalTo = _interopRequireDefault(__webpack_require__(158));

exports.allIdenticalTo = _allIdenticalTo["default"];

var _allEqualTo = _interopRequireDefault(__webpack_require__(159));

exports.allEqualTo = _allEqualTo["default"];

var _flattenDepth = _interopRequireDefault(__webpack_require__(160));

exports.flattenDepth = _flattenDepth["default"];

var _toArray = _interopRequireDefault(__webpack_require__(162));

exports.toArray = _toArray["default"];

var _allUnique = _interopRequireDefault(__webpack_require__(62));

exports.allUnique = _allUnique["default"];

var _notAllUnique = _interopRequireDefault(__webpack_require__(164));

exports.notAllUnique = _notAllUnique["default"];

var _sortByProps = _interopRequireDefault(__webpack_require__(165));

exports.sortByProps = _sortByProps["default"];

var _skipTake = _interopRequireDefault(__webpack_require__(166));

exports.skipTake = _skipTake["default"];

var _invokeArgs = _interopRequireDefault(__webpack_require__(167));

exports.invokeArgs = _invokeArgs["default"];

var _paths = _interopRequireDefault(__webpack_require__(63));

exports.paths = _paths["default"];

var _renameKeys = _interopRequireDefault(__webpack_require__(168));

exports.renameKeys = _renameKeys["default"];

var _renameKeysWith = _interopRequireDefault(__webpack_require__(35));

exports.renameKeysWith = _renameKeysWith["default"];

var _renameKeyWith = _interopRequireDefault(__webpack_require__(169));

exports.renameKeyWith = _renameKeyWith["default"];

var _mergeRight = _interopRequireDefault(__webpack_require__(64));

exports.mergeRight = _mergeRight["default"];
exports.mergeLeft = _mergeRight["default"];
exports.resetToDefault = _mergeRight["default"];

var _mergeProps = _interopRequireDefault(__webpack_require__(170));

exports.mergeProps = _mergeProps["default"];

var _mergePaths = _interopRequireDefault(__webpack_require__(171));

exports.mergePaths = _mergePaths["default"];

var _mergeProp = _interopRequireDefault(__webpack_require__(172));

exports.mergeProp = _mergeProp["default"];

var _mergePath = _interopRequireDefault(__webpack_require__(65));

exports.mergePath = _mergePath["default"];

var _omitBy = _interopRequireDefault(__webpack_require__(173));

exports.omitBy = _omitBy["default"];

var _pathOrLazy = _interopRequireDefault(__webpack_require__(174));

exports.pathOrLazy = _pathOrLazy["default"];

var _viewOr = _interopRequireDefault(__webpack_require__(175));

exports.viewOr = _viewOr["default"];

var _hasPath = _interopRequireDefault(__webpack_require__(176));

exports.hasPath = _hasPath["default"];

var _spreadProp = _interopRequireDefault(__webpack_require__(177));

exports.spreadProp = _spreadProp["default"];

var _spreadPath = _interopRequireDefault(__webpack_require__(66));

exports.spreadPath = _spreadPath["default"];

var _flattenProp = _interopRequireDefault(__webpack_require__(178));

exports.flattenProp = _flattenProp["default"];

var _flattenPath = _interopRequireDefault(__webpack_require__(67));

exports.flattenPath = _flattenPath["default"];

var _unzipObjWith = _interopRequireDefault(__webpack_require__(179));

exports.unzipObjWith = _unzipObjWith["default"];

var _zipObjWith = _interopRequireDefault(__webpack_require__(180));

exports.zipObjWith = _zipObjWith["default"];

var _lensEq = _interopRequireDefault(__webpack_require__(68));

exports.lensEq = _lensEq["default"];

var _lensNotEq = _interopRequireDefault(__webpack_require__(181));

exports.lensNotEq = _lensNotEq["default"];

var _lensSatisfies = _interopRequireDefault(__webpack_require__(69));

exports.lensSatisfies = _lensSatisfies["default"];

var _lensNotSatisfy = _interopRequireDefault(__webpack_require__(182));

exports.lensNotSatisfy = _lensNotSatisfy["default"];

var _lensTraverse = _interopRequireDefault(__webpack_require__(183));

exports.lensTraverse = _lensTraverse["default"];

var _lensIso = _interopRequireDefault(__webpack_require__(186));

exports.lensIso = _lensIso["default"];

var _propNotEq = _interopRequireDefault(__webpack_require__(187));

exports.propNotEq = _propNotEq["default"];

var _pathNotEq = _interopRequireDefault(__webpack_require__(188));

exports.pathNotEq = _pathNotEq["default"];

var _inRange = _interopRequireDefault(__webpack_require__(189));

exports.inRange = _inRange["default"];

var _notEqual = _interopRequireDefault(__webpack_require__(190));

exports.notEqual = _notEqual["default"];

var _isNotEmpty = _interopRequireDefault(__webpack_require__(22));

exports.isNotEmpty = _isNotEmpty["default"];

var _defaultWhen = _interopRequireDefault(__webpack_require__(59));

exports.defaultWhen = _defaultWhen["default"];

var _notBoth = _interopRequireDefault(__webpack_require__(191));

exports.notBoth = _notBoth["default"];

var _nand = _interopRequireDefault(__webpack_require__(192));

exports.nand = _nand["default"];

var _neither = _interopRequireDefault(__webpack_require__(193));

exports.neither = _neither["default"];

var _nor = _interopRequireDefault(__webpack_require__(194));

exports.nor = _nor["default"];

var _notAllPass = _interopRequireDefault(__webpack_require__(195));

exports.notAllPass = _notAllPass["default"];

var _nonePass = _interopRequireDefault(__webpack_require__(196));

exports.nonePass = _nonePass["default"];

var _argsPass = _interopRequireDefault(__webpack_require__(197));

exports.argsPass = _argsPass["default"];

var _dropArgs = _interopRequireDefault(__webpack_require__(198));

exports.dropArgs = _dropArgs["default"];

var _round = _interopRequireDefault(__webpack_require__(199));

exports.round = _round["default"];

var _ceil = _interopRequireDefault(__webpack_require__(200));

exports.ceil = _ceil["default"];

var _divideNum = _interopRequireDefault(__webpack_require__(201));

exports.divideNum = _divideNum["default"];

var _floor = _interopRequireDefault(__webpack_require__(202));

exports.floor = _floor["default"];

var _trunc = _interopRequireDefault(__webpack_require__(203));

exports.trunc = _trunc["default"];

var _sign = _interopRequireDefault(__webpack_require__(205));

exports.sign = _sign["default"];

var _subtractNum = _interopRequireDefault(__webpack_require__(207));

exports.subtractNum = _subtractNum["default"];

var _toInteger = _interopRequireDefault(__webpack_require__(208));

exports.toInteger32 = _toInteger["default"];
exports.toInt32 = _toInteger["default"];

var _toUinteger = _interopRequireDefault(__webpack_require__(209));

exports.toUinteger32 = _toUinteger["default"];
exports.toUint32 = _toUinteger["default"];

var _replaceAll = _interopRequireDefault(__webpack_require__(210));

exports.replaceAll = _replaceAll["default"];

var _escapeRegExp = _interopRequireDefault(__webpack_require__(71));

exports.escapeRegExp = _escapeRegExp["default"];

var _trimStart = _interopRequireDefault(__webpack_require__(212));

exports.trimStart = _trimStart["default"];
exports.trimLeft = _trimStart["default"];

var _trimEnd = _interopRequireDefault(__webpack_require__(214));

exports.trimEnd = _trimEnd["default"];
exports.trimRight = _trimEnd["default"];

var _trimCharsEnd = _interopRequireDefault(__webpack_require__(216));

exports.trimCharsEnd = _trimCharsEnd["default"];

var _trimCharsStart = _interopRequireDefault(__webpack_require__(217));

exports.trimCharsStart = _trimCharsStart["default"];

var _padCharsStart = _interopRequireDefault(__webpack_require__(72));

exports.padCharsStart = _padCharsStart["default"];

var _padCharsEnd = _interopRequireDefault(__webpack_require__(73));

exports.padCharsEnd = _padCharsEnd["default"];

var _padEnd = _interopRequireDefault(__webpack_require__(220));

exports.padEnd = _padEnd["default"];

var _padStart = _interopRequireDefault(__webpack_require__(221));

exports.padStart = _padStart["default"];

var _Identity = _interopRequireDefault(__webpack_require__(70));

exports.Identity = _Identity["default"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isBoolean = _interopRequireDefault(__webpack_require__(39));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is complement of `Boolean`.
 *
 * @func isNotBoolean
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.3.0|v0.3.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isBoolean|isBoolean}
 * @example
 *
 * RA.isNotBoolean(false); //=> false
 * RA.isNotBoolean(true); //=> false
 * RA.isNotBoolean(null); //=> true
 */
var isNotBoolean = (0, _ramda.complement)(_isBoolean["default"]);
var _default = isNotBoolean;
exports["default"] = _default;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is an empty `String`.
 *
 * @func isEmptyString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNotEmptyString|isNotEmptyString}
 * @example
 *
 * RA.isEmptyString(''); // => true
 * RA.isEmptyString('42'); // => false
 * RA.isEmptyString(new String('42')); // => false
 * RA.isEmptyString(new String('')); // => false
 * RA.isEmptyString([42]); // => false
 * RA.isEmptyString({}); // => false
 * RA.isEmptyString(null); // => false
 * RA.isEmptyString(undefined); // => false
 * RA.isEmptyString(42); // => false
 */
var isEmptyString = (0, _ramda.equals)('');
var _default = isEmptyString;
exports["default"] = _default;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isString = _interopRequireDefault(__webpack_require__(6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is complement of `String`.
 *
 * @func isNotString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.4.0|v0.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isString|isString}
 * @example
 *
 * RA.isNotString('abc'); //=> false
 * RA.isNotString(1); //=> true
 */
var isNotString = (0, _ramda.complement)(_isString["default"]);
var _default = isNotString;
exports["default"] = _default;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isString = _interopRequireDefault(__webpack_require__(6));

var _isNotObj = _interopRequireDefault(__webpack_require__(41));

var _isNotEmpty = _interopRequireDefault(__webpack_require__(22));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is not an empty `String`.
 *
 * @func isNonEmptyString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isEmptyString|isEmptyString}
 * @example
 *
 * RA.isNonEmptyString('42'); // => true
 * RA.isNonEmptyString(''); // => false
 * RA.isNonEmptyString(new String('42')); // => false
 * RA.isNonEmptyString(new String('')); // => false
 * RA.isNonEmptyString([42]); // => false
 * RA.isNonEmptyString({}); // => false
 * RA.isNonEmptyString(null); // => false
 * RA.isNonEmptyString(undefined); // => false
 * RA.isNonEmptyString(42); // => false
 */
var isNonEmptyString = (0, _ramda.allPass)([_isString["default"], _isNotObj["default"], _isNotEmpty["default"]]);
var _default = isNonEmptyString;
exports["default"] = _default;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isArrayLike = _interopRequireDefault(__webpack_require__(23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Tests whether or not an object is similar to an array.
 *
 * @func isNotArrayLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isArrayLike|isArrayLike}
 * @example
 *
 * RA.isNotArrayLike([]); //=> false
 * RA.isNotArrayLike(true); //=> true
 * RA.isNotArrayLike({}); //=> true
 * RA.isNotArrayLike({length: 10}); //=> true
 * RA.isNotArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> false
 */
var isNotArrayLike = (0, _ramda.complement)(_isArrayLike["default"]);
var _default = isNotArrayLike;
exports["default"] = _default;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isGeneratorFunction = _interopRequireDefault(__webpack_require__(19));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if input value is complement of `Generator Function`
 *
 * @func isNotGeneratorFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotGeneratorFunction(function* test() { }); //=> false
 * RA.isNotGeneratorFunction(null); //=> true
 * RA.isNotGeneratorFunction(function test() { }); //=> true
 * RA.isNotGeneratorFunction(() => {}); //=> true
 */

/* eslint-enable max-len */
var isNotGeneratorFunction = (0, _ramda.complement)(_isGeneratorFunction["default"]);
var _default = isNotGeneratorFunction;
exports["default"] = _default;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isAsyncFunction = _interopRequireDefault(__webpack_require__(20));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if input value is complement of `Async Function`
 *
 * @func isNotAsyncFunction
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFunction|isFunction}, {@link RA.isAsyncFunction|isAsyncFunction}, {@link RA.isGeneratorFunction|isGeneratorFunction}
 * @example
 *
 * RA.isNotAsyncFunction(async function test() { }); //=> false
 * RA.isNotAsyncFunction(null); //=> true
 * RA.isNotAsyncFunction(function test() { }); //=> true
 * RA.isNotAsyncFunction(() => {}); //=> true
 */

/* eslint-enable max-len */
var isNotAsyncFunction = (0, _ramda.complement)(_isAsyncFunction["default"]);
var _default = isNotAsyncFunction;
exports["default"] = _default;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isObjLike = _interopRequireDefault(__webpack_require__(25));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Checks if value is not object-like. A value is object-like if it's not null and has a typeof result of "object".
 *
 * @func isNotObjLike
 * @aliases isNotObjectLike
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}, {@link RA.isPlainObj|isPlainObj}
 * @example
 *
 * RA.isNotObjLike({}); //=> false
 * RA.isNotObjLike([]); //=> false
 * RA.isNotObjLike(() => {}); //=> true
 * RA.isNotObjLike(null); //=> true
 * RA.isNotObjLike(undefined); //=> true
 */

/* eslint-enable max-len */
var isNotObjLike = (0, _ramda.complement)(_isObjLike["default"]);
var _default = isNotObjLike;
exports["default"] = _default;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isPlainObj = _interopRequireDefault(__webpack_require__(43));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable max-len */

/**
 * Check to see if an object is a not plain object (created using `{}`, `new Object()` or `Object.create(null)`).
 *
 * @func isNotPlainObj
 * @aliases isNotPlainObject
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.5.0|v0.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPlainObj|isPlainObj}, {@link RA.isObjLike|isObjLike}, {@link RA.isObj|isObj}
 * @example
 *
 * class Bar {
 *   constructor() {
 *     this.prop = 'value';
 *   }
 * }
 *
 * RA.isNotPlainObj(new Bar()); //=> true
 * RA.isNotPlainObj({ prop: 'value' }); //=> false
 * RA.isNotPlainObj(['a', 'b', 'c']); //=> true
 * RA.isNotPlainObj(Object.create(null); //=> false
 * RA.isNotPlainObj(new Object()); //=> false
 */

/* eslint-enable max-len */
var isNotPlainObj = (0, _ramda.complement)(_isPlainObj["default"]);
var _default = isNotPlainObj;
exports["default"] = _default;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isDate = _interopRequireDefault(__webpack_require__(26));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is complement of `Date` object.
 *
 * @func isNotDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isDate|isDate}
 * @example
 *
 * RA.isNotDate(new Date()); //=> false
 * RA.isNotDate('1997-07-16T19:20+01:00'); //=> true
 */
var isNotDate = (0, _ramda.complement)(_isDate["default"]);
var _default = isNotDate;
exports["default"] = _default;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNumber = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-restricted-globals
var isNaNPonyfill = (0, _ramda.both)(_isNumber["default"], isNaN);
var _default = isNaNPonyfill;
exports["default"] = _default;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isValidDate = _interopRequireDefault(__webpack_require__(44));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is complement of valid `Date` object.
 *
 * @func isNotValidDate
 * @aliases isInvalidDate
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.8.0|v1.8.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isValidDate|isValidDate}, {@link RA.isDate|isDate}, {@link RA.isNotDate|isNotDate}
 * @example
 *
 * RA.isNotValidDate(new Date()); //=> false
 * RA.isNotValidDate(new Date('a')); //=> true
 */
var isNotValidDate = (0, _ramda.complement)(_isValidDate["default"]);
var _default = isNotValidDate;
exports["default"] = _default;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNumber = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is a complement of `Number` primitive or object.
 *
 * @func isNotNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.6.0|v0.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNumber|isNumber}
 * @example
 *
 * RA.isNotNumber(5); // => false
 * RA.isNotNumber(Number.MAX_VALUE); // => false
 * RA.isNotNumber(-Infinity); // => false
 * RA.isNotNumber('5'); // => true
 */
var isNotNumber = (0, _ramda.complement)(_isNumber["default"]);
var _default = isNotNumber;
exports["default"] = _default;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNumber = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is a positive `Number` primitive or object. Zero is not considered positive.
 *
 * @func isPositive
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.15.0|v1.15.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNegative|isNegative}
 * @example
 *
 * RA.isPositive(1); // => true
 * RA.isPositive(Number.MAX_VALUE); // => true
 * RA.isPositive(-Infinity); // => false
 * RA.isPositive(NaN); // => false
 * RA.isPositive('5'); // => false
 */
var isPositive = (0, _ramda.both)(_isNumber["default"], (0, _ramda.lt)(0));
var _default = isPositive;
exports["default"] = _default;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if value is a positive zero (+0).
 *
 * @func isPositiveZero
 * @memberof RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNegativeZero|isNegativeZero}
 * @example
 *
 * RA.isPositiveZero(+0); //=> true
 * RA.isPositiveZero(0); //=> true
 * RA.isPositiveZero(-0); //=> false
 * RA.isPositiveZero(null); //=> false
 */
var isPositiveZero = (0, _ramda.identical)(+0);
var _default = isPositiveZero;
exports["default"] = _default;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if value is a negative zero (-0).
 *
 * @func isNegativeZero
 * @memberof RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see @see {@link RA.isPositiveZero|isPositiveZero}
 * @example
 *
 * RA.isNegativeZero(-0); //=> true
 * RA.isNegativeZero(+0); //=> false
 * RA.isNegativeZero(0); //=> false
 * RA.isNegativeZero(null); //=> false
 */
var isNegativeZero = (0, _ramda.identical)(-0);
var _default = isNegativeZero;
exports["default"] = _default;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNilOrEmpty = _interopRequireDefault(__webpack_require__(40));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if the given value is its type's empty value, `null` or `undefined`.
 *
 * @func isNotNilOrEmpty
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.18.0|v2.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNilOrEmpty|isNilOrEmpty}
 * @example
 *
 * RA.isNotNilOrEmpty([1, 2, 3]); //=> true
 * RA.isNotNilOrEmpty([]); //=> false
 * RA.isNotNilOrEmpty(''); //=> false
 * RA.isNotNilOrEmpty(null); //=> false
 * RA.isNotNilOrEmpty(undefined): //=> false
 * RA.isNotNilOrEmpty({}); //=> false
 * RA.isNotNilOrEmpty({length: 0}); //=> true
 */
var isNotNilOrEmpty = (0, _ramda.complement)(_isNilOrEmpty["default"]);
var _default = isNotNilOrEmpty;
exports["default"] = _default;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNumber = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is a non-positive `Number` primitive or object. This includes all negative
 * numbers and zero.
 *
 * @func isNonPositive
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isNegative|isNegative}, {@link RA.isNonNegative|isNonNegative}
 * @example
 *
 * RA.isNonPositive(0); // => true
 * RA.isNonPositive(-1); // => true
 * RA.isNonPositive(-Infinity); // => true
 * RA.isNonPositive(Number.MIN_VALUE); // => true
 *
 * RA.isNonPositive(Infinity); // => false
 * RA.isNonPositive(Number.MAX_VALUE); // => false
 * RA.isNonPositive(NaN); // => false
 */
var isNonPositive = (0, _ramda.curryN)(1, (0, _ramda.both)(_isNumber["default"], (0, _ramda.flip)(_ramda.lte)(0)));
var _default = isNonPositive;
exports["default"] = _default;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isMap = _interopRequireDefault(__webpack_require__(48));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is complement of `Map` object.
 *
 * @func isNotMap
 * @memberOf RA
 * @category Type
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isMap|isMap}
 * @example
 *
 * RA.isNotMap(new Map()); //=> false
 * RA.isNotMap(new Map([[1, 2], [2, 1]])); //=> false
 * RA.isNotMap(new Set()); //=> true
 * RA.isNotMap({}); //=> true
 * RA.isNotMap(12); //=> true
 */
var isNotMap = (0, _ramda.complement)(_isMap["default"]);
var _default = isNotMap;
exports["default"] = _default;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNumber = _interopRequireDefault(__webpack_require__(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line no-restricted-globals
var isFinitePonyfill = (0, _ramda.both)(_isNumber["default"], isFinite);
var _default = isFinitePonyfill;
exports["default"] = _default;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFinite = _interopRequireDefault(__webpack_require__(10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isIntegerPonyfill = (0, _ramda.both)(_isFinite["default"], (0, _ramda.converge)(_ramda.equals, [Math.floor, _ramda.identity]));
var _default = isIntegerPonyfill;
exports["default"] = _default;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isInteger = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks whether the passed value is complement of an `integer`.
 *
 *
 * @func isNotInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/0.7.0|v0.7.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isInteger|isInteger}
 * @example
 *
 * RA.isNotInteger(0); //=> false
 * RA.isNotInteger(1); //=> false
 * RA.isNotInteger(-100000); //=> false
 *
 * RA.isNotInteger(0.1);       //=> true
 * RA.isNotInteger(Math.PI);   //=> true
 *
 * RA.isNotInteger(NaN);       //=> true
 * RA.isNotInteger(Infinity);  //=> true
 * RA.isNotInteger(-Infinity); //=> true
 * RA.isNotInteger('10');      //=> true
 * RA.isNotInteger(true);      //=> true
 * RA.isNotInteger(false);     //=> true
 * RA.isNotInteger([1]);       //=> true
 */
var isNotInteger = (0, _ramda.complement)(_isInteger["default"]);
var _default = isNotInteger;
exports["default"] = _default;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if value is a BigInt.
 *
 * @func isBigInt
 * @memberOf RA
 * @category Type
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isBigInt(5); // => false
 * RA.isBigInt(Number.MAX_VALUE); // => false
 * RA.isBigInt(-Infinity); // => false
 * RA.isBigInt(10); // => false
 * RA.isBigInt(10n); // => true
 * RA.isBigInt(BitInt(9007199254740991)); // => true
 */
var isBigInt = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.type, (0, _ramda.identical)('BigInt')));
var _default = isBigInt;
exports["default"] = _default;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFloat = _interopRequireDefault(__webpack_require__(28));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks whether the passed value is complement of a `float`.
 *
 * @func isNotFloat
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isFloat|isFloat}
 * @example
 *
 * RA.isNotFloat(0); //=> true
 * RA.isNotFloat(1); //=> true
 * RA.isNotFloat(-100000); //=> true
 *
 * RA.isNotFloat(0.1);       //=> false
 * RA.isNotFloat(Math.PI);   //=> false
 *
 * RA.isNotFloat(NaN);       //=> true
 * RA.isNotFloat(Infinity);  //=> true
 * RA.isNotFloat(-Infinity); //=> true
 * RA.isNotFloat('10');      //=> true
 * RA.isNotFloat(true);      //=> true
 * RA.isNotFloat(false);     //=> true
 * RA.isNotFloat([1]);       //=> true
 */
var isNotFloat = (0, _ramda.curryN)(1, (0, _ramda.complement)(_isFloat["default"]));
var _default = isNotFloat;
exports["default"] = _default;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isValidNumber = _interopRequireDefault(__webpack_require__(50));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is not a valid `Number`. A valid `Number` is a number that is not `NaN`,
 * `Infinity` or `-Infinity`.
 *
 * @func isNotValidNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.2.0|v2.2.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isValidNumber|isValidNumber}
 * @example
 *
 * RA.isNotValidNumber(1); //=> false
 * RA.isNotValidNumber(''); //=> true
 * RA.isNotValidNumber(NaN); //=> true
 * RA.isNotValidNumber(Infinity); //=> true
 * RA.isNotValidNumber(-Infinity); //=> true
 */
var isNotValidNumber = (0, _ramda.complement)(_isValidNumber["default"]);
var _default = isNotValidNumber;
exports["default"] = _default;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isInteger = _interopRequireDefault(__webpack_require__(3));

var _isOdd = _interopRequireDefault(__webpack_require__(51));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is even integer number.
 * An even number is an integer which is "evenly divisible" by two.
 * Zero is an even number because zero divided by two equals zero,
 * which despite not being a natural number, is an integer.
 * Even numbers are either positive or negative.
 *
 * @func isEven
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isOdd|isOdd}
 * @example
 *
 * RA.isEven(0); // => true
 * RA.isEven(1); // => false
 * RA.isEven(-Infinity); // => false
 * RA.isEven(4); // => true
 * RA.isEven(3); // => false
 */
var isEven = (0, _ramda.curryN)(1, (0, _ramda.both)(_isInteger["default"], (0, _ramda.complement)(_isOdd["default"])));
var _default = isEven;
exports["default"] = _default;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isPair = _interopRequireDefault(__webpack_require__(52));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is complement of a pair.
 *
 * @func isNotPair
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#pair|R.pair}, {@link RA.isPair|isPair}
 * @example
 *
 * RA.isNotPair([]); // => true
 * RA.isNotPair([0]); // => true
 * RA.isNotPair([0, 1]); // => false
 * RA.isNotPair([0, 1, 2]); // => true
 * RA.isNotPair({0: 0, 1: 1}); // => true
 * RA.isNotPair({foo: 0, bar: 0}); // => true
 */
var isNotPair = (0, _ramda.complement)(_isPair["default"]);
var _default = isNotPair;
exports["default"] = _default;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is a `thenable`.
 * `thenable` is an object or function that defines a `then` method.
 *
 * @func isThenable
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isPromise|isPromise}
 * @example
 *
 * RA.isThenable(null); // => false
 * RA.isThenable(undefined); // => false
 * RA.isThenable([]); // => false
 * RA.isThenable(Promise.resolve()); // => true
 * RA.isThenable(Promise.reject()); // => true
 * RA.isThenable({ then: () => 1 }); // => true
 */
var isThenable = (0, _ramda.pathSatisfies)(_isFunction["default"], ['then']);
var _default = isThenable;
exports["default"] = _default;

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isObj = _interopRequireDefault(__webpack_require__(13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is a native `Promise`.
 * The Promise object represents the eventual completion (or failure)
 * of an asynchronous operation, and its resulting value.
 *
 * @func isPromise
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://promisesaplus.com/|Promises/A+}, {@link RA.isThenable|isThenable}
 * @example
 *
 * RA.isPromise(null); // => false
 * RA.isPromise(undefined); // => false
 * RA.isPromise([]); // => false
 * RA.isPromise(Promise.resolve()); // => true
 * RA.isPromise(Promise.reject()); // => true
 * RA.isPromise({ then: () => 1 }); // => false
 */
var isPromise = (0, _ramda.curryN)(1, (0, _ramda.both)(_isObj["default"], (0, _ramda.pipe)(_ramda.toString, (0, _ramda.equals)('[object Promise]'))));
var _default = isPromise;
exports["default"] = _default;

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Checks if input value is the Boolean primitive `false`. Will return false for all values created
 * using the `Boolean` function as a constructor.
 *
 * @func isFalse
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isTrue|isTrue}, {@link RA.isTruthy|isTruthy}, {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.isFalse(false); // => true
 * RA.isFalse(Boolean(false)); // => true
 * RA.isFalse(true); // => false
 * RA.isFalse(0); // => false
 * RA.isFalse(''); // => false
 * RA.isFalse(null); // => false
 * RA.isFalse(undefined); // => false
 * RA.isFalse(NaN); // => false
 * RA.isFalse([]); // => false
 * RA.isFalse(new Boolean(false)); // => false
 */
var isFalse = (0, _ramda.identical)(false);
var _default = isFalse;
exports["default"] = _default;

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isRegExp = _interopRequireDefault(__webpack_require__(30));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is complement of `RegExp` object.
 *
 * @func isNotRegExp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isRegExp|isRegExp}
 * @example
 *
 * RA.isNotRegExp(1); //=> true
 * RA.isNotRegExp(/(?:)/); //=> false
 * RA.isNotRegExp(new RegExp()); //=> false
 */
var isNotRegExp = (0, _ramda.complement)(_isRegExp["default"]);
var _default = isNotRegExp;
exports["default"] = _default;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isSet = _interopRequireDefault(__webpack_require__(55));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is complement of `Set` object.
 *
 * @func isNotSet
 * @memberOf RA
 * @category Type
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link RA.isSet|isSet}
 * @example
 *
 * RA.isNotSet(new Map()); //=> true
 * RA.isNotSet(new Set()); //=> false
 * RA.isNotSet(new Set([1,2]); //=> false
 * RA.isNotSet(new Object()); //=> true
 */
var isNotSet = (0, _ramda.complement)(_isSet["default"]);
var _default = isNotSet;
exports["default"] = _default;

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isArray = _interopRequireDefault(__webpack_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if input value is a sparse Array.
 * An array with at least one "empty slot" in it is often called a "sparse array."
 * Empty slot doesn't mean that the slot contains `null` or `undefined` values,
 * but rather that the slots don't exist.
 *
 * @func isSparseArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.20.0|v2.20.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} list The list to test
 * @return {boolean}
 * @see {@link https://github.com/getify/You-Dont-Know-JS/blob/f0d591b6502c080b92e18fc470432af8144db610/types%20%26%20grammar/ch3.md#array|Sparse Arrays}, {@link RA.isArray|isArray}
 * @example
 *
 * RA.isSparseArray(new Array(3)); // => true
 * RA.isSparseArray([1,,3]); // => true
 *
 * const list = [1, 2, 3];
 * delete list[1];
 * RA.isSparseArray(list); // => true
 *
 * RA.isSparseArray([1, 2, 3]); // => false
 */
var isSparseArray = (0, _ramda.both)(_isArray["default"], (0, _ramda.converge)((0, _ramda.complement)(_ramda.identical), [(0, _ramda.pipe)(_ramda.values, _ramda.length), _ramda.length]));
var _default = isSparseArray;
exports["default"] = _default;

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Checks if input value is a Symbol.
 *
 * @func isSymbol
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol|MDN Symbol}
 * @example
 *
 * RA.isSymbol(Symbol('1')); //=> true
 * RA.isSymbol(Symbol(1)); //=> true
 * RA.isSymbol('string'); //=> false
 * RA.isSymbol(undefined); //=> false
 * RA.isSymbol(null); //=> false
 */
var isSymbol = (0, _ramda.curryN)(1, function (val) {
  return _typeof(val) === 'symbol' || _typeof(val) === 'object' && (0, _ramda.type)(val) === 'Symbol';
});
var _default = isSymbol;
exports["default"] = _default;

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.isSafeIntegerPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Number = _interopRequireDefault(__webpack_require__(110));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSafeIntegerPonyfill = (0, _ramda.curryN)(1, _Number["default"]);
/**
 * Checks whether the passed value is a safe `integer`.
 *
 * @func isSafeInteger
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isSafeInteger(3); //=> true
 * RA.isSafeInteger(Math.pow(2, 53)) //=> false
 * RA.isSafeInteger(Math.pow(2, 53) - 1); //=> true
 * RA.isSafeInteger(NaN); //=> false
 * RA.isSafeInteger(Infinity); //=> false
 * RA.isSafeInteger('3') //=> false
 * RA.isSafeInteger(3.1); //=> false
 * RA.isSafeInteger(3.0); //=> true
 * RA.isSafeInteger('string'); //=> false
 * RA.isSafeInteger(null); //=> false
 * RA.isSafeInteger(undefined); //=> false
 * RA.isSafeInteger({}); //=> false
 * RA.isSafeInteger(() => { }); //=> false
 * RA.isSafeInteger(true); //=> false
 */

exports.isSafeIntegerPonyfill = isSafeIntegerPonyfill;
var isSafeInteger = (0, _isFunction["default"])(Number.isSafeInteger) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Number.isSafeInteger, Number)) : isSafeIntegerPonyfill;
var _default = isSafeInteger;
exports["default"] = _default;

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isInteger = _interopRequireDefault(__webpack_require__(3));

var _Number = _interopRequireDefault(__webpack_require__(111));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isSafeIntegerPonyfill = (0, _ramda.both)(_isInteger["default"], function (value) {
  return Math.abs(value) <= _Number["default"];
});
var _default = isSafeIntegerPonyfill;
exports["default"] = _default;

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
var _default = MAX_SAFE_INTEGER;
exports["default"] = _default;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isArray = _interopRequireDefault(__webpack_require__(4));

var _isString = _interopRequireDefault(__webpack_require__(6));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Determine if input value is an indexed data type.
 *
 * @func isIndexed
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.26.0|v2.26.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isIndexed([1]) //=> true
 * RA.isIndexed('test') //=> true
 */
var isIndexed = (0, _ramda.curryN)(1, (0, _ramda.either)(_isString["default"], _isArray["default"]));
var _default = isIndexed;
exports["default"] = _default;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isInteger = _interopRequireDefault(__webpack_require__(3));

var _isNegative = _interopRequireDefault(__webpack_require__(27));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Checks if value is a natural number.
 * Natural numbers correspond to all non-negative integers and 0.
 *
 * @func isNaturalNumber
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.29.0|v2.29.0}
 * @category Type
 * @sig * -> Boolean
 * @param {*} val The value to test
 * @return {boolean}
 * @example
 *
 * RA.isNaturalNumber(5); // => true
 * RA.isNaturalNumber(Number.MAX_VALUE); // => true
 * RA.isNaturalNumber(0); // => true
 * RA.isNaturalNumber(-1); // => false
 * RA.isNaturalNumber(0.9); // => false
 */
var isNaturalNumber = (0, _ramda.curryN)(1, (0, _ramda.both)(_isInteger["default"], (0, _ramda.complement)(_isNegative["default"])));
var _default = isNaturalNumber;
exports["default"] = _default;

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * A function that returns `null`.
 *
 * @func stubNull
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.6.0|v1.6.0}
 * @category Function
 * @sig ... -> null
 * @return {null}
 * @example
 *
 * RA.stubNull(); //=> null
 * RA.stubNull(1, 2, 3); //=> null
 */
var stubNull = (0, _ramda.always)(null);
var _default = stubNull;
exports["default"] = _default;

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

/**
 * This function returns a new empty object.
 *
 * @func stubObj
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> Object
 * @aliases stubObject
 * @return {Object} Returns the new empty object.
 * @example
 *
 * RA.stubObj(); //=> {}
 * RA.stubObj(1, 2, 3); //=> {}
 */
var stubObj = function stubObj() {
  return {};
};

var _default = stubObj;
exports["default"] = _default;

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * A function that returns empty string.
 *
 * @func stubString
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> String
 * @return {string} The empty string
 * @example
 *
 * RA.stubString(); //=> ''
 * RA.stubString(1, 2, 3); //=> ''
 */
var stubString = (0, _ramda.always)('');
var _default = stubString;
exports["default"] = _default;

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

/**
 * A function that returns new empty array on every call.
 *
 * @func stubArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.1.0|v2.1.0}
 * @category Function
 * @sig ... -> Array
 * @return {Array} New empty array
 * @example
 *
 * RA.stubArray(); //=> []
 * RA.stubArray(1, 2, 3); //=> []
 */
var stubArray = function stubArray() {
  return [];
};

var _default = stubArray;
exports["default"] = _default;

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _stubUndefined = _interopRequireDefault(__webpack_require__(9));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * A function that performs no operations.
 *
 * @func noop
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.0.0|v1.0.0}
 * @category Function
 * @sig ... -> undefined
 * @return {undefined}
 * @example
 *
 * RA.noop(); //=> undefined
 * RA.noop(1, 2, 3); //=> undefined
 */
var noop = (0, _ramda.always)((0, _stubUndefined["default"])());
var _default = noop;
exports["default"] = _default;

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _mapping = _interopRequireDefault(__webpack_require__(31));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var isFunctor = (0, _ramda.either)((0, _ramda.pathSatisfies)(_isFunction["default"], ['map']), (0, _ramda.pathSatisfies)(_isFunction["default"], [_mapping["default"].map]));
var isApply = (0, _ramda.both)(isFunctor, (0, _ramda.either)((0, _ramda.pathSatisfies)(_isFunction["default"], ['ap']), (0, _ramda.pathSatisfies)(_isFunction["default"], [_mapping["default"].ap])));
var ap = (0, _ramda.curryN)(2, function (applyF, applyX) {
  // return original ramda `ap` if not Apply spec
  if (!isApply(applyF) || !isApply(applyX)) {
    return (0, _ramda.ap)(applyF, applyX);
  }

  try {
    // new version of `ap` starting from ramda version > 0.23.0
    return applyF.ap(applyX);
  } catch (e) {
    // old version of `ap` till ramda version <= 0.23.0
    return applyX.ap(applyF);
  }
});
var _default = ap;
exports["default"] = _default;

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _liftFN = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * "lifts" a function to be the specified arity, so that it may "map over" objects that satisfy
 * the fantasy land Apply spec of algebraic structures.
 *
 * Lifting is specific for {@link https://github.com/scalaz/scalaz|scalaz} and {@link http://functionaljava.org/|function Java} implementations.
 * Old version of fantasy land spec were not compatible with this approach,
 * but as of fantasy land 1.0.0 Apply spec also adopted this approach.
 *
 * This function acts as interop for ramda <= 0.23.0 and {@link https://monet.github.io/monet.js/|monet.js}.
 *
 * More info {@link https://github.com/fantasyland/fantasy-land/issues/50|here}.
 *
 * @func liftF
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.2.0|v1.2.0}
 * @category Function
 * @sig Apply a => (a... -> a) -> (a... -> a)
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The lifted function
 * @see {@link RA.liftFN|liftFN}
 * @example
 *
 * const { Maybe } = require('monet');
 *
 * const add3 = (a, b, c) => a + b + c;
 * const madd3 = RA.liftF(add3);
 *
 * madd3(Maybe.Some(10), Maybe.Some(15), Maybe.Some(17)); //=> Maybe.Some(42)
 * madd3(Maybe.Some(10), Maybe.Nothing(), Maybe.Some(17)); //=> Maybe.Nothing()
 */
var liftF = (0, _ramda.curryN)(1, function (fn) {
  return (0, _liftFN["default"])(fn.length, fn);
});
var _default = liftF;
exports["default"] = _default;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * The catamorphism is a way of folding a type into a value.
 *
 * **Either**
 *
 * If the either is right then the right function will be executed with
 * the `right` value and the value of the function returned. Otherwise the left function
 * will be called with the `left` value.
 *
 * **Maybe**
 *
 * If the maybe is Some than the right function will be executed with the `some` value and the value of the function
 * returned. Otherwise the left function with be called without an argument.
 *
 * **Result**
 *
 * If the result is Ok than the right function will be executed with the `Ok` value and the value of the function
 * returned. Otherwise the left function will be called with the `Error` value.
 *
 * **Validation**
 *
 * If the validation is Success than the right function will be executed with the `Success` value and the value of the function
 * returned. Otherwise the left function will be called with the `Failure` value.
 *
 * Supported monadic libraries: {@link https://monet.github.io/monet.js/|monet.js}, {@link https://folktale.origamitower.com/|folktale}, {@link https://github.com/ramda/ramda-fantasy|ramda-fantasy}
 *
 * @func cata
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.4.0|v1.4.0}
 * @category Function
 * @sig (a -> b) -> (a -> c) -> Cata a -> b | c
 * @param {Function} leftFn The left function that consumes the left value
 * @param {Function} rightFn The right function that consumes the right value
 * @param {Cata} catamorphicObj Either, Maybe or any other type with catamorphic capabilities (`cata` or `either` method)
 * @return {*}
 * @see {@link https://monet.github.io/monet.js/#cata|cata explained}
 * @example
 *
 * // Either
 * const eitherR = Either.Right(1);
 * const eitherL = Either.Left(2);
 *
 * RA.cata(identity, identity, eitherR); //=> 1
 * RA.cata(identity, identity, eitherL); //=> 2
 *
 * // Maybe
 * const maybeSome = Maybe.Some(1);
 * const maybeNothing = Maybe.Nothing();
 *
 * RA.cata(identity, identity, maybeSome); //=> 1
 * RA.cata(identity, identity, maybeNothing); //=> undefined
 */
var catamorphism = (0, _ramda.curry)(function (leftFn, rightFn, catamorphicObj) {
  // folktale support
  if ((0, _isFunction["default"])(catamorphicObj.matchWith)) {
    return catamorphicObj.matchWith({
      // Result type
      Ok: function Ok(_ref) {
        var value = _ref.value;
        return rightFn(value);
      },
      Error: function Error(_ref2) {
        var value = _ref2.value;
        return leftFn(value);
      },
      // Maybe type
      Just: function Just(_ref3) {
        var value = _ref3.value;
        return rightFn(value);
      },
      Nothing: function Nothing() {
        return leftFn(undefined);
      },
      // Validation type
      Success: function Success(_ref4) {
        var value = _ref4.value;
        return rightFn(value);
      },
      Failure: function Failure(_ref5) {
        var value = _ref5.value;
        return leftFn(value);
      }
    });
  }

  if ((0, _isFunction["default"])(catamorphicObj.cata)) {
    return catamorphicObj.cata(leftFn, rightFn);
  }

  if ((0, _isFunction["default"])(catamorphicObj.getOrElse)) {
    var elseValue = "RA.cata".concat(Math.random());
    var value = catamorphicObj.getOrElse(elseValue);
    return value === elseValue ? leftFn() : rightFn(value);
  }

  return catamorphicObj.either(leftFn, rightFn);
});
var _default = catamorphism;
exports["default"] = _default;

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Weaves a configuration into function returning the runnable monad like `Reader` or `Free`.
 * This allows us to pre-bind the configuration in advance and use the weaved function
 * without need to explicitly pass the configuration on every call.
 *
 * @func weave
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.7.0|v1.7.0}
 * @category Function
 * @sig (*... -> *) -> * -> (*... -> *)
 * @param {Function} fn The function to weave
 * @param {*} config The configuration to weave into fn
 * @return {Function} Auto-curried weaved function
 * @example
 *
 * const { Reader: reader } = require('monet');
 *
 * const log = value => reader(
 *   config => config.log(value)
 * );
 *
 * // no weaving
 * log('test').run(console); //=> prints 'test'
 *
 * // weaving
 * const wlog = RA.weave(log, console);
 * wlog('test'); //=> prints 'test'
 */
var weave = (0, _ramda.curryN)(2, function (fn, config) {
  return (0, _ramda.curryN)(fn.length, function () {
    return fn.apply(void 0, arguments).run(config);
  });
});
var _default = weave;
exports["default"] = _default;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Weaves a configuration into function returning the runnable monad like `Reader` or `Free`.
 * This allows us to pre-bind the configuration in advance and use the weaved function
 * without need to explicitly pass the configuration on every call.
 *
 * @func weaveLazy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.10.0|v1.10.0}
 * @category Function
 * @sig (*... -> *) -> (* -> *) -> (*... -> *)
 * @param {Function} fn The function to weave
 * @param {Function} configAccessor The function that returns the configuration object
 * @return {Function} Auto-curried weaved function
 * @example
 *
 * const { Reader: reader } = require('monet');
 *
 * const log = value => reader(
 *   config => config.log(value)
 * );
 *
 * const consoleAccessor = R.always(console);
 *
 * // no weaving
 * log('test').run(console); //=> prints 'test'
 *
 * // weaving
 * const wlog = RA.weaveLazy(log, consoleAccessor);
 * wlog('test'); //=> prints 'test'
 */
var weaveLazy = (0, _ramda.curryN)(2, function (fn, configAccessor) {
  return (0, _ramda.curryN)(fn.length, function () {
    return fn.apply(void 0, arguments).run(configAccessor());
  });
});
var _default = weaveLazy;
exports["default"] = _default;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _curryRightN = _interopRequireDefault(__webpack_require__(57));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns a curried equivalent of the provided function.
 * This function is like curry, except that the provided arguments order is reversed.
 *
 * @func curryRight
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.12.0|v1.12.0}
 * @category Function
 * @sig (* -> a) -> (* -> a)
 * @param {Function} fn The function to curry
 * @return {Function}  A new, curried function
 * @see {@link http://ramdajs.com/docs/#curry|R.curry}, {@link RA.curryRightN|curryRightN}
 * @example
 *
 * const concatStrings = (a, b, c) => a + b + c;
 * const concatStringsCurried = RA.curryRight(concatStrings);
 *
 * concatStringCurried('a')('b')('c'); // => 'cba'
 */
var curryRight = (0, _ramda.converge)(_curryRightN["default"], [_ramda.length, _ramda.identity]);
var _default = curryRight;
exports["default"] = _default;

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _allP = _interopRequireDefault(__webpack_require__(7));

var _rejectP = _interopRequireDefault(__webpack_require__(14));

var _resolveP = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns a Promise that is resolved with an array of reasons when all of the provided Promises reject, or rejected when any Promise is resolved.
 * This pattern is like allP, but fulfillments and rejections are transposed - rejections become the fulfillment values and vice versa.
 *
 * @func noneP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Function
 * @sig [Promise a] -> Promise [a]
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} A Promise that is resolved with a list of rejection reasons if all Promises are rejected, or a Promise that is rejected with the fulfillment value of the first Promise that resolves.
 * @see {@link RA.allP|allP}
 * @example
 *
 * RA.noneP([Promise.reject('hello'), Promise.reject('world')]); //=> Promise(['hello', 'world'])
 * RA.noneP([]); //=> Promise([])
 * RA.noneP([Promise.reject(), Promise.resolve('hello world')]); //=> Promise('hello world')
 * RA.noneP([Promise.reject(), 'hello world']); //=> Promise('hello world')
 */
var noneP = (0, _ramda.curryN)(1, (0, _ramda.pipe)((0, _ramda.map)(_resolveP["default"]), (0, _ramda.map)(function (p) {
  return p.then(_rejectP["default"], _resolveP["default"]);
}), _allP["default"]));
var _default = noneP;
exports["default"] = _default;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNonNegative = _interopRequireDefault(__webpack_require__(47));

var _isInteger = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Creates a promise which resolves/rejects after the specified milliseconds.
 *
 * @func delayP
 * @memberOf RA
 * @category Function
 * @sig Number -> Promise Undefined
 * @sig {timeout: Number, value: a} -> Promise a
 * @param {number|Object} milliseconds number of milliseconds or options object
 * @return {Promise} A Promise that is resolved/rejected with the given value (if provided) after the specified delay
 * @example
 *
 * RA.delayP(200); //=> Promise(undefined)
 * RA.delayP({ timeout: 1000, value: 'hello world' }); //=> Promise('hello world')
 * RA.delayP.reject(100); //=> Promise(undefined)
 * RA.delayP.reject({ timeout: 100, value: new Error('error') }); //=> Promise(Error('error'))
 */
var makeDelay = (0, _ramda.curry)(function (settleFnPicker, opts) {
  var timeout;
  var value;

  if ((0, _isInteger["default"])(opts) && (0, _isNonNegative["default"])(opts)) {
    timeout = opts;
  } else {
    timeout = (0, _ramda.propOr)(0, 'timeout', opts);
    value = (0, _ramda.propOr)(value, 'value', opts);
  }

  return new Promise(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var settleFn = settleFnPicker(args);
    setTimeout((0, _ramda.partial)(settleFn, [value]), timeout);
  });
});
var delayP = makeDelay((0, _ramda.nth)(0));
delayP.reject = makeDelay((0, _ramda.nth)(1));
var _default = delayP;
exports["default"] = _default;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Composable shortcut for `Promise.then`.
 * The thenP function returns a Promise. It takes two arguments: a callback function for the success of the Promise
 * and the promise instance itself.
 *
 * @func thenP
 * @memberOf RA
 * @aliases then
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @deprecated since v2.12.0; available in ramda@0.26.0 as R.then
 * @category Function
 * @sig (a -> Promise b | b) -> Promise b
 * @param {Function} onFulfilled A Function called if the Promise is fulfilled. This function has one argument, the fulfillment value
 * @param {Promise} promise Any Promise or Thenable object
 * @return {Promise} A Promise in the pending status

 * @see {@link RA.resolveP|resolveP}, {@link RA.rejectP|rejectP}, {@link RA.allP|allP}
 * @example
 *
 * const promise = Promise.resolve(1);
 * const add1 = v => v + 1;
 *
 * RA.thenP(add1, promise); // => Promise(2)
 */
var thenP = (0, _ramda.invoker)(1, 'then');
var _default = thenP;
exports["default"] = _default;

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.thenCatchP = void 0;

var _ramda = __webpack_require__(0);

/**
 * Composable shortcut for `Promise.then` that allows for success and failure callbacks.
 * The thenCatchP function returns a Promise. It takes three arguments: a callback function for the success of the Promise,
 * a callback function for the failure of the Promise, and the promise instance itself.
 *
 * @func thenCatchP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @category Function
 * @sig (a -> b) -> (c -> d) -> Promise a -> Promise b | d
 * @param {Function} onFulfilled A Function called if the Promise is fulfilled. This function has one argument, the fulfillment value
 * @param {Function} onRejected A Function called if the Promise is rejected. This function has one argument, the error
 * @param {Promise} promise Any Promise or Thenable object
 * @return {Promise}
 * @see {@link RA.resolveP|resolveP}, {@link RA.rejectP|rejectP}, {@link RA.allP|allP}
 * @example
 *
 * const promise = Promise.resolve(1);
 * const add1 = x => x + 1;
 *
 * RA.thenCatchP(add1, console.error, promise); // => Promise(2)
 */
var thenCatchP = (0, _ramda.invoker)(2, 'then');
exports.thenCatchP = thenCatchP;
var _default = thenCatchP;
exports["default"] = _default;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.allSettledPPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Promise = _interopRequireDefault(__webpack_require__(130));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var allSettledPPonyfill = (0, _ramda.curryN)(1, _Promise["default"]);
/**
 * Returns a promise that is fulfilled with an array of promise state snapshots,
 * but only after all the original promises have settled, i.e. become either fulfilled or rejected.
 * We say that a promise is settled if it is not pending, i.e. if it is either fulfilled or rejected.
 *
 * @func allSettledP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.18.0|v2.18.0}
 * @category Function
 * @typedef Settlement = { status: String, value: * }
 * @sig [Promise a] -> Promise [Settlement a]
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} Returns a promise that is fulfilled with an array of promise state snapshots
 * @see {@link RA.allP|allP}
 * @example
 *
 * RA.allSettledP([
 *   Promise.resolve(1),
 *   2,
 *   Promise.reject(3),
 * ]); //=> Promise([{ status: 'fulfilled', value: 1 }, { status: 'fulfilled', value: 2 }, { status: 'rejected', reason: 3 }])
 */

exports.allSettledPPonyfill = allSettledPPonyfill;
var allSettledP = (0, _isFunction["default"])(Promise.allSettled) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Promise.allSettled, Promise)) : allSettledPPonyfill;
var _default = allSettledP;
exports["default"] = _default;

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _allP = _interopRequireDefault(__webpack_require__(7));

var _resolveP = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var onFulfill = function onFulfill(value) {
  return {
    status: 'fulfilled',
    value: value
  };
};

var onReject = function onReject(reason) {
  return {
    status: 'rejected',
    reason: reason
  };
};

var allSettledPonyfill = function allSettledPonyfill(iterable) {
  var array = (0, _ramda.map)(function (p) {
    return (0, _resolveP["default"])(p).then(onFulfill)["catch"](onReject);
  }, _toConsumableArray(iterable));
  return (0, _allP["default"])(array);
};

var _default = allSettledPonyfill;
exports["default"] = _default;

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Y-combinator
 *
 * The Y combinator is an interesting function which only works with functional languages,
 * showing how recursion can still be done even without any variable or function declarations,
 * only functions and parameters
 *
 * @func Y
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Function
 * @sig (a, ... -> b -> b) -> (a, ... -> b)
 * @param {Function} le Recursive function maker
 * @return {Function}
 * @see {@link http://kestas.kuliukas.com/YCombinatorExplained/|Y combinator explained}
 * @example
 *
 * const makeFact = givenFact => (n) => {
 *   if (n < 2) { return 1 }
 *   return n * givenFact(n - 1);
 * };
 *
 * const factorial = RA.Y(makeFact);
 *
 * factorial(5); //=> 120
 */
var Y = (0, _ramda.curryN)(1, function (le) {
  return function (f) {
    return f(f);
  }(function (g) {
    return le(function (x) {
      return g(g)(x);
    });
  });
});
var _default = Y;
exports["default"] = _default;

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/* eslint-disable max-len */

/**
 * Runs the given list of functions in order with the supplied object, then returns the object.
 * Also known as the normal order sequencing combinator.
 *
 * Acts as a transducer if a transformer is given as second parameter.
 *
 * @func seq
 * @aliases sequencing
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Function
 * @sig [(a -> *), (a -> *), ...] -> a -> a
 * @param {Array} fns The list of functions to call in order with `x` whose return values will be thrown away
 * @param {*} x
 * @return {*} `x`
 * @see {@link http://ramdajs.com/docs/#tap|R.tap}, {@link http://www.cs.rpi.edu/academics/courses/spring11/proglang/handouts/lambda-calculus-chapter.pdf|sequencing combinator explained}
 * @example
 *
 * RA.seq([console.info, console.log])('foo'); //=> prints 'foo' via info then log
 *
 * // usage in composition
 * R.pipe(
 *   R.concat('prefix '),
 *   RA.seq([
 *     console.info, //=> prints 'prefix test'
 *     console.log //=> prints 'prefix test'
 *   ]),
 *   R.toUpper
 * )('test'); //=> 'PREFIX TEST'
 */

/* eslint-enable max-len */
var seq = (0, _ramda.curry)(function (fns, x) {
  return (0, _ramda.tap)(function (tx) {
    return (0, _ramda.map)(function (fn) {
      return fn(tx);
    })(fns);
  })(x);
});
var _default = seq;
exports["default"] = _default;

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNotNil = _interopRequireDefault(__webpack_require__(18));

var _isNonEmptyArray = _interopRequireDefault(__webpack_require__(38));

var _stubUndefined = _interopRequireDefault(__webpack_require__(9));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var byArity = (0, _ramda.comparator)(function (a, b) {
  return a.length > b.length;
});
var getMaxArity = (0, _ramda.pipe)((0, _ramda.sort)(byArity), _ramda.head, (0, _ramda.prop)('length'));
var iteratorFn = (0, _ramda.curry)(function (args, accumulator, fn) {
  var result = fn.apply(void 0, _toConsumableArray(args));
  return (0, _isNotNil["default"])(result) ? (0, _ramda.reduced)(result) : accumulator;
});

var dispatchImpl = function dispatchImpl(functions) {
  var arity = getMaxArity(functions);
  return (0, _ramda.curryN)(arity, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _ramda.reduce)(iteratorFn(args), undefined, functions);
  });
};

var dispatch = (0, _ramda.ifElse)(_isNonEmptyArray["default"], dispatchImpl, _stubUndefined["default"]);
var _default = dispatch;
exports["default"] = _default;

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _resolveP = _interopRequireDefault(__webpack_require__(5));

var _rejectP = _interopRequireDefault(__webpack_require__(14));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Takes a generator function and returns an async function.
 * The async function returned is a curried function whose arity matches that of the generator function.
 *
 * Note: This function is handy for environments that does support generators but doesn't support async/await.
 *
 * @func async
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.16.0|v2.16.0}
 * @category Function
 * @sig Promise c => (a, b, ...) -> a -> b -> ... -> c
 * @param {Function} generatorFn The generator function
 * @return {Function} Curried async function
 * @see {@link https://www.promisejs.org/generators/}
 * @example
 *
 * const asyncFn = RA.async(function* generator(val1, val2) {
 *   const a = yield Promise.resolve(val1);
 *   const b = yield Promise.resolve(val2);
 *
 *   return a + b;
 * });
 *
 * asyncFn(1, 2); //=> Promise(3)
 *
 */
var async = (0, _ramda.curryN)(1, function (generatorFn) {
  function asyncWrapper() {
    var iterator = (0, _ramda.bind)(generatorFn, this).apply(void 0, arguments);

    var handle = function handle(result) {
      var resolved = (0, _resolveP["default"])(result.value);
      return result.done ? resolved : resolved.then(function (value) {
        return handle(iterator.next(value));
      }, function (error) {
        return handle(iterator["throw"](error));
      });
    };

    try {
      return handle(iterator.next());
    } catch (error) {
      return (0, _rejectP["default"])(error);
    }
  }

  if (generatorFn.length > 0) {
    return (0, _ramda.curryN)(generatorFn.length, asyncWrapper);
  }

  return asyncWrapper;
});
var _default = async;
exports["default"] = _default;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports["default"] = exports.anyPPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Promise = _interopRequireWildcard(__webpack_require__(136));

exports.AggregatedError = _Promise.AggregatedError;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var anyPPonyfill = (0, _ramda.curryN)(1, _Promise["default"]);
exports.anyPPonyfill = anyPPonyfill;

/**
 * Returns a promise that is fulfilled by the first given promise to be fulfilled,
 * or rejected with an array of rejection reasons if all of the given promises are rejected.
 *
 * @func anyP
 * @memberOf RA
 * @category Function
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @sig [Promise a] -> Promise a
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} A promise that is fulfilled by the first given promise to be fulfilled, or rejected with an array of rejection reasons if all of the given promises are rejected
 * @see {@link RA.lastP|lastP}
 * @example
 *
 * RA.anyP([
 *   Promise.resolve(1),
 *   2,
 *   Promise.reject(3),
 * ]); //=> Promise(1)
 */
var anyP = (0, _isFunction["default"])(Promise.any) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Promise.any, Promise)) : anyPPonyfill;
var _default = anyP;
exports["default"] = _default;

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

exports.__esModule = true;
exports["default"] = exports.AggregatedError = void 0;

var _ramda = __webpack_require__(0);

var _resolveP = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var AggregatedError = /*#__PURE__*/function (_Error) {
  _inherits(AggregatedError, _Error);

  var _super = _createSuper(AggregatedError);

  function AggregatedError() {
    var _this;

    var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var message = arguments.length > 1 ? arguments[1] : undefined;

    _classCallCheck(this, AggregatedError);

    _this = _super.call(this, message);
    _this.errors = errors;
    return _this;
  }

  return AggregatedError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

exports.AggregatedError = AggregatedError;

var anyPonyfill = function anyPonyfill(iterable) {
  var exceptions = [];
  return new Promise(function (resolve, reject) {
    var onReject = function onReject(e) {
      exceptions.push(e);

      if (exceptions.length === iterable.length) {
        reject(new AggregatedError(exceptions));
      }
    };

    (0, _ramda.map)(function (p) {
      return (0, _resolveP["default"])(p).then(resolve)["catch"](onReject);
    }, _toConsumableArray(iterable));
  });
};

var _default = anyPonyfill;
exports["default"] = _default;

/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _allP = _interopRequireDefault(__webpack_require__(7));

var _lengthEq = _interopRequireDefault(__webpack_require__(15));

var _lengthGte = _interopRequireDefault(__webpack_require__(58));

var _rejectP = _interopRequireDefault(__webpack_require__(14));

var _resolveP = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Returns a promise that is fulfilled by the last given promise to be fulfilled,
 * or rejected with an array of rejection reasons if all of the given promises are rejected.
 *
 * @func lastP
 * @memberOf RA
 * @category Function
 * @since {@link https://char0n.github.io/ramda-adjunct/2.23.0|v2.23.0}
 * @sig [Promise a] -> Promise a
 * @param {Iterable.<*>} iterable An iterable object such as an Array or String
 * @return {Promise} A promise that is fulfilled by the last given promise to be fulfilled, or rejected with an array of rejection reasons if all of the given promises are rejected.
 * @see {@link RA.anyP|anyP}
 * @example
 *
 * const delayP = timeout => new Promise(resolve => setTimeout(() => resolve(timeout), timeout));
 * delayP.reject = timeout => new Promise((resolve, reject) => setTimeout(() => reject(timeout), timeout));
 * RA.lastP([
 *   1,
 *   delayP(10),
 *   delayP(100),
 *   delayP.reject(1000),
 * ]); //=> Promise(100)
 */
var lastP = (0, _ramda.curryN)(1, function (iterable) {
  var fulfilled = [];
  var rejected = [];
  var onFulfill = (0, _ramda.bind)(fulfilled.push, fulfilled);
  var onReject = (0, _ramda.bind)(rejected.push, rejected);
  var listOfPromises = (0, _ramda.map)(function (p) {
    return (0, _resolveP["default"])(p).then(onFulfill)["catch"](onReject);
  }, _toConsumableArray(iterable));
  return (0, _allP["default"])(listOfPromises).then(function () {
    if ((0, _lengthEq["default"])(0, fulfilled) && (0, _lengthEq["default"])(0, rejected)) {
      return undefined;
    }

    if ((0, _lengthGte["default"])(1, fulfilled)) {
      return (0, _ramda.last)(fulfilled);
    }

    return (0, _rejectP["default"])(rejected);
  });
});
var _default = lastP;
exports["default"] = _default;

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _defaultWhen = _interopRequireDefault(__webpack_require__(59));

var _mapIndexed = _interopRequireDefault(__webpack_require__(60));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns a function which is called with the given arguments. If any of the given arguments are null or undefined,
 * the corresponding default value for that argument is used instead.
 *
 * @func fnull
 * @memberOf RA
 * @category Function
 * @sig (a ... -> b) -> [c] -> a ... | c -> b
 * @param {Function} function to be executed
 * @param {Array} defaults default arguments
 * @return {Function} will apply provided arguments or default ones
 * @example
 *
 * const addDefaults = RA.fnull((a, b) => a + b, [4, 5])
 *
 * addDefaults(1, 2); // => 3
 * addDefaults(null, 2); // => 6
 * addDefaults(2, null); // => 7
 * addDefaults(undefined, undefined); // => 9
 */
var fnull = (0, _ramda.curry)(function (fn, defaults) {
  return (0, _ramda.curryN)(fn.length, function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var argsWithDefaults = (0, _mapIndexed["default"])(function (val, idx) {
      return (0, _defaultWhen["default"])(_ramda.isNil, defaults[idx], val);
    }, args);
    return (0, _ramda.apply)(fn, argsWithDefaults);
  });
});
var _default = fnull;
exports["default"] = _default;

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * {@link http://ramdajs.com/docs/#reduce|R.reduce} function that more closely resembles Array.prototype.reduce.
 * It takes two new parameters to its callback function: the current index, and the entire list.
 *
 * `reduceIndexed` implementation is simple : `
 * const reduceIndexed = R.addIndex(R.reduce);
 * `
 * @func reduceIndexed
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @typedef Idx = Number
 * @sig ((a, b, Idx, [b]) => a) -> a -> [b] -> a
 * @param {Function} fn The iterator function. Receives four values,
 * the accumulator, the current element from the array, index and the entire list
 * @param {*} acc The accumulator value
 * @param {Array} list The list to iterate over
 * @return {*} The final, accumulated value
 * @see {@link http://ramdajs.com/docs/#addIndex|R.addIndex}, {@link http://ramdajs.com/docs/#reduce|R.reduce}
 * @example
 *
 * const initialList = ['f', 'o', 'o', 'b', 'a', 'r'];
 *
 * reduceIndexed((acc, val, idx, list) => acc + '-' + val + idx, '', initialList);
 * //=> "-f0-o1-o2-b3-a4-r5"
 */
var reduceIndexed = (0, _ramda.addIndex)(_ramda.reduce);
var _default = reduceIndexed;
exports["default"] = _default;

/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

// helpers
var filterIndexed = (0, _ramda.addIndex)(_ramda.filter);
var containsIndex = (0, _ramda.curry)(function (indexes, val, index) {
  return (0, _ramda.contains)(index, indexes);
});
/**
 * Picks values from list by indexes.
 *
 * Note: pickIndexes will skip non existing indexes. If you want to include them
 * use ramda's `props` function.
 *
 * @func pickIndexes
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.1.0|v1.1.0}
 * @category List
 * @sig  [Number] -> [a] -> [a]
 * @param {Array} indexes The indexes to pick
 * @param {Array} list The list to pick values from
 * @return {Array} New array containing only values at `indexes`
 * @see {@link http://ramdajs.com/docs/#pick|R.pick}, {@link RA.omitIndexes|omitIndexes}
 * @example
 *
 * RA.pickIndexes([0, 2], ['a', 'b', 'c']); //=> ['a', 'c']
 */

var pickIndexes = (0, _ramda.curry)(function (indexes, list) {
  return filterIndexed(containsIndex(indexes), list);
});
var _default = pickIndexes;
exports["default"] = _default;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNotArray = _interopRequireDefault(__webpack_require__(37));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns a singleton array containing the value provided.
 * If value is already an array, it is returned as is.
 *
 * @func ensureArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category List
 * @sig a | [a] -> [a]
 * @param {*|Array} val the value ensure as Array
 * @return {Array}
 * @see {@link http://ramdajs.com/docs/#of|R.of}
 * @example
 *
 * RA.ensureArray(42); //=> [42]
 * RA.ensureArray([42]); //=> [42]
 */
var ensureArray = (0, _ramda.when)(_isNotArray["default"], _ramda.of);
var _default = ensureArray;
exports["default"] = _default;

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _stubUndefined = _interopRequireDefault(__webpack_require__(9));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var leftIdentitySemigroup = {
  concat: _ramda.identity
};
/**
 * Returns the result of concatenating the given lists or strings.
 * Note: RA.concatAll expects all elements to be of the same type. It will throw an error if you concat an Array with a non-Array value.
 * Dispatches to the concat method of the preceding element, if present. Can also concatenate multiple elements of a [fantasy-land compatible semigroup](https://github.com/fantasyland/fantasy-land#semigroup).
 * Returns undefined if empty array was passed.
 *
 * @func concatAll
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category List
 * @sig [[a]] -> [a] | Undefined
 * @sig [String] -> String | Undefined
 * @sig Semigroup s => Foldable s f => f -> s | Undefined
 * @param {Array.<Array|string>} list List containing elements that will be concatenated
 * @return {Array|string|undefined} Concatenated elements
 * @see {@link http://ramdajs.com/docs/#concat|R.concat}, {@link RA.concatRight|concatRight}, {@link http://ramdajs.com/docs/#unnest|R.unnest}, {@link http://ramdajs.com/docs/#join|R.join}
 * @example
 *
 * concatAll([[1], [2], [3]]); //=> [1, 2, 3]
 * concatAll(['1', '2', '3']); //=> '123'
 * concatAll([]); //=> undefined;
 */

var concatAll = (0, _ramda.pipe)((0, _ramda.reduce)(_ramda.concat, leftIdentitySemigroup), (0, _ramda.when)((0, _ramda.identical)(leftIdentitySemigroup), _stubUndefined["default"]));
var _default = concatAll;
exports["default"] = _default;

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns the result of concatenating the given lists or strings.
 *
 * Note: R.concat expects both arguments to be of the same type, unlike
 * the native Array.prototype.concat method.
 * It will throw an error if you concat an Array with a non-Array value.
 * Dispatches to the concat method of the second argument, if present.
 *
 * @func concatRight
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.11.0|v1.11.0}
 * @category List
 * @sig [a] -> [a] -> [a]
 * @sig String -> String -> String
 * @param {Array|String} firstList The first list
 * @param {Array|String} secondList The second list
 * @return {Array|String} A list consisting of the elements of `secondList`
 * followed by the elements of `firstList`.
 * @see {@link http://ramdajs.com/docs/#concat|R.concat}
 * @example
 *
 * RA.concatRight('ABC', 'DEF'); //=> 'DEFABC'
 * RA.concatRight([4, 5, 6], [1, 2, 3]); //=> [1, 2, 3, 4, 5, 6]
 * RA.concatRight([], []); //=> []
 */
var concatRight = (0, _ramda.flip)(_ramda.concat);
var _default = concatRight;
exports["default"] = _default;

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isUndefined = _interopRequireDefault(__webpack_require__(12));

var _resolveP = _interopRequireDefault(__webpack_require__(5));

var _allP = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/* eslint-disable max-len */

/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 *
 * If the iterator function returns a promise, then the result of the promise is awaited,
 * before continuing with next iteration. If any promise in the array is rejected or a promise
 * returned by the iterator function is rejected, the result is rejected as well.
 *
 * If `initialValue` is `undefined` (or a promise that resolves to `undefined`) and
 * the `Iterable` contains only 1 item, the callback will not be called and
 * the `Iterable's` single item is returned. If the `Iterable` is empty, the callback
 * will not be called and `initialValue` is returned (which may be undefined).
 *
 * This function is basically equivalent to {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}.
 *
 * @func reduceP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|v1.13.0}
 * @category List
 * @typedef MaybePromise = Promise.<*> | *
 * @sig ((Promise a, MaybePromise b) -> Promise a) -> MaybePromise a -> MaybePromise [MaybePromise b] -> Promise a
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the current element from the list
 * @param {*|Promise.<*>} acc The accumulator value
 * @param {Array.<*>|Promise.<Array<*|Promise.<*>>>} list The list to iterate over
 * @return {Promise} The final, accumulated value
 * @see {@link http://ramdajs.com/docs/#reduce|R.reduce}, {@link RA.reduceRightP|reduceRightP}, {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}
 * @example
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   Promise.resolve(0),
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   [Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceP(
 *   (total, fileName) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   Promise.resolve([Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt'])
 * ); // => Promise(10)
 *
 */

/* esline-enable max-len */
var reduceP = (0, _ramda.curryN)(3, function (fn, acc, list) {
  return (0, _resolveP["default"])(list).then(function (iterable) {
    var listLength = (0, _ramda.length)(iterable);

    if (listLength === 0) {
      return acc;
    }

    var reducer = (0, _ramda.reduce)(function (accP, currentValueP) {
      return accP.then(function (previousValue) {
        return (0, _allP["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            previousValue = _ref2[0],
            currentValue = _ref2[1];

        if ((0, _isUndefined["default"])(previousValue) && listLength === 1) {
          return currentValue;
        }

        return fn(previousValue, currentValue);
      });
    });
    return reducer((0, _resolveP["default"])(acc), iterable);
  });
});
var _default = reduceP;
exports["default"] = _default;

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isUndefined = _interopRequireDefault(__webpack_require__(12));

var _resolveP = _interopRequireDefault(__webpack_require__(5));

var _allP = _interopRequireDefault(__webpack_require__(7));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// in older ramda versions the order of the arguments is flipped
var flipArgs = (0, _ramda.pipe)((0, _ramda.reduceRight)(_ramda.concat, ''), (0, _ramda.equals)('ba'))(['a', 'b']);
/* eslint-disable max-len */

/**
 * Given an `Iterable`(arrays are `Iterable`), or a promise of an `Iterable`,
 * which produces promises (or a mix of promises and values),
 * iterate over all the values in the `Iterable` into an array and
 * reduce the array to a value using the given iterator function.
 *
 * Similar to {@link RA.reduceP|reduceP} except moves through the input list from the right to the left.
 * The iterator function receives two values: (value, acc),
 * while the arguments' order of reduceP's iterator function is (acc, value).
 *
 * @func reduceRightP
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|v1.13.0}
 * @category List
 * @typedef MaybePromise = Promise.<*> | *
 * @sig ((MaybePromise b, Promise a) -> Promise a) -> MaybePromise a -> MaybePromise [MaybePromise b] -> Promise a
 * @param {Function} fn The iterator function. Receives two values, the current element from the list and the accumulator
 * @param {*|Promise.<*>} acc The accumulator value
 * @param {Array.<*>|Promise.<Array<*|Promise.<*>>>} list The list to iterate over
 * @return {Promise} The final, accumulated value
 * @see {@link RA.reduceP|reduceP}, {@link http://bluebirdjs.com/docs/api/promise.reduce.html|bluebird.reduce}
 * @example
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   Promise.resolve(0),
 *   ['file1.txt', 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   [Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt']
 * ); // => Promise(10)
 *
 * RA.reduceRightP(
 *   (fileName, total) => fs
 *     .readFileAsync(fileName, 'utf8')
 *     .then(contents => total + parseInt(contents, 10)),
 *   0,
 *   Promise.resolve([Promise.resolve('file1.txt'), 'file2.txt', 'file3.txt'])
 * ); // => Promise(10)
 *
 */

/* esline-enable max-len */

var reduceRightP = (0, _ramda.curryN)(3, function (fn, acc, list) {
  return (0, _resolveP["default"])(list).then(function (iterable) {
    var listLength = (0, _ramda.length)(iterable);

    if (listLength === 0) {
      return acc;
    }

    var reducer = (0, _ramda.reduceRight)(function (arg1, arg2) {
      var accP;
      var currentValueP;

      if (flipArgs) {
        accP = arg1;
        currentValueP = arg2;
      } else {
        accP = arg2;
        currentValueP = arg1;
      }

      return accP.then(function (previousValue) {
        return (0, _allP["default"])([previousValue, currentValueP]);
      }).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            previousValue = _ref2[0],
            currentValue = _ref2[1];

        if ((0, _isUndefined["default"])(previousValue) && listLength === 1) {
          return currentValue;
        }

        return fn(currentValue, previousValue);
      });
    });
    return reducer((0, _resolveP["default"])(acc), iterable);
  });
});
var _default = reduceRightP;
exports["default"] = _default;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns the elements of the given list or string (or object with a slice method)
 * from fromIndex (inclusive).
 * Dispatches to the slice method of the second argument, if present.
 *
 * @func sliceFrom
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category List
 * @sig  Number -> [a] -> [a]
 * @param {number} fromIndex The start index (inclusive)
 * @param {Array|string} list The list or string to slice
 * @return {Array|string} The sliced list or string
 * @see {@link http://ramdajs.com/docs/#slice|R.slice}, {@link RA.sliceTo|sliceTo}
 * @example
 *
 * RA.sliceFrom(1, [1, 2, 3]); //=> [2, 3]
 */
var sliceFrom = (0, _ramda.slice)(_ramda.__, Infinity);
var _default = sliceFrom;
exports["default"] = _default;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns the elements of the given list or string (or object with a slice method)
 * to toIndex (exclusive).
 * Dispatches to the slice method of the second argument, if present.
 *
 * @func sliceTo
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.16.0|v1.16.0}
 * @category List
 * @sig  Number -> [a] -> [a]
 * @param {number} toIndex The end index (exclusive)
 * @param {Array|string} list The list or string to slice
 * @return {Array|string} The sliced list or string
 * @see {@link http://ramdajs.com/docs/#slice|R.slice}, {@link RA.sliceFrom|sliceFrom}
 * @example
 *
 * RA.sliceTo(2, [1, 2, 3]); //=> [1, 2]
 */
var sliceTo = (0, _ramda.slice)(0);
var _default = sliceTo;
exports["default"] = _default;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

// helpers
var rejectIndexed = (0, _ramda.addIndex)(_ramda.reject);
var containsIndex = (0, _ramda.curry)(function (indexes, val, index) {
  return (0, _ramda.contains)(index, indexes);
});
/**
 * Returns a partial copy of an array omitting the indexes specified.
 *
 * @func omitIndexes
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category List
 * @sig [Int] -> [a] -> [a]
 * @see {@link http://ramdajs.com/docs/#omit|R.omit}, {@link RA.pickIndexes|pickIndexes}
 * @param {!Array} indexes The array of indexes to omit from the new array
 * @param {!Array} list The array to copy from
 * @return {!Array} The new array with omitted indexes
 * @example
 *
 * RA.omitIndexes([-1, 1, 3], ['a', 'b', 'c', 'd']); //=> ['a', 'c']
 */

var omitIndexes = (0, _ramda.curry)(function (indexes, list) {
  return rejectIndexed(containsIndex(indexes), list);
});
var _default = omitIndexes;
exports["default"] = _default;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isFalsy = _interopRequireDefault(__webpack_require__(54));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Creates an array with all falsy values removed.
 * The values false, null, 0, "", undefined, and NaN are falsy.
 *
 * @func compact
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @sig Filterable f => f a -> f a
 * @param {Array} list The array to compact
 * @return {Array} Returns the new array of filtered values
 * @see {@link RA.isFalsy|isFalsy}
 * @example
 *
 * RA.compact([0, 1, false, 2, '', 3]); //=> [1, 2, 3]
 */
var compact = (0, _ramda.reject)(_isFalsy["default"]);
var _default = compact;
exports["default"] = _default;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns a new list containing the contents of the given list, followed by the given element.
 * Like {@link http://ramdajs.com/docs/#append|R.append} but with argument order reversed.
 *
 * @func appendFlipped
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category List
 * @sig [a] -> a -> [a]
 * @param {Array} list The list of elements to add a new item to
 * @param {*} el The element to add to the end of the new list
 * @return {Array} A new list containing the elements of the old list followed by `el`
 * @see {@link http://ramdajs.com/docs/#append|R.append}
 * @example
 *
 * RA.appendFlipped(['write', 'more'], 'tests'); //=> ['write', 'more', 'tests']
 * RA.appendFlipped([], 'tests'); //=> ['tests']
 * RA.appendFlipped(['write', 'more'], ['tests']); //=> ['write', 'more', ['tests']]
 */
var appendFlipped = (0, _ramda.flip)(_ramda.append);
var _default = appendFlipped;
exports["default"] = _default;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns a new list with the item at the position `fromIdx` moved to the position `toIdx`. If the
 * `toIdx` is out of the `list` range, the item will be placed at the last position of the `list`.
 * When negative indices are provided, the behavior of the move is unspecified.
 *
 * @func move
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {number} fromIdx The position of item to be moved
 * @param {number} toIdx The position of item after move
 * @param {Array} list The list containing the item to be moved
 * @return {Array}
 * @example
 *
 * const list = ['a', 'b', 'c', 'd', 'e'];
 * RA.move(1, 3, list) //=> ['a', 'c', 'd', 'b', 'e']
 */
var move = (0, _ramda.curry)(function (fromIdx, toIdx, list) {
  return (0, _ramda.compose)((0, _ramda.insert)(toIdx, (0, _ramda.nth)(fromIdx, list)), (0, _ramda.remove)(fromIdx, 1))(list);
});
var _default = move;
exports["default"] = _default;

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _compareLength = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if the supplied list or string has a length greater than `valueLength`.
 *
 * @func lengthGt
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#gt|gt},  {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthGt(3, [1,2,3,4]); //=> true
 * RA.lengthGt(3, [1,2,3]); //=> false
 */
var lengthGt = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.gt));
var _default = lengthGt;
exports["default"] = _default;

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _compareLength = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if the supplied list or string has a length less than `valueLength`.
 *
 * @func lengthLt
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthNotEq|lengthNotEq}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#lt|lt}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthLt(3, [1,2]); //=> true
 * RA.lengthLt(3, [1,2,3]); //=> false
 */
var lengthLt = (0, _compareLength["default"])((0, _ramda.flip)(_ramda.lt));
var _default = lengthLt;
exports["default"] = _default;

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _compareLength = _interopRequireDefault(__webpack_require__(8));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if the supplied list or string has a length not equal to `valueLength`.
 *
 * @func lengthNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.8.0|v2.8.0}
 * @category List
 * @sig Number -> [*] -> Boolean
 * @param {number} valueLength The length of the list or string
 * @param {Array|string} value The list or string
 * @return {boolean}
 * @see {@link RA.lengthEq|lengthEq}, {@link RA.lengthLt|lengthLt}, {@link RA.lengthGt|lengthGt}, {@link RA.lengthLte|lengthLte}, {@link RA.lengthGte|lengthGte}, {@link http://ramdajs.com/docs/#equals|equals}, {@link http://ramdajs.com/docs/#length|length}
 * @example
 *
 * RA.lengthNotEq(3, [1,2,3,4]); //=> true
 * RA.lengthNotEq(3, [1,2,3]); //=> false
 */
var lengthNotEq = (0, _compareLength["default"])((0, _ramda.complement)(_ramda.equals));
var _default = lengthNotEq;
exports["default"] = _default;

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _lengthLte = _interopRequireDefault(__webpack_require__(33));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Original idea for this function was conceived by https://github.com/jackmellis
// in https://github.com/char0n/ramda-adjunct/pull/513.

/**
 * Returns true if all items in the list are equivalent using `R.equals` for equality comparisons.
 *
 * @func allEqual
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.9.0|v2.9.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.allEqual([ 1, 2, 3, 4 ]); //=> false
 * RA.allEqual([ 1, 1, 1, 1 ]); //=> true
 * RA.allEqual([]); //=> true
 *
 */
var allEqual = (0, _ramda.curryN)(1, (0, _ramda.pipe)(_ramda.uniq, (0, _lengthLte["default"])(1)));
var _default = allEqual;
exports["default"] = _default;

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.repeatStrInvoker = exports.repeatStrPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _String = _interopRequireDefault(__webpack_require__(34));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var repeatStrPonyfill = (0, _ramda.curry)(_String["default"]);
exports.repeatStrPonyfill = repeatStrPonyfill;
var repeatStrInvoker = (0, _ramda.flip)((0, _ramda.invoker)(1, 'repeat'));
/**
 * Constructs and returns a new string which contains the specified
 * number of copies of the string on which it was called, concatenated together.
 *
 * @func repeatStr
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig String -> Number -> String
 * @param {string} value String value to be repeated
 * @param {number} count An integer between 0 and +∞: [0, +∞), indicating the number of times to repeat the string in the newly-created string that is to be returned
 * @return {string} A new string containing the specified number of copies of the given string
 * @example
 *
 * RA.repeatStr('a', 3); //=> 'aaa'
 */

exports.repeatStrInvoker = repeatStrInvoker;
var repeatStr = (0, _isFunction["default"])(String.prototype.repeat) ? repeatStrInvoker : repeatStrPonyfill;
var _default = repeatStr;
exports["default"] = _default;

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _lengthLte = _interopRequireDefault(__webpack_require__(33));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns true if all items in the list are equivalent using `R.identical` for equality comparisons.
 *
 * @func allIdentical
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link https://ramdajs.com/docs/#identical|identical}
 * @example
 *
 * RA.allIdentical([ 1, 2, 3, 4 ]); //=> false
 * RA.allIdentical([ 1, 1, 1, 1 ]); //=> true
 * RA.allIdentical([]); //=> true
 * RA.allIdentical([ {}, {} ]); //=> false
 * RA.allIdentical([ () => {}, () => {} ]); //=> false
 */
var allIdentical = (0, _ramda.curryN)(1, (0, _ramda.pipe)((0, _ramda.uniqWith)(_ramda.identical), (0, _lengthLte["default"])(1)));
var _default = allIdentical;
exports["default"] = _default;

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns true if all items in the list are equivalent to user provided value using `R.identical` for equality comparisons.
 *
 * @func allIdenticalTo
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig a -> [b] -> Boolean
 * @param {*} val User provided value to check the `list` against
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.allIdentical|allIdentical}, {@link http://ramdajs.com/docs/#identical|R.identical}
 * @example
 *
 * RA.allIdenticalTo(1, [ 1, 2, 3, 4 ]); //=> false
 * RA.allIdenticalTo(1, [ 1, 1, 1, 1 ]); //=> true
 * RA.allIdenticalTo(1, []); //=> true
 * RA.allIdenticalTo({}, [ {}, {} ]); //=> false
 *
 */
var allIdenticalTo = (0, _ramda.curry)(function (val, list) {
  return (0, _ramda.all)((0, _ramda.identical)(val), list);
});
var _default = allIdenticalTo;
exports["default"] = _default;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns true if all items in the list are equivalent to user provided value using `R.equals` for equality comparisons.
 *
 * @func allEqualTo
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.11.0|v2.11.0}
 * @category List
 * @sig a -> [b] -> Boolean
 * @param {*} val User provided value to check the `list` against
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.allEqual|allEqual}, {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.allEqualTo(1, [ 1, 2, 3, 4 ]); //=> false
 * RA.allEqualTo(1, [ 1, 1, 1, 1 ]); //=> true
 * RA.allEqualTo({}, [ {}, {} ]); //=> true
 * RA.allEqualTo(1, []); //=> true
 *
 */
var allEqualTo = (0, _ramda.curry)(function (val, list) {
  return (0, _ramda.all)((0, _ramda.equals)(val), list);
});
var _default = allEqualTo;
exports["default"] = _default;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _makeFlat2 = _interopRequireDefault(__webpack_require__(161));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var flatten1 = (0, _makeFlat2["default"])(false);
/**
 * Flattens the list to the specified depth.
 *
 * @func flattenDepth
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.19.0|v2.19.0}
 * @category List
 * @sig Number -> [a] -> [b]
 * @param {!number} depth The maximum recursion depth
 * @param {!Array} list The array to flatten
 * @return {!Array} Returns the new flattened array
 * @see {@link http://ramdajs.com/docs/#flatten|R.flatten}, {@link http://ramdajs.com/docs/#unnest|R.unnest}
 * @example
 *
 * RA.flattenDepth(
 *   2,
 *   [1, [2], [3, [4, 5], 6, [[[7], 8]]], 9, 10]
 * ); //=> [1, 2, 3, 4, 5, 6, [[7], 8], 9, 10];
 */

var flattenDepth = (0, _ramda.curry)(function (depth, list) {
  var currentDept = depth;

  var flatList = _toConsumableArray(list);

  while (currentDept > 0) {
    flatList = flatten1(flatList);
    currentDept -= 1;
  }

  return flatList;
});
var _default = flattenDepth;
exports["default"] = _default;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _isArrayLike = _interopRequireDefault(__webpack_require__(23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * `makeFlat` is a helper function that returns a one-level or fully recursive
 * function based on the flag passed in.
 *
 * @func makeFlat
 * @memberOf RA
 *
 * @category List
 * @param {!bool} = should recursively flatten
 * @param {!Array} = the nested list to be flattened
 * @return {!Array} = the flattened list
 * @sig Bool -> List -> List
 *
 */
var makeFlat = function makeFlat(recursive) {
  return function flatt(list) {
    var value;
    var jlen;
    var j;
    var result = [];
    var idx = 0;

    while (idx < list.length) {
      if ((0, _isArrayLike["default"])(list[idx])) {
        value = recursive ? flatt(list[idx]) : list[idx];
        j = 0;
        jlen = value.length;

        while (j < jlen) {
          result[result.length] = value[j];
          j += 1;
        }
      } else {
        result[result.length] = list[idx];
      }

      idx += 1;
    }

    return result;
  };
};

var _default = makeFlat;
exports["default"] = _default;

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.fromPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isIterable = _interopRequireDefault(__webpack_require__(21));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Array = _interopRequireDefault(__webpack_require__(163));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fromPonyfill = (0, _ramda.curryN)(1, _Array["default"]);
exports.fromPonyfill = fromPonyfill;
var fromArray = (0, _isFunction["default"])(Array.from) ? (0, _ramda.curryN)(1, Array.from) : fromPonyfill;
/**
 * Converts value to an array.
 *
 * @func toArray
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category List
 * @sig * -> [a]
 * @param {*} val The value to convert
 * @return {Array}
 * @example
 *
 * RA.toArray([1, 2]); //=> [1, 2]
 * RA.toArray({'foo': 1, 'bar': 2}); //=> [1, 2]
 * RA.toArray('abc'); //=> ['a', 'b', 'c']
 * RA.toArray(1); //=> []
 * RA.toArray(null); //=> []
 */

var toArray = (0, _ramda.ifElse)(_isIterable["default"], fromArray, _ramda.values);
var _default = toArray;
exports["default"] = _default;

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isIterable = _interopRequireDefault(__webpack_require__(21));

var _isNotUndefined = _interopRequireDefault(__webpack_require__(11));

var _isNotNil = _interopRequireDefault(__webpack_require__(18));

var _isNotFunction = _interopRequireDefault(__webpack_require__(24));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var copyArray = function copyArray(items, mapFn, thisArg) {
  var boundMapFn = (0, _isNotUndefined["default"])(thisArg) ? (0, _ramda.bind)(mapFn, thisArg) : mapFn;
  return (0, _isNotUndefined["default"])(mapFn) ? _toConsumableArray(items).map(boundMapFn) : _toConsumableArray(items);
};

var fromArray = function fromArray(items, mapFn, thisArg) {
  if (items == null) {
    throw new TypeError('Array.from requires an array-like object - not null or undefined');
  }

  if ((0, _isNotNil["default"])(mapFn) && (0, _isNotFunction["default"])(mapFn)) {
    throw new TypeError('Array.from: when provided, the second argument must be a function');
  }

  if ((0, _isIterable["default"])(items)) {
    return copyArray(items, mapFn, thisArg);
  }

  return [];
};

var _default = fromArray;
exports["default"] = _default;

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _allUnique = _interopRequireDefault(__webpack_require__(62));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns true if at least one item of the list is repeated. `R.equals` is used to determine equality.
 *
 * @func notAllUnique
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category List
 * @sig [a] -> Boolean
 * @param {Array} list The list of values
 * @return {boolean}
 * @see {@link RA.allUnique|allUnique}, {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.notAllUnique([ 1, 1, 2, 3 ]); //=> true
 * RA.notAllUnique([ 1, 2, 3, 4 ]); //=> false
 * RA.notAllUnique([]); //=> false
 *
 */
var notAllUnique = (0, _ramda.complement)(_allUnique["default"]);
var _default = notAllUnique;
exports["default"] = _default;

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Sort a list of objects by a list of props (if first prop value is equivalent, sort by second, etc).
 *
 * @func sortByProps
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.26.0|v2.26.0}
 * @category List
 * @sig [k] -> [{k: v}] -> [{k: v}]
 * @param {Array.<string>} props A list of properties in the list param to sort by
 * @param {Array.<object>} list A list of objects to be sorted
 * @return {Array.<object>} A new list sorted by the properties in the props param
 * @example
 *
 * sortByProps(['num'], [{num: 3}, {num: 2}, {num: 1}])
 * //=> [{num: 1}, {num: 2} {num: 3}]
 * sortByProps(['letter', 'num'], [{num: 3, letter: 'a'}, {num: 2, letter: 'a'} {num: 1, letter: 'z'}])
 * //=> [ {num: 2, letter: 'a'}, {num: 3, letter: 'a'}, {num: 1, letter: 'z'}]
 * sortByProps(['name', 'num'], [{num: 3}, {num: 2}, {num: 1}])
 * //=> [{num: 1}, {num: 2}, {num: 3}]
 */
var sortByProps = (0, _ramda.curry)(function (props, list) {
  var firstTruthy = function firstTruthy(_ref) {
    var _ref2 = _toArray(_ref),
        head = _ref2[0],
        tail = _ref2.slice(1);

    return (0, _ramda.reduce)(_ramda.either, head, tail);
  };

  var makeComparator = function makeComparator(propName) {
    return (0, _ramda.comparator)(function (a, b) {
      return (0, _ramda.lt)((0, _ramda.prop)(propName, a), (0, _ramda.prop)(propName, b));
    });
  };

  return (0, _ramda.sort)(firstTruthy((0, _ramda.map)(makeComparator, props)), list);
});
var _default = sortByProps;
exports["default"] = _default;

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * When given a number n and an array, returns an array containing every nth element.
 *
 * @func skipTake
 * @memberOf RA
 * @category List
 * @since {@link https://char0n.github.io/ramda-adjunct/2.26.0|v2.26.0}
 * @sig Number -> [a] -> [a]
 * @param {number} the nth element to extract
 * @param {Array} value the input array
 * @return {Array} An array containing every nth element
 * @example
 *
 * RA.skipTake(2, [1,2,3,4]) //=> [1, 3]
 * RA.skipTake(3, R.range(0, 20)); //=> [0, 3, 6, 9, 12, 15, 18]
 */
var skipTake = (0, _ramda.curry)(function (n, list) {
  return (0, _ramda.addIndex)(_ramda.filter)((0, _ramda.pipe)((0, _ramda.nthArg)(1), (0, _ramda.modulo)(_ramda.__, n), (0, _ramda.identical)(0)))(list);
});
var _default = skipTake;
exports["default"] = _default;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isNotFunction = _interopRequireDefault(__webpack_require__(24));

var _isEmptyArray = _interopRequireDefault(__webpack_require__(36));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Invokes the method at path of object with given arguments.
 *
 * @func invokeArgs
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.27.0|v2.27.0}
 * @category Object
 * @sig Array -> Array -> Object -> *
 * @param {Array.<string|number>} path The path of the method to invoke
 * @param {Array} args The arguments to invoke the method with
 * @param {Object} obj The object to query
 * @return {*}
 * @example
 *
 * RA.invokeArgs(['abs'], [-1], Math); //=> 1
 * RA.invokeArgs(['path', 'to', 'non-existent', 'method'], [-1], Math); //=> undefined
 */
var invokeArgs = (0, _ramda.curryN)(3, function (mpath, args, obj) {
  var method = (0, _ramda.path)(mpath, obj);
  var context = (0, _ramda.path)((0, _ramda.init)(mpath), obj);
  if ((0, _isNotFunction["default"])(method)) return undefined;
  if ((0, _isEmptyArray["default"])(mpath)) return undefined;
  var boundMethod = (0, _ramda.bind)(method, context);
  return (0, _ramda.apply)(boundMethod, args);
});
var _default = invokeArgs;
exports["default"] = _default;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _renameKeysWith = _interopRequireDefault(__webpack_require__(35));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var valueOrKey = function valueOrKey(keysMap) {
  return function (key) {
    if ((0, _ramda.has)(key, keysMap)) {
      return keysMap[key];
    }

    return key;
  };
};
/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * Keep in mind that in the case of keys conflict is behaviour undefined and
 * the result may vary between various JS engines!
 *
 * @func renameKeys
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.5.0|v1.5.0}
 * @category Object
 * @sig {a: b} -> {a: *} -> {b: *}
 * @param {!Object} keysMap
 * @param {!Object} obj
 * @return {!Object} New object with renamed keys
 * @see {@link https://github.com/ramda/ramda/wiki/Cookbook#rename-keys-of-an-object|Ramda Cookbook}, {@link RA.renameKeysWith|renameKeysWith}
 * @example
 *
 * const input = { firstName: 'Elisia', age: 22, type: 'human' };
 *
 * RA.renameKeys({ firstName: 'name', type: 'kind', foo: 'bar' })(input);
 * //=> { name: 'Elisia', age: 22, kind: 'human' }
 */


var renameKeys = (0, _ramda.curry)(function (keysMap, obj) {
  return (0, _renameKeysWith["default"])(valueOrKey(keysMap), obj);
});
var _default = renameKeys;
exports["default"] = _default;

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _renameKeysWith = _interopRequireDefault(__webpack_require__(35));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Creates a new object with the own properties of the provided object, but the
 * key `key` renamed according to logic of renaming function.
 *
 * Keep in mind that in case the new key name already existed on the object,
 * the behaviour is undefined and the result may vary between various JS engines!
 *
 * @func renameKeyWith
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.29.0|v2.29.0}
 * @category Object
 * @sig (k -> k) -> k -> {k: v} -> {k: v}
 * @param {Function} fn Function that renames the keys
 * @param {!string} key Key to rename
 * @param {!Object} obj Provided object
 * @return {!Object} New object with renamed key
 * @see {@link RA.renameKeysWith|renameKeysWith}
 * @example
 *
 * RA.renameKeyWith(R.concat('a'), 'A', { A: 1 }) //=> { aA: 1 }
 */
var renameKeyWith = (0, _ramda.curry)(function (fn, key, obj) {
  return (0, _renameKeysWith["default"])((0, _ramda.when)((0, _ramda.equals)(key), fn), obj);
});
var _default = renameKeyWith;
exports["default"] = _default;

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Functional equivalent of merging object properties with object spread operator.
 *
 * @func mergeProps
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.17.0|v1.17.0}
 * @category Object
 * @sig [k] -> {k: {a}} -> {a}
 * @see {@link RA.mergePaths|mergePaths}
 * @param {!Array} ps The property names to merge
 * @param {!Object} obj The object to query
 * @return {!Object} The object composed of merged properties of obj
 * @example
 *
 * const obj = {
 *   foo: { fooInner: 1 },
 *   bar: { barInner: 2 }
 * };
 *
 * { ...obj.foo, ...obj.bar }; //=> { fooInner: 1, barInner: 2 }
 * RA.mergeProps(['foo', 'bar'], obj); //=> { fooInner: 1, barInner: 2 }
 */
var mergeProps = (0, _ramda.curryN)(2, (0, _ramda.pipe)(_ramda.props, _ramda.mergeAll));
var _default = mergeProps;
exports["default"] = _default;

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _paths = _interopRequireDefault(__webpack_require__(63));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Merge objects under corresponding paths.
 *
 * @func mergePaths
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.17.0|v1.17.0}
 * @category Object
 * @sig [[k]] -> {k: {a}} -> {a}
 * @see {@link RA.mergeProps|mergeProps}
 * @param {!Array} paths The property paths to merge
 * @param {!Object} obj The object to query
 * @return {!Object} The object composed of merged property paths of obj
 * @example
 *
 * const obj = {
 *   foo: { fooInner: { fooInner2: 1 } },
 *   bar: { barInner: 2 }
 * };
 *
 * { ...obj.foo.fooInner, ...obj.bar }; //=>  { fooInner2: 1, barInner: 2 }
 * RA.mergePaths([['foo', 'fooInner'], ['bar']], obj); //=> { fooInner2: 1, barInner: 2 }
 */
var mergePaths = (0, _ramda.curryN)(2, (0, _ramda.pipe)(_paths["default"], _ramda.mergeAll));
var _default = mergePaths;
exports["default"] = _default;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _mergePath = _interopRequireDefault(__webpack_require__(65));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Create a new object with the own properties of the object under the `p`
 * merged with the own properties of the provided `source`.
 * If a key exists in both objects, the value from the `source` object will be used.
 *
 * @func mergeProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.18.0|v1.18.0}
 * @category Object
 * @sig [k] -> {a} -> {k: {a}} -> {k: {a}}
 * @see {@link RA.mergePath|mergePath}
 * @param {!Array} p The property of the destination object
 * @param {!Object} source The source object
 * @param {!Object} obj The object that has destination object under corresponding property
 * @return {!Object} The new version of object
 * @example
 *
 * RA.mergeProp(
 *  'outer',
 *  { foo: 3, bar: 4 },
 *  { outer: { foo: 2 } }
 * ); //=> { outer: { foo: 3, bar: 4 } };
 */
var mergeProp = (0, _ramda.curry)(function (p, subj, obj) {
  return (0, _mergePath["default"])((0, _ramda.of)(p), subj, obj);
});
var _default = mergeProp;
exports["default"] = _default;

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/* eslint-disable max-len */

/**
 * Returns a partial copy of an object containing only the keys
 * that don't satisfy the supplied predicate.
 *
 * @func omitBy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.6.0|v2.6.0}
 * @category Object
 * @sig ((v, k) -> Boolean) -> {k: v} -> {k: v}
 * @param {!Function} pred A predicate to determine whether or not a key should be included on the output object
 * @param {!Object} obj The object to copy from
 * @return {!Object} A new object only with properties that don't satisfy `pred`
 *
 * @example
 *
 * const isLowerCase = (val, key) => key.toLowerCase() === key;
 * RA.omitBy(isLowerCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
 */

/* eslint-enable max-len */
var omitBy = (0, _ramda.useWith)(_ramda.pickBy, [_ramda.complement, _ramda.identity]);
var _default = omitBy;
exports["default"] = _default;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * If the given, non-null object has a value at the given path, returns the value at that path.
 * Otherwise returns the result of invoking the provided function with the object.
 *
 * @func pathOrLazy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig ({a} -> a) -> [Idx] -> {a} -> a
 * @param {Function} defaultFn The function that will return the default value.
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path` of the supplied object or the default value.
 * @example
 *
 * RA.pathOrLazy(() => 'N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
 * RA.pathOrLazy(() => 'N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
 */
var pathOrLazy = (0, _ramda.curryN)(3, function pathOrLazy(defaultFn, path, obj) {
  return (0, _ramda.when)((0, _ramda.identical)(defaultFn), (0, _ramda.partial)((0, _ramda.unary)(defaultFn), [obj]), (0, _ramda.pathOr)(defaultFn, path, obj));
});
var _default = pathOrLazy;
exports["default"] = _default;

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns a "view" of the given data structure, determined by the given lens.
 * The lens's focus determines which portion of the data structure is visible.
 * Returns the defaultValue if "view" is null, undefined or NaN; otherwise the "view" is returned.
 *
 * @func viewOr
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Object
 * @typedef Lens s b = Functor f => (b -> f b) -> s -> f s
 * @sig a -> Lens s b -> s -> b | a
 * @see {@link http://ramdajs.com/docs/#view|R.view}
 * @param {*} defaultValue The default value
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @returns {*} "view" or defaultValue
 *
 * @example
 *
 * RA.viewOr('N/A', R.lensProp('x'), {}); // => 'N/A'
 * RA.viewOr('N/A', R.lensProp('x'), { x: 1 }); // => 1
 * RA.viewOr('some', R.lensProp('y'), { y: null }); // => 'some'
 * RA.viewOr('some', R.lensProp('y'), { y: false }); // => false
 */
var viewOr = (0, _ramda.curryN)(3, function (defaultValue, lens, data) {
  return (0, _ramda.defaultTo)(defaultValue, (0, _ramda.view)(lens, data));
});
var _default = viewOr;
exports["default"] = _default;

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isObj = _interopRequireDefault(__webpack_require__(13));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns whether or not an object has an own property with the specified name at a given path.
 *
 * @func hasPath
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.14.0|v1.14.0}
 * @deprecated since v2.12.0; ramda@0.26.0 contains hasPath
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {a} -> Boolean
 * @param {Array.<string|number>} path The path of the nested property
 * @param {Object} obj The object to test
 * @return {boolean}
 * @see {@link http://ramdajs.com/docs/#has|R.has}
 * @example
 *
 * RA.hasPath(['a', 'b'], { a: { b: 1 } }); //=> true
 * RA.hasPath(['a', 'b', 'c'], { a: { b: 1 } }); //=> false
 * RA.hasPath(['a', 'b'], { a: { } }); //=> false
 * RA.hasPath([0], [1, 2]); //=> true
 */
var hasPath = (0, _ramda.curryN)(2, function (objPath, obj) {
  var prop = (0, _ramda.head)(objPath); // termination conditions

  if ((0, _ramda.length)(objPath) === 0 || !(0, _isObj["default"])(obj)) {
    return false;
  }

  if ((0, _ramda.length)(objPath) === 1) {
    return (0, _ramda.has)(prop, obj);
  }

  return hasPath((0, _ramda.tail)(objPath), (0, _ramda.path)([prop], obj)); // base case
});
var _default = hasPath;
exports["default"] = _default;

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _spreadPath = _interopRequireDefault(__webpack_require__(66));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Spreads object under property onto provided object.
 * It's like {@link RA.flattenProp|flattenProp}, but removes object under the property.
 *
 * @func spreadProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig Idx -> {k: v} -> {k: v}
 * @param {!string|number} prop The property to spread
 * @param {!Object} obj The provided object
 * @return {!Object} The result of the spread
 * @see {@link RA.spreadPath|spreadPath}, {@link RA.flattenProp|flattenProp}
 * @example
 *
 * RA.spreadProp('b', { a: 1, b: { c: 3, d: 4 } }); // => { a: 1, c: 3, d: 4 };
 */
var spreadProp = (0, _ramda.curry)(function (prop, obj) {
  return (0, _spreadPath["default"])((0, _ramda.of)(prop), obj);
});
var _default = spreadProp;
exports["default"] = _default;

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _flattenPath = _interopRequireDefault(__webpack_require__(67));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Flattens a property so that its fields are spread out into the provided object.
 * It's like {@link RA.spreadProp|spreadProp}, but preserves object under the property path.
 *
 * @func flattenProp
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|v1.19.0}
 * @category Object
 * @typedef Idx = String | Int
 * @sig [Idx] -> {k: v} -> {k: v}
 * @param {!string|number} prop The property to flatten
 * @param {!Object} obj The provided object
 * @return {!Object} The flattened object
 * @see {@link RA.flattenPath|flattenPath}, {@link RA.spreadProp|spreadProp}
 * @example
 *
 * RA.flattenProp(
 *   'b',
 *   { a: 1, b: { c: 3, d: 4 } }
 * ); // => { a: 1, c: 3, d: 4, b: { c: 3, d: 4 } };
 */
var flattenProp = (0, _ramda.curry)(function (prop, obj) {
  return (0, _flattenPath["default"])((0, _ramda.of)(prop), obj);
});
var _default = flattenProp;
exports["default"] = _default;

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _lengthEq = _interopRequireDefault(__webpack_require__(15));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Creates a new list out of the supplied object by applying the function to each key/value pairing.
 *
 * @func unzipObjWith
 * @memberOf RA
 * @category Object
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @sig  (v, k) => [k, v] -> { k: v } -> [[k], [v]]
 * @param {Function} fn The function to transform each value-key pair
 * @param {Object} obj Object to unzip
 * @return {Array} A pair of tw lists: a list of keys and a list of values
 * @see {@link https://ramdajs.com/docs/#zipObj|zipObj}, {@link RA.zipObjWith|zipObjWith}
 * @example
 *
 * RA.unzipObjWith((v, k) => [`new${k.toUpperCase()}`, 2 * v], { a: 1, b: 2, c: 3 });
 * //=> [['newA', 'newB', 'newC'], [2, 4, 6]]
 */
var unzipObjWith = (0, _ramda.curryN)(2, function (fn, obj) {
  return (0, _ramda.pipe)(_ramda.toPairs, (0, _ramda.map)((0, _ramda.pipe)(_ramda.flip, _ramda.apply)(fn)), _ramda.transpose, (0, _ramda.when)((0, _lengthEq["default"])(0), function () {
    return [[], []];
  }))(obj);
});
var _default = unzipObjWith;
exports["default"] = _default;

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Creates a new object out of a list of keys and a list of values by applying the function
 * to each equally-positioned pair in the lists.
 * Key/value pairing is truncated to the length of the shorter of the two lists.
 *
 * @func zipObjWith
 * @memberOf RA
 * @category Object
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @sig (b, a) -> [k, v] -> [a] -> [b] -> { k: v }
 * @param {Function} fn The function to transform each value-key pair
 * @param {Array} keys Array to transform into the properties on the output object
 * @param {Array} values Array to transform into the values on the output object
 * @return {Object}  The object made by pairing up and transforming same-indexed elements of `keys` and `values`.
 * @see {@link https://ramdajs.com/docs/#zipObj|zipObj}, {@link RA.unzipObjWith|unzipObjWith}
 * @example
 *
 * RA.zipObjWith((value, key) => [key, `${key}${value + 1}`]), ['a', 'b', 'c'], [1, 2, 3]);
 *  // => { a: 'a2', b: 'b3', c: 'c4' }
 */
var zipObjWith = (0, _ramda.curryN)(3, function (fn, keys, values) {
  return (0, _ramda.pipe)(_ramda.zip, (0, _ramda.map)((0, _ramda.apply)(fn)), _ramda.fromPairs)(values, keys);
});
var _default = zipObjWith;
exports["default"] = _default;

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _lensEq = _interopRequireDefault(__webpack_require__(68));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if data structure focused by the given lens doesn't equal provided value.
 *
 * @func lensNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Lens s a -> b -> s -> Boolean
 * @see {@link RA.lensEq|lensEq}
 * @param {function} lens Van Laarhoven lens
 * @param {*} value The value to compare the focused data structure with
 * @param {*} data The data structure
 * @return {boolean} `false` if the focused data structure equals value, `true` otherwise
 *
 * @example
 *
 * RA.lensNotEq(R.lensIndex(0), 1, [0, 1, 2]); // => true
 * RA.lensNotEq(R.lensIndex(1), 1, [0, 1, 2]); // => false
 * RA.lensNotEq(R.lensPath(['a', 'b']), 'foo', { a: { b: 'foo' } }) // => false
 */
var lensNotEq = (0, _ramda.complement)(_lensEq["default"]);
var _default = lensNotEq;
exports["default"] = _default;

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _lensSatisfies = _interopRequireDefault(__webpack_require__(69));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns `true` if data structure focused by the given lens doesn't satisfy the predicate.
 * Note that the predicate is expected to return boolean value.
 *
 * @func lensNotSatisfy
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.13.0|1.13.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig  Boolean b => (a -> b) -> Lens s a -> s -> b
 * @see {@link RA.lensSatisfies|lensSatisfies}
 * @param {Function} predicate The predicate function
 * @param {Function} lens Van Laarhoven lens
 * @param {*} data The data structure
 * @return {boolean} `false` if the focused data structure satisfies the predicate, `true` otherwise
 *
 * @example
 *
 * RA.lensNotSatisfy(RA.isTrue, R.lensIndex(0), [false, true, 1]); // => true
 * RA.lensNotSatisfy(RA.isTrue, R.lensIndex(1), [false, true, 1]); // => false
 * RA.lensNotSatisfy(RA.isTrue, R.lensIndex(2), [false, true, 1]); // => true
 * RA.lensNotSatisfy(R.identity, R.lensProp('x'), { x: 1 }); // => true
 */
var lensNotSatisfy = (0, _ramda.complement)(_lensSatisfies["default"]);
var _default = lensNotSatisfy;
exports["default"] = _default;

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _Identity = _interopRequireDefault(__webpack_require__(70));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Creates a [Traversable](https://github.com/fantasyland/fantasy-land#traversable) lens
 * from an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning function.
 *
 * When executed, it maps an [Applicative](https://github.com/fantasyland/fantasy-land#applicative)-returning
 * function over a [Traversable](https://github.com/fantasyland/fantasy-land#traversable),
 * then uses [`sequence`](https://ramdajs.com/docs/#sequence) to transform the resulting Traversable of Applicative
 * into an Applicative of Traversable.
 *
 * Dispatches to the `traverse` method of the third argument, if present.
 *
 * @func lensTraverse
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.7.0|2.7.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig Applicative f => (a -> f a) -> Lens s a
 * @param {!function} of The Applicative-returning function
 * @return {!function} The Traversable lens
 * @see {@link http://ramdajs.com/docs/#lens|R.lens}, {@link http://ramdajs.com/docs/#traverse|R.traverse}
 *
 * @example
 *
 * const maybeLens = RA.lensTraverse(Maybe.of);
 * const safeDiv = n => d => d === 0 ? Maybe.Nothing() : Maybe.Just(n / d)
 *
 * R.over(maybeLens, safeDiv(10), [2, 4, 5]); // => Just([5, 2.5, 2])
 * R.over(maybeLens, safeDiv(10), [2, 0, 5]); // => Nothing
 *
 * R.view(maybeLens, [Maybe.Just(2), Maybe.Just(3)]); // => Maybe.Just([2, 3])
 *
 * R.set(maybeLens, Maybe.Just(1), [Maybe.just(2), Maybe.Just(3)]); // => Maybe.Just([1, 1])
 */
var lensTraverse = (0, _ramda.curryN)(1, function (of) {
  return (0, _ramda.curry)(function (toFunctorFn, target) {
    return _Identity["default"].of((0, _ramda.traverse)(of, (0, _ramda.pipe)(toFunctorFn, (0, _ramda.prop)('value')), target));
  });
});
var _default = lensTraverse;
exports["default"] = _default;

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.ordTrait = exports.chainTrait = exports.semigroupTrait = exports.setoidTrait = exports.applyTrait = exports.functorTrait = void 0;

var _ramda = __webpack_require__(0);

var _isString = _interopRequireDefault(__webpack_require__(6));

var _isNumber = _interopRequireDefault(__webpack_require__(2));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _util = __webpack_require__(185);

var _mapping = _interopRequireDefault(__webpack_require__(31));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var functorTrait = _defineProperty({}, _mapping["default"].map, function (fn) {
  return this.constructor[_mapping["default"].of](fn(this.value));
});

exports.functorTrait = functorTrait;

var applyTrait = _defineProperty({}, _mapping["default"].ap, function (applyWithFn) {
  var _this = this;

  return applyWithFn.map(function (fn) {
    return fn(_this.value);
  });
});

exports.applyTrait = applyTrait;

var setoidTrait = _defineProperty({}, _mapping["default"].equals, function (setoid) {
  return (0, _util.isSameType)(this, setoid) && (0, _ramda.equals)(this.value, setoid.value);
});

exports.setoidTrait = setoidTrait;

var semigroupTrait = _defineProperty({}, _mapping["default"].concat, function (semigroup) {
  var concatenatedValue = this.value;

  if ((0, _isString["default"])(this.value) || (0, _isNumber["default"])(this.value)) {
    concatenatedValue = this.value + semigroup.value;
  } else if ((0, _ramda.pathSatisfies)(_isFunction["default"], ['value', _mapping["default"].concat], this)) {
    concatenatedValue = this.value[_mapping["default"].concat](semigroup.value);
  } else if ((0, _ramda.pathSatisfies)(_isFunction["default"], ['value', 'concat'], this)) {
    concatenatedValue = this.value.concat(semigroup.value);
  }

  return this.constructor[_mapping["default"].of](concatenatedValue);
});

exports.semigroupTrait = semigroupTrait;

var chainTrait = _defineProperty({}, _mapping["default"].chain, function (fn) {
  var newChain = fn(this.value);
  return (0, _util.isSameType)(this, newChain) ? newChain : this;
});

exports.chainTrait = chainTrait;

var ordTrait = _defineProperty({}, _mapping["default"].lte, function (ord) {
  return (0, _util.isSameType)(this, ord) && (this.value < ord.value || this[_mapping["default"].equals](ord));
});

exports.ordTrait = ordTrait;

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isNotSameType = exports.isSameType = exports.typeEquals = exports.type = void 0;

var _ramda = __webpack_require__(0);

// type :: Monad a => a -> String
var type = (0, _ramda.either)((0, _ramda.path)(['@@type']), (0, _ramda.path)(['constructor', '@@type'])); // typeEquals :: Monad a => String -> a -> Boolean

exports.type = type;
var typeEquals = (0, _ramda.curry)(function (typeIdent, monad) {
  return type(monad) === typeIdent;
}); // isSameType :: (Monad a, Monad b) => a -> b -> Boolean

exports.typeEquals = typeEquals;
var isSameType = (0, _ramda.curryN)(2, (0, _ramda.useWith)(_ramda.equals, [type, type])); // isNotSameType :: (Monad a, Monad b) => a -> b -> Boolean

exports.isSameType = isSameType;
var isNotSameType = (0, _ramda.complement)(isSameType);
exports.isNotSameType = isNotSameType;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

// This implementation was highly inspired by the implementations
// in ramda-lens library.
//
// https://github.com/ramda/ramda-lens
// isomorphic :: ((a -> b), (b -> a)) -> Isomorphism
//     Isomorphism = x -> y
var isomorphic = function isomorphic(to, from) {
  var isomorphism = function isomorphism(x) {
    return to(x);
  };

  isomorphism.from = from;
  return isomorphism;
}; // isomorphisms :: ((a -> b), (b -> a)) -> (a -> b)


var isomorphisms = function isomorphisms(to, from) {
  return isomorphic((0, _ramda.curry)(function (toFunctorFn, target) {
    return (0, _ramda.map)(from, toFunctorFn(to(target)));
  }), (0, _ramda.curry)(function (toFunctorFn, target) {
    return (0, _ramda.map)(to, toFunctorFn(from(target)));
  }));
}; // from :: Isomorphism -> a -> b


var from = (0, _ramda.curry)(function (isomorphism, x) {
  return isomorphism.from(x);
});
/**
 * Defines an isomorphism that will work like a lens. It takes two functions.
 * The function that converts and the function that recovers.
 *
 * @func lensIso
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/1.19.0|1.19.0}
 * @category Relation
 * @typedef Lens s a = Functor f => (a -> f a) -> s -> f s
 * @sig (s -> a) -> (a -> s) -> Lens s a
 * @param {!function} to The function that converts
 * @param {!function} from The function that recovers
 * @return {!function} The isomorphic lens
 * @see {@link http://ramdajs.com/docs/#lens|R.lens}
 *
 * @example
 *
 * const lensJSON = RA.lensIso(JSON.parse, JSON.stringify);
 *
 * R.over(lensJSON, assoc('b', 2), '{"a":1}'); //=> '{"a":1,"b":2}'
 * R.over(RA.lensIso.from(lensJSON), R.replace('}', ',"b":2}'), { a: 1 }); // => { a: 1, b: 2 }
 */

var lensIso = (0, _ramda.curry)(isomorphisms);
lensIso.from = from;
var _default = lensIso;
exports["default"] = _default;

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns true if the specified object property is not equal,
 * in R.equals terms, to the given value; false otherwise.
 *
 * @func propNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Relation
 * @sig  String -> a -> Object -> Boolean
 * @param {String} name The property to pick
 * @param {a} val The value to compare to
 * @param {Object} object The object, that presumably contains value under the property
 * @return {boolean} Comparison result
 * @see {@link http://ramdajs.com/docs/#propEq|R.propEq}
 * @example
 *
 * const abby = { name: 'Abby', age: 7, hair: 'blond' };
 * const fred = { name: 'Fred', age: 12, hair: 'brown' };
 * const rusty = { name: 'Rusty', age: 10, hair: 'brown' };
 * const alois = { name: 'Alois', age: 15, disposition: 'surly' };
 * const kids = [abby, fred, rusty, alois];
 * const hasNotBrownHair = RA.propNotEq('hair', 'brown');
 *
 * R.filter(hasNotBrownHair, kids); //=> [abby, alois]
 */
var propNotEq = (0, _ramda.complement)(_ramda.propEq);
var _default = propNotEq;
exports["default"] = _default;

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/* eslint-disable max-len */

/**
 * Determines whether a nested path on an object doesn't have a specific value,
 * in R.equals terms. Most likely used to filter a list.
 *
 * @func pathNotEq
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Relation
 * @sig [Idx] => a => {a} => Boolean
 * @sig Idx = String | Int
 * @param {Array} path The path of the nested property to use
 * @param {a} val The value to compare the nested property with
 * @param {Object} object The object to check the nested property in
 * @return {boolean} Returns Boolean `false` if the value equals the nested object property, `true` otherwise
 * @see {@link http://ramdajs.com/docs/#pathEq|R.pathEq}
 * @example
 *
 * const user1 = { address: { zipCode: 90210 } };
 * const user2 = { address: { zipCode: 55555 } };
 * const user3 = { name: 'Bob' };
 * const users = [ user1, user2, user3 ];
 * const isFamous = R.pathNotEq(['address', 'zipCode'], 90210);
 * R.filter(isFamous, users); //=> [ user2, user3 ]
 */

/* eslint-enable max-len */
var pathNotEq = (0, _ramda.complement)(_ramda.pathEq);
var _default = pathNotEq;
exports["default"] = _default;

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var inRangeImp = (0, _ramda.ifElse)(_ramda.gte, function () {
  throw new Error('low must not be greater than high in inRange(low, high, value)');
}, (0, _ramda.useWith)(_ramda.both, [_ramda.lte, _ramda.gt]));
/**
 * Checks if `value` is between `low` and up to but not including `high`.
 *
 * @func inRange
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.7.0|v2.7.0}
 * @category Relation
 * @sig Number -> Number -> Number -> Boolean
 * @param {number} low Start of the range
 * @param {number} high The end of the range
 * @param {number} value The value to test
 * @return {boolean}
 * @throws {Error} When `low` is greater than or equal to `high`
 * @example
 *
 * RA.inRange(0, 5, 3); //=> true
 * RA.inRange(0, 5, 0); //=> true
 * RA.inRange(0, 5, 4); //=> true
 * RA.inRange(0, 5, 5); //=> false
 * RA.inRange(0, 5, -1); //=> false
 */

var _default = (0, _ramda.curry)(function (low, high, value) {
  return inRangeImp(low, high)(value);
});

exports["default"] = _default;

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns `true` if its arguments are not equivalent, `false` otherwise. Handles
 * cyclical data structures.
 *
 * Dispatches symmetrically to the `equals` methods of both arguments, if
 * present.
 *
 * @func notEqual
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.29.0|v2.29.0}
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @see {@link https://ramdajs.com/docs/#equals|equals}
 * @example
 *
 * RA.notEqual(1, 1); //=> false
 * RA.notEqual(1, '1'); //=> true
 * RA.notEqual([1, 2, 3], [1, 2, 3]); //=> false
 *
 * const a = {}; a.v = a;
 * const b = {}; b.v = b;
 * RA.notEqual(a, b); //=> false
 */
var notEqual = (0, _ramda.complement)(_ramda.equals);
var _default = notEqual;
exports["default"] = _default;

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/* eslint-disable max-len */

/**
 * A function which calls the two provided functions and returns the complement of `&&`ing the
 * results.
 * It returns true if the first function is false-y and the complement of the second function
 * otherwise. Note that this is short-circuited, meaning that the second function will not be
 * invoked if the first returns a false-y value. In short it will return true unless both predicates
 * return true.
 *
 * In addition to functions, `RA.notBoth` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func notBoth
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} Returns a function that applies its arguments to `f` and `g` and returns the complement of `&&`ing their outputs together.
 * @see {@link http://ramdajs.com/docs/#both|R.both}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.notBoth(gt10, even);
 *
 * f(12); //=> false
 * f(8); //=> true
 * f(11); //=> true
 * f(9); //=> true
 */

/* eslint-enable max-len */
var notBoth = (0, _ramda.curry)((0, _ramda.compose)(_ramda.complement, _ramda.both));
var _default = notBoth;
exports["default"] = _default;

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns false if both arguments are truthy; true otherwise.
 *
 * @func nand
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.19.0|v2.19.0}
 * @category Logic
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean} false if both arguments are truesy
 * @example
 *
 * RA.nand(true, true); //=> false
 * RA.nand(false, true); //=> true
 * RA.nand(true, false); //=> true
 * RA.nand(false, false); //=> true
 * RA.nand(1.0, 1.0); //=> false
 * RA.nand(1.0, 0); //=> true
 * RA.nand(0, 1.0); //=> true
 * RA.nand(0, 0); //=> true
 */
var nand = (0, _ramda.complement)(_ramda.and); // eslint-disable-line ramda/complement-simplification

var _default = nand;
exports["default"] = _default;

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/* eslint-disable max-len */

/**
 * A function which calls the two provided functions and returns the complement of `||`ing the
 * results.
 * It returns false if the first function is truth-y and the complement of the second function
 * otherwise. Note that this is short-circuited, meaning that the second function will not be
 * invoked if the first returns a truth-y value. In short it will return true if neither predicate
 * returns true.
 *
 * In addition to functions, `RA.neither` also accepts any fantasy-land compatible
 * applicative functor.
 *
 * @func neither
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.3.0|v2.3.0}
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f A predicate
 * @param {Function} g Another predicate
 * @return {Function} Returns a function that applies its arguments to `f` and `g` and returns the complement of `||`ing their outputs together.
 * @see {@link http://ramdajs.com/docs/#either|R.either}, {@link http://ramdajs.com/docs/#or|R.or}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.neither(gt10, even);
 *
 * f(12); //=> false
 * f(8); //=> false
 * f(11); //=> false
 * f(9); //=> true
 */

/* eslint-enable max-len */
var neither = (0, _ramda.curry)((0, _ramda.compose)(_ramda.complement, _ramda.either));
var _default = neither;
exports["default"] = _default;

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns true if both arguments are falsy; false otherwise.
 *
 * @func nor
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.20.0|v2.20.0}
 * @category Logic
 * @sig a -> b -> a ⊽ b
 * @param {*} a
 * @param {*} b
 * @return {boolean} true if both arguments are falsy
 * @see {@link RA.neither|neither}
 * @example
 *
 * RA.nor(true, true); //=> false
 * RA.nor(false, true); //=> false
 * RA.nor(true, false); //=> false
 * RA.nor(false, false); //=> true
 * RA.nor(1, 1); //=> false
 * RA.nor(1, 0); //=> false
 * RA.nor(0, 1); //=> false
 * RA.nor(0, 0); //=> true
 */
var nor = (0, _ramda.complement)(_ramda.or); // eslint-disable-line ramda/complement-simplification

var _default = nor;
exports["default"] = _default;

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Takes a list of predicates and returns a predicate that returns true for a given list of
 * arguments if one or more of the provided predicates is not satisfied by those arguments. It is
 * the complement of Ramda's allPass.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func notAllPass
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.4.0|v2.4.0}
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see {@link http://ramdajs.com/docs/#allPass|R.allPass}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.notAllPass([gt10, even]);
 *
 * f(12); //=> false
 * f(8); //=> true
 * f(11); //=> true
 * f(9); //=> true
 */
var notAllPass = (0, _ramda.curry)((0, _ramda.compose)(_ramda.complement, _ramda.allPass));
var _default = notAllPass;
exports["default"] = _default;

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Takes a list of predicates and returns a predicate that returns true for a given list of
 * arguments if none of the provided predicates are satisfied by those arguments. It is the
 * complement of Ramda's anyPass.
 *
 * The function returned is a curried function whose arity matches that of the
 * highest-arity predicate.
 *
 * @func nonePass
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.5.0|v2.5.0}
 * @category Logic
 * @sig [(*... -> Boolean)] -> (*... -> Boolean)
 * @param {Array} predicates An array of predicates to check
 * @return {Function} The combined predicate
 * @see {@link http://ramdajs.com/docs/#anyPass|R.anyPass}
 * @example
 *
 * const gt10 = R.gt(R.__, 10)
 * const even = (x) => x % 2 === 0;
 * const f = RA.nonePass([gt10, even]);
 *
 * f(12); //=> false
 * f(8); //=> false
 * f(11); //=> false
 * f(9); //=> true
 */
var nonePass = (0, _ramda.curryN)(1, (0, _ramda.compose)(_ramda.complement, _ramda.anyPass));
var _default = nonePass;
exports["default"] = _default;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _list = _interopRequireDefault(__webpack_require__(61));

var _isTruthy = _interopRequireDefault(__webpack_require__(29));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Takes a combining predicate and a list of functions and returns a function which will map the
 * arguments it receives to the list of functions and returns the result of passing the values
 * returned from each function to the combining predicate. A combining predicate is a function that
 * combines a list of Boolean values into a single Boolean value, such as `R.any` or `R.all`. It
 * will test each value using `RA.isTruthy`, meaning the functions don't necessarily have to be
 * predicates.
 *
 * The function returned is curried to the number of functions supplied, and if called with more
 * arguments than functions, any remaining arguments are passed in to the combining predicate
 * untouched.
 *
 * @func argsPass
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.7.0|v2.7.0}
 * @category Logic
 * @sig ((* -> Boolean) -> [*] -> Boolean) -> [(* -> Boolean), ...] -> (*...) -> Boolean
 * @param {Function} combiningPredicate The predicate used to combine the values returned from the
 * list of functions
 * @param {Array} functions List of functions
 * @return {boolean} Returns the combined result of mapping arguments to functions
 * @example
 *
 * RA.argsPass(R.all, [RA.isArray, RA.isBoolean, RA.isString])([], false, 'abc') //=> true
 * RA.argsPass(R.all, [RA.isArray, RA.isBoolean, RA.isString])([], false, 1) //=> false
 * RA.argsPass(R.any, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, 'abc') //=> true
 * RA.argsPass(R.any, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, false) //=> false
 * RA.argsPass(R.none, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, false) //=> true
 * RA.argsPass(R.none, [RA.isArray, RA.isBoolean, RA.isString])({}, 1, 'abc') //=> false
 */
var argsPass = (0, _ramda.curry)(function (combiningPredicate, predicates) {
  return (0, _ramda.useWith)((0, _ramda.compose)(combiningPredicate(_isTruthy["default"]), _list["default"]), predicates);
});
var _default = argsPass;
exports["default"] = _default;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Accepts a function with any arity and returns a function with arity of zero.
 * The returned function ignores any arguments supplied to it.
 *
 * @func dropArgs
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.10.0|v2.10.0}
 * @category Logic
 * @sig (...a -> b)-> () -> b
 * @param {Function} fn The function with any arity
 * @return {Function} Returns function with arity of zero
 * @see {@link http://ramdajs.com/docs/#nAry|R.nAry}
 * @example
 *
 * const fn = (a = 1, b = 2) => a + b;
 *
 * RA.dropArgs(fn)('ignore1', 'ignore2'); //=> 3
 */
var dropArgs = (0, _ramda.nAry)(0);
var _default = dropArgs;
exports["default"] = _default;

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns the value of a number rounded to the nearest integer.
 *
 * @func round
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number The number to round
 * @return {number} The value of the given number rounded to the nearest integer
 * @example
 *
 * RA.round(0.9); //=> 1
 * RA.round(5.95); //=> 6
 * RA.round(5.5); //=> 6
 * RA.round(5.05); //=> 5
 * RA.round(-5.05); //=> -5
 * RA.round(-5.5); //=> -5
 * RA.round(-5.95); //=> -6
 */
var round = (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.round, Math));
var _default = round;
exports["default"] = _default;

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns the smallest integer greater than or equal to a given number.
 *
 * Note: ceil(null) returns integer 0 and does not give a NaN error.
 *
 * @func ceil
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number The number to ceil
 * @return {number} The smallest integer greater than or equal to the given number
 * @example
 *
 * RA.ceil(.95); //=> 1
 * RA.ceil(4); //=> 4
 * RA.ceil(7.004); //=> 8
 * RA.ceil(-0.95); //=> -0
 * RA.ceil(-4); //=> -4
 * RA.ceil(-7.004); //=> -7
 * RA.ceil(null); //=> 0
 */
var ceil = (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.ceil, Math));
var _default = ceil;
exports["default"] = _default;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Divides two numbers, where the second number is divided by the first number.
 *
 * @func divideNum
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Math
 * @sig Number -> Number -> Number
 * @param {number} divisor the number to divide by
 * @param {number} dividend the number to divide
 * @return {number} A number representing the quotient of dividing the dividend by the divisor
 * @example
 *
 * RA.divideNum(2, 1); //=> 0.5
 */
var divideNum = (0, _ramda.flip)(_ramda.divide);
var _default = divideNum;
exports["default"] = _default;

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Returns the largest integer less than or equal to a given number.
 *
 * Note: floor(null) returns integer 0 and do not give a NaN error.
 *
 * @func floor
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number The number to floor
 * @return {number} A number representing the largest integer less than or equal to the specified number
 * @example
 *
 * RA.floor(45.95); //=> 45
 * RA.floor(45.05); //=> 45
 * RA.floor(4); //=> 4
 * RA.floor(-45.05); //=> -46
 * RA.floor(-45.95); //=> -46
 * RA.floor(null); //=> 0
 */
var floor = (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.floor, Math));
var _default = floor;
exports["default"] = _default;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.truncPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _Math = _interopRequireDefault(__webpack_require__(204));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var truncPonyfill = (0, _ramda.curryN)(1, _Math["default"]);
/**
 * Returns the integer part of a number by removing any fractional digits.
 *
 * @func trunc
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number | String -> Number
 * @param {number|string} number The number to trunc
 * @return {number} The integer part of the given number
 * @example
 *
 * RA.trunc(13.37); //=> 13
 * RA.trunc(42.84); //=> 42
 * RA.trunc(0.123); //=>  0
 * RA.trunc(-0.123); //=> -0
 * RA.trunc('-1.123'); //=> -1
 * RA.trunc(NaN); //=> NaN
 * RA.trunc('foo'); //=> NaN
 */

exports.truncPonyfill = truncPonyfill;
var trunc = (0, _isFunction["default"])(Math.trunc) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.trunc, Math)) : truncPonyfill;
var _default = trunc;
exports["default"] = _default;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _isFinite = _interopRequireDefault(__webpack_require__(10));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var truncPonyfill = function truncPonyfill(v) {
  var numV = Number(v);

  if (!(0, _isFinite["default"])(numV)) {
    return numV;
  } // eslint-disable-next-line no-nested-ternary


  return numV - numV % 1 || (numV < 0 ? -0 : numV === 0 ? numV : 0);
};

var _default = truncPonyfill;
exports["default"] = _default;

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.signPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _Math = _interopRequireDefault(__webpack_require__(206));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var signPonyfill = (0, _ramda.curryN)(1, _Math["default"]);
/**
 * Returns the sign of a number, indicating whether the number is positive, negative or zero.
 *
 * @func sign
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.15.0|v2.15.0}
 * @category Math
 * @sig Number | String -> Number
 * @param {number} number A number
 * @return {number} A number representing the sign of the given argument. If the argument is a positive number, negative number, positive zero or negative zero, the function will return 1, -1, 0 or -0 respectively. Otherwise, NaN is returned
 * @example
 *
 * RA.sign(3); //  1
 * RA.sign(-3); // -1
 * RA.sign('-3'); // -1
 * RA.sign(0); //  0
 * RA.sign(-0); // -0
 * RA.sign(NaN); // NaN
 * RA.sign('foo'); // NaN
 */

exports.signPonyfill = signPonyfill;
var sign = (0, _isFunction["default"])(Math.sign) ? (0, _ramda.curryN)(1, (0, _ramda.bind)(Math.sign, Math)) : signPonyfill;
var _default = sign;
exports["default"] = _default;

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var signPonyfill = function signPonyfill(number) {
  return (number > 0) - (number < 0) || +number;
};

var _default = signPonyfill;
exports["default"] = _default;

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Subtracts its first argument from its second argument.
 *
 * @func subtractNum
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category Math
 * @sig Number -> Number -> Number
 * @param {number} subtrahend the number to subtract
 * @param {number} minuend the number to subtract from
 * @return {number} A number representing the difference of subtracting the subtrahend from the minuend
 * @example
 *
 * RA.subtractNum(3, 5); //=> 2
 */
var subtractNum = (0, _ramda.flip)(_ramda.subtract);
var _default = subtractNum;
exports["default"] = _default;

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Converts double-precision 64-bit binary format IEEE 754 to signed 32 bit integer number.
 *
 * @func toInteger32
 * @aliases toInt32
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.28.0|v2.28.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} number A number
 * @return {number} A signed 32-bit integer number
 * @see {@link RA.toUInteger32|toUInteger32}, {@link http://speakingjs.com/es5/ch11.html#integers_via_bitwise_operators}
 * @example
 *
 * RA.toInteger32(2 ** 35); // => 0
 * RA.toInteger32(2 ** 30); // => 1073741824
 */
// eslint-disable-next-line no-bitwise
var toInteger32 = (0, _ramda.curryN)(1, function (val) {
  return val >> 0;
});
var _default = toInteger32;
exports["default"] = _default;

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

/**
 * Converts double-precision 64-bit binary format IEEE 754 to unsigned 32 bit integer number.
 *
 * @func toUinteger32
 * @aliases toUint32
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.28.0|v2.28.0}
 * @category Math
 * @sig Number -> Number
 * @param {number} val Value to be converted.
 * @return {number}
 * @see {@link RA.toInteger32|toInteger32}, {@link http://speakingjs.com/es5/ch11.html#integers_via_bitwise_operators}
 * @example
 *
 * RA.toUinteger32(1.5); //=> 1
 * RA.toInteger32(2 ** 35); // => 0
 * RA.toInteger32(2 ** 31); // => 2147483648
 * RA.toInteger32(2 ** 30); // => 1073741824
 */
// eslint-disable-next-line no-bitwise
var toUinteger32 = (0, _ramda.curryN)(1, function (val) {
  return val >>> 0;
});
var _default = toUinteger32;
exports["default"] = _default;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.replaceAllInvoker = exports.replaceAllPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _String = _interopRequireDefault(__webpack_require__(211));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var replaceAllPonyfill = (0, _ramda.curryN)(3, _String["default"]);
exports.replaceAllPonyfill = replaceAllPonyfill;
var replaceAllInvoker = (0, _ramda.invoker)(2, 'replaceAll');
/**
 * Replaces all substring matches in a string with a replacement.
 *
 * @func replaceAll
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.17.0|v2.17.0}
 * @category String
 * @sig String -> String -> String -> String
 * @param {string} searchValue The substring or a global RegExp to match
 * @param {string} replaceValue The string to replace the matches with
 * @param {string} str The String to do the search and replacement in
 * @return {string} A new string containing all the `searchValue` replaced with the `replaceValue`
 * @throws {TypeError} When invalid arguments provided
 * @see {@link http://ramdajs.com/docs/#replace|R.replace}, {@link https://github.com/tc39/proposal-string-replaceall|TC39 proposal}
 * @example
 *
 * RA.replaceAll('ac', 'ef', 'ac ab ac ab'); //=> 'ef ab ef ab'
 * RA.replaceAll('', '_', 'xxx'); //=> '_x_x_x_'
 * RA.replaceAll(/x/g, 'v', 'xxx'); //=> 'vvv'
 * RA.replaceAll(/x/, 'v', 'xxx'); //=> TypeError
 */

exports.replaceAllInvoker = replaceAllInvoker;
var replaceAll = (0, _isFunction["default"])(String.prototype.replaceAll) ? replaceAllInvoker : replaceAllPonyfill;
var _default = replaceAll;
exports["default"] = _default;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _isRegExp = _interopRequireDefault(__webpack_require__(30));

var _escapeRegExp = _interopRequireDefault(__webpack_require__(71));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var checkArguments = function checkArguments(searchValue, replaceValue, str) {
  if (str == null || searchValue == null || replaceValue == null) {
    throw TypeError('Input values must not be `null` or `undefined`');
  }
};

var checkValue = function checkValue(value, valueName) {
  if (typeof value !== 'string') {
    if (!(value instanceof String)) {
      throw TypeError("`".concat(valueName, "` must be a string"));
    }
  }
};

var checkSearchValue = function checkSearchValue(searchValue) {
  if (typeof searchValue !== 'string' && !(searchValue instanceof String) && !(searchValue instanceof RegExp)) {
    throw TypeError('`searchValue` must be a string or an regexp');
  }
};

var replaceAll = function replaceAll(searchValue, replaceValue, str) {
  checkArguments(searchValue, replaceValue, str);
  checkValue(str, 'str');
  checkValue(replaceValue, 'replaceValue');
  checkSearchValue(searchValue);
  var regexp = new RegExp((0, _isRegExp["default"])(searchValue) ? searchValue : (0, _escapeRegExp["default"])(searchValue), 'g');
  return (0, _ramda.replace)(regexp, replaceValue, str);
};

var _default = replaceAll;
exports["default"] = _default;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.trimStartInvoker = exports.trimStartPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _String = _interopRequireDefault(__webpack_require__(213));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var trimStartPonyfill = _String["default"];
exports.trimStartPonyfill = trimStartPonyfill;
var trimStartInvoker = (0, _ramda.invoker)(0, 'trimStart');
/**
 * Removes whitespace from the beginning of a string.
 *
 * @func trimStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> String
 * @param {string} value String value to have the whitespace removed from the beginning
 * @return {string} A new string representing the calling string stripped of whitespace from its beginning (left end).
 * @example
 *
 * RA.trimStart('  abc'); //=> 'abc'
 */

exports.trimStartInvoker = trimStartInvoker;
var trimStart = (0, _isFunction["default"])(String.prototype.trimStart) ? trimStartInvoker : trimStartPonyfill;
var _default = trimStart;
exports["default"] = _default;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var trimStart = (0, _ramda.replace)(/^[\s\uFEFF\xA0]+/, '');
var _default = trimStart;
exports["default"] = _default;

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = exports.trimEndInvoker = exports.trimEndPonyfill = void 0;

var _ramda = __webpack_require__(0);

var _String = _interopRequireDefault(__webpack_require__(215));

var _isFunction = _interopRequireDefault(__webpack_require__(1));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var trimEndPonyfill = _String["default"];
exports.trimEndPonyfill = trimEndPonyfill;
var trimEndInvoker = (0, _ramda.invoker)(0, 'trimEnd');
/**
 * Removes whitespace from the end of a string.
 *
 * @func trimEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig String -> String
 * @param {string} value String value to have the whitespace removed from the end
 * @return {string} A new string representing the calling string stripped of whitespace from its end (right end).
 * @see {@link RA.trimEnd|trimEnd}
 * @example
 *
 * RA.trimEnd('abc   '); //=> 'abc'
 */

exports.trimEndInvoker = trimEndInvoker;
var trimEnd = (0, _isFunction["default"])(String.prototype.trimEnd) ? trimEndInvoker : trimEndPonyfill;
var _default = trimEnd;
exports["default"] = _default;

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var trimStart = (0, _ramda.replace)(/[\s\uFEFF\xA0]+$/, '');
var _default = trimStart;
exports["default"] = _default;

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _contained = _interopRequireDefault(__webpack_require__(32));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Removes specified characters from the end of a string.
 *
 * @func trimCharsEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.25.0|v2.25.0}
 * @category String
 * @sig String -> String
 * @param {string} chars The characters to trim
 * @param {string} value The string to trim
 * @return {string} Returns the trimmed string.
 * @example
 *
 * RA.trimCharsEnd('_-', '-_-abc-_-'); //=> '-_-abc'
 */
var trimCharsEnd = (0, _ramda.curry)(function (chars, value) {
  return (0, _ramda.pipe)((0, _ramda.split)(''), (0, _ramda.dropLastWhile)((0, _contained["default"])(chars)), (0, _ramda.join)(''))(value);
});
var _default = trimCharsEnd;
exports["default"] = _default;

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _ramda = __webpack_require__(0);

var _contained = _interopRequireDefault(__webpack_require__(32));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Removes specified characters from the beginning of a string.
 *
 * @func trimCharsStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.24.0|v2.24.0}
 * @category String
 * @sig String -> String
 * @param {string} chars The characters to trim
 * @param {string} value The string to trim
 * @return {string} Returns the trimmed string.
 * @example
 *
 * RA.trimCharsStart('_-', '-_-abc-_-'); //=> 'abc-_-'
 */
var trimCharsStart = (0, _ramda.curry)(function (chars, value) {
  return (0, _ramda.pipe)((0, _ramda.split)(''), (0, _ramda.dropWhile)((0, _contained["default"])(chars)), (0, _ramda.join)(''))(value);
});
var _default = trimCharsStart;
exports["default"] = _default;

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _isNotUndefined = _interopRequireDefault(__webpack_require__(11));

var _String = _interopRequireDefault(__webpack_require__(34));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var padStartPonyfill = function padStartPonyfill(padString, targetLength, value) {
  // eslint-disable-next-line no-bitwise
  var finalLength = targetLength >> 0; // truncate if number, or convert non-number to 0;

  var finalPadString = String((0, _isNotUndefined["default"])(padString) ? padString : ' '); // return the original string, if targeted length is less than original strings length

  if (value.length >= finalLength) {
    return String(value);
  }

  finalLength -= value.length;

  if (finalLength > finalPadString.length) {
    var lenghtToPad = finalLength / finalPadString.length; // append to original to ensure we are longer than needed

    finalPadString += (0, _isFunction["default"])(String.prototype.repeat) ? finalPadString.repeat(lenghtToPad) : (0, _String["default"])(finalPadString, lenghtToPad);
  }

  return finalPadString.slice(0, finalLength) + String(value);
};

var _default = padStartPonyfill;
exports["default"] = _default;

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _isFunction = _interopRequireDefault(__webpack_require__(1));

var _isNotUndefined = _interopRequireDefault(__webpack_require__(11));

var _String = _interopRequireDefault(__webpack_require__(34));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var padEndPonyfill = function padEndPonyfill(padString, targetLength, value) {
  // eslint-disable-next-line no-bitwise
  var finalLength = targetLength >> 0;
  var finalPadString = String((0, _isNotUndefined["default"])(padString) ? padString : ' ');

  if (value.length > finalLength) {
    return String(value);
  }

  finalLength -= value.length;

  if (finalLength > finalPadString.length) {
    var remainingLength = finalLength / finalPadString.length;
    finalPadString += (0, _isFunction["default"])(String.prototype.repeat) ? finalPadString.repeat(remainingLength) : (0, _String["default"])(finalPadString, remainingLength);
  }

  return String(value) + finalPadString.slice(0, finalLength);
};

var _default = padEndPonyfill;
exports["default"] = _default;

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _padCharsEnd = _interopRequireDefault(__webpack_require__(73));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * The function pads the current string with an empty string
 * so that the resulting string reaches a given length.
 * The padding is applied from the end of the current string.
 *
 * @func padEnd
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.22.0|v2.22.0}
 * @category String
 * @sig Number -> String -> String
 * @param {number} targetLength The length of the resulting string once
 * the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the pad string
 * applied at the end of the current string
 * @see {@link RA.padCharsEnd|padCharsEnd}, {@link RA.padCharsStart|padCharsStart}, {@link RA.padStart|padStart}
 * @example
 *
 * RA.padEnd(3, 'a'); // => 'a  '
 */
var padEnd = (0, _padCharsEnd["default"])(' ');
var _default = padEnd;
exports["default"] = _default;

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports["default"] = void 0;

var _padCharsStart = _interopRequireDefault(__webpack_require__(72));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Pads string on the left side if it's shorter than length.
 *
 * @func padStart
 * @memberOf RA
 * @since {@link https://char0n.github.io/ramda-adjunct/2.25.0|v2.25.0}
 * @category String
 * @sig Number -> String -> String
 * @param {number} targetLength The length of the resulting string once
 * the current string has been padded
 * @param {string} value String value to be padded
 * @return {string} A new string of the specified length with the empty string
 * applied to the beginning of the current string
 * @see {@link RA.padCharsEnd|padCharsEnd}, {@link RA.padCharsStart|padCharsStart}, {@link RA.padEnd|padEnd}
 * @example
 *
 * RA.padStart(3, 'a'); // => '  a'
 */
var padStart = (0, _padCharsStart["default"])(' ');
var _default = padStart;
exports["default"] = _default;

/***/ })
/******/ ]);
});