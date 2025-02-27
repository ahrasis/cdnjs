import { Container } from "../../Core/Container";
import type { ICoordinates } from "../../Core/Interfaces/ICoordinates";
import { Particle } from "../../Core/Particle";
import type { IDimension } from "../../Core/Interfaces/IDimension";
import type { ISvgPath } from "./Interfaces/ISvgPath";
import type { IContainerPlugin } from "../../Core/Interfaces/IContainerPlugin";
import type { IOptions } from "../../Options/Interfaces/IOptions";
import { RecursivePartial } from "../../Types/RecursivePartial";
import type { IPolygonMask } from "./Options/Interfaces/IPolygonMask";
import { PolygonMask } from "./Options/Classes/PolygonMask";
declare type IPolygonMaskOptions = IOptions & {
    polygon: IPolygonMask;
};
declare type PolygonMaskParticle = Particle & {
    initialPosition?: ICoordinates;
};
export declare class PolygonMaskInstance implements IContainerPlugin {
    private readonly container;
    redrawTimeout?: number;
    raw?: ICoordinates[];
    paths?: ISvgPath[];
    dimension: IDimension;
    offset?: ICoordinates;
    readonly path2DSupported: boolean;
    readonly options: PolygonMask;
    private polygonMaskMoveRadius;
    constructor(container: Container);
    private static polygonBounce;
    private static drawPolygonMask;
    private static drawPolygonMaskPath;
    private static parsePaths;
    initAsync(options?: RecursivePartial<IPolygonMaskOptions>): Promise<void>;
    resize(): void;
    stop(): void;
    particlesInitialization(): boolean;
    particlePosition(position?: ICoordinates, particle?: PolygonMaskParticle): ICoordinates | undefined;
    particleBounce(particle: PolygonMaskParticle): boolean;
    clickPositionValid(position: ICoordinates): boolean;
    draw(context: CanvasRenderingContext2D): void;
    private checkInsidePolygon;
    private parseSvgPath;
    private downloadSvgPath;
    private drawPoints;
    private randomPoint;
    private getRandomPoint;
    private getRandomPointByLength;
    private getEquidistantPointByIndex;
    private getPointByIndex;
    private createPath2D;
    private initRawData;
}
export {};
