import { IComplexStorageCache, IComponent, IConfigService, IQCObjectsElement } from "types";
import { buildComponents } from "./ComponentFactory";
import { _CastProps } from "./Cast";
import { GlobalSettings } from "./globalSettings";

type QCObjects = {
    lastCache?:IComplexStorageCache,
    componentsStack:IComponent[],
    Microservice:any,
    Route:any,
    BackendMicroservice:any,
    QCObjectsElement:any,
    QCObjectsShadowedElement:any,
    Logger:any,
    Class:any, 
    _Crypt:any, 
    TagElements:any, 
    DefaultTemplateHandler:any, 
    SourceJS:any, 
    SourceCSS:any, 
    ArrayList:any, 
    ArrayCollection:any, 
    GlobalSettings:any, 
    GLOBAL:any, 
    DDO:any, 
    CacheController:any, 
    ComplexCacheParams:any, 
    ComplexStorageCache:any, 
    ComponentWidget:any, 
    asyncLoad:any, 
    RegisterClass:any, 
    ComponentURI:any, 
    waitUntil:any, 
    super:any, 
    _DOMCreateElement:any, 
    shortCode:any, 
    getType:any, 
    is_a:any, 
    _DataStringify:any, 
    serviceLoader:any, 
    componentLoader:any, 
    ObjectName:any, 
    isQCObjects_Class:any, 
    isQCObjects_Object:any, 
    NamespaceRef:any, 
    RegisterWidget:any, 
    RegisterWidgets:any, 
    range:any, 
    getDocumentLayout:any, 
    Export:any, 
    New:any, 
    Tag:any, 
    Ready:any, 
    methods:any, 
    // eslint-disable-next-line no-unused-vars
    set:(name:string, value:any) => void, 
    // eslint-disable-next-line no-unused-vars
    get:(name:string, _default?:any) => any, 
    start:any, 
    InheritClass:any, 
    Processor:any, 
    ComponentParams:any, 
    ComponentDoneResponse:any, 
    Component:any, 
    CONFIG:any, 
    ControllerParams:any, 
    Controller:any, 
    ViewParams:any, 
    View:any, 
    Service:any, 
    JSONService:any, 
    ConfigService:any, 
    VO:any, 
    EffectParams:any, 
    Effect:any, 
    TransitionEffect:any, 
    TimerParams:any, 
    Timer:any, 
    Toggle:any, 
    logger:any, 
    sdk:any, 
    global:any, 
    ClassFactory:any, 
    Package:any, 
    Import:any,
    _sdk_:any,
    ClassesList:any[], 
    PackagesList:any[],
    PackagesNameList:any[],
    ClassesNameList:any[]
} &  typeof self   & typeof global ;

export var _top: QCObjects = (
            (typeof module !== "undefined" && typeof module.exports !== "undefined" && module.exports) ||
            (typeof global !== "undefined" && global) ||
            (typeof globalThis !== "undefined" && globalThis) ||
            (typeof window !== "undefined" && window) ||
            (typeof self !== "undefined" && self) ||
            this
) as QCObjects;
(_top as any).lastCache = undefined;
export let componentsStack:IComponent[] = [];

export const resetTop = () => {
    const globalSettings = new GlobalSettings();
    _top = _CastProps(globalSettings, _top);
};

export const buildComponentsStack = () => {
    componentsStack = buildComponents(document as unknown as IQCObjectsElement);
};
export let configService:IConfigService;
export const setConfigService = (_configService:IConfigService) => {
    _top.global.configService = _configService;
    configService = _configService;
};

export const set = (name:string, value:any):void => {
    _top.set(name, value);
};

export const get = (name:string, _defaultValue?:any):any => {
    return _top.get(name, _defaultValue);
};