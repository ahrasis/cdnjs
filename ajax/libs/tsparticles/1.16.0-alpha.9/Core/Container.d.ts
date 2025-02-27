import { Canvas } from "./Canvas";
import type { IRepulse } from "./Interfaces/IRepulse";
import type { IBubble } from "./Interfaces/IBubble";
import type { IContainerInteractivity } from "./Interfaces/IContainerInteractivity";
import { Particles } from "./Particles";
import { Retina } from "./Retina";
import type { IOptions } from "../Options/Interfaces/IOptions";
import { FrameManager } from "./FrameManager";
import type { RecursivePartial } from "../Types/RecursivePartial";
import { Options } from "../Options/Classes/Options";
import type { IContainerPlugin } from "./Interfaces/IContainerPlugin";
import type { IShapeDrawer } from "./Interfaces/IShapeDrawer";
import { Particle } from "./Particle";
import { INoiseValue } from "./Interfaces/INoiseValue";
import { INoise } from "./Interfaces/INoise";
export declare class Container {
    readonly id: string;
    readonly sourceOptions?: RecursivePartial<IOptions> | undefined;
    interactivity: IContainerInteractivity;
    options: Options;
    retina: Retina;
    canvas: Canvas;
    drawers: Map<string, IShapeDrawer>;
    particles: Particles;
    plugins: Map<string, IContainerPlugin>;
    bubble: IBubble;
    repulse: IRepulse;
    lastFrameTime: number;
    pageHidden: boolean;
    drawer?: FrameManager;
    started: boolean;
    destroyed: boolean;
    density: number;
    readonly noise: INoise;
    private paused;
    private drawAnimationFrame?;
    private eventListeners;
    constructor(id: string, sourceOptions?: RecursivePartial<IOptions> | undefined, ...presets: string[]);
    private static requestFrame;
    private static cancelAnimation;
    play(force?: boolean): void;
    pause(): void;
    draw(): void;
    getAnimationStatus(): boolean;
    setNoise(noiseOrGenerator?: INoise | ((particle: Particle) => INoiseValue), init?: () => void, update?: () => void): void;
    densityAutoParticles(): void;
    destroy(): void;
    exportImg(callback: BlobCallback): void;
    exportImage(callback: BlobCallback, type?: string, quality?: number): void;
    exportConfiguration(): string;
    refresh(): Promise<void>;
    stop(): void;
    start(): Promise<void>;
    private init;
    private initDensityFactor;
}
