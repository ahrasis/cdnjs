import { NamedArrayMap } from '../../../util';
import { NDArray } from '../../ndarray';
import { KernelInputConfig, KernelNode, TapeNodeInputGradientArrays } from '../tape_types';
export interface UnaryNode<T extends NDArray> extends KernelNode {
    inputAndArgs: UnaryInputConfig<T>;
    output: T;
    gradient: (dy: T, y: T) => UnaryGradientInputArrays<T>;
}
export interface UnaryInputConfig<T extends NDArray> extends KernelInputConfig {
    inputs: UnaryInputArrays<T>;
}
export interface UnaryInputArrays<T extends NDArray> extends NamedArrayMap {
    x: T;
}
export interface UnaryGradientInputArrays<T extends NDArray> extends TapeNodeInputGradientArrays {
    x: () => T;
}
export interface LeakyReluNode<T extends NDArray> extends KernelNode {
    inputAndArgs: LeakyReluInputConfig<T>;
    output: T;
    gradient: (dy: T, y: T) => UnaryGradientInputArrays<T>;
}
export interface LeakyReluInputConfig<T extends NDArray> extends KernelInputConfig {
    inputs: UnaryInputArrays<T>;
    args: {
        alpha: number;
    };
}
export interface StepNode<T extends NDArray> extends KernelNode {
    inputAndArgs: StepInputConfig<T>;
    output: T;
    gradient: (dy: T, y: T) => UnaryGradientInputArrays<T>;
}
export interface StepInputConfig<T extends NDArray> extends KernelInputConfig {
    inputs: UnaryInputArrays<T>;
    args: {
        alpha: number;
    };
}
export interface ClipNode<T extends NDArray> extends KernelNode {
    inputAndArgs: ClipInputConfig<T>;
    output: T;
    gradient: (dy: T, y: T) => UnaryGradientInputArrays<T>;
}
export interface ClipInputConfig<T extends NDArray> extends KernelInputConfig {
    inputs: UnaryInputArrays<T>;
    args: {
        min: number;
        max: number;
    };
}
export interface TransposeNode<T extends NDArray> extends KernelNode {
    inputAndArgs: TransposeInputConfig<T>;
    output: T;
    gradient: (dy: T, y: T) => UnaryGradientInputArrays<T>;
}
export interface TransposeInputConfig<T extends NDArray> extends KernelInputConfig {
    inputs: UnaryInputArrays<T>;
    args: {
        perm: number[];
    };
}
export interface TileNode<T extends NDArray> extends KernelNode {
    inputAndArgs: TileInputConfig<T>;
    output: T;
    gradient: (dy: T, y: T) => UnaryGradientInputArrays<T>;
}
export interface TileInputConfig<T extends NDArray> extends KernelInputConfig {
    inputs: UnaryInputArrays<T>;
    args: {
        reps: number[];
    };
}
