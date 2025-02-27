import { Class } from '../Class';
import { Engine } from '../Engine';
import { Pointer } from './Pointer';
import { PointerEvent, WheelEvent, NativePointerButton } from './PointerEvents';
import { GameEvent } from '../Events';
import * as Events from '../Events';
import { GlobalCoordinates, Vector } from '../Algebra';
import { Actor } from '../Actor';
/**
 * Handles pointer events (mouse, touch, stylus, etc.) and normalizes to
 * [W3C Pointer Events](http://www.w3.org/TR/pointerevents/).
 *
 * [[include:Pointers.md]]
 */
export declare class Pointers extends Class {
    private _engine;
    private _pointerDown;
    private _pointerUp;
    private _pointerMove;
    private _pointerCancel;
    private _wheel;
    private _pointers;
    private _activePointers;
    constructor(engine: Engine);
    on(eventName: Events.up, handler: (event: PointerEvent) => void): void;
    on(eventName: Events.down, handler: (event: PointerEvent) => void): void;
    on(eventName: Events.move, handler: (event: PointerEvent) => void): void;
    on(eventName: Events.enter, handler: (event: PointerEvent) => void): void;
    on(eventName: Events.leave, handler: (event: PointerEvent) => void): void;
    on(eventName: Events.cancel, handler: (event: PointerEvent) => void): void;
    on(eventName: Events.wheel, handler: (event: WheelEvent) => void): void;
    on(eventName: string, handler: (event: GameEvent<any>) => void): void;
    /**
     * Primary pointer (mouse, 1 finger, stylus, etc.)
     */
    primary: Pointer;
    /**
     * Initializes pointer event listeners
     */
    init(target?: GlobalEventHandlers): void;
    /**
     * Synthesize a pointer event that looks like a real browser event to excalibur
     * @param eventName
     * @param pos
     */
    triggerEvent(eventName: 'up' | 'down' | 'move' | 'cancel' | 'wheel', pos: Vector | GlobalCoordinates, button?: NativePointerButton, pointerType?: 'mouse' | 'touch' | 'pen', pointerId?: number): void;
    /**
     * Update all pointer events and pointers, meant to be called at the end of frame
     */
    update(): void;
    /**
     * Safely gets a Pointer at a specific index and initializes one if it doesn't yet exist
     * @param index  The pointer index to retrieve
     */
    at(index: number): Pointer;
    /**
     * Get number of pointers being watched
     */
    count(): number;
    checkAndUpdateActorUnderPointer(actor: Actor): void;
    private _dispatchWithBubble;
    private _dispatchPointerLeaveEvents;
    private _dispatchPointerEnterEvents;
    dispatchPointerEvents(): void;
    private _propagateWheelPointerEvent;
    private _handleMouseEvent;
    private _handleTouchEvent;
    private _handlePointerEvent;
    private _handleWheelEvent;
    /**
     * Gets the index of the pointer specified for the given pointer ID or finds the next empty pointer slot available.
     * This is required because IE10/11 uses incrementing pointer IDs so we need to store a mapping of ID => idx
     */
    private _getPointerIndex;
    private _nativeButtonToPointerButton;
    private _stringToPointerType;
}
