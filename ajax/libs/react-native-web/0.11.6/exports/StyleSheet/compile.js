function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * Copyright (c) Nicolas Gallagher.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
import createReactDOMStyle from './createReactDOMStyle';
import hash from '../../vendor/hash';
import hyphenateStyleName from 'hyphenate-style-name';
import normalizeValueWithProperty from './normalizeValueWithProperty';
import prefixStyles, { prefixInlineStyles } from '../../modules/prefixStyles';
var cache = {
  get: function get(property, value) {
    if (cache[property] != null && cache[property].hasOwnProperty(value) && cache[property][value] != null) {
      return cache[property][value];
    }
  },
  set: function set(property, value, object) {
    if (cache[property] == null) {
      cache[property] = {};
    }

    return cache[property][value] = object;
  }
};
/**
 * Compile style to atomic CSS rules.
 */

export function atomic(style) {
  return Object.keys(style).sort().reduce(function (acc, property) {
    var value = style[property];

    if (value != null) {
      var valueString = stringifyValueWithProperty(value, property);
      var cachedResult = cache.get(property, valueString);

      if (cachedResult != null) {
        var identifier = cachedResult.identifier;
        acc[identifier] = cachedResult;
      } else {
        var _identifier = createIdentifier('r', property, value);

        var rules = createAtomicRules(_identifier, property, value);

        var _cachedResult = cache.set(property, valueString, {
          property: property,
          value: stringifyValueWithProperty(value, property),
          identifier: _identifier,
          rules: rules
        });

        acc[_identifier] = _cachedResult;
      }
    }

    return acc;
  }, {});
}
/**
 * Compile simple style object to classic CSS rules.
 * No support for 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */

export function classic(style, name) {
  var _ref;

  var identifier = createIdentifier('css', name, style);

  var animationKeyframes = style.animationKeyframes,
      rest = _objectWithoutPropertiesLoose(style, ["animationKeyframes"]);

  var rules = [];
  var selector = "." + identifier;
  var animationName;

  if (animationKeyframes != null) {
    var _processKeyframesValu = processKeyframesValue(animationKeyframes),
        animationNames = _processKeyframesValu.animationNames,
        keyframesRules = _processKeyframesValu.rules;

    animationName = animationNames.join(',');
    rules.push.apply(rules, keyframesRules);
  }

  var block = createDeclarationBlock(_objectSpread({}, rest, {
    animationName: animationName
  }));
  rules.push("" + selector + block);
  return _ref = {}, _ref[identifier] = {
    identifier: identifier,
    rules: rules
  }, _ref;
}
/**
 * Compile simple style object to inline DOM styles.
 * No support for 'animationKeyframes', 'placeholderTextColor', 'scrollbarWidth', or 'pointerEvents'.
 */

export function inline(style) {
  return prefixInlineStyles(createReactDOMStyle(style));
}
/**
 * Create a value string that normalizes different input values with a common
 * output.
 */

export function stringifyValueWithProperty(value, property) {
  // e.g., 0 => '0px', 'black' => 'rgba(0,0,0,1)'
  var normalizedValue = normalizeValueWithProperty(value, property);
  return typeof normalizedValue !== 'string' ? JSON.stringify(normalizedValue || '') : normalizedValue;
}
/**
 * Create the Atomic CSS rules needed for a given StyleSheet rule.
 * Translates StyleSheet declarations to CSS.
 */

