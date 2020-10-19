import { App } from 'vue';
import { ComponentInternalInstance } from 'vue';
import { ComputedRef } from '@vue/reactivity';
import { ObjectDirective } from 'vue';
import { RawSourceMap } from 'source-map';
import { RenderFunction } from 'vue';
import { SetupContext } from 'vue';
import { VNode } from 'vue';
import { WritableComputedRef } from '@vue/reactivity';

export declare function baseCompile(source: string, options?: CompileOptions): CodeGenResult;

export declare interface BaseFormatProps {
    tag?: string | object;
    locale?: Locale;
    scope?: ComponetI18nScope;
}

export declare type Choice = number;

export declare function clearCompileCache(): void;

export declare function clearDateTimeFormat<DateTimeFormats = {}, Message = string>(ctx: RuntimeDateTimeContext<DateTimeFormats, Message>, locale: Locale, format: DateTimeFormat): void;

export declare function clearNumberFormat<NumberFormats, Message = string>(ctx: RuntimeNumberContext<NumberFormats, Message>, locale: Locale, format: NumberFormat_2): void;

declare interface CodeGenOptions {
    mode?: 'normal' | 'arrow';
    onError?: CompileErrorHandler;
    sourceMap?: boolean;
    filename?: string;
}

declare interface CodeGenResult {
    code: string;
    ast: ResourceNode;
    map?: RawSourceMap;
}

export declare function compile<T = string>(source: string, options?: CompileOptions): MessageFunction<T>;

declare type CompileCacheKeyHandler = (source: string) => string;

export declare type CompileDomain = 'tokenizer' | 'parser' | 'generator' | 'transformer' | 'compiler';

export declare interface CompileError extends SyntaxError {
    code: number;
    domain?: CompileDomain;
    location?: SourceLocation;
}

export declare const enum CompileErrorCodes {
    EXPECTED_TOKEN = 0,
    INVALID_TOKEN_IN_PLACEHOLDER = 1,
    UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER = 2,
    UNKNOWN_ESCAPE_SEQUENCE = 3,
    INVALID_UNICODE_ESCAPE_SEQUENCE = 4,
    UNBALANCED_CLOSING_BRACE = 5,
    UNTERMINATED_CLOSING_BRACE = 6,
    EMPTY_PLACEHOLDER = 7,
    NOT_ALLOW_NEST_PLACEHOLDER = 8,
    INVALID_LINKED_FORMAT = 9,
    MUST_HAVE_MESSAGES_IN_PLURAL = 10,
    UNEXPECTED_LEXICAL_ANALYSIS = 11,
    __EXTEND_POINT__ = 12
}

export declare type CompileErrorHandler = (error: CompileError) => void;

export declare type CompileOptions = {
    warnHtmlMessage?: boolean;
    onCacheKey?: CompileCacheKeyHandler;
} & TransformOptions & CodeGenOptions & ParserOptions & TokenizeOptions;

declare type ComponentInstanceCreatedListener = <Messages>(target: VueI18n<Messages>, global: VueI18n<Messages>) => void;

export declare type ComponetI18nScope = Exclude<I18nScope, 'local'>;

export declare interface Composer<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = VueMessageType> {
    id: number;
    locale: WritableComputedRef<Locale>;
    fallbackLocale: WritableComputedRef<FallbackLocale>;
    inheritLocale: boolean;
    readonly availableLocales: Locale[];
    readonly messages: ComputedRef<Messages>;
    readonly datetimeFormats: ComputedRef<DateTimeFormats>;
    readonly numberFormats: ComputedRef<NumberFormats>;
    readonly modifiers: LinkedModifiers<Message>;
    readonly pluralRules?: PluralizationRules;
    readonly isGlobal: boolean;
    missingWarn: boolean | RegExp;
    fallbackWarn: boolean | RegExp;
    fallbackRoot: boolean;
    fallbackFormat: boolean;
    warnHtmlMessage: boolean;
    escapeParameter: boolean;
    t(key: Path): string;
    t(key: Path, plural: number): string;
    t(key: Path, plural: number, options: TranslateOptions): string;
    t(key: Path, defaultMsg: string): string;
    t(key: Path, defaultMsg: string, options: TranslateOptions): string;
    t(key: Path, list: unknown[]): string;
    t(key: Path, list: unknown[], plural: number): string;
    t(key: Path, list: unknown[], defaultMsg: string): string;
    t(key: Path, list: unknown[], options: TranslateOptions): string;
    t(key: Path, named: NamedValue): string;
    t(key: Path, named: NamedValue, plural: number): string;
    t(key: Path, named: NamedValue, defaultMsg: string): string;
    t(key: Path, named: NamedValue, options: TranslateOptions): string;
    t(...args: unknown[]): string;
    d(value: number | Date): string;
    d(value: number | Date, key: string): string;
    d(value: number | Date, key: string, locale: Locale): string;
    d(value: number | Date, options: DateTimeOptions): string;
    d(...args: unknown[]): string;
    n(value: number): string;
    n(value: number, key: string): string;
    n(value: number, key: string, locale: Locale): string;
    n(value: number, options: NumberOptions): string;
    n(...args: unknown[]): string;
    tm(key: Path): LocaleMessageValue<Message> | {};
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<Message>;
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<Message>): void;
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    getNumberFormat(locale: Locale): NumberFormat_2;
    setNumberFormat(locale: Locale, format: NumberFormat_2): void;
    mergeNumberFormat(locale: Locale, format: NumberFormat_2): void;
    getPostTranslationHandler(): PostTranslationHandler<Message> | null;
    setPostTranslationHandler(handler: PostTranslationHandler<Message> | null): void;
    getMissingHandler(): MissingHandler | null;
    setMissingHandler(handler: MissingHandler | null): void;
}

