import { Injectable, ElementRef, Component, ChangeDetectionStrategy, ViewEncapsulation, Input, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Subject } from 'rxjs';

class TerminalService {
    constructor() {
        this.commandSource = new Subject();
        this.responseSource = new Subject();
        this.commandHandler = this.commandSource.asObservable();
        this.responseHandler = this.responseSource.asObservable();
    }
    sendCommand(command) {
        if (command) {
            this.commandSource.next(command);
        }
    }
    sendResponse(response) {
        if (response) {
            this.responseSource.next(response);
        }
    }
}
TerminalService.decorators = [
    { type: Injectable }
];

class Terminal {
    constructor(el, terminalService) {
        this.el = el;
        this.terminalService = terminalService;
        this.commands = [];
        this.subscription = terminalService.responseHandler.subscribe(response => {
            this.commands[this.commands.length - 1].response = response;
            this.commandProcessed = true;
        });
    }
    ngAfterViewInit() {
        this.container = DomHandler.find(this.el.nativeElement, '.p-terminal')[0];
    }
    ngAfterViewChecked() {
        if (this.commandProcessed) {
            this.container.scrollTop = this.container.scrollHeight;
            this.commandProcessed = false;
        }
    }
    set response(value) {
        if (value) {
            this.commands[this.commands.length - 1].response = value;
            this.commandProcessed = true;
        }
    }
    handleCommand(event) {
        if (event.keyCode == 13) {
            this.commands.push({ text: this.command });
            this.terminalService.sendCommand(this.command);
            this.command = '';
        }
    }
    focus(element) {
        element.focus();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
Terminal.ctorParameters = () => [
    { type: ElementRef },
    { type: TerminalService }
];
Terminal.decorators = [
    { type: Component, args: [{
                selector: 'p-terminal',
                template: `
        <div [ngClass]="'p-terminal p-component'" [ngStyle]="style" [class]="styleClass" (click)="focus(in)">
            <div *ngIf="welcomeMessage">{{welcomeMessage}}</div>
            <div class="p-terminal-content">
                <div *ngFor="let command of commands">
                    <span class="p-terminal-prompt">{{prompt}}</span>
                    <span class="p-terminal-command">{{command.text}}</span>
                    <div class="p-terminal-response">{{command.response}}</div>
                </div>
            </div>
            <div class="p-terminal-prompt-container">
                <span class="p-terminal-content-prompt">{{prompt}}</span>
                <input #in type="text" [(ngModel)]="command" class="p-terminal-input" autocomplete="off" (keydown)="handleCommand($event)" autofocus>
            </div>
        </div>
    `,
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                styles: [".p-terminal{height:18rem;overflow:auto}.p-terminal-prompt-container{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.p-terminal-input{-ms-flex:1 1 auto;flex:1 1 auto;border:0;background-color:transparent;color:inherit;padding:0;outline:0}.p-terminal-input::-ms-clear{display:none}"]
            },] }
];
Terminal.ctorParameters = () => [
    { type: ElementRef },
    { type: TerminalService }
];
Terminal.propDecorators = {
    welcomeMessage: [{ type: Input }],
    prompt: [{ type: Input }],
    style: [{ type: Input }],
    styleClass: [{ type: Input }],
    response: [{ type: Input }]
};
class TerminalModule {
}
TerminalModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                exports: [Terminal],
                declarations: [Terminal]
            },] }
];

/**
 * Generated bundle index. Do not edit.
 */

export { Terminal, TerminalModule, TerminalService };
//# sourceMappingURL=primeng-terminal.js.map
