"use strict";

exports.__esModule = true;
exports.default = createStyleResolver;

var _ExecutionEnvironment = require("fbjs/lib/ExecutionEnvironment");

var _createCSSStyleSheet = _interopRequireDefault(require("./createCSSStyleSheet"));

var _createCompileableStyle = _interopRequireDefault(require("./createCompileableStyle"));

var _createOrderedCSSStyleSheet = _interopRequireDefault(require("./createOrderedCSSStyleSheet"));

var _flattenArray = _interopRequireDefault(require("../../modules/flattenArray"));

var _flattenStyle = _interopRequireDefault(require("./flattenStyle"));

var _I18nManager = _interopRequireDefault(require("../I18nManager"));

var _i18nStyle = _interopRequireDefault(require("./i18nStyle"));

var _compile = require("./compile");

var _initialRules = _interopRequireDefault(require("./initialRules"));

var _modality = _interopRequireDefault(require("./modality"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var emptyObject = {};

function createStyleResolver() {
  var inserted, sheet, lookup;
  var resolved = {
    css: {},
    ltr: {},
    rtl: {},
    rtlNoSwap: {}
  };

  var init = function init() {
    inserted = {
      css: {},
      ltr: {},
      rtl: {},
      rtlNoSwap: {}
    };
    sheet = (0, _createOrderedCSSStyleSheet.default)((0, _createCSSStyleSheet.default)(_constants.STYLE_ELEMENT_ID));
    lookup = {
      byClassName: {},
      byProp: {}
    };
    (0, _modality.default)(function (rule) {
      return sheet.insert(rule, _constants.STYLE_GROUPS.modality);
    });

    _initialRules.default.forEach(function (rule) {
      sheet.insert(rule, _constants.STYLE_GROUPS.reset);
    });
  };

  init();

  function addToLookup(className, prop, value) {
    if (!lookup.byProp[prop]) {
      lookup.byProp[prop] = {};
    }

    lookup.byProp[prop][value] = className;
    lookup.byClassName[className] = {
      prop: prop,
      value: value
    };
  }

  function getClassName(prop, value) {
    var val = (0, _compile.stringifyValueWithProperty)(value, prop);
    var cache = lookup.byProp;
    return cache[prop] && cache[prop].hasOwnProperty(val) && cache[prop][val];
  }

  function _injectRegisteredStyle(id) {
    var doLeftAndRightSwapInRTL = _I18nManager.default.doLeftAndRightSwapInRTL,
        isRTL = _I18nManager.default.isRTL;
    var dir = isRTL ? doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap' : 'ltr';

    if (!inserted[dir][id]) {
      var style = (0, _createCompileableStyle.default)((0, _i18nStyle.default)((0, _flattenStyle.default)(id)));
      var results = (0, _compile.atomic)(style);
      Object.keys(results).forEach(function (key) {
        var _results$key = results[key],
            identifier = _results$key.identifier,
            property = _results$key.property,
            rules = _results$key.rules,
            value = _results$key.value;
        addToLookup(identifier, property, value);
        rules.forEach(function (rule) {
          var group = _constants.STYLE_GROUPS.custom[property] || _constants.STYLE_GROUPS.atomic;
          sheet.insert(rule, group);
        });
      });
      inserted[dir][id] = true;
    }
  }
  /**
   * Resolves a React Native style object to DOM attributes
   */


  function resolve(style, classList) {
    var nextClassList = [];
    var props = {};

    if (!style && !classList) {
      return props;
    }

    if (Array.isArray(classList)) {
      (0, _flattenArray.default)(classList).forEach(function (identifier) {
        if (identifier) {
          if (inserted.css[identifier] == null && resolved.css[identifier] != null) {
            var item = resolved.css[identifier];
            item.rules.forEach(function (rule) {
              sheet.insert(rule, item.group);
            });
            inserted.css[identifier] = true;
          }

          nextClassList.push(identifier);
        }
      });
    }

    if (typeof style === 'number') {
      // fast and cachable
      _injectRegisteredStyle(style);

      var key = createCacheKey(style);
      props = _resolveStyle(style, key);
    } else if (!Array.isArray(style)) {
      // resolve a plain RN style object
      props = _resolveStyle(style);
    } else {
      // flatten the style array
      // cache resolved props when all styles are registered
      // otherwise fallback to resolving
      var flatArray = (0, _flattenArray.default)(style);
      var isArrayOfNumbers = true;
      var cacheKey = '';

      for (var i = 0; i < flatArray.length; i++) {
        var id = flatArray[i];

        if (typeof id !== 'number') {
          isArrayOfNumbers = false;
        } else {
          if (isArrayOfNumbers) {
            cacheKey += id + '-';
          }

          _injectRegisteredStyle(id);
        }
      }

      var _key = isArrayOfNumbers ? createCacheKey(cacheKey) : null;

      props = _resolveStyle(flatArray, _key);
    }

    nextClassList.push.apply(nextClassList, props.classList);
    var finalProps = {
      className: classListToString(nextClassList),
      classList: nextClassList
    };

    if (props.style) {
      finalProps.style = props.style;
    }

    return finalProps;
  }
  /**
   * Resolves a React Native style object to DOM attributes, accounting for
   * the existing styles applied to the DOM node.
   *
   * To determine the next style, some of the existing DOM state must be
   * converted back into React Native styles.
   */


  function resolveWithNode(rnStyleNext, node) {
    function getDeclaration(className) {
      return lookup.byClassName[className] || emptyObject;
    }

    var _getDOMStyleInfo = getDOMStyleInfo(node),
        rdomClassList = _getDOMStyleInfo.classList,
        rdomStyle = _getDOMStyleInfo.style; // Convert the DOM classList back into a React Native form
    // Preserves unrecognized class names.


    var _rdomClassList$reduce = rdomClassList.reduce(function (styleProps, className) {
      var _getDeclaration = getDeclaration(className),
          prop = _getDeclaration.prop,
          value = _getDeclaration.value;

      if (prop) {
        styleProps.style[prop] = value;
      } else {
        styleProps.classList.push(className);
      }

      return styleProps;
    }, {
      classList: [],
      style: {}
    }),
        rnClassList = _rdomClassList$reduce.classList,
        rnStyle = _rdomClassList$reduce.style; // Create next DOM style props from current and next RN styles


    var _resolve = resolve([(0, _i18nStyle.default)(rnStyle), rnStyleNext]),
        rdomClassListNext = _resolve.classList,
        rdomStyleNext = _resolve.style; // Final className
    // Add the current class names not managed by React Native


    var className = classListToString(rdomClassListNext.concat(rnClassList)); // Final style
    // Next class names take priority over current inline styles

    var style = _objectSpread({}, rdomStyle);

    rdomClassListNext.forEach(function (className) {
      var _getDeclaration2 = getDeclaration(className),
          prop = _getDeclaration2.prop;

      if (style[prop]) {
        style[prop] = '';
      }
    }); // Next inline styles take priority over current inline styles

    Object.assign(style, rdomStyleNext);
    return {
      className: className,
      style: style
    };
  }
  /**
   * Resolves a React Native style object
   */


  function _resolveStyle(style, key) {
    var doLeftAndRightSwapInRTL = _I18nManager.default.doLeftAndRightSwapInRTL,
        isRTL = _I18nManager.default.isRTL;
    var dir = isRTL ? doLeftAndRightSwapInRTL ? 'rtl' : 'rtlNoSwap' : 'ltr'; // faster: memoized

    if (key != null && resolved[dir][key] != null) {
      return resolved[dir][key];
    }

    var flatStyle = (0, _flattenStyle.default)(style);
    var localizedStyle = (0, _createCompileableStyle.default)((0, _i18nStyle.default)(flatStyle)); // slower: convert style object to props and cache

    var props = Object.keys(localizedStyle).sort().reduce(function (props, styleProp) {
      var value = localizedStyle[styleProp];

      if (value != null) {
        var className = getClassName(styleProp, value);

        if (className) {
          props.classList.push(className);
        } else {
          // Certain properties and values are not transformed by 'createReactDOMStyle' as they
          // require more complex transforms into multiple CSS rules. Here we assume that StyleManager
          // can bind these styles to a className, and prevent them becoming invalid inline-styles.
          if (styleProp === 'animationKeyframes' || styleProp === 'placeholderTextColor' || styleProp === 'pointerEvents' || styleProp === 'scrollbarWidth') {
            var _atomic;

            var a = (0, _compile.atomic)((_atomic = {}, _atomic[styleProp] = value, _atomic));
            Object.values(a).forEach(function (_ref) {
              var identifier = _ref.identifier,
                  rules = _ref.rules;
              props.classList.push(identifier);
              rules.forEach(function (rule) {
                sheet.insert(rule, _constants.STYLE_GROUPS.atomic);
              });
            });
          } else {
            if (!props.style) {
              props.style = {};
            } // 4x slower render


            props.style[styleProp] = value;
          }
        }
      }

      return props;
    }, {
      classList: []
    });

    if (props.style) {
      props.style = (0, _compile.inline)(props.style);
    }

    if (key != null) {
      resolved[dir][key] = props;
    }

    return props;
  }

  return {
    getStyleSheet: function getStyleSheet() {
      var textContent = sheet.getTextContent(); // Reset state on the server so critical css is always the result

      if (!_ExecutionEnvironment.canUseDOM) {
        init();
      }

      return {
        id: _constants.STYLE_ELEMENT_ID,
        textContent: textContent
      };
    },
    createCSS: function createCSS(rules, group) {
      var result = {};
      Object.keys(rules).forEach(function (name) {
        var style = rules[name];
        var compiled = (0, _compile.classic)(style, name);
        Object.values(compiled).forEach(function (_ref2) {
          var identifier = _ref2.identifier,
              rules = _ref2.rules;
          resolved.css[identifier] = {
            group: group || _constants.STYLE_GROUPS.classic,
            rules: rules
          };
          result[name] = identifier;
        });
      });
      return result;
    },
    resolve: resolve,
    sheet: sheet,
    resolveWithNode: resolveWithNode
  };
}
/**
 * Misc helpers
 */


var createCacheKey = function createCacheKey(id) {
  var prefix = 'rn';
  return prefix + "-" + id;
};

var classListToString = function classListToString(list) {
  return list.join(' ').trim();
};
/**
 * Copies classList and style data from a DOM node
 */


var hyphenPattern = /-([a-z])/g;

var toCamelCase = function toCamelCase(str) {
  return str.replace(hyphenPattern, function (m) {
    return m[1].toUpperCase();
  });
};

var getDOMStyleInfo = function getDOMStyleInfo(node) {
  var nodeStyle = node.style;
  var classList = Array.prototype.slice.call(node.classList);
  var style = {}; // DOM style is a CSSStyleDeclaration
  // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration

  for (var i = 0; i < nodeStyle.length; i += 1) {
    var property = nodeStyle.item(i);

    if (property) {
      // DOM style uses hyphenated prop names and may include vendor prefixes
      // Transform back into React DOM style.
      style[toCamelCase(property)] = nodeStyle.getPropertyValue(property);
    }
  }

  return {
    classList: classList,
    style: style
  };
};

module.exports = exports.default;