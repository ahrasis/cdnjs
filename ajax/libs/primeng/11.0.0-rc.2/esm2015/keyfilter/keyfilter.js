import { NgModule, Directive, ElementRef, HostListener, Input, forwardRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { NG_VALIDATORS } from '@angular/forms';
export const KEYFILTER_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => KeyFilter),
    multi: true
};
const DEFAULT_MASKS = {
    pint: /[\d]/,
    'int': /[\d\-]/,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i
};
const KEYS = {
    TAB: 9,
    RETURN: 13,
    ESC: 27,
    BACKSPACE: 8,
    DELETE: 46
};
const SAFARI_KEYS = {
    63234: 37,
    63235: 39,
    63232: 38,
    63233: 40,
    63276: 33,
    63277: 34,
    63272: 46,
    63273: 36,
    63275: 35 // end
};
export class KeyFilter {
    constructor(el) {
        this.el = el;
        this.ngModelChange = new EventEmitter();
        this.isAndroid = DomHandler.isAndroid();
    }
    get pattern() {
        return this._pattern;
    }
    set pattern(_pattern) {
        this._pattern = _pattern;
        this.regex = DEFAULT_MASKS[this._pattern] || this._pattern;
    }
    isNavKeyPress(e) {
        let k = e.keyCode;
        k = DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;
        return (k >= 33 && k <= 40) || k == KEYS.RETURN || k == KEYS.TAB || k == KEYS.ESC;
    }
    ;
    isSpecialKey(e) {
        let k = e.keyCode || e.charCode;
        return k == 9 || k == 13 || k == 27 || k == 16 || k == 17 || (k >= 18 && k <= 20) ||
            (DomHandler.getBrowser().opera && !e.shiftKey && (k == 8 || (k >= 33 && k <= 35) || (k >= 36 && k <= 39) || (k >= 44 && k <= 45)));
    }
    getKey(e) {
        let k = e.keyCode || e.charCode;
        return DomHandler.getBrowser().safari ? (SAFARI_KEYS[k] || k) : k;
    }
    getCharCode(e) {
        return e.charCode || e.keyCode || e.which;
    }
    findDelta(value, prevValue) {
        let delta = '';
        for (let i = 0; i < value.length; i++) {
            let str = value.substr(0, i) + value.substr(i + value.length - prevValue.length);
            if (str === prevValue)
                delta = value.substr(i, value.length - prevValue.length);
        }
        return delta;
    }
    isValidChar(c) {
        return this.regex.test(c);
    }
    isValidString(str) {
        for (let i = 0; i < str.length; i++) {
            if (!this.isValidChar(str.substr(i, 1))) {
                return false;
            }
        }
        return true;
    }
    onInput(e) {
        if (this.isAndroid && !this.pValidateOnly) {
            let val = this.el.nativeElement.value;
            let lastVal = this.lastValue || '';
            let inserted = this.findDelta(val, lastVal);
            let removed = this.findDelta(lastVal, val);
            let pasted = inserted.length > 1 || (!inserted && !removed);
            if (pasted) {
                if (!this.isValidString(val)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            else if (!removed) {
                if (!this.isValidChar(inserted)) {
                    this.el.nativeElement.value = lastVal;
                    this.ngModelChange.emit(lastVal);
                }
            }
            val = this.el.nativeElement.value;
            if (this.isValidString(val)) {
                this.lastValue = val;
            }
        }
    }
    onKeyPress(e) {
        if (this.isAndroid || this.pValidateOnly) {
            return;
        }
        let browser = DomHandler.getBrowser();
        let k = this.getKey(e);
        if (browser.mozilla && (e.ctrlKey || e.altKey)) {
            return;
        }
        else if (k == 17 || k == 18) {
            return;
        }
        let c = this.getCharCode(e);
        let cc = String.fromCharCode(c);
        let ok = true;
        if (!browser.mozilla && (this.isSpecialKey(e) || !cc)) {
            return;
        }
        ok = this.regex.test(cc);
        if (!ok) {
            e.preventDefault();
        }
    }
    onPaste(e) {
        const clipboardData = e.clipboardData || window.clipboardData.getData('text');
        if (clipboardData) {
            const pastedText = clipboardData.getData('text');
            for (let char of pastedText.toString()) {
                if (!this.regex.test(char)) {
                    e.preventDefault();
                    return;
                }
            }
        }
    }
    validate(c) {
        if (this.pValidateOnly) {
            let value = this.el.nativeElement.value;
            if (value && !this.regex.test(value)) {
                return {
                    validatePattern: false
                };
            }
        }
    }
}
KeyFilter.decorators = [
    { type: Directive, args: [{
                selector: '[pKeyFilter]',
                providers: [KEYFILTER_VALIDATOR]
            },] }
];
KeyFilter.ctorParameters = () => [
    { type: ElementRef }
];
KeyFilter.propDecorators = {
    pValidateOnly: [{ type: Input }],
    ngModelChange: [{ type: Output }],
    pattern: [{ type: Input, args: ['pKeyFilter',] }],
    onInput: [{ type: HostListener, args: ['input', ['$event'],] }],
    onKeyPress: [{ type: HostListener, args: ['keypress', ['$event'],] }],
    onPaste: [{ type: HostListener, args: ['paste', ['$event'],] }]
};
export class KeyFilterModule {
}
KeyFilterModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                exports: [KeyFilter],
                declarations: [KeyFilter]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5ZmlsdGVyLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9rZXlmaWx0ZXIvIiwic291cmNlcyI6WyJrZXlmaWx0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDekMsT0FBTyxFQUE4QixhQUFhLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzRSxNQUFNLENBQUMsTUFBTSxtQkFBbUIsR0FBUTtJQUNwQyxPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUN4QyxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFFRixNQUFNLGFBQWEsR0FBRztJQUNsQixJQUFJLEVBQUUsTUFBTTtJQUNaLEtBQUssRUFBRSxRQUFRO0lBQ2YsSUFBSSxFQUFFLFFBQVE7SUFDZCxLQUFLLEVBQUUsV0FBVztJQUNsQixHQUFHLEVBQUUsVUFBVTtJQUNmLEdBQUcsRUFBRSxXQUFXO0lBQ2hCLEtBQUssRUFBRSxpQkFBaUI7SUFDeEIsS0FBSyxFQUFFLFNBQVM7SUFDaEIsUUFBUSxFQUFFLFlBQVk7Q0FDekIsQ0FBQztBQUVGLE1BQU0sSUFBSSxHQUFHO0lBQ1QsR0FBRyxFQUFFLENBQUM7SUFDTixNQUFNLEVBQUUsRUFBRTtJQUNWLEdBQUcsRUFBRSxFQUFFO0lBQ1AsU0FBUyxFQUFFLENBQUM7SUFDWixNQUFNLEVBQUUsRUFBRTtDQUNiLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRztJQUNoQixLQUFLLEVBQUUs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QUFDLEVBQUU7b0JBQ3hCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztvQkFDbkIsT0FBTztpQkFDVjthQUNKO1NBQ0o7SUFDTCxDQUFDO0lBRUQsUUFBUSxDQUFDLENBQWtCO1FBQ3ZCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNwQixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDeEMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDbEMsT0FBTztvQkFDSCxlQUFlLEVBQUUsS0FBSztpQkFDekIsQ0FBQTthQUNKO1NBQ0o7SUFDTCxDQUFDOzs7WUF0S0osU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxjQUFjO2dCQUN4QixTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQzthQUNuQzs7O1lBOUM2QixVQUFVOzs7NEJBaURuQyxLQUFLOzRCQUVMLE1BQU07c0JBa0JOLEtBQUssU0FBQyxZQUFZO3NCQXdEbEIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzt5QkE4QmhDLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7c0JBK0JuQyxZQUFZLFNBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDOztBQWdDckMsTUFBTSxPQUFPLGVBQWU7OztZQUwzQixRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ3BCLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQzthQUM1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIGZvcndhcmRSZWYsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFZhbGlkYXRvciwgQWJzdHJhY3RDb250cm9sLCBOR19WQUxJREFUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgY29uc3QgS0VZRklMVEVSX1ZBTElEQVRPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gS2V5RmlsdGVyKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuY29uc3QgREVGQVVMVF9NQVNLUyA9IHtcbiAgICBwaW50OiAvW1xcZF0vLFxuICAgICdpbnQnOiAvW1xcZFxcLV0vLFxuICAgIHBudW06IC9bXFxkXFwuXS8sXG4gICAgbW9uZXk6IC9bXFxkXFwuXFxzLF0vLFxuICAgIG51bTogL1tcXGRcXC1cXC5dLyxcbiAgICBoZXg6IC9bMC05YS1mXS9pLFxuICAgIGVtYWlsOiAvW2EtejAtOV9cXC5cXC1AXS9pLFxuICAgIGFscGhhOiAvW2Etel9dL2ksXG4gICAgYWxwaGFudW06IC9bYS16MC05X10vaVxufTtcblxuY29uc3QgS0VZUyA9IHtcbiAgICBUQUI6IDksXG4gICAgUkVUVVJOOiAxMyxcbiAgICBFU0M6IDI3LFxuICAgIEJBQ0tTUEFDRTogOCxcbiAgICBERUxFVEU6IDQ2XG59O1xuXG5jb25zdCBTQUZBUklfS0VZUyA9IHtcbiAgICA2MzIzNDogMzcsIC8vIGxlZnRcbiAgICA2MzIzNTogMzksIC8vIHJpZ2h0XG4gICAgNjMyMzI6IDM4LCAvLyB1cFxuICAgIDYzMjMzOiA0MCwgLy8gZG93blxuICAgIDYzMjc2OiAzMywgLy8gcGFnZSB1cFxuICAgIDYzMjc3OiAzNCwgLy8gcGFnZSBkb3duXG4gICAgNjMyNzI6IDQ2LCAvLyBkZWxldGVcbiAgICA2MzI3MzogMzYsIC8vIGhvbWVcbiAgICA2MzI3NTogMzUgIC8vIGVuZFxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcEtleUZpbHRlcl0nLFxuICAgIHByb3ZpZGVyczogW0tFWUZJTFRFUl9WQUxJREFUT1JdXG59KVxuZXhwb3J0IGNsYXNzIEtleUZpbHRlciBpbXBsZW1lbnRzIFZhbGlkYXRvciB7XG5cbiAgICBASW5wdXQoKSBwVmFsaWRhdGVPbmx5OiBib29sZWFuO1xuXG4gICAgQE91dHB1dCgpIG5nTW9kZWxDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgcmVnZXg6IFJlZ0V4cDtcblxuICAgIF9wYXR0ZXJuOiBhbnk7XG5cbiAgICBpc0FuZHJvaWQ6IGJvb2xlYW47XG5cbiAgICBsYXN0VmFsdWU6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLmlzQW5kcm9pZCA9IERvbUhhbmRsZXIuaXNBbmRyb2lkKCk7XG4gICAgfVxuXG4gICAgZ2V0IHBhdHRlcm4oKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdHRlcm47XG4gICAgfVxuXG4gICAgQElucHV0KCdwS2V5RmlsdGVyJykgc2V0IHBhdHRlcm4oX3BhdHRlcm46IGFueSkge1xuICAgICAgICB0aGlzLl9wYXR0ZXJuID0gX3BhdHRlcm47XG4gICAgICAgIHRoaXMucmVnZXggPSBERUZBVUxUX01BU0tTW3RoaXMuX3BhdHRlcm5dIHx8IHRoaXMuX3BhdHRlcm47XG4gICAgfVxuXG4gICAgaXNOYXZLZXlQcmVzcyhlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBrID0gZS5rZXlDb2RlO1xuICAgICAgICBrID0gRG9tSGFuZGxlci5nZXRCcm93c2VyKCkuc2FmYXJpID8gKFNBRkFSSV9LRVlTW2tdIHx8IGspIDogaztcblxuICAgICAgICByZXR1cm4gKGsgPj0gMzMgJiYgayA8PSA0MCkgfHwgayA9PSBLRVlTLlJFVFVSTiB8fCBrID09IEtFWVMuVEFCIHx8IGsgPT0gS0VZUy5FU0M7XG4gICAgfTtcblxuICAgIGlzU3BlY2lhbEtleShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGxldCBrID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XG5cbiAgICAgICAgcmV0dXJuIGsgPT0gOSB8fCBrID09IDEzIHx8IGsgPT0gMjcgfHwgayA9PSAxNiB8fCBrID09IDE3IHx8KGsgPj0gMTggJiYgayA8PSAyMCkgfHxcbiAgICAgICAgICAgIChEb21IYW5kbGVyLmdldEJyb3dzZXIoKS5vcGVyYSAmJiAhZS5zaGlmdEtleSAmJiAoayA9PSA4IHx8IChrID49IDMzICYmIGsgPD0gMzUpIHx8IChrID49IDM2ICYmIGsgPD0gMzkpIHx8IChrID49IDQ0ICYmIGsgPD0gNDUpKSk7XG4gICAgfVxuXG5cbiAgICBnZXRLZXkoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgayA9IGUua2V5Q29kZSB8fCBlLmNoYXJDb2RlO1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5nZXRCcm93c2VyKCkuc2FmYXJpID8gKFNBRkFSSV9LRVlTW2tdIHx8IGspIDogaztcbiAgICB9XG5cbiAgICBnZXRDaGFyQ29kZShlOiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHJldHVybiBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZSB8fCBlLndoaWNoO1xuICAgIH1cblxuICAgIGZpbmREZWx0YSh2YWx1ZTogc3RyaW5nLCBwcmV2VmFsdWU6IHN0cmluZykge1xuICAgICAgICBsZXQgZGVsdGEgPSAnJztcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgc3RyID0gdmFsdWUuc3Vic3RyKDAsIGkpICsgdmFsdWUuc3Vic3RyKGkgKyB2YWx1ZS5sZW5ndGggLSBwcmV2VmFsdWUubGVuZ3RoKTtcblxuICAgICAgICAgICAgaWYgKHN0ciA9PT0gcHJldlZhbHVlKVxuICAgICAgICAgICAgICAgIGRlbHRhID0gdmFsdWUuc3Vic3RyKGksIHZhbHVlLmxlbmd0aCAtIHByZXZWYWx1ZS5sZW5ndGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH1cblxuICAgIGlzVmFsaWRDaGFyKGM6IHN0cmluZykge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWdleC50ZXN0KGMpO1xuICAgIH1cblxuICAgIGlzVmFsaWRTdHJpbmcoc3RyOiBzdHJpbmcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1ZhbGlkQ2hhcihzdHIuc3Vic3RyKGksIDEpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcbiAgICBvbklucHV0KGU6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNBbmRyb2lkICYmICF0aGlzLnBWYWxpZGF0ZU9ubHkpIHtcbiAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWU7XG4gICAgICAgICAgICBsZXQgbGFzdFZhbCA9IHRoaXMubGFzdFZhbHVlIHx8ICcnO1xuXG4gICAgICAgICAgICBsZXQgaW5zZXJ0ZWQgPSB0aGlzLmZpbmREZWx0YSh2YWwsIGxhc3RWYWwpO1xuICAgICAgICAgICAgbGV0IHJlbW92ZWQgPSB0aGlzLmZpbmREZWx0YShsYXN0VmFsLCB2YWwpO1xuICAgICAgICAgICAgbGV0IHBhc3RlZCA9IGluc2VydGVkLmxlbmd0aCA+IDEgfHwgKCFpbnNlcnRlZCAmJiAhcmVtb3ZlZCk7XG5cbiAgICAgICAgICAgIGlmIChwYXN0ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFN0cmluZyh2YWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZSA9IGxhc3RWYWw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmdNb2RlbENoYW5nZS5lbWl0KGxhc3RWYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFyZW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRDaGFyKGluc2VydGVkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQudmFsdWUgPSBsYXN0VmFsO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5nTW9kZWxDaGFuZ2UuZW1pdChsYXN0VmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWRTdHJpbmcodmFsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5cHJlc3MnLCBbJyRldmVudCddKVxuICAgIG9uS2V5UHJlc3MoZTogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0FuZHJvaWQgfHwgdGhpcy5wVmFsaWRhdGVPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYnJvd3NlciA9IERvbUhhbmRsZXIuZ2V0QnJvd3NlcigpO1xuICAgICAgICBsZXQgayA9IHRoaXMuZ2V0S2V5KGUpO1xuXG4gICAgICAgIGlmIChicm93c2VyLm1vemlsbGEgJiYgKGUuY3RybEtleSB8fCBlLmFsdEtleSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrID09IDE3IHx8IGsgPT0gMTgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjID0gdGhpcy5nZXRDaGFyQ29kZShlKTtcbiAgICAgICAgbGV0IGNjID0gU3RyaW5nLmZyb21DaGFyQ29kZShjKTtcbiAgICAgICAgbGV0IG9rID0gdHJ1ZTtcblxuICAgICAgICBpZiAoIWJyb3dzZXIubW96aWxsYSAmJiAodGhpcy5pc1NwZWNpYWxLZXkoZSkgfHwgIWNjKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgb2sgPSB0aGlzLnJlZ2V4LnRlc3QoY2MpO1xuXG4gICAgICAgIGlmICghb2spIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ3Bhc3RlJywgWyckZXZlbnQnXSlcbiAgICBvblBhc3RlKGUpIHtcbiAgICAgICAgY29uc3QgY2xpcGJvYXJkRGF0YSA9IGUuY2xpcGJvYXJkRGF0YSB8fCAoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xuICAgICAgICBpZiAoY2xpcGJvYXJkRGF0YSkge1xuICAgICAgICAgICAgY29uc3QgcGFzdGVkVGV4dCA9IGNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpO1xuICAgICAgICAgICAgZm9yIChsZXQgY2hhciBvZiBwYXN0ZWRUZXh0LnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucmVnZXgudGVzdChjaGFyKSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZShjOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueSB9IHtcbiAgICAgICAgaWYgKHRoaXMucFZhbGlkYXRlT25seSkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnZhbHVlO1xuICAgICAgICAgICAgaWYgKHZhbHVlICYmICF0aGlzLnJlZ2V4LnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVQYXR0ZXJuOiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtLZXlGaWx0ZXJdLFxuICAgIGRlY2xhcmF0aW9uczogW0tleUZpbHRlcl1cbn0pXG5leHBvcnQgY2xhc3MgS2V5RmlsdGVyTW9kdWxlIHsgfVxuIl19