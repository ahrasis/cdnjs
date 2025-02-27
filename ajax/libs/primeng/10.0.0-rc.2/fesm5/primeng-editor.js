import { forwardRef, EventEmitter, ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Output, ContentChild, Input, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Header, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as Quill from 'quill';

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var EDITOR_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Editor; }),
    multi: true
};
var Editor = /** @class */ (function () {
    function Editor(el) {
        this.el = el;
        this.onTextChange = new EventEmitter();
        this.onSelectionChange = new EventEmitter();
        this.onInit = new EventEmitter();
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    Editor.prototype.ngAfterViewInit = function () {
        var _this = this;
        var editorElement = DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-content');
        var toolbarElement = DomHandler.findSingle(this.el.nativeElement, 'div.p-editor-toolbar');
        var defaultModule = { toolbar: toolbarElement };
        var modules = this.modules ? __assign(__assign({}, defaultModule), this.modules) : defaultModule;
        this.quill = new Quill(editorElement, {
            modules: modules,
            placeholder: this.placeholder,
            readOnly: this.readonly,
            theme: 'snow',
            formats: this.formats,
            bounds: this.bounds,
            debug: this.debug,
            scrollingContainer: this.scrollingContainer
        });
        if (this.value) {
            this.quill.pasteHTML(this.value);
        }
        this.quill.on('text-change', function (delta, oldContents, source) {
            if (source === 'user') {
                var html = editorElement.children[0].innerHTML;
                var text = _this.quill.getText().trim();
                if (html === '<p><br></p>') {
                    html = null;
                }
                _this.onTextChange.emit({
                    htmlValue: html,
                    textValue: text,
                    delta: delta,
                    source: source
                });
                _this.onModelChange(html);
                _this.onModelTouched();
            }
        });
        this.quill.on('selection-change', function (range, oldRange, source) {
            _this.onSelectionChange.emit({
                range: range,
                oldRange: oldRange,
                source: source
            });
        });
        this.onInit.emit({
            editor: this.quill
        });
    };
    Editor.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.templates.forEach(function (item) {
            switch (item.getType()) {
                case 'toolbar':
                    _this.toolbarTemplate = item.template;
                    break;
            }
        });
    };
    Editor.prototype.writeValue = function (value) {
        this.value = value;
        if (this.quill) {
            if (value)
                this.quill.pasteHTML(value);
            else
                this.quill.setText('');
        }
    };
    Editor.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    Editor.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    Editor.prototype.getQuill = function () {
        return this.quill;
    };
    Object.defineProperty(Editor.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (val) {
            this._readonly = val;
            if (this.quill) {
                if (this._readonly)
                    this.quill.disable();
                else
                    this.quill.enable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Editor.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Editor.decorators = [
        { type: Component, args: [{
                    selector: 'p-editor',
                    template: "\n        <div [ngClass]=\"'p-editor-container'\" [class]=\"styleClass\">\n            <div class=\"p-editor-toolbar\" *ngIf=\"toolbar || toolbarTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div class=\"p-editor-toolbar\" *ngIf=\"!toolbar && !toolbarTemplate\">\n                <span class=\"ql-formats\">\n                    <select class=\"ql-header\">\n                      <option value=\"1\">Heading</option>\n                      <option value=\"2\">Subheading</option>\n                      <option selected>Normal</option>\n                    </select>\n                    <select class=\"ql-font\">\n                      <option selected>Sans Serif</option>\n                      <option value=\"serif\">Serif</option>\n                      <option value=\"monospace\">Monospace</option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-bold\" aria-label=\"Bold\" type=\"button\"></button>\n                    <button class=\"ql-italic\" aria-label=\"Italic\" type=\"button\"></button>\n                    <button class=\"ql-underline\" aria-label=\"Underline\" type=\"button\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <select class=\"ql-color\"></select>\n                    <select class=\"ql-background\"></select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-list\" value=\"ordered\" aria-label=\"Ordered List\" type=\"button\"></button>\n                    <button class=\"ql-list\" value=\"bullet\" aria-label=\"Unordered List\" type=\"button\"></button>\n                    <select class=\"ql-align\">\n                        <option selected></option>\n                        <option value=\"center\"></option>\n                        <option value=\"right\"></option>\n                        <option value=\"justify\"></option>\n                    </select>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-link\" aria-label=\"Insert Link\" type=\"button\"></button>\n                    <button class=\"ql-image\" aria-label=\"Insert Image\" type=\"button\"></button>\n                    <button class=\"ql-code-block\" aria-label=\"Insert Code Block\" type=\"button\"></button>\n                </span>\n                <span class=\"ql-formats\">\n                    <button class=\"ql-clean\" aria-label=\"Remove Styles\" type=\"button\"></button>\n                </span>\n            </div>\n            <div class=\"p-editor-content\" [ngStyle]=\"style\"></div>\n        </div>\n    ",
                    providers: [EDITOR_VALUE_ACCESSOR],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None
                },] }
    ];
    Editor.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    Editor.propDecorators = {
        onTextChange: [{ type: Output }],
        onSelectionChange: [{ type: Output }],
        toolbar: [{ type: ContentChild, args: [Header,] }],
        style: [{ type: Input }],
        styleClass: [{ type: Input }],
        placeholder: [{ type: Input }],
        formats: [{ type: Input }],
        modules: [{ type: Input }],
        bounds: [{ type: Input }],
        scrollingContainer: [{ type: Input }],
        debug: [{ type: Input }],
        onInit: [{ type: Output }],
        templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
        readonly: [{ type: Input }]
    };
    return Editor;
}());
var EditorModule = /** @class */ (function () {
    function EditorModule() {
    }
    EditorModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    exports: [Editor, SharedModule],
                    declarations: [Editor]
                },] }
    ];
    return EditorModule;
}());

/**
 * Generated bundle index. Do not edit.
 */

export { EDITOR_VALUE_ACCESSOR, Editor, EditorModule };
//# sourceMappingURL=primeng-editor.js.map
