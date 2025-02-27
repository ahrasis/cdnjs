(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@firebase/app')) :
    typeof define === 'function' && define.amd ? define(['exports', '@firebase/app'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.firebase = global.firebase || {}, global.firebase['firestore-lite'] = global.firebase['firestore-lite'] || {}), global.firebase.app));
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
    var LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
        LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
        LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
    })(LogLevel || (LogLevel = {}));
    var levelStringToEnum = {
        'debug': LogLevel.DEBUG,
        'verbose': LogLevel.VERBOSE,
        'info': LogLevel.INFO,
        'warn': LogLevel.WARN,
        'error': LogLevel.ERROR,
        'silent': LogLevel.SILENT
    };
    /**
     * The default log level
     */
    var defaultLogLevel = LogLevel.INFO;
    /**
     * By default, `console.debug` is not displayed in the developer console (in
     * chrome). To avoid forcing users to have to opt-in to these logs twice
     * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
     * logs to the `console.log` function.
     */
    var ConsoleMethod = (_a = {},
        _a[LogLevel.DEBUG] = 'log',
        _a[LogLevel.VERBOSE] = 'log',
        _a[LogLevel.INFO] = 'info',
        _a[LogLevel.WARN] = 'warn',
        _a[LogLevel.ERROR] = 'error',
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
                if (!(val in LogLevel)) {
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
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.DEBUG], args));
        };
        Logger.prototype.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.VERBOSE], args));
        };
        Logger.prototype.info = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.INFO], args));
        };
        Logger.prototype.warn = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.WARN], args));
        };
        Logger.prototype.error = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            this._userLogHandler && this._userLogHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
            this._logHandler.apply(this, __spreadArrays([this, LogLevel.ERROR], args));
        };
        return Logger;
    }());

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
     */ const u = "ok", c = "cancelled", a = "unknown", h = "invalid-argument", l = "deadline-exceeded", f = "not-found", d = "already-exists", _ = "permission-denied", w = "unauthenticated", m = "resource-exhausted", p = "failed-precondition", y = "aborted", E = "out-of-range", I = "unimplemented", A = "internal", T = "unavailable", P = "data-loss";

    /**
     * An error class used for Firestore-generated errors. Ideally we should be
     * using FirebaseError, but integrating with it is overly arduous at the moment,
     * so we define our own compatible error class (with a `name` of 'FirebaseError'
     * and compatible `code` and `message` fields.)
     */ class R extends Error {
        constructor(t, n) {
            super(n), this.code = t, this.message = n, this.name = "FirebaseError", 
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
     */
    const V = new Logger("@firebase/firestore");

    function g(t) {
        V.setLogLevel(t);
    }

    function b(t, ...n) {
        if (V.logLevel <= LogLevel.DEBUG) {
            const e = n.map(N);
            V.debug("Firestore (7.19.1): " + t, ...e);
        }
    }

    function v(t, ...n) {
        if (V.logLevel <= LogLevel.ERROR) {
            const e = n.map(N);
            V.error("Firestore (7.19.1): " + t, ...e);
        }
    }

    /**
     * Converts an additional log parameter to a string representation.
     */
    function N(t) {
        if ("string" == typeof t) return t;
        try {
            return n = t, JSON.stringify(n);
        } catch (n) {
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
        var n;
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
     */ function $(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const n = "FIRESTORE (7.19.1) INTERNAL ASSERTION FAILED: " + t;
        // NOTE: We don't use FirestoreError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw v(n), new Error(n);
    }

    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * Messages are stripped in production builds.
     */ function F(t, n) {
        t || $();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function D(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
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
    /**
     * Generates `nBytes` of random bytes.
     *
     * If `nBytes < 0` , an error will be thrown.
     */ function q(t) {
        // Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
        const n = 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        "undefined" != typeof self && (self.crypto || self.msCrypto), e = new Uint8Array(t);
        if (n && "function" == typeof n.getRandomValues) n.getRandomValues(e); else 
        // Falls back to Math.random
        for (let n = 0; n < t; n++) e[n] = Math.floor(256 * Math.random());
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
     */ class x {
        static t() {
            // Alphanumeric characters
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = Math.floor(256 / t.length) * t.length;
            // The largest byte value that is a multiple of `char.length`.
                    let e = "";
            for (;e.length < 20; ) {
                const r = q(40);
                for (let s = 0; s < r.length; ++s) 
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                e.length < 20 && r[s] < n && (e += t.charAt(r[s] % t.length));
            }
            return e;
        }
    }

    function S(t, n) {
        return t < n ? -1 : t > n ? 1 : 0;
    }

    /** Helper to compare arrays using isEqual(). */ function O(t, n, e) {
        return t.length === n.length && t.every((t, r) => e(t, n[r]));
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
     */ class C {
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
        constructor(t, n, e, r, s) {
            this.s = t, this.persistenceKey = n, this.host = e, this.ssl = r, this.forceLongPolling = s;
        }
    }

    /** The default database name for a project. */
    /** Represents the database ID a Firestore client is associated with. */
    class L {
        constructor(t, n) {
            this.projectId = t, this.database = n || "(default)";
        }
        get i() {
            return "(default)" === this.database;
        }
        isEqual(t) {
            return t instanceof L && t.projectId === this.projectId && t.database === this.database;
        }
        o(t) {
            return S(this.projectId, t.projectId) || S(this.database, t.database);
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
     * Simple wrapper around a nullable UID. Mostly exists to make code more
     * readable.
     */ class U {
        constructor(t) {
            this.uid = t;
        }
        u() {
            return null != this.uid;
        }
        /**
         * Returns a key representing this user, suitable for inclusion in a
         * dictionary.
         */    h() {
            return this.u() ? "uid:" + this.uid : "anonymous-user";
        }
        isEqual(t) {
            return t.uid === this.uid;
        }
    }

    /** A user with a null UID. */ U.UNAUTHENTICATED = new U(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    U.l = new U("google-credentials-uid"), U._ = new U("first-party-uid");

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
    class M {
        constructor(t, n) {
            this.user = n, this.type = "OAuth", this.m = {}, 
            // Set the headers using Object Literal notation to avoid minification
            this.m.Authorization = "Bearer " + t;
        }
    }

    class j {
        constructor(t) {
            /**
             * The auth token listener registered with FirebaseApp, retained here so we
             * can unregister it.
             */
            this.p = null, 
            /** Tracks the current User. */
            this.currentUser = U.UNAUTHENTICATED, this.I = !1, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.A = 0, 
            /** The listener registered with setChangeListener(). */
            this.T = null, this.forceRefresh = !1, this.p = () => {
                this.A++, this.currentUser = this.P(), this.I = !0, this.T && this.T(this.currentUser);
            }, this.A = 0, this.auth = t.getImmediate({
                optional: !0
            }), this.auth ? this.auth.addAuthTokenListener(this.p) : (
            // if auth is not available, invoke tokenListener once with null token
            this.p(null), t.get().then(t => {
                this.auth = t, this.p && 
                // tokenListener can be removed by removeChangeListener()
                this.auth.addAuthTokenListener(this.p);
            }, () => {}));
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.A, n = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then(n => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.A !== t ? (b("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : n ? (F("string" == typeof n.accessToken), new M(n.accessToken, this.currentUser)) : null) : Promise.resolve(null);
        }
        R() {
            this.forceRefresh = !0;
        }
        V(t) {
            this.T = t, 
            // Fire the initial event
            this.I && t(this.currentUser);
        }
        g() {
            this.auth && this.auth.removeAuthTokenListener(this.p), this.p = null, this.T = null;
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        P() {
            const t = this.auth && this.auth.getUid();
            return F(null === t || "string" == typeof t), new U(t);
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
     * Casts `obj` to `T`. Throws if  `obj` is not an instance of `T`.
     *
     * This cast is used in the Lite and Full SDK to verify instance types for
     * arguments passed to the public API.
     */ function B(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
        if (!(t instanceof n)) throw n.name === t.constructor.name ? new R(h, `Type does not match the expected instance. Did you pass '${n.name}' from a different Firestore SDK?`) : new R(h, `Expected type '${n.name}', but was '${t.constructor.name}'`);
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
     */
    // The earlist date supported by Firestore timestamps (0001-01-01T00:00:00Z).
    class k {
        constructor(t, n) {
            if (this.seconds = t, this.nanoseconds = n, n < 0) throw new R(h, "Timestamp nanoseconds out of range: " + n);
            if (n >= 1e9) throw new R(h, "Timestamp nanoseconds out of range: " + n);
            if (t < -62135596800) throw new R(h, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new R(h, "Timestamp seconds out of range: " + t);
        }
        static now() {
            return k.fromMillis(Date.now());
        }
        static fromDate(t) {
            return k.fromMillis(t.getTime());
        }
        static fromMillis(t) {
            const n = Math.floor(t / 1e3);
            return new k(n, 1e6 * (t - 1e3 * n));
        }
        toDate() {
            return new Date(this.toMillis());
        }
        toMillis() {
            return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        v(t) {
            return this.seconds === t.seconds ? S(this.nanoseconds, t.nanoseconds) : S(this.seconds, t.seconds);
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
     */ class Q {
        constructor(t) {
            this.timestamp = t;
        }
        static N(t) {
            return new Q(t);
        }
        static min() {
            return new Q(new k(0, 0));
        }
        o(t) {
            return this.timestamp.v(t.timestamp);
        }
        isEqual(t) {
            return this.timestamp.isEqual(t.timestamp);
        }
        /** Returns a number representation of the version for use in spec tests. */    $() {
            // Convert to microseconds.
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
        }
        toString() {
            return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        F() {
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
    class G {
        constructor(t, n, e) {
            void 0 === n ? n = 0 : n > t.length && $(), void 0 === e ? e = t.length - n : e > t.length - n && $(), 
            this.segments = t, this.offset = n, this.D = e;
        }
        get length() {
            return this.D;
        }
        isEqual(t) {
            return 0 === G.q(this, t);
        }
        child(t) {
            const n = this.segments.slice(this.offset, this.limit());
            return t instanceof G ? t.forEach(t => {
                n.push(t);
            }) : n.push(t), this.S(n);
        }
        /** The index of one past the last segment of the path. */    limit() {
            return this.offset + this.length;
        }
        O(t) {
            return t = void 0 === t ? 1 : t, this.S(this.segments, this.offset + t, this.length - t);
        }
        C() {
            return this.S(this.segments, this.offset, this.length - 1);
        }
        L() {
            return this.segments[this.offset];
        }
        U() {
            return this.get(this.length - 1);
        }
        get(t) {
            return this.segments[this.offset + t];
        }
        M() {
            return 0 === this.length;
        }
        j(t) {
            if (t.length < this.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        B(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        forEach(t) {
            for (let n = this.offset, e = this.limit(); n < e; n++) t(this.segments[n]);
        }
        k() {
            return this.segments.slice(this.offset, this.limit());
        }
        static q(t, n) {
            const e = Math.min(t.length, n.length);
            for (let r = 0; r < e; r++) {
                const e = t.get(r), s = n.get(r);
                if (e < s) return -1;
                if (e > s) return 1;
            }
            return t.length < n.length ? -1 : t.length > n.length ? 1 : 0;
        }
    }

    /**
     * A slash-separated path for navigating resources (documents and collections)
     * within Firestore.
     */ class W extends G {
        S(t, n, e) {
            return new W(t, n, e);
        }
        G() {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            return this.k().join("/");
        }
        toString() {
            return this.G();
        }
        /**
         * Creates a resource path from the given slash-delimited string.
         */    static W(t) {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            if (t.indexOf("//") >= 0) throw new R(h, `Invalid path (${t}). Paths must not contain // in them.`);
            // We may still have an empty segment at the beginning or end if they had a
            // leading or trailing slash (which we allow).
                    const n = t.split("/").filter(t => t.length > 0);
            return new W(n);
        }
        static Y() {
            return new W([]);
        }
    }

    const Y = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /** A dot-separated path for navigating sub-objects within a document. */ class z extends G {
        S(t, n, e) {
            return new z(t, n, e);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static H(t) {
            return Y.test(t);
        }
        G() {
            return this.k().map(t => (t = t.replace("\\", "\\\\").replace("`", "\\`"), z.H(t) || (t = "`" + t + "`"), 
            t)).join(".");
        }
        toString() {
            return this.G();
        }
        /**
         * Returns true if this field references the key of a document.
         */    K() {
            return 1 === this.length && "__name__" === this.get(0);
        }
        /**
         * The field designating the key of a document.
         */    static J() {
            return new z([ "__name__" ]);
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
         */    static Z(t) {
            const n = [];
            let e = "", r = 0;
            const s = () => {
                if (0 === e.length) throw new R(h, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                n.push(e), e = "";
            };
            let i = !1;
            for (;r < t.length; ) {
                const n = t[r];
                if ("\\" === n) {
                    if (r + 1 === t.length) throw new R(h, "Path has trailing escape character: " + t);
                    const n = t[r + 1];
                    if ("\\" !== n && "." !== n && "`" !== n) throw new R(h, "Path has invalid escape sequence: " + t);
                    e += n, r += 2;
                } else "`" === n ? (i = !i, r++) : "." !== n || i ? (e += n, r++) : (s(), r++);
            }
            if (s(), i) throw new R(h, "Unterminated ` in path: " + t);
            return new z(n);
        }
        static Y() {
            return new z([]);
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
     */ class H {
        constructor(t) {
            this.path = t;
        }
        static X(t) {
            return new H(W.W(t));
        }
        static tt(t) {
            return new H(W.W(t).O(5));
        }
        /** Returns true if the document is in the specified collectionId. */    nt(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        isEqual(t) {
            return null !== t && 0 === W.q(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static q(t, n) {
            return W.q(t.path, n.path);
        }
        static et(t) {
            return t.length % 2 == 0;
        }
        /**
         * Creates and returns a new document key with the given segments.
         *
         * @param segments The segments of the path to the document
         * @return A new instance of DocumentKey
         */    static rt(t) {
            return new H(new W(t.slice()));
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
     */ function K(t) {
        let n = 0;
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n++;
        return n;
    }

    function J(t, n) {
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n(e, t[e]);
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
     * Immutable class that represents a "proto" byte string.
     *
     * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
     * sent on the wire. This class abstracts away this differentiation by holding
     * the proto byte string in a common class that must be converted into a string
     * before being sent as a proto.
     */
    class Z {
        constructor(t) {
            this.st = t;
        }
        static fromBase64String(t) {
            const n = atob(t);
            return new Z(n);
        }
        static fromUint8Array(t) {
            const n = 
            /**
     * Helper function to convert an Uint8array to a binary string.
     */
            function(t) {
                let n = "";
                for (let e = 0; e < t.length; ++e) n += String.fromCharCode(t[e]);
                return n;
            }
            /**
     * Helper function to convert a binary string to an Uint8Array.
     */ (t);
            return new Z(n);
        }
        toBase64() {
            return t = this.st, btoa(t);
            /** Converts a binary string to a Base64 encoded string. */
            var t;
        }
        toUint8Array() {
            return function(t) {
                const n = new Uint8Array(t.length);
                for (let e = 0; e < t.length; e++) n[e] = t.charCodeAt(e);
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
     */
            /**
     * Returns whether a variable is either undefined or null.
     */ (this.st);
        }
        it() {
            return 2 * this.st.length;
        }
        o(t) {
            return S(this.st, t.st);
        }
        isEqual(t) {
            return this.st === t.st;
        }
    }

    function X(t) {
        return null == t;
    }

    /** Returns whether the value represents -0. */ function tt(t) {
        // Detect if the value is -0.0. Based on polyfill from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
        return -0 === t && 1 / t == -1 / 0;
    }

    /**
     * Returns whether a value is an integer and in the safe integer range
     * @param value The value to test for being an integer and in the safe range
     */ Z.ot = new Z("");

    function nt(t) {
        var n, e;
        return "server_timestamp" === (null === (e = ((null === (n = null == t ? void 0 : t.mapValue) || void 0 === n ? void 0 : n.fields) || {}).__type__) || void 0 === e ? void 0 : e.stringValue);
    }

    /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */
    /**
     * Returns the local time at which this timestamp was first set.
     */
    function et(t) {
        const n = at(t.mapValue.fields.__local_write_time__.timestampValue);
        return new k(n.seconds, n.nanos);
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
    const rt = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /** Extracts the backend's type order for the provided value. */ function st(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? nt(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : $();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function it(t, n) {
        const e = st(t);
        if (e !== st(n)) return !1;
        switch (e) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === n.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return et(t).isEqual(et(n));

          case 3 /* TimestampValue */ :
            return function(t, n) {
                if ("string" == typeof t.timestampValue && "string" == typeof n.timestampValue && t.timestampValue.length === n.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === n.timestampValue;
                const e = at(t.timestampValue), r = at(n.timestampValue);
                return e.seconds === r.seconds && e.nanos === r.nanos;
            }(t, n);

          case 5 /* StringValue */ :
            return t.stringValue === n.stringValue;

          case 6 /* BlobValue */ :
            return function(t, n) {
                return lt(t.bytesValue).isEqual(lt(n.bytesValue));
            }(t, n);

          case 7 /* RefValue */ :
            return t.referenceValue === n.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                return ht(t.geoPointValue.latitude) === ht(n.geoPointValue.latitude) && ht(t.geoPointValue.longitude) === ht(n.geoPointValue.longitude);
            }(t, n);

          case 2 /* NumberValue */ :
            return function(t, n) {
                if ("integerValue" in t && "integerValue" in n) return ht(t.integerValue) === ht(n.integerValue);
                if ("doubleValue" in t && "doubleValue" in n) {
                    const e = ht(t.doubleValue), r = ht(n.doubleValue);
                    return e === r ? tt(e) === tt(r) : isNaN(e) && isNaN(r);
                }
                return !1;
            }(t, n);

          case 9 /* ArrayValue */ :
            return O(t.arrayValue.values || [], n.arrayValue.values || [], it);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.mapValue.fields || {}, r = n.mapValue.fields || {};
                if (K(e) !== K(r)) return !1;
                for (const t in e) if (e.hasOwnProperty(t) && (void 0 === r[t] || !it(e[t], r[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, n);

          default:
            return $();
        }
    }

    function ot(t, n) {
        return void 0 !== (t.values || []).find(t => it(t, n));
    }

    function ut(t, n) {
        const e = st(t), r = st(n);
        if (e !== r) return S(e, r);
        switch (e) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return S(t.booleanValue, n.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, n) {
                const e = ht(t.integerValue || t.doubleValue), r = ht(n.integerValue || n.doubleValue);
                return e < r ? -1 : e > r ? 1 : e === r ? 0 : 
                // one or both are NaN.
                isNaN(e) ? isNaN(r) ? 0 : -1 : 1;
            }(t, n);

          case 3 /* TimestampValue */ :
            return ct(t.timestampValue, n.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return ct(et(t), et(n));

          case 5 /* StringValue */ :
            return S(t.stringValue, n.stringValue);

          case 6 /* BlobValue */ :
            return function(t, n) {
                const e = lt(t), r = lt(n);
                return e.o(r);
            }(t.bytesValue, n.bytesValue);

          case 7 /* RefValue */ :
            return function(t, n) {
                const e = t.split("/"), r = n.split("/");
                for (let t = 0; t < e.length && t < r.length; t++) {
                    const n = S(e[t], r[t]);
                    if (0 !== n) return n;
                }
                return S(e.length, r.length);
            }(t.referenceValue, n.referenceValue);

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                const e = S(ht(t.latitude), ht(n.latitude));
                if (0 !== e) return e;
                return S(ht(t.longitude), ht(n.longitude));
            }(t.geoPointValue, n.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, n) {
                const e = t.values || [], r = n.values || [];
                for (let t = 0; t < e.length && t < r.length; ++t) {
                    const n = ut(e[t], r[t]);
                    if (n) return n;
                }
                return S(e.length, r.length);
            }(t.arrayValue, n.arrayValue);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.fields || {}, r = Object.keys(e), s = n.fields || {}, i = Object.keys(s);
                // Even though MapValues are likely sorted correctly based on their insertion
                // order (e.g. when received from the backend), local modifications can bring
                // elements out of order. We need to re-sort the elements to ensure that
                // canonical IDs are independent of insertion order.
                r.sort(), i.sort();
                for (let t = 0; t < r.length && t < i.length; ++t) {
                    const n = S(r[t], i[t]);
                    if (0 !== n) return n;
                    const o = ut(e[r[t]], s[i[t]]);
                    if (0 !== o) return o;
                }
                return S(r.length, i.length);
            }
            /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ (t.mapValue, n.mapValue);

          default:
            throw $();
        }
    }

    function ct(t, n) {
        if ("string" == typeof t && "string" == typeof n && t.length === n.length) return S(t, n);
        const e = at(t), r = at(n), s = S(e.seconds, r.seconds);
        return 0 !== s ? s : S(e.nanos, r.nanos);
    }

    function at(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (F(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let n = 0;
            const e = rt.exec(t);
            if (F(!!e), e[1]) {
                // Pad the fraction out to 9 digits (nanos).
                let t = e[1];
                t = (t + "000000000").substr(0, 9), n = Number(t);
            }
            // Parse the date to get the seconds.
                    const r = new Date(t);
            return {
                seconds: Math.floor(r.getTime() / 1e3),
                nanos: n
            };
        }
        return {
            seconds: ht(t.seconds),
            nanos: ht(t.nanos)
        };
    }

    /**
     * Converts the possible Proto types for numbers into a JavaScript number.
     * Returns 0 if the value is not numeric.
     */ function ht(t) {
        // TODO(bjornick): Handle int64 greater than 53 bits.
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
    }

    /** Converts the possible Proto types for Blobs into a ByteString. */ function lt(t) {
        return "string" == typeof t ? Z.fromBase64String(t) : Z.fromUint8Array(t);
    }

    /** Returns a reference value for the provided database and key. */ function ft(t, n) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${n.path.G()}`
        };
    }

    /** Returns true if `value` is an ArrayValue. */ function dt(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function _t(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function wt(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function mt(t) {
        return !!t && "mapValue" in t;
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
    class pt {
        constructor(t, n = null, e = [], r = [], s = null, i = null, o = null) {
            this.path = t, this.collectionGroup = n, this.orderBy = e, this.filters = r, this.limit = s, 
            this.startAt = i, this.endAt = o, this.ut = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function yt(t, n = null, e = [], r = [], s = null, i = null, o = null) {
        return new pt(t, n, e, r, s, i, o);
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
     */
    class Et {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, n = null, e = [], r = [], s = null, i = "F" /* First */ , o = null, u = null) {
            this.path = t, this.collectionGroup = n, this.ct = e, this.filters = r, this.limit = s, 
            this.at = i, this.startAt = o, this.endAt = u, this.ht = null, 
            // The corresponding `Target` of this `Query` instance.
            this.lt = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function It(t) {
        return !X(t.limit) && "L" /* Last */ === t.at;
    }

    function At(t) {
        return t.ct.length > 0 ? t.ct[0].field : null;
    }

    function Tt(t) {
        for (const n of t.filters) if (n.ft()) return n.field;
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
    function Pt(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function Rt(t) {
        const n = B(t, Et);
        if (null === n.ht) {
            n.ht = [];
            const t = Tt(n), e = At(n);
            if (null !== t && null === e) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.K() || n.ht.push(new Lt(t)), n.ht.push(new Lt(z.J(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const e of n.ct) n.ht.push(e), e.field.K() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = n.ct.length > 0 ? n.ct[n.ct.length - 1].dir : "asc" /* ASCENDING */;
                    n.ht.push(new Lt(z.J(), t));
                }
            }
        }
        return n.ht;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function Vt(t) {
        const n = B(t, Et);
        if (!n.lt) if ("F" /* First */ === n.at) n.lt = yt(n.path, n.collectionGroup, Rt(n), n.filters, n.limit, n.startAt, n.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const e of Rt(n)) {
                const n = "desc" /* DESCENDING */ === e.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new Lt(e.field, n));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const e = n.endAt ? new Ot(n.endAt.position, !n.endAt.before) : null, r = n.startAt ? new Ot(n.startAt.position, !n.startAt.before) : null;
            // Now return as a LimitType.First query.
            n.lt = yt(n.path, n.collectionGroup, t, n.filters, n.limit, e, r);
        }
        return n.lt;
    }

    function gt(t, n) {
        return function(t, n) {
            if (t.limit !== n.limit) return !1;
            if (t.orderBy.length !== n.orderBy.length) return !1;
            for (let e = 0; e < t.orderBy.length; e++) if (!Ut(t.orderBy[e], n.orderBy[e])) return !1;
            if (t.filters.length !== n.filters.length) return !1;
            for (let s = 0; s < t.filters.length; s++) if (e = t.filters[s], r = n.filters[s], 
            e.op !== r.op || !e.field.isEqual(r.field) || !it(e.value, r.value)) return !1;
            var e, r;
            /** Filter that matches on key fields (i.e. '__name__'). */        return t.collectionGroup === n.collectionGroup && !!t.path.isEqual(n.path) && !!Ct(t.startAt, n.startAt) && Ct(t.endAt, n.endAt);
        }(Vt(t), Vt(n)) && t.at === n.at;
    }

    class bt extends class {} {
        constructor(t, n, e) {
            super(), this.field = t, this.op = n, this.value = e;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, n, e) {
            if (t.K()) return "in" /* IN */ === n || "not-in" /* NOT_IN */ === n ? this.dt(t, n, e) : new vt(t, n, e);
            if (_t(e)) {
                if ("==" /* EQUAL */ !== n && "!=" /* NOT_EQUAL */ !== n) 
                // TODO(ne-queries): Update error message to include != comparison.
                throw new R(h, "Invalid query. Null supports only equality comparisons.");
                return new bt(t, n, e);
            }
            if (wt(e)) {
                if ("==" /* EQUAL */ !== n && "!=" /* NOT_EQUAL */ !== n) 
                // TODO(ne-queries): Update error message to include != comparison.
                throw new R(h, "Invalid query. NaN supports only equality comparisons.");
                return new bt(t, n, e);
            }
            return "array-contains" /* ARRAY_CONTAINS */ === n ? new Dt(t, e) : "in" /* IN */ === n ? new qt(t, e) : "not-in" /* NOT_IN */ === n ? new xt(t, e) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === n ? new St(t, e) : new bt(t, n, e);
        }
        static dt(t, n, e) {
            return "in" /* IN */ === n ? new Nt(t, e) : new $t(t, e);
        }
        matches(t) {
            const n = t.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== n && this._t(ut(n, this.value)) : null !== n && st(this.value) === st(n) && this._t(ut(n, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        _t(t) {
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
                return $();
            }
        }
        ft() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ ].indexOf(this.op) >= 0;
        }
    }

    class vt extends bt {
        constructor(t, n, e) {
            super(t, n, e), this.key = H.tt(e.referenceValue);
        }
        matches(t) {
            const n = H.q(t.key, this.key);
            return this._t(n);
        }
    }

    /** Filter that matches on key fields within an array. */ class Nt extends bt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n), this.keys = Ft("in" /* IN */ , n);
        }
        matches(t) {
            return this.keys.some(n => n.isEqual(t.key));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class $t extends bt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n), this.keys = Ft("not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            return !this.keys.some(n => n.isEqual(t.key));
        }
    }

    function Ft(t, n) {
        var e;
        return ((null === (e = n.arrayValue) || void 0 === e ? void 0 : e.values) || []).map(t => H.tt(t.referenceValue));
    }

    /** A Filter that implements the array-contains operator. */ class Dt extends bt {
        constructor(t, n) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return dt(n) && ot(n.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class qt extends bt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return null !== n && ot(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the not-in operator. */ class xt extends bt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return null !== n && !ot(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class St extends bt {
        constructor(t, n) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return !(!dt(n) || !n.arrayValue.values) && n.arrayValue.values.some(t => ot(this.value.arrayValue, t));
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
     */ class Ot {
        constructor(t, n) {
            this.position = t, this.before = n;
        }
    }

    function Ct(t, n) {
        if (null === t) return null === n;
        if (null === n) return !1;
        if (t.before !== n.before || t.position.length !== n.position.length) return !1;
        for (let e = 0; e < t.position.length; e++) {
            if (!it(t.position[e], n.position[e])) return !1;
        }
        return !0;
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class Lt {
        constructor(t, n = "asc" /* ASCENDING */) {
            this.field = t, this.dir = n;
        }
    }

    function Ut(t, n) {
        return t.dir === n.dir && t.field.isEqual(n.field);
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
     */ var Mt, jt;

    /**
     * Converts an HTTP Status Code to the equivalent error code.
     *
     * @param status An HTTP Status Code, like 200, 404, 503, etc.
     * @returns The equivalent Code. Unknown status codes are mapped to
     *     Code.UNKNOWN.
     */
    function Bt(t) {
        if (void 0 === t) return v("RPC_ERROR", "HTTP error has no status"), a;
        // The canonical error codes for Google APIs [1] specify mapping onto HTTP
        // status codes but the mapping is not bijective. In each case of ambiguity
        // this function chooses a primary error.
        
        // [1]
        // https://github.com/googleapis/googleapis/blob/master/google/rpc/code.proto
            switch (t) {
          case 200:
            // OK
            return u;

          case 400:
            // Bad Request
            return p;

            // Other possibilities based on the forward mapping
            // return Code.INVALID_ARGUMENT;
            // return Code.OUT_OF_RANGE;
                  case 401:
            // Unauthorized
            return w;

          case 403:
            // Forbidden
            return _;

          case 404:
            // Not Found
            return f;

          case 409:
            // Conflict
            return y;

            // Other possibilities:
            // return Code.ALREADY_EXISTS;
                  case 416:
            // Range Not Satisfiable
            return E;

          case 429:
            // Too Many Requests
            return m;

          case 499:
            // Client Closed Request
            return c;

          case 500:
            // Internal Server Error
            return a;

            // Other possibilities:
            // return Code.INTERNAL;
            // return Code.DATA_LOSS;
                  case 501:
            // Unimplemented
            return I;

          case 503:
            // Service Unavailable
            return T;

          case 504:
            // Gateway Timeout
            return l;

          default:
            return t >= 200 && t < 300 ? u : t >= 400 && t < 500 ? p : t >= 500 && t < 600 ? A : a;
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
     */ (jt = Mt || (Mt = {}))[jt.OK = 0] = "OK", jt[jt.CANCELLED = 1] = "CANCELLED", 
    jt[jt.UNKNOWN = 2] = "UNKNOWN", jt[jt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
    jt[jt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", jt[jt.NOT_FOUND = 5] = "NOT_FOUND", 
    jt[jt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", jt[jt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
    jt[jt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", jt[jt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
    jt[jt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", jt[jt.ABORTED = 10] = "ABORTED", 
    jt[jt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", jt[jt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
    jt[jt.INTERNAL = 13] = "INTERNAL", jt[jt.UNAVAILABLE = 14] = "UNAVAILABLE", jt[jt.DATA_LOSS = 15] = "DATA_LOSS";

    const kt = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), Qt = (() => {
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
    class Gt {
        constructor(t, n) {
            this.s = t, this.wt = n;
        }
    }

    /**
     * Returns a value for a number (or null) that's appropriate to put into
     * a google.protobuf.Int32Value proto.
     * DO NOT USE THIS FOR ANYTHING ELSE.
     * This method cheats. It's typed as returning "number" because that's what
     * our generated proto interfaces say Int32Value must be. But GRPC actually
     * expects a { value: <number> } struct.
     */
    /**
     * Returns a value for a number that's appropriate to put into a proto.
     * The return value is an IntegerValue if it can safely represent the value,
     * otherwise a DoubleValue is returned.
     */
    function Wt(t, n) {
        return function(t) {
            return "number" == typeof t && Number.isInteger(t) && !tt(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
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
     */ (n) ? 
        /**
     * Returns an IntegerValue for `value`.
     */
        function(t) {
            return {
                integerValue: "" + t
            };
        }
        /**
     * Returns an DoubleValue for `value` that is encoded based the serializer's
     * `useProto3Json` setting.
     */ (n) : function(t, n) {
            if (t.wt) {
                if (isNaN(n)) return {
                    doubleValue: "NaN"
                };
                if (n === 1 / 0) return {
                    doubleValue: "Infinity"
                };
                if (n === -1 / 0) return {
                    doubleValue: "-Infinity"
                };
            }
            return {
                doubleValue: tt(n) ? "-0" : n
            };
        }(t, n);
    }

    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */ function Yt(t, n) {
        if (t.wt) {
            return `${new Date(1e3 * n.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + n.nanoseconds).slice(-9)}Z`;
        }
        return {
            seconds: "" + n.seconds,
            nanos: n.nanoseconds
        };
    }

    /**
     * Returns a value for bytes that's appropriate to put in a proto.
     *
     * Visible for testing.
     */
    function zt(t, n) {
        return t.wt ? n.toBase64() : n.toUint8Array();
    }

    function Ht(t, n) {
        return Yt(t, n.F());
    }

    function Kt(t) {
        return F(!!t), Q.N(function(t) {
            const n = at(t);
            return new k(n.seconds, n.nanos);
        }(t));
    }

    function Jt(t, n) {
        return function(t) {
            return new W([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(n).G();
    }

    function Zt(t, n) {
        return Jt(t.s, n.path);
    }

    function Xt(t, n) {
        const e = function(t) {
            const n = W.W(t);
            return F(fn(n)), n;
        }(n);
        return F(e.get(1) === t.s.projectId), F(!e.get(3) && !t.s.database || e.get(3) === t.s.database), 
        new H((F((r = e).length > 4 && "documents" === r.get(4)), r.O(5)));
        var r;
        /** Creates a Document proto from key and fields (but no create/update time) */}

    function tn(t, n) {
        return Jt(t.s, n);
    }

    function nn(t) {
        return new W([ "projects", t.s.projectId, "databases", t.s.database ]).G();
    }

    function en(t, n, e) {
        return {
            name: Zt(t, n),
            fields: e.proto.mapValue.fields
        };
    }

    function rn(t, n) {
        return "found" in n ? function(t, n) {
            F(!!n.found), n.found.name, n.found.updateTime;
            const e = Xt(t, n.found.name), r = Kt(n.found.updateTime), s = new bn({
                mapValue: {
                    fields: n.found.fields
                }
            });
            return new $n(e, r, s, {});
        }(t, n) : "missing" in n ? function(t, n) {
            F(!!n.missing), F(!!n.readTime);
            const e = Xt(t, n.missing), r = Kt(n.readTime);
            return new Fn(e, r);
        }(t, n) : $();
    }

    function sn(t, n) {
        let e;
        if (n instanceof Tn) e = {
            update: en(t, n.key, n.value)
        }; else if (n instanceof Vn) e = {
            delete: Zt(t, n.key)
        }; else if (n instanceof Pn) e = {
            update: en(t, n.key, n.data),
            updateMask: ln(n.pt)
        }; else if (n instanceof Rn) e = {
            transform: {
                document: Zt(t, n.key),
                fieldTransforms: n.fieldTransforms.map(t => function(t, n) {
                    const e = n.transform;
                    if (e instanceof _n) return {
                        fieldPath: n.field.G(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (e instanceof wn) return {
                        fieldPath: n.field.G(),
                        appendMissingElements: {
                            values: e.elements
                        }
                    };
                    if (e instanceof mn) return {
                        fieldPath: n.field.G(),
                        removeAllFromArray: {
                            values: e.elements
                        }
                    };
                    if (e instanceof pn) return {
                        fieldPath: n.field.G(),
                        increment: e.yt
                    };
                    throw $();
                }(0, t))
            }
        }; else {
            if (!(n instanceof gn)) return $();
            e = {
                verify: Zt(t, n.key)
            };
        }
        return n.It.Et || (e.currentDocument = function(t, n) {
            return void 0 !== n.updateTime ? {
                updateTime: Ht(t, n.updateTime)
            } : void 0 !== n.exists ? {
                exists: n.exists
            } : $();
        }(t, n.It)), e;
    }

    function on(t, n) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const e = {
            structuredQuery: {}
        }, r = n.path;
        null !== n.collectionGroup ? (e.parent = tn(t, r), e.structuredQuery.from = [ {
            collectionId: n.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = tn(t, r.C()), e.structuredQuery.from = [ {
            collectionId: r.U()
        } ]);
        const s = function(t) {
            if (0 === t.length) return;
            const n = t.map(t => 
            // visible for testing
            function(t) {
                if ("==" /* EQUAL */ === t.op) {
                    if (wt(t.value)) return {
                        unaryFilter: {
                            field: hn(t.field),
                            op: "IS_NAN"
                        }
                    };
                    if (_t(t.value)) return {
                        unaryFilter: {
                            field: hn(t.field),
                            op: "IS_NULL"
                        }
                    };
                } else if ("!=" /* NOT_EQUAL */ === t.op) {
                    if (wt(t.value)) return {
                        unaryFilter: {
                            field: hn(t.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (_t(t.value)) return {
                        unaryFilter: {
                            field: hn(t.field),
                            op: "IS_NOT_NULL"
                        }
                    };
                }
                return {
                    fieldFilter: {
                        field: hn(t.field),
                        op: an(t.op),
                        value: t.value
                    }
                };
            }(t));
            if (1 === n.length) return n[0];
            return {
                compositeFilter: {
                    op: "AND",
                    filters: n
                }
            };
        }(n.filters);
        s && (e.structuredQuery.where = s);
        const i = function(t) {
            if (0 === t.length) return;
            return t.map(t => 
            // visible for testing
            function(t) {
                return {
                    field: hn(t.field),
                    direction: cn(t.dir)
                };
            }(t));
        }(n.orderBy);
        i && (e.structuredQuery.orderBy = i);
        const o = function(t, n) {
            return t.wt || X(n) ? n : {
                value: n
            };
        }(t, n.limit);
        return null !== o && (e.structuredQuery.limit = o), n.startAt && (e.structuredQuery.startAt = un(n.startAt)), 
        n.endAt && (e.structuredQuery.endAt = un(n.endAt)), e;
    }

    function un(t) {
        return {
            before: t.before,
            values: t.position
        };
    }

    // visible for testing
    function cn(t) {
        return kt[t];
    }

    // visible for testing
    function an(t) {
        return Qt[t];
    }

    function hn(t) {
        return {
            fieldPath: t.G()
        };
    }

    function ln(t) {
        const n = [];
        return t.fields.forEach(t => n.push(t.G())), {
            fieldPaths: n
        };
    }

    function fn(t) {
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
    /** Represents a transform within a TransformMutation. */ class dn {
        constructor() {
            // Make sure that the structural type of `TransformOperation` is unique.
            // See https://github.com/microsoft/TypeScript/issues/5451
            this.At = void 0;
        }
    }

    /** Transforms a value into a server-generated timestamp. */ class _n extends dn {}

    /** Transforms an array value via a union operation. */ class wn extends dn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /** Transforms an array value via a remove operation. */ class mn extends dn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /**
     * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
     * transforms. Converts all field values to integers or doubles, but unlike the
     * backend does not cap integer values at 2^63. Instead, JavaScript number
     * arithmetic is used and precision loss can occur for values greater than 2^53.
     */ class pn extends dn {
        constructor(t, n) {
            super(), this.serializer = t, this.yt = n;
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
     * Provides a set of fields that can be used to partially patch a document.
     * FieldMask is used in conjunction with ObjectValue.
     * Examples:
     *   foo - Overwrites foo entirely with the provided value. If foo is not
     *         present in the companion ObjectValue, the field is deleted.
     *   foo.bar - Overwrites only the field bar of the object foo.
     *             If foo is not an object, foo is replaced with an object
     *             containing foo
     */ class yn {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(z.q);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    Tt(t) {
            for (const n of this.fields) if (n.j(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return O(this.fields, t.fields, (t, n) => t.isEqual(n));
        }
    }

    /** A field path and the TransformOperation to perform upon it. */ class En {
        constructor(t, n) {
            this.field = t, this.transform = n;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class In {
        constructor(t, n) {
            this.updateTime = t, this.exists = n;
        }
        /** Creates a new empty Precondition. */    static Pt() {
            return new In;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new In(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new In(t);
        }
        /** Returns whether this Precondition is empty. */    get Et() {
            return void 0 === this.updateTime && void 0 === this.exists;
        }
        isEqual(t) {
            return this.exists === t.exists && (this.updateTime ? !!t.updateTime && this.updateTime.isEqual(t.updateTime) : !t.updateTime);
        }
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
     */ class An {}

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class Tn extends An {
        constructor(t, n, e) {
            super(), this.key = t, this.value = n, this.It = e, this.type = 0 /* Set */;
        }
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
     */ class Pn extends An {
        constructor(t, n, e, r) {
            super(), this.key = t, this.data = n, this.pt = e, this.It = r, this.type = 1 /* Patch */;
        }
    }

    /**
     * A mutation that modifies specific fields of the document with transform
     * operations. Currently the only supported transform is a server timestamp, but
     * IP Address, increment(n), etc. could be supported in the future.
     *
     * It is somewhat similar to a PatchMutation in that it patches specific fields
     * and has no effect when applied to a null or NoDocument (see comment on
     * Mutation for rationale).
     */ class Rn extends An {
        constructor(t, n) {
            super(), this.key = t, this.fieldTransforms = n, this.type = 2 /* Transform */ , 
            // NOTE: We set a precondition of exists: true as a safety-check, since we
            // always combine TransformMutations with a SetMutation or PatchMutation which
            // (if successful) should end up with an existing document.
            this.It = In.exists(!0);
        }
    }

    /** A mutation that deletes the document at the given key. */ class Vn extends An {
        constructor(t, n) {
            super(), this.key = t, this.It = n, this.type = 3 /* Delete */;
        }
    }

    /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ class gn extends An {
        constructor(t, n) {
            super(), this.key = t, this.It = n, this.type = 4 /* Verify */;
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
     */ class bn {
        constructor(t) {
            this.proto = t;
        }
        static empty() {
            return new bn({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path the path to search
         * @return The value at the path or if there it doesn't exist.
         */    field(t) {
            if (t.M()) return this.proto;
            {
                let n = this.proto;
                for (let e = 0; e < t.length - 1; ++e) {
                    if (!n.mapValue.fields) return null;
                    if (n = n.mapValue.fields[t.get(e)], !mt(n)) return null;
                }
                return n = (n.mapValue.fields || {})[t.U()], n || null;
            }
        }
        isEqual(t) {
            return it(this.proto, t.proto);
        }
    }

    /**
     * An ObjectValueBuilder provides APIs to set and delete fields from an
     * ObjectValue.
     */ class vn {
        /**
         * @param baseObject The object to mutate.
         */
        constructor(t = bn.empty()) {
            this.Rt = t, 
            /** A map that contains the accumulated changes in this builder. */
            this.Vt = new Map;
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path The field path to set.
         * @param value The value to set.
         * @return The current Builder instance.
         */    set(t, n) {
            return this.gt(t, n), this;
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path The field path to remove.
         * @return The current Builder instance.
         */    delete(t) {
            return this.gt(t, null), this;
        }
        /**
         * Adds `value` to the overlay map at `path`. Creates nested map entries if
         * needed.
         */    gt(t, n) {
            let e = this.Vt;
            for (let n = 0; n < t.length - 1; ++n) {
                const r = t.get(n);
                let s = e.get(r);
                s instanceof Map ? 
                // Re-use a previously created map
                e = s : s && 10 /* ObjectValue */ === st(s) ? (
                // Convert the existing Protobuf MapValue into a map
                s = new Map(Object.entries(s.mapValue.fields || {})), e.set(r, s), e = s) : (
                // Create an empty map to represent the current nesting level
                s = new Map, e.set(r, s), e = s);
            }
            e.set(t.U(), n);
        }
        /** Returns an ObjectValue with all mutations applied. */    bt() {
            const t = this.vt(z.Y(), this.Vt);
            return null != t ? new bn(t) : this.Rt;
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
         */    vt(t, n) {
            let e = !1;
            const r = this.Rt.field(t), s = mt(r) ? // If there is already data at the current path, base our
            Object.assign({}, r.mapValue.fields) : {};
            return n.forEach((n, r) => {
                if (n instanceof Map) {
                    const i = this.vt(t.child(r), n);
                    null != i && (s[r] = i, e = !0);
                } else null !== n ? (s[r] = n, e = !0) : s.hasOwnProperty(r) && (delete s[r], e = !0);
            }), e ? {
                mapValue: {
                    fields: s
                }
            } : null;
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
     * The result of a lookup for a given path may be an existing document or a
     * marker that this document does not exist at a given version.
     */ class Nn {
        constructor(t, n) {
            this.key = t, this.version = n;
        }
    }

    /**
     * Represents a document in Firestore with a key, version, data and whether the
     * data has local mutations applied to it.
     */ class $n extends Nn {
        constructor(t, n, e, r) {
            super(t, n), this.Nt = e, this.$t = !!r.$t, this.hasCommittedMutations = !!r.hasCommittedMutations;
        }
        field(t) {
            return this.Nt.field(t);
        }
        data() {
            return this.Nt;
        }
        Ft() {
            return this.Nt.proto;
        }
        isEqual(t) {
            return t instanceof $n && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.$t === t.$t && this.hasCommittedMutations === t.hasCommittedMutations && this.Nt.isEqual(t.Nt);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${this.Nt.toString()}, {hasLocalMutations: ${this.$t}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`;
        }
        get hasPendingWrites() {
            return this.$t || this.hasCommittedMutations;
        }
    }

    /**
     * A class representing a deleted document.
     * Version is set to 0 if we don't point to any specific time, otherwise it
     * denotes time we know it didn't exist at.
     */ class Fn extends Nn {
        constructor(t, n, e) {
            super(t, n), this.hasCommittedMutations = !(!e || !e.hasCommittedMutations);
        }
        toString() {
            return `NoDocument(${this.key}, ${this.version})`;
        }
        get hasPendingWrites() {
            return this.hasCommittedMutations;
        }
        isEqual(t) {
            return t instanceof Fn && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
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
     */ class Dn {
        constructor() {
            this.promise = new Promise((t, n) => {
                this.resolve = t, this.reject = n;
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
    class qn {
        constructor(
        /**
         * The AsyncQueue to run backoff operations on.
         */
        t, 
        /**
         * The ID to use when scheduling backoff operations on the AsyncQueue.
         */
        n, 
        /**
         * The initial delay (used as the base delay on the first retry attempt).
         * Note that jitter will still be applied, so the actual delay could be as
         * little as 0.5*initialDelayMs.
         */
        e = 1e3
        /**
         * The multiplier to use to determine the extended base delay after each
         * attempt.
         */ , r = 1.5
        /**
         * The maximum base delay after which no further backoff is performed.
         * Note that jitter will still be applied, so the actual delay could be as
         * much as 1.5*maxDelayMs.
         */ , s = 6e4) {
            this.Dt = t, this.qt = n, this.xt = e, this.St = r, this.Ot = s, this.Ct = 0, this.Lt = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.Ut = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.Ct = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    Mt() {
            this.Ct = this.Ot;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    jt(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const n = Math.floor(this.Ct + this.Bt()), e = Math.max(0, Date.now() - this.Ut), r = Math.max(0, n - e);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    r > 0 && b("ExponentialBackoff", `Backing off for ${r} ms (base delay: ${this.Ct} ms, delay with jitter: ${n} ms, last attempt: ${e} ms ago)`), 
            this.Lt = this.Dt.kt(this.qt, r, () => (this.Ut = Date.now(), t())), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.Ct *= this.St, this.Ct < this.xt && (this.Ct = this.xt), this.Ct > this.Ot && (this.Ct = this.Ot);
        }
        Qt() {
            null !== this.Lt && (this.Lt.Gt(), this.Lt = null);
        }
        cancel() {
            null !== this.Lt && (this.Lt.cancel(), this.Lt = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    Bt() {
            return (Math.random() - .5) * this.Ct;
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
    /** Verifies whether `e` is an IndexedDbTransactionError. */
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
    /** The Platform's 'document' implementation or null if not available. */
    function xn() {
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
    class Sn {
        constructor(t, n, e, r, s) {
            this.Wt = t, this.qt = n, this.Yt = e, this.op = r, this.zt = s, this.Ht = new Dn, 
            this.then = this.Ht.promise.then.bind(this.Ht.promise), 
            // It's normal for the deferred promise to be canceled (due to cancellation)
            // and so we attach a dummy catch callback to avoid
            // 'UnhandledPromiseRejectionWarning' log spam.
            this.Ht.promise.catch(t => {});
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
         */    static Kt(t, n, e, r, s) {
            const i = Date.now() + e, o = new Sn(t, n, i, r, s);
            return o.start(e), o;
        }
        /**
         * Starts the timer. This is called immediately after construction by
         * createAndSchedule().
         */    start(t) {
            this.Jt = setTimeout(() => this.Zt(), t);
        }
        /**
         * Queues the operation to run immediately (if it hasn't already been run or
         * canceled).
         */    Gt() {
            return this.Zt();
        }
        /**
         * Cancels the operation if it hasn't already been executed or canceled. The
         * promise will be rejected.
         *
         * As long as the operation has not yet been run, calling cancel() provides a
         * guarantee that the operation will not be run.
         */    cancel(t) {
            null !== this.Jt && (this.clearTimeout(), this.Ht.reject(new R(c, "Operation cancelled" + (t ? ": " + t : ""))));
        }
        Zt() {
            this.Wt.Xt(() => null !== this.Jt ? (this.clearTimeout(), this.op().then(t => this.Ht.resolve(t))) : Promise.resolve());
        }
        clearTimeout() {
            null !== this.Jt && (this.zt(this), clearTimeout(this.Jt), this.Jt = null);
        }
    }

    class On {
        constructor() {
            // The last promise in the queue.
            this.tn = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.nn = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.en = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.rn = [], 
            // visible for testing
            this.sn = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.on = !1, 
            // List of TimerIds to fast-forward delays for.
            this.un = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.cn = new qn(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.an = () => {
                const t = xn();
                t && b("AsyncQueue", "Visibility state changed to  ", t.visibilityState), this.cn.Qt();
            };
            const t = xn();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.an);
        }
        // Is this AsyncQueue being shut down? If true, this instance will not enqueue
        // any new operations, Promises from enqueue requests will not resolve.
        get hn() {
            return this.en;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    Xt(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        /**
         * Regardless if the queue has initialized shutdown, adds a new operation to the
         * queue without waiting for it to complete (i.e. we ignore the Promise result).
         */    ln(t) {
            this.fn(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.dn(t);
        }
        /**
         * Initialize the shutdown of this queue. Once this method is called, the
         * only possible way to request running an operation is through
         * `enqueueEvenWhileRestricted()`.
         */    _n() {
            if (!this.en) {
                this.en = !0;
                const t = xn();
                t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.an);
            }
        }
        /**
         * Adds a new operation to the queue. Returns a promise that will be resolved
         * when the promise returned by the new operation is (with its value).
         */    enqueue(t) {
            return this.fn(), this.en ? new Promise(t => {}) : this.dn(t);
        }
        /**
         * Enqueue a retryable operation.
         *
         * A retryable operation is rescheduled with backoff if it fails with a
         * IndexedDbTransactionError (the error type used by SimpleDb). All
         * retryable operations are executed in order and only run if all prior
         * operations were retried successfully.
         */    wn(t) {
            this.nn.push(t), this.Xt(() => this.mn());
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async mn() {
            if (0 !== this.nn.length) {
                try {
                    await this.nn[0](), this.nn.shift(), this.cn.reset();
                } catch (t) {
                    if (!function(t) {
                        // Use name equality, as instanceof checks on errors don't work with errors
                        // that wrap other errors.
                        return "IndexedDbTransactionError" === t.name;
                    }(t)) throw t;
     // Failure will be handled by AsyncQueue
                                    b("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.nn.length > 0 && 
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
                this.cn.jt(() => this.mn());
            }
        }
        dn(t) {
            const n = this.tn.then(() => (this.on = !0, t().catch(t => {
                this.sn = t, this.on = !1;
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw v("INTERNAL UNHANDLED ERROR: ", 
                /**
     * Chrome includes Error.message in Error.stack. Other browsers do not.
     * This returns expected output of message + stack when available.
     * @param error Error or FirestoreError
     */
                function(t) {
                    let n = t.message || "";
                    t.stack && (n = t.stack.includes(t.message) ? t.stack : t.message + "\n" + t.stack);
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
     */
                /**
     * Datastore and its related methods are a wrapper around the external Google
     * Cloud Datastore grpc API, which provides an interface that is more convenient
     * for the rest of the client SDK architecture to consume.
     */ (t)), t;
            }).then(t => (this.on = !1, t))));
            return this.tn = n, n;
        }
        /**
         * Schedules an operation to be queued on the AsyncQueue once the specified
         * `delayMs` has elapsed. The returned DelayedOperation can be used to cancel
         * or fast-forward the operation prior to its running.
         */    kt(t, n, e) {
            this.fn(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.un.indexOf(t) > -1 && (n = 0);
            const r = Sn.Kt(this, t, n, e, t => this.pn(t));
            return this.rn.push(r), r;
        }
        fn() {
            this.sn && $();
        }
        /**
         * Verifies there's an operation currently in-progress on the AsyncQueue.
         * Unfortunately we can't verify that the running code is in the promise chain
         * of that operation, so this isn't a foolproof check, but it should be enough
         * to catch some bugs.
         */    yn() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async En() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.tn, await t;
            } while (t !== this.tn);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    In(t) {
            for (const n of this.rn) if (n.qt === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId Delayed operations up to and including this TimerId will
         *  be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    An(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.En().then(() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.rn.sort((t, n) => t.Yt - n.Yt);
                for (const n of this.rn) if (n.Gt(), "all" /* All */ !== t && n.qt === t) break;
                return this.En();
            });
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    Tn(t) {
            this.un.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    pn(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const n = this.rn.indexOf(t);
            this.rn.splice(n, 1);
        }
    }

    /**
     * An implementation of Datastore that exposes additional state for internal
     * consumption.
     */
    class Cn extends class {} {
        constructor(t, n, e) {
            super(), this.credentials = t, this.Pn = n, this.serializer = e, this.Rn = !1;
        }
        Vn() {
            if (this.Rn) throw new R(p, "The client has already been terminated.");
        }
        /** Gets an auth token and invokes the provided RPC. */    gn(t, n, e) {
            return this.Vn(), this.credentials.getToken().then(r => this.Pn.gn(t, n, e, r)).catch(t => {
                throw t.code === w && this.credentials.R(), t;
            });
        }
        /** Gets an auth token and invokes the provided RPC with streamed results. */    bn(t, n, e) {
            return this.Vn(), this.credentials.getToken().then(r => this.Pn.bn(t, n, e, r)).catch(t => {
                throw t.code === w && this.credentials.R(), t;
            });
        }
        terminate() {
            this.Rn = !1;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    async function Ln(t, n) {
        const e = D(t), r = nn(e.serializer) + "/documents", s = {
            writes: n.map(t => sn(e.serializer, t))
        };
        await e.gn("Commit", r, s);
    }

    async function Un(t, n) {
        const e = D(t), r = nn(e.serializer) + "/documents", s = {
            documents: n.map(t => Zt(e.serializer, t))
        }, i = await e.bn("BatchGetDocuments", r, s), o = new Map;
        i.forEach(t => {
            const n = rn(e.serializer, t);
            o.set(n.key.toString(), n);
        });
        const u = [];
        return n.forEach(t => {
            const n = o.get(t.toString());
            F(!!n), u.push(n);
        }), u;
    }

    async function Mn(t, n) {
        const e = D(t), r = on(e.serializer, Vt(n));
        return (await e.bn("RunQuery", r.parent, {
            structuredQuery: r.structuredQuery
        })).filter(t => !!t.document).map(t => function(t, n, e) {
            const r = Xt(t, n.name), s = Kt(n.updateTime), i = new bn({
                mapValue: {
                    fields: n.fields
                }
            });
            return new $n(r, s, i, {
                hasCommittedMutations: !!e
            });
        }(e.serializer, t.document, void 0));
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
     */ const jn = {
        BatchGetDocuments: "batchGet",
        Commit: "commit",
        RunQuery: "runQuery"
    };

    /**
     * Maps RPC names to the corresponding REST endpoint name.
     *
     * We use array notation to avoid mangling.
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
    /**
     * A Rest-based connection that relies on the native HTTP stack
     * (e.g. `fetch` or a polyfill).
     */
    class Bn extends 
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class {
        constructor(t) {
            this.vn = t, this.s = t.s;
            const n = t.ssl ? "https" : "http";
            this.Nn = n + "://" + t.host, this.$n = "projects/" + this.s.projectId + "/databases/" + this.s.database + "/documents";
        }
        gn(t, n, e, r) {
            const s = this.Fn(t, n);
            b("RestConnection", "Sending: ", s, e);
            const i = {};
            return this.Dn(i, r), this.qn(t, s, i, e).then(t => (b("RestConnection", "Received: ", t), 
            t), n => {
                throw function(t, ...n) {
                    if (V.logLevel <= LogLevel.WARN) {
                        const e = n.map(N);
                        V.warn("Firestore (7.19.1): " + t, ...e);
                    }
                }("RestConnection", t + " failed with error: ", n, "url: ", s, "request:", e), n;
            });
        }
        bn(t, n, e, r) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.gn(t, n, e, r);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    Dn(t, n) {
            if (t["X-Goog-Api-Client"] = "gl-js/ fire/7.19.1", 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid	triggering preflight requests.
            t["Content-Type"] = "text/plain", n) for (const e in n.m) n.m.hasOwnProperty(e) && (t[e] = n.m[e]);
        }
        Fn(t, n) {
            const e = jn[t];
            return `${this.Nn}/v1/${n}:${e}`;
        }
    } {
        /**
         * @param databaseInfo The connection info.
         * @param fetchImpl `fetch` or a Polyfill that implements the fetch API.
         */
        constructor(t, n) {
            super(t), this.xn = n;
        }
        Sn(t, n) {
            throw new Error("Not supported by FetchConnection");
        }
        async qn(t, n, e, r) {
            const s = JSON.stringify(r);
            let i;
            try {
                i = await this.xn(n, {
                    method: "POST",
                    headers: e,
                    body: s
                });
            } catch (t) {
                throw new R(Bt(t.status), "Request failed with error: " + t.statusText);
            }
            if (!i.ok) throw new R(Bt(i.status), "Request failed with error: " + i.statusText);
            return i.json();
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
    /** Initializes the HTTP connection for the REST API. */
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
    function kn(t) {
        return new Gt(t, /* useProto3Json= */ !0);
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
     */ const Qn = new Map;

    // settings() defaults:
    /**
     * Returns an initialized and started Datastore for the given Firestore
     * instance. Callers must invoke removeDatastore() when the Firestore
     * instance is terminated.
     */
    function Gn(t) {
        var n, e;
        if (t.On) throw new R(p, "The client has already been terminated.");
        if (!Qn.has(t)) {
            b("ComponentProvider", "Initializing Datastore");
            const r = t.Cn(), s = new C(t.Ln, t.Un, null !== (n = r.host) && void 0 !== n ? n : "firestore.googleapis.com", null === (e = r.ssl) || void 0 === e || e, 
            /* forceLongPolling= */ !1), i = function(t) {
                return new Bn(t, fetch.bind(null));
            }(s), o = kn(s.s), u = function(t, n, e) {
                return new Cn(t, n, e);
            }(t.Mn, i, o);
            Qn.set(t, u);
        }
        return Qn.get(t);
    }

    /**
     * Removes all components associated with the provided instance. Must be called
     * when the Firestore instance is terminated.
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
    /**
     * The root reference to the Firestore Lite database.
     */
    class Wn {
        constructor(t, n) {
            this.app = t, this.Un = "(lite)", this.jn = !1, 
            // TODO(firestoreexp): `deleteApp()` should call the delete method above,
            // but it still calls INTERNAL.delete().
            this.INTERNAL = {
                delete: () => this._delete()
            }, this.Ln = Wn.Bn(t), this.Mn = new j(n);
        }
        get kn() {
            return this.jn;
        }
        get On() {
            return void 0 !== this.Qn;
        }
        Gn(t) {
            if (this.jn) throw new R(p, "Firestore has already been started and its settings can no longer be changed. initializeFirestore() cannot be called after calling getFirestore().");
            this.Wn = t;
        }
        Cn() {
            return this.Wn || (this.Wn = {}), this.jn = !0, this.Wn;
        }
        static Bn(t) {
            if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new R(h, '"projectId" not provided in firebase.initializeApp.');
            return new L(t.options.projectId);
        }
        _delete() {
            return this.Qn || (this.Qn = this.Yn()), this.Qn;
        }
        /**
         * Terminates all components used by this client. Subclasses can override
         * this method to clean up their own dependencies, but must also call this
         * method.
         *
         * Only ever called once.
         */    Yn() {
            return function(t) {
                const n = Qn.get(t);
                n && (b("ComponentProvider", "Removing Datastore"), Qn.delete(t), n.terminate());
            }(this), Promise.resolve();
        }
    }

    function Yn(n, e) {
        const r = app._getProvider(n, "firestore/lite").getImmediate();
        return r.Gn(e), r;
    }

    function zn(n) {
        return app._getProvider(n, "firestore/lite").getImmediate();
    }

    function Hn(t) {
        app._removeServiceInstance(t.app, "firestore/lite");
        return B(t, Wn)._delete();
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
     */
    function Kn(t, n, e) {
        if (n.length !== e) throw new R(h, `Function ${t}() requires ` + ie(e, "argument") + ", but was called with " + ie(n.length, "argument") + ".");
    }

    /**
     * Validates the invocation of functionName has at least the provided number of
     * arguments (but can have many more).
     *
     * Forward the magic "arguments" variable as second parameter on which the
     * parameter validation is performed:
     * validateAtLeastNumberOfArgs('myFunction', arguments, 2);
     */ function Jn(t, n, e) {
        if (n.length < e) throw new R(h, `Function ${t}() requires at least ` + ie(e, "argument") + ", but was called with " + ie(n.length, "argument") + ".");
    }

    /**
     * Validates the provided argument is an array and has as least the expected
     * number of elements.
     */
    /**
     * Validates the provided positional argument has the native JavaScript type
     * using typeof checks.
     */
    function Zn(t, n, e, r) {
        !
        /** Helper to validate the type of a provided input. */
        function(t, n, e, r) {
            let s = !1;
            s = "object" === n ? ne(r) : "non-empty string" === n ? "string" == typeof r && "" !== r : typeof r === n;
            if (!s) {
                const s = ee(r);
                throw new R(h, `Function ${t}() requires its ${e} to be of type ${n}, but it was: ${s}`);
            }
        }
        /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */ (t, n, se(e) + " argument", r);
    }

    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */ function Xn(t) {
        if (!H.et(t)) throw new R(h, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function te(t) {
        if (H.et(t)) throw new R(h, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    function ne(t) {
        return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
    }

    /** Returns a string describing the type / value of the provided input. */ function ee(t) {
        if (void 0 === t) return "undefined";
        if (null === t) return "null";
        if ("string" == typeof t) return t.length > 20 && (t = t.substring(0, 20) + "..."), 
        JSON.stringify(t);
        if ("number" == typeof t || "boolean" == typeof t) return "" + t;
        if ("object" == typeof t) {
            if (t instanceof Array) return "an array";
            {
                const n = 
                /** Hacky method to try to get the constructor name for an object. */
                function(t) {
                    if (t.constructor) {
                        const n = /function\s+([^\s(]+)\s*\(/.exec(t.constructor.toString());
                        if (n && n.length > 1) return n[1];
                    }
                    return null;
                }
                /**
     * Helper method to throw an error that the provided argument did not pass
     * an instanceof check.
     */ (t);
                return n ? `a custom ${n} object` : "an object";
            }
        }
        return "function" == typeof t ? "a function" : $();
    }

    function re(t, n, e) {
        if (e <= 0) throw new R(h, `Function ${t}() requires its ${se(n)} argument to be a positive number, but it was: ${e}.`);
    }

    /** Converts a number to its english word representation */ function se(t) {
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
     */ function ie(t, n) {
        return `${t} ${n}` + (1 === t ? "" : "s");
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
     */ class oe {
        constructor(t) {
            !function(t, n, e, r) {
                if (!(n instanceof Array) || n.length < r) throw new R(h, `Function ${t}() requires its ${e} argument to be an array with at least ` + ie(r, "element") + ".");
            }("FieldPath", t, "fieldNames", 1);
            for (let n = 0; n < t.length; ++n) if (Zn("FieldPath", "string", n, t[n]), 0 === t[n].length) throw new R(h, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this.zn = new z(t);
        }
    }

    /**
     * A FieldPath refers to a field in a document. The path may consist of a single
     * field name (referring to a top-level field in the document), or a list of
     * field names (referring to a nested field in the document).
     */ class ue extends oe {
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
            return new ue(z.J().G());
        }
        isEqual(t) {
            if (!(t instanceof ue)) throw function(t, n, e, r) {
                const s = ee(r);
                return new R(h, `Function ${t}() requires its ${se(e)} argument to be a ${n}, but it was: ${s}`);
            }("isEqual", "FieldPath", 1, t);
            return this.zn.isEqual(t.zn);
        }
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const ce = new RegExp("[~\\*/\\[\\]]");

    /**
     * Parses a field path string into a FieldPath, treating dots as separators.
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
    /**
     * An opaque base class for FieldValue sentinel objects in our public API that
     * is shared between the full, lite and legacy SDK.
     */
    class ae {
        constructor() {
            /** A pointer to the implementing class. */
            this.Hn = this;
        }
    }

    class he extends ae {
        constructor(t) {
            super(), this.Kn = t;
        }
        Jn(t) {
            if (2 /* MergeSet */ !== t.Zn) throw 1 /* Update */ === t.Zn ? t.Xn(this.Kn + "() can only appear at the top level of your update data") : t.Xn(this.Kn + "() cannot be used with set() unless you pass {merge:true}");
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.pt.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof he;
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
     */ function le(t, n, e) {
        return new Pe({
            Zn: 3 /* Argument */ ,
            te: n.settings.te,
            methodName: t.Kn,
            ne: e
        }, n.s, n.serializer, n.ignoreUndefinedProperties);
    }

    class fe extends ae {
        constructor(t) {
            super(), this.Kn = t;
        }
        Jn(t) {
            return new En(t.path, new _n);
        }
        isEqual(t) {
            return t instanceof fe;
        }
    }

    class de extends ae {
        constructor(t, n) {
            super(), this.Kn = t, this.ee = n;
        }
        Jn(t) {
            const n = le(this, t, 
            /*array=*/ !0), e = this.ee.map(t => Ne(t, n)), r = new wn(e);
            return new En(t.path, r);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class _e extends ae {
        constructor(t, n) {
            super(), this.Kn = t, this.ee = n;
        }
        Jn(t) {
            const n = le(this, t, 
            /*array=*/ !0), e = this.ee.map(t => Ne(t, n)), r = new mn(e);
            return new En(t.path, r);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class we extends ae {
        constructor(t, n) {
            super(), this.Kn = t, this.re = n;
        }
        Jn(t) {
            const n = new pn(t.serializer, Wt(t.serializer, this.re));
            return new En(t.path, n);
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
     */ class me {
        constructor(t, n) {
            if (Kn("GeoPoint", arguments, 2), Zn("GeoPoint", "number", 1, t), Zn("GeoPoint", "number", 2, n), 
            !isFinite(t) || t < -90 || t > 90) throw new R(h, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(n) || n < -180 || n > 180) throw new R(h, "Longitude must be a number between -180 and 180, but was: " + n);
            this.se = t, this.ie = n;
        }
        /**
         * Returns the latitude of this geo point, a number between -90 and 90.
         */    get latitude() {
            return this.se;
        }
        /**
         * Returns the longitude of this geo point, a number between -180 and 180.
         */    get longitude() {
            return this.ie;
        }
        isEqual(t) {
            return this.se === t.se && this.ie === t.ie;
        }
        toJSON() {
            return {
                latitude: this.se,
                longitude: this.ie
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    v(t) {
            return S(this.se, t.se) || S(this.ie, t.ie);
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
    /** Immutable class holding binary data in the Lite and modular SDK. */ class pe {
        constructor(t) {
            this.oe = t;
        }
        static fromBase64String(t) {
            try {
                return new pe(Z.fromBase64String(t));
            } catch (t) {
                throw new R(h, "Failed to construct Bytes from Base64 string: " + t);
            }
        }
        static fromUint8Array(t) {
            return new pe(Z.fromUint8Array(t));
        }
        toBase64() {
            return this.oe.toBase64();
        }
        toUint8Array() {
            return this.oe.toUint8Array();
        }
        toString() {
            return "Bytes(base64: " + this.toBase64() + ")";
        }
        isEqual(t) {
            return this.oe.isEqual(t.oe);
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
     */ const ye = /^__.*__$/;

    /**
     * A reference to a document in a Firebase project.
     *
     * This class serves as a common base class for the public DocumentReferences
     * exposed in the lite, full and legacy SDK.
     */ class Ee {
        constructor(t, n, e) {
            this.Ln = t, this.ue = n, this.ce = e;
        }
    }

    /** The result of parsing document data (e.g. for a setData call). */ class Ie {
        constructor(t, n, e) {
            this.data = t, this.pt = n, this.fieldTransforms = e;
        }
        ae(t, n) {
            const e = [];
            return null !== this.pt ? e.push(new Pn(t, this.data, this.pt, n)) : e.push(new Tn(t, this.data, n)), 
            this.fieldTransforms.length > 0 && e.push(new Rn(t, this.fieldTransforms)), e;
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class Ae {
        constructor(t, n, e) {
            this.data = t, this.pt = n, this.fieldTransforms = e;
        }
        ae(t, n) {
            const e = [ new Pn(t, this.data, this.pt, n) ];
            return this.fieldTransforms.length > 0 && e.push(new Rn(t, this.fieldTransforms)), 
            e;
        }
    }

    function Te(t) {
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
            throw $();
        }
    }

    /** A "context" object passed around while parsing user data. */ class Pe {
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
        constructor(t, n, e, r, s, i) {
            this.settings = t, this.s = n, this.serializer = e, this.ignoreUndefinedProperties = r, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === s && this.he(), this.fieldTransforms = s || [], this.pt = i || [];
        }
        get path() {
            return this.settings.path;
        }
        get Zn() {
            return this.settings.Zn;
        }
        /** Returns a new context with the specified settings overwritten. */    le(t) {
            return new Pe(Object.assign(Object.assign({}, this.settings), t), this.s, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.pt);
        }
        fe(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), r = this.le({
                path: e,
                ne: !1
            });
            return r.de(t), r;
        }
        _e(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), r = this.le({
                path: e,
                ne: !1
            });
            return r.he(), r;
        }
        we(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.le({
                path: void 0,
                ne: !0
            });
        }
        Xn(t) {
            return Se(t, this.settings.methodName, this.settings.me || !1, this.path, this.settings.te);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.pt.find(n => t.j(n)) || void 0 !== this.fieldTransforms.find(n => t.j(n.field));
        }
        he() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.de(this.path.get(t));
        }
        de(t) {
            if (0 === t.length) throw this.Xn("Document fields must not be empty");
            if (Te(this.Zn) && ye.test(t)) throw this.Xn('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class Re {
        constructor(t, n, e) {
            this.s = t, this.ignoreUndefinedProperties = n, this.serializer = e || kn(t);
        }
        /** Creates a new top-level parse context. */    pe(t, n, e, r = !1) {
            return new Pe({
                Zn: t,
                methodName: n,
                te: e,
                path: z.Y(),
                ne: !1,
                me: r
            }, this.s, this.serializer, this.ignoreUndefinedProperties);
        }
    }

    /** Parse document data from a set() call. */ function Ve(t, n, e, r, s, i = {}) {
        const o = t.pe(i.merge || i.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , n, e, s);
        De("Data must be an object, but it was:", o, r);
        const u = $e(r, o);
        let c, a;
        if (i.merge) c = new yn(o.pt), a = o.fieldTransforms; else if (i.mergeFields) {
            const t = [];
            for (const r of i.mergeFields) {
                let s;
                if (r instanceof oe) s = r.zn; else {
                    if ("string" != typeof r) throw $();
                    s = xe(n, r, e);
                }
                if (!o.contains(s)) throw new R(h, `Field '${s}' is specified in your field mask but missing from your input data.`);
                Oe(t, s) || t.push(s);
            }
            c = new yn(t), a = o.fieldTransforms.filter(t => c.Tt(t.field));
        } else c = null, a = o.fieldTransforms;
        return new Ie(new bn(u), c, a);
    }

    /** Parse update data from an update() call. */ function ge(t, n, e, r) {
        const s = t.pe(1 /* Update */ , n, e);
        De("Data must be an object, but it was:", s, r);
        const i = [], o = new vn;
        J(r, (t, r) => {
            const u = xe(n, t, e), c = s._e(u);
            if (r instanceof ae && r.Hn instanceof he) 
            // Add it to the field mask, but don't add anything to updateData.
            i.push(u); else {
                const t = Ne(r, c);
                null != t && (i.push(u), o.set(u, t));
            }
        });
        const u = new yn(i);
        return new Ae(o.bt(), u, s.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function be(t, n, e, r, s, i) {
        const o = t.pe(1 /* Update */ , n, e), u = [ qe(n, r, e) ], c = [ s ];
        if (i.length % 2 != 0) throw new R(h, `Function ${n}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < i.length; t += 2) u.push(qe(n, i[t])), c.push(i[t + 1]);
        const a = [], l = new vn;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = u.length - 1; t >= 0; --t) if (!Oe(a, u[t])) {
            const n = u[t], e = c[t], r = o._e(n);
            if (e instanceof ae && e.Hn instanceof he) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(n); else {
                const t = Ne(e, r);
                null != t && (a.push(n), l.set(n, t));
            }
        }
        const f = new yn(a);
        return new Ae(l.bt(), f, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function ve(t, n, e, r = !1) {
        return Ne(e, t.pe(r ? 4 /* ArrayArgument */ : 3 /* Argument */ , n));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input Data to be parsed.
     * @param context A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @return The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function Ne(t, n) {
        if (Fe(t)) return De("Unsupported field value:", n, t), $e(t, n);
        if (t instanceof ae) 
        // FieldValues usually parse into transforms (except FieldValue.delete())
        // in which case we do not want to include this field in our parsed data
        // (as doing so will overwrite the field directly prior to the transform
        // trying to transform it). So we don't add this location to
        // context.fieldMask and we return null as our parsing result.
        /**
     * "Parses" the provided FieldValueImpl, adding any necessary transforms to
     * context.fieldTransforms.
     */
        return function(t, n) {
            // Sentinels are only supported with writes, and not within arrays.
            if (!Te(n.Zn)) throw n.Xn(t.Kn + "() can only be used with update() and set()");
            if (!n.path) throw n.Xn(t.Kn + "() is not currently supported inside arrays");
            const e = t.Jn(n);
            e && n.fieldTransforms.push(e);
        }
        /**
     * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
     *
     * @return The parsed value
     */ (t, n), null;
        if (
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        n.path && n.pt.push(n.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (n.settings.ne && 4 /* ArrayArgument */ !== n.Zn) throw n.Xn("Nested arrays are not supported");
            return function(t, n) {
                const e = [];
                let r = 0;
                for (const s of t) {
                    let t = Ne(s, n.we(r));
                    null == t && (
                    // Just include nulls in the array for fields being replaced with a
                    // sentinel.
                    t = {
                        nullValue: "NULL_VALUE"
                    }), e.push(t), r++;
                }
                return {
                    arrayValue: {
                        values: e
                    }
                };
            }(t, n);
        }
        return function(t, n) {
            if (null === t) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return Wt(n.serializer, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const e = k.fromDate(t);
                return {
                    timestampValue: Yt(n.serializer, e)
                };
            }
            if (t instanceof k) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const e = new k(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: Yt(n.serializer, e)
                };
            }
            if (t instanceof me) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof pe) return {
                bytesValue: zt(n.serializer, t.oe)
            };
            if (t instanceof Ee) {
                const e = n.s, r = t.Ln;
                if (!r.isEqual(e)) throw n.Xn(`Document reference is for database ${r.projectId}/${r.database} but should be for database ${e.projectId}/${e.database}`);
                return {
                    referenceValue: Jt(t.Ln || n.s, t.ue.path)
                };
            }
            if (void 0 === t && n.ignoreUndefinedProperties) return null;
            throw n.Xn("Unsupported field value: " + ee(t));
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, n);
    }

    function $e(t, n) {
        const e = {};
        return !function(t) {
            for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n)) return !1;
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
        /** Converts a Base64 encoded string to a binary string. */ (t) ? J(t, (t, r) => {
            const s = Ne(r, n.fe(t));
            null != s && (e[t] = s);
        }) : 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        n.path && n.path.length > 0 && n.pt.push(n.path), {
            mapValue: {
                fields: e
            }
        };
    }

    function Fe(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof k || t instanceof me || t instanceof pe || t instanceof Ee || t instanceof ae);
    }

    function De(t, n, e) {
        if (!Fe(e) || !ne(e)) {
            const r = ee(e);
            throw "an object" === r ? n.Xn(t + " a custom object") : n.Xn(t + " " + r);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function qe(t, n, e) {
        if (n instanceof oe) return n.zn;
        if ("string" == typeof n) return xe(t, n);
        throw Se("Field path arguments must be of type string or FieldPath.", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
    }

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName The publicly visible method name
     * @param path The dot-separated string form of a field path which will be split
     * on dots.
     * @param targetDoc The document against which the field path will be evaluated.
     */ function xe(t, n, e) {
        try {
            return function(t) {
                if (t.search(ce) >= 0) throw new R(h, `Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`);
                try {
                    return new ue(...t.split("."));
                } catch (n) {
                    throw new R(h, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                }
            }(n).zn;
        } catch (n) {
            throw Se((r = n) instanceof Error ? r.message : r.toString(), t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, e);
        }
        /**
     * Extracts the message from a caught exception, which should be an Error object
     * though JS doesn't guarantee that.
     */
        var r;
        /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */}

    function Se(t, n, e, r, s) {
        const i = r && !r.M(), o = void 0 !== s;
        let u = `Function ${n}() called with invalid data`;
        e && (u += " (via `toFirestore()`)"), u += ". ";
        let c = "";
        return (i || o) && (c += " (found", i && (c += " in field " + r), o && (c += " in document " + s), 
        c += ")"), new R(h, u + t + c);
    }

    function Oe(t, n) {
        return t.some(t => t.isEqual(n));
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
     */ class Ce extends oe {
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
            const n = B(t, Ce);
            return this.zn.isEqual(n.zn);
        }
    }

    function Le() {
        return new Ce("__name__");
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
     */ class Ue {
        constructor(t, n, e, r, s) {
            this.s = t, this.timestampsInSnapshots = n, this.ye = e, this.Ee = r, this.Ie = s;
        }
        Ae(t) {
            switch (st(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return ht(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.Te(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.Pe(t);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.Ie(lt(t.bytesValue));

              case 7 /* RefValue */ :
                return this.Re(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.Ve(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.ge(t.arrayValue);

              case 10 /* ObjectValue */ :
                return this.be(t.mapValue);

              default:
                throw $();
            }
        }
        be(t) {
            const n = {};
            return J(t.fields || {}, (t, e) => {
                n[t] = this.Ae(e);
            }), n;
        }
        Ve(t) {
            return new me(ht(t.latitude), ht(t.longitude));
        }
        ge(t) {
            return (t.values || []).map(t => this.Ae(t));
        }
        Pe(t) {
            switch (this.ye) {
              case "previous":
                const n = function t(n) {
                    const e = n.mapValue.fields.__previous_value__;
                    return nt(e) ? t(e) : e;
                }(t);
                return null == n ? null : this.Ae(n);

              case "estimate":
                return this.Te(et(t));

              default:
                return null;
            }
        }
        Te(t) {
            const n = at(t), e = new k(n.seconds, n.nanos);
            return this.timestampsInSnapshots ? e : e.toDate();
        }
        Re(t) {
            const n = W.W(t);
            F(fn(n));
            const e = new L(n.get(1), n.get(3)), r = new H(n.O(5));
            return e.isEqual(this.s) || 
            // TODO(b/64130202): Somehow support foreign references.
            v(`Document ${r} contains a document reference within a different database (${e.projectId}/${e.database}) which is not supported. It will be treated as a reference in the current database (${this.s.projectId}/${this.s.database}) instead.`), 
            this.Ee(r);
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
     */ class Me {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        constructor(t, n, e, r) {
            this.ve = t, this.ue = n, this.Ne = e, this.ce = r;
        }
        get id() {
            return this.ue.path.U();
        }
        get ref() {
            return new Xe(this.ve, this.ce, this.ue.path);
        }
        exists() {
            return null !== this.Ne;
        }
        data() {
            if (this.Ne) {
                if (this.ce) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const t = new je(this.ve, this.ue, this.Ne, 
                    /* converter= */ null);
                    return this.ce.fromFirestore(t);
                }
                return new Ue(this.ve.Ln, 
                /* timestampsInSnapshots= */ !0, 
                /* serverTimestampBehavior=*/ "none", t => new Xe(this.ve, 
                /* converter= */ null, t.path), t => new pe(t)).Ae(this.Ne.Ft());
            }
        }
        get(t) {
            if (this.Ne) {
                const n = this.Ne.data().field(Qe("DocumentSnapshot.get", t));
                if (null !== n) {
                    return new Ue(this.ve.Ln, 
                    /* timestampsInSnapshots= */ !0, 
                    /* serverTimestampBehavior=*/ "none", t => new Xe(this.ve, this.ce, t.path), t => new pe(t)).Ae(n);
                }
            }
        }
    }

    class je extends Me {
        data() {
            return super.data();
        }
    }

    class Be {
        constructor(t, n) {
            this.query = t, this.$e = n;
        }
        get docs() {
            return [ ...this.$e ];
        }
        get size() {
            return this.docs.length;
        }
        get empty() {
            return 0 === this.docs.length;
        }
        forEach(t, n) {
            this.$e.forEach(t, n);
        }
    }

    function ke(t, n) {
        return t instanceof Me && n instanceof Me ? t.ve === n.ve && t.ue.isEqual(n.ue) && (null === t.Ne ? null === n.Ne : t.Ne.isEqual(n.Ne)) && t.ce === n.ce : t instanceof Be && n instanceof Be && (vr(t.query, n.query) && O(t.docs, n.docs, ke));
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function Qe(t, n) {
        if ("string" == typeof n) return xe(t, n);
        return B(n, Ce).zn;
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
     */ class Ge {
        constructor(t) {
            this.Fe = t, 
            // The version of each document that was read during this transaction.
            this.De = new Map, this.mutations = [], this.qe = !1, 
            /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
            this.xe = null, 
            /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
            this.Se = new Set;
        }
        async Oe(t) {
            if (this.Ce(), this.mutations.length > 0) throw new R(h, "Firestore transactions require all reads to be executed before all writes.");
            const n = await Un(this.Fe, t);
            return n.forEach(t => {
                t instanceof Fn || t instanceof $n ? this.Le(t) : $();
            }), n;
        }
        set(t, n) {
            this.write(n.ae(t, this.It(t))), this.Se.add(t.toString());
        }
        update(t, n) {
            try {
                this.write(n.ae(t, this.Ue(t)));
            } catch (t) {
                this.xe = t;
            }
            this.Se.add(t.toString());
        }
        delete(t) {
            this.write([ new Vn(t, this.It(t)) ]), this.Se.add(t.toString());
        }
        async commit() {
            if (this.Ce(), this.xe) throw this.xe;
            const t = this.De;
            // For each mutation, note that the doc was written.
                    this.mutations.forEach(n => {
                t.delete(n.key.toString());
            }), 
            // For each document that was read but not written to, we want to perform
            // a `verify` operation.
            t.forEach((t, n) => {
                const e = H.X(n);
                this.mutations.push(new gn(e, this.It(e)));
            }), await Ln(this.Fe, this.mutations), this.qe = !0;
        }
        Le(t) {
            let n;
            if (t instanceof $n) n = t.version; else {
                if (!(t instanceof Fn)) throw $();
                // For deleted docs, we must use baseVersion 0 when we overwrite them.
                n = Q.min();
            }
            const e = this.De.get(t.key.toString());
            if (e) {
                if (!n.isEqual(e)) 
                // This transaction will fail no matter what.
                throw new R(y, "Document version changed between two reads.");
            } else this.De.set(t.key.toString(), n);
        }
        /**
         * Returns the version of this document when it was read in this transaction,
         * as a precondition, or no precondition if it was not read.
         */    It(t) {
            const n = this.De.get(t.toString());
            return !this.Se.has(t.toString()) && n ? In.updateTime(n) : In.Pt();
        }
        /**
         * Returns the precondition for a document if the operation is an update.
         */    Ue(t) {
            const n = this.De.get(t.toString());
            // The first time a document is written, we want to take into account the
            // read time and existence
                    if (!this.Se.has(t.toString()) && n) {
                if (n.isEqual(Q.min())) 
                // The document doesn't exist, so fail the transaction.
                // This has to be validated locally because you can't send a
                // precondition that a document does not exist without changing the
                // semantics of the backend write to be an insert. This is the reverse
                // of what we want, since we want to assert that the document doesn't
                // exist but then send the update and have it fail. Since we can't
                // express that to the backend, we have to validate locally.
                // Note: this can change once we can send separate verify writes in the
                // transaction.
                throw new R(h, "Can't update a document that doesn't exist.");
                // Document exists, base precondition on document update time.
                            return In.updateTime(n);
            }
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return In.exists(!0);
        }
        write(t) {
            this.Ce(), this.mutations = this.mutations.concat(t);
        }
        Ce() {}
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
    class We {
        constructor(t, n, e, r) {
            this.Wt = t, this.Fe = n, this.updateFunction = e, this.Ht = r, this.Me = 5, this.cn = new qn(this.Wt, "transaction_retry" /* TransactionRetry */);
        }
        /** Runs the transaction and sets the result on deferred. */    run() {
            this.je();
        }
        je() {
            this.cn.jt(async () => {
                const t = new Ge(this.Fe), n = this.Be(t);
                n && n.then(n => {
                    this.Wt.Xt(() => t.commit().then(() => {
                        this.Ht.resolve(n);
                    }).catch(t => {
                        this.ke(t);
                    }));
                }).catch(t => {
                    this.ke(t);
                });
            });
        }
        Be(t) {
            try {
                const n = this.updateFunction(t);
                return !X(n) && n.catch && n.then ? n : (this.Ht.reject(Error("Transaction callback must return a Promise")), 
                null);
            } catch (t) {
                // Do not retry errors thrown by user provided updateFunction.
                return this.Ht.reject(t), null;
            }
        }
        ke(t) {
            this.Me > 0 && this.Qe(t) ? (this.Me -= 1, this.Wt.Xt(() => (this.je(), Promise.resolve()))) : this.Ht.reject(t);
        }
        Qe(t) {
            if ("FirebaseError" === t.name) {
                // In transactions, the backend will fail outdated reads with FAILED_PRECONDITION and
                // non-matching document versions with ABORTED. These errors should be retried.
                const n = t.code;
                return "aborted" === n || "failed-precondition" === n || !
                /**
     * Determines whether an error code represents a permanent error when received
     * in response to a non-write operation.
     *
     * See isPermanentWriteError for classifying write errors.
     */
                function(t) {
                    switch (t) {
                      case u:
                        return $();

                      case c:
                      case a:
                      case l:
                      case m:
                      case A:
                      case T:
     // Unauthenticated means something went wrong with our token and we need
                        // to retry with new credentials which will happen automatically.
                                          case w:
                        return !1;

                      case h:
                      case f:
                      case d:
                      case _:
                      case p:
     // Aborted might be retried in some scenarios, but that is dependant on
                        // the context and should handled individually by the calling code.
                        // See https://cloud.google.com/apis/design/errors.
                                          case y:
                      case E:
                      case I:
                      case P:
                        return !0;

                      default:
                        return $();
                    }
                }(n);
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
     */ function Ye(t, n, e, r, s, i, o) {
        let u;
        if (s.K()) {
            if ("array-contains" /* ARRAY_CONTAINS */ === i || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === i) throw new R(h, `Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);
            if ("in" /* IN */ === i || "not-in" /* NOT_IN */ === i) {
                Ke(o, i);
                const n = [];
                for (const e of o) n.push(He(r, t, e));
                u = {
                    arrayValue: {
                        values: n
                    }
                };
            } else u = He(r, t, o);
        } else "in" /* IN */ !== i && "not-in" /* NOT_IN */ !== i && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== i || Ke(o, i), 
        u = ve(e, n, o, 
        /* allowArrays= */ "in" /* IN */ === i || "not-in" /* NOT_IN */ === i);
        const c = bt.create(s, i, u);
        return function(t, n) {
            if (n.ft()) {
                const e = Tt(t);
                if (null !== e && !e.isEqual(n.field)) throw new R(h, `Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '${e.toString()}' and '${n.field.toString()}'`);
                const r = At(t);
                null !== r && Je(t, n.field, r);
            }
            const e = function(t, n) {
                for (const e of t.filters) if (n.indexOf(e.op) >= 0) return e.op;
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
            }(n.op));
            if (null !== e) 
            // Special case when it's a duplicate op to give a slightly clearer error message.
            throw e === n.op ? new R(h, `Invalid query. You cannot use more than one '${n.op.toString()}' filter.`) : new R(h, `Invalid query. You cannot use '${n.op.toString()}' filters with '${e.toString()}' filters.`);
        }(t, c), c;
    }

    function ze(t, n, e) {
        if (null !== t.startAt) throw new R(h, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
        if (null !== t.endAt) throw new R(h, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
        const r = new Lt(n, e);
        return function(t, n) {
            if (null === At(t)) {
                // This is the first order by. It must match any inequality.
                const e = Tt(t);
                null !== e && Je(t, e, n.field);
            }
        }(t, r), r;
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
    function He(t, n, e) {
        if ("string" == typeof e) {
            if ("" === e) throw new R(h, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!Pt(n) && -1 !== e.indexOf("/")) throw new R(h, `Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);
            const r = n.path.child(W.W(e));
            if (!H.et(r)) throw new R(h, `Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);
            return ft(t, new H(r));
        }
        if (e instanceof Ee) return ft(t, e.ue);
        throw new R(h, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + ee(e) + ".");
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function Ke(t, n) {
        if (!Array.isArray(t) || 0 === t.length) throw new R(h, `Invalid Query. A non-empty array is required for '${n.toString()}' filters.`);
        if (t.length > 10) throw new R(h, `Invalid Query. '${n.toString()}' filters support a maximum of 10 elements in the value array.`);
        if ("in" /* IN */ === n || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === n) {
            if (t.indexOf(null) >= 0) throw new R(h, `Invalid Query. '${n.toString()}' filters cannot contain 'null' in the value array.`);
            if (t.filter(t => Number.isNaN(t)).length > 0) throw new R(h, `Invalid Query. '${n.toString()}' filters cannot contain 'NaN' in the value array.`);
        }
    }

    function Je(t, n, e) {
        if (!e.isEqual(n)) throw new R(h, `Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '${n.toString()}' and so you must also use '${n.toString()}' as your first orderBy(), but your first orderBy() is on field '${e.toString()}' instead.`);
    }

    /**
     * Converts custom model object of type T into DocumentData by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to DocumentData
     * because we want to provide the user with a more specific error message if
     * their set() or fails due to invalid data originating from a toFirestore()
     * call.
     */
    function Ze(t, n, e) {
        let r;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return r = t ? e && (e.merge || e.mergeFields) ? t.toFirestore(n, e) : t.toFirestore(n) : n, 
        r;
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
     */ class Xe extends Ee {
        constructor(t, n, e) {
            super(t.Ln, new H(e), n), this.firestore = t, this.converter = n, this.Ge = e, this.type = "document";
        }
        get id() {
            return this.Ge.U();
        }
        get path() {
            return this.Ge.G();
        }
        get parent() {
            return new pr(this.firestore, this.ce, this.ue.path.C());
        }
        collection(t) {
            $r("DocumentReference.collection", "path", t);
            const n = W.W(this.path).child(W.W(t));
            return te(n), new pr(this.firestore, 
            /* converter= */ null, n);
        }
        withConverter(t) {
            return new Xe(this.firestore, t, this.Ge);
        }
    }

    class tr {
        // This is the lite version of the Query class in the main SDK.
        constructor(t, n, e) {
            this.firestore = t, this.converter = n, this.We = e, this.type = "query";
        }
        withConverter(t) {
            return new tr(this.firestore, t, this.We);
        }
    }

    class nr {}

    function er(t, ...n) {
        let e = B(t, tr);
        for (const t of n) e = t.apply(e);
        return e;
    }

    class rr extends nr {
        constructor(t, n, e) {
            super(), this.Ye = t, this.ze = n, this.He = e, this.type = "where";
        }
        apply(t) {
            const n = Nr(t.firestore), e = Ye(t.We, "where", n, t.firestore.Ln, this.Ye, this.ze, this.He);
            return new tr(t.firestore, t.converter, function(t, n) {
                const e = t.filters.concat([ n ]);
                return new Et(t.path, t.collectionGroup, t.ct.slice(), e, t.limit, t.at, t.startAt, t.endAt);
            }(t.We, e));
        }
    }

    function sr(t, n, e) {
        // TODO(firestorelite): Consider validating the enum strings (note that
        // TypeScript does not support passing invalid values).
        const r = n, s = Qe("where", t);
        return new rr(s, r, e);
    }

    class ir extends nr {
        constructor(t, n) {
            super(), this.Ye = t, this.Ke = n, this.type = "orderBy";
        }
        apply(t) {
            const n = ze(t.We, this.Ye, this.Ke);
            return new tr(t.firestore, t.converter, function(t, n) {
                // TODO(dimond): validate that orderBy does not list the same key twice.
                const e = t.ct.concat([ n ]);
                return new Et(t.path, t.collectionGroup, e, t.filters.slice(), t.limit, t.at, t.startAt, t.endAt);
            }(t.We, n));
        }
    }

    function or(t, n = "asc") {
        // TODO(firestorelite): Consider validating the enum strings (note that
        // TypeScript does not support passing invalid values).
        const e = n, r = Qe("orderBy", t);
        return new ir(r, e);
    }

    class ur extends nr {
        constructor(t, n, e) {
            super(), this.type = t, this.Je = n, this.Ze = e;
        }
        apply(t) {
            return new tr(t.firestore, t.converter, function(t, n, e) {
                return new Et(t.path, t.collectionGroup, t.ct.slice(), t.filters.slice(), n, e, t.startAt, t.endAt);
            }(t.We, this.Je, this.Ze));
        }
    }

    function cr(t) {
        return re("limit", 1, t), new ur("limit", t, "F" /* First */);
    }

    function ar(t) {
        return re("limitToLast", 1, t), new ur("limitToLast", t, "L" /* Last */);
    }

    class hr extends nr {
        constructor(t, n, e) {
            super(), this.type = t, this.Xe = n, this.tr = e;
        }
        apply(t) {
            const n = mr(t, this.type, this.Xe, this.tr);
            return new tr(t.firestore, t.converter, function(t, n) {
                return new Et(t.path, t.collectionGroup, t.ct.slice(), t.filters.slice(), t.limit, t.at, n, t.endAt);
            }(t.We, n));
        }
    }

    function lr(...t) {
        return new hr("startAt", t, /*before=*/ !0);
    }

    function fr(...t) {
        return new hr("startAfter", t, 
        /*before=*/ !1);
    }

    class dr extends nr {
        constructor(t, n, e) {
            super(), this.type = t, this.Xe = n, this.tr = e;
        }
        apply(t) {
            const n = mr(t, this.type, this.Xe, this.tr);
            return new tr(t.firestore, t.converter, function(t, n) {
                return new Et(t.path, t.collectionGroup, t.ct.slice(), t.filters.slice(), t.limit, t.at, t.startAt, n);
            }(t.We, n));
        }
    }

    function _r(...t) {
        return new dr("endBefore", t, /*before=*/ !0);
    }

    function wr(...t) {
        return new dr("endAt", t, /*before=*/ !1);
    }

    /** Helper function to create a bound from a document or fields */ function mr(t, n, e, r) {
        if (e[0] instanceof Me) return Kn(n, e, 1), function(t, n, e, r, s) {
            if (!r) throw new R(f, "Can't use a DocumentSnapshot that doesn't exist for " + e + "().");
            const i = [];
            // Because people expect to continue/end a query at the exact document
            // provided, we need to use the implicit sort order rather than the explicit
            // sort order, because it's guaranteed to contain the document key. That way
            // the position becomes unambiguous and the query continues/ends exactly at
            // the provided document. Without the key (by using the explicit sort
            // orders), multiple documents could match the position, yielding duplicate
            // results.
                    for (const e of Rt(t)) if (e.field.K()) i.push(ft(n, r.key)); else {
                const t = r.field(e.field);
                if (nt(t)) throw new R(h, 'Invalid query. You are trying to start or end a query using a document for which the field "' + e.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === t) {
                    const t = e.field.G();
                    throw new R(h, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
                }
                i.push(t);
            }
            return new Ot(i, s);
        }
        /**
     * Converts a list of field values to a Bound for the given query.
     */ (t.We, t.firestore.Ln, n, e[0].Ne, r);
        {
            const s = Nr(t.firestore);
            return function(t, n, e, r, s, i) {
                // Use explicit order by's because it has to match the query the user made
                const o = t.ct;
                if (s.length > o.length) throw new R(h, `Too many arguments provided to ${r}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                const u = [];
                for (let i = 0; i < s.length; i++) {
                    const c = s[i];
                    if (o[i].field.K()) {
                        if ("string" != typeof c) throw new R(h, `Invalid query. Expected a string for document ID in ${r}(), but got a ${typeof c}`);
                        if (!Pt(t) && -1 !== c.indexOf("/")) throw new R(h, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${r}() must be a plain document ID, but '${c}' contains a slash.`);
                        const e = t.path.child(W.W(c));
                        if (!H.et(e)) throw new R(h, `Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${r}() must result in a valid document path, but '${e}' is not because it contains an odd number of segments.`);
                        const s = new H(e);
                        u.push(ft(n, s));
                    } else {
                        const t = ve(e, r, c);
                        u.push(t);
                    }
                }
                return new Ot(u, i);
            }(t.We, t.firestore.Ln, s, n, e, r);
        }
    }

    class pr extends tr {
        constructor(t, n, e) {
            super(t, n, new Et(e)), this.firestore = t, this.Ge = e, this.type = "collection";
        }
        get id() {
            return this.We.path.U();
        }
        get path() {
            return this.We.path.G();
        }
        get parent() {
            const t = this.Ge.C();
            return t.M() ? null : new Xe(this.firestore, 
            /* converter= */ null, t);
        }
        doc(t) {
            // We allow omission of 'pathString' but explicitly prohibit passing in both
            // 'undefined' and 'null'.
            0 === arguments.length && (t = x.t()), $r("CollectionReference.doc", "path", t);
            const n = this.Ge.child(W.W(t));
            return Xn(n), new Xe(this.firestore, this.converter, n);
        }
        withConverter(t) {
            return new pr(this.firestore, t, this.Ge);
        }
    }

    function yr(t, n) {
        if ($r("collection", "path", n), t instanceof Wn) {
            const e = W.W(n);
            return te(e), new pr(t, /* converter= */ null, e);
        }
        {
            if (!(t instanceof Xe || t instanceof pr)) throw new R(h, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const e = W.W(t.path).child(W.W(n));
            return te(e), new pr(t.firestore, 
            /* converter= */ null, e);
        }
    }

    // TODO(firestorelite): Consider using ErrorFactory -
    // https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
    function Er(t, n) {
        const e = B(t, Wn);
        if ($r("collectionGroup", "collection id", n), n.indexOf("/") >= 0) throw new R(h, `Invalid collection ID '${n}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
        return new tr(e, 
        /* converter= */ null, function(t) {
            return new Et(W.Y(), t);
        }(n));
    }

    function Ir(t, n) {
        if (
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (n = x.t()), $r("doc", "path", n), t instanceof Wn) {
            const e = W.W(n);
            return Xn(e), new Xe(t, /* converter= */ null, e);
        }
        {
            if (!(t instanceof Xe || t instanceof pr)) throw new R(h, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const e = t.Ge.child(W.W(n));
            return Xn(e), new Xe(t.firestore, t instanceof pr ? t.converter : null, e);
        }
    }

    function Ar(t) {
        const n = B(t, Xe);
        return Un(Gn(n.firestore), [ n.ue ]).then(t => {
            F(1 === t.length);
            const e = t[0];
            return new Me(n.firestore, n.ue, e instanceof $n ? e : null, n.ce);
        });
    }

    function Tr(t) {
        const n = B(t, tr);
        !function(t) {
            if (It(t) && 0 === t.ct.length) throw new R(I, "limitToLast() queries require specifying at least one orderBy() clause");
        }(n.We);
        return Mn(Gn(n.firestore), n.We).then(e => {
            const r = e.map(t => new je(n.firestore, t.key, t, n.converter));
            return It(n.We) && 
            // Limit to last queries reverse the orderBy constraint that was
            // specified by the user. As such, we need to reverse the order of the
            // results to return the documents in the expected order.
            r.reverse(), new Be(t, r);
        });
    }

    function Pr(t, n, e) {
        const r = B(t, Xe), s = Ze(r.ce, n, e), i = Ve(Nr(r.firestore), "setDoc", r.ue, s, null !== r.ce, e);
        return Ln(Gn(r.firestore), i.ae(r.ue, In.Pt()));
    }

    function Rr(t, n, e, ...r) {
        const s = B(t, Xe), i = Nr(s.firestore);
        let o;
        o = "string" == typeof n || n instanceof Ce ? be(i, "updateDoc", s.ue, n, e, r) : ge(i, "updateDoc", s.ue, n);
        return Ln(Gn(s.firestore), o.ae(s.ue, In.exists(!0)));
    }

    function Vr(t) {
        const n = B(t, Xe);
        return Ln(Gn(n.firestore), [ new Vn(n.ue, In.Pt()) ]);
    }

    function gr(t, n) {
        const e = B(t, pr), r = Ir(e), s = Ze(e.converter, n), i = Ve(Nr(e.firestore), "addDoc", r.ue, s, null !== r.ce, {});
        return Ln(Gn(e.firestore), i.ae(r.ue, In.exists(!1))).then(() => r);
    }

    function br(t, n) {
        return (t instanceof Xe || t instanceof pr) && (n instanceof Xe || n instanceof pr) && (t.firestore === n.firestore && t.path === n.path && t.converter === n.converter);
    }

    function vr(t, n) {
        return t instanceof tr && n instanceof tr && (t.firestore === n.firestore && gt(t.We, n.We) && t.converter === n.converter);
    }

    function Nr(t) {
        const n = t.Cn(), e = kn(t.Ln);
        return new Re(t.Ln, !!n.ignoreUndefinedProperties, e);
    }

    function $r(t, n, e) {
        if (!e) throw new R(h, `Function ${t}() cannot be called with an empty ${n}.`);
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
    /** The public FieldValue class of the lite API. */ class Fr extends ae {}

    /**
     * A delegate class that allows the FieldValue implementations returned by
     * deleteField(), serverTimestamp(), arrayUnion(), arrayRemove() and
     * increment() to be an instance of the lite FieldValue class declared above.
     *
     * We don't directly subclass `FieldValue` in the various field value
     * implementations as the base FieldValue class differs between the lite, full
     * and legacy SDK.
     */ class Dr extends Fr {
        constructor(t) {
            super(), this.Hn = t, this.Kn = t.Kn;
        }
        Jn(t) {
            return this.Hn.Jn(t);
        }
        isEqual(t) {
            return t instanceof Dr && this.Hn.isEqual(t.Hn);
        }
    }

    function qr() {
        return new Dr(new he("deleteField"));
    }

    function xr() {
        return new Dr(new fe("serverTimestamp"));
    }

    function Sr(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return Jn("arrayUnion()", arguments, 1), new Dr(new de("arrayUnion", t));
    }

    function Or(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return Jn("arrayRemove()", arguments, 1), new Dr(new _e("arrayRemove", t));
    }

    function Cr(t) {
        return new Dr(new we("increment", t));
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
     */ class Lr {
        constructor(t, n) {
            this.ve = t, this.nr = n, this.er = [], this.rr = !1, this.sr = Nr(t);
        }
        set(t, n, e) {
            this.ir();
            const r = Ur(t, this.ve), s = Ze(r.ce, n, e), i = Ve(this.sr, "WriteBatch.set", r.ue, s, null !== r.ce, e);
            return this.er = this.er.concat(i.ae(r.ue, In.Pt())), this;
        }
        update(t, n, e, ...r) {
            this.ir();
            const s = Ur(t, this.ve);
            let i;
            return i = "string" == typeof n || n instanceof Ce ? be(this.sr, "WriteBatch.update", s.ue, n, e, r) : ge(this.sr, "WriteBatch.update", s.ue, n), 
            this.er = this.er.concat(i.ae(s.ue, In.exists(!0))), this;
        }
        delete(t) {
            this.ir();
            const n = Ur(t, this.ve);
            return this.er = this.er.concat(new Vn(n.ue, In.Pt())), this;
        }
        commit() {
            return this.ir(), this.rr = !0, this.er.length > 0 ? this.nr(this.er) : Promise.resolve();
        }
        ir() {
            if (this.rr) throw new R(p, "A write batch can no longer be used after commit() has been called.");
        }
    }

    function Ur(t, n) {
        if (t.firestore !== n) throw new R(h, "Provided document reference is from a different Firestore instance.");
        return B(t, Xe);
    }

    function Mr(t) {
        const n = B(t, Wn), e = Gn(n);
        return new Lr(n, t => Ln(e, t));
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
    class jr {
        constructor(t, n) {
            this.ve = t, this.or = n, this.sr = Nr(t);
        }
        get(t) {
            const n = Ur(t, this.ve);
            return this.or.Oe([ n.ue ]).then(t => {
                if (!t || 1 !== t.length) return $();
                const e = t[0];
                if (e instanceof Fn) return new Me(this.ve, n.ue, null, n.ce);
                if (e instanceof $n) return new Me(this.ve, e.key, e, n.ce);
                throw $();
            });
        }
        set(t, n, e) {
            const r = Ur(t, this.ve), s = Ze(r.ce, n, e), i = Ve(this.sr, "Transaction.set", r.ue, s, null !== r.ce, e);
            return this.or.set(r.ue, i), this;
        }
        update(t, n, e, ...r) {
            const s = Ur(t, this.ve);
            let i;
            return i = "string" == typeof n || n instanceof Ce ? be(this.sr, "Transaction.update", s.ue, n, e, r) : ge(this.sr, "Transaction.update", s.ue, n), 
            this.or.update(s.ue, i), this;
        }
        delete(t) {
            const n = Ur(t, this.ve);
            return this.or.delete(n.ue), this;
        }
    }

    function Br(t, n) {
        const e = B(t, Wn), r = Gn(e), s = new Dn;
        return new We(new On, r, t => n(new jr(e, t)), s).run(), s.promise;
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
     */ app._registerComponent(new Component("firestore/lite", t => ((t, n) => new Wn(t, n))(t.getProvider("app-exp").getImmediate(), t.getProvider("auth-internal")), "PUBLIC" /* PUBLIC */)), 
    app.registerVersion("firestore-lite", "0.0.800", "node");

    exports.Bytes = pe;
    exports.CollectionReference = pr;
    exports.DocumentReference = Xe;
    exports.DocumentSnapshot = Me;
    exports.FieldPath = Ce;
    exports.FieldValue = Fr;
    exports.FirebaseFirestore = Wn;
    exports.GeoPoint = me;
    exports.Query = tr;
    exports.QueryConstraint = nr;
    exports.QueryDocumentSnapshot = je;
    exports.QuerySnapshot = Be;
    exports.Timestamp = k;
    exports.Transaction = jr;
    exports.WriteBatch = Lr;
    exports.addDoc = gr;
    exports.arrayRemove = Or;
    exports.arrayUnion = Sr;
    exports.collection = yr;
    exports.collectionGroup = Er;
    exports.deleteDoc = Vr;
    exports.deleteField = qr;
    exports.doc = Ir;
    exports.documentId = Le;
    exports.endAt = wr;
    exports.endBefore = _r;
    exports.getDoc = Ar;
    exports.getDocs = Tr;
    exports.getFirestore = zn;
    exports.increment = Cr;
    exports.initializeFirestore = Yn;
    exports.limit = cr;
    exports.limitToLast = ar;
    exports.orderBy = or;
    exports.query = er;
    exports.queryEqual = vr;
    exports.refEqual = br;
    exports.runTransaction = Br;
    exports.serverTimestamp = xr;
    exports.setDoc = Pr;
    exports.setLogLevel = g;
    exports.snapshotEqual = ke;
    exports.startAfter = fr;
    exports.startAt = lr;
    exports.terminate = Hn;
    exports.updateDoc = Rr;
    exports.where = sr;
    exports.writeBatch = Mr;

    Object.defineProperty(exports, '__esModule', { value: true });


              }).apply(this, arguments);
            } catch(err) {
                console.error(err);
                throw new Error(
                  'Cannot instantiate firebase-firestore-lite.js - ' +
                  'be sure to load firebase-app.js first.'
                );
              }

})));
//# sourceMappingURL=firebase-firestore-lite.js.map
