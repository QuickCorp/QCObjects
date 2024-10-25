import { ClientRequest } from "http";
import { Http2SecureServer, Http2Server, Http2ServerRequest, Http2Stream } from "http2";
import { Stream } from "stream";

declare class Microservice {
    domain: string;
    basePath: string;
    body: any;
    stream?: Http2Stream | Stream;
    request?: Http2ServerRequest | ClientRequest;
}

declare class Route {
    name: string;
    description?: string;
    path: string;
    microservice: string;
    redirect_to?: string;
    headers?: any;
    responseHeaders?: any;
    cors?: any;
}

declare class BackendMicroservice extends InheritClass {
    domain: string;
    body: QCObjectsElement | QCObjectsShadowedElement | HTMLElement | string | undefined;
    basePath: string;
    route: Route;
    projectPath?: string;
    stream?: Http2Stream | Stream;
    request?: Http2ServerRequest | ClientRequest;
    routeParams?: any;
    server: Http2SecureServer | Http2Server;

    constructor(microservice: Microservice);

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

declare class QCObjectsElement extends Element{
    enableServiceClass?:boolean;
    Cast(_o:any):any;
    render(content:string):void;
    find(tag: string): (HTMLElement | QCObjectsElement)[];
    buildComponents(rebuildObjects?:boolean):any[];
    subelements(query: string): (HTMLElement | QCObjectsElement)[];
    subelements(query: string): Array<any>;
}
declare class QCObjectsShadowedElement extends ShadowRoot {
    style: any;
    render(content:string):void;
    find(tag: string): (HTMLElement | QCObjectsElement)[];
    buildComponents(rebuildObjects?:boolean):any[];
    subelements(query: string): (ShadowRoot | HTMLElement | QCObjectsShadowedElement | QCObjectsElement)[];
    subelements(query: string): any[];
}

declare class Logger {
    debugEnabled: boolean;
    infoEnabled: boolean;
    warnEnabled: boolean;
    debug(message: any): string;
    warn(message: any): string;
    info(message: any): string;

}
declare function Class(className: string, extendsFrom: any, definition: any): any;
declare class _Crypt {
    last_string: string;
    last_key: string;
    construct: boolean;
    _new_(o: any): void;
    _encrypt(): string;
    _decrypt(): string;
    static encrypt(_string_: string, key: string): string;
    static decrypt(_string_: string, key: string): string;

}
declare class TagElements extends Array {
    show(): void;
    hide(): void;
    effect(): void;
    findElements(elementName: string): TagElements;
}
declare class DefaultTemplateHandler {
    template: string;
    __definition: any;
    constructor({ component, template }:{component:Component, template:string});
    assign(data: any): any;
}
declare class SourceJS {
    domain: string;
    basePath: string;
    body: QCObjectsElement | HTMLElement;
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
declare class SourceCSS {
    domain: string;
    basePath: string;
    body: QCObjectsElement | HTMLElement;
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
declare class ArrayList extends Array { }
declare class ArrayCollection {
    source: ArrayList;
    changed(prop: string, value: any): any;
    push(value: any): void;
    pop(value: any): void;
    _new_(source: ArrayList): void;
}
declare class GlobalSettings {
    _GLOBAL: any;
    set(name: string, value: any): void;
    get(name: string, _default: any): any;
    static __start__(): Promise<any>;
}
declare class GLOBAL extends GlobalSettings { }
declare type DDOParams = {
    instance:any,
    name: string,
    fget:Function,
    fset:Function,
    value: any
};
declare class DDO {
    constructor({
        instance,
        name: string,
        fget,
        fset,
        value: any
    }:DDOParams);
}
declare type CacheController = {
    cache:ComplexStorageCache;
    cachedObjectID:string;
    cachedResponse?:any;
}
declare type ComplexCacheParams = {
    index:string;
    load (cacheController?:CacheController):any;
    alternate(cacheController?:CacheController):any;
}
declare class ComplexStorageCache {
    object: any;
    index: string;
    load(cacheController: ComplexStorageCache): void;
    alternate(cacheController: ComplexStorageCache): void;
    clear(): void;
    getCached(object: any): any;
    getID(object: any): any;
    getItem(cachedObjectID: string): JSON | null;
    setItem(cachedObjectID: string, value: any): void;
    isEmpty(object: any): boolean;
    save(object: any, cachedNewResponse: string): void;

