/* eslint-disable @typescript-eslint/no-misused-new */
/* eslint-disable no-unused-vars */
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

    new(microservice: IMicroservice): IBackendMicroservice;

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
export type TClass = 
| (( className?:string,   extendsFrom?:unknown,   definition?:unknown) => unknown )
| (( className?:string,  extendsFrom?:unknown ) => unknown)
| (( className?:string, definition?:unknown ) => unknown )
| (() => unknown );

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
    encrypt(_string_: string, key: string): string; // static
    decrypt(_string_: string, key: string): string; // static
}

export interface ITagElements extends Array<any> {
    show(): void;
    hide(): void;
    effect(): void;
    findElements(elementName: string): ITagElements;
}

export type DefaultTemplateHandlerParams = { component: IComponent, template: string };

export interface IDefaultTemplateHandler {
    template: string;
    __definition: any;
    new({ component, template }: DefaultTemplateHandlerParams): IDefaultTemplateHandler;
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
    __start__(): Promise<any>; //static
}
export type IGLOBAL = IGlobalSettings;
export type DDOParams = {
    instance: any,
    name: string,
    fget: Function,
    fset: Function,
    value: any
};
export interface IDDO {
    new({
        instance,
        name,
        fget,
        fset,
        value
    }: DDOParams): IDDO;
}
export type CacheController = {
    cache: IComplexStorageCache;
    cachedObjectID: string;
    cachedResponse?: any;
}
export type ComplexCacheParams = {
    index: string;
    load(cacheController?: CacheController): any;
    alternate(cacheController?: CacheController): any;
}
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

    new(cache: ComplexCacheParams): IComplexStorageCache;

}

export type ComponentURIParams = { COMPONENTS_BASE_PATH: string, COMPONENT_NAME: string, TPLEXTENSION: string, TPL_SOURCE: string };
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
    new(o?: any): IInheritClass;
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
    new(...args: any[]): IProcessor;

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
    createControllerInstance(): Promise<{ component: IComponent, controller: IController }>;
    createEffectInstance(): Promise<{ component: IComponent, effect: IEffect }>;
    createViewInstance(): Promise<{ component: IComponent, view: IView }>;
    done(standardResponse: ComponentDoneResponse): Promise<ComponentDoneResponse>;
    fail({ error, component }: { error: any, component: IComponent }): Promise<{ error: any; component: any; }>;
    hostElements(tagFilter: string): (IQCObjectsElement | HTMLElement | IQCObjectsShadowedElement)[];
    set(name: string, value: any): void;
    get(name: string): any;
    feedComponent(): void;
    rebuild(): Promise<{ request?: XMLHttpRequest, component: IComponent }>;
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
    component?: IComponent ;
};
export type ComponentRouting = {
    path: string, name: string, tplextension?: string
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
    new(controller: ControllerParams): IController;
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
    new(view: ViewParams): IView;
    done(...args: any[]): void;
    fail(...args: any[]): void;
}
export type TAsyncLoadCallback = 
  | ((component: IComponent, _async?: any) => Promise<any>)
  | ((service: IService, _async?: any) => Promise<unknown>)
  | ((_async?: any) => any);
export type ServiceDoneResponse = { request: XMLHttpRequest | null, service: IService };
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
    alphaFrom?: number,
    alphaTo?: number,
    angleFrom?: number,
    angleTo?: number,
    radiusFrom?: number,
    radiusTo?: number,
    scaleFrom?: number,
    scaleTo?: number
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

    new (positive: Function, negative: Function, args: Array<any>):IToggle;

}

export let logger: ILogger;
export let _sdk_: Promise<any>;
export var global: typeof globalThis | IGLOBAL;

export type ClassFactory = (className: string) => any;
export type Package = (packageName: string, classesList?: Array<any> ) => Array<any> | undefined;
export type Import = (packageName: string, ready?: Function, external?: boolean) => any;

export declare const cordova: any;

export interface Array<T> {
    length: any;
    prototype: any;
    unique(): T[];
    table(): T[];
    sum(): T[];
    avg(): T[];
    min(): T[];
    max(): T[];
    sortBy(propName: string, sortAsc?: boolean): T[];
    matrix(length: number, fillValue?: number): T[];
    matrix2d(length: number, fillValue?: number): T[][];
    matrix3d(length: number, fillValue?: number): T[][][];
}

export interface ArrayConstructor {
    unique<T>(a: Array<T>): T[];
    table<T>(a: Array<T>): T[];
    sum<T>(a: Array<T>): T[];
    avg<T>(a: Array<T>): T[];
    min<T>(a: Array<T>): T[];
    max<T>(a: Array<T>): T[];
    sortBy<T>(a: Array<T>, propName: string, sortAsc?: boolean): T[];
    matrix<T>(a: Array<T>, length: number, fillValue?: number): T[];
    matrix2d<T>(a: Array<T>, length: number, fillValue?: number): T[][];
    matrix3d<T>(a: Array<T>, length: number, fillValue?: number): T[][][];

}

export interface String {
    prototype: any;
    list(): string[];
}

export declare const componentsStack: IComponent[];
export declare const lastCache: IComplexStorageCache | undefined;


