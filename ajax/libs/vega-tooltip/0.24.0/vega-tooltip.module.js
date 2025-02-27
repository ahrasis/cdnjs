import { isArray, isString, isObject } from 'vega-util';

var name = "vega-tooltip";
var version = "0.24.0";
var description = "A tooltip plugin for Vega-Lite and Vega visualizations.";
var keywords = [
	"vega-lite",
	"vega",
	"tooltip"
];
var repository = {
	type: "git",
	url: "https://github.com/vega/vega-tooltip.git"
};
var author = {
	name: "UW Interactive Data Lab",
	url: "https://idl.cs.washington.edu"
};
var collaborators = [
	"Dominik Moritz",
	"Sira Horradarn",
	"Zening Qu",
	"Kanit Wongsuphasawat",
	"Yuri Astrakhan",
	"Jeffrey Heer"
];
var license = "BSD-3-Clause";
var bugs = {
	url: "https://github.com/vega/vega-tooltip/issues"
};
var homepage = "https://github.com/vega/vega-tooltip#readme";
var main = "build/vega-tooltip.js";
var module = "build/vega-tooltip.module.js";
var unpkg = "build/vega-tooltip.min.js";
var jsdelivr = "build/vega-tooltip.min.js";
var types = "build/vega-tooltip.module.d.ts";
var files = [
	"src",
	"build",
	"types"
];
var scripts = {
	prebuild: "yarn clean && yarn build:style",
	build: "rollup -c",
	"build:style": "./build-style.sh",
	clean: "rimraf build && rimraf src/style.ts",
	"copy:data": "rsync -r node_modules/vega-datasets/data/* examples/data",
	"copy:build": "rsync -r build/* examples/build",
	"deploy:gh": "yarn build && yarn copy:build && gh-pages -d examples && yarn clean",
	prepublishOnly: "yarn clean && yarn build",
	preversion: "yarn lint && yarn test",
	serve: "browser-sync start -s -f build examples --serveStatic examples",
	start: "yarn build && concurrently --kill-others -n Server,Rollup 'yarn serve' 'rollup -c -w'",
	pretest: "yarn build:style",
	test: "beemo jest",
	"test:inspect": "node --inspect-brk ./node_modules/.bin/jest --runInBand",
	prepare: "beemo create-config",
	prettierbase: "beemo prettier '*.{css,scss,html}'",
	eslintbase: "beemo eslint .",
	format: "yarn eslintbase --fix && yarn prettierbase --write",
	lint: "yarn eslintbase && yarn prettierbase --check"
};
var devDependencies = {
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^9.0.0",
	"@wessberg/rollup-plugin-ts": "^1.3.4",
	"browser-sync": "^2.26.12",
	concurrently: "^5.3.0",
	"gh-pages": "^3.1.0",
	"node-sass": "^4.14.1",
	path: "^0.12.7",
	rollup: "^2.26.10",
	"rollup-plugin-bundle-size": "^1.0.3",
	"rollup-plugin-terser": "^7.0.2",
	typescript: "~4.0.2",
	"vega-datasets": "^2.1.0",
	"vega-lite-dev-config": "^0.14.6",
	"vega-typings": "^0.18.2"
};
var dependencies = {
	"vega-util": "^1.15.1"
};
var beemo = {
	module: "vega-lite-dev-config",
	drivers: [
		"typescript",
		"prettier",
		"eslint",
		"babel",
		"jest"
	],
	eslint: {
		ignore: [
			"types"
		]
	},
	typescript: {
		compilerOptions: {
			typeRoots: [
				"node_modules/@types",
				"types"
			]
		}
	}
};
var pkg = {
	name: name,
	version: version,
	description: description,
	keywords: keywords,
	repository: repository,
	author: author,
	collaborators: collaborators,
	license: license,
	bugs: bugs,
	homepage: homepage,
	main: main,
	module: module,
	unpkg: unpkg,
	jsdelivr: jsdelivr,
	types: types,
	files: files,
	scripts: scripts,
	devDependencies: devDependencies,
	dependencies: dependencies,
	beemo: beemo
};

