"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useScrollTrigger;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

function getScrollY(ref) {
  return ref.pageYOffset !== undefined ? ref.pageYOffset : ref.scrollTop;
}

function defaultTrigger(event, store, options) {
  var _options$disableHyste = options.disableHysteresis,
      disableHysteresis = _options$disableHyste === void 0 ? false : _options$disableHyste,
      _options$threshold = options.threshold,
      threshold = _options$threshold === void 0 ? 100 : _options$threshold;
  var previous = store.current;
  store.current = event ? getScrollY(event.currentTarget) : previous;

  if (!disableHysteresis && previous !== undefined) {
    if (store.current < previous) {
      return false;
    }
  }

  return store.current > threshold;
}

var defaultTarget = typeof window !== 'undefined' ? window : null;

function useScrollTrigger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$getTrigger = options.getTrigger,
      getTrigger = _options$getTrigger === void 0 ? defaultTrigger : _options$getTrigger,
      _options$target = options.target,
      target = _options$target === void 0 ? defaultTarget : _options$target,
      other = (0, _objectWithoutProperties2.default)(options, ["getTrigger", "target"]);
  var store = React.useRef();

  var _React$useState = React.useState(function () {
    return getTrigger(null, store, other);
  }),
      trigger = _React$useState[0],
      setTrigger = _React$useState[1];

  React.useEffect(function () {
    var handleScroll = function handleScroll(event) {
      setTrigger(getTrigger(event, store, other));
    };

    handleScroll(null); // Re-evaluate trigger when dependencies change

    target.addEventListener('scroll', handleScroll);
    return function () {
      target.removeEventListener('scroll', handleScroll);
    }; // See Option 3. https://github.com/facebook/react/issues/14476#issuecomment-471199055
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, getTrigger, JSON.stringify(other)]);
  return trigger;
}