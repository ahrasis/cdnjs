'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFormatter;

var _react = require('react');

var React = _interopRequireWildcard(_react);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// If the numbers array is present, format numbers with it,
// otherwise just cast the number to a string and return it
var normalizeNumber = function normalizeNumber(numbers, value) {
  return numbers && numbers.length === 10 ? String(value).split('').map(function (digit) {
    return digit.match(/^[0-9]$/) ? numbers[parseInt(digit)] : digit;
  }).join('') : String(value);
};

// Take a string or a function that takes number of days and returns a string
// and provide a uniform API to create string parts


var normalizeFn = function normalizeFn(value, distanceMillis, numbers) {
  return function (stringOrFn) {
    return typeof stringOrFn === 'function' ? stringOrFn(value, distanceMillis).replace(/%d/g, normalizeNumber(numbers, value)) : stringOrFn.replace(/%d/g, normalizeNumber(numbers, value));
  };
};

function buildFormatter(strings) {
  return function formatter(value, unit, suffix, epochMiliseconds, _nextFormmater, now) {
    var current = now();
    // convert weeks to days if strings don't handle weeks
    if (unit === 'week' && !strings.week && !strings.weeks) {
      var _days = Math.round(Math.abs(epochMiliseconds - current) / (1000 * 60 * 60 * 24));
      value = _days;
      unit = 'day';
    }

    // create a normalize function for given value
    var normalize = normalizeFn(value, current - epochMiliseconds, strings.numbers != null ? strings.numbers : undefined);

    // The eventual return value stored in an array so that the wordSeparator can be used
    var dateString = [];

    // handle prefixes
    if (suffix === 'ago' && strings.prefixAgo) {
      dateString.push(normalize(strings.prefixAgo));
    }
    if (suffix === 'from now' && strings.prefixFromNow) {
      dateString.push(normalize(strings.prefixFromNow));
    }

    // Handle Main number and unit
    var isPlural = value > 1;
    if (isPlural) {
      var stringFn = strings[unit + 's'] || strings[unit] || '%d ' + unit;
      dateString.push(normalize(stringFn));
    } else {
      var _stringFn = strings[unit] || strings[unit + 's'] || '%d ' + unit;
      dateString.push(normalize(_stringFn));
    }

    // Handle Suffixes
    if (suffix === 'ago' && strings.suffixAgo) {
      dateString.push(normalize(strings.suffixAgo));
    }
    if (suffix === 'from now' && strings.suffixFromNow) {
      dateString.push(normalize(strings.suffixFromNow));
    }

    // join the array into a string and return it
    var wordSeparator = typeof strings.wordSeparator === 'string' ? strings.wordSeparator : ' ';
    return dateString.join(wordSeparator);
  };
}