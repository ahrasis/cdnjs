import { NamedArrayMap } from '../../../util';
import { NDArray } from '../../ndarray';
import { KernelInputConfig, KernelNode, TapeNodeInputGradientArrays } from '../tape_types';
export interface PowNode<T extends NDArray> extends KernelNode {
    inputAndArgs: PowInputConfig<T>;
    output: T;
    gradient: (dy: T, y: T) => PowGradientInputArrays<T>;
}
export interface PowInputConfig<T extends NDArray> extends KernelInputConfig {
    inputs: PowInputArrays<T>;
}
export interface PowInputArrays<T extends NDArray> extends NamedArrayMap {
    a: T;
    b: NDArray<'int32'>;
}
export interface PowGradientInputArrays<T extends NDArray> extends TapeNodeInputGradientArrays {
    a: () => T;
    b: () => NDArray<'int32'>;
}
