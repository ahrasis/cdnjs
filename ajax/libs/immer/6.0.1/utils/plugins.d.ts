import { ImmerState, Patch, ImmerScope, Drafted, AnyObject, ImmerBaseState, AnyArray, AnyMap, AnySet, ProxyTypeES5Array, ProxyTypeES5Object, ProxyTypeMap, ProxyTypeSet } from "../internal";
/** Plugin utilities */
declare const plugins: {
    Patches?: {
        generatePatches_(state: ImmerState, basePath: PatchPath, patches: Patch[], inversePatches: Patch[]): void;
        generateReplacementPatches_(rootState: ImmerState, replacement: any, patches: Patch[], inversePatches: Patch[]): void;
        applyPatches_<T>(draft: T, patches: Patch[]): T;
    };
    ES5?: {
        willFinalizeES5_(scope: ImmerScope, result: any, isReplaced: boolean): void;
        createES5Proxy_<T>(base: T, parent?: ImmerState): Drafted<T, ES5ObjectState | ES5ArrayState>;
        markChangedES5_(state: ImmerState): void;
    };
    MapSet?: {
        proxyMap_<T extends AnyMap>(target: T, parent?: ImmerState): T;
        proxySet_<T extends AnySet>(target: T, parent?: ImmerState): T;
    };
};
declare type Plugins = typeof plugins;
export declare function getPlugin<K extends keyof Plugins>(pluginKey: K): Exclude<Plugins[K], undefined>;
export declare function loadPlugin<K extends keyof Plugins>(pluginKey: K, implementation: Plugins[K]): void;
/** ES5 Plugin */
interface ES5BaseState extends ImmerBaseState {
    finalizing_: boolean;
    assigned_: {
        [key: string]: any;
    };
    parent_?: ImmerState;
    revoked_: boolean;
}
export interface ES5ObjectState extends ES5BaseState {
    type_: typeof ProxyTypeES5Object;
    draft_: Drafted<AnyObject, ES5ObjectState>;
    base_: AnyObject;
    copy_: AnyObject | null;
}
export interface ES5ArrayState extends ES5BaseState {
    type_: typeof ProxyTypeES5Array;
    draft_: Drafted<AnyObject, ES5ArrayState>;
    base_: AnyArray;
    copy_: AnyArray | null;
}
/** Map / Set plugin */
export interface MapState extends ImmerBaseState {
    type_: typeof ProxyTypeMap;
    copy_: AnyMap | undefined;
    assigned_: Map<any, boolean> | undefined;
    base_: AnyMap;
    revoked_: boolean;
    draft_: Drafted<AnyMap, MapState>;
}
export interface SetState extends ImmerBaseState {
    type_: typeof ProxyTypeSet;
    copy_: AnySet | undefined;
    base_: AnySet;
    drafts_: Map<any, Drafted>;
    revoked_: boolean;
    draft_: Drafted<AnySet, SetState>;
}
/** Patches plugin */
export declare type PatchPath = (string | number)[];
export {};
//# sourceMappingURL=plugins.d.ts.map