'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-5094d8df.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-805257cc.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-c5b5b708.js');
var __chunk_17 = require('./chunk-b5101515.js');

var localVueInstance;
var ModalProgrammatic = {
  open: function open(params) {
    var parent;

    if (typeof params === 'string') {
      params = {
        content: params
      };
    }

    var defaultParam = {
      programmatic: true
    };

    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }

    var propsData = helpers.merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || __chunk_2.VueInstance;
    var ModalComponent = vm.extend(__chunk_17.Modal);
    return new ModalComponent({
      parent: parent,
      el: document.createElement('div'),
      propsData: propsData
    });
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    __chunk_5.registerComponent(Vue, __chunk_17.Modal);
    __chunk_5.registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
  }
};
__chunk_5.use(Plugin);

exports.BModal = __chunk_17.Modal;
exports.ModalProgrammatic = ModalProgrammatic;
exports.default = Plugin;
