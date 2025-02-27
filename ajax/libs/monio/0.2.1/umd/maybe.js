(function UMD(name, context, dependencies, definition) {
  if (typeof define === "function" && define.amd) {
    dependencies = Object.keys(dependencies).map(p => p.replace(/^\.\//, ""));
    define(name, dependencies, definition);
  } else if (typeof module !== "undefined" && module.exports) {
    dependencies = Object.keys(dependencies).map(p => require(p));
    module.exports = definition(...dependencies);
  } else {
    dependencies = Object.values(dependencies).map(n => context[n]);
    context[name] = definition(...dependencies);
  }
})("Maybe", typeof globalThis != "undefined" ? globalThis : typeof global != "undefined" ? global : typeof window != "undefined" ? window : typeof self != "undefined" ? self : new Function("return this")(), {
  "./just.js": "Just",
  "./nothing.js": "Nothing"
}, function DEF(Just, Nothing) {
  "use strict";

  var _exp = {};
  var brand = {};
  Object.assign(MaybeJust, Just);
  Object.assign(MaybeNothing, Nothing);
  _exp = Object.assign(Maybe, {
    Just: MaybeJust,
    Nothing: MaybeNothing,
    of: Maybe,
    pure: Maybe,
    unit: Maybe,
    is,
    from
  }); // **************************

  function MaybeJust(val) {
    return Maybe(val);
  }

  function MaybeNothing() {
    return Maybe(Nothing());
  }

  function Maybe(val) {
    var mn = val;
    var isJust = MaybeJust.is(mn);
    var isNothing = MaybeNothing.is(mn);

    if (!(isJust || isNothing)) {
      mn = Just(val);
      isJust = true;
    } else if (isJust) {
      // intentional monad violation, to extract its value
      val = mn.chain(v => v);
    } // isNothing
    else {
        val = void 0;
      }

    var publicAPI = {
      map,
      chain,
      flatMap: chain,
      bind: chain,
      ap,
      concat,
      fold,
      _inspect,
      _is,

      get [Symbol.toStringTag]() {
        return `Maybe:${mn[Symbol.toStringTag]}`;
      }

    };
    return publicAPI; // *********************

    function map(fn) {
      return isJust ? Maybe(mn.map(fn)) : publicAPI;
    }

    function chain(fn) {
      return isJust ? mn.chain(fn) : publicAPI;
    }

    function ap(m) {
      return isJust ? m.map(val) : publicAPI;
    }

    function concat(m) {
      return isJust ? m.map(v => val.concat(v)) : publicAPI;
    }

    function fold(asNothing, asJust) {
      return isJust ? asJust(val) : asNothing(val);
    }

    function _inspect() {
      var v = isJust ? mn._inspect().match(/^Just\((.*)\)$/)[1] : "";
      return `${publicAPI[Symbol.toStringTag]}(${v})`;
    }

    function _is(br) {
      return br === brand || mn._is(br);
    }
  }

  function is(val) {
    return val && typeof val._is == "function" && val._is(brand);
  }

  function from(val) {
    return MaybeNothing.isEmpty(val) ? MaybeNothing() : Maybe(val);
  }

  return _exp;
});