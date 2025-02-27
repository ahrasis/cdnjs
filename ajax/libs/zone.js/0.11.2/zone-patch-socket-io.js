/**
* @license Angular v11.0.0-next.6+37.sha-a38293d.with-local-changes
* (c) 2010-2020 Google LLC. https://angular.io/
* License: MIT
*/
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}((function () {
    'use strict';
    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('socketio', function (global, Zone, api) {
        Zone[Zone.__symbol__('socketio')] = function patchSocketIO(io) {
            // patch io.Socket.prototype event listener related method
            api.patchEventTarget(global, [io.Socket.prototype], {
                useG: false,
                chkDup: false,
                rt: true,
                diff: function (task, delegate) {
                    return task.callback === delegate;
                }
            });
            // also patch io.Socket.prototype.on/off/removeListener/removeAllListeners
            io.Socket.prototype.on = io.Socket.prototype.addEventListener;
            io.Socket.prototype.off = io.Socket.prototype.removeListener =
                io.Socket.prototype.removeAllListeners = io.Socket.prototype.removeEventListener;
        };
    });
})));
