import { ClientRequest } from "http";
import { Http2SecureServer, Http2Server, Http2ServerRequest, Http2Stream } from "http2";
import { Stream } from "stream";

declare const cordova: any;


interface Element extends QCObjectsElement {

}

interface Document extends QCObjectsElement {
}

interface ShadowRoot extends QCObjectsElement {

}

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


declare class QCObjectsElement extends HTMLElement {
    subelements(query: string): Array<HTMLElement | QCObjectsElement>;
}
declare class QCObjectsShadowedElement extends ShadowRoot {
    style: any;
    subelements(query: string): Array<ShadowRoot | HTMLElement | QCObjectsShadowedElement | QCObjectsElement>;
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
    constructor({ component, template });
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
declare class DDO {
    constructor({
        instance,
        name: string,
        fget,
        fset,
        value: any
    });
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
declare class _ComponentWidget_ extends HTMLElement { }

declare function asyncLoad(callback: Function, args: Array<any>): any;
declare function RegisterClass(_class_: any, namespace: string): void;
declare function ComponentURI({ COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION, TPL_SOURCE }): string;
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
declare function RegisterWidgets(...widgetList: Array<string>): void;
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



declare class InheritClass {
    __instanceID: number;
    __classType?: string;
    __definition?: any;
    __new__?(): void;
    __namespace?: string;
    body?: QCObjectsElement | QCObjectsShadowedElement | HTMLElement | string | null | undefined;
    constructor(o?:any);
}

declare class Processor extends InheritClass {
    component: Component;
    processors: Array<any>;
    process(template: string, component: Component): any;
    processObject(obj: any, component: Component): any;
    setProcessor(proc: Function): any;
    constructor(...args: Array<any>);

}

declare type ComponentParams = {
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
    __promise__?: Promise<any>;
    __shadowRoot?: QCObjectsShadowedElement;
    body?: QCObjectsElement;
    shadowRoot?: QCObjectsShadowedElement;
    splashScreenComponent?: Component;
    controller?: Controller;
    view?: View;
};

declare type ComponentDoneResponse = {
    request?: XMLHttpRequest;
    component?: Component;
};

declare class Component extends InheritClass {
    name: string;
    _body: QCObjectsElement | HTMLElement;
    body: QCObjectsElement | HTMLElement;
    templateURI: string;
    tplsource: string;
    tplextension: string;
    template: string;
    validRoutingWays: Array<string>;
    basePath: string;
    domain: string;
    templateHandler: string;
    processorHandler: Processor;
    routingWay: string;
    routingNodes: Array<QCObjectsElement | HTMLElement>;
    routings: Array<any>;
    routingPath: string;
    routingPaths: Array<string>;
    _componentHelpers: Array<any>;
    subcomponents: Array<Component>;
    splashScreenComponent?: Component;
    controller: Controller | null;
    view: View | null;
    effect: Effect;
    effectClass: string;
    method: string;
    static cached: boolean;
    __promise__?: Promise<any>;
    data: any;
    shadowed?: boolean;
    shadowRoot?: QCObjectsShadowedElement;
    cacheIndex: string;
    parsedAssignmentText: string;
    routingSelected: Array<any>;
    routingParams: {};
    subtags: Array<HTMLElement | QCObjectsElement | QCObjectsShadowedElement>;
    bodyAttributes: any;
    dataAttributes: any;
    serviceData?:any;
    constructor(component: ComponentParams);
    static route(): Promise<Component[]>;
    __done__(): Promise<void>;
    _bindroute(): void;
    __buildSubComponents__(rebuildObjects: boolean): Array<Component>;
    _generateRoutingPaths(componentBody: QCObjectsElement | HTMLElement): Promise<void>;
    _reroute_(): Promise<Component>;
    createServiceInstance(): Promise<JSON | string | null>;
    createControllerInstance(): Promise<{ component: Component, controller: Controller }>;
    createEffectInstance(): Promise<{ component: Component, effect: Effect }>;
    createViewInstance(): Promise<{ component: Component, view: View }>;
    done(standardResponse: ComponentDoneResponse): Promise<ComponentDoneResponse>;
    fail({ error: any, component: Component });
    hostElements(tagFilter: string): Array<HTMLElement | QCObjectsElement | QCObjectsShadowedElement>;
    set(name: string, value: any): void;
    get(name: string): any;
    feedComponent(): void;
    rebuild(): Promise<{ request: XMLHttpRequest, component: Component }>;
    Cast(oClass: any): any;
    fullscreen(): void;
    closefullscreen(): void;
    parseTemplate(template: string): string;
    lazyLoadImages(): any | null;
    applyTransitionEffect(effectClassName: string): void;
    applyObserveTransitionEffect(effectClassName: string): void | null;
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
    dependencies: Array<any>;
};

declare class Controller {
    __classType: string;
    __definition: any;
    __new__(): any;
    __namespace: string;
    body?: QCObjectsElement | HTMLElement;
    component: Component;
    dependencies?: Array<any>;
    constructor(controller: ControllerParams);
    routingSelectedAttr(attrName: string): any;
    isTouchable(): boolean;
    onpress(subelementSelector: string, handler: EventListener): void;
    createRoutingController(): void;


    done(...args: Array<any>);
    fail(...args: Array<any>);
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
    done(...args: Array<any>);
    fail(...args: Array<any>);
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
    done({ request: XMLHttpRequest, service: Service });
    fail(...args: Array<any>);
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
    draw(progress:number);
};

declare class Effect extends InheritClass {
    duration: number;
    apply(...args: Array<any>): any;
    animate (effect:EffectParams);
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
    intervalInterceptor(progress:number);
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

