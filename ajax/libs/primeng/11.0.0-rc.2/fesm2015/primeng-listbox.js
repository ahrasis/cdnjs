import { forwardRef, EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, ChangeDetectorRef, Input, Output, ViewChild, ContentChild, ContentChildren, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService, Header, Footer, PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ObjectUtils } from 'primeng/utils';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';

const LISTBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Listbox),
    multi: true
};
class Listbox {
    constructor(el, cd, filterService) {
        this.el = el;
        this.cd = cd;
        this.filterService = filterService;
        this.checkbox = false;
        this.filter = false;
        this.filterMatchMode = 'contains';
        this.metaKeySelection = true;
        this.showToggleAll = true;
        this.onChange = new EventEmitter();
        this.onClick = new EventEmitter();
        this.onDblClick = new EventEmitter();
        this.onModelChange = () => { };
        this.onModelTouched = () => { };
    }
    get options() {
        return this._options;
    }
    set options(val) {
        this._options = val;
    }
    get filterValue() {
        return this._filterValue;
    }
    set filterValue(val) {
        this._filterValue = val;
        this.filterOptions();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'item':
                    this.itemTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                default:
                    this.itemTemplate = item.template;
                    break;
            }
        });
    }
    getOptionLabel(option) {
        return this.optionLabel ? ObjectUtils.resolveFieldData(option, this.optionLabel) : (option.label != undefined ? option.label : option);
    }
    getOptionValue(option) {
        return this.optionValue ? ObjectUtils.resolveFieldData(option, this.optionValue) : (option.value !== undefined ? option.value : option);
    }
    isOptionDisabled(option) {
        return this.optionDisabled ? ObjectUtils.resolveFieldData(option, this.optionDisabled) : (option.disabled !== undefined ? option.disabled : false);
    }
    writeValue(value) {
        this.value = value;
        this.cd.markForCheck();
    }
    registerOnChange(fn) {
        this.onModelChange = fn;
    }
    registerOnTouched(fn) {
        this.onModelTouched = fn;
    }
    setDisabledState(val) {
        this.disabled = val;
        this.cd.markForCheck();
    }
    onOptionClick(event, option) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }
        if (this.multiple) {
            if (this.checkbox)
                this.onOptionClickCheckbox(event, option);
            else
                this.onOptionClickMultiple(event, option);
        }
        else {
            this.onOptionClickSingle(event, option);
        }
        this.onClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
        this.optionTouched = false;
    }
    onOptionTouchEnd(option) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }
        this.optionTouched = true;
    }
    onOptionDoubleClick(event, option) {
        if (this.disabled || this.isOptionDisabled(option) || this.readonly) {
            return;
        }
        this.onDblClick.emit({
            originalEvent: event,
            option: option,
            value: this.value
        });
    }
    onOptionClickSingle(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.value = null;
                    valueChanged = true;
                }
            }
            else {
                this.value = this.getOptionValue(option);
                valueChanged = true;
            }
        }
        else {
            this.value = selected ? null : this.getOptionValue(option);
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    onOptionClickMultiple(event, option) {
        let selected = this.isSelected(option);
        let valueChanged = false;
        let metaSelection = this.optionTouched ? false : this.metaKeySelection;
        if (metaSelection) {
            let metaKey = (event.metaKey || event.ctrlKey);
            if (selected) {
                if (metaKey) {
                    this.removeOption(option);
                }
                else {
                    this.value = [this.getOptionValue(option)];
                }
                valueChanged = true;
            }
            else {
                this.value = (metaKey) ? this.value || [] : [];
                this.value = [...this.value, this.getOptionValue(option)];
                valueChanged = true;
            }
        }
        else {
            if (selected) {
                this.removeOption(option);
            }
            else {
                this.value = [...this.value || [], this.getOptionValue(option)];
            }
            valueChanged = true;
        }
        if (valueChanged) {
            this.onModelChange(this.value);
            this.onChange.emit({
                originalEvent: event,
                value: this.value
            });
        }
    }
    onOptionClickCheckbox(event, option) {
        if (this.disabled || this.readonly) {
            return;
        }
        let selected = this.isSelected(option);
        if (selected) {
            this.removeOption(option);
        }
        else {
            this.value = this.value ? this.value : [];
            this.value = [...this.value, this.getOptionValue(option)];
        }
        this.onModelChange(this.value);
        this.onChange.emit({
            originalEvent: event,
            value: this.value
        });
    }
    removeOption(option) {
        this.value = this.value.filter(val => !ObjectUtils.equals(val, this.getOptionValue(option), this.dataKey));
    }
    isSelected(option) {
        let selected = false;
        let optionValue = this.getOptionValue(option);
        if (this.multiple) {
            if (this.value) {
                for (let val of this.value) {
                    if (ObjectUtils.equals(val, optionValue, this.dataKey)) {
                        selected = true;
                        break;
                    }
                }
            }
        }
        else {
            selected = ObjectUtils.equals(this.value, optionValue, this.dataKey);
        }
        return selected;
    }
    get allChecked() {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return false;
        }
        else {
            let selectedDisabledItemsLength = 0;
            let unselectedDisabledItemsLength = 0;
            let selectedEnabledItemsLength = 0;
            for (let option of optionsToRender) {
                let disabled = this.isOptionDisabled(option);
                let selected = this.isSelected(option);
                if (disabled) {
                    if (selected)
                        selectedDisabledItemsLength++;
                    else
                        unselectedDisabledItemsLength++;
                }
                else {
                    if (selected)
                        selectedEnabledItemsLength++;
                    else
                        return false;
                }
            }
            return (optionsToRender.length === selectedDisabledItemsLength
                || optionsToRender.length === selectedEnabledItemsLength
                || selectedEnabledItemsLength && optionsToRender.length === (selectedEnabledItemsLength + unselectedDisabledItemsLength + selectedDisabledItemsLength));
        }
    }
    get optionsToRender() {
        return this._filteredOptions || this.options;
    }
    hasFilter() {
        return this._filterValue && this._filterValue.trim().length > 0;
    }
    onFilter(event) {
        this._filterValue = event.target.value;
        this.filterOptions();
    }
    filterOptions() {
        if (this.hasFilter() && this._options)
            this._filteredOptions = this._options.filter(option => this.filterService.filters[this.filterMatchMode](this.getOptionLabel(option), this._filterValue, this.filterLocale));
        else
            this._filteredOptions = null;
    }
    get toggleAllDisabled() {
        let optionsToRender = this.optionsToRender;
        if (!optionsToRender || optionsToRender.length === 0) {
            return true;
        }
        else {
            for (let option of optionsToRender) {
                if (!this.isOptionDisabled(option))
                    return false;
            }
            return true;
        }
    }
    toggleAll(event) {
        if (this.disabled || this.toggleAllDisabled || this.readonly) {
            return;
        }
        let allChecked = this.allChecked;
        if (allChecked)
            this.uncheckAll();
        else
            this.checkAll();
        this.onModelChange(this.value);
        this.onChange.emit({ originalEvent: event, value: this.value });
        event.preventDefault();
    }
    checkAll() {
        let optionsToRender = this.optionsToRender;
        let val = [];
        optionsToRender.forEach(opt => {
            let optionDisabled = this.isOptionDisabled(opt);
            if (!optionDisabled || (optionDisabled && this.isSelected(opt))) {
                val.push(this.getOptionValue(opt));
            }
        });
        this.value = val;
    }
    uncheckAll() {
        let optionsToRender = this.optionsToRender;
        let val = [];
        optionsToRender.forEach(opt => {
            let optionDisabled = this.isOptionDisabled(opt);
            if (optionDisabled && this.isSelected(opt)) {
                val.push(this.getOptionValue(opt));
            }
        });
        this.value = val;
    }
    onOptionKeyDown(event, option) {
        if (this.readonly) {
            return;
        }
        let item = event.currentTarget;
        switch (event.which) {
            //down
            case 40:
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            //up
            case 38:
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    prevItem.focus();
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.onOptionClick(event, option);
                event.preventDefault();
                break;
        }
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-disabled') || DomHandler.isHidden(nextItem) ? this.findNextItem(nextItem) : nextItem;
        else
            return null;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'p-disabled') || DomHandler.isHidden(prevItem) ? this.findPrevItem(prevItem) : prevItem;
        else
            return null;
    }
    onHeaderCheckboxFocus() {
        this.headerCheckboxFocus = true;
    }
    onHeaderCheckboxBlur() {
        this.headerCheckboxFocus = false;
    }
}
Listbox.decorators = [
    { type: Component, args: [{
                selector: 'p-listbox',
                template: `
    <div [ngClass]="{'p-listbox p-component': true, 'p-disabled': disabled}" [ngStyle]="style" [class]="styleClass">
      <div class="p-listbox-header" *ngIf="headerFacet || headerTemplate">
        <ng-content select="p-header"></ng-content>
        <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
      </div>
      <div class="p-listbox-header" *ngIf="(checkbox && multiple && showToggleAll) || filter">
        <div class="p-checkbox p-component" *ngIf="checkbox && multiple && showToggleAll" [ngClass]="{'p-checkbox-disabled': disabled || toggleAllDisabled}">
          <div class="p-hidden-accessible">
            <input type="checkbox" readonly="readonly" [checked]="allChecked" (focus)="onHeaderCheckboxFocus()" (blur)="onHeaderCheckboxBlur()" (keydown.space)="toggleAll($event)" [attr.disabled]="disabled || toggleAllDisabled">
          </div>
          <div #headerchkbox class="p-checkbox-box" [ngClass]="{'p-highlight': allChecked, 'p-focus': headerCheckboxFocus, 'p-disabled': disabled || toggleAllDisabled}" (click)="toggleAll($event)">
            <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':allChecked}"></span>
          </div>
        </div>
        <div class="p-listbox-filter-container" *ngIf="filter">
          <input type="text" [value]="filterValue||''" (input)="onFilter($event)" class="p-listbox-filter p-inputtext p-component" [disabled]="disabled" [attr.placeholder]="filterPlaceHolder" [attr.aria-label]="ariaFilterLabel">
          <span class="p-listbox-filter-icon pi pi-search"></span>
        </div>
      </div>
      <div [ngClass]="'p-listbox-list-wrapper'" [ngStyle]="listStyle" [class]="listStyleClass">
        <ul class="p-listbox-list" role="listbox" aria-multiselectable="multiple">
          <li *ngFor="let option of optionsToRender; let i = index;" [attr.tabindex]="disabled || isOptionDisabled(option) ? null : '0'" pRipple
              [ngClass]="{'p-listbox-item':true,'p-highlight':isSelected(option), 'p-disabled': this.isOptionDisabled(option)}" role="option" [attr.aria-label]="getOptionLabel(option)"
              [attr.aria-selected]="isSelected(option)" (click)="onOptionClick($event,option)" (dblclick)="onOptionDoubleClick($event,option)" (touchend)="onOptionTouchEnd(option)" (keydown)="onOptionKeyDown($event,option)">
            <div class="p-checkbox p-component" *ngIf="checkbox && multiple" [ngClass]="{'p-checkbox-disabled': disabled || isOptionDisabled(option)}">
              <div class="p-checkbox-box" [ngClass]="{'p-highlight':isSelected(option)}">
                <span class="p-checkbox-icon" [ngClass]="{'pi pi-check':isSelected(option)}"></span>
              </div>
            </div>
            <span *ngIf="!itemTemplate">{{getOptionLabel(option)}}</span>
            <ng-container *ngTemplateOutlet="itemTemplate; context: {$implicit: option, index: i}"></ng-container>
          </li>
        </ul>
      </div>
      <div class="p-listbox-footer" *ngIf="footerFacet || footerTemplate">
        <ng-content select="p-footer"></ng-content>
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </div>
    </div>
  `,
                providers: [LISTBOX_VALUE_ACCESSOR],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-listbox-list-wrapper{overflow:auto}.p-listbox-list{list-style-type:none;margin:0;padding:0}.p-listbox-item{-ms-user-select:none;-webkit-user-select:none;cursor:pointer;overflow:hidden;position:relative;user-select:none}.p-listbox-header,.p-listbox-item{align-items:center;display:flex}.p-listbox-filter-container{flex:1 1 auto;position:relative}.p-listbox-filter-icon{margin-top:-.5rem;position:absolute;top:50%}.p-listbox-filter{width:100%}"]
            },] }
];
Listbox.ctorParameters = () => [
    { type: ElementRef },
    { type: ChangeDetectorRef },
    { type: FilterService }
];
Listbox.propDecorators = {
    multiple: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    listStyle: [{ type: Input }],
    listStyleClass: [{ type: Input }],
    readonly: [{ type: Input }],
    disabled: [{ type: Input }],
    checkbox: [{ type: Input }],
    filter: [{ type: Input }],
    filterMatchMode: [{ type: Input }],
    filterLocale: [{ type: Input }],
    metaKeySelection: [{ type: Input }],
    dataKey: [{ type: Input }],
    showToggleAll: [{ type: Input }],
    optionLabel: [{ type: Input }],
    optionValue: [{ type: Input }],
    optionDisabled: [{ type: Input }],
    ariaFilterLabel: [{ type: Input }],
    filterPlaceHolder: [{ type: Input }],
    onChange: [{ type: Output }],
    onClick: [{ type: Output }],
    onDblClick: [{ type: Output }],
    headerCheckboxViewChild: [{ type: ViewChild, args: ['headerchkbox',] }],
    headerFacet: [{ type: ContentChild, args: [Header,] }],
    footerFacet: [{ type: ContentChild, args: [Footer,] }],
    templates: [{ type: ContentChildren, args: [PrimeTemplate,] }],
    options: [{ type: Input }],
    filterValue: [{ type: Input }]
};
class ListboxModule {
}
ListboxModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, SharedModule, RippleModule],
                exports: [Listbox, SharedModule],
                declarations: [Listbox]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { LISTBOX_VALUE_ACCESSOR, Listbox, ListboxModule };
//# sourceMappingURL=primeng-listbox.js.map
