"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.getAutoHeightDuration = getAutoHeightDuration;
exports.duration = exports.easing = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

// Follow https://material.google.com/motion/duration-easing.html#duration-easing-natural-easing-curves
// to learn the context in which each easing should be used.
const easing = {
  // This is the most common easing curve.
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)'
}; // Follow https://material.io/guidelines/motion/duration-easing.html#duration-easing-common-durations
// to learn when use what timing

exports.easing = easing;
const duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
exports.duration = duration;

function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}

function create(props = ['all'], options = {}) {
  const {
    duration: durationOption = duration.standard,
    easing: easingOption = easing.easeInOut,
    delay = 0
  } = options,
        other = (0, _objectWithoutPropertiesLoose2.default)(options, ["duration", "easing", "delay"]);

  if (process.env.NODE_ENV !== 'production') {
    const isString = value => typeof value === 'string'; // IE11 support, replace with Number.isNaN
    // eslint-disable-next-line no-restricted-globals


    const isNumber = value => !isNaN(parseFloat(value));

    if (!isString(props) && !Array.isArray(props)) {
      console.error('Material-UI: Argument "props" must be a string or Array.');
    }

    if (!isNumber(durationOption) && !isString(durationOption)) {
      console.error(`Material-UI: Argument "duration" must be a number or a string but found ${durationOption}.`);
    }

    if (!isString(easingOption)) {
      console.error('Material-UI: Argument "easing" must be a string.');
    }

    if (!isNumber(delay) && !isString(delay)) {
      console.error('Material-UI: Argument "delay" must be a number or a string.');
    }

    if (Object.keys(other).length !== 0) {
      console.error(`Material-UI: Unrecognized argument(s) [${Object.keys(other).join(',')}].`);
    }
  }

  return (Array.isArray(props) ? props : [props]).map(animatedProp => `${animatedProp} ${typeof durationOption === 'string' ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === 'string' ? delay : formatMs(delay)}`).join(',');
}

function getAutoHeightDuration(height) {
  if (!height) {
    return 0;
  }

  const constant = height / 36; // https://www.wolframalpha.com/input/?i=(4+%2B+15+*+(x+%2F+36+)+**+0.25+%2B+(x+%2F+36)+%2F+5)+*+10

  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}