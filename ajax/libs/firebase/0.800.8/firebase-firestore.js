(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase.firestore = global.firebase.firestore || {}), global.firebase.app));
}(this, (function (exports, app) { 'use strict';

    try {
                (function() {

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns navigator.userAgent string or '' if it's not defined.
     * @return user agent string
     */
    function getUA() {
        if (typeof navigator !== 'undefined' &&
            typeof navigator['userAgent'] === 'string') {
            return navigator['userAgent'];
        }
        else {
            return '';
        }
    }
    /**
     * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
     *
     * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
     * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
     * wait for a callback.
     */
    function isMobileCordova() {
        return (typeof window !== 'undefined' &&
            // @ts-ignore Setting up an broadly applicable index signature for Window
            // just to deal with this case would probably be a bad idea.
            !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) &&
            /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA()));
    }
    function isBrowserExtension() {
        var runtime = typeof chrome === 'object'
            ? chrome.runtime
            : typeof browser === 'object'
                ? browser.runtime
                : undefined;
        return typeof runtime === 'object' && runtime.id !== undefined;
    }
    /**
     * Detect React Native.
     *
     * @return true if ReactNative environment is detected.
     */
    function isReactNative() {
        return (typeof navigator === 'object' && navigator['product'] === 'ReactNative');
    }
    /** Detects Electron apps. */
    function isElectron() {
        return getUA().indexOf('Electron/') >= 0;
    }
    /** Detects Internet Explorer. */
    function isIE() {
        var ua = getUA();
        return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
    }
    /** Detects Universal Windows Platform apps. */
    function isUWP() {
        return getUA().indexOf('MSAppHost/') >= 0;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var ERROR_NAME = 'FirebaseError';
    // Based on code from:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    var FirebaseError = /** @class */ (function (_super) {
        __extends(FirebaseError, _super);
        function FirebaseError(code, message) {
            var _this = _super.call(this, message) || this;
            _this.code = code;
            _this.name = ERROR_NAME;
            // Fix For ES5
            // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work
            Object.setPrototypeOf(_this, FirebaseError.prototype);
            // Maintains proper stack trace for where our error was thrown.
            // Only available on V8.
            if (Error.captureStackTrace) {
                Error.captureStackTrace(_this, ErrorFactory.prototype.create);
            }
            return _this;
        }
        return FirebaseError;
    }(Error));
    var ErrorFactory = /** @class */ (function () {
        function ErrorFactory(service, serviceName, errors) {
            this.service = service;
            this.serviceName = serviceName;
            this.errors = errors;
        }
        ErrorFactory.prototype.create = function (code) {
            var data = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                data[_i - 1] = arguments[_i];
            }
            var customData = data[0] || {};
            var fullCode = this.service + "/" + code;
            var template = this.errors[code];
            var message = template ? replaceTemplate(template, customData) : 'Error';
            // Service Name: Error message (service/code).
            var fullMessage = this.serviceName + ": " + message + " (" + fullCode + ").";
            var error = new FirebaseError(fullCode, fullMessage);
            // Keys with an underscore at the end of their name are not included in
            // error.data for some reason.
            // TODO: Replace with Object.entries when lib is updated to es2017.
            for (var _a = 0, _b = Object.keys(customData); _a < _b.length; _a++) {
                var key = _b[_a];
                if (key.slice(-1) !== '_') {
                    if (key in error) {
                        console.warn("Overwriting FirebaseError base field \"" + key + "\" can cause unexpected behavior.");
                    }
                    error[key] = customData[key];
                }
            }
            return error;
        };
        return ErrorFactory;
    }());
    function replaceTemplate(template, data) {
        return template.replace(PATTERN, function (_, key) {
            var value = data[key];
            return value != null ? String(value) : "<" + key + "?>";
        });
    }
    var PATTERN = /\{\$([^}]+)}/g;

    /**
     * Component for service name T, e.g. `auth`, `auth-internal`
     */
    var Component = /** @class */ (function () {
        /**
         *
         * @param name The public service name, e.g. app, auth, firestore, database
         * @param instanceFactory Service factory responsible for creating the public interface
         * @param type whether the service provided by the component is public or private
         */
        function Component(name, instanceFactory, type) {
            this.name = name;
            this.instanceFactory = instanceFactory;
            this.type = type;
            this.multipleInstances = false;
            /**
             * Properties to be added to the service namespace
             */
            this.serviceProps = {};
            this.instantiationMode = "LAZY" /* LAZY */;
        }
        Component.prototype.setInstantiationMode = function (mode) {
            this.instantiationMode = mode;
            return this;
        };
        Component.prototype.setMultipleInstances = function (multipleInstances) {
            this.multipleInstances = multipleInstances;
            return this;
        };
        Component.prototype.setServiceProps = function (props) {
            this.serviceProps = props;
            return this;
        };
        return Component;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    var _a;
    /**
     * The JS SDK supports 5 log levels and also allows a user the ability to
     * silence the logs altogether.
     *
     * The order is a follows:
     * DEBUG < VERBOSE < INFO < WARN < ERROR
     *
     * All of the log types above the current log level will be captured (i.e. if
     * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
     * `VERBOSE` logs will not)
     */

    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
        LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
    })(exports.LogLevel || (exports.LogLevel = {}));
    var levelStringToEnum = {
        'debug': exports.LogLevel.DEBUG,
        'verbose': exports.LogLevel.VERBOSE,
        'info': exports.LogLevel.INFO,
        'warn': exports.LogLevel.WARN,
        'error': exports.LogLevel.ERROR,
        'silent': exports.LogLevel.SILENT
    };
    /**
     * The default log level
     */
    var defaultLogLevel = exports.LogLevel.INFO;
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    var ConsoleMethod = (_a = {},
        _a[exports.LogLevel.DEBUG] = 'log',
        _a[exports.LogLevel.VERBOSE] = 'log',
        _a[exports.LogLevel.INFO] = 'info',
        _a[exports.LogLevel.WARN] = 'warn',
        _a[exports.LogLevel.ERROR] = 'error',
        _a);
    /**
     * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
     * messages on to their corresponding console counterparts (if the log method
     * is supported by the current log level)
     */
    var defaultLogHandler = function (instance, logType) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (logType < instance.logLevel) {
            return;
        }
        var now = new Date().toISOString();
        var method = ConsoleMethod[logType];
        if (method) {
            console[method].apply(console, __spreadArrays(["[" + now + "]  " + instance.name + ":"], args));
        }
        else {
            throw new Error("Attempted to log a message with an invalid logType (value: " + logType + ")");
        }
    };
    var Logger = /** @class */ (function () {
        /**
         * Gives you an instance of a Logger to capture messages according to
         * Firebase's logging scheme.
         *
         * @param name The name that the logs will be associated with
         */
        function Logger(name) {
            this.name = name;
            /**
             * The log level of the given Logger instance.
             */
            this._logLevel = defaultLogLevel;
            /**
             * The main (internal) log handler for the Logger instance.
             * Can be set to a new function in internal package code but not by user.
             */
            this._logHandler = defaultLogHandler;
            /**
             * The optional, additional, user-defined log handler for the Logger instance.
             */
            this._userLogHandler = null;
        }
        Object.defineProperty(Logger.prototype, "logLevel", {
            get: function () {
                return this._logLevel;
            },
            set: function (val) {
                if (!(val in exports.LogLevel)) {
                    throw new TypeError("Invalid value \"" + val + "\" assigned to `logLevel`");
                }
                this._logLevel = val;
            },
            enumerable: false,
            configurable: true
        });
        // Workaround for setter/getter having to be the same type.
        Logger.prototype.setLogLevel = function (val) {
            this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
        };
        Object.defineProperty(Logger.prototype, "logHandler", {
            get: function () {
                return this._logHandler;
            },
            set: function (val) {
                if (typeof val !== 'function') {
                    throw new TypeError('Value assigned to `logHandler` must be a function');
                }
                this._logHandler = val;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(Logger.prototype, "userLogHandler", {
            get: function () {
                return this._userLogHandler;
            },
            set: function (val) {
                this._userLogHandler = val;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * The functions below are all based on the `console` interface
         */
        Logger.prototype.debug = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.DEBUG], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.DEBUG], args));
        };
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.VERBOSE], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.VERBOSE], args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.INFO], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.INFO], args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.WARN], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.WARN], args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, exports.LogLevel.ERROR], args));
            this._logHandler.apply(this, __spreadArrays([this, exports.LogLevel.ERROR], args));
        };
        return Logger;
    }());

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics$1 = function(d, b) {
        extendStatics$1 = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics$1(d, b);
    };

    function __extends$1(d, b) {
        extendStatics$1(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var g, goog = goog || {}, k = commonjsGlobal || self;
    function aa() { }
    function ba(a) { var b = typeof a; return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"; }
    function ca(a) { var b = ba(a); return "array" == b || "object" == b && "number" == typeof a.length; }
    function n(a) { var b = typeof a; return "object" == b && null != a || "function" == b; }
    function da(a) { return Object.prototype.hasOwnProperty.call(a, ea) && a[ea] || (a[ea] = ++fa); }
    var ea = "closure_uid_" + (1E9 * Math.random() >>> 0), fa = 0;
    function ha(a, b, c) { return a.call.apply(a.bind, arguments); }
    function ja(a, b, c) { if (!a)
        throw Error(); if (2 < arguments.length) {
        var d = Array.prototype.slice.call(arguments, 2);
        return function () { var e = Array.prototype.slice.call(arguments); Array.prototype.unshift.apply(e, d); return a.apply(b, e); };
    } return function () { return a.apply(b, arguments); }; }
    function p(a, b, c) { Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? p = ha : p = ja; return p.apply(null, arguments); }
    function ka(a, b) { var c = Array.prototype.slice.call(arguments, 1); return function () { var d = c.slice(); d.push.apply(d, arguments); return a.apply(this, d); }; }
    var q = Date.now;
    function r(a, b) { function c() { } c.prototype = b.prototype; a.S = b.prototype; a.prototype = new c; a.prototype.constructor = a; }
    function u() { this.j = this.j; this.i = this.i; }
    var la = 0;
    u.prototype.j = !1;
    u.prototype.ja = function () { if (!this.j && (this.j = !0, this.G(), 0 != la)) {
        var a = da(this);
    } };
    u.prototype.G = function () { if (this.i)
        for (; this.i.length;)
            this.i.shift()(); };
    var na = Array.prototype.indexOf ? function (a, b) { return Array.prototype.indexOf.call(a, b, void 0); } : function (a, b) { if ("string" === typeof a)
        return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0); for (var c = 0; c < a.length; c++)
        if (c in a && a[c] === b)
            return c; return -1; }, oa = Array.prototype.forEach ? function (a, b, c) { Array.prototype.forEach.call(a, b, c); } : function (a, b, c) { for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
        f in e && b.call(c, e[f], f, a); };
    function pa(a) { a: {
        var b = qa;
        for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
            if (e in d && b.call(void 0, d[e], e, a)) {
                b = e;
                break a;
            }
        b = -1;
    } return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]; }
    function ra(a) { return Array.prototype.concat.apply([], arguments); }
    function sa(a) { var b = a.length; if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++)
            c[d] = a[d];
        return c;
    } return []; }
    function ta(a) { return /^[\s\xa0]*$/.test(a); }
    var ua = String.prototype.trim ? function (a) { return a.trim(); } : function (a) { return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]; };
    function v(a, b) { return -1 != a.indexOf(b); }
    function xa(a, b) { return a < b ? -1 : a > b ? 1 : 0; }
    var w;
    a: {
        var ya = k.navigator;
        if (ya) {
            var za = ya.userAgent;
            if (za) {
                w = za;
                break a;
            }
        }
        w = "";
    }
    function Aa(a, b, c) { for (var d in a)
        b.call(c, a[d], d, a); }
    function Ba(a) { var b = {}; for (var c in a)
        b[c] = a[c]; return b; }
    var Ca = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Da(a, b) { var c, d; for (var e = 1; e < arguments.length; e++) {
        d = arguments[e];
        for (c in d)
            a[c] = d[c];
        for (var f = 0; f < Ca.length; f++)
            c = Ca[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    } }
    function Ea(a) { Ea[" "](a); return a; }
    Ea[" "] = aa;
    function Fa(a, b) { var c = Ga; return Object.prototype.hasOwnProperty.call(c, a) ? c[a] : c[a] = b(a); }
    var Ha = v(w, "Opera"), x = v(w, "Trident") || v(w, "MSIE"), Ia = v(w, "Edge"), Ja = Ia || x, Ka = v(w, "Gecko") && !(v(w.toLowerCase(), "webkit") && !v(w, "Edge")) && !(v(w, "Trident") || v(w, "MSIE")) && !v(w, "Edge"), La = v(w.toLowerCase(), "webkit") && !v(w, "Edge");
    function Ma() { var a = k.document; return a ? a.documentMode : void 0; }
    var Na;
    a: {
        var Oa = "", Pa = function () { var a = w; if (Ka)
            return /rv:([^\);]+)(\)|;)/.exec(a); if (Ia)
            return /Edge\/([\d\.]+)/.exec(a); if (x)
            return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a); if (La)
            return /WebKit\/(\S+)/.exec(a); if (Ha)
            return /(?:Version)[ \/]?(\S+)/.exec(a); }();
        Pa && (Oa = Pa ? Pa[1] : "");
        if (x) {
            var Qa = Ma();
            if (null != Qa && Qa > parseFloat(Oa)) {
                Na = String(Qa);
                break a;
            }
        }
        Na = Oa;
    }
    var Ga = {};
    function Ra(a) { return Fa(a, function () { {
        var b = 0;
        var e = ua(String(Na)).split("."), f = ua(String(a)).split("."), h = Math.max(e.length, f.length);
        for (var m = 0; 0 == b && m < h; m++) {
            var c = e[m] || "", d = f[m] || "";
            do {
                c = /(\d*)(\D*)(.*)/.exec(c) || ["", "", "", ""];
                d = /(\d*)(\D*)(.*)/.exec(d) || ["", "", "", ""];
                if (0 == c[0].length && 0 == d[0].length)
                    break;
                b = xa(0 == c[1].length ? 0 : parseInt(c[1], 10), 0 == d[1].length ? 0 : parseInt(d[1], 10)) || xa(0 == c[2].length, 0 == d[2].length) || xa(c[2], d[2]);
                c = c[3];
                d = d[3];
            } while (0 == b);
        }
    } return 0 <= b; }); }
    var Sa;
    if (k.document && x) {
        var Ta = Ma();
        Sa = Ta ? Ta : parseInt(Na, 10) || void 0;
    }
    else
        Sa = void 0;
    var Ua = Sa;
    var Va = !x || 9 <= Number(Ua), Wa = x && !Ra("9"), Xa = function () { if (!k.addEventListener || !Object.defineProperty)
        return !1; var a = !1, b = Object.defineProperty({}, "passive", { get: function () { a = !0; } }); try {
        k.addEventListener("test", aa, b), k.removeEventListener("test", aa, b);
    }
    catch (c) { } return a; }();
    function y(a, b) { this.type = a; this.a = this.target = b; this.defaultPrevented = !1; }
    y.prototype.b = function () { this.defaultPrevented = !0; };
    function A(a, b) {
        y.call(this, a ? a.type : "");
        this.relatedTarget = this.a = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.c = null;
        if (a) {
            var c = this.type = a.type, d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.a = b;
            if (b = a.relatedTarget) {
                if (Ka) {
                    a: {
                        try {
                            Ea(b.nodeName);
                            var e = !0;
                            break a;
                        }
                        catch (f) { }
                        e = !1;
                    }
                    e || (b = null);
                }
            }
            else
                "mouseover" ==
                    c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
            this.button = a.button;
            this.key = a.key || "";
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey =
                a.metaKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ya[a.pointerType] || "";
            this.c = a;
            a.defaultPrevented && this.b();
        }
    }
    r(A, y);
    var Ya = { 2: "touch", 3: "pen", 4: "mouse" };
    A.prototype.b = function () { A.S.b.call(this); var a = this.c; if (a.preventDefault)
        a.preventDefault();
    else if (a.returnValue = !1, Wa)
        try {
            if (a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode)
                a.keyCode = -1;
        }
        catch (b) { } };
    var C = "closure_listenable_" + (1E6 * Math.random() | 0), Za = 0;
    function $a(a, b, c, d, e) { this.listener = a; this.proxy = null; this.src = b; this.type = c; this.capture = !!d; this.ca = e; this.key = ++Za; this.Y = this.Z = !1; }
    function ab(a) { a.Y = !0; a.listener = null; a.proxy = null; a.src = null; a.ca = null; }
    function bb(a) { this.src = a; this.a = {}; this.b = 0; }
    bb.prototype.add = function (a, b, c, d, e) { var f = a.toString(); a = this.a[f]; a || (a = this.a[f] = [], this.b++); var h = cb(a, b, d, e); -1 < h ? (b = a[h], c || (b.Z = !1)) : (b = new $a(b, this.src, f, !!d, e), b.Z = c, a.push(b)); return b; };
    function db(a, b) { var c = b.type; if (c in a.a) {
        var d = a.a[c], e = na(d, b), f;
        (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
        f && (ab(b), 0 == a.a[c].length && (delete a.a[c], a.b--));
    } }
    function cb(a, b, c, d) { for (var e = 0; e < a.length; ++e) {
        var f = a[e];
        if (!f.Y && f.listener == b && f.capture == !!c && f.ca == d)
            return e;
    } return -1; }
    var eb = "closure_lm_" + (1E6 * Math.random() | 0), fb = {};
    function hb(a, b, c, d, e) { if (d && d.once)
        return ib(a, b, c, d, e); if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            hb(a, b[f], c, d, e);
        return null;
    } c = jb(c); return a && a[C] ? a.va(b, c, n(d) ? !!d.capture : !!d, e) : kb(a, b, c, !1, d, e); }
    function kb(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var h = n(e) ? !!e.capture : !!e;
        if (h && !Va)
            return null;
        var m = lb(a);
        m || (a[eb] = m = new bb(a));
        c = m.add(b, c, d, h, f);
        if (c.proxy)
            return c;
        d = mb();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Xa || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(nb(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        return c;
    }
    function mb() { var a = ob, b = Va ? function (c) { return a.call(b.src, b.listener, c); } : function (c) { c = a.call(b.src, b.listener, c); if (!c)
        return c; }; return b; }
    function ib(a, b, c, d, e) { if (Array.isArray(b)) {
        for (var f = 0; f < b.length; f++)
            ib(a, b[f], c, d, e);
        return null;
    } c = jb(c); return a && a[C] ? a.wa(b, c, n(d) ? !!d.capture : !!d, e) : kb(a, b, c, !0, d, e); }
    function pb(a, b, c, d, e) { if (Array.isArray(b))
        for (var f = 0; f < b.length; f++)
            pb(a, b[f], c, d, e);
    else
        (d = n(d) ? !!d.capture : !!d, c = jb(c), a && a[C]) ? (a = a.c, b = String(b).toString(), b in a.a && (f = a.a[b], c = cb(f, c, d, e), -1 < c && (ab(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.a[b], a.b--)))) : a && (a = lb(a)) && (b = a.a[b.toString()], a = -1, b && (a = cb(b, c, d, e)), (c = -1 < a ? b[a] : null) && rb(c)); }
    function rb(a) { if ("number" !== typeof a && a && !a.Y) {
        var b = a.src;
        if (b && b[C])
            db(b.c, a);
        else {
            var c = a.type, d = a.proxy;
            b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(nb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
            (c = lb(b)) ? (db(c, a), 0 == c.b && (c.src = null, b[eb] = null)) : ab(a);
        }
    } }
    function nb(a) { return a in fb ? fb[a] : fb[a] = "on" + a; }
    function sb(a, b) { var c = a.listener, d = a.ca || a.src; a.Z && rb(a); return c.call(d, b); }
    function ob(a, b) { if (a.Y)
        return !0; if (!Va) {
        if (!b)
            a: {
                b = ["window", "event"];
                for (var c = k, d = 0; d < b.length; d++)
                    if (c = c[b[d]], null == c) {
                        b = null;
                        break a;
                    }
                b = c;
            }
        b = new A(b, this);
        return sb(a, b);
    } return sb(a, new A(b, this)); }
    function lb(a) { a = a[eb]; return a instanceof bb ? a : null; }
    var tb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function jb(a) { if ("function" == ba(a))
        return a; a[tb] || (a[tb] = function (b) { return a.handleEvent(b); }); return a[tb]; }
    function D() { u.call(this); this.c = new bb(this); this.J = this; this.C = null; }
    r(D, u);
    D.prototype[C] = !0;
    g = D.prototype;
    g.addEventListener = function (a, b, c, d) { hb(this, a, b, c, d); };
    g.removeEventListener = function (a, b, c, d) { pb(this, a, b, c, d); };
    g.dispatchEvent = function (a) { var b, c = this.C; if (c)
        for (b = []; c; c = c.C)
            b.push(c); c = this.J; var d = a.type || a; if ("string" === typeof a)
        a = new y(a, c);
    else if (a instanceof y)
        a.target = a.target || c;
    else {
        var e = a;
        a = new y(d, c);
        Da(a, e);
    } e = !0; if (b)
        for (var f = b.length - 1; 0 <= f; f--) {
            var h = a.a = b[f];
            e = ub(h, d, !0, a) && e;
        } h = a.a = c; e = ub(h, d, !0, a) && e; e = ub(h, d, !1, a) && e; if (b)
        for (f = 0; f < b.length; f++)
            h = a.a = b[f], e = ub(h, d, !1, a) && e; return e; };
    g.G = function () { D.S.G.call(this); if (this.c) {
        var a = this.c, c;
        for (c in a.a) {
            for (var d = a.a[c], e = 0; e < d.length; e++)
                ab(d[e]);
            delete a.a[c];
            a.b--;
        }
    } this.C = null; };
    g.va = function (a, b, c, d) { return this.c.add(String(a), b, !1, c, d); };
    g.wa = function (a, b, c, d) { return this.c.add(String(a), b, !0, c, d); };
    function ub(a, b, c, d) { b = a.c.a[String(b)]; if (!b)
        return !0; b = b.concat(); for (var e = !0, f = 0; f < b.length; ++f) {
        var h = b[f];
        if (h && !h.Y && h.capture == c) {
            var m = h.listener, l = h.ca || h.src;
            h.Z && db(a.c, h);
            e = !1 !== m.call(l, d) && e;
        }
    } return e && !d.defaultPrevented; }
    var vb = k.JSON.stringify;
    function wb() { this.b = this.a = null; }
    var yb = new /** @class */ (function () {
        function class_1(a, b, c) {
            this.f = c;
            this.c = a;
            this.g = b;
            this.b = 0;
            this.a = null;
        }
        class_1.prototype.get = function () { var a; 0 < this.b ? (this.b--, a = this.a, this.a = a.next, a.next = null) : a = this.c(); return a; };
        return class_1;
    }())(function () { return new xb; }, function (a) { a.reset(); }, 100);
    wb.prototype.add = function (a, b) { var c = yb.get(); c.set(a, b); this.b ? this.b.next = c : this.a = c; this.b = c; };
    function zb() { var a = Ab, b = null; a.a && (b = a.a, a.a = a.a.next, a.a || (a.b = null), b.next = null); return b; }
    function xb() { this.next = this.b = this.a = null; }
    xb.prototype.set = function (a, b) { this.a = a; this.b = b; this.next = null; };
    xb.prototype.reset = function () { this.next = this.b = this.a = null; };
    function Bb(a) { k.setTimeout(function () { throw a; }, 0); }
    function Cb(a, b) { Db || Eb(); Fb || (Db(), Fb = !0); Ab.add(a, b); }
    var Db;
    function Eb() { var a = k.Promise.resolve(void 0); Db = function () { a.then(Gb); }; }
    var Fb = !1, Ab = new wb;
    function Gb() { for (var a; a = zb();) {
        try {
            a.a.call(a.b);
        }
        catch (c) {
            Bb(c);
        }
        var b = yb;
        b.g(a);
        b.b < b.f && (b.b++, a.next = b.a, b.a = a);
    } Fb = !1; }
    function Hb(a, b) { D.call(this); this.b = a || 1; this.a = b || k; this.f = p(this.Ya, this); this.g = q(); }
    r(Hb, D);
    g = Hb.prototype;
    g.aa = !1;
    g.M = null;
    g.Ya = function () { if (this.aa) {
        var a = q() - this.g;
        0 < a && a < .8 * this.b ? this.M = this.a.setTimeout(this.f, this.b - a) : (this.M && (this.a.clearTimeout(this.M), this.M = null), this.dispatchEvent("tick"), this.aa && (Ib(this), this.start()));
    } };
    g.start = function () { this.aa = !0; this.M || (this.M = this.a.setTimeout(this.f, this.b), this.g = q()); };
    function Ib(a) { a.aa = !1; a.M && (a.a.clearTimeout(a.M), a.M = null); }
    g.G = function () { Hb.S.G.call(this); Ib(this); delete this.a; };
    function Jb(a, b, c) { if ("function" == ba(a))
        c && (a = p(a, c));
    else if (a && "function" == typeof a.handleEvent)
        a = p(a.handleEvent, a);
    else
        throw Error("Invalid listener argument"); return 2147483647 < Number(b) ? -1 : k.setTimeout(a, b || 0); }
    function Kb(a) { a.a = Jb(function () { a.a = null; a.c && (a.c = !1, Kb(a)); }, a.h); var b = a.b; a.b = null; a.g.apply(null, b); }
    var Lb = /** @class */ (function (_super) {
        __extends$1(Lb, _super);
        function Lb(a, b, c) {
            var _this = _super.call(this) || this;
            _this.g = null != c ? a.bind(c) : a;
            _this.h = b;
            _this.b = null;
            _this.c = !1;
            _this.a = null;
            return _this;
        }
        Lb.prototype.f = function (a) { this.b = arguments; this.a ? this.c = !0 : Kb(this); };
        Lb.prototype.G = function () { _super.prototype.G.call(this); this.a && (k.clearTimeout(this.a), this.a = null, this.c = !1, this.b = null); };
        return Lb;
    }(u));
    function E(a) { u.call(this); this.b = a; this.a = {}; }
    r(E, u);
    var Mb = [];
    function Nb(a, b, c, d) { Array.isArray(c) || (c && (Mb[0] = c.toString()), c = Mb); for (var e = 0; e < c.length; e++) {
        var f = hb(b, c[e], d || a.handleEvent, !1, a.b || a);
        if (!f)
            break;
        a.a[f.key] = f;
    } }
    function Ob(a) { Aa(a.a, function (b, c) { this.a.hasOwnProperty(c) && rb(b); }, a); a.a = {}; }
    E.prototype.G = function () { E.S.G.call(this); Ob(this); };
    E.prototype.handleEvent = function () { throw Error("EventHandler.handleEvent not implemented"); };
    function Pb() { this.a = !0; }
    function Qb(a, b, c, d, e, f) { a.info(function () { if (a.a)
        if (f) {
            var h = "";
            for (var m = f.split("&"), l = 0; l < m.length; l++) {
                var t = m[l].split("=");
                if (1 < t.length) {
                    var B = t[0];
                    t = t[1];
                    var z = B.split("_");
                    h = 2 <= z.length && "type" == z[1] ? h + (B + "=" + t + "&") : h + (B + "=redacted&");
                }
            }
        }
        else
            h = null;
    else
        h = f; return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + "\n" + c + "\n" + h; }); }
    function Rb(a, b, c, d, e, f, h) { a.info(function () { return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + "\n" + c + "\n" + f + " " + h; }); }
    function F(a, b, c, d) { a.info(function () { return "XMLHTTP TEXT (" + b + "): " + Sb(a, c) + (d ? " " + d : ""); }); }
    function Tb(a, b) { a.info(function () { return "TIMEOUT: " + b; }); }
    Pb.prototype.info = function () { };
    function Sb(a, b) { if (!a.a)
        return b; if (!b)
        return null; try {
        var c = JSON.parse(b);
        if (c)
            for (a = 0; a < c.length; a++)
                if (Array.isArray(c[a])) {
                    var d = c[a];
                    if (!(2 > d.length)) {
                        var e = d[1];
                        if (Array.isArray(e) && !(1 > e.length)) {
                            var f = e[0];
                            if ("noop" != f && "stop" != f && "close" != f)
                                for (var h = 1; h < e.length; h++)
                                    e[h] = "";
                        }
                    }
                }
        return vb(c);
    }
    catch (m) {
        return b;
    } }
    var Ub = null;
    function Vb() { return Ub = Ub || new D; }
    function Wb(a) { y.call(this, "serverreachability", a); }
    r(Wb, y);
    function G(a) { var b = Vb(); b.dispatchEvent(new Wb(b, a)); }
    function Xb(a) { y.call(this, "statevent", a); }
    r(Xb, y);
    function H(a) { var b = Vb(); b.dispatchEvent(new Xb(b, a)); }
    function Yb(a) { y.call(this, "timingevent", a); }
    r(Yb, y);
    function I(a, b) { if ("function" != ba(a))
        throw Error("Fn must not be null and must be a function"); return k.setTimeout(function () { a(); }, b); }
    var Zb = { NO_ERROR: 0, Za: 1, gb: 2, fb: 3, bb: 4, eb: 5, hb: 6, Da: 7, TIMEOUT: 8, kb: 9 };
    var $b = { ab: "complete", ob: "success", Ea: "error", Da: "abort", mb: "ready", nb: "readystatechange", TIMEOUT: "timeout", ib: "incrementaldata", lb: "progress", cb: "downloadprogress", pb: "uploadprogress" };
    function ac() { }
    ac.prototype.a = null;
    function bc(a) { var b; (b = a.a) || (b = a.a = {}); return b; }
    function cc() { }
    var J = { OPEN: "a", $a: "b", Ea: "c", jb: "d" };
    function dc() { y.call(this, "d"); }
    r(dc, y);
    function ec() { y.call(this, "c"); }
    r(ec, y);
    var fc;
    function gc() { }
    r(gc, ac);
    fc = new gc;
    function K(a, b, c, d) { this.g = a; this.c = b; this.f = c; this.T = d || 1; this.J = new E(this); this.P = hc; a = Ja ? 125 : void 0; this.R = new Hb(a); this.B = null; this.b = !1; this.j = this.l = this.i = this.H = this.u = this.U = this.o = null; this.s = []; this.a = null; this.D = 0; this.h = this.m = null; this.N = -1; this.A = !1; this.O = 0; this.F = null; this.W = this.C = this.V = this.I = !1; }
    var hc = 45E3, ic = {}, jc = {};
    g = K.prototype;
    g.setTimeout = function (a) { this.P = a; };
    function kc(a, b, c) { a.H = 1; a.i = lc(L(b)); a.j = c; a.I = !0; mc(a, null); }
    function mc(a, b) { a.u = q(); M(a); a.l = L(a.i); var c = a.l, d = a.T; Array.isArray(d) || (d = [String(d)]); nc(c.b, "t", d); a.D = 0; a.a = oc(a.g, a.g.C ? b : null); 0 < a.O && (a.F = new Lb(p(a.Ca, a, a.a), a.O)); Nb(a.J, a.a, "readystatechange", a.Wa); b = a.B ? Ba(a.B) : {}; a.j ? (a.m || (a.m = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.a.ba(a.l, a.m, a.j, b)) : (a.m = "GET", a.a.ba(a.l, a.m, null, b)); G(1); Qb(a.c, a.m, a.l, a.f, a.T, a.j); }
    g.Wa = function (a) { a = a.target; var b = this.F; b && 3 == N(a) ? b.f() : this.Ca(a); };
    g.Ca = function (a) {
        try {
            if (a == this.a)
                a: {
                    var b = N(this.a), c = this.a.ua(), d = this.a.X();
                    if (!(3 > b || 3 == b && !Ja && !this.a.$())) {
                        this.A || 4 != b || 7 == c || (8 == c || 0 >= d ? G(3) : G(2));
                        pc(this);
                        var e = this.a.X();
                        this.N = e;
                        var f = this.a.$();
                        this.b = 200 == e;
                        Rb(this.c, this.m, this.l, this.f, this.T, b, e);
                        if (this.b) {
                            if (this.V && !this.C) {
                                b: {
                                    if (this.a) {
                                        var h, m = this.a;
                                        if ((h = m.a ? m.a.getResponseHeader("X-HTTP-Initial-Response") : null) && !ta(h)) {
                                            var l = h;
                                            break b;
                                        }
                                    }
                                    l = null;
                                }
                                if (l)
                                    F(this.c, this.f, l, "Initial handshake response via X-HTTP-Initial-Response"),
                                        this.C = !0, qc(this, l);
                                else {
                                    this.b = !1;
                                    this.h = 3;
                                    H(12);
                                    O(this);
                                    rc(this);
                                    break a;
                                }
                            }
                            this.I ? (tc(this, b, f), Ja && this.b && 3 == b && (Nb(this.J, this.R, "tick", this.Va), this.R.start())) : (F(this.c, this.f, f, null), qc(this, f));
                            4 == b && O(this);
                            this.b && !this.A && (4 == b ? uc(this.g, this) : (this.b = !1, M(this)));
                        }
                        else
                            400 == e && 0 < f.indexOf("Unknown SID") ? (this.h = 3, H(12)) : (this.h = 0, H(13)), O(this), rc(this);
                    }
                }
        }
        catch (t) { }
        finally { }
    };
    function tc(a, b, c) { for (var d = !0; !a.A && a.D < c.length;) {
        var e = vc(a, c);
        if (e == jc) {
            4 == b && (a.h = 4, H(14), d = !1);
            F(a.c, a.f, null, "[Incomplete Response]");
            break;
        }
        else if (e == ic) {
            a.h = 4;
            H(15);
            F(a.c, a.f, c, "[Invalid Chunk]");
            d = !1;
            break;
        }
        else
            F(a.c, a.f, e, null), qc(a, e);
    } 4 == b && 0 == c.length && (a.h = 1, H(16), d = !1); a.b = a.b && d; d ? 0 < c.length && !a.W && (a.W = !0, b = a.g, b.a == a && b.V && !b.F && (b.c.info("Great, no buffering proxy detected. Bytes received: " + c.length), xc(b), b.F = !0)) : (F(a.c, a.f, c, "[Invalid Chunked Response]"), O(a), rc(a)); }
    g.Va = function () { if (this.a) {
        var a = N(this.a), b = this.a.$();
        this.D < b.length && (pc(this), tc(this, a, b), this.b && 4 != a && M(this));
    } };
    function vc(a, b) { var c = a.D, d = b.indexOf("\n", c); if (-1 == d)
        return jc; c = Number(b.substring(c, d)); if (isNaN(c))
        return ic; d += 1; if (d + c > b.length)
        return jc; b = b.substr(d, c); a.D = d + c; return b; }
    g.cancel = function () { this.A = !0; O(this); };
    function M(a) { a.U = q() + a.P; yc(a, a.P); }
    function yc(a, b) { if (null != a.o)
        throw Error("WatchDog timer not null"); a.o = I(p(a.Ua, a), b); }
    function pc(a) { a.o && (k.clearTimeout(a.o), a.o = null); }
    g.Ua = function () { this.o = null; var a = q(); 0 <= a - this.U ? (Tb(this.c, this.l), 2 != this.H && (G(3), H(17)), O(this), this.h = 2, rc(this)) : yc(this, this.U - a); };
    function rc(a) { 0 == a.g.v || a.A || uc(a.g, a); }
    function O(a) { pc(a); var b = a.F; b && "function" == typeof b.ja && b.ja(); a.F = null; Ib(a.R); Ob(a.J); a.a && (b = a.a, a.a = null, b.abort(), b.ja()); }
    function qc(a, b) {
        try {
            var c = a.g;
            if (0 != c.v && (c.a == a || zc(c.b, a)))
                if (c.I = a.N, !a.C && zc(c.b, a) && 3 == c.v) {
                    try {
                        var d = c.ka.a.parse(b);
                    }
                    catch (sc) {
                        d = null;
                    }
                    if (Array.isArray(d) && 3 == d.length) {
                        var e = d;
                        if (0 == e[0])
                            a: {
                                if (!c.j) {
                                    if (c.a)
                                        if (c.a.u + 3E3 < a.u)
                                            Ac(c), Bc(c);
                                        else
                                            break a;
                                    Cc(c);
                                    H(18);
                                }
                            }
                        else
                            c.oa = e[1], 0 < c.oa - c.P && 37500 > e[2] && c.H && 0 == c.o && !c.m && (c.m = I(p(c.Ra, c), 6E3));
                        if (1 >= Dc(c.b) && c.ea) {
                            try {
                                c.ea();
                            }
                            catch (sc) { }
                            c.ea = void 0;
                        }
                    }
                    else
                        P(c, 11);
                }
                else if ((a.C || c.a == a) && Ac(c), !ta(b))
                    for (b = d = c.ka.a.parse(b), d = 0; d < b.length; d++)
                        if (e =
                            b[d], c.P = e[0], e = e[1], 2 == c.v)
                            if ("c" == e[0]) {
                                c.J = e[1];
                                c.ga = e[2];
                                var f = e[3];
                                null != f && (c.ha = f, c.c.info("VER=" + c.ha));
                                var h = e[4];
                                null != h && (c.pa = h, c.c.info("SVER=" + c.pa));
                                var m = e[5];
                                if (null != m && "number" === typeof m && 0 < m) {
                                    var l = 1.5 * m;
                                    c.D = l;
                                    c.c.info("backChannelRequestTimeoutMs_=" + l);
                                }
                                l = c;
                                var t = a.a;
                                if (t) {
                                    var B = t.a ? t.a.getResponseHeader("X-Client-Wire-Protocol") : null;
                                    if (B) {
                                        var z = l.b;
                                        !z.a && (v(B, "spdy") || v(B, "quic") || v(B, "h2")) && (z.f = z.g, z.a = new Set, z.b && (Ec(z, z.b), z.b = null));
                                    }
                                    if (l.A) {
                                        var qb = t.a ? t.a.getResponseHeader("X-HTTP-Session-Id") :
                                            null;
                                        qb && (l.na = qb, Q(l.B, l.A, qb));
                                    }
                                }
                                c.v = 3;
                                c.f && c.f.ta();
                                c.V && (c.N = q() - a.u, c.c.info("Handshake RTT: " + c.N + "ms"));
                                l = c;
                                var va = a;
                                l.la = Fc(l, l.C ? l.ga : null, l.fa);
                                if (va.C) {
                                    Gc(l.b, va);
                                    var wa = va, wc = l.D;
                                    wc && wa.setTimeout(wc);
                                    wa.o && (pc(wa), M(wa));
                                    l.a = va;
                                }
                                else
                                    Hc(l);
                                0 < c.g.length && Ic(c);
                            }
                            else
                                "stop" != e[0] && "close" != e[0] || P(c, 7);
                        else
                            3 == c.v && ("stop" == e[0] || "close" == e[0] ? "stop" == e[0] ? P(c, 7) : Jc(c) : "noop" != e[0] && c.f && c.f.sa(e), c.o = 0);
            G(4);
        }
        catch (sc) { }
    }
    function Kc(a) { if (a.K && "function" == typeof a.K)
        return a.K(); if ("string" === typeof a)
        return a.split(""); if (ca(a)) {
        for (var b = [], c = a.length, d = 0; d < c; d++)
            b.push(a[d]);
        return b;
    } b = []; c = 0; for (d in a)
        b[c++] = a[d]; return a = b; }
    function Lc(a, b) { if (a.forEach && "function" == typeof a.forEach)
        a.forEach(b, void 0);
    else if (ca(a) || "string" === typeof a)
        oa(a, b, void 0);
    else {
        if (a.L && "function" == typeof a.L)
            var c = a.L();
        else if (a.K && "function" == typeof a.K)
            c = void 0;
        else if (ca(a) || "string" === typeof a) {
            c = [];
            for (var d = a.length, e = 0; e < d; e++)
                c.push(e);
        }
        else
            for (e in c = [], d = 0, a)
                c[d++] = e;
        d = Kc(a);
        e = d.length;
        for (var f = 0; f < e; f++)
            b.call(void 0, d[f], c && c[f], a);
    } }
    function R(a, b) { this.b = {}; this.a = []; this.c = 0; var c = arguments.length; if (1 < c) {
        if (c % 2)
            throw Error("Uneven number of arguments");
        for (var d = 0; d < c; d += 2)
            this.set(arguments[d], arguments[d + 1]);
    }
    else if (a)
        if (a instanceof R)
            for (c = a.L(), d = 0; d < c.length; d++)
                this.set(c[d], a.get(c[d]));
        else
            for (d in a)
                this.set(d, a[d]); }
    g = R.prototype;
    g.K = function () { Mc(this); for (var a = [], b = 0; b < this.a.length; b++)
        a.push(this.b[this.a[b]]); return a; };
    g.L = function () { Mc(this); return this.a.concat(); };
    function Mc(a) { if (a.c != a.a.length) {
        for (var b = 0, c = 0; b < a.a.length;) {
            var d = a.a[b];
            S(a.b, d) && (a.a[c++] = d);
            b++;
        }
        a.a.length = c;
    } if (a.c != a.a.length) {
        var e = {};
        for (c = b = 0; b < a.a.length;)
            d = a.a[b], S(e, d) || (a.a[c++] = d, e[d] = 1), b++;
        a.a.length = c;
    } }
    g.get = function (a, b) { return S(this.b, a) ? this.b[a] : b; };
    g.set = function (a, b) { S(this.b, a) || (this.c++, this.a.push(a)); this.b[a] = b; };
    g.forEach = function (a, b) { for (var c = this.L(), d = 0; d < c.length; d++) {
        var e = c[d], f = this.get(e);
        a.call(b, f, e, this);
    } };
    function S(a, b) { return Object.prototype.hasOwnProperty.call(a, b); }
    var Nc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
    function Oc(a, b) { if (a) {
        a = a.split("&");
        for (var c = 0; c < a.length; c++) {
            var d = a[c].indexOf("="), e = null;
            if (0 <= d) {
                var f = a[c].substring(0, d);
                e = a[c].substring(d + 1);
            }
            else
                f = a[c];
            b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
        }
    } }
    function T(a, b) { this.c = this.j = this.f = ""; this.h = null; this.i = this.g = ""; this.a = !1; if (a instanceof T) {
        this.a = void 0 !== b ? b : a.a;
        Pc(this, a.f);
        this.j = a.j;
        Qc(this, a.c);
        Rc(this, a.h);
        this.g = a.g;
        b = a.b;
        var c = new U;
        c.c = b.c;
        b.a && (c.a = new R(b.a), c.b = b.b);
        Sc(this, c);
        this.i = a.i;
    }
    else
        a && (c = String(a).match(Nc)) ? (this.a = !!b, Pc(this, c[1] || "", !0), this.j = Tc(c[2] || ""), Qc(this, c[3] || "", !0), Rc(this, c[4]), this.g = Tc(c[5] || "", !0), Sc(this, c[6] || "", !0), this.i = Tc(c[7] || "")) : (this.a = !!b, this.b = new U(null, this.a)); }
    T.prototype.toString = function () { var a = [], b = this.f; b && a.push(Uc(b, Vc, !0), ":"); var c = this.c; if (c || "file" == b)
        a.push("//"), (b = this.j) && a.push(Uc(b, Vc, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.h, null != c && a.push(":", String(c)); if (c = this.g)
        this.c && "/" != c.charAt(0) && a.push("/"), a.push(Uc(c, "/" == c.charAt(0) ? Wc : Xc, !0)); (c = this.b.toString()) && a.push("?", c); (c = this.i) && a.push("#", Uc(c, Yc)); return a.join(""); };
    function L(a) { return new T(a); }
    function Pc(a, b, c) { a.f = c ? Tc(b, !0) : b; a.f && (a.f = a.f.replace(/:$/, "")); }
    function Qc(a, b, c) { a.c = c ? Tc(b, !0) : b; }
    function Rc(a, b) { if (b) {
        b = Number(b);
        if (isNaN(b) || 0 > b)
            throw Error("Bad port number " + b);
        a.h = b;
    }
    else
        a.h = null; }
    function Sc(a, b, c) { b instanceof U ? (a.b = b, Zc(a.b, a.a)) : (c || (b = Uc(b, $c)), a.b = new U(b, a.a)); }
    function Q(a, b, c) { a.b.set(b, c); }
    function lc(a) { Q(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ q()).toString(36)); return a; }
    function ad(a) { return a instanceof T ? L(a) : new T(a, void 0); }
    function bd(a, b, c, d) { var e = new T(null, void 0); a && Pc(e, a); b && Qc(e, b); c && Rc(e, c); d && (e.g = d); return e; }
    function Tc(a, b) { return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""; }
    function Uc(a, b, c) { return "string" === typeof a ? (a = encodeURI(a).replace(b, cd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null; }
    function cd(a) { a = a.charCodeAt(0); return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16); }
    var Vc = /[#\/\?@]/g, Xc = /[#\?:]/g, Wc = /[#\?]/g, $c = /[#\?@]/g, Yc = /#/g;
    function U(a, b) { this.b = this.a = null; this.c = a || null; this.f = !!b; }
    function V(a) { a.a || (a.a = new R, a.b = 0, a.c && Oc(a.c, function (b, c) { a.add(decodeURIComponent(b.replace(/\+/g, " ")), c); })); }
    g = U.prototype;
    g.add = function (a, b) { V(this); this.c = null; a = W(this, a); var c = this.a.get(a); c || this.a.set(a, c = []); c.push(b); this.b += 1; return this; };
    function dd(a, b) { V(a); b = W(a, b); S(a.a.b, b) && (a.c = null, a.b -= a.a.get(b).length, a = a.a, S(a.b, b) && (delete a.b[b], a.c--, a.a.length > 2 * a.c && Mc(a))); }
    function ed(a, b) { V(a); b = W(a, b); return S(a.a.b, b); }
    g.forEach = function (a, b) { V(this); this.a.forEach(function (c, d) { oa(c, function (e) { a.call(b, e, d, this); }, this); }, this); };
    g.L = function () { V(this); for (var a = this.a.K(), b = this.a.L(), c = [], d = 0; d < b.length; d++)
        for (var e = a[d], f = 0; f < e.length; f++)
            c.push(b[d]); return c; };
    g.K = function (a) { V(this); var b = []; if ("string" === typeof a)
        ed(this, a) && (b = ra(b, this.a.get(W(this, a))));
    else {
        a = this.a.K();
        for (var c = 0; c < a.length; c++)
            b = ra(b, a[c]);
    } return b; };
    g.set = function (a, b) { V(this); this.c = null; a = W(this, a); ed(this, a) && (this.b -= this.a.get(a).length); this.a.set(a, [b]); this.b += 1; return this; };
    g.get = function (a, b) { if (!a)
        return b; a = this.K(a); return 0 < a.length ? String(a[0]) : b; };
    function nc(a, b, c) { dd(a, b); 0 < c.length && (a.c = null, a.a.set(W(a, b), sa(c)), a.b += c.length); }
    g.toString = function () { if (this.c)
        return this.c; if (!this.a)
        return ""; for (var a = [], b = this.a.L(), c = 0; c < b.length; c++) {
        var d = b[c], e = encodeURIComponent(String(d));
        d = this.K(d);
        for (var f = 0; f < d.length; f++) {
            var h = e;
            "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
            a.push(h);
        }
    } return this.c = a.join("&"); };
    function W(a, b) { b = String(b); a.f && (b = b.toLowerCase()); return b; }
    function Zc(a, b) { b && !a.f && (V(a), a.c = null, a.a.forEach(function (c, d) { var e = d.toLowerCase(); d != e && (dd(this, d), nc(this, e, c)); }, a)); a.f = b; }
    function fd(a, b) { this.b = a; this.a = b; }
    function gd(a) { this.g = a || hd; k.PerformanceNavigationTiming ? (a = k.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(k.ia && k.ia.ya && k.ia.ya() && k.ia.ya().qb); this.f = a ? this.g : 1; this.a = null; 1 < this.f && (this.a = new Set); this.b = null; this.c = []; }
    var hd = 10;
    function id(a) { return a.b ? !0 : a.a ? a.a.size >= a.f : !1; }
    function Dc(a) { return a.b ? 1 : a.a ? a.a.size : 0; }
    function zc(a, b) { return a.b ? a.b == b : a.a ? a.a.has(b) : !1; }
    function Ec(a, b) { a.a ? a.a.add(b) : a.b = b; }
    function Gc(a, b) { a.b && a.b == b ? a.b = null : a.a && a.a.has(b) && a.a.delete(b); }
    gd.prototype.cancel = function () {
        var e_1, _a;
        this.c = jd(this);
        if (this.b)
            this.b.cancel(), this.b = null;
        else if (this.a && 0 !== this.a.size) {
            try {
                for (var _b = __values(this.a.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var a = _c.value;
                    a.cancel();
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this.a.clear();
        }
    };
    function jd(a) {
        var e_2, _a;
        if (null != a.b)
            return a.c.concat(a.b.s);
        if (null != a.a && 0 !== a.a.size) {
            var b = a.c;
            try {
                for (var _b = __values(a.a.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var c = _c.value;
                    b = b.concat(c.s);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return b;
        }
        return sa(a.c);
    }
    function kd() { }
    kd.prototype.stringify = function (a) { return k.JSON.stringify(a, void 0); };
    kd.prototype.parse = function (a) { return k.JSON.parse(a, void 0); };
    function ld() { this.a = new kd; }
    function md(a, b, c) { var d = c || ""; try {
        Lc(a, function (e, f) { var h = e; n(e) && (h = vb(e)); b.push(d + f + "=" + encodeURIComponent(h)); });
    }
    catch (e) {
        throw b.push(d + "type=" + encodeURIComponent("_badmap")), e;
    } }
    function nd(a, b) { var c = new Pb; if (k.Image) {
        var d = new Image;
        d.onload = ka(od, c, d, "TestLoadImage: loaded", !0, b);
        d.onerror = ka(od, c, d, "TestLoadImage: error", !1, b);
        d.onabort = ka(od, c, d, "TestLoadImage: abort", !1, b);
        d.ontimeout = ka(od, c, d, "TestLoadImage: timeout", !1, b);
        k.setTimeout(function () { if (d.ontimeout)
            d.ontimeout(); }, 1E4);
        d.src = a;
    }
    else
        b(!1); }
    function od(a, b, c, d, e) { try {
        b.onload = null, b.onerror = null, b.onabort = null, b.ontimeout = null, e(d);
    }
    catch (f) { } }
    var pd = k.JSON.parse;
    function X(a) { D.call(this); this.headers = new R; this.H = a || null; this.b = !1; this.s = this.a = null; this.B = ""; this.h = 0; this.f = ""; this.g = this.A = this.l = this.u = !1; this.o = 0; this.m = null; this.I = qd; this.D = this.F = !1; }
    r(X, D);
    var qd = "", rd = /^https?$/i, sd = ["POST", "PUT"];
    g = X.prototype;
    g.ba = function (a, b, c, d) {
        if (this.a)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + this.B + "; newUri=" + a);
        b = b ? b.toUpperCase() : "GET";
        this.B = a;
        this.f = "";
        this.h = 0;
        this.u = !1;
        this.b = !0;
        this.a = new XMLHttpRequest;
        this.s = this.H ? bc(this.H) : bc(fc);
        this.a.onreadystatechange = p(this.za, this);
        try {
            this.A = !0, this.a.open(b, String(a), !0), this.A = !1;
        }
        catch (f) {
            td(this, f);
            return;
        }
        a = c || "";
        var e = new R(this.headers);
        d && Lc(d, function (f, h) { e.set(h, f); });
        d = pa(e.L());
        c = k.FormData && a instanceof k.FormData;
        !(0 <=
            na(sd, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        e.forEach(function (f, h) { this.a.setRequestHeader(h, f); }, this);
        this.I && (this.a.responseType = this.I);
        "withCredentials" in this.a && this.a.withCredentials !== this.F && (this.a.withCredentials = this.F);
        try {
            ud(this), 0 < this.o && ((this.D = vd(this.a)) ? (this.a.timeout = this.o, this.a.ontimeout = p(this.xa, this)) : this.m = Jb(this.xa, this.o, this)), this.l = !0, this.a.send(a), this.l = !1;
        }
        catch (f) {
            td(this, f);
        }
    };
    function vd(a) { return x && Ra(9) && "number" === typeof a.timeout && void 0 !== a.ontimeout; }
    function qa(a) { return "content-type" == a.toLowerCase(); }
    g.xa = function () { "undefined" != typeof goog && this.a && (this.f = "Timed out after " + this.o + "ms, aborting", this.h = 8, this.dispatchEvent("timeout"), this.abort(8)); };
    function td(a, b) { a.b = !1; a.a && (a.g = !0, a.a.abort(), a.g = !1); a.f = b; a.h = 5; wd(a); xd(a); }
    function wd(a) { a.u || (a.u = !0, a.dispatchEvent("complete"), a.dispatchEvent("error")); }
    g.abort = function (a) { this.a && this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1, this.h = a || 7, this.dispatchEvent("complete"), this.dispatchEvent("abort"), xd(this)); };
    g.G = function () { this.a && (this.b && (this.b = !1, this.g = !0, this.a.abort(), this.g = !1), xd(this, !0)); X.S.G.call(this); };
    g.za = function () { this.j || (this.A || this.l || this.g ? yd(this) : this.Ta()); };
    g.Ta = function () { yd(this); };
    function yd(a) {
        if (a.b && "undefined" != typeof goog && (!a.s[1] || 4 != N(a) || 2 != a.X()))
            if (a.l && 4 == N(a))
                Jb(a.za, 0, a);
            else if (a.dispatchEvent("readystatechange"), 4 == N(a)) {
                a.b = !1;
                try {
                    var b = a.X();
                    a: switch (b) {
                        case 200:
                        case 201:
                        case 202:
                        case 204:
                        case 206:
                        case 304:
                        case 1223:
                            var c = !0;
                            break a;
                        default: c = !1;
                    }
                    var d;
                    if (!(d = c)) {
                        var e;
                        if (e = 0 === b) {
                            var f = String(a.B).match(Nc)[1] || null;
                            if (!f && k.self && k.self.location) {
                                var h = k.self.location.protocol;
                                f = h.substr(0, h.length - 1);
                            }
                            e = !rd.test(f ? f.toLowerCase() : "");
                        }
                        d = e;
                    }
                    if (d)
                        a.dispatchEvent("complete"),
                            a.dispatchEvent("success");
                    else {
                        a.h = 6;
                        try {
                            var m = 2 < N(a) ? a.a.statusText : "";
                        }
                        catch (l) {
                            m = "";
                        }
                        a.f = m + " [" + a.X() + "]";
                        wd(a);
                    }
                }
                finally {
                    xd(a);
                }
            }
    }
    function xd(a, b) { if (a.a) {
        ud(a);
        var c = a.a, d = a.s[0] ? aa : null;
        a.a = null;
        a.s = null;
        b || a.dispatchEvent("ready");
        try {
            c.onreadystatechange = d;
        }
        catch (e) { }
    } }
    function ud(a) { a.a && a.D && (a.a.ontimeout = null); a.m && (k.clearTimeout(a.m), a.m = null); }
    function N(a) { return a.a ? a.a.readyState : 0; }
    g.X = function () { try {
        return 2 < N(this) ? this.a.status : -1;
    }
    catch (a) {
        return -1;
    } };
    g.$ = function () { try {
        return this.a ? this.a.responseText : "";
    }
    catch (a) {
        return "";
    } };
    g.Na = function (a) { if (this.a) {
        var b = this.a.responseText;
        a && 0 == b.indexOf(a) && (b = b.substring(a.length));
        return pd(b);
    } };
    g.ua = function () { return this.h; };
    g.Qa = function () { return "string" === typeof this.f ? this.f : String(this.f); };
    function zd(a) { var b = ""; Aa(a, function (c, d) { b += d; b += ":"; b += c; b += "\r\n"; }); return b; }
    function Ad(a, b, c) { a: {
        for (d in c) {
            var d = !1;
            break a;
        }
        d = !0;
    } d || (c = zd(c), "string" === typeof a ? (null != c && encodeURIComponent(String(c))) : Q(a, b, c)); }
    function Bd(a, b, c) { return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b; }
    function Cd(a) {
        this.pa = 0;
        this.g = [];
        this.c = new Pb;
        this.ga = this.la = this.B = this.fa = this.a = this.na = this.A = this.W = this.i = this.O = this.l = null;
        this.La = this.R = 0;
        this.Ia = Bd("failFast", !1, a);
        this.H = this.m = this.j = this.h = this.f = null;
        this.T = !0;
        this.I = this.oa = this.P = -1;
        this.U = this.o = this.u = 0;
        this.Fa = Bd("baseRetryDelayMs", 5E3, a);
        this.Ma = Bd("retryDelaySeedMs", 1E4, a);
        this.Ja = Bd("forwardChannelMaxRetries", 2, a);
        this.ma = Bd("forwardChannelRequestTimeoutMs", 2E4, a);
        this.Ka = a && a.g || void 0;
        this.D = void 0;
        this.C = a && a.supportsCrossDomainXhr ||
            !1;
        this.J = "";
        this.b = new gd(a && a.concurrentRequestLimit);
        this.ka = new ld;
        this.da = a && a.fastHandshake || !1;
        this.Ga = a && a.b || !1;
        a && a.f && (this.c.a = !1);
        a && a.forceLongPolling && (this.T = !1);
        this.V = !this.da && this.T && a && a.c || !1;
        this.ea = void 0;
        this.N = 0;
        this.F = !1;
        this.s = null;
    }
    g = Cd.prototype;
    g.ha = 8;
    g.v = 1;
    function Jc(a) { Dd(a); if (3 == a.v) {
        var b = a.R++, c = L(a.B);
        Q(c, "SID", a.J);
        Q(c, "RID", b);
        Q(c, "TYPE", "terminate");
        Ed(a, c);
        b = new K(a, a.c, b, void 0);
        b.H = 2;
        b.i = lc(L(c));
        c = !1;
        k.navigator && k.navigator.sendBeacon && (c = k.navigator.sendBeacon(b.i.toString(), ""));
        !c && k.Image && ((new Image).src = b.i, c = !0);
        c || (b.a = oc(b.g, null), b.a.ba(b.i));
        b.u = q();
        M(b);
    } Fd(a); }
    function Bc(a) { a.a && (xc(a), a.a.cancel(), a.a = null); }
    function Dd(a) { Bc(a); a.j && (k.clearTimeout(a.j), a.j = null); Ac(a); a.b.cancel(); a.h && ("number" === typeof a.h && k.clearTimeout(a.h), a.h = null); }
    function Gd(a, b) { a.g.push(new fd(a.La++, b)); 3 == a.v && Ic(a); }
    function Ic(a) { id(a.b) || a.h || (a.h = !0, Cb(a.Ba, a), a.u = 0); }
    function Hd(a, b) { if (Dc(a.b) >= a.b.f - (a.h ? 1 : 0))
        return !1; if (a.h)
        return a.g = b.s.concat(a.g), !0; if (1 == a.v || 2 == a.v || a.u >= (a.Ia ? 0 : a.Ja))
        return !1; a.h = I(p(a.Ba, a, b), Id(a, a.u)); a.u++; return !0; }
    g.Ba = function (a) {
        if (this.h)
            if (this.h = null, 1 == this.v) {
                if (!a) {
                    this.R = Math.floor(1E5 * Math.random());
                    a = this.R++;
                    var b = new K(this, this.c, a, void 0), c = this.l;
                    this.O && (c ? (c = Ba(c), Da(c, this.O)) : c = this.O);
                    null === this.i && (b.B = c);
                    var d;
                    if (this.da)
                        a: {
                            for (var e = d = 0; e < this.g.length; e++) {
                                b: {
                                    var f = this.g[e];
                                    if ("__data__" in f.a && (f = f.a.__data__, "string" === typeof f)) {
                                        f = f.length;
                                        break b;
                                    }
                                    f = void 0;
                                }
                                if (void 0 === f)
                                    break;
                                d += f;
                                if (4096 < d) {
                                    d = e;
                                    break a;
                                }
                                if (4096 === d || e === this.g.length - 1) {
                                    d = e + 1;
                                    break a;
                                }
                            }
                            d = 1E3;
                        }
                    else
                        d = 1E3;
                    d = Jd(this, b, d);
                    e = L(this.B);
                    Q(e, "RID", a);
                    Q(e, "CVER", 22);
                    this.A && Q(e, "X-HTTP-Session-Id", this.A);
                    Ed(this, e);
                    this.i && c && Ad(e, this.i, c);
                    Ec(this.b, b);
                    this.Ga && Q(e, "TYPE", "init");
                    this.da ? (Q(e, "$req", d), Q(e, "SID", "null"), b.V = !0, kc(b, e, null)) : kc(b, e, d);
                    this.v = 2;
                }
            }
            else
                3 == this.v && (a ? Kd(this, a) : 0 == this.g.length || id(this.b) || Kd(this));
    };
    function Kd(a, b) { var c; b ? c = b.f : c = a.R++; var d = L(a.B); Q(d, "SID", a.J); Q(d, "RID", c); Q(d, "AID", a.P); Ed(a, d); a.i && a.l && Ad(d, a.i, a.l); c = new K(a, a.c, c, a.u + 1); null === a.i && (c.B = a.l); b && (a.g = b.s.concat(a.g)); b = Jd(a, c, 1E3); c.setTimeout(Math.round(.5 * a.ma) + Math.round(.5 * a.ma * Math.random())); Ec(a.b, c); kc(c, d, b); }
    function Ed(a, b) { a.f && Lc({}, function (c, d) { Q(b, d, c); }); }
    function Jd(a, b, c) { c = Math.min(a.g.length, c); var d = a.f ? p(a.f.Ha, a.f, a) : null; a: for (var e = a.g, f = -1;;) {
        var h = ["count=" + c];
        -1 == f ? 0 < c ? (f = e[0].b, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
        for (var m = !0, l = 0; l < c; l++) {
            var t = e[l].b, B = e[l].a;
            t -= f;
            if (0 > t)
                f = Math.max(0, e[l].b - 100), m = !1;
            else
                try {
                    md(B, h, "req" + t + "_");
                }
                catch (z) {
                    d && d(B);
                }
        }
        if (m) {
            d = h.join("&");
            break a;
        }
    } a = a.g.splice(0, c); b.s = a; return d; }
    function Hc(a) { a.a || a.j || (a.U = 1, Cb(a.Aa, a), a.o = 0); }
    function Cc(a) { if (a.a || a.j || 3 <= a.o)
        return !1; a.U++; a.j = I(p(a.Aa, a), Id(a, a.o)); a.o++; return !0; }
    g.Aa = function () { this.j = null; Ld(this); if (this.V && !(this.F || null == this.a || 0 >= this.N)) {
        var a = 2 * this.N;
        this.c.info("BP detection timer enabled: " + a);
        this.s = I(p(this.Sa, this), a);
    } };
    g.Sa = function () { this.s && (this.s = null, this.c.info("BP detection timeout reached."), this.c.info("Buffering proxy detected and switch to long-polling!"), this.H = !1, this.F = !0, Bc(this), Ld(this)); };
    function xc(a) { null != a.s && (k.clearTimeout(a.s), a.s = null); }
    function Ld(a) { a.a = new K(a, a.c, "rpc", a.U); null === a.i && (a.a.B = a.l); a.a.O = 0; var b = L(a.la); Q(b, "RID", "rpc"); Q(b, "SID", a.J); Q(b, "CI", a.H ? "0" : "1"); Q(b, "AID", a.P); Ed(a, b); Q(b, "TYPE", "xmlhttp"); a.i && a.l && Ad(b, a.i, a.l); a.D && a.a.setTimeout(a.D); var c = a.a; a = a.ga; c.H = 1; c.i = lc(L(b)); c.j = null; c.I = !0; mc(c, a); }
    g.Ra = function () { null != this.m && (this.m = null, Bc(this), Cc(this), H(19)); };
    function Ac(a) { null != a.m && (k.clearTimeout(a.m), a.m = null); }
    function uc(a, b) { var c = null; if (a.a == b) {
        Ac(a);
        xc(a);
        a.a = null;
        var d = 2;
    }
    else if (zc(a.b, b))
        c = b.s, Gc(a.b, b), d = 1;
    else
        return; a.I = b.N; if (0 != a.v)
        if (b.b)
            if (1 == d) {
                c = b.j ? b.j.length : 0;
                b = q() - b.u;
                var e = a.u;
                d = Vb();
                d.dispatchEvent(new Yb(d, c, b, e));
                Ic(a);
            }
            else
                Hc(a);
        else if (e = b.h, 3 == e || 0 == e && 0 < a.I || !(1 == d && Hd(a, b) || 2 == d && Cc(a)))
            switch (c && 0 < c.length && (b = a.b, b.c = b.c.concat(c)), e) {
                case 1:
                    P(a, 5);
                    break;
                case 4:
                    P(a, 10);
                    break;
                case 3:
                    P(a, 6);
                    break;
                default: P(a, 2);
            } }
    function Id(a, b) { var c = a.Fa + Math.floor(Math.random() * a.Ma); a.f || (c *= 2); return c * b; }
    function P(a, b) { a.c.info("Error code " + b); if (2 == b) {
        var c = null;
        a.f && (c = null);
        var d = p(a.Xa, a);
        c || (c = new T("//www.google.com/images/cleardot.gif"), k.location && "http" == k.location.protocol || Pc(c, "https"), lc(c));
        nd(c.toString(), d);
    }
    else
        H(2); a.v = 0; a.f && a.f.ra(b); Fd(a); Dd(a); }
    g.Xa = function (a) { a ? (this.c.info("Successfully pinged google.com"), H(2)) : (this.c.info("Failed to ping google.com"), H(1)); };
    function Fd(a) { a.v = 0; a.I = -1; if (a.f) {
        if (0 != jd(a.b).length || 0 != a.g.length)
            a.b.c.length = 0, sa(a.g), a.g.length = 0;
        a.f.qa();
    } }
    function Fc(a, b, c) { var d = ad(c); if ("" != d.c)
        b && Qc(d, b + "." + d.c), Rc(d, d.h);
    else {
        var e = k.location;
        d = bd(e.protocol, b ? b + "." + e.hostname : e.hostname, +e.port, c);
    } a.W && Aa(a.W, function (f, h) { Q(d, h, f); }); b = a.A; c = a.na; b && c && Q(d, b, c); Q(d, "VER", a.ha); Ed(a, d); return d; }
    function oc(a, b) { if (b && !a.C)
        throw Error("Can't create secondary domain capable XhrIo object."); b = new X(a.Ka); b.F = a.C; return b; }
    function Md() { }
    g = Md.prototype;
    g.ta = function () { };
    g.sa = function () { };
    g.ra = function () { };
    g.qa = function () { };
    g.Ha = function () { };
    function Nd() { if (x && !(10 <= Number(Ua)))
        throw Error("Environmental error: no available transport."); }
    Nd.prototype.a = function (a, b) { return new Y(a, b); };
    function Y(a, b) {
        D.call(this);
        this.a = new Cd(b);
        this.l = a;
        this.b = b && b.messageUrlParams || null;
        a = b && b.messageHeaders || null;
        b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = { "X-Client-Protocol": "webchannel" });
        this.a.l = a;
        a = b && b.initMessageHeaders || null;
        b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = { "X-WebChannel-Content-Type": b.messageContentType });
        b && b.a && (a ? a["X-WebChannel-Client-Profile"] = b.a : a = { "X-WebChannel-Client-Profile": b.a });
        this.a.O =
            a;
        (a = b && b.httpHeadersOverwriteParam) && !ta(a) && (this.a.i = a);
        this.h = b && b.supportsCrossDomainXhr || !1;
        this.g = b && b.sendRawJson || !1;
        (b = b && b.httpSessionIdParam) && !ta(b) && (this.a.A = b, a = this.b, null !== a && b in a && (a = this.b, b in a && delete a[b]));
        this.f = new Z(this);
    }
    r(Y, D);
    g = Y.prototype;
    g.addEventListener = function (a, b, c, d) { Y.S.addEventListener.call(this, a, b, c, d); };
    g.removeEventListener = function (a, b, c, d) { Y.S.removeEventListener.call(this, a, b, c, d); };
    g.Oa = function () { this.a.f = this.f; this.h && (this.a.C = !0); var a = this.a, b = this.l, c = this.b || void 0; H(0); a.fa = b; a.W = c || {}; a.H = a.T; a.B = Fc(a, null, a.fa); Ic(a); };
    g.close = function () { Jc(this.a); };
    g.Pa = function (a) { if ("string" === typeof a) {
        var b = {};
        b.__data__ = a;
        Gd(this.a, b);
    }
    else
        this.g ? (b = {}, b.__data__ = vb(a), Gd(this.a, b)) : Gd(this.a, a); };
    g.G = function () { this.a.f = null; delete this.f; Jc(this.a); delete this.a; Y.S.G.call(this); };
    function Od(a) { dc.call(this); var b = a.__sm__; if (b) {
        a: {
            for (var c in b) {
                a = c;
                break a;
            }
            a = void 0;
        }
        (this.c = a) ? (a = this.c, this.data = null !== b && a in b ? b[a] : void 0) : this.data = b;
    }
    else
        this.data = a; }
    r(Od, dc);
    function Pd() { ec.call(this); this.status = 1; }
    r(Pd, ec);
    function Z(a) { this.a = a; }
    r(Z, Md);
    Z.prototype.ta = function () { this.a.dispatchEvent("a"); };
    Z.prototype.sa = function (a) { this.a.dispatchEvent(new Od(a)); };
    Z.prototype.ra = function (a) { this.a.dispatchEvent(new Pd(a)); };
    Z.prototype.qa = function () { this.a.dispatchEvent("b"); }; /*

     Copyright 2017 Google Inc.

     Licensed under the Apache License, Version 2.0 (the "License");
     you may not use this file except in compliance with the License.
     You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.
    */
    Nd.prototype.createWebChannel = Nd.prototype.a;
    Y.prototype.send = Y.prototype.Pa;
    Y.prototype.open = Y.prototype.Oa;
    Y.prototype.close = Y.prototype.close;
    Zb.NO_ERROR = 0;
    Zb.TIMEOUT = 8;
    Zb.HTTP_ERROR = 6;
    $b.COMPLETE = "complete";
    cc.EventType = J;
    J.OPEN = "a";
    J.CLOSE = "b";
    J.ERROR = "c";
    J.MESSAGE = "d";
    D.prototype.listen = D.prototype.va;
    X.prototype.listenOnce = X.prototype.wa;
    X.prototype.getLastError = X.prototype.Qa;
    X.prototype.getLastErrorCode = X.prototype.ua;
    X.prototype.getStatus = X.prototype.X;
    X.prototype.getResponseJson = X.prototype.Na;
    X.prototype.getResponseText = X.prototype.$;
    X.prototype.send = X.prototype.ba;
    var esm = { createWebChannelTransport: function () { return new Nd; }, ErrorCode: Zb, EventType: $b, WebChannel: cc, XhrIo: X };
    var esm_1 = esm.createWebChannelTransport;
    var esm_2 = esm.ErrorCode;
    var esm_3 = esm.EventType;
    var esm_4 = esm.WebChannel;
    var esm_5 = esm.XhrIo;

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Simple wrapper around a nullable UID. Mostly exists to make code more
     * readable.
     */ class m {
        constructor(t) {
            this.uid = t;
        }
        t() {
            return null != this.uid;
        }
        /**
         * Returns a key representing this user, suitable for inclusion in a
         * dictionary.
         */    i() {
            return this.t() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(t) {
            return t.uid === this.uid;
        }
    }

    /** A user with a null UID. */ m.UNAUTHENTICATED = new m(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    m.o = new m("google-credentials-uid"), m.u = new m("first-party-uid");

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    const A$1 = new Logger("@firebase/firestore");

    // Helper methods are needed because variables can't be exported as read/write
    function R$1() {
        return A$1.logLevel;
    }

    function P$1(t) {
        A$1.setLogLevel(t);
    }

    function g$1(t, ...e) {
        if (A$1.logLevel <= exports.LogLevel.DEBUG) {
            const n = e.map(p$1);
            A$1.debug("Firestore (7.21.1): " + t, ...n);
        }
    }

    function V$1(t, ...e) {
        if (A$1.logLevel <= exports.LogLevel.ERROR) {
            const n = e.map(p$1);
            A$1.error("Firestore (7.21.1): " + t, ...n);
        }
    }

    function y$1(t, ...e) {
        if (A$1.logLevel <= exports.LogLevel.WARN) {
            const n = e.map(p$1);
            A$1.warn("Firestore (7.21.1): " + t, ...n);
        }
    }

    /**
     * Converts an additional log parameter to a string representation.
     */ function p$1(t) {
        if ("string" == typeof t) return t;
        try {
            return e = t, JSON.stringify(e);
        } catch (e) {
            // Converting to JSON failed, just log the object directly
            return t;
        }
        /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
        /** Formats an object as a JSON string, suitable for logging. */
        var e;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Unconditionally fails, throwing an Error with the given message.
     * Messages are stripped in production builds.
     *
     * Returns `never` and can be used in expressions:
     * @example
     * let futureVar = fail('not implemented yet');
     */ function b(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const e = "FIRESTORE (7.21.1) INTERNAL ASSERTION FAILED: " + t;
        // NOTE: We don't use FirestoreError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw V$1(e), new Error(e);
    }

    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * Messages are stripped in production builds.
     */ function v$1(t, e) {
        t || b();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function S$1(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        return t;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const D$1 = {
        // Causes are copied from:
        // https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
        /** Not an error; returned on success. */
        OK: "ok",
        /** The operation was cancelled (typically by the caller). */
        CANCELLED: "cancelled",
        /** Unknown error or an error from a different error domain. */
        UNKNOWN: "unknown",
        /**
         * Client specified an invalid argument. Note that this differs from
         * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
         * problematic regardless of the state of the system (e.g., a malformed file
         * name).
         */
        INVALID_ARGUMENT: "invalid-argument",
        /**
         * Deadline expired before operation could complete. For operations that
         * change the state of the system, this error may be returned even if the
         * operation has completed successfully. For example, a successful response
         * from a server could have been delayed long enough for the deadline to
         * expire.
         */
        DEADLINE_EXCEEDED: "deadline-exceeded",
        /** Some requested entity (e.g., file or directory) was not found. */
        NOT_FOUND: "not-found",
        /**
         * Some entity that we attempted to create (e.g., file or directory) already
         * exists.
         */
        ALREADY_EXISTS: "already-exists",
        /**
         * The caller does not have permission to execute the specified operation.
         * PERMISSION_DENIED must not be used for rejections caused by exhausting
         * some resource (use RESOURCE_EXHAUSTED instead for those errors).
         * PERMISSION_DENIED must not be used if the caller can not be identified
         * (use UNAUTHENTICATED instead for those errors).
         */
        PERMISSION_DENIED: "permission-denied",
        /**
         * The request does not have valid authentication credentials for the
         * operation.
         */
        UNAUTHENTICATED: "unauthenticated",
        /**
         * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
         * entire file system is out of space.
         */
        RESOURCE_EXHAUSTED: "resource-exhausted",
        /**
         * Operation was rejected because the system is not in a state required for
         * the operation's execution. For example, directory to be deleted may be
         * non-empty, an rmdir operation is applied to a non-directory, etc.
         *
         * A litmus test that may help a service implementor in deciding
         * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
         *  (a) Use UNAVAILABLE if the client can retry just the failing call.
         *  (b) Use ABORTED if the client should retry at a higher-level
         *      (e.g., restarting a read-modify-write sequence).
         *  (c) Use FAILED_PRECONDITION if the client should not retry until
         *      the system state has been explicitly fixed. E.g., if an "rmdir"
         *      fails because the directory is non-empty, FAILED_PRECONDITION
         *      should be returned since the client should not retry unless
         *      they have first fixed up the directory by deleting files from it.
         *  (d) Use FAILED_PRECONDITION if the client performs conditional
         *      REST Get/Update/Delete on a resource and the resource on the
         *      server does not match the condition. E.g., conflicting
         *      read-modify-write on the same resource.
         */
        FAILED_PRECONDITION: "failed-precondition",
        /**
         * The operation was aborted, typically due to a concurrency issue like
         * sequencer check failures, transaction aborts, etc.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
         * and UNAVAILABLE.
         */
        ABORTED: "aborted",
        /**
         * Operation was attempted past the valid range. E.g., seeking or reading
         * past end of file.
         *
         * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
         * if the system state changes. For example, a 32-bit file system will
         * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
         * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
         * an offset past the current file size.
         *
         * There is a fair bit of overlap between FAILED_PRECONDITION and
         * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
         * when it applies so that callers who are iterating through a space can
         * easily look for an OUT_OF_RANGE error to detect when they are done.
         */
        OUT_OF_RANGE: "out-of-range",
        /** Operation is not implemented or not supported/enabled in this service. */
        UNIMPLEMENTED: "unimplemented",
        /**
         * Internal errors. Means some invariants expected by underlying System has
         * been broken. If you see one of these errors, Something is very broken.
         */
        INTERNAL: "internal",
        /**
         * The service is currently unavailable. This is a most likely a transient
         * condition and may be corrected by retrying with a backoff.
         *
         * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
         * and UNAVAILABLE.
         */
        UNAVAILABLE: "unavailable",
        /** Unrecoverable data loss or corruption. */
        DATA_LOSS: "data-loss"
    };

    /**
     * An error class used for Firestore-generated errors. Ideally we should be
     * using FirebaseError, but integrating with it is overly arduous at the moment,
     * so we define our own compatible error class (with a `name` of 'FirebaseError'
     * and compatible `code` and `message` fields.)
     */ class C$1 extends Error {
        constructor(t, e) {
            super(e), this.code = t, this.message = e, this.name = "FirebaseError", 
            // HACK: We write a toString property directly because Error is not a real
            // class and so inheritance does not work correctly. We could alternatively
            // do the same "back-door inheritance" trick that FirebaseError does.
            this.toString = () => `${this.name}: [code=${this.code}]: ${this.message}`;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class N$1 {
        constructor(t, e) {
            this.user = e, this.type = "OAuth", this.h = {}, 
            // Set the headers using Object Literal notation to avoid minification
            this.h.Authorization = "Bearer " + t;
        }
    }

    class x$1 {
        constructor(t) {
            /**
             * The auth token listener registered with FirebaseApp, retained here so we
             * can unregister it.
             */
            this.l = null, 
            /** Tracks the current User. */
            this.currentUser = m.UNAUTHENTICATED, this._ = !1, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.T = 0, 
            /** The listener registered with setChangeListener(). */
            this.I = null, this.forceRefresh = !1, this.l = () => {
                this.T++, this.currentUser = this.m(), this._ = !0, this.I && this.I(this.currentUser);
            }, this.T = 0, this.auth = t.getImmediate({
                optional: !0
            }), this.auth ? this.auth.addAuthTokenListener(this.l) : (
            // if auth is not available, invoke tokenListener once with null token
            this.l(null), t.get().then(t => {
                this.auth = t, this.l && 
                // tokenListener can be removed by removeChangeListener()
                this.auth.addAuthTokenListener(this.l);
            }, () => {}));
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.T, e = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(e).then(e => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.T !== t ? (g$1("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : e ? (v$1("string" == typeof e.accessToken), new N$1(e.accessToken, this.currentUser)) : null) : Promise.resolve(null);
        }
        A() {
            this.forceRefresh = !0;
        }
        R(t) {
            this.I = t, 
            // Fire the initial event
            this._ && t(this.currentUser);
        }
        P() {
            this.auth && this.auth.removeAuthTokenListener(this.l), this.l = null, this.I = null;
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        m() {
            const t = this.auth && this.auth.getUid();
            return v$1(null === t || "string" == typeof t), new m(t);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Generates `nBytes` of random bytes.
     *
     * If `nBytes < 0` , an error will be thrown.
     */ function O$1(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        const e = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), n = new Uint8Array(t);
        if (e && "function" == typeof e.getRandomValues) e.getRandomValues(n); else 
        // Falls back to Math.random
        for (let e = 0; e < t; e++) n[e] = Math.floor(256 * Math.random());
        return n;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class F$1 {
        static g() {
            // Alphanumeric characters
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", e = Math.floor(256 / t.length) * t.length;
            // The largest byte value that is a multiple of `char.length`.
                    let n = "";
            for (;n.length < 20; ) {
                const s = O$1(40);
                for (let i = 0; i < s.length; ++i) 
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                n.length < 20 && s[i] < e && (n += t.charAt(s[i] % t.length));
            }
            return n;
        }
    }

    function M$1(t, e) {
        return t < e ? -1 : t > e ? 1 : 0;
    }

    /** Helper to compare arrays using isEqual(). */ function $(t, e, n) {
        return t.length === e.length && t.every((t, s) => n(t, e[s]));
    }

    /**
     * Returns the immediate lexicographically-following string. This is useful to
     * construct an inclusive range for indexeddb iterators.
     */ function k$1(t) {
        // Return the input string, with an additional NUL byte appended.
        return t + "\0";
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The earlist date supported by Firestore timestamps (0001-01-01T00:00:00Z).
    class L$1 {
        constructor(t, e) {
            if (this.seconds = t, this.nanoseconds = e, e < 0) throw new C$1(D$1.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
            if (e >= 1e9) throw new C$1(D$1.INVALID_ARGUMENT, "Timestamp nanoseconds out of range: " + e);
            if (t < -62135596800) throw new C$1(D$1.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new C$1(D$1.INVALID_ARGUMENT, "Timestamp seconds out of range: " + t);
        }
        static now() {
            return L$1.fromMillis(Date.now());
        }
        static fromDate(t) {
            return L$1.fromMillis(t.getTime());
        }
        static fromMillis(t) {
            const e = Math.floor(t / 1e3);
            return new L$1(e, 1e6 * (t - 1e3 * e));
        }
        toDate() {
            return new Date(this.toMillis());
        }
        toMillis() {
            return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        V(t) {
            return this.seconds === t.seconds ? M$1(this.nanoseconds, t.nanoseconds) : M$1(this.seconds, t.seconds);
        }
        isEqual(t) {
            return t.seconds === this.seconds && t.nanoseconds === this.nanoseconds;
        }
        toString() {
            return "Timestamp(seconds=" + this.seconds + ", nanoseconds=" + this.nanoseconds + ")";
        }
        toJSON() {
            return {
                seconds: this.seconds,
                nanoseconds: this.nanoseconds
            };
        }
        valueOf() {
            // This method returns a string of the form <seconds>.<nanoseconds> where <seconds> is
            // translated to have a non-negative value and both <seconds> and <nanoseconds> are left-padded
            // with zeroes to be a consistent length. Strings with this format then have a lexiographical
            // ordering that matches the expected ordering. The <seconds> translation is done to avoid
            // having a leading negative sign (i.e. a leading '-' character) in its string representation,
            // which would affect its lexiographical ordering.
            const t = this.seconds - -62135596800;
            // Note: Up to 12 decimal digits are required to represent all valid 'seconds' values.
                    return String(t).padStart(12, "0") + "." + String(this.nanoseconds).padStart(9, "0");
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A version of a document in Firestore. This corresponds to the version
     * timestamp, such as update_time or read_time.
     */ class q$1 {
        constructor(t) {
            this.timestamp = t;
        }
        static p(t) {
            return new q$1(t);
        }
        static min() {
            return new q$1(new L$1(0, 0));
        }
        v(t) {
            return this.timestamp.V(t.timestamp);
        }
        isEqual(t) {
            return this.timestamp.isEqual(t.timestamp);
        }
        /** Returns a number representation of the version for use in spec tests. */    S() {
            // Convert to microseconds.
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
        }
        toString() {
            return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        D() {
            return this.timestamp;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Path represents an ordered sequence of string segments.
     */
    class B {
        constructor(t, e, n) {
            void 0 === e ? e = 0 : e > t.length && b(), void 0 === n ? n = t.length - e : n > t.length - e && b(), 
            this.segments = t, this.offset = e, this.C = n;
        }
        get length() {
            return this.C;
        }
        isEqual(t) {
            return 0 === B.N(this, t);
        }
        child(t) {
            const e = this.segments.slice(this.offset, this.limit());
            return t instanceof B ? t.forEach(t => {
                e.push(t);
            }) : e.push(t), this.O(e);
        }
        /** The index of one past the last segment of the path. */    limit() {
            return this.offset + this.length;
        }
        F(t) {
            return t = void 0 === t ? 1 : t, this.O(this.segments, this.offset + t, this.length - t);
        }
        M() {
            return this.O(this.segments, this.offset, this.length - 1);
        }
        $() {
            return this.segments[this.offset];
        }
        k() {
            return this.get(this.length - 1);
        }
        get(t) {
            return this.segments[this.offset + t];
        }
        L() {
            return 0 === this.length;
        }
        q(t) {
            if (t.length < this.length) return !1;
            for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
            return !0;
        }
        B(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let e = 0; e < this.length; e++) if (this.get(e) !== t.get(e)) return !1;
            return !0;
        }
        forEach(t) {
            for (let e = this.offset, n = this.limit(); e < n; e++) t(this.segments[e]);
        }
        U() {
            return this.segments.slice(this.offset, this.limit());
        }
        static N(t, e) {
            const n = Math.min(t.length, e.length);
            for (let s = 0; s < n; s++) {
                const n = t.get(s), i = e.get(s);
                if (n < i) return -1;
                if (n > i) return 1;
            }
            return t.length < e.length ? -1 : t.length > e.length ? 1 : 0;
        }
    }

    /**
     * A slash-separated path for navigating resources (documents and collections)
     * within Firestore.
     */ class U$1 extends B {
        O(t, e, n) {
            return new U$1(t, e, n);
        }
        K() {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            return this.U().join("/");
        }
        toString() {
            return this.K();
        }
        /**
         * Creates a resource path from the given slash-delimited string. If multiple
         * arguments are provided, all components are combined. Leading and trailing
         * slashes from all components are ignored.
         */    static W(...t) {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            const e = [];
            for (const n of t) {
                if (n.indexOf("//") >= 0) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid segment (${n}). Paths must not contain // in them.`);
                // Strip leading and traling slashed.
                            e.push(...n.split("/").filter(t => t.length > 0));
            }
            return new U$1(e);
        }
        static j() {
            return new U$1([]);
        }
    }

    const K$1 = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /** A dot-separated path for navigating sub-objects within a document. */ class Q$1 extends B {
        O(t, e, n) {
            return new Q$1(t, e, n);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static G(t) {
            return K$1.test(t);
        }
        K() {
            return this.U().map(t => (t = t.replace("\\", "\\\\").replace("`", "\\`"), Q$1.G(t) || (t = "`" + t + "`"), 
            t)).join(".");
        }
        toString() {
            return this.K();
        }
        /**
         * Returns true if this field references the key of a document.
         */    H() {
            return 1 === this.length && "__name__" === this.get(0);
        }
        /**
         * The field designating the key of a document.
         */    static J() {
            return new Q$1([ "__name__" ]);
        }
        /**
         * Parses a field string from the given server-formatted string.
         *
         * - Splitting the empty string is not allowed (for now at least).
         * - Empty segments within the string (e.g. if there are two consecutive
         *   separators) are not allowed.
         *
         * TODO(b/37244157): we should make this more strict. Right now, it allows
         * non-identifier path components, even if they aren't escaped.
         */    static Y(t) {
            const e = [];
            let n = "", s = 0;
            const i = () => {
                if (0 === n.length) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                e.push(n), n = "";
            };
            let r = !1;
            for (;s < t.length; ) {
                const e = t[s];
                if ("\\" === e) {
                    if (s + 1 === t.length) throw new C$1(D$1.INVALID_ARGUMENT, "Path has trailing escape character: " + t);
                    const e = t[s + 1];
                    if ("\\" !== e && "." !== e && "`" !== e) throw new C$1(D$1.INVALID_ARGUMENT, "Path has invalid escape sequence: " + t);
                    n += e, s += 2;
                } else "`" === e ? (r = !r, s++) : "." !== e || r ? (n += e, s++) : (i(), s++);
            }
            if (i(), r) throw new C$1(D$1.INVALID_ARGUMENT, "Unterminated ` in path: " + t);
            return new Q$1(e);
        }
        static j() {
            return new Q$1([]);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class W$1 {
        constructor(t) {
            this.path = t;
        }
        static X(t) {
            return new W$1(U$1.W(t));
        }
        static Z(t) {
            return new W$1(U$1.W(t).F(5));
        }
        /** Returns true if the document is in the specified collectionId. */    tt(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        isEqual(t) {
            return null !== t && 0 === U$1.N(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static N(t, e) {
            return U$1.N(t.path, e.path);
        }
        static et(t) {
            return t.length % 2 == 0;
        }
        /**
         * Creates and returns a new document key with the given segments.
         *
         * @param segments The segments of the path to the document
         * @return A new instance of DocumentKey
         */    static nt(t) {
            return new W$1(new U$1(t.slice()));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class j {
        /**
         * Constructs a DatabaseInfo using the provided host, databaseId and
         * persistenceKey.
         *
         * @param databaseId The database to use.
         * @param persistenceKey A unique identifier for this Firestore's local
         * storage (used in conjunction with the databaseId).
         * @param host The Firestore backend host to connect to.
         * @param ssl Whether to use SSL when connecting.
         * @param forceLongPolling Whether to use the forceLongPolling option
         * when using WebChannel as the network transport.
         */
        constructor(t, e, n, s, i) {
            this.st = t, this.persistenceKey = e, this.host = n, this.ssl = s, this.forceLongPolling = i;
        }
    }

    /** The default database name for a project. */
    /** Represents the database ID a Firestore client is associated with. */
    class G$1 {
        constructor(t, e) {
            this.projectId = t, this.database = e || "(default)";
        }
        get it() {
            return "(default)" === this.database;
        }
        isEqual(t) {
            return t instanceof G$1 && t.projectId === this.projectId && t.database === this.database;
        }
        v(t) {
            return M$1(this.projectId, t.projectId) || M$1(this.database, t.database);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Returns whether a variable is either undefined or null.
     */ function z(t) {
        return null == t;
    }

    /** Returns whether the value represents -0. */ function H$1(t) {
        // Detect if the value is -0.0. Based on polyfill from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
        return 0 === t && 1 / t == -1 / 0;
    }

    /**
     * Returns whether a value is an integer and in the safe integer range
     * @param value The value to test for being an integer and in the safe range
     */ function J$1(t) {
        return "number" == typeof t && Number.isInteger(t) && !H$1(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // Visible for testing
    class Y$1 {
        constructor(t, e = null, n = [], s = [], i = null, r = null, o = null) {
            this.path = t, this.collectionGroup = e, this.orderBy = n, this.filters = s, this.limit = i, 
            this.startAt = r, this.endAt = o, this.rt = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function X$1(t, e = null, n = [], s = [], i = null, r = null, o = null) {
        return new Y$1(t, e, n, s, i, r, o);
    }

    function Z$1(t) {
        const e = S$1(t);
        if (null === e.rt) {
            let t = e.path.K();
            null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup), t += "|f:", t += e.filters.map(t => Wn(t)).join(","), 
            t += "|ob:", t += e.orderBy.map(t => function(t) {
                // TODO(b/29183165): Make this collision robust.
                return t.field.K() + t.dir;
            }(t)).join(","), z(e.limit) || (t += "|l:", t += e.limit), e.startAt && (t += "|lb:", 
            t += es(e.startAt)), e.endAt && (t += "|ub:", t += es(e.endAt)), e.rt = t;
        }
        return e.rt;
    }

    function tt(t) {
        let e = t.path.K();
        return null !== t.collectionGroup && (e += " collectionGroup=" + t.collectionGroup), 
        t.filters.length > 0 && (e += `, filters: [${t.filters.map(t => {
        return `${(e = t).field.K()} ${e.op} ${zt(e.value)}`;
        /** Returns a debug description for `filter`. */
        var e;
        /** Filter that matches on key fields (i.e. '__name__'). */    }).join(", ")}]`), 
        z(t.limit) || (e += ", limit: " + t.limit), t.orderBy.length > 0 && (e += `, orderBy: [${t.orderBy.map(t => function(t) {
        return `${t.field.K()} (${t.dir})`;
    }(t)).join(", ")}]`), t.startAt && (e += ", startAt: " + es(t.startAt)), t.endAt && (e += ", endAt: " + es(t.endAt)), 
        `Target(${e})`;
    }

    function et(t, e) {
        if (t.limit !== e.limit) return !1;
        if (t.orderBy.length !== e.orderBy.length) return !1;
        for (let n = 0; n < t.orderBy.length; n++) if (!os(t.orderBy[n], e.orderBy[n])) return !1;
        if (t.filters.length !== e.filters.length) return !1;
        for (let i = 0; i < t.filters.length; i++) if (n = t.filters[i], s = e.filters[i], 
        n.op !== s.op || !n.field.isEqual(s.field) || !Qt(n.value, s.value)) return !1;
        var n, s;
        return t.collectionGroup === e.collectionGroup && (!!t.path.isEqual(e.path) && (!!ss(t.startAt, e.startAt) && ss(t.endAt, e.endAt)));
    }

    function nt(t) {
        return W$1.et(t.path) && null === t.collectionGroup && 0 === t.filters.length;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Converts a Base64 encoded string to a binary string. */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Immutable class that represents a "proto" byte string.
     *
     * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
     * sent on the wire. This class abstracts away this differentiation by holding
     * the proto byte string in a common class that must be converted into a string
     * before being sent as a proto.
     */
    class st {
        constructor(t) {
            this.ot = t;
        }
        static fromBase64String(t) {
            const e = atob(t);
            return new st(e);
        }
        static fromUint8Array(t) {
            const e = 
            /**
     * Helper function to convert an Uint8array to a binary string.
     */
            function(t) {
                let e = "";
                for (let n = 0; n < t.length; ++n) e += String.fromCharCode(t[n]);
                return e;
            }
            /**
     * Helper function to convert a binary string to an Uint8Array.
     */ (t);
            return new st(e);
        }
        toBase64() {
            return t = this.ot, btoa(t);
            /** Converts a binary string to a Base64 encoded string. */
            var t;
        }
        toUint8Array() {
            return function(t) {
                const e = new Uint8Array(t.length);
                for (let n = 0; n < t.length; n++) e[n] = t.charCodeAt(n);
                return e;
            }
            /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
            /**
     * An immutable set of metadata that the local store tracks for each target.
     */ (this.ot);
        }
        ct() {
            return 2 * this.ot.length;
        }
        v(t) {
            return M$1(this.ot, t.ot);
        }
        isEqual(t) {
            return this.ot === t.ot;
        }
    }

    st.at = new st("");

    class it {
        constructor(
        /** The target being listened to. */
        t, 
        /**
         * The target ID to which the target corresponds; Assigned by the
         * LocalStore for user listens and by the SyncEngine for limbo watches.
         */
        e, 
        /** The purpose of the target. */
        n, 
        /**
         * The sequence number of the last transaction during which this target data
         * was modified.
         */
        s, 
        /** The latest snapshot version seen for this target. */
        i = q$1.min()
        /**
         * The maximum snapshot version at which the associated view
         * contained no limbo documents.
         */ , r = q$1.min()
        /**
         * An opaque, server-assigned token that allows watching a target to be
         * resumed after disconnecting without retransmitting all the data that
         * matches the target. The resume token essentially identifies a point in
         * time from which the server should resume sending results.
         */ , o = st.at) {
            this.target = t, this.targetId = e, this.ut = n, this.sequenceNumber = s, this.ht = i, 
            this.lastLimboFreeSnapshotVersion = r, this.resumeToken = o;
        }
        /** Creates a new target data instance with an updated sequence number. */    lt(t) {
            return new it(this.target, this.targetId, this.ut, t, this.ht, this.lastLimboFreeSnapshotVersion, this.resumeToken);
        }
        /**
         * Creates a new target data instance with an updated resume token and
         * snapshot version.
         */    _t(t, e) {
            return new it(this.target, this.targetId, this.ut, this.sequenceNumber, e, this.lastLimboFreeSnapshotVersion, t);
        }
        /**
         * Creates a new target data instance with an updated last limbo free
         * snapshot version number.
         */    ft(t) {
            return new it(this.target, this.targetId, this.ut, this.sequenceNumber, this.ht, t, this.resumeToken);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class rt {
        // TODO(b/33078163): just use simplest form of existence filter for now
        constructor(t) {
            this.count = t;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Error Codes describing the different ways GRPC can fail. These are copied
     * directly from GRPC's sources here:
     *
     * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
     *
     * Important! The names of these identifiers matter because the string forms
     * are used for reverse lookups from the webchannel stream. Do NOT change the
     * names of these identifiers or change this into a const enum.
     */ var ot, ct;

    /**
     * Determines whether an error code represents a permanent error when received
     * in response to a non-write operation.
     *
     * See isPermanentWriteError for classifying write errors.
     */
    function at(t) {
        switch (t) {
          case D$1.OK:
            return b();

          case D$1.CANCELLED:
          case D$1.UNKNOWN:
          case D$1.DEADLINE_EXCEEDED:
          case D$1.RESOURCE_EXHAUSTED:
          case D$1.INTERNAL:
          case D$1.UNAVAILABLE:
     // Unauthenticated means something went wrong with our token and we need
            // to retry with new credentials which will happen automatically.
                  case D$1.UNAUTHENTICATED:
            return !1;

          case D$1.INVALID_ARGUMENT:
          case D$1.NOT_FOUND:
          case D$1.ALREADY_EXISTS:
          case D$1.PERMISSION_DENIED:
          case D$1.FAILED_PRECONDITION:
     // Aborted might be retried in some scenarios, but that is dependant on
            // the context and should handled individually by the calling code.
            // See https://cloud.google.com/apis/design/errors.
                  case D$1.ABORTED:
          case D$1.OUT_OF_RANGE:
          case D$1.UNIMPLEMENTED:
          case D$1.DATA_LOSS:
            return !0;

          default:
            return b();
        }
    }

    /**
     * Determines whether an error code represents a permanent error when received
     * in response to a write operation.
     *
     * Write operations must be handled specially because as of b/119437764, ABORTED
     * errors on the write stream should be retried too (even though ABORTED errors
     * are not generally retryable).
     *
     * Note that during the initial handshake on the write stream an ABORTED error
     * signals that we should discard our stream token (i.e. it is permanent). This
     * means a handshake error should be classified with isPermanentError, above.
     */
    /**
     * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
     * are not the same as HTTP status codes.
     *
     * @returns The Code equivalent to the given GRPC status code. Fails if there
     *     is no match.
     */
    function ut(t) {
        if (void 0 === t) 
        // This shouldn't normally happen, but in certain error cases (like trying
        // to send invalid proto messages) we may get an error with no GRPC code.
        return V$1("GRPC error has no .code"), D$1.UNKNOWN;
        switch (t) {
          case ot.OK:
            return D$1.OK;

          case ot.CANCELLED:
            return D$1.CANCELLED;

          case ot.UNKNOWN:
            return D$1.UNKNOWN;

          case ot.DEADLINE_EXCEEDED:
            return D$1.DEADLINE_EXCEEDED;

          case ot.RESOURCE_EXHAUSTED:
            return D$1.RESOURCE_EXHAUSTED;

          case ot.INTERNAL:
            return D$1.INTERNAL;

          case ot.UNAVAILABLE:
            return D$1.UNAVAILABLE;

          case ot.UNAUTHENTICATED:
            return D$1.UNAUTHENTICATED;

          case ot.INVALID_ARGUMENT:
            return D$1.INVALID_ARGUMENT;

          case ot.NOT_FOUND:
            return D$1.NOT_FOUND;

          case ot.ALREADY_EXISTS:
            return D$1.ALREADY_EXISTS;

          case ot.PERMISSION_DENIED:
            return D$1.PERMISSION_DENIED;

          case ot.FAILED_PRECONDITION:
            return D$1.FAILED_PRECONDITION;

          case ot.ABORTED:
            return D$1.ABORTED;

          case ot.OUT_OF_RANGE:
            return D$1.OUT_OF_RANGE;

          case ot.UNIMPLEMENTED:
            return D$1.UNIMPLEMENTED;

          case ot.DATA_LOSS:
            return D$1.DATA_LOSS;

          default:
            return b();
        }
    }

    /**
     * Converts an HTTP response's error status to the equivalent error code.
     *
     * @param status An HTTP error response status ("FAILED_PRECONDITION",
     * "UNKNOWN", etc.)
     * @returns The equivalent Code. Non-matching responses are mapped to
     *     Code.UNKNOWN.
     */ (ct = ot || (ot = {}))[ct.OK = 0] = "OK", ct[ct.CANCELLED = 1] = "CANCELLED", 
    ct[ct.UNKNOWN = 2] = "UNKNOWN", ct[ct.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
    ct[ct.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", ct[ct.NOT_FOUND = 5] = "NOT_FOUND", 
    ct[ct.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", ct[ct.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
    ct[ct.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", ct[ct.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
    ct[ct.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", ct[ct.ABORTED = 10] = "ABORTED", 
    ct[ct.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", ct[ct.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
    ct[ct.INTERNAL = 13] = "INTERNAL", ct[ct.UNAVAILABLE = 14] = "UNAVAILABLE", ct[ct.DATA_LOSS = 15] = "DATA_LOSS";

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // An immutable sorted map implementation, based on a Left-leaning Red-Black
    // tree.
    class ht {
        constructor(t, e) {
            this.N = t, this.root = e || _t.EMPTY;
        }
        // Returns a copy of the map, with the specified key/value added or replaced.
        dt(t, e) {
            return new ht(this.N, this.root.dt(t, e, this.N).copy(null, null, _t.wt, null, null));
        }
        // Returns a copy of the map, with the specified key removed.
        remove(t) {
            return new ht(this.N, this.root.remove(t, this.N).copy(null, null, _t.wt, null, null));
        }
        // Returns the value of the node with the given key, or null.
        get(t) {
            let e = this.root;
            for (;!e.L(); ) {
                const n = this.N(t, e.key);
                if (0 === n) return e.value;
                n < 0 ? e = e.left : n > 0 && (e = e.right);
            }
            return null;
        }
        // Returns the index of the element in this sorted map, or -1 if it doesn't
        // exist.
        indexOf(t) {
            // Number of nodes that were pruned when descending right
            let e = 0, n = this.root;
            for (;!n.L(); ) {
                const s = this.N(t, n.key);
                if (0 === s) return e + n.left.size;
                s < 0 ? n = n.left : (
                // Count all nodes left of the node plus the node itself
                e += n.left.size + 1, n = n.right);
            }
            // Node not found
                    return -1;
        }
        L() {
            return this.root.L();
        }
        // Returns the total number of nodes in the map.
        get size() {
            return this.root.size;
        }
        // Returns the minimum key in the map.
        Et() {
            return this.root.Et();
        }
        // Returns the maximum key in the map.
        Tt() {
            return this.root.Tt();
        }
        // Traverses the map in key order and calls the specified action function
        // for each key/value pair. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        It(t) {
            return this.root.It(t);
        }
        forEach(t) {
            this.It((e, n) => (t(e, n), !1));
        }
        toString() {
            const t = [];
            return this.It((e, n) => (t.push(`${e}:${n}`), !1)), `{${t.join(", ")}}`;
        }
        // Traverses the map in reverse key order and calls the specified action
        // function for each key/value pair. If action returns true, traversal is
        // aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        At(t) {
            return this.root.At(t);
        }
        // Returns an iterator over the SortedMap.
        Rt() {
            return new lt(this.root, null, this.N, !1);
        }
        Pt(t) {
            return new lt(this.root, t, this.N, !1);
        }
        gt() {
            return new lt(this.root, null, this.N, !0);
        }
        Vt(t) {
            return new lt(this.root, t, this.N, !0);
        }
    }

     // end SortedMap
    // An iterator over an LLRBNode.
    class lt {
        constructor(t, e, n, s) {
            this.yt = s, this.bt = [];
            let i = 1;
            for (;!t.L(); ) if (i = e ? n(t.key, e) : 1, 
            // flip the comparison if we're going in reverse
            s && (i *= -1), i < 0) 
            // This node is less than our start key. ignore it
            t = this.yt ? t.left : t.right; else {
                if (0 === i) {
                    // This node is exactly equal to our start key. Push it on the stack,
                    // but stop iterating;
                    this.bt.push(t);
                    break;
                }
                // This node is greater than our start key, add it to the stack and move
                // to the next one
                this.bt.push(t), t = this.yt ? t.right : t.left;
            }
        }
        vt() {
            let t = this.bt.pop();
            const e = {
                key: t.key,
                value: t.value
            };
            if (this.yt) for (t = t.left; !t.L(); ) this.bt.push(t), t = t.right; else for (t = t.right; !t.L(); ) this.bt.push(t), 
            t = t.left;
            return e;
        }
        St() {
            return this.bt.length > 0;
        }
        Dt() {
            if (0 === this.bt.length) return null;
            const t = this.bt[this.bt.length - 1];
            return {
                key: t.key,
                value: t.value
            };
        }
    }

     // end SortedMapIterator
    // Represents a node in a Left-leaning Red-Black tree.
    class _t {
        constructor(t, e, n, s, i) {
            this.key = t, this.value = e, this.color = null != n ? n : _t.RED, this.left = null != s ? s : _t.EMPTY, 
            this.right = null != i ? i : _t.EMPTY, this.size = this.left.size + 1 + this.right.size;
        }
        // Returns a copy of the current node, optionally replacing pieces of it.
        copy(t, e, n, s, i) {
            return new _t(null != t ? t : this.key, null != e ? e : this.value, null != n ? n : this.color, null != s ? s : this.left, null != i ? i : this.right);
        }
        L() {
            return !1;
        }
        // Traverses the tree in key order and calls the specified action function
        // for each node. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        It(t) {
            return this.left.It(t) || t(this.key, this.value) || this.right.It(t);
        }
        // Traverses the tree in reverse key order and calls the specified action
        // function for each node. If action returns true, traversal is aborted.
        // Returns the first truthy value returned by action, or the last falsey
        // value returned by action.
        At(t) {
            return this.right.At(t) || t(this.key, this.value) || this.left.At(t);
        }
        // Returns the minimum node in the tree.
        min() {
            return this.left.L() ? this : this.left.min();
        }
        // Returns the maximum key in the tree.
        Et() {
            return this.min().key;
        }
        // Returns the maximum key in the tree.
        Tt() {
            return this.right.L() ? this.key : this.right.Tt();
        }
        // Returns new tree, with the key/value added.
        dt(t, e, n) {
            let s = this;
            const i = n(t, s.key);
            return s = i < 0 ? s.copy(null, null, null, s.left.dt(t, e, n), null) : 0 === i ? s.copy(null, e, null, null, null) : s.copy(null, null, null, null, s.right.dt(t, e, n)), 
            s.Ct();
        }
        Nt() {
            if (this.left.L()) return _t.EMPTY;
            let t = this;
            return t.left.xt() || t.left.left.xt() || (t = t.Ot()), t = t.copy(null, null, null, t.left.Nt(), null), 
            t.Ct();
        }
        // Returns new tree, with the specified item removed.
        remove(t, e) {
            let n, s = this;
            if (e(t, s.key) < 0) s.left.L() || s.left.xt() || s.left.left.xt() || (s = s.Ot()), 
            s = s.copy(null, null, null, s.left.remove(t, e), null); else {
                if (s.left.xt() && (s = s.Ft()), s.right.L() || s.right.xt() || s.right.left.xt() || (s = s.Mt()), 
                0 === e(t, s.key)) {
                    if (s.right.L()) return _t.EMPTY;
                    n = s.right.min(), s = s.copy(n.key, n.value, null, null, s.right.Nt());
                }
                s = s.copy(null, null, null, null, s.right.remove(t, e));
            }
            return s.Ct();
        }
        xt() {
            return this.color;
        }
        // Returns new tree after performing any needed rotations.
        Ct() {
            let t = this;
            return t.right.xt() && !t.left.xt() && (t = t.$t()), t.left.xt() && t.left.left.xt() && (t = t.Ft()), 
            t.left.xt() && t.right.xt() && (t = t.kt()), t;
        }
        Ot() {
            let t = this.kt();
            return t.right.left.xt() && (t = t.copy(null, null, null, null, t.right.Ft()), t = t.$t(), 
            t = t.kt()), t;
        }
        Mt() {
            let t = this.kt();
            return t.left.left.xt() && (t = t.Ft(), t = t.kt()), t;
        }
        $t() {
            const t = this.copy(null, null, _t.RED, null, this.right.left);
            return this.right.copy(null, null, this.color, t, null);
        }
        Ft() {
            const t = this.copy(null, null, _t.RED, this.left.right, null);
            return this.left.copy(null, null, this.color, null, t);
        }
        kt() {
            const t = this.left.copy(null, null, !this.left.color, null, null), e = this.right.copy(null, null, !this.right.color, null, null);
            return this.copy(null, null, !this.color, t, e);
        }
        // For testing.
        Lt() {
            const t = this.qt();
            return Math.pow(2, t) <= this.size + 1;
        }
        // In a balanced RB tree, the black-depth (number of black nodes) from root to
        // leaves is equal on both sides.  This function verifies that or asserts.
        qt() {
            if (this.xt() && this.left.xt()) throw b();
            if (this.right.xt()) throw b();
            const t = this.left.qt();
            if (t !== this.right.qt()) throw b();
            return t + (this.xt() ? 0 : 1);
        }
    }

     // end LLRBNode
    // Empty node is shared between all LLRB trees.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _t.EMPTY = null, _t.RED = !0, _t.wt = !1;

    // end LLRBEmptyNode
    _t.EMPTY = new 
    // Represents an empty node (a leaf node in the Red-Black Tree).
    class {
        constructor() {
            this.size = 0;
        }
        get key() {
            throw b();
        }
        get value() {
            throw b();
        }
        get color() {
            throw b();
        }
        get left() {
            throw b();
        }
        get right() {
            throw b();
        }
        // Returns a copy of the current node.
        copy(t, e, n, s, i) {
            return this;
        }
        // Returns a copy of the tree, with the specified key/value added.
        dt(t, e, n) {
            return new _t(t, e);
        }
        // Returns a copy of the tree, with the specified key removed.
        remove(t, e) {
            return this;
        }
        L() {
            return !0;
        }
        It(t) {
            return !1;
        }
        At(t) {
            return !1;
        }
        Et() {
            return null;
        }
        Tt() {
            return null;
        }
        xt() {
            return !1;
        }
        // For testing.
        Lt() {
            return !0;
        }
        qt() {
            return 0;
        }
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * SortedSet is an immutable (copy-on-write) collection that holds elements
     * in order specified by the provided comparator.
     *
     * NOTE: if provided comparator returns 0 for two elements, we consider them to
     * be equal!
     */
    class ft {
        constructor(t) {
            this.N = t, this.data = new ht(this.N);
        }
        has(t) {
            return null !== this.data.get(t);
        }
        first() {
            return this.data.Et();
        }
        last() {
            return this.data.Tt();
        }
        get size() {
            return this.data.size;
        }
        indexOf(t) {
            return this.data.indexOf(t);
        }
        /** Iterates elements in order defined by "comparator" */    forEach(t) {
            this.data.It((e, n) => (t(e), !1));
        }
        /** Iterates over `elem`s such that: range[0] <= elem < range[1]. */    Bt(t, e) {
            const n = this.data.Pt(t[0]);
            for (;n.St(); ) {
                const s = n.vt();
                if (this.N(s.key, t[1]) >= 0) return;
                e(s.key);
            }
        }
        /**
         * Iterates over `elem`s such that: start <= elem until false is returned.
         */    Ut(t, e) {
            let n;
            for (n = void 0 !== e ? this.data.Pt(e) : this.data.Rt(); n.St(); ) {
                if (!t(n.vt().key)) return;
            }
        }
        /** Finds the least element greater than or equal to `elem`. */    Kt(t) {
            const e = this.data.Pt(t);
            return e.St() ? e.vt().key : null;
        }
        Rt() {
            return new dt(this.data.Rt());
        }
        Pt(t) {
            return new dt(this.data.Pt(t));
        }
        /** Inserts or updates an element */    add(t) {
            return this.copy(this.data.remove(t).dt(t, !0));
        }
        /** Deletes an element */    delete(t) {
            return this.has(t) ? this.copy(this.data.remove(t)) : this;
        }
        L() {
            return this.data.L();
        }
        Qt(t) {
            let e = this;
            // Make sure `result` always refers to the larger one of the two sets.
                    return e.size < t.size && (e = t, t = this), t.forEach(t => {
                e = e.add(t);
            }), e;
        }
        isEqual(t) {
            if (!(t instanceof ft)) return !1;
            if (this.size !== t.size) return !1;
            const e = this.data.Rt(), n = t.data.Rt();
            for (;e.St(); ) {
                const t = e.vt().key, s = n.vt().key;
                if (0 !== this.N(t, s)) return !1;
            }
            return !0;
        }
        U() {
            const t = [];
            return this.forEach(e => {
                t.push(e);
            }), t;
        }
        toString() {
            const t = [];
            return this.forEach(e => t.push(e)), "SortedSet(" + t.toString() + ")";
        }
        copy(t) {
            const e = new ft(this.N);
            return e.data = t, e;
        }
    }

    class dt {
        constructor(t) {
            this.Wt = t;
        }
        vt() {
            return this.Wt.vt().key;
        }
        St() {
            return this.Wt.St();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const wt = new ht(W$1.N);

    function Et() {
        return wt;
    }

    function Tt() {
        return Et();
    }

    const It = new ht(W$1.N);

    function mt() {
        return It;
    }

    const At = new ht(W$1.N);

    const Rt = new ft(W$1.N);

    function Pt(...t) {
        let e = Rt;
        for (const n of t) e = e.add(n);
        return e;
    }

    const gt = new ft(M$1);

    function Vt() {
        return gt;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * DocumentSet is an immutable (copy-on-write) collection that holds documents
     * in order specified by the provided comparator. We always add a document key
     * comparator on top of what is provided to guarantee document equality based on
     * the key.
     */ class yt {
        /** The default ordering is by key if the comparator is omitted */
        constructor(t) {
            // We are adding document key comparator to the end as it's the only
            // guaranteed unique property of a document.
            this.N = t ? (e, n) => t(e, n) || W$1.N(e.key, n.key) : (t, e) => W$1.N(t.key, e.key), 
            this.jt = mt(), this.Gt = new ht(this.N);
        }
        /**
         * Returns an empty copy of the existing DocumentSet, using the same
         * comparator.
         */    static zt(t) {
            return new yt(t.N);
        }
        has(t) {
            return null != this.jt.get(t);
        }
        get(t) {
            return this.jt.get(t);
        }
        first() {
            return this.Gt.Et();
        }
        last() {
            return this.Gt.Tt();
        }
        L() {
            return this.Gt.L();
        }
        /**
         * Returns the index of the provided key in the document set, or -1 if the
         * document key is not present in the set;
         */    indexOf(t) {
            const e = this.jt.get(t);
            return e ? this.Gt.indexOf(e) : -1;
        }
        get size() {
            return this.Gt.size;
        }
        /** Iterates documents in order defined by "comparator" */    forEach(t) {
            this.Gt.It((e, n) => (t(e), !1));
        }
        /** Inserts or updates a document with the same key */    add(t) {
            // First remove the element if we have it.
            const e = this.delete(t.key);
            return e.copy(e.jt.dt(t.key, t), e.Gt.dt(t, null));
        }
        /** Deletes a document with a given key */    delete(t) {
            const e = this.get(t);
            return e ? this.copy(this.jt.remove(t), this.Gt.remove(e)) : this;
        }
        isEqual(t) {
            if (!(t instanceof yt)) return !1;
            if (this.size !== t.size) return !1;
            const e = this.Gt.Rt(), n = t.Gt.Rt();
            for (;e.St(); ) {
                const t = e.vt().key, s = n.vt().key;
                if (!t.isEqual(s)) return !1;
            }
            return !0;
        }
        toString() {
            const t = [];
            return this.forEach(e => {
                t.push(e.toString());
            }), 0 === t.length ? "DocumentSet ()" : "DocumentSet (\n  " + t.join("  \n") + "\n)";
        }
        copy(t, e) {
            const n = new yt;
            return n.N = this.N, n.jt = t, n.Gt = e, n;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
     * duplicate events for the same doc.
     */ class pt {
        constructor() {
            this.Ht = new ht(W$1.N);
        }
        track(t) {
            const e = t.doc.key, n = this.Ht.get(e);
            n ? 
            // Merge the new change with the existing change.
            0 /* Added */ !== t.type && 3 /* Metadata */ === n.type ? this.Ht = this.Ht.dt(e, t) : 3 /* Metadata */ === t.type && 1 /* Removed */ !== n.type ? this.Ht = this.Ht.dt(e, {
                type: n.type,
                doc: t.doc
            }) : 2 /* Modified */ === t.type && 2 /* Modified */ === n.type ? this.Ht = this.Ht.dt(e, {
                type: 2 /* Modified */ ,
                doc: t.doc
            }) : 2 /* Modified */ === t.type && 0 /* Added */ === n.type ? this.Ht = this.Ht.dt(e, {
                type: 0 /* Added */ ,
                doc: t.doc
            }) : 1 /* Removed */ === t.type && 0 /* Added */ === n.type ? this.Ht = this.Ht.remove(e) : 1 /* Removed */ === t.type && 2 /* Modified */ === n.type ? this.Ht = this.Ht.dt(e, {
                type: 1 /* Removed */ ,
                doc: n.doc
            }) : 0 /* Added */ === t.type && 1 /* Removed */ === n.type ? this.Ht = this.Ht.dt(e, {
                type: 2 /* Modified */ ,
                doc: t.doc
            }) : 
            // This includes these cases, which don't make sense:
            // Added->Added
            // Removed->Removed
            // Modified->Added
            // Removed->Modified
            // Metadata->Added
            // Removed->Metadata
            b() : this.Ht = this.Ht.dt(e, t);
        }
        Jt() {
            const t = [];
            return this.Ht.It((e, n) => {
                t.push(n);
            }), t;
        }
    }

    class bt {
        constructor(t, e, n, s, i, r, o, c) {
            this.query = t, this.docs = e, this.Yt = n, this.docChanges = s, this.Xt = i, this.fromCache = r, 
            this.Zt = o, this.te = c;
        }
        /** Returns a view snapshot as if all documents in the snapshot were added. */    static ee(t, e, n, s) {
            const i = [];
            return e.forEach(t => {
                i.push({
                    type: 0 /* Added */ ,
                    doc: t
                });
            }), new bt(t, e, yt.zt(e), i, n, s, 
            /* syncStateChanged= */ !0, 
            /* excludesMetadataChanges= */ !1);
        }
        get hasPendingWrites() {
            return !this.Xt.L();
        }
        isEqual(t) {
            if (!(this.fromCache === t.fromCache && this.Zt === t.Zt && this.Xt.isEqual(t.Xt) && Ln(this.query, t.query) && this.docs.isEqual(t.docs) && this.Yt.isEqual(t.Yt))) return !1;
            const e = this.docChanges, n = t.docChanges;
            if (e.length !== n.length) return !1;
            for (let t = 0; t < e.length; t++) if (e[t].type !== n[t].type || !e[t].doc.isEqual(n[t].doc)) return !1;
            return !0;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An event from the RemoteStore. It is split into targetChanges (changes to the
     * state or the set of documents in our watched targets) and documentUpdates
     * (changes to the actual documents).
     */ class vt {
        constructor(
        /**
         * The snapshot version this event brings us up to, or MIN if not set.
         */
        t, 
        /**
         * A map from target to changes to the target. See TargetChange.
         */
        e, 
        /**
         * A set of targets that is known to be inconsistent. Listens for these
         * targets should be re-established without resume tokens.
         */
        n, 
        /**
         * A set of which documents have changed or been deleted, along with the
         * doc's new values (if not deleted).
         */
        s, 
        /**
         * A set of which document updates are due only to limbo resolution targets.
         */
        i) {
            this.ht = t, this.ne = e, this.se = n, this.ie = s, this.re = i;
        }
        /**
         * HACK: Views require RemoteEvents in order to determine whether the view is
         * CURRENT, but secondary tabs don't receive remote events. So this method is
         * used to create a synthesized RemoteEvent that can be used to apply a
         * CURRENT status change to a View, for queries executed in a different tab.
         */
        // PORTING NOTE: Multi-tab only
        static oe(t, e) {
            const n = new Map;
            return n.set(t, St.ce(t, e)), new vt(q$1.min(), n, Vt(), Et(), Pt());
        }
    }

    /**
     * A TargetChange specifies the set of changes for a specific target as part of
     * a RemoteEvent. These changes track which documents are added, modified or
     * removed, as well as the target's resume token and whether the target is
     * marked CURRENT.
     * The actual changes *to* documents are not part of the TargetChange since
     * documents may be part of multiple targets.
     */ class St {
        constructor(
        /**
         * An opaque, server-assigned token that allows watching a query to be resumed
         * after disconnecting without retransmitting all the data that matches the
         * query. The resume token essentially identifies a point in time from which
         * the server should resume sending results.
         */
        t, 
        /**
         * The "current" (synced) status of this target. Note that "current"
         * has special meaning in the RPC protocol that implies that a target is
         * both up-to-date and consistent with the rest of the watch stream.
         */
        e, 
        /**
         * The set of documents that were newly assigned to this target as part of
         * this remote event.
         */
        n, 
        /**
         * The set of documents that were already assigned to this target but received
         * an update during this remote event.
         */
        s, 
        /**
         * The set of documents that were removed from this target as part of this
         * remote event.
         */
        i) {
            this.resumeToken = t, this.ae = e, this.ue = n, this.he = s, this.le = i;
        }
        /**
         * This method is used to create a synthesized TargetChanges that can be used to
         * apply a CURRENT status change to a View (for queries executed in a different
         * tab) or for new queries (to raise snapshots with correct CURRENT status).
         */    static ce(t, e) {
            return new St(st.at, e, Pt(), Pt(), Pt());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents a changed document and a list of target ids to which this change
     * applies.
     *
     * If document has been deleted NoDocument will be provided.
     */ class Dt {
        constructor(
        /** The new document applies to all of these targets. */
        t, 
        /** The new document is removed from all of these targets. */
        e, 
        /** The key of the document for this change. */
        n, 
        /**
         * The new document or NoDocument if it was deleted. Is null if the
         * document went out of view without the server sending a new document.
         */
        s) {
            this._e = t, this.removedTargetIds = e, this.key = n, this.fe = s;
        }
    }

    class Ct {
        constructor(t, e) {
            this.targetId = t, this.de = e;
        }
    }

    class Nt {
        constructor(
        /** What kind of change occurred to the watch target. */
        t, 
        /** The target IDs that were added/removed/set. */
        e, 
        /**
         * An opaque, server-assigned token that allows watching a target to be
         * resumed after disconnecting without retransmitting all the data that
         * matches the target. The resume token essentially identifies a point in
         * time from which the server should resume sending results.
         */
        n = st.at
        /** An RPC error indicating why the watch failed. */ , s = null) {
            this.state = t, this.targetIds = e, this.resumeToken = n, this.cause = s;
        }
    }

    /** Tracks the internal state of a Watch target. */ class xt {
        constructor() {
            /**
             * The number of pending responses (adds or removes) that we are waiting on.
             * We only consider targets active that have no pending responses.
             */
            this.we = 0, 
            /**
             * Keeps track of the document changes since the last raised snapshot.
             *
             * These changes are continuously updated as we receive document updates and
             * always reflect the current set of changes against the last issued snapshot.
             */
            this.Ee = Mt(), 
            /** See public getters for explanations of these fields. */
            this.Te = st.at, this.Ie = !1, 
            /**
             * Whether this target state should be included in the next snapshot. We
             * initialize to true so that newly-added targets are included in the next
             * RemoteEvent.
             */
            this.me = !0;
        }
        /**
         * Whether this target has been marked 'current'.
         *
         * 'Current' has special meaning in the RPC protocol: It implies that the
         * Watch backend has sent us all changes up to the point at which the target
         * was added and that the target is consistent with the rest of the watch
         * stream.
         */    get ae() {
            return this.Ie;
        }
        /** The last resume token sent to us for this target. */    get resumeToken() {
            return this.Te;
        }
        /** Whether this target has pending target adds or target removes. */    get Ae() {
            return 0 !== this.we;
        }
        /** Whether we have modified any state that should trigger a snapshot. */    get Re() {
            return this.me;
        }
        /**
         * Applies the resume token to the TargetChange, but only when it has a new
         * value. Empty resumeTokens are discarded.
         */    Pe(t) {
            t.ct() > 0 && (this.me = !0, this.Te = t);
        }
        /**
         * Creates a target change from the current set of changes.
         *
         * To reset the document changes after raising this snapshot, call
         * `clearPendingChanges()`.
         */    ge() {
            let t = Pt(), e = Pt(), n = Pt();
            return this.Ee.forEach((s, i) => {
                switch (i) {
                  case 0 /* Added */ :
                    t = t.add(s);
                    break;

                  case 2 /* Modified */ :
                    e = e.add(s);
                    break;

                  case 1 /* Removed */ :
                    n = n.add(s);
                    break;

                  default:
                    b();
                }
            }), new St(this.Te, this.Ie, t, e, n);
        }
        /**
         * Resets the document changes and sets `hasPendingChanges` to false.
         */    Ve() {
            this.me = !1, this.Ee = Mt();
        }
        ye(t, e) {
            this.me = !0, this.Ee = this.Ee.dt(t, e);
        }
        pe(t) {
            this.me = !0, this.Ee = this.Ee.remove(t);
        }
        be() {
            this.we += 1;
        }
        ve() {
            this.we -= 1;
        }
        Se() {
            this.me = !0, this.Ie = !0;
        }
    }

    /**
     * A helper class to accumulate watch changes into a RemoteEvent.
     */
    class Ot {
        constructor(t) {
            this.De = t, 
            /** The internal state of all tracked targets. */
            this.Ce = new Map, 
            /** Keeps track of the documents to update since the last raised snapshot. */
            this.Ne = Et(), 
            /** A mapping of document keys to their set of target IDs. */
            this.xe = Ft(), 
            /**
             * A list of targets with existence filter mismatches. These targets are
             * known to be inconsistent and their listens needs to be re-established by
             * RemoteStore.
             */
            this.Oe = new ft(M$1);
        }
        /**
         * Processes and adds the DocumentWatchChange to the current set of changes.
         */    Fe(t) {
            for (const e of t._e) t.fe instanceof pn ? this.Me(e, t.fe) : t.fe instanceof bn && this.$e(e, t.key, t.fe);
            for (const e of t.removedTargetIds) this.$e(e, t.key, t.fe);
        }
        /** Processes and adds the WatchTargetChange to the current set of changes. */    ke(t) {
            this.Le(t, e => {
                const n = this.qe(e);
                switch (t.state) {
                  case 0 /* NoChange */ :
                    this.Be(e) && n.Pe(t.resumeToken);
                    break;

                  case 1 /* Added */ :
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    n.ve(), n.Ae || 
                    // We have a freshly added target, so we need to reset any state
                    // that we had previously. This can happen e.g. when remove and add
                    // back a target for existence filter mismatches.
                    n.Ve(), n.Pe(t.resumeToken);
                    break;

                  case 2 /* Removed */ :
                    // We need to keep track of removed targets to we can post-filter and
                    // remove any target changes.
                    // We need to decrement the number of pending acks needed from watch
                    // for this targetId.
                    n.ve(), n.Ae || this.removeTarget(e);
                    break;

                  case 3 /* Current */ :
                    this.Be(e) && (n.Se(), n.Pe(t.resumeToken));
                    break;

                  case 4 /* Reset */ :
                    this.Be(e) && (
                    // Reset the target and synthesizes removes for all existing
                    // documents. The backend will re-add any documents that still
                    // match the target before it sends the next global snapshot.
                    this.Ue(e), n.Pe(t.resumeToken));
                    break;

                  default:
                    b();
                }
            });
        }
        /**
         * Iterates over all targetIds that the watch change applies to: either the
         * targetIds explicitly listed in the change or the targetIds of all currently
         * active targets.
         */    Le(t, e) {
            t.targetIds.length > 0 ? t.targetIds.forEach(e) : this.Ce.forEach((t, n) => {
                this.Be(n) && e(n);
            });
        }
        /**
         * Handles existence filters and synthesizes deletes for filter mismatches.
         * Targets that are invalidated by filter mismatches are added to
         * `pendingTargetResets`.
         */    Ke(t) {
            const e = t.targetId, n = t.de.count, s = this.Qe(e);
            if (s) {
                const t = s.target;
                if (nt(t)) if (0 === n) {
                    // The existence filter told us the document does not exist. We deduce
                    // that this document does not exist and apply a deleted document to
                    // our updates. Without applying this deleted document there might be
                    // another query that will raise this document as part of a snapshot
                    // until it is resolved, essentially exposing inconsistency between
                    // queries.
                    const n = new W$1(t.path);
                    this.$e(e, n, new bn(n, q$1.min()));
                } else v$1(1 === n); else {
                    this.We(e) !== n && (
                    // Existence filter mismatch: We reset the mapping and raise a new
                    // snapshot with `isFromCache:true`.
                    this.Ue(e), this.Oe = this.Oe.add(e));
                }
            }
        }
        /**
         * Converts the currently accumulated state into a remote event at the
         * provided snapshot version. Resets the accumulated changes before returning.
         */    je(t) {
            const e = new Map;
            this.Ce.forEach((n, s) => {
                const i = this.Qe(s);
                if (i) {
                    if (n.ae && nt(i.target)) {
                        // Document queries for document that don't exist can produce an empty
                        // result set. To update our local cache, we synthesize a document
                        // delete if we have not previously received the document. This
                        // resolves the limbo state of the document, removing it from
                        // limboDocumentRefs.
                        // TODO(dimond): Ideally we would have an explicit lookup target
                        // instead resulting in an explicit delete message and we could
                        // remove this special logic.
                        const e = new W$1(i.target.path);
                        null !== this.Ne.get(e) || this.Ge(s, e) || this.$e(s, e, new bn(e, t));
                    }
                    n.Re && (e.set(s, n.ge()), n.Ve());
                }
            });
            let n = Pt();
            // We extract the set of limbo-only document updates as the GC logic
            // special-cases documents that do not appear in the target cache.
            
            // TODO(gsoltis): Expand on this comment once GC is available in the JS
            // client.
                    this.xe.forEach((t, e) => {
                let s = !0;
                e.Ut(t => {
                    const e = this.Qe(t);
                    return !e || 2 /* LimboResolution */ === e.ut || (s = !1, !1);
                }), s && (n = n.add(t));
            });
            const s = new vt(t, e, this.Oe, this.Ne, n);
            return this.Ne = Et(), this.xe = Ft(), this.Oe = new ft(M$1), s;
        }
        /**
         * Adds the provided document to the internal list of document updates and
         * its document key to the given target's mapping.
         */
        // Visible for testing.
        Me(t, e) {
            if (!this.Be(t)) return;
            const n = this.Ge(t, e.key) ? 2 /* Modified */ : 0 /* Added */;
            this.qe(t).ye(e.key, n), this.Ne = this.Ne.dt(e.key, e), this.xe = this.xe.dt(e.key, this.ze(e.key).add(t));
        }
        /**
         * Removes the provided document from the target mapping. If the
         * document no longer matches the target, but the document's state is still
         * known (e.g. we know that the document was deleted or we received the change
         * that caused the filter mismatch), the new document can be provided
         * to update the remote document cache.
         */
        // Visible for testing.
        $e(t, e, n) {
            if (!this.Be(t)) return;
            const s = this.qe(t);
            this.Ge(t, e) ? s.ye(e, 1 /* Removed */) : 
            // The document may have entered and left the target before we raised a
            // snapshot, so we can just ignore the change.
            s.pe(e), this.xe = this.xe.dt(e, this.ze(e).delete(t)), n && (this.Ne = this.Ne.dt(e, n));
        }
        removeTarget(t) {
            this.Ce.delete(t);
        }
        /**
         * Returns the current count of documents in the target. This includes both
         * the number of documents that the LocalStore considers to be part of the
         * target as well as any accumulated changes.
         */    We(t) {
            const e = this.qe(t).ge();
            return this.De.He(t).size + e.ue.size - e.le.size;
        }
        /**
         * Increment the number of acks needed from watch before we can consider the
         * server to be 'in-sync' with the client's active targets.
         */    be(t) {
            this.qe(t).be();
        }
        qe(t) {
            let e = this.Ce.get(t);
            return e || (e = new xt, this.Ce.set(t, e)), e;
        }
        ze(t) {
            let e = this.xe.get(t);
            return e || (e = new ft(M$1), this.xe = this.xe.dt(t, e)), e;
        }
        /**
         * Verifies that the user is still interested in this target (by calling
         * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
         * from watch.
         */    Be(t) {
            const e = null !== this.Qe(t);
            return e || g$1("WatchChangeAggregator", "Detected inactive target", t), e;
        }
        /**
         * Returns the TargetData for an active target (i.e. a target that the user
         * is still interested in that has no outstanding target change requests).
         */    Qe(t) {
            const e = this.Ce.get(t);
            return e && e.Ae ? null : this.De.Je(t);
        }
        /**
         * Resets the state of a Watch target to its initial state (e.g. sets
         * 'current' to false, clears the resume token and removes its target mapping
         * from all documents).
         */    Ue(t) {
            this.Ce.set(t, new xt);
            this.De.He(t).forEach(e => {
                this.$e(t, e, /*updatedDocument=*/ null);
            });
        }
        /**
         * Returns whether the LocalStore considers the document to be part of the
         * specified target.
         */    Ge(t, e) {
            return this.De.He(t).has(e);
        }
    }

    function Ft() {
        return new ht(W$1.N);
    }

    function Mt() {
        return new ht(W$1.N);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function $t(t) {
        let e = 0;
        for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e++;
        return e;
    }

    function kt(t, e) {
        for (const n in t) Object.prototype.hasOwnProperty.call(t, n) && e(n, t[n]);
    }

    function Lt(t) {
        for (const e in t) if (Object.prototype.hasOwnProperty.call(t, e)) return !1;
        return !0;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents a locally-applied ServerTimestamp.
     *
     * Server Timestamps are backed by MapValues that contain an internal field
     * `__type__` with a value of `server_timestamp`. The previous value and local
     * write time are stored in its `__previous_value__` and `__local_write_time__`
     * fields respectively.
     *
     * Notes:
     * - ServerTimestampValue instances are created as the result of applying a
     *   TransformMutation (see TransformMutation.applyTo()). They can only exist in
     *   the local view of a document. Therefore they do not need to be parsed or
     *   serialized.
     * - When evaluated locally (e.g. for snapshot.data()), they by default
     *   evaluate to `null`. This behavior can be configured by passing custom
     *   FieldValueOptions to value().
     * - With respect to other ServerTimestampValues, they sort by their
     *   localWriteTime.
     */ function qt(t) {
        var e, n;
        return "server_timestamp" === (null === (n = ((null === (e = null == t ? void 0 : t.mapValue) || void 0 === e ? void 0 : e.fields) || {}).__type__) || void 0 === n ? void 0 : n.stringValue);
    }

    /**
     * Creates a new ServerTimestamp proto value (using the internal format).
     */
    /**
     * Returns the local time at which this timestamp was first set.
     */
    function Bt(t) {
        const e = Jt(t.mapValue.fields.__local_write_time__.timestampValue);
        return new L$1(e.seconds, e.nanos);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
    const Ut = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /** Extracts the backend's type order for the provided value. */ function Kt(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? qt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : b();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function Qt(t, e) {
        const n = Kt(t);
        if (n !== Kt(e)) return !1;
        switch (n) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === e.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return Bt(t).isEqual(Bt(e));

          case 3 /* TimestampValue */ :
            return function(t, e) {
                if ("string" == typeof t.timestampValue && "string" == typeof e.timestampValue && t.timestampValue.length === e.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === e.timestampValue;
                const n = Jt(t.timestampValue), s = Jt(e.timestampValue);
                return n.seconds === s.seconds && n.nanos === s.nanos;
            }(t, e);

          case 5 /* StringValue */ :
            return t.stringValue === e.stringValue;

          case 6 /* BlobValue */ :
            return function(t, e) {
                return Xt(t.bytesValue).isEqual(Xt(e.bytesValue));
            }(t, e);

          case 7 /* RefValue */ :
            return t.referenceValue === e.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, e) {
                return Yt(t.geoPointValue.latitude) === Yt(e.geoPointValue.latitude) && Yt(t.geoPointValue.longitude) === Yt(e.geoPointValue.longitude);
            }(t, e);

          case 2 /* NumberValue */ :
            return function(t, e) {
                if ("integerValue" in t && "integerValue" in e) return Yt(t.integerValue) === Yt(e.integerValue);
                if ("doubleValue" in t && "doubleValue" in e) {
                    const n = Yt(t.doubleValue), s = Yt(e.doubleValue);
                    return n === s ? H$1(n) === H$1(s) : isNaN(n) && isNaN(s);
                }
                return !1;
            }(t, e);

          case 9 /* ArrayValue */ :
            return $(t.arrayValue.values || [], e.arrayValue.values || [], Qt);

          case 10 /* ObjectValue */ :
            return function(t, e) {
                const n = t.mapValue.fields || {}, s = e.mapValue.fields || {};
                if ($t(n) !== $t(s)) return !1;
                for (const t in n) if (n.hasOwnProperty(t) && (void 0 === s[t] || !Qt(n[t], s[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, e);

          default:
            return b();
        }
    }

    function Wt(t, e) {
        return void 0 !== (t.values || []).find(t => Qt(t, e));
    }

    function jt(t, e) {
        const n = Kt(t), s = Kt(e);
        if (n !== s) return M$1(n, s);
        switch (n) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return M$1(t.booleanValue, e.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, e) {
                const n = Yt(t.integerValue || t.doubleValue), s = Yt(e.integerValue || e.doubleValue);
                return n < s ? -1 : n > s ? 1 : n === s ? 0 : 
                // one or both are NaN.
                isNaN(n) ? isNaN(s) ? 0 : -1 : 1;
            }(t, e);

          case 3 /* TimestampValue */ :
            return Gt(t.timestampValue, e.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return Gt(Bt(t), Bt(e));

          case 5 /* StringValue */ :
            return M$1(t.stringValue, e.stringValue);

          case 6 /* BlobValue */ :
            return function(t, e) {
                const n = Xt(t), s = Xt(e);
                return n.v(s);
            }(t.bytesValue, e.bytesValue);

          case 7 /* RefValue */ :
            return function(t, e) {
                const n = t.split("/"), s = e.split("/");
                for (let t = 0; t < n.length && t < s.length; t++) {
                    const e = M$1(n[t], s[t]);
                    if (0 !== e) return e;
                }
                return M$1(n.length, s.length);
            }(t.referenceValue, e.referenceValue);

          case 8 /* GeoPointValue */ :
            return function(t, e) {
                const n = M$1(Yt(t.latitude), Yt(e.latitude));
                if (0 !== n) return n;
                return M$1(Yt(t.longitude), Yt(e.longitude));
            }(t.geoPointValue, e.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, e) {
                const n = t.values || [], s = e.values || [];
                for (let t = 0; t < n.length && t < s.length; ++t) {
                    const e = jt(n[t], s[t]);
                    if (e) return e;
                }
                return M$1(n.length, s.length);
            }(t.arrayValue, e.arrayValue);

          case 10 /* ObjectValue */ :
            return function(t, e) {
                const n = t.fields || {}, s = Object.keys(n), i = e.fields || {}, r = Object.keys(i);
                // Even though MapValues are likely sorted correctly based on their insertion
                // order (e.g. when received from the backend), local modifications can bring
                // elements out of order. We need to re-sort the elements to ensure that
                // canonical IDs are independent of insertion order.
                s.sort(), r.sort();
                for (let t = 0; t < s.length && t < r.length; ++t) {
                    const e = M$1(s[t], r[t]);
                    if (0 !== e) return e;
                    const o = jt(n[s[t]], i[r[t]]);
                    if (0 !== o) return o;
                }
                return M$1(s.length, r.length);
            }
            /**
     * Generates the canonical ID for the provided field value (as used in Target
     * serialization).
     */ (t.mapValue, e.mapValue);

          default:
            throw b();
        }
    }

    function Gt(t, e) {
        if ("string" == typeof t && "string" == typeof e && t.length === e.length) return M$1(t, e);
        const n = Jt(t), s = Jt(e), i = M$1(n.seconds, s.seconds);
        return 0 !== i ? i : M$1(n.nanos, s.nanos);
    }

    function zt(t) {
        return Ht(t);
    }

    function Ht(t) {
        return "nullValue" in t ? "null" : "booleanValue" in t ? "" + t.booleanValue : "integerValue" in t ? "" + t.integerValue : "doubleValue" in t ? "" + t.doubleValue : "timestampValue" in t ? function(t) {
            const e = Jt(t);
            return `time(${e.seconds},${e.nanos})`;
        }(t.timestampValue) : "stringValue" in t ? t.stringValue : "bytesValue" in t ? Xt(t.bytesValue).toBase64() : "referenceValue" in t ? (n = t.referenceValue, 
        W$1.Z(n).toString()) : "geoPointValue" in t ? `geo(${(e = t.geoPointValue).latitude},${e.longitude})` : "arrayValue" in t ? function(t) {
            let e = "[", n = !0;
            for (const s of t.values || []) n ? n = !1 : e += ",", e += Ht(s);
            return e + "]";
        }
        /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ (t.arrayValue) : "mapValue" in t ? function(t) {
            // Iteration order in JavaScript is not guaranteed. To ensure that we generate
            // matching canonical IDs for identical maps, we need to sort the keys.
            const e = Object.keys(t.fields || {}).sort();
            let n = "{", s = !0;
            for (const i of e) s ? s = !1 : n += ",", n += `${i}:${Ht(t.fields[i])}`;
            return n + "}";
        }(t.mapValue) : b();
        var e, n;
    }

    function Jt(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (v$1(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let e = 0;
            const n = Ut.exec(t);
            if (v$1(!!n), n[1]) {
                // Pad the fraction out to 9 digits (nanos).
                let t = n[1];
                t = (t + "000000000").substr(0, 9), e = Number(t);
            }
            // Parse the date to get the seconds.
                    const s = new Date(t);
            return {
                seconds: Math.floor(s.getTime() / 1e3),
                nanos: e
            };
        }
        return {
            seconds: Yt(t.seconds),
            nanos: Yt(t.nanos)
        };
    }

    /**
     * Converts the possible Proto types for numbers into a JavaScript number.
     * Returns 0 if the value is not numeric.
     */ function Yt(t) {
        // TODO(bjornick): Handle int64 greater than 53 bits.
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
    }

    /** Converts the possible Proto types for Blobs into a ByteString. */ function Xt(t) {
        return "string" == typeof t ? st.fromBase64String(t) : st.fromUint8Array(t);
    }

    /** Returns a reference value for the provided database and key. */ function Zt(t, e) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${e.path.K()}`
        };
    }

    /** Returns true if `value` is an IntegerValue . */ function te(t) {
        return !!t && "integerValue" in t;
    }

    /** Returns true if `value` is a DoubleValue. */
    /** Returns true if `value` is an ArrayValue. */
    function ee(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function ne(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function se(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function ie(t) {
        return !!t && "mapValue" in t;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const re = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), oe = (() => {
        const t = {
            "<": "LESS_THAN",
            "<=": "LESS_THAN_OR_EQUAL",
            ">": "GREATER_THAN",
            ">=": "GREATER_THAN_OR_EQUAL",
            "==": "EQUAL",
            "!=": "NOT_EQUAL",
            "array-contains": "ARRAY_CONTAINS",
            in: "IN",
            "not-in": "NOT_IN",
            "array-contains-any": "ARRAY_CONTAINS_ANY"
        };
        return t;
    })();

    /**
     * This class generates JsonObject values for the Datastore API suitable for
     * sending to either GRPC stub methods or via the JSON/HTTP REST API.
     *
     * The serializer supports both Protobuf.js and Proto3 JSON formats. By
     * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
     * format.
     *
     * For a description of the Proto3 JSON format check
     * https://developers.google.com/protocol-buffers/docs/proto3#json
     *
     * TODO(klimt): We can remove the databaseId argument if we keep the full
     * resource name in documents.
     */
    class ce {
        constructor(t, e) {
            this.st = t, this.Ye = e;
        }
    }

    /**
     * Returns an IntegerValue for `value`.
     */
    function ae(t) {
        return {
            integerValue: "" + t
        };
    }

    /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */ function ue(t, e) {
        if (t.Ye) {
            if (isNaN(e)) return {
                doubleValue: "NaN"
            };
            if (e === 1 / 0) return {
                doubleValue: "Infinity"
            };
            if (e === -1 / 0) return {
                doubleValue: "-Infinity"
            };
        }
        return {
            doubleValue: H$1(e) ? "-0" : e
        };
    }

    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */ function he(t, e) {
        return J$1(e) ? ae(e) : ue(t, e);
    }

    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */ function le(t, e) {
        if (t.Ye) {
            return `${new Date(1e3 * e.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + e.nanoseconds).slice(-9)}Z`;
        }
        return {
            seconds: "" + e.seconds,
            nanos: e.nanoseconds
        };
    }

    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */
    function _e(t, e) {
        return t.Ye ? e.toBase64() : e.toUint8Array();
    }

    /**
     * Returns a ByteString based on the proto string value.
     */ function fe(t, e) {
        return le(t, e.D());
    }

    function de(t) {
        return v$1(!!t), q$1.p(function(t) {
            const e = Jt(t);
            return new L$1(e.seconds, e.nanos);
        }(t));
    }

    function we(t, e) {
        return function(t) {
            return new U$1([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(e).K();
    }

    function Ee(t) {
        const e = U$1.W(t);
        return v$1(Ue(e)), e;
    }

    function Te(t, e) {
        return we(t.st, e.path);
    }

    function Ie(t, e) {
        const n = Ee(e);
        return v$1(n.get(1) === t.st.projectId), v$1(!n.get(3) && !t.st.database || n.get(3) === t.st.database), 
        new W$1(Pe(n));
    }

    function me(t, e) {
        return we(t.st, e);
    }

    function Ae(t) {
        const e = Ee(t);
        // In v1beta1 queries for collections at the root did not have a trailing
        // "/documents". In v1 all resource paths contain "/documents". Preserve the
        // ability to read the v1beta1 form for compatibility with queries persisted
        // in the local target cache.
            return 4 === e.length ? U$1.j() : Pe(e);
    }

    function Re(t) {
        return new U$1([ "projects", t.st.projectId, "databases", t.st.database ]).K();
    }

    function Pe(t) {
        return v$1(t.length > 4 && "documents" === t.get(4)), t.F(5);
    }

    /** Creates a Document proto from key and fields (but no create/update time) */ function ge(t, e, n) {
        return {
            name: Te(t, e),
            fields: n.proto.mapValue.fields
        };
    }

    function Ve(t, e) {
        return "found" in e ? function(t, e) {
            v$1(!!e.found), e.found.name, e.found.updateTime;
            const n = Ie(t, e.found.name), s = de(e.found.updateTime), i = new Pn({
                mapValue: {
                    fields: e.found.fields
                }
            });
            return new pn(n, s, i, {});
        }(t, e) : "missing" in e ? function(t, e) {
            v$1(!!e.missing), v$1(!!e.readTime);
            const n = Ie(t, e.missing), s = de(e.readTime);
            return new bn(n, s);
        }(t, e) : b();
    }

    function ye(t, e) {
        let n;
        if ("targetChange" in e) {
            e.targetChange;
            // proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
            // if unset
            const s = function(t) {
                return "NO_CHANGE" === t ? 0 /* NoChange */ : "ADD" === t ? 1 /* Added */ : "REMOVE" === t ? 2 /* Removed */ : "CURRENT" === t ? 3 /* Current */ : "RESET" === t ? 4 /* Reset */ : b();
            }(e.targetChange.targetChangeType || "NO_CHANGE"), i = e.targetChange.targetIds || [], r = function(t, e) {
                return t.Ye ? (v$1(void 0 === e || "string" == typeof e), st.fromBase64String(e || "")) : (v$1(void 0 === e || e instanceof Uint8Array), 
                st.fromUint8Array(e || new Uint8Array));
            }(t, e.targetChange.resumeToken), o = e.targetChange.cause, c = o && function(t) {
                const e = void 0 === t.code ? D$1.UNKNOWN : ut(t.code);
                return new C$1(e, t.message || "");
            }
            /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */ (o);
            n = new Nt(s, i, r, c || null);
        } else if ("documentChange" in e) {
            e.documentChange;
            const s = e.documentChange;
            s.document, s.document.name, s.document.updateTime;
            const i = Ie(t, s.document.name), r = de(s.document.updateTime), o = new Pn({
                mapValue: {
                    fields: s.document.fields
                }
            }), c = new pn(i, r, o, {}), a = s.targetIds || [], u = s.removedTargetIds || [];
            n = new Dt(a, u, c.key, c);
        } else if ("documentDelete" in e) {
            e.documentDelete;
            const s = e.documentDelete;
            s.document;
            const i = Ie(t, s.document), r = s.readTime ? de(s.readTime) : q$1.min(), o = new bn(i, r), c = s.removedTargetIds || [];
            n = new Dt([], c, o.key, o);
        } else if ("documentRemove" in e) {
            e.documentRemove;
            const s = e.documentRemove;
            s.document;
            const i = Ie(t, s.document), r = s.removedTargetIds || [];
            n = new Dt([], r, i, null);
        } else {
            if (!("filter" in e)) return b();
            {
                e.filter;
                const t = e.filter;
                t.targetId;
                const s = t.count || 0, i = new rt(s), r = t.targetId;
                n = new Ct(r, i);
            }
        }
        return n;
    }

    function pe(t, e) {
        let n;
        if (e instanceof dn) n = {
            update: ge(t, e.key, e.value)
        }; else if (e instanceof An) n = {
            delete: Te(t, e.key)
        }; else if (e instanceof wn) n = {
            update: ge(t, e.key, e.data),
            updateMask: Be(e.Xe)
        }; else if (e instanceof Tn) n = {
            transform: {
                document: Te(t, e.key),
                fieldTransforms: e.fieldTransforms.map(t => function(t, e) {
                    const n = e.transform;
                    if (n instanceof Ge) return {
                        fieldPath: e.field.K(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (n instanceof ze) return {
                        fieldPath: e.field.K(),
                        appendMissingElements: {
                            values: n.elements
                        }
                    };
                    if (n instanceof Je) return {
                        fieldPath: e.field.K(),
                        removeAllFromArray: {
                            values: n.elements
                        }
                    };
                    if (n instanceof Xe) return {
                        fieldPath: e.field.K(),
                        increment: n.Ze
                    };
                    throw b();
                }(0, t))
            }
        }; else {
            if (!(e instanceof Rn)) return b();
            n = {
                verify: Te(t, e.key)
            };
        }
        return e.en.tn || (n.currentDocument = function(t, e) {
            return void 0 !== e.updateTime ? {
                updateTime: fe(t, e.updateTime)
            } : void 0 !== e.exists ? {
                exists: e.exists
            } : b();
        }(t, e.en)), n;
    }

    function be(t, e) {
        const n = e.currentDocument ? function(t) {
            return void 0 !== t.updateTime ? on.updateTime(de(t.updateTime)) : void 0 !== t.exists ? on.exists(t.exists) : on.nn();
        }(e.currentDocument) : on.nn();
        if (e.update) {
            e.update.name;
            const s = Ie(t, e.update.name), i = new Pn({
                mapValue: {
                    fields: e.update.fields
                }
            });
            if (e.updateMask) {
                const t = function(t) {
                    const e = t.fieldPaths || [];
                    return new en(e.map(t => Q$1.Y(t)));
                }(e.updateMask);
                return new wn(s, i, t, n);
            }
            return new dn(s, i, n);
        }
        if (e.delete) {
            const s = Ie(t, e.delete);
            return new An(s, n);
        }
        if (e.transform) {
            const s = Ie(t, e.transform.document), i = e.transform.fieldTransforms.map(e => function(t, e) {
                let n = null;
                if ("setToServerValue" in e) v$1("REQUEST_TIME" === e.setToServerValue), n = new Ge; else if ("appendMissingElements" in e) {
                    const t = e.appendMissingElements.values || [];
                    n = new ze(t);
                } else if ("removeAllFromArray" in e) {
                    const t = e.removeAllFromArray.values || [];
                    n = new Je(t);
                } else "increment" in e ? n = new Xe(t, e.increment) : b();
                const s = Q$1.Y(e.fieldPath);
                return new nn(s, n);
            }(t, e));
            return v$1(!0 === n.exists), new Tn(s, i);
        }
        if (e.verify) {
            const s = Ie(t, e.verify);
            return new Rn(s, n);
        }
        return b();
    }

    function ve(t, e) {
        return t && t.length > 0 ? (v$1(void 0 !== e), t.map(t => function(t, e) {
            // NOTE: Deletes don't have an updateTime.
            let n = t.updateTime ? de(t.updateTime) : de(e);
            n.isEqual(q$1.min()) && (
            // The Firestore Emulator currently returns an update time of 0 for
            // deletes of non-existing documents (rather than null). This breaks the
            // test "get deleted doc while offline with source=cache" as NoDocuments
            // with version 0 are filtered by IndexedDb's RemoteDocumentCache.
            // TODO(#2149): Remove this when Emulator is fixed
            n = de(e));
            let s = null;
            return t.transformResults && t.transformResults.length > 0 && (s = t.transformResults), 
            new rn(n, s);
        }(t, e))) : [];
    }

    function Se(t, e) {
        return {
            documents: [ me(t, e.path) ]
        };
    }

    function De(t, e) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const n = {
            structuredQuery: {}
        }, s = e.path;
        null !== e.collectionGroup ? (n.parent = me(t, s), n.structuredQuery.from = [ {
            collectionId: e.collectionGroup,
            allDescendants: !0
        } ]) : (n.parent = me(t, s.M()), n.structuredQuery.from = [ {
            collectionId: s.k()
        } ]);
        const i = function(t) {
            if (0 === t.length) return;
            const e = t.map(t => 
            // visible for testing
            function(t) {
                if ("==" /* EQUAL */ === t.op) {
                    if (se(t.value)) return {
                        unaryFilter: {
                            field: $e(t.field),
                            op: "IS_NAN"
                        }
                    };
                    if (ne(t.value)) return {
                        unaryFilter: {
                            field: $e(t.field),
                            op: "IS_NULL"
                        }
                    };
                } else if ("!=" /* NOT_EQUAL */ === t.op) {
                    if (se(t.value)) return {
                        unaryFilter: {
                            field: $e(t.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (ne(t.value)) return {
                        unaryFilter: {
                            field: $e(t.field),
                            op: "IS_NOT_NULL"
                        }
                    };
                }
                return {
                    fieldFilter: {
                        field: $e(t.field),
                        op: Me(t.op),
                        value: t.value
                    }
                };
            }(t));
            if (1 === e.length) return e[0];
            return {
                compositeFilter: {
                    op: "AND",
                    filters: e
                }
            };
        }(e.filters);
        i && (n.structuredQuery.where = i);
        const r = function(t) {
            if (0 === t.length) return;
            return t.map(t => 
            // visible for testing
            function(t) {
                return {
                    field: $e(t.field),
                    direction: Fe(t.dir)
                };
            }(t));
        }(e.orderBy);
        r && (n.structuredQuery.orderBy = r);
        const o = function(t, e) {
            return t.Ye || z(e) ? e : {
                value: e
            };
        }
        /**
     * Returns a number (or null) from a google.protobuf.Int32Value proto.
     */ (t, e.limit);
        return null !== o && (n.structuredQuery.limit = o), e.startAt && (n.structuredQuery.startAt = xe(e.startAt)), 
        e.endAt && (n.structuredQuery.endAt = xe(e.endAt)), n;
    }

    function Ce(t) {
        let e = Ae(t.parent);
        const n = t.structuredQuery, s = n.from ? n.from.length : 0;
        let i = null;
        if (s > 0) {
            v$1(1 === s);
            const t = n.from[0];
            t.allDescendants ? i = t.collectionId : e = e.child(t.collectionId);
        }
        let r = [];
        n.where && (r = function t(e) {
            return e ? void 0 !== e.unaryFilter ? [ qe(e) ] : void 0 !== e.fieldFilter ? [ Le(e) ] : void 0 !== e.compositeFilter ? e.compositeFilter.filters.map(e => t(e)).reduce((t, e) => t.concat(e)) : b() : [];
        }(n.where));
        let o = [];
        n.orderBy && (o = n.orderBy.map(t => function(t) {
            return new is(ke(t.field), 
            // visible for testing
            function(t) {
                switch (t) {
                  case "ASCENDING":
                    return "asc" /* ASCENDING */;

                  case "DESCENDING":
                    return "desc" /* DESCENDING */;

                  default:
                    return;
                }
            }
            // visible for testing
            (t.direction));
        }(t)));
        let c = null;
        n.limit && (c = function(t) {
            let e;
            return e = "object" == typeof t ? t.value : t, z(e) ? null : e;
        }(n.limit));
        let a = null;
        n.startAt && (a = Oe(n.startAt));
        let u = null;
        return n.endAt && (u = Oe(n.endAt)), kn(Dn(e, i, o, r, c, "F" /* First */ , a, u));
    }

    function Ne(t, e) {
        const n = function(t, e) {
            switch (e) {
              case 0 /* Listen */ :
                return null;

              case 1 /* ExistenceFilterMismatch */ :
                return "existence-filter-mismatch";

              case 2 /* LimboResolution */ :
                return "limbo-document";

              default:
                return b();
            }
        }(0, e.ut);
        return null == n ? null : {
            "goog-listen-tags": n
        };
    }

    function xe(t) {
        return {
            before: t.before,
            values: t.position
        };
    }

    function Oe(t) {
        const e = !!t.before, n = t.values || [];
        return new ts(n, e);
    }

    // visible for testing
    function Fe(t) {
        return re[t];
    }

    function Me(t) {
        return oe[t];
    }

    function $e(t) {
        return {
            fieldPath: t.K()
        };
    }

    function ke(t) {
        return Q$1.Y(t.fieldPath);
    }

    function Le(t) {
        return Qn.create(ke(t.fieldFilter.field), function(t) {
            switch (t) {
              case "EQUAL":
                return "==" /* EQUAL */;

              case "NOT_EQUAL":
                return "!=" /* NOT_EQUAL */;

              case "GREATER_THAN":
                return ">" /* GREATER_THAN */;

              case "GREATER_THAN_OR_EQUAL":
                return ">=" /* GREATER_THAN_OR_EQUAL */;

              case "LESS_THAN":
                return "<" /* LESS_THAN */;

              case "LESS_THAN_OR_EQUAL":
                return "<=" /* LESS_THAN_OR_EQUAL */;

              case "ARRAY_CONTAINS":
                return "array-contains" /* ARRAY_CONTAINS */;

              case "IN":
                return "in" /* IN */;

              case "NOT_IN":
                return "not-in" /* NOT_IN */;

              case "ARRAY_CONTAINS_ANY":
                return "array-contains-any" /* ARRAY_CONTAINS_ANY */;

              case "OPERATOR_UNSPECIFIED":
              default:
                return b();
            }
        }(t.fieldFilter.op), t.fieldFilter.value);
    }

    function qe(t) {
        switch (t.unaryFilter.op) {
          case "IS_NAN":
            const e = ke(t.unaryFilter.field);
            return Qn.create(e, "==" /* EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NULL":
            const n = ke(t.unaryFilter.field);
            return Qn.create(n, "==" /* EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "IS_NOT_NAN":
            const s = ke(t.unaryFilter.field);
            return Qn.create(s, "!=" /* NOT_EQUAL */ , {
                doubleValue: NaN
            });

          case "IS_NOT_NULL":
            const i = ke(t.unaryFilter.field);
            return Qn.create(i, "!=" /* NOT_EQUAL */ , {
                nullValue: "NULL_VALUE"
            });

          case "OPERATOR_UNSPECIFIED":
          default:
            return b();
        }
    }

    function Be(t) {
        const e = [];
        return t.fields.forEach(t => e.push(t.K())), {
            fieldPaths: e
        };
    }

    function Ue(t) {
        // Resource names have at least 4 components (project ID, database ID)
        return t.length >= 4 && "projects" === t.get(0) && "databases" === t.get(2);
    }

    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Represents a transform within a TransformMutation. */ class Ke {
        constructor() {
            // Make sure that the structural type of `TransformOperation` is unique.
            // See https://github.com/microsoft/TypeScript/issues/5451
            this.sn = void 0;
        }
    }

    /**
     * Computes the local transform result against the provided `previousValue`,
     * optionally using the provided localWriteTime.
     */ function Qe(t, e, n) {
        return t instanceof Ge ? function(t, e) {
            const n = {
                fields: {
                    __type__: {
                        stringValue: "server_timestamp"
                    },
                    __local_write_time__: {
                        timestampValue: {
                            seconds: t.seconds,
                            nanos: t.nanoseconds
                        }
                    }
                }
            };
            return e && (n.fields.__previous_value__ = e), {
                mapValue: n
            };
        }
        /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */ (n, e) : t instanceof ze ? He(t, e) : t instanceof Je ? Ye(t, e) : function(t, e) {
            // PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
            // precision and resolves overflows by reducing precision, we do not
            // manually cap overflows at 2^63.
            const n = je(t, e), s = Ze(n) + Ze(t.Ze);
            return te(n) && te(t.Ze) ? ae(s) : ue(t.serializer, s);
        }(t, e);
    }

    /**
     * Computes a final transform result after the transform has been acknowledged
     * by the server, potentially using the server-provided transformResult.
     */ function We(t, e, n) {
        // The server just sends null as the transform result for array operations,
        // so we have to calculate a result the same as we do for local
        // applications.
        return t instanceof ze ? He(t, e) : t instanceof Je ? Ye(t, e) : n;
    }

    /**
     * If this transform operation is not idempotent, returns the base value to
     * persist for this transform. If a base value is returned, the transform
     * operation is always applied to this base value, even if document has
     * already been updated.
     *
     * Base values provide consistent behavior for non-idempotent transforms and
     * allow us to return the same latency-compensated value even if the backend
     * has already applied the transform operation. The base value is null for
     * idempotent transforms, as they can be re-played even if the backend has
     * already applied them.
     *
     * @return a base value to store along with the mutation, or null for
     * idempotent transforms.
     */ function je(t, e) {
        return t instanceof Xe ? te(n = e) || function(t) {
            return !!t && "doubleValue" in t;
        }
        /** Returns true if `value` is either an IntegerValue or a DoubleValue. */ (n) ? e : {
            integerValue: 0
        } : null;
        var n;
    }

    /** Transforms a value into a server-generated timestamp. */
    class Ge extends Ke {}

    /** Transforms an array value via a union operation. */ class ze extends Ke {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    function He(t, e) {
        const n = tn(e);
        for (const e of t.elements) n.some(t => Qt(t, e)) || n.push(e);
        return {
            arrayValue: {
                values: n
            }
        };
    }

    /** Transforms an array value via a remove operation. */ class Je extends Ke {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    function Ye(t, e) {
        let n = tn(e);
        for (const e of t.elements) n = n.filter(t => !Qt(t, e));
        return {
            arrayValue: {
                values: n
            }
        };
    }

    /**
     * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
     * transforms. Converts all field values to integers or doubles, but unlike the
     * backend does not cap integer values at 2^63. Instead, JavaScript number
     * arithmetic is used and precision loss can occur for values greater than 2^53.
     */ class Xe extends Ke {
        constructor(t, e) {
            super(), this.serializer = t, this.Ze = e;
        }
    }

    function Ze(t) {
        return Yt(t.integerValue || t.doubleValue);
    }

    function tn(t) {
        return ee(t) && t.arrayValue.values ? t.arrayValue.values.slice() : [];
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides a set of fields that can be used to partially patch a document.
     * FieldMask is used in conjunction with ObjectValue.
     * Examples:
     *   foo - Overwrites foo entirely with the provided value. If foo is not
     *         present in the companion ObjectValue, the field is deleted.
     *   foo.bar - Overwrites only the field bar of the object foo.
     *             If foo is not an object, foo is replaced with an object
     *             containing foo
     */ class en {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(Q$1.N);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    rn(t) {
            for (const e of this.fields) if (e.q(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return $(this.fields, t.fields, (t, e) => t.isEqual(e));
        }
    }

    /** A field path and the TransformOperation to perform upon it. */ class nn {
        constructor(t, e) {
            this.field = t, this.transform = e;
        }
    }

    function sn(t, e) {
        return t.field.isEqual(e.field) && function(t, e) {
            return t instanceof ze && e instanceof ze || t instanceof Je && e instanceof Je ? $(t.elements, e.elements, Qt) : t instanceof Xe && e instanceof Xe ? Qt(t.Ze, e.Ze) : t instanceof Ge && e instanceof Ge;
        }(t.transform, e.transform);
    }

    /** The result of successfully applying a mutation to the backend. */ class rn {
        constructor(
        /**
         * The version at which the mutation was committed:
         *
         * - For most operations, this is the updateTime in the WriteResult.
         * - For deletes, the commitTime of the WriteResponse (because deletes are
         *   not stored and have no updateTime).
         *
         * Note that these versions can be different: No-op writes will not change
         * the updateTime even though the commitTime advances.
         */
        t, 
        /**
         * The resulting fields returned from the backend after a
         * TransformMutation has been committed. Contains one FieldValue for each
         * FieldTransform that was in the mutation.
         *
         * Will be null if the mutation was not a TransformMutation.
         */
        e) {
            this.version = t, this.transformResults = e;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class on {
        constructor(t, e) {
            this.updateTime = t, this.exists = e;
        }
        /** Creates a new empty Precondition. */    static nn() {
            return new on;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new on(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new on(t);
        }
        /** Returns whether this Precondition is empty. */    get tn() {
            return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(t) {
            return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
        }
    }

    /**
     * Returns true if the preconditions is valid for the given document
     * (or null if no document is available).
     */ function cn(t, e) {
        return void 0 !== t.updateTime ? e instanceof pn && e.version.isEqual(t.updateTime) : void 0 === t.exists || t.exists === e instanceof pn;
    }

    /**
     * A mutation describes a self-contained change to a document. Mutations can
     * create, replace, delete, and update subsets of documents.
     *
     * Mutations not only act on the value of the document but also its version.
     *
     * For local mutations (mutations that haven't been committed yet), we preserve
     * the existing version for Set, Patch, and Transform mutations. For Delete
     * mutations, we reset the version to 0.
     *
     * Here's the expected transition table.
     *
     * MUTATION           APPLIED TO            RESULTS IN
     *
     * SetMutation        Document(v3)          Document(v3)
     * SetMutation        NoDocument(v3)        Document(v0)
     * SetMutation        null                  Document(v0)
     * PatchMutation      Document(v3)          Document(v3)
     * PatchMutation      NoDocument(v3)        NoDocument(v3)
     * PatchMutation      null                  null
     * TransformMutation  Document(v3)          Document(v3)
     * TransformMutation  NoDocument(v3)        NoDocument(v3)
     * TransformMutation  null                  null
     * DeleteMutation     Document(v3)          NoDocument(v0)
     * DeleteMutation     NoDocument(v3)        NoDocument(v0)
     * DeleteMutation     null                  NoDocument(v0)
     *
     * For acknowledged mutations, we use the updateTime of the WriteResponse as
     * the resulting version for Set, Patch, and Transform mutations. As deletes
     * have no explicit update time, we use the commitTime of the WriteResponse for
     * Delete mutations.
     *
     * If a mutation is acknowledged by the backend but fails the precondition check
     * locally, we return an `UnknownDocument` and rely on Watch to send us the
     * updated version.
     *
     * Note that TransformMutations don't create Documents (in the case of being
     * applied to a NoDocument), even though they would on the backend. This is
     * because the client always combines the TransformMutation with a SetMutation
     * or PatchMutation and we only want to apply the transform if the prior
     * mutation resulted in a Document (always true for a SetMutation, but not
     * necessarily for a PatchMutation).
     *
     * ## Subclassing Notes
     *
     * Subclasses of Mutation need to implement applyToRemoteDocument() and
     * applyToLocalView() to implement the actual behavior of applying the mutation
     * to some source document.
     */ class an {}

    /**
     * Applies this mutation to the given MaybeDocument or null for the purposes
     * of computing a new remote document. If the input document doesn't match the
     * expected state (e.g. it is null or outdated), an `UnknownDocument` can be
     * returned.
     *
     * @param mutation The mutation to apply.
     * @param maybeDoc The document to mutate. The input document can be null if
     *     the client has no knowledge of the pre-mutation state of the document.
     * @param mutationResult The result of applying the mutation from the backend.
     * @return The mutated document. The returned document may be an
     *     UnknownDocument if the mutation could not be applied to the locally
     *     cached base document.
     */ function un(t, e, n) {
        return t instanceof dn ? function(t, e, n) {
            // Unlike applySetMutationToLocalView, if we're applying a mutation to a
            // remote document the server has accepted the mutation so the precondition
            // must have held.
            return new pn(t.key, n.version, t.value, {
                hasCommittedMutations: !0
            });
        }(t, 0, n) : t instanceof wn ? function(t, e, n) {
            if (!cn(t.en, e)) 
            // Since the mutation was not rejected, we know that the  precondition
            // matched on the backend. We therefore must not have the expected version
            // of the document in our cache and return an UnknownDocument with the
            // known updateTime.
            return new vn(t.key, n.version);
            const s = En(t, e);
            return new pn(t.key, n.version, s, {
                hasCommittedMutations: !0
            });
        }(t, e, n) : t instanceof Tn ? function(t, e, n) {
            if (v$1(null != n.transformResults), !cn(t.en, e)) 
            // Since the mutation was not rejected, we know that the  precondition
            // matched on the backend. We therefore must not have the expected version
            // of the document in our cache and return an UnknownDocument with the
            // known updateTime.
            return new vn(t.key, n.version);
            const s = In(t, e), i = 
            /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use after a
     * TransformMutation has been acknowledged by the server.
     *
     * @param fieldTransforms The field transforms to apply the result to.
     * @param baseDoc The document prior to applying this mutation batch.
     * @param serverTransformResults The transform results received by the server.
     * @return The transform results list.
     */
            function(t, e, n) {
                const s = [];
                v$1(t.length === n.length);
                for (let i = 0; i < n.length; i++) {
                    const r = t[i], o = r.transform;
                    let c = null;
                    e instanceof pn && (c = e.field(r.field)), s.push(We(o, c, n[i]));
                }
                return s;
            }
            /**
     * Creates a list of "transform results" (a transform result is a field value
     * representing the result of applying a transform) for use when applying a
     * TransformMutation locally.
     *
     * @param fieldTransforms The field transforms to apply the result to.
     * @param localWriteTime The local time of the transform mutation (used to
     *     generate ServerTimestampValues).
     * @param maybeDoc The current state of the document after applying all
     *     previous mutations.
     * @param baseDoc The document prior to applying this mutation batch.
     * @return The transform results list.
     */ (t.fieldTransforms, e, n.transformResults), r = n.version, o = mn(t, s.data(), i);
            return new pn(t.key, r, o, {
                hasCommittedMutations: !0
            });
        }(t, e, n) : function(t, e, n) {
            // Unlike applyToLocalView, if we're applying a mutation to a remote
            // document the server has accepted the mutation so the precondition must
            // have held.
            return new bn(t.key, n.version, {
                hasCommittedMutations: !0
            });
        }(t, 0, n);
    }

    /**
     * Applies this mutation to the given MaybeDocument or null for the purposes
     * of computing the new local view of a document. Both the input and returned
     * documents can be null.
     *
     * @param mutation The mutation to apply.
     * @param maybeDoc The document to mutate. The input document can be null if
     *     the client has no knowledge of the pre-mutation state of the document.
     * @param baseDoc The state of the document prior to this mutation batch. The
     *     input document can be null if the client has no knowledge of the
     *     pre-mutation state of the document.
     * @param localWriteTime A timestamp indicating the local write time of the
     *     batch this mutation is a part of.
     * @return The mutated document. The returned document may be null, but only
     *     if maybeDoc was null and the mutation would not create a new document.
     */ function hn(t, e, n, s) {
        return t instanceof dn ? function(t, e) {
            if (!cn(t.en, e)) return e;
            const n = fn(e);
            return new pn(t.key, n, t.value, {
                on: !0
            });
        }
        /**
     * A mutation that modifies fields of the document at the given key with the
     * given values. The values are applied through a field mask:
     *
     *  * When a field is in both the mask and the values, the corresponding field
     *    is updated.
     *  * When a field is in neither the mask nor the values, the corresponding
     *    field is unmodified.
     *  * When a field is in the mask but not in the values, the corresponding field
     *    is deleted.
     *  * When a field is not in the mask but is in the values, the values map is
     *    ignored.
     */ (t, e) : t instanceof wn ? function(t, e) {
            if (!cn(t.en, e)) return e;
            const n = fn(e), s = En(t, e);
            return new pn(t.key, n, s, {
                on: !0
            });
        }
        /**
     * Patches the data of document if available or creates a new document. Note
     * that this does not check whether or not the precondition of this patch
     * holds.
     */ (t, e) : t instanceof Tn ? function(t, e, n, s) {
            if (!cn(t.en, e)) return e;
            const i = In(t, e), r = function(t, e, n, s) {
                const i = [];
                for (const r of t) {
                    const t = r.transform;
                    let o = null;
                    n instanceof pn && (o = n.field(r.field)), null === o && s instanceof pn && (
                    // If the current document does not contain a value for the mutated
                    // field, use the value that existed before applying this mutation
                    // batch. This solves an edge case where a PatchMutation clears the
                    // values in a nested map before the TransformMutation is applied.
                    o = s.field(r.field)), i.push(Qe(t, o, e));
                }
                return i;
            }(t.fieldTransforms, n, e, s), o = mn(t, i.data(), r);
            return new pn(t.key, i.version, o, {
                on: !0
            });
        }(t, e, s, n) : function(t, e) {
            if (!cn(t.en, e)) return e;
            return new bn(t.key, q$1.min());
        }
        /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ (t, e);
    }

    /**
     * If this mutation is not idempotent, returns the base value to persist with
     * this mutation. If a base value is returned, the mutation is always applied
     * to this base value, even if document has already been updated.
     *
     * The base value is a sparse object that consists of only the document
     * fields for which this mutation contains a non-idempotent transformation
     * (e.g. a numeric increment). The provided value guarantees consistent
     * behavior for non-idempotent transforms and allow us to return the same
     * latency-compensated value even if the backend has already applied the
     * mutation. The base value is null for idempotent mutations, as they can be
     * re-played even if the backend has already applied them.
     *
     * @return a base value to store along with the mutation, or null for
     * idempotent mutations.
     */ function ln(t, e) {
        return t instanceof Tn ? function(t, e) {
            let n = null;
            for (const s of t.fieldTransforms) {
                const t = e instanceof pn ? e.field(s.field) : void 0, i = je(s.transform, t || null);
                null != i && (n = null == n ? (new gn).set(s.field, i) : n.set(s.field, i));
            }
            return n ? n.cn() : null;
        }
        /**
     * Asserts that the given MaybeDocument is actually a Document and verifies
     * that it matches the key for this mutation. Since we only support
     * transformations with precondition exists this method is guaranteed to be
     * safe.
     */ (t, e) : null;
    }

    function _n(t, e) {
        return t.type === e.type && (!!t.key.isEqual(e.key) && (!!t.en.isEqual(e.en) && (0 /* Set */ === t.type ? t.value.isEqual(e.value) : 1 /* Patch */ === t.type ? t.data.isEqual(e.data) && t.Xe.isEqual(e.Xe) : 2 /* Transform */ !== t.type || $(t.fieldTransforms, t.fieldTransforms, (t, e) => sn(t, e)))));
    }

    /**
     * Returns the version from the given document for use as the result of a
     * mutation. Mutations are defined to return the version of the base document
     * only if it is an existing document. Deleted and unknown documents have a
     * post-mutation version of SnapshotVersion.min().
     */ function fn(t) {
        return t instanceof pn ? t.version : q$1.min();
    }

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class dn extends an {
        constructor(t, e, n) {
            super(), this.key = t, this.value = e, this.en = n, this.type = 0 /* Set */;
        }
    }

    class wn extends an {
        constructor(t, e, n, s) {
            super(), this.key = t, this.data = e, this.Xe = n, this.en = s, this.type = 1 /* Patch */;
        }
    }

    function En(t, e) {
        let n;
        return n = e instanceof pn ? e.data() : Pn.empty(), function(t, e) {
            const n = new gn(e);
            return t.Xe.fields.forEach(e => {
                if (!e.L()) {
                    const s = t.data.field(e);
                    null !== s ? n.set(e, s) : n.delete(e);
                }
            }), n.cn();
        }
        /**
     * A mutation that modifies specific fields of the document with transform
     * operations. Currently the only supported transform is a server timestamp, but
     * IP Address, increment(n), etc. could be supported in the future.
     *
     * It is somewhat similar to a PatchMutation in that it patches specific fields
     * and has no effect when applied to a null or NoDocument (see comment on
     * Mutation for rationale).
     */ (t, n);
    }

    class Tn extends an {
        constructor(t, e) {
            super(), this.key = t, this.fieldTransforms = e, this.type = 2 /* Transform */ , 
            // NOTE: We set a precondition of exists: true as a safety-check, since we
            // always combine TransformMutations with a SetMutation or PatchMutation which
            // (if successful) should end up with an existing document.
            this.en = on.exists(!0);
        }
    }

    function In(t, e) {
        return e;
    }

    function mn(t, e, n) {
        const s = new gn(e);
        for (let e = 0; e < t.fieldTransforms.length; e++) {
            const i = t.fieldTransforms[e];
            s.set(i.field, n[e]);
        }
        return s.cn();
    }

    /** A mutation that deletes the document at the given key. */ class An extends an {
        constructor(t, e) {
            super(), this.key = t, this.en = e, this.type = 3 /* Delete */;
        }
    }

    class Rn extends an {
        constructor(t, e) {
            super(), this.key = t, this.en = e, this.type = 4 /* Verify */;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An ObjectValue represents a MapValue in the Firestore Proto and offers the
     * ability to add and remove fields (via the ObjectValueBuilder).
     */ class Pn {
        constructor(t) {
            this.proto = t;
        }
        static empty() {
            return new Pn({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path the path to search
         * @return The value at the path or if there it doesn't exist.
         */    field(t) {
            if (t.L()) return this.proto;
            {
                let e = this.proto;
                for (let n = 0; n < t.length - 1; ++n) {
                    if (!e.mapValue.fields) return null;
                    if (e = e.mapValue.fields[t.get(n)], !ie(e)) return null;
                }
                return e = (e.mapValue.fields || {})[t.k()], e || null;
            }
        }
        isEqual(t) {
            return Qt(this.proto, t.proto);
        }
    }

    /**
     * An ObjectValueBuilder provides APIs to set and delete fields from an
     * ObjectValue.
     */ class gn {
        /**
         * @param baseObject The object to mutate.
         */
        constructor(t = Pn.empty()) {
            this.an = t, 
            /** A map that contains the accumulated changes in this builder. */
            this.un = new Map;
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path The field path to set.
         * @param value The value to set.
         * @return The current Builder instance.
         */    set(t, e) {
            return this.hn(t, e), this;
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path The field path to remove.
         * @return The current Builder instance.
         */    delete(t) {
            return this.hn(t, null), this;
        }
        /**
         * Adds `value` to the overlay map at `path`. Creates nested map entries if
         * needed.
         */    hn(t, e) {
            let n = this.un;
            for (let e = 0; e < t.length - 1; ++e) {
                const s = t.get(e);
                let i = n.get(s);
                i instanceof Map ? 
                // Re-use a previously created map
                n = i : i && 10 /* ObjectValue */ === Kt(i) ? (
                // Convert the existing Protobuf MapValue into a map
                i = new Map(Object.entries(i.mapValue.fields || {})), n.set(s, i), n = i) : (
                // Create an empty map to represent the current nesting level
                i = new Map, n.set(s, i), n = i);
            }
            n.set(t.k(), e);
        }
        /** Returns an ObjectValue with all mutations applied. */    cn() {
            const t = this.ln(Q$1.j(), this.un);
            return null != t ? new Pn(t) : this.an;
        }
        /**
         * Applies any overlays from `currentOverlays` that exist at `currentPath`
         * and returns the merged data at `currentPath` (or null if there were no
         * changes).
         *
         * @param currentPath The path at the current nesting level. Can be set to
         * FieldValue.emptyPath() to represent the root.
         * @param currentOverlays The overlays at the current nesting level in the
         * same format as `overlayMap`.
         * @return The merged data at `currentPath` or null if no modifications
         * were applied.
         */    ln(t, e) {
            let n = !1;
            const s = this.an.field(t), i = ie(s) ? // If there is already data at the current path, base our
            Object.assign({}, s.mapValue.fields) : {};
            return e.forEach((e, s) => {
                if (e instanceof Map) {
                    const r = this.ln(t.child(s), e);
                    null != r && (i[s] = r, n = !0);
                } else null !== e ? (i[s] = e, n = !0) : i.hasOwnProperty(s) && (delete i[s], n = !0);
            }), n ? {
                mapValue: {
                    fields: i
                }
            } : null;
        }
    }

    /**
     * Returns a FieldMask built from all fields in a MapValue.
     */ function Vn(t) {
        const e = [];
        return kt(t.fields || {}, (t, n) => {
            const s = new Q$1([ t ]);
            if (ie(n)) {
                const t = Vn(n.mapValue).fields;
                if (0 === t.length) 
                // Preserve the empty map by adding it to the FieldMask.
                e.push(s); else 
                // For nested and non-empty ObjectValues, add the FieldPath of the
                // leaf nodes.
                for (const n of t) e.push(s.child(n));
            } else 
            // For nested and non-empty ObjectValues, add the FieldPath of the leaf
            // nodes.
            e.push(s);
        }), new en(e);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The result of a lookup for a given path may be an existing document or a
     * marker that this document does not exist at a given version.
     */ class yn {
        constructor(t, e) {
            this.key = t, this.version = e;
        }
    }

    /**
     * Represents a document in Firestore with a key, version, data and whether the
     * data has local mutations applied to it.
     */ class pn extends yn {
        constructor(t, e, n, s) {
            super(t, e), this._n = n, this.on = !!s.on, this.hasCommittedMutations = !!s.hasCommittedMutations;
        }
        field(t) {
            return this._n.field(t);
        }
        data() {
            return this._n;
        }
        fn() {
            return this._n.proto;
        }
        isEqual(t) {
            return t instanceof pn && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.on === t.on && this.hasCommittedMutations === t.hasCommittedMutations && this._n.isEqual(t._n);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${this._n.toString()}, {hasLocalMutations: ${this.on}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`;
        }
        get hasPendingWrites() {
            return this.on || this.hasCommittedMutations;
        }
    }

    /**
     * Compares the value for field `field` in the provided documents. Throws if
     * the field does not exist in both documents.
     */
    /**
     * A class representing a deleted document.
     * Version is set to 0 if we don't point to any specific time, otherwise it
     * denotes time we know it didn't exist at.
     */
    class bn extends yn {
        constructor(t, e, n) {
            super(t, e), this.hasCommittedMutations = !(!n || !n.hasCommittedMutations);
        }
        toString() {
            return `NoDocument(${this.key}, ${this.version})`;
        }
        get hasPendingWrites() {
            return this.hasCommittedMutations;
        }
        isEqual(t) {
            return t instanceof bn && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
        }
    }

    /**
     * A class representing an existing document whose data is unknown (e.g. a
     * document that was updated without a known base document).
     */ class vn extends yn {
        toString() {
            return `UnknownDocument(${this.key}, ${this.version})`;
        }
        get hasPendingWrites() {
            return !0;
        }
        isEqual(t) {
            return t instanceof vn && t.version.isEqual(this.version) && t.key.isEqual(this.key);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Query encapsulates all the query attributes we support in the SDK. It can
     * be run against the LocalStore, as well as be converted to a `Target` to
     * query the RemoteStore results.
     *
     * Visible for testing.
     */ class Sn {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, e = null, n = [], s = [], i = null, r = "F" /* First */ , o = null, c = null) {
            this.path = t, this.collectionGroup = e, this.dn = n, this.filters = s, this.limit = i, 
            this.wn = r, this.startAt = o, this.endAt = c, this.En = null, 
            // The corresponding `Target` of this `Query` instance.
            this.Tn = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query instance with the options provided. */ function Dn(t, e, n, s, i, r, o, c) {
        return new Sn(t, e, n, s, i, r, o, c);
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function Cn(t) {
        return new Sn(t);
    }

    /**
     * Helper to convert a collection group query into a collection query at a
     * specific path. This is used when executing collection group queries, since
     * we have to split the query into a set of collection queries at multiple
     * paths.
     */ function Nn(t) {
        return !z(t.limit) && "F" /* First */ === t.wn;
    }

    function xn(t) {
        return !z(t.limit) && "L" /* Last */ === t.wn;
    }

    function On(t) {
        return t.dn.length > 0 ? t.dn[0].field : null;
    }

    function Fn(t) {
        for (const e of t.filters) if (e.In()) return e.field;
        return null;
    }

    /**
     * Checks if any of the provided Operators are included in the query and
     * returns the first one that is, or null if none are.
     */
    /**
     * Returns whether the query matches a collection group rather than a specific
     * collection.
     */
    function Mn(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function $n(t) {
        const e = S$1(t);
        if (null === e.En) {
            e.En = [];
            const t = Fn(e), n = On(e);
            if (null !== t && null === n) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.H() || e.En.push(new is(t)), e.En.push(new is(Q$1.J(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const n of e.dn) e.En.push(n), n.field.H() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = e.dn.length > 0 ? e.dn[e.dn.length - 1].dir : "asc" /* ASCENDING */;
                    e.En.push(new is(Q$1.J(), t));
                }
            }
        }
        return e.En;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function kn(t) {
        const e = S$1(t);
        if (!e.Tn) if ("F" /* First */ === e.wn) e.Tn = X$1(e.path, e.collectionGroup, $n(e), e.filters, e.limit, e.startAt, e.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const n of $n(e)) {
                const e = "desc" /* DESCENDING */ === n.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new is(n.field, e));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const n = e.endAt ? new ts(e.endAt.position, !e.endAt.before) : null, s = e.startAt ? new ts(e.startAt.position, !e.startAt.before) : null;
            // Now return as a LimitType.First query.
            e.Tn = X$1(e.path, e.collectionGroup, t, e.filters, e.limit, n, s);
        }
        return e.Tn;
    }

    function Ln(t, e) {
        return et(kn(t), kn(e)) && t.wn === e.wn;
    }

    // TODO(b/29183165): This is used to get a unique string from a query to, for
    // example, use as a dictionary key, but the implementation is subject to
    // collisions. Make it collision-free.
    function qn(t) {
        return `${Z$1(kn(t))}|lt:${t.wn}`;
    }

    function Bn(t) {
        return `Query(target=${tt(kn(t))}; limitType=${t.wn})`;
    }

    /** Returns whether `doc` matches the constraints of `query`. */ function Un(t, e) {
        return function(t, e) {
            const n = e.key.path;
            return null !== t.collectionGroup ? e.key.tt(t.collectionGroup) && t.path.q(n) : W$1.et(t.path) ? t.path.isEqual(n) : t.path.B(n);
        }
        /**
     * A document must have a value for every ordering clause in order to show up
     * in the results.
     */ (t, e) && function(t, e) {
            for (const n of t.dn) 
            // order by key always matches
            if (!n.field.H() && null === e.field(n.field)) return !1;
            return !0;
        }(t, e) && function(t, e) {
            for (const n of t.filters) if (!n.matches(e)) return !1;
            return !0;
        }
        /** Makes sure a document is within the bounds, if provided. */ (t, e) && function(t, e) {
            if (t.startAt && !ns(t.startAt, $n(t), e)) return !1;
            if (t.endAt && ns(t.endAt, $n(t), e)) return !1;
            return !0;
        }
        /**
     * Returns a new comparator function that can be used to compare two documents
     * based on the Query's ordering constraint.
     */ (t, e);
    }

    function Kn(t) {
        return (e, n) => {
            let s = !1;
            for (const i of $n(t)) {
                const t = rs(i, e, n);
                if (0 !== t) return t;
                s = s || i.field.H();
            }
            return 0;
        };
    }

    class Qn extends class {} {
        constructor(t, e, n) {
            super(), this.field = t, this.op = e, this.value = n;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, e, n) {
            if (t.H()) return "in" /* IN */ === e || "not-in" /* NOT_IN */ === e ? this.mn(t, e, n) : new jn(t, e, n);
            if (ne(n)) {
                if ("==" /* EQUAL */ !== e && "!=" /* NOT_EQUAL */ !== e) throw new C$1(D$1.INVALID_ARGUMENT, "Invalid query. Null only supports '==' and '!=' comparisons.");
                return new Qn(t, e, n);
            }
            if (se(n)) {
                if ("==" /* EQUAL */ !== e && "!=" /* NOT_EQUAL */ !== e) throw new C$1(D$1.INVALID_ARGUMENT, "Invalid query. NaN only supports '==' and '!=' comparisons.");
                return new Qn(t, e, n);
            }
            return "array-contains" /* ARRAY_CONTAINS */ === e ? new Jn(t, n) : "in" /* IN */ === e ? new Yn(t, n) : "not-in" /* NOT_IN */ === e ? new Xn(t, n) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e ? new Zn(t, n) : new Qn(t, e, n);
        }
        static mn(t, e, n) {
            return "in" /* IN */ === e ? new Gn(t, n) : new zn(t, n);
        }
        matches(t) {
            const e = t.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== e && this.An(jt(e, this.value)) : null !== e && Kt(this.value) === Kt(e) && this.An(jt(e, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        An(t) {
            switch (this.op) {
              case "<" /* LESS_THAN */ :
                return t < 0;

              case "<=" /* LESS_THAN_OR_EQUAL */ :
                return t <= 0;

              case "==" /* EQUAL */ :
                return 0 === t;

              case "!=" /* NOT_EQUAL */ :
                return 0 !== t;

              case ">" /* GREATER_THAN */ :
                return t > 0;

              case ">=" /* GREATER_THAN_OR_EQUAL */ :
                return t >= 0;

              default:
                return b();
            }
        }
        In() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
        }
    }

    function Wn(t) {
        // TODO(b/29183165): Technically, this won't be unique if two values have
        // the same description, such as the int 3 and the string "3". So we should
        // add the types in here somehow, too.
        return t.field.K() + t.op.toString() + zt(t.value);
    }

    class jn extends Qn {
        constructor(t, e, n) {
            super(t, e, n), this.key = W$1.Z(n.referenceValue);
        }
        matches(t) {
            const e = W$1.N(t.key, this.key);
            return this.An(e);
        }
    }

    /** Filter that matches on key fields within an array. */ class Gn extends Qn {
        constructor(t, e) {
            super(t, "in" /* IN */ , e), this.keys = Hn("in" /* IN */ , e);
        }
        matches(t) {
            return this.keys.some(e => e.isEqual(t.key));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class zn extends Qn {
        constructor(t, e) {
            super(t, "not-in" /* NOT_IN */ , e), this.keys = Hn("not-in" /* NOT_IN */ , e);
        }
        matches(t) {
            return !this.keys.some(e => e.isEqual(t.key));
        }
    }

    function Hn(t, e) {
        var n;
        return ((null === (n = e.arrayValue) || void 0 === n ? void 0 : n.values) || []).map(t => W$1.Z(t.referenceValue));
    }

    /** A Filter that implements the array-contains operator. */ class Jn extends Qn {
        constructor(t, e) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , e);
        }
        matches(t) {
            const e = t.field(this.field);
            return ee(e) && Wt(e.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class Yn extends Qn {
        constructor(t, e) {
            super(t, "in" /* IN */ , e);
        }
        matches(t) {
            const e = t.field(this.field);
            return null !== e && Wt(this.value.arrayValue, e);
        }
    }

    /** A Filter that implements the not-in operator. */ class Xn extends Qn {
        constructor(t, e) {
            super(t, "not-in" /* NOT_IN */ , e);
        }
        matches(t) {
            if (Wt(this.value.arrayValue, {
                nullValue: "NULL_VALUE"
            })) return !1;
            const e = t.field(this.field);
            return null !== e && !Wt(this.value.arrayValue, e);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class Zn extends Qn {
        constructor(t, e) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , e);
        }
        matches(t) {
            const e = t.field(this.field);
            return !(!ee(e) || !e.arrayValue.values) && e.arrayValue.values.some(t => Wt(this.value.arrayValue, t));
        }
    }

    /**
     * Represents a bound of a query.
     *
     * The bound is specified with the given components representing a position and
     * whether it's just before or just after the position (relative to whatever the
     * query order is).
     *
     * The position represents a logical index position for a query. It's a prefix
     * of values for the (potentially implicit) order by clauses of a query.
     *
     * Bound provides a function to determine whether a document comes before or
     * after a bound. This is influenced by whether the position is just before or
     * just after the provided values.
     */ class ts {
        constructor(t, e) {
            this.position = t, this.before = e;
        }
    }

    function es(t) {
        // TODO(b/29183165): Make this collision robust.
        return `${t.before ? "b" : "a"}:${t.position.map(t => zt(t)).join(",")}`;
    }

    /**
     * Returns true if a document sorts before a bound using the provided sort
     * order.
     */ function ns(t, e, n) {
        let s = 0;
        for (let i = 0; i < t.position.length; i++) {
            const r = e[i], o = t.position[i];
            if (r.field.H()) s = W$1.N(W$1.Z(o.referenceValue), n.key); else {
                s = jt(o, n.field(r.field));
            }
            if ("desc" /* DESCENDING */ === r.dir && (s *= -1), 0 !== s) break;
        }
        return t.before ? s <= 0 : s < 0;
    }

    function ss(t, e) {
        if (null === t) return null === e;
        if (null === e) return !1;
        if (t.before !== e.before || t.position.length !== e.position.length) return !1;
        for (let n = 0; n < t.position.length; n++) {
            if (!Qt(t.position[n], e.position[n])) return !1;
        }
        return !0;
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class is {
        constructor(t, e = "asc" /* ASCENDING */) {
            this.field = t, this.dir = e;
        }
    }

    function rs(t, e, n) {
        const s = t.field.H() ? W$1.N(e.key, n.key) : function(t, e, n) {
            const s = e.field(t), i = n.field(t);
            return null !== s && null !== i ? jt(s, i) : b();
        }(t.field, e, n);
        switch (t.dir) {
          case "asc" /* ASCENDING */ :
            return s;

          case "desc" /* DESCENDING */ :
            return -1 * s;

          default:
            return b();
        }
    }

    function os(t, e) {
        return t.dir === e.dir && t.field.isEqual(e.field);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A batch of mutations that will be sent as one unit to the backend.
     */
    class cs {
        /**
         * @param batchId The unique ID of this mutation batch.
         * @param localWriteTime The original write time of this mutation.
         * @param baseMutations Mutations that are used to populate the base
         * values when this mutation is applied locally. This can be used to locally
         * overwrite values that are persisted in the remote document cache. Base
         * mutations are never sent to the backend.
         * @param mutations The user-provided mutations in this mutation batch.
         * User-provided mutations are applied both locally and remotely on the
         * backend.
         */
        constructor(t, e, n, s) {
            this.batchId = t, this.Rn = e, this.baseMutations = n, this.mutations = s;
        }
        /**
         * Applies all the mutations in this MutationBatch to the specified document
         * to create a new remote document
         *
         * @param docKey The key of the document to apply mutations to.
         * @param maybeDoc The document to apply mutations to.
         * @param batchResult The result of applying the MutationBatch to the
         * backend.
         */    Pn(t, e, n) {
            const s = n.gn;
            for (let n = 0; n < this.mutations.length; n++) {
                const i = this.mutations[n];
                if (i.key.isEqual(t)) {
                    e = un(i, e, s[n]);
                }
            }
            return e;
        }
        /**
         * Computes the local view of a document given all the mutations in this
         * batch.
         *
         * @param docKey The key of the document to apply mutations to.
         * @param maybeDoc The document to apply mutations to.
         */    Vn(t, e) {
            // First, apply the base state. This allows us to apply non-idempotent
            // transform against a consistent set of values.
            for (const n of this.baseMutations) n.key.isEqual(t) && (e = hn(n, e, e, this.Rn));
            const n = e;
            // Second, apply all user-provided mutations.
                    for (const s of this.mutations) s.key.isEqual(t) && (e = hn(s, e, n, this.Rn));
            return e;
        }
        /**
         * Computes the local view for all provided documents given the mutations in
         * this batch.
         */    yn(t) {
            // TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
            // directly (as done in `applyToLocalView()`), we can reduce the complexity
            // to O(n).
            let e = t;
            return this.mutations.forEach(n => {
                const s = this.Vn(n.key, t.get(n.key));
                s && (e = e.dt(n.key, s));
            }), e;
        }
        keys() {
            return this.mutations.reduce((t, e) => t.add(e.key), Pt());
        }
        isEqual(t) {
            return this.batchId === t.batchId && $(this.mutations, t.mutations, (t, e) => _n(t, e)) && $(this.baseMutations, t.baseMutations, (t, e) => _n(t, e));
        }
    }

    /** The result of applying a mutation batch to the backend. */ class as {
        constructor(t, e, n, 
        /**
         * A pre-computed mapping from each mutated document to the resulting
         * version.
         */
        s) {
            this.batch = t, this.pn = e, this.gn = n, this.bn = s;
        }
        /**
         * Creates a new MutationBatchResult for the given batch and results. There
         * must be one result for each mutation in the batch. This static factory
         * caches a document=>version mapping (docVersions).
         */    static from(t, e, n) {
            v$1(t.mutations.length === n.length);
            let s = At;
            const i = t.mutations;
            for (let t = 0; t < i.length; t++) s = s.dt(i[t].key, n[t].version);
            return new as(t, e, n, s);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A map implementation that uses objects as keys. Objects must have an
     * associated equals function and must be immutable. Entries in the map are
     * stored together with the key being produced from the mapKeyFn. This map
     * automatically handles collisions of keys.
     */ class us {
        constructor(t, e) {
            this.vn = t, this.Sn = e, 
            /**
             * The inner map for a key -> value pair. Due to the possibility of
             * collisions we keep a list of entries that we do a linear search through
             * to find an actual match. Note that collisions should be rare, so we still
             * expect near constant time lookups in practice.
             */
            this.Dn = {};
        }
        /** Get a value for this key, or undefined if it does not exist. */    get(t) {
            const e = this.vn(t), n = this.Dn[e];
            if (void 0 !== n) for (const [e, s] of n) if (this.Sn(e, t)) return s;
        }
        has(t) {
            return void 0 !== this.get(t);
        }
        /** Put this key and value in the map. */    set(t, e) {
            const n = this.vn(t), s = this.Dn[n];
            if (void 0 !== s) {
                for (let n = 0; n < s.length; n++) if (this.Sn(s[n][0], t)) return void (s[n] = [ t, e ]);
                s.push([ t, e ]);
            } else this.Dn[n] = [ [ t, e ] ];
        }
        /**
         * Remove this key from the map. Returns a boolean if anything was deleted.
         */    delete(t) {
            const e = this.vn(t), n = this.Dn[e];
            if (void 0 === n) return !1;
            for (let s = 0; s < n.length; s++) if (this.Sn(n[s][0], t)) return 1 === n.length ? delete this.Dn[e] : n.splice(s, 1), 
            !0;
            return !1;
        }
        forEach(t) {
            kt(this.Dn, (e, n) => {
                for (const [e, s] of n) t(e, s);
            });
        }
        L() {
            return Lt(this.Dn);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * PersistencePromise<> is essentially a re-implementation of Promise<> except
     * it has a .next() method instead of .then() and .next() and .catch() callbacks
     * are executed synchronously when a PersistencePromise resolves rather than
     * asynchronously (Promise<> implementations use setImmediate() or similar).
     *
     * This is necessary to interoperate with IndexedDB which will automatically
     * commit transactions if control is returned to the event loop without
     * synchronously initiating another operation on the transaction.
     *
     * NOTE: .then() and .catch() only allow a single consumer, unlike normal
     * Promises.
     */ class hs {
        constructor(t) {
            // NOTE: next/catchCallback will always point to our own wrapper functions,
            // not the user's raw next() or catch() callbacks.
            this.Cn = null, this.Nn = null, 
            // When the operation resolves, we'll set result or error and mark isDone.
            this.result = void 0, this.error = void 0, this.xn = !1, 
            // Set to true when .then() or .catch() are called and prevents additional
            // chaining.
            this.On = !1, t(t => {
                this.xn = !0, this.result = t, this.Cn && 
                // value should be defined unless T is Void, but we can't express
                // that in the type system.
                this.Cn(t);
            }, t => {
                this.xn = !0, this.error = t, this.Nn && this.Nn(t);
            });
        }
        catch(t) {
            return this.next(void 0, t);
        }
        next(t, e) {
            return this.On && b(), this.On = !0, this.xn ? this.error ? this.Fn(e, this.error) : this.Mn(t, this.result) : new hs((n, s) => {
                this.Cn = e => {
                    this.Mn(t, e).next(n, s);
                }, this.Nn = t => {
                    this.Fn(e, t).next(n, s);
                };
            });
        }
        $n() {
            return new Promise((t, e) => {
                this.next(t, e);
            });
        }
        kn(t) {
            try {
                const e = t();
                return e instanceof hs ? e : hs.resolve(e);
            } catch (t) {
                return hs.reject(t);
            }
        }
        Mn(t, e) {
            return t ? this.kn(() => t(e)) : hs.resolve(e);
        }
        Fn(t, e) {
            return t ? this.kn(() => t(e)) : hs.reject(e);
        }
        static resolve(t) {
            return new hs((e, n) => {
                e(t);
            });
        }
        static reject(t) {
            return new hs((e, n) => {
                n(t);
            });
        }
        static Ln(
        // Accept all Promise types in waitFor().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t) {
            return new hs((e, n) => {
                let s = 0, i = 0, r = !1;
                t.forEach(t => {
                    ++s, t.next(() => {
                        ++i, r && i === s && e();
                    }, t => n(t));
                }), r = !0, i === s && e();
            });
        }
        /**
         * Given an array of predicate functions that asynchronously evaluate to a
         * boolean, implements a short-circuiting `or` between the results. Predicates
         * will be evaluated until one of them returns `true`, then stop. The final
         * result will be whether any of them returned `true`.
         */    static qn(t) {
            let e = hs.resolve(!1);
            for (const n of t) e = e.next(t => t ? hs.resolve(t) : n());
            return e;
        }
        static forEach(t, e) {
            const n = [];
            return t.forEach((t, s) => {
                n.push(e.call(this, t, s));
            }), this.Ln(n);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory buffer of entries to be written to a RemoteDocumentCache.
     * It can be used to batch up a set of changes to be written to the cache, but
     * additionally supports reading entries back with the `getEntry()` method,
     * falling back to the underlying RemoteDocumentCache if no entry is
     * buffered.
     *
     * Entries added to the cache *must* be read first. This is to facilitate
     * calculating the size delta of the pending changes.
     *
     * PORTING NOTE: This class was implemented then removed from other platforms.
     * If byte-counting ends up being needed on the other platforms, consider
     * porting this class as part of that implementation work.
     */ class ls {
        constructor() {
            // A mapping of document key to the new cache entry that should be written (or null if any
            // existing cache entry should be removed).
            this.Bn = new us(t => t.toString(), (t, e) => t.isEqual(e)), this.Un = !1;
        }
        set readTime(t) {
            this.Kn = t;
        }
        get readTime() {
            return this.Kn;
        }
        /**
         * Buffers a `RemoteDocumentCache.addEntry()` call.
         *
         * You can only modify documents that have already been retrieved via
         * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
         */    Qn(t, e) {
            this.Wn(), this.readTime = e, this.Bn.set(t.key, t);
        }
        /**
         * Buffers a `RemoteDocumentCache.removeEntry()` call.
         *
         * You can only remove documents that have already been retrieved via
         * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
         */    jn(t, e) {
            this.Wn(), e && (this.readTime = e), this.Bn.set(t, null);
        }
        /**
         * Looks up an entry in the cache. The buffered changes will first be checked,
         * and if no buffered change applies, this will forward to
         * `RemoteDocumentCache.getEntry()`.
         *
         * @param transaction The transaction in which to perform any persistence
         *     operations.
         * @param documentKey The key of the entry to look up.
         * @return The cached Document or NoDocument entry, or null if we have nothing
         * cached.
         */    Gn(t, e) {
            this.Wn();
            const n = this.Bn.get(e);
            return void 0 !== n ? hs.resolve(n) : this.zn(t, e);
        }
        /**
         * Looks up several entries in the cache, forwarding to
         * `RemoteDocumentCache.getEntry()`.
         *
         * @param transaction The transaction in which to perform any persistence
         *     operations.
         * @param documentKeys The keys of the entries to look up.
         * @return A map of cached `Document`s or `NoDocument`s, indexed by key. If an
         *     entry cannot be found, the corresponding key will be mapped to a null
         *     value.
         */    getEntries(t, e) {
            return this.Hn(t, e);
        }
        /**
         * Applies buffered changes to the underlying RemoteDocumentCache, using
         * the provided transaction.
         */    apply(t) {
            return this.Wn(), this.Un = !0, this.Jn(t);
        }
        /** Helper to assert this.changes is not null  */    Wn() {}
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const _s = "The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";

    /**
     * A base class representing a persistence transaction, encapsulating both the
     * transaction's sequence numbers as well as a list of onCommitted listeners.
     *
     * When you call Persistence.runTransaction(), it will create a transaction and
     * pass it to your callback. You then pass it to any method that operates
     * on persistence.
     */ class fs {
        constructor() {
            this.Yn = [];
        }
        Xn(t) {
            this.Yn.push(t);
        }
        Zn() {
            this.Yn.forEach(t => t());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A readonly view of the local state of all documents we're tracking (i.e. we
     * have a cached version in remoteDocumentCache or local mutations for the
     * document). The view is computed by applying the mutations in the
     * MutationQueue to the RemoteDocumentCache.
     */ class ds {
        constructor(t, e, n) {
            this.ts = t, this.es = e, this.ns = n;
        }
        /**
         * Get the local view of the document identified by `key`.
         *
         * @return Local view of the document or null if we don't have any cached
         * state for it.
         */    ss(t, e) {
            return this.es.rs(t, e).next(n => this.os(t, e, n));
        }
        /** Internal version of `getDocument` that allows reusing batches. */    os(t, e, n) {
            return this.ts.Gn(t, e).next(t => {
                for (const s of n) t = s.Vn(e, t);
                return t;
            });
        }
        // Returns the view of the given `docs` as they would appear after applying
        // all mutations in the given `batches`.
        cs(t, e, n) {
            let s = Tt();
            return e.forEach((t, e) => {
                for (const s of n) e = s.Vn(t, e);
                s = s.dt(t, e);
            }), s;
        }
        /**
         * Gets the local view of the documents identified by `keys`.
         *
         * If we don't have cached state for a document in `keys`, a NoDocument will
         * be stored for that key in the resulting set.
         */    us(t, e) {
            return this.ts.getEntries(t, e).next(e => this.hs(t, e));
        }
        /**
         * Similar to `getDocuments`, but creates the local view from the given
         * `baseDocs` without retrieving documents from the local store.
         */    hs(t, e) {
            return this.es.ls(t, e).next(n => {
                const s = this.cs(t, e, n);
                let i = Et();
                return s.forEach((t, e) => {
                    // TODO(http://b/32275378): Don't conflate missing / deleted.
                    e || (e = new bn(t, q$1.min())), i = i.dt(t, e);
                }), i;
            });
        }
        /**
         * Performs a query against the local view of all documents.
         *
         * @param transaction The persistence transaction.
         * @param query The query to match documents against.
         * @param sinceReadTime If not set to SnapshotVersion.min(), return only
         *     documents that have been read since this snapshot version (exclusive).
         */    _s(t, e, n) {
            /**
     * Returns whether the query matches a single document by path (rather than a
     * collection).
     */
            return function(t) {
                return W$1.et(t.path) && null === t.collectionGroup && 0 === t.filters.length;
            }(e) ? this.fs(t, e.path) : Mn(e) ? this.ds(t, e, n) : this.ws(t, e, n);
        }
        fs(t, e) {
            // Just do a simple document lookup.
            return this.ss(t, new W$1(e)).next(t => {
                let e = mt();
                return t instanceof pn && (e = e.dt(t.key, t)), e;
            });
        }
        ds(t, e, n) {
            const s = e.collectionGroup;
            let i = mt();
            return this.ns.Es(t, s).next(r => hs.forEach(r, r => {
                const o = function(t, e) {
                    return new Sn(e, 
                    /*collectionGroup=*/ null, t.dn.slice(), t.filters.slice(), t.limit, t.wn, t.startAt, t.endAt);
                }
                /**
     * Returns true if this query does not specify any query constraints that
     * could remove results.
     */ (e, r.child(s));
                return this.ws(t, o, n).next(t => {
                    t.forEach((t, e) => {
                        i = i.dt(t, e);
                    });
                });
            }).next(() => i));
        }
        ws(t, e, n) {
            // Query the remote documents and overlay mutations.
            let s, i;
            return this.ts._s(t, e, n).next(n => (s = n, this.es.Ts(t, e))).next(e => (i = e, 
            this.Is(t, i, s).next(t => {
                s = t;
                for (const t of i) for (const e of t.mutations) {
                    const n = e.key, i = s.get(n), r = hn(e, i, i, t.Rn);
                    s = r instanceof pn ? s.dt(n, r) : s.remove(n);
                }
            }))).next(() => (
            // Finally, filter out any documents that don't actually match
            // the query.
            s.forEach((t, n) => {
                Un(e, n) || (s = s.remove(t));
            }), s));
        }
        Is(t, e, n) {
            let s = Pt();
            for (const t of e) for (const e of t.mutations) e instanceof wn && null === n.get(e.key) && (s = s.add(e.key));
            let i = n;
            return this.ts.getEntries(t, s).next(t => (t.forEach((t, e) => {
                null !== e && e instanceof pn && (i = i.dt(t, e));
            }), i));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A set of changes to what documents are currently in view and out of view for
     * a given query. These changes are sent to the LocalStore by the View (via
     * the SyncEngine) and are used to pin / unpin documents as appropriate.
     */ class ws {
        constructor(t, e, n, s) {
            this.targetId = t, this.fromCache = e, this.As = n, this.Rs = s;
        }
        static Ps(t, e) {
            let n = Pt(), s = Pt();
            for (const t of e.docChanges) switch (t.type) {
              case 0 /* Added */ :
                n = n.add(t.doc.key);
                break;

              case 1 /* Removed */ :
                s = s.add(t.doc.key);
     // do nothing
                    }
            return new ws(t, e.fromCache, n, s);
        }
    }

    /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
     * exceed. All subsequent calls to next will return increasing values. If provided with a
     * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
     * well as write out sequence numbers that it produces via `next()`.
     */ class Es {
        constructor(t, e) {
            this.previousValue = t, e && (e.gs = t => this.Vs(t), this.ys = t => e.ps(t));
        }
        Vs(t) {
            return this.previousValue = Math.max(t, this.previousValue), this.previousValue;
        }
        next() {
            const t = ++this.previousValue;
            return this.ys && this.ys(t), t;
        }
    }

    Es.bs = -1;

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Ts {
        constructor() {
            this.promise = new Promise((t, e) => {
                this.resolve = t, this.reject = e;
            });
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A helper for running delayed tasks following an exponential backoff curve
     * between attempts.
     *
     * Each delay is made up of a "base" delay which follows the exponential
     * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
     * base delay. This prevents clients from accidentally synchronizing their
     * delays causing spikes of load to the backend.
     */
    class Is {
        constructor(
        /**
         * The AsyncQueue to run backoff operations on.
         */
        t, 
        /**
         * The ID to use when scheduling backoff operations on the AsyncQueue.
         */
        e, 
        /**
         * The initial delay (used as the base delay on the first retry attempt).
         * Note that jitter will still be applied, so the actual delay could be as
         * little as 0.5*initialDelayMs.
         */
        n = 1e3
        /**
         * The multiplier to use to determine the extended base delay after each
         * attempt.
         */ , s = 1.5
        /**
         * The maximum base delay after which no further backoff is performed.
         * Note that jitter will still be applied, so the actual delay could be as
         * much as 1.5*maxDelayMs.
         */ , i = 6e4) {
            this.vs = t, this.Ss = e, this.Ds = n, this.Cs = s, this.Ns = i, this.xs = 0, this.Os = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.Fs = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.xs = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    Ms() {
            this.xs = this.Ns;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    $s(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const e = Math.floor(this.xs + this.ks()), n = Math.max(0, Date.now() - this.Fs), s = Math.max(0, e - n);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    s > 0 && g$1("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.xs} ms, delay with jitter: ${e} ms, last attempt: ${n} ms ago)`), 
            this.Os = this.vs.Ls(this.Ss, s, () => (this.Fs = Date.now(), t())), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.xs *= this.Cs, this.xs < this.Ds && (this.xs = this.Ds), this.xs > this.Ns && (this.xs = this.Ns);
        }
        qs() {
            null !== this.Os && (this.Os.Bs(), this.Os = null);
        }
        cancel() {
            null !== this.Os && (this.Os.cancel(), this.Os = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    ks() {
            return (Math.random() - .5) * this.xs;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // References to `window` are guarded by SimpleDb.isAvailable()
    /* eslint-disable no-restricted-globals */
    /**
     * Provides a wrapper around IndexedDb with a simplified interface that uses
     * Promise-like return values to chain operations. Real promises cannot be used
     * since .then() continuations are executed asynchronously (e.g. via
     * .setImmediate), which would cause IndexedDB to end the transaction.
     * See PersistencePromise for more details.
     */
    class ms {
        /*
         * Creates a new SimpleDb wrapper for IndexedDb database `name`.
         *
         * Note that `version` must not be a downgrade. IndexedDB does not support
         * downgrading the schema version. We currently do not support any way to do
         * versioning outside of IndexedDB's versioning mechanism, as only
         * version-upgrade transactions are allowed to do things like create
         * objectstores.
         */
        constructor(t, e, n) {
            this.name = t, this.version = e, this.Us = n;
            // NOTE: According to https://bugs.webkit.org/show_bug.cgi?id=197050, the
            // bug we're checking for should exist in iOS >= 12.2 and < 13, but for
            // whatever reason it's much harder to hit after 12.2 so we only proactively
            // log on 12.2.
            12.2 === ms.Ks(getUA()) && V$1("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.");
        }
        /** Deletes the specified database. */    static delete(t) {
            return g$1("SimpleDb", "Removing database:", t), ys(window.indexedDB.deleteDatabase(t)).$n();
        }
        /** Returns true if IndexedDB is available in the current environment. */    static Qs() {
            if ("undefined" == typeof indexedDB) return !1;
            if (ms.Ws()) return !0;
            // We extensively use indexed array values and compound keys,
            // which IE and Edge do not support. However, they still have indexedDB
            // defined on the window, so we need to check for them here and make sure
            // to return that persistence is not enabled for those browsers.
            // For tracking support of this feature, see here:
            // https://developer.microsoft.com/en-us/microsoft-edge/platform/status/indexeddbarraysandmultientrysupport/
            // Check the UA string to find out the browser.
                    const t = getUA(), e = ms.Ks(t), n = 0 < e && e < 10, s = ms.js(t), i = 0 < s && s < 4.5;
            // IE 10
            // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
            // IE 11
            // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
            // Edge
            // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML,
            // like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
            // iOS Safari: Disable for users running iOS version < 10.
                    return !(t.indexOf("MSIE ") > 0 || t.indexOf("Trident/") > 0 || t.indexOf("Edge/") > 0 || n || i);
        }
        /**
         * Returns true if the backing IndexedDB store is the Node IndexedDBShim
         * (see https://github.com/axemclion/IndexedDBShim).
         */    static Ws() {
            var t;
            return "undefined" != typeof process && "YES" === (null === (t = process.env) || void 0 === t ? void 0 : t.Gs);
        }
        /** Helper to get a typed SimpleDbStore from a transaction. */    static zs(t, e) {
            return t.store(e);
        }
        // visible for testing
        /** Parse User Agent to determine iOS version. Returns -1 if not found. */
        static Ks(t) {
            const e = t.match(/i(?:phone|pad|pod) os ([\d_]+)/i), n = e ? e[1].split("_").slice(0, 2).join(".") : "-1";
            return Number(n);
        }
        // visible for testing
        /** Parse User Agent to determine Android version. Returns -1 if not found. */
        static js(t) {
            const e = t.match(/Android ([\d.]+)/i), n = e ? e[1].split(".").slice(0, 2).join(".") : "-1";
            return Number(n);
        }
        /**
         * Opens the specified database, creating or upgrading it if necessary.
         */    async Hs() {
            return this.db || (g$1("SimpleDb", "Opening database:", this.name), this.db = await new Promise((t, e) => {
                // TODO(mikelehen): Investigate browser compatibility.
                // https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB
                // suggests IE9 and older WebKit browsers handle upgrade
                // differently. They expect setVersion, as described here:
                // https://developer.mozilla.org/en-US/docs/Web/API/IDBVersionChangeRequest/setVersion
                const n = indexedDB.open(this.name, this.version);
                n.onsuccess = e => {
                    const n = e.target.result;
                    t(n);
                }, n.onblocked = () => {
                    e(new Rs("Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."));
                }, n.onerror = t => {
                    const n = t.target.error;
                    "VersionError" === n.name ? e(new C$1(D$1.FAILED_PRECONDITION, "A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")) : e(new Rs(n));
                }, n.onupgradeneeded = t => {
                    g$1("SimpleDb", 'Database "' + this.name + '" requires upgrade from version:', t.oldVersion);
                    const e = t.target.result;
                    this.Us.createOrUpgrade(e, n.transaction, t.oldVersion, this.version).next(() => {
                        g$1("SimpleDb", "Database upgrade to version " + this.version + " complete");
                    });
                };
            })), this.Js && (this.db.onversionchange = t => this.Js(t)), this.db;
        }
        Ys(t) {
            this.Js = t, this.db && (this.db.onversionchange = e => t(e));
        }
        async runTransaction(t, e, n) {
            const s = "readonly" === t;
            let i = 0;
            for (;;) {
                ++i;
                try {
                    this.db = await this.Hs();
                    const t = gs.open(this.db, s ? "readonly" : "readwrite", e), i = n(t).catch(e => (
                    // Abort the transaction if there was an error.
                    t.abort(e), hs.reject(e))).$n();
                    // As noted above, errors are propagated by aborting the transaction. So
                    // we swallow any error here to avoid the browser logging it as unhandled.
                    return i.catch(() => {}), 
                    // Wait for the transaction to complete (i.e. IndexedDb's onsuccess event to
                    // fire), but still return the original transactionFnResult back to the
                    // caller.
                    await t.Xs, i;
                } catch (t) {
                    // TODO(schmidt-sebastian): We could probably be smarter about this and
                    // not retry exceptions that are likely unrecoverable (such as quota
                    // exceeded errors).
                    // Note: We cannot use an instanceof check for FirestoreException, since the
                    // exception is wrapped in a generic error by our async/await handling.
                    const e = "FirebaseError" !== t.name && i < 3;
                    if (g$1("SimpleDb", "Transaction failed with error:", t.message, "Retrying:", e), 
                    this.close(), !e) return Promise.reject(t);
                }
            }
        }
        close() {
            this.db && this.db.close(), this.db = void 0;
        }
    }

    /**
     * A controller for iterating over a key range or index. It allows an iterate
     * callback to delete the currently-referenced object, or jump to a new key
     * within the key range or index.
     */ class As {
        constructor(t) {
            this.Zs = t, this.ti = !1, this.ei = null;
        }
        get xn() {
            return this.ti;
        }
        get ni() {
            return this.ei;
        }
        set cursor(t) {
            this.Zs = t;
        }
        /**
         * This function can be called to stop iteration at any point.
         */    done() {
            this.ti = !0;
        }
        /**
         * This function can be called to skip to that next key, which could be
         * an index or a primary key.
         */    si(t) {
            this.ei = t;
        }
        /**
         * Delete the current cursor value from the object store.
         *
         * NOTE: You CANNOT do this with a keysOnly query.
         */    delete() {
            return ys(this.Zs.delete());
        }
    }

    /** An error that wraps exceptions that thrown during IndexedDB execution. */ class Rs extends C$1 {
        constructor(t) {
            super(D$1.UNAVAILABLE, "IndexedDB transaction failed: " + t), this.name = "IndexedDbTransactionError";
        }
    }

    /** Verifies whether `e` is an IndexedDbTransactionError. */ function Ps(t) {
        // Use name equality, as instanceof checks on errors don't work with errors
        // that wrap other errors.
        return "IndexedDbTransactionError" === t.name;
    }

    /**
     * Wraps an IDBTransaction and exposes a store() method to get a handle to a
     * specific object store.
     */ class gs {
        constructor(t) {
            this.transaction = t, this.aborted = !1, 
            /**
             * A promise that resolves with the result of the IndexedDb transaction.
             */
            this.ii = new Ts, this.transaction.oncomplete = () => {
                this.ii.resolve();
            }, this.transaction.onabort = () => {
                t.error ? this.ii.reject(new Rs(t.error)) : this.ii.resolve();
            }, this.transaction.onerror = t => {
                const e = bs(t.target.error);
                this.ii.reject(new Rs(e));
            };
        }
        static open(t, e, n) {
            try {
                return new gs(t.transaction(n, e));
            } catch (t) {
                throw new Rs(t);
            }
        }
        get Xs() {
            return this.ii.promise;
        }
        abort(t) {
            t && this.ii.reject(t), this.aborted || (g$1("SimpleDb", "Aborting transaction:", t ? t.message : "Client-initiated abort"), 
            this.aborted = !0, this.transaction.abort());
        }
        /**
         * Returns a SimpleDbStore<KeyType, ValueType> for the specified store. All
         * operations performed on the SimpleDbStore happen within the context of this
         * transaction and it cannot be used anymore once the transaction is
         * completed.
         *
         * Note that we can't actually enforce that the KeyType and ValueType are
         * correct, but they allow type safety through the rest of the consuming code.
         */    store(t) {
            const e = this.transaction.objectStore(t);
            return new Vs(e);
        }
    }

    /**
     * A wrapper around an IDBObjectStore providing an API that:
     *
     * 1) Has generic KeyType / ValueType parameters to provide strongly-typed
     * methods for acting against the object store.
     * 2) Deals with IndexedDB's onsuccess / onerror event callbacks, making every
     * method return a PersistencePromise instead.
     * 3) Provides a higher-level API to avoid needing to do excessive wrapping of
     * intermediate IndexedDB types (IDBCursorWithValue, etc.)
     */ class Vs {
        constructor(t) {
            this.store = t;
        }
        put(t, e) {
            let n;
            return void 0 !== e ? (g$1("SimpleDb", "PUT", this.store.name, t, e), n = this.store.put(e, t)) : (g$1("SimpleDb", "PUT", this.store.name, "<auto-key>", t), 
            n = this.store.put(t)), ys(n);
        }
        /**
         * Adds a new value into an Object Store and returns the new key. Similar to
         * IndexedDb's `add()`, this method will fail on primary key collisions.
         *
         * @param value The object to write.
         * @return The key of the value to add.
         */    add(t) {
            g$1("SimpleDb", "ADD", this.store.name, t, t);
            return ys(this.store.add(t));
        }
        /**
         * Gets the object with the specified key from the specified store, or null
         * if no object exists with the specified key.
         *
         * @key The key of the object to get.
         * @return The object with the specified key or null if no object exists.
         */    get(t) {
            // We're doing an unsafe cast to ValueType.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return ys(this.store.get(t)).next(e => (
            // Normalize nonexistence to null.
            void 0 === e && (e = null), g$1("SimpleDb", "GET", this.store.name, t, e), e));
        }
        delete(t) {
            g$1("SimpleDb", "DELETE", this.store.name, t);
            return ys(this.store.delete(t));
        }
        /**
         * If we ever need more of the count variants, we can add overloads. For now,
         * all we need is to count everything in a store.
         *
         * Returns the number of rows in the store.
         */    count() {
            g$1("SimpleDb", "COUNT", this.store.name);
            return ys(this.store.count());
        }
        ri(t, e) {
            const n = this.cursor(this.options(t, e)), s = [];
            return this.oi(n, (t, e) => {
                s.push(e);
            }).next(() => s);
        }
        ci(t, e) {
            g$1("SimpleDb", "DELETE ALL", this.store.name);
            const n = this.options(t, e);
            n.ai = !1;
            const s = this.cursor(n);
            return this.oi(s, (t, e, n) => n.delete());
        }
        ui(t, e) {
            let n;
            e ? n = t : (n = {}, e = t);
            const s = this.cursor(n);
            return this.oi(s, e);
        }
        /**
         * Iterates over a store, but waits for the given callback to complete for
         * each entry before iterating the next entry. This allows the callback to do
         * asynchronous work to determine if this iteration should continue.
         *
         * The provided callback should return `true` to continue iteration, and
         * `false` otherwise.
         */    hi(t) {
            const e = this.cursor({});
            return new hs((n, s) => {
                e.onerror = t => {
                    const e = bs(t.target.error);
                    s(e);
                }, e.onsuccess = e => {
                    const s = e.target.result;
                    s ? t(s.primaryKey, s.value).next(t => {
                        t ? s.continue() : n();
                    }) : n();
                };
            });
        }
        oi(t, e) {
            const n = [];
            return new hs((s, i) => {
                t.onerror = t => {
                    i(t.target.error);
                }, t.onsuccess = t => {
                    const i = t.target.result;
                    if (!i) return void s();
                    const r = new As(i), o = e(i.primaryKey, i.value, r);
                    if (o instanceof hs) {
                        const t = o.catch(t => (r.done(), hs.reject(t)));
                        n.push(t);
                    }
                    r.xn ? s() : null === r.ni ? i.continue() : i.continue(r.ni);
                };
            }).next(() => hs.Ln(n));
        }
        options(t, e) {
            let n = void 0;
            return void 0 !== t && ("string" == typeof t ? n = t : e = t), {
                index: n,
                range: e
            };
        }
        cursor(t) {
            let e = "next";
            if (t.reverse && (e = "prev"), t.index) {
                const n = this.store.index(t.index);
                return t.ai ? n.openKeyCursor(t.range, e) : n.openCursor(t.range, e);
            }
            return this.store.openCursor(t.range, e);
        }
    }

    /**
     * Wraps an IDBRequest in a PersistencePromise, using the onsuccess / onerror
     * handlers to resolve / reject the PersistencePromise as appropriate.
     */ function ys(t) {
        return new hs((e, n) => {
            t.onsuccess = t => {
                const n = t.target.result;
                e(n);
            }, t.onerror = t => {
                const e = bs(t.target.error);
                n(e);
            };
        });
    }

    // Guard so we only report the error once.
    let ps = !1;

    function bs(t) {
        const e = ms.Ks(getUA());
        if (e >= 12.2 && e < 13) {
            const e = "An internal error was encountered in the Indexed Database server";
            if (t.message.indexOf(e) >= 0) {
                // Wrap error in a more descriptive one.
                const t = new C$1("internal", `IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${e}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);
                return ps || (ps = !0, 
                // Throw a global exception outside of this promise chain, for the user to
                // potentially catch.
                setTimeout(() => {
                    throw t;
                }, 0)), t;
            }
        }
        return t;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** The Platform's 'window' implementation or null if not available. */ function vs() {
        // `window` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof window ? window : null;
    }

    /** The Platform's 'document' implementation or null if not available. */ function Ss() {
        // `document` is not always available, e.g. in ReactNative and WebWorkers.
        // eslint-disable-next-line no-restricted-globals
        return "undefined" != typeof document ? document : null;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Represents an operation scheduled to be run in the future on an AsyncQueue.
     *
     * It is created via DelayedOperation.createAndSchedule().
     *
     * Supports cancellation (via cancel()) and early execution (via skipDelay()).
     *
     * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
     * in newer versions of TypeScript defines `finally`, which is not available in
     * IE.
     */
    class Ds {
        constructor(t, e, n, s, i) {
            this.li = t, this.Ss = e, this._i = n, this.op = s, this.fi = i, this.di = new Ts, 
            this.then = this.di.promise.then.bind(this.di.promise), 
            // It's normal for the deferred promise to be canceled (due to cancellation)
            // and so we attach a dummy catch callback to avoid
            // 'UnhandledPromiseRejectionWarning' log spam.
            this.di.promise.catch(t => {});
        }
        /**
         * Creates and returns a DelayedOperation that has been scheduled to be
         * executed on the provided asyncQueue after the provided delayMs.
         *
         * @param asyncQueue The queue to schedule the operation on.
         * @param id A Timer ID identifying the type of operation this is.
         * @param delayMs The delay (ms) before the operation should be scheduled.
         * @param op The operation to run.
         * @param removalCallback A callback to be called synchronously once the
         *   operation is executed or canceled, notifying the AsyncQueue to remove it
         *   from its delayedOperations list.
         *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
         *   the DelayedOperation class public.
         */    static wi(t, e, n, s, i) {
            const r = Date.now() + n, o = new Ds(t, e, r, s, i);
            return o.start(n), o;
        }
        /**
         * Starts the timer. This is called immediately after construction by
         * createAndSchedule().
         */    start(t) {
            this.Ei = setTimeout(() => this.Ti(), t);
        }
        /**
         * Queues the operation to run immediately (if it hasn't already been run or
         * canceled).
         */    Bs() {
            return this.Ti();
        }
        /**
         * Cancels the operation if it hasn't already been executed or canceled. The
         * promise will be rejected.
         *
         * As long as the operation has not yet been run, calling cancel() provides a
         * guarantee that the operation will not be run.
         */    cancel(t) {
            null !== this.Ei && (this.clearTimeout(), this.di.reject(new C$1(D$1.CANCELLED, "Operation cancelled" + (t ? ": " + t : ""))));
        }
        Ti() {
            this.li.Ii(() => null !== this.Ei ? (this.clearTimeout(), this.op().then(t => this.di.resolve(t))) : Promise.resolve());
        }
        clearTimeout() {
            null !== this.Ei && (this.fi(this), clearTimeout(this.Ei), this.Ei = null);
        }
    }

    class Cs {
        constructor() {
            // The last promise in the queue.
            this.mi = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.Ai = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.Ri = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.Pi = [], 
            // visible for testing
            this.gi = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.Vi = !1, 
            // List of TimerIds to fast-forward delays for.
            this.yi = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.pi = new Is(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.bi = () => {
                const t = Ss();
                t && g$1("AsyncQueue", "Visibility state changed to  ", t.visibilityState), this.pi.qs();
            };
            const t = Ss();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.bi);
        }
        // Is this AsyncQueue being shut down? If true, this instance will not enqueue
        // any new operations, Promises from enqueue requests will not resolve.
        get vi() {
            return this.Ri;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    Ii(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        /**
         * Regardless if the queue has initialized shutdown, adds a new operation to the
         * queue without waiting for it to complete (i.e. we ignore the Promise result).
         */    Si(t) {
            this.Di(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.Ci(t);
        }
        /**
         * Initialize the shutdown of this queue. Once this method is called, the
         * only possible way to request running an operation is through
         * `enqueueEvenWhileRestricted()`.
         */    Ni() {
            if (!this.Ri) {
                this.Ri = !0;
                const t = Ss();
                t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.bi);
            }
        }
        /**
         * Adds a new operation to the queue. Returns a promise that will be resolved
         * when the promise returned by the new operation is (with its value).
         */    enqueue(t) {
            return this.Di(), this.Ri ? new Promise(t => {}) : this.Ci(t);
        }
        /**
         * Enqueue a retryable operation.
         *
         * A retryable operation is rescheduled with backoff if it fails with a
         * IndexedDbTransactionError (the error type used by SimpleDb). All
         * retryable operations are executed in order and only run if all prior
         * operations were retried successfully.
         */    xi(t) {
            this.Ai.push(t), this.Ii(() => this.Oi());
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async Oi() {
            if (0 !== this.Ai.length) {
                try {
                    await this.Ai[0](), this.Ai.shift(), this.pi.reset();
                } catch (t) {
                    if (!Ps(t)) throw t;
     // Failure will be handled by AsyncQueue
                                    g$1("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.Ai.length > 0 && 
                // If there are additional operations, we re-schedule `retryNextOp()`.
                // This is necessary to run retryable operations that failed during
                // their initial attempt since we don't know whether they are already
                // enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
                // needs to  be re-run, we will run `op1`, `op1`, `op2` using the
                // already enqueued calls to `retryNextOp()`. `op3()` will then run in the
                // call scheduled here.
                // Since `backoffAndRun()` cancels an existing backoff and schedules a
                // new backoff on every call, there is only ever a single additional
                // operation in the queue.
                this.pi.$s(() => this.Oi());
            }
        }
        Ci(t) {
            const e = this.mi.then(() => (this.Vi = !0, t().catch(t => {
                this.gi = t, this.Vi = !1;
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw V$1("INTERNAL UNHANDLED ERROR: ", 
                /**
     * Chrome includes Error.message in Error.stack. Other browsers do not.
     * This returns expected output of message + stack when available.
     * @param error Error or FirestoreError
     */
                function(t) {
                    let e = t.message || "";
                    t.stack && (e = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
                    return e;
                }
                /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t)), t;
            }).then(t => (this.Vi = !1, t))));
            return this.mi = e, e;
        }
        /**
         * Schedules an operation to be queued on the AsyncQueue once the specified
         * `delayMs` has elapsed. The returned DelayedOperation can be used to cancel
         * or fast-forward the operation prior to its running.
         */    Ls(t, e, n) {
            this.Di(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.yi.indexOf(t) > -1 && (e = 0);
            const s = Ds.wi(this, t, e, n, t => this.Fi(t));
            return this.Pi.push(s), s;
        }
        Di() {
            this.gi && b();
        }
        /**
         * Verifies there's an operation currently in-progress on the AsyncQueue.
         * Unfortunately we can't verify that the running code is in the promise chain
         * of that operation, so this isn't a foolproof check, but it should be enough
         * to catch some bugs.
         */    Mi() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async $i() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.mi, await t;
            } while (t !== this.mi);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    ki(t) {
            for (const e of this.Pi) if (e.Ss === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId Delayed operations up to and including this TimerId will
         *  be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    Li(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.$i().then(() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.Pi.sort((t, e) => t._i - e._i);
                for (const e of this.Pi) if (e.Bs(), "all" /* All */ !== t && e.Ss === t) break;
                return this.$i();
            });
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    qi(t) {
            this.yi.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    Fi(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const e = this.Pi.indexOf(t);
            this.Pi.splice(e, 1);
        }
    }

    /**
     * Returns a FirestoreError that can be surfaced to the user if the provided
     * error is an IndexedDbTransactionError. Re-throws the error otherwise.
     */ function Ns(t, e) {
        if (V$1("AsyncQueue", `${e}: ${t}`), Ps(t)) return new C$1(D$1.UNAVAILABLE, `${e}: ${t}`);
        throw t;
    }

    function xs([t, e], [n, s]) {
        const i = M$1(t, n);
        return 0 === i ? M$1(e, s) : i;
    }

    /**
     * Used to calculate the nth sequence number. Keeps a rolling buffer of the
     * lowest n values passed to `addElement`, and finally reports the largest of
     * them in `maxValue`.
     */ class Os {
        constructor(t) {
            this.Bi = t, this.buffer = new ft(xs), this.Ui = 0;
        }
        Ki() {
            return ++this.Ui;
        }
        Qi(t) {
            const e = [ t, this.Ki() ];
            if (this.buffer.size < this.Bi) this.buffer = this.buffer.add(e); else {
                const t = this.buffer.last();
                xs(e, t) < 0 && (this.buffer = this.buffer.delete(t).add(e));
            }
        }
        get maxValue() {
            // Guaranteed to be non-empty. If we decide we are not collecting any
            // sequence numbers, nthSequenceNumber below short-circuits. If we have
            // decided that we are collecting n sequence numbers, it's because n is some
            // percentage of the existing sequence numbers. That means we should never
            // be in a situation where we are collecting sequence numbers but don't
            // actually have any.
            return this.buffer.last()[0];
        }
    }

    const Fs = {
        Wi: !1,
        ji: 0,
        Gi: 0,
        zi: 0
    };

    class Ms {
        constructor(
        // When we attempt to collect, we will only do so if the cache size is greater than this
        // threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
        t, 
        // The percentage of sequence numbers that we will attempt to collect
        e, 
        // A cap on the total number of sequence numbers that will be collected. This prevents
        // us from collecting a huge number of sequence numbers if the cache has grown very large.
        n) {
            this.Hi = t, this.Ji = e, this.Yi = n;
        }
        static Xi(t) {
            return new Ms(t, Ms.Zi, Ms.tr);
        }
    }

    Ms.er = -1, Ms.nr = 1048576, Ms.sr = 41943040, Ms.Zi = 10, Ms.tr = 1e3, Ms.ir = new Ms(Ms.sr, Ms.Zi, Ms.tr), 
    Ms.rr = new Ms(Ms.er, 0, 0);

    /**
     * This class is responsible for the scheduling of LRU garbage collection. It handles checking
     * whether or not GC is enabled, as well as which delay to use before the next run.
     */
    class $s {
        constructor(t, e) {
            this.cr = t, this.li = e, this.ar = !1, this.ur = null;
        }
        start(t) {
            this.cr.params.Hi !== Ms.er && this.hr(t);
        }
        stop() {
            this.ur && (this.ur.cancel(), this.ur = null);
        }
        get lr() {
            return null !== this.ur;
        }
        hr(t) {
            const e = this.ar ? 3e5 : 6e4;
            g$1("LruGarbageCollector", `Garbage collection scheduled in ${e}ms`), this.ur = this.li.Ls("lru_garbage_collection" /* LruGarbageCollection */ , e, async () => {
                this.ur = null, this.ar = !0;
                try {
                    await t._r(this.cr);
                } catch (t) {
                    Ps(t) ? g$1("LruGarbageCollector", "Ignoring IndexedDB error during garbage collection: ", t) : await er(t);
                }
                await this.hr(t);
            });
        }
    }

    /** Implements the steps for LRU garbage collection. */ class ks {
        constructor(t, e) {
            this.dr = t, this.params = e;
        }
        /** Given a percentile of target to collect, returns the number of targets to collect. */    wr(t, e) {
            return this.dr.Er(t).next(t => Math.floor(e / 100 * t));
        }
        /** Returns the nth sequence number, counting in order from the smallest. */    Tr(t, e) {
            if (0 === e) return hs.resolve(Es.bs);
            const n = new Os(e);
            return this.dr.Le(t, t => n.Qi(t.sequenceNumber)).next(() => this.dr.Ir(t, t => n.Qi(t))).next(() => n.maxValue);
        }
        /**
         * Removes targets with a sequence number equal to or less than the given upper bound, and removes
         * document associations with those targets.
         */    mr(t, e, n) {
            return this.dr.mr(t, e, n);
        }
        /**
         * Removes documents that have a sequence number equal to or less than the upper bound and are not
         * otherwise pinned.
         */    Ar(t, e) {
            return this.dr.Ar(t, e);
        }
        Rr(t, e) {
            return this.params.Hi === Ms.er ? (g$1("LruGarbageCollector", "Garbage collection skipped; disabled"), 
            hs.resolve(Fs)) : this.Pr(t).next(n => n < this.params.Hi ? (g$1("LruGarbageCollector", `Garbage collection skipped; Cache size ${n} is lower than threshold ` + this.params.Hi), 
            Fs) : this.gr(t, e));
        }
        Pr(t) {
            return this.dr.Pr(t);
        }
        gr(t, e) {
            let n, s, i, r, c, a, u;
            const h = Date.now();
            return this.wr(t, this.params.Ji).next(e => (
            // Cap at the configured max
            e > this.params.Yi ? (g$1("LruGarbageCollector", `Capping sequence numbers to collect down to the maximum of ${this.params.Yi} from ` + e), 
            s = this.params.Yi) : s = e, r = Date.now(), this.Tr(t, s))).next(s => (n = s, c = Date.now(), 
            this.mr(t, n, e))).next(e => (i = e, a = Date.now(), this.Ar(t, n))).next(t => {
                if (u = Date.now(), R$1() <= exports.LogLevel.DEBUG) {
                    g$1("LruGarbageCollector", `LRU Garbage Collection\n\tCounted targets in ${r - h}ms\n\tDetermined least recently used ${s} in ` + (c - r) + "ms\n" + `\tRemoved ${i} targets in ` + (a - c) + "ms\n" + `\tRemoved ${t} documents in ` + (u - a) + "ms\n" + `Total Duration: ${u - h}ms`);
                }
                return hs.resolve({
                    Wi: !0,
                    ji: s,
                    Gi: i,
                    zi: t
                });
            });
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Encodes a resource path into a IndexedDb-compatible string form.
     */
    function Ls(t) {
        let e = "";
        for (let n = 0; n < t.length; n++) e.length > 0 && (e = Bs(e)), e = qs(t.get(n), e);
        return Bs(e);
    }

    /** Encodes a single segment of a resource path into the given result */ function qs(t, e) {
        let n = e;
        const s = t.length;
        for (let e = 0; e < s; e++) {
            const s = t.charAt(e);
            switch (s) {
              case "\0":
                n += "";
                break;

              case "":
                n += "";
                break;

              default:
                n += s;
            }
        }
        return n;
    }

    /** Encodes a path separator into the given result */ function Bs(t) {
        return t + "";
    }

    /**
     * Decodes the given IndexedDb-compatible string form of a resource path into
     * a ResourcePath instance. Note that this method is not suitable for use with
     * decoding resource names from the server; those are One Platform format
     * strings.
     */ function Us(t) {
        // Event the empty path must encode as a path of at least length 2. A path
        // with exactly 2 must be the empty path.
        const e = t.length;
        if (v$1(e >= 2), 2 === e) return v$1("" === t.charAt(0) && "" === t.charAt(1)), U$1.j();
        // Escape characters cannot exist past the second-to-last position in the
        // source value.
            const n = e - 2, s = [];
        let i = "";
        for (let r = 0; r < e; ) {
            // The last two characters of a valid encoded path must be a separator, so
            // there must be an end to this segment.
            const e = t.indexOf("", r);
            (e < 0 || e > n) && b();
            switch (t.charAt(e + 1)) {
              case "":
                const n = t.substring(r, e);
                let o;
                0 === i.length ? 
                // Avoid copying for the common case of a segment that excludes \0
                // and \001
                o = n : (i += n, o = i, i = ""), s.push(o);
                break;

              case "":
                i += t.substring(r, e), i += "\0";
                break;

              case "":
                // The escape character can be used in the output to encode itself.
                i += t.substring(r, e + 1);
                break;

              default:
                b();
            }
            r = e + 2;
        }
        return new U$1(s);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Serializer for values stored in the LocalStore. */ class Ks {
        constructor(t) {
            this.Vr = t;
        }
    }

    /** Decodes a remote document from storage locally to a Document. */ function Qs(t, e) {
        if (e.document) return function(t, e, n) {
            const s = Ie(t, e.name), i = de(e.updateTime), r = new Pn({
                mapValue: {
                    fields: e.fields
                }
            });
            return new pn(s, i, r, {
                hasCommittedMutations: !!n
            });
        }(t.Vr, e.document, !!e.hasCommittedMutations);
        if (e.noDocument) {
            const t = W$1.nt(e.noDocument.path), n = Hs(e.noDocument.readTime);
            return new bn(t, n, {
                hasCommittedMutations: !!e.hasCommittedMutations
            });
        }
        if (e.unknownDocument) {
            const t = W$1.nt(e.unknownDocument.path), n = Hs(e.unknownDocument.version);
            return new vn(t, n);
        }
        return b();
    }

    /** Encodes a document for storage locally. */ function Ws(t, e, n) {
        const s = js(n), i = e.key.path.M().U();
        if (e instanceof pn) {
            const n = function(t, e) {
                return {
                    name: Te(t, e.key),
                    fields: e.fn().mapValue.fields,
                    updateTime: le(t, e.version.D())
                };
            }(t.Vr, e), r = e.hasCommittedMutations;
            return new Ai(
            /* unknownDocument= */ null, 
            /* noDocument= */ null, n, r, s, i);
        }
        if (e instanceof bn) {
            const t = e.key.path.U(), n = zs(e.version), r = e.hasCommittedMutations;
            return new Ai(
            /* unknownDocument= */ null, new Ii(t, n), 
            /* document= */ null, r, s, i);
        }
        if (e instanceof vn) {
            const t = e.key.path.U(), n = zs(e.version);
            return new Ai(new mi(t, n), 
            /* noDocument= */ null, 
            /* document= */ null, 
            /* hasCommittedMutations= */ !0, s, i);
        }
        return b();
    }

    function js(t) {
        const e = t.D();
        return [ e.seconds, e.nanoseconds ];
    }

    function Gs(t) {
        const e = new L$1(t[0], t[1]);
        return q$1.p(e);
    }

    function zs(t) {
        const e = t.D();
        return new fi(e.seconds, e.nanoseconds);
    }

    function Hs(t) {
        const e = new L$1(t.seconds, t.nanoseconds);
        return q$1.p(e);
    }

    /** Encodes a batch of mutations into a DbMutationBatch for local storage. */
    /** Decodes a DbMutationBatch into a MutationBatch */
    function Js(t, e) {
        const n = (e.baseMutations || []).map(e => be(t.Vr, e)), s = e.mutations.map(e => be(t.Vr, e)), i = L$1.fromMillis(e.localWriteTimeMs);
        return new cs(e.batchId, i, n, s);
    }

    /** Decodes a DbTarget into TargetData */ function Ys(t) {
        const e = Hs(t.readTime), n = void 0 !== t.lastLimboFreeSnapshotVersion ? Hs(t.lastLimboFreeSnapshotVersion) : q$1.min();
        let s;
        var i;
        return void 0 !== t.query.documents ? (v$1(1 === (i = t.query).documents.length), 
        s = kn(Cn(Ae(i.documents[0])))) : s = Ce(t.query), new it(s, t.targetId, 0 /* Listen */ , t.lastListenSequenceNumber, e, n, st.fromBase64String(t.resumeToken));
    }

    /** Encodes TargetData into a DbTarget for storage locally. */ function Xs(t, e) {
        const n = zs(e.ht), s = zs(e.lastLimboFreeSnapshotVersion);
        let i;
        i = nt(e.target) ? Se(t.Vr, e.target) : De(t.Vr, e.target);
        // We can't store the resumeToken as a ByteString in IndexedDb, so we
        // convert it to a base64 string for storage.
            const r = e.resumeToken.toBase64();
        // lastListenSequenceNumber is always 0 until we do real GC.
            return new Pi(e.targetId, Z$1(e.target), n, r, e.sequenceNumber, s, i);
    }

    /**
     * A helper function for figuring out what kind of query has been stored.
     */
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** A mutation queue for a specific user, backed by IndexedDB. */
    class Zs {
        constructor(
        /**
         * The normalized userId (e.g. null UID => "" userId) used to store /
         * retrieve mutations.
         */
        t, e, n, s) {
            this.userId = t, this.serializer = e, this.ns = n, this.yr = s, 
            /**
             * Caches the document keys for pending mutation batches. If the mutation
             * has been removed from IndexedDb, the cached value may continue to
             * be used to retrieve the batch's document keys. To remove a cached value
             * locally, `removeCachedMutationKeys()` should be invoked either directly
             * or through `removeMutationBatches()`.
             *
             * With multi-tab, when the primary client acknowledges or rejects a mutation,
             * this cache is used by secondary clients to invalidate the local
             * view of the documents that were previously affected by the mutation.
             */
            // PORTING NOTE: Multi-tab only.
            this.pr = {};
        }
        /**
         * Creates a new mutation queue for the given user.
         * @param user The user for which to create a mutation queue.
         * @param serializer The serializer to use when persisting to IndexedDb.
         */    static br(t, e, n, s) {
            // TODO(mcg): Figure out what constraints there are on userIDs
            // In particular, are there any reserved characters? are empty ids allowed?
            // For the moment store these together in the same mutations table assuming
            // that empty userIDs aren't allowed.
            v$1("" !== t.uid);
            const i = t.t() ? t.uid : "";
            return new Zs(i, e, n, s);
        }
        vr(t) {
            let e = !0;
            const n = IDBKeyRange.bound([ this.userId, Number.NEGATIVE_INFINITY ], [ this.userId, Number.POSITIVE_INFINITY ]);
            return ni(t).ui({
                index: Ei.userMutationsIndex,
                range: n
            }, (t, n, s) => {
                e = !1, s.done();
            }).next(() => e);
        }
        Sr(t, e, n, s) {
            const i = si(t), r = ni(t);
            // The IndexedDb implementation in Chrome (and Firefox) does not handle
            // compound indices that include auto-generated keys correctly. To ensure
            // that the index entry is added correctly in all browsers, we perform two
            // writes: The first write is used to retrieve the next auto-generated Batch
            // ID, and the second write populates the index and stores the actual
            // mutation batch.
            // See: https://bugs.chromium.org/p/chromium/issues/detail?id=701972
            // We write an empty object to obtain key
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return r.add({}).next(o => {
                v$1("number" == typeof o);
                const c = new cs(o, e, n, s), a = function(t, e, n) {
                    const s = n.baseMutations.map(e => pe(t.Vr, e)), i = n.mutations.map(e => pe(t.Vr, e));
                    return new Ei(e, n.batchId, n.Rn.toMillis(), s, i);
                }(this.serializer, this.userId, c), u = [];
                let h = new ft((t, e) => M$1(t.K(), e.K()));
                for (const t of s) {
                    const e = Ti.key(this.userId, t.key.path, o);
                    h = h.add(t.key.path.M()), u.push(r.put(a)), u.push(i.put(e, Ti.PLACEHOLDER));
                }
                return h.forEach(e => {
                    u.push(this.ns.Dr(t, e));
                }), t.Xn(() => {
                    this.pr[o] = c.keys();
                }), hs.Ln(u).next(() => c);
            });
        }
        Cr(t, e) {
            return ni(t).get(e).next(t => t ? (v$1(t.userId === this.userId), Js(this.serializer, t)) : null);
        }
        /**
         * Returns the document keys for the mutation batch with the given batchId.
         * For primary clients, this method returns `null` after
         * `removeMutationBatches()` has been called. Secondary clients return a
         * cached result until `removeCachedMutationKeys()` is invoked.
         */
        // PORTING NOTE: Multi-tab only.
        Nr(t, e) {
            return this.pr[e] ? hs.resolve(this.pr[e]) : this.Cr(t, e).next(t => {
                if (t) {
                    const n = t.keys();
                    return this.pr[e] = n, n;
                }
                return null;
            });
        }
        Or(t, e) {
            const n = e + 1, s = IDBKeyRange.lowerBound([ this.userId, n ]);
            let i = null;
            return ni(t).ui({
                index: Ei.userMutationsIndex,
                range: s
            }, (t, e, s) => {
                e.userId === this.userId && (v$1(e.batchId >= n), i = Js(this.serializer, e)), s.done();
            }).next(() => i);
        }
        Fr(t) {
            const e = IDBKeyRange.upperBound([ this.userId, Number.POSITIVE_INFINITY ]);
            let n = -1;
            return ni(t).ui({
                index: Ei.userMutationsIndex,
                range: e,
                reverse: !0
            }, (t, e, s) => {
                n = e.batchId, s.done();
            }).next(() => n);
        }
        Mr(t) {
            const e = IDBKeyRange.bound([ this.userId, -1 ], [ this.userId, Number.POSITIVE_INFINITY ]);
            return ni(t).ri(Ei.userMutationsIndex, e).next(t => t.map(t => Js(this.serializer, t)));
        }
        rs(t, e) {
            // Scan the document-mutation index starting with a prefix starting with
            // the given documentKey.
            const n = Ti.prefixForPath(this.userId, e.path), s = IDBKeyRange.lowerBound(n), i = [];
            return si(t).ui({
                range: s
            }, (n, s, r) => {
                const [o, c, a] = n, u = Us(c);
                // Only consider rows matching exactly the specific key of
                // interest. Note that because we order by path first, and we
                // order terminators before path separators, we'll encounter all
                // the index rows for documentKey contiguously. In particular, all
                // the rows for documentKey will occur before any rows for
                // documents nested in a subcollection beneath documentKey so we
                // can stop as soon as we hit any such row.
                            if (o === this.userId && e.path.isEqual(u)) 
                // Look up the mutation batch in the store.
                return ni(t).get(a).next(t => {
                    if (!t) throw b();
                    v$1(t.userId === this.userId), i.push(Js(this.serializer, t));
                });
                r.done();
            }).next(() => i);
        }
        ls(t, e) {
            let n = new ft(M$1);
            const s = [];
            return e.forEach(e => {
                const i = Ti.prefixForPath(this.userId, e.path), r = IDBKeyRange.lowerBound(i), o = si(t).ui({
                    range: r
                }, (t, s, i) => {
                    const [r, o, c] = t, a = Us(o);
                    // Only consider rows matching exactly the specific key of
                    // interest. Note that because we order by path first, and we
                    // order terminators before path separators, we'll encounter all
                    // the index rows for documentKey contiguously. In particular, all
                    // the rows for documentKey will occur before any rows for
                    // documents nested in a subcollection beneath documentKey so we
                    // can stop as soon as we hit any such row.
                                    r === this.userId && e.path.isEqual(a) ? n = n.add(c) : i.done();
                });
                s.push(o);
            }), hs.Ln(s).next(() => this.$r(t, n));
        }
        Ts(t, e) {
            const n = e.path, s = n.length + 1, i = Ti.prefixForPath(this.userId, n), r = IDBKeyRange.lowerBound(i);
            // Collect up unique batchIDs encountered during a scan of the index. Use a
            // SortedSet to accumulate batch IDs so they can be traversed in order in a
            // scan of the main table.
            let o = new ft(M$1);
            return si(t).ui({
                range: r
            }, (t, e, i) => {
                const [r, c, a] = t, u = Us(c);
                r === this.userId && n.q(u) ? 
                // Rows with document keys more than one segment longer than the
                // query path can't be matches. For example, a query on 'rooms'
                // can't match the document /rooms/abc/messages/xyx.
                // TODO(mcg): we'll need a different scanner when we implement
                // ancestor queries.
                u.length === s && (o = o.add(a)) : i.done();
            }).next(() => this.$r(t, o));
        }
        $r(t, e) {
            const n = [], s = [];
            // TODO(rockwood): Implement this using iterate.
            return e.forEach(e => {
                s.push(ni(t).get(e).next(t => {
                    if (null === t) throw b();
                    v$1(t.userId === this.userId), n.push(Js(this.serializer, t));
                }));
            }), hs.Ln(s).next(() => n);
        }
        kr(t, e) {
            return ei(t.Lr, this.userId, e).next(n => (t.Xn(() => {
                this.qr(e.batchId);
            }), hs.forEach(n, e => this.yr.Br(t, e))));
        }
        /**
         * Clears the cached keys for a mutation batch. This method should be
         * called by secondary clients after they process mutation updates.
         *
         * Note that this method does not have to be called from primary clients as
         * the corresponding cache entries are cleared when an acknowledged or
         * rejected batch is removed from the mutation queue.
         */
        // PORTING NOTE: Multi-tab only
        qr(t) {
            delete this.pr[t];
        }
        Ur(t) {
            return this.vr(t).next(e => {
                if (!e) return hs.resolve();
                // Verify that there are no entries in the documentMutations index if
                // the queue is empty.
                            const n = IDBKeyRange.lowerBound(Ti.prefixForUser(this.userId)), s = [];
                return si(t).ui({
                    range: n
                }, (t, e, n) => {
                    if (t[0] === this.userId) {
                        const e = Us(t[1]);
                        s.push(e);
                    } else n.done();
                }).next(() => {
                    v$1(0 === s.length);
                });
            });
        }
        Kr(t, e) {
            return ti(t, this.userId, e);
        }
        // PORTING NOTE: Multi-tab only (state is held in memory in other clients).
        /** Returns the mutation queue's metadata from IndexedDb. */
        Qr(t) {
            return ii(t).get(this.userId).next(t => t || new wi(this.userId, -1, 
            /*lastStreamToken=*/ ""));
        }
    }

    /**
     * @return true if the mutation queue for the given user contains a pending
     *         mutation for the given key.
     */ function ti(t, e, n) {
        const s = Ti.prefixForPath(e, n.path), i = s[1], r = IDBKeyRange.lowerBound(s);
        let o = !1;
        return si(t).ui({
            range: r,
            ai: !0
        }, (t, n, s) => {
            const [r, c, /*batchID*/ a] = t;
            r === e && c === i && (o = !0), s.done();
        }).next(() => o);
    }

    /** Returns true if any mutation queue contains the given document. */
    /**
     * Delete a mutation batch and the associated document mutations.
     * @return A PersistencePromise of the document mutations that were removed.
     */
    function ei(t, e, n) {
        const s = t.store(Ei.store), i = t.store(Ti.store), r = [], o = IDBKeyRange.only(n.batchId);
        let c = 0;
        const a = s.ui({
            range: o
        }, (t, e, n) => (c++, n.delete()));
        r.push(a.next(() => {
            v$1(1 === c);
        }));
        const u = [];
        for (const t of n.mutations) {
            const s = Ti.key(e, t.key.path, n.batchId);
            r.push(i.delete(s)), u.push(t.key);
        }
        return hs.Ln(r).next(() => u);
    }

    /**
     * Helper to get a typed SimpleDbStore for the mutations object store.
     */ function ni(t) {
        return ki.zs(t, Ei.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the mutationQueues object store.
     */ function si(t) {
        return ki.zs(t, Ti.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the mutationQueues object store.
     */ function ii(t) {
        return ki.zs(t, wi.store);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class ri {
        /**
         * @param {LocalSerializer} serializer The document serializer.
         * @param {IndexManager} indexManager The query indexes that need to be maintained.
         */
        constructor(t, e) {
            this.serializer = t, this.ns = e;
        }
        /**
         * Adds the supplied entries to the cache.
         *
         * All calls of `addEntry` are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
         */    Qn(t, e, n) {
            return ci(t).put(ai(e), n);
        }
        /**
         * Removes a document from the cache.
         *
         * All calls of `removeEntry`  are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()` to ensure proper accounting of metadata.
         */    jn(t, e) {
            const n = ci(t), s = ai(e);
            return n.delete(s);
        }
        /**
         * Updates the current cache size.
         *
         * Callers to `addEntry()` and `removeEntry()` *must* call this afterwards to update the
         * cache's metadata.
         */    updateMetadata(t, e) {
            return this.getMetadata(t).next(n => (n.byteSize += e, this.Wr(t, n)));
        }
        Gn(t, e) {
            return ci(t).get(ai(e)).next(t => this.jr(t));
        }
        /**
         * Looks up an entry in the cache.
         *
         * @param documentKey The key of the entry to look up.
         * @return The cached MaybeDocument entry and its size, or null if we have nothing cached.
         */    Gr(t, e) {
            return ci(t).get(ai(e)).next(t => {
                const e = this.jr(t);
                return e ? {
                    zr: e,
                    size: ui(t)
                } : null;
            });
        }
        getEntries(t, e) {
            let n = Tt();
            return this.Hr(t, e, (t, e) => {
                const s = this.jr(e);
                n = n.dt(t, s);
            }).next(() => n);
        }
        /**
         * Looks up several entries in the cache.
         *
         * @param documentKeys The set of keys entries to look up.
         * @return A map of MaybeDocuments indexed by key (if a document cannot be
         *     found, the key will be mapped to null) and a map of sizes indexed by
         *     key (zero if the key cannot be found).
         */    Jr(t, e) {
            let n = Tt(), s = new ht(W$1.N);
            return this.Hr(t, e, (t, e) => {
                const i = this.jr(e);
                i ? (n = n.dt(t, i), s = s.dt(t, ui(e))) : (n = n.dt(t, null), s = s.dt(t, 0));
            }).next(() => ({
                Yr: n,
                Xr: s
            }));
        }
        Hr(t, e, n) {
            if (e.L()) return hs.resolve();
            const s = IDBKeyRange.bound(e.first().path.U(), e.last().path.U()), i = e.Rt();
            let r = i.vt();
            return ci(t).ui({
                range: s
            }, (t, e, s) => {
                const o = W$1.nt(t);
                // Go through keys not found in cache.
                            for (;r && W$1.N(r, o) < 0; ) n(r, null), r = i.vt();
                r && r.isEqual(o) && (
                // Key found in cache.
                n(r, e), r = i.St() ? i.vt() : null), 
                // Skip to the next key (if there is one).
                r ? s.si(r.path.U()) : s.done();
            }).next(() => {
                // The rest of the keys are not in the cache. One case where `iterate`
                // above won't go through them is when the cache is empty.
                for (;r; ) n(r, null), r = i.St() ? i.vt() : null;
            });
        }
        _s(t, e, n) {
            let s = mt();
            const i = e.path.length + 1, r = {};
            if (n.isEqual(q$1.min())) {
                // Documents are ordered by key, so we can use a prefix scan to narrow
                // down the documents we need to match the query against.
                const t = e.path.U();
                r.range = IDBKeyRange.lowerBound(t);
            } else {
                // Execute an index-free query and filter by read time. This is safe
                // since all document changes to queries that have a
                // lastLimboFreeSnapshotVersion (`sinceReadTime`) have a read time set.
                const t = e.path.U(), s = js(n);
                r.range = IDBKeyRange.lowerBound([ t, s ], 
                /* open= */ !0), r.index = Ai.collectionReadTimeIndex;
            }
            return ci(t).ui(r, (t, n, r) => {
                // The query is actually returning any path that starts with the query
                // path prefix which may include documents in subcollections. For
                // example, a query on 'rooms' will return rooms/abc/messages/xyx but we
                // shouldn't match it. Fix this by discarding rows with document keys
                // more than one segment longer than the query path.
                if (t.length !== i) return;
                const o = Qs(this.serializer, n);
                e.path.q(o.key.path) ? o instanceof pn && Un(e, o) && (s = s.dt(o.key, o)) : r.done();
            }).next(() => s);
        }
        /**
         * Returns the set of documents that have changed since the specified read
         * time.
         */
        // PORTING NOTE: This is only used for multi-tab synchronization.
        Zr(t, e) {
            let n = Et(), s = js(e);
            const i = ci(t), r = IDBKeyRange.lowerBound(s, !0);
            return i.ui({
                index: Ai.readTimeIndex,
                range: r
            }, (t, e) => {
                // Unlike `getEntry()` and others, `getNewDocumentChanges()` parses
                // the documents directly since we want to keep sentinel deletes.
                const i = Qs(this.serializer, e);
                n = n.dt(i.key, i), s = e.readTime;
            }).next(() => ({
                eo: n,
                readTime: Gs(s)
            }));
        }
        /**
         * Returns the read time of the most recently read document in the cache, or
         * SnapshotVersion.min() if not available.
         */
        // PORTING NOTE: This is only used for multi-tab synchronization.
        no(t) {
            const e = ci(t);
            // If there are no existing entries, we return SnapshotVersion.min().
                    let n = q$1.min();
            return e.ui({
                index: Ai.readTimeIndex,
                reverse: !0
            }, (t, e, s) => {
                e.readTime && (n = Gs(e.readTime)), s.done();
            }).next(() => n);
        }
        so(t) {
            return new ri.io(this, !!t && t.ro);
        }
        oo(t) {
            return this.getMetadata(t).next(t => t.byteSize);
        }
        getMetadata(t) {
            return oi(t).get(Ri.key).next(t => (v$1(!!t), t));
        }
        Wr(t, e) {
            return oi(t).put(Ri.key, e);
        }
        /**
         * Decodes `remoteDoc` and returns the document (or null, if the document
         * corresponds to the format used for sentinel deletes).
         */    jr(t) {
            if (t) {
                const e = Qs(this.serializer, t);
                return e instanceof bn && e.version.isEqual(q$1.min()) ? null : e;
            }
            return null;
        }
    }

    /**
     * Handles the details of adding and updating documents in the IndexedDbRemoteDocumentCache.
     *
     * Unlike the MemoryRemoteDocumentChangeBuffer, the IndexedDb implementation computes the size
     * delta for all submitted changes. This avoids having to re-read all documents from IndexedDb
     * when we apply the changes.
     */ function oi(t) {
        return ki.zs(t, Ri.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the remoteDocuments object store.
     */ function ci(t) {
        return ki.zs(t, Ai.store);
    }

    function ai(t) {
        return t.path.U();
    }

    /**
     * Retrusn an approximate size for the given document.
     */ function ui(t) {
        let e;
        if (t.document) e = t.document; else if (t.unknownDocument) e = t.unknownDocument; else {
            if (!t.noDocument) throw b();
            e = t.noDocument;
        }
        return JSON.stringify(e).length;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * An in-memory implementation of IndexManager.
     */ ri.io = class extends ls {
        /**
         * @param documentCache The IndexedDbRemoteDocumentCache to apply the changes to.
         * @param trackRemovals Whether to create sentinel deletes that can be tracked by
         * `getNewDocumentChanges()`.
         */
        constructor(t, e) {
            super(), this.co = t, this.ro = e, 
            // A map of document sizes prior to applying the changes in this buffer.
            this.ao = new us(t => t.toString(), (t, e) => t.isEqual(e));
        }
        Jn(t) {
            const e = [];
            let n = 0, s = new ft((t, e) => M$1(t.K(), e.K()));
            return this.Bn.forEach((i, r) => {
                const o = this.ao.get(i);
                if (r) {
                    const c = Ws(this.co.serializer, r, this.readTime);
                    s = s.add(i.path.M());
                    const a = ui(c);
                    n += a - o, e.push(this.co.Qn(t, i, c));
                } else if (n -= o, this.ro) {
                    // In order to track removals, we store a "sentinel delete" in the
                    // RemoteDocumentCache. This entry is represented by a NoDocument
                    // with a version of 0 and ignored by `maybeDecodeDocument()` but
                    // preserved in `getNewDocumentChanges()`.
                    const n = Ws(this.co.serializer, new bn(i, q$1.min()), this.readTime);
                    e.push(this.co.Qn(t, i, n));
                } else e.push(this.co.jn(t, i));
            }), s.forEach(n => {
                e.push(this.co.ns.Dr(t, n));
            }), e.push(this.co.updateMetadata(t, n)), hs.Ln(e);
        }
        zn(t, e) {
            // Record the size of everything we load from the cache so we can compute a delta later.
            return this.co.Gr(t, e).next(t => null === t ? (this.ao.set(e, 0), null) : (this.ao.set(e, t.size), 
            t.zr));
        }
        Hn(t, e) {
            // Record the size of everything we load from the cache so we can compute
            // a delta later.
            return this.co.Jr(t, e).next(({Yr: t, Xr: e}) => (
            // Note: `getAllFromCache` returns two maps instead of a single map from
            // keys to `DocumentSizeEntry`s. This is to allow returning the
            // `NullableMaybeDocumentMap` directly, without a conversion.
            e.forEach((t, e) => {
                this.ao.set(t, e);
            }), t));
        }
    };

    class hi {
        constructor() {
            this.uo = new li;
        }
        Dr(t, e) {
            return this.uo.add(e), hs.resolve();
        }
        Es(t, e) {
            return hs.resolve(this.uo.getEntries(e));
        }
    }

    /**
     * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
     * Also used for in-memory caching by IndexedDbIndexManager and initial index population
     * in indexeddb_schema.ts
     */ class li {
        constructor() {
            this.index = {};
        }
        // Returns false if the entry already existed.
        add(t) {
            const e = t.k(), n = t.M(), s = this.index[e] || new ft(U$1.N), i = !s.has(n);
            return this.index[e] = s.add(n), i;
        }
        has(t) {
            const e = t.k(), n = t.M(), s = this.index[e];
            return s && s.has(n);
        }
        getEntries(t) {
            return (this.index[t] || new ft(U$1.N)).U();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Schema Version for the Web client:
     * 1.  Initial version including Mutation Queue, Query Cache, and Remote
     *     Document Cache
     * 2.  Used to ensure a targetGlobal object exists and add targetCount to it. No
     *     longer required because migration 3 unconditionally clears it.
     * 3.  Dropped and re-created Query Cache to deal with cache corruption related
     *     to limbo resolution. Addresses
     *     https://github.com/firebase/firebase-ios-sdk/issues/1548
     * 4.  Multi-Tab Support.
     * 5.  Removal of held write acks.
     * 6.  Create document global for tracking document cache size.
     * 7.  Ensure every cached document has a sentinel row with a sequence number.
     * 8.  Add collection-parent index for Collection Group queries.
     * 9.  Change RemoteDocumentChanges store to be keyed by readTime rather than
     *     an auto-incrementing ID. This is required for Index-Free queries.
     * 10. Rewrite the canonical IDs to the explicit Protobuf-based format.
     */
    /** Performs database creation and schema upgrades. */
    class _i {
        constructor(t) {
            this.serializer = t;
        }
        /**
         * Performs database creation and schema upgrades.
         *
         * Note that in production, this method is only ever used to upgrade the schema
         * to SCHEMA_VERSION. Different values of toVersion are only used for testing
         * and local feature development.
         */    createOrUpgrade(t, e, n, s) {
            v$1(n < s && n >= 0 && s <= 10);
            const i = new gs(e);
            n < 1 && s >= 1 && (function(t) {
                t.createObjectStore(di.store);
            }
            /**
     * An object to be stored in the 'mutationQueues' store in IndexedDb.
     *
     * Each user gets a single queue of MutationBatches to apply to the server.
     * DbMutationQueue tracks the metadata about the queue.
     */ (t), function(t) {
                t.createObjectStore(wi.store, {
                    keyPath: wi.keyPath
                });
                t.createObjectStore(Ei.store, {
                    keyPath: Ei.keyPath,
                    autoIncrement: !0
                }).createIndex(Ei.userMutationsIndex, Ei.userMutationsKeyPath, {
                    unique: !0
                }), t.createObjectStore(Ti.store);
            }
            /**
     * Upgrade function to migrate the 'mutations' store from V1 to V3. Loads
     * and rewrites all data.
     */ (t), pi(t), function(t) {
                t.createObjectStore(Ai.store);
            }
            /**
     * Represents the known absence of a document at a particular version.
     * Stored in IndexedDb as part of a DbRemoteDocument object.
     */ (t));
            // Migration 2 to populate the targetGlobal object no longer needed since
            // migration 3 unconditionally clears it.
                    let r = hs.resolve();
            return n < 3 && s >= 3 && (
            // Brand new clients don't need to drop and recreate--only clients that
            // potentially have corrupt data.
            0 !== n && (!function(t) {
                t.deleteObjectStore(gi.store), t.deleteObjectStore(Pi.store), t.deleteObjectStore(Vi.store);
            }(t), pi(t)), r = r.next(() => 
            /**
     * Creates the target global singleton row.
     *
     * @param {IDBTransaction} txn The version upgrade transaction for indexeddb
     */
            function(t) {
                const e = t.store(Vi.store), n = new Vi(
                /*highestTargetId=*/ 0, 
                /*lastListenSequenceNumber=*/ 0, q$1.min().D(), 
                /*targetCount=*/ 0);
                return e.put(Vi.key, n);
            }
            /**
     * Creates indices on the RemoteDocuments store used for both multi-tab
     * and Index-Free queries.
     */ (i))), n < 4 && s >= 4 && (0 !== n && (
            // Schema version 3 uses auto-generated keys to generate globally unique
            // mutation batch IDs (this was previously ensured internally by the
            // client). To migrate to the new schema, we have to read all mutations
            // and write them back out. We preserve the existing batch IDs to guarantee
            // consistency with other object stores. Any further mutation batch IDs will
            // be auto-generated.
            r = r.next(() => function(t, e) {
                return e.store(Ei.store).ri().next(n => {
                    t.deleteObjectStore(Ei.store);
                    t.createObjectStore(Ei.store, {
                        keyPath: Ei.keyPath,
                        autoIncrement: !0
                    }).createIndex(Ei.userMutationsIndex, Ei.userMutationsKeyPath, {
                        unique: !0
                    });
                    const s = e.store(Ei.store), i = n.map(t => s.put(t));
                    return hs.Ln(i);
                });
            }
            /**
     * An object to be stored in the 'documentMutations' store in IndexedDb.
     *
     * A manually maintained index of all the mutation batches that affect a given
     * document key. The rows in this table are references based on the contents of
     * DbMutationBatch.mutations.
     */ (t, i))), r = r.next(() => {
                !function(t) {
                    t.createObjectStore(bi.store, {
                        keyPath: bi.keyPath
                    });
                }
                // Visible for testing
                (t);
            })), n < 5 && s >= 5 && (r = r.next(() => this.removeAcknowledgedMutations(i))), 
            n < 6 && s >= 6 && (r = r.next(() => (function(t) {
                t.createObjectStore(Ri.store);
            }
            /**
     * An object to be stored in the 'targets' store in IndexedDb.
     *
     * This is based on and should be kept in sync with the proto used in the iOS
     * client.
     *
     * Each query the client listens to against the server is tracked on disk so
     * that the query can be efficiently resumed on restart.
     */ (t), this.addDocumentGlobal(i)))), n < 7 && s >= 7 && (r = r.next(() => this.ensureSequenceNumbers(i))), 
            n < 8 && s >= 8 && (r = r.next(() => this.createCollectionParentIndex(t, i))), n < 9 && s >= 9 && (r = r.next(() => {
                // Multi-Tab used to manage its own changelog, but this has been moved
                // to the DbRemoteDocument object store itself. Since the previous change
                // log only contained transient data, we can drop its object store.
                !function(t) {
                    t.objectStoreNames.contains("remoteDocumentChanges") && t.deleteObjectStore("remoteDocumentChanges");
                }(t), function(t) {
                    const e = t.objectStore(Ai.store);
                    e.createIndex(Ai.readTimeIndex, Ai.readTimeIndexPath, {
                        unique: !1
                    }), e.createIndex(Ai.collectionReadTimeIndex, Ai.collectionReadTimeIndexPath, {
                        unique: !1
                    });
                }
                /**
     * A record of the metadata state of each client.
     *
     * PORTING NOTE: This is used to synchronize multi-tab state and does not need
     * to be ported to iOS or Android.
     */ (e);
            })), n < 10 && s >= 10 && (r = r.next(() => this.rewriteCanonicalIds(i))), r;
        }
        addDocumentGlobal(t) {
            let e = 0;
            return t.store(Ai.store).ui((t, n) => {
                e += ui(n);
            }).next(() => {
                const n = new Ri(e);
                return t.store(Ri.store).put(Ri.key, n);
            });
        }
        removeAcknowledgedMutations(t) {
            const e = t.store(wi.store), n = t.store(Ei.store);
            return e.ri().next(e => hs.forEach(e, e => {
                const s = IDBKeyRange.bound([ e.userId, -1 ], [ e.userId, e.lastAcknowledgedBatchId ]);
                return n.ri(Ei.userMutationsIndex, s).next(n => hs.forEach(n, n => {
                    v$1(n.userId === e.userId);
                    const s = Js(this.serializer, n);
                    return ei(t, e.userId, s).next(() => {});
                }));
            }));
        }
        /**
         * Ensures that every document in the remote document cache has a corresponding sentinel row
         * with a sequence number. Missing rows are given the most recently used sequence number.
         */    ensureSequenceNumbers(t) {
            const e = t.store(gi.store), n = t.store(Ai.store);
            return t.store(Vi.store).get(Vi.key).next(t => {
                const s = [];
                return n.ui((n, i) => {
                    const r = new U$1(n), o = function(t) {
                        return [ 0, Ls(t) ];
                    }
                    /**
     * Wrapper class to store timestamps (seconds and nanos) in IndexedDb objects.
     */ (r);
                    s.push(e.get(o).next(n => n ? hs.resolve() : (n => e.put(new gi(0, Ls(n), t.highestListenSequenceNumber)))(r)));
                }).next(() => hs.Ln(s));
            });
        }
        createCollectionParentIndex(t, e) {
            // Create the index.
            t.createObjectStore(yi.store, {
                keyPath: yi.keyPath
            });
            const n = e.store(yi.store), s = new li, i = t => {
                if (s.add(t)) {
                    const e = t.k(), s = t.M();
                    return n.put({
                        collectionId: e,
                        parent: Ls(s)
                    });
                }
            };
            // Helper to add an index entry iff we haven't already written it.
                    // Index existing remote documents.
            return e.store(Ai.store).ui({
                ai: !0
            }, (t, e) => {
                const n = new U$1(t);
                return i(n.M());
            }).next(() => e.store(Ti.store).ui({
                ai: !0
            }, ([t, e, n], s) => {
                const r = Us(e);
                return i(r.M());
            }));
        }
        rewriteCanonicalIds(t) {
            const e = t.store(Pi.store);
            return e.ui((t, n) => {
                const s = Ys(n), i = Xs(this.serializer, s);
                return e.put(i);
            });
        }
    }

    class fi {
        constructor(t, e) {
            this.seconds = t, this.nanoseconds = e;
        }
    }

    /**
     * A singleton object to be stored in the 'owner' store in IndexedDb.
     *
     * A given database can have a single primary tab assigned at a given time. That
     * tab must validate that it is still holding the primary lease before every
     * operation that requires locked access. The primary tab should regularly
     * write an updated timestamp to this lease to prevent other tabs from
     * "stealing" the primary lease
     */ class di {
        constructor(t, 
        /** Whether to allow shared access from multiple tabs. */
        e, n) {
            this.ownerId = t, this.allowTabSynchronization = e, this.leaseTimestampMs = n;
        }
    }

    /**
     * Name of the IndexedDb object store.
     *
     * Note that the name 'owner' is chosen to ensure backwards compatibility with
     * older clients that only supported single locked access to the persistence
     * layer.
     */ di.store = "owner", 
    /**
     * The key string used for the single object that exists in the
     * DbPrimaryClient store.
     */
    di.key = "owner";

    class wi {
        constructor(
        /**
         * The normalized user ID to which this queue belongs.
         */
        t, 
        /**
         * An identifier for the highest numbered batch that has been acknowledged
         * by the server. All MutationBatches in this queue with batchIds less
         * than or equal to this value are considered to have been acknowledged by
         * the server.
         *
         * NOTE: this is deprecated and no longer used by the code.
         */
        e, 
        /**
         * A stream token that was previously sent by the server.
         *
         * See StreamingWriteRequest in datastore.proto for more details about
         * usage.
         *
         * After sending this token, earlier tokens may not be used anymore so
         * only a single stream token is retained.
         *
         * NOTE: this is deprecated and no longer used by the code.
         */
        n) {
            this.userId = t, this.lastAcknowledgedBatchId = e, this.lastStreamToken = n;
        }
    }

    /** Name of the IndexedDb object store.  */ wi.store = "mutationQueues", 
    /** Keys are automatically assigned via the userId property. */
    wi.keyPath = "userId";

    /**
     * An object to be stored in the 'mutations' store in IndexedDb.
     *
     * Represents a batch of user-level mutations intended to be sent to the server
     * in a single write. Each user-level batch gets a separate DbMutationBatch
     * with a new batchId.
     */
    class Ei {
        constructor(
        /**
         * The normalized user ID to which this batch belongs.
         */
        t, 
        /**
         * An identifier for this batch, allocated using an auto-generated key.
         */
        e, 
        /**
         * The local write time of the batch, stored as milliseconds since the
         * epoch.
         */
        n, 
        /**
         * A list of "mutations" that represent a partial base state from when this
         * write batch was initially created. During local application of the write
         * batch, these baseMutations are applied prior to the real writes in order
         * to override certain document fields from the remote document cache. This
         * is necessary in the case of non-idempotent writes (e.g. `increment()`
         * transforms) to make sure that the local view of the modified documents
         * doesn't flicker if the remote document cache receives the result of the
         * non-idempotent write before the write is removed from the queue.
         *
         * These mutations are never sent to the backend.
         */
        s, 
        /**
         * A list of mutations to apply. All mutations will be applied atomically.
         *
         * Mutations are serialized via toMutation().
         */
        i) {
            this.userId = t, this.batchId = e, this.localWriteTimeMs = n, this.baseMutations = s, 
            this.mutations = i;
        }
    }

    /** Name of the IndexedDb object store.  */ Ei.store = "mutations", 
    /** Keys are automatically assigned via the userId, batchId properties. */
    Ei.keyPath = "batchId", 
    /** The index name for lookup of mutations by user. */
    Ei.userMutationsIndex = "userMutationsIndex", 
    /** The user mutations index is keyed by [userId, batchId] pairs. */
    Ei.userMutationsKeyPath = [ "userId", "batchId" ];

    class Ti {
        constructor() {}
        /**
         * Creates a [userId] key for use in the DbDocumentMutations index to iterate
         * over all of a user's document mutations.
         */    static prefixForUser(t) {
            return [ t ];
        }
        /**
         * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
         * index to iterate over all at document mutations for a given path or lower.
         */    static prefixForPath(t, e) {
            return [ t, Ls(e) ];
        }
        /**
         * Creates a full index key of [userId, encodedPath, batchId] for inserting
         * and deleting into the DbDocumentMutations index.
         */    static key(t, e, n) {
            return [ t, Ls(e), n ];
        }
    }

    Ti.store = "documentMutations", 
    /**
     * Because we store all the useful information for this store in the key,
     * there is no useful information to store as the value. The raw (unencoded)
     * path cannot be stored because IndexedDb doesn't store prototype
     * information.
     */
    Ti.PLACEHOLDER = new Ti;

    class Ii {
        constructor(t, e) {
            this.path = t, this.readTime = e;
        }
    }

    /**
     * Represents a document that is known to exist but whose data is unknown.
     * Stored in IndexedDb as part of a DbRemoteDocument object.
     */ class mi {
        constructor(t, e) {
            this.path = t, this.version = e;
        }
    }

    /**
     * An object to be stored in the 'remoteDocuments' store in IndexedDb.
     * It represents either:
     *
     * - A complete document.
     * - A "no document" representing a document that is known not to exist (at
     * some version).
     * - An "unknown document" representing a document that is known to exist (at
     * some version) but whose contents are unknown.
     *
     * Note: This is the persisted equivalent of a MaybeDocument and could perhaps
     * be made more general if necessary.
     */ class Ai {
        // TODO: We are currently storing full document keys almost three times
        // (once as part of the primary key, once - partly - as `parentPath` and once
        // inside the encoded documents). During our next migration, we should
        // rewrite the primary key as parentPath + document ID which would allow us
        // to drop one value.
        constructor(
        /**
         * Set to an instance of DbUnknownDocument if the data for a document is
         * not known, but it is known that a document exists at the specified
         * version (e.g. it had a successful update applied to it)
         */
        t, 
        /**
         * Set to an instance of a DbNoDocument if it is known that no document
         * exists.
         */
        e, 
        /**
         * Set to an instance of a Document if there's a cached version of the
         * document.
         */
        n, 
        /**
         * Documents that were written to the remote document store based on
         * a write acknowledgment are marked with `hasCommittedMutations`. These
         * documents are potentially inconsistent with the backend's copy and use
         * the write's commit version as their document version.
         */
        s, 
        /**
         * When the document was read from the backend. Undefined for data written
         * prior to schema version 9.
         */
        i, 
        /**
         * The path of the collection this document is part of. Undefined for data
         * written prior to schema version 9.
         */
        r) {
            this.unknownDocument = t, this.noDocument = e, this.document = n, this.hasCommittedMutations = s, 
            this.readTime = i, this.parentPath = r;
        }
    }

    Ai.store = "remoteDocuments", 
    /**
     * An index that provides access to all entries sorted by read time (which
     * corresponds to the last modification time of each row).
     *
     * This index is used to provide a changelog for Multi-Tab.
     */
    Ai.readTimeIndex = "readTimeIndex", Ai.readTimeIndexPath = "readTime", 
    /**
     * An index that provides access to documents in a collection sorted by read
     * time.
     *
     * This index is used to allow the RemoteDocumentCache to fetch newly changed
     * documents in a collection.
     */
    Ai.collectionReadTimeIndex = "collectionReadTimeIndex", Ai.collectionReadTimeIndexPath = [ "parentPath", "readTime" ];

    /**
     * Contains a single entry that has metadata about the remote document cache.
     */
    class Ri {
        /**
         * @param byteSize Approximately the total size in bytes of all the documents in the document
         * cache.
         */
        constructor(t) {
            this.byteSize = t;
        }
    }

    Ri.store = "remoteDocumentGlobal", Ri.key = "remoteDocumentGlobalKey";

    class Pi {
        constructor(
        /**
         * An auto-generated sequential numeric identifier for the query.
         *
         * Queries are stored using their canonicalId as the key, but these
         * canonicalIds can be quite long so we additionally assign a unique
         * queryId which can be used by referenced data structures (e.g.
         * indexes) to minimize the on-disk cost.
         */
        t, 
        /**
         * The canonical string representing this query. This is not unique.
         */
        e, 
        /**
         * The last readTime received from the Watch Service for this query.
         *
         * This is the same value as TargetChange.read_time in the protos.
         */
        n, 
        /**
         * An opaque, server-assigned token that allows watching a query to be
         * resumed after disconnecting without retransmitting all the data
         * that matches the query. The resume token essentially identifies a
         * point in time from which the server should resume sending results.
         *
         * This is related to the snapshotVersion in that the resumeToken
         * effectively also encodes that value, but the resumeToken is opaque
         * and sometimes encodes additional information.
         *
         * A consequence of this is that the resumeToken should be used when
         * asking the server to reason about where this client is in the watch
         * stream, but the client should use the snapshotVersion for its own
         * purposes.
         *
         * This is the same value as TargetChange.resume_token in the protos.
         */
        s, 
        /**
         * A sequence number representing the last time this query was
         * listened to, used for garbage collection purposes.
         *
         * Conventionally this would be a timestamp value, but device-local
         * clocks are unreliable and they must be able to create new listens
         * even while disconnected. Instead this should be a monotonically
         * increasing number that's incremented on each listen call.
         *
         * This is different from the queryId since the queryId is an
         * immutable identifier assigned to the Query on first use while
         * lastListenSequenceNumber is updated every time the query is
         * listened to.
         */
        i, 
        /**
         * Denotes the maximum snapshot version at which the associated query view
         * contained no limbo documents.  Undefined for data written prior to
         * schema version 9.
         */
        r, 
        /**
         * The query for this target.
         *
         * Because canonical ids are not unique we must store the actual query. We
         * use the proto to have an object we can persist without having to
         * duplicate translation logic to and from a `Query` object.
         */
        o) {
            this.targetId = t, this.canonicalId = e, this.readTime = n, this.resumeToken = s, 
            this.lastListenSequenceNumber = i, this.lastLimboFreeSnapshotVersion = r, this.query = o;
        }
    }

    Pi.store = "targets", 
    /** Keys are automatically assigned via the targetId property. */
    Pi.keyPath = "targetId", 
    /** The name of the queryTargets index. */
    Pi.queryTargetsIndexName = "queryTargetsIndex", 
    /**
     * The index of all canonicalIds to the targets that they match. This is not
     * a unique mapping because canonicalId does not promise a unique name for all
     * possible queries, so we append the targetId to make the mapping unique.
     */
    Pi.queryTargetsKeyPath = [ "canonicalId", "targetId" ];

    /**
     * An object representing an association between a target and a document, or a
     * sentinel row marking the last sequence number at which a document was used.
     * Each document cached must have a corresponding sentinel row before lru
     * garbage collection is enabled.
     *
     * The target associations and sentinel rows are co-located so that orphaned
     * documents and their sequence numbers can be identified efficiently via a scan
     * of this store.
     */
    class gi {
        constructor(
        /**
         * The targetId identifying a target or 0 for a sentinel row.
         */
        t, 
        /**
         * The path to the document, as encoded in the key.
         */
        e, 
        /**
         * If this is a sentinel row, this should be the sequence number of the last
         * time the document specified by `path` was used. Otherwise, it should be
         * `undefined`.
         */
        n) {
            this.targetId = t, this.path = e, this.sequenceNumber = n;
        }
    }

    /** Name of the IndexedDb object store.  */ gi.store = "targetDocuments", 
    /** Keys are automatically assigned via the targetId, path properties. */
    gi.keyPath = [ "targetId", "path" ], 
    /** The index name for the reverse index. */
    gi.documentTargetsIndex = "documentTargetsIndex", 
    /** We also need to create the reverse index for these properties. */
    gi.documentTargetsKeyPath = [ "path", "targetId" ];

    /**
     * A record of global state tracked across all Targets, tracked separately
     * to avoid the need for extra indexes.
     *
     * This should be kept in-sync with the proto used in the iOS client.
     */
    class Vi {
        constructor(
        /**
         * The highest numbered target id across all targets.
         *
         * See DbTarget.targetId.
         */
        t, 
        /**
         * The highest numbered lastListenSequenceNumber across all targets.
         *
         * See DbTarget.lastListenSequenceNumber.
         */
        e, 
        /**
         * A global snapshot version representing the last consistent snapshot we
         * received from the backend. This is monotonically increasing and any
         * snapshots received from the backend prior to this version (e.g. for
         * targets resumed with a resumeToken) should be suppressed (buffered)
         * until the backend has caught up to this snapshot version again. This
         * prevents our cache from ever going backwards in time.
         */
        n, 
        /**
         * The number of targets persisted.
         */
        s) {
            this.highestTargetId = t, this.highestListenSequenceNumber = e, this.lastRemoteSnapshotVersion = n, 
            this.targetCount = s;
        }
    }

    /**
     * The key string used for the single object that exists in the
     * DbTargetGlobal store.
     */ Vi.key = "targetGlobalKey", Vi.store = "targetGlobal";

    /**
     * An object representing an association between a Collection id (e.g. 'messages')
     * to a parent path (e.g. '/chats/123') that contains it as a (sub)collection.
     * This is used to efficiently find all collections to query when performing
     * a Collection Group query.
     */
    class yi {
        constructor(
        /**
         * The collectionId (e.g. 'messages')
         */
        t, 
        /**
         * The path to the parent (either a document location or an empty path for
         * a root-level collection).
         */
        e) {
            this.collectionId = t, this.parent = e;
        }
    }

    /** Name of the IndexedDb object store. */ function pi(t) {
        t.createObjectStore(gi.store, {
            keyPath: gi.keyPath
        }).createIndex(gi.documentTargetsIndex, gi.documentTargetsKeyPath, {
            unique: !0
        });
        // NOTE: This is unique only because the TargetId is the suffix.
        t.createObjectStore(Pi.store, {
            keyPath: Pi.keyPath
        }).createIndex(Pi.queryTargetsIndexName, Pi.queryTargetsKeyPath, {
            unique: !0
        }), t.createObjectStore(Vi.store);
    }

    yi.store = "collectionParents", 
    /** Keys are automatically assigned via the collectionId, parent properties. */
    yi.keyPath = [ "collectionId", "parent" ];

    class bi {
        constructor(
        // Note: Previous schema versions included a field
        // "lastProcessedDocumentChangeId". Don't use anymore.
        /** The auto-generated client id assigned at client startup. */
        t, 
        /** The last time this state was updated. */
        e, 
        /** Whether the client's network connection is enabled. */
        n, 
        /** Whether this client is running in a foreground tab. */
        s) {
            this.clientId = t, this.updateTimeMs = e, this.networkEnabled = n, this.inForeground = s;
        }
    }

    /** Name of the IndexedDb object store. */ bi.store = "clientMetadata", 
    /** Keys are automatically assigned via the clientId properties. */
    bi.keyPath = "clientId";

    const vi = [ ...[ ...[ ...[ wi.store, Ei.store, Ti.store, Ai.store, Pi.store, di.store, Vi.store, gi.store ], bi.store ], Ri.store ], yi.store ];

    // V2 is no longer usable (see comment at top of file)
    // Visible for testing
    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A persisted implementation of IndexManager.
     */
    class Si {
        constructor() {
            /**
             * An in-memory copy of the index entries we've already written since the SDK
             * launched. Used to avoid re-writing the same entry repeatedly.
             *
             * This is *NOT* a complete cache of what's in persistence and so can never be used to
             * satisfy reads.
             */
            this.ho = new li;
        }
        /**
         * Adds a new entry to the collection parent index.
         *
         * Repeated calls for the same collectionPath should be avoided within a
         * transaction as IndexedDbIndexManager only caches writes once a transaction
         * has been committed.
         */    Dr(t, e) {
            if (!this.ho.has(e)) {
                const n = e.k(), s = e.M();
                t.Xn(() => {
                    // Add the collection to the in memory cache only if the transaction was
                    // successfully committed.
                    this.ho.add(e);
                });
                const i = {
                    collectionId: n,
                    parent: Ls(s)
                };
                return Di(t).put(i);
            }
            return hs.resolve();
        }
        Es(t, e) {
            const n = [], s = IDBKeyRange.bound([ e, "" ], [ k$1(e), "" ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            return Di(t).ri(s).next(t => {
                for (const s of t) {
                    // This collectionId guard shouldn't be necessary (and isn't as long
                    // as we're running in a real browser), but there's a bug in
                    // indexeddbshim that breaks our range in our tests running in node:
                    // https://github.com/axemclion/IndexedDBShim/issues/334
                    if (s.collectionId !== e) break;
                    n.push(Us(s.parent));
                }
                return n;
            });
        }
    }

    /**
     * Helper to get a typed SimpleDbStore for the collectionParents
     * document store.
     */ function Di(t) {
        return ki.zs(t, yi.store);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Offset to ensure non-overlapping target ids. */
    /**
     * Generates monotonically increasing target IDs for sending targets to the
     * watch stream.
     *
     * The client constructs two generators, one for the target cache, and one for
     * for the sync engine (to generate limbo documents targets). These
     * generators produce non-overlapping IDs (by using even and odd IDs
     * respectively).
     *
     * By separating the target ID space, the query cache can generate target IDs
     * that persist across client restarts, while sync engine can independently
     * generate in-memory target IDs that are transient and can be reused after a
     * restart.
     */
    class Ci {
        constructor(t) {
            this.lo = t;
        }
        next() {
            return this.lo += 2, this.lo;
        }
        static _o() {
            // The target cache generator must return '2' in its first call to `next()`
            // as there is no differentiation in the protocol layer between an unset
            // number and the number '0'. If we were to sent a target with target ID
            // '0', the backend would consider it unset and replace it with its own ID.
            return new Ci(0);
        }
        static fo() {
            // Sync engine assigns target IDs for limbo document detection.
            return new Ci(-1);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Ni {
        constructor(t, e) {
            this.yr = t, this.serializer = e;
        }
        // PORTING NOTE: We don't cache global metadata for the target cache, since
        // some of it (in particular `highestTargetId`) can be modified by secondary
        // tabs. We could perhaps be more granular (and e.g. still cache
        // `lastRemoteSnapshotVersion` in memory) but for simplicity we currently go
        // to IndexedDb whenever we need to read metadata. We can revisit if it turns
        // out to have a meaningful performance impact.
        do(t) {
            return this.wo(t).next(e => {
                const n = new Ci(e.highestTargetId);
                return e.highestTargetId = n.next(), this.Eo(t, e).next(() => e.highestTargetId);
            });
        }
        To(t) {
            return this.wo(t).next(t => q$1.p(new L$1(t.lastRemoteSnapshotVersion.seconds, t.lastRemoteSnapshotVersion.nanoseconds)));
        }
        Io(t) {
            return this.wo(t).next(t => t.highestListenSequenceNumber);
        }
        mo(t, e, n) {
            return this.wo(t).next(s => (s.highestListenSequenceNumber = e, n && (s.lastRemoteSnapshotVersion = n.D()), 
            e > s.highestListenSequenceNumber && (s.highestListenSequenceNumber = e), this.Eo(t, s)));
        }
        Ao(t, e) {
            return this.Ro(t, e).next(() => this.wo(t).next(n => (n.targetCount += 1, this.Po(e, n), 
            this.Eo(t, n))));
        }
        Vo(t, e) {
            return this.Ro(t, e);
        }
        yo(t, e) {
            return this.po(t, e.targetId).next(() => xi(t).delete(e.targetId)).next(() => this.wo(t)).next(e => (v$1(e.targetCount > 0), 
            e.targetCount -= 1, this.Eo(t, e)));
        }
        /**
         * Drops any targets with sequence number less than or equal to the upper bound, excepting those
         * present in `activeTargetIds`. Document associations for the removed targets are also removed.
         * Returns the number of targets removed.
         */    mr(t, e, n) {
            let s = 0;
            const i = [];
            return xi(t).ui((r, o) => {
                const c = Ys(o);
                c.sequenceNumber <= e && null === n.get(c.targetId) && (s++, i.push(this.yo(t, c)));
            }).next(() => hs.Ln(i)).next(() => s);
        }
        /**
         * Call provided function with each `TargetData` that we have cached.
         */    Le(t, e) {
            return xi(t).ui((t, n) => {
                const s = Ys(n);
                e(s);
            });
        }
        wo(t) {
            return Oi(t).get(Vi.key).next(t => (v$1(null !== t), t));
        }
        Eo(t, e) {
            return Oi(t).put(Vi.key, e);
        }
        Ro(t, e) {
            return xi(t).put(Xs(this.serializer, e));
        }
        /**
         * In-place updates the provided metadata to account for values in the given
         * TargetData. Saving is done separately. Returns true if there were any
         * changes to the metadata.
         */    Po(t, e) {
            let n = !1;
            return t.targetId > e.highestTargetId && (e.highestTargetId = t.targetId, n = !0), 
            t.sequenceNumber > e.highestListenSequenceNumber && (e.highestListenSequenceNumber = t.sequenceNumber, 
            n = !0), n;
        }
        bo(t) {
            return this.wo(t).next(t => t.targetCount);
        }
        vo(t, e) {
            // Iterating by the canonicalId may yield more than one result because
            // canonicalId values are not required to be unique per target. This query
            // depends on the queryTargets index to be efficient.
            const n = Z$1(e), s = IDBKeyRange.bound([ n, Number.NEGATIVE_INFINITY ], [ n, Number.POSITIVE_INFINITY ]);
            let i = null;
            return xi(t).ui({
                range: s,
                index: Pi.queryTargetsIndexName
            }, (t, n, s) => {
                const r = Ys(n);
                // After finding a potential match, check that the target is
                // actually equal to the requested target.
                            et(e, r.target) && (i = r, s.done());
            }).next(() => i);
        }
        So(t, e, n) {
            // PORTING NOTE: The reverse index (documentsTargets) is maintained by
            // IndexedDb.
            const s = [], i = Fi(t);
            return e.forEach(e => {
                const r = Ls(e.path);
                s.push(i.put(new gi(n, r))), s.push(this.yr.Do(t, n, e));
            }), hs.Ln(s);
        }
        Co(t, e, n) {
            // PORTING NOTE: The reverse index (documentsTargets) is maintained by
            // IndexedDb.
            const s = Fi(t);
            return hs.forEach(e, e => {
                const i = Ls(e.path);
                return hs.Ln([ s.delete([ n, i ]), this.yr.No(t, n, e) ]);
            });
        }
        po(t, e) {
            const n = Fi(t), s = IDBKeyRange.bound([ e ], [ e + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            return n.delete(s);
        }
        xo(t, e) {
            const n = IDBKeyRange.bound([ e ], [ e + 1 ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0), s = Fi(t);
            let i = Pt();
            return s.ui({
                range: n,
                ai: !0
            }, (t, e, n) => {
                const s = Us(t[1]), r = new W$1(s);
                i = i.add(r);
            }).next(() => i);
        }
        Kr(t, e) {
            const n = Ls(e.path), s = IDBKeyRange.bound([ n ], [ k$1(n) ], 
            /*lowerOpen=*/ !1, 
            /*upperOpen=*/ !0);
            let i = 0;
            return Fi(t).ui({
                index: gi.documentTargetsIndex,
                ai: !0,
                range: s
            }, ([t, e], n, s) => {
                // Having a sentinel row for a document does not count as containing that document;
                // For the target cache, containing the document means the document is part of some
                // target.
                0 !== t && (i++, s.done());
            }).next(() => i > 0);
        }
        /**
         * Looks up a TargetData entry by target ID.
         *
         * @param targetId The target ID of the TargetData entry to look up.
         * @return The cached TargetData entry, or null if the cache has no entry for
         * the target.
         */
        // PORTING NOTE: Multi-tab only.
        Je(t, e) {
            return xi(t).get(e).next(t => t ? Ys(t) : null);
        }
    }

    /**
     * Helper to get a typed SimpleDbStore for the queries object store.
     */ function xi(t) {
        return ki.zs(t, Pi.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the target globals object store.
     */ function Oi(t) {
        return ki.zs(t, Vi.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the document target object store.
     */ function Fi(t) {
        return ki.zs(t, gi.store);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Mi = "Failed to obtain exclusive access to the persistence layer. To allow shared access, make sure to invoke `enablePersistence()` with `synchronizeTabs:true` in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.";

    /**
     * Oldest acceptable age in milliseconds for client metadata before the client
     * is considered inactive and its associated data is garbage collected.
     */ class $i extends fs {
        constructor(t, e) {
            super(), this.Lr = t, this.Oo = e;
        }
    }

    /**
     * An IndexedDB-backed instance of Persistence. Data is stored persistently
     * across sessions.
     *
     * On Web only, the Firestore SDKs support shared access to its persistence
     * layer. This allows multiple browser tabs to read and write to IndexedDb and
     * to synchronize state even without network connectivity. Shared access is
     * currently optional and not enabled unless all clients invoke
     * `enablePersistence()` with `{synchronizeTabs:true}`.
     *
     * In multi-tab mode, if multiple clients are active at the same time, the SDK
     * will designate one client as the “primary client”. An effort is made to pick
     * a visible, network-connected and active client, and this client is
     * responsible for letting other clients know about its presence. The primary
     * client writes a unique client-generated identifier (the client ID) to
     * IndexedDb’s “owner” store every 4 seconds. If the primary client fails to
     * update this entry, another client can acquire the lease and take over as
     * primary.
     *
     * Some persistence operations in the SDK are designated as primary-client only
     * operations. This includes the acknowledgment of mutations and all updates of
     * remote documents. The effects of these operations are written to persistence
     * and then broadcast to other tabs via LocalStorage (see
     * `WebStorageSharedClientState`), which then refresh their state from
     * persistence.
     *
     * Similarly, the primary client listens to notifications sent by secondary
     * clients to discover persistence changes written by secondary clients, such as
     * the addition of new mutations and query targets.
     *
     * If multi-tab is not enabled and another tab already obtained the primary
     * lease, IndexedDbPersistence enters a failed state and all subsequent
     * operations will automatically fail.
     *
     * Additionally, there is an optimization so that when a tab is closed, the
     * primary lease is released immediately (this is especially important to make
     * sure that a refreshed tab is able to immediately re-acquire the primary
     * lease). Unfortunately, IndexedDB cannot be reliably used in window.unload
     * since it is an asynchronous API. So in addition to attempting to give up the
     * lease, the leaseholder writes its client ID to a "zombiedClient" entry in
     * LocalStorage which acts as an indicator that another tab should go ahead and
     * take the primary lease immediately regardless of the current lease timestamp.
     *
     * TODO(b/114226234): Remove `synchronizeTabs` section when multi-tab is no
     * longer optional.
     */ class ki {
        constructor(
        /**
         * Whether to synchronize the in-memory state of multiple tabs and share
         * access to local persistence.
         */
        t, e, n, s, i, r, o, c, a, 
        /**
         * If set to true, forcefully obtains database access. Existing tabs will
         * no longer be able to access IndexedDB.
         */
        u) {
            if (this.allowTabSynchronization = t, this.persistenceKey = e, this.clientId = n, 
            this.vs = i, this.window = r, this.document = o, this.Fo = a, this.Mo = u, this.$o = null, 
            this.ko = !1, this.isPrimary = !1, this.networkEnabled = !0, 
            /** Our window.unload handler, if registered. */
            this.Lo = null, this.inForeground = !1, 
            /** Our 'visibilitychange' listener if registered. */
            this.qo = null, 
            /** The client metadata refresh task. */
            this.Bo = null, 
            /** The last time we garbage collected the client metadata object store. */
            this.Uo = Number.NEGATIVE_INFINITY, 
            /** A listener to notify on primary state changes. */
            this.Ko = t => Promise.resolve(), !ki.Qs()) throw new C$1(D$1.UNIMPLEMENTED, "This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");
            this.yr = new Bi(this, s), this.Qo = e + "main", this.serializer = new Ks(c), this.Wo = new ms(this.Qo, 10, new _i(this.serializer)), 
            this.jo = new Ni(this.yr, this.serializer), this.ns = new Si, this.ts = new ri(this.serializer, this.ns), 
            this.window && this.window.localStorage ? this.Go = this.window.localStorage : (this.Go = null, 
            !1 === u && V$1("IndexedDbPersistence", "LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."));
        }
        static zs(t, e) {
            if (t instanceof $i) return ms.zs(t.Lr, e);
            throw b();
        }
        /**
         * Attempt to start IndexedDb persistence.
         *
         * @return {Promise<void>} Whether persistence was enabled.
         */    start() {
            // NOTE: This is expected to fail sometimes (in the case of another tab
            // already having the persistence lock), so it's the first thing we should
            // do.
            return this.zo().then(() => {
                if (!this.isPrimary && !this.allowTabSynchronization) 
                // Fail `start()` if `synchronizeTabs` is disabled and we cannot
                // obtain the primary lease.
                throw new C$1(D$1.FAILED_PRECONDITION, Mi);
                return this.Ho(), this.Jo(), this.Yo(), this.runTransaction("getHighestListenSequenceNumber", "readonly", t => this.jo.Io(t));
            }).then(t => {
                this.$o = new Es(t, this.Fo);
            }).then(() => {
                this.ko = !0;
            }).catch(t => (this.Wo && this.Wo.close(), Promise.reject(t)));
        }
        /**
         * Registers a listener that gets called when the primary state of the
         * instance changes. Upon registering, this listener is invoked immediately
         * with the current primary state.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    Xo(t) {
            return this.Ko = async e => {
                if (this.lr) return t(e);
            }, t(this.isPrimary);
        }
        /**
         * Registers a listener that gets called when the database receives a
         * version change event indicating that it has deleted.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    Zo(t) {
            this.Wo.Ys(async e => {
                // Check if an attempt is made to delete IndexedDB.
                null === e.newVersion && await t();
            });
        }
        /**
         * Adjusts the current network state in the client's metadata, potentially
         * affecting the primary lease.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    tc(t) {
            this.networkEnabled !== t && (this.networkEnabled = t, 
            // Schedule a primary lease refresh for immediate execution. The eventual
            // lease update will be propagated via `primaryStateListener`.
            this.vs.Ii(async () => {
                this.lr && await this.zo();
            }));
        }
        /**
         * Updates the client metadata in IndexedDb and attempts to either obtain or
         * extend the primary lease for the local client. Asynchronously notifies the
         * primary state listener if the client either newly obtained or released its
         * primary lease.
         */    zo() {
            return this.runTransaction("updateClientMetadataAndTryBecomePrimary", "readwrite", t => qi(t).put(new bi(this.clientId, Date.now(), this.networkEnabled, this.inForeground)).next(() => {
                if (this.isPrimary) return this.ec(t).next(t => {
                    t || (this.isPrimary = !1, this.vs.xi(() => this.Ko(!1)));
                });
            }).next(() => this.nc(t)).next(e => this.isPrimary && !e ? this.sc(t).next(() => !1) : !!e && this.ic(t).next(() => !0))).catch(t => {
                if (Ps(t)) 
                // Proceed with the existing state. Any subsequent access to
                // IndexedDB will verify the lease.
                return g$1("IndexedDbPersistence", "Failed to extend owner lease: ", t), this.isPrimary;
                if (!this.allowTabSynchronization) throw t;
                return g$1("IndexedDbPersistence", "Releasing owner lease after error during lease refresh", t), 
                /* isPrimary= */ !1;
            }).then(t => {
                this.isPrimary !== t && this.vs.xi(() => this.Ko(t)), this.isPrimary = t;
            });
        }
        ec(t) {
            return Li(t).get(di.key).next(t => hs.resolve(this.rc(t)));
        }
        oc(t) {
            return qi(t).delete(this.clientId);
        }
        /**
         * If the garbage collection threshold has passed, prunes the
         * RemoteDocumentChanges and the ClientMetadata store based on the last update
         * time of all clients.
         */    async cc() {
            if (this.isPrimary && !this.ac(this.Uo, 18e5)) {
                this.Uo = Date.now();
                const t = await this.runTransaction("maybeGarbageCollectMultiClientState", "readwrite-primary", t => {
                    const e = ki.zs(t, bi.store);
                    return e.ri().next(t => {
                        const n = this.uc(t, 18e5), s = t.filter(t => -1 === n.indexOf(t));
                        // Delete metadata for clients that are no longer considered active.
                        return hs.forEach(s, t => e.delete(t.clientId)).next(() => s);
                    });
                }).catch(() => []);
                // Delete potential leftover entries that may continue to mark the
                // inactive clients as zombied in LocalStorage.
                // Ideally we'd delete the IndexedDb and LocalStorage zombie entries for
                // the client atomically, but we can't. So we opt to delete the IndexedDb
                // entries first to avoid potentially reviving a zombied client.
                            if (this.Go) for (const e of t) this.Go.removeItem(this.hc(e.clientId));
            }
        }
        /**
         * Schedules a recurring timer to update the client metadata and to either
         * extend or acquire the primary lease if the client is eligible.
         */    Yo() {
            this.Bo = this.vs.Ls("client_metadata_refresh" /* ClientMetadataRefresh */ , 4e3, () => this.zo().then(() => this.cc()).then(() => this.Yo()));
        }
        /** Checks whether `client` is the local client. */    rc(t) {
            return !!t && t.ownerId === this.clientId;
        }
        /**
         * Evaluate the state of all active clients and determine whether the local
         * client is or can act as the holder of the primary lease. Returns whether
         * the client is eligible for the lease, but does not actually acquire it.
         * May return 'false' even if there is no active leaseholder and another
         * (foreground) client should become leaseholder instead.
         */    nc(t) {
            if (this.Mo) return hs.resolve(!0);
            return Li(t).get(di.key).next(e => {
                // A client is eligible for the primary lease if:
                // - its network is enabled and the client's tab is in the foreground.
                // - its network is enabled and no other client's tab is in the
                //   foreground.
                // - every clients network is disabled and the client's tab is in the
                //   foreground.
                // - every clients network is disabled and no other client's tab is in
                //   the foreground.
                // - the `forceOwningTab` setting was passed in.
                if (null !== e && this.ac(e.leaseTimestampMs, 5e3) && !this.lc(e.ownerId)) {
                    if (this.rc(e) && this.networkEnabled) return !0;
                    if (!this.rc(e)) {
                        if (!e.allowTabSynchronization) 
                        // Fail the `canActAsPrimary` check if the current leaseholder has
                        // not opted into multi-tab synchronization. If this happens at
                        // client startup, we reject the Promise returned by
                        // `enablePersistence()` and the user can continue to use Firestore
                        // with in-memory persistence.
                        // If this fails during a lease refresh, we will instead block the
                        // AsyncQueue from executing further operations. Note that this is
                        // acceptable since mixing & matching different `synchronizeTabs`
                        // settings is not supported.
                        // TODO(b/114226234): Remove this check when `synchronizeTabs` can
                        // no longer be turned off.
                        throw new C$1(D$1.FAILED_PRECONDITION, Mi);
                        return !1;
                    }
                }
                return !(!this.networkEnabled || !this.inForeground) || qi(t).ri().next(t => void 0 === this.uc(t, 5e3).find(t => {
                    if (this.clientId !== t.clientId) {
                        const e = !this.networkEnabled && t.networkEnabled, n = !this.inForeground && t.inForeground, s = this.networkEnabled === t.networkEnabled;
                        if (e || n && s) return !0;
                    }
                    return !1;
                }));
            }).next(t => (this.isPrimary !== t && g$1("IndexedDbPersistence", `Client ${t ? "is" : "is not"} eligible for a primary lease.`), 
            t));
        }
        async _c() {
            // The shutdown() operations are idempotent and can be called even when
            // start() aborted (e.g. because it couldn't acquire the persistence lease).
            this.ko = !1, this.fc(), this.Bo && (this.Bo.cancel(), this.Bo = null), this.dc(), 
            this.wc(), 
            // Use `SimpleDb.runTransaction` directly to avoid failing if another tab
            // has obtained the primary lease.
            await this.Wo.runTransaction("readwrite", [ di.store, bi.store ], t => {
                const e = new $i(t, Es.bs);
                return this.sc(e).next(() => this.oc(e));
            }), this.Wo.close(), 
            // Remove the entry marking the client as zombied from LocalStorage since
            // we successfully deleted its metadata from IndexedDb.
            this.Ec();
        }
        /**
         * Returns clients that are not zombied and have an updateTime within the
         * provided threshold.
         */    uc(t, e) {
            return t.filter(t => this.ac(t.updateTimeMs, e) && !this.lc(t.clientId));
        }
        /**
         * Returns the IDs of the clients that are currently active. If multi-tab
         * is not supported, returns an array that only contains the local client's
         * ID.
         *
         * PORTING NOTE: This is only used for Web multi-tab.
         */    Tc() {
            return this.runTransaction("getActiveClients", "readonly", t => qi(t).ri().next(t => this.uc(t, 18e5).map(t => t.clientId)));
        }
        get lr() {
            return this.ko;
        }
        Ic(t) {
            return Zs.br(t, this.serializer, this.ns, this.yr);
        }
        mc() {
            return this.jo;
        }
        Ac() {
            return this.ts;
        }
        Rc() {
            return this.ns;
        }
        runTransaction(t, e, n) {
            g$1("IndexedDbPersistence", "Starting transaction:", t);
            const s = "readonly" === e ? "readonly" : "readwrite";
            let i;
            // Do all transactions as readwrite against all object stores, since we
            // are the only reader/writer.
                    return this.Wo.runTransaction(s, vi, s => (i = new $i(s, this.$o ? this.$o.next() : Es.bs), 
            "readwrite-primary" === e ? this.ec(i).next(t => !!t || this.nc(i)).next(e => {
                if (!e) throw V$1(`Failed to obtain primary lease for action '${t}'.`), this.isPrimary = !1, 
                this.vs.xi(() => this.Ko(!1)), new C$1(D$1.FAILED_PRECONDITION, _s);
                return n(i);
            }).next(t => this.ic(i).next(() => t)) : this.Pc(i).next(() => n(i)))).then(t => (i.Zn(), 
            t));
        }
        /**
         * Verifies that the current tab is the primary leaseholder or alternatively
         * that the leaseholder has opted into multi-tab synchronization.
         */
        // TODO(b/114226234): Remove this check when `synchronizeTabs` can no longer
        // be turned off.
        Pc(t) {
            return Li(t).get(di.key).next(t => {
                if (null !== t && this.ac(t.leaseTimestampMs, 5e3) && !this.lc(t.ownerId) && !this.rc(t) && !(this.Mo || this.allowTabSynchronization && t.allowTabSynchronization)) throw new C$1(D$1.FAILED_PRECONDITION, Mi);
            });
        }
        /**
         * Obtains or extends the new primary lease for the local client. This
         * method does not verify that the client is eligible for this lease.
         */    ic(t) {
            const e = new di(this.clientId, this.allowTabSynchronization, Date.now());
            return Li(t).put(di.key, e);
        }
        static Qs() {
            return ms.Qs();
        }
        /** Checks the primary lease and removes it if we are the current primary. */    sc(t) {
            const e = Li(t);
            return e.get(di.key).next(t => this.rc(t) ? (g$1("IndexedDbPersistence", "Releasing primary lease."), 
            e.delete(di.key)) : hs.resolve());
        }
        /** Verifies that `updateTimeMs` is within `maxAgeMs`. */    ac(t, e) {
            const n = Date.now();
            return !(t < n - e) && (!(t > n) || (V$1(`Detected an update time that is in the future: ${t} > ${n}`), 
            !1));
        }
        Ho() {
            null !== this.document && "function" == typeof this.document.addEventListener && (this.qo = () => {
                this.vs.Ii(() => (this.inForeground = "visible" === this.document.visibilityState, 
                this.zo()));
            }, this.document.addEventListener("visibilitychange", this.qo), this.inForeground = "visible" === this.document.visibilityState);
        }
        dc() {
            this.qo && (this.document.removeEventListener("visibilitychange", this.qo), this.qo = null);
        }
        /**
         * Attaches a window.unload handler that will synchronously write our
         * clientId to a "zombie client id" location in LocalStorage. This can be used
         * by tabs trying to acquire the primary lease to determine that the lease
         * is no longer valid even if the timestamp is recent. This is particularly
         * important for the refresh case (so the tab correctly re-acquires the
         * primary lease). LocalStorage is used for this rather than IndexedDb because
         * it is a synchronous API and so can be used reliably from  an unload
         * handler.
         */    Jo() {
            var t;
            "function" == typeof (null === (t = this.window) || void 0 === t ? void 0 : t.addEventListener) && (this.Lo = () => {
                // Note: In theory, this should be scheduled on the AsyncQueue since it
                // accesses internal state. We execute this code directly during shutdown
                // to make sure it gets a chance to run.
                this.fc(), this.vs.Ii(() => this._c());
            }, this.window.addEventListener("unload", this.Lo));
        }
        wc() {
            this.Lo && (this.window.removeEventListener("unload", this.Lo), this.Lo = null);
        }
        /**
         * Returns whether a client is "zombied" based on its LocalStorage entry.
         * Clients become zombied when their tab closes without running all of the
         * cleanup logic in `shutdown()`.
         */    lc(t) {
            var e;
            try {
                const n = null !== (null === (e = this.Go) || void 0 === e ? void 0 : e.getItem(this.hc(t)));
                return g$1("IndexedDbPersistence", `Client '${t}' ${n ? "is" : "is not"} zombied in LocalStorage`), 
                n;
            } catch (t) {
                // Gracefully handle if LocalStorage isn't working.
                return V$1("IndexedDbPersistence", "Failed to get zombied client id.", t), !1;
            }
        }
        /**
         * Record client as zombied (a client that had its tab closed). Zombied
         * clients are ignored during primary tab selection.
         */    fc() {
            if (this.Go) try {
                this.Go.setItem(this.hc(this.clientId), String(Date.now()));
            } catch (t) {
                // Gracefully handle if LocalStorage isn't available / working.
                V$1("Failed to set zombie client id.", t);
            }
        }
        /** Removes the zombied client entry if it exists. */    Ec() {
            if (this.Go) try {
                this.Go.removeItem(this.hc(this.clientId));
            } catch (t) {
                // Ignore
            }
        }
        hc(t) {
            return `firestore_zombie_${this.persistenceKey}_${t}`;
        }
    }

    /**
     * Helper to get a typed SimpleDbStore for the primary client object store.
     */ function Li(t) {
        return ki.zs(t, di.store);
    }

    /**
     * Helper to get a typed SimpleDbStore for the client metadata object store.
     */ function qi(t) {
        return ki.zs(t, bi.store);
    }

    /** Provides LRU functionality for IndexedDB persistence. */ class Bi {
        constructor(t, e) {
            this.db = t, this.cr = new ks(this, e);
        }
        Er(t) {
            const e = this.gc(t);
            return this.db.mc().bo(t).next(t => e.next(e => t + e));
        }
        gc(t) {
            let e = 0;
            return this.Ir(t, t => {
                e++;
            }).next(() => e);
        }
        Le(t, e) {
            return this.db.mc().Le(t, e);
        }
        Ir(t, e) {
            return this.Vc(t, (t, n) => e(n));
        }
        Do(t, e, n) {
            return Ui(t, n);
        }
        No(t, e, n) {
            return Ui(t, n);
        }
        mr(t, e, n) {
            return this.db.mc().mr(t, e, n);
        }
        Br(t, e) {
            return Ui(t, e);
        }
        /**
         * Returns true if anything would prevent this document from being garbage
         * collected, given that the document in question is not present in any
         * targets and has a sequence number less than or equal to the upper bound for
         * the collection run.
         */    yc(t, e) {
            return function(t, e) {
                let n = !1;
                return ii(t).hi(s => ti(t, s, e).next(t => (t && (n = !0), hs.resolve(!t)))).next(() => n);
            }(t, e);
        }
        Ar(t, e) {
            const n = this.db.Ac().so(), s = [];
            let i = 0;
            return this.Vc(t, (r, o) => {
                if (o <= e) {
                    const e = this.yc(t, r).next(e => {
                        if (!e) 
                        // Our size accounting requires us to read all documents before
                        // removing them.
                        return i++, n.Gn(t, r).next(() => (n.jn(r), Fi(t).delete([ 0, Ls(r.path) ])));
                    });
                    s.push(e);
                }
            }).next(() => hs.Ln(s)).next(() => n.apply(t)).next(() => i);
        }
        removeTarget(t, e) {
            const n = e.lt(t.Oo);
            return this.db.mc().Vo(t, n);
        }
        bc(t, e) {
            return Ui(t, e);
        }
        /**
         * Call provided function for each document in the cache that is 'orphaned'. Orphaned
         * means not a part of any target, so the only entry in the target-document index for
         * that document will be the sentinel row (targetId 0), which will also have the sequence
         * number for the last time the document was accessed.
         */    Vc(t, e) {
            const n = Fi(t);
            let s, i = Es.bs;
            return n.ui({
                index: gi.documentTargetsIndex
            }, ([t, n], {path: r, sequenceNumber: o}) => {
                0 === t ? (
                // if nextToReport is valid, report it, this is a new key so the
                // last one must not be a member of any targets.
                i !== Es.bs && e(new W$1(Us(s)), i), 
                // set nextToReport to be this sequence number. It's the next one we
                // might report, if we don't find any targets for this document.
                // Note that the sequence number must be defined when the targetId
                // is 0.
                i = o, s = r) : 
                // set nextToReport to be invalid, we know we don't need to report
                // this one since we found a target for it.
                i = Es.bs;
            }).next(() => {
                // Since we report sequence numbers after getting to the next key, we
                // need to check if the last key we iterated over was an orphaned
                // document and report it.
                i !== Es.bs && e(new W$1(Us(s)), i);
            });
        }
        Pr(t) {
            return this.db.Ac().oo(t);
        }
    }

    function Ui(t, e) {
        return Fi(t).put(
        /**
     * @return A value suitable for writing a sentinel row in the target-document
     * store.
     */
        function(t, e) {
            return new gi(0, Ls(t.path), e);
        }(e, t.Oo));
    }

    /**
     * Generates a string used as a prefix when storing data in IndexedDB and
     * LocalStorage.
     */ function Ki(t, e) {
        // Use two different prefix formats:
        //   * firestore / persistenceKey / projectID . databaseID / ...
        //   * firestore / persistenceKey / projectID / ...
        // projectIDs are DNS-compatible names and cannot contain dots
        // so there's no danger of collisions.
        let n = t.projectId;
        return t.it || (n += "." + t.database), "firestore/" + e + "/" + n + "/";
    }

    async function Qi(t) {
        if (!ms.Qs()) return Promise.resolve();
        const e = t + "main";
        await ms.delete(e);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Implements `LocalStore` interface.
     *
     * Note: some field defined in this class might have public access level, but
     * the class is not exported so they are only accessible from this module.
     * This is useful to implement optional features (like bundles) in free
     * functions, such that they are tree-shakeable.
     */
    class Wi {
        constructor(
        /** Manages our in-memory or durable persistence. */
        t, e, n) {
            this.persistence = t, this.vc = e, 
            /**
             * Maps a targetID to data about its target.
             *
             * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
             * of `applyRemoteEvent()` idempotent.
             */
            this.Sc = new ht(M$1), 
            /** Maps a target to its targetID. */
            // TODO(wuandy): Evaluate if TargetId can be part of Target.
            this.Dc = new us(t => Z$1(t), et), 
            /**
             * The read time of the last entry processed by `getNewDocumentChanges()`.
             *
             * PORTING NOTE: This is only used for multi-tab synchronization.
             */
            this.Cc = q$1.min(), this.es = t.Ic(n), this.Nc = t.Ac(), this.jo = t.mc(), this.xc = new ds(this.Nc, this.es, this.persistence.Rc()), 
            this.vc.Oc(this.xc);
        }
        _r(t) {
            return this.persistence.runTransaction("Collect garbage", "readwrite-primary", e => t.Rr(e, this.Sc));
        }
    }

    /**
     * Tells the LocalStore that the currently authenticated user has changed.
     *
     * In response the local store switches the mutation queue to the new user and
     * returns any resulting document changes.
     */
    // PORTING NOTE: Android and iOS only return the documents affected by the
    // change.
    async function ji(t, e) {
        const n = S$1(t);
        let s = n.es, i = n.xc;
        const r = await n.persistence.runTransaction("Handle user change", "readonly", t => {
            // Swap out the mutation queue, grabbing the pending mutation batches
            // before and after.
            let r;
            return n.es.Mr(t).next(o => (r = o, s = n.persistence.Ic(e), 
            // Recreate our LocalDocumentsView using the new
            // MutationQueue.
            i = new ds(n.Nc, s, n.persistence.Rc()), s.Mr(t))).next(e => {
                const n = [], s = [];
                // Union the old/new changed keys.
                let o = Pt();
                for (const t of r) {
                    n.push(t.batchId);
                    for (const e of t.mutations) o = o.add(e.key);
                }
                for (const t of e) {
                    s.push(t.batchId);
                    for (const e of t.mutations) o = o.add(e.key);
                }
                // Return the set of all (potentially) changed documents and the list
                // of mutation batch IDs that were affected by change.
                            return i.us(t, o).next(t => ({
                    Fc: t,
                    Mc: n,
                    $c: s
                }));
            });
        });
        return n.es = s, n.xc = i, n.vc.Oc(n.xc), r;
    }

    /* Accepts locally generated Mutations and commit them to storage. */
    /**
     * Acknowledges the given batch.
     *
     * On the happy path when a batch is acknowledged, the local store will
     *
     *  + remove the batch from the mutation queue;
     *  + apply the changes to the remote document cache;
     *  + recalculate the latency compensated view implied by those changes (there
     *    may be mutations in the queue that affect the documents but haven't been
     *    acknowledged yet); and
     *  + give the changed documents back the sync engine
     *
     * @returns The resulting (modified) documents.
     */
    function Gi(t, e) {
        const n = S$1(t);
        return n.persistence.runTransaction("Acknowledge batch", "readwrite-primary", t => {
            const s = e.batch.keys(), i = n.Nc.so({
                ro: !0
            });
            return function(t, e, n, s) {
                const i = n.batch, r = i.keys();
                let o = hs.resolve();
                return r.forEach(t => {
                    o = o.next(() => s.Gn(e, t)).next(e => {
                        let r = e;
                        const o = n.bn.get(t);
                        v$1(null !== o), (!r || r.version.v(o) < 0) && (r = i.Pn(t, r, n), r && 
                        // We use the commitVersion as the readTime rather than the
                        // document's updateTime since the updateTime is not advanced
                        // for updates that do not modify the underlying document.
                        s.Qn(r, n.pn));
                    });
                }), o.next(() => t.es.kr(e, i));
            }
            /** Returns the local view of the documents affected by a mutation batch. */
            // PORTING NOTE: Multi-Tab only.
            (n, t, e, i).next(() => i.apply(t)).next(() => n.es.Ur(t)).next(() => n.xc.us(t, s));
        });
    }

    /**
     * Removes mutations from the MutationQueue for the specified batch;
     * LocalDocuments will be recalculated.
     *
     * @returns The resulting modified documents.
     */
    /**
     * Returns the last consistent snapshot processed (used by the RemoteStore to
     * determine whether to buffer incoming snapshots from the backend).
     */
    function zi(t) {
        const e = S$1(t);
        return e.persistence.runTransaction("Get last remote snapshot version", "readonly", t => e.jo.To(t));
    }

    /**
     * Updates the "ground-state" (remote) documents. We assume that the remote
     * event reflects any write batches that have been acknowledged or rejected
     * (i.e. we do not re-apply local mutations to updates from this event).
     *
     * LocalDocuments are re-calculated if there are remaining mutations in the
     * queue.
     */ function Hi(t, e) {
        const n = S$1(t), s = e.ht;
        let i = n.Sc;
        return n.persistence.runTransaction("Apply remote event", "readwrite-primary", t => {
            const r = n.Nc.so({
                ro: !0
            });
            // Reset newTargetDataByTargetMap in case this transaction gets re-run.
                    i = n.Sc;
            const o = [];
            e.ne.forEach((e, r) => {
                const c = i.get(r);
                if (!c) return;
                // Only update the remote keys if the target is still active. This
                // ensures that we can persist the updated target data along with
                // the updated assignment.
                            o.push(n.jo.Co(t, e.le, r).next(() => n.jo.So(t, e.ue, r)));
                const a = e.resumeToken;
                // Update the resume token if the change includes one.
                            if (a.ct() > 0) {
                    const u = c._t(a, s).lt(t.Oo);
                    i = i.dt(r, u), 
                    // Update the target data if there are target changes (or if
                    // sufficient time has passed since the last update).
                    /**
     * Returns true if the newTargetData should be persisted during an update of
     * an active target. TargetData should always be persisted when a target is
     * being released and should not call this function.
     *
     * While the target is active, TargetData updates can be omitted when nothing
     * about the target has changed except metadata like the resume token or
     * snapshot version. Occasionally it's worth the extra write to prevent these
     * values from getting too stale after a crash, but this doesn't have to be
     * too frequent.
     */
                    function(t, e, n) {
                        // Always persist target data if we don't already have a resume token.
                        if (v$1(e.resumeToken.ct() > 0), 0 === t.resumeToken.ct()) return !0;
                        // Don't allow resume token changes to be buffered indefinitely. This
                        // allows us to be reasonably up-to-date after a crash and avoids needing
                        // to loop over all active queries on shutdown. Especially in the browser
                        // we may not get time to do anything interesting while the current tab is
                        // closing.
                                            if (e.ht.S() - t.ht.S() >= 3e8) return !0;
                        // Otherwise if the only thing that has changed about a target is its resume
                        // token it's not worth persisting. Note that the RemoteStore keeps an
                        // in-memory view of the currently active targets which includes the current
                        // resume token, so stream failure or user changes will still use an
                        // up-to-date resume token regardless of what we do here.
                                            return n.ue.size + n.he.size + n.le.size > 0;
                    }
                    /**
     * Notifies local store of the changed views to locally pin documents.
     */ (c, u, e) && o.push(n.jo.Vo(t, u));
                }
            });
            let c = Et(), a = Pt();
            // HACK: The only reason we allow a null snapshot version is so that we
            // can synthesize remote events when we get permission denied errors while
            // trying to resolve the state of a locally cached document that is in
            // limbo.
            if (e.ie.forEach((t, e) => {
                a = a.add(t);
            }), 
            // Each loop iteration only affects its "own" doc, so it's safe to get all the remote
            // documents in advance in a single call.
            o.push(r.getEntries(t, a).next(i => {
                e.ie.forEach((a, u) => {
                    const h = i.get(a);
                    // Note: The order of the steps below is important, since we want
                    // to ensure that rejected limbo resolutions (which fabricate
                    // NoDocuments with SnapshotVersion.min()) never add documents to
                    // cache.
                                    u instanceof bn && u.version.isEqual(q$1.min()) ? (
                    // NoDocuments with SnapshotVersion.min() are used in manufactured
                    // events. We remove these documents from cache since we lost
                    // access.
                    r.jn(a, s), c = c.dt(a, u)) : null == h || u.version.v(h.version) > 0 || 0 === u.version.v(h.version) && h.hasPendingWrites ? (r.Qn(u, s), 
                    c = c.dt(a, u)) : g$1("LocalStore", "Ignoring outdated watch update for ", a, ". Current version:", h.version, " Watch version:", u.version), 
                    e.re.has(a) && o.push(n.persistence.yr.bc(t, a));
                });
            })), !s.isEqual(q$1.min())) {
                const e = n.jo.To(t).next(e => n.jo.mo(t, t.Oo, s));
                o.push(e);
            }
            return hs.Ln(o).next(() => r.apply(t)).next(() => n.xc.hs(t, c));
        }).then(t => (n.Sc = i, t));
    }

    /**
     * Gets the mutation batch after the passed in batchId in the mutation queue
     * or null if empty.
     * @param afterBatchId If provided, the batch to search after.
     * @returns The next mutation or null if there wasn't one.
     */
    function Ji(t, e) {
        const n = S$1(t);
        return n.persistence.runTransaction("Get next mutation batch", "readonly", t => (void 0 === e && (e = -1), 
        n.es.Or(t, e)));
    }

    /**
     * Reads the current value of a Document with a given key or null if not
     * found - used for testing.
     */
    /**
     * Assigns the given target an internal ID so that its results can be pinned so
     * they don't get GC'd. A target must be allocated in the local store before
     * the store can be used to manage its view.
     *
     * Allocating an already allocated `Target` will return the existing `TargetData`
     * for that `Target`.
     */
    function Yi(t, e) {
        const n = S$1(t);
        return n.persistence.runTransaction("Allocate target", "readwrite", t => {
            let s;
            return n.jo.vo(t, e).next(i => i ? (
            // This target has been listened to previously, so reuse the
            // previous targetID.
            // TODO(mcg): freshen last accessed date?
            s = i, hs.resolve(s)) : n.jo.do(t).next(i => (s = new it(e, i, 0 /* Listen */ , t.Oo), 
            n.jo.Ao(t, s).next(() => s))));
        }).then(t => {
            // If Multi-Tab is enabled, the existing target data may be newer than
            // the in-memory data
            const s = n.Sc.get(t.targetId);
            return (null === s || t.ht.v(s.ht) > 0) && (n.Sc = n.Sc.dt(t.targetId, t), n.Dc.set(e, t.targetId)), 
            t;
        });
    }

    /**
     * Returns the TargetData as seen by the LocalStore, including updates that may
     * have not yet been persisted to the TargetCache.
     */
    // Visible for testing.
    /**
     * Unpins all the documents associated with the given target. If
     * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
     * directly removes the associated target data from the target cache.
     *
     * Releasing a non-existing `Target` is a no-op.
     */
    // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
    async function Xi(t, e, n) {
        const s = S$1(t), i = s.Sc.get(e), r = n ? "readwrite" : "readwrite-primary";
        try {
            n || await s.persistence.runTransaction("Release target", r, t => s.persistence.yr.removeTarget(t, i));
        } catch (t) {
            if (!Ps(t)) throw t;
            // All `releaseTarget` does is record the final metadata state for the
            // target, but we've been recording this periodically during target
            // activity. If we lose this write this could cause a very slight
            // difference in the order of target deletion during GC, but we
            // don't define exact LRU semantics so this is acceptable.
            g$1("LocalStore", `Failed to update sequence numbers for target ${e}: ${t}`);
        }
        s.Sc = s.Sc.remove(e), s.Dc.delete(i.target);
    }

    /**
     * Runs the specified query against the local store and returns the results,
     * potentially taking advantage of query data from previous executions (such
     * as the set of remote keys).
     *
     * @param usePreviousResults Whether results from previous executions can
     * be used to optimize this query execution.
     */ function Zi(t, e, n) {
        const s = S$1(t);
        let i = q$1.min(), r = Pt();
        return s.persistence.runTransaction("Execute query", "readonly", t => function(t, e, n) {
            const s = S$1(t), i = s.Dc.get(n);
            return void 0 !== i ? hs.resolve(s.Sc.get(i)) : s.jo.vo(e, n);
        }(s, t, kn(e)).next(e => {
            if (e) return i = e.lastLimboFreeSnapshotVersion, s.jo.xo(t, e.targetId).next(t => {
                r = t;
            });
        }).next(() => s.vc._s(t, e, n ? i : q$1.min(), n ? r : Pt())).next(t => ({
            documents: t,
            kc: r
        })));
    }

    // PORTING NOTE: Multi-Tab only.
    function tr(t, e) {
        const n = S$1(t), s = S$1(n.jo), i = n.Sc.get(e);
        return i ? Promise.resolve(i.target) : n.persistence.runTransaction("Get target data", "readonly", t => s.Je(t, e).next(t => t ? t.target : null));
    }

    /**
     * Returns the set of documents that have been updated since the last call.
     * If this is the first call, returns the set of changes since client
     * initialization. Further invocations will return document that have changed
     * since the prior call.
     */
    // PORTING NOTE: Multi-Tab only.
    /**
     * Verifies the error thrown by a LocalStore operation. If a LocalStore
     * operation fails because the primary lease has been taken by another client,
     * we ignore the error (the persistence layer will immediately call
     * `applyPrimaryLease` to propagate the primary state change). All other errors
     * are re-thrown.
     *
     * @param err An error returned by a LocalStore operation.
     * @return A Promise that resolves after we recovered, or the original error.
     */
    async function er(t) {
        if (t.code !== D$1.FAILED_PRECONDITION || t.message !== _s) throw t;
        g$1("LocalStore", "Unexpectedly lost primary lease");
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A PersistentStream is an abstract base class that represents a streaming RPC
     * to the Firestore backend. It's built on top of the connections own support
     * for streaming RPCs, and adds several critical features for our clients:
     *
     *   - Exponential backoff on failure
     *   - Authentication via CredentialsProvider
     *   - Dispatching all callbacks into the shared worker queue
     *   - Closing idle streams after 60 seconds of inactivity
     *
     * Subclasses of PersistentStream implement serialization of models to and
     * from the JSON representation of the protocol buffers for a specific
     * streaming RPC.
     *
     * ## Starting and Stopping
     *
     * Streaming RPCs are stateful and need to be start()ed before messages can
     * be sent and received. The PersistentStream will call the onOpen() function
     * of the listener once the stream is ready to accept requests.
     *
     * Should a start() fail, PersistentStream will call the registered onClose()
     * listener with a FirestoreError indicating what went wrong.
     *
     * A PersistentStream can be started and stopped repeatedly.
     *
     * Generic types:
     *  SendType: The type of the outgoing message of the underlying
     *    connection stream
     *  ReceiveType: The type of the incoming message of the underlying
     *    connection stream
     *  ListenerType: The type of the listener that will be used for callbacks
     */
    class nr {
        constructor(t, e, n, s, i, r) {
            this.vs = t, this.Lc = n, this.qc = s, this.Bc = i, this.listener = r, this.state = 0 /* Initial */ , 
            /**
             * A close count that's incremented every time the stream is closed; used by
             * getCloseGuardedDispatcher() to invalidate callbacks that happen after
             * close.
             */
            this.Uc = 0, this.Kc = null, this.stream = null, this.pi = new Is(t, e);
        }
        /**
         * Returns true if start() has been called and no error has occurred. True
         * indicates the stream is open or in the process of opening (which
         * encompasses respecting backoff, getting auth tokens, and starting the
         * actual RPC). Use isOpen() to determine if the stream is open and ready for
         * outbound requests.
         */    Qc() {
            return 1 /* Starting */ === this.state || 2 /* Open */ === this.state || 4 /* Backoff */ === this.state;
        }
        /**
         * Returns true if the underlying RPC is open (the onOpen() listener has been
         * called) and the stream is ready for outbound requests.
         */    Wc() {
            return 2 /* Open */ === this.state;
        }
        /**
         * Starts the RPC. Only allowed if isStarted() returns false. The stream is
         * not immediately ready for use: onOpen() will be invoked when the RPC is
         * ready for outbound requests, at which point isOpen() will return true.
         *
         * When start returns, isStarted() will return true.
         */    start() {
            3 /* Error */ !== this.state ? this.auth() : this.jc();
        }
        /**
         * Stops the RPC. This call is idempotent and allowed regardless of the
         * current isStarted() state.
         *
         * When stop returns, isStarted() and isOpen() will both return false.
         */    async stop() {
            this.Qc() && await this.close(0 /* Initial */);
        }
        /**
         * After an error the stream will usually back off on the next attempt to
         * start it. If the error warrants an immediate restart of the stream, the
         * sender can use this to indicate that the receiver should not back off.
         *
         * Each error will call the onClose() listener. That function can decide to
         * inhibit backoff if required.
         */    Gc() {
            this.state = 0 /* Initial */ , this.pi.reset();
        }
        /**
         * Marks this stream as idle. If no further actions are performed on the
         * stream for one minute, the stream will automatically close itself and
         * notify the stream's onClose() handler with Status.OK. The stream will then
         * be in a !isStarted() state, requiring the caller to start the stream again
         * before further use.
         *
         * Only streams that are in state 'Open' can be marked idle, as all other
         * states imply pending network operations.
         */    zc() {
            // Starts the idle time if we are in state 'Open' and are not yet already
            // running a timer (in which case the previous idle timeout still applies).
            this.Wc() && null === this.Kc && (this.Kc = this.vs.Ls(this.Lc, 6e4, () => this.Hc()));
        }
        /** Sends a message to the underlying stream. */    Jc(t) {
            this.Yc(), this.stream.send(t);
        }
        /** Called by the idle timer when the stream should close due to inactivity. */    async Hc() {
            if (this.Wc()) 
            // When timing out an idle stream there's no reason to force the stream into backoff when
            // it restarts so set the stream state to Initial instead of Error.
            return this.close(0 /* Initial */);
        }
        /** Marks the stream as active again. */    Yc() {
            this.Kc && (this.Kc.cancel(), this.Kc = null);
        }
        /**
         * Closes the stream and cleans up as necessary:
         *
         * * closes the underlying GRPC stream;
         * * calls the onClose handler with the given 'error';
         * * sets internal stream state to 'finalState';
         * * adjusts the backoff timer based on the error
         *
         * A new stream can be opened by calling start().
         *
         * @param finalState the intended state of the stream after closing.
         * @param error the error the connection was closed with.
         */    async close(t, e) {
            // Cancel any outstanding timers (they're guaranteed not to execute).
            this.Yc(), this.pi.cancel(), 
            // Invalidates any stream-related callbacks (e.g. from auth or the
            // underlying stream), guaranteeing they won't execute.
            this.Uc++, 3 /* Error */ !== t ? 
            // If this is an intentional close ensure we don't delay our next connection attempt.
            this.pi.reset() : e && e.code === D$1.RESOURCE_EXHAUSTED ? (
            // Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
            V$1(e.toString()), V$1("Using maximum backoff delay to prevent overloading the backend."), 
            this.pi.Ms()) : e && e.code === D$1.UNAUTHENTICATED && 
            // "unauthenticated" error means the token was rejected. Try force refreshing it in case it
            // just expired.
            this.Bc.A(), 
            // Clean up the underlying stream because we are no longer interested in events.
            null !== this.stream && (this.Xc(), this.stream.close(), this.stream = null), 
            // This state must be assigned before calling onClose() to allow the callback to
            // inhibit backoff or otherwise manipulate the state in its non-started state.
            this.state = t, 
            // Notify the listener that the stream closed.
            await this.listener.Zc(e);
        }
        /**
         * Can be overridden to perform additional cleanup before the stream is closed.
         * Calling super.tearDown() is not required.
         */    Xc() {}
        auth() {
            this.state = 1 /* Starting */;
            const t = this.ta(this.Uc), e = this.Uc;
            // TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
                    this.Bc.getToken().then(t => {
                // Stream can be stopped while waiting for authentication.
                // TODO(mikelehen): We really should just use dispatchIfNotClosed
                // and let this dispatch onto the queue, but that opened a spec test can
                // of worms that I don't want to deal with in this PR.
                this.Uc === e && 
                // Normally we'd have to schedule the callback on the AsyncQueue.
                // However, the following calls are safe to be called outside the
                // AsyncQueue since they don't chain asynchronous calls
                this.ea(t);
            }, e => {
                t(() => {
                    const t = new C$1(D$1.UNKNOWN, "Fetching auth token failed: " + e.message);
                    return this.na(t);
                });
            });
        }
        ea(t) {
            const e = this.ta(this.Uc);
            this.stream = this.sa(t), this.stream.ia(() => {
                e(() => (this.state = 2 /* Open */ , this.listener.ia()));
            }), this.stream.Zc(t => {
                e(() => this.na(t));
            }), this.stream.onMessage(t => {
                e(() => this.onMessage(t));
            });
        }
        jc() {
            this.state = 4 /* Backoff */ , this.pi.$s(async () => {
                this.state = 0 /* Initial */ , this.start();
            });
        }
        // Visible for tests
        na(t) {
            // In theory the stream could close cleanly, however, in our current model
            // we never expect this to happen because if we stop a stream ourselves,
            // this callback will never be called. To prevent cases where we retry
            // without a backoff accidentally, we set the stream to error in all cases.
            return g$1("PersistentStream", "close with error: " + t), this.stream = null, this.close(3 /* Error */ , t);
        }
        /**
         * Returns a "dispatcher" function that dispatches operations onto the
         * AsyncQueue but only runs them if closeCount remains unchanged. This allows
         * us to turn auth / stream callbacks into no-ops if the stream is closed /
         * re-opened, etc.
         */    ta(t) {
            return e => {
                this.vs.Ii(() => this.Uc === t ? e() : (g$1("PersistentStream", "stream callback skipped by getCloseGuardedDispatcher."), 
                Promise.resolve()));
            };
        }
    }

    /**
     * A PersistentStream that implements the Listen RPC.
     *
     * Once the Listen stream has called the onOpen() listener, any number of
     * listen() and unlisten() calls can be made to control what changes will be
     * sent from the server for ListenResponses.
     */ class sr extends nr {
        constructor(t, e, n, s, i) {
            super(t, "listen_stream_connection_backoff" /* ListenStreamConnectionBackoff */ , "listen_stream_idle" /* ListenStreamIdle */ , e, n, i), 
            this.serializer = s;
        }
        sa(t) {
            return this.qc.ra("Listen", t);
        }
        onMessage(t) {
            // A successful response means the stream is healthy
            this.pi.reset();
            const e = ye(this.serializer, t), n = function(t) {
                // We have only reached a consistent snapshot for the entire stream if there
                // is a read_time set and it applies to all targets (i.e. the list of
                // targets is empty). The backend is guaranteed to send such responses.
                if (!("targetChange" in t)) return q$1.min();
                const e = t.targetChange;
                return e.targetIds && e.targetIds.length ? q$1.min() : e.readTime ? de(e.readTime) : q$1.min();
            }(t);
            return this.listener.oa(e, n);
        }
        /**
         * Registers interest in the results of the given target. If the target
         * includes a resumeToken it will be included in the request. Results that
         * affect the target will be streamed back as WatchChange messages that
         * reference the targetId.
         */    ca(t) {
            const e = {};
            e.database = Re(this.serializer), e.addTarget = function(t, e) {
                let n;
                const s = e.target;
                return n = nt(s) ? {
                    documents: Se(t, s)
                } : {
                    query: De(t, s)
                }, n.targetId = e.targetId, e.resumeToken.ct() > 0 && (n.resumeToken = _e(t, e.resumeToken)), 
                n;
            }(this.serializer, t);
            const n = Ne(this.serializer, t);
            n && (e.labels = n), this.Jc(e);
        }
        /**
         * Unregisters interest in the results of the target associated with the
         * given targetId.
         */    aa(t) {
            const e = {};
            e.database = Re(this.serializer), e.removeTarget = t, this.Jc(e);
        }
    }

    /**
     * A Stream that implements the Write RPC.
     *
     * The Write RPC requires the caller to maintain special streamToken
     * state in between calls, to help the server understand which responses the
     * client has processed by the time the next request is made. Every response
     * will contain a streamToken; this value must be passed to the next
     * request.
     *
     * After calling start() on this stream, the next request must be a handshake,
     * containing whatever streamToken is on hand. Once a response to this
     * request is received, all pending mutations may be submitted. When
     * submitting multiple batches of mutations at the same time, it's
     * okay to use the same streamToken for the calls to writeMutations.
     *
     * TODO(b/33271235): Use proto types
     */ class ir extends nr {
        constructor(t, e, n, s, i) {
            super(t, "write_stream_connection_backoff" /* WriteStreamConnectionBackoff */ , "write_stream_idle" /* WriteStreamIdle */ , e, n, i), 
            this.serializer = s, this.ua = !1;
        }
        /**
         * Tracks whether or not a handshake has been successfully exchanged and
         * the stream is ready to accept mutations.
         */    get ha() {
            return this.ua;
        }
        // Override of PersistentStream.start
        start() {
            this.ua = !1, this.lastStreamToken = void 0, super.start();
        }
        Xc() {
            this.ua && this.la([]);
        }
        sa(t) {
            return this.qc.ra("Write", t);
        }
        onMessage(t) {
            if (
            // Always capture the last stream token.
            v$1(!!t.streamToken), this.lastStreamToken = t.streamToken, this.ua) {
                // A successful first write response means the stream is healthy,
                // Note, that we could consider a successful handshake healthy, however,
                // the write itself might be causing an error we want to back off from.
                this.pi.reset();
                const e = ve(t.writeResults, t.commitTime), n = de(t.commitTime);
                return this.listener._a(n, e);
            }
            // The first response is always the handshake response
            return v$1(!t.writeResults || 0 === t.writeResults.length), this.ua = !0, this.listener.fa();
        }
        /**
         * Sends an initial streamToken to the server, performing the handshake
         * required to make the StreamingWrite RPC work. Subsequent
         * calls should wait until onHandshakeComplete was called.
         */    da() {
            // TODO(dimond): Support stream resumption. We intentionally do not set the
            // stream token on the handshake, ignoring any stream token we might have.
            const t = {};
            t.database = Re(this.serializer), this.Jc(t);
        }
        /** Sends a group of mutations to the Firestore backend to apply. */    la(t) {
            const e = {
                streamToken: this.lastStreamToken,
                writes: t.map(t => pe(this.serializer, t))
            };
            this.Jc(e);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Datastore and its related methods are a wrapper around the external Google
     * Cloud Datastore grpc API, which provides an interface that is more convenient
     * for the rest of the client SDK architecture to consume.
     */
    /**
     * An implementation of Datastore that exposes additional state for internal
     * consumption.
     */
    class rr extends class {} {
        constructor(t, e, n) {
            super(), this.credentials = t, this.qc = e, this.serializer = n, this.wa = !1;
        }
        Ea() {
            if (this.wa) throw new C$1(D$1.FAILED_PRECONDITION, "The client has already been terminated.");
        }
        /** Gets an auth token and invokes the provided RPC. */    Ta(t, e, n) {
            return this.Ea(), this.credentials.getToken().then(s => this.qc.Ta(t, e, n, s)).catch(t => {
                throw t.code === D$1.UNAUTHENTICATED && this.credentials.A(), t;
            });
        }
        /** Gets an auth token and invokes the provided RPC with streamed results. */    Ia(t, e, n) {
            return this.Ea(), this.credentials.getToken().then(s => this.qc.Ia(t, e, n, s)).catch(t => {
                throw t.code === D$1.UNAUTHENTICATED && this.credentials.A(), t;
            });
        }
        terminate() {
            this.wa = !1;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    function or(t, e, n) {
        return new rr(t, e, n);
    }

    /**
     * A component used by the RemoteStore to track the OnlineState (that is,
     * whether or not the client as a whole should be considered to be online or
     * offline), implementing the appropriate heuristics.
     *
     * In particular, when the client is trying to connect to the backend, we
     * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
     * a connection to succeed. If we have too many failures or the timeout elapses,
     * then we set the OnlineState to Offline, and the client will behave as if
     * it is offline (get()s will return cached data, etc.).
     */
    class cr {
        constructor(t, e) {
            this.li = t, this.ma = e, 
            /** The current OnlineState. */
            this.state = "Unknown" /* Unknown */ , 
            /**
             * A count of consecutive failures to open the stream. If it reaches the
             * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
             * Offline.
             */
            this.Aa = 0, 
            /**
             * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
             * transition from OnlineState.Unknown to OnlineState.Offline without waiting
             * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
             */
            this.Ra = null, 
            /**
             * Whether the client should log a warning message if it fails to connect to
             * the backend (initially true, cleared after a successful stream, or if we've
             * logged the message already).
             */
            this.Pa = !0;
        }
        /**
         * Called by RemoteStore when a watch stream is started (including on each
         * backoff attempt).
         *
         * If this is the first attempt, it sets the OnlineState to Unknown and starts
         * the onlineStateTimer.
         */    ga() {
            0 === this.Aa && (this.Va("Unknown" /* Unknown */), this.Ra = this.li.Ls("online_state_timeout" /* OnlineStateTimeout */ , 1e4, () => (this.Ra = null, 
            this.ya("Backend didn't respond within 10 seconds."), this.Va("Offline" /* Offline */), 
            Promise.resolve())));
        }
        /**
         * Updates our OnlineState as appropriate after the watch stream reports a
         * failure. The first failure moves us to the 'Unknown' state. We then may
         * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
         * actually transition to the 'Offline' state.
         */    pa(t) {
            "Online" /* Online */ === this.state ? this.Va("Unknown" /* Unknown */) : (this.Aa++, 
            this.Aa >= 1 && (this.ba(), this.ya("Connection failed 1 times. Most recent error: " + t.toString()), 
            this.Va("Offline" /* Offline */)));
        }
        /**
         * Explicitly sets the OnlineState to the specified state.
         *
         * Note that this resets our timers / failure counters, etc. used by our
         * Offline heuristics, so must not be used in place of
         * handleWatchStreamStart() and handleWatchStreamFailure().
         */    set(t) {
            this.ba(), this.Aa = 0, "Online" /* Online */ === t && (
            // We've connected to watch at least once. Don't warn the developer
            // about being offline going forward.
            this.Pa = !1), this.Va(t);
        }
        Va(t) {
            t !== this.state && (this.state = t, this.ma(t));
        }
        ya(t) {
            const e = `Could not reach Cloud Firestore backend. ${t}\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
            this.Pa ? (V$1(e), this.Pa = !1) : g$1("OnlineStateTracker", e);
        }
        ba() {
            null !== this.Ra && (this.Ra.cancel(), this.Ra = null);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class ar {
        constructor(
        /**
         * The local store, used to fill the write pipeline with outbound mutations.
         */
        t, 
        /** The client-side proxy for interacting with the backend. */
        e, n, s, i) {
            this.va = t, this.Sa = e, this.li = n, this.Da = {}, 
            /**
             * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
             * LocalStore via fillWritePipeline() and have or will send to the write
             * stream.
             *
             * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
             * restart the write stream. When the stream is established the writes in the
             * pipeline will be sent in order.
             *
             * Writes remain in writePipeline until they are acknowledged by the backend
             * and thus will automatically be re-sent if the stream is interrupted /
             * restarted before they're acknowledged.
             *
             * Write responses from the backend are linked to their originating request
             * purely based on order, and so we can just shift() writes from the front of
             * the writePipeline as we receive responses.
             */
            this.Ca = [], 
            /**
             * A mapping of watched targets that the client cares about tracking and the
             * user has explicitly called a 'listen' for this target.
             *
             * These targets may or may not have been sent to or acknowledged by the
             * server. On re-establishing the listen stream, these targets should be sent
             * to the server. The targets removed with unlistens are removed eagerly
             * without waiting for confirmation from the listen stream.
             */
            this.Na = new Map, 
            /**
             * A set of reasons for why the RemoteStore may be offline. If empty, the
             * RemoteStore may start its network connections.
             */
            this.xa = new Set, 
            /**
             * Event handlers that get called when the network is disabled or enabled.
             *
             * PORTING NOTE: These functions are used on the Web client to create the
             * underlying streams (to support tree-shakeable streams). On Android and iOS,
             * the streams are created during construction of RemoteStore.
             */
            this.Oa = [], this.Fa = i, this.Fa.Ma(t => {
                n.Ii(async () => {
                    // Porting Note: Unlike iOS, `restartNetwork()` is called even when the
                    // network becomes unreachable as we don't have any other way to tear
                    // down our streams.
                    Tr(this) && (g$1("RemoteStore", "Restarting streams for network reachability change."), 
                    await async function(t) {
                        const e = S$1(t);
                        e.xa.add(4 /* ConnectivityChange */), await hr(e), e.$a.set("Unknown" /* Unknown */), 
                        e.xa.delete(4 /* ConnectivityChange */), await ur(e);
                    }(this));
                });
            }), this.$a = new cr(n, s);
        }
    }

    async function ur(t) {
        if (Tr(t)) for (const e of t.Oa) await e(/* enabled= */ !0);
    }

    /**
     * Temporarily disables the network. The network can be re-enabled using
     * enableNetwork().
     */ async function hr(t) {
        for (const e of t.Oa) await e(/* enabled= */ !1);
    }

    /**
     * Starts new listen for the given target. Uses resume token if provided. It
     * is a no-op if the target of given `TargetData` is already being listened to.
     */
    function lr(t, e) {
        const n = S$1(t);
        n.Na.has(e.targetId) || (
        // Mark this as something the client is currently listening for.
        n.Na.set(e.targetId, e), Er(n) ? 
        // The listen will be sent in onWatchStreamOpen
        wr(n) : Or(n).Wc() && fr(n, e));
    }

    /**
     * Removes the listen from server. It is a no-op if the given target id is
     * not being listened to.
     */ function _r(t, e) {
        const n = S$1(t), s = Or(n);
        n.Na.delete(e), s.Wc() && dr(n, e), 0 === n.Na.size && (s.Wc() ? s.zc() : Tr(n) && 
        // Revert to OnlineState.Unknown if the watch stream is not open and we
        // have no listeners, since without any listens to send we cannot
        // confirm if the stream is healthy and upgrade to OnlineState.Online.
        n.$a.set("Unknown" /* Unknown */));
    }

    /**
     * We need to increment the the expected number of pending responses we're due
     * from watch so we wait for the ack to process any messages from this target.
     */ function fr(t, e) {
        t.ka.be(e.targetId), Or(t).ca(e);
    }

    /**
     * We need to increment the expected number of pending responses we're due
     * from watch so we wait for the removal on the server before we process any
     * messages from this target.
     */ function dr(t, e) {
        t.ka.be(e), Or(t).aa(e);
    }

    function wr(t) {
        t.ka = new Ot({
            He: e => t.Da.He(e),
            Je: e => t.Na.get(e) || null
        }), Or(t).start(), t.$a.ga();
    }

    /**
     * Returns whether the watch stream should be started because it's necessary
     * and has not yet been started.
     */ function Er(t) {
        return Tr(t) && !Or(t).Qc() && t.Na.size > 0;
    }

    function Tr(t) {
        return 0 === S$1(t).xa.size;
    }

    function Ir(t) {
        t.ka = void 0;
    }

    async function mr(t) {
        t.Na.forEach((e, n) => {
            fr(t, e);
        });
    }

    async function Ar(t, e) {
        Ir(t), 
        // If we still need the watch stream, retry the connection.
        Er(t) ? (t.$a.pa(e), wr(t)) : 
        // No need to restart watch stream because there are no active targets.
        // The online state is set to unknown because there is no active attempt
        // at establishing a connection
        t.$a.set("Unknown" /* Unknown */);
    }

    async function Rr(t, e, n) {
        if (
        // Mark the client as online since we got a message from the server
        t.$a.set("Online" /* Online */), e instanceof Nt && 2 /* Removed */ === e.state && e.cause) 
        // There was an error on a target, don't wait for a consistent snapshot
        // to raise events
        try {
            await 
            /** Handles an error on a target */
            async function(t, e) {
                const n = e.cause;
                for (const s of e.targetIds) 
                // A watched target might have been removed already.
                t.Na.has(s) && (await t.Da.La(s, n), t.Na.delete(s), t.ka.removeTarget(s));
            }
            /**
     * Attempts to fill our write pipeline with writes from the LocalStore.
     *
     * Called internally to bootstrap or refill the write pipeline and by
     * SyncEngine whenever there are new mutations to process.
     *
     * Starts the write stream if necessary.
     */ (t, e);
        } catch (n) {
            g$1("RemoteStore", "Failed to remove targets %s: %s ", e.targetIds.join(","), n), 
            await Pr(t, n);
        } else if (e instanceof Dt ? t.ka.Fe(e) : e instanceof Ct ? t.ka.Ke(e) : t.ka.ke(e), 
        !n.isEqual(q$1.min())) try {
            const e = await zi(t.va);
            n.v(e) >= 0 && 
            // We have received a target change with a global snapshot if the snapshot
            // version is not equal to SnapshotVersion.min().
            await 
            /**
     * Takes a batch of changes from the Datastore, repackages them as a
     * RemoteEvent, and passes that on to the listener, which is typically the
     * SyncEngine.
     */
            function(t, e) {
                const n = t.ka.je(e);
                // Update in-memory resume tokens. LocalStore will update the
                // persistent view of these when applying the completed RemoteEvent.
                            return n.ne.forEach((n, s) => {
                    if (n.resumeToken.ct() > 0) {
                        const i = t.Na.get(s);
                        // A watched target might have been removed already.
                                            i && t.Na.set(s, i._t(n.resumeToken, e));
                    }
                }), 
                // Re-establish listens for the targets that have been invalidated by
                // existence filter mismatches.
                n.se.forEach(e => {
                    const n = t.Na.get(e);
                    if (!n) 
                    // A watched target might have been removed already.
                    return;
                    // Clear the resume token for the target, since we're in a known mismatch
                    // state.
                                    t.Na.set(e, n._t(st.at, n.ht)), 
                    // Cause a hard reset by unwatching and rewatching immediately, but
                    // deliberately don't send a resume token so that we get a full update.
                    dr(t, e);
                    // Mark the target we send as being on behalf of an existence filter
                    // mismatch, but don't actually retain that in listenTargets. This ensures
                    // that we flag the first re-listen this way without impacting future
                    // listens of this target (that might happen e.g. on reconnect).
                    const s = new it(n.target, e, 1 /* ExistenceFilterMismatch */ , n.sequenceNumber);
                    fr(t, s);
                }), t.Da.qa(n);
            }(t, n);
        } catch (e) {
            g$1("RemoteStore", "Failed to raise snapshot:", e), await Pr(t, e);
        }
    }

    /**
     * Recovery logic for IndexedDB errors that takes the network offline until
     * `op` succeeds. Retries are scheduled with backoff using
     * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
     * validated via a generic operation.
     *
     * The returned Promise is resolved once the network is disabled and before
     * any retry attempt.
     */ async function Pr(t, e, n) {
        if (!Ps(e)) throw e;
        t.xa.add(1 /* IndexedDbFailed */), 
        // Disable network and raise offline snapshots
        await hr(t), t.$a.set("Offline" /* Offline */), n || (
        // Use a simple read operation to determine if IndexedDB recovered.
        // Ideally, we would expose a health check directly on SimpleDb, but
        // RemoteStore only has access to persistence through LocalStore.
        n = () => zi(t.va)), 
        // Probe IndexedDB periodically and re-enable network
        t.li.xi(async () => {
            g$1("RemoteStore", "Retrying IndexedDB access"), await n(), t.xa.delete(1 /* IndexedDbFailed */), 
            await ur(t);
        });
    }

    /**
     * Executes `op`. If `op` fails, takes the network offline until `op`
     * succeeds. Returns after the first attempt.
     */ function gr(t, e) {
        return e().catch(n => Pr(t, n, e));
    }

    async function Vr(t) {
        const e = S$1(t), n = Fr(e);
        let s = e.Ca.length > 0 ? e.Ca[e.Ca.length - 1].batchId : -1;
        for (;yr(e); ) try {
            const t = await Ji(e.va, s);
            if (null === t) {
                0 === e.Ca.length && n.zc();
                break;
            }
            s = t.batchId, pr(e, t);
        } catch (t) {
            await Pr(e, t);
        }
        br(e) && vr(e);
    }

    /**
     * Returns true if we can add to the write pipeline (i.e. the network is
     * enabled and the write pipeline is not full).
     */ function yr(t) {
        return Tr(t) && t.Ca.length < 10;
    }

    /**
     * Queues additional writes to be sent to the write stream, sending them
     * immediately if the write stream is established.
     */ function pr(t, e) {
        t.Ca.push(e);
        const n = Fr(t);
        n.Wc() && n.ha && n.la(e.mutations);
    }

    function br(t) {
        return Tr(t) && !Fr(t).Qc() && t.Ca.length > 0;
    }

    function vr(t) {
        Fr(t).start();
    }

    async function Sr(t) {
        Fr(t).da();
    }

    async function Dr(t) {
        const e = Fr(t);
        // Send the write pipeline now that the stream is established.
            for (const n of t.Ca) e.la(n.mutations);
    }

    async function Cr(t, e, n) {
        const s = t.Ca.shift(), i = as.from(s, e, n);
        await gr(t, () => t.Da.Ba(i)), 
        // It's possible that with the completion of this mutation another
        // slot has freed up.
        await Vr(t);
    }

    async function Nr(t, e) {
        // If the write stream closed after the write handshake completes, a write
        // operation failed and we fail the pending operation.
        e && Fr(t).ha && 
        // This error affects the actual write.
        await async function(t, e) {
            // Only handle permanent errors here. If it's transient, just let the retry
            // logic kick in.
            if (n = e.code, at(n) && n !== D$1.ABORTED) {
                // This was a permanent error, the request itself was the problem
                // so it's not going to succeed if we resend it.
                const n = t.Ca.shift();
                // In this case it's also unlikely that the server itself is melting
                // down -- this was just a bad request so inhibit backoff on the next
                // restart.
                            Fr(t).Gc(), await gr(t, () => t.Da.Ua(n.batchId, e)), 
                // It's possible that with the completion of this mutation
                // another slot has freed up.
                await Vr(t);
            }
            var n;
            /**
     * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
     *
     * @returns The Code equivalent to the given status string or undefined if
     *     there is no match.
     */    }(t, e), 
        // The write stream might have been started by refilling the write
        // pipeline for failed writes
        br(t) && vr(t);
    }

    /**
     * Toggles the network state when the client gains or loses its primary lease.
     */
    async function xr(t, e) {
        const n = S$1(t);
        e ? (n.xa.delete(2 /* IsSecondary */), await ur(n)) : e || (n.xa.add(2 /* IsSecondary */), 
        await hr(n), n.$a.set("Unknown" /* Unknown */));
    }

    /**
     * If not yet initialized, registers the WatchStream and its network state
     * callback with `remoteStoreImpl`. Returns the existing stream if one is
     * already available.
     *
     * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
     * This is not done on Web to allow it to be tree-shaken.
     */ function Or(t) {
        return t.Ka || (
        // Create stream (but note that it is not started yet).
        t.Ka = function(t, e, n) {
            const s = S$1(t);
            return s.Ea(), new sr(e, s.qc, s.credentials, s.serializer, n);
        }
        /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t.Sa, t.li, {
            ia: mr.bind(null, t),
            Zc: Ar.bind(null, t),
            oa: Rr.bind(null, t)
        }), t.Oa.push(async e => {
            e ? (t.Ka.Gc(), Er(t) ? wr(t) : t.$a.set("Unknown" /* Unknown */)) : (await t.Ka.stop(), 
            Ir(t));
        })), t.Ka;
    }

    /**
     * If not yet initialized, registers the WriteStream and its network state
     * callback with `remoteStoreImpl`. Returns the existing stream if one is
     * already available.
     *
     * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
     * This is not done on Web to allow it to be tree-shaken.
     */ function Fr(t) {
        return t.Qa || (
        // Create stream (but note that it is not started yet).
        t.Qa = function(t, e, n) {
            const s = S$1(t);
            return s.Ea(), new ir(e, s.qc, s.credentials, s.serializer, n);
        }(t.Sa, t.li, {
            ia: Sr.bind(null, t),
            Zc: Nr.bind(null, t),
            fa: Dr.bind(null, t),
            _a: Cr.bind(null, t)
        }), t.Oa.push(async e => {
            e ? (t.Qa.Gc(), 
            // This will start the write stream if necessary.
            await Vr(t)) : (await t.Qa.stop(), t.Ca.length > 0 && (g$1("RemoteStore", `Stopping write stream with ${t.Ca.length} pending writes`), 
            t.Ca = []));
        })), t.Qa;
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Holds the listeners and the last received ViewSnapshot for a query being
     * tracked by EventManager.
     */ class Mr {
        constructor() {
            this.Wa = void 0, this.listeners = [];
        }
    }

    class $r {
        constructor() {
            this.ja = new us(t => qn(t), Ln), this.onlineState = "Unknown" /* Unknown */ , this.Ga = new Set;
        }
    }

    async function kr(t, e) {
        const n = S$1(t), s = e.query;
        let i = !1, r = n.ja.get(s);
        if (r || (i = !0, r = new Mr), i) try {
            r.Wa = await n.za(s);
        } catch (t) {
            const n = Ns(t, `Initialization of query '${Bn(e.query)}' failed`);
            return void e.onError(n);
        }
        n.ja.set(s, r), r.listeners.push(e);
        // Run global snapshot listeners if a consistent snapshot has been emitted.
        e.Ha(n.onlineState);
        if (r.Wa) {
            e.Ja(r.Wa) && Ur(n);
        }
    }

    async function Lr(t, e) {
        const n = S$1(t), s = e.query;
        let i = !1;
        const r = n.ja.get(s);
        if (r) {
            const t = r.listeners.indexOf(e);
            t >= 0 && (r.listeners.splice(t, 1), i = 0 === r.listeners.length);
        }
        if (i) return n.ja.delete(s), n.Ya(s);
    }

    function qr(t, e) {
        const n = S$1(t);
        let s = !1;
        for (const t of e) {
            const e = t.query, i = n.ja.get(e);
            if (i) {
                for (const e of i.listeners) e.Ja(t) && (s = !0);
                i.Wa = t;
            }
        }
        s && Ur(n);
    }

    function Br(t, e, n) {
        const s = S$1(t), i = s.ja.get(e);
        if (i) for (const t of i.listeners) t.onError(n);
        // Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
        // after an error.
            s.ja.delete(e);
    }

    // Call all global snapshot listeners that have been set.
    function Ur(t) {
        t.Ga.forEach(t => {
            t.next();
        });
    }

    /**
     * QueryListener takes a series of internal view snapshots and determines
     * when to raise the event.
     *
     * It uses an Observer to dispatch events.
     */ class Kr {
        constructor(t, e, n) {
            this.query = t, this.Xa = e, 
            /**
             * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
             * observer. This flag is set to true once we've actually raised an event.
             */
            this.Za = !1, this.tu = null, this.onlineState = "Unknown" /* Unknown */ , this.options = n || {};
        }
        /**
         * Applies the new ViewSnapshot to this listener, raising a user-facing event
         * if applicable (depending on what changed, whether the user has opted into
         * metadata-only changes, etc.). Returns true if a user-facing event was
         * indeed raised.
         */    Ja(t) {
            if (!this.options.includeMetadataChanges) {
                // Remove the metadata only changes.
                const e = [];
                for (const n of t.docChanges) 3 /* Metadata */ !== n.type && e.push(n);
                t = new bt(t.query, t.docs, t.Yt, e, t.Xt, t.fromCache, t.Zt, 
                /* excludesMetadataChanges= */ !0);
            }
            let e = !1;
            return this.Za ? this.eu(t) && (this.Xa.next(t), e = !0) : this.nu(t, this.onlineState) && (this.su(t), 
            e = !0), this.tu = t, e;
        }
        onError(t) {
            this.Xa.error(t);
        }
        /** Returns whether a snapshot was raised. */    Ha(t) {
            this.onlineState = t;
            let e = !1;
            return this.tu && !this.Za && this.nu(this.tu, t) && (this.su(this.tu), e = !0), 
            e;
        }
        nu(t, e) {
            // Always raise the first event when we're synced
            if (!t.fromCache) return !0;
            // NOTE: We consider OnlineState.Unknown as online (it should become Offline
            // or Online if we wait long enough).
                    const n = "Offline" /* Offline */ !== e;
            // Don't raise the event if we're online, aren't synced yet (checked
            // above) and are waiting for a sync.
                    return (!this.options.iu || !n) && (!t.docs.L() || "Offline" /* Offline */ === e);
            // Raise data from cache if we have any documents or we are offline
            }
        eu(t) {
            // We don't need to handle includeDocumentMetadataChanges here because
            // the Metadata only changes have already been stripped out if needed.
            // At this point the only changes we will see are the ones we should
            // propagate.
            if (t.docChanges.length > 0) return !0;
            const e = this.tu && this.tu.hasPendingWrites !== t.hasPendingWrites;
            return !(!t.Zt && !e) && !0 === this.options.includeMetadataChanges;
            // Generally we should have hit one of the cases above, but it's possible
            // to get here if there were only metadata docChanges and they got
            // stripped out.
            }
        su(t) {
            t = bt.ee(t.query, t.docs, t.Xt, t.fromCache), this.Za = !0, this.Xa.next(t);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A collection of references to a document from some kind of numbered entity
     * (either a target ID or batch ID). As references are added to or removed from
     * the set corresponding events are emitted to a registered garbage collector.
     *
     * Each reference is represented by a DocumentReference object. Each of them
     * contains enough information to uniquely identify the reference. They are all
     * stored primarily in a set sorted by key. A document is considered garbage if
     * there's no references in that set (this can be efficiently checked thanks to
     * sorting by key).
     *
     * ReferenceSet also keeps a secondary set that contains references sorted by
     * IDs. This one is used to efficiently implement removal of all references by
     * some target ID.
     */ class Qr {
        constructor() {
            // A set of outstanding references to a document sorted by key.
            this.ru = new ft(Wr.ou), 
            // A set of outstanding references to a document sorted by target id.
            this.cu = new ft(Wr.au);
        }
        /** Returns true if the reference set contains no references. */    L() {
            return this.ru.L();
        }
        /** Adds a reference to the given document key for the given ID. */    Do(t, e) {
            const n = new Wr(t, e);
            this.ru = this.ru.add(n), this.cu = this.cu.add(n);
        }
        /** Add references to the given document keys for the given ID. */    uu(t, e) {
            t.forEach(t => this.Do(t, e));
        }
        /**
         * Removes a reference to the given document key for the given
         * ID.
         */    No(t, e) {
            this.hu(new Wr(t, e));
        }
        lu(t, e) {
            t.forEach(t => this.No(t, e));
        }
        /**
         * Clears all references with a given ID. Calls removeRef() for each key
         * removed.
         */    _u(t) {
            const e = new W$1(new U$1([])), n = new Wr(e, t), s = new Wr(e, t + 1), i = [];
            return this.cu.Bt([ n, s ], t => {
                this.hu(t), i.push(t.key);
            }), i;
        }
        fu() {
            this.ru.forEach(t => this.hu(t));
        }
        hu(t) {
            this.ru = this.ru.delete(t), this.cu = this.cu.delete(t);
        }
        du(t) {
            const e = new W$1(new U$1([])), n = new Wr(e, t), s = new Wr(e, t + 1);
            let i = Pt();
            return this.cu.Bt([ n, s ], t => {
                i = i.add(t.key);
            }), i;
        }
        Kr(t) {
            const e = new Wr(t, 0), n = this.ru.Kt(e);
            return null !== n && t.isEqual(n.key);
        }
    }

    class Wr {
        constructor(t, e) {
            this.key = t, this.wu = e;
        }
        /** Compare by key then by ID */    static ou(t, e) {
            return W$1.N(t.key, e.key) || M$1(t.wu, e.wu);
        }
        /** Compare by ID then by key */    static au(t, e) {
            return M$1(t.wu, e.wu) || W$1.N(t.key, e.key);
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The format of the LocalStorage key that stores the client state is:
    //     firestore_clients_<persistence_prefix>_<instance_key>
    /** Assembles the key for a client state in WebStorage */
    function jr(t, e) {
        return `firestore_clients_${t}_${e}`;
    }

    // The format of the WebStorage key that stores the mutation state is:
    //     firestore_mutations_<persistence_prefix>_<batch_id>
    //     (for unauthenticated users)
    // or: firestore_mutations_<persistence_prefix>_<batch_id>_<user_uid>

    // 'user_uid' is last to avoid needing to escape '_' characters that it might
    // contain.
    /** Assembles the key for a mutation batch in WebStorage */
    function Gr(t, e, n) {
        let s = `firestore_mutations_${t}_${n}`;
        return e.t() && (s += "_" + e.uid), s;
    }

    // The format of the WebStorage key that stores a query target's metadata is:
    //     firestore_targets_<persistence_prefix>_<target_id>
    /** Assembles the key for a query state in WebStorage */
    function zr(t, e) {
        return `firestore_targets_${t}_${e}`;
    }

    // The WebStorage prefix that stores the primary tab's online state. The
    // format of the key is:
    //     firestore_online_state_<persistence_prefix>
    /**
     * Holds the state of a mutation batch, including its user ID, batch ID and
     * whether the batch is 'pending', 'acknowledged' or 'rejected'.
     */
    // Visible for testing
    class Hr {
        constructor(t, e, n, s) {
            this.user = t, this.batchId = e, this.state = n, this.error = s;
        }
        /**
         * Parses a MutationMetadata from its JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static Eu(t, e, n) {
            const s = JSON.parse(n);
            let i = "object" == typeof s && -1 !== [ "pending", "acknowledged", "rejected" ].indexOf(s.state) && (void 0 === s.error || "object" == typeof s.error), r = void 0;
            return i && s.error && (i = "string" == typeof s.error.message && "string" == typeof s.error.code, 
            i && (r = new C$1(s.error.code, s.error.message))), i ? new Hr(t, e, s.state, r) : (V$1("SharedClientState", `Failed to parse mutation state for ID '${e}': ${n}`), 
            null);
        }
        Tu() {
            const t = {
                state: this.state,
                updateTimeMs: Date.now()
            };
            return this.error && (t.error = {
                code: this.error.code,
                message: this.error.message
            }), JSON.stringify(t);
        }
    }

    /**
     * Holds the state of a query target, including its target ID and whether the
     * target is 'not-current', 'current' or 'rejected'.
     */
    // Visible for testing
    class Jr {
        constructor(t, e, n) {
            this.targetId = t, this.state = e, this.error = n;
        }
        /**
         * Parses a QueryTargetMetadata from its JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static Eu(t, e) {
            const n = JSON.parse(e);
            let s = "object" == typeof n && -1 !== [ "not-current", "current", "rejected" ].indexOf(n.state) && (void 0 === n.error || "object" == typeof n.error), i = void 0;
            return s && n.error && (s = "string" == typeof n.error.message && "string" == typeof n.error.code, 
            s && (i = new C$1(n.error.code, n.error.message))), s ? new Jr(t, n.state, i) : (V$1("SharedClientState", `Failed to parse target state for ID '${t}': ${e}`), 
            null);
        }
        Tu() {
            const t = {
                state: this.state,
                updateTimeMs: Date.now()
            };
            return this.error && (t.error = {
                code: this.error.code,
                message: this.error.message
            }), JSON.stringify(t);
        }
    }

    /**
     * This class represents the immutable ClientState for a client read from
     * WebStorage, containing the list of active query targets.
     */ class Yr {
        constructor(t, e) {
            this.clientId = t, this.activeTargetIds = e;
        }
        /**
         * Parses a RemoteClientState from the JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static Eu(t, e) {
            const n = JSON.parse(e);
            let s = "object" == typeof n && n.activeTargetIds instanceof Array, i = Vt();
            for (let t = 0; s && t < n.activeTargetIds.length; ++t) s = J$1(n.activeTargetIds[t]), 
            i = i.add(n.activeTargetIds[t]);
            return s ? new Yr(t, i) : (V$1("SharedClientState", `Failed to parse client data for instance '${t}': ${e}`), 
            null);
        }
    }

    /**
     * This class represents the online state for all clients participating in
     * multi-tab. The online state is only written to by the primary client, and
     * used in secondary clients to update their query views.
     */ class Xr {
        constructor(t, e) {
            this.clientId = t, this.onlineState = e;
        }
        /**
         * Parses a SharedOnlineState from its JSON representation in WebStorage.
         * Logs a warning and returns null if the format of the data is not valid.
         */    static Eu(t) {
            const e = JSON.parse(t);
            return "object" == typeof e && -1 !== [ "Unknown", "Online", "Offline" ].indexOf(e.onlineState) && "string" == typeof e.clientId ? new Xr(e.clientId, e.onlineState) : (V$1("SharedClientState", "Failed to parse online state: " + t), 
            null);
        }
    }

    /**
     * Metadata state of the local client. Unlike `RemoteClientState`, this class is
     * mutable and keeps track of all pending mutations, which allows us to
     * update the range of pending mutation batch IDs as new mutations are added or
     * removed.
     *
     * The data in `LocalClientState` is not read from WebStorage and instead
     * updated via its instance methods. The updated state can be serialized via
     * `toWebStorageJSON()`.
     */
    // Visible for testing.
    class Zr {
        constructor() {
            this.activeTargetIds = Vt();
        }
        Iu(t) {
            this.activeTargetIds = this.activeTargetIds.add(t);
        }
        mu(t) {
            this.activeTargetIds = this.activeTargetIds.delete(t);
        }
        /**
         * Converts this entry into a JSON-encoded format we can use for WebStorage.
         * Does not encode `clientId` as it is part of the key in WebStorage.
         */    Tu() {
            const t = {
                activeTargetIds: this.activeTargetIds.U(),
                updateTimeMs: Date.now()
            };
            return JSON.stringify(t);
        }
    }

    /**
     * `WebStorageSharedClientState` uses WebStorage (window.localStorage) as the
     * backing store for the SharedClientState. It keeps track of all active
     * clients and supports modifications of the local client's data.
     */ class to {
        constructor(t, e, n, s, i) {
            this.window = t, this.vs = e, this.persistenceKey = n, this.Au = s, this.Ru = null, 
            this.ma = null, this.gs = null, this.Pu = this.gu.bind(this), this.Vu = new ht(M$1), 
            this.lr = !1, 
            /**
             * Captures WebStorage events that occur before `start()` is called. These
             * events are replayed once `WebStorageSharedClientState` is started.
             */
            this.yu = [];
            // Escape the special characters mentioned here:
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
            const r = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            this.storage = this.window.localStorage, this.currentUser = i, this.pu = jr(this.persistenceKey, this.Au), 
            this.bu = 
            /** Assembles the key for the current sequence number. */
            function(t) {
                return "firestore_sequence_number_" + t;
            }
            /**
     * @license
     * Copyright 2018 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (this.persistenceKey), this.Vu = this.Vu.dt(this.Au, new Zr), this.vu = new RegExp(`^firestore_clients_${r}_([^_]*)$`), 
            this.Su = new RegExp(`^firestore_mutations_${r}_(\\d+)(?:_(.*))?$`), this.Du = new RegExp(`^firestore_targets_${r}_(\\d+)$`), 
            this.Cu = 
            /** Assembles the key for the online state of the primary tab. */
            function(t) {
                return "firestore_online_state_" + t;
            }
            // The WebStorage key prefix for the key that stores the last sequence number allocated. The key
            // looks like 'firestore_sequence_number_<persistence_prefix>'.
            (this.persistenceKey), 
            // Rather than adding the storage observer during start(), we add the
            // storage observer during initialization. This ensures that we collect
            // events before other components populate their initial state (during their
            // respective start() calls). Otherwise, we might for example miss a
            // mutation that is added after LocalStore's start() processed the existing
            // mutations but before we observe WebStorage events.
            this.window.addEventListener("storage", this.Pu);
        }
        /** Returns 'true' if WebStorage is available in the current environment. */    static Qs(t) {
            return !(!t || !t.localStorage);
        }
        async start() {
            // Retrieve the list of existing clients to backfill the data in
            // SharedClientState.
            const t = await this.Ru.Tc();
            for (const e of t) {
                if (e === this.Au) continue;
                const t = this.getItem(jr(this.persistenceKey, e));
                if (t) {
                    const n = Yr.Eu(e, t);
                    n && (this.Vu = this.Vu.dt(n.clientId, n));
                }
            }
            this.Nu();
            // Check if there is an existing online state and call the callback handler
            // if applicable.
            const e = this.storage.getItem(this.Cu);
            if (e) {
                const t = this.xu(e);
                t && this.Ou(t);
            }
            for (const t of this.yu) this.gu(t);
            this.yu = [], 
            // Register a window unload hook to remove the client metadata entry from
            // WebStorage even if `shutdown()` was not called.
            this.window.addEventListener("unload", () => this._c()), this.lr = !0;
        }
        ps(t) {
            this.setItem(this.bu, JSON.stringify(t));
        }
        Fu() {
            return this.Mu(this.Vu);
        }
        $u(t) {
            let e = !1;
            return this.Vu.forEach((n, s) => {
                s.activeTargetIds.has(t) && (e = !0);
            }), e;
        }
        ku(t) {
            this.Lu(t, "pending");
        }
        qu(t, e, n) {
            this.Lu(t, e, n), 
            // Once a final mutation result is observed by other clients, they no longer
            // access the mutation's metadata entry. Since WebStorage replays events
            // in order, it is safe to delete the entry right after updating it.
            this.Bu(t);
        }
        Uu(t) {
            let e = "not-current";
            // Lookup an existing query state if the target ID was already registered
            // by another tab
                    if (this.$u(t)) {
                const n = this.storage.getItem(zr(this.persistenceKey, t));
                if (n) {
                    const s = Jr.Eu(t, n);
                    s && (e = s.state);
                }
            }
            return this.Ku.Iu(t), this.Nu(), e;
        }
        Qu(t) {
            this.Ku.mu(t), this.Nu();
        }
        Wu(t) {
            return this.Ku.activeTargetIds.has(t);
        }
        ju(t) {
            this.removeItem(zr(this.persistenceKey, t));
        }
        Gu(t, e, n) {
            this.zu(t, e, n);
        }
        Hu(t, e, n) {
            e.forEach(t => {
                this.Bu(t);
            }), this.currentUser = t, n.forEach(t => {
                this.ku(t);
            });
        }
        Ju(t) {
            this.Yu(t);
        }
        _c() {
            this.lr && (this.window.removeEventListener("storage", this.Pu), this.removeItem(this.pu), 
            this.lr = !1);
        }
        getItem(t) {
            const e = this.storage.getItem(t);
            return g$1("SharedClientState", "READ", t, e), e;
        }
        setItem(t, e) {
            g$1("SharedClientState", "SET", t, e), this.storage.setItem(t, e);
        }
        removeItem(t) {
            g$1("SharedClientState", "REMOVE", t), this.storage.removeItem(t);
        }
        gu(t) {
            // Note: The function is typed to take Event to be interface-compatible with
            // `Window.addEventListener`.
            const e = t;
            if (e.storageArea === this.storage) {
                if (g$1("SharedClientState", "EVENT", e.key, e.newValue), e.key === this.pu) return void V$1("Received WebStorage notification for local change. Another client might have garbage-collected our state");
                this.vs.xi(async () => {
                    if (this.lr) {
                        if (null !== e.key) if (this.vu.test(e.key)) {
                            if (null == e.newValue) {
                                const t = this.Xu(e.key);
                                return this.Zu(t, null);
                            }
                            {
                                const t = this.th(e.key, e.newValue);
                                if (t) return this.Zu(t.clientId, t);
                            }
                        } else if (this.Su.test(e.key)) {
                            if (null !== e.newValue) {
                                const t = this.eh(e.key, e.newValue);
                                if (t) return this.nh(t);
                            }
                        } else if (this.Du.test(e.key)) {
                            if (null !== e.newValue) {
                                const t = this.sh(e.key, e.newValue);
                                if (t) return this.ih(t);
                            }
                        } else if (e.key === this.Cu) {
                            if (null !== e.newValue) {
                                const t = this.xu(e.newValue);
                                if (t) return this.Ou(t);
                            }
                        } else if (e.key === this.bu) {
                            const t = function(t) {
                                let e = Es.bs;
                                if (null != t) try {
                                    const n = JSON.parse(t);
                                    v$1("number" == typeof n), e = n;
                                } catch (t) {
                                    V$1("SharedClientState", "Failed to read sequence number from WebStorage", t);
                                }
                                return e;
                            }
                            /**
     * `MemorySharedClientState` is a simple implementation of SharedClientState for
     * clients using memory persistence. The state in this class remains fully
     * isolated and no synchronization is performed.
     */ (e.newValue);
                            t !== Es.bs && this.gs(t);
                        }
                    } else this.yu.push(e);
                });
            }
        }
        get Ku() {
            return this.Vu.get(this.Au);
        }
        Nu() {
            this.setItem(this.pu, this.Ku.Tu());
        }
        Lu(t, e, n) {
            const s = new Hr(this.currentUser, t, e, n), i = Gr(this.persistenceKey, this.currentUser, t);
            this.setItem(i, s.Tu());
        }
        Bu(t) {
            const e = Gr(this.persistenceKey, this.currentUser, t);
            this.removeItem(e);
        }
        Yu(t) {
            const e = {
                clientId: this.Au,
                onlineState: t
            };
            this.storage.setItem(this.Cu, JSON.stringify(e));
        }
        zu(t, e, n) {
            const s = zr(this.persistenceKey, t), i = new Jr(t, e, n);
            this.setItem(s, i.Tu());
        }
        /**
         * Parses a client state key in WebStorage. Returns null if the key does not
         * match the expected key format.
         */    Xu(t) {
            const e = this.vu.exec(t);
            return e ? e[1] : null;
        }
        /**
         * Parses a client state in WebStorage. Returns 'null' if the value could not
         * be parsed.
         */    th(t, e) {
            const n = this.Xu(t);
            return Yr.Eu(n, e);
        }
        /**
         * Parses a mutation batch state in WebStorage. Returns 'null' if the value
         * could not be parsed.
         */    eh(t, e) {
            const n = this.Su.exec(t), s = Number(n[1]), i = void 0 !== n[2] ? n[2] : null;
            return Hr.Eu(new m(i), s, e);
        }
        /**
         * Parses a query target state from WebStorage. Returns 'null' if the value
         * could not be parsed.
         */    sh(t, e) {
            const n = this.Du.exec(t), s = Number(n[1]);
            return Jr.Eu(s, e);
        }
        /**
         * Parses an online state from WebStorage. Returns 'null' if the value
         * could not be parsed.
         */    xu(t) {
            return Xr.Eu(t);
        }
        async nh(t) {
            if (t.user.uid === this.currentUser.uid) return this.Ru.rh(t.batchId, t.state, t.error);
            g$1("SharedClientState", "Ignoring mutation for non-active user " + t.user.uid);
        }
        ih(t) {
            return this.Ru.oh(t.targetId, t.state, t.error);
        }
        Zu(t, e) {
            const n = e ? this.Vu.dt(t, e) : this.Vu.remove(t), s = this.Mu(this.Vu), i = this.Mu(n), r = [], o = [];
            return i.forEach(t => {
                s.has(t) || r.push(t);
            }), s.forEach(t => {
                i.has(t) || o.push(t);
            }), this.Ru.ah(r, o).then(() => {
                this.Vu = n;
            });
        }
        Ou(t) {
            // We check whether the client that wrote this online state is still active
            // by comparing its client ID to the list of clients kept active in
            // IndexedDb. If a client does not update their IndexedDb client state
            // within 5 seconds, it is considered inactive and we don't emit an online
            // state event.
            this.Vu.get(t.clientId) && this.ma(t.onlineState);
        }
        Mu(t) {
            let e = Vt();
            return t.forEach((t, n) => {
                e = e.Qt(n.activeTargetIds);
            }), e;
        }
    }

    class eo {
        constructor() {
            this.uh = new Zr, this.hh = {}, this.ma = null, this.gs = null;
        }
        ku(t) {
            // No op.
        }
        qu(t, e, n) {
            // No op.
        }
        Uu(t) {
            return this.uh.Iu(t), this.hh[t] || "not-current";
        }
        Gu(t, e, n) {
            this.hh[t] = e;
        }
        Qu(t) {
            this.uh.mu(t);
        }
        Wu(t) {
            return this.uh.activeTargetIds.has(t);
        }
        ju(t) {
            delete this.hh[t];
        }
        Fu() {
            return this.uh.activeTargetIds;
        }
        $u(t) {
            return this.uh.activeTargetIds.has(t);
        }
        start() {
            return this.uh = new Zr, Promise.resolve();
        }
        Hu(t, e, n) {
            // No op.
        }
        Ju(t) {
            // No op.
        }
        _c() {}
        ps(t) {}
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class no {
        constructor(t) {
            this.key = t;
        }
    }

    class so {
        constructor(t) {
            this.key = t;
        }
    }

    /**
     * View is responsible for computing the final merged truth of what docs are in
     * a query. It gets notified of local and remote changes to docs, and applies
     * the query filters and limits to determine the most correct possible results.
     */ class io {
        constructor(t, 
        /** Documents included in the remote target */
        e) {
            this.query = t, this.lh = e, this._h = null, 
            /**
             * A flag whether the view is current with the backend. A view is considered
             * current after it has seen the current flag from the backend and did not
             * lose consistency within the watch stream (e.g. because of an existence
             * filter mismatch).
             */
            this.ae = !1, 
            /** Documents in the view but not in the remote target */
            this.fh = Pt(), 
            /** Document Keys that have local changes */
            this.Xt = Pt(), this.dh = Kn(t), this.wh = new yt(this.dh);
        }
        /**
         * The set of remote documents that the server has told us belongs to the target associated with
         * this view.
         */    get Eh() {
            return this.lh;
        }
        /**
         * Iterates over a set of doc changes, applies the query limit, and computes
         * what the new results should be, what the changes were, and whether we may
         * need to go back to the local cache for more results. Does not make any
         * changes to the view.
         * @param docChanges The doc changes to apply to this view.
         * @param previousChanges If this is being called with a refill, then start
         *        with this set of docs and changes instead of the current view.
         * @return a new set of docs, changes, and refill flag.
         */    Th(t, e) {
            const n = e ? e.Ih : new pt, s = e ? e.wh : this.wh;
            let i = e ? e.Xt : this.Xt, r = s, o = !1;
            // Track the last doc in a (full) limit. This is necessary, because some
            // update (a delete, or an update moving a doc past the old limit) might
            // mean there is some other document in the local cache that either should
            // come (1) between the old last limit doc and the new last document, in the
            // case of updates, or (2) after the new last document, in the case of
            // deletes. So we keep this doc at the old limit to compare the updates to.
            // Note that this should never get used in a refill (when previousChanges is
            // set), because there will only be adds -- no deletes or updates.
            const c = Nn(this.query) && s.size === this.query.limit ? s.last() : null, a = xn(this.query) && s.size === this.query.limit ? s.first() : null;
            // Drop documents out to meet limit/limitToLast requirement.
            if (t.It((t, e) => {
                const u = s.get(t);
                let h = e instanceof pn ? e : null;
                h && (h = Un(this.query, h) ? h : null);
                const l = !!u && this.Xt.has(u.key), _ = !!h && (h.on || 
                // We only consider committed mutations for documents that were
                // mutated during the lifetime of the view.
                this.Xt.has(h.key) && h.hasCommittedMutations);
                let f = !1;
                // Calculate change
                            if (u && h) {
                    u.data().isEqual(h.data()) ? l !== _ && (n.track({
                        type: 3 /* Metadata */ ,
                        doc: h
                    }), f = !0) : this.mh(u, h) || (n.track({
                        type: 2 /* Modified */ ,
                        doc: h
                    }), f = !0, (c && this.dh(h, c) > 0 || a && this.dh(h, a) < 0) && (
                    // This doc moved from inside the limit to outside the limit.
                    // That means there may be some other doc in the local cache
                    // that should be included instead.
                    o = !0));
                } else !u && h ? (n.track({
                    type: 0 /* Added */ ,
                    doc: h
                }), f = !0) : u && !h && (n.track({
                    type: 1 /* Removed */ ,
                    doc: u
                }), f = !0, (c || a) && (
                // A doc was removed from a full limit query. We'll need to
                // requery from the local cache to see if we know about some other
                // doc that should be in the results.
                o = !0));
                f && (h ? (r = r.add(h), i = _ ? i.add(t) : i.delete(t)) : (r = r.delete(t), i = i.delete(t)));
            }), Nn(this.query) || xn(this.query)) for (;r.size > this.query.limit; ) {
                const t = Nn(this.query) ? r.last() : r.first();
                r = r.delete(t.key), i = i.delete(t.key), n.track({
                    type: 1 /* Removed */ ,
                    doc: t
                });
            }
            return {
                wh: r,
                Ih: n,
                Ah: o,
                Xt: i
            };
        }
        mh(t, e) {
            // We suppress the initial change event for documents that were modified as
            // part of a write acknowledgment (e.g. when the value of a server transform
            // is applied) as Watch will send us the same document again.
            // By suppressing the event, we only raise two user visible events (one with
            // `hasPendingWrites` and the final state of the document) instead of three
            // (one with `hasPendingWrites`, the modified document with
            // `hasPendingWrites` and the final state of the document).
            return t.on && e.hasCommittedMutations && !e.on;
        }
        /**
         * Updates the view with the given ViewDocumentChanges and optionally updates
         * limbo docs and sync state from the provided target change.
         * @param docChanges The set of changes to make to the view's docs.
         * @param updateLimboDocuments Whether to update limbo documents based on this
         *        change.
         * @param targetChange A target change to apply for computing limbo docs and
         *        sync state.
         * @return A new ViewChange with the given docs, changes, and sync state.
         */
        // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
        Jn(t, e, n) {
            const s = this.wh;
            this.wh = t.wh, this.Xt = t.Xt;
            // Sort changes based on type and query comparator
            const i = t.Ih.Jt();
            i.sort((t, e) => function(t, e) {
                const n = t => {
                    switch (t) {
                      case 0 /* Added */ :
                        return 1;

                      case 2 /* Modified */ :
                      case 3 /* Metadata */ :
                        // A metadata change is converted to a modified change at the public
                        // api layer.  Since we sort by document key and then change type,
                        // metadata and modified changes must be sorted equivalently.
                        return 2;

                      case 1 /* Removed */ :
                        return 0;

                      default:
                        return b();
                    }
                };
                return n(t) - n(e);
            }
            /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (t.type, e.type) || this.dh(t.doc, e.doc)), this.Rh(n);
            const r = e ? this.Ph() : [], o = 0 === this.fh.size && this.ae ? 1 /* Synced */ : 0 /* Local */ , c = o !== this._h;
            if (this._h = o, 0 !== i.length || c) {
                return {
                    snapshot: new bt(this.query, t.wh, s, i, t.Xt, 0 /* Local */ === o, c, 
                    /* excludesMetadataChanges= */ !1),
                    gh: r
                };
            }
            // no changes
            return {
                gh: r
            };
        }
        /**
         * Applies an OnlineState change to the view, potentially generating a
         * ViewChange if the view's syncState changes as a result.
         */    Ha(t) {
            return this.ae && "Offline" /* Offline */ === t ? (
            // If we're offline, set `current` to false and then call applyChanges()
            // to refresh our syncState and generate a ViewChange as appropriate. We
            // are guaranteed to get a new TargetChange that sets `current` back to
            // true once the client is back online.
            this.ae = !1, this.Jn({
                wh: this.wh,
                Ih: new pt,
                Xt: this.Xt,
                Ah: !1
            }, 
            /* updateLimboDocuments= */ !1)) : {
                gh: []
            };
        }
        /**
         * Returns whether the doc for the given key should be in limbo.
         */    Vh(t) {
            // If the remote end says it's part of this query, it's not in limbo.
            return !this.lh.has(t) && (
            // The local store doesn't think it's a result, so it shouldn't be in limbo.
            !!this.wh.has(t) && !this.wh.get(t).on);
        }
        /**
         * Updates syncedDocuments, current, and limbo docs based on the given change.
         * Returns the list of changes to which docs are in limbo.
         */    Rh(t) {
            t && (t.ue.forEach(t => this.lh = this.lh.add(t)), t.he.forEach(t => {}), t.le.forEach(t => this.lh = this.lh.delete(t)), 
            this.ae = t.ae);
        }
        Ph() {
            // We can only determine limbo documents when we're in-sync with the server.
            if (!this.ae) return [];
            // TODO(klimt): Do this incrementally so that it's not quadratic when
            // updating many documents.
                    const t = this.fh;
            this.fh = Pt(), this.wh.forEach(t => {
                this.Vh(t.key) && (this.fh = this.fh.add(t.key));
            });
            // Diff the new limbo docs with the old limbo docs.
            const e = [];
            return t.forEach(t => {
                this.fh.has(t) || e.push(new so(t));
            }), this.fh.forEach(n => {
                t.has(n) || e.push(new no(n));
            }), e;
        }
        /**
         * Update the in-memory state of the current view with the state read from
         * persistence.
         *
         * We update the query view whenever a client's primary status changes:
         * - When a client transitions from primary to secondary, it can miss
         *   LocalStorage updates and its query views may temporarily not be
         *   synchronized with the state on disk.
         * - For secondary to primary transitions, the client needs to update the list
         *   of `syncedDocuments` since secondary clients update their query views
         *   based purely on synthesized RemoteEvents.
         *
         * @param queryResult.documents - The documents that match the query according
         * to the LocalStore.
         * @param queryResult.remoteKeys - The keys of the documents that match the
         * query according to the backend.
         *
         * @return The ViewChange that resulted from this synchronization.
         */
        // PORTING NOTE: Multi-tab only.
        yh(t) {
            this.lh = t.kc, this.fh = Pt();
            const e = this.Th(t.documents);
            return this.Jn(e, /*updateLimboDocuments=*/ !0);
        }
        /**
         * Returns a view snapshot as if this query was just listened to. Contains
         * a document add for every existing document and the `fromCache` and
         * `hasPendingWrites` status of the already established view.
         */
        // PORTING NOTE: Multi-tab only.
        ph() {
            return bt.ee(this.query, this.wh, this.Xt, 0 /* Local */ === this._h);
        }
    }

    /**
     * QueryView contains all of the data that SyncEngine needs to keep track of for
     * a particular query.
     */
    class ro {
        constructor(
        /**
         * The query itself.
         */
        t, 
        /**
         * The target number created by the client that is used in the watch
         * stream to identify this query.
         */
        e, 
        /**
         * The view is responsible for computing the final merged truth of what
         * docs are in the query. It gets notified of local and remote changes,
         * and applies the query filters and limits to determine the most correct
         * possible results.
         */
        n) {
            this.query = t, this.targetId = e, this.view = n;
        }
    }

    /** Tracks a limbo resolution. */ class oo {
        constructor(t) {
            this.key = t, 
            /**
             * Set to true once we've received a document. This is used in
             * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
             * decide whether it needs to manufacture a delete event for the target once
             * the target is CURRENT.
             */
            this.bh = !1;
        }
    }

    /**
     * An implementation of `SyncEngine` coordinating with other parts of SDK.
     *
     * The parts of SyncEngine that act as a callback to RemoteStore need to be
     * registered individually. This is done in `syncEngineWrite()` and
     * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
     * serve as entry points to RemoteStore's functionality.
     *
     * Note: some field defined in this class might have public access level, but
     * the class is not exported so they are only accessible from this module.
     * This is useful to implement optional features (like bundles) in free
     * functions, such that they are tree-shakeable.
     */ class co {
        constructor(t, e, n, 
        // PORTING NOTE: Manages state synchronization in multi-tab environments.
        s, i, r) {
            this.va = t, this.Sh = e, this.Dh = n, this.Ch = s, this.currentUser = i, this.Nh = r, 
            this.xh = {}, this.Oh = new us(t => qn(t), Ln), this.Fh = new Map, 
            /**
             * The keys of documents that are in limbo for which we haven't yet started a
             * limbo resolution query.
             */
            this.Mh = [], 
            /**
             * Keeps track of the target ID for each document that is in limbo with an
             * active target.
             */
            this.$h = new ht(W$1.N), 
            /**
             * Keeps track of the information about an active limbo resolution for each
             * active target ID that was started for the purpose of limbo resolution.
             */
            this.kh = new Map, this.Lh = new Qr, 
            /** Stores user completion handlers, indexed by User and BatchId. */
            this.qh = {}, 
            /** Stores user callbacks waiting for all pending writes to be acknowledged. */
            this.Bh = new Map, this.Uh = Ci.fo(), this.onlineState = "Unknown" /* Unknown */ , 
            // The primary state is set to `true` or `false` immediately after Firestore
            // startup. In the interim, a client should only be considered primary if
            // `isPrimary` is true.
            this.Kh = void 0;
        }
        get Qh() {
            return !0 === this.Kh;
        }
    }

    /**
     * Initiates the new listen, resolves promise when listen enqueued to the
     * server. All the subsequent view snapshots or errors are sent to the
     * subscribed handlers. Returns the initial snapshot.
     */
    async function ao(t, e) {
        const n = $o(t);
        let s, i;
        const r = n.Oh.get(e);
        if (r) 
        // PORTING NOTE: With Multi-Tab Web, it is possible that a query view
        // already exists when EventManager calls us for the first time. This
        // happens when the primary tab is already listening to this query on
        // behalf of another tab and the user of the primary also starts listening
        // to the query. EventManager will not have an assigned target ID in this
        // case and calls `listen` to obtain this ID.
        s = r.targetId, n.Ch.Uu(s), i = r.view.ph(); else {
            const t = await Yi(n.va, kn(e)), r = n.Ch.Uu(t.targetId);
            s = t.targetId, i = await uo(n, e, s, "current" === r), n.Qh && lr(n.Sh, t);
        }
        return i;
    }

    /**
     * Registers a view for a previously unknown query and computes its initial
     * snapshot.
     */ async function uo(t, e, n, s) {
        // PORTING NOTE: On Web only, we inject the code that registers new Limbo
        // targets based on view changes. This allows us to only depend on Limbo
        // changes when user code includes queries.
        t.Wh = (e, n, s) => async function(t, e, n, s) {
            let i = e.view.Th(n);
            i.Ah && (
            // The query has a limit and some docs were removed, so we need
            // to re-run the query against the local store to make sure we
            // didn't lose any good docs that had been past the limit.
            i = await Zi(t.va, e.query, 
            /* usePreviousResults= */ !1).then(({documents: t}) => e.view.Th(t, i)));
            const r = s && s.ne.get(e.targetId), o = e.view.Jn(i, 
            /* updateLimboDocuments= */ t.Qh, r);
            return go(t, e.targetId, o.gh), o.snapshot;
        }(t, e, n, s);
        const i = await Zi(t.va, e, 
        /* usePreviousResults= */ !0), r = new io(e, i.kc), o = r.Th(i.documents), c = St.ce(n, s && "Offline" /* Offline */ !== t.onlineState), a = r.Jn(o, 
        /* updateLimboDocuments= */ t.Qh, c);
        go(t, n, a.gh);
        const u = new ro(e, n, r);
        return t.Oh.set(e, u), t.Fh.has(n) ? t.Fh.get(n).push(e) : t.Fh.set(n, [ e ]), a.snapshot;
    }

    /** Stops listening to the query. */ async function ho(t, e) {
        const n = S$1(t), s = n.Oh.get(e), i = n.Fh.get(s.targetId);
        if (i.length > 1) return n.Fh.set(s.targetId, i.filter(t => !Ln(t, e))), void n.Oh.delete(e);
        // No other queries are mapped to the target, clean up the query and the target.
            if (n.Qh) {
            // We need to remove the local query target first to allow us to verify
            // whether any other client is still interested in this target.
            n.Ch.Qu(s.targetId);
            n.Ch.$u(s.targetId) || await Xi(n.va, s.targetId, 
            /*keepPersistedTargetData=*/ !1).then(() => {
                n.Ch.ju(s.targetId), _r(n.Sh, s.targetId), Ro(n, s.targetId);
            }).catch(er);
        } else Ro(n, s.targetId), await Xi(n.va, s.targetId, 
        /*keepPersistedTargetData=*/ !0);
    }

    /**
     * Initiates the write of local mutation batch which involves adding the
     * writes to the mutation queue, notifying the remote store about new
     * mutations and raising events for any changes this write caused.
     *
     * The promise returned by this call is resolved when the above steps
     * have completed, *not* when the write was acked by the backend. The
     * userCallback is resolved once the write was acked/rejected by the
     * backend (or failed locally for any other reason).
     */ async function lo(t, e, n) {
        const s = ko(t);
        try {
            const t = await function(t, e) {
                const n = S$1(t), s = L$1.now(), i = e.reduce((t, e) => t.add(e.key), Pt());
                let r;
                return n.persistence.runTransaction("Locally write mutations", "readwrite", t => n.xc.us(t, i).next(i => {
                    r = i;
                    // For non-idempotent mutations (such as `FieldValue.increment()`),
                    // we record the base state in a separate patch mutation. This is
                    // later used to guarantee consistent values and prevents flicker
                    // even if the backend sends us an update that already includes our
                    // transform.
                    const o = [];
                    for (const t of e) {
                        const e = ln(t, r.get(t.key));
                        null != e && 
                        // NOTE: The base state should only be applied if there's some
                        // existing document to override, so use a Precondition of
                        // exists=true
                        o.push(new wn(t.key, e, Vn(e.proto.mapValue), on.exists(!0)));
                    }
                    return n.es.Sr(t, s, o, e);
                })).then(t => {
                    const e = t.yn(r);
                    return {
                        batchId: t.batchId,
                        Bn: e
                    };
                });
            }(s.va, e);
            s.Ch.ku(t.batchId), function(t, e, n) {
                let s = t.qh[t.currentUser.i()];
                s || (s = new ht(M$1));
                s = s.dt(e, n), t.qh[t.currentUser.i()] = s;
            }
            /**
     * Resolves or rejects the user callback for the given batch and then discards
     * it.
     */ (s, t.batchId, n), await po(s, t.Bn), await Vr(s.Sh);
        } catch (t) {
            // If we can't persist the mutation, we reject the user callback and
            // don't send the mutation. The user can then retry the write.
            const e = Ns(t, "Failed to persist write");
            n.reject(e);
        }
    }

    /**
     * Applies one remote event to the sync engine, notifying any views of the
     * changes, and releasing any pending mutation batches that would become
     * visible because of the snapshot version the remote event contains.
     */ async function _o(t, e) {
        const n = S$1(t);
        try {
            const t = await Hi(n.va, e);
            // Update `receivedDocument` as appropriate for any limbo targets.
                    e.ne.forEach((t, e) => {
                const s = n.kh.get(e);
                s && (
                // Since this is a limbo resolution lookup, it's for a single document
                // and it could be added, modified, or removed, but not a combination.
                v$1(t.ue.size + t.he.size + t.le.size <= 1), t.ue.size > 0 ? s.bh = !0 : t.he.size > 0 ? v$1(s.bh) : t.le.size > 0 && (v$1(s.bh), 
                s.bh = !1));
            }), await po(n, t, e);
        } catch (t) {
            await er(t);
        }
    }

    /**
     * Applies an OnlineState change to the sync engine and notifies any views of
     * the change.
     */ function fo(t, e, n) {
        const s = S$1(t);
        // If we are the secondary client, we explicitly ignore the remote store's
        // online state (the local client may go offline, even though the primary
        // tab remains online) and only apply the primary tab's online state from
        // SharedClientState.
            if (s.Qh && 0 /* RemoteStore */ === n || !s.Qh && 1 /* SharedClientState */ === n) {
            const t = [];
            s.Oh.forEach((n, s) => {
                const i = s.view.Ha(e);
                i.snapshot && t.push(i.snapshot);
            }), function(t, e) {
                const n = S$1(t);
                n.onlineState = e;
                let s = !1;
                n.ja.forEach((t, n) => {
                    for (const t of n.listeners) 
                    // Run global snapshot listeners if a consistent snapshot has been emitted.
                    t.Ha(e) && (s = !0);
                }), s && Ur(n);
            }(s.Dh, e), t.length && s.xh.oa(t), s.onlineState = e, s.Qh && s.Ch.Ju(e);
        }
    }

    /**
     * Rejects the listen for the given targetID. This can be triggered by the
     * backend for any active target.
     *
     * @param syncEngine The sync engine implementation.
     * @param targetId The targetID corresponds to one previously initiated by the
     * user as part of TargetData passed to listen() on RemoteStore.
     * @param err A description of the condition that has forced the rejection.
     * Nearly always this will be an indication that the user is no longer
     * authorized to see the data matching the target.
     */ async function wo(t, e, n) {
        const s = S$1(t);
        // PORTING NOTE: Multi-tab only.
            s.Ch.Gu(e, "rejected", n);
        const i = s.kh.get(e), r = i && i.key;
        if (r) {
            // TODO(klimt): We really only should do the following on permission
            // denied errors, but we don't have the cause code here.
            // It's a limbo doc. Create a synthetic event saying it was deleted.
            // This is kind of a hack. Ideally, we would have a method in the local
            // store to purge a document. However, it would be tricky to keep all of
            // the local store's invariants with another method.
            let t = new ht(W$1.N);
            t = t.dt(r, new bn(r, q$1.min()));
            const n = Pt().add(r), i = new vt(q$1.min(), 
            /* targetChanges= */ new Map, 
            /* targetMismatches= */ new ft(M$1), t, n);
            await _o(s, i), 
            // Since this query failed, we won't want to manually unlisten to it.
            // We only remove it from bookkeeping after we successfully applied the
            // RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
            // this query when the RemoteStore restarts the Watch stream, which should
            // re-trigger the target failure.
            s.$h = s.$h.remove(r), s.kh.delete(e), yo(s);
        } else await Xi(s.va, e, 
        /* keepPersistedTargetData */ !1).then(() => Ro(s, e, n)).catch(er);
    }

    async function Eo(t, e) {
        const n = S$1(t), s = e.batch.batchId;
        try {
            const t = await Gi(n.va, e);
            // The local store may or may not be able to apply the write result and
            // raise events immediately (depending on whether the watcher is caught
            // up), so we raise user callbacks first so that they consistently happen
            // before listen events.
                    Ao(n, s, /*error=*/ null), mo(n, s), n.Ch.qu(s, "acknowledged"), await po(n, t);
        } catch (t) {
            await er(t);
        }
    }

    async function To(t, e, n) {
        const s = S$1(t);
        try {
            const t = await function(t, e) {
                const n = S$1(t);
                return n.persistence.runTransaction("Reject batch", "readwrite-primary", t => {
                    let s;
                    return n.es.Cr(t, e).next(e => (v$1(null !== e), s = e.keys(), n.es.kr(t, e))).next(() => n.es.Ur(t)).next(() => n.xc.us(t, s));
                });
            }
            /**
     * Returns the largest (latest) batch id in mutation queue that is pending
     * server response.
     *
     * Returns `BATCHID_UNKNOWN` if the queue is empty.
     */ (s.va, e);
            // The local store may or may not be able to apply the write result and
            // raise events immediately (depending on whether the watcher is caught up),
            // so we raise user callbacks first so that they consistently happen before
            // listen events.
                    Ao(s, e, n), mo(s, e), s.Ch.qu(e, "rejected", n), await po(s, t);
        } catch (n) {
            await er(n);
        }
    }

    /**
     * Registers a user callback that resolves when all pending mutations at the moment of calling
     * are acknowledged .
     */ async function Io(t, e) {
        const n = S$1(t);
        Tr(n.Sh) || g$1("SyncEngine", "The network is disabled. The task returned by 'awaitPendingWrites()' will not complete until the network is enabled.");
        try {
            const t = await function(t) {
                const e = S$1(t);
                return e.persistence.runTransaction("Get highest unacknowledged batch id", "readonly", t => e.es.Fr(t));
            }(n.va);
            if (-1 === t) 
            // Trigger the callback right away if there is no pending writes at the moment.
            return void e.resolve();
            const s = n.Bh.get(t) || [];
            s.push(e), n.Bh.set(t, s);
        } catch (t) {
            const n = Ns(t, "Initialization of waitForPendingWrites() operation failed");
            e.reject(n);
        }
    }

    /**
     * Triggers the callbacks that are waiting for this batch id to get acknowledged by server,
     * if there are any.
     */ function mo(t, e) {
        (t.Bh.get(e) || []).forEach(t => {
            t.resolve();
        }), t.Bh.delete(e);
    }

    /** Reject all outstanding callbacks waiting for pending writes to complete. */ function Ao(t, e, n) {
        const s = S$1(t);
        let i = s.qh[s.currentUser.i()];
        // NOTE: Mutations restored from persistence won't have callbacks, so it's
        // okay for there to be no callback for this ID.
            if (i) {
            const t = i.get(e);
            t && (n ? t.reject(n) : t.resolve(), i = i.remove(e)), s.qh[s.currentUser.i()] = i;
        }
    }

    function Ro(t, e, n = null) {
        t.Ch.Qu(e);
        for (const s of t.Fh.get(e)) t.Oh.delete(s), n && t.xh.jh(s, n);
        if (t.Fh.delete(e), t.Qh) {
            t.Lh._u(e).forEach(e => {
                t.Lh.Kr(e) || 
                // We removed the last reference for this key
                Po(t, e);
            });
        }
    }

    function Po(t, e) {
        // It's possible that the target already got removed because the query failed. In that case,
        // the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
        const n = t.$h.get(e);
        null !== n && (_r(t.Sh, n), t.$h = t.$h.remove(e), t.kh.delete(n), yo(t));
    }

    function go(t, e, n) {
        for (const s of n) if (s instanceof no) t.Lh.Do(s.key, e), Vo(t, s); else if (s instanceof so) {
            g$1("SyncEngine", "Document no longer in limbo: " + s.key), t.Lh.No(s.key, e);
            t.Lh.Kr(s.key) || 
            // We removed the last reference for this key
            Po(t, s.key);
        } else b();
    }

    function Vo(t, e) {
        const n = e.key;
        t.$h.get(n) || (g$1("SyncEngine", "New document in limbo: " + n), t.Mh.push(n), yo(t));
    }

    /**
     * Starts listens for documents in limbo that are enqueued for resolution,
     * subject to a maximum number of concurrent resolutions.
     *
     * Without bounding the number of concurrent resolutions, the server can fail
     * with "resource exhausted" errors which can lead to pathological client
     * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
     */ function yo(t) {
        for (;t.Mh.length > 0 && t.$h.size < t.Nh; ) {
            const e = t.Mh.shift(), n = t.Uh.next();
            t.kh.set(n, new oo(e)), t.$h = t.$h.dt(e, n), lr(t.Sh, new it(kn(Cn(e.path)), n, 2 /* LimboResolution */ , Es.bs));
        }
    }

    async function po(t, e, n) {
        const s = S$1(t), i = [], r = [], o = [];
        s.Oh.L() || (s.Oh.forEach((t, c) => {
            o.push(s.Wh(c, e, n).then(t => {
                if (t) {
                    s.Qh && s.Ch.Gu(c.targetId, t.fromCache ? "not-current" : "current"), i.push(t);
                    const e = ws.Ps(c.targetId, t);
                    r.push(e);
                }
            }));
        }), await Promise.all(o), s.xh.oa(i), await async function(t, e) {
            const n = S$1(t);
            try {
                await n.persistence.runTransaction("notifyLocalViewChanges", "readwrite", t => hs.forEach(e, e => hs.forEach(e.As, s => n.persistence.yr.Do(t, e.targetId, s)).next(() => hs.forEach(e.Rs, s => n.persistence.yr.No(t, e.targetId, s)))));
            } catch (t) {
                if (!Ps(t)) throw t;
                // If `notifyLocalViewChanges` fails, we did not advance the sequence
                // number for the documents that were included in this transaction.
                // This might trigger them to be deleted earlier than they otherwise
                // would have, but it should not invalidate the integrity of the data.
                g$1("LocalStore", "Failed to update sequence numbers: " + t);
            }
            for (const t of e) {
                const e = t.targetId;
                if (!t.fromCache) {
                    const t = n.Sc.get(e), s = t.ht, i = t.ft(s);
                    // Advance the last limbo free snapshot version
                                    n.Sc = n.Sc.dt(e, i);
                }
            }
        }(s.va, r));
    }

    async function bo(t, e) {
        const n = S$1(t);
        if (!n.currentUser.isEqual(e)) {
            g$1("SyncEngine", "User change. New user:", e.i());
            const t = await ji(n.va, e);
            n.currentUser = e, 
            // Fails tasks waiting for pending writes requested by previous user.
            function(t, e) {
                t.Bh.forEach(t => {
                    t.forEach(t => {
                        t.reject(new C$1(D$1.CANCELLED, e));
                    });
                }), t.Bh.clear();
            }(n, "'waitForPendingWrites' promise is rejected due to a user change."), 
            // TODO(b/114226417): Consider calling this only in the primary tab.
            n.Ch.Hu(e, t.Mc, t.$c), await po(n, t.Fc);
        }
    }

    function vo(t, e) {
        const n = S$1(t), s = n.kh.get(e);
        if (s && s.bh) return Pt().add(s.key);
        {
            let t = Pt();
            const s = n.Fh.get(e);
            if (!s) return t;
            for (const e of s) {
                const s = n.Oh.get(e);
                t = t.Qt(s.view.Eh);
            }
            return t;
        }
    }

    /**
     * Reconcile the list of synced documents in an existing view with those
     * from persistence.
     */ async function So(t, e) {
        const n = S$1(t), s = await Zi(n.va, e.query, 
        /* usePreviousResults= */ !0), i = e.view.yh(s);
        return n.Qh && go(n, e.targetId, i.gh), i;
    }

    /** Applies a mutation state to an existing batch.  */
    // PORTING NOTE: Multi-Tab only.
    async function Do(t, e, n, s) {
        const i = S$1(t), r = await function(t, e) {
            const n = S$1(t), s = S$1(n.es);
            return n.persistence.runTransaction("Lookup mutation documents", "readonly", t => s.Nr(t, e).next(e => e ? n.xc.us(t, e) : hs.resolve(null)));
        }
        // PORTING NOTE: Multi-Tab only.
        (i.va, e);
        null !== r ? ("pending" === n ? 
        // If we are the primary client, we need to send this write to the
        // backend. Secondary clients will ignore these writes since their remote
        // connection is disabled.
        await Vr(i.Sh) : "acknowledged" === n || "rejected" === n ? (
        // NOTE: Both these methods are no-ops for batches that originated from
        // other clients.
        Ao(i, e, s || null), mo(i, e), function(t, e) {
            S$1(S$1(t).es).qr(e);
        }
        // PORTING NOTE: Multi-Tab only.
        (i.va, e)) : b(), await po(i, r)) : 
        // A throttled tab may not have seen the mutation before it was completed
        // and removed from the mutation queue, in which case we won't have cached
        // the affected documents. In this case we can safely ignore the update
        // since that means we didn't apply the mutation locally at all (if we
        // had, we would have cached the affected documents), and so we will just
        // see any resulting document changes via normal remote document updates
        // as applicable.
        g$1("SyncEngine", "Cannot apply mutation batch with id: " + e);
    }

    /** Applies a query target change from a different tab. */
    // PORTING NOTE: Multi-Tab only.
    async function Co(t, e) {
        const n = S$1(t);
        if ($o(n), ko(n), !0 === e && !0 !== n.Kh) {
            // Secondary tabs only maintain Views for their local listeners and the
            // Views internal state may not be 100% populated (in particular
            // secondary tabs don't track syncedDocuments, the set of documents the
            // server considers to be in the target). So when a secondary becomes
            // primary, we need to need to make sure that all views for all targets
            // match the state on disk.
            const t = n.Ch.Fu(), e = await No(n, t.U());
            n.Kh = !0, await xr(n.Sh, !0);
            for (const t of e) lr(n.Sh, t);
        } else if (!1 === e && !1 !== n.Kh) {
            const t = [];
            let e = Promise.resolve();
            n.Fh.forEach((s, i) => {
                n.Ch.Wu(i) ? t.push(i) : e = e.then(() => (Ro(n, i), Xi(n.va, i, 
                /*keepPersistedTargetData=*/ !0))), _r(n.Sh, i);
            }), await e, await No(n, t), 
            // PORTING NOTE: Multi-Tab only.
            function(t) {
                const e = S$1(t);
                e.kh.forEach((t, n) => {
                    _r(e.Sh, n);
                }), e.Lh.fu(), e.kh = new Map, e.$h = new ht(W$1.N);
            }
            /**
     * Reconcile the query views of the provided query targets with the state from
     * persistence. Raises snapshots for any changes that affect the local
     * client and returns the updated state of all target's query data.
     *
     * @param syncEngine The sync engine implementation
     * @param targets the list of targets with views that need to be recomputed
     * @param transitionToPrimary `true` iff the tab transitions from a secondary
     * tab to a primary tab
     */
            // PORTING NOTE: Multi-Tab only.
            (n), n.Kh = !1, await xr(n.Sh, !1);
        }
    }

    async function No(t, e, n) {
        const s = S$1(t), i = [], r = [];
        for (const t of e) {
            let e;
            const n = s.Fh.get(t);
            if (n && 0 !== n.length) {
                // For queries that have a local View, we fetch their current state
                // from LocalStore (as the resume token and the snapshot version
                // might have changed) and reconcile their views with the persisted
                // state (the list of syncedDocuments may have gotten out of sync).
                e = await Yi(s.va, kn(n[0]));
                for (const t of n) {
                    const e = s.Oh.get(t), n = await So(s, e);
                    n.snapshot && r.push(n.snapshot);
                }
            } else {
                // For queries that never executed on this client, we need to
                // allocate the target in LocalStore and initialize a new View.
                const n = await tr(s.va, t);
                e = await Yi(s.va, n), await uo(s, xo(n), t, 
                /*current=*/ !1);
            }
            i.push(e);
        }
        return s.xh.oa(r), i;
    }

    /**
     * Creates a `Query` object from the specified `Target`. There is no way to
     * obtain the original `Query`, so we synthesize a `Query` from the `Target`
     * object.
     *
     * The synthesized result might be different from the original `Query`, but
     * since the synthesized `Query` should return the same results as the
     * original one (only the presentation of results might differ), the potential
     * difference will not cause issues.
     */
    // PORTING NOTE: Multi-Tab only.
    function xo(t) {
        return Dn(t.path, t.collectionGroup, t.orderBy, t.filters, t.limit, "F" /* First */ , t.startAt, t.endAt);
    }

    /** Returns the IDs of the clients that are currently active. */
    // PORTING NOTE: Multi-Tab only.
    function Oo(t) {
        const e = S$1(t);
        return S$1(S$1(e.va).persistence).Tc();
    }

    /** Applies a query target change from a different tab. */
    // PORTING NOTE: Multi-Tab only.
    async function Fo(t, e, n, s) {
        const i = S$1(t);
        if (i.Kh) 
        // If we receive a target state notification via WebStorage, we are
        // either already secondary or another tab has taken the primary lease.
        g$1("SyncEngine", "Ignoring unexpected query state notification."); else if (i.Fh.has(e)) switch (n) {
          case "current":
          case "not-current":
            {
                const t = await function(t) {
                    const e = S$1(t), n = S$1(e.Nc);
                    return e.persistence.runTransaction("Get new document changes", "readonly", t => n.Zr(t, e.Cc)).then(({eo: t, readTime: n}) => (e.Cc = n, 
                    t));
                }
                /**
     * Reads the newest document change from persistence and moves the internal
     * synchronization marker forward so that calls to `getNewDocumentChanges()`
     * only return changes that happened after client initialization.
     */
                // PORTING NOTE: Multi-Tab only.
                (i.va), s = vt.oe(e, "current" === n);
                await po(i, t, s);
                break;
            }

          case "rejected":
            await Xi(i.va, e, 
            /* keepPersistedTargetData */ !0), Ro(i, e, s);
            break;

          default:
            b();
        }
    }

    /** Adds or removes Watch targets for queries from different tabs. */ async function Mo(t, e, n) {
        const s = $o(t);
        if (s.Kh) {
            for (const t of e) {
                if (s.Fh.has(t)) {
                    // A target might have been added in a previous attempt
                    g$1("SyncEngine", "Adding an already active target " + t);
                    continue;
                }
                const e = await tr(s.va, t), n = await Yi(s.va, e);
                await uo(s, xo(e), n.targetId, 
                /*current=*/ !1), lr(s.Sh, n);
            }
            for (const t of n) 
            // Check that the target is still active since the target might have been
            // removed if it has been rejected by the backend.
            s.Fh.has(t) && 
            // Release queries that are still active.
            await Xi(s.va, t, 
            /* keepPersistedTargetData */ !1).then(() => {
                _r(s.Sh, t), Ro(s, t);
            }).catch(er);
        }
    }

    function $o(t) {
        const e = S$1(t);
        return e.Sh.Da.qa = _o.bind(null, e), e.Sh.Da.He = vo.bind(null, e), e.Sh.Da.La = wo.bind(null, e), 
        e.xh.oa = qr.bind(null, e.Dh), e.xh.jh = Br.bind(null, e.Dh), e;
    }

    function ko(t) {
        const e = S$1(t);
        return e.Sh.Da.Ba = Eo.bind(null, e), e.Sh.Da.Ua = To.bind(null, e), e;
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // TOOD(b/140938512): Drop SimpleQueryEngine and rename IndexFreeQueryEngine.
    /**
     * A query engine that takes advantage of the target document mapping in the
     * QueryCache. The IndexFreeQueryEngine optimizes query execution by only
     * reading the documents that previously matched a query plus any documents that were
     * edited after the query was last listened to.
     *
     * There are some cases where Index-Free queries are not guaranteed to produce
     * the same results as full collection scans. In these cases, the
     * IndexFreeQueryEngine falls back to full query processing. These cases are:
     *
     * - Limit queries where a document that matched the query previously no longer
     *   matches the query.
     *
     * - Limit queries where a document edit may cause the document to sort below
     *   another document that is in the local cache.
     *
     * - Queries that have never been CURRENT or free of Limbo documents.
     */ class Lo {
        Oc(t) {
            this.Gh = t;
        }
        _s(t, e, n, s) {
            // Queries that match all documents don't benefit from using
            // IndexFreeQueries. It is more efficient to scan all documents in a
            // collection, rather than to perform individual lookups.
            return function(t) {
                return 0 === t.filters.length && null === t.limit && null == t.startAt && null == t.endAt && (0 === t.dn.length || 1 === t.dn.length && t.dn[0].field.H());
            }(e) || n.isEqual(q$1.min()) ? this.zh(t, e) : this.Gh.us(t, s).next(i => {
                const r = this.Hh(e, i);
                return (Nn(e) || xn(e)) && this.Ah(e.wn, r, s, n) ? this.zh(t, e) : (R$1() <= exports.LogLevel.DEBUG && g$1("IndexFreeQueryEngine", "Re-using previous result from %s to execute query: %s", n.toString(), Bn(e)), 
                this.Gh._s(t, e, n).next(t => (
                // We merge `previousResults` into `updateResults`, since
                // `updateResults` is already a DocumentMap. If a document is
                // contained in both lists, then its contents are the same.
                r.forEach(e => {
                    t = t.dt(e.key, e);
                }), t)));
            });
            // Queries that have never seen a snapshot without limbo free documents
            // should also be run as a full collection scan.
            }
        /** Applies the query filter and sorting to the provided documents.  */    Hh(t, e) {
            // Sort the documents and re-apply the query filter since previously
            // matching documents do not necessarily still match the query.
            let n = new ft(Kn(t));
            return e.forEach((e, s) => {
                s instanceof pn && Un(t, s) && (n = n.add(s));
            }), n;
        }
        /**
         * Determines if a limit query needs to be refilled from cache, making it
         * ineligible for index-free execution.
         *
         * @param sortedPreviousResults The documents that matched the query when it
         * was last synchronized, sorted by the query's comparator.
         * @param remoteKeys The document keys that matched the query at the last
         * snapshot.
         * @param limboFreeSnapshotVersion The version of the snapshot when the query
         * was last synchronized.
         */    Ah(t, e, n, s) {
            // The query needs to be refilled if a previously matching document no
            // longer matches.
            if (n.size !== e.size) return !0;
            // Limit queries are not eligible for index-free query execution if there is
            // a potential that an older document from cache now sorts before a document
            // that was previously part of the limit. This, however, can only happen if
            // the document at the edge of the limit goes out of limit.
            // If a document that is not the limit boundary sorts differently,
            // the boundary of the limit itself did not change and documents from cache
            // will continue to be "rejected" by this boundary. Therefore, we can ignore
            // any modifications that don't affect the last document.
                    const i = "F" /* First */ === t ? e.last() : e.first();
            return !!i && (i.hasPendingWrites || i.version.v(s) > 0);
        }
        zh(t, e) {
            return R$1() <= exports.LogLevel.DEBUG && g$1("IndexFreeQueryEngine", "Using full collection scan to execute query:", Bn(e)), 
            this.Gh._s(t, e, q$1.min());
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class qo {
        constructor(t, e) {
            this.ns = t, this.yr = e, 
            /**
             * The set of all mutations that have been sent but not yet been applied to
             * the backend.
             */
            this.es = [], 
            /** Next value to use when assigning sequential IDs to each mutation batch. */
            this.Jh = 1, 
            /** An ordered mapping between documents and the mutations batch IDs. */
            this.Yh = new ft(Wr.ou);
        }
        vr(t) {
            return hs.resolve(0 === this.es.length);
        }
        Sr(t, e, n, s) {
            const i = this.Jh;
            if (this.Jh++, this.es.length > 0) {
                this.es[this.es.length - 1];
            }
            const r = new cs(i, e, n, s);
            this.es.push(r);
            // Track references by document key and index collection parents.
            for (const e of s) this.Yh = this.Yh.add(new Wr(e.key, i)), this.ns.Dr(t, e.key.path.M());
            return hs.resolve(r);
        }
        Cr(t, e) {
            return hs.resolve(this.Xh(e));
        }
        Or(t, e) {
            const n = e + 1, s = this.Zh(n), i = s < 0 ? 0 : s;
            // The requested batchId may still be out of range so normalize it to the
            // start of the queue.
                    return hs.resolve(this.es.length > i ? this.es[i] : null);
        }
        Fr() {
            return hs.resolve(0 === this.es.length ? -1 : this.Jh - 1);
        }
        Mr(t) {
            return hs.resolve(this.es.slice());
        }
        rs(t, e) {
            const n = new Wr(e, 0), s = new Wr(e, Number.POSITIVE_INFINITY), i = [];
            return this.Yh.Bt([ n, s ], t => {
                const e = this.Xh(t.wu);
                i.push(e);
            }), hs.resolve(i);
        }
        ls(t, e) {
            let n = new ft(M$1);
            return e.forEach(t => {
                const e = new Wr(t, 0), s = new Wr(t, Number.POSITIVE_INFINITY);
                this.Yh.Bt([ e, s ], t => {
                    n = n.add(t.wu);
                });
            }), hs.resolve(this.tl(n));
        }
        Ts(t, e) {
            // Use the query path as a prefix for testing if a document matches the
            // query.
            const n = e.path, s = n.length + 1;
            // Construct a document reference for actually scanning the index. Unlike
            // the prefix the document key in this reference must have an even number of
            // segments. The empty segment can be used a suffix of the query path
            // because it precedes all other segments in an ordered traversal.
            let i = n;
            W$1.et(i) || (i = i.child(""));
            const r = new Wr(new W$1(i), 0);
            // Find unique batchIDs referenced by all documents potentially matching the
            // query.
                    let o = new ft(M$1);
            return this.Yh.Ut(t => {
                const e = t.key.path;
                return !!n.q(e) && (
                // Rows with document keys more than one segment longer than the query
                // path can't be matches. For example, a query on 'rooms' can't match
                // the document /rooms/abc/messages/xyx.
                // TODO(mcg): we'll need a different scanner when we implement
                // ancestor queries.
                e.length === s && (o = o.add(t.wu)), !0);
            }, r), hs.resolve(this.tl(o));
        }
        tl(t) {
            // Construct an array of matching batches, sorted by batchID to ensure that
            // multiple mutations affecting the same document key are applied in order.
            const e = [];
            return t.forEach(t => {
                const n = this.Xh(t);
                null !== n && e.push(n);
            }), e;
        }
        kr(t, e) {
            v$1(0 === this.el(e.batchId, "removed")), this.es.shift();
            let n = this.Yh;
            return hs.forEach(e.mutations, s => {
                const i = new Wr(s.key, e.batchId);
                return n = n.delete(i), this.yr.Br(t, s.key);
            }).next(() => {
                this.Yh = n;
            });
        }
        qr(t) {
            // No-op since the memory mutation queue does not maintain a separate cache.
        }
        Kr(t, e) {
            const n = new Wr(e, 0), s = this.Yh.Kt(n);
            return hs.resolve(e.isEqual(s && s.key));
        }
        Ur(t) {
            return this.es.length, hs.resolve();
        }
        /**
         * Finds the index of the given batchId in the mutation queue and asserts that
         * the resulting index is within the bounds of the queue.
         *
         * @param batchId The batchId to search for
         * @param action A description of what the caller is doing, phrased in passive
         * form (e.g. "acknowledged" in a routine that acknowledges batches).
         */    el(t, e) {
            return this.Zh(t);
        }
        /**
         * Finds the index of the given batchId in the mutation queue. This operation
         * is O(1).
         *
         * @return The computed index of the batch with the given batchId, based on
         * the state of the queue. Note this index can be negative if the requested
         * batchId has already been remvoed from the queue or past the end of the
         * queue if the batchId is larger than the last added batch.
         */    Zh(t) {
            if (0 === this.es.length) 
            // As an index this is past the end of the queue
            return 0;
            // Examine the front of the queue to figure out the difference between the
            // batchId and indexes in the array. Note that since the queue is ordered
            // by batchId, if the first batch has a larger batchId then the requested
            // batchId doesn't exist in the queue.
                    return t - this.es[0].batchId;
        }
        /**
         * A version of lookupMutationBatch that doesn't return a promise, this makes
         * other functions that uses this code easier to read and more efficent.
         */    Xh(t) {
            const e = this.Zh(t);
            if (e < 0 || e >= this.es.length) return null;
            return this.es[e];
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Bo {
        /**
         * @param sizer Used to assess the size of a document. For eager GC, this is expected to just
         * return 0 to avoid unnecessarily doing the work of calculating the size.
         */
        constructor(t, e) {
            this.ns = t, this.nl = e, 
            /** Underlying cache of documents and their read times. */
            this.docs = new ht(W$1.N), 
            /** Size of all cached documents. */
            this.size = 0;
        }
        /**
         * Adds the supplied entry to the cache and updates the cache size as appropriate.
         *
         * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()`.
         */    Qn(t, e, n) {
            const s = e.key, i = this.docs.get(s), r = i ? i.size : 0, o = this.nl(e);
            return this.docs = this.docs.dt(s, {
                zr: e,
                size: o,
                readTime: n
            }), this.size += o - r, this.ns.Dr(t, s.path.M());
        }
        /**
         * Removes the specified entry from the cache and updates the cache size as appropriate.
         *
         * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
         * returned by `newChangeBuffer()`.
         */    jn(t) {
            const e = this.docs.get(t);
            e && (this.docs = this.docs.remove(t), this.size -= e.size);
        }
        Gn(t, e) {
            const n = this.docs.get(e);
            return hs.resolve(n ? n.zr : null);
        }
        getEntries(t, e) {
            let n = Tt();
            return e.forEach(t => {
                const e = this.docs.get(t);
                n = n.dt(t, e ? e.zr : null);
            }), hs.resolve(n);
        }
        _s(t, e, n) {
            let s = mt();
            // Documents are ordered by key, so we can use a prefix scan to narrow down
            // the documents we need to match the query against.
                    const i = new W$1(e.path.child("")), r = this.docs.Pt(i);
            for (;r.St(); ) {
                const {key: t, value: {zr: i, readTime: o}} = r.vt();
                if (!e.path.q(t.path)) break;
                o.v(n) <= 0 || i instanceof pn && Un(e, i) && (s = s.dt(i.key, i));
            }
            return hs.resolve(s);
        }
        sl(t, e) {
            return hs.forEach(this.docs, t => e(t));
        }
        so(t) {
            // `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
            // a separate changelog and does not need special handling for removals.
            return new Bo.io(this);
        }
        oo(t) {
            return hs.resolve(this.size);
        }
    }

    /**
     * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
     */ Bo.io = class extends ls {
        constructor(t) {
            super(), this.co = t;
        }
        Jn(t) {
            const e = [];
            return this.Bn.forEach((n, s) => {
                s ? e.push(this.co.Qn(t, s, this.readTime)) : this.co.jn(n);
            }), hs.Ln(e);
        }
        zn(t, e) {
            return this.co.Gn(t, e);
        }
        Hn(t, e) {
            return this.co.getEntries(t, e);
        }
    };

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Uo {
        constructor(t) {
            this.persistence = t, 
            /**
             * Maps a target to the data about that target
             */
            this.il = new us(t => Z$1(t), et), 
            /** The last received snapshot version. */
            this.lastRemoteSnapshotVersion = q$1.min(), 
            /** The highest numbered target ID encountered. */
            this.highestTargetId = 0, 
            /** The highest sequence number encountered. */
            this.rl = 0, 
            /**
             * A ordered bidirectional mapping between documents and the remote target
             * IDs.
             */
            this.ol = new Qr, this.targetCount = 0, this.cl = Ci._o();
        }
        Le(t, e) {
            return this.il.forEach((t, n) => e(n)), hs.resolve();
        }
        To(t) {
            return hs.resolve(this.lastRemoteSnapshotVersion);
        }
        Io(t) {
            return hs.resolve(this.rl);
        }
        do(t) {
            return this.highestTargetId = this.cl.next(), hs.resolve(this.highestTargetId);
        }
        mo(t, e, n) {
            return n && (this.lastRemoteSnapshotVersion = n), e > this.rl && (this.rl = e), 
            hs.resolve();
        }
        Ro(t) {
            this.il.set(t.target, t);
            const e = t.targetId;
            e > this.highestTargetId && (this.cl = new Ci(e), this.highestTargetId = e), t.sequenceNumber > this.rl && (this.rl = t.sequenceNumber);
        }
        Ao(t, e) {
            return this.Ro(e), this.targetCount += 1, hs.resolve();
        }
        Vo(t, e) {
            return this.Ro(e), hs.resolve();
        }
        yo(t, e) {
            return this.il.delete(e.target), this.ol._u(e.targetId), this.targetCount -= 1, 
            hs.resolve();
        }
        mr(t, e, n) {
            let s = 0;
            const i = [];
            return this.il.forEach((r, o) => {
                o.sequenceNumber <= e && null === n.get(o.targetId) && (this.il.delete(r), i.push(this.po(t, o.targetId)), 
                s++);
            }), hs.Ln(i).next(() => s);
        }
        bo(t) {
            return hs.resolve(this.targetCount);
        }
        vo(t, e) {
            const n = this.il.get(e) || null;
            return hs.resolve(n);
        }
        So(t, e, n) {
            return this.ol.uu(e, n), hs.resolve();
        }
        Co(t, e, n) {
            this.ol.lu(e, n);
            const s = this.persistence.yr, i = [];
            return s && e.forEach(e => {
                i.push(s.Br(t, e));
            }), hs.Ln(i);
        }
        po(t, e) {
            return this.ol._u(e), hs.resolve();
        }
        xo(t, e) {
            const n = this.ol.du(e);
            return hs.resolve(n);
        }
        Kr(t, e) {
            return hs.resolve(this.ol.Kr(e));
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A memory-backed instance of Persistence. Data is stored only in RAM and
     * not persisted across sessions.
     */
    class Ko {
        /**
         * The constructor accepts a factory for creating a reference delegate. This
         * allows both the delegate and this instance to have strong references to
         * each other without having nullable fields that would then need to be
         * checked or asserted on every access.
         */
        constructor(t) {
            this.al = {}, this.$o = new Es(0), this.ko = !1, this.ko = !0, this.yr = t(this), 
            this.jo = new Uo(this);
            this.ns = new hi, this.ts = new Bo(this.ns, t => this.yr.ul(t));
        }
        start() {
            return Promise.resolve();
        }
        _c() {
            // No durable state to ensure is closed on shutdown.
            return this.ko = !1, Promise.resolve();
        }
        get lr() {
            return this.ko;
        }
        Zo() {
            // No op.
        }
        tc() {
            // No op.
        }
        Rc() {
            return this.ns;
        }
        Ic(t) {
            let e = this.al[t.i()];
            return e || (e = new qo(this.ns, this.yr), this.al[t.i()] = e), e;
        }
        mc() {
            return this.jo;
        }
        Ac() {
            return this.ts;
        }
        runTransaction(t, e, n) {
            g$1("MemoryPersistence", "Starting transaction:", t);
            const s = new Qo(this.$o.next());
            return this.yr.hl(), n(s).next(t => this.yr.ll(s).next(() => t)).$n().then(t => (s.Zn(), 
            t));
        }
        _l(t, e) {
            return hs.qn(Object.values(this.al).map(n => () => n.Kr(t, e)));
        }
    }

    /**
     * Memory persistence is not actually transactional, but future implementations
     * may have transaction-scoped state.
     */ class Qo extends fs {
        constructor(t) {
            super(), this.Oo = t;
        }
    }

    class Wo {
        constructor(t) {
            this.persistence = t, 
            /** Tracks all documents that are active in Query views. */
            this.fl = new Qr, 
            /** The list of documents that are potentially GCed after each transaction. */
            this.dl = null;
        }
        static wl(t) {
            return new Wo(t);
        }
        get El() {
            if (this.dl) return this.dl;
            throw b();
        }
        Do(t, e, n) {
            return this.fl.Do(n, e), this.El.delete(n.toString()), hs.resolve();
        }
        No(t, e, n) {
            return this.fl.No(n, e), this.El.add(n.toString()), hs.resolve();
        }
        Br(t, e) {
            return this.El.add(e.toString()), hs.resolve();
        }
        removeTarget(t, e) {
            this.fl._u(e.targetId).forEach(t => this.El.add(t.toString()));
            const n = this.persistence.mc();
            return n.xo(t, e.targetId).next(t => {
                t.forEach(t => this.El.add(t.toString()));
            }).next(() => n.yo(t, e));
        }
        hl() {
            this.dl = new Set;
        }
        ll(t) {
            // Remove newly orphaned documents.
            const e = this.persistence.Ac().so();
            return hs.forEach(this.El, n => {
                const s = W$1.X(n);
                return this.Tl(t, s).next(t => {
                    t || e.jn(s);
                });
            }).next(() => (this.dl = null, e.apply(t)));
        }
        bc(t, e) {
            return this.Tl(t, e).next(t => {
                t ? this.El.delete(e.toString()) : this.El.add(e.toString());
            });
        }
        ul(t) {
            // For eager GC, we don't care about the document size, there are no size thresholds.
            return 0;
        }
        Tl(t, e) {
            return hs.qn([ () => hs.resolve(this.fl.Kr(e)), () => this.persistence.mc().Kr(t, e), () => this.persistence._l(t, e) ]);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Provides a simple helper class that implements the Stream interface to
     * bridge to other implementations that are streams but do not implement the
     * interface. The stream callbacks are invoked with the callOn... methods.
     */ class jo {
        constructor(t) {
            this.Il = t.Il, this.ml = t.ml;
        }
        ia(t) {
            this.Al = t;
        }
        Zc(t) {
            this.Rl = t;
        }
        onMessage(t) {
            this.Pl = t;
        }
        close() {
            this.ml();
        }
        send(t) {
            this.Il(t);
        }
        gl() {
            this.Al();
        }
        Vl(t) {
            this.Rl(t);
        }
        yl(t) {
            this.Pl(t);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Go = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery"
    };

    /**
     * Maps RPC names to the corresponding REST endpoint name.
     *
     * We use array notation to avoid mangling.
     */ class zo extends 
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class {
        constructor(t) {
            this.pl = t, this.st = t.st;
            const e = t.ssl ? "https" : "http";
            this.bl = e + "://" + t.host, this.vl = "projects/" + this.st.projectId + "/databases/" + this.st.database + "/documents";
        }
        Ta(t, e, n, s) {
            const i = this.Sl(t, e);
            g$1("RestConnection", "Sending: ", i, n);
            const r = {};
            return this.Dl(r, s), this.Cl(t, i, r, n).then(t => (g$1("RestConnection", "Received: ", t), 
            t), e => {
                throw y$1("RestConnection", t + " failed with error: ", e, "url: ", i, "request:", n), 
                e;
            });
        }
        Ia(t, e, n, s) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.Ta(t, e, n, s);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    Dl(t, e) {
            if (t["X-Goog-Api-Client"] = "gl-js/ fire/7.21.1", 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid triggering preflight requests.
            t["Content-Type"] = "text/plain", e) for (const n in e.h) e.h.hasOwnProperty(n) && (t[n] = e.h[n]);
        }
        Sl(t, e) {
            const n = Go[t];
            return `${this.bl}/v1/${e}:${n}`;
        }
    }
    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ {
        constructor(t) {
            super(t), this.forceLongPolling = t.forceLongPolling;
        }
        Cl(t, e, n, s) {
            return new Promise((i, r) => {
                const o = new esm_5;
                o.listenOnce(esm_3.COMPLETE, () => {
                    try {
                        switch (o.getLastErrorCode()) {
                          case esm_2.NO_ERROR:
                            const e = o.getResponseJson();
                            g$1("Connection", "XHR received:", JSON.stringify(e)), i(e);
                            break;

                          case esm_2.TIMEOUT:
                            g$1("Connection", 'RPC "' + t + '" timed out'), r(new C$1(D$1.DEADLINE_EXCEEDED, "Request time out"));
                            break;

                          case esm_2.HTTP_ERROR:
                            const n = o.getStatus();
                            if (g$1("Connection", 'RPC "' + t + '" failed with status:', n, "response text:", o.getResponseText()), 
                            n > 0) {
                                const t = o.getResponseJson().error;
                                if (t && t.status && t.message) {
                                    const e = function(t) {
                                        const e = t.toLowerCase().replace("_", "-");
                                        return Object.values(D$1).indexOf(e) >= 0 ? e : D$1.UNKNOWN;
                                    }(t.status);
                                    r(new C$1(e, t.message));
                                } else r(new C$1(D$1.UNKNOWN, "Server responded with status " + o.getStatus()));
                            } else 
                            // If we received an HTTP_ERROR but there's no status code,
                            // it's most probably a connection issue
                            r(new C$1(D$1.UNAVAILABLE, "Connection failed."));
                            break;

                          default:
                            b();
                        }
                    } finally {
                        g$1("Connection", 'RPC "' + t + '" completed.');
                    }
                });
                const c = JSON.stringify(s);
                o.send(e, "POST", c, n, 15);
            });
        }
        ra(t, e) {
            const n = [ this.bl, "/", "google.firestore.v1.Firestore", "/", t, "/channel" ], s = esm_1(), i = {
                // Required for backend stickiness, routing behavior is based on this
                // parameter.
                httpSessionIdParam: "gsessionid",
                initMessageHeaders: {},
                messageUrlParams: {
                    // This param is used to improve routing and project isolation by the
                    // backend and must be included in every request.
                    database: `projects/${this.st.projectId}/databases/${this.st.database}`
                },
                sendRawJson: !0,
                supportsCrossDomainXhr: !0,
                internalChannelParams: {
                    // Override the default timeout (randomized between 10-20 seconds) since
                    // a large write batch on a slow internet connection may take a long
                    // time to send to the backend. Rather than have WebChannel impose a
                    // tight timeout which could lead to infinite timeouts and retries, we
                    // set it very large (5-10 minutes) and rely on the browser's builtin
                    // timeouts to kick in if the request isn't working.
                    forwardChannelRequestTimeoutMs: 6e5
                },
                forceLongPolling: this.forceLongPolling
            };
            this.Dl(i.initMessageHeaders, e), 
            // Sending the custom headers we just added to request.initMessageHeaders
            // (Authorization, etc.) will trigger the browser to make a CORS preflight
            // request because the XHR will no longer meet the criteria for a "simple"
            // CORS request:
            // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
            // Therefore to avoid the CORS preflight request (an extra network
            // roundtrip), we use the httpHeadersOverwriteParam option to specify that
            // the headers should instead be encoded into a special "$httpHeaders" query
            // parameter, which is recognized by the webchannel backend. This is
            // formally defined here:
            // https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
            // TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
            // doesn't have an Origin header. So we have to exclude a few browser environments that are
            // known to (sometimes) not include an Origin. See
            // https://github.com/firebase/firebase-js-sdk/issues/1491.
            isMobileCordova() || isReactNative() || isElectron() || isIE() || isUWP() || isBrowserExtension() || (i.httpHeadersOverwriteParam = "$httpHeaders");
            const r = n.join("");
            g$1("Connection", "Creating WebChannel: " + r, i);
            const o = s.createWebChannel(r, i);
            // WebChannel supports sending the first message with the handshake - saving
            // a network round trip. However, it will have to call send in the same
            // JS event loop as open. In order to enforce this, we delay actually
            // opening the WebChannel until send is called. Whether we have called
            // open is tracked with this variable.
                    let c = !1, d = !1;
            // A flag to determine whether the stream was closed (by us or through an
            // error/close event) to avoid delivering multiple close events or sending
            // on a closed stream
                    const w = new jo({
                Il: t => {
                    d ? g$1("Connection", "Not sending because WebChannel is closed:", t) : (c || (g$1("Connection", "Opening WebChannel transport."), 
                    o.open(), c = !0), g$1("Connection", "WebChannel sending:", t), o.send(t));
                },
                ml: () => o.close()
            }), E = (t, e) => {
                // TODO(dimond): closure typing seems broken because WebChannel does
                // not implement goog.events.Listenable
                o.listen(t, t => {
                    try {
                        e(t);
                    } catch (t) {
                        setTimeout(() => {
                            throw t;
                        }, 0);
                    }
                });
            };
            // Closure events are guarded and exceptions are swallowed, so catch any
            // exception and rethrow using a setTimeout so they become visible again.
            // Note that eventually this function could go away if we are confident
            // enough the code is exception free.
                    return E(esm_4.EventType.OPEN, () => {
                d || g$1("Connection", "WebChannel transport opened.");
            }), E(esm_4.EventType.CLOSE, () => {
                d || (d = !0, g$1("Connection", "WebChannel transport closed"), w.Vl());
            }), E(esm_4.EventType.ERROR, t => {
                d || (d = !0, y$1("Connection", "WebChannel transport errored:", t), w.Vl(new C$1(D$1.UNAVAILABLE, "The operation could not be completed")));
            }), E(esm_4.EventType.MESSAGE, t => {
                var e;
                if (!d) {
                    const n = t.data[0];
                    v$1(!!n);
                    // TODO(b/35143891): There is a bug in One Platform that caused errors
                    // (and only errors) to be wrapped in an extra array. To be forward
                    // compatible with the bug we need to check either condition. The latter
                    // can be removed once the fix has been rolled out.
                    // Use any because msgData.error is not typed.
                    const s = n, i = s.error || (null === (e = s[0]) || void 0 === e ? void 0 : e.error);
                    if (i) {
                        g$1("Connection", "WebChannel received error:", i);
                        // error.status will be a string like 'OK' or 'NOT_FOUND'.
                        const t = i.status;
                        let e = function(t) {
                            // lookup by string
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const e = ot[t];
                            if (void 0 !== e) return ut(e);
                        }(t), n = i.message;
                        void 0 === e && (e = D$1.INTERNAL, n = "Unknown error status: " + t + " with message " + i.message), 
                        // Mark closed so no further events are propagated
                        d = !0, w.Vl(new C$1(e, n)), o.close();
                    } else g$1("Connection", "WebChannel received:", n), w.yl(n);
                }
            }), setTimeout(() => {
                // Technically we could/should wait for the WebChannel opened event,
                // but because we want to send the first message with the WebChannel
                // handshake we pretend the channel opened here (asynchronously), and
                // then delay the actual open until the first message is sent.
                w.gl();
            }, 0), w;
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // References to `window` are guarded by BrowserConnectivityMonitor.isAvailable()
    /* eslint-disable no-restricted-globals */
    /**
     * Browser implementation of ConnectivityMonitor.
     */
    class Ho {
        constructor() {
            this.Nl = () => this.xl(), this.Ol = () => this.Fl(), this.Ml = [], this.$l();
        }
        Ma(t) {
            this.Ml.push(t);
        }
        _c() {
            window.removeEventListener("online", this.Nl), window.removeEventListener("offline", this.Ol);
        }
        $l() {
            window.addEventListener("online", this.Nl), window.addEventListener("offline", this.Ol);
        }
        xl() {
            g$1("ConnectivityMonitor", "Network connectivity changed: AVAILABLE");
            for (const t of this.Ml) t(0 /* AVAILABLE */);
        }
        Fl() {
            g$1("ConnectivityMonitor", "Network connectivity changed: UNAVAILABLE");
            for (const t of this.Ml) t(1 /* UNAVAILABLE */);
        }
        // TODO(chenbrian): Consider passing in window either into this component or
        // here for testing via FakeWindow.
        /** Checks that all used attributes of window are available. */
        static Qs() {
            return "undefined" != typeof window && void 0 !== window.addEventListener && void 0 !== window.removeEventListener;
        }
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Jo {
        Ma(t) {
            // No-op.
        }
        _c() {
            // No-op.
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Initializes the WebChannelConnection for the browser. */ function Yo(t) {
        return new zo(t);
    }

    /** Return the Platform-specific connectivity monitor. */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    function Xo(t) {
        return new ce(t, /* useProto3Json= */ !0);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Zo = "You are using the memory-only build of Firestore. Persistence support is only available via the @firebase/firestore bundle or the firebase-firestore.js build.";

    /**
     * Provides all components needed for Firestore with in-memory persistence.
     * Uses EagerGC garbage collection.
     */ class tc$1 {
        async initialize(t) {
            this.Ch = this.kl(t), this.persistence = this.Ll(t), await this.persistence.start(), 
            this.ql = this.Bl(t), this.va = this.Ul(t);
        }
        Bl(t) {
            return null;
        }
        Ul(t) {
            /** Manages our in-memory or durable persistence. */
            return e = this.persistence, n = new Lo, s = t.Kl, new Wi(e, n, s);
            var e, n, s;
        }
        Ll(t) {
            if (t.persistenceSettings.Ql) throw new C$1(D$1.FAILED_PRECONDITION, Zo);
            return new Ko(Wo.wl);
        }
        kl(t) {
            return new eo;
        }
        async terminate() {
            this.ql && this.ql.stop(), await this.Ch._c(), await this.persistence._c();
        }
        clearPersistence(t, e) {
            throw new C$1(D$1.FAILED_PRECONDITION, Zo);
        }
    }

    /**
     * Provides all components needed for Firestore with IndexedDB persistence.
     */ class ec$1 extends tc$1 {
        constructor(t) {
            super(), this.Wl = t;
        }
        async initialize(t) {
            await super.initialize(t), await async function(t) {
                const e = S$1(t), n = S$1(e.Nc);
                return e.persistence.runTransaction("Synchronize last document change read time", "readonly", t => n.no(t)).then(t => {
                    e.Cc = t;
                });
            }(this.va), await this.Wl.initialize(this, t), 
            // Enqueue writes from a previous session
            await ko(this.Wl.Ru), await Vr(this.Wl.Sh);
        }
        Bl(t) {
            const e = this.persistence.yr.cr;
            return new $s(e, t.li);
        }
        Ll(t) {
            const e = Ki(t.pl.st, t.pl.persistenceKey), n = Xo(t.pl.st);
            return new ki(t.persistenceSettings.synchronizeTabs, e, t.clientId, Ms.Xi(t.persistenceSettings.cacheSizeBytes), t.li, vs(), Ss(), n, this.Ch, t.persistenceSettings.Mo);
        }
        kl(t) {
            return new eo;
        }
        clearPersistence(t, e) {
            return Qi(Ki(t, e));
        }
    }

    /**
     * Provides all components needed for Firestore with multi-tab IndexedDB
     * persistence.
     *
     * In the legacy client, this provider is used to provide both multi-tab and
     * non-multi-tab persistence since we cannot tell at build time whether
     * `synchronizeTabs` will be enabled.
     */ class nc$1 extends ec$1 {
        async initialize(t) {
            await super.initialize(t);
            const e = this.Wl.Ru;
            this.Ch instanceof to && (this.Ch.Ru = {
                rh: Do.bind(null, e),
                oh: Fo.bind(null, e),
                ah: Mo.bind(null, e),
                Tc: Oo.bind(null, e)
            }, await this.Ch.start()), 
            // NOTE: This will immediately call the listener, so we make sure to
            // set it after localStore / remoteStore are started.
            await this.persistence.Xo(async t => {
                await Co(this.Wl.Ru, t), this.ql && (t && !this.ql.lr ? this.ql.start(this.va) : t || this.ql.stop());
            });
        }
        kl(t) {
            if (t.persistenceSettings.Ql && t.persistenceSettings.synchronizeTabs) {
                const e = vs();
                if (!to.Qs(e)) throw new C$1(D$1.UNIMPLEMENTED, "IndexedDB persistence is only available on platforms that support LocalStorage.");
                const n = Ki(t.pl.st, t.pl.persistenceKey);
                return new to(e, t.li, n, t.clientId, t.Kl);
            }
            return new eo;
        }
    }

    /**
     * Initializes and wires the components that are needed to interface with the
     * network.
     */ class sc {
        async initialize(t, e) {
            this.va || (this.va = t.va, this.Ch = t.Ch, this.Sa = this.jl(e), this.Sh = this.Gl(e), 
            this.Dh = this.zl(e), this.Ru = this.Hl(e), this.Ch.ma = t => fo(this.Ru, t, 1 /* SharedClientState */), 
            this.Sh.Da.Jl = bo.bind(null, this.Ru), await xr(this.Sh, this.Ru.Qh));
        }
        zl(t) {
            return new $r;
        }
        jl(t) {
            const e = Xo(t.pl.st), n = Yo(t.pl);
            return or(t.credentials, n, e);
        }
        Gl(t) {
            return e = this.va, n = this.Sa, s = t.li, i = t => fo(this.Ru, t, 0 /* RemoteStore */), 
            r = Ho.Qs() ? new Ho : new Jo, new ar(e, n, s, i, r);
            var e, n, s, i, r;
            /** Re-enables the network. Idempotent. */    }
        Hl(t) {
            return function(t, e, n, 
            // PORTING NOTE: Manages state synchronization in multi-tab environments.
            s, i, r, o) {
                const c = new co(t, e, n, s, i, r);
                return o && (c.Kh = !0), c;
            }(this.va, this.Sh, this.Dh, this.Ch, t.Kl, t.Nh, !t.persistenceSettings.Ql || !t.persistenceSettings.synchronizeTabs);
        }
        terminate() {
            return async function(t) {
                const e = S$1(t);
                g$1("RemoteStore", "RemoteStore shutting down."), e.xa.add(5 /* Shutdown */), await hr(e), 
                e.Fa._c(), 
                // Set the OnlineState to Unknown (rather than Offline) to avoid potentially
                // triggering spurious listener events with cached data, etc.
                e.$a.set("Unknown" /* Unknown */);
            }(this.Sh);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /*
     * A wrapper implementation of Observer<T> that will dispatch events
     * asynchronously. To allow immediate silencing, a mute call is added which
     * causes events scheduled to no longer be raised.
     */ class ic$1 {
        constructor(t) {
            this.observer = t, 
            /**
             * When set to true, will not raise future events. Necessary to deal with
             * async detachment of listener.
             */
            this.muted = !1;
        }
        next(t) {
            this.observer.next && this.Yl(this.observer.next, t);
        }
        error(t) {
            this.observer.error ? this.Yl(this.observer.error, t) : console.error("Uncaught Error in snapshot listener:", t);
        }
        Xl() {
            this.muted = !0;
        }
        Yl(t, e) {
            this.muted || setTimeout(() => {
                this.muted || t(e);
            }, 0);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Validates the invocation of functionName has the exact number of arguments.
     *
     * Forward the magic "arguments" variable as second parameter on which the
     * parameter validation is performed:
     * validateExactNumberOfArgs('myFunction', arguments, 2);
     */ function rc$1(t, e, n) {
        if (e.length !== n) throw new C$1(D$1.INVALID_ARGUMENT, `Function ${t}() requires ` + dc$1(n, "argument") + ", but was called with " + dc$1(e.length, "argument") + ".");
    }

    /**
     * Validates the invocation of functionName has at least the provided number of
     * arguments (but can have many more).
     *
     * Forward the magic "arguments" variable as second parameter on which the
     * parameter validation is performed:
     * validateAtLeastNumberOfArgs('myFunction', arguments, 2);
     */ function oc$1(t, e, n) {
        if (e.length < n) throw new C$1(D$1.INVALID_ARGUMENT, `Function ${t}() requires at least ` + dc$1(n, "argument") + ", but was called with " + dc$1(e.length, "argument") + ".");
    }

    /**
     * Validates the provided argument is an array and has as least the expected
     * number of elements.
     */
    /**
     * Validates the provided positional argument has the native JavaScript type
     * using typeof checks.
     */
    function cc$1(t, e, n, s) {
        !
        /** Helper to validate the type of a provided input. */
        function(t, e, n, s) {
            let i = !1;
            i = "object" === e ? hc$1(s) : "non-empty string" === e ? "string" == typeof s && "" !== s : typeof s === e;
            if (!i) {
                const i = lc$1(s);
                throw new C$1(D$1.INVALID_ARGUMENT, `Function ${t}() requires its ${n} to be of type ${e}, but it was: ${i}`);
            }
        }
        /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */ (t, e, fc$1(n) + " argument", s);
    }

    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */ function ac$1(t) {
        if (!W$1.et(t)) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function uc$1(t) {
        if (W$1.et(t)) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    function hc$1(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }

    /** Returns a string describing the type / value of the provided input. */ function lc$1(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
        JSON.stringify(t);
        if ("number" == typeof t || "boolean" == typeof t) return "" + t;
        if ("object" == typeof t) {
            if (t instanceof Array) return "an array";
            {
                const e = 
                /** Hacky method to try to get the constructor name for an object. */
                function(t) {
                    if (t.constructor) {
                        const e = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                        if (e && e.length > 1) return e[1];
                    }
                    return null;
                }
                /**
     * Helper method to throw an error that the provided argument did not pass
     * an instanceof check.
     */ (t);
                return e ? `a custom ${e} object` : "an object";
            }
        }
        return "function" == typeof t ? "a function" : b();
    }

    function _c(t, e, n) {
        if (n <= 0) throw new C$1(D$1.INVALID_ARGUMENT, `Function ${t}() requires its ${fc$1(e)} argument to be a positive number, but it was: ${n}.`);
    }

    /** Converts a number to its english word representation */ function fc$1(t) {
        switch (t) {
          case 1:
            return "first";

          case 2:
            return "second";

          case 3:
            return "third";

          default:
            return t + "th";
        }
    }

    /**
     * Formats the given word as plural conditionally given the preceding number.
     */ function dc$1(t, e) {
        return `${t} ${e}` + (1 === t ? "" : "s");
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // The objects that are a part of this API are exposed to third-parties as
    // compiled javascript so we want to flag our private members with a leading
    // underscore to discourage their use.
    /**
     * A field class base class that is shared by the lite, full and legacy SDK,
     * which supports shared code that deals with FieldPaths.
     */
    // Use underscore prefix to hide this class from our Public API.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    class wc {
        constructor(t) {
            !function(t, e, n, s) {
                if (!(e instanceof Array) || e.length < s) throw new C$1(D$1.INVALID_ARGUMENT, `Function ${t}() requires its ${n} argument to be an array with at least ` + dc$1(s, "element") + ".");
            }("FieldPath", t, "fieldNames", 1);
            for (let e = 0; e < t.length; ++e) if (cc$1("FieldPath", "string", e, t[e]), 0 === t[e].length) throw new C$1(D$1.INVALID_ARGUMENT, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this.Zl = new Q$1(t);
        }
    }

    /**
     * A FieldPath refers to a field in a document. The path may consist of a single
     * field name (referring to a top-level field in the document), or a list of
     * field names (referring to a nested field in the document).
     */ class Ec$1 extends wc {
        /**
         * Creates a FieldPath from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames A list of field names.
         */
        constructor(...t) {
            super(t);
        }
        static documentId() {
            /**
             * Internal Note: The backend doesn't technically support querying by
             * document ID. Instead it queries by the entire document name (full path
             * included), but in the cases we currently support documentId(), the net
             * effect is the same.
             */
            return new Ec$1(Q$1.J().K());
        }
        isEqual(t) {
            if (!(t instanceof Ec$1)) throw function(t, e, n, s) {
                const i = lc$1(s);
                return new C$1(D$1.INVALID_ARGUMENT, `Function ${t}() requires its ${fc$1(n)} argument to be a ${e}, but it was: ${i}`);
            }("isEqual", "FieldPath", 1, t);
            return this.Zl.isEqual(t.Zl);
        }
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const Tc$1 = new RegExp("[~\\*/\\[\\]]");

    /**
     * Parses a field path string into a FieldPath, treating dots as separators.
     */
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** The public FieldValue class of the lite API. */
    class Ic$1 {
        /**
         * @param _methodName The public API endpoint that returns this class.
         */
        constructor(t) {
            this.t_ = t;
        }
    }

    function mc$1() {
        return new Vc$1("deleteField");
    }

    function Ac$1() {
        return new pc$1("serverTimestamp");
    }

    function Rc$1(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return oc$1("arrayUnion()", arguments, 1), new bc$1("arrayUnion", t);
    }

    function Pc$1(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return oc$1("arrayRemove()", arguments, 1), new vc$1("arrayRemove", t);
    }

    function gc$1(t) {
        return new Sc$1("increment", t);
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Vc$1 extends Ic$1 {
        e_(t) {
            if (2 /* MergeSet */ !== t.n_) throw 1 /* Update */ === t.n_ ? t.s_(this.t_ + "() can only appear at the top level of your update data") : t.s_(this.t_ + "() cannot be used with set() unless you pass {merge:true}");
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.Xe.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof Vc$1;
        }
    }

    /**
     * Creates a child context for parsing SerializableFieldValues.
     *
     * This is different than calling `ParseContext.contextWith` because it keeps
     * the fieldTransforms and fieldMask separate.
     *
     * The created context has its `dataSource` set to `UserDataSource.Argument`.
     * Although these values are used with writes, any elements in these FieldValues
     * are not considered writes since they cannot contain any FieldValue sentinels,
     * etc.
     *
     * @param fieldValue The sentinel FieldValue for which to create a child
     *     context.
     * @param context The parent context.
     * @param arrayElement Whether or not the FieldValue has an array.
     */ function yc$1(t, e, n) {
        return new kc$1({
            n_: 3 /* Argument */ ,
            i_: e.settings.i_,
            methodName: t.t_,
            r_: n
        }, e.st, e.serializer, e.ignoreUndefinedProperties);
    }

    class pc$1 extends Ic$1 {
        e_(t) {
            return new nn(t.path, new Ge);
        }
        isEqual(t) {
            return t instanceof pc$1;
        }
    }

    class bc$1 extends Ic$1 {
        constructor(t, e) {
            super(t), this.o_ = e;
        }
        e_(t) {
            const e = yc$1(this, t, 
            /*array=*/ !0), n = this.o_.map(t => Qc$1(t, e)), s = new ze(n);
            return new nn(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class vc$1 extends Ic$1 {
        constructor(t, e) {
            super(t), this.o_ = e;
        }
        e_(t) {
            const e = yc$1(this, t, 
            /*array=*/ !0), n = this.o_.map(t => Qc$1(t, e)), s = new Je(n);
            return new nn(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class Sc$1 extends Ic$1 {
        constructor(t, e) {
            super(t), this.c_ = e;
        }
        e_(t) {
            const e = new Xe(t.serializer, he(t.serializer, this.c_));
            return new nn(t.path, e);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Immutable class representing a geo point as latitude-longitude pair.
     * This class is directly exposed in the public API, including its constructor.
     */ class Dc$1 {
        constructor(t, e) {
            if (rc$1("GeoPoint", arguments, 2), cc$1("GeoPoint", "number", 1, t), cc$1("GeoPoint", "number", 2, e), 
            !isFinite(t) || t < -90 || t > 90) throw new C$1(D$1.INVALID_ARGUMENT, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(e) || e < -180 || e > 180) throw new C$1(D$1.INVALID_ARGUMENT, "Longitude must be a number between -180 and 180, but was: " + e);
            this.a_ = t, this.u_ = e;
        }
        /**
         * Returns the latitude of this geo point, a number between -90 and 90.
         */    get latitude() {
            return this.a_;
        }
        /**
         * Returns the longitude of this geo point, a number between -180 and 180.
         */    get longitude() {
            return this.u_;
        }
        isEqual(t) {
            return this.a_ === t.a_ && this.u_ === t.u_;
        }
        toJSON() {
            return {
                latitude: this.a_,
                longitude: this.u_
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    V(t) {
            return M$1(this.a_, t.a_) || M$1(this.u_, t.u_);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /** Immutable class holding binary data in the Lite and modular SDK. */ class Cc$1 {
        constructor(t) {
            this.h_ = t;
        }
        static fromBase64String(t) {
            try {
                return new Cc$1(st.fromBase64String(t));
            } catch (t) {
                throw new C$1(D$1.INVALID_ARGUMENT, "Failed to construct Bytes from Base64 string: " + t);
            }
        }
        static fromUint8Array(t) {
            return new Cc$1(st.fromUint8Array(t));
        }
        toBase64() {
            return this.h_.toBase64();
        }
        toUint8Array() {
            return this.h_.toUint8Array();
        }
        toString() {
            return "Bytes(base64: " + this.toBase64() + ")";
        }
        isEqual(t) {
            return this.h_.isEqual(t.h_);
        }
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A class implemented by all API types of the legacy Firestore API which
     * contains a reference to the API type in the firestore-exp API. All internal
     * code unwraps these references, which allows us to only use firestore-exp
     * types in the SDK.
     */ class Nc$1 {
        constructor(t) {
            this.l_ = t;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const xc$1 = /^__.*__$/;

    /**
     * A reference to a document in a Firebase project.
     *
     * This class serves as a common base class for the public DocumentReferences
     * exposed in the lite, full and legacy SDK.
     */
    // Use underscore prefix to hide this class from our Public API.
    // eslint-disable-next-line @typescript-eslint/naming-convention
    class Oc$1 {
        constructor(t, e, n) {
            this.__ = t, this.f_ = e, this.d_ = n;
        }
    }

    /** The result of parsing document data (e.g. for a setData call). */ class Fc$1 {
        constructor(t, e, n) {
            this.data = t, this.Xe = e, this.fieldTransforms = n;
        }
        w_(t, e) {
            const n = [];
            return null !== this.Xe ? n.push(new wn(t, this.data, this.Xe, e)) : n.push(new dn(t, this.data, e)), 
            this.fieldTransforms.length > 0 && n.push(new Tn(t, this.fieldTransforms)), n;
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class Mc$1 {
        constructor(t, e, n) {
            this.data = t, this.Xe = e, this.fieldTransforms = n;
        }
        w_(t, e) {
            const n = [ new wn(t, this.data, this.Xe, e) ];
            return this.fieldTransforms.length > 0 && n.push(new Tn(t, this.fieldTransforms)), 
            n;
        }
    }

    function $c$1(t) {
        switch (t) {
          case 0 /* Set */ :
     // fall through
                  case 2 /* MergeSet */ :
     // fall through
                  case 1 /* Update */ :
            return !0;

          case 3 /* Argument */ :
          case 4 /* ArrayArgument */ :
            return !1;

          default:
            throw b();
        }
    }

    /** A "context" object passed around while parsing user data. */ class kc$1 {
        /**
         * Initializes a ParseContext with the given source and path.
         *
         * @param settings The settings for the parser.
         * @param databaseId The database ID of the Firestore instance.
         * @param serializer The serializer to use to generate the Value proto.
         * @param ignoreUndefinedProperties Whether to ignore undefined properties
         * rather than throw.
         * @param fieldTransforms A mutable list of field transforms encountered while
         *     parsing the data.
         * @param fieldMask A mutable list of field paths encountered while parsing
         *     the data.
         *
         * TODO(b/34871131): We don't support array paths right now, so path can be
         * null to indicate the context represents any location within an array (in
         * which case certain features will not work and errors will be somewhat
         * compromised).
         */
        constructor(t, e, n, s, i, r) {
            this.settings = t, this.st = e, this.serializer = n, this.ignoreUndefinedProperties = s, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === i && this.E_(), this.fieldTransforms = i || [], this.Xe = r || [];
        }
        get path() {
            return this.settings.path;
        }
        get n_() {
            return this.settings.n_;
        }
        /** Returns a new context with the specified settings overwritten. */    T_(t) {
            return new kc$1(Object.assign(Object.assign({}, this.settings), t), this.st, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.Xe);
        }
        I_(t) {
            var e;
            const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.T_({
                path: n,
                r_: !1
            });
            return s.m_(t), s;
        }
        A_(t) {
            var e;
            const n = null === (e = this.path) || void 0 === e ? void 0 : e.child(t), s = this.T_({
                path: n,
                r_: !1
            });
            return s.E_(), s;
        }
        R_(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.T_({
                path: void 0,
                r_: !0
            });
        }
        s_(t) {
            return Jc$1(t, this.settings.methodName, this.settings.P_ || !1, this.path, this.settings.i_);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.Xe.find(e => t.q(e)) || void 0 !== this.fieldTransforms.find(e => t.q(e.field));
        }
        E_() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.m_(this.path.get(t));
        }
        m_(t) {
            if (0 === t.length) throw this.s_("Document fields must not be empty");
            if ($c$1(this.n_) && xc$1.test(t)) throw this.s_('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class Lc$1 {
        constructor(t, e, n) {
            this.st = t, this.ignoreUndefinedProperties = e, this.serializer = n || Xo(t);
        }
        /** Creates a new top-level parse context. */    g_(t, e, n, s = !1) {
            return new kc$1({
                n_: t,
                methodName: e,
                i_: n,
                path: Q$1.j(),
                r_: !1,
                P_: s
            }, this.st, this.serializer, this.ignoreUndefinedProperties);
        }
    }

    /** Parse document data from a set() call. */ function qc$1(t, e, n, s, i, r = {}) {
        const o = t.g_(r.merge || r.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , e, n, i);
        Gc$1("Data must be an object, but it was:", o, s);
        const c = Wc$1(s, o);
        let a, u;
        if (r.merge) a = new en(o.Xe), u = o.fieldTransforms; else if (r.mergeFields) {
            const t = [];
            for (const s of r.mergeFields) {
                let i;
                if (s instanceof wc) i = s.Zl; else {
                    if ("string" != typeof s) throw b();
                    i = Hc$1(e, s, n);
                }
                if (!o.contains(i)) throw new C$1(D$1.INVALID_ARGUMENT, `Field '${i}' is specified in your field mask but missing from your input data.`);
                Yc$1(t, i) || t.push(i);
            }
            a = new en(t), u = o.fieldTransforms.filter(t => a.rn(t.field));
        } else a = null, u = o.fieldTransforms;
        return new Fc$1(new Pn(c), a, u);
    }

    /** Parse update data from an update() call. */ function Bc$1(t, e, n, s) {
        const i = t.g_(1 /* Update */ , e, n);
        Gc$1("Data must be an object, but it was:", i, s);
        const r = [], o = new gn;
        kt(s, (t, s) => {
            const c = Hc$1(e, t, n), a = i.A_(c);
            if (s instanceof Vc$1 || s instanceof Nc$1 && s.l_ instanceof Vc$1) 
            // Add it to the field mask, but don't add anything to updateData.
            r.push(c); else {
                const t = Qc$1(s, a);
                null != t && (r.push(c), o.set(c, t));
            }
        });
        const c = new en(r);
        return new Mc$1(o.cn(), c, i.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function Uc$1(t, e, n, s, i, r) {
        const o = t.g_(1 /* Update */ , e, n), c = [ zc$1(e, s, n) ], a = [ i ];
        if (r.length % 2 != 0) throw new C$1(D$1.INVALID_ARGUMENT, `Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < r.length; t += 2) c.push(zc$1(e, r[t])), a.push(r[t + 1]);
        const u = [], h = new gn;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = c.length - 1; t >= 0; --t) if (!Yc$1(u, c[t])) {
            const e = c[t], n = a[t], s = o.A_(e);
            if (n instanceof Vc$1 || n instanceof Nc$1 && n.l_ instanceof Vc$1) 
            // Add it to the field mask, but don't add anything to updateData.
            u.push(e); else {
                const t = Qc$1(n, s);
                null != t && (u.push(e), h.set(e, t));
            }
        }
        const l = new en(u);
        return new Mc$1(h.cn(), l, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function Kc$1(t, e, n, s = !1) {
        return Qc$1(n, t.g_(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , e));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input Data to be parsed.
     * @param context A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @return The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function Qc$1(t, e) {
        if (
        // Unwrap the API type from the Compat SDK. This will return the API type
        // from firestore-exp.
        t instanceof Nc$1 && (t = t.l_), jc$1(t)) return Gc$1("Unsupported field value:", e, t), 
        Wc$1(t, e);
        if (t instanceof Ic$1) 
        // FieldValues usually parse into transforms (except FieldValue.delete())
        // in which case we do not want to include this field in our parsed data
        // (as doing so will overwrite the field directly prior to the transform
        // trying to transform it). So we don't add this location to
        // context.fieldMask and we return null as our parsing result.
        /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
        return function(t, e) {
            // Sentinels are only supported with writes, and not within arrays.
            if (!$c$1(e.n_)) throw e.s_(t.t_ + "() can only be used with update() and set()");
            if (!e.path) throw e.s_(t.t_ + "() is not currently supported inside arrays");
            const n = t.e_(e);
            n && e.fieldTransforms.push(n);
        }
        /**
     * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
     *
     * @return The parsed value
     */ (t, e), null;
        if (
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        e.path && e.Xe.push(e.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (e.settings.r_ && 4 /* ArrayArgument */ !== e.n_) throw e.s_("Nested arrays are not supported");
            return function(t, e) {
                const n = [];
                let s = 0;
                for (const i of t) {
                    let t = Qc$1(i, e.R_(s));
                    null == t && (
                    // Just include nulls in the array for fields being replaced with a
                    // sentinel.
                    t = {
                        nullValue: "NULL_VALUE"
                    }), n.push(t), s++;
                }
                return {
                    arrayValue: {
                        values: n
                    }
                };
            }(t, e);
        }
        return function(t, e) {
            if (null === t) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return he(e.serializer, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const n = L$1.fromDate(t);
                return {
                    timestampValue: le(e.serializer, n)
                };
            }
            if (t instanceof L$1) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const n = new L$1(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: le(e.serializer, n)
                };
            }
            if (t instanceof Dc$1) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof Cc$1) return {
                bytesValue: _e(e.serializer, t.h_)
            };
            if (t instanceof Oc$1) {
                const n = e.st, s = t.__;
                if (!s.isEqual(n)) throw e.s_(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${n.projectId}/${n.database}`);
                return {
                    referenceValue: we(t.__ || e.st, t.f_.path)
                };
            }
            if (void 0 === t && e.ignoreUndefinedProperties) return null;
            throw e.s_("Unsupported field value: " + lc$1(t));
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, e);
    }

    function Wc$1(t, e) {
        const n = {};
        return Lt(t) ? 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        e.path && e.path.length > 0 && e.Xe.push(e.path) : kt(t, (t, s) => {
            const i = Qc$1(s, e.I_(t));
            null != i && (n[t] = i);
        }), {
            mapValue: {
                fields: n
            }
        };
    }

    function jc$1(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof L$1 || t instanceof Dc$1 || t instanceof Cc$1 || t instanceof Oc$1 || t instanceof Ic$1);
    }

    function Gc$1(t, e, n) {
        if (!jc$1(n) || !hc$1(n)) {
            const s = lc$1(n);
            throw "an object" === s ? e.s_(t + " a custom object") : e.s_(t + " " + s);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function zc$1(t, e, n) {
        if (e instanceof wc) return e.Zl;
        if ("string" == typeof e) return Hc$1(t, e);
        throw Jc$1("Field path arguments must be of type string or FieldPath.", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, n);
    }

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName The publicly visible method name
     * @param path The dot-separated string form of a field path which will be split
     * on dots.
     * @param targetDoc The document against which the field path will be evaluated.
     */ function Hc$1(t, e, n) {
        try {
            return function(t) {
                if (t.search(Tc$1) >= 0) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`);
                try {
                    return new Ec$1(...t.split("."));
                } catch (e) {
                    throw new C$1(D$1.INVALID_ARGUMENT, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                }
            }(e).Zl;
        } catch (e) {
            throw Jc$1((s = e) instanceof Error ? s.message : s.toString(), t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, n);
        }
        /**
     * Extracts the message from a caught exception, which should be an Error object
     * though JS doesn't guarantee that.
     */
        var s;
        /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */}

    function Jc$1(t, e, n, s, i) {
        const r = s && !s.L(), o = void 0 !== i;
        let c = `Function ${e}() called with invalid data`;
        n && (c += " (via `toFirestore()`)"), c += ". ";
        let a = "";
        return (r || o) && (a += " (found", r && (a += " in field " + s), o && (a += " in document " + i), 
        a += ")"), new C$1(D$1.INVALID_ARGUMENT, c + t + a);
    }

    function Yc$1(t, e) {
        return t.some(t => t.isEqual(e));
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Internal transaction object responsible for accumulating the mutations to
     * perform and the base versions for any documents read.
     */ class Xc$1 {
        constructor(t) {
            this.Sa = t, 
            // The version of each document that was read during this transaction.
            this.V_ = new Map, this.mutations = [], this.y_ = !1, 
            /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
            this.p_ = null, 
            /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
            this.b_ = new Set;
        }
        async v_(t) {
            if (this.S_(), this.mutations.length > 0) throw new C$1(D$1.INVALID_ARGUMENT, "Firestore transactions require all reads to be executed before all writes.");
            const e = await async function(t, e) {
                const n = S$1(t), s = Re(n.serializer) + "/documents", i = {
                    documents: e.map(t => Te(n.serializer, t))
                }, r = await n.Ia("BatchGetDocuments", s, i), o = new Map;
                r.forEach(t => {
                    const e = Ve(n.serializer, t);
                    o.set(e.key.toString(), e);
                });
                const c = [];
                return e.forEach(t => {
                    const e = o.get(t.toString());
                    v$1(!!e), c.push(e);
                }), c;
            }(this.Sa, t);
            return e.forEach(t => {
                t instanceof bn || t instanceof pn ? this.D_(t) : b();
            }), e;
        }
        set(t, e) {
            this.write(e.w_(t, this.en(t))), this.b_.add(t.toString());
        }
        update(t, e) {
            try {
                this.write(e.w_(t, this.C_(t)));
            } catch (t) {
                this.p_ = t;
            }
            this.b_.add(t.toString());
        }
        delete(t) {
            this.write([ new An(t, this.en(t)) ]), this.b_.add(t.toString());
        }
        async commit() {
            if (this.S_(), this.p_) throw this.p_;
            const t = this.V_;
            // For each mutation, note that the doc was written.
                    this.mutations.forEach(e => {
                t.delete(e.key.toString());
            }), 
            // For each document that was read but not written to, we want to perform
            // a `verify` operation.
            t.forEach((t, e) => {
                const n = W$1.X(e);
                this.mutations.push(new Rn(n, this.en(n)));
            }), await async function(t, e) {
                const n = S$1(t), s = Re(n.serializer) + "/documents", i = {
                    writes: e.map(t => pe(n.serializer, t))
                };
                await n.Ta("Commit", s, i);
            }(this.Sa, this.mutations), this.y_ = !0;
        }
        D_(t) {
            let e;
            if (t instanceof pn) e = t.version; else {
                if (!(t instanceof bn)) throw b();
                // For deleted docs, we must use baseVersion 0 when we overwrite them.
                e = q$1.min();
            }
            const n = this.V_.get(t.key.toString());
            if (n) {
                if (!e.isEqual(n)) 
                // This transaction will fail no matter what.
                throw new C$1(D$1.ABORTED, "Document version changed between two reads.");
            } else this.V_.set(t.key.toString(), e);
        }
        /**
         * Returns the version of this document when it was read in this transaction,
         * as a precondition, or no precondition if it was not read.
         */    en(t) {
            const e = this.V_.get(t.toString());
            return !this.b_.has(t.toString()) && e ? on.updateTime(e) : on.nn();
        }
        /**
         * Returns the precondition for a document if the operation is an update.
         */    C_(t) {
            const e = this.V_.get(t.toString());
            // The first time a document is written, we want to take into account the
            // read time and existence
                    if (!this.b_.has(t.toString()) && e) {
                if (e.isEqual(q$1.min())) 
                // The document doesn't exist, so fail the transaction.
                // This has to be validated locally because you can't send a
                // precondition that a document does not exist without changing the
                // semantics of the backend write to be an insert. This is the reverse
                // of what we want, since we want to assert that the document doesn't
                // exist but then send the update and have it fail. Since we can't
                // express that to the backend, we have to validate locally.
                // Note: this can change once we can send separate verify writes in the
                // transaction.
                throw new C$1(D$1.INVALID_ARGUMENT, "Can't update a document that doesn't exist.");
                // Document exists, base precondition on document update time.
                            return on.updateTime(e);
            }
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return on.exists(!0);
        }
        write(t) {
            this.S_(), this.mutations = this.mutations.concat(t);
        }
        S_() {}
    }

    /**
     * @license
     * Copyright 2019 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * TransactionRunner encapsulates the logic needed to run and retry transactions
     * with backoff.
     */
    class Zc$1 {
        constructor(t, e, n, s) {
            this.li = t, this.Sa = e, this.updateFunction = n, this.di = s, this.N_ = 5, this.pi = new Is(this.li, "transaction_retry" /* TransactionRetry */);
        }
        /** Runs the transaction and sets the result on deferred. */    run() {
            this.x_();
        }
        x_() {
            this.pi.$s(async () => {
                const t = new Xc$1(this.Sa), e = this.O_(t);
                e && e.then(e => {
                    this.li.Ii(() => t.commit().then(() => {
                        this.di.resolve(e);
                    }).catch(t => {
                        this.F_(t);
                    }));
                }).catch(t => {
                    this.F_(t);
                });
            });
        }
        O_(t) {
            try {
                const e = this.updateFunction(t);
                return !z(e) && e.catch && e.then ? e : (this.di.reject(Error("Transaction callback must return a Promise")), 
                null);
            } catch (t) {
                // Do not retry errors thrown by user provided updateFunction.
                return this.di.reject(t), null;
            }
        }
        F_(t) {
            this.N_ > 0 && this.M_(t) ? (this.N_ -= 1, this.li.Ii(() => (this.x_(), Promise.resolve()))) : this.di.reject(t);
        }
        M_(t) {
            if ("FirebaseError" === t.name) {
                // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
                // non-matching document versions with ABORTED. These errors should be retried.
                const e = t.code;
                return "aborted" === e || "failed-precondition" === e || !at(e);
            }
            return !1;
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ async function ta$1(t, e, n) {
        try {
            const s = await function(t, e) {
                const n = S$1(t);
                return n.persistence.runTransaction("read document", "readonly", t => n.xc.ss(t, e));
            }(t, e);
            s instanceof pn ? n.resolve(s) : s instanceof bn ? n.resolve(null) : n.reject(new C$1(D$1.UNAVAILABLE, "Failed to get document from cache. (However, this document may exist on the server. Run again without setting 'source' in the GetOptions to attempt to retrieve the document from the server.)"));
        } catch (t) {
            const s = Ns(t, `Failed to get document '${e} from cache`);
            n.reject(s);
        }
    }

    /**
     * Retrieves a latency-compensated document from the backend via a
     * SnapshotListener.
     */ function ea$1(t, e, n, s, i) {
        const r = new ic$1({
            next: r => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                e.Ii(() => Lr(t, o));
                const c = r.docs.has(n);
                !c && r.fromCache ? 
                // TODO(dimond): If we're online and the document doesn't
                // exist then we resolve with a doc.exists set to false. If
                // we're offline however, we reject the Promise in this
                // case. Two options: 1) Cache the negative response from
                // the server so we can deliver that even when you're
                // offline 2) Actually reject the Promise in the online case
                // if the document doesn't exist.
                i.reject(new C$1(D$1.UNAVAILABLE, "Failed to get document because the client is offline.")) : c && r.fromCache && s && "server" === s.source ? i.reject(new C$1(D$1.UNAVAILABLE, 'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')) : i.resolve(r);
            },
            error: t => i.reject(t)
        }), o = new Kr(Cn(n.path), r, {
            includeMetadataChanges: !0,
            iu: !0
        });
        return kr(t, o);
    }

    /**
     * Retrieves a latency-compensated query snapshot from the backend via a
     * SnapshotListener.
     */
    function na$1(t, e, n, s, i) {
        const r = new ic$1({
            next: n => {
                // Remove query first before passing event to user to avoid
                // user actions affecting the now stale query.
                e.Ii(() => Lr(t, o)), n.fromCache && "server" === s.source ? i.reject(new C$1(D$1.UNAVAILABLE, 'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')) : i.resolve(n);
            },
            error: t => i.reject(t)
        }), o = new Kr(n, r, {
            includeMetadataChanges: !0,
            iu: !0
        });
        return kr(t, o);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const sa$1 = new Map;

    // settings() defaults:
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * The root reference to the Firestore Lite database.
     */
    class ia {
        constructor(t, e) {
            this.app = t, this.k_ = "(lite)", this.L_ = !1, this.__ = ia.q_(t), this.B_ = new x$1(e);
        }
        get U_() {
            return this.L_;
        }
        get K_() {
            return void 0 !== this.Q_;
        }
        W_(t) {
            if (this.L_) throw new C$1(D$1.FAILED_PRECONDITION, "Firestore has already been started and its settings can no longer be changed. initializeFirestore() cannot be called after calling getFirestore().");
            this.j_ = t;
        }
        G_() {
            return this.j_ || (this.j_ = {}), this.L_ = !0, this.j_;
        }
        static q_(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new C$1(D$1.INVALID_ARGUMENT, '"projectId" not provided in firebase.initializeApp.');
            return new G$1(t.options.projectId);
        }
        _delete() {
            return this.Q_ || (this.Q_ = this.z_()), this.Q_;
        }
        /**
         * Terminates all components used by this client. Subclasses can override
         * this method to clean up their own dependencies, but must also call this
         * method.
         *
         * Only ever called once.
         */    z_() {
            /**
     * Removes all components associated with the provided instance. Must be called
     * when the Firestore instance is terminated.
     */
            return function(t) {
                const e = sa$1.get(t);
                e && (g$1("ComponentProvider", "Removing Datastore"), sa$1.delete(t), e.terminate());
            }(this), Promise.resolve();
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function ra$1(t) {
        /**
     * Returns true if obj is an object and contains at least one of the specified
     * methods.
     */
        return function(t, e) {
            if ("object" != typeof t || null === t) return !1;
            const n = t;
            for (const t of e) if (t in n && "function" == typeof n[t]) return !0;
            return !1;
        }
        /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
        /**
     * Converts Firestore's internal types to the JavaScript types that we expose
     * to the user.
     */ (t, [ "next", "error", "complete" ]);
    }

    class oa$1 {
        constructor(t, e, n, s, i) {
            this.st = t, this.timestampsInSnapshots = e, this.H_ = n, this.J_ = s, this.Y_ = i;
        }
        X_(t) {
            switch (Kt(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return Yt(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.Z_(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.tf(t);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.Y_(Xt(t.bytesValue));

              case 7 /* RefValue */ :
                return this.ef(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.nf(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.sf(t.arrayValue);

              case 10 /* ObjectValue */ :
                return this.if(t.mapValue);

              default:
                throw b();
            }
        }
        if(t) {
            const e = {};
            return kt(t.fields || {}, (t, n) => {
                e[t] = this.X_(n);
            }), e;
        }
        nf(t) {
            return new Dc$1(Yt(t.latitude), Yt(t.longitude));
        }
        sf(t) {
            return (t.values || []).map(t => this.X_(t));
        }
        tf(t) {
            switch (this.H_) {
              case "previous":
                const e = function t(e) {
                    const n = e.mapValue.fields.__previous_value__;
                    return qt(n) ? t(n) : n;
                }(t);
                return null == e ? null : this.X_(e);

              case "estimate":
                return this.Z_(Bt(t));

              default:
                return null;
            }
        }
        Z_(t) {
            const e = Jt(t), n = new L$1(e.seconds, e.nanos);
            return this.timestampsInSnapshots ? n : n.toDate();
        }
        ef(t) {
            const e = U$1.W(t);
            v$1(Ue(e));
            const n = new G$1(e.get(1), e.get(3)), s = new W$1(e.F(5));
            return n.isEqual(this.st) || 
            // TODO(b/64130202): Somehow support foreign references.
            V$1(`Document ${s} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${this.st.projectId}/${this.st.database}) instead.`), 
            this.J_(s);
        }
    }

    /**
     * @license
     * Copyright 2017 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Constant used to indicate the LRU garbage collection should be disabled.
     * Set this value as the `cacheSizeBytes` on the settings passed to the
     * `Firestore` instance.
     */ const ca$1 = Ms.er;

    class aa$1 {
        constructor(t, e) {
            this.hasPendingWrites = t, this.fromCache = e;
        }
        isEqual(t) {
            return this.hasPendingWrites === t.hasPendingWrites && this.fromCache === t.fromCache;
        }
    }

    function ua$1(t, e, n, s, i, r, o) {
        let c;
        if (i.H()) {
            if ("array-contains" /* ARRAY_CONTAINS */ === r || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === r) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid Query. You can't perform '${r}' queries on FieldPath.documentId().`);
            if ("in" /* IN */ === r || "not-in" /* NOT_IN */ === r) {
                _a$1(o, r);
                const e = [];
                for (const n of o) e.push(la$1(s, t, n));
                c = {
                    arrayValue: {
                        values: e
                    }
                };
            } else c = la$1(s, t, o);
        } else "in" /* IN */ !== r && "not-in" /* NOT_IN */ !== r && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== r || _a$1(o, r), 
        c = Kc$1(n, e, o, 
        /* allowArrays= */ "in" /* IN */ === r || "not-in" /* NOT_IN */ === r);
        const a = Qn.create(i, r, c);
        return function(t, e) {
            if (e.In()) {
                const n = Fn(t);
                if (null !== n && !n.isEqual(e.field)) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '${n.toString()}' and '${e.field.toString()}'`);
                const s = On(t);
                null !== s && fa$1(t, e.field, s);
            }
            const n = function(t, e) {
                for (const n of t.filters) if (e.indexOf(n.op) >= 0) return n.op;
                return null;
            }
            /**
     * Creates a new Query for a collection group query that matches all documents
     * within the provided collection group.
     */ (t, 
            /**
     * Given an operator, returns the set of operators that cannot be used with it.
     *
     * Operators in a query must adhere to the following set of rules:
     * 1. Only one array operator is allowed.
     * 2. Only one disjunctive operator is allowed.
     * 3. NOT_EQUAL cannot be used with another NOT_EQUAL operator.
     * 4. NOT_IN cannot be used with array, disjunctive, or NOT_EQUAL operators.
     *
     * Array operators: ARRAY_CONTAINS, ARRAY_CONTAINS_ANY
     * Disjunctive operators: IN, ARRAY_CONTAINS_ANY, NOT_IN
     */
            function(t) {
                switch (t) {
                  case "!=" /* NOT_EQUAL */ :
                    return [ "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ];

                  case "array-contains" /* ARRAY_CONTAINS */ :
                    return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "not-in" /* NOT_IN */ ];

                  case "in" /* IN */ :
                    return [ "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                  case "array-contains-any" /* ARRAY_CONTAINS_ANY */ :
                    return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ ];

                  case "not-in" /* NOT_IN */ :
                    return [ "array-contains" /* ARRAY_CONTAINS */ , "array-contains-any" /* ARRAY_CONTAINS_ANY */ , "in" /* IN */ , "not-in" /* NOT_IN */ , "!=" /* NOT_EQUAL */ ];

                  default:
                    return [];
                }
            }(e.op));
            if (null !== n) 
            // Special case when it's a duplicate op to give a slightly clearer error message.
            throw n === e.op ? new C$1(D$1.INVALID_ARGUMENT, `Invalid query. You cannot use more than one '${e.op.toString()}' filter.`) : new C$1(D$1.INVALID_ARGUMENT, `Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`);
        }(t, a), a;
    }

    function ha$1(t, e, n) {
        if (null !== t.startAt) throw new C$1(D$1.INVALID_ARGUMENT, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
        if (null !== t.endAt) throw new C$1(D$1.INVALID_ARGUMENT, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
        const s = new is(e, n);
        return function(t, e) {
            if (null === On(t)) {
                // This is the first order by. It must match any inequality.
                const n = Fn(t);
                null !== n && fa$1(t, n, e.field);
            }
        }(t, s), s;
    }

    /**
     * Create a Bound from a query and a document.
     *
     * Note that the Bound will always include the key of the document
     * and so only the provided document will compare equal to the returned
     * position.
     *
     * Will throw if the document does not contain all fields of the order by
     * of the query or if any of the fields in the order by are an uncommitted
     * server timestamp.
     */
    /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */
    function la$1(t, e, n) {
        if ("string" == typeof n) {
            if ("" === n) throw new C$1(D$1.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!Mn(e) && -1 !== n.indexOf("/")) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);
            const s = e.path.child(U$1.W(n));
            if (!W$1.et(s)) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
            return Zt(t, new W$1(s));
        }
        if (n instanceof Oc$1) return Zt(t, n.f_);
        throw new C$1(D$1.INVALID_ARGUMENT, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + lc$1(n) + ".");
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function _a$1(t, e) {
        if (!Array.isArray(t) || 0 === t.length) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid Query. A non-empty array is required for '${e.toString()}' filters.`);
        if (t.length > 10) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters support a maximum of 10 elements in the value array.`);
        if ("in" /* IN */ === e || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === e) {
            if (t.indexOf(null) >= 0) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters cannot contain 'null' in the value array.`);
            if (t.filter(t => Number.isNaN(t)).length > 0) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid Query. '${e.toString()}' filters cannot contain 'NaN' in the value array.`);
        }
    }

    function fa$1(t, e, n) {
        if (!n.isEqual(e)) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '${e.toString()}' and so you must also use '${e.toString()}' as your first orderBy(), but your first orderBy() is on field '${n.toString()}' instead.`);
    }

    function da$1(t) {
        if (xn(t) && 0 === t.dn.length) throw new C$1(D$1.UNIMPLEMENTED, "limitToLast() queries require specifying at least one orderBy() clause");
    }

    /**
     * Calculates the array of DocumentChanges for a given ViewSnapshot.
     *
     * Exported for testing.
     *
     * @param snapshot The ViewSnapshot that represents the expected state.
     * @param includeMetadataChanges Whether to include metadata changes.
     * @param converter A factory function that returns a QueryDocumentSnapshot.
     * @return An object that matches the DocumentChange API.
     */ function wa(t) {
        switch (t) {
          case 0 /* Added */ :
            return "added";

          case 2 /* Modified */ :
          case 3 /* Metadata */ :
            return "modified";

          case 1 /* Removed */ :
            return "removed";

          default:
            return b();
        }
    }

    /**
     * Converts custom model object of type T into DocumentData by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to DocumentData
     * because we want to provide the user with a more specific error message if
     * their set() or fails due to invalid data originating from a toFirestore()
     * call.
     */ function Ea$1(t, e, n) {
        let s;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s = t ? n && (n.merge || n.mergeFields) ? t.toFirestore(e, n) : t.toFirestore(e) : e, 
        s;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ const Ta$1 = new Map, Ia$1 = new Map;

    // The components module manages the lifetime of dependencies of the Firestore
    // client. Dependencies can be lazily constructed and only one exists per
    // Firestore instance.
    // Instance maps that ensure that only one component provider exists per
    // Firestore instance.
    async function ma(t, e, n) {
        const s = new Ts;
        Ta$1.set(t, s.promise);
        const i = await t.rf();
        i.persistenceSettings = e, g$1("ComponentProvider", "Initializing OfflineComponentProvider"), 
        await n.initialize(i), t.cf(e => 
        // TODO(firestorexp): This should be a retryable IndexedDB operation
        t.af.Ii(() => 
        // TODO(firestorexp): Make sure handleUserChange is a no-op if user
        // didn't change
        ji(n.va, e))), 
        // When a user calls clearPersistence() in one client, all other clients
        // need to be terminated to allow the delete to succeed.
        n.persistence.Zo(() => t._delete()), s.resolve(n);
    }

    async function Aa$1(t, e) {
        const n = new Ts;
        Ia$1.set(t, n.promise);
        const s = await t.rf(), i = await Ra$1(t);
        g$1("ComponentProvider", "Initializing OnlineComponentProvider"), await e.initialize(i, s), 
        // The CredentialChangeListener of the online component provider takes
        // precedence over the offline component provider.
        t.cf(n => 
        // TODO(firestoreexp): This should be enqueueRetryable.
        t.af.Ii(() => async function(t, e) {
            const n = S$1(t);
            n.li.Mi(), g$1("RemoteStore", "RemoteStore received new credentials");
            const s = Tr(n);
            // Tear down and re-create our network streams. This will ensure we get a
            // fresh auth token for the new user and re-fill the write pipeline with
            // new mutations from the LocalStore (since mutations are per-user).
                    n.xa.add(3 /* CredentialChange */), await hr(n), s && 
            // Don't set the network status to Unknown if we are offline.
            n.$a.set("Unknown" /* Unknown */), await n.Da.Jl(e), n.xa.delete(3 /* CredentialChange */), 
            await ur(n);
        }(e.Sh, n))), n.resolve(e);
    }

    function Ra$1(t) {
        return t.af.Mi(), Ta$1.has(t) || (g$1("ComponentProvider", "Using default OfflineComponentProvider"), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        ma(t, {
            Ql: !1
        }, new tc$1)), Ta$1.get(t);
    }

    function Pa$1(t) {
        return t.af.Mi(), Ia$1.has(t) || (g$1("ComponentProvider", "Using default OnlineComponentProvider"), 
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        Aa$1(t, new sc)), Ia$1.get(t);
    }

    // Note: These functions cannot be `async` since we want to throw an exception
    // when Firestore is terminated (via `getOnlineComponentProvider()`).
    function ga(t) {
        return Pa$1(t).then(t => t.Ru);
    }

    function Va$1(t) {
        return Pa$1(t).then(t => t.Sh);
    }

    function ya$1(t) {
        return Pa$1(t).then(t => {
            const e = t.Dh;
            return e.za = ao.bind(null, t.Ru), e.Ya = ho.bind(null, t.Ru), e;
        });
    }

    function pa$1(t) {
        return Ra$1(t).then(t => t.persistence);
    }

    function ba$1(t) {
        return Ra$1(t).then(t => t.va);
    }

    /**
     * Removes all components associated with the provided instance. Must be called
     * when the Firestore instance is terminated.
     */
    /**
     * The root reference to the Firestore database and the entry point for the
     * tree-shakeable SDK.
     */
    class va extends ia {
        constructor(t, e) {
            super(t, e), this.af = new Cs, this.uf = F$1.g(), this.hf = new Ts, this.lf = m.UNAUTHENTICATED, 
            this._f = () => {}, this.k_ = t.name, this.B_.R(t => {
                this.lf = t, this.hf.resolve();
            });
        }
        cf(t) {
            g$1("Firestore", "Registering credential change listener"), this._f = t, 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.hf.promise.then(() => this._f(this.lf));
        }
        async rf() {
            var t, e;
            const n = this.G_();
            await this.hf.promise;
            const s = new j(this.__, this.k_, null !== (t = n.host) && void 0 !== t ? t : "firestore.googleapis.com", null === (e = n.ssl) || void 0 === e || e, 
            /* forceLongPolling= */ !1);
            return {
                li: this.af,
                pl: s,
                clientId: this.uf,
                credentials: this.B_,
                Kl: this.lf,
                Nh: 100,
                // Note: This will be overwritten if IndexedDB persistence is enabled.
                persistenceSettings: {
                    Ql: !1
                }
            };
        }
        G_() {
            return super.G_();
        }
        z_() {
            this.af.Ni();
            const t = new Ts;
            return this.af.Si(async () => {
                try {
                    await super.z_(), await async function(t) {
                        const e = Ia$1.get(t);
                        e && (g$1("ComponentProvider", "Removing OnlineComponentProvider"), Ia$1.delete(t), 
                        await (await e).terminate());
                        const n = Ta$1.get(t);
                        n && (g$1("ComponentProvider", "Removing OfflineComponentProvider"), Ta$1.delete(t), 
                        await (await n).terminate());
                    }
                    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ (this), 
                    // `removeChangeListener` must be called after shutting down the
                    // RemoteStore as it will prevent the RemoteStore from retrieving
                    // auth tokens.
                    this.B_.P(), t.resolve();
                } catch (e) {
                    const n = Ns(e, "Failed to shutdown persistence");
                    t.reject(n);
                }
            }), t.promise;
        }
        ff() {
            if (this.K_) throw new C$1(D$1.FAILED_PRECONDITION, "The client has already been terminated.");
        }
    }

    function Sa$1(e, n) {
        const s = app._getProvider(e, "firestore-exp").getImmediate();
        if (void 0 !== n.cacheSizeBytes && n.cacheSizeBytes !== ca$1 && n.cacheSizeBytes < Ms.nr) throw new C$1(D$1.INVALID_ARGUMENT, "cacheSizeBytes must be at least " + Ms.nr);
        return s.W_(n), s;
    }

    function Da$1(e) {
        return app._getProvider(e, "firestore-exp").getImmediate();
    }

    function Ca$1(t, e) {
        ka$1(t);
        // `_getSettings()` freezes the client settings and prevents further changes
        // to the components (as `verifyNotInitialized()` would fail). Components can
        // then be accessed via `getOfflineComponentProvider()` and
        // `getOnlineComponentProvider()`
        const n = t.G_(), s = new sc, i = new ec$1(s);
        return t.af.enqueue(async () => {
            await ma(t, {
                Ql: !0,
                synchronizeTabs: !1,
                cacheSizeBytes: n.cacheSizeBytes || Ms.sr,
                Mo: !!(null == e ? void 0 : e.forceOwnership)
            }, i), await Aa$1(t, s);
        });
    }

    function Na$1(t) {
        ka$1(t);
        // `_getSettings()` freezes the client settings and prevents further changes
        // to the components (as `verifyNotInitialized()` would fail). Components can
        // then be accessed via `getOfflineComponentProvider()` and
        // `getOnlineComponentProvider()`
        const e = t.G_(), n = new sc, s = new nc$1(n);
        return t.af.enqueue(async () => {
            await ma(t, {
                Ql: !0,
                synchronizeTabs: !0,
                cacheSizeBytes: e.cacheSizeBytes || Ms.sr,
                Mo: !1
            }, s), await Aa$1(t, n);
        });
    }

    function xa$1(t) {
        if (t.U_ && !t.K_) throw new C$1(D$1.FAILED_PRECONDITION, "Persistence can only be cleared before a Firestore instance is initialized or after it is terminated.");
        const e = new Ts;
        return t.af.Si(async () => {
            try {
                await Qi(Ki(t.__, t.k_)), e.resolve();
            } catch (t) {
                e.reject(t);
            }
        }), e.promise;
    }

    function Oa$1(t) {
        t.ff();
        const e = new Ts;
        return t.af.Ii(async () => Io(await ga(t), e)), e.promise;
    }

    function Fa$1(t) {
        return t.ff(), t.af.enqueue(async () => {
            const e = await Va$1(t);
            return (await pa$1(t)).tc(!0), function(t) {
                const e = S$1(t);
                return e.xa.delete(0 /* UserDisabled */), ur(e);
            }(e);
        });
    }

    function Ma$1(t) {
        return t.ff(), t.af.enqueue(async () => {
            const e = await Va$1(t);
            return (await pa$1(t)).tc(!1), async function(t) {
                const e = S$1(t);
                e.xa.add(0 /* UserDisabled */), await hr(e), 
                // Set the OnlineState to Offline so get()s return from cache, etc.
                e.$a.set("Offline" /* Offline */);
            }(e);
        });
    }

    function $a$1(t) {
        return app._removeServiceInstance(t.app, "firestore-exp"), t._delete();
    }

    function ka$1(t) {
        if (t.U_ || t.K_) throw new C$1(D$1.FAILED_PRECONDITION, "Firestore has already been started and persistence can no longer be enabled. You can only enable persistence before calling any other methods on a Firestore object.");
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A FieldPath refers to a field in a document. The path may consist of a single
     * field name (referring to a top-level field in the document), or a list of
     * field names (referring to a nested field in the document).
     */
    class La$1 extends wc {
        // Note: This class is stripped down a copy of the FieldPath class in the
        // legacy SDK. The changes are:
        // - The `documentId()` static method has been removed
        // - Input validation is limited to errors that cannot be caught by the
        //   TypeScript transpiler.
        /**
         * Creates a FieldPath from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames A list of field names.
         */
        constructor(...t) {
            super(t);
        }
        isEqual(t) {
            return this.Zl.isEqual(t.Zl);
        }
    }

    function qa$1() {
        return new La$1("__name__");
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * A reference to a particular document in a collection in the database.
     */ class Ba$1 extends Oc$1 {
        constructor(t, e, n) {
            super(t.__, new W$1(n), e), this.firestore = t, this.df = n, this.type = "document";
        }
        get id() {
            return this.df.k();
        }
        get path() {
            return this.df.K();
        }
        get parent() {
            return new ru(this.firestore, this.d_, this.f_.path.M());
        }
        withConverter(t) {
            return new Ba$1(this.firestore, t, this.df);
        }
    }

    class Ua$1 {
        // This is the lite version of the Query class in the main SDK.
        constructor(t, e, n) {
            this.firestore = t, this.d_ = e, this.wf = n, this.type = "query";
        }
        withConverter(t) {
            return new Ua$1(this.firestore, t, this.wf);
        }
    }

    class Ka$1 {}

    function Qa$1(t, ...e) {
        for (const n of e) t = n.Ef(t);
        return t;
    }

    class Wa$1 extends Ka$1 {
        constructor(t, e, n) {
            super(), this.Tf = t, this.If = e, this.mf = n, this.type = "where";
        }
        Ef(t) {
            const e = lu(t.firestore), n = ua$1(t.wf, "where", e, t.firestore.__, this.Tf, this.If, this.mf);
            return new Ua$1(t.firestore, t.d_, function(t, e) {
                const n = t.filters.concat([ e ]);
                return new Sn(t.path, t.collectionGroup, t.dn.slice(), n, t.limit, t.wn, t.startAt, t.endAt);
            }(t.wf, n));
        }
    }

    function ja$1(t, e, n) {
        // TODO(firestorelite): Consider validating the enum strings (note that
        // TypeScript does not support passing invalid values).
        const s = e, i = wu("where", t);
        return new Wa$1(i, s, n);
    }

    class Ga$1 extends Ka$1 {
        constructor(t, e) {
            super(), this.Tf = t, this.Af = e, this.type = "orderBy";
        }
        Ef(t) {
            const e = ha$1(t.wf, this.Tf, this.Af);
            return new Ua$1(t.firestore, t.d_, function(t, e) {
                // TODO(dimond): validate that orderBy does not list the same key twice.
                const n = t.dn.concat([ e ]);
                return new Sn(t.path, t.collectionGroup, n, t.filters.slice(), t.limit, t.wn, t.startAt, t.endAt);
            }(t.wf, e));
        }
    }

    function za$1(t, e = "asc") {
        // TODO(firestorelite): Consider validating the enum strings (note that
        // TypeScript does not support passing invalid values).
        const n = e, s = wu("orderBy", t);
        return new Ga$1(s, n);
    }

    class Ha$1 extends Ka$1 {
        constructor(t, e, n) {
            super(), this.type = t, this.Rf = e, this.Pf = n;
        }
        Ef(t) {
            return new Ua$1(t.firestore, t.d_, function(t, e, n) {
                return new Sn(t.path, t.collectionGroup, t.dn.slice(), t.filters.slice(), e, n, t.startAt, t.endAt);
            }(t.wf, this.Rf, this.Pf));
        }
    }

    function Ja$1(t) {
        return _c("limit", 1, t), new Ha$1("limit", t, "F" /* First */);
    }

    function Ya$1(t) {
        return _c("limitToLast", 1, t), new Ha$1("limitToLast", t, "L" /* Last */);
    }

    class Xa$1 extends Ka$1 {
        constructor(t, e, n) {
            super(), this.type = t, this.gf = e, this.Vf = n;
        }
        Ef(t) {
            const e = iu(t, this.type, this.gf, this.Vf);
            return new Ua$1(t.firestore, t.d_, function(t, e) {
                return new Sn(t.path, t.collectionGroup, t.dn.slice(), t.filters.slice(), t.limit, t.wn, e, t.endAt);
            }(t.wf, e));
        }
    }

    function Za$1(...t) {
        return new Xa$1("startAt", t, /*before=*/ !0);
    }

    function tu(...t) {
        return new Xa$1("startAfter", t, 
        /*before=*/ !1);
    }

    class eu extends Ka$1 {
        constructor(t, e, n) {
            super(), this.type = t, this.gf = e, this.Vf = n;
        }
        Ef(t) {
            const e = iu(t, this.type, this.gf, this.Vf);
            return new Ua$1(t.firestore, t.d_, function(t, e) {
                return new Sn(t.path, t.collectionGroup, t.dn.slice(), t.filters.slice(), t.limit, t.wn, t.startAt, e);
            }(t.wf, e));
        }
    }

    function nu(...t) {
        return new eu("endBefore", t, /*before=*/ !0);
    }

    function su(...t) {
        return new eu("endAt", t, /*before=*/ !1);
    }

    /** Helper function to create a bound from a document or fields */ function iu(t, e, n, s) {
        if (n[0] instanceof fu) return rc$1(e, n, 1), function(t, e, n, s, i) {
            if (!s) throw new C$1(D$1.NOT_FOUND, "Can't use a DocumentSnapshot that doesn't exist for " + n + "().");
            const r = [];
            // Because people expect to continue/end a query at the exact document
            // provided, we need to use the implicit sort order rather than the explicit
            // sort order, because it's guaranteed to contain the document key. That way
            // the position becomes unambiguous and the query continues/ends exactly at
            // the provided document. Without the key (by using the explicit sort
            // orders), multiple documents could match the position, yielding duplicate
            // results.
                    for (const n of $n(t)) if (n.field.H()) r.push(Zt(e, s.key)); else {
                const t = s.field(n.field);
                if (qt(t)) throw new C$1(D$1.INVALID_ARGUMENT, 'Invalid query. You are trying to start or end a query using a document for which the field "' + n.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === t) {
                    const t = n.field.K();
                    throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
                }
                r.push(t);
            }
            return new ts(r, i);
        }
        /**
     * Converts a list of field values to a Bound for the given query.
     */ (t.wf, t.firestore.__, e, n[0].yf, s);
        {
            const i = lu(t.firestore);
            return function(t, e, n, s, i, r) {
                // Use explicit order by's because it has to match the query the user made
                const o = t.dn;
                if (i.length > o.length) throw new C$1(D$1.INVALID_ARGUMENT, `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                const c = [];
                for (let r = 0; r < i.length; r++) {
                    const a = i[r];
                    if (o[r].field.H()) {
                        if ("string" != typeof a) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof a}`);
                        if (!Mn(t) && -1 !== a.indexOf("/")) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${s}() must be a plain document ID, but '${a}' contains a slash.`);
                        const n = t.path.child(U$1.W(a));
                        if (!W$1.et(n)) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${s}() must result in a valid document path, but '${n}' is not because it contains an odd number of segments.`);
                        const i = new W$1(n);
                        c.push(Zt(e, i));
                    } else {
                        const t = Kc$1(n, s, a);
                        c.push(t);
                    }
                }
                return new ts(c, r);
            }(t.wf, t.firestore.__, i, e, n, s);
        }
    }

    class ru extends Ua$1 {
        constructor(t, e, n) {
            super(t, e, Cn(n)), this.firestore = t, this.df = n, this.type = "collection";
        }
        get id() {
            return this.wf.path.k();
        }
        get path() {
            return this.wf.path.K();
        }
        get parent() {
            const t = this.df.M();
            return t.L() ? null : new Ba$1(this.firestore, 
            /* converter= */ null, t);
        }
        withConverter(t) {
            return new ru(this.firestore, t, this.df);
        }
    }

    function ou(t, e, ...n) {
        if (_u("collection", "path", e), t instanceof ia) {
            const s = U$1.W(e, ...n);
            return uc$1(s), new ru(t, /* converter= */ null, s);
        }
        {
            if (!(t instanceof Ba$1 || t instanceof ru)) throw new C$1(D$1.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = U$1.W(t.path, ...n).child(U$1.W(e));
            return uc$1(s), new ru(t.firestore, 
            /* converter= */ null, s);
        }
    }

    // TODO(firestorelite): Consider using ErrorFactory -
    // https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
    function cu(t, e) {
        if (_u("collectionGroup", "collection id", e), e.indexOf("/") >= 0) throw new C$1(D$1.INVALID_ARGUMENT, `Invalid collection ID '${e}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
        return new Ua$1(t, 
        /* converter= */ null, function(t) {
            return new Sn(U$1.j(), t);
        }(e));
    }

    function au(t, e, ...n) {
        if (
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (e = F$1.g()), _u("doc", "path", e), t instanceof ia) {
            const s = U$1.W(e, ...n);
            return ac$1(s), new Ba$1(t, /* converter= */ null, s);
        }
        {
            if (!(t instanceof Ba$1 || t instanceof ru)) throw new C$1(D$1.INVALID_ARGUMENT, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = t.df.child(U$1.W(e, ...n));
            return ac$1(s), new Ba$1(t.firestore, t instanceof ru ? t.d_ : null, s);
        }
    }

    function uu(t, e) {
        return (t instanceof Ba$1 || t instanceof ru) && (e instanceof Ba$1 || e instanceof ru) && (t.firestore === e.firestore && t.path === e.path && t.d_ === e.d_);
    }

    function hu(t, e) {
        return t instanceof Ua$1 && e instanceof Ua$1 && (t.firestore === e.firestore && Ln(t.wf, e.wf) && t.d_ === e.d_);
    }

    function lu(t) {
        const e = t.G_(), n = Xo(t.__);
        return new Lc$1(t.__, !!e.ignoreUndefinedProperties, n);
    }

    function _u(t, e, n) {
        if (!n) throw new C$1(D$1.INVALID_ARGUMENT, `Function ${t}() cannot be called with an empty ${e}.`);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class fu {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        constructor(t, e, n, s) {
            this.pf = t, this.f_ = e, this.yf = n, this.d_ = s;
        }
        get id() {
            return this.f_.path.k();
        }
        get ref() {
            return new Ba$1(this.pf, this.d_, this.f_.path);
        }
        exists() {
            return null !== this.yf;
        }
        data() {
            if (this.yf) {
                if (this.d_) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const t = new du(this.pf, this.f_, this.yf, 
                    /* converter= */ null);
                    return this.d_.fromFirestore(t);
                }
                return new oa$1(this.pf.__, 
                /* timestampsInSnapshots= */ !0, 
                /* serverTimestampBehavior=*/ "none", t => new Ba$1(this.pf, 
                /* converter= */ null, t.path), t => new Cc$1(t)).X_(this.yf.fn());
            }
        }
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t) {
            if (this.yf) {
                const e = this.yf.data().field(wu("DocumentSnapshot.get", t));
                if (null !== e) {
                    return new oa$1(this.pf.__, 
                    /* timestampsInSnapshots= */ !0, 
                    /* serverTimestampBehavior=*/ "none", t => new Ba$1(this.pf, this.d_, t.path), t => new Cc$1(t)).X_(e);
                }
            }
        }
    }

    class du extends fu {
        data() {
            return super.data();
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function wu(t, e) {
        return "string" == typeof e ? Hc$1(t, e) : e.Zl;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Eu extends fu {
        constructor(t, e, n, s, i) {
            super(t, e, n, i), this.pf = t, this.metadata = s, this.bf = t;
        }
        exists() {
            return super.exists();
        }
        data(t) {
            if (this.yf) {
                if (this.d_) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const e = new Tu(this.pf, this.f_, this.yf, this.metadata, 
                    /* converter= */ null);
                    return this.d_.fromFirestore(e, t);
                }
                return new oa$1(this.bf.__, 
                /* timestampsInSnapshots= */ !0, (null == t ? void 0 : t.serverTimestamps) || "none", t => new Ba$1(this.pf, 
                /* converter= */ null, t.path), t => new Cc$1(t)).X_(this.yf.fn());
            }
        }
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t, e = {}) {
            if (this.yf) {
                const n = this.yf.data().field(wu("DocumentSnapshot.get", t));
                if (null !== n) {
                    return new oa$1(this.bf.__, 
                    /* timestampsInSnapshots= */ !0, e.serverTimestamps || "none", t => new Ba$1(this.pf, this.d_, t.path), t => new Cc$1(t)).X_(n);
                }
            }
        }
    }

    class Tu extends Eu {
        data(t = {}) {
            return super.data(t);
        }
    }

    class Iu {
        constructor(t, e, n) {
            this.pf = t, this.query = e, this.vf = n, this.metadata = new aa$1(n.hasPendingWrites, n.fromCache);
        }
        get docs() {
            const t = [];
            return this.forEach(e => t.push(e)), t;
        }
        get size() {
            return this.vf.docs.size;
        }
        get empty() {
            return 0 === this.size;
        }
        forEach(t, e) {
            this.vf.docs.forEach(n => {
                t.call(e, this.Sf(n, this.vf.fromCache, this.vf.Xt.has(n.key)));
            });
        }
        docChanges(t = {}) {
            const e = !!t.includeMetadataChanges;
            if (e && this.vf.te) throw new C$1(D$1.INVALID_ARGUMENT, "To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");
            return this.Df && this.Cf === e || (this.Df = function(t, e, n) {
                if (t.Yt.L()) {
                    // Special case the first snapshot because index calculation is easy and
                    // fast
                    let e, s = 0;
                    return t.docChanges.map(i => {
                        const r = n(i.doc, t.fromCache, t.Xt.has(i.doc.key));
                        return e = i.doc, {
                            type: "added",
                            doc: r,
                            oldIndex: -1,
                            newIndex: s++
                        };
                    });
                }
                {
                    // A DocumentSet that is updated incrementally as changes are applied to use
                    // to lookup the index of a document.
                    let s = t.Yt;
                    return t.docChanges.filter(t => e || 3 /* Metadata */ !== t.type).map(e => {
                        const i = n(e.doc, t.fromCache, t.Xt.has(e.doc.key));
                        let r = -1, o = -1;
                        return 0 /* Added */ !== e.type && (r = s.indexOf(e.doc.key), s = s.delete(e.doc.key)), 
                        1 /* Removed */ !== e.type && (s = s.add(e.doc), o = s.indexOf(e.doc.key)), {
                            type: wa(e.type),
                            doc: i,
                            oldIndex: r,
                            newIndex: o
                        };
                    });
                }
            }(this.vf, e, this.Sf.bind(this)), this.Cf = e), this.Df;
        }
        Sf(t, e, n) {
            return new Tu(this.pf, t.key, t, new aa$1(n, e), this.query.d_);
        }
    }

    // TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
    // metadata
    function mu(t, e) {
        return t instanceof Eu && e instanceof Eu ? t.pf === e.pf && t.f_.isEqual(e.f_) && (null === t.yf ? null === e.yf : t.yf.isEqual(e.yf)) && t.d_ === e.d_ : t instanceof Iu && e instanceof Iu && (t.pf === e.pf && hu(t.query, e.query) && t.metadata.isEqual(e.metadata) && t.vf.isEqual(e.vf));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ class Au {
        constructor(t, e) {
            this.pf = t, this.Nf = e, this.xf = [], this.Of = !1, this.Ff = lu(t);
        }
        set(t, e, n) {
            this.Mf();
            const s = Ru(t, this.pf), i = Ea$1(s.d_, e, n), r = qc$1(this.Ff, "WriteBatch.set", s.f_, i, null !== s.d_, n);
            return this.xf = this.xf.concat(r.w_(s.f_, on.nn())), this;
        }
        update(t, e, n, ...s) {
            this.Mf();
            const i = Ru(t, this.pf);
            let r;
            return r = "string" == typeof e || e instanceof La$1 ? Uc$1(this.Ff, "WriteBatch.update", i.f_, e, n, s) : Bc$1(this.Ff, "WriteBatch.update", i.f_, e), 
            this.xf = this.xf.concat(r.w_(i.f_, on.exists(!0))), this;
        }
        delete(t) {
            this.Mf();
            const e = Ru(t, this.pf);
            return this.xf = this.xf.concat(new An(e.f_, on.nn())), this;
        }
        commit() {
            return this.Mf(), this.Of = !0, this.xf.length > 0 ? this.Nf(this.xf) : Promise.resolve();
        }
        Mf() {
            if (this.Of) throw new C$1(D$1.FAILED_PRECONDITION, "A write batch can no longer be used after commit() has been called.");
        }
    }

    function Ru(t, e) {
        if (t.firestore !== e) throw new C$1(D$1.INVALID_ARGUMENT, "Provided document reference is from a different Firestore instance.");
        return t;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    // TODO(mrschmidt) Consider using `BaseTransaction` as the base class in the
    // legacy SDK.
    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    class Pu extends class {
        constructor(t, e) {
            this.pf = t, this.$f = e, this.Ff = lu(t);
        }
        get(t) {
            const e = Ru(t, this.pf);
            return this.$f.v_([ e.f_ ]).then(t => {
                if (!t || 1 !== t.length) return b();
                const n = t[0];
                if (n instanceof bn) return new fu(this.pf, e.f_, null, e.d_);
                if (n instanceof pn) return new fu(this.pf, n.key, n, e.d_);
                throw b();
            });
        }
        set(t, e, n) {
            const s = Ru(t, this.pf), i = Ea$1(s.d_, e, n), r = qc$1(this.Ff, "Transaction.set", s.f_, i, null !== s.d_, n);
            return this.$f.set(s.f_, r), this;
        }
        update(t, e, n, ...s) {
            const i = Ru(t, this.pf);
            let r;
            return r = "string" == typeof e || e instanceof La$1 ? Uc$1(this.Ff, "Transaction.update", i.f_, e, n, s) : Bc$1(this.Ff, "Transaction.update", i.f_, e), 
            this.$f.update(i.f_, r), this;
        }
        delete(t) {
            const e = Ru(t, this.pf);
            return this.$f.delete(e.f_), this;
        }
    } {
        // This class implements the same logic as the Transaction API in the Lite SDK
        // but is subclassed in order to return its own DocumentSnapshot types.
        constructor(t, e) {
            super(t, e), this.pf = t;
        }
        get(t) {
            const e = Ru(t, this.pf);
            return super.get(t).then(t => new Eu(this.pf, e.f_, t.yf, new aa$1(
            /* hasPendingWrites= */ !1, 
            /* fromCache= */ !1), e.d_));
        }
    }

    function gu(t, e) {
        t.ff();
        const n = new Ts;
        return t.af.Ii(async () => {
            const s = await 
            /**
     * Returns an initialized and started Datastore for the given Firestore
     * instance. Callers must invoke removeDatastore() when the Firestore
     * instance is terminated.
     */
            function(t) {
                var e, n;
                if (t.K_) throw new C$1(D$1.FAILED_PRECONDITION, "The client has already been terminated.");
                if (!sa$1.has(t)) {
                    g$1("ComponentProvider", "Initializing Datastore");
                    const s = t.G_(), i = new j(t.__, t.k_, null !== (e = s.host) && void 0 !== e ? e : "firestore.googleapis.com", null === (n = s.ssl) || void 0 === n || n, 
                    /* forceLongPolling= */ !1), r = Yo(i), o = Xo(i.st), c = or(t.B_, r, o);
                    sa$1.set(t, c);
                }
                return sa$1.get(t);
            }(t);
            new Zc$1(new Cs, s, n => e(new Pu(t, n)), n).run();
        }), n.promise;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */
    /**
     * Casts `obj` to `T`. Throws if  `obj` is not an instance of `T`.
     *
     * This cast is used in the Lite and Full SDK to verify instance types for
     * arguments passed to the public API.
     */ function Vu(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e) {
        if (!(t instanceof e)) throw e.name === t.constructor.name ? new C$1(D$1.INVALID_ARGUMENT, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?") : new C$1(D$1.INVALID_ARGUMENT, `Expected type '${e.name}', but was '${t.constructor.name}'`);
        return t;
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function yu(t) {
        const e = Vu(t.firestore, va);
        e.ff();
        const n = new Ts;
        return e.af.Ii(async () => {
            const s = await ya$1(e);
            await ea$1(s, e.af, t.f_, {
                source: "default"
            }, n);
        }), n.promise.then(n => ku(e, t, n));
    }

    function pu(t) {
        const e = Vu(t.firestore, va);
        e.ff();
        const n = new Ts;
        return e.af.Ii(async () => {
            const s = await ba$1(e);
            await ta$1(s, t.f_, n);
        }), n.promise.then(n => new Eu(e, t.f_, n, new aa$1(n instanceof pn && n.on, 
        /* fromCache= */ !0), t.d_));
    }

    function bu(t) {
        const e = Vu(t.firestore, va);
        e.ff();
        const n = new Ts;
        return e.af.Ii(async () => {
            const s = await ya$1(e);
            await ea$1(s, e.af, t.f_, {
                source: "server"
            }, n);
        }), n.promise.then(n => ku(e, t, n));
    }

    function vu(t) {
        const e = Vu(t.firestore, va);
        e.ff(), da$1(t.wf);
        const n = new Ts;
        return e.af.Ii(async () => {
            const s = await ya$1(e);
            await na$1(s, e.af, t.wf, {
                source: "default"
            }, n);
        }), n.promise.then(n => new Iu(e, t, n));
    }

    function Su(t) {
        const e = Vu(t.firestore, va);
        e.ff();
        const n = new Ts;
        return e.af.Ii(async () => {
            const s = await ba$1(e);
            await async function(t, e, n) {
                try {
                    const s = await Zi(t, e, 
                    /* usePreviousResults= */ !0), i = new io(e, s.kc), r = i.Th(s.documents), o = i.Jn(r, 
                    /* updateLimboDocuments= */ !1);
                    n.resolve(o.snapshot);
                } catch (t) {
                    const s = Ns(t, `Failed to execute query '${e} against cache`);
                    n.reject(s);
                }
            }(s, t.wf, n);
        }), n.promise.then(n => new Iu(e, t, n));
    }

    function Du(t) {
        const e = Vu(t.firestore, va);
        e.ff();
        const n = new Ts;
        return e.af.Ii(async () => {
            const s = await ya$1(e);
            await na$1(s, e.af, t.wf, {
                source: "server"
            }, n);
        }), n.promise.then(n => new Iu(e, t, n));
    }

    function Cu(t, e, n) {
        const s = Vu(t.firestore, va);
        s.ff();
        const i = Ea$1(t.d_, e, n);
        return $u(s, qc$1(lu(s), "setDoc", t.f_, i, null !== t.d_, n).w_(t.f_, on.nn()));
    }

    function Nu(t, e, n, ...s) {
        const i = Vu(t.firestore, va);
        i.ff();
        const r = lu(i);
        let o;
        o = "string" == typeof e || e instanceof La$1 ? Uc$1(r, "updateDoc", t.f_, e, n, s) : Bc$1(r, "updateDoc", t.f_, e);
        return $u(i, o.w_(t.f_, on.exists(!0)));
    }

    function xu(t) {
        const e = Vu(t.firestore, va);
        e.ff();
        return $u(e, [ new An(t.f_, on.nn()) ]);
    }

    function Ou(t, e) {
        const n = Vu(t.firestore, va);
        n.ff();
        const s = au(t), i = Ea$1(t.d_, e);
        return $u(n, qc$1(lu(t.firestore), "addDoc", s.f_, i, null !== t.d_, {}).w_(s.f_, on.exists(!1))).then(() => s);
    }

    function Fu(t, ...e) {
        var n, s, i;
        let r = {
            includeMetadataChanges: !1
        }, o = 0;
        "object" != typeof e[o] || ra$1(e[o]) || (r = e[o], o++);
        const c = {
            includeMetadataChanges: r.includeMetadataChanges
        };
        if (ra$1(e[o])) {
            const t = e[o];
            e[o] = null === (n = t.next) || void 0 === n ? void 0 : n.bind(t), e[o + 1] = null === (s = t.error) || void 0 === s ? void 0 : s.bind(t), 
            e[o + 2] = null === (i = t.complete) || void 0 === i ? void 0 : i.bind(t);
        }
        let a, u, h;
        t instanceof Ba$1 ? (u = Vu(t.firestore, va), h = Cn(t.f_.path), a = {
            next: n => {
                e[o] && e[o](ku(u, t, n));
            },
            error: e[o + 1],
            complete: e[o + 2]
        }) : (u = Vu(t.firestore, va), h = t.wf, a = {
            next: n => {
                e[o] && e[o](new Iu(u, t, n));
            },
            error: e[o + 1],
            complete: e[o + 2]
        }, da$1(t.wf)), u.ff();
        const l = new ic$1(a), _ = new Kr(h, l, c);
        return u.af.Ii(async () => kr(await ya$1(u), _)), () => {
            l.Xl(), u.af.Ii(async () => Lr(await ya$1(u), _));
        };
    }

    function Mu(t, e) {
        t.ff();
        const n = ra$1(e) ? e : {
            next: e
        }, s = new ic$1(n);
        return t.af.Ii(async () => {
            !function(t, e) {
                S$1(t).Ga.add(e), 
                // Immediately fire an initial event, indicating all existing listeners
                // are in-sync.
                e.next();
            }(await ya$1(t), s);
        }), () => {
            s.Xl(), t.af.Ii(async () => {
                !function(t, e) {
                    S$1(t).Ga.delete(e);
                }(await ya$1(t), s);
            });
        };
    }

    /** Locally writes `mutations` on the async queue. */ function $u(t, e) {
        const n = new Ts;
        return t.af.Ii(async () => lo(await ga(t), e, n)), n.promise;
    }

    /**
     * Converts a ViewSnapshot that contains the single document specified by `ref`
     * to a DocumentSnapshot.
     */ function ku(t, e, n) {
        const s = n.docs.get(e.f_);
        return new Eu(t, e.f_, s, new aa$1(n.hasPendingWrites, n.fromCache), e.d_);
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ function Lu(t) {
        return t.ff(), new Au(t, e => $u(t, e));
    }

    /**
     * @license
     * Copyright 2020 Google LLC
     *
     * Licensed under the Apache License, Version 2.0 (the "License");
     * you may not use this file except in compliance with the License.
     * You may obtain a copy of the License at
     *
     *   http://www.apache.org/licenses/LICENSE-2.0
     *
     * Unless required by applicable law or agreed to in writing, software
     * distributed under the License is distributed on an "AS IS" BASIS,
     * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     * See the License for the specific language governing permissions and
     * limitations under the License.
     */ app._registerComponent(new Component("firestore-exp", t => ((t, e) => new va(t, e))(t.getProvider("app-exp").getImmediate(), t.getProvider("auth-internal")), "PUBLIC" /* PUBLIC */)), 
    app.registerVersion("firestore-exp", "0.0.800", "node");

    exports.Bytes = Cc$1;
    exports.CACHE_SIZE_UNLIMITED = ca$1;
    exports.CollectionReference = ru;
    exports.DocumentReference = Ba$1;
    exports.DocumentSnapshot = Eu;
    exports.FieldPath = La$1;
    exports.FieldValue = Ic$1;
    exports.FirebaseFirestore = va;
    exports.FirestoreError = C$1;
    exports.GeoPoint = Dc$1;
    exports.Query = Ua$1;
    exports.QueryConstraint = Ka$1;
    exports.QueryDocumentSnapshot = Tu;
    exports.QuerySnapshot = Iu;
    exports.SnapshotMetadata = aa$1;
    exports.Timestamp = L$1;
    exports.Transaction = Pu;
    exports.WriteBatch = Au;
    exports.addDoc = Ou;
    exports.arrayRemove = Pc$1;
    exports.arrayUnion = Rc$1;
    exports.clearIndexedDbPersistence = xa$1;
    exports.collection = ou;
    exports.collectionGroup = cu;
    exports.deleteDoc = xu;
    exports.deleteField = mc$1;
    exports.disableNetwork = Ma$1;
    exports.doc = au;
    exports.documentId = qa$1;
    exports.enableIndexedDbPersistence = Ca$1;
    exports.enableMultiTabIndexedDbPersistence = Na$1;
    exports.enableNetwork = Fa$1;
    exports.endAt = su;
    exports.endBefore = nu;
    exports.getDoc = yu;
    exports.getDocFromCache = pu;
    exports.getDocFromServer = bu;
    exports.getDocs = vu;
    exports.getDocsFromCache = Su;
    exports.getDocsFromServer = Du;
    exports.getFirestore = Da$1;
    exports.increment = gc$1;
    exports.initializeFirestore = Sa$1;
    exports.limit = Ja$1;
    exports.limitToLast = Ya$1;
    exports.onSnapshot = Fu;
    exports.onSnapshotsInSync = Mu;
    exports.orderBy = za$1;
    exports.query = Qa$1;
    exports.queryEqual = hu;
    exports.refEqual = uu;
    exports.runTransaction = gu;
    exports.serverTimestamp = Ac$1;
    exports.setDoc = Cu;
    exports.setLogLevel = P$1;
    exports.snapshotEqual = mu;
    exports.startAfter = tu;
    exports.startAt = Za$1;
    exports.terminate = $a$1;
    exports.updateDoc = Nu;
    exports.waitForPendingWrites = Oa$1;
    exports.where = ja$1;
    exports.writeBatch = Lu;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-firestore.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-firestore.js.map