function createAtomicRules(identifier, property, value) {
  var rules = [];
  var selector = "." + identifier; // Handle non-standard properties and object values that require multiple
  // CSS rules to be created.

  switch (property) {
    case 'animationKeyframes':
      {
        var _processKeyframesValu2 = processKeyframesValue(value),
            animationNames = _processKeyframesValu2.animationNames,
            keyframesRules = _processKeyframesValu2.rules;

        var block = createDeclarationBlock({
          animationName: animationNames.join(',')
        });
        rules.push.apply(rules, ["" + selector + block].concat(keyframesRules));
        break;
      }

    case 'placeholderTextColor':
      {
        var _block = createDeclarationBlock({
          color: value,
          opacity: 1
        });

        rules.push(selector + "::-webkit-input-placeholder" + _block, selector + "::-moz-placeholder" + _block, selector + ":-ms-input-placeholder" + _block, selector + "::placeholder" + _block);
        break;
      }
    // Polyfill for draft spec
    // https://drafts.csswg.org/css-scrollbars-1/

    case 'scrollbarWidth':
      {
        if (value === 'none') {
          var _createDeclarationBlo;

          var _block2 = createDeclarationBlock((_createDeclarationBlo = {}, _createDeclarationBlo[property] = value, _createDeclarationBlo));

          rules.push(selector + "::-webkit-scrollbar{display:none}", selector + "{overflow:-moz-scrollbars-none;-ms-overflow-style:none}", "" + selector + _block2);
        }

        break;
      }
    // See #513

    case 'pointerEvents':
      {
        var _createDeclarationBlo4;

        var finalValue = value;

        if (value === 'auto' || value === 'box-only') {
          finalValue = 'auto!important';

          if (value === 'box-only') {
            var _createDeclarationBlo2;

            var _block4 = createDeclarationBlock((_createDeclarationBlo2 = {}, _createDeclarationBlo2[property] = 'none', _createDeclarationBlo2));

            rules.push(selector + ">*" + _block4);
          }
        } else if (value === 'none' || value === 'box-none') {
          finalValue = 'none!important';

          if (value === 'box-none') {
            var _createDeclarationBlo3;

            var _block5 = createDeclarationBlock((_createDeclarationBlo3 = {}, _createDeclarationBlo3[property] = 'auto', _createDeclarationBlo3));

            rules.push(selector + ">*" + _block5);
          }
        }

        var _block3 = createDeclarationBlock((_createDeclarationBlo4 = {}, _createDeclarationBlo4[property] = finalValue, _createDeclarationBlo4));

        rules.push("" + selector + _block3);
        break;
      }

    default:
      {
        var _createDeclarationBlo5;

        var _block6 = createDeclarationBlock((_createDeclarationBlo5 = {}, _createDeclarationBlo5[property] = value, _createDeclarationBlo5));

        rules.push("" + selector + _block6);
        break;
      }
  }

  return rules;
}
/**
 * Creates a CSS declaration block from a StyleSheet object.
 */


function createDeclarationBlock(style) {
  var domStyle = prefixStyles(createReactDOMStyle(style));
  var declarationsString = Object.keys(domStyle).map(function (property) {
    var value = domStyle[property];
    var prop = hyphenateStyleName(property); // The prefixer may return an array of values:
    // { display: [ '-webkit-flex', 'flex' ] }
    // to represent "fallback" declarations
    // { display: -webkit-flex; display: flex; }

    if (Array.isArray(value)) {
      return value.map(function (v) {
        return prop + ":" + v;
      }).join(';');
    } else {
      return prop + ":" + value;
    }
  }) // Once properties are hyphenated, this will put the vendor
  // prefixed and short-form properties first in the list.
  .sort().join(';');
  return "{" + declarationsString + ";}";
}
/**
 * An identifier is associated with a unique set of styles.
 */


function createIdentifier(prefix, name, value) {
  var hashedString = hash(name + stringifyValueWithProperty(value, name));
  return process.env.NODE_ENV !== 'production' ? prefix + "-" + name + "-" + hashedString : prefix + "-" + hashedString;
}
/**
 * Create individual CSS keyframes rules.
 */


function createKeyframes(keyframes) {
  var prefixes = ['-webkit-', ''];
  var identifier = createIdentifier('r', 'animation', keyframes);
  var steps = '{' + Object.keys(keyframes).map(function (stepName) {
    var rule = keyframes[stepName];
    var block = createDeclarationBlock(rule);
    return "" + stepName + block;
  }).join('') + '}';
  var rules = prefixes.map(function (prefix) {
    return "@" + prefix + "keyframes " + identifier + steps;
  });
  return {
    identifier: identifier,
    rules: rules
  };
}
/**
 * Create CSS keyframes rules and names from a StyleSheet keyframes object.
 */


function processKeyframesValue(keyframesValue) {
  if (typeof keyframesValue === 'number') {
    throw new Error('Invalid CSS keyframes type');
  }

  var animationNames = [];
  var rules = [];
  var value = Array.isArray(keyframesValue) ? keyframesValue : [keyframesValue];
  value.forEach(function (keyframes) {
    if (typeof keyframes === 'string') {
      // Support external animation libraries (identifiers only)
      animationNames.push(keyframes);
    } else {
      // Create rules for each of the keyframes
      var _createKeyframes = createKeyframes(keyframes),
          identifier = _createKeyframes.identifier,
          keyframesRules = _createKeyframes.rules;

      animationNames.push(identifier);
      rules.push.apply(rules, keyframesRules);
    }
  });
  return {
    animationNames: animationNames,
    rules: rules
  };
}