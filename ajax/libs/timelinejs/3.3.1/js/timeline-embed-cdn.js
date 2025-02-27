/*
    TimelineJS - ver. 2015-09-18-15-26-18 - 2015-09-18
    Copyright (c) 2012-2015 Northwestern University
    a project of the Northwestern University Knight Lab, originally created by Zach Wise
    https://github.com/NUKnightLab/TimelineJS3
    This Source Code Form is subject to the terms of the Mozilla Public License, v. 2.0.
    If a copy of the MPL was not distributed with this file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/

/* **********************************************
     Begin Embed.CDN.js
********************************************** */

/* Embed.CDN
  Extend the basic 'embed' functionality with Google Analytics tracking and url parsing to support URLs created with the Timeline generator form.
*/

/*  CodeKit Import
  https://incident57.com/codekit/
================================================== */
// @codekit-append "Embed.js";

/* REPLACE THIS WITH YOUR GOOGLE ANALYTICS ACCOUNT
================================================== */
var embed_analytics = "UA-537357-20";

/* REPLACE THIS WITH YOUR BASE PATH FOR TIMELINE
================================================== */
//var embed_path = "https://cdn.knightlab.com/libs/timeline3/latest/embed/";

/* LOAD TIMER
================================================== */
var load_time_start = new Date().getTime(), the_load_time = 0;

/* GOOGLE ANALYTICS
================================================== */
var _gaq = _gaq || [];


(function() {
  var ga = document.createElement('script'), s = document.getElementsByTagName('script')[0];
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
  s.parentNode.insertBefore(ga, s);

  _gaq.push(['_setAccount', embed_analytics]);
  _gaq.push(['_trackPageview']);

})();

/* TIMELINE CDN SPECIFIC
================================================== */
var getUrlVars = function() {
  var varobj = {}, url_vars = [], uv ;

  //url_vars = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  url_vars = window.location.href.slice(window.location.href.indexOf('?') + 1);

  if (url_vars.match('#')) {
    url_vars = url_vars.split('#')[0];
  }
  url_vars = url_vars.split('&');

  for(var i = 0; i < url_vars.length; i++) {
    uv = url_vars[i].split('=');
    varobj[uv[0]] = uv[1];
  }

  return varobj;
};

var onHeadline = function(e, headline) {
  var the_page_title = "/" + headline,
    the_page_url  = location.href;

  document.title = headline;
  the_load_time = Math.floor((new Date().getTime() - load_time_start)/100)/10;
  _gaq.push(['_trackEvent', 'Timeline', headline, the_page_url, the_load_time]);

};

var url_config = getUrlVars();


/* **********************************************
     Begin LazyLoad.js
********************************************** */

/*jslint browser: true, eqeqeq: true, bitwise: true, newcap: true, immed: true, regexp: false */

/*
LazyLoad makes it easy and painless to lazily load one or more external
JavaScript or CSS files on demand either during or after the rendering of a web
page.

Supported browsers include Firefox 2+, IE6+, Safari 3+ (including Mobile
Safari), Google Chrome, and Opera 9+. Other browsers may or may not work and
are not officially supported.

Visit https://github.com/rgrove/lazyload/ for more info.

Copyright (c) 2011 Ryan Grove <ryan@wonko.com>
All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

@module lazyload
@class LazyLoad
@static
@version 2.0.3 (git)
*/

