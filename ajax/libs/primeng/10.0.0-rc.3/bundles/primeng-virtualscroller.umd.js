(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('primeng/api'), require('@angular/cdk/scrolling')) :
    typeof define === 'function' && define.amd ? define('primeng/virtualscroller', ['exports', '@angular/core', '@angular/common', 'primeng/api', '@angular/cdk/scrolling'], factory) :
    (global = global || self, factory((global.primeng = global.primeng || {}, global.primeng.virtualscroller = {}), global.ng.core, global.ng.common, global.primeng.api, global.ng.cdk.scrolling));
}(this, (function (exports, core, common, api, scrolling) { 'use strict';

    var VirtualScroller = /** @class */ (function () {
        function VirtualScroller(el) {
            this.el = el;
            this.trackBy = function (index, item) { return item; };
            this.onLazyLoad = new core.EventEmitter();
            this._totalRecords = 0;
            this.page = 0;
            this._first = 0;
            this.loadedPages = [];
        }
        Object.defineProperty(VirtualScroller.prototype, "totalRecords", {
            get: function () {
                return this._totalRecords;
            },
            set: function (val) {
                this._totalRecords = val;
                console.log("totalRecords is deprecated, provide a value with the length of virtual items instead.");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VirtualScroller.prototype, "first", {
            get: function () {
                return this._first;
            },
            set: function (val) {
                this._first = val;
                console.log("first property is deprecated, use scrollToIndex function to scroll a specific item.");
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(VirtualScroller.prototype, "cache", {
            get: function () {
                return this._cache;
            },
            set: function (val) {
                this._cache = val;
                console.log("cache is deprecated as it is always on.");
            },
            enumerable: false,
            configurable: true
        });
        VirtualScroller.prototype.ngAfterContentInit = function () {
            var _this = this;
            this.templates.forEach(function (item) {
                switch (item.getType()) {
                    case 'item':
                        _this.itemTemplate = item.template;
                        break;
                    case 'loadingItem':
                        _this.loadingItemTemplate = item.template;
                        break;
                    case 'header':
                        _this.headerTemplate = item.template;
                        break;
                    case 'footer':
                        _this.footerTemplate = item.template;
                        break;
                    default:
                        _this.itemTemplate = item.template;
                        break;
                }
            });
        };
        VirtualScroller.prototype.onScrollIndexChange = function (index) {
            var _this = this;
            if (this.lazy) {
                var pageRange = this.createPageRange(Math.floor(index / this.rows));
                pageRange.forEach(function (page) { return _this.loadPage(page); });
            }
        };
        VirtualScroller.prototype.createPageRange = function (page) {
            var range = [];
            if (page !== 0) {
                range.push(page - 1);
            }
            range.push(page);
            if (page !== (Math.ceil(this.value.length / this.rows) - 1)) {
                range.push(page + 1);
            }
            return range;
        };
        VirtualScroller.prototype.loadPage = function (page) {
            if (!this.loadedPages.includes(page)) {
                this.onLazyLoad.emit({ first: this.rows * page, rows: this.rows });
                this.loadedPages.push(page);
            }
        };
        VirtualScroller.prototype.getBlockableElement = function () {
            return this.el.nativeElement.children[0];
        };
        //@deprecated
        VirtualScroller.prototype.scrollTo = function (index, mode) {
            this.scrollToIndex(index, mode);
        };
        VirtualScroller.prototype.scrollToIndex = function (index, mode) {
            if (this.viewport) {
                this.viewport.scrollToIndex(index, mode);
            }
        };
        VirtualScroller.prototype.clearCache = function () {
            this.loadedPages = [];
        };
        VirtualScroller.prototype.ngOnChanges = function (simpleChange) {
            if (simpleChange.value) {
                if (!this.lazy) {
                    this.clearCache();
                }
            }
        };
        VirtualScroller.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        VirtualScroller.decorators = [
            { type: core.Component, args: [{
                        selector: 'p-virtualScroller',
                        template: "\n        <div [ngClass]=\"'p-virtualscroller p-component'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"p-virtualscroller-header\" *ngIf=\"header || headerTemplate\">\n                <ng-content select=\"p-header\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"headerTemplate\"></ng-container>\n            </div>\n            <div #content class=\"p-virtualscroller-content\">\n                <div class=\"p-virtualscroller-list\">\n                    <cdk-virtual-scroll-viewport #viewport [ngStyle]=\"{'height': scrollHeight}\" [itemSize]=\"itemSize\" [minBufferPx]=\"minBufferPx\" [maxBufferPx]=\"maxBufferPx\" (scrolledIndexChange)=\"onScrollIndexChange($event)\">\n                        <ng-container *cdkVirtualFor=\"let item of value; trackBy: trackBy; let i = index; let c = count; let f = first; let l = last; let e = even; let o = odd; \">\n                            <div [ngStyle]=\"{'height': itemSize + 'px'}\" class=\"p-virtualscroller-item\">\n                                <ng-container *ngTemplateOutlet=\"item ? itemTemplate : loadingItemTemplate; context: {$implicit: item, index: i, count: c, first: f, last: l, even: e, odd: o}\"></ng-container>\n                            </div>\n                        </ng-container>\n                    </cdk-virtual-scroll-viewport>\n                </div>\n            </div>\n            <div class=\"p-virtualscroller-footer\" *ngIf=\"footer || footerTemplate\">\n                <ng-content select=\"p-footer\"></ng-content>\n                <ng-container *ngTemplateOutlet=\"footerTemplate\"></ng-container>\n            </div>\n        </div>\n    ",
                        changeDetection: core.ChangeDetectionStrategy.Default,
                        encapsulation: core.ViewEncapsulation.None
                    },] }
        ];
        VirtualScroller.ctorParameters = function () { return [
            { type: core.ElementRef }
        ]; };
        VirtualScroller.propDecorators = {
            value: [{ type: core.Input }],
            itemSize: [{ type: core.Input }],
            style: [{ type: core.Input }],
            styleClass: [{ type: core.Input }],
            scrollHeight: [{ type: core.Input }],
            lazy: [{ type: core.Input }],
            rows: [{ type: core.Input }],
            minBufferPx: [{ type: core.Input }],
            maxBufferPx: [{ type: core.Input }],
            trackBy: [{ type: core.Input }],
            header: [{ type: core.ContentChild, args: [api.Header,] }],
            footer: [{ type: core.ContentChild, args: [api.Footer,] }],
            templates: [{ type: core.ContentChildren, args: [api.PrimeTemplate,] }],
            viewport: [{ type: core.ViewChild, args: [scrolling.CdkVirtualScrollViewport,] }],
            onLazyLoad: [{ type: core.Output }],
            totalRecords: [{ type: core.Input }],
            first: [{ type: core.Input }],
            cache: [{ type: core.Input }]
        };
        return VirtualScroller;
    }());
    var VirtualScrollerModule = /** @class */ (function () {
        function VirtualScrollerModule() {
        }
        VirtualScrollerModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [common.CommonModule, scrolling.ScrollingModule],
                        exports: [VirtualScroller, api.SharedModule, scrolling.ScrollingModule],
                        declarations: [VirtualScroller]
                    },] }
        ];
        return VirtualScrollerModule;
    }());

    exports.VirtualScroller = VirtualScroller;
    exports.VirtualScrollerModule = VirtualScrollerModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=primeng-virtualscroller.umd.js.map
