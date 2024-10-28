declare module "types/global/index" {
    import { ClientRequest } from "http";
    import { Http2SecureServer, Http2Server, Http2ServerRequest, Http2Stream } from "http2";
    import { Stream } from "stream";
    export interface IMicroservice {
        domain: string;
        basePath: string;
        body: any;
        stream?: Http2Stream | Stream;
        request?: Http2ServerRequest | ClientRequest;
    }
    export interface IRoute {
        name: string;
        description?: string;
        path: string;
        microservice: string;
        redirect_to?: string;
        headers?: any;
        responseHeaders?: any;
        cors?: any;
    }
    export interface IBackendMicroservice extends IInheritClass {
        domain: string;
        body: IQCObjectsElement | IQCObjectsShadowedElement | HTMLElement | string | undefined;
        basePath: string;
        route: IRoute;
        projectPath?: string;
        stream?: Http2Stream | Stream;
        request?: Http2ServerRequest | ClientRequest;
        routeParams?: any;
        server: Http2SecureServer | Http2Server;
        new (microservice: IMicroservice): IBackendMicroservice;
        cors(): void;
        head(formData?: object | string): void;
        get(formData?: object | string): void;
        post(formData?: object | string): void;
        put(formData?: object | string): void;
        delete(formData?: object | string): void;
        connect(formData?: object | string): void;
        options(formData?: object | string): void;
        trace(formData?: object | string): void;
        patch(formData?: object | string): void;
        finishWithBody(stream?: Http2Stream | Stream): void;
        done(): void;
    }
    export interface IQCObjectsElement {
        enableServiceClass?: boolean;
        Cast(_o: any): any;
        render(content: string): void;
        find(tag: string): (HTMLElement | IQCObjectsElement)[];
        buildComponents(rebuildObjects?: boolean): any[];
        subelements(query: string): (HTMLElement | IQCObjectsElement)[];
        subelements(query: string): Array<any>;
    }
    export interface IQCObjectsShadowedElement {
        style: any;
        render(content: string): void;
        find(tag: string): (HTMLElement | IQCObjectsElement)[];
        buildComponents(rebuildObjects?: boolean): any[];
        subelements(query: string): (ShadowRoot | HTMLElement | IQCObjectsShadowedElement | IQCObjectsElement)[];
        subelements(query: string): any[];
    }
    export interface ILogger {
        debugEnabled: boolean;
        infoEnabled: boolean;
        warnEnabled: boolean;
        debug(message: any): string;
        warn(message: any): string;
        info(message: any): string;
    }
    export type TClass = ((className?: string, extendsFrom?: unknown, definition?: unknown) => unknown) | ((className?: string, extendsFrom?: unknown) => unknown) | ((className?: string, definition?: unknown) => unknown) | (() => unknown);
    export interface _ICrypt {
        last_string: string;
        last_key: string;
        construct: boolean;
        _new_(o: any): void;
        _encrypt(): string;
        _decrypt(): string;
        encrypt(_string_: string, key: string): string;
        decrypt(_string_: string, key: string): string;
    }
    export interface I_Crypt {
        last_string: string;
        last_key: string;
        construct: boolean;
        _new_(o: any): I_Crypt;
        _encrypt(): string;
        _decrypt(): string;
        encrypt(_string_: string, key: string): string;
        decrypt(_string_: string, key: string): string;
    }
    export interface ITagElements extends Array<any> {
        show(): void;
        hide(): void;
        effect(): void;
        findElements(elementName: string): ITagElements;
    }
    export type DefaultTemplateHandlerParams = {
        component: IComponent;
        template: string;
    };
    export interface IDefaultTemplateHandler {
        template: string;
        __definition: any;
        new ({ component, template }: DefaultTemplateHandlerParams): IDefaultTemplateHandler;
        assign(data: any): any;
    }
    export interface ISourceJS {
        domain: string;
        basePath: string;
        body: IQCObjectsElement | HTMLElement;
        type: string;
        containerTag: string;
        url: string;
        data: any;
        async: boolean;
        external: boolean;
        set(name: string, value: any): void;
        get(name: string): any;
        status: boolean;
        done(): void;
        fail(): void;
        rebuild(): void;
        Cast(o: any): any;
        _new_(properties: any): void;
    }
    export interface ISourceCSS {
        domain: string;
        basePath: string;
        body: IQCObjectsElement | HTMLElement;
        url: string;
        data: any;
        async: boolean;
        external: boolean;
        set(name: string, value: any): void;
        get(name: string): any;
        done(): void;
        fail(): void;
        rebuild(): void;
        Cast(o: any): any;
        _new_(properties: any): void;
    }
    export type IArrayList = Array<any>;
    export interface IArrayCollection {
        source: IArrayList;
        changed(prop: string, value: any): any;
        push(value: any): void;
        pop(value: any): void;
        _new_(source: IArrayList): void;
    }
    export interface IGlobalSettings {
        _GLOBAL: any;
        set(name: string, value: any): void;
        get(name: string, _default: any): any;
        __start__(): Promise<any>;
    }
    export type IGLOBAL = IGlobalSettings;
    export type DDOParams = {
        instance: any;
        name: string;
        fget: Function;
        fset: Function;
        value: any;
    };
    export interface IDDO {
        new ({ instance, name, fget, fset, value }: DDOParams): IDDO;
    }
    export type CacheController = {
        cache: IComplexStorageCache;
        cachedObjectID: string;
        cachedResponse?: any;
    };
    export type ComplexCacheParams = {
        index: string;
        load(cacheController?: CacheController): any;
        alternate(cacheController?: CacheController): any;
    };
    export interface IComplexStorageCache {
        object: any;
        index: string;
        load(cacheController: IComplexStorageCache): void;
        alternate(cacheController: IComplexStorageCache): void;
        clear(): void;
        getCached(object: any): any;
        getID(object: any): any;
        getItem(cachedObjectID: string): JSON | null;
        setItem(cachedObjectID: string, value: any): void;
        isEmpty(object: any): boolean;
        save(object: any, cachedNewResponse: string): void;
        new (cache: ComplexCacheParams): IComplexStorageCache;
    }
    export type ComponentURIParams = {
        COMPONENTS_BASE_PATH: string;
        COMPONENT_NAME: string;
        TPLEXTENSION: string;
        TPL_SOURCE: string;
    };
    export type I_ComponentWidget_ = HTMLElement;
    export type asyncLoad = (callback: Function, args: Array<any>) => any;
    export type RegisterClass = (_class_: any, namespace: string) => void;
    export type ComponentURI = ({ COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION, TPL_SOURCE }: ComponentURIParams) => string;
    export type waitUntil = (func: Function, exp: Function) => void;
    export type _super_ = (className: string, classMethodName: string, params?: Array<any>) => any;
    export type _DOMCreateElement = (elementName: string) => IQCObjectsElement | HTMLElement;
    export type shortCode = () => string;
    export type __getType__ = (_class_: any) => string;
    export type is_a = (obj: any, typeName: string) => boolean;
    export type _DataStringify = (data: any) => string;
    export type serviceLoader = (service: IService, _async: boolean) => Promise<any>;
    export type componentLoader = (component: IComponent, _async: boolean) => Promise<any>;
    export type ObjectName = (o: any) => string;
    export type isQCObjects_Class = (_: any) => boolean;
    export type isQCObjects_Object = (_: any) => boolean;
    export type NamespaceRef = (namespace: string) => any;
    export type RegisterWidget = (widgetName: string) => void;
    export type RegisterWidgets = (...widgetList: string[]) => void;
    export type range = (start: number, stop: number, step: number) => Array<any>;
    export type getDocumentLayout = () => string;
    export type Export = (fn: Function) => Function;
    export type New = (__class__: any, args: any) => any;
    export type Tag = (tagName: string, innerHTML?: string) => ITagElements;
    export type Ready = (e: Function) => void;
    export type _methods_ = (_: any) => Array<any>;
    export type set = (_: any, _value_: any) => any;
    export type get = (_: any, _defaultValue_: any) => any;
    export type __start__ = () => void;
    export interface IInheritClass {
        __instanceID: number;
        __classType?: string;
        __definition?: any;
        __new__?(): void;
        __namespace?: string;
        body?: IQCObjectsElement | IQCObjectsShadowedElement | HTMLElement | string | null | undefined;
    }
    export interface IInheritClass {
        __instanceID: number;
        __classType?: string;
        __definition?: any;
        __new__?(): void;
        __namespace?: string;
        body?: IQCObjectsElement | IQCObjectsShadowedElement | HTMLElement | string | null | undefined;
        new (o?: any): IInheritClass;
    }
    export interface IProcessor extends IInheritClass {
        component: IComponent;
        processors: any;
        process(template: string, component: IComponent): any;
        processObject(obj: any, component: IComponent): any;
        setProcessor(proc: Function): any;
    }
    export interface IProcessor extends IInheritClass {
        component: IComponent;
        processors: any;
        process(template: string, component: IComponent): any;
        processObject(obj: any, component: IComponent): any;
        setProcessor(proc: Function): any;
        new (...args: any[]): IProcessor;
    }
    export type ComponentParams = {
        __parent__?: IComponent;
        name: string;
        template?: string;
        templateURI?: string;
        tplsource?: string;
        tplextension?: string;
        url?: string;
        method?: string;
        data?: any;
        reload?: boolean;
        shadowed?: boolean;
        cached?: boolean;
        _body?: IQCObjectsElement;
        __promise__?: Promise<any> | null;
        __shadowRoot?: IQCObjectsShadowedElement;
        body?: IQCObjectsElement;
        shadowRoot?: IQCObjectsShadowedElement;
        splashScreenComponent?: IComponent;
        controller?: IController;
        view?: IView;
    };
    export interface IComponent {
        cached?: boolean;
        name: string;
        _body: IQCObjectsElement | HTMLElement;
        body: IQCObjectsElement | HTMLElement;
        templateURI: string;
        tplsource: string;
        tplextension: string;
        template: string;
        validRoutingWays: string[];
        basePath: string;
        domain: string;
        templateHandler: string;
        processorHandler?: IProcessor;
        routingWay: string | null;
        routingNodes: (IQCObjectsElement | HTMLElement)[];
        routings: ComponentRoutings;
        routingPath: string;
        routingPaths: string[];
        _componentHelpers: any[];
        subcomponents: IComponent[];
        splashScreenComponent?: IComponent;
        controller?: IController | undefined;
        view?: IView | undefined;
        effect?: IEffect;
        effectClass: string;
        method: string;
        __promise__?: Promise<any> | null | undefined;
        data: any;
        shadowed?: boolean;
        shadowRoot: IQCObjectsShadowedElement;
        cacheIndex: string;
        parsedAssignmentText: string;
        routingSelected: ComponentRouting[];
        routingParams: object;
        subtags: (HTMLElement | IQCObjectsElement | IQCObjectsShadowedElement)[];
        bodyAttributes: any;
        dataAttributes: any;
        serviceData?: any;
        container?: any;
        __done__(): Promise<unknown>;
        _bindroute_(): void;
        __buildSubComponents__(rebuildObjects: boolean): IComponent[];
        _generateRoutingPaths(componentBody: IQCObjectsElement | HTMLElement): Promise<void>;
        _reroute_(): Promise<IComponent>;
        createServiceInstance(): Promise<JSON | string | null>;
        createControllerInstance(): Promise<{
            component: IComponent;
            controller: IController;
        }>;
        createEffectInstance(): Promise<{
            component: IComponent;
            effect: IEffect;
        }>;
        createViewInstance(): Promise<{
            component: IComponent;
            view: IView;
        }>;
        done(standardResponse: ComponentDoneResponse): Promise<ComponentDoneResponse>;
        fail({ error, component }: {
            error: any;
            component: IComponent;
        }): Promise<{
            error: any;
            component: any;
        }>;
        hostElements(tagFilter: string): (IQCObjectsElement | HTMLElement | IQCObjectsShadowedElement)[];
        set(name: string, value: any): void;
        get(name: string): any;
        feedComponent(): void;
        rebuild(): Promise<{
            request?: XMLHttpRequest;
            component: IComponent;
        }>;
        Cast(oClass: any): any;
        fullscreen(): void;
        closefullscreen(): void;
        parseTemplate(template: string): string;
        lazyLoadImages(): object | null;
        applyTransitionEffect(effectClassName: string): void;
        applyObserveTransitionEffect(effectClassName: string): void;
        scrollIntoHash(): void;
        i18n_translate(): void;
        addComponentHelper(componentHelper: Function): void;
        runComponentHelpers(): void;
    }
    export type ComponentDoneResponse = {
        request?: XMLHttpRequest | undefined;
        component?: IComponent;
    };
    export type ComponentRouting = {
        path: string;
        name: string;
        tplextension?: string;
    };
    export type ComponentRoutings = ComponentRouting[];
    export interface ICONFIG extends IInheritClass {
        _CONFIG_ENC: string;
        _CONFIG: unknown;
        set(_: any, _value_: any): any;
        get(_: any, _defaultValue_: any): any;
        __definition: any;
    }
    export interface ICONFIG extends IInheritClass {
        _CONFIG_ENC: string;
        _CONFIG: unknown;
        set(_: any, _value_: any): any;
        get(_: any, _defaultValue_: any): any;
        __definition: any;
    }
    export type ControllerParams = {
        component: IComponent;
        dependencies: any[];
    };
    export interface IController {
        body?: IQCObjectsElement | HTMLElement;
        component: IComponent | null;
        dependencies?: any[];
        routingSelectedAttr(attrName: string): any;
        isTouchable(): boolean;
        onpress(subelementSelector: string, handler: EventListener): void;
        createRoutingController(): void;
        done(...args: any[]): void;
        fail?(...args: any[]): void;
    }
    export interface IController extends IInheritClass {
        body?: IQCObjectsElement | HTMLElement;
        component: IComponent | null;
        dependencies?: any[];
        new (controller: ControllerParams): IController;
        routingSelectedAttr(attrName: string): any;
        isTouchable(): boolean;
        onpress(subelementSelector: string, handler: EventListener): void;
        createRoutingController(): void;
        done(...args: any[]): void;
        fail?(...args: any[]): void;
    }
    export type ViewParams = {
        component: IComponent;
        dependencies: Array<any>;
    };
    export interface IView {
        __classType: string;
        __definition: any;
        __new__(): any;
        __namespace: string;
        body: IQCObjectsElement | HTMLElement;
        component: IComponent;
        new (view: ViewParams): IView;
        done(...args: any[]): void;
        fail(...args: any[]): void;
    }
    export type TAsyncLoadCallback = ((component: IComponent, _async?: any) => Promise<any>) | ((service: IService, _async?: any) => Promise<unknown>) | ((_async?: any) => any);
    export type ServiceDoneResponse = {
        request: XMLHttpRequest | null;
        service: IService;
    };
    export interface IService extends IInheritClass {
        kind: string;
        domain: string;
        basePath: string;
        url: string;
        method: string;
        data: any;
        reload: boolean;
        cached: boolean;
        headers: any;
        template: unknown;
        set(name: string, value: any): void;
        get(name: string): any;
        done({ request, service }: ServiceDoneResponse): void;
        fail(...args: any[]): void;
    }
    export interface IService extends IInheritClass {
        kind: string;
        domain: string;
        basePath: string;
        url: string;
        method: string;
        data: any;
        reload: boolean;
        cached: boolean;
        headers: any;
        template: unknown;
        set(name: string, value: any): void;
        get(name: string): any;
        done({ request, service }: ServiceDoneResponse): void;
        fail(...args: any[]): void;
    }
    export interface IJSONService extends IService {
        JSONresponse: JSON;
    }
    export interface IConfigService extends IJSONService {
        configFileName: string;
    }
    export type IVO = object;
    export type EffectParams = {
        duration: number;
        timing(timeFraction: number): number;
        draw(progress: number): void;
    };
    export interface IEffect extends IInheritClass {
        duration: number;
        apply(...args: any[]): any;
        animate(effect: EffectParams): void;
    }
    export type TransitionEffectParams = {
        alphaFrom?: number;
        alphaTo?: number;
        angleFrom?: number;
        angleTo?: number;
        radiusFrom?: number;
        radiusTo?: number;
        scaleFrom?: number;
        scaleTo?: number;
    };
    export interface ITransitionEffect extends IEffect {
        component: IComponent;
        defaultParams: TransitionEffectParams;
        duration: number;
        fitToHeight: boolean;
        fitToWidth: boolean;
        effects: Array<string>;
    }
    export type TimerParams = {
        duration: number;
        timing(timeFraction: number, elapsed?: number): number;
        intervalInterceptor(progress: number): void;
    };
    export interface ITimer extends IInheritClass {
        duration: number;
        alive: boolean;
        thread(timer: TimerParams): void;
    }
    export interface IToggle {
        _toggle: boolean;
        _inverse: boolean;
        _positive: Function;
        _negative: Function;
        _dispatched?: boolean;
        _args: Array<any>;
        new (positive: Function, negative: Function, args: Array<any>): IToggle;
    }
    export let logger: ILogger;
    export let _sdk_: Promise<any>;
    export var global: typeof globalThis | IGLOBAL;
    export type ClassFactory = (className: string) => any;
    export type Package = (packageName: string, classesList?: Array<any>) => Array<any> | undefined;
    export type Import = (packageName: string, ready?: Function, external?: boolean) => any;
    export const cordova: any;
    export interface Array<T> {
        length: any;
        prototype: any;
        unique(): T[];
        table(): void;
        sum(): number;
        avg(): number;
        min(): number;
        max(): number;
        sortBy(propName: string, sortAsc?: boolean): T[];
        matrix(length: number, fillValue?: number): T[];
        matrix2d(length: number, fillValue?: number): T[][];
        matrix3d(length: number, fillValue?: number): T[][][];
    }
    export interface ArrayConstructor {
        unique<T>(a: Array<T>): T[];
        table<T>(a: Array<T>): void;
        sum<T>(a: Array<T>): number;
        avg<T>(a: Array<T>): number;
        min<T>(a: Array<T>): number;
        max<T>(a: Array<T>): number;
        sortBy<T>(a: Array<T>, propName: string, sortAsc?: boolean): T[];
        matrix<T>(a: Array<T>, length: number, fillValue?: number): T[];
        matrix2d<T>(a: Array<T>, length: number, fillValue?: number): T[][];
        matrix3d<T>(a: Array<T>, length: number, fillValue?: number): T[][][];
    }
    export interface String {
        prototype: any;
        list(): string[];
    }
    export const componentsStack: IComponent[];
    export const lastCache: IComplexStorageCache | undefined;
}
declare module "src/isQCObjects" {
    export const isQCObjects_Object: (_: any) => boolean;
    export const isQCObjects_Class: (_: any) => boolean;
}
declare module "src/PrimaryCollections" {
    export var _QC_CLASSES: {};
    export var _QC_PACKAGES: {};
    export var _QC_PACKAGES_IMPORTED: never[];
    export var _QC_READY_LISTENERS: never[];
}
declare module "src/is_raw_class" {
    export const __is_raw_class__: (o_c: any) => boolean;
}
declare module "src/ObjectName" {
    /**
     * Returns the object or function name
     *
     * @param Object or function
     */
    export const ObjectName: (o: any) => string;
}
declare module "src/getType" {
    /**
     * Determine the type of the Object for any QCObjects Object
     *
     * @param {Object} object
     */
    export const __getType__: (o_c: any) => any;
}
declare module "src/platform" {
    export const isDeno: boolean;
    export const isBrowser: boolean;
    export const isNodeCommonJS: boolean;
    export const deno_require: (name: string) => void;
    export const _require_: (name: string) => void;
    export const is_phonegap: boolean;
}
declare module "src/Logger" {
    export class Logger {
        debugEnabled: boolean;
        infoEnabled: boolean;
        warnEnabled: boolean;
        debug(message: string): void;
        info(message: string): void;
        warn(message: string): void;
    }
    export const logger: Logger;
}
declare module "src/Cast" {
    /**
     * Casts an object to another object class type
     *
     * @param {Object} obj_source
     * @param {Object} obj_dest
     */
    export const _Cast: (obj_source: any, obj_dest: any) => any;
    /**
     * Casts an object to another object class type. Only properties
     *
     * @param {Object} obj_source
     * @param {Object} obj_dest
     */
    export const _CastProps: (obj_source: any, obj_dest: any) => any;
}
declare module "src/DOMCreateElement" {
    import { QCObjectsElement } from "types/global/index";
    export const _DOMCreateElement: (elementName: string) => QCObjectsElement;
}
declare module "src/IncrementInstanceID" {
    /**
     * Primary instance ID of all objects
     */
    export var __instanceID: number;
    export const IncrementInstanceID: () => void;
}
declare module "src/introspection" {
    export const _protected_code_: (_: any) => void;
    export const _methods_: (_: any) => any[];
}
declare module "src/is_a" {
    /**
     * Returns if a class or object is from a determinated type
     * @param {Object} object
     * @param {String} typeName
     */
    export const is_a: (obj: any, typeName: string) => boolean;
}
declare module "src/is_forbidden_name" {
    /**
     * Internal use to determine the forbidden names for classes
     * Reserved words
     *
     * @param {String} name
     * @param {Object} type
     * @param {Object} definition
     */
    export const __is__forbidden_name__: (name: string) => boolean;
}
declare module "src/LegacyCopy" {
    export const _LegacyCopy: (obj: any) => any;
}
declare module "src/Class" {
    import { TClass } from "types/global/index";
    /**
     * Creates new object class  of another object
     *
     * @param {String} name
     * @param {Object} type
     * @param {Object} definition
     *
     * @example
     * Class (name, type, definition)
     * Class (name, type)
     * Class (name, definition)
     * Class ()
     *
     *
     * const MyClass = Class ("MyComponent", Component, {
     *  name: "one_component",
     *  method1 : () => {console.log ("done") }
     * })
     * const myClassInstance = new MyClass ({name: "one_component"})
     *
     * const MyClass = Class ("MyService",{
     *  name: "myservice",
     * })
     *
     * const myClassInstance = new MyClass ({name: "myservice"})
     */
    export const Class: TClass;
}
declare module "src/Base64" {
    export const Base64: {
        _keyStr: string;
        encode(e: string): string;
        decode(e: string): string;
        _utf8_encode(e: string): string;
        _utf8_decode(e: string): string;
    };
}
declare module "src/basePath" {
    export var _basePath_: string;
    export const setBasePath: (value: string) => void;
}
declare module "src/DataStringify" {
    export const _DataStringify: (data: any) => string;
}
declare module "src/domain" {
    export const _domain_: string;
}
declare module "src/InheritClass" {
    import { IInheritClass } from "types/global/index";
    export const InheritClass: IInheritClass;
}
declare module "src/New" {
    /**
     * Creates an object from a Class definition
     *
     * @param {QC_Object} o
     * @param {Object} args
     */
    export const New: (__class__: any, args?: {}) => any;
}
declare module "src/secretKey" {
    export const _secretKey: string;
}
declare module "src/Crypt" {
    import { _ICrypt } from "types/global/index";
    import { InheritClass } from "src/InheritClass";
    export class _Crypt extends InheritClass implements _ICrypt {
        last_string: string;
        last_key: string;
        construct: boolean;
        _new_(o: {
            string?: string;
            key: string;
        }): void;
        _encrypt(): string;
        _decrypt(): string;
        encrypt(string: string, key: string): any;
        decrypt(string: string, key: string): any;
    }
    export const _CryptObject: (o: any) => string;
    export const _DecryptObject: (s: string) => any;
}
declare module "src/CONFIG" {
    import { InheritClass } from "src/InheritClass";
    export class CONFIG extends InheritClass {
        get _CONFIG_ENC(): string;
        get _CONFIG(): unknown;
        set(name: string, value: unknown): void;
        get(name: string, _default: any): any;
    }
}
declare module "src/Processor" {
    import { Component, HTMLElement, IProcessor, QCObjectsElement, QCObjectsShadowedElement } from "types/global/index";
    import { InheritClass } from "src/InheritClass";
    export class Processor extends InheritClass implements IProcessor {
        __definition?: any;
        __classType?: string;
        static processors: {
            config(component: Component, arg: string): any;
            ENV(component: Component, arg: string): string | undefined;
            global(component: Component, arg: string): any;
        };
        static setProcessor(_proc_: Function): void;
        constructor({ component }: {
            component: Component | null;
        });
        __instanceID: number;
        __new__?(): void;
        __namespace?: string | undefined;
        body?: string | QCObjectsElement | QCObjectsShadowedElement | HTMLElement | null | undefined;
        component: Component;
        processors: any;
        process(template: string, component: Component): void;
        processObject(obj: any, component: Component): void;
        setProcessor(proc: Function): void;
        static execute(component: Component, processorName: string, args: string): any;
        static process(template: string, component?: Component | null): string;
        static processObject(obj: any, component?: Component | null): any;
    }
}
declare module "src/routings" {
    import { ComponentRouting } from "types/global/index";
    export const __routing_params__: any;
    export const __valid_routings__: (routings: ComponentRouting[], routingPath: string) => ComponentRouting[];
    export const __valid_routing_way__: (validRoutingWays: string[], routingWay: string) => boolean;
}
declare module "src/Export" {
    export const Export: (f: any) => void;
}
declare module "src/asyncLoad" {
    import { TAsyncLoadCallback } from "types/global/index";
    export const _asyncLoad: never[];
    export function asyncLoad(callback: TAsyncLoadCallback, args?: any[]): any;
    export const _fireAsyncLoad: () => void;
}
declare module "src/ComplexStorageCache" {
    export class ComplexStorageCache {
        constructor(params: {
            index: any;
            load: any;
            alternate: any;
        });
        getItem(cachedObjectID: string): any;
        setItem(cachedObjectID: string, value: any): void;
        isEmpty(object: string | number | null): boolean;
        getID(object: any): string | undefined;
        save(object: any, cachedNewResponse: any): void;
        getCached(object: any): any;
        clear(): void;
    }
}
declare module "src/Service" {
    import { HTMLElement, IService, QCObjectsElement, QCObjectsShadowedElement, ServiceDoneResponse } from "types/global/index";
    import { InheritClass } from "src/InheritClass";
    export class Service extends InheritClass implements IService {
        kind: string;
        domain: string;
        basePath: string;
        url: string;
        method: string;
        data: {};
        reload: boolean;
        cached: boolean;
        headers: any;
        template: unknown;
        done({ request, service }: ServiceDoneResponse): void;
        fail(...args: any[]): void;
        __instanceID: number;
        __classType?: string | undefined;
        __definition?: any;
        __new__?(): void;
        __namespace?: string | undefined;
        body?: string | QCObjectsElement | QCObjectsShadowedElement | HTMLElement | null | undefined;
        set(name: string, value: never): void;
        get(name: string, _default?: never): never;
    }
    export class JSONService extends Service {
        method: string;
        cached: boolean;
        headers: {
            "Content-Type": string;
            charset: string;
        };
        JSONresponse: unknown;
        done(result: ServiceDoneResponse): void;
    }
    export class ConfigService extends JSONService {
        method: string;
        cached: boolean;
        configFileName: string;
        headers: {
            "Content-Type": string;
            charset: string;
        };
        JSONresponse: unknown;
        done(result: ServiceDoneResponse): void;
        fail(): void;
        constructor();
    }
}
declare module "src/serviceLoader" {
    import { Service } from "src/Service";
    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param service a Service object
     */
    export const serviceLoader: (service: Service, _async?: boolean) => Promise<unknown> | undefined;
}
declare module "src/tag_filter" {
    export const _tag_filter_ = "quick-component:not([loaded]),component:not([loaded])";
}
declare module "src/componentLoader" {
    import { Component } from "src/Component";
    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param component a Component object
     */
    export const componentLoader: (component: Component, _async: boolean) => any;
}
declare module "src/Component" {
    import { ComponentDoneResponse, ComponentParams, ComponentRouting, Controller, Effect, HTMLElement, IComponent, QCObjectsElement, QCObjectsShadowedElement, View } from "types/global/index";
    import { InheritClass } from "src/InheritClass";
    import { Processor } from "src/Processor";
    export class Component extends InheritClass implements IComponent {
        __instanceID: number;
        name: string;
        _body: QCObjectsElement | HTMLElement;
        templateURI: string;
        tplsource: string;
        tplextension: string;
        template: string;
        validRoutingWays: string[];
        basePath: string;
        domain: string;
        templateHandler: string;
        processorHandler?: Processor;
        routingWay: string | null;
        routingNodes: (QCObjectsElement | HTMLElement)[];
        routings: ComponentRouting[];
        routingPath: string;
        routingPaths: string[];
        _componentHelpers: any[];
        subcomponents: any[];
        splashScreenComponent?: Component;
        controller?: Controller;
        view?: View;
        effect?: Effect;
        effectClass: string;
        method: string;
        cached?: boolean;
        __promise__?: Promise<any> | null;
        data: any;
        __namespace?: string;
        constructor({ __parent__, templateURI, template, tplsource, tplextension, url, name, method, data, reload, shadowed, cached, _body, __promise__, __shadowRoot, body, shadowRoot, splashScreenComponent, controller, view }: ComponentParams);
        set body(value: any);
        get body(): any;
        set cacheIndex(value: string);
        get cacheIndex(): string;
        set parsedAssignmentText(value: any);
        get parsedAssignmentText(): any;
        set shadowRoot(value: QCObjectsShadowedElement);
        get shadowRoot(): QCObjectsShadowedElement;
        set routingSelected(value: ComponentRouting[]);
        get routingSelected(): ComponentRouting[];
        set routingParams(value: {});
        get routingParams(): {};
        createServiceInstance(): Promise<JSON | string | null>;
        _bindroute_(): void;
        done(standardResponse?: ComponentDoneResponse): Promise<ComponentDoneResponse>;
        createControllerInstance(): Promise<{
            component: Component;
            controller: Controller;
        }>;
        createEffectInstance(): Promise<{
            component: Component;
            effect: Effect;
        }>;
        createViewInstance(): Promise<{
            component: Component;
            view: View;
        }>;
        __done__(): Promise<unknown>;
        hostElements(tagFilter: string): (QCObjectsElement | HTMLElement | QCObjectsShadowedElement)[];
        get subtags(): (HTMLElement | QCObjectsElement | QCObjectsShadowedElement)[];
        get bodyAttributes(): {
            [x: number]: any;
        };
        get dataAttributes(): {};
        __buildSubComponents__(rebuildObjects?: boolean): any[];
        fail(standardResponse: {
            error: any;
            component: Component;
        }): Promise<{
            error: any;
            component: Component;
        }>;
        set(name: string, value: any): void;
        get(name: string, _defaultValue?: string): any;
        feedComponent(): void;
        rebuild(): Promise<{
            request?: XMLHttpRequest;
            component: Component;
        }>;
        Cast(oClass: any): any;
        static route(): Promise<void>;
        fullscreen(): void;
        closefullscreen(): void;
        _generateRoutingPaths(componentBody: QCObjectsElement | HTMLElement): Promise<void>;
        parseTemplate(template: any): any;
        _reroute_(): Promise<Component>;
        lazyLoadImages(): null;
        applyTransitionEffect(effectClassName: string): void;
        applyObserveTransitionEffect(effectClassName: any): void;
        scrollIntoHash(): void;
        i18n_translate(): void;
        addComponentHelper(componentHelper: any): void;
        runComponentHelpers(): void;
    }
}
declare module "src/ComponentFactory" {
    import { type ComponentURIParams, type QCObjectsElement } from "types/global/index";
    import { Component } from "src/Component";
    /**
     * Returns a standarized uri for a component
     * @example
     * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
     * @author: Jean Machuca <correojean@gmail.com>
     * @param params an object with the params to build the uri path
     */
    export const ComponentURI: ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }: ComponentURIParams) => string;
    export const _buildComponentFromElement_: (element: {
        getAttribute: (arg0: string) => string | null;
        append: (arg0: any) => void;
    }, __parent__: any) => any;
    export const _buildComponentsFromElements_: (elements: any[], __parent__: Component | null) => any[];
    export const buildComponents: (element: QCObjectsElement) => Component[];
}
declare module "src/top" {
    import { ComplexStorageCache, Component } from "types/global/index";
    type QCObjects = {
        lastCache?: ComplexStorageCache;
        componentsStack: Component[];
        Microservice: any;
        Route: any;
        BackendMicroservice: any;
        QCObjectsElement: any;
        QCObjectsShadowedElement: any;
        Logger: any;
        Class: any;
        _Crypt: any;
        TagElements: any;
        DefaultTemplateHandler: any;
        SourceJS: any;
        SourceCSS: any;
        ArrayList: any;
        ArrayCollection: any;
        GlobalSettings: any;
        GLOBAL: any;
        DDO: any;
        CacheController: any;
        ComplexCacheParams: any;
        ComplexStorageCache: any;
        ComponentWidget: any;
        asyncLoad: any;
        RegisterClass: any;
        ComponentURI: any;
        waitUntil: any;
        super: any;
        _DOMCreateElement: any;
        shortCode: any;
        getType: any;
        is_a: any;
        _DataStringify: any;
        serviceLoader: any;
        componentLoader: any;
        ObjectName: any;
        isQCObjects_Class: any;
        isQCObjects_Object: any;
        NamespaceRef: any;
        RegisterWidget: any;
        RegisterWidgets: any;
        range: any;
        getDocumentLayout: any;
        Export: any;
        New: any;
        Tag: any;
        Ready: any;
        methods: any;
        set: any;
        get: any;
        start: any;
        InheritClass: any;
        Processor: any;
        ComponentParams: any;
        ComponentDoneResponse: any;
        Component: any;
        CONFIG: any;
        ControllerParams: any;
        Controller: any;
        ViewParams: any;
        View: any;
        Service: any;
        JSONService: any;
        ConfigService: any;
        VO: any;
        EffectParams: any;
        Effect: any;
        TransitionEffect: any;
        TimerParams: any;
        Timer: any;
        Toggle: any;
        logger: any;
        sdk: any;
        global: any;
        ClassFactory: any;
        Package: any;
        Import: any;
    } | typeof self | typeof global;
    export var _top: QCObjects;
    export let componentsStack: Component[];
    export const resetTop: (_top_: QCObjects) => void;
    export const buildComponentsStack: () => void;
}
declare module "src/make_global" {
    export const __make_global__: (f: any) => void;
}
declare module "src/RegisterClass" {
    export const __register_class__: (_class_: any, __namespace?: string) => any;
    export const RegisterClass: (_class_: any, __namespace?: string) => any;
}
declare module "src/Package" {
    /**
     * Defines a package for Class classification
     *
     * @param {Object} namespace
     * @param {Object} classes
     */
    export const Package: (namespace: string, classes?: any[]) => any;
}
declare module "src/ClassFactory" {
    export const ClassFactory: (className: string) => any;
}
declare module "src/mathFunctions" {
    export const __to_number: (value: any) => number;
}
declare module "src/ArrayCollection" {
    import { IArrayCollection, IArrayList } from "types/global/index";
    export class ArrayList extends Array implements IArrayList {
        prototype: any;
        unique(): any[];
        table(): void;
        sum(): number;
        avg(): number;
        min(): number;
        max(): number;
        sortBy(propName: string, sortAsc?: boolean): any[];
        matrix(length: number, fillValue?: number): any[];
        matrix2d(length: number, fillValue?: number): any[][];
        matrix3d(length: number, fillValue?: number): any[][][];
    }
    export class ArrayCollection implements IArrayCollection {
        source: ArrayList;
        changed(prop: string, value: any): void;
        push(value: any): void;
        pop(): void;
        _new_(source: ArrayList): void;
    }
}
declare module "src/BackendMicroservice" {
    import { Http2Stream } from "http2";
    import { Stream } from "stream";
    import { InheritClass } from "src/InheritClass";
    export class BackendMicroservice extends InheritClass {
        body: any;
        stream: any;
        route: any;
        headers: any;
        request: any;
        constructor({ domain, basePath, body, stream, request }: {
            domain?: string | undefined;
            basePath?: string | undefined;
            body?: null | undefined;
            stream?: null | undefined;
            request?: null | undefined;
        });
        cors(): void;
        head(formData: any): void;
        get(formData: any): void;
        post(formData: any): void;
        put(formData: any): void;
        delete(formData: any): void;
        connect(formData: any): void;
        options(formData: any): void;
        trace(formData: any): void;
        patch(formData: any): void;
        finishWithBody(stream?: Http2Stream | Stream): void;
        done(): void;
    }
}
declare module "src/ConfigSettings" { }
declare module "src/Controller" {
    import { ControllerParams, HTMLElement, IController, QCObjectsElement } from "types/global/index";
    import { InheritClass } from "src/InheritClass";
    import { Component } from "src/Component";
    export class Controller extends InheritClass implements IController {
        __instanceID: number;
        component: Component | null;
        dependencies?: any[];
        constructor({ component, dependencies }: ControllerParams);
        body?: QCObjectsElement | HTMLElement | undefined;
        routingSelectedAttr(attrName: string): any;
        isTouchable(): boolean;
        onpress(subelementSelector: string, handler: Function): void;
        createRoutingController(): void;
        done(): void;
    }
}
declare module "src/DDO" {
    import { DDOParams } from "types/global/index";
    const DDO_base: any;
    /**
     * Dynamic Data Objects Class
     * Usage:
     * Class('TestDDO',{
     *    data: {},
     *    _new_ (){
     *        this.ddo = New(DDO,{
     *            instance:this,
     *            name:'data',
     *            value:{},
     *            fget (value){
     *                logger.debug('returned value '+ value );
     *            }
     *            })
     *    }
     * });
     *
     */
    export class DDO extends DDO_base {
        constructor({ instance, name, fget, fset, value }: DDOParams);
        _new_({ instance, name, fget, fset, value }: DDOParams): void;
    }
}
declare module "src/DefaultTemplateHandler" {
    import { DefaultTemplateHandlerParams } from "types/global/index";
    export class DefaultTemplateHandler {
        template: string;
        __definition: {};
        static __definition: {};
        component: import("types/global").IComponent;
        constructor({ component, template }: DefaultTemplateHandlerParams);
        assign(data: any): string;
    }
}
declare module "src/DocumentLayout" {
    export const getDocumentLayout: () => string | undefined;
}
declare module "src/Effect" {
    import { EffectParams } from "types/global/index";
    import { InheritClass } from "src/InheritClass";
    export class Effect extends InheritClass {
        duration: number;
        constructor();
        animate({ timing, draw, duration }: EffectParams): void;
    }
}
declare module "src/findPackageNodePath" {
    export const findPackageNodePath: (packagename: string) => string | null;
}
declare module "src/Import" {
    /**
     * Imports a script with the package nomenclature
     *
     * @param {Object} packagename
     * @param {Object} ready
     * @param {Boolean} external
     */
    export const Import: (packagename: string, ready?: Function, external?: boolean) => Promise<{
        _imported_?: any;
        _package_name_?: string;
    }> | undefined;
}
declare module "src/NamespaceRef" {
    /**
     * Declare Namespace
     *
     * @param {String} packageName
     * @param {Object} package
     */
    export const NamespaceRef: (namespace: string) => {
        [x: string]: any;
    };
}
declare module "src/assign" { }
declare module "src/subelements" {
    export const subelements: (this: any, query: string) => any[];
}
declare module "src/waitUntil" {
    export const waitUntil: (func: () => void, exp: () => any) => void;
}
declare module "src/super" {
    /**
     * Returns a method from a superior QCObjects Class
     * It is useful for Class Inheritance in the _new_ and __new__ method constructors
     * @example _super_('MySuperClass','MySuperMethod').call(this,params) #where this is the current instance and params are method parameters
     *
     * @param {String} className
     * @param {String} classMethodName
     * @param {Object} params
     */
    export const _super_: (className: string, classMethodName: string) => any;
}
declare module "src/shortCode" {
    export const shortCode: () => any;
}
declare module "src/Ready" {
    /**
     * Defines a Custom Ready listener
     */
    export const Ready: (e: any) => void;
    export const ready: (e: any) => void;
    /**
     * Default Ready event function for window. Executes all micro ready events of Import calls
     *
     * @param {Object} e
     */
    export const _Ready: (e: any) => void;
}
declare module "src/captureFalseTouch" {
    export let supportsPassive: boolean;
    export const captureFalseTouch: () => false | {
        passive: boolean;
    };
}
declare module "src/range" {
    export const range: (start: number, stop?: number, step?: number) => number[];
}
declare module "src/defaultProcessors" {
    export const setDefaultProcessors: () => void;
}
declare module "src/Tag" {
    export const TagElements: unknown;
    /**
     * Gets the element of DOM found by tag name
     *
     * @param {Object} tagname
     * @param {Object} innerHTML
     */
    export const Tag: (tagname: string, innerHTML?: string) => any;
}
declare module "src/SourceJS" {
    export const SourceJS: unknown;
}
declare module "src/SourceCSS" {
    export const SourceCSS: unknown;
}
declare module "src/globalSettings" {
    import { InheritClass } from "src/InheritClass";
    export class GlobalSettings extends InheritClass {
        _GLOBAL: {};
        __definition: {};
        __classType: string;
        constructor();
        static set(name: string, value: any): void;
        static get(name: string, _default?: any): any;
        static __start__(): void;
    }
}
declare module "src/WidgetsFactory" {
    import { I_ComponentWidget_ } from "types/global/index";
    export class _ComponentWidget_ extends HTMLElement implements I_ComponentWidget_ {
        constructor();
    }
    export const RegisterWidget: (widgetName: string) => void;
    export const RegisterWidgets: () => void;
}
declare module "src/View" {
    import { InheritClass } from "src/InheritClass";
    export class View extends InheritClass {
        constructor({ component, dependencies }: {
            component?: undefined;
            dependencies?: never[] | undefined;
        });
    }
}
declare module "src/VO" {
    import { InheritClass } from "src/InheritClass";
    export class VO extends InheritClass {
        constructor();
    }
}
declare module "src/TransitionEffect" {
    import { TransitionEffectParams } from "types/global/index";
    import { Effect } from "src/Effect";
    export class TransitionEffect extends Effect {
        duration: number;
        defaultParams: {
            alphaFrom: number;
            alphaTo: number;
            angleFrom: number;
            angleTo: number;
            radiusFrom: number;
            radiusTo: number;
            scaleFrom: number;
            scaleTo: number;
        };
        fitToHeight: boolean;
        fitToWidth: boolean;
        effects: never[];
        constructor();
        apply({ alphaFrom, alphaTo, angleFrom, angleTo, radiusFrom, radiusTo, scaleFrom, scaleTo }: TransitionEffectParams): void;
    }
}
declare module "src/Timer" {
    import { TimerParams } from "types/global/index";
    import { InheritClass } from "src/InheritClass";
    export class Timer extends InheritClass {
        constructor();
        duration: number;
        alive: boolean;
        thread({ timing, intervalInterceptor, duration }: TimerParams): void;
    }
}
declare module "src/Toggle" {
    import { InheritClass } from "src/InheritClass";
    export class Toggle extends InheritClass {
        _toggle: boolean;
        _inverse: boolean;
        _positive: Function | null;
        _negative: Function | null;
        _dispatched: Function | null;
        _args: {};
        constructor(positive: Function, negative: Function, args: Array<any>);
        changeToggle(): void;
        _new_({ positive, negative, args }: {
            positive: Function;
            negative: Function;
            args: Array<any>;
        }): void;
        fire(): Promise<Toggle>;
    }
}
declare module "src/QCObjects" {
    import "src/assign";
    import { Logger } from "src/Logger";
    import { asyncLoad } from "src/asyncLoad";
    import { ComplexStorageCache } from "src/ComplexStorageCache";
    import { Processor } from "src/Processor";
    import { BackendMicroservice } from "src/BackendMicroservice";
    import { Component } from "src/Component";
    import { _Crypt } from "src/Crypt";
    import { DefaultTemplateHandler } from "src/DefaultTemplateHandler";
    import { GlobalSettings } from "src/globalSettings";
    import { _ComponentWidget_ } from "src/WidgetsFactory";
    import { CONFIG } from "src/CONFIG";
    import { Controller } from "src/Controller";
    import { View } from "src/View";
    import { ConfigService, JSONService, Service } from "src/Service";
    import { VO } from "src/VO";
    import { Effect } from "src/Effect";
    import { TransitionEffect } from "src/TransitionEffect";
    import { Timer } from "src/Timer";
    import { ArrayCollection, ArrayList } from "src/ArrayCollection";
    import { DDO } from "src/DDO";
    import { Toggle } from "src/Toggle";
    import { QCObjectsElement } from "types/global/index";
    const _default: {
        BackendMicroservice: typeof BackendMicroservice;
        Logger: typeof Logger;
        Class: import("types/global").TClass;
        _Crypt: typeof _Crypt;
        TagElements: unknown;
        DefaultTemplateHandler: typeof DefaultTemplateHandler;
        SourceJS: unknown;
        SourceCSS: unknown;
        ArrayList: typeof ArrayList;
        ArrayCollection: typeof ArrayCollection;
        GlobalSettings: typeof GlobalSettings;
        DDO: typeof DDO;
        ComplexStorageCache: typeof ComplexStorageCache;
        _ComponentWidget_: typeof _ComponentWidget_;
        asyncLoad: typeof asyncLoad;
        RegisterClass: (_class_: any, __namespace?: string) => any;
        ComponentURI: ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }: import("types/global").ComponentURIParams) => string;
        waitUntil: (func: () => void, exp: () => any) => void;
        _super_: (className: string, classMethodName: string) => any;
        _DOMCreateElement: (elementName: string) => QCObjectsElement;
        shortCode: () => any;
        __getType__: (o_c: any) => any;
        is_a: (obj: any, typeName: string) => boolean;
        _DataStringify: (data: any) => string;
        serviceLoader: (service: Service, _async?: boolean) => Promise<unknown> | undefined;
        componentLoader: (component: Component, _async: boolean) => any;
        ObjectName: (o: any) => string;
        isQCObjects_Class: (_: any) => boolean;
        isQCObjects_Object: (_: any) => boolean;
        NamespaceRef: (namespace: string) => {
            [x: string]: any;
        };
        RegisterWidget: (widgetName: string) => void;
        RegisterWidgets: () => void;
        range: (start: number, stop?: number, step?: number) => number[];
        getDocumentLayout: () => string | undefined;
        Export: (f: any) => void;
        New: (__class__: any, args?: {}) => any;
        Tag: (tagname: string, innerHTML?: string) => any;
        Ready: (e: any) => void;
        _methods_: (_: any) => any[];
        InheritClass: import("types/global").IInheritClass;
        Processor: typeof Processor;
        Component: typeof Component;
        CONFIG: typeof CONFIG;
        Controller: typeof Controller;
        View: typeof View;
        Service: typeof Service;
        JSONService: typeof JSONService;
        ConfigService: typeof ConfigService;
        VO: typeof VO;
        Effect: typeof Effect;
        TransitionEffect: typeof TransitionEffect;
        Timer: typeof Timer;
        Toggle: typeof Toggle;
        logger: Logger;
        global: typeof globalThis;
        ClassFactory: (className: string) => any;
        Package: (namespace: string, classes?: any[]) => any;
        Import: (packagename: string, ready?: Function, external?: boolean) => Promise<{
            _imported_?: any;
            _package_name_?: string;
        }> | undefined;
    };
    export default _default;
}
declare module "src/index" {
    import QCObjects from "src/QCObjects";
    export default QCObjects;
}
declare module "src/localStorage" {
    export var localStorage: any;
}
declare module "src/uniqueID" {
    export const uniqueId: () => any;
}
