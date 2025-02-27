/*!
  * vue-i18n v9.0.0-alpha.2
  * (c) 2020 kazuya kawaguchi
  * Released under the MIT License.
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

/**
 *  datetime
 */
const intlDefined = typeof Intl !== 'undefined';
const Availabilities = {
    dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
    numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
};

const isArray = Array.isArray;
const isNumber = (val) => typeof val === 'number' && isFinite(val);
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
const isBoolean = (val) => typeof val === 'boolean';
const isObject = (val) => // eslint-disable-line
 val !== null && typeof val === 'object';
const isDate = (val) => toTypeString(val) === '[object Date]';
const isRegExp = (val) => toTypeString(val) === '[object RegExp]';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === '[object Object]';
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
// for converting list and named values to displayed strings.
const toDisplayString = (val) => {
    return val == null
        ? ''
        : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
            ? JSON.stringify(val, null, 2)
            : String(val);
};
const generateSymbolID = () => `vue-i18n-${new Date().getUTCMilliseconds().toString()}`;
function warn(msg, err) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-i18n] ' + msg);
        /* istanbul ignore if */
        if (err) {
            console.warn(err.stack);
        }
    }
}

const Translation = vue.defineComponent({
    name: 'i18n-t',
    props: {
        tag: {
            type: String
        },
        keypath: {
            type: String,
            required: true
        },
        locale: {
            type: String
        },
        plural: {
            type: [Number, String],
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            validator: (val) => isNumber(val) || !isNaN(val)
        }
    },
    setup(props, context) {
        const { slots, attrs } = context;
        const i18n = useI18n();
        const keys = Object.keys(slots).filter(key => key !== '_');
        return () => {
            const options = {};
            if (props.locale) {
                options.locale = props.locale;
            }
            if (props.plural !== undefined) {
                options.plural = isString(props.plural) ? +props.plural : props.plural;
            }
            const arg = getInterpolateArg(context, keys);
            const children = i18n.__transrateVNode(props.keypath, arg, options);
            return props.tag
                ? vue.h(props.tag, { ...attrs }, children)
                : vue.h(vue.Fragment, { ...attrs }, children);
        };
    }
});
function getInterpolateArg({ slots }, keys) {
    if (keys.length === 1 && keys[0] === 'default') {
        // default slot only
        return slots.default ? slots.default() : [];
    }
    else {
        // named slots
        return keys.reduce((arg, key) => {
            const slot = slots[key];
            if (slot) {
                arg[key] = slot();
            }
            return arg;
        }, {});
    }
}

const NUMBER_FORMAT_KEYS = [
    'localeMatcher',
    'style',
    'unit',
    'unitDisplay',
    'currency',
    'currencyDisplay',
    'useGrouping',
    'numberingSystem',
    'minimumIntegerDigits',
    'minimumFractionDigits',
    'maximumFractionDigits',
    'minimumSignificantDigits',
    'maximumSignificantDigits',
    'notation',
    'formatMatcher'
];
const NumberFormat = vue.defineComponent({
    name: 'i18n-n',
    props: {
        tag: {
            type: String
        },
        value: {
            type: [Number, Date],
            required: true
        },
        format: {
            type: [String, Object]
        },
        locale: {
            type: String
        }
    },
    setup(props, context) {
        const { slots, attrs } = context;
        const i18n = useI18n();
        return () => {
            const options = { part: true };
            let orverrides = {};
            if (props.locale) {
                options.locale = props.locale;
            }
            if (isString(props.format)) {
                options.key = props.format;
            }
            else if (isPlainObject(props.format)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (isString(props.format.key)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    options.key = props.format.key;
                }
                // Filter out number format options only
                orverrides = Object.keys(props.format).reduce((options, prop) => {
                    return NUMBER_FORMAT_KEYS.includes(prop)
                        ? Object.assign({}, options, { [prop]: props.format[prop] })
                        : options;
                }, {});
            }
            const parts = i18n.__numberParts(...[props.value, options, orverrides]);
            let children = [options.key];
            if (isArray(parts)) {
                children = parts.map((part, index) => {
                    const slot = slots[part.type];
                    return slot
                        ? slot({ [part.type]: part.value, index, parts })
                        : [part.value];
                });
            }
            else if (isString(parts)) {
                children = [parts];
            }
            return props.tag
                ? vue.h(props.tag, { ...attrs }, children)
                : vue.h('span', { ...attrs }, children);
        };
    }
});

const DATETIME_FORMAT_KEYS = [
    'dateStyle',
    'timeStyle',
    'fractionalSecondDigits',
    'calendar',
    'dayPeriod',
    'numberingSystem',
    'localeMatcher',
    'timeZone',
    'hour12',
    'hourCycle',
    'formatMatcher',
    'weekday',
    'era',
    'year',
    'month',
    'day',
    'hour',
    'minute',
    'second',
    'timeZoneName'
];
const DatetimeFormat = vue.defineComponent({
    name: 'i18n-d',
    props: {
        tag: {
            type: String
        },
        value: {
            type: [Number, Date],
            required: true
        },
        format: {
            type: [String, Object]
        },
        locale: {
            type: String
        }
    },
    setup(props, context) {
        const { slots, attrs } = context;
        const i18n = useI18n();
        return () => {
            const options = { part: true };
            let orverrides = {};
            if (props.locale) {
                options.locale = props.locale;
            }
            if (isString(props.format)) {
                options.key = props.format;
            }
            else if (isPlainObject(props.format)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (isString(props.format.key)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    options.key = props.format.key;
                }
                // Filter out datetime format options only
                orverrides = Object.keys(props.format).reduce((options, prop) => {
                    return DATETIME_FORMAT_KEYS.includes(prop)
                        ? Object.assign({}, options, { [prop]: props.format[prop] })
                        : options;
                }, {});
            }
            const parts = i18n.__datetimeParts(...[props.value, options, orverrides]);
            let children = [options.key];
            if (isArray(parts)) {
                children = parts.map((part, index) => {
                    const slot = slots[part.type];
                    return slot
                        ? slot({ [part.type]: part.value, index, parts })
                        : [part.value];
                });
            }
            else if (isString(parts)) {
                children = [parts];
            }
            return props.tag
                ? vue.h(props.tag, { ...attrs }, children)
                : vue.h('span', { ...attrs }, children);
        };
    }
});

