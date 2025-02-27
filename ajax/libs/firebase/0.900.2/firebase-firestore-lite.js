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
        function FirebaseError(code, message, customData) {
            var _this = _super.call(this, message) || this;
            _this.code = code;
            _this.customData = customData;
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
            var error = new FirebaseError(fullCode, fullMessage, customData);
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
     */ const u = "ok", c = "cancelled", a = "unknown", h = "invalid-argument", l = "deadline-exceeded", f = "not-found", d = "already-exists", _ = "permission-denied", w = "unauthenticated", m = "resource-exhausted", p = "failed-precondition", y = "aborted", E = "out-of-range", I = "unimplemented", T = "internal", A = "unavailable", P = "data-loss";

    /** An error returned by a Firestore operation. */ class R extends Error {
        /** @hideconstructor */
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
     */ class V {
        /**
         * Constructs a DatabaseInfo using the provided host, databaseId and
         * persistenceKey.
         *
         * @param databaseId - The database to use.
         * @param persistenceKey - A unique identifier for this Firestore's local
         * storage (used in conjunction with the databaseId).
         * @param host - The Firestore backend host to connect to.
         * @param ssl - Whether to use SSL when connecting.
         * @param forceLongPolling - Whether to use the forceLongPolling option
         * when using WebChannel as the network transport.
         * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
         * option when using WebChannel as the network transport.
         */
        constructor(t, n, e, s, r, i) {
            this.t = t, this.persistenceKey = n, this.host = e, this.ssl = s, this.forceLongPolling = r, 
            this.i = i;
        }
    }

    /** The default database name for a project. */
    /** Represents the database ID a Firestore client is associated with. */
    class g {
        constructor(t, n) {
            this.projectId = t, this.database = n || "(default)";
        }
        get o() {
            return "(default)" === this.database;
        }
        isEqual(t) {
            return t instanceof g && t.projectId === this.projectId && t.database === this.database;
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
     */ class v {
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

    /** A user with a null UID. */ v.UNAUTHENTICATED = new v(null), 
    // TODO(mikelehen): Look into getting a proper uid-equivalent for
    // non-FirebaseAuth providers.
    v.l = new v("google-credentials-uid"), v._ = new v("first-party-uid");

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
    const b = new Logger("@firebase/firestore");

    /**
     * Sets the verbosity of Cloud Firestore logs (debug, error, or silent).
     *
     * @param logLevel - The verbosity you set for activity and error logging. Can
     *   be any of the following values:
     *
     *   <ul>
     *     <li>`debug` for the most verbose logging level, primarily for
     *     debugging.</li>
     *     <li>`error` to log errors only.</li>
     *     <li><code>`silent` to turn off logging.</li>
     *   </ul>
     */ function N(t) {
        b.setLogLevel(t);
    }

    function D(t, ...n) {
        if (b.logLevel <= LogLevel.DEBUG) {
            const e = n.map($);
            b.debug("Firestore (8.1.1): " + t, ...e);
        }
    }

    function F(t, ...n) {
        if (b.logLevel <= LogLevel.ERROR) {
            const e = n.map($);
            b.error("Firestore (8.1.1): " + t, ...e);
        }
    }

    /**
     * Converts an additional log parameter to a string representation.
     */
    function $(t) {
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
     */ function S(t = "Unexpected state") {
        // Log the failure in addition to throw an exception, just in case the
        // exception is swallowed.
        const n = "FIRESTORE (8.1.1) INTERNAL ASSERTION FAILED: " + t;
        // NOTE: We don't use FirestoreError here because these are internal failures
        // that cannot be handled by the user. (Also it would create a circular
        // dependency between the error and assert modules which doesn't work.)
        throw F(n), new Error(n);
    }

    /**
     * Fails if the given assertion condition is false, throwing an Error with the
     * given message if it did.
     *
     * Messages are stripped in production builds.
     */ function x(t, n) {
        t || S();
    }

    /**
     * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
     * instance of `T` before casting.
     */ function q(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
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
     */ class O {
        constructor(t, n) {
            this.user = n, this.type = "OAuth", this.m = {}, 
            // Set the headers using Object Literal notation to avoid minification
            this.m.Authorization = "Bearer " + t;
        }
    }

    /** A CredentialsProvider that always yields an empty token. */ class C {
        constructor() {
            /**
             * Stores the listener registered with setChangeListener()
             * This isn't actually necessary since the UID never changes, but we use this
             * to verify the listen contract is adhered to in tests.
             */
            this.p = null;
        }
        getToken() {
            return Promise.resolve(null);
        }
        I() {}
        T(t) {
            this.p = t, 
            // Fire with initial user.
            t(v.UNAUTHENTICATED);
        }
        A() {
            this.p = null;
        }
    }

    class L {
        constructor(t) {
            /**
             * The auth token listener registered with FirebaseApp, retained here so we
             * can unregister it.
             */
            this.P = null, 
            /** Tracks the current User. */
            this.currentUser = v.UNAUTHENTICATED, this.R = !1, 
            /**
             * Counter used to detect if the token changed while a getToken request was
             * outstanding.
             */
            this.V = 0, 
            /** The listener registered with setChangeListener(). */
            this.p = null, this.forceRefresh = !1, this.P = () => {
                this.V++, this.currentUser = this.g(), this.R = !0, this.p && this.p(this.currentUser);
            }, this.V = 0, this.auth = t.getImmediate({
                optional: !0
            }), this.auth ? this.auth.addAuthTokenListener(this.P) : (
            // if auth is not available, invoke tokenListener once with null token
            this.P(null), t.get().then((t => {
                this.auth = t, this.P && 
                // tokenListener can be removed by removeChangeListener()
                this.auth.addAuthTokenListener(this.P);
            }), (() => {})));
        }
        getToken() {
            // Take note of the current value of the tokenCounter so that this method
            // can fail (with an ABORTED error) if there is a token change while the
            // request is outstanding.
            const t = this.V, n = this.forceRefresh;
            return this.forceRefresh = !1, this.auth ? this.auth.getToken(n).then((n => 
            // Cancel the request since the token changed while the request was
            // outstanding so the response is potentially for a previous user (which
            // user, we can't be sure).
            this.V !== t ? (D("FirebaseCredentialsProvider", "getToken aborted due to token change."), 
            this.getToken()) : n ? (x("string" == typeof n.accessToken), new O(n.accessToken, this.currentUser)) : null)) : Promise.resolve(null);
        }
        I() {
            this.forceRefresh = !0;
        }
        T(t) {
            this.p = t, 
            // Fire the initial event
            this.R && t(this.currentUser);
        }
        A() {
            this.auth && this.auth.removeAuthTokenListener(this.P), this.P = null, this.p = null;
        }
        // Auth.getUid() can return null even with a user logged in. It is because
        // getUid() is synchronous, but the auth code populating Uid is asynchronous.
        // This method should only be called in the AuthTokenListener callback
        // to guarantee to get the actual user.
        g() {
            const t = this.auth && this.auth.getUid();
            return x(null === t || "string" == typeof t), new v(t);
        }
    }

    /*
     * FirstPartyToken provides a fresh token each time its value
     * is requested, because if the token is too old, requests will be rejected.
     * Technically this may no longer be necessary since the SDK should gracefully
     * recover from unauthenticated errors (see b/33147818 for context), but it's
     * safer to keep the implementation as-is.
     */ class U {
        constructor(t, n) {
            this.v = t, this.N = n, this.type = "FirstParty", this.user = v._;
        }
        get m() {
            const t = {
                "X-Goog-AuthUser": this.N
            }, n = this.v.auth.getAuthHeaderValueForFirstParty([]);
            // Use array notation to prevent minification
                    return n && (t.Authorization = n), t;
        }
    }

    /*
     * Provides user credentials required for the Firestore JavaScript SDK
     * to authenticate the user, using technique that is only available
     * to applications hosted by Google.
     */ class M {
        constructor(t, n) {
            this.v = t, this.N = n;
        }
        getToken() {
            return Promise.resolve(new U(this.v, this.N));
        }
        T(t) {
            // Fire with initial uid.
            t(v._);
        }
        A() {}
        I() {}
    }

    /**
     * Builds a CredentialsProvider depending on the type of
     * the credentials passed in.
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
     * Generates `nBytes` of random bytes.
     *
     * If `nBytes < 0` , an error will be thrown.
     */
    function j(t) {
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
     */ class B {
        static D() {
            // Alphanumeric characters
            const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = Math.floor(256 / t.length) * t.length;
            // The largest byte value that is a multiple of `char.length`.
                    let e = "";
            for (;e.length < 20; ) {
                const s = j(40);
                for (let r = 0; r < s.length; ++r) 
                // Only accept values that are [0, maxMultiple), this ensures they can
                // be evenly mapped to indices of `chars` via a modulo operation.
                e.length < 20 && s[r] < n && (e += t.charAt(s[r] % t.length));
            }
            return e;
        }
    }

    function k(t, n) {
        return t < n ? -1 : t > n ? 1 : 0;
    }

    /** Helper to compare arrays using isEqual(). */ function Q(t, n, e) {
        return t.length === n.length && t.every(((t, s) => e(t, n[s])));
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
    /**
     * A `Timestamp` represents a point in time independent of any time zone or
     * calendar, represented as seconds and fractions of seconds at nanosecond
     * resolution in UTC Epoch time.
     *
     * It is encoded using the Proleptic Gregorian Calendar which extends the
     * Gregorian calendar backwards to year one. It is encoded assuming all minutes
     * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
     * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
     * 9999-12-31T23:59:59.999999999Z.
     *
     * @see https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto
     */
    class W {
        /**
         * Creates a new timestamp.
         *
         * @param seconds - The number of seconds of UTC time since Unix epoch
         *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
         *     9999-12-31T23:59:59Z inclusive.
         * @param nanoseconds - The non-negative fractions of a second at nanosecond
         *     resolution. Negative second values with fractions must still have
         *     non-negative nanoseconds values that count forward in time. Must be
         *     from 0 to 999,999,999 inclusive.
         */
        constructor(t, n) {
            if (this.seconds = t, this.nanoseconds = n, n < 0) throw new R(h, "Timestamp nanoseconds out of range: " + n);
            if (n >= 1e9) throw new R(h, "Timestamp nanoseconds out of range: " + n);
            if (t < -62135596800) throw new R(h, "Timestamp seconds out of range: " + t);
            // This will break in the year 10,000.
                    if (t >= 253402300800) throw new R(h, "Timestamp seconds out of range: " + t);
        }
        /**
         * Creates a new timestamp with the current date, with millisecond precision.
         *
         * @returns a new timestamp representing the current date.
         */    static now() {
            return W.fromMillis(Date.now());
        }
        /**
         * Creates a new timestamp from the given date.
         *
         * @param date - The date to initialize the `Timestamp` from.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     date.
         */    static fromDate(t) {
            return W.fromMillis(t.getTime());
        }
        /**
         * Creates a new timestamp from the given number of milliseconds.
         *
         * @param milliseconds - Number of milliseconds since Unix epoch
         *     1970-01-01T00:00:00Z.
         * @returns A new `Timestamp` representing the same point in time as the given
         *     number of milliseconds.
         */    static fromMillis(t) {
            const n = Math.floor(t / 1e3);
            return new W(n, 1e6 * (t - 1e3 * n));
        }
        /**
         * Converts a `Timestamp` to a JavaScript `Date` object. This conversion causes
         * a loss of precision since `Date` objects only support millisecond precision.
         *
         * @returns JavaScript `Date` object representing the same point in time as
         *     this `Timestamp`, with millisecond precision.
         */    toDate() {
            return new Date(this.toMillis());
        }
        /**
         * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
         * epoch). This operation causes a loss of precision.
         *
         * @returns The point in time corresponding to this timestamp, represented as
         *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
         */    toMillis() {
            return 1e3 * this.seconds + this.nanoseconds / 1e6;
        }
        F(t) {
            return this.seconds === t.seconds ? k(this.nanoseconds, t.nanoseconds) : k(this.seconds, t.seconds);
        }
        /**
         * Returns true if this `Timestamp` is equal to the provided one.
         *
         * @param other - The `Timestamp` to compare against.
         * @returns true if this `Timestamp` is equal to the provided one.
         */    isEqual(t) {
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
        /**
         * Converts this object to a primitive string, which allows Timestamp objects to be compared
         * using the `>`, `<=`, `>=` and `>` operators.
         */    valueOf() {
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
     */ class z {
        constructor(t) {
            this.timestamp = t;
        }
        static $(t) {
            return new z(t);
        }
        static min() {
            return new z(new W(0, 0));
        }
        S(t) {
            return this.timestamp.F(t.timestamp);
        }
        isEqual(t) {
            return this.timestamp.isEqual(t.timestamp);
        }
        /** Returns a number representation of the version for use in spec tests. */    q() {
            // Convert to microseconds.
            return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
        }
        toString() {
            return "SnapshotVersion(" + this.timestamp.toString() + ")";
        }
        O() {
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
            void 0 === n ? n = 0 : n > t.length && S(), void 0 === e ? e = t.length - n : e > t.length - n && S(), 
            this.segments = t, this.offset = n, this.C = e;
        }
        get length() {
            return this.C;
        }
        isEqual(t) {
            return 0 === G.L(this, t);
        }
        child(t) {
            const n = this.segments.slice(this.offset, this.limit());
            return t instanceof G ? t.forEach((t => {
                n.push(t);
            })) : n.push(t), this.U(n);
        }
        /** The index of one past the last segment of the path. */    limit() {
            return this.offset + this.length;
        }
        M(t) {
            return t = void 0 === t ? 1 : t, this.U(this.segments, this.offset + t, this.length - t);
        }
        j() {
            return this.U(this.segments, this.offset, this.length - 1);
        }
        B() {
            return this.segments[this.offset];
        }
        k() {
            return this.get(this.length - 1);
        }
        get(t) {
            return this.segments[this.offset + t];
        }
        W() {
            return 0 === this.length;
        }
        G(t) {
            if (t.length < this.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        Y(t) {
            if (this.length + 1 !== t.length) return !1;
            for (let n = 0; n < this.length; n++) if (this.get(n) !== t.get(n)) return !1;
            return !0;
        }
        forEach(t) {
            for (let n = this.offset, e = this.limit(); n < e; n++) t(this.segments[n]);
        }
        H() {
            return this.segments.slice(this.offset, this.limit());
        }
        static L(t, n) {
            const e = Math.min(t.length, n.length);
            for (let s = 0; s < e; s++) {
                const e = t.get(s), r = n.get(s);
                if (e < r) return -1;
                if (e > r) return 1;
            }
            return t.length < n.length ? -1 : t.length > n.length ? 1 : 0;
        }
    }

    /**
     * A slash-separated path for navigating resources (documents and collections)
     * within Firestore.
     */ class Y extends G {
        U(t, n, e) {
            return new Y(t, n, e);
        }
        K() {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            return this.H().join("/");
        }
        toString() {
            return this.K();
        }
        /**
         * Creates a resource path from the given slash-delimited string. If multiple
         * arguments are provided, all components are combined. Leading and trailing
         * slashes from all components are ignored.
         */    static J(...t) {
            // NOTE: The client is ignorant of any path segments containing escape
            // sequences (e.g. __id123__) and just passes them through raw (they exist
            // for legacy reasons and should not be used frequently).
            const n = [];
            for (const e of t) {
                if (e.indexOf("//") >= 0) throw new R(h, `Invalid segment (${e}). Paths must not contain // in them.`);
                // Strip leading and traling slashed.
                            n.push(...e.split("/").filter((t => t.length > 0)));
            }
            return new Y(n);
        }
        static Z() {
            return new Y([]);
        }
    }

    const H = /^[_a-zA-Z][_a-zA-Z0-9]*$/;

    /** A dot-separated path for navigating sub-objects within a document. */ class K extends G {
        U(t, n, e) {
            return new K(t, n, e);
        }
        /**
         * Returns true if the string could be used as a segment in a field path
         * without escaping.
         */    static X(t) {
            return H.test(t);
        }
        K() {
            return this.H().map((t => (t = t.replace(/\\/g, "\\\\").replace(/`/g, "\\`"), K.X(t) || (t = "`" + t + "`"), 
            t))).join(".");
        }
        toString() {
            return this.K();
        }
        /**
         * Returns true if this field references the key of a document.
         */    tt() {
            return 1 === this.length && "__name__" === this.get(0);
        }
        /**
         * The field designating the key of a document.
         */    static nt() {
            return new K([ "__name__" ]);
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
         */    static et(t) {
            const n = [];
            let e = "", s = 0;
            const r = () => {
                if (0 === e.length) throw new R(h, `Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);
                n.push(e), e = "";
            };
            let i = !1;
            for (;s < t.length; ) {
                const n = t[s];
                if ("\\" === n) {
                    if (s + 1 === t.length) throw new R(h, "Path has trailing escape character: " + t);
                    const n = t[s + 1];
                    if ("\\" !== n && "." !== n && "`" !== n) throw new R(h, "Path has invalid escape sequence: " + t);
                    e += n, s += 2;
                } else "`" === n ? (i = !i, s++) : "." !== n || i ? (e += n, s++) : (r(), s++);
            }
            if (r(), i) throw new R(h, "Unterminated ` in path: " + t);
            return new K(n);
        }
        static Z() {
            return new K([]);
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
     */ class J {
        constructor(t) {
            this.path = t;
        }
        static st(t) {
            return new J(Y.J(t));
        }
        static rt(t) {
            return new J(Y.J(t).M(5));
        }
        /** Returns true if the document is in the specified collectionId. */    it(t) {
            return this.path.length >= 2 && this.path.get(this.path.length - 2) === t;
        }
        isEqual(t) {
            return null !== t && 0 === Y.L(this.path, t.path);
        }
        toString() {
            return this.path.toString();
        }
        static L(t, n) {
            return Y.L(t.path, n.path);
        }
        static ot(t) {
            return t.length % 2 == 0;
        }
        /**
         * Creates and returns a new document key with the given segments.
         *
         * @param segments - The segments of the path to the document
         * @returns A new instance of DocumentKey
         */    static ut(t) {
            return new J(new Y(t.slice()));
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
     */ function Z(t) {
        let n = 0;
        for (const e in t) Object.prototype.hasOwnProperty.call(t, e) && n++;
        return n;
    }

    function X(t, n) {
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
    class tt {
        constructor(t) {
            this.ct = t;
        }
        static fromBase64String(t) {
            const n = atob(t);
            return new tt(n);
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
            return new tt(n);
        }
        toBase64() {
            return t = this.ct, btoa(t);
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
     */ (this.ct);
        }
        at() {
            return 2 * this.ct.length;
        }
        S(t) {
            return k(this.ct, t.ct);
        }
        isEqual(t) {
            return this.ct === t.ct;
        }
    }

    function nt(t) {
        return null == t;
    }

    /** Returns whether the value represents -0. */ function et(t) {
        // Detect if the value is -0.0. Based on polyfill from
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
        return 0 === t && 1 / t == -1 / 0;
    }

    /**
     * Returns whether a value is an integer and in the safe integer range
     * @param value - The value to test for being an integer and in the safe range
     */ tt.ht = new tt("");

    function st(t) {
        var n, e;
        return "server_timestamp" === (null === (e = ((null === (n = null == t ? void 0 : t.mapValue) || void 0 === n ? void 0 : n.fields) || {}).__type__) || void 0 === e ? void 0 : e.stringValue);
    }

    /**
     * Returns the value of the field before this ServerTimestamp was set.
     *
     * Preserving the previous values allows the user to display the last resoled
     * value until the backend responds with the timestamp.
     */ function rt(t) {
        const n = t.mapValue.fields.__previous_value__;
        return st(n) ? rt(n) : n;
    }

    /**
     * Returns the local time at which this timestamp was first set.
     */ function it(t) {
        const n = ft(t.mapValue.fields.__local_write_time__.timestampValue);
        return new W(n.seconds, n.nanos);
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
    const ot = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);

    /** Extracts the backend's type order for the provided value. */ function ut(t) {
        return "nullValue" in t ? 0 /* NullValue */ : "booleanValue" in t ? 1 /* BooleanValue */ : "integerValue" in t || "doubleValue" in t ? 2 /* NumberValue */ : "timestampValue" in t ? 3 /* TimestampValue */ : "stringValue" in t ? 5 /* StringValue */ : "bytesValue" in t ? 6 /* BlobValue */ : "referenceValue" in t ? 7 /* RefValue */ : "geoPointValue" in t ? 8 /* GeoPointValue */ : "arrayValue" in t ? 9 /* ArrayValue */ : "mapValue" in t ? st(t) ? 4 /* ServerTimestampValue */ : 10 /* ObjectValue */ : S();
    }

    /** Tests `left` and `right` for equality based on the backend semantics. */ function ct(t, n) {
        const e = ut(t);
        if (e !== ut(n)) return !1;
        switch (e) {
          case 0 /* NullValue */ :
            return !0;

          case 1 /* BooleanValue */ :
            return t.booleanValue === n.booleanValue;

          case 4 /* ServerTimestampValue */ :
            return it(t).isEqual(it(n));

          case 3 /* TimestampValue */ :
            return function(t, n) {
                if ("string" == typeof t.timestampValue && "string" == typeof n.timestampValue && t.timestampValue.length === n.timestampValue.length) 
                // Use string equality for ISO 8601 timestamps
                return t.timestampValue === n.timestampValue;
                const e = ft(t.timestampValue), s = ft(n.timestampValue);
                return e.seconds === s.seconds && e.nanos === s.nanos;
            }(t, n);

          case 5 /* StringValue */ :
            return t.stringValue === n.stringValue;

          case 6 /* BlobValue */ :
            return function(t, n) {
                return _t(t.bytesValue).isEqual(_t(n.bytesValue));
            }(t, n);

          case 7 /* RefValue */ :
            return t.referenceValue === n.referenceValue;

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                return dt(t.geoPointValue.latitude) === dt(n.geoPointValue.latitude) && dt(t.geoPointValue.longitude) === dt(n.geoPointValue.longitude);
            }(t, n);

          case 2 /* NumberValue */ :
            return function(t, n) {
                if ("integerValue" in t && "integerValue" in n) return dt(t.integerValue) === dt(n.integerValue);
                if ("doubleValue" in t && "doubleValue" in n) {
                    const e = dt(t.doubleValue), s = dt(n.doubleValue);
                    return e === s ? et(e) === et(s) : isNaN(e) && isNaN(s);
                }
                return !1;
            }(t, n);

          case 9 /* ArrayValue */ :
            return Q(t.arrayValue.values || [], n.arrayValue.values || [], ct);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.mapValue.fields || {}, s = n.mapValue.fields || {};
                if (Z(e) !== Z(s)) return !1;
                for (const t in e) if (e.hasOwnProperty(t) && (void 0 === s[t] || !ct(e[t], s[t]))) return !1;
                return !0;
            }
            /** Returns true if the ArrayValue contains the specified element. */ (t, n);

          default:
            return S();
        }
    }

    function at(t, n) {
        return void 0 !== (t.values || []).find((t => ct(t, n)));
    }

    function ht(t, n) {
        const e = ut(t), s = ut(n);
        if (e !== s) return k(e, s);
        switch (e) {
          case 0 /* NullValue */ :
            return 0;

          case 1 /* BooleanValue */ :
            return k(t.booleanValue, n.booleanValue);

          case 2 /* NumberValue */ :
            return function(t, n) {
                const e = dt(t.integerValue || t.doubleValue), s = dt(n.integerValue || n.doubleValue);
                return e < s ? -1 : e > s ? 1 : e === s ? 0 : 
                // one or both are NaN.
                isNaN(e) ? isNaN(s) ? 0 : -1 : 1;
            }(t, n);

          case 3 /* TimestampValue */ :
            return lt(t.timestampValue, n.timestampValue);

          case 4 /* ServerTimestampValue */ :
            return lt(it(t), it(n));

          case 5 /* StringValue */ :
            return k(t.stringValue, n.stringValue);

          case 6 /* BlobValue */ :
            return function(t, n) {
                const e = _t(t), s = _t(n);
                return e.S(s);
            }(t.bytesValue, n.bytesValue);

          case 7 /* RefValue */ :
            return function(t, n) {
                const e = t.split("/"), s = n.split("/");
                for (let t = 0; t < e.length && t < s.length; t++) {
                    const n = k(e[t], s[t]);
                    if (0 !== n) return n;
                }
                return k(e.length, s.length);
            }(t.referenceValue, n.referenceValue);

          case 8 /* GeoPointValue */ :
            return function(t, n) {
                const e = k(dt(t.latitude), dt(n.latitude));
                if (0 !== e) return e;
                return k(dt(t.longitude), dt(n.longitude));
            }(t.geoPointValue, n.geoPointValue);

          case 9 /* ArrayValue */ :
            return function(t, n) {
                const e = t.values || [], s = n.values || [];
                for (let t = 0; t < e.length && t < s.length; ++t) {
                    const n = ht(e[t], s[t]);
                    if (n) return n;
                }
                return k(e.length, s.length);
            }(t.arrayValue, n.arrayValue);

          case 10 /* ObjectValue */ :
            return function(t, n) {
                const e = t.fields || {}, s = Object.keys(e), r = n.fields || {}, i = Object.keys(r);
                // Even though MapValues are likely sorted correctly based on their insertion
                // order (e.g. when received from the backend), local modifications can bring
                // elements out of order. We need to re-sort the elements to ensure that
                // canonical IDs are independent of insertion order.
                s.sort(), i.sort();
                for (let t = 0; t < s.length && t < i.length; ++t) {
                    const n = k(s[t], i[t]);
                    if (0 !== n) return n;
                    const o = ht(e[s[t]], r[i[t]]);
                    if (0 !== o) return o;
                }
                return k(s.length, i.length);
            }
            /**
     * Converts the possible Proto values for a timestamp value into a "seconds and
     * nanos" representation.
     */ (t.mapValue, n.mapValue);

          default:
            throw S();
        }
    }

    function lt(t, n) {
        if ("string" == typeof t && "string" == typeof n && t.length === n.length) return k(t, n);
        const e = ft(t), s = ft(n), r = k(e.seconds, s.seconds);
        return 0 !== r ? r : k(e.nanos, s.nanos);
    }

    function ft(t) {
        // The json interface (for the browser) will return an iso timestamp string,
        // while the proto js library (for node) will return a
        // google.protobuf.Timestamp instance.
        if (x(!!t), "string" == typeof t) {
            // The date string can have higher precision (nanos) than the Date class
            // (millis), so we do some custom parsing here.
            // Parse the nanos right out of the string.
            let n = 0;
            const e = ot.exec(t);
            if (x(!!e), e[1]) {
                // Pad the fraction out to 9 digits (nanos).
                let t = e[1];
                t = (t + "000000000").substr(0, 9), n = Number(t);
            }
            // Parse the date to get the seconds.
                    const s = new Date(t);
            return {
                seconds: Math.floor(s.getTime() / 1e3),
                nanos: n
            };
        }
        return {
            seconds: dt(t.seconds),
            nanos: dt(t.nanos)
        };
    }

    /**
     * Converts the possible Proto types for numbers into a JavaScript number.
     * Returns 0 if the value is not numeric.
     */ function dt(t) {
        // TODO(bjornick): Handle int64 greater than 53 bits.
        return "number" == typeof t ? t : "string" == typeof t ? Number(t) : 0;
    }

    /** Converts the possible Proto types for Blobs into a ByteString. */ function _t(t) {
        return "string" == typeof t ? tt.fromBase64String(t) : tt.fromUint8Array(t);
    }

    /** Returns a reference value for the provided database and key. */ function wt(t, n) {
        return {
            referenceValue: `projects/${t.projectId}/databases/${t.database}/documents/${n.path.K()}`
        };
    }

    /** Returns true if `value` is an ArrayValue. */ function mt(t) {
        return !!t && "arrayValue" in t;
    }

    /** Returns true if `value` is a NullValue. */ function pt(t) {
        return !!t && "nullValue" in t;
    }

    /** Returns true if `value` is NaN. */ function yt(t) {
        return !!t && "doubleValue" in t && isNaN(Number(t.doubleValue));
    }

    /** Returns true if `value` is a MapValue. */ function Et(t) {
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
    class It {
        constructor(t, n = null, e = [], s = [], r = null, i = null, o = null) {
            this.path = t, this.collectionGroup = n, this.orderBy = e, this.filters = s, this.limit = r, 
            this.startAt = i, this.endAt = o, this.lt = null;
        }
    }

    /**
     * Initializes a Target with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     *
     * NOTE: you should always construct `Target` from `Query.toTarget` instead of
     * using this factory method, because `Query` provides an implicit `orderBy`
     * property.
     */ function Tt(t, n = null, e = [], s = [], r = null, i = null, o = null) {
        return new It(t, n, e, s, r, i, o);
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
    class At {
        /**
         * Initializes a Query with a path and optional additional query constraints.
         * Path must currently be empty if this is a collection group query.
         */
        constructor(t, n = null, e = [], s = [], r = null, i = "F" /* First */ , o = null, u = null) {
            this.path = t, this.collectionGroup = n, this.ft = e, this.filters = s, this.limit = r, 
            this.limitType = i, this.startAt = o, this.endAt = u, this.dt = null, 
            // The corresponding `Target` of this `Query` instance.
            this._t = null, this.startAt, this.endAt;
        }
    }

    /** Creates a new Query for a query that matches all documents at `path` */ function Pt(t) {
        return !nt(t.limit) && "L" /* Last */ === t.limitType;
    }

    function Rt(t) {
        return t.ft.length > 0 ? t.ft[0].field : null;
    }

    function Vt(t) {
        for (const n of t.filters) if (n.wt()) return n.field;
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
    function gt(t) {
        return null !== t.collectionGroup;
    }

    /**
     * Returns the implicit order by constraint that is used to execute the Query,
     * which can be different from the order by constraints the user provided (e.g.
     * the SDK and backend always orders by `__name__`).
     */ function vt(t) {
        const n = q(t);
        if (null === n.dt) {
            n.dt = [];
            const t = Vt(n), e = Rt(n);
            if (null !== t && null === e) 
            // In order to implicitly add key ordering, we must also add the
            // inequality filter field for it to be a valid query.
            // Note that the default inequality field and key ordering is ascending.
            t.tt() || n.dt.push(new jt(t)), n.dt.push(new jt(K.nt(), "asc" /* ASCENDING */)); else {
                let t = !1;
                for (const e of n.ft) n.dt.push(e), e.field.tt() && (t = !0);
                if (!t) {
                    // The order of the implicit key ordering always matches the last
                    // explicit order by
                    const t = n.ft.length > 0 ? n.ft[n.ft.length - 1].dir : "asc" /* ASCENDING */;
                    n.dt.push(new jt(K.nt(), t));
                }
            }
        }
        return n.dt;
    }

    /**
     * Converts this `Query` instance to it's corresponding `Target` representation.
     */ function bt(t) {
        const n = q(t);
        if (!n._t) if ("F" /* First */ === n.limitType) n._t = Tt(n.path, n.collectionGroup, vt(n), n.filters, n.limit, n.startAt, n.endAt); else {
            // Flip the orderBy directions since we want the last results
            const t = [];
            for (const e of vt(n)) {
                const n = "desc" /* DESCENDING */ === e.dir ? "asc" /* ASCENDING */ : "desc" /* DESCENDING */;
                t.push(new jt(e.field, n));
            }
            // We need to swap the cursors to match the now-flipped query ordering.
                    const e = n.endAt ? new Ut(n.endAt.position, !n.endAt.before) : null, s = n.startAt ? new Ut(n.startAt.position, !n.startAt.before) : null;
            // Now return as a LimitType.First query.
            n._t = Tt(n.path, n.collectionGroup, t, n.filters, n.limit, e, s);
        }
        return n._t;
    }

    function Nt(t, n) {
        return function(t, n) {
            if (t.limit !== n.limit) return !1;
            if (t.orderBy.length !== n.orderBy.length) return !1;
            for (let e = 0; e < t.orderBy.length; e++) if (!Bt(t.orderBy[e], n.orderBy[e])) return !1;
            if (t.filters.length !== n.filters.length) return !1;
            for (let r = 0; r < t.filters.length; r++) if (e = t.filters[r], s = n.filters[r], 
            e.op !== s.op || !e.field.isEqual(s.field) || !ct(e.value, s.value)) return !1;
            var e, s;
            /** Filter that matches on key fields (i.e. '__name__'). */        return t.collectionGroup === n.collectionGroup && !!t.path.isEqual(n.path) && !!Mt(t.startAt, n.startAt) && Mt(t.endAt, n.endAt);
        }(bt(t), bt(n)) && t.limitType === n.limitType;
    }

    class Dt extends class {} {
        constructor(t, n, e) {
            super(), this.field = t, this.op = n, this.value = e;
        }
        /**
         * Creates a filter based on the provided arguments.
         */    static create(t, n, e) {
            return t.tt() ? "in" /* IN */ === n || "not-in" /* NOT_IN */ === n ? this.yt(t, n, e) : new Ft(t, n, e) : "array-contains" /* ARRAY_CONTAINS */ === n ? new qt(t, e) : "in" /* IN */ === n ? new Ot(t, e) : "not-in" /* NOT_IN */ === n ? new Ct(t, e) : "array-contains-any" /* ARRAY_CONTAINS_ANY */ === n ? new Lt(t, e) : new Dt(t, n, e);
        }
        static yt(t, n, e) {
            return "in" /* IN */ === n ? new $t(t, e) : new St(t, e);
        }
        matches(t) {
            const n = t.field(this.field);
            // Types do not have to match in NOT_EQUAL filters.
                    return "!=" /* NOT_EQUAL */ === this.op ? null !== n && this.Et(ht(n, this.value)) : null !== n && ut(this.value) === ut(n) && this.Et(ht(n, this.value));
            // Only compare types with matching backend order (such as double and int).
            }
        Et(t) {
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
                return S();
            }
        }
        wt() {
            return [ "<" /* LESS_THAN */ , "<=" /* LESS_THAN_OR_EQUAL */ , ">" /* GREATER_THAN */ , ">=" /* GREATER_THAN_OR_EQUAL */ , "!=" /* NOT_EQUAL */ , "not-in" /* NOT_IN */ ].indexOf(this.op) >= 0;
        }
    }

    class Ft extends Dt {
        constructor(t, n, e) {
            super(t, n, e), this.key = J.rt(e.referenceValue);
        }
        matches(t) {
            const n = J.L(t.key, this.key);
            return this.Et(n);
        }
    }

    /** Filter that matches on key fields within an array. */ class $t extends Dt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n), this.keys = xt("in" /* IN */ , n);
        }
        matches(t) {
            return this.keys.some((n => n.isEqual(t.key)));
        }
    }

    /** Filter that matches on key fields not present within an array. */ class St extends Dt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n), this.keys = xt("not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            return !this.keys.some((n => n.isEqual(t.key)));
        }
    }

    function xt(t, n) {
        var e;
        return ((null === (e = n.arrayValue) || void 0 === e ? void 0 : e.values) || []).map((t => J.rt(t.referenceValue)));
    }

    /** A Filter that implements the array-contains operator. */ class qt extends Dt {
        constructor(t, n) {
            super(t, "array-contains" /* ARRAY_CONTAINS */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return mt(n) && at(n.arrayValue, this.value);
        }
    }

    /** A Filter that implements the IN operator. */ class Ot extends Dt {
        constructor(t, n) {
            super(t, "in" /* IN */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return null !== n && at(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the not-in operator. */ class Ct extends Dt {
        constructor(t, n) {
            super(t, "not-in" /* NOT_IN */ , n);
        }
        matches(t) {
            if (at(this.value.arrayValue, {
                nullValue: "NULL_VALUE"
            })) return !1;
            const n = t.field(this.field);
            return null !== n && !at(this.value.arrayValue, n);
        }
    }

    /** A Filter that implements the array-contains-any operator. */ class Lt extends Dt {
        constructor(t, n) {
            super(t, "array-contains-any" /* ARRAY_CONTAINS_ANY */ , n);
        }
        matches(t) {
            const n = t.field(this.field);
            return !(!mt(n) || !n.arrayValue.values) && n.arrayValue.values.some((t => at(this.value.arrayValue, t)));
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
     */ class Ut {
        constructor(t, n) {
            this.position = t, this.before = n;
        }
    }

    function Mt(t, n) {
        if (null === t) return null === n;
        if (null === n) return !1;
        if (t.before !== n.before || t.position.length !== n.position.length) return !1;
        for (let e = 0; e < t.position.length; e++) {
            if (!ct(t.position[e], n.position[e])) return !1;
        }
        return !0;
    }

    /**
     * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
     */ class jt {
        constructor(t, n = "asc" /* ASCENDING */) {
            this.field = t, this.dir = n;
        }
    }

    function Bt(t, n) {
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
     */ var kt, Qt;

    /**
     * Converts an HTTP Status Code to the equivalent error code.
     *
     * @param status - An HTTP Status Code, like 200, 404, 503, etc.
     * @returns The equivalent Code. Unknown status codes are mapped to
     *     Code.UNKNOWN.
     */
    function Wt(t) {
        if (void 0 === t) return F("RPC_ERROR", "HTTP error has no status"), a;
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
            return A;

          case 504:
            // Gateway Timeout
            return l;

          default:
            return t >= 200 && t < 300 ? u : t >= 400 && t < 500 ? p : t >= 500 && t < 600 ? T : a;
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
     */ (Qt = kt || (kt = {}))[Qt.OK = 0] = "OK", Qt[Qt.CANCELLED = 1] = "CANCELLED", 
    Qt[Qt.UNKNOWN = 2] = "UNKNOWN", Qt[Qt.INVALID_ARGUMENT = 3] = "INVALID_ARGUMENT", 
    Qt[Qt.DEADLINE_EXCEEDED = 4] = "DEADLINE_EXCEEDED", Qt[Qt.NOT_FOUND = 5] = "NOT_FOUND", 
    Qt[Qt.ALREADY_EXISTS = 6] = "ALREADY_EXISTS", Qt[Qt.PERMISSION_DENIED = 7] = "PERMISSION_DENIED", 
    Qt[Qt.UNAUTHENTICATED = 16] = "UNAUTHENTICATED", Qt[Qt.RESOURCE_EXHAUSTED = 8] = "RESOURCE_EXHAUSTED", 
    Qt[Qt.FAILED_PRECONDITION = 9] = "FAILED_PRECONDITION", Qt[Qt.ABORTED = 10] = "ABORTED", 
    Qt[Qt.OUT_OF_RANGE = 11] = "OUT_OF_RANGE", Qt[Qt.UNIMPLEMENTED = 12] = "UNIMPLEMENTED", 
    Qt[Qt.INTERNAL = 13] = "INTERNAL", Qt[Qt.UNAVAILABLE = 14] = "UNAVAILABLE", Qt[Qt.DATA_LOSS = 15] = "DATA_LOSS";

    const zt = (() => {
        const t = {
            asc: "ASCENDING",
            desc: "DESCENDING"
        };
        return t;
    })(), Gt = (() => {
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
    class Yt {
        constructor(t, n) {
            this.t = t, this.It = n;
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
    function Ht(t, n) {
        return function(t) {
            return "number" == typeof t && Number.isInteger(t) && !et(t) && t <= Number.MAX_SAFE_INTEGER && t >= Number.MIN_SAFE_INTEGER;
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
            if (t.It) {
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
                doubleValue: et(n) ? "-0" : n
            };
        }(t, n);
    }

    /**
     * Returns a value for a Date that's appropriate to put into a proto.
     */ function Kt(t, n) {
        if (t.It) {
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
    function Jt(t, n) {
        return t.It ? n.toBase64() : n.toUint8Array();
    }

    function Zt(t, n) {
        return Kt(t, n.O());
    }

    function Xt(t) {
        return x(!!t), z.$(function(t) {
            const n = ft(t);
            return new W(n.seconds, n.nanos);
        }(t));
    }

    function tn(t, n) {
        return function(t) {
            return new Y([ "projects", t.projectId, "databases", t.database ]);
        }(t).child("documents").child(n).K();
    }

    function nn(t, n) {
        return tn(t.t, n.path);
    }

    function en(t, n) {
        const e = function(t) {
            const n = Y.J(t);
            return x(wn(n)), n;
        }(n);
        if (e.get(1) !== t.t.projectId) throw new R(h, "Tried to deserialize key from different project: " + e.get(1) + " vs " + t.t.projectId);
        if (e.get(3) !== t.t.database) throw new R(h, "Tried to deserialize key from different database: " + e.get(3) + " vs " + t.t.database);
        return new J((x((s = e).length > 4 && "documents" === s.get(4)), s.M(5)));
        var s;
        /** Creates a Document proto from key and fields (but no create/update time) */}

    function sn(t, n) {
        return tn(t.t, n);
    }

    function rn(t) {
        return new Y([ "projects", t.t.projectId, "databases", t.t.database ]).K();
    }

    function on(t, n, e) {
        return {
            name: nn(t, n),
            fields: e.proto.mapValue.fields
        };
    }

    function un(t, n) {
        return "found" in n ? function(t, n) {
            x(!!n.found), n.found.name, n.found.updateTime;
            const e = en(t, n.found.name), s = Xt(n.found.updateTime), r = new Dn({
                mapValue: {
                    fields: n.found.fields
                }
            });
            return new Sn(e, s, r, {});
        }(t, n) : "missing" in n ? function(t, n) {
            x(!!n.missing), x(!!n.readTime);
            const e = en(t, n.missing), s = Xt(n.readTime);
            return new xn(e, s);
        }(t, n) : S();
    }

    function cn(t, n) {
        let e;
        if (n instanceof Vn) e = {
            update: on(t, n.key, n.value)
        }; else if (n instanceof bn) e = {
            delete: nn(t, n.key)
        }; else if (n instanceof gn) e = {
            update: on(t, n.key, n.data),
            updateMask: _n(n.Tt)
        }; else if (n instanceof vn) e = {
            transform: {
                document: nn(t, n.key),
                fieldTransforms: n.fieldTransforms.map((t => function(t, n) {
                    const e = n.transform;
                    if (e instanceof pn) return {
                        fieldPath: n.field.K(),
                        setToServerValue: "REQUEST_TIME"
                    };
                    if (e instanceof yn) return {
                        fieldPath: n.field.K(),
                        appendMissingElements: {
                            values: e.elements
                        }
                    };
                    if (e instanceof En) return {
                        fieldPath: n.field.K(),
                        removeAllFromArray: {
                            values: e.elements
                        }
                    };
                    if (e instanceof In) return {
                        fieldPath: n.field.K(),
                        increment: e.At
                    };
                    throw S();
                }(0, t)))
            }
        }; else {
            if (!(n instanceof Nn)) return S();
            e = {
                verify: nn(t, n.key)
            };
        }
        return n.Rt.Pt || (e.currentDocument = function(t, n) {
            return void 0 !== n.updateTime ? {
                updateTime: Zt(t, n.updateTime)
            } : void 0 !== n.exists ? {
                exists: n.exists
            } : S();
        }(t, n.Rt)), e;
    }

    function an(t, n) {
        // Dissect the path into parent, collectionId, and optional key filter.
        const e = {
            structuredQuery: {}
        }, s = n.path;
        null !== n.collectionGroup ? (e.parent = sn(t, s), e.structuredQuery.from = [ {
            collectionId: n.collectionGroup,
            allDescendants: !0
        } ]) : (e.parent = sn(t, s.j()), e.structuredQuery.from = [ {
            collectionId: s.k()
        } ]);
        const r = function(t) {
            if (0 === t.length) return;
            const n = t.map((t => 
            // visible for testing
            function(t) {
                if ("==" /* EQUAL */ === t.op) {
                    if (yt(t.value)) return {
                        unaryFilter: {
                            field: dn(t.field),
                            op: "IS_NAN"
                        }
                    };
                    if (pt(t.value)) return {
                        unaryFilter: {
                            field: dn(t.field),
                            op: "IS_NULL"
                        }
                    };
                } else if ("!=" /* NOT_EQUAL */ === t.op) {
                    if (yt(t.value)) return {
                        unaryFilter: {
                            field: dn(t.field),
                            op: "IS_NOT_NAN"
                        }
                    };
                    if (pt(t.value)) return {
                        unaryFilter: {
                            field: dn(t.field),
                            op: "IS_NOT_NULL"
                        }
                    };
                }
                return {
                    fieldFilter: {
                        field: dn(t.field),
                        op: fn(t.op),
                        value: t.value
                    }
                };
            }(t)));
            if (1 === n.length) return n[0];
            return {
                compositeFilter: {
                    op: "AND",
                    filters: n
                }
            };
        }(n.filters);
        r && (e.structuredQuery.where = r);
        const i = function(t) {
            if (0 === t.length) return;
            return t.map((t => 
            // visible for testing
            function(t) {
                return {
                    field: dn(t.field),
                    direction: ln(t.dir)
                };
            }(t)));
        }(n.orderBy);
        i && (e.structuredQuery.orderBy = i);
        const o = function(t, n) {
            return t.It || nt(n) ? n : {
                value: n
            };
        }(t, n.limit);
        return null !== o && (e.structuredQuery.limit = o), n.startAt && (e.structuredQuery.startAt = hn(n.startAt)), 
        n.endAt && (e.structuredQuery.endAt = hn(n.endAt)), e;
    }

    function hn(t) {
        return {
            before: t.before,
            values: t.position
        };
    }

    // visible for testing
    function ln(t) {
        return zt[t];
    }

    // visible for testing
    function fn(t) {
        return Gt[t];
    }

    function dn(t) {
        return {
            fieldPath: t.K()
        };
    }

    function _n(t) {
        const n = [];
        return t.fields.forEach((t => n.push(t.K()))), {
            fieldPaths: n
        };
    }

    function wn(t) {
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
    /** Represents a transform within a TransformMutation. */ class mn {
        constructor() {
            // Make sure that the structural type of `TransformOperation` is unique.
            // See https://github.com/microsoft/TypeScript/issues/5451
            this.Vt = void 0;
        }
    }

    /** Transforms a value into a server-generated timestamp. */ class pn extends mn {}

    /** Transforms an array value via a union operation. */ class yn extends mn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /** Transforms an array value via a remove operation. */ class En extends mn {
        constructor(t) {
            super(), this.elements = t;
        }
    }

    /**
     * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
     * transforms. Converts all field values to integers or doubles, but unlike the
     * backend does not cap integer values at 2^63. Instead, JavaScript number
     * arithmetic is used and precision loss can occur for values greater than 2^53.
     */ class In extends mn {
        constructor(t, n) {
            super(), this.serializer = t, this.At = n;
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
     */ class Tn {
        constructor(t) {
            this.fields = t, 
            // TODO(dimond): validation of FieldMask
            // Sort the field mask to support `FieldMask.isEqual()` and assert below.
            t.sort(K.L);
        }
        /**
         * Verifies that `fieldPath` is included by at least one field in this field
         * mask.
         *
         * This is an O(n) operation, where `n` is the size of the field mask.
         */    gt(t) {
            for (const n of this.fields) if (n.G(t)) return !0;
            return !1;
        }
        isEqual(t) {
            return Q(this.fields, t.fields, ((t, n) => t.isEqual(n)));
        }
    }

    /** A field path and the TransformOperation to perform upon it. */ class An {
        constructor(t, n) {
            this.field = t, this.transform = n;
        }
    }

    /**
     * Encodes a precondition for a mutation. This follows the model that the
     * backend accepts with the special case of an explicit "empty" precondition
     * (meaning no precondition).
     */ class Pn {
        constructor(t, n) {
            this.updateTime = t, this.exists = n;
        }
        /** Creates a new empty Precondition. */    static vt() {
            return new Pn;
        }
        /** Creates a new Precondition with an exists flag. */    static exists(t) {
            return new Pn(void 0, t);
        }
        /** Creates a new Precondition based on a version a document exists at. */    static updateTime(t) {
            return new Pn(t);
        }
        /** Returns whether this Precondition is empty. */    get Pt() {
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
     */ class Rn {}

    /**
     * A mutation that creates or replaces the document at the given key with the
     * object value contents.
     */ class Vn extends Rn {
        constructor(t, n, e) {
            super(), this.key = t, this.value = n, this.Rt = e, this.type = 0 /* Set */;
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
     */ class gn extends Rn {
        constructor(t, n, e, s) {
            super(), this.key = t, this.data = n, this.Tt = e, this.Rt = s, this.type = 1 /* Patch */;
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
     */ class vn extends Rn {
        constructor(t, n) {
            super(), this.key = t, this.fieldTransforms = n, this.type = 2 /* Transform */ , 
            // NOTE: We set a precondition of exists: true as a safety-check, since we
            // always combine TransformMutations with a SetMutation or PatchMutation which
            // (if successful) should end up with an existing document.
            this.Rt = Pn.exists(!0);
        }
    }

    /** A mutation that deletes the document at the given key. */ class bn extends Rn {
        constructor(t, n) {
            super(), this.key = t, this.Rt = n, this.type = 3 /* Delete */;
        }
    }

    /**
     * A mutation that verifies the existence of the document at the given key with
     * the provided precondition.
     *
     * The `verify` operation is only used in Transactions, and this class serves
     * primarily to facilitate serialization into protos.
     */ class Nn extends Rn {
        constructor(t, n) {
            super(), this.key = t, this.Rt = n, this.type = 4 /* Verify */;
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
     */ class Dn {
        constructor(t) {
            this.proto = t;
        }
        static empty() {
            return new Dn({
                mapValue: {}
            });
        }
        /**
         * Returns the value at the given path or null.
         *
         * @param path - the path to search
         * @returns The value at the path or if there it doesn't exist.
         */    field(t) {
            if (t.W()) return this.proto;
            {
                let n = this.proto;
                for (let e = 0; e < t.length - 1; ++e) {
                    if (!n.mapValue.fields) return null;
                    if (n = n.mapValue.fields[t.get(e)], !Et(n)) return null;
                }
                return n = (n.mapValue.fields || {})[t.k()], n || null;
            }
        }
        isEqual(t) {
            return ct(this.proto, t.proto);
        }
    }

    /**
     * An ObjectValueBuilder provides APIs to set and delete fields from an
     * ObjectValue.
     */ class Fn {
        /**
         * @param baseObject - The object to mutate.
         */
        constructor(t = Dn.empty()) {
            this.bt = t, 
            /** A map that contains the accumulated changes in this builder. */
            this.Nt = new Map;
        }
        /**
         * Sets the field to the provided value.
         *
         * @param path - The field path to set.
         * @param value - The value to set.
         * @returns The current Builder instance.
         */    set(t, n) {
            return this.Dt(t, n), this;
        }
        /**
         * Removes the field at the specified path. If there is no field at the
         * specified path, nothing is changed.
         *
         * @param path - The field path to remove.
         * @returns The current Builder instance.
         */    delete(t) {
            return this.Dt(t, null), this;
        }
        /**
         * Adds `value` to the overlay map at `path`. Creates nested map entries if
         * needed.
         */    Dt(t, n) {
            let e = this.Nt;
            for (let n = 0; n < t.length - 1; ++n) {
                const s = t.get(n);
                let r = e.get(s);
                r instanceof Map ? 
                // Re-use a previously created map
                e = r : r && 10 /* ObjectValue */ === ut(r) ? (
                // Convert the existing Protobuf MapValue into a map
                r = new Map(Object.entries(r.mapValue.fields || {})), e.set(s, r), e = r) : (
                // Create an empty map to represent the current nesting level
                r = new Map, e.set(s, r), e = r);
            }
            e.set(t.k(), n);
        }
        /** Returns an ObjectValue with all mutations applied. */    Ft() {
            const t = this.$t(K.Z(), this.Nt);
            return null != t ? new Dn(t) : this.bt;
        }
        /**
         * Applies any overlays from `currentOverlays` that exist at `currentPath`
         * and returns the merged data at `currentPath` (or null if there were no
         * changes).
         *
         * @param currentPath - The path at the current nesting level. Can be set to
         * FieldValue.emptyPath() to represent the root.
         * @param currentOverlays - The overlays at the current nesting level in the
         * same format as `overlayMap`.
         * @returns The merged data at `currentPath` or null if no modifications
         * were applied.
         */    $t(t, n) {
            let e = !1;
            const s = this.bt.field(t), r = Et(s) ? // If there is already data at the current path, base our
            Object.assign({}, s.mapValue.fields) : {};
            return n.forEach(((n, s) => {
                if (n instanceof Map) {
                    const i = this.$t(t.child(s), n);
                    null != i && (r[s] = i, e = !0);
                } else null !== n ? (r[s] = n, e = !0) : r.hasOwnProperty(s) && (delete r[s], e = !0);
            })), e ? {
                mapValue: {
                    fields: r
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
     */ class $n {
        constructor(t, n) {
            this.key = t, this.version = n;
        }
    }

    /**
     * Represents a document in Firestore with a key, version, data and whether the
     * data has local mutations applied to it.
     */ class Sn extends $n {
        constructor(t, n, e, s) {
            super(t, n), this.St = e, this.xt = !!s.xt, this.hasCommittedMutations = !!s.hasCommittedMutations;
        }
        field(t) {
            return this.St.field(t);
        }
        data() {
            return this.St;
        }
        qt() {
            return this.St.proto;
        }
        isEqual(t) {
            return t instanceof Sn && this.key.isEqual(t.key) && this.version.isEqual(t.version) && this.xt === t.xt && this.hasCommittedMutations === t.hasCommittedMutations && this.St.isEqual(t.St);
        }
        toString() {
            return `Document(${this.key}, ${this.version}, ${this.St.toString()}, {hasLocalMutations: ${this.xt}}), {hasCommittedMutations: ${this.hasCommittedMutations}})`;
        }
        get hasPendingWrites() {
            return this.xt || this.hasCommittedMutations;
        }
    }

    /**
     * A class representing a deleted document.
     * Version is set to 0 if we don't point to any specific time, otherwise it
     * denotes time we know it didn't exist at.
     */ class xn extends $n {
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
            return t instanceof xn && t.hasCommittedMutations === this.hasCommittedMutations && t.version.isEqual(this.version) && t.key.isEqual(this.key);
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
     */ class qn {
        constructor() {
            this.promise = new Promise(((t, n) => {
                this.resolve = t, this.reject = n;
            }));
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
    class On {
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
         */ , s = 1.5
        /**
         * The maximum base delay after which no further backoff is performed.
         * Note that jitter will still be applied, so the actual delay could be as
         * much as 1.5*maxDelayMs.
         */ , r = 6e4) {
            this.Ot = t, this.Ct = n, this.Lt = e, this.Ut = s, this.Mt = r, this.jt = 0, this.Bt = null, 
            /** The last backoff attempt, as epoch milliseconds. */
            this.kt = Date.now(), this.reset();
        }
        /**
         * Resets the backoff delay.
         *
         * The very next backoffAndWait() will have no delay. If it is called again
         * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
         * subsequent ones will increase according to the backoffFactor.
         */    reset() {
            this.jt = 0;
        }
        /**
         * Resets the backoff delay to the maximum delay (e.g. for use after a
         * RESOURCE_EXHAUSTED error).
         */    Qt() {
            this.jt = this.Mt;
        }
        /**
         * Returns a promise that resolves after currentDelayMs, and increases the
         * delay for any subsequent attempts. If there was a pending backoff operation
         * already, it will be canceled.
         */    Wt(t) {
            // Cancel any pending backoff operation.
            this.cancel();
            // First schedule using the current base (which may be 0 and should be
            // honored as such).
            const n = Math.floor(this.jt + this.zt()), e = Math.max(0, Date.now() - this.kt), s = Math.max(0, n - e);
            // Guard against lastAttemptTime being in the future due to a clock change.
                    s > 0 && D("ExponentialBackoff", `Backing off for ${s} ms (base delay: ${this.jt} ms, delay with jitter: ${n} ms, last attempt: ${e} ms ago)`), 
            this.Bt = this.Ot.Gt(this.Ct, s, (() => (this.kt = Date.now(), t()))), 
            // Apply backoff factor to determine next delay and ensure it is within
            // bounds.
            this.jt *= this.Ut, this.jt < this.Lt && (this.jt = this.Lt), this.jt > this.Mt && (this.jt = this.Mt);
        }
        Yt() {
            null !== this.Bt && (this.Bt.Ht(), this.Bt = null);
        }
        cancel() {
            null !== this.Bt && (this.Bt.cancel(), this.Bt = null);
        }
        /** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */    zt() {
            return (Math.random() - .5) * this.jt;
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
    function Cn() {
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
    class Ln {
        constructor(t, n, e, s, r) {
            this.Kt = t, this.Ct = n, this.Jt = e, this.op = s, this.Zt = r, this.Xt = new qn, 
            this.then = this.Xt.promise.then.bind(this.Xt.promise), 
            // It's normal for the deferred promise to be canceled (due to cancellation)
            // and so we attach a dummy catch callback to avoid
            // 'UnhandledPromiseRejectionWarning' log spam.
            this.Xt.promise.catch((t => {}));
        }
        /**
         * Creates and returns a DelayedOperation that has been scheduled to be
         * executed on the provided asyncQueue after the provided delayMs.
         *
         * @param asyncQueue - The queue to schedule the operation on.
         * @param id - A Timer ID identifying the type of operation this is.
         * @param delayMs - The delay (ms) before the operation should be scheduled.
         * @param op - The operation to run.
         * @param removalCallback - A callback to be called synchronously once the
         *   operation is executed or canceled, notifying the AsyncQueue to remove it
         *   from its delayedOperations list.
         *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
         *   the DelayedOperation class public.
         */    static tn(t, n, e, s, r) {
            const i = Date.now() + e, o = new Ln(t, n, i, s, r);
            return o.start(e), o;
        }
        /**
         * Starts the timer. This is called immediately after construction by
         * createAndSchedule().
         */    start(t) {
            this.nn = setTimeout((() => this.en()), t);
        }
        /**
         * Queues the operation to run immediately (if it hasn't already been run or
         * canceled).
         */    Ht() {
            return this.en();
        }
        /**
         * Cancels the operation if it hasn't already been executed or canceled. The
         * promise will be rejected.
         *
         * As long as the operation has not yet been run, calling cancel() provides a
         * guarantee that the operation will not be run.
         */    cancel(t) {
            null !== this.nn && (this.clearTimeout(), this.Xt.reject(new R(c, "Operation cancelled" + (t ? ": " + t : ""))));
        }
        en() {
            this.Kt.sn((() => null !== this.nn ? (this.clearTimeout(), this.op().then((t => this.Xt.resolve(t)))) : Promise.resolve()));
        }
        clearTimeout() {
            null !== this.nn && (this.Zt(this), clearTimeout(this.nn), this.nn = null);
        }
    }

    class Un {
        constructor() {
            // The last promise in the queue.
            this.rn = Promise.resolve(), 
            // A list of retryable operations. Retryable operations are run in order and
            // retried with backoff.
            this.on = [], 
            // Is this AsyncQueue being shut down? Once it is set to true, it will not
            // be changed again.
            this.un = !1, 
            // Operations scheduled to be queued in the future. Operations are
            // automatically removed after they are run or canceled.
            this.cn = [], 
            // visible for testing
            this.an = null, 
            // Flag set while there's an outstanding AsyncQueue operation, used for
            // assertion sanity-checks.
            this.hn = !1, 
            // List of TimerIds to fast-forward delays for.
            this.ln = [], 
            // Backoff timer used to schedule retries for retryable operations
            this.fn = new On(this, "async_queue_retry" /* AsyncQueueRetry */), 
            // Visibility handler that triggers an immediate retry of all retryable
            // operations. Meant to speed up recovery when we regain file system access
            // after page comes into foreground.
            this.dn = () => {
                const t = Cn();
                t && D("AsyncQueue", "Visibility state changed to " + t.visibilityState), this.fn.Yt();
            };
            const t = Cn();
            t && "function" == typeof t.addEventListener && t.addEventListener("visibilitychange", this.dn);
        }
        // Is this AsyncQueue being shut down? If true, this instance will not enqueue
        // any new operations, Promises from enqueue requests will not resolve.
        get _n() {
            return this.un;
        }
        /**
         * Adds a new operation to the queue without waiting for it to complete (i.e.
         * we ignore the Promise result).
         */    sn(t) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.enqueue(t);
        }
        /**
         * Regardless if the queue has initialized shutdown, adds a new operation to the
         * queue without waiting for it to complete (i.e. we ignore the Promise result).
         */    wn(t) {
            this.mn(), 
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            this.pn(t);
        }
        /**
         * Initialize the shutdown of this queue. Once this method is called, the
         * only possible way to request running an operation is through
         * `enqueueEvenWhileRestricted()`.
         */    yn() {
            if (!this.un) {
                this.un = !0;
                const t = Cn();
                t && "function" == typeof t.removeEventListener && t.removeEventListener("visibilitychange", this.dn);
            }
        }
        /**
         * Adds a new operation to the queue. Returns a promise that will be resolved
         * when the promise returned by the new operation is (with its value).
         */    enqueue(t) {
            return this.mn(), this.un ? new Promise((t => {})) : this.pn(t);
        }
        /**
         * Enqueue a retryable operation.
         *
         * A retryable operation is rescheduled with backoff if it fails with a
         * IndexedDbTransactionError (the error type used by SimpleDb). All
         * retryable operations are executed in order and only run if all prior
         * operations were retried successfully.
         */    En(t) {
            this.sn((() => (this.on.push(t), this.In())));
        }
        /**
         * Runs the next operation from the retryable queue. If the operation fails,
         * reschedules with backoff.
         */    async In() {
            if (0 !== this.on.length) {
                try {
                    await this.on[0](), this.on.shift(), this.fn.reset();
                } catch (t) {
                    if (!function(t) {
                        // Use name equality, as instanceof checks on errors don't work with errors
                        // that wrap other errors.
                        return "IndexedDbTransactionError" === t.name;
                    }(t)) throw t;
     // Failure will be handled by AsyncQueue
                                    D("AsyncQueue", "Operation failed with retryable error: " + t);
                }
                this.on.length > 0 && 
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
                this.fn.Wt((() => this.In()));
            }
        }
        pn(t) {
            const n = this.rn.then((() => (this.hn = !0, t().catch((t => {
                this.an = t, this.hn = !1;
                // Re-throw the error so that this.tail becomes a rejected Promise and
                // all further attempts to chain (via .then) will just short-circuit
                // and return the rejected Promise.
                throw F("INTERNAL UNHANDLED ERROR: ", 
                /**
     * Chrome includes Error.message in Error.stack. Other browsers do not.
     * This returns expected output of message + stack when available.
     * @param error - Error or FirestoreError
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
            })).then((t => (this.hn = !1, t))))));
            return this.rn = n, n;
        }
        /**
         * Schedules an operation to be queued on the AsyncQueue once the specified
         * `delayMs` has elapsed. The returned DelayedOperation can be used to cancel
         * or fast-forward the operation prior to its running.
         */    Gt(t, n, e) {
            this.mn(), 
            // Fast-forward delays for timerIds that have been overriden.
            this.ln.indexOf(t) > -1 && (n = 0);
            const s = Ln.tn(this, t, n, e, (t => this.Tn(t)));
            return this.cn.push(s), s;
        }
        mn() {
            this.an && S();
        }
        /**
         * Verifies there's an operation currently in-progress on the AsyncQueue.
         * Unfortunately we can't verify that the running code is in the promise chain
         * of that operation, so this isn't a foolproof check, but it should be enough
         * to catch some bugs.
         */    An() {}
        /**
         * Waits until all currently queued tasks are finished executing. Delayed
         * operations are not run.
         */    async Pn() {
            // Operations in the queue prior to draining may have enqueued additional
            // operations. Keep draining the queue until the tail is no longer advanced,
            // which indicates that no more new operations were enqueued and that all
            // operations were executed.
            let t;
            do {
                t = this.rn, await t;
            } while (t !== this.rn);
        }
        /**
         * For Tests: Determine if a delayed operation with a particular TimerId
         * exists.
         */    Rn(t) {
            for (const n of this.cn) if (n.Ct === t) return !0;
            return !1;
        }
        /**
         * For Tests: Runs some or all delayed operations early.
         *
         * @param lastTimerId - Delayed operations up to and including this TimerId
         * will be drained. Pass TimerId.All to run all delayed operations.
         * @returns a Promise that resolves once all operations have been run.
         */    Vn(t) {
            // Note that draining may generate more delayed ops, so we do that first.
            return this.Pn().then((() => {
                // Run ops in the same order they'd run if they ran naturally.
                this.cn.sort(((t, n) => t.Jt - n.Jt));
                for (const n of this.cn) if (n.Ht(), "all" /* All */ !== t && n.Ct === t) break;
                return this.Pn();
            }));
        }
        /**
         * For Tests: Skip all subsequent delays for a timer id.
         */    gn(t) {
            this.ln.push(t);
        }
        /** Called once a DelayedOperation is run or canceled. */    Tn(t) {
            // NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
            const n = this.cn.indexOf(t);
            this.cn.splice(n, 1);
        }
    }

    /**
     * An implementation of Datastore that exposes additional state for internal
     * consumption.
     */
    class Mn extends class {} {
        constructor(t, n, e) {
            super(), this.credentials = t, this.vn = n, this.serializer = e, this.bn = !1;
        }
        Nn() {
            if (this.bn) throw new R(p, "The client has already been terminated.");
        }
        /** Gets an auth token and invokes the provided RPC. */    Dn(t, n, e) {
            return this.Nn(), this.credentials.getToken().then((s => this.vn.Dn(t, n, e, s))).catch((t => {
                throw t.code === w && this.credentials.I(), t;
            }));
        }
        /** Gets an auth token and invokes the provided RPC with streamed results. */    Fn(t, n, e) {
            return this.Nn(), this.credentials.getToken().then((s => this.vn.Fn(t, n, e, s))).catch((t => {
                throw t.code === w && this.credentials.I(), t;
            }));
        }
        terminate() {
            this.bn = !1;
        }
    }

    // TODO(firestorexp): Make sure there is only one Datastore instance per
    // firestore-exp client.
    async function jn(t, n) {
        const e = q(t), s = rn(e.serializer) + "/documents", r = {
            writes: n.map((t => cn(e.serializer, t)))
        };
        await e.Dn("Commit", s, r);
    }

    async function Bn(t, n) {
        const e = q(t), s = rn(e.serializer) + "/documents", r = {
            documents: n.map((t => nn(e.serializer, t)))
        }, i = await e.Fn("BatchGetDocuments", s, r), o = new Map;
        i.forEach((t => {
            const n = un(e.serializer, t);
            o.set(n.key.toString(), n);
        }));
        const u = [];
        return n.forEach((t => {
            const n = o.get(t.toString());
            x(!!n), u.push(n);
        })), u;
    }

    async function kn(t, n) {
        const e = q(t), s = an(e.serializer, bt(n));
        return (await e.Fn("RunQuery", s.parent, {
            structuredQuery: s.structuredQuery
        })).filter((t => !!t.document)).map((t => function(t, n, e) {
            const s = en(t, n.name), r = Xt(n.updateTime), i = new Dn({
                mapValue: {
                    fields: n.fields
                }
            });
            return new Sn(s, r, i, {
                hasCommittedMutations: !!e
            });
        }(e.serializer, t.document, void 0)));
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
     */ const Qn = {
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
    class Wn extends 
    /**
     * Base class for all Rest-based connections to the backend (WebChannel and
     * HTTP).
     */
    class {
        constructor(t) {
            this.$n = t, this.t = t.t;
            const n = t.ssl ? "https" : "http";
            this.Sn = n + "://" + t.host, this.xn = "projects/" + this.t.projectId + "/databases/" + this.t.database + "/documents";
        }
        Dn(t, n, e, s) {
            const r = this.qn(t, n);
            D("RestConnection", "Sending: ", r, e);
            const i = {};
            return this.On(i, s), this.Cn(t, r, i, e).then((t => (D("RestConnection", "Received: ", t), 
            t)), (n => {
                throw function(t, ...n) {
                    if (b.logLevel <= LogLevel.WARN) {
                        const e = n.map($);
                        b.warn("Firestore (8.1.1): " + t, ...e);
                    }
                }("RestConnection", t + " failed with error: ", n, "url: ", r, "request:", e), n;
            }));
        }
        Fn(t, n, e, s) {
            // The REST API automatically aggregates all of the streamed results, so we
            // can just use the normal invoke() method.
            return this.Dn(t, n, e, s);
        }
        /**
         * Modifies the headers for a request, adding any authorization token if
         * present and any additional headers for the request.
         */    On(t, n) {
            if (t["X-Goog-Api-Client"] = "gl-js/ fire/8.1.1", 
            // Content-Type: text/plain will avoid preflight requests which might
            // mess with CORS and redirects by proxies. If we add custom headers
            // we will need to change this code to potentially use the $httpOverwrite
            // parameter supported by ESF to avoid triggering preflight requests.
            t["Content-Type"] = "text/plain", n) for (const e in n.m) n.m.hasOwnProperty(e) && (t[e] = n.m[e]);
        }
        qn(t, n) {
            const e = Qn[t];
            return `${this.Sn}/v1/${n}:${e}`;
        }
    } {
        /**
         * @param databaseInfo - The connection info.
         * @param fetchImpl - `fetch` or a Polyfill that implements the fetch API.
         */
        constructor(t, n) {
            super(t), this.Ln = n;
        }
        Un(t, n) {
            throw new Error("Not supported by FetchConnection");
        }
        async Cn(t, n, e, s) {
            const r = JSON.stringify(s);
            let i;
            try {
                i = await this.Ln(n, {
                    method: "POST",
                    headers: e,
                    body: r
                });
            } catch (t) {
                throw new R(Wt(t.status), "Request failed with error: " + t.statusText);
            }
            if (!i.ok) throw new R(Wt(i.status), "Request failed with error: " + i.statusText);
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
    function zn(t) {
        return new Yt(t, /* useProto3Json= */ !0);
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
     */ const Gn = new Map;

    // The components module manages the lifetime of dependencies of the Firestore
    // client. Dependencies can be lazily constructed and only one exists per
    // Firestore instance.
    /**
     * An instance map that ensures only one Datastore exists per Firestore
     * instance.
     */
    /**
     * Returns an initialized and started Datastore for the given Firestore
     * instance. Callers must invoke removeComponents() when the Firestore
     * instance is terminated.
     */
    function Yn(t) {
        if (t.Mn) throw new R(p, "The client has already been terminated.");
        if (!Gn.has(t)) {
            D("ComponentProvider", "Initializing Datastore");
            const r = function(t) {
                return new Wn(t, fetch.bind(null));
            }((n = t.jn, e = t.Bn, s = t.kn(), new V(n, e, s.host, s.ssl, s.experimentalForceLongPolling, s.experimentalAutoDetectLongPolling))), i = zn(t.jn), o = function(t, n, e) {
                return new Mn(t, n, e);
            }(t.Qn, r, i);
            Gn.set(t, o);
        }
        var n, e, s;
        return Gn.get(t);
    }

    /**
     * Removes all components associated with the provided instance. Must be called
     * when the `Firestore` instance is terminated.
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
    function Hn(t, n, e) {
        if (!e) throw new R(h, `Function ${t}() cannot be called with an empty ${n}.`);
    }

    /**
     * Validates that two boolean options are not set at the same time.
     */
    /**
     * Validates that `path` refers to a document (indicated by the fact it contains
     * an even numbers of segments).
     */
    function Kn(t) {
        if (!J.ot(t)) throw new R(h, `Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Validates that `path` refers to a collection (indicated by the fact it
     * contains an odd numbers of segments).
     */ function Jn(t) {
        if (J.ot(t)) throw new R(h, `Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`);
    }

    /**
     * Returns true if it's a non-null object without a custom prototype
     * (i.e. excludes Array, Date, etc.).
     */
    /** Returns a string describing the type / value of the provided input. */
    function Zn(t) {
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
     * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
     * underlying instance. Throws if  `obj` is not an instance of `T`.
     *
     * This cast is used in the Lite and Full SDK to verify instance types for
     * arguments passed to the public API.
     */ (t);
                return n ? `a custom ${n} object` : "an object";
            }
        }
        return "function" == typeof t ? "a function" : S();
    }

    function Xn(t, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    n) {
        if ("_delegate" in t && (
        // Unwrap Compat types
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        t = t.Wn), !(t instanceof n)) {
            if (n.name === t.constructor.name) throw new R(h, "Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");
            {
                const e = Zn(t);
                throw new R(h, `Expected type '${n.name}', but it was: ${e}`);
            }
        }
        return t;
    }

    function te(t, n) {
        if (n <= 0) throw new R(h, `Function ${t}() requires a positive number, but it was: ${n}.`);
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
    // settings() defaults:
    /**
     * A concrete type describing all the values that can be applied via a
     * user-supplied firestore.Settings object. This is a separate type so that
     * defaults can be supplied and the value can be checked for equality.
     */
    class ne {
        constructor(t) {
            var n;
            if (void 0 === t.host) {
                if (void 0 !== t.ssl) throw new R(h, "Can't provide ssl option if host option is not set");
                this.host = "firestore.googleapis.com", this.ssl = true;
            } else this.host = t.host, this.ssl = null === (n = t.ssl) || void 0 === n || n;
            if (this.credentials = t.credentials, this.ignoreUndefinedProperties = !!t.ignoreUndefinedProperties, 
            void 0 === t.cacheSizeBytes) this.cacheSizeBytes = 41943040; else {
                if (-1 !== t.cacheSizeBytes && t.cacheSizeBytes < 1048576) throw new R(h, "cacheSizeBytes must be at least 1048576");
                this.cacheSizeBytes = t.cacheSizeBytes;
            }
            this.experimentalForceLongPolling = !!t.experimentalForceLongPolling, this.experimentalAutoDetectLongPolling = !!t.experimentalAutoDetectLongPolling, 
            function(t, n, e, s) {
                if (!0 === n && !0 === s) throw new R(h, `${t} and ${e} cannot be used together.`);
            }("experimentalForceLongPolling", t.experimentalForceLongPolling, "experimentalAutoDetectLongPolling", t.experimentalAutoDetectLongPolling);
        }
        isEqual(t) {
            return this.host === t.host && this.ssl === t.ssl && this.credentials === t.credentials && this.cacheSizeBytes === t.cacheSizeBytes && this.experimentalForceLongPolling === t.experimentalForceLongPolling && this.experimentalAutoDetectLongPolling === t.experimentalAutoDetectLongPolling && this.ignoreUndefinedProperties === t.ignoreUndefinedProperties;
        }
    }

    /**
     * The Cloud Firestore service interface.
     *
     * Do not call this constructor directly. Instead, use {@link getFirestore}.
     */ class ee {
        /** @hideconstructor */
        constructor(t, n) {
            this.Bn = "(lite)", this.zn = new ne({}), this.Gn = !1, t instanceof g ? (this.jn = t, 
            this.Qn = new C) : (this.Yn = t, this.jn = function(t) {
                if (!Object.prototype.hasOwnProperty.apply(t.options, [ "projectId" ])) throw new R(h, '"projectId" not provided in firebase.initializeApp.');
                return new g(t.options.projectId);
            }
            /**
     * Initializes a new instance of Cloud Firestore with the provided settings.
     * Can only be called before any other functions, including
     * {@link getFirestore}. If the custom settings are empty, this function is
     * equivalent to calling {@link getFirestore}.
     *
     * @param app - The {@link FirebaseApp} with which the `Firestore` instance will
     * be associated.
     * @param settings - A settings object to configure the `Firestore` instance.
     * @returns A newly initialized Firestore instance.
     */ (t), this.Qn = new L(n));
        }
        /**
         * The {@link FirebaseApp} associated with this `Firestore` service
         * instance.
         */    get app() {
            if (!this.Yn) throw new R(p, "Firestore was not initialized using the Firebase SDK. 'app' is not available");
            return this.Yn;
        }
        get Hn() {
            return this.Gn;
        }
        get Mn() {
            return void 0 !== this.Kn;
        }
        Jn(t) {
            if (this.Gn) throw new R(p, "Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");
            this.zn = new ne(t), void 0 !== t.credentials && (this.Qn = function(t) {
                if (!t) return new C;
                switch (t.type) {
                  case "gapi":
                    const n = t.client;
                    // Make sure this really is a Gapi client.
                                    return x(!("object" != typeof n || null === n || !n.auth || !n.auth.getAuthHeaderValueForFirstParty)), 
                    new M(n, t.sessionIndex || "0");

                  case "provider":
                    return t.client;

                  default:
                    throw new R(h, "makeCredentialsProvider failed due to invalid credential type");
                }
            }(t.credentials));
        }
        Zn() {
            return this.zn;
        }
        kn() {
            return this.Gn = !0, this.zn;
        }
        _delete() {
            return this.Kn || (this.Kn = this.Xn()), this.Kn;
        }
        /**
         * Terminates all components used by this client. Subclasses can override
         * this method to clean up their own dependencies, but must also call this
         * method.
         *
         * Only ever called once.
         */    Xn() {
            return function(t) {
                const n = Gn.get(t);
                n && (D("ComponentProvider", "Removing Datastore"), Gn.delete(t), n.terminate());
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
     */ (this), Promise.resolve();
        }
    }

    function se(n, e) {
        const s = app._getProvider(n, "firestore/lite").getImmediate();
        return s.Jn(e), s;
    }

    /**
     * Returns the existing instance of Firestore that is associated with the
     * provided {@link FirebaseApp}. If no instance exists, initializes a new
     * instance with default settings.
     *
     * @param app - The {@link FirebaseApp} instance that the returned Firestore
     * instance is associated with.
     * @returns The `Firestore` instance of the provided app.
     */ function re(n) {
        return app._getProvider(n, "firestore/lite").getImmediate();
    }

    /**
     * Terminates the provided Firestore instance.
     *
     * After calling `terminate()` only the `clearIndexedDbPersistence()` functions
     * may be used. Any other function will throw a `FirestoreError`. Termination
     * does not cancel any pending writes, and any promises that are awaiting a
     * response from the server will not be resolved.
     *
     * To restart after termination, create a new instance of FirebaseFirestore with
     * {@link getFirestore}.
     *
     * Note: Under normal circumstances, calling `terminate()` is not required. This
     * function is useful only when you want to force this instance to release all of
     * its resources or in combination with {@link clearIndexedDbPersistence} to
     * ensure that all local state is destroyed between test runs.
     *
     * @returns A promise that is resolved when the instance has been successfully
     * terminated.
     */ function ie(t) {
        return t = Xn(t, ee), app._removeServiceInstance(t.app, "firestore/lite"), t._delete();
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
     * Sentinel values that can be used when writing document fields with `set()`
     * or `update()`.
     */
    class oe {
        /**
         * @param _methodName - The public API endpoint that returns this class.
         */
        constructor(t) {
            this._methodName = t;
        }
    }

    /**
     * Returns a sentinel for use with {@link updateDoc} or
     * {@link setDoc} with `{merge: true}` to mark a field for deletion.
     */ function ue() {
        return new fe("deleteField");
    }

    /**
     * Returns a sentinel used with {@link setDoc} or {@link updateDoc} to
     * include a server-generated timestamp in the written data.
     */ function ce() {
        return new _e("serverTimestamp");
    }

    /**
     * Returns a special value that can be used with {@link setDoc} or {@link
     * updateDoc} that tells the server to union the given elements with any array
     * value that already exists on the server. Each specified element that doesn't
     * already exist in the array will be added to the end. If the field being
     * modified is not already an array it will be overwritten with an array
     * containing exactly the specified elements.
     *
     * @param elements - The elements to union into the array.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`.
     */ function ae(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new we("arrayUnion", t);
    }

    /**
     * Returns a special value that can be used with {@link (setDoc:1)} or {@link
     * updateDoc} that tells the server to remove the given elements from any
     * array value that already exists on the server. All instances of each element
     * specified will be removed from the array. If the field being modified is not
     * already an array it will be overwritten with an empty array.
     *
     * @param elements - The elements to remove from the array.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`
     */ function he(...t) {
        // NOTE: We don't actually parse the data until it's used in set() or
        // update() since we'd need the Firestore instance to do this.
        return new me("arrayRemove", t);
    }

    /**
     * Returns a special value that can be used with {@link setDoc} or {@link
     * updateDoc} that tells the server to increment the field's current value by
     * the given value.
     *
     * If either the operand or the current field value uses floating point
     * precision, all arithmetic follows IEEE 754 semantics. If both values are
     * integers, values outside of JavaScript's safe number range
     * (`Number.MIN_SAFE_INTEGER` to `Number.MAX_SAFE_INTEGER`) are also subject to
     * precision loss. Furthermore, once processed by the Firestore backend, all
     * integer operations are capped between -2^63 and 2^63-1.
     *
     * If the current field value is not of type `number`, or if the field does not
     * yet exist, the transformation sets the field to the given value.
     *
     * @param n - The value to increment by.
     * @returns The `FieldValue` sentinel for use in a call to `setDoc()` or
     * `updateDoc()`
     */ function le(t) {
        return new pe("increment", t);
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
     */ class fe extends oe {
        te(t) {
            if (2 /* MergeSet */ !== t.ne) throw 1 /* Update */ === t.ne ? t.ee(this._methodName + "() can only appear at the top level of your update data") : t.ee(this._methodName + "() cannot be used with set() unless you pass {merge:true}");
            // No transform to add for a delete, but we need to add it to our
            // fieldMask so it gets deleted.
            return t.Tt.push(t.path), null;
        }
        isEqual(t) {
            return t instanceof fe;
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
     * @param fieldValue - The sentinel FieldValue for which to create a child
     *     context.
     * @param context - The parent context.
     * @param arrayElement - Whether or not the FieldValue has an array.
     */ function de(t, n, e) {
        return new ve({
            ne: 3 /* Argument */ ,
            se: n.settings.se,
            methodName: t._methodName,
            re: e
        }, n.t, n.serializer, n.ignoreUndefinedProperties);
    }

    class _e extends oe {
        te(t) {
            return new An(t.path, new pn);
        }
        isEqual(t) {
            return t instanceof _e;
        }
    }

    class we extends oe {
        constructor(t, n) {
            super(t), this.ie = n;
        }
        te(t) {
            const n = de(this, t, 
            /*array=*/ !0), e = this.ie.map((t => Se(t, n))), s = new yn(e);
            return new An(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class me extends oe {
        constructor(t, n) {
            super(t), this.ie = n;
        }
        te(t) {
            const n = de(this, t, 
            /*array=*/ !0), e = this.ie.map((t => Se(t, n))), s = new En(e);
            return new An(t.path, s);
        }
        isEqual(t) {
            // TODO(mrschmidt): Implement isEquals
            return this === t;
        }
    }

    class pe extends oe {
        constructor(t, n) {
            super(t), this.oe = n;
        }
        te(t) {
            const n = new In(t.serializer, Ht(t.serializer, this.oe));
            return new An(t.path, n);
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
     * An immutable object representing a geographic location in Firestore. The
     * location is represented as latitude/longitude pair.
     *
     * Latitude values are in the range of [-90, 90].
     * Longitude values are in the range of [-180, 180].
     */ class ye {
        /**
         * Creates a new immutable `GeoPoint` object with the provided latitude and
         * longitude values.
         * @param latitude - The latitude as number between -90 and 90.
         * @param longitude - The longitude as number between -180 and 180.
         */
        constructor(t, n) {
            if (!isFinite(t) || t < -90 || t > 90) throw new R(h, "Latitude must be a number between -90 and 90, but was: " + t);
            if (!isFinite(n) || n < -180 || n > 180) throw new R(h, "Longitude must be a number between -180 and 180, but was: " + n);
            this.ue = t, this.ce = n;
        }
        /**
         * The latitude of this `GeoPoint` instance.
         */    get latitude() {
            return this.ue;
        }
        /**
         * The longitude of this `GeoPoint` instance.
         */    get longitude() {
            return this.ce;
        }
        /**
         * Returns true if this `GeoPoint` is equal to the provided one.
         *
         * @param other - The `GeoPoint` to compare against.
         * @returns true if this `GeoPoint` is equal to the provided one.
         */    isEqual(t) {
            return this.ue === t.ue && this.ce === t.ce;
        }
        toJSON() {
            return {
                latitude: this.ue,
                longitude: this.ce
            };
        }
        /**
         * Actually private to JS consumers of our API, so this function is prefixed
         * with an underscore.
         */    F(t) {
            return k(this.ue, t.ue) || k(this.ce, t.ce);
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
     * An immutable object representing an array of bytes.
     */ class Ee {
        /** @hideconstructor */
        constructor(t) {
            this.ae = t;
        }
        /**
         * Creates a new `Bytes` object from the given Base64 string, converting it to
         * bytes.
         *
         * @param base64 - The Base64 string used to create the `Bytes` object.
         */    static fromBase64String(t) {
            try {
                return new Ee(tt.fromBase64String(t));
            } catch (t) {
                throw new R(h, "Failed to construct data from Base64 string: " + t);
            }
        }
        /**
         * Creates a new `Bytes` object from the given Uint8Array.
         *
         * @param array - The Uint8Array used to create the `Bytes` object.
         */    static fromUint8Array(t) {
            return new Ee(tt.fromUint8Array(t));
        }
        /**
         * Returns the underlying bytes as a Base64-encoded string.
         *
         * @returns The Base64-encoded string created from the `Bytes` object.
         */    toBase64() {
            return this.ae.toBase64();
        }
        /**
         * Returns the underlying bytes in a new `Uint8Array`.
         *
         * @returns The Uint8Array created from the `Bytes` object.
         */    toUint8Array() {
            return this.ae.toUint8Array();
        }
        /**
         * Returns a string representation of the `Bytes` object.
         *
         * @returns A string representation of the `Bytes` object.
         */    toString() {
            return "Bytes(base64: " + this.toBase64() + ")";
        }
        /**
         * Returns true if this `Bytes` object is equal to the provided one.
         *
         * @param other - The `Bytes` object to compare against.
         * @returns true if this `Bytes` object is equal to the provided one.
         */    isEqual(t) {
            return this.ae.isEqual(t.ae);
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
     */ class Ie {
        constructor(t) {
            this.Wn = t;
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
     * A `FieldPath` refers to a field in a document. The path may consist of a
     * single field name (referring to a top-level field in the document), or a
     * list of field names (referring to a nested field in the document).
     *
     * Create a `FieldPath` by providing field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     */ class Te {
        /**
         * Creates a FieldPath from the provided field names. If more than one field
         * name is provided, the path will point to a nested field in a document.
         *
         * @param fieldNames - A list of field names.
         */
        constructor(...t) {
            for (let n = 0; n < t.length; ++n) if (0 === t[n].length) throw new R(h, "Invalid field name at argument $(i + 1). Field names must not be empty.");
            this.he = new K(t);
        }
        /**
         * Returns true if this `FieldPath` is equal to the provided one.
         *
         * @param other - The `FieldPath` to compare against.
         * @returns true if this `FieldPath` is equal to the provided one.
         */    isEqual(t) {
            return this.he.isEqual(t.he);
        }
    }

    /**
     * Returns a special sentinel `FieldPath` to refer to the ID of a document.
     * It can be used in queries to sort or filter by the document ID.
     */ function Ae() {
        return new Te("__name__");
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
     */ const Pe = /^__.*__$/;

    /** The result of parsing document data (e.g. for a setData call). */ class Re {
        constructor(t, n, e) {
            this.data = t, this.Tt = n, this.fieldTransforms = e;
        }
        le(t, n) {
            const e = [];
            return null !== this.Tt ? e.push(new gn(t, this.data, this.Tt, n)) : e.push(new Vn(t, this.data, n)), 
            this.fieldTransforms.length > 0 && e.push(new vn(t, this.fieldTransforms)), e;
        }
    }

    /** The result of parsing "update" data (i.e. for an updateData call). */ class Ve {
        constructor(t, n, e) {
            this.data = t, this.Tt = n, this.fieldTransforms = e;
        }
        le(t, n) {
            const e = [ new gn(t, this.data, this.Tt, n) ];
            return this.fieldTransforms.length > 0 && e.push(new vn(t, this.fieldTransforms)), 
            e;
        }
    }

    function ge(t) {
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
            throw S();
        }
    }

    /** A "context" object passed around while parsing user data. */ class ve {
        /**
         * Initializes a ParseContext with the given source and path.
         *
         * @param settings - The settings for the parser.
         * @param databaseId - The database ID of the Firestore instance.
         * @param serializer - The serializer to use to generate the Value proto.
         * @param ignoreUndefinedProperties - Whether to ignore undefined properties
         * rather than throw.
         * @param fieldTransforms - A mutable list of field transforms encountered
         * while parsing the data.
         * @param fieldMask - A mutable list of field paths encountered while parsing
         * the data.
         *
         * TODO(b/34871131): We don't support array paths right now, so path can be
         * null to indicate the context represents any location within an array (in
         * which case certain features will not work and errors will be somewhat
         * compromised).
         */
        constructor(t, n, e, s, r, i) {
            this.settings = t, this.t = n, this.serializer = e, this.ignoreUndefinedProperties = s, 
            // Minor hack: If fieldTransforms is undefined, we assume this is an
            // external call and we need to validate the entire path.
            void 0 === r && this.fe(), this.fieldTransforms = r || [], this.Tt = i || [];
        }
        get path() {
            return this.settings.path;
        }
        get ne() {
            return this.settings.ne;
        }
        /** Returns a new context with the specified settings overwritten. */    de(t) {
            return new ve(Object.assign(Object.assign({}, this.settings), t), this.t, this.serializer, this.ignoreUndefinedProperties, this.fieldTransforms, this.Tt);
        }
        _e(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), s = this.de({
                path: e,
                re: !1
            });
            return s.we(t), s;
        }
        me(t) {
            var n;
            const e = null === (n = this.path) || void 0 === n ? void 0 : n.child(t), s = this.de({
                path: e,
                re: !1
            });
            return s.fe(), s;
        }
        pe(t) {
            // TODO(b/34871131): We don't support array paths right now; so make path
            // undefined.
            return this.de({
                path: void 0,
                re: !0
            });
        }
        ee(t) {
            return Me(t, this.settings.methodName, this.settings.ye || !1, this.path, this.settings.se);
        }
        /** Returns 'true' if 'fieldPath' was traversed when creating this context. */    contains(t) {
            return void 0 !== this.Tt.find((n => t.G(n))) || void 0 !== this.fieldTransforms.find((n => t.G(n.field)));
        }
        fe() {
            // TODO(b/34871131): Remove null check once we have proper paths for fields
            // within arrays.
            if (this.path) for (let t = 0; t < this.path.length; t++) this.we(this.path.get(t));
        }
        we(t) {
            if (0 === t.length) throw this.ee("Document fields must not be empty");
            if (ge(this.ne) && Pe.test(t)) throw this.ee('Document fields cannot begin and end with "__"');
        }
    }

    /**
     * Helper for parsing raw user input (provided via the API) into internal model
     * classes.
     */ class be {
        constructor(t, n, e) {
            this.t = t, this.ignoreUndefinedProperties = n, this.serializer = e || zn(t);
        }
        /** Creates a new top-level parse context. */    Ee(t, n, e, s = !1) {
            return new ve({
                ne: t,
                methodName: n,
                se: e,
                path: K.Z(),
                re: !1,
                ye: s
            }, this.t, this.serializer, this.ignoreUndefinedProperties);
        }
    }

    /** Parse document data from a set() call. */ function Ne(t, n, e, s, r, i = {}) {
        const o = t.Ee(i.merge || i.mergeFields ? 2 /* MergeSet */ : 0 /* Set */ , n, e, r);
        Oe("Data must be an object, but it was:", o, s);
        const u = xe(s, o);
        let c, a;
        if (i.merge) c = new Tn(o.Tt), a = o.fieldTransforms; else if (i.mergeFields) {
            const t = [];
            for (const s of i.mergeFields) {
                const r = Ce(n, s, e);
                if (!o.contains(r)) throw new R(h, `Field '${r}' is specified in your field mask but missing from your input data.`);
                je(t, r) || t.push(r);
            }
            c = new Tn(t), a = o.fieldTransforms.filter((t => c.gt(t.field)));
        } else c = null, a = o.fieldTransforms;
        return new Re(new Dn(u), c, a);
    }

    /** Parse update data from an update() call. */ function De(t, n, e, s) {
        const r = t.Ee(1 /* Update */ , n, e);
        Oe("Data must be an object, but it was:", r, s);
        const i = [], o = new Fn;
        X(s, ((t, s) => {
            const u = Ue(n, t, e);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    s instanceof Ie && (s = s.Wn);
            const c = r.me(u);
            if (s instanceof fe) 
            // Add it to the field mask, but don't add anything to updateData.
            i.push(u); else {
                const t = Se(s, c);
                null != t && (i.push(u), o.set(u, t));
            }
        }));
        const u = new Tn(i);
        return new Ve(o.Ft(), u, r.fieldTransforms);
    }

    /** Parse update data from a list of field/value arguments. */ function Fe(t, n, e, s, r, i) {
        const o = t.Ee(1 /* Update */ , n, e), u = [ Ce(n, s, e) ], c = [ r ];
        if (i.length % 2 != 0) throw new R(h, `Function ${n}() needs to be called with an even number of arguments that alternate between field names and values.`);
        for (let t = 0; t < i.length; t += 2) u.push(Ce(n, i[t])), c.push(i[t + 1]);
        const a = [], l = new Fn;
        // We iterate in reverse order to pick the last value for a field if the
        // user specified the field multiple times.
        for (let t = u.length - 1; t >= 0; --t) if (!je(a, u[t])) {
            const n = u[t];
            let e = c[t];
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    e instanceof Ie && (e = e.Wn);
            const s = o.me(n);
            if (e instanceof fe) 
            // Add it to the field mask, but don't add anything to updateData.
            a.push(n); else {
                const t = Se(e, s);
                null != t && (a.push(n), l.set(n, t));
            }
        }
        const f = new Tn(a);
        return new Ve(l.Ft(), f, o.fieldTransforms);
    }

    /**
     * Parse a "query value" (e.g. value in a where filter or a value in a cursor
     * bound).
     *
     * @param allowArrays - Whether the query value is an array that may directly
     * contain additional arrays (e.g. the operand of an `in` query).
     */ function $e(t, n, e, s = !1) {
        return Se(e, t.Ee(s ? 4 /* ArrayArgument */ : 3 /* Argument */ , n));
    }

    /**
     * Parses user data to Protobuf Values.
     *
     * @param input - Data to be parsed.
     * @param context - A context object representing the current path being parsed,
     * the source of the data being parsed, etc.
     * @returns The parsed value, or null if the value was a FieldValue sentinel
     * that should not be included in the resulting parsed data.
     */ function Se(t, n) {
        if (
        // Unwrap the API type from the Compat SDK. This will return the API type
        // from firestore-exp.
        t instanceof Ie && (t = t.Wn), qe(t)) return Oe("Unsupported field value:", n, t), 
        xe(t, n);
        if (t instanceof oe) 
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
            if (!ge(n.ne)) throw n.ee(t._methodName + "() can only be used with update() and set()");
            if (!n.path) throw n.ee(t._methodName + "() is not currently supported inside arrays");
            const e = t.te(n);
            e && n.fieldTransforms.push(e);
        }
        /**
     * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
     *
     * @returns The parsed value
     */ (t, n), null;
        if (
        // If context.path is null we are inside an array and we don't support
        // field mask paths more granular than the top-level array.
        n.path && n.Tt.push(n.path), t instanceof Array) {
            // TODO(b/34871131): Include the path containing the array in the error
            // message.
            // In the case of IN queries, the parsed data is an array (representing
            // the set of values to be included for the IN query) that may directly
            // contain additional arrays (each representing an individual field
            // value), so we disable this validation.
            if (n.settings.re && 4 /* ArrayArgument */ !== n.ne) throw n.ee("Nested arrays are not supported");
            return function(t, n) {
                const e = [];
                let s = 0;
                for (const r of t) {
                    let t = Se(r, n.pe(s));
                    null == t && (
                    // Just include nulls in the array for fields being replaced with a
                    // sentinel.
                    t = {
                        nullValue: "NULL_VALUE"
                    }), e.push(t), s++;
                }
                return {
                    arrayValue: {
                        values: e
                    }
                };
            }(t, n);
        }
        return function(t, n) {
            t instanceof Ie && (t = t.Wn);
            if (null === t) return {
                nullValue: "NULL_VALUE"
            };
            if ("number" == typeof t) return Ht(n.serializer, t);
            if ("boolean" == typeof t) return {
                booleanValue: t
            };
            if ("string" == typeof t) return {
                stringValue: t
            };
            if (t instanceof Date) {
                const e = W.fromDate(t);
                return {
                    timestampValue: Kt(n.serializer, e)
                };
            }
            if (t instanceof W) {
                // Firestore backend truncates precision down to microseconds. To ensure
                // offline mode works the same with regards to truncation, perform the
                // truncation immediately without waiting for the backend to do that.
                const e = new W(t.seconds, 1e3 * Math.floor(t.nanoseconds / 1e3));
                return {
                    timestampValue: Kt(n.serializer, e)
                };
            }
            if (t instanceof ye) return {
                geoPointValue: {
                    latitude: t.latitude,
                    longitude: t.longitude
                }
            };
            if (t instanceof Ee) return {
                bytesValue: Jt(n.serializer, t.ae)
            };
            if (t instanceof ns) {
                const e = n.t, s = t.firestore.jn;
                if (!s.isEqual(e)) throw n.ee(`Document reference is for database ${s.projectId}/${s.database} but should be for database ${e.projectId}/${e.database}`);
                return {
                    referenceValue: tn(t.firestore.jn || n.t, t.Ie.path)
                };
            }
            if (void 0 === t && n.ignoreUndefinedProperties) return null;
            throw n.ee("Unsupported field value: " + Zn(t));
        }
        /**
     * Checks whether an object looks like a JSON object that should be converted
     * into a struct. Normal class/prototype instances are considered to look like
     * JSON objects since they should be converted to a struct value. Arrays, Dates,
     * GeoPoints, etc. are not considered to look like JSON objects since they map
     * to specific FieldValue types other than ObjectValue.
     */ (t, n);
    }

    function xe(t, n) {
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
        /** Converts a Base64 encoded string to a binary string. */ (t) ? X(t, ((t, s) => {
            const r = Se(s, n._e(t));
            null != r && (e[t] = r);
        })) : 
        // If we encounter an empty object, we explicitly add it to the update
        // mask to ensure that the server creates a map entry.
        n.path && n.path.length > 0 && n.Tt.push(n.path), {
            mapValue: {
                fields: e
            }
        };
    }

    function qe(t) {
        return !("object" != typeof t || null === t || t instanceof Array || t instanceof Date || t instanceof W || t instanceof ye || t instanceof Ee || t instanceof ns || t instanceof oe);
    }

    function Oe(t, n, e) {
        if (!qe(e) || !function(t) {
            return "object" == typeof t && null !== t && (Object.getPrototypeOf(t) === Object.prototype || null === Object.getPrototypeOf(t));
        }(e)) {
            const s = Zn(e);
            throw "an object" === s ? n.ee(t + " a custom object") : n.ee(t + " " + s);
        }
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function Ce(t, n, e) {
        if (
        // If required, replace the FieldPath Compat class with with the firestore-exp
        // FieldPath.
        n instanceof Ie && (n = n.Wn), n instanceof Te) return n.he;
        if ("string" == typeof n) return Ue(t, n);
        throw Me("Field path arguments must be of type string or FieldPath.", t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
    }

    /**
     * Matches any characters in a field path string that are reserved.
     */ const Le = new RegExp("[~\\*/\\[\\]]");

    /**
     * Wraps fromDotSeparatedString with an error message about the method that
     * was thrown.
     * @param methodName - The publicly visible method name
     * @param path - The dot-separated string form of a field path which will be
     * split on dots.
     * @param targetDoc - The document against which the field path will be
     * evaluated.
     */ function Ue(t, n, e) {
        if (n.search(Le) >= 0) throw Me(`Invalid field path (${n}). Paths must not contain '~', '*', '/', '[', or ']'`, t, 
        /* hasConverter= */ !1, 
        /* path= */ void 0, e);
        try {
            return new Te(...n.split(".")).he;
        } catch (s) {
            throw Me(`Invalid field path (${n}). Paths must not be empty, begin with '.', end with '.', or contain '..'`, t, 
            /* hasConverter= */ !1, 
            /* path= */ void 0, e);
        }
    }

    function Me(t, n, e, s, r) {
        const i = s && !s.W(), o = void 0 !== r;
        let u = `Function ${n}() called with invalid data`;
        e && (u += " (via `toFirestore()`)"), u += ". ";
        let c = "";
        return (i || o) && (c += " (found", i && (c += " in field " + s), o && (c += " in document " + r), 
        c += ")"), new R(h, u + t + c);
    }

    /** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */ function je(t, n) {
        return t.some((t => t.isEqual(n)));
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
     */ class Be {
        constructor(t) {
            this.Te = t, 
            // The version of each document that was read during this transaction.
            this.Ae = new Map, this.mutations = [], this.Pe = !1, 
            /**
             * A deferred usage error that occurred previously in this transaction that
             * will cause the transaction to fail once it actually commits.
             */
            this.Re = null, 
            /**
             * Set of documents that have been written in the transaction.
             *
             * When there's more than one write to the same key in a transaction, any
             * writes after the first are handled differently.
             */
            this.Ve = new Set;
        }
        async ge(t) {
            if (this.ve(), this.mutations.length > 0) throw new R(h, "Firestore transactions require all reads to be executed before all writes.");
            const n = await Bn(this.Te, t);
            return n.forEach((t => {
                t instanceof xn || t instanceof Sn ? this.be(t) : S();
            })), n;
        }
        set(t, n) {
            this.write(n.le(t, this.Rt(t))), this.Ve.add(t.toString());
        }
        update(t, n) {
            try {
                this.write(n.le(t, this.Ne(t)));
            } catch (t) {
                this.Re = t;
            }
            this.Ve.add(t.toString());
        }
        delete(t) {
            this.write([ new bn(t, this.Rt(t)) ]), this.Ve.add(t.toString());
        }
        async commit() {
            if (this.ve(), this.Re) throw this.Re;
            const t = this.Ae;
            // For each mutation, note that the doc was written.
                    this.mutations.forEach((n => {
                t.delete(n.key.toString());
            })), 
            // For each document that was read but not written to, we want to perform
            // a `verify` operation.
            t.forEach(((t, n) => {
                const e = J.st(n);
                this.mutations.push(new Nn(e, this.Rt(e)));
            })), await jn(this.Te, this.mutations), this.Pe = !0;
        }
        be(t) {
            let n;
            if (t instanceof Sn) n = t.version; else {
                if (!(t instanceof xn)) throw S();
                // For deleted docs, we must use baseVersion 0 when we overwrite them.
                n = z.min();
            }
            const e = this.Ae.get(t.key.toString());
            if (e) {
                if (!n.isEqual(e)) 
                // This transaction will fail no matter what.
                throw new R(y, "Document version changed between two reads.");
            } else this.Ae.set(t.key.toString(), n);
        }
        /**
         * Returns the version of this document when it was read in this transaction,
         * as a precondition, or no precondition if it was not read.
         */    Rt(t) {
            const n = this.Ae.get(t.toString());
            return !this.Ve.has(t.toString()) && n ? Pn.updateTime(n) : Pn.vt();
        }
        /**
         * Returns the precondition for a document if the operation is an update.
         */    Ne(t) {
            const n = this.Ae.get(t.toString());
            // The first time a document is written, we want to take into account the
            // read time and existence
                    if (!this.Ve.has(t.toString()) && n) {
                if (n.isEqual(z.min())) 
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
                            return Pn.updateTime(n);
            }
            // Document was not read, so we just use the preconditions for a blind
            // update.
            return Pn.exists(!0);
        }
        write(t) {
            this.ve(), this.mutations = this.mutations.concat(t);
        }
        ve() {}
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
    class ke {
        constructor(t, n, e, s) {
            this.Kt = t, this.Te = n, this.updateFunction = e, this.Xt = s, this.De = 5, this.fn = new On(this.Kt, "transaction_retry" /* TransactionRetry */);
        }
        /** Runs the transaction and sets the result on deferred. */    run() {
            this.Fe();
        }
        Fe() {
            this.fn.Wt((async () => {
                const t = new Be(this.Te), n = this.$e(t);
                n && n.then((n => {
                    this.Kt.sn((() => t.commit().then((() => {
                        this.Xt.resolve(n);
                    })).catch((t => {
                        this.Se(t);
                    }))));
                })).catch((t => {
                    this.Se(t);
                }));
            }));
        }
        $e(t) {
            try {
                const n = this.updateFunction(t);
                return !nt(n) && n.catch && n.then ? n : (this.Xt.reject(Error("Transaction callback must return a Promise")), 
                null);
            } catch (t) {
                // Do not retry errors thrown by user provided updateFunction.
                return this.Xt.reject(t), null;
            }
        }
        Se(t) {
            this.De > 0 && this.xe(t) ? (this.De -= 1, this.Kt.sn((() => (this.Fe(), Promise.resolve())))) : this.Xt.reject(t);
        }
        xe(t) {
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
                        return S();

                      case c:
                      case a:
                      case l:
                      case m:
                      case T:
                      case A:
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
                        return S();
                    }
                }(n);
            }
            return !1;
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
     * A write batch, used to perform multiple writes as a single atomic unit.
     *
     * A `WriteBatch` object can be acquired by calling {@link writeBatch}. It
     * provides methods for adding writes to the write batch. None of the writes
     * will be committed (or visible locally) until {@link WriteBatch#commit} is
     * called.
     */ class Qe {
        /** @hideconstructor */
        constructor(t, n) {
            this.qe = t, this.Oe = n, this.Ce = [], this.Le = !1, this.Ue = qs(t);
        }
        set(t, n, e) {
            this.Me();
            const s = We(t, this.qe), r = He(s.je, n, e), i = Ne(this.Ue, "WriteBatch.set", s.Ie, r, null !== s.je, e);
            return this.Ce = this.Ce.concat(i.le(s.Ie, Pn.vt())), this;
        }
        update(t, n, e, ...s) {
            this.Me();
            const r = We(t, this.qe);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let i;
            return n instanceof Ie && (n = n.Wn), i = "string" == typeof n || n instanceof Te ? Fe(this.Ue, "WriteBatch.update", r.Ie, n, e, s) : De(this.Ue, "WriteBatch.update", r.Ie, n), 
            this.Ce = this.Ce.concat(i.le(r.Ie, Pn.exists(!0))), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `WriteBatch` instance. Used for chaining method calls.
         */    delete(t) {
            this.Me();
            const n = We(t, this.qe);
            return this.Ce = this.Ce.concat(new bn(n.Ie, Pn.vt())), this;
        }
        /**
         * Commits all of the writes in this write batch as a single atomic unit.
         *
         * The result of these writes will only be reflected in document reads that
         * occur after the returned Promise resolves. If the client is offline, the
         * write fails. If you would like to see local modifications or buffer writes
         * until the client is online, use the full Firestore SDK.
         *
         * @returns A Promise resolved once all of the writes in the batch have been
         * successfully written to the backend as an atomic unit (note that it won't
         * resolve while you're offline).
         */    commit() {
            return this.Me(), this.Le = !0, this.Ce.length > 0 ? this.Oe(this.Ce) : Promise.resolve();
        }
        Me() {
            if (this.Le) throw new R(p, "A write batch can no longer be used after commit() has been called.");
        }
    }

    function We(t, n) {
        if (t instanceof Ie && (t = t.Wn), t.firestore !== n) throw new R(h, "Provided document reference is from a different Firestore instance.");
        return t;
    }

    /**
     * Creates a write batch, used for performing multiple writes as a single
     * atomic operation. The maximum number of writes allowed in a single WriteBatch
     * is 500.
     *
     * The result of these writes will only be reflected in document reads that
     * occur after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @returns A `WriteBatch` that can be used to atomically execute multiple
     * writes.
     */ function ze(t) {
        const n = Yn(t = Xn(t, ee));
        return new Qe(t, (t => jn(n, t)));
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
     * A reference to a transaction.
     *
     * The `Transaction` object passed to a transaction's `updateFunction` provides
     * the methods to read and write data within the transaction context. See
     * {@link runTransaction}.
     */ class Ge {
        /** @hideconstructor */
        constructor(t, n) {
            this.qe = t, this.Be = n, this.Ue = qs(t);
        }
        /**
         * Reads the document referenced by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be read.
         * @returns A `DocumentSnapshot` with the read data.
         */    get(t) {
            const n = We(t, this.qe), e = new gs(this.qe);
            return this.Be.ge([ n.Ie ]).then((t => {
                if (!t || 1 !== t.length) return S();
                const s = t[0];
                if (s instanceof xn) return new Ke(this.qe, e, n.Ie, null, n.je);
                if (s instanceof Sn) return new Ke(this.qe, e, s.key, s, n.je);
                throw S();
            }));
        }
        set(t, n, e) {
            const s = We(t, this.qe), r = He(s.je, n, e), i = Ne(this.Ue, "Transaction.set", s.Ie, r, null !== s.je, e);
            return this.Be.set(s.Ie, i), this;
        }
        update(t, n, e, ...s) {
            const r = We(t, this.qe);
            // For Compat types, we have to "extract" the underlying types before
            // performing validation.
                    let i;
            return n instanceof Ie && (n = n.Wn), i = "string" == typeof n || n instanceof Te ? Fe(this.Ue, "Transaction.update", r.Ie, n, e, s) : De(this.Ue, "Transaction.update", r.Ie, n), 
            this.Be.update(r.Ie, i), this;
        }
        /**
         * Deletes the document referred to by the provided {@link DocumentReference}.
         *
         * @param documentRef - A reference to the document to be deleted.
         * @returns This `Transaction` instance. Used for chaining method calls.
         */    delete(t) {
            const n = We(t, this.qe);
            return this.Be.delete(n.Ie), this;
        }
    }

    /**
     * Executes the given `updateFunction` and then attempts to commit the changes
     * applied within the transaction. If any document read within the transaction
     * has changed, Cloud Firestore retries the `updateFunction`. If it fails to
     * commit after 5 attempts, the transaction fails.
     *
     * The maximum number of writes allowed in a single transaction is 500.
     *
     * @param firestore - A reference to the Firestore database to run this
     * transaction against.
     * @param updateFunction - The function to execute within the transaction
     * context.
     * @returns If the transaction completed successfully or was explicitly aborted
     * (the `updateFunction` returned a failed promise), the promise returned by the
     * `updateFunction `is returned here. Otherwise, if the transaction failed, a
     * rejected promise with the corresponding failure error is returned.
     */ function Ye(t, n) {
        const e = Yn(t = Xn(t, ee)), s = new qn;
        return new ke(new Un, e, (e => n(new Ge(t, e))), s).run(), s.promise;
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
     * Converts custom model object of type T into DocumentData by applying the
     * converter if it exists.
     *
     * This function is used when converting user objects to DocumentData
     * because we want to provide the user with a more specific error message if
     * their set() or fails due to invalid data originating from a toFirestore()
     * call.
     */ function He(t, n, e) {
        let s;
        // Cast to `any` in order to satisfy the union type constraint on
        // toFirestore().
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return s = t ? e && (e.merge || e.mergeFields) ? t.toFirestore(n, e) : t.toFirestore(n) : n, 
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
     */
    /**
     * Converts Firestore's internal types to the JavaScript types that we expose
     * to the user.
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
     * A `DocumentSnapshot` contains data read from a document in your Firestore
     * database. The data can be extracted with `.data()` or `.get(<field>)` to
     * get a specific field.
     *
     * For a `DocumentSnapshot` that points to a non-existing document, any data
     * access will return 'undefined'. You can use the `exists()` method to
     * explicitly verify a document's existence.
     */
    class Ke {
        // Note: This class is stripped down version of the DocumentSnapshot in
        // the legacy SDK. The changes are:
        // - No support for SnapshotMetadata.
        // - No support for SnapshotOptions.
        /** @hideconstructor protected */
        constructor(t, n, e, s, r) {
            this.qe = t, this.ke = n, this.Ie = e, this.Qe = s, this.je = r;
        }
        /** Property of the `DocumentSnapshot` that provides the document's ID. */    get id() {
            return this.Ie.path.k();
        }
        /**
         * The `DocumentReference` for the document included in the `DocumentSnapshot`.
         */    get ref() {
            return new ns(this.qe, this.je, this.Ie);
        }
        /**
         * Signals whether or not the document at the snapshot's location exists.
         *
         * @returns true if the document exists.
         */    exists() {
            return null !== this.Qe;
        }
        /**
         * Retrieves all fields in the document as an `Object`. Returns `undefined` if
         * the document doesn't exist.
         *
         * @returns An `Object` containing all fields in the document or `undefined`
         * if the document doesn't exist.
         */    data() {
            if (this.Qe) {
                if (this.je) {
                    // We only want to use the converter and create a new DocumentSnapshot
                    // if a converter has been provided.
                    const t = new Je(this.qe, this.ke, this.Ie, this.Qe, 
                    /* converter= */ null);
                    return this.je.fromFirestore(t);
                }
                return this.ke.We(this.Qe.qt());
            }
        }
        /**
         * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
         * document or field doesn't exist.
         *
         * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
         * field.
         * @returns The data at the specified field location or undefined if no such
         * field exists in the document.
         */
        // We are using `any` here to avoid an explicit cast by our users.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get(t) {
            if (this.Qe) {
                const n = this.Qe.data().field(ts("DocumentSnapshot.get", t));
                if (null !== n) return this.ke.We(n);
            }
        }
    }

    /**
     * A `QueryDocumentSnapshot` contains data read from a document in your
     * Firestore database as part of a query. The document is guaranteed to exist
     * and its data can be extracted with `.data()` or `.get(<field>)` to get a
     * specific field.
     *
     * A `QueryDocumentSnapshot` offers the same API surface as a
     * `DocumentSnapshot`. Since query results contain only existing documents, the
     * `exists` property will always be true and `data()` will never return
     * 'undefined'.
     */ class Je extends Ke {
        /**
         * Retrieves all fields in the document as an `Object`.
         *
         * @override
         * @returns An `Object` containing all fields in the document.
         */
        data() {
            return super.data();
        }
    }

    /**
     * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
     * representing the results of a query. The documents can be accessed as an
     * array via the `docs` property or enumerated using the `forEach` method. The
     * number of documents can be determined via the `empty` and `size`
     * properties.
     */ class Ze {
        /** @hideconstructor */
        constructor(t, n) {
            this.ze = n, this.query = t;
        }
        /** An array of all the documents in the `QuerySnapshot`. */    get docs() {
            return [ ...this.ze ];
        }
        /** The number of documents in the `QuerySnapshot`. */    get size() {
            return this.docs.length;
        }
        /** True if there are no documents in the `QuerySnapshot`. */    get empty() {
            return 0 === this.docs.length;
        }
        /**
         * Enumerates all of the documents in the `QuerySnapshot`.
         *
         * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
         * each document in the snapshot.
         * @param thisArg - The `this` binding for the callback.
         */    forEach(t, n) {
            this.ze.forEach(t, n);
        }
    }

    /**
     * Returns true if the provided snapshots are equal.
     *
     * @param left - A snapshot to compare.
     * @param right - A snapshot to compare.
     * @returns true if the snapshots are equal.
     */ function Xe(t, n) {
        return t instanceof Ie && (t = t.Wn), n instanceof Ie && (n = n.Wn), t instanceof Ke && n instanceof Ke ? t.qe === n.qe && t.Ie.isEqual(n.Ie) && (null === t.Qe ? null === n.Qe : t.Qe.isEqual(n.Qe)) && t.je === n.je : t instanceof Ze && n instanceof Ze && (xs(t.query, n.query) && Q(t.docs, n.docs, Xe));
    }

    /**
     * Helper that calls fromDotSeparatedString() but wraps any error thrown.
     */ function ts(t, n) {
        return "string" == typeof n ? Ue(t, n) : n instanceof Ie ? n.Wn.he : n.he;
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
     * A `DocumentReference` refers to a document location in a Firestore database
     * and can be used to write, read, or listen to the location. The document at
     * the referenced location may or may not exist.
     */ class ns {
        /** @hideconstructor */
        constructor(t, n, e) {
            this.je = n, this.Ie = e, 
            /** The type of this Firestore reference. */
            this.type = "document", this.firestore = t;
        }
        get Ge() {
            return this.Ie.path;
        }
        /**
         * The document's identifier within its collection.
         */    get id() {
            return this.Ie.path.k();
        }
        /**
         * A string representing the path of the referenced document (relative
         * to the root of the database).
         */    get path() {
            return this.Ie.path.K();
        }
        /**
         * The collection this `DocumentReference` belongs to.
         */    get parent() {
            return new As(this.firestore, this.je, this.Ie.path.j());
        }
        /**
         * Applies a custom data converter to this `DocumentReference`, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * setDoc}, {@link getDoc}, etc. with the returned `DocumentReference`
         * instance, the provided converter will convert between Firestore data and
         * your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `DocumentReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new ns(this.firestore, t, this.Ie);
        }
    }

    /**
     * A `Query` refers to a Query which you can read or listen to. You can also
     * construct refined `Query` objects by adding filters and ordering.
     */ class es {
        // This is the lite version of the Query class in the main SDK.
        /** @hideconstructor protected */
        constructor(t, n, e) {
            this.je = n, this.Ye = e, 
            /** The type of this Firestore reference. */
            this.type = "query", this.firestore = t;
        }
        /**
         * Applies a custom data converter to this query, allowing you to use your own
         * custom model objects with Firestore. When you call {@link getDocs} with
         * the returned query, the provided converter will convert between Firestore
         * data and your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `Query<U>` that uses the provided converter.
         */    withConverter(t) {
            return new es(this.firestore, t, this.Ye);
        }
    }

    /**
     * A `QueryConstraint` is used to narrow the set of documents returned by a
     * Firestore query. `QueryConstraint`s are created by invoking {@link where},
     * {@link orderBy}, {@link startAt}, {@link startAfter}, {@link
     * endBefore}, {@link endAt}, {@link limit} or {@link limitToLast} and
     * can then be passed to {@link query} to create a new query instance that
     * also contains this `QueryConstraint`.
     */ class ss {}

    /**
     * Creates a new immutable instance of `query` that is extended to also include
     * additional query constraints.
     *
     * @param query - The query instance to use as a base for the new constraints.
     * @param queryConstraints - The list of `QueryConstraint`s to apply.
     * @throws if any of the provided query constraints cannot be combined with the
     * existing or new constraints.
     */ function rs(t, ...n) {
        for (const e of n) t = e.He(t);
        return t;
    }

    class is extends ss {
        constructor(t, n, e) {
            super(), this.Ke = t, this.Je = n, this.Ze = e, this.type = "where";
        }
        He(t) {
            const n = qs(t.firestore), e = function(t, n, e, s, r, i, o) {
                let u;
                if (r.tt()) {
                    if ("array-contains" /* ARRAY_CONTAINS */ === i || "array-contains-any" /* ARRAY_CONTAINS_ANY */ === i) throw new R(h, `Invalid Query. You can't perform '${i}' queries on FieldPath.documentId().`);
                    if ("in" /* IN */ === i || "not-in" /* NOT_IN */ === i) {
                        Is(o, i);
                        const n = [];
                        for (const e of o) n.push(Es(s, t, e));
                        u = {
                            arrayValue: {
                                values: n
                            }
                        };
                    } else u = Es(s, t, o);
                } else "in" /* IN */ !== i && "not-in" /* NOT_IN */ !== i && "array-contains-any" /* ARRAY_CONTAINS_ANY */ !== i || Is(o, i), 
                u = $e(e, n, o, 
                /* allowArrays= */ "in" /* IN */ === i || "not-in" /* NOT_IN */ === i);
                const c = Dt.create(r, i, u);
                return function(t, n) {
                    if (n.wt()) {
                        const e = Vt(t);
                        if (null !== e && !e.isEqual(n.field)) throw new R(h, `Invalid query. All where filters with an inequality (<, <=, >, or >=) must be on the same field. But you have inequality filters on '${e.toString()}' and '${n.field.toString()}'`);
                        const s = Rt(t);
                        null !== s && Ts(t, n.field, s);
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
            }(t.Ye, "where", n, t.firestore.jn, this.Ke, this.Je, this.Ze);
            return new es(t.firestore, t.je, function(t, n) {
                const e = t.filters.concat([ n ]);
                return new At(t.path, t.collectionGroup, t.ft.slice(), e, t.limit, t.limitType, t.startAt, t.endAt);
            }(t.Ye, e));
        }
    }

    /**
     * Creates a `QueryConstraint` that enforces that documents must contain the
     * specified field and that the value should satisfy the relation constraint
     * provided.
     *
     * @param fieldPath - The path to compare
     * @param opStr - The operation string (e.g "&lt;", "&lt;=", "==", "&lt;",
     *   "&lt;=", "!=").
     * @param value - The value for comparison
     * @returns The created `Query`.
     */ function os(t, n, e) {
        const s = n, r = ts("where", t);
        return new is(r, s, e);
    }

    class us extends ss {
        constructor(t, n) {
            super(), this.Ke = t, this.Xe = n, this.type = "orderBy";
        }
        He(t) {
            const n = function(t, n, e) {
                if (null !== t.startAt) throw new R(h, "Invalid query. You must not call startAt() or startAfter() before calling orderBy().");
                if (null !== t.endAt) throw new R(h, "Invalid query. You must not call endAt() or endBefore() before calling orderBy().");
                const s = new jt(n, e);
                return function(t, n) {
                    if (null === Rt(t)) {
                        // This is the first order by. It must match any inequality.
                        const e = Vt(t);
                        null !== e && Ts(t, e, n.field);
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
     */ (t.Ye, this.Ke, this.Xe);
            return new es(t.firestore, t.je, function(t, n) {
                // TODO(dimond): validate that orderBy does not list the same key twice.
                const e = t.ft.concat([ n ]);
                return new At(t.path, t.collectionGroup, e, t.filters.slice(), t.limit, t.limitType, t.startAt, t.endAt);
            }(t.Ye, n));
        }
    }

    /**
     * Creates a `QueryConstraint` that sorts the query result by the
     * specified field, optionally in descending order instead of ascending.
     *
     * @param fieldPath - The field to sort by.
     * @param directionStr - Optional direction to sort by ('asc' or 'desc'). If
     * not specified, order will be ascending.
     * @returns The created `Query`.
     */ function cs(t, n = "asc") {
        const e = n, s = ts("orderBy", t);
        return new us(s, e);
    }

    class as extends ss {
        constructor(t, n, e) {
            super(), this.type = t, this.ts = n, this.ns = e;
        }
        He(t) {
            return new es(t.firestore, t.je, function(t, n, e) {
                return new At(t.path, t.collectionGroup, t.ft.slice(), t.filters.slice(), n, e, t.startAt, t.endAt);
            }(t.Ye, this.ts, this.ns));
        }
    }

    /**
     * Creates a `QueryConstraint` that only returns the first matching documents.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function hs(t) {
        return te("limit", t), new as("limit", t, "F" /* First */);
    }

    /**
     * Creates a `QueryConstraint` that only returns the last matching documents.
     *
     * You must specify at least one `orderBy` clause for `limitToLast` queries,
     * otherwise an exception will be thrown during execution.
     *
     * @param limit - The maximum number of items to return.
     * @returns The created `Query`.
     */ function ls(t) {
        return te("limitToLast", t), new as("limitToLast", t, "L" /* Last */);
    }

    class fs extends ss {
        constructor(t, n, e) {
            super(), this.type = t, this.es = n, this.ss = e;
        }
        He(t) {
            const n = ys(t, this.type, this.es, this.ss);
            return new es(t.firestore, t.je, function(t, n) {
                return new At(t.path, t.collectionGroup, t.ft.slice(), t.filters.slice(), t.limit, t.limitType, n, t.endAt);
            }(t.Ye, n));
        }
    }

    function ds(...t) {
        return new fs("startAt", t, /*before=*/ !0);
    }

    function _s(...t) {
        return new fs("startAfter", t, 
        /*before=*/ !1);
    }

    class ws extends ss {
        constructor(t, n, e) {
            super(), this.type = t, this.es = n, this.ss = e;
        }
        He(t) {
            const n = ys(t, this.type, this.es, this.ss);
            return new es(t.firestore, t.je, function(t, n) {
                return new At(t.path, t.collectionGroup, t.ft.slice(), t.filters.slice(), t.limit, t.limitType, t.startAt, n);
            }(t.Ye, n));
        }
    }

    function ms(...t) {
        return new ws("endBefore", t, /*before=*/ !0);
    }

    function ps(...t) {
        return new ws("endAt", t, /*before=*/ !1);
    }

    /** Helper function to create a bound from a document or fields */ function ys(t, n, e, s) {
        if (e[0] instanceof Ie && (e[0] = e[0].Wn), e[0] instanceof Ke) return function(t, n, e, s, r) {
            if (!s) throw new R(f, "Can't use a DocumentSnapshot that doesn't exist for " + e + "().");
            const i = [];
            // Because people expect to continue/end a query at the exact document
            // provided, we need to use the implicit sort order rather than the explicit
            // sort order, because it's guaranteed to contain the document key. That way
            // the position becomes unambiguous and the query continues/ends exactly at
            // the provided document. Without the key (by using the explicit sort
            // orders), multiple documents could match the position, yielding duplicate
            // results.
                    for (const e of vt(t)) if (e.field.tt()) i.push(wt(n, s.key)); else {
                const t = s.field(e.field);
                if (st(t)) throw new R(h, 'Invalid query. You are trying to start or end a query using a document for which the field "' + e.field + '" is an uncommitted server timestamp. (Since the value of this field is unknown, you cannot start/end a query with it.)');
                if (null === t) {
                    const t = e.field.K();
                    throw new R(h, `Invalid query. You are trying to start or end a query using a document for which the field '${t}' (used as the orderBy) does not exist.`);
                }
                i.push(t);
            }
            return new Ut(i, r);
        }
        /**
     * Converts a list of field values to a Bound for the given query.
     */ (t.Ye, t.firestore.jn, n, e[0].Qe, s);
        {
            const r = qs(t.firestore);
            return function(t, n, e, s, r, i) {
                // Use explicit order by's because it has to match the query the user made
                const o = t.ft;
                if (r.length > o.length) throw new R(h, `Too many arguments provided to ${s}(). The number of arguments must be less than or equal to the number of orderBy() clauses`);
                const u = [];
                for (let i = 0; i < r.length; i++) {
                    const c = r[i];
                    if (o[i].field.tt()) {
                        if ("string" != typeof c) throw new R(h, `Invalid query. Expected a string for document ID in ${s}(), but got a ${typeof c}`);
                        if (!gt(t) && -1 !== c.indexOf("/")) throw new R(h, `Invalid query. When querying a collection and ordering by FieldPath.documentId(), the value passed to ${s}() must be a plain document ID, but '${c}' contains a slash.`);
                        const e = t.path.child(Y.J(c));
                        if (!J.ot(e)) throw new R(h, `Invalid query. When querying a collection group and ordering by FieldPath.documentId(), the value passed to ${s}() must result in a valid document path, but '${e}' is not because it contains an odd number of segments.`);
                        const r = new J(e);
                        u.push(wt(n, r));
                    } else {
                        const t = $e(e, s, c);
                        u.push(t);
                    }
                }
                return new Ut(u, i);
            }
            /**
     * Parses the given documentIdValue into a ReferenceValue, throwing
     * appropriate errors if the value is anything other than a DocumentReference
     * or String, or if the string is malformed.
     */ (t.Ye, t.firestore.jn, r, n, e, s);
        }
    }

    function Es(t, n, e) {
        if (e instanceof Ie && (e = e.Wn), "string" == typeof e) {
            if ("" === e) throw new R(h, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid document ID, but it was an empty string.");
            if (!gt(n) && -1 !== e.indexOf("/")) throw new R(h, `Invalid query. When querying a collection by FieldPath.documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);
            const s = n.path.child(Y.J(e));
            if (!J.ot(s)) throw new R(h, `Invalid query. When querying a collection group by FieldPath.documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);
            return wt(t, new J(s));
        }
        if (e instanceof ns) return wt(t, e.Ie);
        throw new R(h, "Invalid query. When querying with FieldPath.documentId(), you must provide a valid string or a DocumentReference, but it was: " + Zn(e) + ".");
    }

    /**
     * Validates that the value passed into a disjunctive filter satisfies all
     * array requirements.
     */ function Is(t, n) {
        if (!Array.isArray(t) || 0 === t.length) throw new R(h, `Invalid Query. A non-empty array is required for '${n.toString()}' filters.`);
        if (t.length > 10) throw new R(h, `Invalid Query. '${n.toString()}' filters support a maximum of 10 elements in the value array.`);
    }

    function Ts(t, n, e) {
        if (!e.isEqual(n)) throw new R(h, `Invalid query. You have a where filter with an inequality (<, <=, >, or >=) on field '${n.toString()}' and so you must also use '${n.toString()}' as your first argument to orderBy(), but your first orderBy() is on field '${e.toString()}' instead.`);
    }

    /**
     * A `CollectionReference` object can be used for adding documents, getting
     * document references, and querying for documents (using {@link query}).
     */
    class As extends es {
        /** @hideconstructor */
        constructor(t, n, e) {
            super(t, n, new At(e)), this.firestore = t, this.Ge = e, this.type = "collection";
        }
        /** The collection's identifier. */    get id() {
            return this.Ye.path.k();
        }
        /**
         * A string representing the path of the referenced collection (relative
         * to the root of the database).
         */    get path() {
            return this.Ye.path.K();
        }
        /**
         * A reference to the containing `DocumentReference` if this is a
         * subcollection. If this isn't a subcollection, the reference is null.
         */    get parent() {
            const t = this.Ge.j();
            return t.W() ? null : new ns(this.firestore, 
            /* converter= */ null, new J(t));
        }
        /**
         * Applies a custom data converter to this CollectionReference, allowing you
         * to use your own custom model objects with Firestore. When you call {@link
         * addDoc} with the returned `CollectionReference` instance, the provided
         * converter will convert between Firestore data and your custom type `U`.
         *
         * @param converter - Converts objects to and from Firestore.
         * @returns A `CollectionReference<U>` that uses the provided converter.
         */    withConverter(t) {
            return new As(this.firestore, t, this.Ge);
        }
    }

    function Ps(t, n, ...e) {
        if (t instanceof Ie && (t = t.Wn), Hn("collection", "path", n), t instanceof ee) {
            const s = Y.J(n, ...e);
            return Jn(s), new As(t, /* converter= */ null, s);
        }
        {
            if (!(t instanceof ns || t instanceof As)) throw new R(h, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = Y.J(t.path, ...e).child(Y.J(n));
            return Jn(s), new As(t.firestore, 
            /* converter= */ null, s);
        }
    }

    // TODO(firestorelite): Consider using ErrorFactory -
    // https://github.com/firebase/firebase-js-sdk/blob/0131e1f/packages/util/src/errors.ts#L106
    /**
     * Creates and returns a new `Query` instance that includes all documents in the
     * database that are contained in a collection or subcollection with the
     * given `collectionId`.
     *
     * @param firestore - A reference to the root Firestore instance.
     * @param collectionId - Identifies the collections to query over. Every
     * collection or subcollection with this ID as the last segment of its path
     * will be included. Cannot contain a slash.
     * @returns The created `Query`.
     */ function Rs(t, n) {
        if (t = Xn(t, ee), Hn("collectionGroup", "collection id", n), n.indexOf("/") >= 0) throw new R(h, `Invalid collection ID '${n}' passed to function collectionGroup(). Collection IDs must not contain '/'.`);
        return new es(t, 
        /* converter= */ null, function(t) {
            return new At(Y.Z(), t);
        }(n));
    }

    function Vs(t, n, ...e) {
        if (t instanceof Ie && (t = t.Wn), 
        // We allow omission of 'pathString' but explicitly prohibit passing in both
        // 'undefined' and 'null'.
        1 === arguments.length && (n = B.D()), Hn("doc", "path", n), t instanceof ee) {
            const s = Y.J(n, ...e);
            return Kn(s), new ns(t, 
            /* converter= */ null, new J(s));
        }
        {
            if (!(t instanceof ns || t instanceof As)) throw new R(h, "Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");
            const s = t.Ge.child(Y.J(n, ...e));
            return Kn(s), new ns(t.firestore, t instanceof As ? t.je : null, new J(s));
        }
    }

    class gs extends class {
        We(t, n = "none") {
            switch (ut(t)) {
              case 0 /* NullValue */ :
                return null;

              case 1 /* BooleanValue */ :
                return t.booleanValue;

              case 2 /* NumberValue */ :
                return dt(t.integerValue || t.doubleValue);

              case 3 /* TimestampValue */ :
                return this.rs(t.timestampValue);

              case 4 /* ServerTimestampValue */ :
                return this.os(t, n);

              case 5 /* StringValue */ :
                return t.stringValue;

              case 6 /* BlobValue */ :
                return this.us(_t(t.bytesValue));

              case 7 /* RefValue */ :
                return this.cs(t.referenceValue);

              case 8 /* GeoPointValue */ :
                return this.hs(t.geoPointValue);

              case 9 /* ArrayValue */ :
                return this.ls(t.arrayValue, n);

              case 10 /* ObjectValue */ :
                return this.fs(t.mapValue, n);

              default:
                throw S();
            }
        }
        fs(t, n) {
            const e = {};
            return X(t.fields || {}, ((t, s) => {
                e[t] = this.We(s, n);
            })), e;
        }
        hs(t) {
            return new ye(dt(t.latitude), dt(t.longitude));
        }
        ls(t, n) {
            return (t.values || []).map((t => this.We(t, n)));
        }
        os(t, n) {
            switch (n) {
              case "previous":
                const e = rt(t);
                return null == e ? null : this.We(e, n);

              case "estimate":
                return this.rs(it(t));

              default:
                return null;
            }
        }
        rs(t) {
            const n = ft(t);
            return new W(n.seconds, n.nanos);
        }
        ds(t, n) {
            const e = Y.J(t);
            x(wn(e));
            const s = new g(e.get(1), e.get(3)), r = new J(e.M(5));
            return s.isEqual(n) || 
            // TODO(b/64130202): Somehow support foreign references.
            F(`Document ${r} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`), 
            r;
        }
    } {
        constructor(t) {
            super(), this.firestore = t;
        }
        us(t) {
            return new Ee(t);
        }
        cs(t) {
            const n = this.ds(t, this.firestore.jn);
            return new ns(this.firestore, /* converter= */ null, n);
        }
    }

    /**
     * Reads the document referred to by the specified document reference.
     *
     * All documents are directly fetched from the server, even if the document was
     * previously read or modified. Recent modifications are only reflected in the
     * retrieved `DocumentSnapshot` if they have already been applied by the
     * backend. If the client is offline, the read fails. If you like to use
     * caching or see local modifications, please use the full Firestore SDK.
     *
     * @param reference - The reference of the document to fetch.
     * @returns A Promise resolved with a `DocumentSnapshot` containing the current
     * document contents.
     */ function vs(t) {
        const n = Yn((t = Xn(t, ns)).firestore), e = new gs(t.firestore);
        return Bn(n, [ t.Ie ]).then((n => {
            x(1 === n.length);
            const s = n[0];
            return new Ke(t.firestore, e, t.Ie, s instanceof Sn ? s : null, t.je);
        }));
    }

    /**
     * Executes the query and returns the results as a {@link QuerySnapshot}.
     *
     * All queries are executed directly by the server, even if the the query was
     * previously executed. Recent modifications are only reflected in the retrieved
     * results if they have already been applied by the backend. If the client is
     * offline, the operation fails. To see previously cached result and local
     * modifications, use the full Firestore SDK.
     *
     * @param query - The `Query` to execute.
     * @returns A Promise that will be resolved with the results of the query.
     */ function bs(t) {
        !function(t) {
            if (Pt(t) && 0 === t.ft.length) throw new R(I, "limitToLast() queries require specifying at least one orderBy() clause");
        }((t = Xn(t, es)).Ye);
        const n = Yn(t.firestore), e = new gs(t.firestore);
        return kn(n, t.Ye).then((n => {
            const s = n.map((n => new Je(t.firestore, e, n.key, n, t.je)));
            return Pt(t.Ye) && 
            // Limit to last queries reverse the orderBy constraint that was
            // specified by the user. As such, we need to reverse the order of the
            // results to return the documents in the expected order.
            s.reverse(), new Ze(t, s);
        }));
    }

    function Ns(t, n, e) {
        const s = He((t = Xn(t, ns)).je, n, e), r = Ne(qs(t.firestore), "setDoc", t.Ie, s, null !== t.je, e);
        return jn(Yn(t.firestore), r.le(t.Ie, Pn.vt()));
    }

    function Ds(t, n, e, ...s) {
        const r = qs((t = Xn(t, ns)).firestore);
        // For Compat types, we have to "extract" the underlying types before
        // performing validation.
            let i;
        n instanceof Ie && (n = n.Wn), i = "string" == typeof n || n instanceof Te ? Fe(r, "updateDoc", t.Ie, n, e, s) : De(r, "updateDoc", t.Ie, n);
        return jn(Yn(t.firestore), i.le(t.Ie, Pn.exists(!0)));
    }

    /**
     * Deletes the document referred to by the specified `DocumentReference`.
     *
     * The deletion will only be reflected in document reads that occur after the
     * returned Promise resolves. If the client is offline, the
     * delete fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @param reference - A reference to the document to delete.
     * @returns A Promise resolved once the document has been successfully
     * deleted from the backend.
     */ function Fs(t) {
        return jn(Yn((t = Xn(t, ns)).firestore), [ new bn(t.Ie, Pn.vt()) ]);
    }

    /**
     * Add a new document to specified `CollectionReference` with the given data,
     * assigning it a document ID automatically.
     *
     * The result of this write will only be reflected in document reads that occur
     * after the returned Promise resolves. If the client is offline, the
     * write fails. If you would like to see local modifications or buffer writes
     * until the client is online, use the full Firestore SDK.
     *
     * @param reference - A reference to the collection to add this document to.
     * @param data - An Object containing the data for the new document.
     * @returns A Promise resolved with a `DocumentReference` pointing to the
     * newly created document after it has been written to the backend.
     */ function $s(t, n) {
        const e = Vs(t = Xn(t, As)), s = He(t.je, n), r = Ne(qs(t.firestore), "addDoc", e.Ie, s, null !== e.je, {});
        return jn(Yn(t.firestore), r.le(e.Ie, Pn.exists(!1))).then((() => e));
    }

    /**
     * Returns true if the provided references are equal.
     *
     * @param left - A reference to compare.
     * @param right - A reference to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function Ss(t, n) {
        return t instanceof Ie && (t = t.Wn), n instanceof Ie && (n = n.Wn), (t instanceof ns || t instanceof As) && (n instanceof ns || n instanceof As) && (t.firestore === n.firestore && t.path === n.path && t.je === n.je);
    }

    /**
     * Returns true if the provided queries point to the same collection and apply
     * the same constraints.
     *
     * @param left - A `Query` to compare.
     * @param right - A `Query` to compare.
     * @returns true if the references point to the same location in the same
     * Firestore database.
     */ function xs(t, n) {
        return t instanceof Ie && (t = t.Wn), n instanceof Ie && (n = n.Wn), t instanceof es && n instanceof es && (t.firestore === n.firestore && Nt(t.Ye, n.Ye) && t.je === n.je);
    }

    function qs(t) {
        const n = t.kn(), e = zn(t.jn);
        return new be(t.jn, !!n.ignoreUndefinedProperties, e);
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
     */ app._registerComponent(new Component("firestore/lite", (t => ((t, n) => new ee(t, n))(t.getProvider("app-exp").getImmediate(), t.getProvider("auth-internal"))), "PUBLIC" /* PUBLIC */)), 
    app.registerVersion("firestore-lite", "0.0.900", "node");

    exports.Bytes = Ee;
    exports.CollectionReference = As;
    exports.DocumentReference = ns;
    exports.DocumentSnapshot = Ke;
    exports.FieldPath = Te;
    exports.FieldValue = oe;
    exports.FirebaseFirestore = ee;
    exports.FirestoreError = R;
    exports.GeoPoint = ye;
    exports.Query = es;
    exports.QueryConstraint = ss;
    exports.QueryDocumentSnapshot = Je;
    exports.QuerySnapshot = Ze;
    exports.Timestamp = W;
    exports.Transaction = Ge;
    exports.WriteBatch = Qe;
    exports.addDoc = $s;
    exports.arrayRemove = he;
    exports.arrayUnion = ae;
    exports.collection = Ps;
    exports.collectionGroup = Rs;
    exports.deleteDoc = Fs;
    exports.deleteField = ue;
    exports.doc = Vs;
    exports.documentId = Ae;
    exports.endAt = ps;
    exports.endBefore = ms;
    exports.getDoc = vs;
    exports.getDocs = bs;
    exports.getFirestore = re;
    exports.increment = le;
    exports.initializeFirestore = se;
    exports.limit = hs;
    exports.limitToLast = ls;
    exports.orderBy = cs;
    exports.query = rs;
    exports.queryEqual = xs;
    exports.refEqual = Ss;
    exports.runTransaction = Ye;
    exports.serverTimestamp = ce;
    exports.setDoc = Ns;
    exports.setLogLevel = N;
    exports.snapshotEqual = Xe;
    exports.startAfter = _s;
    exports.startAt = ds;
    exports.terminate = ie;
    exports.updateDoc = Ds;
    exports.where = os;
    exports.writeBatch = ze;

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
