/**
 * vue-markdown v2.1.1
 * https://github.com/miaolz123/vue-markdown
 * MIT License
 */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/core-js/get-iterator"), require("markdown-it"), require("markdown-it-emoji"), require("markdown-it-sub"), require("markdown-it-sup"), require("markdown-it-footnote"), require("markdown-it-deflist"), require("markdown-it-abbr"), require("markdown-it-ins"), require("markdown-it-mark"), require("markdown-it-toc-and-anchor"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-runtime/core-js/get-iterator", "markdown-it", "markdown-it-emoji", "markdown-it-sub", "markdown-it-sup", "markdown-it-footnote", "markdown-it-deflist", "markdown-it-abbr", "markdown-it-ins", "markdown-it-mark", "markdown-it-toc-and-anchor"], factory);
	else if(typeof exports === 'object')
		exports["VueMarkdown"] = factory(require("babel-runtime/core-js/get-iterator"), require("markdown-it"), require("markdown-it-emoji"), require("markdown-it-sub"), require("markdown-it-sup"), require("markdown-it-footnote"), require("markdown-it-deflist"), require("markdown-it-abbr"), require("markdown-it-ins"), require("markdown-it-mark"), require("markdown-it-toc-and-anchor"));
	else
		root["VueMarkdown"] = factory(root["babel-runtime/core-js/get-iterator"], root["markdown-it"], root["markdown-it-emoji"], root["markdown-it-sub"], root["markdown-it-sup"], root["markdown-it-footnote"], root["markdown-it-deflist"], root["markdown-it-abbr"], root["markdown-it-ins"], root["markdown-it-mark"], root["markdown-it-toc-and-anchor"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getIterator2 = __webpack_require__(1);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _markdownIt = __webpack_require__(2);

	var _markdownIt2 = _interopRequireDefault(_markdownIt);

	var _markdownItEmoji = __webpack_require__(3);

	var _markdownItEmoji2 = _interopRequireDefault(_markdownItEmoji);

	var _markdownItSub = __webpack_require__(4);

	var _markdownItSub2 = _interopRequireDefault(_markdownItSub);

	var _markdownItSup = __webpack_require__(5);

	var _markdownItSup2 = _interopRequireDefault(_markdownItSup);

	var _markdownItFootnote = __webpack_require__(6);

	var _markdownItFootnote2 = _interopRequireDefault(_markdownItFootnote);

	var _markdownItDeflist = __webpack_require__(7);

	var _markdownItDeflist2 = _interopRequireDefault(_markdownItDeflist);

	var _markdownItAbbr = __webpack_require__(8);

	var _markdownItAbbr2 = _interopRequireDefault(_markdownItAbbr);

	var _markdownItIns = __webpack_require__(9);

	var _markdownItIns2 = _interopRequireDefault(_markdownItIns);

	var _markdownItMark = __webpack_require__(10);

	var _markdownItMark2 = _interopRequireDefault(_markdownItMark);

	var _markdownItTocAndAnchor = __webpack_require__(11);

	var _markdownItTocAndAnchor2 = _interopRequireDefault(_markdownItTocAndAnchor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  md: new _markdownIt2.default(),

	  template: '<div><slot></slot></div>',

	  data: function data() {
	    return {
	      sourceData: this.source
	    };
	  },


	  props: {
	    watches: {
	      type: Array,
	      default: function _default() {
	        return ['source', 'show', 'toc'];
	      }
	    },
	    source: {
	      type: String,
	      default: ''
	    },
	    show: {
	      type: Boolean,
	      default: true
	    },
	    html: {
	      type: Boolean,
	      default: true
	    },
	    xhtmlOut: {
	      type: Boolean,
	      default: true
	    },
	    breaks: {
	      type: Boolean,
	      default: true
	    },
	    linkify: {
	      type: Boolean,
	      default: true
	    },
	    emoji: {
	      type: Boolean,
	      default: true
	    },
	    typographer: {
	      type: Boolean,
	      default: true
	    },
	    langPrefix: {
	      type: String,
	      default: 'language-'
	    },
	    quotes: {
	      type: String,
	      default: '“”‘’'
	    },
	    tableClass: {
	      type: String,
	      default: 'table'
	    },
	    toc: {
	      type: Boolean,
	      default: false
	    },
	    tocId: {
	      type: String
	    },
	    tocClass: {
	      type: String,
	      default: 'table-of-contents'
	    },
	    tocFirstLevel: {
	      type: Number,
	      default: 2
	    },
	    tocLastLevel: {
	      type: Number
	    },
	    tocAnchorLink: {
	      type: Boolean,
	      default: true
	    },
	    tocAnchorClass: {
	      type: String,
	      default: 'toc-anchor'
	    },
	    tocAnchorLinkSymbol: {
	      type: String,
	      default: '#'
	    },
	    tocAnchorLinkSpace: {
	      type: Boolean,
	      default: true
	    },
	    tocAnchorLinkClass: {
	      type: String,
	      default: 'toc-anchor-link'
	    }
	  },

	  computed: {
	    tocLastLevelComputed: function tocLastLevelComputed() {
	      return this.tocLastLevel > this.tocFirstLevel ? this.tocLastLevel : this.tocFirstLevel + 1;
	    }
	  },

	  render: function render(createElement) {
	    var _this = this;

	    this.md = new _markdownIt2.default().use(_markdownItSub2.default).use(_markdownItSup2.default).use(_markdownItFootnote2.default).use(_markdownItDeflist2.default).use(_markdownItAbbr2.default).use(_markdownItIns2.default).use(_markdownItMark2.default);

	    if (this.emoji) {
	      this.md.use(_markdownItEmoji2.default);
	    }

	    this.md.set({
	      html: this.html,
	      xhtmlOut: this.xhtmlOut,
	      breaks: this.breaks,
	      linkify: this.linkify,
	      typographer: this.typographer,
	      langPrefix: this.langPrefix,
	      quotes: this.quotes
	    });
	    this.md.renderer.rules.table_open = function () {
	      return '<table class="' + _this.tableClass + '">\n';
	    };

	    if (this.toc) {
	      this.md.use(_markdownItTocAndAnchor2.default, {
	        tocClassName: this.tocClass,
	        tocFirstLevel: this.tocFirstLevel,
	        tocLastLevel: this.tocLastLevelComputed,
	        anchorLink: this.tocAnchorLink,
	        anchorLinkSymbol: this.tocAnchorLinkSymbol,
	        anchorLinkSpace: this.tocAnchorLinkSpace,
	        anchorClassName: this.tocAnchorClass,
	        anchorLinkSymbolClassName: this.tocAnchorLinkClass,
	        tocCallback: function tocCallback(tocMarkdown, tocArray, tocHtml) {
	          if (tocHtml) {
	            if (_this.tocId && document.getElementById(_this.tocId)) {
	              document.getElementById(_this.tocId).innerHTML = tocHtml;
	            }

	            _this.$emit('toc-rendered', tocHtml);
	          }
	        }
	      });
	    }

	    var outHtml = this.show ? this.md.render(this.sourceData) : '';

	    this.$emit('rendered', outHtml);
	    return createElement('div', {
	      domProps: {
	        innerHTML: outHtml
	      }
	    });
	  },
	  beforeMount: function beforeMount() {
	    var _this2 = this;

	    if (this.$slots.default) {
	      this.sourceData = '';
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = (0, _getIterator3.default)(this.$slots.default), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var slot = _step.value;

	          this.sourceData += slot.text;
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    }

	    this.$watch('source', function () {
	      _this2.rende();
	    });

	    this.watches.forEach(function (v) {
	      _this2.$watch(v, function () {
	        _this2.rende();
	      });
	    });
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])
});
;