LazyLoad = (function (doc) {
  // -- Private Variables ------------------------------------------------------

  // User agent and feature test information.
  var env,

  // Reference to the <head> element (populated lazily).
  head,

  // Requests currently in progress, if any.
  pending = {},

  // Number of times we've polled to check whether a pending stylesheet has
  // finished loading. If this gets too high, we're probably stalled.
  pollCount = 0,

  // Queued requests.
  queue = {css: [], js: []},

  // Reference to the browser's list of stylesheets.
  styleSheets = doc.styleSheets;

  // -- Private Methods --------------------------------------------------------

  /**
  Creates and returns an HTML element with the specified name and attributes.

  @method createNode
  @param {String} name element name
  @param {Object} attrs name/value mapping of element attributes
  @return {HTMLElement}
  @private
  */
  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  /**
  Called when the current pending resource of the specified type has finished
  loading. Executes the associated callback (if any) and loads the next
  resource in the queue.

  @method finish
  @param {String} type resource type ('css' or 'js')
  @private
  */
  function finish(type) {
    var p = pending[type],
        callback,
        urls;

    if (p) {
      callback = p.callback;
      urls     = p.urls;

      urls.shift();
      pollCount = 0;

      // If this is the last of the pending URLs, execute the callback and
      // start the next request in the queue (if any).
      if (!urls.length) {
        callback && callback.call(p.context, p.obj);
        pending[type] = null;
        queue[type].length && load(type);
      }
    }
  }

  /**
  Populates the <code>env</code> variable with user agent and feature test
  information.

  @method getEnv
  @private
  */
  function getEnv() {
    var ua = navigator.userAgent;

    env = {
      // True if this browser supports disabling async mode on dynamically
      // created script nodes. See
      // http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
      async: doc.createElement('script').async === true
    };

    (env.webkit = /AppleWebKit\//.test(ua))
      || (env.ie = /MSIE/.test(ua))
      || (env.opera = /Opera/.test(ua))
      || (env.gecko = /Gecko\//.test(ua))
      || (env.unknown = true);
  }

  /**
  Loads the specified resources, or the next resource of the specified type
  in the queue if no resources are specified. If a resource of the specified
  type is already being loaded, the new request will be queued until the
  first request has been finished.

  When an array of resource URLs is specified, those URLs will be loaded in
  parallel if it is possible to do so while preserving execution order. All
  browsers support parallel loading of CSS, but only Firefox and Opera
  support parallel loading of scripts. In other browsers, scripts will be
  queued and loaded one at a time to ensure correct execution order.

  @method load
  @param {String} type resource type ('css' or 'js')
  @param {String|Array} urls (optional) URL or array of URLs to load
  @param {Function} callback (optional) callback function to execute when the
    resource is loaded
  @param {Object} obj (optional) object to pass to the callback function
  @param {Object} context (optional) if provided, the callback function will
    be executed in this object's context
  @private
  */
  function load(type, urls, callback, obj, context) {
    var _finish = function () { finish(type); },
        isCSS   = type === 'css',
        nodes   = [],
        i, len, node, p, pendingUrls, url;

    env || getEnv();

    if (urls) {
      // If urls is a string, wrap it in an array. Otherwise assume it's an
      // array and create a copy of it so modifications won't be made to the
      // original.
      urls = typeof urls === 'string' ? [urls] : urls.concat();

      // Create a request object for each URL. If multiple URLs are specified,
      // the callback will only be executed after all URLs have been loaded.
      //
      // Sadly, Firefox and Opera are the only browsers capable of loading
      // scripts in parallel while preserving execution order. In all other
      // browsers, scripts must be loaded sequentially.
      //
      // All browsers respect CSS specificity based on the order of the link
      // elements in the DOM, regardless of the order in which the stylesheets
      // are actually downloaded.
      if (isCSS || env.async || env.gecko || env.opera) {
        // Load in parallel.
        queue[type].push({
          urls    : urls,
          callback: callback,
          obj     : obj,
          context : context
        });
      } else {
        // Load sequentially.
        for (i = 0, len = urls.length; i < len; ++i) {
          queue[type].push({
            urls    : [urls[i]],
            callback: i === len - 1 ? callback : null, // callback is only added to the last URL
            obj     : obj,
            context : context
          });
        }
      }
    }

    // If a previous load request of this type is currently in progress, we'll
    // wait our turn. Otherwise, grab the next item in the queue.
    if (pending[type] || !(p = pending[type] = queue[type].shift())) {
      return;
    }

    head || (head = doc.head || doc.getElementsByTagName('head')[0]);
    pendingUrls = p.urls;

    for (i = 0, len = pendingUrls.length; i < len; ++i) {
      url = pendingUrls[i];

      if (isCSS) {
          node = env.gecko ? createNode('style') : createNode('link', {
            href: url,
            rel : 'stylesheet'
          });
      } else {
        node = createNode('script', {src: url});
        node.async = false;
      }

      node.className = 'lazyload';
      node.setAttribute('charset', 'utf-8');

      if (env.ie && !isCSS) {
        node.onreadystatechange = function () {
          if (/loaded|complete/.test(node.readyState)) {
            node.onreadystatechange = null;
            _finish();
          }
        };
      } else if (isCSS && (env.gecko || env.webkit)) {
        // Gecko and WebKit don't support the onload event on link nodes.
        if (env.webkit) {
          // In WebKit, we can poll for changes to document.styleSheets to
          // figure out when stylesheets have loaded.
          p.urls[i] = node.href; // resolve relative URLs (or polling won't work)
          pollWebKit();
        } else {
          // In Gecko, we can import the requested URL into a <style> node and
          // poll for the existence of node.sheet.cssRules. Props to Zach
          // Leatherman for calling my attention to this technique.
          node.innerHTML = '@import "' + url + '";';
          pollGecko(node);
        }
      } else {
        node.onload = node.onerror = _finish;
      }

      nodes.push(node);
    }

    for (i = 0, len = nodes.length; i < len; ++i) {
      head.appendChild(nodes[i]);
    }
  }

  /**
  Begins polling to determine when the specified stylesheet has finished loading
  in Gecko. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  Thanks to Zach Leatherman for calling my attention to the @import-based
  cross-domain technique used here, and to Oleg Slobodskoi for an earlier
  same-domain implementation. See Zach's blog for more details:
  http://www.zachleat.com/web/2010/07/29/load-css-dynamically/

  @method pollGecko
  @param {HTMLElement} node Style node to poll.
  @private
  */
  function pollGecko(node) {
    var hasRules;

    try {
      // We don't really need to store this value or ever refer to it again, but
      // if we don't store it, Closure Compiler assumes the code is useless and
      // removes it.
      hasRules = !!node.sheet.cssRules;
    } catch (ex) {
      // An exception means the stylesheet is still loading.
      pollCount += 1;

      if (pollCount < 200) {
        setTimeout(function () { pollGecko(node); }, 50);
      } else {
        // We've been polling for 10 seconds and nothing's happened. Stop
        // polling and finish the pending requests to avoid blocking further
        // requests.
        hasRules && finish('css');
      }

      return;
    }

    // If we get here, the stylesheet has loaded.
    finish('css');
  }

  /**
  Begins polling to determine when pending stylesheets have finished loading
  in WebKit. Polling stops when all pending stylesheets have loaded or after 10
  seconds (to prevent stalls).

  @method pollWebKit
  @private
  */
  function pollWebKit() {
    var css = pending.css, i;

    if (css) {
      i = styleSheets.length;

      // Look for a stylesheet matching the pending URL.
      while (--i >= 0) {
        if (styleSheets[i].href === css.urls[0]) {
          finish('css');
          break;
        }
      }

      pollCount += 1;

      if (css) {
        if (pollCount < 200) {
          setTimeout(pollWebKit, 50);
        } else {
          // We've been polling for 10 seconds and nothing's happened, which may
          // indicate that the stylesheet has been removed from the document
          // before it had a chance to load. Stop polling and finish the pending
          // request to prevent blocking further requests.
          finish('css');
        }
      }
    }
  }

  return {

    /**
    Requests the specified CSS URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified, the stylesheets will be loaded in parallel and the callback
    will be executed after all stylesheets have finished loading.

    @method css
    @param {String|Array} urls CSS URL or array of CSS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified stylesheets are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    css: function (urls, callback, obj, context) {
      load('css', urls, callback, obj, context);
    },

    /**
    Requests the specified JavaScript URL or URLs and executes the specified
    callback (if any) when they have finished loading. If an array of URLs is
    specified and the browser supports it, the scripts will be loaded in
    parallel and the callback will be executed after all scripts have
    finished loading.

    Currently, only Firefox and Opera support parallel loading of scripts while
    preserving execution order. In other browsers, scripts will be
    queued and loaded one at a time to ensure correct execution order.

    @method js
    @param {String|Array} urls JS URL or array of JS URLs to load
    @param {Function} callback (optional) callback function to execute when
      the specified scripts are loaded
    @param {Object} obj (optional) object to pass to the callback function
    @param {Object} context (optional) if provided, the callback function
      will be executed in this object's context
    @static
    */
    js: function (urls, callback, obj, context) {
      load('js', urls, callback, obj, context);
    }

  };
})(this.document);


/* **********************************************
     Begin Embed.LoadLib.js
********************************************** */

/*
	LoadLib
	Designed and built by Zach Wise http://zachwise.com/
	Extends LazyLoad
*/

/*	* CodeKit Import
	* https://incident57.com/codekit/
================================================== */
// @codekit-prepend "LazyLoad.js";

LoadLib = (function (doc) {
	var loaded	= [];
	
	function isLoaded(url) {
		
		var i			= 0,
			has_loaded	= false;
			
		for (i = 0; i < loaded.length; i++) {
			if (loaded[i] == url) {
				has_loaded = true;
			}
		}
		
		if (has_loaded) {
			return true;
		} else {
			loaded.push(url);
			return false;
		}
		
	}
	
	return {
		
		css: function (urls, callback, obj, context) {
			if (!isLoaded(urls)) {
				LazyLoad.css(urls, callback, obj, context);
			}
		},

		js: function (urls, callback, obj, context) {
			if (!isLoaded(urls)) {
				LazyLoad.js(urls, callback, obj, context);
			}
		}
    };
	
})(this.document);


/* **********************************************
     Begin Embed.js
********************************************** */

//StoryJS Embed Loader
// Provide a bootstrap method for instantiating a timeline. On page load, check the definition of these window scoped variables in this order: [url_config, timeline_config, storyjs_config, config]. As soon as one of these is found to be defined with type 'object,' it will be used to automatically instantiate a timeline.

/*  CodeKit Import
  https://incident57.com/codekit/ 
================================================== */
// @codekit-prepend "Embed.LoadLib.js";

if(typeof embed_path == 'undefined') {
  // REPLACE WITH YOUR BASEPATH IF YOU WANT OTHERWISE IT WILL TRY AND FIGURE IT OUT
  var _tmp_script_path = getEmbedScriptPath("timeline-embed.js");
  var embed_path = _tmp_script_path.substr(0,_tmp_script_path.lastIndexOf('js/'))
}

function getEmbedScriptPath(scriptname) {
  var scriptTags = document.getElementsByTagName('script'),
    script_path = "",
    script_path_end = "";
  for(var i = 0; i < scriptTags.length; i++) {
    if (scriptTags[i].src.match(scriptname)) {
      script_path = scriptTags[i].src;
    }
  }
  if (script_path != "") {
    script_path_end = "/"
  }
  return script_path.split('?')[0].split('/').slice(0, -1).join('/') + script_path_end;
}

/* CHECK TO SEE IF A CONFIG IS ALREADY DEFINED (FOR EASY EMBED)
================================================== */
(function() {
  if (typeof url_config == 'object') {
    createStoryJS(url_config);
  } else if (typeof timeline_config == 'object') {
    createStoryJS(timeline_config);
  } else if (typeof storyjs_config == 'object') {
    createStoryJS(storyjs_config);
  } else if (typeof config == 'object') {
    createStoryJS(config);
  } else {
    // No existing config. Call createStoryJS(your_config) manually with a config
  }
})();

/* CREATE StoryJS Embed
================================================== */
function createStoryJS(c, src) {
  /* VARS
  ================================================== */
  var storyjs_embedjs, t, te, x,
    isCDN         = false,
    js_version        = "2.24",
    ready = {
      timeout:  "",
      checks:   0,
      finished: false,
      js:     false,
      css:    false,
      font: {
        css:  false
      }
    },
    path = {
      base:   embed_path,
      css:    embed_path + "css/",
      js:     embed_path + "js/",
      font: {
        google: false,
        css:  embed_path + "css/fonts/",
        js:   "//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js"
      }
    },
    storyjs_e_config = {
      version:  js_version,
      debug:    false,
      type:   'timeline',
      id:     'storyjs',
      embed_id: 'timeline-embed',
      is_embed:   true,
      width:    '100%',
      height:   '100%',
      source:   'https://docs.google.com/spreadsheet/pub?key=0Agl_Dv6iEbDadFYzRjJPUGktY0NkWXFUWkVIZDNGRHc&output=html',
      lang:   'en',
      font:   'default',
      start_at_end: false,
      timenav_position: 'bottom',
      css:    path.css + 'timeline.css?'+js_version,
      js:     '',
      api_keys: {
        google:       "",
        flickr:       "",
        twitter:      ""
      },
      gmap_key:   ""
    }
  /* BUILD CONFIG
  ================================================== */
  if (typeof c == 'object') {
    for (x in c) {
      if (Object.prototype.hasOwnProperty.call(c, x)) {
        storyjs_e_config[x] = c[x];
      }
    }
  }

  if (typeof src != 'undefined') {
    storyjs_e_config.source = src;
  }

  /* CDN VERSION?
  ================================================== */
  if (typeof url_config == 'object') {
    isCDN = true;

    /* IS THE SOURCE GOOGLE SPREADSHEET WITH JUST THE KEY?
    ================================================== */
    if (storyjs_e_config.source.match("docs.google.com") || storyjs_e_config.source.match("json") || storyjs_e_config.source.match("storify") ) {

    } else {
      storyjs_e_config.source = "https://docs.google.com/spreadsheet/pub?key=" + storyjs_e_config.source + "&output=html";
    }

  }

  /* DETERMINE TYPE
  ================================================== */
  if (storyjs_e_config.js.match("/")) {

  } else {
    storyjs_e_config.css  = path.css + storyjs_e_config.type + ".css?" + js_version;

    // Use unminified js file if in debug mode
    storyjs_e_config.js   = path.js  + storyjs_e_config.type;
    if (storyjs_e_config.debug) {
      storyjs_e_config.js += ".js?"  + js_version;
    } else {
      storyjs_e_config.js += "-min.js?"  + js_version;
    }

    storyjs_e_config.id   = "storyjs-" + storyjs_e_config.type;
  }

  /* PREPARE
  ================================================== */
  createEmbedDiv();

  /* Load CSS
  ================================================== */
  LoadLib.css(storyjs_e_config.css, onloaded_css);

  /* Load FONT
  ================================================== */
  if (storyjs_e_config.font == "default") {
    ready.font.css    = true;
  } else {
    // FONT CSS
    var fn;
    if (storyjs_e_config.font.match("/")) {
      fn        = storyjs_e_config.font.split(".css")[0].split("/");
      path.font.name  = fn[fn.length -1];
      path.font.css = storyjs_e_config.font;
    } else {
      path.font.name  = storyjs_e_config.font;
      path.font.css = path.font.css + "font."+storyjs_e_config.font.toLowerCase()+".css?" + js_version;
    }
    LoadLib.css(path.font.css, onloaded_font_css);
  }
    LoadLib.js(storyjs_e_config.js, onloaded_js);

  /* On Loaded
  ================================================== */

  function onloaded_js() {
    ready.js = true;
    onloaded_check();
  }

  function onloaded_css() {
    ready.css = true;
    onloaded_check();
  }
  function onloaded_font_css() {
    ready.font.css = true;
    onloaded_check();
  }
  function onloaded_check() {
    if (ready.checks > 40) {
      return;
      alert("Error Loading Files");
    } else {
      ready.checks++;
      if (ready.js && ready.css && ready.font.css) {
        if (!ready.finished) {
          ready.finished = true;
          buildEmbed();
        }
      } else {
        ready.timeout = setTimeout('onloaded_check_again();', 250);
      }
    }
  };
  this.onloaded_check_again = function() {
    onloaded_check();
  };

  /* Build Timeline
  ================================================== */
  function createEmbedDiv() {
    var embed_classname = "storyjs-embed";

    t = document.createElement('div');

    if (storyjs_e_config.embed_id != "") {
      te = document.getElementById(storyjs_e_config.embed_id);
    } else {
      te = document.getElementById("timeline-embed");
    }

    te.appendChild(t);
    t.setAttribute("id", storyjs_e_config.id);

    if (storyjs_e_config.width.toString().match("%") ) {
      te.style.width = storyjs_e_config.width.split("%")[0] + "%";
    } else {
      storyjs_e_config.width = storyjs_e_config.width - 2;
      te.style.width = (storyjs_e_config.width) + 'px';
    }

    if (storyjs_e_config.height.toString().match("%")) {
      te.style.height = storyjs_e_config.height;
      embed_classname += " full-embed";
      te.style.height = storyjs_e_config.height.split("%")[0] + "%";

    } else if (storyjs_e_config.width.toString().match("%")) {
      embed_classname += " full-embed";
      storyjs_e_config.height = storyjs_e_config.height - 16;
      te.style.height = (storyjs_e_config.height) + 'px';
    }else {
      embed_classname += " sized-embed";
      storyjs_e_config.height = storyjs_e_config.height - 16;
      te.style.height = (storyjs_e_config.height) + 'px';
    }

    te.setAttribute("class", embed_classname);
    te.setAttribute("className", embed_classname);
    t.style.position = 'relative';
  }

  function buildEmbed() {
    TL.debug = storyjs_e_config.debug;

    storyjs_e_config['ga_property_id'] = 'UA-27829802-4';
    storyjs_e_config.language = storyjs_e_config.lang;
    if (storyjs_e_config.width == '100%') {
      storyjs_e_config.is_full_embed = true;
    }
    window.timeline = new TL.Timeline('timeline-embed', storyjs_e_config.source, storyjs_e_config);

  }

}

