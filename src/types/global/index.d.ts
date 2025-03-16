/* eslint-disable @typescript-eslint/no-misused-new */
 
import { ClientRequest } from "http";
import { Http2SecureServer, Http2Server, Http2ServerRequest, Http2Stream } from "http2";
import { Stream } from "stream";

export interface IMicroservice {
    domain: string;
    basePath: string;
    body: any;
    stream?: Http2Stream | Stream|null;
    request?: Http2ServerRequest | ClientRequest|null;
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

export interface IQCObjectsElement extends HTMLElement {
    prototype: any;
    enableServiceClass?: boolean;
    style:CSSStyleDeclaration;
    Cast<T>(_o: T): T;
    render(content: string): void;
    find(tag: string): (HTMLElement | IQCObjectsElement)[];
    buildComponents(rebuildObjects?: boolean): any[];
    subelements(query: string): (HTMLElement | IQCObjectsElement)[];
    subelements(query: string): Array<any>;
    append(_child?: any):void;
}

export interface IQCObjectsShadowedElement extends ShadowRoot{
    prototype: any;
    style?: any;
    render(content: string): void;
    find(tag: string): (HTMLElement | IQCObjectsElement)[];
    buildComponents(rebuildObjects?: boolean): any[];
    subelements(query: string): (ShadowRoot | HTMLElement | IQCObjectsShadowedElement | IQCObjectsElement)[];
    subelements(query: string): any[];
    append: (...nodes: (string | Node)[]) => void;
    innerHTML:string;
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
| (( className?:string,   extendsFrom?:unknown,   definition?:unknown) => IInheritClass )
| (( className?:string,  extendsFrom?:unknown ) => IInheritClass)
| (( className?:string, definition?:unknown ) => IInheritClass )
| (() => IInheritClass );

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
export type TDDOParams = {
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
    }: TDDOParams): IDDO;
}
export type TCacheController = {
    cache: IComplexStorageCache;
    cachedObjectID: string;
    cachedResponse?: any;
}
export type TComplexCacheParams = {
    index: string;
    load(cacheController?: TCacheController): any;
    alternate(cacheController?: TCacheController): any;
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

    new(cache: TComplexCacheParams): IComplexStorageCache;

}
export type I_ComponentWidget_ = HTMLElement;


export type TComponentURIParams = { COMPONENTS_BASE_PATH: string, COMPONENT_NAME: string, TPLEXTENSION: string, TPL_SOURCE: string };

export type TasyncLoad = (callback: Function, args: Array<any>) => any;
export type TRegisterClass = (_class_: any, namespace: string) => void;
export type TComponentURI = ({ COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION, TPL_SOURCE }: TComponentURIParams) => string;
export type TwaitUntil = (func: Function, exp: Function) => void;
export type T_super_ = (className: string, classMethodName: string, params?: Array<any>) => any;
export type T_DOMCreateElement = (elementName: string) => IQCObjectsElement | HTMLElement;
export type TshortCode = () => string;
export type T__getType__ = (_class_: any) => string;
export type Tis_a = (obj: any, typeName: string) => boolean;
export type T_DataStringify = (data: any) => string;
export type TserviceLoader = (service: IService, _async: boolean) => Promise<any>;
export type TcomponentLoader = (component: IComponent, _async: boolean) => Promise<any>;
export type TObjectName = (o: any) => string;
export type TisQCObjects_Class = (_: any) => boolean;
export type TisQCObjects_Object = (_: any) => boolean;
export type TNamespaceRef = (namespace: string) => any;
export type TRegisterWidget = (widgetName: string) => void;
export type TRegisterWidgets = (...widgetList: string[]) => void;
export type Trange = (start: number, stop: number, step: number) => Array<any>;
export type TgetDocumentLayout = () => string;
export type TExport = (fn: Function) => Function;
export type TNew = (__class__: any, args: any) => any;
export type TTag = (tagName: string, innerHTML?: string) => ITagElements;
export type TReady = (e: Function) => void;
export type T_methods_ = (_: any) => Array<any>;
export type Tset = (_: any, _value_: any) => any;
export type Tget = (_: any, _defaultValue_: any) => any;
export type T__start__ = () => void;

export type TBody = IQCObjectsElement | IQCObjectsShadowedElement | HTMLElement | string | null | undefined | object;

export interface IInheritClass {
    [key: string]: any;
    __instanceID: number;
    __classType?: string;
    __definition?: any;
    __new__?(o?:any): void;
    _new_(_o_?: any):void;
    getParentClass():any;
    getClass():any;
    css(_css: any): any ;
    hierarchy(): any;
    append(_child?: any):any;
    attachIn(tag: any):any;
    __namespace?: string;
    body?: TBody;
}

export interface IProcessor extends IInheritClass {
    component: IComponent|null;
    processors: any;
    process(template: string, component: IComponent | null): any;
    processObject(obj: any, component?: IComponent): any;
    setProcessor(proc: Function): any;
    execute (component:IComponent, processorName:string, args:string):any;
}

export type TComponentParams = {
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
    enableServiceClass?:boolean| undefined;
    assignRoutingParams?:boolean;
    _body?: IQCObjectsElement;
    __promise__?: Promise<any> | null;
    __shadowRoot?: IQCObjectsShadowedElement;
    body?: IQCObjectsElement;
    shadowRoot?: IQCObjectsShadowedElement;
    splashScreenComponent?: IComponent;
    controller?: IController;
    view?: IView;
};