function hook(el, binding, vnode, prevVNode) {
    // TODO: v-t directive
    // ...
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function apply(app, composer, ...options) {
    const pluginOptions = parseOptions(...options);
    if ( isString(pluginOptions['i18n-t'])) {
        warn(`Rename the component name: '${Translation.name}' -> '${pluginOptions['i18n-t']}'`);
    }
    // install components
    app.component(pluginOptions['i18n-t'] || Translation.name, Translation);
    app.component(NumberFormat.name, NumberFormat);
    app.component(DatetimeFormat.name, DatetimeFormat);
    // install directive
    app.directive('t', hook); // TODO:
    // setup global provider
    app.provide(GlobalI18nSymbol, composer);
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseOptions(...options) {
    const [arg] = options;
    const ret = {};
    if (!isPlainObject(arg)) {
        return ret;
    }
    if (!isString(arg['i18n-t'])) {
        return ret;
    }
    ret['i18n-t'] = arg['i18n-t'];
    return ret;
}

const DEFAULT_LINKDED_MODIFIERS = {
    upper: (val, type) => type === 'text' ? val.toUpperCase() : val,
    lower: (val, type) => type === 'text' ? val.toLowerCase() : val,
    // prettier-ignore
    capitalize: (val, type) => type === 'text'
        ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}`
        : val
};
const NOT_REOSLVED = -1;
const MISSING_RESOLVE_VALUE = '';
function createRuntimeContext(options = {}) {
    const locale = isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = isArray(options.fallbackLocale) ||
        isPlainObject(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const messages = isPlainObject(options.messages)
        ? options.messages
        : { [locale]: {} };
    const datetimeFormats = isPlainObject(options.datetimeFormats)
        ? options.datetimeFormats
        : { [locale]: {} };
    const numberFormats = isPlainObject(options.numberFormats)
        ? options.numberFormats
        : { [locale]: {} };
    const _compileCache = isObject(options._compileCache)
        ? options._compileCache
        : new Map();
    const modifiers = Object.assign({}, options.modifiers || {}, DEFAULT_LINKDED_MODIFIERS);
    const pluralRules = options.pluralRules || {};
    const missing = isFunction(options.missing) ? options.missing : null;
    const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
        ? options.missingWarn
        : true;
    const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
        ? options.fallbackWarn
        : true;
    const fallbackFormat = isBoolean(options.fallbackFormat)
        ? options.fallbackFormat
        : false;
    const unresolving = isBoolean(options.unresolving)
        ? options.unresolving
        : false;
    const postTranslation = isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    const processor = isPlainObject(options.processor) ? options.processor : null;
    const _datetimeFormatters = isObject(options._datetimeFormatters)
        ? options._datetimeFormatters
        : new Map();
    const _numberFormatters = isObject(options._numberFormatters)
        ? options._numberFormatters
        : new Map();
    return {
        locale,
        fallbackLocale,
        messages,
        datetimeFormats,
        numberFormats,
        modifiers,
        pluralRules,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackFormat,
        unresolving,
        postTranslation,
        processor,
        _compileCache,
        _datetimeFormatters,
        _numberFormatters
    };
}
function isTrarnslateFallbackWarn(fallback, key) {
    return fallback instanceof RegExp ? fallback.test(key) : fallback;
}
function isTranslateMissingWarn(missing, key) {
    return missing instanceof RegExp ? missing.test(key) : missing;
}
function handleMissing(context, key, locale, missingWarn, type) {
    const { missing } = context;
    if (missing !== null) {
        const ret = missing(context, locale, key, type);
        return isString(ret) ? ret : key;
    }
    else {
        if ( isTranslateMissingWarn(missingWarn, key)) {
            warn(`Not found '${key}' key in '${locale}' locale messages.`);
        }
        return key;
    }
}
function getLocaleChain(context, fallback, start = '') {
    if (start === '') {
        return [];
    }
    if (!context._localeChainCache) {
        context._localeChainCache = new Map();
    }
    let chain = context._localeChainCache.get(start);
    if (!chain) {
        chain = [];
        // first block defined by start
        let block = [start];
        // while any intervening block found
        while (isArray(block)) {
            block = appendBlockToChain(chain, block, fallback);
        }
        // prettier-ignore
        // last block defined by default
        const defaults = isArray(fallback)
            ? fallback
            : isPlainObject(fallback)
                ? fallback['default']
                    ? fallback['default']
                    : null
                : fallback;
        // convert defaults to array
        block = isString(defaults) ? [defaults] : defaults;
        if (isArray(block)) {
            appendBlockToChain(chain, block, false);
        }
        context._localeChainCache.set(start, chain);
    }
    return chain;
}
function appendBlockToChain(chain, block, blocks) {
    let follow = true;
    for (let i = 0; i < block.length && isBoolean(follow); i++) {
        follow = appendLocaleToChain(chain, block[i], blocks);
    }
    return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
    let follow;
    const tokens = locale.split('-');
    do {
        const target = tokens.join('-');
        follow = appendItemToChain(chain, target, blocks);
        tokens.splice(-1, 1);
    } while (tokens.length && follow === true);
    return follow;
}
function appendItemToChain(chain, target, blocks) {
    let follow = false;
    if (!chain.includes(target)) {
        follow = true;
        if (target) {
            follow = !target.endsWith('!');
            const locale = target.replace(/!/g, '');
            chain.push(locale);
            if ((isArray(blocks) || isPlainObject(blocks)) &&
                blocks[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
            ) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                follow = blocks[locale];
            }
        }
    }
    return follow;
}
function updateFallbackLocale(context, locale, fallback) {
    context._localeChainCache = new Map();
    getLocaleChain(context, fallback, locale);
}

const pathStateMachine = [];
pathStateMachine[0 /* BEFORE_PATH */] = {
    ["w" /* WORKSPACE */]: [0 /* BEFORE_PATH */],
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
};
pathStateMachine[1 /* IN_PATH */] = {
    ["w" /* WORKSPACE */]: [1 /* IN_PATH */],
    ["." /* DOT */]: [2 /* BEFORE_IDENT */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
};
pathStateMachine[2 /* BEFORE_IDENT */] = {
    ["w" /* WORKSPACE */]: [2 /* BEFORE_IDENT */],
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */]
};
pathStateMachine[3 /* IN_IDENT */] = {
    ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */],
    ["w" /* WORKSPACE */]: [1 /* IN_PATH */, 1 /* PUSH */],
    ["." /* DOT */]: [2 /* BEFORE_IDENT */, 1 /* PUSH */],
    ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */, 1 /* PUSH */],
    ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */, 1 /* PUSH */]
};
pathStateMachine[4 /* IN_SUB_PATH */] = {
    ["'" /* SINGLE_QUOTE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */],
    ["\"" /* DOUBLE_QUOTE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */],
    ["[" /* LEFT_BRACKET */]: [
        4 /* IN_SUB_PATH */,
        2 /* INC_SUB_PATH_DEPTH */
    ],
    ["]" /* RIGHT_BRACKET */]: [1 /* IN_PATH */, 3 /* PUSH_SUB_PATH */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */]
};
pathStateMachine[5 /* IN_SINGLE_QUOTE */] = {
    ["'" /* SINGLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */]
};
pathStateMachine[6 /* IN_DOUBLE_QUOTE */] = {
    ["\"" /* DOUBLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
    ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
    ["l" /* ELSE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */]
};
/**
 * Check if an expression is a literal value.
 */
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
    return literalValueRE.test(exp);
}
/**
 * Strip quotes from a string
 */
function stripQuotes(str) {
    const a = str.charCodeAt(0);
    const b = str.charCodeAt(str.length - 1);
    return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
}
/**
 * Determine the type of a character in a keypath.
 */
function getPathCharType(ch) {
    if (ch === undefined || ch === null) {
        return "o" /* END_OF_FAIL */;
    }
    const code = ch.charCodeAt(0);
    switch (code) {
        case 0x5b: // [
        case 0x5d: // ]
        case 0x2e: // .
        case 0x22: // "
        case 0x27: // '
            return ch;
        case 0x5f: // _
        case 0x24: // $
        case 0x2d: // -
            return "i" /* IDENT */;
        case 0x09: // Tab (HT)
        case 0x0a: // Newline (LF)
        case 0x0d: // Return (CR)
        case 0xa0: // No-break space (NBSP)
        case 0xfeff: // Byte Order Mark (BOM)
        case 0x2028: // Line Separator (LS)
        case 0x2029: // Paragraph Separator (PS)
            return "w" /* WORKSPACE */;
    }
    return "i" /* IDENT */;
}
/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */
function formatSubPath(path) {
    const trimmed = path.trim();
    // invalid leading 0
    if (path.charAt(0) === '0' && isNaN(parseInt(path))) {
        return false;
    }
    return isLiteral(trimmed)
        ? stripQuotes(trimmed)
        : "*" /* ASTARISK */ + trimmed;
}
/**
 * Parse a string path into an array of segments
 */
function parse(path) {
    const keys = [];
    let index = -1;
    let mode = 0 /* BEFORE_PATH */;
    let subPathDepth = 0;
    let c;
    let key; // eslint-disable-line
    let newChar;
    let type;
    let transition;
    let action;
    let typeMap;
    const actions = [];
    actions[0 /* APPEND */] = () => {
        if (key === undefined) {
            key = newChar;
        }
        else {
            key += newChar;
        }
    };
    actions[1 /* PUSH */] = () => {
        if (key !== undefined) {
            keys.push(key);
            key = undefined;
        }
    };
    actions[2 /* INC_SUB_PATH_DEPTH */] = () => {
        actions[0 /* APPEND */]();
        subPathDepth++;
    };
    actions[3 /* PUSH_SUB_PATH */] = () => {
        if (subPathDepth > 0) {
            subPathDepth--;
            mode = 4 /* IN_SUB_PATH */;
            actions[0 /* APPEND */]();
        }
        else {
            subPathDepth = 0;
            if (key === undefined) {
                return false;
            }
            key = formatSubPath(key);
            if (key === false) {
                return false;
            }
            else {
                actions[1 /* PUSH */]();
            }
        }
    };
    function maybeUnescapeQuote() {
        const nextChar = path[index + 1];
        if ((mode === 5 /* IN_SINGLE_QUOTE */ &&
            nextChar === "'" /* SINGLE_QUOTE */) ||
            (mode === 6 /* IN_DOUBLE_QUOTE */ &&
                nextChar === "\"" /* DOUBLE_QUOTE */)) {
            index++;
            newChar = '\\' + nextChar;
            actions[0 /* APPEND */]();
            return true;
        }
    }
    while (mode !== null) {
        index++;
        c = path[index];
        if (c === '\\' && maybeUnescapeQuote()) {
            continue;
        }
        type = getPathCharType(c);
        typeMap = pathStateMachine[mode];
        transition = typeMap[type] || typeMap["l" /* ELSE */] || 8 /* ERROR */;
        // check parse error
        if (transition === 8 /* ERROR */) {
            return;
        }
        mode = transition[0];
        if (transition[1] !== undefined) {
            action = actions[transition[1]];
            if (action) {
                newChar = c;
                if (action() === false) {
                    return;
                }
            }
        }
        // check parse finish
        if (mode === 7 /* AFTER_PATH */) {
            return keys;
        }
    }
}
// path token cache
const cache = new Map();
function resolveValue(obj, path) {
    // check object
    if (!isObject(obj)) {
        return null;
    }
    // parse path
    let hit = cache.get(path);
    if (!hit) {
        hit = parse(path);
        if (hit) {
            cache.set(path, hit);
        }
    }
    // check hit
    if (!hit) {
        return null;
    }
    // resolve path value
    const len = hit.length;
    let last = obj;
    let i = 0;
    while (i < len) {
        const val = last[hit[i]];
        if (val === undefined) {
            return null;
        }
        last = val;
        i++;
    }
    return last;
}

const CHAR_SP = ' ';
const CHAR_CR = '\r';
const CHAR_LF = '\n';
const CHAR_LS = String.fromCharCode(0x2028);
const CHAR_PS = String.fromCharCode(0x2029);
function createScanner(str) {
    const _buf = str;
    let _index = 0;
    let _line = 1;
    let _column = 1;
    let _peekOffset = 0;
    const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
    const isLF = (index) => _buf[index] === CHAR_LF;
    const isPS = (index) => _buf[index] === CHAR_PS;
    const isLS = (index) => _buf[index] === CHAR_LS;
    const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
    const index = () => _index;
    const line = () => _line;
    const column = () => _column;
    const peekOffset = () => _peekOffset;
    function charAt(offset) {
        if (isCRLF(offset) || isPS(offset) || isLS(offset)) {
            return CHAR_LF;
        }
        return _buf[offset];
    }
    const currentChar = () => charAt(_index);
    const currentPeek = () => charAt(_index + _peekOffset);
    function next() {
        _peekOffset = 0;
        if (isLineEnd(_index)) {
            _line++;
            _column = 0;
        }
        if (isCRLF(_index)) {
            _index++;
        }
        _index++;
        _column++;
        return _buf[_index];
    }
    function peek() {
        if (isCRLF(_index + _peekOffset)) {
            _peekOffset++;
        }
        _peekOffset++;
        return _buf[_index + _peekOffset];
    }
    function reset() {
        _index = 0;
        _line = 1;
        _column = 1;
        _peekOffset = 0;
    }
    function resetPeek(offset = 0) {
        _peekOffset = offset;
    }
    function skipToPeek() {
        const target = _index + _peekOffset;
        while (target !== _index) {
            next();
        }
        _peekOffset = 0;
    }
    return Object.freeze({
        index,
        line,
        column,
        peekOffset,
        charAt,
        currentChar,
        currentPeek,
        next,
        peek,
        reset,
        resetPeek,
        skipToPeek
    });
}

function createPosition(line, column, offset) {
    return { line, column, offset };
}
function createLocation(start, end, source) {
    return { start, end, source };
}

// TODO: should be move to utils
const EOF = undefined;
function createTokenizer(source) {
    const _scnr = createScanner(source);
    const currentOffset = () => _scnr.index();
    const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
    const _initLoc = currentPosition();
    const _initOffset = currentOffset();
    const _context = {
        currentType: 14 /* EOF */,
        currentValue: null,
        offset: _initOffset,
        startLoc: _initLoc,
        endLoc: _initLoc,
        lastType: 14 /* EOF */,
        lastOffset: _initOffset,
        lastStartLoc: _initLoc,
        lastEndLoc: _initLoc
    };
    const context = () => _context;
    const getToken = (context, type, value) => {
        context.endLoc = currentPosition();
        context.currentType = type;
        context.currentValue = value;
        return {
            type,
            value,
            loc: createLocation(context.startLoc, context.endLoc)
        };
    };
    const peekSpaces = (scnr) => {
        while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
            scnr.peek();
        }
    };
    const skipSpaces = (scnr) => {
        peekSpaces(scnr);
        scnr.skipToPeek();
    };
    const isIdentifierStart = (ch) => {
        if (!ch) {
            return false;
        }
        const cc = ch.charCodeAt(0);
        return ((cc >= 97 && cc <= 122) || // a-z
            (cc >= 65 && cc <= 90)); // A-Z
    };
    const isNumberStart = (ch) => {
        if (!ch) {
            return false;
        }
        const cc = ch.charCodeAt(0);
        return cc >= 48 && cc <= 57; // 0-9
    };
    const isNamedIdentifier = (scnr, context) => {
        const { currentType } = context;
        if (currentType !== 2 /* BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    };
    const isListIdentifier = (scnr, context) => {
        const { currentType } = context;
        if (currentType !== 2 /* BraceLeft */) {
            return false;
        }
        peekSpaces(scnr);
        const ch = scnr.currentPeek() === '-' ? scnr.peek() : scnr.currentPeek();
        const ret = isNumberStart(ch);
        scnr.resetPeek();
        return ret;
    };
    const isLinkedModifier = (scnr, context) => {
        const { currentType } = context;
        if (currentType !== 8 /* LinkedDot */) {
            return false;
        }
        const ret = isIdentifierStart(scnr.currentPeek());
        scnr.resetPeek();
        return ret;
    };
    const isLinkedIdentifier = (scnr, context) => {
        const { currentType } = context;
        if (!(currentType === 9 /* LinkedDelimiter */ ||
            currentType === 12 /* ParenLeft */)) {
            return false;
        }
        const fn = () => {
            const ch = scnr.currentPeek();
            if (ch === "{" /* BraceLeft */) {
                return isIdentifierStart(scnr.peek());
            }
            else if (ch === "@" /* LinkedAlias */ ||
                ch === "%" /* Modulo */ ||
                ch === "|" /* Pipe */ ||
                ch === ":" /* LinkedDelimiter */ ||
                ch === "." /* LinkedDot */ ||
                ch === CHAR_SP ||
                !ch) {
                return false;
            }
            else if (ch === CHAR_LF) {
                return fn();
            }
            else {
                // other charactors
                return isIdentifierStart(ch);
            }
        };
        const ret = fn();
        scnr.resetPeek();
        return ret;
    };
    const isPluralStart = (scnr) => {
        peekSpaces(scnr);
        const ret = scnr.currentPeek() === "|" /* Pipe */;
        scnr.resetPeek();
        return ret;
    };
    const isTextStart = (scnr, context) => {
        const { currentType } = context;
        if (currentType === 2 /* BraceLeft */ ||
            currentType === 12 /* ParenLeft */ ||
            currentType === 8 /* LinkedDot */ ||
            currentType === 9 /* LinkedDelimiter */) {
            return false;
        }
        const fn = (hasSpace = false) => {
            const ch = scnr.currentPeek();
            if (ch === "{" /* BraceLeft */ ||
                ch === "%" /* Modulo */ ||
                ch === "@" /* LinkedAlias */ ||
                !ch) {
                return hasSpace;
            }
            else if (ch === "|" /* Pipe */) {
                return false;
            }
            else if (ch === CHAR_SP) {
                scnr.peek();
                return fn(true);
            }
            else if (ch === CHAR_LF) {
                scnr.peek();
                return fn(true);
            }
            else {
                return true;
            }
        };
        const ret = fn();
        scnr.resetPeek();
        return ret;
    };
    const takeChar = (scnr, fn) => {
        const ch = scnr.currentChar();
        if (ch === EOF) {
            return EOF;
        }
        if (fn(ch)) {
            scnr.next();
            return ch;
        }
        return null;
    };
    const takeIdentifierChar = (scnr) => {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return ((cc >= 97 && cc <= 122) || // a-z
                (cc >= 65 && cc <= 90) || // A-Z
                (cc >= 48 && cc <= 57) || // 0-9
                cc === 95 ||
                cc === 36); // _ $
        };
        return takeChar(scnr, closure);
    };
    const takeDigit = (scnr) => {
        const closure = (ch) => {
            const cc = ch.charCodeAt(0);
            return cc >= 48 && cc <= 57; // 0-9
        };
        return takeChar(scnr, closure);
    };
    const getDigits = (scnr) => {
        let ch = '';
        let num = '';
        while ((ch = takeDigit(scnr))) {
            num += ch;
        }
        if (num.length === 0) ;
        return num;
    };
    const readText = (scnr) => {
        const fn = (buf) => {
            const ch = scnr.currentChar();
            if (ch === "{" /* BraceLeft */ ||
                ch === "%" /* Modulo */ ||
                ch === "@" /* LinkedAlias */ ||
                !ch) {
                return buf;
            }
            else if (ch === CHAR_SP || ch === CHAR_LF) {
                if (isPluralStart(scnr)) {
                    return buf;
                }
                else {
                    buf += ch;
                    scnr.next();
                    return fn(buf);
                }
            }
            else {
                buf += ch;
                scnr.next();
                return fn(buf);
            }
        };
        return fn('');
    };
    const readNamedIdentifier = (scnr) => {
        skipSpaces(scnr);
        let ch = '';
        let name = '';
        while ((ch = takeIdentifierChar(scnr))) {
            name += ch;
        }
        skipSpaces(scnr);
        return name;
    };
    const readListIdentifier = (scnr) => {
        skipSpaces(scnr);
        let value = '';
        if (scnr.currentChar() === '-') {
            scnr.next();
            value += `-${getDigits(scnr)}`;
        }
        else {
            value += getDigits(scnr);
        }
        skipSpaces(scnr);
        return parseInt(value, 10);
    };
    const readLinkedModifierArg = (scnr) => {
        let ch = '';
        let name = '';
        while ((ch = takeIdentifierChar(scnr))) {
            name += ch;
        }
        return name;
    };
    const readLinkedIdentifier = (scnr, context) => {
        const fn = (detect = false, useParentLeft = false, buf) => {
            const ch = scnr.currentChar();
            if (ch === "{" /* BraceLeft */ ||
                ch === "%" /* Modulo */ ||
                ch === "@" /* LinkedAlias */ ||
                ch === ")" /* ParenRight */ ||
                ch === "|" /* Pipe */ ||
                !ch) {
                return buf;
            }
            else if (ch === CHAR_SP) {
                if (useParentLeft) {
                    buf += ch;
                    scnr.next();
                    return fn(detect, useParentLeft, buf);
                }
                else {
                    return buf;
                }
            }
            else if (ch === CHAR_LF) {
                buf += ch;
                scnr.next();
                return fn(detect, useParentLeft, buf);
            }
            else {
                buf += ch;
                scnr.next();
                return fn(true, useParentLeft, buf);
            }
        };
        return fn(false, context.currentType === 12 /* ParenLeft */, '');
    };
    const readPlural = (scnr) => {
        skipSpaces(scnr);
        const plural = scnr.currentChar();
        scnr.next();
        skipSpaces(scnr);
        return plural;
    };
    const readToken = (scnr, context) => {
        let token = { type: 14 /* EOF */ };
        const ch = scnr.currentChar();
        switch (ch) {
            case "{" /* BraceLeft */:
                scnr.next();
                token = getToken(context, 2 /* BraceLeft */, "{" /* BraceLeft */);
                break;
            case "}" /* BraceRight */:
                scnr.next();
                token = getToken(context, 3 /* BraceRight */, "}" /* BraceRight */);
                break;
            case "@" /* LinkedAlias */:
                scnr.next();
                token = getToken(context, 7 /* LinkedAlias */, "@" /* LinkedAlias */);
                break;
            case "." /* LinkedDot */:
                scnr.next();
                token = getToken(context, 8 /* LinkedDot */, "." /* LinkedDot */);
                break;
            case ":" /* LinkedDelimiter */:
                scnr.next();
                token = getToken(context, 9 /* LinkedDelimiter */, ":" /* LinkedDelimiter */);
                break;
            case "(" /* ParenLeft */:
                scnr.next();
                token = getToken(context, 12 /* ParenLeft */, "(" /* ParenLeft */);
                break;
            case ")" /* ParenRight */:
                scnr.next();
                token = getToken(context, 13 /* ParenRight */, ")" /* ParenRight */);
                break;
            case "%" /* Modulo */:
                scnr.next();
                token = getToken(context, 4 /* Modulo */, "%" /* Modulo */);
                break;
            default:
                if (isPluralStart(scnr)) {
                    token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                }
                else if (isTextStart(scnr, context)) {
                    token = getToken(context, 0 /* Text */, readText(scnr));
                }
                else if (isNamedIdentifier(scnr, context)) {
                    token = getToken(context, 5 /* Named */, readNamedIdentifier(scnr));
                }
                else if (isListIdentifier(scnr, context)) {
                    token = getToken(context, 6 /* List */, readListIdentifier(scnr));
                }
                else if (isLinkedModifier(scnr, context)) {
                    token = getToken(context, 11 /* LinkedModifier */, readLinkedModifierArg(scnr));
                }
                else if (isLinkedIdentifier(scnr, context)) {
                    if (ch === "{" /* BraceLeft */) {
                        scnr.next();
                        token = getToken(context, 2 /* BraceLeft */, "{" /* BraceLeft */);
                    }
                    else {
                        token = getToken(context, 10 /* LinkedKey */, readLinkedIdentifier(scnr, context));
                    }
                }
                break;
        }
        return token;
    };
    const nextToken = () => {
        const { currentType, offset, startLoc, endLoc } = _context;
        _context.lastType = currentType;
        _context.lastOffset = offset;
        _context.lastStartLoc = startLoc;
        _context.lastEndLoc = endLoc;
        _context.offset = currentOffset();
        _context.startLoc = currentPosition();
        if (!_scnr.currentChar()) {
            return getToken(_context, 14 /* EOF */);
        }
        return readToken(_scnr, _context);
    };
    return Object.freeze({
        nextToken,
        currentOffset,
        currentPosition,
        context
    });
}

function createParser() {
    const startNode = (type, offset, loc) => {
        return {
            type,
            start: offset,
            end: offset,
            loc: { start: loc, end: loc }
        };
    };
    const endNode = (node, offset, loc, type) => {
        node.end = offset;
        if (type) {
            node.type = type;
        }
        if (node.loc) {
            node.loc.end = loc;
        }
    };
    const parseText = (tokenizer, value) => {
        const context = tokenizer.context();
        const node = startNode(3 /* Text */, context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    };
    const parseList = (tokenizer, index) => {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(5 /* List */, offset, loc);
        node.index = index;
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    };
    const parseNamed = (tokenizer, key) => {
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
        const node = startNode(4 /* Named */, offset, loc);
        node.key = key;
        tokenizer.nextToken(); // skip brach right
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    };
    const parseLinkedModifier = (tokenizer) => {
        const token = tokenizer.nextToken();
        // check token
        if (!token.value || typeof token.value === 'number') {
            // TODO: should be thrown syntax error
            throw new Error();
        }
        const context = tokenizer.context();
        const { lastOffset: offset, lastStartLoc: loc } = context; // get linked dot loc
        const node = startNode(8 /* LinkedModifier */, offset, loc);
        node.value = token.value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    };
    const parseLinkedKey = (tokenizer, value) => {
        const context = tokenizer.context();
        const node = startNode(7 /* LinkedKey */, context.offset, context.startLoc);
        node.value = value;
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    };
    const parseLinked = (tokenizer) => {
        const context = tokenizer.context();
        const linkedNode = startNode(6 /* Linked */, context.offset, context.startLoc);
        let token = tokenizer.nextToken();
        if (token.type === 8 /* LinkedDot */) {
            linkedNode.modifier = parseLinkedModifier(tokenizer);
            token = tokenizer.nextToken();
        }
        // asset check token
        if (token.type !== 9 /* LinkedDelimiter */) {
            // TODO: should be thrown syntax error
            throw new Error();
        }
        token = tokenizer.nextToken();
        // skip paren left
        let hasParen = false;
        if (token.type === 12 /* ParenLeft */) {
            token = tokenizer.nextToken();
            hasParen = true;
        }
        // skip brace left
        if (token.type === 2 /* BraceLeft */) {
            token = tokenizer.nextToken();
        }
        switch (token.type) {
            case 10 /* LinkedKey */:
                if (!token.value || typeof token.value !== 'string') {
                    // TODO: should be thrown syntax error
                    throw new Error();
                }
                linkedNode.key = parseLinkedKey(tokenizer, token.value);
                break;
            case 5 /* Named */:
                if (!token.value || typeof token.value === 'number') {
                    // TODO: should be thrown syntax error
                    throw new Error();
                }
                linkedNode.key = parseNamed(tokenizer, token.value);
                break;
            case 6 /* List */:
                if (token.value === undefined || typeof token.value === 'string') {
                    // TODO: should be thrown syntax error
                    throw new Error();
                }
                linkedNode.key = parseList(tokenizer, token.value);
                break;
            default:
                // TODO: should be thrown syntax error
                throw new Error();
        }
        // skip paren right
        if (hasParen) {
            token = tokenizer.nextToken();
        }
        endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
        return linkedNode;
    };
    const parseMessage = (tokenizer) => {
        const context = tokenizer.context();
        const startOffset = context.currentType === 1 /* Pipe */
            ? tokenizer.currentOffset()
            : context.offset;
        const startLoc = context.currentType === 1 /* Pipe */
            ? context.endLoc
            : context.startLoc;
        const node = startNode(2 /* Message */, startOffset, startLoc);
        node.items = [];
        do {
            const token = tokenizer.nextToken();
            switch (token.type) {
                case 0 /* Text */:
                    if (!token.value || typeof token.value === 'number') {
                        // TODO: should be thrown syntax error
                        throw new Error();
                    }
                    node.items.push(parseText(tokenizer, token.value));
                    break;
                case 6 /* List */:
                    if (token.value === undefined || typeof token.value === 'string') {
                        // TODO: should be thrown syntax error
                        throw new Error();
                    }
                    node.items.push(parseList(tokenizer, token.value));
                    break;
                case 5 /* Named */:
                    if (!token.value || typeof token.value === 'number') {
                        // TODO: should be thrown syntax error
                        throw new Error();
                    }
                    node.items.push(parseNamed(tokenizer, token.value));
                    break;
                case 7 /* LinkedAlias */:
                    node.items.push(parseLinked(tokenizer));
                    break;
            }
        } while (context.currentType !== 14 /* EOF */ &&
            context.currentType !== 1 /* Pipe */);
        // adjust message node loc
        const endOffset = context.currentType === 1 /* Pipe */
            ? context.lastOffset
            : tokenizer.currentOffset();
        const endLoc = context.currentType === 1 /* Pipe */
            ? context.lastEndLoc
            : tokenizer.currentPosition();
        endNode(node, endOffset, endLoc);
        return node;
    };
    const parsePlural = (tokenizer, offset, loc, msgNode) => {
        const context = tokenizer.context();
        const node = startNode(1 /* Plural */, offset, loc);
        node.cases = [];
        node.cases.push(msgNode);
        do {
            const msg = parseMessage(tokenizer);
            node.cases.push(msg);
        } while (context.currentType !== 14 /* EOF */);
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    };
    const parseResource = (tokenizer) => {
        const context = tokenizer.context();
        const { offset, startLoc } = context;
        const msgNode = parseMessage(tokenizer);
        if (context.currentType === 14 /* EOF */) {
            return msgNode;
        }
        else {
            return parsePlural(tokenizer, offset, startLoc, msgNode);
        }
    };
    function parse(source) {
        const tokenizer = createTokenizer(source);
        const context = tokenizer.context();
        const node = startNode(0 /* Resource */, context.offset, context.startLoc);
        node.body = parseResource(tokenizer);
        // assert wheather achieved to EOF
        if (context.currentType !== 14 /* EOF */) {
            // TODO: should be thrown syntax error
            throw new Error();
        }
        endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
        return node;
    }
    return Object.freeze({
        parse
    });
}

function createTransformer(ast /*, options: TransformOptions */) {
    const _context = {
        ast,
        needInterpolate: false
    };
    const context = () => _context;
    return Object.freeze({
        context
    });
}
function traverseNodes(nodes, transformer) {
    for (let i = 0; i < nodes.length; i++) {
        traverseNode(nodes[i], transformer);
    }
}
function traverseNode(node, transformer) {
    const context = transformer.context();
    // TODO: if we need pre-hook of transform, should be implemeted to here
    switch (node.type) {
        case 1 /* Plural */:
            traverseNodes(node.cases, transformer);
            break;
        case 2 /* Message */:
            traverseNodes(node.items, transformer);
            break;
        case 6 /* Linked */:
            const linked = node;
            linked.modifier && traverseNode(linked.modifier, transformer);
            traverseNode(linked.key, transformer);
            break;
        case 5 /* List */:
        case 4 /* Named */:
            context.needInterpolate = true;
            break;
    }
    // TODO: if we need post-hook of transform, should be implemeted to here
}
// transform AST
function transform(ast /*, options: TransformOptions */) {
    const transformer = createTransformer(ast);
    // traverse
    ast.body && traverseNode(ast.body, transformer);
    // set meta information
    const context = transformer.context();
    ast.needInterpolate = context.needInterpolate;
}

function createCodeGenerator(source) {
    const _context = {
        source,
        code: '',
        indentLevel: 0
    };
    const context = () => _context;
    const push = (code) => {
        _context.code += code;
    };
    const _newline = (n) => {
        push('\n' + `  `.repeat(n));
    };
    const indent = () => {
        _newline(++_context.indentLevel);
    };
    const deindent = (withoutNewLine) => {
        if (withoutNewLine) {
            --_context.indentLevel;
        }
        else {
            _newline(--_context.indentLevel);
        }
    };
    const newline = () => {
        _newline(_context.indentLevel);
    };
    return Object.freeze({
        context,
        push,
        indent,
        deindent,
        newline
    });
}
function generateLinkedNode(generator, node) {
    if (node.modifier) {
        generator.push('ctx.modifier(');
        generateNode(generator, node.modifier);
        generator.push(')(');
    }
    generator.push('ctx.message(');
    generateNode(generator, node.key);
    generator.push(')(ctx)');
    if (node.modifier) {
        generator.push(', ctx.type)');
    }
}
function generateMessageNode(generator, node) {
    generator.push('ctx.normalize([');
    generator.indent();
    const length = node.items.length;
    for (let i = 0; i < length; i++) {
        generateNode(generator, node.items[i]);
        if (i === length - 1) {
            break;
        }
        generator.push(', ');
    }
    generator.deindent();
    generator.push('])');
}
function generatePluralNode(generator, node) {
    if (node.cases.length > 1) {
        generator.push('[');
        generator.indent();
        const length = node.cases.length;
        for (let i = 0; i < length; i++) {
            generateNode(generator, node.cases[i]);
            if (i === length - 1) {
                break;
            }
            generator.push(', ');
        }
        generator.deindent();
        generator.push(`][ctx.pluralRule(ctx.pluralIndex, ${length}, ctx.orgPluralRule)]`);
    }
}
function generateResource(generator, node) {
    if (node.body) {
        generateNode(generator, node.body);
    }
    else {
        generator.push('null');
    }
}
function generateNode(generator, node) {
    switch (node.type) {
        case 0 /* Resource */:
            generateResource(generator, node);
            break;
        case 1 /* Plural */:
            generatePluralNode(generator, node);
            break;
        case 2 /* Message */:
            generateMessageNode(generator, node);
            break;
        case 6 /* Linked */:
            generateLinkedNode(generator, node);
            break;
        case 8 /* LinkedModifier */:
            generator.push(JSON.stringify(node.value));
            break;
        case 7 /* LinkedKey */:
            generator.push(JSON.stringify(node.value));
            break;
        case 5 /* List */:
            generator.push(`ctx.interpolate(ctx.list(${node.index}))`);
            break;
        case 4 /* Named */:
            generator.push(`ctx.interpolate(ctx.named(${JSON.stringify(node.key)}))`);
            break;
        case 3 /* Text */:
            generator.push(JSON.stringify(node.value));
            break;
        default:
            // TODO: should be handled with error
            throw new Error(`unhandled codegen node type: ${node.type}`);
    }
}
// generate code from AST
const generate = (ast) => {
    const generator = createCodeGenerator(ast.loc && ast.loc.source);
    generator.push(`function __msg__ (ctx) {`);
    generator.indent();
    generator.push(`return `);
    generateNode(generator, ast);
    generator.deindent();
    generator.push(`}`);
    return generator.context().code;
};

function createCompiler() {
    const _parser = createParser();
    const compile = (source /*,
    options: CompileOptions = {}*/) => {
        const ast = _parser.parse(source);
        transform(ast);
        const code = generate(ast);
        return { code, ast };
    };
    return Object.freeze({
        compile
    });
}
const compileCache = Object.create(null);
const compiler = createCompiler();
function compile(source, options = {}) {
    const { code } = compiler.compile(source, options);
    const msg = new Function(`return ${code}`)();
    return (compileCache[source] = msg);
}

const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => ''; // eslint-disable-line
const DEFAULT_TYPE = 'text';
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? values[0] : values.join('');
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
    choice = Math.abs(choice);
    if (choicesLength === 2) {
        // prettier-ignore
        return choice
            ? choice > 1
                ? 1
                : 0
            : 1;
    }
    return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
    // prettier-ignore
    const index = isNumber(options.pluralIndex)
        ? options.pluralIndex
        : -1;
    // prettier-ignore
    return options.named && (isNumber(options.named.count) || isNumber(options.named.n))
        ? isNumber(options.named.count)
            ? options.named.count
            : isNumber(options.named.n)
                ? options.named.n
                : index
        : index;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeNamed(pluralIndex, named) {
    if (!named.count) {
        named.count = pluralIndex;
    }
    if (!named.n) {
        named.n = pluralIndex;
    }
}
function createMessageContext(options = {}) {
    const locale = options.locale;
    // TODO: should be implemented warning message
    const pluralIndex = getPluralIndex(options);
    // TODO: should be implemented warning message
    const pluralRule = isObject(options.pluralRules) &&
        isString(locale) &&
        isFunction(options.pluralRules[locale])
        ? options.pluralRules[locale]
        : pluralDefault;
    const orgPluralRule = isObject(options.pluralRules) &&
        isString(locale) &&
        isFunction(options.pluralRules[locale])
        ? pluralDefault
        : undefined;
    const _list = options.list || [];
    // TODO: should be implemented warning message
    const list = (index) => _list[index];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _named = options.named || {};
    isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
    // TODO: should be implemented warning message
    const named = (key) => _named[key];
    // TODO: should be implemented warning message
    const modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
    const message = (name) => {
        // TODO: need to design resolve message function?
        // prettier-ignore
        const msg = isFunction(options.messages)
            ? options.messages(name)
            : isObject(options.messages)
                ? options.messages[name]
                : false;
        return !msg
            ? options.parent
                ? options.parent.message(name) // resolve from parent messages
                : DEFAULT_MESSAGE
            : msg;
    };
    const type = isPlainObject(options.processor) && isString(options.processor.type)
        ? options.processor.type
        : DEFAULT_TYPE;
    const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize)
        ? options.processor.normalize
        : DEFAULT_NORMALIZE;
    const interpolate = isPlainObject(options.processor) &&
        isFunction(options.processor.interpolate)
        ? options.processor.interpolate
        : DEFAULT_INTERPOLATE;
    return {
        list,
        named,
        pluralIndex,
        pluralRule,
        orgPluralRule,
        modifier,
        message,
        type,
        interpolate,
        normalize
    };
}

const NOOP_MESSAGE_FUNCTION = () => '';
// implementationo of `translate` function
function translate(context, ...args) {
    const { messages, fallbackFormat, postTranslation, unresolving, fallbackLocale, _compileCache } = context;
    const [key, options] = parseTranslateArgs(...args);
    const missingWarn = isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    // prettier-ignore
    const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) // default by function option
        ? !isBoolean(options.default)
            ? options.default
            : key
        : fallbackFormat // default by `fallbackFormat` option
            ? key
            : '';
    const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    // resolve format
    let message = {};
    let targetLocale;
    let format = null;
    for (let i = 0; i < locales.length; i++) {
        targetLocale = locales[i];
        if (
            locale !== targetLocale &&
            isTrarnslateFallbackWarn(fallbackWarn, key)) {
            warn(`Fall back to translate '${key}' key with '${targetLocale}' locale.`);
        }
        message = messages[targetLocale] || {};
        format = resolveValue(message, key);
        if (isString(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, 'translate');
    }
    // if you use default message, set it as format!
    if (!isString(format) && enableDefaultMsg) {
        format = defaultMsgOrKey;
    }
    // checking format and target locale
    if (!isString(format) || !isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    // compile format
    let msg = _compileCache.get(format);
    if (!msg) {
        msg = compile(format);
        _compileCache.set(format, msg);
    }
    // console.log('msg', msg.toString())
    // evaluate message with context
    const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
    const msgContext = createMessageContext(ctxOptions);
    const messaged = msg(msgContext);
    // if use post translation option, procee it with handler
    return postTranslation ? postTranslation(messaged) : messaged;
}
function parseTranslateArgs(...args) {
    const [arg1, arg2, arg3] = args;
    const options = {};
    if (!isString(arg1)) {
        throw new Error('TODO');
    }
    const key = arg1;
    if (isNumber(arg2)) {
        options.plural = arg2;
    }
    else if (isString(arg2)) {
        options.default = arg2;
    }
    else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
        options.named = arg2;
    }
    else if (isArray(arg2)) {
        options.list = arg2;
    }
    if (isNumber(arg3)) {
        options.plural = arg3;
    }
    else if (isString(arg3)) {
        options.default = arg3;
    }
    else if (isPlainObject(arg3)) {
        Object.assign(options, arg3);
    }
    return [key, options];
}
function getMessageContextOptions(context, locale, message, options) {
    const { modifiers, pluralRules, _compileCache } = context;
    // TODO: need to design resolve message function?
    const resolveMessage = (key) => {
        const fn = _compileCache.get(key);
        if (fn) {
            return fn;
        }
        const val = resolveValue(message, key);
        if (isString(val)) {
            const msg = compile(val);
            _compileCache.set(val, msg);
            return msg;
        }
        else if (isFunction(val)) {
            return val;
        }
        else {
            // TODO: should be implemented warning message
            return NOOP_MESSAGE_FUNCTION;
        }
    };
    const ctxOptions = {
        locale,
        modifiers,
        pluralRules,
        messages: resolveMessage
    };
    if (context.processor) {
        ctxOptions.processor = context.processor;
    }
    if (options.list) {
        ctxOptions.list = options.list;
    }
    if (options.named) {
        ctxOptions.named = options.named;
    }
    if (isNumber(options.plural)) {
        ctxOptions.pluralIndex = options.plural;
    }
    return ctxOptions;
}

// implementation of `datetime` function
function datetime(context, ...args) {
    const { datetimeFormats, unresolving, fallbackLocale, _datetimeFormatters } = context;
    if ( !Availabilities.dateTimeFormat) {
        warn(`Cannot format a Date value due to not supported Intl.DateTimeFormat.`);
        return MISSING_RESOLVE_VALUE;
    }
    const [value, options, orverrides] = parseDateTimeArgs(...args);
    const { key } = options;
    const missingWarn = isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = isBoolean(options.part) ? options.part : false;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key)) {
        return new Intl.DateTimeFormat(locale).format(value);
    }
    // resolve format
    let datetimeFormat = {};
    let targetLocale;
    let format = null;
    for (let i = 0; i < locales.length; i++) {
        targetLocale = locales[i];
        if (
            locale !== targetLocale &&
            isTrarnslateFallbackWarn(fallbackWarn, key)) {
            warn(`Fall back to datetime format '${key}' key with '${targetLocale}' locale.`);
        }
        datetimeFormat = datetimeFormats[targetLocale] || {};
        format = datetimeFormat[key];
        if (isPlainObject(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, 'datetime');
    }
    // checking format and target locale
    if (!isPlainObject(format) || !isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(orverrides)) {
        id = `${id}__${JSON.stringify(orverrides)}`;
    }
    let formatter = _datetimeFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.DateTimeFormat(targetLocale, Object.assign({}, format, orverrides));
        _datetimeFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseDateTimeArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let orverrides = {};
    if (!(isNumber(arg1) || isDate(arg1))) {
        throw new Error('TODO');
    }
    const value = arg1;
    if (isString(arg2)) {
        options.key = arg2;
    }
    else if (isPlainObject(arg2)) {
        options = arg2;
    }
    if (isString(arg3)) {
        options.locale = arg3;
    }
    else if (isPlainObject(arg3)) {
        orverrides = arg3;
    }
    if (isPlainObject(arg4)) {
        orverrides = arg4;
    }
    return [value, options, orverrides];
}
function clearDateTimeFormat(context, locale, format) {
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context._datetimeFormatters.has(id)) {
            continue;
        }
        context._datetimeFormatters.delete(id);
    }
}

// implementation of `number` function
function number(context, ...args) {
    const { numberFormats, unresolving, fallbackLocale, _numberFormatters } = context;
    if ( !Availabilities.numberFormat) {
        warn(`Cannot format a Date value due to not supported Intl.NumberFormat.`);
        return MISSING_RESOLVE_VALUE;
    }
    const [value, options, orverrides] = parseNumberArgs(...args);
    const { key } = options;
    const missingWarn = isBoolean(options.missingWarn)
        ? options.missingWarn
        : context.missingWarn;
    const fallbackWarn = isBoolean(options.fallbackWarn)
        ? options.fallbackWarn
        : context.fallbackWarn;
    const part = isBoolean(options.part) ? options.part : false;
    const locale = isString(options.locale) ? options.locale : context.locale;
    const locales = getLocaleChain(context, fallbackLocale, locale);
    if (!isString(key)) {
        return new Intl.NumberFormat(locale).format(value);
    }
    // resolve format
    let numberFormat = {};
    let targetLocale;
    let format = null;
    for (let i = 0; i < locales.length; i++) {
        targetLocale = locales[i];
        if (
            locale !== targetLocale &&
            isTrarnslateFallbackWarn(fallbackWarn, key)) {
            warn(`Fall back to number format '${key}' key with '${targetLocale}' locale.`);
        }
        numberFormat = numberFormats[targetLocale] || {};
        format = numberFormat[key];
        if (isPlainObject(format))
            break;
        handleMissing(context, key, targetLocale, missingWarn, 'number');
    }
    // checking format and target locale
    if (!isPlainObject(format) || !isString(targetLocale)) {
        return unresolving ? NOT_REOSLVED : key;
    }
    let id = `${targetLocale}__${key}`;
    if (!isEmptyObject(orverrides)) {
        id = `${id}__${JSON.stringify(orverrides)}`;
    }
    let formatter = _numberFormatters.get(id);
    if (!formatter) {
        formatter = new Intl.NumberFormat(targetLocale, Object.assign({}, format, orverrides));
        _numberFormatters.set(id, formatter);
    }
    return !part ? formatter.format(value) : formatter.formatToParts(value);
}
function parseNumberArgs(...args) {
    const [arg1, arg2, arg3, arg4] = args;
    let options = {};
    let orverrides = {};
    if (!isNumber(arg1)) {
        throw new Error('TODO');
    }
    const value = arg1;
    if (isString(arg2)) {
        options.key = arg2;
    }
    else if (isPlainObject(arg2)) {
        options = arg2;
    }
    if (isString(arg3)) {
        options.locale = arg3;
    }
    else if (isPlainObject(arg3)) {
        orverrides = arg3;
    }
    if (isPlainObject(arg4)) {
        orverrides = arg4;
    }
    return [value, options, orverrides];
}
function clearNumberFormat(context, locale, format) {
    for (const key in format) {
        const id = `${locale}__${key}`;
        if (!context._numberFormatters.has(id)) {
            continue;
        }
        context._numberFormatters.delete(id);
    }
}

/**
 *  Composer
 *
 *  Composer is offered composable API for Vue 3
 *  This module is offered new style vue-i18n API
 */
let composerID = 0;
function defineRuntimeMissingHandler(missing) {
    return (ctx, locale, key, type) => {
        return missing(locale, key, vue.getCurrentInstance() || undefined, type);
    };
}
function getLocaleMessages(options, locale) {
    const { messages, __i18n } = options;
    // prettier-ignore
    let ret = isPlainObject(messages)
        ? messages
        : isArray(__i18n)
            ? {}
            : { [locale]: {} };
    // merge locale messages of i18n custom block
    if (isArray(__i18n)) {
        __i18n.forEach(raw => {
            ret = Object.assign(ret, JSON.parse(raw));
        });
    }
    return ret;
}
/**
 * Composer
 *
 * @example
 * case: Global resource base localization
 * ```js
 * import { createApp } from 'vue'
 * import { createComposer, useI18n } 'vue-i18n'
 *
 * const i18n = createComposer({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const app = createApp({
 *   setup() {
 *     return useI18n()
 *   }
 * })
 *
 * app.use(i18n)
 * app.mount('#app')
 * ```
 */
function createComposer(options = {}) {
    const { __root } = options;
    // reactivity states
    const _locale = vue.ref(
    // prettier-ignore
    __root
        ? __root.locale.value
        : isString(options.locale)
            ? options.locale
            : 'en-US');
    const _fallbackLocale = vue.ref(
    // prettier-ignore
    __root
        ? __root.fallbackLocale.value
        : isString(options.fallbackLocale) ||
            isArray(options.fallbackLocale) ||
            isPlainObject(options.fallbackLocale) ||
            options.fallbackLocale === false
            ? options.fallbackLocale
            : _locale.value);
    const _messages = vue.ref(getLocaleMessages(options, _locale.value));
    const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats)
        ? options.datetimeFormats
        : { [_locale.value]: {} });
    const _numberFormats = vue.ref(isPlainObject(options.numberFormats)
        ? options.numberFormats
        : { [_locale.value]: {} });
    // warning supress options
    // prettier-ignore
    let _missingWarn = __root
        ? __root.missingWarn
        : isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
            ? options.missingWarn
            : true;
    // prettier-ignore
    let _fallbackWarn = __root
        ? __root.fallbackWarn
        : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
            ? options.fallbackWarn
            : true;
    let _fallbackRoot = isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    // configure fall bakck to root
    let _fallbackFormat = isBoolean(options.fallbackFormat)
        ? options.fallbackFormat
        : false;
    // runtime missing
    let _missing = isFunction(options.missing) ? options.missing : null;
    let _runtimeMissing = isFunction(options.missing)
        ? defineRuntimeMissingHandler(options.missing)
        : null;
    // postTranslation handler
    let _postTranslation = isFunction(options.postTranslation)
        ? options.postTranslation
        : null;
    // custom linked modifiers
    // prettier-ignore
    const _modifiers = __root
        ? __root.modifiers
        : isPlainObject(options.modifiers)
            ? options.modifiers
            : {};
    // pluralRules
    const _pluralRules = options.pluralRules;
    // runtime context
    let _context; // eslint-disable-line prefer-const
    const getRuntimeContext = () => {
        return createRuntimeContext({
            locale: _locale.value,
            fallbackLocale: _fallbackLocale.value,
            messages: _messages.value,
            datetimeFormats: _datetimeFormats.value,
            numberFormats: _numberFormats.value,
            modifiers: _modifiers,
            pluralRules: _pluralRules,
            missing: _runtimeMissing === null ? undefined : _runtimeMissing,
            missingWarn: _missingWarn,
            fallbackWarn: _fallbackWarn,
            fallbackFormat: _fallbackFormat,
            unresolving: true,
            postTranslation: _postTranslation === null ? undefined : _postTranslation,
            _compileCache: isPlainObject(_context)
                ? _context._compileCache
                : undefined,
            _datetimeFormatters: isPlainObject(_context)
                ? _context._datetimeFormatters
                : undefined,
            _numberFormatters: isPlainObject(_context)
                ? _context._numberFormatters
                : undefined
        });
    };
    _context = getRuntimeContext();
    updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
    // locale
    const locale = vue.computed({
        get: () => _locale.value,
        set: val => {
            _locale.value = val;
            _context.locale = _locale.value;
        }
    });
    // fallbackLocale
    const fallbackLocale = vue.computed({
        get: () => _fallbackLocale.value,
        set: val => {
            _fallbackLocale.value = val;
            _context.fallbackLocale = _fallbackLocale.value;
            updateFallbackLocale(_context, _locale.value, val);
        }
    });
    // messages
    const messages = vue.computed(() => _messages.value);
    // datetimeFormats
    const datetimeFormats = vue.computed(() => _datetimeFormats.value);
    // numberFormats
    const numberFormats = vue.computed(() => _numberFormats.value);
    // getPostTranslationHandler
    const getPostTranslationHandler = () => isFunction(_postTranslation) ? _postTranslation : null;
    // setPostTranslationHandler
    const setPostTranslationHandler = (handler) => {
        _postTranslation = handler;
        _context.postTranslation = handler;
    };
    // getMissingHandler
    const getMissingHandler = () => _missing;
    // setMissingHandler
    const setMissingHandler = (handler) => {
        if (handler !== null) {
            _runtimeMissing = defineRuntimeMissingHandler(handler);
        }
        _missing = handler;
        _context.missing = _runtimeMissing;
    };
    // t
    const t = (...args) => {
        return vue.computed(() => {
            const ret = translate(_context, ...args);
            if (isNumber(ret) && ret === NOT_REOSLVED) {
                const [key] = parseTranslateArgs(...args);
                if ( _fallbackRoot && __root) {
                    warn(`Fall back to translate '${key}' with root locale.`);
                }
                return _fallbackRoot && __root ? __root.t(...args) : key;
            }
            else if (isString(ret)) {
                return ret;
            }
            else {
                throw new Error('TODO:'); // TODO
            }
        }).value;
    };
    // d
    const d = (...args) => {
        return vue.computed(() => {
            const ret = datetime(_context, ...args);
            if (isNumber(ret) && ret === NOT_REOSLVED) {
                const [, options] = parseDateTimeArgs(...args);
                if ( _fallbackRoot && __root) {
                    const key = isString(options.key) ? options.key : '';
                    warn(`Fall back to datetime format '${key}' with root locale.`);
                }
                return _fallbackRoot && __root
                    ? __root.d(...args)
                    : MISSING_RESOLVE_VALUE;
            }
            else if (isString(ret)) {
                return ret;
            }
            else {
                throw new Error('TODO:'); // TODO
            }
        }).value;
    };
    // n
    const n = (...args) => {
        return vue.computed(() => {
            const ret = number(_context, ...args);
            if (isNumber(ret) && ret === NOT_REOSLVED) {
                const [, options] = parseNumberArgs(...args);
                if ( _fallbackRoot && __root) {
                    const key = isString(options.key) ? options.key : '';
                    warn(`Fall back to number format '${key}' with root locale.`);
                }
                return _fallbackRoot && __root
                    ? __root.d(...args)
                    : MISSING_RESOLVE_VALUE;
            }
            else if (isString(ret)) {
                return ret;
            }
            else {
                throw new Error('TODO:'); // TODO
            }
        }).value;
    };
    // for custom processor
    const normalize = (values) => {
        return values.map(val => (isString(val) ? vue.createTextVNode(val) : val));
    };
    const interpolate = (val) => val;
    const processor = {
        type: 'vnode',
        normalize,
        interpolate
    };
    // __transrateVNode, using for `i18n-t` component
    const __transrateVNode = (...args) => {
        return vue.computed(() => {
            let ret;
            try {
                // translate with custom processor
                _context.processor = processor;
                ret = translate(_context, ...args);
            }
            finally {
                _context.processor = null;
            }
            if (isNumber(ret) && ret === NOT_REOSLVED) {
                const [key] = parseTranslateArgs(...args);
                if ( _fallbackRoot && __root) {
                    warn(`Fall back to translate '${key}' with root locale.`);
                }
                return _fallbackRoot && __root ? __root.__transrateVNode(...args) : key;
            }
            else if (isArray(ret)) {
                return ret;
            }
            else {
                throw new Error('TODO:'); // TODO
            }
        }).value;
    };
    // __numberParts, using for `i18n-n` component
    const __numberParts = (...args) => {
        return vue.computed(() => {
            const ret = number(_context, ...args);
            if (isNumber(ret) && ret === NOT_REOSLVED) {
                const [, options] = parseNumberArgs(...args);
                if ( _fallbackRoot && __root) {
                    const key = isString(options.key) ? options.key : '';
                    warn(`Fall back to number format '${key}' with root locale.`);
                }
                return _fallbackRoot && __root ? __root.__numberParts(...args) : [];
            }
            else if (isString(ret) || isArray(ret)) {
                return ret;
            }
            else {
                throw new Error('TODO:'); // TODO
            }
        }).value;
    };
    // __datetimeParts, using for `i18n-d` component
    const __datetimeParts = (...args) => {
        return vue.computed(() => {
            const ret = datetime(_context, ...args);
            if (isNumber(ret) && ret === NOT_REOSLVED) {
                const [, options] = parseDateTimeArgs(...args);
                if ( _fallbackRoot && __root) {
                    const key = isString(options.key) ? options.key : '';
                    warn(`Fall back to datetime format '${key}' with root locale.`);
                }
                return _fallbackRoot && __root ? __root.__datetimeParts(...args) : [];
            }
            else if (isString(ret) || isArray(ret)) {
                return ret;
            }
            else {
                throw new Error('TODO:'); // TODO
            }
        }).value;
    };
    // getLocaleMessage
    const getLocaleMessage = (locale) => _messages.value[locale] || {};
    // setLocaleMessage
    const setLocaleMessage = (locale, message) => {
        _messages.value[locale] = message;
        _context.messages = _messages.value;
    };
    // mergeLocaleMessage
    const mergeLocaleMessage = (locale, message) => {
        _messages.value[locale] = Object.assign(_messages.value[locale] || {}, message);
        _context.messages = _messages.value;
    };
    // getDateTimeFormat
    const getDateTimeFormat = (locale) => _datetimeFormats.value[locale] || {};
    // setDateTimeFormat
    const setDateTimeFormat = (locale, format) => {
        _datetimeFormats.value[locale] = format;
        _context.datetimeFormats = _datetimeFormats.value;
        clearDateTimeFormat(_context, locale, format);
    };
    // mergeDateTimeFormat
    const mergeDateTimeFormat = (locale, format) => {
        _datetimeFormats.value[locale] = Object.assign(_datetimeFormats.value[locale] || {}, format);
        _context.datetimeFormats = _datetimeFormats.value;
        clearDateTimeFormat(_context, locale, format);
    };
    // getNumberFormat
    const getNumberFormat = (locale) => _numberFormats.value[locale] || {};
    // setNumberFormat
    const setNumberFormat = (locale, format) => {
        _numberFormats.value[locale] = format;
        _context.numberFormats = _numberFormats.value;
        clearNumberFormat(_context, locale, format);
    };
    // mergeNumberFormat
    const mergeNumberFormat = (locale, format) => {
        _numberFormats.value[locale] = Object.assign(_numberFormats.value[locale] || {}, format);
        _context.numberFormats = _numberFormats.value;
        clearNumberFormat(_context, locale, format);
    };
    // for debug
    composerID++;
    // export composable API!
    const composer = {
        /**
         *  properties
         */
        locale,
        fallbackLocale,
        get availableLocales() {
            return Object.keys(_messages.value).sort();
        },
        messages,
        datetimeFormats,
        numberFormats,
        get modifiers() {
            return _modifiers;
        },
        get pluralRules() {
            return _pluralRules;
        },
        get missingWarn() {
            return _missingWarn;
        },
        set missingWarn(val) {
            _missingWarn = val;
            _context.missingWarn = _missingWarn;
        },
        get fallbackWarn() {
            return _fallbackWarn;
        },
        set fallbackWarn(val) {
            _fallbackWarn = val;
            _context.fallbackWarn = _fallbackWarn;
        },
        get fallbackRoot() {
            return _fallbackRoot;
        },
        set fallbackRoot(val) {
            _fallbackRoot = val;
        },
        get fallbackFormat() {
            return _fallbackFormat;
        },
        set fallbackFormat(val) {
            _fallbackFormat = val;
            _context.fallbackFormat = _fallbackFormat;
        },
        __id: composerID,
        /**
         * methods
         */
        t,
        d,
        n,
        getLocaleMessage,
        setLocaleMessage,
        mergeLocaleMessage,
        getDateTimeFormat,
        setDateTimeFormat,
        mergeDateTimeFormat,
        getNumberFormat,
        setNumberFormat,
        mergeNumberFormat,
        getPostTranslationHandler,
        setPostTranslationHandler,
        getMissingHandler,
        setMissingHandler,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        install(app, ...options) {
            apply(app, composer, ...options);
        },
        __transrateVNode,
        __numberParts,
        __datetimeParts
    };
    return composer;
}

// supports compatibility for vue-i18n legacy mixin
function getMixin(vueI18n, composer) {
    return {
        beforeCreate() {
            const options = this.$options;
            if (options.i18n) {
                // component local i18n
                const optionsI18n = options.i18n;
                if (options.__i18n) {
                    optionsI18n.__i18n = options.__i18n;
                }
                optionsI18n.__root = composer;
                this.$i18n = createVueI18n(optionsI18n);
            }
            else if (options.__i18n) {
                this.$i18n = createVueI18n({ __i18n: options.__i18n, __root: composer });
            }
            else if (this.$root && this.$root.proxy) {
                // root i18n
                // TODO: should resolve type inference
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const instance = this.$root.proxy;
                this.$i18n = instance.$i18n || vueI18n;
            }
            else if (this.$parent && this.$parent.proxy) {
                // parent i18n
                // TODO: should resolve type inference
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const instance = this.$parent.proxy;
                this.$i18n = instance.$i18n || vueI18n;
            }
            else {
                this.$i18n = vueI18n;
            }
            // define vue-i18n legacy APIs
            this.$t = (...args) => this.$i18n.t(...args);
            this.$tc = (...args) => this.$i18n.tc(...args);
            this.$te = (key, locale) => this.$i18n.te(key, locale);
            this.$d = (...args) => this.$i18n.d(...args);
            this.$n = (...args) => this.$i18n.n(...args);
        }
    };
}

/**
 *  Legacy
 *
 *  This module is offered legacy vue-i18n API compatibility
 */
/**
 *  Convert to I18n Composer Options from VueI18n Options
 */
function convertComposerOptions(options) {
    const locale = isString(options.locale) ? options.locale : 'en-US';
    const fallbackLocale = isString(options.fallbackLocale) ||
        isArray(options.fallbackLocale) ||
        isPlainObject(options.fallbackLocale) ||
        options.fallbackLocale === false
        ? options.fallbackLocale
        : locale;
    const missing = isFunction(options.missing) ? options.missing : undefined;
    const missingWarn = isBoolean(options.silentTranslationWarn) ||
        isRegExp(options.silentTranslationWarn)
        ? !options.silentTranslationWarn
        : true;
    const fallbackWarn = isBoolean(options.silentFallbackWarn) ||
        isRegExp(options.silentFallbackWarn)
        ? !options.silentFallbackWarn
        : true;
    const fallbackRoot = isBoolean(options.fallbackRoot)
        ? options.fallbackRoot
        : true;
    const fallbackFormat = isBoolean(options.formatFallbackMessages)
        ? options.formatFallbackMessages
        : false;
    const pluralizationRules = options.pluralizationRules;
    const postTranslation = isFunction(options.postTranslation)
        ? options.postTranslation
        : undefined;
    if ( options.formatter) {
        warn(`not supportted 'formatter' option`);
    }
    let messages = options.messages;
    if (isPlainObject(options.sharedMessages)) {
        const sharedMessages = options.sharedMessages;
        const locales = Object.keys(sharedMessages);
        messages = locales.reduce((messages, locale) => {
            const message = messages[locale] || { [locale]: {} };
            Object.assign(message, sharedMessages[locale]);
            return messages;
        }, messages || {});
    }
    const { __i18n, __root } = options;
    const datetimeFormats = options.datetimeFormats;
    const numberFormats = options.numberFormats;
    return {
        locale,
        fallbackLocale,
        messages,
        datetimeFormats,
        numberFormats,
        missing,
        missingWarn,
        fallbackWarn,
        fallbackRoot,
        fallbackFormat,
        pluralRules: pluralizationRules,
        postTranslation,
        __i18n,
        __root
    };
}
/**
 *  createVueI18n factory
 *
 *  This function is compatible with constructor of `VueI18n` class (offered with vue-i18n@8.x) like `new VueI18n(...)`.
 */
function createVueI18n(options = {}) {
    const composer = createComposer(convertComposerOptions(options));
    // defines VueI18n
    const vueI18n = {
        /**
         * properties
         */
        // locale
        get locale() {
            return composer.locale.value;
        },
        set locale(val) {
            composer.locale.value = val;
        },
        // fallbackLocale
        get fallbackLocale() {
            return composer.fallbackLocale.value;
        },
        set fallbackLocale(val) {
            composer.fallbackLocale.value = val;
        },
        // messages
        get messages() {
            return composer.messages.value;
        },
        // datetimeFormats
        get datetimeFormats() {
            return composer.datetimeFormats.value;
        },
        // numberFormats
        get numberFormats() {
            return composer.numberFormats.value;
        },
        // availableLocales
        get availableLocales() {
            return composer.availableLocales;
        },
        // formatter
        get formatter() {
             warn(`not support 'formatter' property`);
            // dummy
            return {
                interpolate() {
                    return [];
                }
            };
        },
        set formatter(val) {
             warn(`not support 'formatter' property`);
        },
        // missing
        get missing() {
            return composer.getMissingHandler();
        },
        set missing(handler) {
            composer.setMissingHandler(handler);
        },
        // silentTranslationWarn
        get silentTranslationWarn() {
            return isBoolean(composer.missingWarn)
                ? !composer.missingWarn
                : composer.missingWarn;
        },
        set silentTranslationWarn(val) {
            composer.missingWarn = isBoolean(val) ? !val : val;
        },
        // silentFallbackWarn
        get silentFallbackWarn() {
            return isBoolean(composer.fallbackWarn)
                ? !composer.fallbackWarn
                : composer.fallbackWarn;
        },
        set silentFallbackWarn(val) {
            composer.fallbackWarn = isBoolean(val) ? !val : val;
        },
        // formatFallbackMessages
        get formatFallbackMessages() {
            return composer.fallbackFormat;
        },
        set formatFallbackMessages(val) {
            composer.fallbackFormat = val;
        },
        // postTranslation
        get postTranslation() {
            return composer.getPostTranslationHandler();
        },
        set postTranslation(handler) {
            composer.setPostTranslationHandler(handler);
        },
        /**
         * methods
         */
        // t
        t(...args) {
            const [arg1, arg2, arg3] = args;
            const options = {};
            let list = null;
            let named = null;
            if (!isString(arg1)) {
                throw new Error('TODO');
            }
            const key = arg1;
            if (isString(arg2)) {
                options.locale = arg2;
            }
            else if (isArray(arg2)) {
                list = arg2;
            }
            else if (isPlainObject(arg2)) {
                named = arg2;
            }
            if (isArray(arg3)) {
                list = arg3;
            }
            else if (isPlainObject(arg3)) {
                named = arg3;
            }
            return composer.t(key, list || named || {}, options);
        },
        // tc
        tc(...args) {
            const [arg1, arg2, arg3] = args;
            const options = { plural: 1 };
            let list = null;
            let named = null;
            if (!isString(arg1)) {
                throw new Error('TODO');
            }
            const key = arg1;
            if (isString(arg2)) {
                options.locale = arg2;
            }
            else if (isNumber(arg2)) {
                options.plural = arg2;
            }
            else if (isArray(arg2)) {
                list = arg2;
            }
            else if (isPlainObject(arg2)) {
                named = arg2;
            }
            if (isString(arg3)) {
                options.locale = arg3;
            }
            else if (isArray(arg3)) {
                list = arg3;
            }
            else if (isPlainObject(arg3)) {
                named = arg3;
            }
            return composer.t(key, list || named || {}, options);
        },
        // te
        te(key, locale) {
            const targetLocale = isString(locale) ? locale : composer.locale.value;
            const message = composer.getLocaleMessage(targetLocale);
            return resolveValue(message, key) !== null;
        },
        // getLocaleMessage
        getLocaleMessage(locale) {
            return composer.getLocaleMessage(locale);
        },
        // setLocaleMessage
        setLocaleMessage(locale, message) {
            composer.setLocaleMessage(locale, message);
        },
        // mergeLocaleMessasge
        mergeLocaleMessage(locale, message) {
            composer.mergeLocaleMessage(locale, message);
        },
        // d
        d(...args) {
            return composer.d(...args);
        },
        // getDateTimeFormat
        getDateTimeFormat(locale) {
            return composer.getDateTimeFormat(locale);
        },
        // setDateTimeFormat
        setDateTimeFormat(locale, format) {
            composer.setDateTimeFormat(locale, format);
        },
        // mergeDateTimeFormat
        mergeDateTimeFormat(locale, format) {
            composer.mergeDateTimeFormat(locale, format);
        },
        // n
        n(...args) {
            return composer.n(...args);
        },
        // getNumberFormat
        getNumberFormat(locale) {
            return composer.getNumberFormat(locale);
        },
        // setNumberFormat
        setNumberFormat(locale, format) {
            composer.setNumberFormat(locale, format);
        },
        // mergeNumberFormat
        mergeNumberFormat(locale, format) {
            composer.mergeNumberFormat(locale, format);
        },
        // getChoiceIndex
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        getChoiceIndex(choice, choicesLength) {
             warn(`not supportted 'getChoiceIndex' method.`);
            return -1;
        },
        // install
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        install(app, ...options) {
            apply(app, composer, ...options);
            app.mixin(getMixin(vueI18n, composer));
        }
    };
    return vueI18n;
}

const GlobalI18nSymbol = Symbol.for('vue-i18n');
const providers = new Map();
/**
 * I18n factory
 *
 * @param options - see the {@link I18nOptions}
 * @returns {@link Composer} object, or {@link VueI18n} object
 *
 * @remarks
 * When you use Composable API, you need to specify options of {@link ComposerOptions}.
 * When you use Legacy API, you need toto specify options of {@link VueI18nOptions} and `legacy: true`.
 *
 * @example
 * case: for Composable API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n, useI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   setup() {
 *     // ...
 *     const { t } = useI18n({ ... })
 *     return { ... , t }
 *   }
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 *
 * @example
 * case: for Legacy API
 * ```js
 * import { createApp } from 'vue'
 * import { createI18n } from 'vue-i18n'
 *
 * // call with I18n option
 * const i18n = createI18n({
 *   legacy: true, // you must specify 'lagacy: true' option
 *   locale: 'ja',
 *   messages: {
 *     en: { ... },
 *     ja: { ... }
 *   }
 * })
 *
 * const App = {
 *   // ...
 * }
 *
 * const app = createApp(App)
 *
 * // install!
 * app.use(i18n)
 * app.mount('#app')
 * ```
 */
function createI18n(options = {}) {
    const legacyMode = isBoolean(options.legacy) ? options.legacy : false;
    return legacyMode ? createVueI18n(options) : createComposer(options);
}
/**
 * Use Composable API
 *
 * @param options - See the {@link ComponentOptions}
 * @returns {@link Composer} object
 *
 * @remarks
 * This function is mainly used by `setup`.
 * If options are specified Composer object is created for each component, and you can be localized on the component.
 * If options are not specified, you can be localized using the global Composer.
 *
 * @example
 * case: Component resource base localization
 * ```html
 * <template>
 *   <form>
 *     <label>{{ t('language') }}</label>
 *     <select v-model="locale">
 *       <option value="en">en</option>
 *       <option value="ja">ja</option>
 *     </select>
 *   </form>
 *   <p>message: {{ t('hello') }}</p>
 * </template>
 *
 * <script>
 * import { useI18n } from 'vue-i18n'
 *
 * export default {
 *  setup() {
 *    const { t, locale } = useI18n({
 *      locale: 'ja',
 *      messages: {
 *        en: { ... },
 *        ja: { ... }
 *      }
 *    })
 *    // Something to do ...
 *
 *    return { ..., t, locale }
 *  }
 * }
 * </script>
 * ```
 */
function useI18n(options) {
    const globalComposer = vue.inject(GlobalI18nSymbol);
    if (!globalComposer)
        throw new Error('TODO'); // TODO:
    const instance = vue.getCurrentInstance();
    if (instance === null || !options) {
        return globalComposer;
    }
    const symbol = providers.get(instance);
    if (!symbol) {
        const type = instance.type;
        if (type.__i18n) {
            options.__i18n = type.__i18n;
        }
        if (globalComposer) {
            options.__root = globalComposer;
        }
        const composer = createComposer(options);
        const sym = Symbol.for(generateSymbolID());
        providers.set(instance, sym);
        vue.provide(sym, composer);
        return composer;
    }
    else {
        const composer = vue.inject(symbol) || globalComposer;
        if (!composer)
            throw new Error('TODO'); // TODO:
        return composer;
    }
}

const VERSION = "9.0.0-alpha.2";

exports.Availabilities = Availabilities;
exports.VERSION = VERSION;
exports.createI18n = createI18n;
exports.useI18n = useI18n;