export declare interface ComposerAdditionalOptions {
    useScope?: I18nScope;
}

export declare interface ComposerOptions<Message = VueMessageType> {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    inheritLocale?: boolean;
    messages?: LocaleMessages<Message>;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    modifiers?: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    missing?: MissingHandler;
    missingWarn?: boolean | RegExp;
    fallbackWarn?: boolean | RegExp;
    fallbackRoot?: boolean;
    fallbackFormat?: boolean;
    postTranslation?: PostTranslationHandler<Message>;
    warnHtmlMessage?: boolean;
    escapeParameter?: boolean;
}

export declare function createI18n<Options extends I18nOptions = {}, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat_2> = Record<keyof Options['numberFormats'], NumberFormat_2>>(options?: Options): I18n<Options['messages'], Options['datetimeFormats'], Options['numberFormats']>;

export declare function createParser(options?: ParserOptions): Parser;

export declare function createRuntimeContext<Message = string, Options extends RuntimeOptions<Message> = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<Message>> = Record<keyof Options['messages'], LocaleMessageDictionary<Message>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat_2> = Record<keyof Options['numberFormats'], NumberFormat_2>>(options?: Options): RuntimeContext<Options['messages'], Options['datetimeFormats'], Options['numberFormats'], Message>;

declare type CurrencyDisplay = 'symbol' | 'code' | 'name';

declare interface CurrencyNumberFormatOptions extends Intl.NumberFormatOptions {
    style: 'currency';
    currency: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

export declare type CustomBlocks<Message = VueMessageType> = Array<string | LocaleMessages<Message>> | PreCompileHandler<Message>;

export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date, key: string, locale: Locale): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, value: number | Date, options: DateTimeOptions): string | number | Intl.DateTimeFormatPart[];

export declare function datetime<DateTimeFormats, Message = string>(context: RuntimeDateTimeContext<DateTimeFormats, Message>, ...args: unknown[]): string | number | Intl.DateTimeFormatPart[];

declare type DateTimeDigital = 'numeric' | '2-digit';

declare type DateTimeFormat = {
    [key: string]: DateTimeFormatOptions;
};

export declare const DatetimeFormat: {
    name: string;
    props: {
        value: {
            type: (NumberConstructor | DateConstructor)[];
            required: boolean;
        };
        format: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        tag: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
    };
    setup(props: DatetimeFormatProps, context: SetupContext): RenderFunction;
};

declare type DateTimeFormatOptions = Intl.DateTimeFormatOptions | SpecificDateTimeFormatOptions;

export declare type DatetimeFormatProps = FormattableProps<number | Date, Intl.DateTimeFormatOptions>;

export declare type DateTimeFormatResult = string;

export declare type DateTimeFormats = {
    [locale: string]: DateTimeFormat;
};

declare type DateTimeHumanReadable = 'long' | 'short' | 'narrow';

export declare type DateTimeOptions = {
    key?: string;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    part?: boolean;
};

declare type DevToolsEmitter = Emittable<DevToolsEmitterEvents>;

declare type DevToolsEmitterEvents = {
    [DevToolsTimelineEvents.COMPILE_ERROR]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.COMPILE_ERROR];
    [DevToolsTimelineEvents.MISSING]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MISSING];
    [DevToolsTimelineEvents.FALBACK]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.FALBACK];
    [DevToolsTimelineEvents.MESSAGE_RESOLVE]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MESSAGE_RESOLVE];
    [DevToolsTimelineEvents.MESSAGE_COMPILATION]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MESSAGE_COMPILATION];
    [DevToolsTimelineEvents.MESSAGE_EVALUATION]: DevToolsTimelineEventPayloads[DevToolsTimelineEvents.MESSAGE_EVALUATION];
};

