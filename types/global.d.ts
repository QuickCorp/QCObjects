import { ClientRequest } from "http";
import { Http2SecureServer, Http2Server, Http2ServerRequest, Http2Stream } from "http2";
import { Stream } from "stream";

declare namespace global {
        export class Microservice {
            domain: string;
            basePath: string;
            body: any;
            stream?: Http2Stream | Stream;
            request?: Http2ServerRequest | ClientRequest;
        }
        
        export class Route {
            name: string;
            description?: string;
            path: string;
            microservice: string;
            redirect_to?: string;
            headers?: any;
            responseHeaders?: any;
            cors?: any;
        }
        
        export class BackendMicroservice extends InheritClass {
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
        
        export class QCObjectsElement extends Element{
            enableServiceClass?:boolean;
            Cast(_o:any):any;
            render(content:string):void;
            find(tag: string): (HTMLElement | QCObjectsElement)[];
            buildComponents(rebuildObjects?:boolean):any[];
            subelements(query: string): (HTMLElement | QCObjectsElement)[];
            subelements(query: string): Array<any>;
        }
        export class QCObjectsShadowedElement extends ShadowRoot {
            style: any;
            render(content:string):void;
            find(tag: string): (HTMLElement | QCObjectsElement)[];
            buildComponents(rebuildObjects?:boolean):any[];
            subelements(query: string): (ShadowRoot | HTMLElement | QCObjectsShadowedElement | QCObjectsElement)[];
            subelements(query: string): any[];
        }
        
        export class Logger {
            debugEnabled: boolean;
            infoEnabled: boolean;
            warnEnabled: boolean;
            debug(message: any): string;
            warn(message: any): string;
            info(message: any): string;
        
        }
        export function Class(className: string, extendsFrom: any, definition: any): any;
        export class _Crypt {
            last_string: string;
            last_key: string;
            construct: boolean;
            _new_(o: any): void;
            _encrypt(): string;
            _decrypt(): string;
            static encrypt(_string_: string, key: string): string;
            static decrypt(_string_: string, key: string): string;
        
        }
        export class TagElements extends Array {
            show(): void;
            hide(): void;
            effect(): void;
            findElements(elementName: string): TagElements;
        }
        
        export type DefaultTemplateHandlerParams = {component:Component, template:string};
        
        export class DefaultTemplateHandler {
            template: string;
            __definition: any;
            constructor({ component, template }:DefaultTemplateHandlerParams);
            assign(data: any): any;
        }
        export class SourceJS {
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
        export class SourceCSS {
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
        export class ArrayList extends Array { }
        export class ArrayCollection {
            source: ArrayList;
            changed(prop: string, value: any): any;
            push(value: any): void;
            pop(value: any): void;
            _new_(source: ArrayList): void;
        }
        export class GlobalSettings {
            _GLOBAL: any;
            set(name: string, value: any): void;
            get(name: string, _default: any): any;
            static __start__(): Promise<any>;
        }
        export class GLOBAL extends GlobalSettings { }
        export type DDOParams = {
            instance:any,
            name: string,
            fget:Function,
            fset:Function,
            value: any
        };
        export class DDO {
            constructor({
                instance,
                name: string,
                fget,
                fset,
                value: any
            }:DDOParams);
        }
        export type CacheController = {
            cache:ComplexStorageCache;
            cachedObjectID:string;
            cachedResponse?:any;
        }
        export type ComplexCacheParams = {
            index:string;
            load (cacheController?:CacheController):any;
            alternate(cacheController?:CacheController):any;
        }
        export class ComplexStorageCache {
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
        
        export type ComponentURIParams = { COMPONENTS_BASE_PATH:string, COMPONENT_NAME:string, TPLEXTENSION:string, TPL_SOURCE:string };
        export class _ComponentWidget_ extends HTMLElement { }
        
