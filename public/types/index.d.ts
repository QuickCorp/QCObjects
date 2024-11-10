declare module "is_raw_class" {
    export const __is_raw_class__: (o_c: any) => boolean;
}
declare module "PrimaryCollections" {
    import { T_QC_CLASSES, T_QC_PACKAGES } from "types";
    export var _QC_CLASSES: T_QC_CLASSES;
    export var _QC_PACKAGES: T_QC_PACKAGES;
    export var _QC_PACKAGES_IMPORTED: any[];
    export var _QC_READY_LISTENERS: any[];
}
declare module "ClassFactory" {
    import { TClassFactory } from "types";
    export const ClassFactory: TClassFactory;
}
declare module "_import_" {
    function _import_(name: string): Promise<any>;
    export { _import_ };
}
declare module "platform" {
    export const isDeno: boolean;
    export const isBrowser: boolean;
    export const isNodeCommonJS: boolean;
    export const deno_require: (name: string) => void;
    export const _require_: (name: string) => any;
    export const is_phonegap: boolean;
}
declare module "Cast" {
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
    export const _CastProps: (obj_source: any, obj_dest: any, _ignoreError?: boolean) => any;
}
declare module "DOMCreateElement" {
    import { IQCObjectsElement } from "types";
    export const _DOMCreateElement: (elementName: string, props?: any[], children?: any) => IQCObjectsElement;
    export const _DOMCreateComplexElement: (_type: string | Function, props?: any[], children?: any) => HTMLElement;
}
declare module "ObjectName" {
    /**
     * Returns the object or function name
     *
     * @param Object or function
     */
    export const ObjectName: (o: any) => string;
}
declare module "getType" {
    /**
     * Determine the type of the Object for any QCObjects Object
     *
     * @param {Object} object
     */
    export const __getType__: (o_c: any) => any;
}
declare module "IncrementInstanceID" {
    /**
     * Primary instance ID of all objects
     */
    export var __instanceID: number;
    export const IncrementInstanceID: () => void;
}
declare module "introspection" {
    export const _protected_code_: (_: any) => void;
    export const _methods_: <T>(_: any) => T[];
}
declare module "RegisterClass" {
    export const __register_class__: (_class_: any, __namespace?: string) => any;
    export const RegisterClass: (_class_: any, __namespace?: string) => any;
}
declare module "Package" {
    /**
     * Defines a package for Class classification
     *
     * @param {Object} namespace
     * @param {Object} classes
     */
    export const Package: (namespace: string, classes?: any[]) => any[] | undefined;
}
declare module "InheritClass" {
    import { type IInheritClass, type TBody } from "types";
    export class InheritClass implements IInheritClass {
        [key: string]: any;
        __definition: any;
        private _body;
        get body(): TBody;
        set body(value: TBody);
        childs: any;
        __instanceID: number;
        constructor(_o_?: any);
        static get __classType(): any;
        get __classType(): string;
        static hierarchy(__class__: any): any[];
        __namespace?: string | undefined;
        __new__(_o_: any): void;
        _new_(_o_?: any): void;
        static getParentClass(): any;
        getParentClass(): any;
        static getClass(): any;
        getClass(): any;
        css(_css: any): any;
        hierarchy(): any;
        append(_child?: any): void;
        attachIn(tag: any): void;
    }
}
declare module "isQCObjects" {
    export const isQCObjects_Object: (_: any) => boolean;
    export const isQCObjects_Class: (_: any) => boolean;
}
declare module "is_a" {
    /**
     * Returns if a class or object is from a determinated type
     * @param {Object} object
     * @param {String} typeName
     */
    export const is_a: (obj: any, typeName: string) => boolean;
}
declare module "is_forbidden_name" {
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
declare module "LegacyCopy" {
    export const _LegacyCopy: (obj: any, _ignore?: string[]) => any;
}
declare module "Class" {
    import { TClass } from "types";
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
declare module "Base64" {
    export const Base64: {
        _keyStr: string;
        encode(e: string): string;
        decode(e: string): string;
        _utf8_encode(e: string): string;
        _utf8_decode(e: string): string;
    };
}
declare module "basePath" {
    export var _basePath_: string;
    export const setBasePath: (value: string) => void;
}
declare module "DataStringify" {
    export const _DataStringify: (data: any) => string;
}
declare module "domain" {
    export const _domain_: string;
}
declare module "New" {
    /**
     * Creates an object from a Class definition
     *
     * @param {QC_Object} o
     * @param {Object} args
     */
    export const New: (__class__: any, args?: {}) => any;
}
declare module "secretKey" {
    export const _secretKey: string;
}
declare module "Crypt" {
    import { _ICrypt } from "types";
    import { InheritClass } from "InheritClass";
    export class _Crypt extends InheritClass implements _ICrypt {
        string: string;
        key: string;
        encrypt(_string_: string, key: string): string;
        decrypt(_string_: string, key: string): string;
        last_string: string;
        last_key: string;
        construct: boolean;
        _new_(o: {
            string?: string;
            key: string;
        }): void;
        _encrypt(): string;
        _decrypt(): string;
        static encrypt(string: string, key: string): string;
        static decrypt(string: string, key: string): string;
    }
    export const _CryptObject: (o: any) => string;
    export const _DecryptObject: (s: string) => any;
}
declare module "ConfigSettings" {
    import { InheritClass } from "InheritClass";
    type TConfigSettings = {
        [key: string]: any;
        relativeImportPath: string;
        remoteImportsPath: string;
        remoteSDKPath: string;
        asynchronousImportsLoad: boolean;
        removePackageScriptAfterLoading: boolean;
        componentsBasePath: string;
        delayForReady: number;
        preserveComponentBodyTag: false;
        useConfigService: false;
        routingWay: string;
        useSDK: boolean;
        useLocalSDK: boolean;
        basePath: string;
    };
    export class ConfigSettings extends InheritClass {
        _CONFIG: TConfigSettings;
        protected static _instance: ConfigSettings;
        _CONFIG_ENC: string;
        set(name: string, value: any): void;
        get(name: string, _defaultValue?: any): any;
        static get instance(): ConfigSettings;
    }
}
declare module "CONFIG" {
    import { InheritClass } from "InheritClass";
    import { ICONFIG } from "types";
    export class CONFIG extends InheritClass implements ICONFIG {
        get _CONFIG_ENC(): string;
        get _CONFIG(): unknown;
        set(name: string, value: unknown): void;
        get(name: string, _default?: unknown): any;
        private static _instance;
        static get instance(): CONFIG;
        static set(name: string, value: unknown): void;
        static get(name: string, value?: unknown): any;
    }
}
declare module "Processor" {
    import { type IComponent, type IProcessor } from "types";
    import { InheritClass } from "InheritClass";
    export class Processor extends InheritClass implements IProcessor {
        protected static _instance: IProcessor | undefined;
        constructor({ component, processors }: {
            component: IComponent | null;
            processors?: any;
        });
        processors: any;
        static get instance(): IProcessor;
        setProcessor(_proc_: Function): void;
        component: IComponent | null;
        execute(component: IComponent, processorName: string, args: string): string;
        process(template: string, component?: IComponent | null): string;
        processObject(obj: any, component?: IComponent | null): any;
    }
    export const GlobalProcessor: IProcessor;
}
declare module "routings" {
    import { TComponentRouting } from "types";
    export const __routing_params__: (routing: TComponentRouting, routingPath: string) => object;
    export const __valid_routings__: (routings: TComponentRouting[], routingPath: string) => TComponentRouting[];
    export const __valid_routing_way__: (validRoutingWays: string[], routingWay: string) => boolean;
}
declare module "asyncLoad" {
    import { TAsyncLoadCallback } from "types";
    export const _asyncLoad: never[];
    export function asyncLoad(callback: TAsyncLoadCallback, args?: any[]): any;
    export const _fireAsyncLoad: () => void;
}
declare module "ComplexStorageCache" {
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
declare module "serviceLoader" {
    import { IService } from "types";
    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param service a Service object
     */
    export const serviceLoader: (service: IService, _async?: boolean) => Promise<unknown> | undefined;
}
declare module "tag_filter" {
    export const _tag_filter_ = "quick-component:not([loaded]),component:not([loaded])";
}
declare module "componentLoader" {
    import { IComponent } from "types";
    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param component a Component object
     */
    export const componentLoader: (component: IComponent, _async: boolean) => Promise<any>;
}
declare module "Component" {
    import { InheritClass } from "InheritClass";
    import { IComponent, IController, IEffect, IProcessor, IQCObjectsElement, IQCObjectsShadowedElement, IView, TBody, TComponentDoneResponse, TComponentParams, TComponentRouting, TComponentRoutings } from "types";
    export class Component extends InheritClass implements IComponent {
        static shadowed: boolean | undefined;
        static cached: any;
        [key: string]: any;
        name: string;
        templateURI: string;
        url: string;
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
        routings: TComponentRoutings;
        routingPath: string;
        routingPaths: string[];
        _componentHelpers: any[];
        subcomponents: any[];
        splashScreenComponent?: IComponent;
        controller?: IController;
        routingController?: IController;
        view?: IView;
        effect?: IEffect;
        effectClass: string;
        method: string;
        cached?: boolean;
        __promise__?: Promise<any> | null;
        data: any;
        __namespace?: string;
        protected _parsedAssignmentText: string;
        protected __shadowRoot: any;
        protected _serviceClassName: string | null;
        enableServiceClass?: boolean | undefined;
        serviceInstance: any;
        serviceData: any;
        shadowed?: boolean;
        container: any;
        innerHTML: any;
        reload: any;
        static subcomponents: any;
        assignRoutingParams?: boolean;
        responseTo?: string | undefined;
        static responseTo?: string | undefined;
        constructor({ __parent__, templateURI, template, tplsource, tplextension, url, name, method, data, reload, shadowed, cached, enableServiceClass, assignRoutingParams, _body, __promise__, __shadowRoot, body, shadowRoot, splashScreenComponent, controller, view }: TComponentParams);
        set cacheIndex(value: string);
        get cacheIndex(): string;
        set parsedAssignmentText(value: string);
        get parsedAssignmentText(): string;
        set shadowRoot(value: IQCObjectsShadowedElement);
        get shadowRoot(): IQCObjectsShadowedElement;
        set routingSelected(value: TComponentRouting[]);
        get routingSelected(): TComponentRouting[];
        set routingParams(value: object);
        get routingParams(): object;
        set serviceClassName(_serviceClassName: string);
        get serviceClassName(): string | null;
        protected get responseToData(): boolean;
        protected get responseToTemplate(): boolean;
        createServiceInstance(): Promise<JSON | string | null>;
        _bindroute_(): void;
        done(standardResponse?: TComponentDoneResponse): Promise<TComponentDoneResponse>;
        createControllerInstance(): Promise<{
            component: IComponent;
            controller: IController;
        }>;
        createEffectInstance(): Promise<{
            component: Component;
            effect: IEffect;
        }>;
        createViewInstance(): Promise<{
            component: Component;
            view: IView;
        }>;
        __done__(): Promise<unknown>;
        hostElements(tagFilter: string): (IQCObjectsElement | HTMLElement | IQCObjectsShadowedElement)[];
        get subtags(): (HTMLElement | IQCObjectsElement | IQCObjectsShadowedElement)[];
        get bodyAttributes(): {
            [x: string]: string | null;
        };
        get dataAttributes(): {};
        __buildSubComponents__(rebuildObjects?: boolean): any;
        fail(standardResponse: {
            error: any;
            component: Component;
        }): Promise<{
            error: any;
            component: Component;
        }>;
        set(key: string, value: any): void;
        get(key: string, _defaultValue?: string): any;
        feedComponent(): Promise<any>;
        rebuild(): Promise<{
            request?: XMLHttpRequest;
            component: Component;
        }>;
        Cast(oClass: any): any;
        route(): Promise<void>;
        static route(): Promise<void>;
        fullscreen(): void;
        closefullscreen(): void;
        _generateRoutingPaths(componentBody: TBody): Promise<void>;
        parseTemplate(template: any): string;
        _reroute_(): Promise<Component>;
        lazyLoadImages(): null;
        applyTransitionEffect(effectClassName: string): void;
        applyObserveTransitionEffect(effectClassName: any): void;
        get componentRoot(): TBody;
        scrollIntoHash(): void;
        i18n_translate(): void;
        addComponentHelper(componentHelper: any): void;
        runComponentHelpers(): void;
    }
}
declare module "ComponentFactory" {
    import { TComponentURIParams } from "types";
    import { Component } from "Component";
    /**
     * Returns a standarized uri for a component
     * @example
     * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
     * @author: Jean Machuca <correojean@gmail.com>
     * @param params an object with the params to build the uri path
     */
    export const ComponentURI: ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }: TComponentURIParams) => string;
    export const _buildComponentFromElement_: (element: Element, __parent__: any) => Component;
    export const _buildComponentsFromElements_: (elements: HTMLElement[], __parent__: Component | null) => Component[];
    export const buildComponents: (element: HTMLElement) => Component[];
}
declare module "Service" {
    import { InheritClass } from "InheritClass";
    import { IJSONService, IService, TServiceDoneResponse, TServiceStandardResponse } from "types";
    export class Service extends InheritClass implements IService {
        options: object;
        withCredentials: boolean;
        useHTTP2: any;
        mockup({ request, service }: TServiceStandardResponse): void;
        name: string;
        responseHeaders: any;
        local({ request, service }: TServiceStandardResponse): void;
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
        done({ request, service }: TServiceDoneResponse): void;
        fail(...args: any[]): void;
        set(name: string, value: never): void;
        get(name: string, _default?: never): never;
    }
    export class JSONService extends Service implements IJSONService {
        method: string;
        cached: boolean;
        headers: {
            "Content-Type": string;
            charset: string;
        };
        JSONresponse?: JSON;
        done(result: TServiceDoneResponse): void;
    }
    export class ConfigService extends JSONService {
        method: string;
        cached: boolean;
        configFileName: string;
        headers: {
            "Content-Type": string;
            charset: string;
        };
        configLoaded(): Promise<void>;
        JSONresponse?: JSON;
        done(result: TServiceDoneResponse): void;
        fail(): void;
        constructor();
    }
}
declare module "globalSettings" {
    import { IGlobalSettings } from "types";
    import { InheritClass } from "InheritClass";
    import { Logger } from "Logger";
    export class GlobalSettings extends InheritClass implements IGlobalSettings {
        static __start__(): Promise<any>;
        [key: string]: any;
        _GLOBAL: any;
        private static _instance;
        static get instance(): GlobalSettings;
        protected _logger: Logger;
        get logger(): Logger;
        set logger(value: Logger);
        set(name: string, value: any): void;
        get(name: string, _default?: any): any;
        __start__(): Promise<any>;
    }
}
declare module "top" {
    import { IComplexStorageCache, IComponent, IConfigService } from "types";
    type QCObjects = {
        lastCache?: IComplexStorageCache;
        componentsStack: IComponent[];
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
        set: (name: string, value: any) => void;
        get: (name: string, _default?: any) => any;
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
        _sdk_: any;
        ClassesList: any[];
        PackagesList: any[];
        PackagesNameList: any[];
        ClassesNameList: any[];
    } & typeof self & typeof global;
    export var _top: QCObjects;
    export let componentsStack: IComponent[];
    export const resetTop: () => void;
    export const buildComponentsStack: () => void;
    export let configService: IConfigService;
    export const setConfigService: (_configService: IConfigService) => void;
    export const set: (name: string, value: any) => void;
    export const get: (name: string, _defaultValue?: any) => any;
}
declare module "make_global" {
    export const __make_global__: (f: any) => void;
}
declare module "Export" {
    export const Export: (f: any) => void;
}
declare module "Logger" {
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
declare module "mathFunctions" {
    export const __to_number: (value: any) => number;
}
declare module "ArrayCollection" {
    import { IArrayCollection, IArrayList } from "types";
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
declare module "BackendMicroservice" {
    import { Http2Stream } from "http2";
    import { Stream } from "stream";
    import { InheritClass } from "InheritClass";
    export class BackendMicroservice extends InheritClass {
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
declare module "Controller" {
    import { IController, IComponent, TControllerParams } from "types";
    import { InheritClass } from "InheritClass";
    export class Controller extends InheritClass implements IController {
        component: IComponent;
        dependencies?: any[];
        constructor({ component, dependencies }: TControllerParams);
        fail?(...args: [...args: any[]]): void;
        routingSelectedAttr(attrName: string): any;
        isTouchable(): boolean;
        onpress(subelementSelector: string, handler: Function): void;
        createRoutingController(): void;
        done(): void;
    }
}
declare module "DDO" {
    import { TDDOParams } from "types";
    import { InheritClass } from "InheritClass";
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
    export class DDO extends InheritClass {
        constructor({ instance, name, fget, fset, value }: TDDOParams);
        _new_({ instance, name, fget, fset }: TDDOParams): void;
    }
}
declare module "DefaultTemplateHandler" {
    import { DefaultTemplateHandlerParams } from "types";
    export class DefaultTemplateHandler {
        template: string;
        __definition: {};
        static __definition: {};
        component: import("types").IComponent;
        constructor({ component, template }: DefaultTemplateHandlerParams);
        assign(data: any): string;
    }
}
declare module "DocumentLayout" {
    export const getDocumentLayout: () => string | undefined;
}
declare module "Effect" {
    import { IEffect, TEffectParams } from "types";
    import { InheritClass } from "InheritClass";
    export class Effect extends InheritClass implements IEffect {
        done(...args: any[]): any;
        apply(...args: any[]): void;
        duration: number;
        animate({ timing, draw, duration }: TEffectParams): void;
    }
}
declare module "findPackageNodePath" {
    export const findPackageNodePath: (packagename: string) => string | null;
}
declare module "Import" {
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
declare module "captureFalseTouch" {
    export let supportsPassive: boolean;
    export const captureFalseTouch: () => false | {
        passive: boolean;
    };
}
declare module "range" {
    export const range: (start: number, stop?: number, step?: number) => number[];
}
declare module "defaultProcessors" {
    export const setDefaultProcessors: () => void;
}
declare module "NamespaceRef" {
    /**
     * Declare Namespace
     *
     * @param {String} packageName
     * @param {Object} package
     */
    export const NamespaceRef: (namespace: string) => any;
}
declare module "Ready" {
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
declare module "Tag" {
    import { ITagElements } from "types";
    import { ArrayList } from "ArrayCollection";
    export class TagElements extends ArrayList implements ITagElements {
        show(): void;
        hide(): void;
        effect<T>(...args: T[]): void;
        findElements(elementName: any): any;
    }
    /**
     * Gets the element of DOM found by tag name
     *
     * @param {Object} tagname
     * @param {Object} innerHTML
     */
    export const Tag: <T>(tagname: string, innerHTML?: string) => T[];
}
declare module "shortCode" {
    export const shortCode: () => string;
}
declare module "super" {
    /**
     * Returns a method from a superior QCObjects Class
     * It is useful for Class Inheritance in the _new_ and __new__ method constructors
     * @example _super_('MySuperClass','MySuperMethod').call(this,params) #where this is the current instance and params are method parameters
     *
     * @param {String} className
     * @param {String} classMethodName
     * @param {Object} params
     */
    export const _super_: <T>(className: string, classMethodName: string) => T;
}
declare module "waitUntil" {
    export const waitUntil: (func: () => void, exp: () => any) => void;
}
declare module "subelements" {
    export const subelements: <T>(this: any, query: string) => T[];
}
declare module "loadSDK" {
    function loadSDK(): void;
    export default loadSDK;
}
declare module "MainProcess" { }
declare module "assign" { }
declare module "SourceJS" {
    import { ISourceJS } from "types";
    import { InheritClass } from "InheritClass";
    export class SourceJS extends InheritClass implements ISourceJS {
        domain: string;
        basePath: string;
        type: string;
        containerTag: string;
        url: string;
        data: {};
        async: boolean;
        external: boolean;
        constructor(o: any);
        set(name: string, value: any): void;
        get(name: string, _default?: any): any;
        status: boolean;
        done(): void;
        fail(): void;
        rebuild(): void;
        Cast(o: any): any;
        _new_(properties: any): void;
    }
}
declare module "SourceCSS" {
    import { ISourceCSS } from "types";
    import { InheritClass } from "InheritClass";
    export class SourceCSS extends InheritClass implements ISourceCSS {
        domain: string;
        basePath: string;
        url: string;
        data: {};
        async: boolean;
        external: boolean;
        constructor(o: any);
        fail(): void;
        Cast(o: any): any;
        set(name: string, value: any): void;
        get(name: string, _default?: any): any;
        done(): void;
        rebuild(): void;
    }
}
declare module "WidgetsFactory" {
    export let _ComponentWidget_: CustomElementConstructor;
    export const RegisterWidget: (widgetName: string) => void;
    export const RegisterWidgets: (...args: string[]) => void;
}
declare module "View" {
    import { InheritClass } from "InheritClass";
    export class View extends InheritClass {
        constructor({ component, dependencies }: {
            component?: undefined;
            dependencies?: never[] | undefined;
        });
    }
}
declare module "VO" {
    import { InheritClass } from "InheritClass";
    export class VO extends InheritClass {
    }
}
declare module "TransitionEffect" {
    import { Effect } from "Effect";
    import { IComponent, ITransitionEffect, TTransitionEffectParams } from "types";
    export class TransitionEffect extends Effect implements ITransitionEffect {
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
        component: IComponent;
        effects: string[];
        apply({ alphaFrom, alphaTo, angleFrom, angleTo, radiusFrom, radiusTo, scaleFrom, scaleTo }: TTransitionEffectParams): void;
    }
}
declare module "Timer" {
    import { ITimer, TTimerParams } from "types";
    import { InheritClass } from "InheritClass";
    export class Timer extends InheritClass implements ITimer {
        duration: number;
        alive: boolean;
        thread({ timing, intervalInterceptor, duration }: TTimerParams): void;
    }
}
declare module "Toggle" {
    import { InheritClass } from "InheritClass";
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
declare module "QCObjects" {
    export * as AssignPolyfill from "assign";
    export { _top, resetTop } from "top";
    export { _QC_CLASSES, _QC_PACKAGES, _QC_PACKAGES_IMPORTED, _QC_READY_LISTENERS } from "PrimaryCollections";
    export { _DataStringify } from "DataStringify";
    export { _DOMCreateElement } from "DOMCreateElement";
    export { _methods_, _protected_code_ } from "introspection";
    export { logger, Logger } from "Logger";
    export { _require_, is_phonegap, isBrowser, isNodeCommonJS } from "platform";
    export { subelements } from "subelements";
    export { __is_raw_class__ } from "is_raw_class";
    export { _LegacyCopy } from "LegacyCopy";
    export { _fireAsyncLoad, asyncLoad } from "asyncLoad";
    export { __instanceID } from "IncrementInstanceID";
    export { ObjectName } from "ObjectName";
    export { __getType__ } from "getType";
    export { is_a } from "is_a";
    export { ComplexStorageCache } from "ComplexStorageCache";
    export { waitUntil } from "waitUntil";
    export { _Cast, _CastProps } from "Cast";
    export { isQCObjects_Class, isQCObjects_Object } from "isQCObjects";
    export { Package } from "Package";
    export { ClassFactory } from "ClassFactory";
    export { Export } from "Export";
    export { Class } from "Class";
    export { InheritClass } from "InheritClass";
    export { _super_ } from "super";
    export { shortCode } from "shortCode";
    export { Processor } from "Processor";
    export { New } from "New";
    export { _Ready, ready, Ready } from "Ready";
    export { captureFalseTouch } from "captureFalseTouch";
    export { serviceLoader } from "serviceLoader";
    export { componentLoader } from "componentLoader";
    export { _buildComponentsFromElements_, ComponentURI } from "ComponentFactory";
    export { NamespaceRef } from "NamespaceRef";
    export { setDefaultProcessors } from "defaultProcessors";
    export { Tag, TagElements } from "Tag";
    export { Import } from "Import";
    export { BackendMicroservice } from "BackendMicroservice";
    export { Component } from "Component";
    export { _Crypt } from "Crypt";
    export { DefaultTemplateHandler } from "DefaultTemplateHandler";
    export { SourceJS } from "SourceJS";
    export { SourceCSS } from "SourceCSS";
    export { GlobalSettings } from "globalSettings";
    export { RegisterClass } from "RegisterClass";
    export { _ComponentWidget_, RegisterWidget, RegisterWidgets } from "WidgetsFactory";
    export { CONFIG } from "CONFIG";
    export { Controller } from "Controller";
    export { View } from "View";
    export { ConfigService, JSONService, Service } from "Service";
    export { VO } from "VO";
    export { Effect } from "Effect";
    export { TransitionEffect } from "TransitionEffect";
    export { Timer } from "Timer";
    export { _tag_filter_ } from "tag_filter";
    export { range } from "range";
    export { ArrayCollection, ArrayList } from "ArrayCollection";
    export { DDO } from "DDO";
    export { Toggle } from "Toggle";
    export { findPackageNodePath } from "findPackageNodePath";
    export { getDocumentLayout } from "DocumentLayout";
    export { IQCObjectsElement, IQCObjectsShadowedElement } from "types";
    export { __to_number } from "mathFunctions";
    export { _top as global } from "top";
    export { __make_global__ } from "make_global";
    export { get, set } from "top";
    export * as QCObjects from "MainProcess";
}
declare module "index" {
    import * as QCObjects from "QCObjects";
    export default QCObjects;
}
declare module "localStorage" {
    export var localStorage: any;
}
declare module "uniqueID" {
    export const uniqueId: () => string;
}

export {};