declare type DevToolsTimelineEventPayloads = {
    [DevToolsTimelineEvents.COMPILE_ERROR]: {
        message: PathValue;
        error: string;
        start?: number;
        end?: number;
    };
    [DevToolsTimelineEvents.MISSING]: {
        locale: Locale;
        key: Path;
        type: RuntimeMissingType;
    };
    [DevToolsTimelineEvents.FALBACK]: {
        key: Path;
        type: RuntimeMissingType;
        from?: Locale;
        to: Locale | 'global';
    };
    [DevToolsTimelineEvents.MESSAGE_RESOLVE]: {
        type: DevToolsTimelineEvents.MESSAGE_RESOLVE;
        key: Path;
        message: PathValue;
        time: number;
    };
    [DevToolsTimelineEvents.MESSAGE_COMPILATION]: {
        type: DevToolsTimelineEvents.MESSAGE_COMPILATION;
        message: PathValue;
        time: number;
    };
    [DevToolsTimelineEvents.MESSAGE_EVALUATION]: {
        type: DevToolsTimelineEvents.MESSAGE_EVALUATION;
        value: unknown;
        time: number;
    };
};

declare const enum DevToolsTimelineEvents {
    COMPILE_ERROR = "compile-error",
    MISSING = "missing",
    FALBACK = "fallback",
    MESSAGE_RESOLVE = "message-resolve",
    MESSAGE_COMPILATION = "message-compilation",
    MESSAGE_EVALUATION = "message-evaluation"
}

declare interface Emittable<Events extends Record<EventType, unknown> = {}> {
    events: EventHandlerMap<Events>;
    on<Key extends keyof Events>(event: Key | '*', handler: EventHandler<Events[keyof Events]> | WildcardEventHandler<Events>): void;
    off<Key extends keyof Events>(event: Key | '*', handler: EventHandler<Events[keyof Events]> | WildcardEventHandler<Events>): void;
    emit<Key extends keyof Events>(event: Key, payload?: Events[keyof Events]): void;
}

declare type EventHandler<T = unknown> = (payload?: T) => void;

declare type EventHandlerList<T = unknown> = Array<EventHandler<T>>;

declare type EventHandlerMap<Events extends Record<EventType, unknown>> = Map<keyof Events | '*', EventHandlerList<Events[keyof Events]> | WildcardEventHandlerList<Events>>;

declare type EventType = string | symbol;

export declare interface ExportedComposer {
    locale: Locale;
    fallbackLocale: FallbackLocale;
    readonly availableLocales: Locale[];
}

declare type ExtractToStringFunction<T> = T[ExtractToStringKey<T>];

declare type ExtractToStringKey<T> = Extract<keyof T, 'toString'>;

export declare type FallbackLocale = Locale | Locale[] | {
    [locale in string]: Locale[];
} | false;

export declare interface FormattableProps<Value, Format> extends BaseFormatProps {
    value: Value;
    format?: string | Format;
}

export declare interface Formatter {
    interpolate(message: string, values: any, path: string): Array<any> | null;
}

export declare const friendlyJSONstringify: (json: unknown) => string;

export declare const generateFormatCacheKey: (locale: string, key: string, source: string) => string;

export declare function getLocaleChain<Message = string>(ctx: RuntimeCommonContext<Message>, fallback: FallbackLocale, start?: Locale): Locale[];

export declare function handleMissing<Message = string>(context: RuntimeCommonContext<Message>, key: Path, locale: Locale, missingWarn: boolean | RegExp, type: RuntimeMissingType): unknown;

export declare interface I18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}> {
    readonly mode: I18nMode;
    readonly global: Composer<Messages, DateTimeFormats, NumberFormats>;
    install(app: App, ...options: unknown[]): void;
}

export declare interface I18nAdditionalOptions {
    legacy?: boolean;
    globalInjection?: boolean;
}

export declare type I18nMode = 'legacy' | 'composable';

export declare type I18nOptions = I18nAdditionalOptions & (ComposerOptions | VueI18nOptions);

export declare interface I18nPluginOptions {
    useI18nComponentName?: boolean;
    globalInstall?: boolean;
}

export declare type I18nScope = 'local' | 'parent' | 'global';

declare type Identifier = string;

export declare function isTranslateFallbackWarn(fallback: boolean | RegExp, key: Path): boolean;

export declare function isTranslateMissingWarn(missing: boolean | RegExp, key: Path): boolean;

declare interface LinkedKeyNode extends Node_2 {
    type: NodeTypes.LinkedKey;
    value: string;
}

export declare type LinkedModifiers<T = string> = {
    [key: string]: LinkedModify<T>;
};

declare type LinkedModify<T = string> = (value: T) => MessageType<T>;

