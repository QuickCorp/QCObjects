import { IComplexStorageCache, IComponent, IConfigService, IQCObjectsElement } from "types";
import { buildComponents } from "./ComponentFactory";

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
    set:any, 
    get:any, 
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
    Import:any
} |  typeof self   | typeof global ;

export var _top: QCObjects = (
    (typeof self !== "undefined" && self) ||
           (typeof window !== "undefined" && window) ||
           (typeof global !== "undefined" && global) ||
           this
 ) as QCObjects;
(_top as any).lastCache = undefined;
export let componentsStack:IComponent[] = [];

export const resetTop = (_top_: QCObjects) => {
    _top = _top_;
};

export const buildComponentsStack = () => {
    componentsStack = buildComponents(document as unknown as IQCObjectsElement);
};
export let configService:IConfigService;
export const setConfigService = (_configService:IConfigService) => {
    _top.global.configService = _configService;
    configService = _configService;
};