import './chunk-6ea13200.js';
import { merge } from './helpers.js';
import { c as config, V as VueInstance } from './chunk-17222463.js';
import { _ as __vue_normalize__, a as registerComponentProgrammatic, u as use } from './chunk-cca88db8.js';
import { N as NoticeMixin } from './chunk-cd1ad4f3.js';

//
var script = {
  name: 'BSnackbar',
  mixins: [NoticeMixin],
  props: {
    actionText: {
      type: String,
      default: 'OK'
    },
    onAction: {
      type: Function,
      default: function _default() {}
    },
    indefinite: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      newDuration: this.duration || config.defaultSnackbarDuration
    };
  },
  methods: {
    /**
    * Click listener.
    * Call action prop before closing (from Mixin).
    */
    action: function action() {
      this.onAction();
      this.close();
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":_vm.transition.enter,"leave-active-class":_vm.transition.leave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"snackbar",class:[_vm.type,_vm.position],attrs:{"role":_vm.actionText ? 'alertdialog' : 'alert'}},[_c('div',{staticClass:"text",domProps:{"innerHTML":_vm._s(_vm.message)}}),_vm._v(" "),(_vm.actionText)?_c('div',{staticClass:"action",class:_vm.type,on:{"click":_vm.action}},[_c('button',{staticClass:"button"},[_vm._v(_vm._s(_vm.actionText))])]):_vm._e()])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var localVueInstance;
var SnackbarProgrammatic = {
  open: function open(params) {
    var parent;

    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      type: 'is-success',
      position: config.defaultSnackbarPosition || 'is-bottom-right'
    };

    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }

    var propsData = merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    var SnackbarComponent = vm.extend(__vue_component__);
    return new SnackbarComponent({
      parent: parent,
      el: document.createElement('div'),
      propsData: propsData
    });
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    registerComponentProgrammatic(Vue, 'snackbar', SnackbarProgrammatic);
  }
};
use(Plugin);

export default Plugin;
export { __vue_component__ as BSnackbar, SnackbarProgrammatic };