declare interface LinkedModitierNode extends Node_2 {
    type: NodeTypes.LinkedModifier;
    value: Identifier;
}

declare interface LinkedNode extends Node_2 {
    type: NodeTypes.Linked;
    modifier?: LinkedModitierNode;
    key: LinkedKeyNode | NamedNode | ListNode | LiteralNode;
}

declare interface ListNode extends Node_2 {
    type: NodeTypes.List;
    index: number;
}

declare interface LiteralNode extends Node_2 {
    type: NodeTypes.Literal;
    value: string;
}

export declare type Locale = string;

export declare interface LocaleMessageArray<Message = string> extends Array<LocaleMessageValue<Message>> {
}

export declare type LocaleMessageDictionary<Message = string> = {
    [property: string]: LocaleMessageValue<Message>;
};

export declare type LocaleMessageObject<Message = string> = LocaleMessageDictionary<Message>;

export declare type LocaleMessages<Message = string> = Record<Locale, LocaleMessageDictionary<Message>>;

export declare type LocaleMessageValue<Message = string> = string | MessageFunction<Message> | LocaleMessageDictionary<Message> | LocaleMessageArray<Message>;

export declare type MessageCompiler<Message = string> = (source: string, options?: CompileOptions) => MessageFunction<Message>;

declare interface MessageContext<T = string> {
    list(index: number): unknown;
    named(key: string): unknown;
    pluralIndex: number;
    pluralRule: PluralizationRule;
    orgPluralRule?: PluralizationRule;
    modifier(name: string): LinkedModify<T>;
    message(name: string): MessageFunction<T>;
    type?: string;
    interpolate: MessageInterpolate<T>;
    normalize: MessageNormalize<T>;
}

declare type MessageElementNode = TextNode | NamedNode | ListNode | LiteralNode | LinkedNode;

export declare type MessageFunction<T = string> = MessageFunctionCallable | MessageFunctionInternal<T>;

declare type MessageFunctionCallable = <T = string>(ctx: MessageContext<T>) => MessageType<T>;

declare type MessageFunctionInternal<T = string> = {
    (ctx: MessageContext<T>): MessageType<T>;
    key?: string;
    locale?: string;
    source?: string;
};

export declare type MessageFunctions<T = string> = Record<string, MessageFunction<T>>;

declare type MessageInterpolate<T = string> = (val: unknown) => MessageType<T>;

declare interface MessageNode extends Node_2 {
    type: NodeTypes.Message;
    items: MessageElementNode[];
}

declare type MessageNormalize<T = string> = (values: MessageType<string | T>[]) => MessageType<T | T[]>;

declare interface MessageProcessor<T = string> {
    type?: string;
    interpolate?: MessageInterpolate<T>;
    normalize?: MessageNormalize<T>;
}

declare type MessageType<T = string> = T extends string ? string : StringConvertable<T>;

export declare const MISSING_RESOLVE_VALUE = "";

export declare type MissingHandler = (locale: Locale, key: Path, insttance?: ComponentInternalInstance, type?: string) => string | void;

declare interface NamedNode extends Node_2 {
    type: NodeTypes.Named;
    key: Identifier;
}

declare type NamedValue<T = {}> = T & Record<string, unknown>;

declare interface Node_2 {
    type: NodeTypes;
    start: number;
    end: number;
    loc?: SourceLocation;
}

declare const enum NodeTypes {
    Resource = 0,
    Plural = 1,
    Message = 2,
    Text = 3,
    Named = 4,
    List = 5,
    Linked = 6,
    LinkedKey = 7,
    LinkedModifier = 8,
    Literal = 9
}

export declare const NOT_REOSLVED = -1;

export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number, key: string): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number, key: string, locale: Locale): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, value: number, options: NumberOptions): string | number | Intl.NumberFormatPart[];

export declare function number<NumberFormats, Message = string>(context: RuntimeNumberContext<NumberFormats, Message>, ...args: unknown[]): string | number | Intl.NumberFormatPart[];

export declare const NumberFormat: {
    name: string;
    props: {
        value: {
            type: NumberConstructor;
            required: boolean;
        };
        format: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        tag: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
    };
    setup(props: NumberFormatProps, context: SetupContext): RenderFunction;
};

declare type NumberFormat_2 = {
    [key: string]: NumberFormatOptions;
};

declare type NumberFormatOptions = Intl.NumberFormatOptions | SpecificNumberFormatOptions | CurrencyNumberFormatOptions;

export declare type NumberFormatProps = FormattableProps<number, Intl.NumberFormatOptions>;

export declare type NumberFormatResult = string;

export declare type NumberFormats = {
    [locale: string]: NumberFormat_2;
};

export declare type NumberOptions = {
    key?: string;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    part?: boolean;
};