    constructor(cache:ComplexCacheParams);

}

declare type ComponentURIParams = { COMPONENTS_BASE_PATH:string, COMPONENT_NAME:string, TPLEXTENSION:string, TPL_SOURCE:string };
declare class _ComponentWidget_ extends HTMLElement { }

declare function asyncLoad(callback: Function, args: Array<any>): any;
declare function RegisterClass(_class_: any, namespace: string): void;
declare function ComponentURI ({ COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION, TPL_SOURCE }:ComponentURIParams):string;
declare function waitUntil(func: Function, exp: Function): void;
declare function _super_(className: string, classMethodName: string, params?: Array<any>): any;
declare function _DOMCreateElement(elementName: string): QCObjectsElement | HTMLElement;
declare function shortCode(): string;
declare function __getType__(_class_: any): string;
declare function is_a(obj: any, typeName: string): boolean;
declare function _DataStringify(data: any): string;
declare function serviceLoader(service: Service, _async: boolean): Promise<any>;
declare function componentLoader(component: Component, _async: boolean): Promise<any>;
declare function ObjectName(o: any): string;
declare function isQCObjects_Class(_: any): boolean;
declare function isQCObjects_Object(_: any): boolean;
declare function NamespaceRef(namespace: string): any;
declare function RegisterWidget(widgetName: string): void;
declare function RegisterWidgets(...widgetList:string[]): void;
declare function range(start: number, stop: number, step: number): Array<any>;
declare function getDocumentLayout(): string;
declare function Export(fn: Function): Function;
declare function New(__class__: any, args: any): any;
declare function Tag(tagName: string, innerHTML?: string): TagElements;
declare function Ready(e: Function): void;
declare function _methods_(_: any): Array<any>;
declare function set(_: any, _value_: any): any;
declare function get(_: any, _defaultValue_: any): any;
declare function __start__(): void;


declare interface IInheritClass {
    __instanceID: number;
    __classType?: string;
    __definition?: any;
    __new__?(): void;
    __namespace?: string;
    body?: QCObjectsElement | QCObjectsShadowedElement | HTMLElement | string | null | undefined;
}


declare class InheritClass implements IInheritClass{
    __instanceID: number;
    __classType?: string;
    __definition?: any;
    __new__?(): void;
    __namespace?: string;
    body?: QCObjectsElement | QCObjectsShadowedElement | HTMLElement | string | null | undefined;
    constructor(o?:any);
}

declare interface IProcessor extends IInheritClass{
    component: Component;
    processors: any;
    process(template: string, component: Component): any;
    processObject(obj: any, component: Component): any;
    setProcessor(proc: Function): any;
}


declare class Processor extends InheritClass implements IProcessor {
    component: Component;
    processors: any;
    process(template: string, component: Component): any;
    processObject(obj: any, component: Component): any;
    setProcessor(proc: Function): any;
    constructor(...args: any[]);

}

declare type ComponentParams = {
    __parent__?:Component;
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
    _body?: QCObjectsElement;
    __promise__?: Promise<any>|null;
    __shadowRoot?: QCObjectsShadowedElement;
    body?: QCObjectsElement;
    shadowRoot?: QCObjectsShadowedElement;
    splashScreenComponent?: Component;
    controller?: Controller;
    view?: View;
};


declare type ComponentDoneResponse = {
    request?: XMLHttpRequest|undefined;
    component?: Component|any;
};
declare type ComponentRouting = {
    path:string, name:string
};
declare type ComponentRoutings = ComponentRouting[];

declare interface IComponent {
    cached?:boolean;
    name: string;
    _body: QCObjectsElement | HTMLElement;
    body: QCObjectsElement | HTMLElement;
    templateURI: string;
    tplsource: string;
    tplextension: string;
    template: string;
    validRoutingWays: string[];
    basePath: string;
    domain: string;
    templateHandler: string;
    processorHandler?: Processor;
    routingWay: string|null;
    routingNodes:(QCObjectsElement | HTMLElement)[];
    routings: ComponentRoutings;
    routingPath: string;
    routingPaths: string[];
    _componentHelpers: any[];
    subcomponents: Component[];
    splashScreenComponent?: Component;
    controller?: Controller | undefined;
    view?: View | undefined;
    effect?: Effect;
    effectClass: string;
    method: string;
    __promise__?: Promise<any> | null | undefined;
    data: any;
    shadowed?: boolean;
    shadowRoot: QCObjectsShadowedElement;
    cacheIndex: string;
    parsedAssignmentText: string;
    routingSelected: Array<any>;
    routingParams: {};
    subtags: (HTMLElement | QCObjectsElement | QCObjectsShadowedElement)[];
    bodyAttributes: any;
    dataAttributes: any;
    serviceData?:any;
    container?: any;
    __done__(): Promise<unknown>;
    _bindroute_(): void;
    __buildSubComponents__(rebuildObjects: boolean): Component[];
    _generateRoutingPaths(componentBody: QCObjectsElement | HTMLElement): Promise<void>;
    _reroute_(): Promise<Component>;
    createServiceInstance(): Promise<JSON | string | null>;
    createControllerInstance(): Promise<{ component: Component, controller: Controller }>;
    createEffectInstance(): Promise<{ component: Component, effect: Effect }>;
    createViewInstance(): Promise<{ component: Component, view: View }>;
    done(standardResponse: ComponentDoneResponse): Promise<ComponentDoneResponse>;
    fail({error, component}:{ error: any, component: Component }):Promise<{ error: any; component: any; }>;
    hostElements(tagFilter: string): (QCObjectsElement | HTMLElement | QCObjectsShadowedElement)[];
    set(name: string, value: any): void;
    get(name: string): any;
    feedComponent(): void;
    rebuild(): Promise<{ request?: XMLHttpRequest, component: Component }>;
    Cast(oClass: any): any;
    fullscreen(): void;
    closefullscreen(): void;
    parseTemplate(template: string): string;
    lazyLoadImages(): any | null;
    applyTransitionEffect(effectClassName: string): void;
    applyObserveTransitionEffect(effectClassName: string): void ;
    scrollIntoHash(): void;
    i18n_translate(): void;
    addComponentHelper(componentHelper: Function): void;
    runComponentHelpers(): void;

}

declare class Component extends InheritClass implements IComponent {
    name: string;
    cached?:boolean;
    _body: QCObjectsElement | HTMLElement;
    body: QCObjectsElement | HTMLElement;
    templateURI: string;
    tplsource: string;
    tplextension: string;
    template: string;
    validRoutingWays: string[];
    basePath: string;
    domain: string;
    templateHandler: string;
    processorHandler?: Processor;
    routingWay: string|null;
    routingNodes:(QCObjectsElement | HTMLElement)[];
    routings: ComponentRoutings;
    routingPath: string;
    routingPaths: string[];
    _componentHelpers: any[];
    subcomponents: Component[];
    splashScreenComponent?: Component;
    controller?: Controller | undefined;
    view?: View | undefined;
    effect?: Effect;
    effectClass: string;
    method: string;
    static cached: boolean;
    __promise__?: Promise<any> | null | undefined;
    data: any;
    shadowed?: boolean;
    shadowRoot: QCObjectsShadowedElement;
    cacheIndex: string;
    parsedAssignmentText: string;
    routingSelected: Array<any>;
    routingParams: {};
    subtags: (HTMLElement | QCObjectsElement | QCObjectsShadowedElement)[];
    bodyAttributes: any;
    dataAttributes: any;
    serviceData?:any;
    container?: any;
    constructor(component: ComponentParams);
    static route(): Promise<Component[]>;
    __done__(): Promise<unknown>;
    _bindroute_(): void;
    __buildSubComponents__(rebuildObjects: boolean): Component[];
    _generateRoutingPaths(componentBody: QCObjectsElement | HTMLElement): Promise<void>;
    _reroute_(): Promise<Component>;
    createServiceInstance(): Promise<JSON | string | null>;
    createControllerInstance(): Promise<{ component: Component, controller: Controller }>;
    createEffectInstance(): Promise<{ component: Component, effect: Effect }>;
    createViewInstance(): Promise<{ component: Component, view: View }>;
    done(standardResponse: ComponentDoneResponse): Promise<ComponentDoneResponse>;
    fail({error, component}:{ error: any, component: Component }):Promise<{ error: any; component: any; }>;
    hostElements(tagFilter: string): (QCObjectsElement | HTMLElement | QCObjectsShadowedElement)[];
    set(name: string, value: any): void;
    get(name: string): any;
    feedComponent(): void;
    rebuild(): Promise<{ request?: XMLHttpRequest, component: Component }>;
    Cast(oClass: any): any;
    fullscreen(): void;
    closefullscreen(): void;
    parseTemplate(template: string): string;
    lazyLoadImages(): any | null;
    applyTransitionEffect(effectClassName: string): void;
    applyObserveTransitionEffect(effectClassName: string): void ;
    scrollIntoHash(): void;
    i18n_translate(): void;
    addComponentHelper(componentHelper: Function): void;
    runComponentHelpers(): void;

}

declare class CONFIG extends InheritClass {
    _CONFIG_ENC: string;
    _CONFIG: any;
    static set(_: any, _value_: any): any;
    static get(_: any, _defaultValue_: any): any;
    __definition: any;
}

declare type ControllerParams = {
    component: Component;
    dependencies: any[];
};

declare interface IController{
    body?: QCObjectsElement | HTMLElement;
    component: Component|null;
    dependencies?: any[];
    routingSelectedAttr(attrName: string): any;
    isTouchable(): boolean;
    onpress(subelementSelector: string, handler: EventListener): void;
    createRoutingController(): void;