        export function asyncLoad(callback: Function, args: Array<any>): any;
        export function RegisterClass(_class_: any, namespace: string): void;
        export function ComponentURI ({ COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION, TPL_SOURCE }:ComponentURIParams):string;
        export function waitUntil(func: Function, exp: Function): void;
        export function _super_(className: string, classMethodName: string, params?: Array<any>): any;
        export function _DOMCreateElement(elementName: string): QCObjectsElement | HTMLElement;
        export function shortCode(): string;
        export function __getType__(_class_: any): string;
        export function is_a(obj: any, typeName: string): boolean;
        export function _DataStringify(data: any): string;
        export function serviceLoader(service: Service, _async: boolean): Promise<any>;
        export function componentLoader(component: Component, _async: boolean): Promise<any>;
        export function ObjectName(o: any): string;
        export function isQCObjects_Class(_: any): boolean;
        export function isQCObjects_Object(_: any): boolean;
        export function NamespaceRef(namespace: string): any;
        export function RegisterWidget(widgetName: string): void;
        export function RegisterWidgets(...widgetList:string[]): void;
        export function range(start: number, stop: number, step: number): Array<any>;
        export function getDocumentLayout(): string;
        export function Export(fn: Function): Function;
        export function New(__class__: any, args: any): any;
        export function Tag(tagName: string, innerHTML?: string): TagElements;
        export function Ready(e: Function): void;
        export function _methods_(_: any): Array<any>;
        export function set(_: any, _value_: any): any;
        export function get(_: any, _defaultValue_: any): any;
        export function __start__(): void;
        
        
        export interface IInheritClass {
            __instanceID: number;
            __classType?: string;
            __definition?: any;
            __new__?(): void;
            __namespace?: string;
            body?: QCObjectsElement | QCObjectsShadowedElement | HTMLElement | string | null | undefined;
        }
        
        
        export class InheritClass implements IInheritClass{
            __instanceID: number;
            __classType?: string;
            __definition?: any;
            __new__?(): void;
            __namespace?: string;
            body?: QCObjectsElement | QCObjectsShadowedElement | HTMLElement | string | null | undefined;
            constructor(o?:any);
        }
        
        export interface IProcessor extends IInheritClass{
            component: Component;
            processors: any;
            process(template: string, component: Component): any;
            processObject(obj: any, component: Component): any;
            setProcessor(proc: Function): any;
        }
        
        
        export class Processor extends InheritClass implements IProcessor {
            component: Component;
            processors: any;
            process(template: string, component: Component): any;
            processObject(obj: any, component: Component): any;
            setProcessor(proc: Function): any;
            constructor(...args: any[]);
        
        }
        
        export type ComponentParams = {
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
        
        
        export type ComponentDoneResponse = {
            request?: XMLHttpRequest|undefined;
            component?: Component|any;
        };
        export type ComponentRouting = {
            path:string, name:string, tplextension?:string
        };
        export type ComponentRoutings = ComponentRouting[];
        
        export interface IComponent {
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
            routingSelected: ComponentRouting[];
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
        
        export class Component extends InheritClass implements IComponent {
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
            routingSelected: ComponentRouting[];
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
        
        export class CONFIG extends InheritClass {
            _CONFIG_ENC: string;
            _CONFIG: any;
            static set(_: any, _value_: any): any;
            static get(_: any, _defaultValue_: any): any;
            __definition: any;
        }
        
        export type ControllerParams = {
            component: Component;
            dependencies: any[];
        };
        
        export interface IController{
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
        
        
        export class Controller extends InheritClass implements IController{
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
        
        export type ViewParams = {
            component: Component;
            dependencies: Array<any>;
        };
        
        export class View {
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
        export type ServiceDoneResponse = { request: XMLHttpRequest, service: Service };
        export class Service extends InheritClass {
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
            done({request, service}:ServiceDoneResponse):void;
            fail(...args: any[]):void;
        }
        export class JSONService extends Service {
            JSONresponse: JSON;
        }
        export class ConfigService extends JSONService {
            configFileName: string;
        }
        export class VO { }
        export type EffectParams = {
            duration:number; 
            timing(timeFraction:number):number;
            draw(progress:number):void;
        };
        
        export class Effect extends InheritClass {
            duration: number;
            apply(...args: any[]): any;
            animate (effect:EffectParams):void;
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
        
        export class TransitionEffect extends Effect {
            component: Component;
            defaultParams: TransitionEffectParams;
            duration: number;
            fitToHeight: boolean;
            fitToWidth: boolean;
            effects: Array<string>;
        
        }
        export type TimerParams = {
            duration:number; 
            timing(timeFraction:number, elapsed?:number):number;
            intervalInterceptor(progress:number):void;
        };
        
        export class Timer extends InheritClass {
            duration: number;
            alive: boolean;
            thread(timer:TimerParams):void;
        }
        export class Toggle {
            _toggle: boolean;
            _inverse: boolean;
            _positive: Function;
            _negative: Function;
            _dispatched?: boolean;
            _args: Array<any>;
        
            constructor(positive: Function, negative: Function, args: Array<any>);
        
        }
        
        export let logger: Logger;
        export let _sdk_: Promise<any>;
        export var global: typeof globalThis | GLOBAL;
        
        export function ClassFactory(className: string): any;
        export function Package(packageName: string, classesList?: Array<any> | undefined): Array<any> | undefined;
        export function Import(packageName: string, ready?: Function, external?: boolean): any;
        
        export const cordova: any;
        
        
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
        
        export const componentsStack:Component[];
        export const lastCache:ComplexStorageCache|undefined;


        export type TServiceLoaderInBrowser = (service: Service, _async: any)=> Promise<unknown>;

}

export = global;