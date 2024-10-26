declare module "platform" {
    export const isDeno: boolean;
    export const isBrowser: boolean;
    export const isNodeCommonJS: boolean;
    export const deno_require: (name: string) => void;
    export const _require_: (name: string) => void;
    export const is_phonegap: boolean;
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
    export const _CastProps: (obj_source: any, obj_dest: any) => any;
}
declare module "DOMCreateElement" {
    import { QCObjectsElement } from "types/global";
    export const _DOMCreateElement: (elementName: string) => QCObjectsElement;
}
declare module "is_raw_class" {
    export const __is_raw_class__: (o_c: any) => boolean;
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
    export const _methods_: (_: any) => any[];
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
    export const _LegacyCopy: (obj: any) => any;
}
declare module "PrimaryCollections" {
    export var _QC_CLASSES: {};
    export var _QC_PACKAGES: {};
    export var _QC_PACKAGES_IMPORTED: never[];
    export var _QC_READY_LISTENERS: never[];
}
declare module "make_global" {
    export const __make_global__: (f: any) => void;
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
    export const Package: (namespace: string, classes?: any[]) => any;
}
declare module "ClassFactory" {
    export const ClassFactory: (className: string) => any;
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
declare module "InheritClass" {
    export const InheritClass: any;
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
    export const _Crypt: any;
    export const _CryptObject: (o: any) => string;
    export const _DecryptObject: (s: string) => any;
}
declare module "CONFIG" {
    export const CONFIG: any;
}
declare module "Processor" {
    import { Component, HTMLElement, IProcessor, QCObjectsElement, QCObjectsShadowedElement } from "types/global";
    import { InheritClass } from "InheritClass";
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
declare module "routings" {
    import { ComponentRouting } from "types/global";
    export const __routing_params__: any;
    export const __valid_routings__: (routings: ComponentRouting[], routingPath: string) => ComponentRouting[];
    export const __valid_routing_way__: (validRoutingWays: string[], routingWay: string) => boolean;
}
declare module "Export" {
    export const Export: (f: any) => void;
}
declare module "asyncLoad" {
    import { Service } from "types/global";
    import { Component } from "Component";
    export const _asyncLoad: never[];
    export function asyncLoad(callback: (component: Component, _async?: any) => Promise<any>, args?: any[]): any;
    export function asyncLoad(callback: (service: Service, _async?: any) => Promise<unknown>, args?: any[]): any;
    export function asyncLoad(callback: (_async?: any) => any, args?: any[]): any;
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
declare module "Service" {
    import { ServiceDoneResponse } from "types/global";
    import { InheritClass } from "InheritClass";
    export class Service extends InheritClass {
        kind: string;
        domain: string;
        basePath: string;
        url: string;
        method: string;
        data: {};
        reload: boolean;
        cached: boolean;
        constructor(...args: any[]);
        set(name: string, value: any): void;
        get(name: any, _default?: any): any;
    }
    export class JSONService extends Service {
        method: string;
        cached: boolean;
        headers: {
            "Content-Type": string;
            charset: string;
        };
        JSONresponse: null;
        done(result: ServiceDoneResponse): void;
        constructor(...args: any[]);
    }
    export class ConfigService extends JSONService {
        method: string;
        cached: boolean;
        configFileName: string;
        headers: {
            "Content-Type": string;
            charset: string;
        };
        JSONresponse: null;
        done(result: ServiceDoneResponse): void;
        fail(...args: any[]): void;
        constructor();
    }
}
declare module "serviceLoader" {
    import { Service } from "Service";
    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param service a Service object
     */
    export const serviceLoader: (service: Service, _async?: boolean) => any;
}
declare module "tag_filter" {
    export const _tag_filter_ = "quick-component:not([loaded]),component:not([loaded])";
}
declare module "componentLoader" {
    import { Component } from "Component";
    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param component a Component object
     */
    export const componentLoader: (component: Component, _async: boolean) => any;
}
declare module "Component" {
    import { ComponentDoneResponse, ComponentParams, ComponentRouting, Controller, Effect, HTMLElement, IComponent, QCObjectsElement, QCObjectsShadowedElement, View } from "types/global";
    import { InheritClass } from "InheritClass";
    import { Processor } from "Processor";
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
        set body(value: QCObjectsElement | HTMLElement);
        get body(): QCObjectsElement | HTMLElement;
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
            [x: string]: string | null;
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
declare module "ComponentFactory" {
    import { ComponentURIParams, QCObjectsElement } from "types/global";
    import { Component } from "Component";
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
    export const buildComponents: (element: QCObjectsElement, rebuildObjects?: boolean) => Component[];
}
declare module "top" {
    import { ComplexStorageCache, Component } from "types/global";
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
declare module "Class" {
    /**
     * Creates new object class  of another object
     *
     * @param {String} name
     * @param {Object} type
     * @param {Object} definition
     */
    export const Class: (name?: string, type?: any, definition?: any) => any;
}
declare module "ArrayCollection" {
    export const ArrayList: any;
    export const ArrayCollection: any;
}
declare module "BackendMicroservice" {
    import { Http2Stream } from "http2";
    import { Stream } from "stream";
    import { InheritClass } from "InheritClass";
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
declare module "ConfigSettings" { }
declare module "Controller" {
    import { ControllerParams, HTMLElement, IController, QCObjectsElement } from "types/global";
    import { InheritClass } from "InheritClass";
    import { Component } from "Component";
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
declare module "DDO" {
    import { DDOParams } from "types/global";
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
declare module "DefaultTemplateHandler" {
    import { DefaultTemplateHandlerParams } from "types/global";
    export class DefaultTemplateHandler {
        template: string;
        __definition: {};
        static __definition: {};
        component: import("types/global").Component;
        constructor({ component, template }: DefaultTemplateHandlerParams);
        assign(data: any): string;
    }
}
declare module "DocumentLayout" {
    export const getDocumentLayout: () => string | undefined;
}
declare module "Effect" {
    import { EffectParams } from "types/global";
    import { InheritClass } from "InheritClass";
    export class Effect extends InheritClass {
        duration: number;
        constructor();
        animate({ timing, draw, duration }: EffectParams): void;
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
declare module "NamespaceRef" {
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
declare module "assign" { }
declare module "subelements" {
    export const subelements: (this: any, query: string) => any[];
}
declare module "waitUntil" {
    export const waitUntil: (func: () => void, exp: () => any) => void;
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
    export const _super_: (className: string, classMethodName: string) => any;
}
declare module "shortCode" {
    export const shortCode: () => any;
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
declare module "Tag" {
    export const TagElements: any;
    /**
     * Gets the element of DOM found by tag name
     *
     * @param {Object} tagname
     * @param {Object} innerHTML
     */
    export const Tag: (tagname: string, innerHTML?: string) => any;
}
declare module "SourceJS" {
    export const SourceJS: any;
}
declare module "SourceCSS" {
    export const SourceCSS: any;
}
declare module "globalSettings" {
    import { InheritClass } from "InheritClass";
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
declare module "WidgetsFactory" {
    export const _ComponentWidget_: {
        new (): {
            accessKey: string;
            readonly accessKeyLabel: string;
            autocapitalize: string;
            dir: string;
            draggable: boolean;
            hidden: boolean;
            inert: boolean;
            innerText: string;
            lang: string;
            readonly offsetHeight: number;
            readonly offsetLeft: number;
            readonly offsetParent: Element | null;
            readonly offsetTop: number;
            readonly offsetWidth: number;
            outerText: string;
            popover: string | null;
            spellcheck: boolean;
            title: string;
            translate: boolean;
            attachInternals(): ElementInternals;
            click(): void;
            hidePopover(): void;
            showPopover(): void;
            togglePopover(force?: boolean): boolean;
            addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
            addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
            removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
            removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
            readonly attributes: NamedNodeMap;
            readonly classList: DOMTokenList;
            className: string;
            readonly clientHeight: number;
            readonly clientLeft: number;
            readonly clientTop: number;
            readonly clientWidth: number;
            id: string;
            innerHTML: string;
            readonly localName: string;
            readonly namespaceURI: string | null;
            onfullscreenchange: ((this: Element, ev: Event) => any) | null;
            onfullscreenerror: ((this: Element, ev: Event) => any) | null;
            outerHTML: string;
            readonly ownerDocument: Document;
            readonly part: DOMTokenList;
            readonly prefix: string | null;
            readonly scrollHeight: number;
            scrollLeft: number;
            scrollTop: number;
            readonly scrollWidth: number;
            readonly shadowRoot: ShadowRoot | null;
            slot: string;
            readonly tagName: string;
            attachShadow(init: ShadowRootInit): ShadowRoot;
            checkVisibility(options?: CheckVisibilityOptions): boolean;
            closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
            closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
            closest<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
            closest<E extends Element = Element>(selectors: string): E | null;
            computedStyleMap(): StylePropertyMapReadOnly;
            getAttribute(qualifiedName: string): string | null;
            getAttributeNS(namespace: string | null, localName: string): string | null;
            getAttributeNames(): string[];
            getAttributeNode(qualifiedName: string): Attr | null;
            getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
            getBoundingClientRect(): DOMRect;
            getClientRects(): DOMRectList;
            getElementsByClassName(classNames: string): HTMLCollectionOf<Element>;
            getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
            getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
            getElementsByTagName<K extends keyof MathMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
            getElementsByTagName<K extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
            getElementsByTagName(qualifiedName: string): HTMLCollectionOf<Element>;
            getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<HTMLElement>;
            getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
            getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
            getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<Element>;
            getHTML(options?: GetHTMLOptions): string;
            hasAttribute(qualifiedName: string): boolean;
            hasAttributeNS(namespace: string | null, localName: string): boolean;
            hasAttributes(): boolean;
            hasPointerCapture(pointerId: number): boolean;
            insertAdjacentElement(where: InsertPosition, element: Element): Element | null;
            insertAdjacentHTML(position: InsertPosition, string: string): void;
            insertAdjacentText(where: InsertPosition, data: string): void;
            matches(selectors: string): boolean;
            releasePointerCapture(pointerId: number): void;
            removeAttribute(qualifiedName: string): void;
            removeAttributeNS(namespace: string | null, localName: string): void;
            removeAttributeNode(attr: Attr): Attr;
            requestFullscreen(options?: FullscreenOptions): Promise<void>;
            requestPointerLock(options?: PointerLockOptions): Promise<void>;
            scroll(options?: ScrollToOptions): void;
            scroll(x: number, y: number): void;
            scrollBy(options?: ScrollToOptions): void;
            scrollBy(x: number, y: number): void;
            scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
            scrollTo(options?: ScrollToOptions): void;
            scrollTo(x: number, y: number): void;
            setAttribute(qualifiedName: string, value: string): void;
            setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
            setAttributeNode(attr: Attr): Attr | null;
            setAttributeNodeNS(attr: Attr): Attr | null;
            setHTMLUnsafe(html: string): void;
            setPointerCapture(pointerId: number): void;
            toggleAttribute(qualifiedName: string, force?: boolean): boolean;
            webkitMatchesSelector(selectors: string): boolean;
            readonly baseURI: string;
            readonly childNodes: NodeListOf<ChildNode>;
            readonly firstChild: ChildNode | null;
            readonly isConnected: boolean;
            readonly lastChild: ChildNode | null;
            readonly nextSibling: ChildNode | null;
            readonly nodeName: string;
            readonly nodeType: number;
            nodeValue: string | null;
            readonly parentElement: HTMLElement | null;
            readonly parentNode: ParentNode | null;
            readonly previousSibling: ChildNode | null;
            textContent: string | null;
            appendChild<T extends Node>(node: T): T;
            cloneNode(deep?: boolean): Node;
            compareDocumentPosition(other: Node): number;
            contains(other: Node | null): boolean;
            getRootNode(options?: GetRootNodeOptions): Node;
            hasChildNodes(): boolean;
            insertBefore<T extends Node>(node: T, child: Node | null): T;
            isDefaultNamespace(namespace: string | null): boolean;
            isEqualNode(otherNode: Node | null): boolean;
            isSameNode(otherNode: Node | null): boolean;
            lookupNamespaceURI(prefix: string | null): string | null;
            lookupPrefix(namespace: string | null): string | null;
            normalize(): void;
            removeChild<T extends Node>(child: T): T;
            replaceChild<T extends Node>(node: Node, child: T): T;
            readonly ELEMENT_NODE: 1;
            readonly ATTRIBUTE_NODE: 2;
            readonly TEXT_NODE: 3;
            readonly CDATA_SECTION_NODE: 4;
            readonly ENTITY_REFERENCE_NODE: 5;
            readonly ENTITY_NODE: 6;
            readonly PROCESSING_INSTRUCTION_NODE: 7;
            readonly COMMENT_NODE: 8;
            readonly DOCUMENT_NODE: 9;
            readonly DOCUMENT_TYPE_NODE: 10;
            readonly DOCUMENT_FRAGMENT_NODE: 11;
            readonly NOTATION_NODE: 12;
            readonly DOCUMENT_POSITION_DISCONNECTED: 1;
            readonly DOCUMENT_POSITION_PRECEDING: 2;
            readonly DOCUMENT_POSITION_FOLLOWING: 4;
            readonly DOCUMENT_POSITION_CONTAINS: 8;
            readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
            readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
            dispatchEvent(event: Event): boolean;
            ariaAtomic: string | null;
            ariaAutoComplete: string | null;
            ariaBrailleLabel: string | null;
            ariaBrailleRoleDescription: string | null;
            ariaBusy: string | null;
            ariaChecked: string | null;
            ariaColCount: string | null;
            ariaColIndex: string | null;
            ariaColSpan: string | null;
            ariaCurrent: string | null;
            ariaDescription: string | null;
            ariaDisabled: string | null;
            ariaExpanded: string | null;
            ariaHasPopup: string | null;
            ariaHidden: string | null;
            ariaInvalid: string | null;
            ariaKeyShortcuts: string | null;
            ariaLabel: string | null;
            ariaLevel: string | null;
            ariaLive: string | null;
            ariaModal: string | null;
            ariaMultiLine: string | null;
            ariaMultiSelectable: string | null;
            ariaOrientation: string | null;
            ariaPlaceholder: string | null;
            ariaPosInSet: string | null;
            ariaPressed: string | null;
            ariaReadOnly: string | null;
            ariaRequired: string | null;
            ariaRoleDescription: string | null;
            ariaRowCount: string | null;
            ariaRowIndex: string | null;
            ariaRowSpan: string | null;
            ariaSelected: string | null;
            ariaSetSize: string | null;
            ariaSort: string | null;
            ariaValueMax: string | null;
            ariaValueMin: string | null;
            ariaValueNow: string | null;
            ariaValueText: string | null;
            role: string | null;
            animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
            getAnimations(options?: GetAnimationsOptions): Animation[];
            after(...nodes: (Node | string)[]): void;
            before(...nodes: (Node | string)[]): void;
            remove(): void;
            replaceWith(...nodes: (Node | string)[]): void;
            readonly nextElementSibling: Element | null;
            readonly previousElementSibling: Element | null;
            readonly childElementCount: number;
            readonly children: HTMLCollection;
            readonly firstElementChild: Element | null;
            readonly lastElementChild: Element | null;
            append(...nodes: (Node | string)[]): void;
            prepend(...nodes: (Node | string)[]): void;
            querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
            querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
            querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
            querySelector<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
            querySelector<E extends Element = Element>(selectors: string): E | null;
            querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
            querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
            querySelectorAll<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
            querySelectorAll<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
            querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
            replaceChildren(...nodes: (Node | string)[]): void;
            readonly assignedSlot: HTMLSlotElement | null;
            readonly attributeStyleMap: StylePropertyMap;
            readonly style: CSSStyleDeclaration;
            contentEditable: string;
            enterKeyHint: string;
            inputMode: string;
            readonly isContentEditable: boolean;
            onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
            onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
            onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
            onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
            onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
            onauxclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onbeforeinput: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null;
            onbeforetoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
            oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            oncontextlost: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            oncontextmenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            oncontextrestored: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            oncopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
            oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            oncut: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
            ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
            ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
            ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
            ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
            ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
            ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
            ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
            ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onerror: OnErrorEventHandler;
            onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
            onformdata: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
            ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
            onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
            onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
            onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
            onpaste: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
            onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
            onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
            onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
            onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onscrollend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onsecuritypolicyviolation: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
            onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onslotchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onsubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
            onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            ontoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
            ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
            ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
            ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
            ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
            ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
            ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
            ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
            onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onwebkitanimationend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onwebkitanimationiteration: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onwebkitanimationstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onwebkittransitionend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
            onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
            autofocus: boolean;
            readonly dataset: DOMStringMap;
            nonce?: string;
            tabIndex: number;
            blur(): void;
            focus(options?: FocusOptions): void;
        };
    };
    export const RegisterWidget: (widgetName: string) => void;
    export const RegisterWidgets: () => void;
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
        constructor();
    }
}
declare module "TransitionEffect" {
    import { TransitionEffectParams } from "types/global";
    import { Effect } from "Effect";
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
declare module "Timer" {
    import { TimerParams } from "types/global";
    import { InheritClass } from "InheritClass";
    export class Timer extends InheritClass {
        constructor();
        duration: number;
        alive: boolean;
        thread({ timing, intervalInterceptor, duration }: TimerParams): void;
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
    import "assign";
    import { Logger } from "Logger";
    import { asyncLoad } from "asyncLoad";
    import { ComplexStorageCache } from "ComplexStorageCache";
    import { Processor } from "Processor";
    import { BackendMicroservice } from "BackendMicroservice";
    import { Component } from "Component";
    import { DefaultTemplateHandler } from "DefaultTemplateHandler";
    import { GlobalSettings } from "globalSettings";
    import { Controller } from "Controller";
    import { View } from "View";
    import { ConfigService, JSONService, Service } from "Service";
    import { VO } from "VO";
    import { Effect } from "Effect";
    import { TransitionEffect } from "TransitionEffect";
    import { Timer } from "Timer";
    import { DDO } from "DDO";
    import { Toggle } from "Toggle";
    import { QCObjectsElement } from "types/global";
    const _default: {
        BackendMicroservice: typeof BackendMicroservice;
        Logger: typeof Logger;
        Class: (name?: string, type?: any, definition?: any) => any;
        _Crypt: any;
        TagElements: any;
        DefaultTemplateHandler: typeof DefaultTemplateHandler;
        SourceJS: any;
        SourceCSS: any;
        ArrayList: any;
        ArrayCollection: any;
        GlobalSettings: typeof GlobalSettings;
        DDO: typeof DDO;
        ComplexStorageCache: typeof ComplexStorageCache;
        _ComponentWidget_: {
            new (): {
                accessKey: string;
                readonly accessKeyLabel: string;
                autocapitalize: string;
                dir: string;
                draggable: boolean;
                hidden: boolean;
                inert: boolean;
                innerText: string;
                lang: string;
                readonly offsetHeight: number;
                readonly offsetLeft: number;
                readonly offsetParent: globalThis.Element | null;
                readonly offsetTop: number;
                readonly offsetWidth: number;
                outerText: string;
                popover: string | null;
                spellcheck: boolean;
                title: string;
                translate: boolean;
                attachInternals(): ElementInternals;
                click(): void;
                hidePopover(): void;
                showPopover(): void;
                togglePopover(force?: boolean): boolean;
                addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: globalThis.HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
                addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
                removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: globalThis.HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
                removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
                readonly attributes: NamedNodeMap;
                readonly classList: DOMTokenList;
                className: string;
                readonly clientHeight: number;
                readonly clientLeft: number;
                readonly clientTop: number;
                readonly clientWidth: number;
                id: string;
                innerHTML: string;
                readonly localName: string;
                readonly namespaceURI: string | null;
                onfullscreenchange: ((this: globalThis.Element, ev: Event) => any) | null;
                onfullscreenerror: ((this: globalThis.Element, ev: Event) => any) | null;
                outerHTML: string;
                readonly ownerDocument: globalThis.Document;
                readonly part: DOMTokenList;
                readonly prefix: string | null;
                readonly scrollHeight: number;
                scrollLeft: number;
                scrollTop: number;
                readonly scrollWidth: number;
                readonly shadowRoot: globalThis.ShadowRoot | null;
                slot: string;
                readonly tagName: string;
                attachShadow(init: ShadowRootInit): globalThis.ShadowRoot;
                checkVisibility(options?: CheckVisibilityOptions): boolean;
                closest<K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K] | null;
                closest<K extends keyof SVGElementTagNameMap>(selector: K): SVGElementTagNameMap[K] | null;
                closest<K extends keyof MathMLElementTagNameMap>(selector: K): MathMLElementTagNameMap[K] | null;
                closest<E extends globalThis.Element = globalThis.Element>(selectors: string): E | null;
                computedStyleMap(): StylePropertyMapReadOnly;
                getAttribute(qualifiedName: string): string | null;
                getAttributeNS(namespace: string | null, localName: string): string | null;
                getAttributeNames(): string[];
                getAttributeNode(qualifiedName: string): Attr | null;
                getAttributeNodeNS(namespace: string | null, localName: string): Attr | null;
                getBoundingClientRect(): DOMRect;
                getClientRects(): DOMRectList;
                getElementsByClassName(classNames: string): HTMLCollectionOf<globalThis.Element>;
                getElementsByTagName<K extends keyof HTMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementTagNameMap[K]>;
                getElementsByTagName<K extends keyof SVGElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<SVGElementTagNameMap[K]>;
                getElementsByTagName<K extends keyof MathMLElementTagNameMap>(qualifiedName: K): HTMLCollectionOf<MathMLElementTagNameMap[K]>;
                getElementsByTagName<K extends keyof HTMLElementDeprecatedTagNameMap>(qualifiedName: K): HTMLCollectionOf<HTMLElementDeprecatedTagNameMap[K]>;
                getElementsByTagName(qualifiedName: string): HTMLCollectionOf<globalThis.Element>;
                getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1999/xhtml", localName: string): HTMLCollectionOf<globalThis.HTMLElement>;
                getElementsByTagNameNS(namespaceURI: "http://www.w3.org/2000/svg", localName: string): HTMLCollectionOf<SVGElement>;
                getElementsByTagNameNS(namespaceURI: "http://www.w3.org/1998/Math/MathML", localName: string): HTMLCollectionOf<MathMLElement>;
                getElementsByTagNameNS(namespace: string | null, localName: string): HTMLCollectionOf<globalThis.Element>;
                getHTML(options?: GetHTMLOptions): string;
                hasAttribute(qualifiedName: string): boolean;
                hasAttributeNS(namespace: string | null, localName: string): boolean;
                hasAttributes(): boolean;
                hasPointerCapture(pointerId: number): boolean;
                insertAdjacentElement(where: InsertPosition, element: globalThis.Element): globalThis.Element | null;
                insertAdjacentHTML(position: InsertPosition, string: string): void;
                insertAdjacentText(where: InsertPosition, data: string): void;
                matches(selectors: string): boolean;
                releasePointerCapture(pointerId: number): void;
                removeAttribute(qualifiedName: string): void;
                removeAttributeNS(namespace: string | null, localName: string): void;
                removeAttributeNode(attr: Attr): Attr;
                requestFullscreen(options?: FullscreenOptions): Promise<void>;
                requestPointerLock(options?: PointerLockOptions): Promise<void>;
                scroll(options?: ScrollToOptions): void;
                scroll(x: number, y: number): void;
                scrollBy(options?: ScrollToOptions): void;
                scrollBy(x: number, y: number): void;
                scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void;
                scrollTo(options?: ScrollToOptions): void;
                scrollTo(x: number, y: number): void;
                setAttribute(qualifiedName: string, value: string): void;
                setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void;
                setAttributeNode(attr: Attr): Attr | null;
                setAttributeNodeNS(attr: Attr): Attr | null;
                setHTMLUnsafe(html: string): void;
                setPointerCapture(pointerId: number): void;
                toggleAttribute(qualifiedName: string, force?: boolean): boolean;
                webkitMatchesSelector(selectors: string): boolean;
                readonly baseURI: string;
                readonly childNodes: NodeListOf<ChildNode>;
                readonly firstChild: ChildNode | null;
                readonly isConnected: boolean;
                readonly lastChild: ChildNode | null;
                readonly nextSibling: ChildNode | null;
                readonly nodeName: string;
                readonly nodeType: number;
                nodeValue: string | null;
                readonly parentElement: globalThis.HTMLElement | null;
                readonly parentNode: ParentNode | null;
                readonly previousSibling: ChildNode | null;
                textContent: string | null;
                appendChild<T extends Node>(node: T): T;
                cloneNode(deep?: boolean): Node;
                compareDocumentPosition(other: Node): number;
                contains(other: Node | null): boolean;
                getRootNode(options?: GetRootNodeOptions): Node;
                hasChildNodes(): boolean;
                insertBefore<T extends Node>(node: T, child: Node | null): T;
                isDefaultNamespace(namespace: string | null): boolean;
                isEqualNode(otherNode: Node | null): boolean;
                isSameNode(otherNode: Node | null): boolean;
                lookupNamespaceURI(prefix: string | null): string | null;
                lookupPrefix(namespace: string | null): string | null;
                normalize(): void;
                removeChild<T extends Node>(child: T): T;
                replaceChild<T extends Node>(node: Node, child: T): T;
                readonly ELEMENT_NODE: 1;
                readonly ATTRIBUTE_NODE: 2;
                readonly TEXT_NODE: 3;
                readonly CDATA_SECTION_NODE: 4;
                readonly ENTITY_REFERENCE_NODE: 5;
                readonly ENTITY_NODE: 6;
                readonly PROCESSING_INSTRUCTION_NODE: 7;
                readonly COMMENT_NODE: 8;
                readonly DOCUMENT_NODE: 9;
                readonly DOCUMENT_TYPE_NODE: 10;
                readonly DOCUMENT_FRAGMENT_NODE: 11;
                readonly NOTATION_NODE: 12;
                readonly DOCUMENT_POSITION_DISCONNECTED: 1;
                readonly DOCUMENT_POSITION_PRECEDING: 2;
                readonly DOCUMENT_POSITION_FOLLOWING: 4;
                readonly DOCUMENT_POSITION_CONTAINS: 8;
                readonly DOCUMENT_POSITION_CONTAINED_BY: 16;
                readonly DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC: 32;
                dispatchEvent(event: Event): boolean;
                ariaAtomic: string | null;
                ariaAutoComplete: string | null;
                ariaBrailleLabel: string | null;
                ariaBrailleRoleDescription: string | null;
                ariaBusy: string | null;
                ariaChecked: string | null;
                ariaColCount: string | null;
                ariaColIndex: string | null;
                ariaColSpan: string | null;
                ariaCurrent: string | null;
                ariaDescription: string | null;
                ariaDisabled: string | null;
                ariaExpanded: string | null;
                ariaHasPopup: string | null;
                ariaHidden: string | null;
                ariaInvalid: string | null;
                ariaKeyShortcuts: string | null;
                ariaLabel: string | null;
                ariaLevel: string | null;
                ariaLive: string | null;
                ariaModal: string | null;
                ariaMultiLine: string | null;
                ariaMultiSelectable: string | null;
                ariaOrientation: string | null;
                ariaPlaceholder: string | null;
                ariaPosInSet: string | null;
                ariaPressed: string | null;
                ariaReadOnly: string | null;
                ariaRequired: string | null;
                ariaRoleDescription: string | null;
                ariaRowCount: string | null;
                ariaRowIndex: string | null;
                ariaRowSpan: string | null;
                ariaSelected: string | null;
                ariaSetSize: string | null;
                ariaSort: string | null;
                ariaValueMax: string | null;
                ariaValueMin: string | null;
                ariaValueNow: string | null;
                ariaValueText: string | null;
                role: string | null;
                animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation;
                getAnimations(options?: GetAnimationsOptions): Animation[];
                after(...nodes: (Node | string)[]): void;
                before(...nodes: (Node | string)[]): void;
                remove(): void;
                replaceWith(...nodes: (Node | string)[]): void;
                readonly nextElementSibling: globalThis.Element | null;
                readonly previousElementSibling: globalThis.Element | null;
                readonly childElementCount: number;
                readonly children: HTMLCollection;
                readonly firstElementChild: globalThis.Element | null;
                readonly lastElementChild: globalThis.Element | null;
                append(...nodes: (Node | string)[]): void;
                prepend(...nodes: (Node | string)[]): void;
                querySelector<K extends keyof HTMLElementTagNameMap>(selectors: K): HTMLElementTagNameMap[K] | null;
                querySelector<K extends keyof SVGElementTagNameMap>(selectors: K): SVGElementTagNameMap[K] | null;
                querySelector<K extends keyof MathMLElementTagNameMap>(selectors: K): MathMLElementTagNameMap[K] | null;
                querySelector<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): HTMLElementDeprecatedTagNameMap[K] | null;
                querySelector<E extends globalThis.Element = globalThis.Element>(selectors: string): E | null;
                querySelectorAll<K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
                querySelectorAll<K extends keyof SVGElementTagNameMap>(selectors: K): NodeListOf<SVGElementTagNameMap[K]>;
                querySelectorAll<K extends keyof MathMLElementTagNameMap>(selectors: K): NodeListOf<MathMLElementTagNameMap[K]>;
                querySelectorAll<K extends keyof HTMLElementDeprecatedTagNameMap>(selectors: K): NodeListOf<HTMLElementDeprecatedTagNameMap[K]>;
                querySelectorAll<E extends globalThis.Element = globalThis.Element>(selectors: string): NodeListOf<E>;
                replaceChildren(...nodes: (Node | string)[]): void;
                readonly assignedSlot: HTMLSlotElement | null;
                readonly attributeStyleMap: StylePropertyMap;
                readonly style: CSSStyleDeclaration;
                contentEditable: string;
                enterKeyHint: string;
                inputMode: string;
                readonly isContentEditable: boolean;
                onabort: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
                onanimationcancel: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
                onanimationend: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
                onanimationiteration: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
                onanimationstart: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
                onauxclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onbeforeinput: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null;
                onbeforetoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onblur: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
                oncancel: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                oncanplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                oncanplaythrough: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onclose: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                oncontextlost: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                oncontextmenu: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                oncontextrestored: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                oncopy: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
                oncuechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                oncut: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
                ondblclick: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                ondrag: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
                ondragend: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
                ondragenter: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
                ondragleave: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
                ondragover: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
                ondragstart: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
                ondrop: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
                ondurationchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onemptied: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onended: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onerror: OnErrorEventHandler;
                onfocus: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
                onformdata: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
                ongotpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                oninput: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                oninvalid: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onkeydown: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
                onkeypress: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
                onkeyup: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
                onload: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onloadeddata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onloadedmetadata: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onloadstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onlostpointercapture: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onmousedown: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onmouseenter: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onmouseleave: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onmousemove: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onmouseout: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onmouseover: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onmouseup: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
                onpaste: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
                onpause: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onplay: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onplaying: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onpointercancel: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onpointerdown: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onpointerenter: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onpointerleave: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onpointermove: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onpointerout: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onpointerover: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onpointerup: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
                onprogress: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
                onratechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onreset: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onresize: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
                onscroll: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onscrollend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onsecuritypolicyviolation: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
                onseeked: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onseeking: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onselect: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onselectionchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onselectstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onslotchange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onstalled: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onsubmit: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
                onsuspend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                ontimeupdate: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                ontoggle: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
                ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
                ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
                ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
                ontransitioncancel: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
                ontransitionend: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
                ontransitionrun: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
                ontransitionstart: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
                onvolumechange: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onwaiting: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onwebkitanimationend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onwebkitanimationiteration: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onwebkitanimationstart: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onwebkittransitionend: ((this: GlobalEventHandlers, ev: Event) => any) | null;
                onwheel: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
                autofocus: boolean;
                readonly dataset: DOMStringMap;
                nonce?: string;
                tabIndex: number;
                blur(): void;
                focus(options?: FocusOptions): void;
            };
        };
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
        serviceLoader: (service: Service, _async?: boolean) => any;
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
        InheritClass: any;
        Processor: typeof Processor;
        Component: typeof Component;
        CONFIG: any;
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
declare module "index" {
    import QCObjects from "QCObjects";
    export default QCObjects;
}
declare module "localStorage" {
    export var localStorage: any;
}
declare module "uniqueID" {
    export const uniqueId: () => any;
}