    done(...args: any[]):void;
    fail?(...args: any[]):void;
}


declare class Controller extends InheritClass implements IController{
    body?: QCObjectsElement | HTMLElement;
    component: Component|null;
    dependencies?: any[];
    constructor(controller: ControllerParams);
    routingSelectedAttr(attrName: string): any;
    isTouchable(): boolean;
    onpress(subelementSelector: string, handler: EventListener): void;
    createRoutingController(): void;


    done(...args: any[]):void;
    fail?(...args: any[]):void;
}

declare type ViewParams = {
    component: Component;
    dependencies: Array<any>;
};

declare class View {
    __classType: string;
    __definition: any;
    __new__(): any;
    __namespace: string;
    body: QCObjectsElement | HTMLElement;
    component: Component;
    constructor(view: ViewParams);
    done(...args:any[]):void;
    fail(...args:any[]):void;
}

declare class Service extends InheritClass {
    kind: string;
    domain: string;
    basePath: string;
    url: string;
    method: string;
    data: any;
    reload: boolean;
    cached: boolean;
    headers: any;
    template: any;
    set(name: string, value: any): void;
    get(name: string): any;
    done({request, service}:{ request: XMLHttpRequest, service: Service }):void;
    fail(...args: any[]):void;
}
declare class JSONService extends Service {
    JSONresponse: JSON;
}
declare class ConfigService extends JSONService {
    configFileName: string;
}
declare class VO { }
declare type EffectParams = {
    duration:number; 
    timing(timeFraction:number):number;
    draw(progress:number):void;
};

declare class Effect extends InheritClass {
    duration: number;
    apply(...args: any[]): any;
    animate (effect:EffectParams):void;
}
declare class TransitionEffect extends Effect {
    component: Component;
    defaultParams: {
        alphaFrom?: number,
        alphaTo?: number,
        angleFrom?: number,
        angleTo?: number,
        radiusFrom?: number,
        radiusTo?: number,
        scaleFrom?: number,
        scaleTo?: number
    };
    duration: number;
    fitToHeight: boolean;
    fitToWidth: boolean;
    effects: Array<string>;

}
declare type TimerParams = {
    duration:number; 
    timing(timeFraction:number):number;
    intervalInterceptor(progress:number):void;
};

declare class Timer extends InheritClass {
    duration: number;
    alive: boolean;
    thread(timer:TimerParams):void;
}
declare class Toggle {
    _toggle: boolean;
    _inverse: boolean;
    _positive: Function;
    _negative: Function;
    _dispatched?: boolean;
    _args: Array<any>;