export declare function parseDateTimeArgs(...args: unknown[]): [string, number | Date, DateTimeOptions, Intl.DateTimeFormatOptions];

export declare function parseNumberArgs(...args: unknown[]): [string, number, NumberOptions, Intl.NumberFormatOptions];

export declare interface Parser {
    parse(source: string): ResourceNode;
}

declare interface ParserOptions {
    location?: boolean;
    onError?: CompileErrorHandler;
}

export declare function parseTranslateArgs(...args: unknown[]): [Path, TranslateOptions];

export declare type Path = string;

export declare type PathValue = string | number | boolean | Function | null | {
    [key: string]: PathValue;
} | PathValue[];

export declare type PluralizationRule = (choice: number, choicesLength: number, orgRule?: PluralizationRule) => number;

declare type PluralizationRules = {
    [locale: string]: PluralizationRule;
};

export declare type PluralizationRulesMap = {
    [locale: string]: PluralizationRule;
};

declare interface PluralNode extends Node_2 {
    type: NodeTypes.Plural;
    cases: MessageNode[];
}

declare interface Position_2 {
    offset: number;
    line: number;
    column: number;
}

export declare type PostTranslationHandler<Message = string> = (translated: MessageType<Message>) => MessageType<Message>;

declare type PreCompileHandler<Message = VueMessageType> = () => {
    messages: LocaleMessages<Message>;
    functions: MessageFunctions<Message>;
};

declare interface ResourceNode extends Node_2 {
    type: NodeTypes.Resource;
    body: MessageNode | PluralNode;
    helpers?: string[];
}

export declare interface RuntimeCommonContext<Message = string> {
    locale: Locale;
    fallbackLocale: FallbackLocale;
    missing: RuntimeMissingHandler<Message> | null;
    missingWarn: boolean | RegExp;
    fallbackWarn: boolean | RegExp;
    fallbackFormat: boolean;
    unresolving: boolean;
    onWarn(msg: string, err?: Error): void;
}

export declare interface RuntimeContext<Messages = {}, DateTimeFormats = {}, NumberFormats = {}, Message = string> extends RuntimeTranslationContext<Messages, Message>, RuntimeDateTimeContext<DateTimeFormats, Message>, RuntimeNumberContext<NumberFormats, Message> {
}

export declare interface RuntimeDateTimeContext<DateTimeFormats = {}, Message = string> extends RuntimeCommonContext<Message> {
    datetimeFormats: DateTimeFormats;
}

export declare interface RuntimeInternalContext {
    __datetimeFormatters: Map<string, Intl.DateTimeFormat>;
    __numberFormatters: Map<string, Intl.NumberFormat>;
    __localeChainCache?: Map<Locale, Locale[]>;
    __emitter?: DevToolsEmitter;
}

export declare interface RuntimeInternalOptions {
    __datetimeFormatters?: Map<string, Intl.DateTimeFormat>;
    __numberFormatters?: Map<string, Intl.NumberFormat>;
    __emitter?: DevToolsEmitter;
}

export declare type RuntimeMissingHandler<Message = string> = (context: RuntimeCommonContext<Message>, locale: Locale, key: Path, type: RuntimeMissingType, ...values: unknown[]) => string | void;

export declare type RuntimeMissingType = 'translate' | 'datetime format' | 'number format';

export declare interface RuntimeNumberContext<NumberFormats = {}, Message = string> extends RuntimeCommonContext<Message> {
    numberFormats: NumberFormats;
}

export declare interface RuntimeOptions<Message = string> {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages<Message>;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    modifiers?: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    missing?: RuntimeMissingHandler<Message>;
    missingWarn?: boolean | RegExp;
    fallbackWarn?: boolean | RegExp;
    fallbackFormat?: boolean;
    unresolving?: boolean;
    postTranslation?: PostTranslationHandler<Message>;
    processor?: MessageProcessor<Message>;
    warnHtmlMessage?: boolean;
    escapeParameter?: boolean;
    messageCompiler?: MessageCompiler<Message>;
    onWarn?: (msg: string, err?: Error) => void;
}

export declare interface RuntimeTranslationContext<Messages = {}, Message = string> extends RuntimeCommonContext<Message> {
    messages: Messages;
    modifiers: LinkedModifiers<Message>;
    pluralRules?: PluralizationRules;
    postTranslation: PostTranslationHandler<Message> | null;
    processor: MessageProcessor<Message> | null;
    warnHtmlMessage: boolean;
    escapeParameter: boolean;
    messageCompiler: MessageCompiler<Message>;
}

declare interface SourceLocation {
    start: Position_2;
    end: Position_2;
    source?: string;
}