export interface IComponent extends IInheritClass{
    url: string;
    cached?: boolean;
    name: string;
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
    routings: TComponentRoutings;
    routingPath: string;
    routingPaths: string[];
    _componentHelpers: any[];
    subcomponents: IComponent[];
    splashScreenComponent?: IComponent;
    controller?: IController | undefined;
    routingController?: IController | undefined;

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
    serviceInstance:IService;
    innerHTML:string;
    reload:boolean;
    assignRoutingParams?:boolean;
    routingSelected: TComponentRouting[];
    routingParams: object;
    subtags: (HTMLElement | IQCObjectsElement | IQCObjectsShadowedElement)[];
    bodyAttributes: any;
    dataAttributes: any;
    serviceData?: any;
    container?: any;
    serviceClassName?:string|null;
    enableServiceClass?:boolean;
    componentRoot?:TBody;
    route():Promise<void>;
    responseTo?:string;
    __done__(): Promise<unknown>;
    _bindroute_(): void;
    __buildSubComponents__(rebuildObjects: boolean): IComponent[];
    _generateRoutingPaths(componentBody: IQCObjectsElement | HTMLElement): Promise<void>;
    _reroute_(): Promise<IComponent>;
    route():void;
    createServiceInstance(): Promise<JSON | string | null>;
    createControllerInstance(): Promise<{ component: IComponent, controller: IController }>;
    createEffectInstance(): Promise<{ component: IComponent, effect: IEffect }>;
    createViewInstance(): Promise<{ component: IComponent, view: IView }>;
    done(standardResponse: TComponentDoneResponse): Promise<TComponentDoneResponse>;
    fail({ error, component }: { error: any, component: IComponent }): Promise<{ error: any; component: any; }>;
    hostElements(tagFilter: string): (IQCObjectsElement | HTMLElement | IQCObjectsShadowedElement)[];
    set(name: string, value: any): void;
    get(name: string): any;
    feedComponent(): Promise<any>;
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


export type TComponentDoneResponse = {
    request?: XMLHttpRequest | undefined;
    component?: IComponent ;
};
export type TComponentRouting = {
    path: string, name: string, tplextension?: string
};
export type TComponentRoutings = TComponentRouting[];

export interface ICONFIG extends IInheritClass {
    _CONFIG_ENC: string;
    _CONFIG: unknown;
    set(_: string, _value_: unknown): any;
    get(_: string, _defaultValue_?: unknown): any;
    __definition: any;
}

export interface ICONFIG extends IInheritClass {
    _CONFIG_ENC: string;
    _CONFIG: unknown;
    set(_: any, _value_: any): any;
    get(_: any, _defaultValue_: any): any;
    __definition: any;
}

export type TControllerParams = {
    component: IComponent;
    dependencies?: any[];
};

export interface IController extends IInheritClass{
    component: IComponent ;
    dependencies?: any[];
    routingSelectedAttr(attrName: string): any;
    isTouchable(): boolean;
    onpress(subelementSelector: string, handler: EventListener): void;
    createRoutingController(): void;
    done(...args: any[]): void;
    fail?(...args: any[]): void;
}

export type TViewParams = {
    component?: IComponent;
    dependencies: any[];
};

export interface IView {
    __classType: string;
    __definition: any;
    __new__(): any;
    __namespace: string;
    body: IQCObjectsElement | HTMLElement;
    component: IComponent;
    new(view: TViewParams): IView;
    done(...args: any[]): void;
    fail(...args: any[]): void;
}
export type TAsyncLoadCallback = 
  | ((component: IComponent, _async?: any) => Promise<any>)
  | ((service: IService, _async?: any) => Promise<unknown>)
  | ((_async?: any) => any);
export type TServiceDoneResponse = { request: XMLHttpRequest | null, service: IService };
export type TServiceStandardResponse = {
    request: XMLHttpRequest | null,
    service: IService,
    responseHeaders:any[]
};
export interface IService extends IInheritClass {
    withCredentials: boolean;
    useHTTP2: any;
    options: object;
    name:string;
    kind: string;
    domain: string;
    basePath: string;
    url: string;
    method: string;
    data: any;
    reload: boolean;
    cached: boolean;
    headers: any;
    responseHeaders:any;
    local({request, service}:TServiceStandardResponse):void;
    mockup({request, service}:TServiceStandardResponse):void;
    template: unknown;
    set(name: string, value: any): void;
    get(name: string): any;
    done({ request, service }: TServiceDoneResponse): void;
    fail(...args: any[]): void;
}
export interface IJSONService extends IService {
    JSONresponse?: JSON;
}
export interface IConfigService extends IJSONService {
    configFileName: string;
    configLoaded():Promise<void>;
}
export type TIVO = object;
export type TEffectParams = {
    duration: number;
    timing: (timeFraction: number)=> number;
    draw: (progress: number)=> void;
};

export interface IEffect extends IInheritClass {
    duration: number;
    apply(...args: any[]): any;
    done?(...args: any[]): any;
    animate(effect: TEffectParams): void;
}

export type TTransitionEffectParams = {
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
    defaultParams: TTransitionEffectParams;
    duration: number;
    fitToHeight: boolean;
    fitToWidth: boolean;
    effects: string[];

}
export type TTimerParams = {
    duration: number;
    timing:(timeFraction: number, elapsed?: number)=> number;
    intervalInterceptor:(progress: number)=> void;
};

export interface ITimer extends IInheritClass {
    duration: number;
    alive: boolean;
    thread(timer: TTimerParams): void;
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

export type TClassFactory = (className: string) => any;
export type TPackage = (packageName: string, classesList?: Array<any> ) => Array<any> | undefined;
export type TImport = (packageName: string, ready?: Function, external?: boolean) => any;

export type T_QC_PACKAGES = { [key: string]: any };
export type T_QC_CLASSES = { [key: string]: any };

export declare const cordova: any;

export declare interface Array<T> {
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

export declare interface ArrayConstructor {
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

export declare const componentsStack: IComponent[];
export declare const lastCache: IComplexStorageCache | undefined;

