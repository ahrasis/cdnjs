import type { IEmitterSize } from "../Interfaces/IEmitterSize";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { SizeMode } from "../../../../Enums";
export declare class EmitterSize implements IEmitterSize {
    mode: SizeMode;
    height: number;
    width: number;
    constructor();
    load(data?: RecursivePartial<IEmitterSize>): void;
}
