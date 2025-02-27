import { Vector } from './Algebra';
import { Camera } from './Camera';
import { BrowserEvents } from './Util/Browser';
import { BoundingBox } from './Collision/Index';
/**
 * Enum representing the different display modes available to Excalibur.
 */
export declare enum DisplayMode {
    /**
     * Use the entire screen's css width/height for the game resolution dynamically. This is not the same as [[Screen.goFullScreen]]
     */
    FullScreen = "FullScreen",
    /**
     * Use the parent DOM container's css width/height for the game resolution dynamically
     */
    Container = "Container",
    /**
     * Default, use a specified resolution for the game
     */
    Fixed = "Fixed",
    /**
     * Allow the game to be positioned with the [[EngineOptions.position]] option
     */
    Position = "Position"
}
/**
 * Convenience class for quick resolutions
 * Mostly sourced from https://emulation.gametechwiki.com/index.php/Resolution
 */
export declare class Resolution {
    static get SVGA(): ScreenDimension;
    static get Standard(): ScreenDimension;
    static get Atari2600(): ScreenDimension;
    static get GameBoy(): ScreenDimension;
    static get GameBoyAdvance(): ScreenDimension;
    static get NintendoDS(): ScreenDimension;
    static get NES(): ScreenDimension;
    static get SNES(): ScreenDimension;
}
/**
 * Interface describing the absolute CSS position of the game window. For use when [[DisplayMode.Position]]
 * is specified and when the user wants to define exact pixel spacing of the window.
 * When a number is given, the value is interpreted as pixels
 */
export interface AbsolutePosition {
    top?: number | string;
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
}
export declare type CanvasPosition = string | AbsolutePosition;
export interface ScreenDimension {
    width: number;
    height: number;
}
export interface ExcaliburGraphicsContext {
    save(): void;
    resetTransform(): void;
    scale(x: number, y: number): void;
    imageSmoothingEnabled: boolean;
    restore(): void;
}
export interface ScreenOptions {
    /**
     * Canvas element to build a screen on
     */
    canvas: HTMLCanvasElement;
    /**
     * Graphics context for the screen
     */
    context: ExcaliburGraphicsContext;
    /**
     * Browser abstraction
     */
    browser: BrowserEvents;
    /**
     * Optionally set antialiasing, defaults to true. If set to true, images will be smoothed
     */
    antialiasing?: boolean;
    /**
     * Optionally override the pixel ratio to use for the screen, otherwise calculated automatically from the browser
     */
    pixelRatio?: number;
    /**
     * Optionally specify the actual pixel resolution in width/height pixels (also known as logical resolution), by default the
     * resolution will be the same as the viewport. Resolution will be overridden by DisplayMode.Container and DisplayMode.FullScreen.
     */
    resolution?: ScreenDimension;
    /**
     * Visual viewport size in css pixel, if resolution is not specified it will be the same as the viewport
     */
    viewport: ScreenDimension;
    /**
     * Set the display mode of the screen, by default DisplayMode.Fixed.
     */
    displayMode?: DisplayMode;
    /**
     * Specify how the game window is to be positioned when the [[DisplayMode.Position]] is chosen. This option MUST be specified
     * if the DisplayMode is set as [[DisplayMode.Position]]. The position can be either a string or an [[AbsolutePosition]].
     * String must be in the format of css style background-position. The vertical position must precede the horizontal position in strings.
     *
     * Valid String examples: "top left", "top", "bottom", "middle", "middle center", "bottom right"
     * Valid [[AbsolutePosition]] examples: `{top: 5, right: 10%}`, `{bottom: 49em, left: 10px}`, `{left: 10, bottom: 40}`
     */
    position?: CanvasPosition;
}
/**
 * The Screen handles all aspects of interacting with the screen for Excalibur.
 *
 * [[include:Screens.md]]
 */
export declare class Screen {
    private _canvas;
    private _ctx;
    private _antialiasing;
    private _browser;
    private _camera;
    private _resolution;
    private _resolutionStack;
    private _viewport;
    private _viewportStack;
    private _pixelRatio;
    private _position;
    private _displayMode;
    private _isFullScreen;
    private _mediaQueryList;
    private _isDisposed;
    private _logger;
    constructor(options: ScreenOptions);
    dispose(): void;
    private _pixelRatioChangeHandler;
    private _windowResizeHandler;
    get pixelRatio(): number;
    get isHiDpi(): boolean;
    get displayMode(): DisplayMode;
    get canvas(): HTMLCanvasElement;
    get resolution(): ScreenDimension;
    set resolution(resolution: ScreenDimension);
    get viewport(): ScreenDimension;
    set viewport(viewport: ScreenDimension);
    get scaledWidth(): number;
    get scaledHeight(): number;
    setCurrentCamera(camera: Camera): void;
    pushResolutionAndViewport(): void;
    popResolutionAndViewport(): void;
    applyResolutionAndViewport(): void;
    get antialiasing(): boolean;
    set antialiasing(isSmooth: boolean);
    /**
     * Returns true if excalibur is fullscreened using the browser fullscreen api
     */
    get isFullScreen(): boolean;
    /**
     * Requests to go fullscreen using the browser fullscreen api
     */
    goFullScreen(): Promise<void>;
    /**
     * Requests to exit fullscreen using the browser fullscreen api
     */
    exitFullScreen(): Promise<void>;
    /**
     * Transforms the current x, y from screen coordinates to world coordinates
     * @param point  Screen coordinate to convert
     */
    screenToWorldCoordinates(point: Vector): Vector;
    /**
     * Transforms a world coordinate, to a screen coordinate
     * @param point  World coordinate to convert
     */
    worldToScreenCoordinates(point: Vector): Vector;
    /**
     * Returns a BoundingBox of the top left corner of the screen
     * and the bottom right corner of the screen.
     */
    getWorldBounds(): BoundingBox;
    /**
     * The width of the game canvas in pixels (physical width component of the
     * resolution of the canvas element)
     */
    get canvasWidth(): number;
    /**
     * Returns half width of the game canvas in pixels (half physical width component)
     */
    get halfCanvasWidth(): number;
    /**
     * The height of the game canvas in pixels, (physical height component of
     * the resolution of the canvas element)
     */
    get canvasHeight(): number;
    /**
     * Returns half height of the game canvas in pixels (half physical height component)
     */
    get halfCanvasHeight(): number;
    /**
     * Returns the width of the engine's visible drawing surface in pixels including zoom and device pixel ratio.
     */
    get drawWidth(): number;
    /**
     * Returns half the width of the engine's visible drawing surface in pixels including zoom and device pixel ratio.
     */
    get halfDrawWidth(): number;
    /**
     * Returns the height of the engine's visible drawing surface in pixels including zoom and device pixel ratio.
     */
    get drawHeight(): number;
    /**
     * Returns half the height of the engine's visible drawing surface in pixels including zoom and device pixel ratio.
     */
    get halfDrawHeight(): number;
    private _applyDisplayMode;
    /**
     * Sets the internal canvas height based on the selected display mode.
     */
    private _setHeightByDisplayMode;
    private _initializeDisplayModePosition;
}