    constructor(positive: Function, negative: Function, args: Array<any>);

}

declare let logger: Logger;
declare let _sdk_: Promise<any>;
declare var global: typeof globalThis | GLOBAL;

declare function ClassFactory(className: string): any;
declare function Package(packageName: string, classesList?: Array<any> | undefined): Array<any> | undefined;
declare function Import(packageName: string, ready?: Function, external?: boolean): any;

declare const cordova: any;


interface Element extends QCObjectsElement {
  prototype: any;

}

interface HTMLElement extends QCObjectsElement {
    prototype: any;
  
  }
  

interface Document extends QCObjectsElement {
    prototype: any;
}

interface ShadowRoot extends QCObjectsShadowedElement {
    prototype: any;

}

interface Array<T> {
    length: any;
    prototype: any;
    unique(): T[];
    table():T[];
    sum():T[];
    avg():T[];
    min():T[];
    max():T[];
    sortBy(propName:string, sortAsc?:boolean):T[];
    matrix(length: number, fillValue?: number): T[];
    matrix2d(length: number, fillValue?: number): T[][];
    matrix3d(length: number, fillValue?: number): T[][][];
}

interface ArrayConstructor {
    unique<T>(a: Array<T>): T[];
    table<T>(a: Array<T>): T[];
    sum<T>(a: Array<T>): T[];
    avg<T>(a: Array<T>): T[];
    min<T>(a: Array<T>): T[];
    max<T>(a: Array<T>): T[];
    sortBy<T>(a: Array<T>, propName:string, sortAsc?:boolean):T[];
    matrix<T>(a: Array<T>, length: number, fillValue?: number): T[];
    matrix2d<T>(a: Array<T>, length: number, fillValue?: number): T[][];
    matrix3d<T>(a: Array<T>, length: number, fillValue?: number): T[][][];

}

interface String {
    prototype: any;
    list ():string[];
}

declare const componentsStack:Component[];
declare const lastCache:ComplexStorageCache|undefined;