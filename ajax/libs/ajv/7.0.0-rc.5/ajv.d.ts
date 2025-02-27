export { Format, FormatDefinition, AsyncFormatDefinition, KeywordDefinition, KeywordErrorDefinition, CodeKeywordDefinition, MacroKeywordDefinition, FuncKeywordDefinition, Vocabulary, Schema, SchemaObject, AnySchemaObject, AsyncSchema, AnySchema, ValidateFunction, AsyncValidateFunction, ErrorObject, ErrorNoParams, } from "./types";
export { Plugin, Options, CodeOptions, InstanceOptions, Logger, ErrorsTextOptions } from "./core";
export { SchemaCxt, SchemaObjCxt } from "./compile";
import KeywordCxt from "./compile/context";
export { KeywordCxt };
export { DefinedError } from "./vocabularies/errors";
export { JSONType } from "./compile/rules";
export { JSONSchemaType } from "./types/json-schema";
export { _, str, stringify, nil, Name, Code, CodeGen, CodeGenOptions } from "./compile/codegen";
import type { AnySchemaObject } from "./types";
import AjvCore from "./core";
export default class Ajv extends AjvCore {
    _addVocabularies(): void;
    _addDefaultMetaSchema(): void;
    defaultMeta(): string | AnySchemaObject | undefined;
}
