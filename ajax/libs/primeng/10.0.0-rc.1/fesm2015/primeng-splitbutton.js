import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, Output, ViewChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

class SplitButton {
    constructor() {
        this.iconPos = 'left';
        this.onClick = new EventEmitter();
        this.onDropdownClick = new EventEmitter();
        this.showTransitionOptions = '225ms ease-out';
        this.hideTransitionOptions = '195ms ease-in';
    }
    onDefaultButtonClick(event) {
        this.onClick.emit(event);
    }
    onDropdownButtonClick(event) {
        this.menu.toggle({ currentTarget: this.containerViewChild.nativeElement, relativeAlign: this.appendTo == null });
    }
}
SplitButton.decorators = [
    { type: Component, args: [{
                selector: 'p-splitButton',
                template: `
        <div #container [ngClass]="'p-splitbutton p-component'" [ngStyle]="style" [class]="styleClass">
            <button #defaultbtn class="p-splitbutton-defaultbutton" type="button" pButton [icon]="icon" [iconPos]="iconPos" [label]="label" (click)="onDefaultButtonClick($event)" [disabled]="disabled" [attr.tabindex]="tabindex"></button>
            <button type="button" pButton class="p-splitbutton-menubutton" icon="pi pi-chevron-down" (click)="onDropdownButtonClick($event)" [disabled]="disabled"></button>
            <p-menu #menu [popup]="true" [model]="model" [style]="menuStyle" [styleClass]="menuStyleClass" [appendTo]="appendTo"
                    [showTransitionOptions]="showTransitionOptions" [hideTransitionOptions]="hideTransitionOptions"></p-menu>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-splitbutton{display:-ms-inline-flexbox;display:inline-flex;position:relative}.p-splitbutton .p-splitbutton-defaultbutton{-ms-flex:1 1 auto;flex:1 1 auto;border-top-right-radius:0;border-bottom-right-radius:0;border-right:0}.p-splitbutton-menubutton{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;border-top-left-radius:0;border-bottom-left-radius:0}.p-splitbutton .p-menu{min-width:100%}.p-fluid .p-splitbutton{display:-ms-flexbox;display:flex}"]
            },] }
];
SplitButton.propDecorators = {
    model: [{ type: Input }],
    icon: [{ type: Input }],
    iconPos: [{ type: Input }],
    label: [{ type: Input }],
    onClick: [{ type: Output }],
    onDropdownClick: [{ type: Output }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    menuStyle: [{ type: Input }],
    menuStyleClass: [{ type: Input }],
    disabled: [{ type: Input }],
    tabindex: [{ type: Input }],
    appendTo: [{ type: Input }],
    dir: [{ type: Input }],
    showTransitionOptions: [{ type: Input }],
    hideTransitionOptions: [{ type: Input }],
    containerViewChild: [{ type: ViewChild, args: ['container',] }],
    buttonViewChild: [{ type: ViewChild, args: ['defaultbtn',] }],
    menu: [{ type: ViewChild, args: ['menu',] }]
};
class SplitButtonModule {
}
SplitButtonModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, ButtonModule, MenuModule],
                exports: [SplitButton, ButtonModule],
                declarations: [SplitButton]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { SplitButton, SplitButtonModule };
//# sourceMappingURL=primeng-splitbutton.js.map