// generated with build-style.sh
var defaultStyle = `#vg-tooltip-element {
  visibility: hidden;
  padding: 8px;
  position: fixed;
  z-index: 1000;
  font-family: sans-serif;
  font-size: 11px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  /* The default theme is the light theme. */
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid #d9d9d9;
  color: black; }
  #vg-tooltip-element.visible {
    visibility: visible; }
  #vg-tooltip-element h2 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 13px; }
  #vg-tooltip-element img {
    max-width: 200px;
    max-height: 200px; }
  #vg-tooltip-element table {
    border-spacing: 0; }
    #vg-tooltip-element table tr {
      border: none; }
      #vg-tooltip-element table tr td {
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 2px;
        padding-bottom: 2px; }
        #vg-tooltip-element table tr td.key {
          color: #808080;
          max-width: 150px;
          text-align: right;
          padding-right: 4px; }
        #vg-tooltip-element table tr td.value {
          display: block;
          max-width: 300px;
          max-height: 7em;
          text-align: left; }
  #vg-tooltip-element.dark-theme {
    background-color: rgba(32, 32, 32, 0.9);
    border: 1px solid #f5f5f5;
    color: white; }
    #vg-tooltip-element.dark-theme td.key {
      color: #bfbfbf; }
`;

const EL_ID = 'vg-tooltip-element';
const DEFAULT_OPTIONS = {
    /**
     * X offset.
     */
    offsetX: 10,
    /**
     * Y offset.
     */
    offsetY: 10,
    /**
     * ID of the tooltip element.
     */
    id: EL_ID,
    /**
     * ID of the tooltip CSS style.
     */
    styleId: 'vega-tooltip-style',
    /**
     * The name of the theme. You can use the CSS class called [THEME]-theme to style the tooltips.
     *
     * There are two predefined themes: "light" (default) and "dark".
     */
    theme: 'light',
    /**
     * Do not use the default styles provided by Vega Tooltip. If you enable this option, you need to use your own styles. It is not necessary to disable the default style when using a custom theme.
     */
    disableDefaultStyle: false,
    /**
     * HTML sanitizer function that removes dangerous HTML to prevent XSS.
     *
     * This should be a function from string to string. You may replace it with a formatter such as a markdown formatter.
     */
    sanitize: escapeHTML,
    /**
     * The maximum recursion depth when printing objects in the tooltip.
     */
    maxDepth: 2,
};
/**
 * Escape special HTML characters.
 *
 * @param value A value to convert to string and HTML-escape.
 */
function escapeHTML(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;');
}
function createDefaultStyle(id) {
    // Just in case this id comes from a user, ensure these is no security issues
    if (!/^[A-Za-z]+[-:.\w]*$/.test(id)) {
        throw new Error('Invalid HTML ID');
    }
    return defaultStyle.toString().replace(EL_ID, id);
}

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

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

/**
 * Format the value to be shown in the tooltip.
 *
 * @param value The value to show in the tooltip.
 * @param valueToHtml Function to convert a single cell value to an HTML string
 */