declare interface SpecificDateTimeFormatOptions extends Intl.DateTimeFormatOptions {
    year?: DateTimeDigital;
    month?: DateTimeDigital | DateTimeHumanReadable;
    day?: DateTimeDigital;
    hour?: DateTimeDigital;
    minute?: DateTimeDigital;
    second?: DateTimeDigital;
    weekday?: DateTimeHumanReadable;
    era?: DateTimeHumanReadable;
    timeZoneName?: 'long' | 'short';
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

declare interface SpecificNumberFormatOptions extends Intl.NumberFormatOptions {
    style?: 'decimal' | 'percent';
    currency?: string;
    currencyDisplay?: CurrencyDisplay;
    localeMatcher?: 'lookup' | 'best-fit';
    formatMatcher?: 'basic' | 'best-fit';
}

declare type StringConvertable<T> = ExtractToStringKey<T> extends never ? unknown : ExtractToStringFunction<T> extends (...args: any) => string ? T : unknown;

declare interface TextNode extends Node_2 {
    type: NodeTypes.Text;
    value: string;
}

declare interface TokenizeOptions {
    location?: boolean;
    onError?: CompileErrorHandler;
}

declare interface TransformOptions {
    onError?: CompileErrorHandler;
}

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, plural: number): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, plural: number, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, defaultMsg: string): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, defaultMsg: string, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[]): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[], plural: number): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[], defaultMsg: string): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, list: unknown[], options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue, plural: number): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue, defaultMsg: string): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, key: Path, named: NamedValue, options: TranslateOptions): MessageType<Message> | number;

export declare function translate<Messages, Message = string>(context: RuntimeTranslationContext<Messages, Message>, ...args: unknown[]): MessageType<Message> | number;

export declare type TranslateOptions = {
    list?: unknown[];
    named?: NamedValue;
    plural?: number;
    default?: string | boolean;
    locale?: Locale;
    missingWarn?: boolean;
    fallbackWarn?: boolean;
    escapeParameter?: boolean;
};

export declare type TranslateResult = string;

export declare const Translation: {
    name: string;
    props: {
        keypath: {
            type: StringConstructor;
            required: boolean;
        };
        plural: {
            type: (StringConstructor | NumberConstructor)[];
            validator: (val: any) => boolean;
        };
        tag: {
            type: (StringConstructor | ObjectConstructor)[];
        };
        locale: {
            type: StringConstructor;
        };
        scope: {
            type: StringConstructor;
            validator: (val: "parent" | "global") => boolean;
            default: "parent" | "global";
        };
    };
    setup(props: TranslationProps, context: SetupContext): RenderFunction;
};

export declare interface TranslationProps extends BaseFormatProps {
    keypath: string;
    plural?: number | string;
}

export declare function updateFallbackLocale<Message = string>(ctx: RuntimeCommonContext<Message>, locale: Locale, fallback: FallbackLocale): void;

export declare function useI18n<Options extends UseI18nOptions = object, Messages extends Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>> = Record<keyof Options['messages'], LocaleMessageDictionary<VueMessageType>>, DateTimeFormats extends Record<keyof Options['datetimeFormats'], DateTimeFormat> = Record<keyof Options['datetimeFormats'], DateTimeFormat>, NumberFormats extends Record<keyof Options['numberFormats'], NumberFormat_2> = Record<keyof Options['numberFormats'], NumberFormat_2>>(options?: Options): Composer<Options['messages'], Options['datetimeFormats'], Options['numberFormats']>;

export declare type UseI18nOptions = ComposerAdditionalOptions & ComposerOptions;

export declare const VERSION: string;

export declare function vTDirective<Messages, DateTimeFormats, NumberFormats>(i18n: I18n<Messages, DateTimeFormats, NumberFormats>): ObjectDirective<HTMLElement>;

