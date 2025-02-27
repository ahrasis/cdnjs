/**
 * @license Angular v0.10.1
 * (c) 2010-2019 Google LLC. https://angular.io/
 * License: MIT
 */
(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
        factory();
}(function () {
    'use strict';
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    Zone.__load_patch('canvas', function (global, Zone, api) {
        var HTMLCanvasElement = global['HTMLCanvasElement'];
        if (typeof HTMLCanvasElement !== 'undefined' && HTMLCanvasElement.prototype &&
            HTMLCanvasElement.prototype.toBlob) {
            api.patchMacroTask(HTMLCanvasElement.prototype, 'toBlob', function (self, args) {
                return { name: 'HTMLCanvasElement.toBlob', target: self, cbIdx: 0, args: args };
            });
        }
    });
}));
