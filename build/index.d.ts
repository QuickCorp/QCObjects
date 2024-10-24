declare module "Base64" {
    export const Base64: {
        _keyStr: string;
        encode(e: any): string;
        decode(e: any): string;
        _utf8_encode(e: any): string;
        _utf8_decode(e: any): string;
    };
}
declare module "platform" {
    export const isDeno: boolean;
    export const isBrowser: boolean;
    export const isNodeCommonJS: boolean;
    export const deno_require: (name: string) => void;
    export const _require_: (name: string) => void;
    export const is_phonegap: boolean;
}
declare module "top" {
    export var _top: any;
}
declare module "basePath" {
    export var _basePath_: string;
    export const setBasePath: (value: string) => void;
}
declare module "Logger" {
    export class Logger {
        debugEnabled: boolean;
        infoEnabled: boolean;
        warnEnabled: boolean;
        debug(message: any): void;
        info(message: any): void;
        warn(message: any): void;
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
    export const _DOMCreateElement: (elementName: any) => any;
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
    export const __getType__: (o_c: any) => string;
}
declare module "IncrementInstanceID" {
    /**
     * Primary instance ID of all objects
     */
    export var __instanceID: any;
    export const IncrementInstanceID: () => void;
}
declare module "introspection" {
    export const _protected_code_: (_: any) => void;
    export const _methods_: (_: any) => any[];
}
declare module "is_a" {
    /**
     * Returns if a class or object is from a determinated type
     * @param {Object} object
     * @param {String} typeName
     */
    export const is_a: (obj: any, typeName: any) => boolean;
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
    export const __is__forbidden_name__: () => boolean;
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
declare module "Class" {
    /**
     * Creates new object class  of another object
     *
     * @param {String} name
     * @param {Object} type
     * @param {Object} definition
     */
    export const Class: (name?: string, type?: undefined, definition?: undefined) => any;
}
declare module "isQCObjects" {
    export const isQCObjects_Object: (_: any) => boolean;
    export const isQCObjects_Class: (_: any) => boolean;
}
declare module "make_global" {
    export const __make_global__: (f: any) => void;
}
declare module "RegisterClass" {
    export const __register_class__: (_class_: any, __namespace: any) => any;
    export const RegisterClass: (_class_: any, __namespace: any) => any;
}
declare module "Package" {
    /**
     * Defines a package for Class classification
     *
     * @param {Object} namespace
     * @param {Object} classes
     */
    export const Package: (namespace: any, classes?: never[]) => any;
}
declare module "ClassFactory" {
    export const ClassFactory: (className: any) => any;
}
declare module "DataStringify" {
    export const _DataStringify: (data: any) => string;
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
    export const _CryptObject: (o: any) => any;
    export const _DecryptObject: (s: any) => any;
}
declare module "InheritClass" {
    export const InheritClass: any;
}
declare module "Processor" {
    import { InheritClass } from "InheritClass";
    export class Processor extends InheritClass {
        component: null;
        __definition: {};
        __classType: string;
        static processors: {
            config(component: any, arg: any): any;
            ENV(component: any, arg: any): string | undefined;
            global(component: any, arg: any): any;
        };
        static setProcessor(_proc_: any): void;
        constructor({ component }: {
            component: any;
        });
        static execute(component: any, processorName: any, args: any): any;
        static process(template: any, component?: null): any;
        static processObject(obj: any, component?: null): any;
    }
}
declare module "CONFIG" {
    export const CONFIG: any;
}
declare module "ComplexStorageCache" {
    export const ComplexStorageCache: (params: any) => any;
}
declare module "ComponentFactory" {
    /**
     * Returns a standarized uri for a component
     * @example
     * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
     * @author: Jean Machuca <correojean@gmail.com>
     * @param params an object with the params to build the uri path
     */
    export const ComponentURI: ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }: {
        TPL_SOURCE: any;
        COMPONENTS_BASE_PATH: any;
        COMPONENT_NAME: any;
        TPLEXTENSION: any;
    }) => string;
    export const _buildComponentFromElement_: (element: any, __parent__: any) => any;
    export const _buildComponentsFromElements_: (elements: any, __parent__: any) => any;
}
declare module "routings" {
    export const __routing_params__: (routing: any, routingPath: any) => any;
    export const __valid_routings__: (routings: any, routingPath: any) => any;
    export const __valid_routing_way__: (validRoutingWays: any, routingWay: any) => any;
}
declare module "Component" {
    import { InheritClass } from "InheritClass";
    export class Component extends InheritClass {
        validRoutingWays: string[];
        basePath: string;
        domain: any;
        templateHandler: string;
        processorHandler: null;
        routingWay: null;
        routingNodes: never[];
        routings: never[];
        routingPath: string;
        routingPaths: never[];
        _componentHelpers: never[];
        subcomponents: never[];
        splashScreenComponent: undefined;
        controller: undefined;
        view: undefined;
        effect: undefined;
        method: string;
        cached: boolean;
        __promise__: null;
        __namespace: undefined;
        constructor({ __parent__, templateURI, template, tplsource, tplextension, url, name, method, data, reload, shadowed, cached, _body, __promise__, __shadowRoot, body, shadowRoot, splashScreenComponent, controller, view }: {
            __parent__: any;
            templateURI?: string | undefined;
            template: any;
            tplsource?: string | undefined;
            tplextension: any;
            url?: string | undefined;
            name?: string | undefined;
            method?: string | undefined;
            data?: {} | undefined;
            reload?: boolean | undefined;
            shadowed?: boolean | undefined;
            cached?: boolean | undefined;
            _body?: any;
            __promise__?: null | undefined;
            __shadowRoot: any;
            body: any;
            shadowRoot: any;
            splashScreenComponent: any;
            controller: any;
            view: any;
        });
        set body(value: any);
        get body(): any;
        set cacheIndex(value: string);
        get cacheIndex(): string;
        set parsedAssignmentText(value: any);
        get parsedAssignmentText(): any;
        set shadowRoot(value: any);
        get shadowRoot(): any;
        set routingSelected(value: any);
        get routingSelected(): any;
        set routingParams(value: {});
        get routingParams(): {};
        createServiceInstance(): Promise<unknown>;
        _bindroute_(): void;
        done(standardResponse: any): Promise<{
            request: any;
            component: any;
        }> | undefined;
        createControllerInstance(): Promise<unknown>;
        createEffectInstance(): Promise<unknown>;
        createViewInstance(): Promise<unknown>;
        __done__(): Promise<unknown>;
        hostElements(tagFilter: any): any;
        get subtags(): any;
        get bodyAttributes(): {
            [x: number]: any;
        };
        get dataAttributes(): {};
        __buildSubComponents__(rebuildObjects?: boolean): never[];
        fail(standardResponse: any): Promise<{
            error: any;
            component: any;
        }> | undefined;
        set(name: any, value: any): void;
        get(name: any): any;
        feedComponent(): void;
        rebuild(): Promise<unknown>;
        Cast(oClass: any): any;
        static route(): Promise<void>;
        fullscreen(): void;
        closefullscreen(): void;
        _generateRoutingPaths(componentBody: any): Promise<void>;
        parseTemplate(template: any): any;
        _reroute_(): Promise<unknown>;
        lazyLoadImages(): null;
        applyTransitionEffect(effectClassName: any): void;
        applyObserveTransitionEffect(effectClassName: any): null;
        scrollIntoHash(): void;
        i18n_translate(): void;
        addComponentHelper(componentHelper: any): void;
        runComponentHelpers(): void;
    }
}
declare module "ConfigSettings" { }
declare module "Controller" {
    import { InheritClass } from "InheritClass";
    export class Controller extends InheritClass {
        component: null;
        dependencies: never[];
        constructor({ component, dependencies }: {
            component: any;
            dependencies: any;
        });
        routingSelectedAttr(attrName: any): any;
        isTouchable(): boolean;
        onpress(subelementSelector: any, handler: any): void;
        createRoutingController(): void;
        done(): void;
    }
}
declare module "Export" {
    export const Export: (f: any) => void;
}
declare module "DDO" {
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
        constructor({ instance, name, fget, fset, value }: {
            instance: any;
            name: any;
            fget: any;
            fset: any;
            value: any;
        });
        _new_({ instance, name, fget, fset, value }: {
            instance: any;
            name: any;
            fget: any;
            fset: any;
            value: any;
        }): void;
    }
}
declare module "DefaultTemplateHandler" {
    export class DefaultTemplateHandler {
        template: string;
        __definition: {};
        static __definition: {};
        component: any;
        constructor({ component, template }: {
            component: any;
            template: any;
        });
        assign(data: any): string;
    }
}
declare module "findPackageNodePath" {
    export const findPackageNodePath: (packagename: any) => string | null;
}
declare module "Import" {
    /**
     * Imports a script with the package nomenclature
     *
     * @param {Object} packagename
     * @param {Object} ready
     * @param {Boolean} external
     */
    export const Import: () => Promise<unknown> | undefined;
}
declare module "NamespaceRef" {
    /**
     * Declare Namespace
     *
     * @param {String} packageName
     * @param {Object} package
     */
    export const NamespaceRef: (namespace: any) => any;
}
declare module "Promise" {
    export var Promise: any;
}
declare module "assign" { }
declare module "localStorage" {
    export var localStorage: any;
}
declare module "subelements" {
    export const subelements: (selector: any) => any[];
}
declare module "asyncLoad" {
    export const asyncLoad: (callback: any, args: any) => {
        func: any;
        args: any;
        dispatch(): void;
    };
    export const _fireAsyncLoad: () => void;
}
declare module "waitUntil" {
    export const waitUntil: (func: any, exp: any) => void;
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
    export const _super_: (className: any, classMethodName: any, params: any) => any;
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
declare module "QCObjects" {
    import "assign";
    import { _top } from "top";
    export default _top;
}
declare module "Service" {
    import { InheritClass } from "InheritClass";
    export class Service extends InheritClass {
        kind: string;
        domain: any;
        basePath: string;
        url: string;
        method: string;
        data: {};
        reload: boolean;
        cached: boolean;
        constructor(...args: any[]);
        set(name: any, value: any): void;
        get(name: any): any;
    }
    export class JSONService extends Service {
        method: string;
        cached: boolean;
        headers: {
            "Content-Type": string;
            charset: string;
        };
        JSONresponse: null;
        done(result: any): void;
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
        done(result: any): void;
        fail(result: any): void;
        constructor();
    }
}
declare module "Tag" {
    export const TagElements: any;
    /**
     * Gets the element of DOM found by tag name
     *
     * @param {Object} tagname
     * @param {Object} innerHTML
     */
    export const Tag: (tagname: any, innerHTML: any) => any;
}
declare module "VO" {
    import { InheritClass } from "InheritClass";
    export class VO extends InheritClass {
        constructor();
    }
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
declare module "index" {
    import QCObjects from "QCObjects";
    export default QCObjects;
}
declare module "uniqueID" {
    export const uniqueId: () => any;
}