export declare interface VueI18n<Messages = {}, DateTimeFormats = {}, NumberFormats = {}> {
    id: number;
    locale: Locale;
    fallbackLocale: FallbackLocale;
    readonly availableLocales: Locale[];
    readonly messages: Messages;
    readonly datetimeFormats: DateTimeFormats;
    readonly numberFormats: NumberFormats;
    formatter: Formatter;
    missing: MissingHandler | null;
    postTranslation: PostTranslationHandler<VueMessageType> | null;
    silentTranslationWarn: boolean | RegExp;
    silentFallbackWarn: boolean | RegExp;
    formatFallbackMessages: boolean;
    sync: boolean;
    warnHtmlInMessage: WarnHtmlInMessageLevel;
    escapeParameterHtml: boolean;
    preserveDirectiveContent: boolean;
    t(key: Path): TranslateResult;
    t(key: Path, locale: Locale): TranslateResult;
    t(key: Path, locale: Locale, list: unknown[]): TranslateResult;
    t(key: Path, locale: Locale, named: object): TranslateResult;
    t(key: Path, list: unknown[]): TranslateResult;
    t(key: Path, named: Record<string, unknown>): TranslateResult;
    t(...args: unknown[]): TranslateResult;
    tc(key: Path): TranslateResult;
    tc(key: Path, locale: Locale): TranslateResult;
    tc(key: Path, list: unknown[]): TranslateResult;
    tc(key: Path, named: Record<string, unknown>): TranslateResult;
    tc(key: Path, choice: number): TranslateResult;
    tc(key: Path, choice: number, locale: Locale): TranslateResult;
    tc(key: Path, choice: number, list: unknown[]): TranslateResult;
    tc(key: Path, choice: number, named: Record<string, unknown>): TranslateResult;
    tc(...args: unknown[]): TranslateResult;
    te(key: Path, locale?: Locale): boolean;
    tm(key: Path): LocaleMessageValue<VueMessageType> | {};
    getLocaleMessage(locale: Locale): LocaleMessageDictionary<VueMessageType>;
    setLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    mergeLocaleMessage(locale: Locale, message: LocaleMessageDictionary<VueMessageType>): void;
    d(value: number | Date): DateTimeFormatResult;
    d(value: number | Date, key: string): DateTimeFormatResult;
    d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult;
    d(value: number | Date, args: {
        [key: string]: string;
    }): DateTimeFormatResult;
    d(...args: unknown[]): DateTimeFormatResult;
    getDateTimeFormat(locale: Locale): DateTimeFormat;
    setDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    mergeDateTimeFormat(locale: Locale, format: DateTimeFormat): void;
    n(value: number): NumberFormatResult;
    n(value: number, key: string): NumberFormatResult;
    n(value: number, key: string, locale: Locale): NumberFormatResult;
    n(value: number, args: {
        [key: string]: string;
    }): NumberFormatResult;
    n(...args: unknown[]): NumberFormatResult;
    getNumberFormat(locale: Locale): NumberFormat_2;
    setNumberFormat(locale: Locale, format: NumberFormat_2): void;
    mergeNumberFormat(locale: Locale, format: NumberFormat_2): void;
    getChoiceIndex: (choice: Choice, choicesLength: number) => number;
}

export declare interface VueI18nOptions {
    locale?: Locale;
    fallbackLocale?: FallbackLocale;
    messages?: LocaleMessages<VueMessageType>;
    datetimeFormats?: DateTimeFormats;
    numberFormats?: NumberFormats;
    availableLocales?: Locale[];
    modifiers?: LinkedModifiers<VueMessageType>;
    formatter?: Formatter;
    missing?: MissingHandler;
    fallbackRoot?: boolean;
    silentTranslationWarn?: boolean | RegExp;
    silentFallbackWarn?: boolean | RegExp;
    formatFallbackMessages?: boolean;
    preserveDirectiveContent?: boolean;
    warnHtmlInMessage?: WarnHtmlInMessageLevel;
    escapeParameterHtml?: boolean;
    sharedMessages?: LocaleMessages<VueMessageType>;
    pluralizationRules?: PluralizationRules;
    postTranslation?: PostTranslationHandler<VueMessageType>;
    sync?: boolean;
    componentInstanceCreatedListener?: ComponentInstanceCreatedListener;
}

export declare type VueMessageType = string | VNode;

export declare type WarnHtmlInMessageLevel = 'off' | 'warn' | 'error';

declare type WildcardEventHandler<T = Record<string, unknown>> = (event: keyof T, payload?: T[keyof T]) => void;

declare type WildcardEventHandlerList<T = Record<string, unknown>> = Array<WildcardEventHandler<T>>;

export { }

declare module '@vue/runtime-core' {
  export interface ComponentCustomOptions {
    /**
     * VueI18n options
     *
     * @remarks
     * See the {@link VueI18nOptions}
     */
    i18n?: VueI18nOptions
    /**
     * For custom blocks options
     * @internal
     */
    __i18n?: CustomBlocks
  }

