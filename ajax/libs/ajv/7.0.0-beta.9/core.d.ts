export { Format, FormatDefinition, AsyncFormatDefinition, KeywordDefinition, KeywordErrorDefinition, CodeKeywordDefinition, MacroKeywordDefinition, FuncKeywordDefinition, Vocabulary, Schema, SchemaObject, AnySchemaObject, AsyncSchema, AnySchema, ValidateFunction, AsyncValidateFunction, AnyValidateFunction, ErrorObject, } from "./types";
export { SchemaCxt, SchemaObjCxt } from "./compile";
export interface Plugin<Opts> {
    (ajv: Ajv, options?: Opts): Ajv;
    [prop: string]: any;
}
import KeywordCxt from "./compile/context";
export { KeywordCxt };
export { DefinedError } from "./vocabularies/errors";
export { JSONType } from "./compile/rules";
export { JSONSchemaType } from "./types/json-schema";
export { _, str, stringify, nil, Name, Code, CodeGen, CodeGenOptions } from "./compile/codegen";
import type { Schema, AnySchema, AnySchemaObject, SchemaObject, AsyncSchema, Vocabulary, KeywordDefinition, AddedKeywordDefinition, AnyValidateFunction, ValidateFunction, AsyncValidateFunction, ErrorObject, Format, AddedFormat } from "./types";
import type { JSONSchemaType } from "./types/json-schema";
import { ValidationError, MissingRefError } from "./compile/error_classes";
import { ValidationRules } from "./compile/rules";
import { SchemaEnv } from "./compile";
import { Code, ValueScope } from "./compile/codegen";
export declare type Options = CurrentOptions & DeprecatedOptions;
interface CurrentOptions {
    strict?: boolean | "log";
    strictTypes?: boolean | "log";
    strictTuples?: boolean | "log";
    allowMatchingProperties?: boolean;
    allowUnionTypes?: boolean;
    validateFormats?: boolean;
    $data?: boolean;
    allErrors?: boolean;
    verbose?: boolean;
    $comment?: true | ((comment: string, schemaPath?: string, rootSchema?: AnySchemaObject) => unknown);
    formats?: {
        [Name in string]?: Format;
    };
    keywords?: Vocabulary;
    schemas?: AnySchema[] | {
        [Key in string]?: AnySchema;
    };
    logger?: Logger | false;
    loadSchema?: (uri: string) => Promise<AnySchemaObject>;
    removeAdditional?: boolean | "all" | "failing";
    useDefaults?: boolean | "empty";
    coerceTypes?: boolean | "array";
    next?: boolean;
    unevaluated?: boolean;
    dynamicRef?: boolean;
    meta?: SchemaObject | boolean;
    defaultMeta?: string | AnySchemaObject;
    validateSchema?: boolean | "log";
    addUsedSchema?: boolean;
    inlineRefs?: boolean | number;
    passContext?: boolean;
    loopRequired?: number;
    loopEnum?: number;
    ownProperties?: boolean;
    multipleOfPrecision?: boolean | number;
    messages?: boolean;
    code?: CodeOptions;
}
export interface CodeOptions {
    es5?: boolean;
    lines?: boolean;
    optimize?: boolean | number;
    formats?: Code;
    source?: boolean;
    process?: (code: string, schema?: SchemaEnv) => string;
}
interface InstanceCodeOptions extends CodeOptions {
    optimize: number;
}
interface DeprecatedOptions {
    /** @deprecated */
    ignoreKeywordsWithRef?: boolean;
    /** @deprecated */
    jsPropertySyntax?: boolean;
    /** @deprecated */
    unicode?: boolean;
}
declare type RequiredInstanceOptions = {
    [K in "strict" | "strictTypes" | "strictTuples" | "inlineRefs" | "loopRequired" | "loopEnum" | "meta" | "messages" | "addUsedSchema" | "validateSchema" | "validateFormats"]: NonNullable<Options[K]>;
} & {
    code: InstanceCodeOptions;
};
export declare type InstanceOptions = Options & RequiredInstanceOptions;
export interface Logger {
    log(...args: unknown[]): unknown;
    warn(...args: unknown[]): unknown;
    error(...args: unknown[]): unknown;
}
export default class Ajv {
    opts: InstanceOptions;
    errors?: ErrorObject[] | null;
    logger: Logger;
    readonly scope: ValueScope;
    readonly schemas: {
        [Key in string]?: SchemaEnv;
    };
    readonly refs: {
        [Ref in string]?: SchemaEnv | string;
    };
    readonly formats: {
        [Name in string]?: AddedFormat;
    };
    readonly RULES: ValidationRules;
    readonly _compilations: Set<SchemaEnv>;
    private readonly _loading;
    private readonly _cache;
    private readonly _metaOpts;
    static ValidationError: typeof ValidationError;
    static MissingRefError: typeof MissingRefError;
    constructor(opts?: Options);
    _addVocabularies(): void;
    _addDefaultMetaSchema(): void;
    defaultMeta(): string | AnySchemaObject | undefined;
    validate(schema: Schema | string, data: unknown): boolean;
    validate(schemaKeyRef: AnySchema | string, data: unknown): boolean | Promise<unknown>;
    validate<T>(schema: Schema | JSONSchemaType<T> | string, data: unknown): data is T;
    validate<T>(schema: AsyncSchema, data: unknown | T): Promise<T>;
    validate<T>(schemaKeyRef: AnySchema | string, data: unknown): data is T | Promise<T>;
    compile<T = unknown>(schema: Schema | JSONSchemaType<T>, _meta?: boolean): ValidateFunction<T>;
    compile<T = unknown>(schema: AsyncSchema, _meta?: boolean): AsyncValidateFunction<T>;
    compile<T = unknown>(schema: AnySchema, _meta?: boolean): AnyValidateFunction<T>;
    compileAsync<T = unknown>(schema: SchemaObject | JSONSchemaType<T>, _meta?: boolean): Promise<ValidateFunction<T>>;
    compileAsync<T = unknown>(schema: AsyncSchema, meta?: boolean): Promise<AsyncValidateFunction<T>>;
    compileAsync<T = unknown>(schema: AnySchemaObject, meta?: boolean): Promise<AnyValidateFunction<T>>;
    addSchema(schema: AnySchema | AnySchema[], // If array is passed, `key` will be ignored
    key?: string, // Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    _meta?: boolean, // true if schema is a meta-schema. Used internally, addMetaSchema should be used instead.
    _validateSchema?: boolean | "log"): Ajv;
    addMetaSchema(schema: AnySchemaObject, key?: string, // schema key
    _validateSchema?: boolean | "log"): Ajv;
    validateSchema(schema: AnySchema, throwOrLogError?: boolean): boolean | Promise<unknown>;
    getSchema<T = unknown>(keyRef: string): AnyValidateFunction<T> | undefined;
    removeSchema(schemaKeyRef?: AnySchema | string | RegExp): Ajv;
    addVocabulary(definitions: Vocabulary): Ajv;
    addKeyword(kwdOrDef: string | KeywordDefinition, def?: KeywordDefinition): Ajv;
    getKeyword(keyword: string): AddedKeywordDefinition | boolean;
    removeKeyword(keyword: string): Ajv;
    addFormat(name: string, format: Format): Ajv;
    errorsText(errors?: ErrorObject[] | null | undefined, // optional array of validation errors
    { separator, dataVar }?: ErrorsTextOptions): string;
    $dataMetaSchema(metaSchema: AnySchemaObject, keywordsJsonPointers: string[]): AnySchemaObject;
    private _removeAllSchemas;
    private _addSchema;
    private _checkUnique;
    private _compileSchemaEnv;
    private _compileMetaSchema;
}
export interface ErrorsTextOptions {
    separator?: string;
    dataVar?: string;
}