function formatValue(value, valueToHtml, maxDepth) {
    if (isArray(value)) {
        return `[${value.map((v) => valueToHtml(isString(v) ? v : stringify(v, maxDepth))).join(', ')}]`;
    }
    if (isObject(value)) {
        let content = '';
        const _a = value, { title, image } = _a, rest = __rest(_a, ["title", "image"]);
        if (title) {
            content += `<h2>${valueToHtml(title)}</h2>`;
        }
        if (image) {
            content += `<img src="${valueToHtml(image)}">`;
        }
        const keys = Object.keys(rest);
        if (keys.length > 0) {
            content += '<table>';
            for (const key of keys) {
                let val = rest[key];
                // ignore undefined properties
                if (val === undefined) {
                    continue;
                }
                if (isObject(val)) {
                    val = stringify(val, maxDepth);
                }
                content += `<tr><td class="key">${valueToHtml(key)}:</td><td class="value">${valueToHtml(val)}</td></tr>`;
            }
            content += `</table>`;
        }
        return content || '{}'; // show empty object if there are no properties
    }
    return valueToHtml(value);
}
function replacer(maxDepth) {
    const stack = [];
    return function (key, value) {
        if (typeof value !== 'object' || value === null) {
            return value;
        }
        const pos = stack.indexOf(this) + 1;
        stack.length = pos;
        if (stack.length > maxDepth) {
            return '[Object]';
        }
        if (stack.indexOf(value) >= 0) {
            return '[Circular]';
        }
        stack.push(value);
        return value;
    };
}
/**
 * Stringify any JS object to valid JSON
 */
function stringify(obj, maxDepth) {
    return JSON.stringify(obj, replacer(maxDepth));
}

/**
 * Position the tooltip
 *
 * @param event The mouse event.
 * @param tooltipBox
 * @param offsetX Horizontal offset.
 * @param offsetY Vertical offset.
 */
function calculatePosition(event, tooltipBox, offsetX, offsetY) {
    let x = event.clientX + offsetX;
    if (x + tooltipBox.width > window.innerWidth) {
        x = +event.clientX - offsetX - tooltipBox.width;
    }
    let y = event.clientY + offsetY;
    if (y + tooltipBox.height > window.innerHeight) {
        y = +event.clientY - offsetY - tooltipBox.height;
    }
    return { x, y };
}

/**
 * The tooltip handler class.
 */
class Handler {
    /**
     * Create the tooltip handler and initialize the element and style.
     *
     * @param options Tooltip Options
     */
    constructor(options) {
        this.options = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options);
        const elementId = this.options.id;
        // bind this to call
        this.call = this.tooltipHandler.bind(this);
        // prepend a default stylesheet for tooltips to the head
        if (!this.options.disableDefaultStyle && !document.getElementById(this.options.styleId)) {
            const style = document.createElement('style');
            style.setAttribute('id', this.options.styleId);
            style.innerHTML = createDefaultStyle(elementId);
            const head = document.head;
            if (head.childNodes.length > 0) {
                head.insertBefore(style, head.childNodes[0]);
            }
            else {
                head.appendChild(style);
            }
        }
        // append a div element that we use as a tooltip unless it already exists
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.el = document.getElementById(elementId);
        if (!this.el) {
            this.el = document.createElement('div');
            this.el.setAttribute('id', elementId);
            this.el.classList.add('vg-tooltip');
            document.body.appendChild(this.el);
        }
    }
    /**
     * The tooltip handler function.
     */
    tooltipHandler(handler, event, item, value) {
        // console.log(handler, event, item, value);
        // hide tooltip for null, undefined, or empty string values
        if (value == null || value === '') {
            this.el.classList.remove('visible', `${this.options.theme}-theme`);
            return;
        }
        // set the tooltip content
        this.el.innerHTML = formatValue(value, this.options.sanitize, this.options.maxDepth);
        // make the tooltip visible
        this.el.classList.add('visible', `${this.options.theme}-theme`);
        const { x, y } = calculatePosition(event, this.el.getBoundingClientRect(), this.options.offsetX, this.options.offsetY);
        this.el.setAttribute('style', `top: ${y}px; left: ${x}px`);
    }
}

const version$1 = pkg.version;
/**
 * Create a tooltip handler and register it with the provided view.
 *
 * @param view The Vega view.
 * @param opt Tooltip options.
 */
function index (view, opt) {
    const handler = new Handler(opt);
    view.tooltip(handler.call).run();
    return handler;
}

export default index;
export { DEFAULT_OPTIONS, Handler, calculatePosition, createDefaultStyle, escapeHTML, formatValue, replacer, stringify, version$1 as version };