  export interface ComponentCustomProperties {
    /**
     * Global composer instance, or a instance that are compatible with vue-i18n@v8.x VueI18n interface
     *
     * @remarks
     * You can get the {@link I18n.global | global composer} created during the execution of {@link createI18n}.
     * This instance is global property injected into for each components by `app.config.globalProperties`.
     *
     * If you have specified `legacy: true` in options at `createI18n`, that is in legacy mode, {@link VueI18n} instance is set to for each the components.
     * Otherwise, you will be able get root VueI18n instance.
     */
    $i18n: VueI18n | ExportedComposer
    /**
     * translation method
     *
     * @remarks
     * In composable mode, In the case of composable mode, the method (property) is injected by `app.config.globalProperties`.
     * the input / output is the same as for `Composer`, and it's **global**. About that details, see {@link Composer.t | `Composer#t` }.
     *
     * In legacy mode, the input / output is the same as for `VueI18n` of vue-i18n@v8.x. About that details, see {@link VueI18n.t | `VueI18n#t`}.
     */
    $t(key: Path): TranslateResult
    $t(key: Path, locale: Locale): TranslateResult
    $t(key: Path, locale: Locale, list: unknown[]): TranslateResult
    $t(key: Path, locale: Locale, named: object): TranslateResult
    $t(key: Path, list: unknown[]): TranslateResult
    $t(key: Path, named: Record<string, unknown>): TranslateResult
    $t(key: Path): string
    $t(key: Path, plural: number): string
    $t(key: Path, plural: number, options: TranslateOptions): string
    $t(key: Path, defaultMsg: string): string
    $t(key: Path, defaultMsg: string, options: TranslateOptions): string
    $t(key: Path, list: unknown[]): string
    $t(key: Path, list: unknown[], plural: number): string
    $t(key: Path, list: unknown[], defaultMsg: string): string
    $t(key: Path, list: unknown[], options: TranslateOptions): string
    $t(key: Path, named: NamedValue): string
    $t(key: Path, named: NamedValue, plural: number): string
    $t(key: Path, named: NamedValue, defaultMsg: string): string
    $t(key: Path, named: NamedValue, options: TranslateOptions): string
    /**
     * pluralization method
     *
     * @remarks
     * The input / output is the same as for `VueI18n` of vue-i18n@v8.x. About that details, see {@link VueI18n.tc | `VueI18n#tc` }.
     *
     * This property is supported for legacy mode only
     */
    $tc(key: Path): TranslateResult
    $tc(key: Path, locale: Locale): TranslateResult
    $tc(key: Path, list: unknown[]): TranslateResult
    $tc(key: Path, named: Record<string, unknown>): TranslateResult
    $tc(key: Path, choice: number): TranslateResult
    $tc(key: Path, choice: number, locale: Locale): TranslateResult
    $tc(key: Path, choice: number, list: unknown[]): TranslateResult
    $tc(
      key: Path,
      choice: number,
      named: Record<string, unknown>
    ): TranslateResult
    /**
     * translation exist method
     *
     * @remarks
     * The input / output is the same as for `VueI18n` of vue-i18n@v8.x. About that details, see {@link VueI18n.te | `VueI18n.#te` }.
     *
     * This property is supported for legacy mode only
     */
    $te(key: Path, locale?: Locale): boolean
    /**
     * datetime method
     *
     * @remarks
     * In composable mode, In the case of composable mode, the method (property) is injected by `app.config.globalProperties`.
     * the input / output is the same as for `Composer`, and it's **global**. About that details, see {@link Composer.d | `Composer#d` }.
     *
     * In legacy mode, the input / output is the same as for `VueI18n` of vue-i18n@v8.x. About that details, see {@link VueI18n.d | `VueI18n#d` }.
     */
    $d(value: number | Date): DateTimeFormatResult
    $d(value: number | Date, key: string): DateTimeFormatResult
    $d(value: number | Date, key: string, locale: Locale): DateTimeFormatResult
    $d(
      value: number | Date,
      args: { [key: string]: string }
    ): DateTimeFormatResult
    $d(value: number | Date): string
    $d(value: number | Date, key: string): string
    $d(value: number | Date, key: string, locale: Locale): string
    $d(value: number | Date, options: DateTimeOptions): string
    /**
     * number method
     *
     * @remarks
     * In composable mode, In the case of composable mode, the method (property) is injected by `app.config.globalProperties`.
     * the input / output is the same as for `Composer`,  and it's **global**. About that details, see {@link Composer.n | `Composer.n` }.
     *
     * In legacy mode, the input / output is the same as for `VueI18n` of vue-i18n@v8.x. About that details, see {@link VueI18n.n | `VueI18n.n` }.
     */
    $n(value: number): NumberFormatResult
    $n(value: number, key: string): NumberFormatResult
    $n(value: number, key: string, locale: Locale): NumberFormatResult
    $n(value: number, args: { [key: string]: string }): NumberFormatResult
    $n(value: number): string
    $n(value: number, key: string): string
    $n(value: number, key: string, locale: Locale): string
    $n(value: number, options: NumberOptions): string
    /**
     * translation messages method
     *
     * @remarks
     * In composable mode, In the case of composable mode, the method (property) is injected by `app.config.globalProperties`.
     * the input / output is the same as for `Composer`, and it's **global**. About that details, see {@link Composer.tm | `Composer.tm` }.
     *
     * In legacy mode, the input / output is the same as for `VueI18n` of vue-i18n@v8.x. About that details, see {@link VueI18n.tm | `VueI18n#tm` }.
     */
    $tm(key: Path): LocaleMessageValue<VueMessageType> | {}
  }
}
