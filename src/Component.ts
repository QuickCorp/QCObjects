import { Base64 } from "./Base64";
import { _basePath_ } from "./basePath";
import { _Cast } from "./Cast";
import { ClassFactory } from "./ClassFactory";
import { _buildComponentsFromElements_, ComponentURI } from "./ComponentFactory";
import { _DataStringify } from "./DataStringify";
import { _domain_ } from "./domain";
import { _DOMCreateElement } from "./DOMCreateElement";
import { __getType__ } from "./getType";
import { InheritClass } from "./InheritClass";
import { _methods_, _protected_code_ } from "./introspection";
import { is_a } from "./is_a";
import { isQCObjects_Object } from "./isQCObjects";
import { logger } from "./Logger";
import { New } from "./New";
import { Package } from "./Package";
import { isBrowser } from "./platform";
import { Processor } from "./Processor";
import { __routing_params__, __valid_routing_way__, __valid_routings__ } from "./routings";
import { _top, componentsStack } from "./top";
import { CONFIG } from "./CONFIG";
import { serviceLoader } from "./serviceLoader";
import { _tag_filter_ } from "./tag_filter";
import { componentLoader } from "./componentLoader";
import { IComponent, IController, IEffect, IProcessor, IQCObjectsElement, IQCObjectsShadowedElement, IView, TBody, TComponentDoneResponse, TComponentParams, TComponentRouting, TComponentRoutings } from "types";

export class Component extends InheritClass implements IComponent {
    [key: string]: any;
    name!: string;
    templateURI!: string;
    tplsource!: string;
    tplextension!: string;
    template!: string;
    validRoutingWays: string[] = ["pathname", "hash", "search"];
    basePath = _basePath_;
    domain = _domain_;
    templateHandler = "DefaultTemplateHandler";
    processorHandler?: IProcessor;
    routingWay: string | null = null;
    routingNodes: (IQCObjectsElement | HTMLElement)[] = [];
    routings: TComponentRoutings = [];
    routingPath = "";
    routingPaths: string[] = [];
    _componentHelpers: any[] = [];
    subcomponents: any[] = [];
    splashScreenComponent?: IComponent = undefined;
    controller?: IController = undefined;
    view?: IView = undefined;
    effect?: IEffect = undefined;
    effectClass!: string;
    method = "GET";
    cached?: boolean = true;
    __promise__?: Promise<any> | null = null;
    data!: any;
    __namespace?: string = undefined;
    protected _parsedAssignmentText!: string;
    protected __shadowRoot: any;
    protected _serviceClassName: string | null = null;
    enableServiceClass?: boolean | undefined = true;
    serviceInstance: any;
    serviceData: any;
    shadowed?: boolean = false;
    container: any;
    innerHTML: any;
    reload: any;
    static subcomponents: any;
    assignRoutingParams?: boolean = true;
    responseTo?: string | undefined;
    static responseTo?: string | undefined;

    constructor({
        __parent__,
        templateURI = "",
        template,
        tplsource = "default",
        tplextension,
        url = "",
        name = "",
        method = "GET",
        data = {},
        reload = false,
        shadowed = false,
        cached = true,
        enableServiceClass,
        assignRoutingParams = true,
        _body = _DOMCreateElement("div"),
        __promise__ = null,
        __shadowRoot,
        body,
        shadowRoot,
        splashScreenComponent,
        controller,
        view
    }: TComponentParams) {
        if (arguments.length < 1) {
            throw Error("No arguments in component. You must at least give one argument.");
        }
        super({
            __parent__,
            templateURI,
            template,
            tplsource,
            tplextension,
            url,
            name,
            method,
            data,
            reload,
            shadowed,
            cached,
            enableServiceClass,
            assignRoutingParams,
            _body,
            __promise__,
            __shadowRoot,
            body,
            shadowRoot,
            splashScreenComponent,
            controller,
            view
        });
        const self = this;

        if (typeof self.name === "undefined") {
            logger.warn("A name is not defined for " + __getType__(self));
        }

        self.routingWay = CONFIG.get("routingWay");

        self.processorHandler = new Processor({
            component: self
        });

        /* assign body data attributes to data */
        self.data = (typeof self.data === "undefined" || self.data === null) ? ({}) : (self.data);
        self.data = Object.assign(self.data, self.dataAttributes);

        self.createServiceInstance()
            .then(() => {
                if (typeof self.__new__ === "function") {
                    self.__new__(self);
                }

                self._generateRoutingPaths(self.body)
                    .then(function () {
                        self._reroute_()
                            .then(function () {
                                return self.rebuild()
                                    .then(function () {
                                        logger.info(`Component._new_ The component ${self.name} was built successfully!`);
                                    }).catch(function (standardResponse) {
                                        logger.warn(`Component._new_ Something went wrong building the component ${self.name}`);
                                        console.error(standardResponse);
                                    });
                            }).catch((e: any) => {
                                throw Error(`Unexpected error ${e}`);
                            });
                    }).catch((e: any) => {
                        throw Error(`Unexpected error ${e}`);
                    });

            }).catch((e: any) => {
                throw Error(`Unexpected error. ${e}`);
            });

    }

    set cacheIndex(value) {
        // readonly
        logger.debug("[cacheIndex] This property is readonly");
    }

    get cacheIndex() {
        const self = this;
        const __routing_path__ = _DataStringify(self.routingPath);
        return Base64.encode(self.name + __routing_path__);
    }

    set parsedAssignmentText(value: string) {
        // readonly
        logger.debug("[parsedAssignmentText] This property is readonly");
    }

    get parsedAssignmentText(): string {
        const self = this;
        self._parsedAssignmentText = self.parseTemplate(self.template);
        if (typeof self._parsedAssignmentText === "undefined") {
            throw Error(`[Component][${this.name}][parsedAssignmentText] Could not generate content!`);
        }
        return self._parsedAssignmentText;
    }


    set shadowRoot(value: IQCObjectsShadowedElement) {
        const self = this;
        if (typeof self.__shadowRoot === "undefined") {
            self.__shadowRoot = value;
        } else {
            logger.debug("[shadowRoot] This property can only be assigned once!");
        }
    }

    get shadowRoot(): IQCObjectsShadowedElement {
        const self = this;
        return self.__shadowRoot as IQCObjectsShadowedElement;
    }


    set routingSelected(value: TComponentRouting[]) {
        logger.debug("[routingSelected] This is a read-only property of the component");
    }

    get routingSelected(): TComponentRouting[] {
        const self = this;
        return __valid_routings__(self.routings, self.routingPath);
    }

    set routingParams(value) {
        logger.debug("[routingParams] This is a read-only property of the component");
    }

    get routingParams(): object {
        const component = this;
        return [{}].concat(component.routingSelected.map(function (routing: any) {
            return __routing_params__(routing, component.routingPath);
        })).reduce(function (accumulator, colData) {
            return Object.assign(accumulator, colData);
        });
    }


    set serviceClassName(_serviceClassName: string) {
        this._serviceClassName = _serviceClassName;
    }

    get serviceClassName(): string | null {
        let _serviceClassName: string | null = "";
        if (isBrowser) {
            _serviceClassName = ((this.body as HTMLElement).getAttribute("serviceClass") !== null) ? ((this.body as HTMLElement).getAttribute("serviceClass")) : (
                this._serviceClassName
            );
        } else {
            _serviceClassName = this._serviceClassName;
        }
        return _serviceClassName;
    }

    protected get responseToData ():boolean {
        let _response_to_data_:boolean = false;
        if (isBrowser) {
            const responseToAttr = (this.body as HTMLElement).getAttribute("response-to");
            _response_to_data_ = responseToAttr === "data" || this.responseTo === "data";
        } else {
            _response_to_data_ = this.responseTo === "data";
        }
        return _response_to_data_;
    }

    protected get responseToTemplate ():boolean {
        let _response_to_template_:boolean = false;
        if (isBrowser) {
            const responseToAttr = (this.body as HTMLElement).getAttribute("response-to");
            _response_to_template_ = responseToAttr === "template" || this.responseTo === "template";
        } else {
            _response_to_template_ = this.responseTo === "template";
        }
        return _response_to_template_;
    }    

    createServiceInstance(): Promise<JSON | string | null> {
        const component = this;
        let data = this.data;
        let __serviceClass: any;
        const __classDefinition = component.getClass().__definition;
        const _serviceClassName = component.serviceClassName;

        return new Promise(function (resolve, reject) {
            /* __enable_service_class__ = true by default */
            const __enable_service_class__ = component.enableServiceClass;
            let _response_to_data_ = component.responseToData;
            let _response_to_template_ = component.responseToTemplate;

            if (__enable_service_class__ && _serviceClassName !== null) {
                __serviceClass = ClassFactory(_serviceClassName);
            }
            if (!_response_to_data_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
                _response_to_data_ = (__classDefinition.responseTo === "data");
            } else if (!_response_to_data_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
                _response_to_data_ = ((ClassFactory("Component") as Component).responseTo === "data");
            }
            if (!_response_to_template_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
                _response_to_template_ = (__classDefinition.responseTo === "template");
            } else if (!_response_to_template_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
                _response_to_template_ = ((ClassFactory("Component") as Component).responseTo === "template");
            }

            if (typeof __serviceClass !== "undefined" &&
                (typeof __enable_service_class__ !== "undefined" &&
                    __enable_service_class__ === true) &&
                (_response_to_data_ || _response_to_template_)
            ) {
                logger.info("Loading service " + _serviceClassName);
                const serviceInstance = New(__serviceClass, {
                    data
                });
                (serviceLoader(serviceInstance) as Promise<any>)?.then(function ({
                    service
                }: { request: any, service: any }) {
                    let serviceResponse;
                    if (typeof service.JSONresponse !== "undefined" && service.JSONresponse !== null) {
                        serviceResponse = service.JSONresponse;
                    } else {
                        serviceResponse = service.template;
                    }
                    if (_response_to_data_) {
                        if (typeof data === "object" && typeof serviceResponse === "object") {
                            data = Object.assign(data, serviceResponse);
                        } else {
                            data = serviceResponse;
                        }
                        component.data = data;
                    }
                    component.serviceInstance = serviceInstance;
                    component.serviceData = data;

                    if (_response_to_template_) {
                        component.template = serviceResponse;
                    }
                    resolve(serviceResponse);
                }, function (rejectedResponse: Error) {
                    logger.debug(`Service loading rejected for ${_serviceClassName} in ${component.name}`);
                    reject(rejectedResponse);
                }).catch(function (e: any) {
                    logger.debug("Something went wroing while trying to load the service " + _serviceClassName);
                    throw Error(`Error loading ${_serviceClassName} for ${component.name}. Detail: ${e}`);
                });
            } else {
                resolve(null);
            }
        });
    }

    _bindroute_() {
        const _component_ = this;
        if (!(_component_ as any)._bindroute_.loaded) {
            if (isBrowser) {

                (_component_.hostElements("a") as unknown as HTMLAnchorElement[]).map(function (a: HTMLAnchorElement) {
                    (a as any).oldclick = a.onclick;
                    a.onclick = function (e) {
                        let _ret_ = true;
                        if (!_top.global.get("routingPaths")) {
                            _top.global.set("routingPaths", []);
                        }
                        const routingWay = CONFIG.get("routingWay");
                        const routingPath = (e.target as any)[routingWay];
                        if (_top.global.get("routingPaths").includes(routingPath) &&
                            (e.target as any)[routingWay] !== (location as any)[routingWay] &&
                            (e.target as HTMLAnchorElement).href !== document.location.href
                        ) {
                            logger.debug("A ROUTING WAS FOUND: " + routingPath);
                            window.history.pushState({
                                href: (e.target as HTMLAnchorElement).href
                            }, (e?.target as HTMLAnchorElement)?.href, (e.target as HTMLAnchorElement).href);
                            Component.route().catch((e) => { throw Error(`Unexpected error: ${e}`); });
                            _ret_ = false;
                        } else {
                            logger.debug("NO ROUTING FOUND FOR: " + routingPath);
                        }
                        if (typeof (e.target as any).oldclick !== "undefined" && typeof (e.target as any).oldclick === "function") {
                            (e.target as any).oldclick.call(e.target, e);
                        }
                        return _ret_;
                    };
                    return null;
                });

            } else {
                // not yet implemented.
            }
            (_component_ as any)._bindroute_.loaded = true;
        } else {
            logger.debug(`Routes already bound to popstate events for ${_component_.name}`);
        }

    }

    done(standardResponse?: TComponentDoneResponse): Promise<TComponentDoneResponse> {
        const _ret_ = new Promise<TComponentDoneResponse>((resolve) => {
            if (typeof standardResponse !== "undefined") {
                const { request, component } = standardResponse;
                resolve({ request, component });
            } else {
                resolve({ request: undefined, component: undefined });
            }
        });
        return _ret_;
    }

    createControllerInstance(): Promise<{ component: Component, controller: IController }> {
        let _Controller: any;
        if (isBrowser) {
            if (typeof this.body === "undefined") {
                throw new Error("The component has no body");
            }
            var controllerName = (this.body as HTMLElement).getAttribute("controllerClass");
            if (!controllerName) {
                controllerName = "Controller";
            }
            _Controller = ClassFactory(controllerName);
            if (typeof _Controller !== "undefined") {
                this.controller = New(_Controller, {
                    component: this
                });
            }

        }

        return new Promise((resolve, reject) => {
            if (isBrowser) {
                if (typeof _Controller !== "undefined" && typeof this.controller !== "undefined") {
                    if (typeof (this.controller).done === "function") {
                        try {
                            this.controller.done.call(this.controller);
                        } catch (e: any) {
                            throw Error(e);
                        }
                    } else {
                        logger.debug(`${controllerName} does not have a done() method.`);
                        reject(new Error(`${controllerName} does not have a done() method.`));
                    }
                    if (typeof this.controller.createRoutingController === "function") {
                        this.controller.createRoutingController.call(this.controller);
                    } else {
                        logger.debug(`${controllerName} does not have a createRoutingController() method.`);
                    }
                }
            }
            resolve({ component: this, controller: this.controller as IController });
        });
    }

    createEffectInstance(): Promise<{ component: Component, effect: IEffect }> {
        const _component_ = this;
        return new Promise(function (resolve) {
            if (isBrowser) {
                const effectClassName = (_component_.body as HTMLElement)?.getAttribute("effectClass");
                let applyEffectTo = (_component_.body as HTMLElement)?.getAttribute("apply-effect-to");
                applyEffectTo = (applyEffectTo !== null) ? (applyEffectTo) : ("load");
                if (effectClassName !== null && applyEffectTo === "observe") {
                    _component_.applyObserveTransitionEffect(effectClassName);
                } else if (effectClassName !== null && applyEffectTo === "load") {
                    _component_.applyTransitionEffect(effectClassName);
                }
            }
            resolve({ component: _component_, effect: _component_.effect as IEffect });
        });
    }

    createViewInstance(): Promise<{ component: Component, view: IView }> {
        const _component_ = this;
        return new Promise(function (resolve) {
            const viewName = (isBrowser) ? ((_component_.body as HTMLElement).getAttribute("viewClass")) : (null);
            if (viewName !== null) {
                const _View = ClassFactory(viewName);
                if (typeof _View !== "undefined") {
                    _component_.view = New(_View, {
                        component: _component_
                    }); // Initializes the main view for the component
                    if (Object.hasOwnProperty.call(_component_.view, "done") && typeof _component_.view?.done === "function") {
                        _component_.view?.done.call(_component_.view);
                    }
                }

            }
            resolve({ component: _component_, view: _component_.view as IView });

        });
    }

    __done__(): Promise<unknown> {
        const _component_ = this;
        const componentDone = function () {
            if (typeof _component_ === "undefined") {
                throw new Error("componentDone() has lost its context");
            }
            if (typeof _component_.body === "undefined") {
                throw new Error("The component has no body");
            }

            (async () => {
                await _component_.createViewInstance();
                await _component_.createControllerInstance();
                await _component_.createEffectInstance();
            })()
            .catch ((e:any) => {
                throw new Error (`Unknown error ${e}.`);
            });

            logger.debug(`Trying to run component helpers for ${_component_.name}...`);
            try {
                _component_.runComponentHelpers();
                logger.debug(`Component helpers for ${_component_.name} executed.`);
            } catch (e: any) {
                logger.debug(`Component helpers for ${_component_.name} could not be executed.`);
                throw Error(e);
            }

            _component_.subcomponents = _component_.__buildSubComponents__();

            _component_._bindroute_();
            if (isBrowser) {
                (_component_.body as HTMLElement).setAttribute("loaded", "true");
            }
        };

        return new Promise(function (resolve, reject) {
            try {
                resolve(componentDone.call(_component_));
            } catch (e:any) {
                reject(new Error (e));
            }
        });

    }

    hostElements(tagFilter: string): (IQCObjectsElement | HTMLElement | IQCObjectsShadowedElement)[] {
        const _component_ = this;
        let elementList: (IQCObjectsElement | HTMLElement | IQCObjectsShadowedElement)[] = [];
        if (isBrowser) {
            elementList = (_component_.shadowed && (typeof _component_.shadowRoot !== "undefined")) ? (
                _component_.shadowRoot.subelements(tagFilter) as IQCObjectsShadowedElement[]
            ) : (
                (_component_.body as IQCObjectsElement).subelements(tagFilter)
            );

        }
        return elementList;
    }

    get subtags(): (HTMLElement | IQCObjectsElement | IQCObjectsShadowedElement)[] {
        const _component_ = this;
        const tagFilter = _tag_filter_;
        return _component_.hostElements(tagFilter);
    }

    get bodyAttributes() {
        const _component_ = this;
        const c = _component_.body;
        return (isBrowser) ? ([...(c as HTMLElement).getAttributeNames()].map(a => { return { [a]: (c as HTMLElement).getAttribute(a) }; }).reduce((accumulator, colData) => { return Object.assign(accumulator, colData); })) : ({});
    }

    get dataAttributes() {
        const _component_ = this;
        const c = _component_.body;
        return (isBrowser) ? ([{}].concat([...(c as HTMLElement).getAttributeNames()].filter(n => n.startsWith("data-")).map(a => { return { [a.split("-")[1]]: (c as HTMLElement).getAttribute(a) }; })).reduce((accumulator, colData) => { return Object.assign(accumulator, colData); })) : ({});
    }

    __buildSubComponents__(rebuildObjects = false):any {
        const _component_: Component = this as Component;
        let elementList = _component_.subtags;
        if (!rebuildObjects) {
            elementList = (elementList as HTMLElement[]).filter((t: HTMLElement) => t.getAttribute("loaded") !== "true");
        }
        if ((typeof _component_ !== "undefined") || (_component_ as Component).subcomponents.length < 1) {
            _component_.subcomponents = _buildComponentsFromElements_(elementList, _component_);
        }
        return _component_.subcomponents;
    }

    fail(standardResponse: { error: any; component: Component; }): Promise<{ error: any; component: Component; }> {
        const _ret_ = new Promise<{ error: any; component: Component; }>((resolve, reject) => {
            if (typeof standardResponse !== "undefined") {
                const { error, component } = standardResponse;
                resolve({ error, component });
            } else {
                reject();
            }
        });
        return _ret_;
    }

    set(key: string, value: any) {
        this[key] = value;
    }

    get(key: string, _defaultValue?: string):any {
        return this[key] || _defaultValue;
    }

    feedComponent(): Promise<any> {
        const _component_ = this;
        logger.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
        const _feedComponent_InBrowser = function (_component_: Component):any {
            if (typeof _component_.container === "undefined" && typeof _component_.body === "undefined") {
                logger.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_.name));
                return;
            }
            const container = (typeof _component_.container === "undefined" || _component_.container === null) ? (_component_.body) : (_component_.container);
            const parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
            if (_component_.shadowed) {
                logger.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_.name));
                logger.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                const tmp_shadowContainer = _DOMCreateElement("div");
                container.subelements("[slot]").map(
                    function (c: { parentElement: any; }) {
                        if (c.parentElement === container) {
                            tmp_shadowContainer.appendChild(c as any);
                        }
                    });
                logger.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                const shadowContainer = _DOMCreateElement("div");
                shadowContainer.classList.add("shadowHost");
                try {
                    _component_.shadowRoot = shadowContainer.attachShadow({
                        mode: "open"
                    }) as IQCObjectsShadowedElement;
                } catch (e) {
                    try {
                        logger.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_.name));
                        _component_.shadowRoot = shadowContainer.shadowRoot as IQCObjectsShadowedElement;
                    } catch (e) {
                        logger.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_.name));
                    }
                }
                if (typeof _component_.shadowRoot !== "undefined" && _component_.shadowRoot !== null) {
                    if (_component_.reload) {
                        logger.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                        if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                            shadowContainer.shadowRoot.innerHTML = _component_.innerHTML;
                        }
                    } else {
                        tmp_shadowContainer.innerHTML = _component_.parseTemplate(tmp_shadowContainer.innerHTML);
                        logger.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                        if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                            shadowContainer.shadowRoot.innerHTML += _component_.innerHTML;
                        }
                    }
                    logger.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                    shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
                    logger.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_.name));
                    const qs = container.querySelector(".shadowHost");
                    if (!(typeof qs !== "undefined" && qs !== null)) {
                        container.appendChild(shadowContainer);
                    } else {
                        logger.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_.name));
                        if (_component_.shadowRoot !== null && shadowContainer.shadowRoot !== null) {
                            _component_.shadowRoot.innerHTML = shadowContainer.shadowRoot.innerHTML;
                        }
                    }
                } else {
                    logger.warn("Shadowed COMPONENT {{NAME}} is bad configured".replace("{{NAME}}", _component_.name));
                }
            } else {
                if (_component_.reload) {
                    logger.debug("FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                    container.innerHTML = _component_.innerHTML;
                } else if (container && _component_) {
                    logger.debug("ADDING COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                    container.innerHTML += _component_.innerHTML;
                } else {
                    logger.warn("COMPONENT {{NAME}} is not added to the DOM".replace("{{NAME}}", _component_.name));
                }
            }

        };

        const _feedComponent_InNode = function (_component_: Component):any {
            const parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
        };

        let _ret_;
        if (!is_a(_component_, "Component")) {
            logger.warn("Trying to feed a non component object");
            return Promise.reject(new Error (`Trying to feed a non component object ${typeof _component_}`));
        }
        return new Promise <any> ((resolve, reject) => {
            if (isBrowser) {
                try {
                    _ret_ = _feedComponent_InBrowser(_component_);
                    resolve(_ret_);
                } catch (e:any) {
                    reject (new Error(e));
                }
            } else {
                try {
                    _ret_ = _feedComponent_InNode(_component_);
                    resolve(_ret_);
                } catch (e:any){
                    reject (new Error (e));
                }

            }

        });
    }

    rebuild(): Promise<{ request?: XMLHttpRequest, component: Component }> {
        const _component = this as Component;
        var _promise = new Promise<{ request?: XMLHttpRequest, component: Component }>(function (resolve, reject) {
            if (typeof _component === "undefined" || _component === null) {
                reject(new Error ("Component is undefined"));
            }
            if (isQCObjects_Object(_component) && is_a(_component, "Component")) {
                switch (true) {
                    case (_component.get("tplsource") === "none"):
                        logger.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
                        var standardResponse = {
                            request: undefined,
                            component: _component
                        };
                        _component.__done__().then(function () {
                            if (typeof _component.done === "function") {
                                _component.done.call(_component, standardResponse)
                                .catch((e:any)=> {
                                    logger.debug(`It was an error while calling done() in ${_component.name}: ${e}`);
                                });
                            }
                            resolve.call(_promise, standardResponse);
                        }, function () {
                            reject.call(_promise, standardResponse);
                        });
                        break;
                    case (_component.get("tplsource") === "inline"):
                        logger.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
                        (async (_component) => {
                            await _component.feedComponent.bind(_component)();
                        })(_component)
                        .catch((e:any)=> {
                            logger.debug(`It was not possible to feed the component ${_component.name}: ${e}`);
                        });
                    var standardResponse = {
                            request: undefined,
                            component: _component
                        };
                        _component.__done__().then(async () => {
                            if (typeof _component.done === "function") {
                                await _component.done(standardResponse);
                            }
                            resolve.call(_promise, standardResponse);
                        }, function () {
                            reject.call(_promise, standardResponse);
                        });
                        break;
                    case (_component.get("tplsource") === "default" &&
                        _component.get("templateURI") !== ""):
                        _component.set("url", _component.get("basePath") + _component.get("templateURI"));
                        (componentLoader(_component, false) as Promise<any>)?.then(
                            function (standardResponse: any) {
                                resolve.call(_promise, standardResponse);
                            },
                            function (standardResponse: any) {
                                reject.call(_promise, standardResponse);
                            });
                        break;
                    case (_component.get("tplsource") === "external" &&
                        _component.get("templateURI") !== ""):
                        _component.set("url", _component.get("templateURI"));
                        (componentLoader(_component, false) as Promise<any>).then(
                            function (standardResponse: any) {
                                resolve.call(_promise, standardResponse);
                            },
                            function (standardResponse: any) {
                                reject.call(_promise, standardResponse);
                            });
                        break;
                    case _component.get("tplsource") === "default" && _component.get("templateURI", "") === "":
                        logger.debug(`Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                        reject.call(_promise, `Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                        break;
                    default:
                        logger.debug("Component " + _component.name + " will not be rebuilt because no templateURI is present");
                        reject.call(_promise, {
                            request: null,
                            component: _component
                        });
                        break;
                }

            }
        });
        return _promise;
    }

    Cast(oClass: any) {
        /* Cast method for components has been deprecated. Don't use this method, it is available only for compatibility purposes */
        const o = _methods_(oClass).map(m => m.name.replace(/bound /g, "")).map(m => {
            return {
                [m]: oClass[m].bind(this)
            };
        }).reduce((c, p) => Object.assign(c, p), {});
        return _Cast(this, o);
    }

    route () {
        return (this.constructor as typeof Component).route();
    }

    static route() {
        const componentClass = this; /* is can be class or object */
        let _route_promise_;
        const isValidInstance = !!((isQCObjects_Object(componentClass) && is_a(componentClass, "Component")));
        const __route__ = function (componentList: any[]) {
            const _componentNames_: any[] = [];
            const _promises_ = componentList.filter(function (rc: any) {
                return typeof rc !== "undefined";
            }).map(function (rc: Component): Promise<void> {
                if (typeof rc.name !== "undefined") {
                    _componentNames_.push(rc.name);
                } else {
                    throw new Error(__getType__(rc) + " does not have a name");
                }
                return new Promise(function (resolve, reject) {
                    if (typeof rc !== "undefined" && !!rc._reroute_) {
                        rc._reroute_()
                            .then(function () {
                                rc.reload = true;
                                rc.rebuild()
                                .then(()=> {
                                    resolve();
                                })
                                .catch((e:any) => {
                                    logger.debug(`Error ${e}`);
                                });
                                return;
                            })
                            .then(function () {
                                if (Object.hasOwnProperty.call(rc, "subcomponents") &&
                                    typeof rc.subcomponents !== "undefined" &&
                                    rc.subcomponents.length > 0
                                ) {
                                    logger.debug("LOOKING FOR ROUTINGS IN SUBCOMPONENTS FOR: " + rc.name);
                                    return __route__.call(rc, rc.subcomponents);
                                } else {
                                    logger.debug("No subcomponents to look for routings in: " + rc.name);
                                    if (rc.subtags.length > 0) {
                                        rc.subcomponents = rc.__buildSubComponents__(true);
                                    }
                                    resolve();
                                }
                            }).catch ((e:any) => {
                                logger.debug(`Error: ${e}`);
                            });
                    } else if (typeof rc !== "undefined") {
                        reject(new Error ("Component " + rc.name + " is not an instance of Component"));
                    }
                    return;
                });
            });
            return Promise.all(_promises_)
                .then(function () {
                    logger.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
                }).catch(function (err) {
                    logger.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
                });
        };
        if (isValidInstance || !!componentsStack) {
            if (isValidInstance) {
                logger.debug("loading routings for instance " + componentClass.name);
            }
            _route_promise_ = __route__.call(componentClass, (isValidInstance) ? (componentClass.subcomponents) : (componentsStack));
        } else {
            logger.debug("An undetermined result expected if load routings. So will not be loaded this time.");
            throw Error("There is no valid instance and no components stack available to apply rountings");
        }
        return _route_promise_;
    }

    fullscreen() {
        if (isBrowser) {
            const elem:HTMLElement = this.body as HTMLElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen()
                .catch ((e:any) => {
                    throw new Error (`An error ocurred when requesting fullscreen: ${e}`);
                });
            } else if ((elem as any).mozRequestFullScreen) {
                /* Firefox */
                (elem as any).mozRequestFullScreen();
            } else if ((elem as any).webkitRequestFullscreen) {
                /* Chrome, Safari & Opera */
                (elem as any).webkitRequestFullscreen();
            } else if ((elem as any).msRequestFullscreen) {
                /* IE/Edge */
                (elem as any).msRequestFullscreen();
            }
        } else {
            // not yet implemented.
        }
    }

    closefullscreen() {
        if (isBrowser) {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                (document as any).mozCancelFullScreen();
            } else if ((document as any).webkitExitFullscreen) {
                (document as any).webkitExitFullscreen();
            } else if ((document as any).msExitFullscreen) {
                (document as any).msExitFullscreen();
            }
        } else {
            // noy yet implemented.
        }
    }

    _generateRoutingPaths(componentBody: TBody) {
        const component = this;
        return new Promise<void>(function (resolve) {
            if (isBrowser) {
                if (__valid_routing_way__(component.validRoutingWays, component.routingWay || "")) {
                    if (typeof componentBody !== "undefined") {
                        component.innerHTML = (componentBody as HTMLElement)?.innerHTML;
                        component.routingNodes = (componentBody as IQCObjectsElement)?.subelements("routing");
                        component.routings = [];
                        component.routingNodes.map( (routingNode):any => {
                            const attributeNames = (routingNode as HTMLElement).getAttributeNames();
                            const routing = {} as TComponentRouting;
                            attributeNames.map( (attributeName: any, a: string | number):any => {
                                (routing as any)[attributeNames[a as any]] = (routingNode as HTMLElement).getAttribute(attributeNames[a as any]);
                            });
                            component.routings.push(routing as never);
                            if (!component.routingPaths) {
                                component.routingPaths = [];
                            }
                            if (!component.routingPaths.includes(routing.path as never)) {
                                component.routingPaths.push(routing.path as never);
                            }
                            if (!_top.global.get("routingPaths")) {
                                _top.global.set("routingPaths", []);
                            }
                            if (!_top.global.get("routingPaths").includes(routing.path)) {
                                _top.global.get("routingPaths").push(routing.path);
                            }
                            return routingNode;
                        });
                    }
                }
            } else {
                // not yet implemented.
            }
            resolve();

        });
    }

    parseTemplate(template: any):string {
        const _self = this;
        let _parsedAssignmentText:string;
        const value = template;
        if (Object.hasOwnProperty.call(_self, "templateHandler")) {
            const templateHandlerName = _self.templateHandler;
            logger.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
            const templateHandlerClass = ClassFactory(templateHandlerName);
            const templateInstance = New(templateHandlerClass, {
                component: _self,
                template: value
            });
            templateInstance.component = _self;
            let selfData = _self.data;
            if (Object.hasOwnProperty.call(_self, "assignRoutingParams") && _self.assignRoutingParams) {
                try {
                    selfData = Object.assign(selfData, _self.routingParams);
                } catch (e) {
                    logger.debug("[parseTemplate] it was not possible to assign the routing params to the template");
                }
            }
            _parsedAssignmentText = templateInstance.assign(selfData);
        } else {
            logger.debug(`[Component][${this.name}][parseTemplate] No value for templateHandler. Using raw content...`);
            _parsedAssignmentText = value;
        }
        return _parsedAssignmentText;
    }

    _reroute_(): Promise<Component> {
        /* This method set the selected routing and makes the switch to the templateURI */
        const rc = this;
        return new Promise(function (resolve) {
            if (isBrowser) {
                if (__valid_routing_way__(rc.validRoutingWays, rc.routingWay || "")) {
                    rc.routingPath = (location as any)[rc.routingWay as string];
                    rc.routingSelected.map( (routing: TComponentRouting, ):TComponentRouting => {
                        const componentURI = ComponentURI({
                            "COMPONENTS_BASE_PATH": CONFIG.get("componentsBasePath"),
                            "COMPONENT_NAME": routing.name.toString(),
                            "TPLEXTENSION": (Object.hasOwnProperty.call(routing, "tplextension")) ? (routing.tplextension || "") : (rc.tplextension),
                            "TPL_SOURCE": "default" /* here is always default in order to get the right uri */
                        });
                        rc.templateURI = componentURI;
                        return routing;
                    });
                    if (rc.routingSelected.length > 0) {
                        rc.template = "";
                        if (typeof rc.body !== "undefined" && rc.body !== null){
                            (rc.body as HTMLElement).innerHTML = "";
                        }
                    }
                }
            }
            resolve(rc);

        });
    }

    lazyLoadImages() {
        if (isBrowser) {
            const component = this;
            const _componentRoot = component.componentRoot as IQCObjectsShadowedElement;
            if (typeof _componentRoot !== "undefined" && _componentRoot !== null){ 
                const _imgLazyLoaded = [..._componentRoot.subelements("img[lazy-src]")];
                const _lazyLoadImages = function (image: Element | HTMLElement) {
                    image.setAttribute("src", image.getAttribute("lazy-src")?.toString() as string);
                    (image as HTMLImageElement).onload = () => {
                        image.removeAttribute("lazy-src");
                    };
                };
                if ("IntersectionObserver" in window) {
                    const observer = new IntersectionObserver((items, observer) => {
                        items.forEach((item) => {
                            if (item.isIntersecting) {
                                _lazyLoadImages(item.target);
                                observer.unobserve(item.target);
                            }
                        });
                    });
                    _imgLazyLoaded.map(function (img) {
                        return observer.observe(img as unknown as HTMLImageElement);
                    });
                } else {
                    (_imgLazyLoaded as (HTMLElement | Element)[]).map(_lazyLoadImages);
                }
            }
        } else {
            // not yet implemented
        }
        return null;
    }

    applyTransitionEffect(effectClassName: string) {
        const _Effect = ClassFactory(effectClassName);
        if (typeof _Effect === "undefined") {
            throw Error(`${effectClassName} not found.`);
        }
        if (typeof _Effect !== "undefined" && is_a(_Effect, "TransitionEffect")) {
            this.effect = New(_Effect, {
                component: this
            });
            (this.effect as any)?.apply((this.effect as any)?.defaultParams);
        } else {
            logger.debug(`${effectClassName} is ${__getType__(_Effect)} but is not a TransitionEffect`);
        }
    }

    applyObserveTransitionEffect(effectClassName: any) {
        if (isBrowser) {
            const component = this;
            const _componentRoot = component.componentRoot;
            const _applyEffect_ = function () {
                component.applyTransitionEffect(effectClassName);
            };
            if ("IntersectionObserver" in window) {
                const observer = new IntersectionObserver((items, observer) => {
                    items.forEach((item) => {
                        if (item.isIntersecting) {
                            _applyEffect_();
                            observer.unobserve(item.target);
                        }
                    });
                });
                observer.observe(_componentRoot as Element);
            } else {
                _applyEffect_();
            }
        } else {
            // not yet implemented
        }

    }

    get componentRoot ():TBody {
        return (this.shadowed) ? (this.shadowRoot) : (this.body);
    }

    scrollIntoHash() {
        if (isBrowser) {
            const component = this;
            if (document.location.hash !== "") {
                const _componentRoot = component.componentRoot;
                ((_componentRoot as IQCObjectsShadowedElement)?.subelements(document.location.hash) as unknown as Element[]).map(
                     (element: Element):any  => {
                        if (typeof element.scrollIntoView === "function") {
                            element.scrollIntoView(
                                CONFIG.get("scrollIntoHash", {
                                    behavior: "auto",
                                    block: "top",
                                    inline: "top"
                                })
                            );
                        }
                        return element;
                    }
                );
            }
        } else {
            // not yet implemented
        }
    }

    i18n_translate() {
        if (isBrowser) {
            if (CONFIG.get("use_i18n")) {
                const component = this;
                const _componentRoot = component.componentRoot as IQCObjectsShadowedElement;
                const lang1 = CONFIG.get("lang", "en");
                const lang2 = navigator.language.slice(0, 2);
                const i18n = _top.global.get("i18n");
                if ((lang1 !== lang2) && (typeof i18n === "object" && Object.hasOwnProperty.call(i18n, "messages"))) {
                    const callback_i18n =  () => {
                        return new Promise<void>(function (resolve) {
                            const messages = i18n.messages.filter(function (message: any) {
                                return Object.hasOwnProperty.call(message, lang1) && Object.hasOwnProperty.call(message, lang2);
                            });
                            (_componentRoot?.subelements("ul,li,h1,h2,h3,a,b,p,input,textarea,summary,details,option,component") as HTMLElement[])
                                .map( (element: HTMLElement):HTMLElement => {
                                    messages.map(function (message: { [x: string]: any; }) {
                                        let _innerHTML = element.innerHTML;
                                        _innerHTML = _innerHTML?.replace(new RegExp(`${message[lang1]}`, "g"), message[lang2]);
                                        element.innerHTML = _innerHTML;
                                        return null;
                                    });
                                    return element;
                                });
                            resolve();
                        });
                    };
                    callback_i18n.call(component).then(function () {
                        logger.debug("i18n loaded for component: " + component.name);
                    }).catch((e:any) => {throw new Error (`An error ocurred when parsing i18n: ${e}.`);});

                }
            }
        } else {
            // not yet implemented
        }
    }

    addComponentHelper(componentHelper: any) {
        const component = this;
        component._componentHelpers.push(componentHelper as never);
    }

    runComponentHelpers() {
        if (isBrowser) {
            const component = this;
            let __component_helpers__ = [];
            /*
             * BEGIN use i18n translation
             */
            __component_helpers__.push(component.i18n_translate.bind(component));
            /*
             * END use i18n translation
             */

            /*
             * BEGIN component scrollIntoHash
             */
            __component_helpers__.push(component.scrollIntoHash.bind(component));
            /*
             * END component scrollIntoHash
             */

            /*
             * BEGIN component images lazy-load
             */

            __component_helpers__.push(component.lazyLoadImages.bind(component));

            /*
             * END component images lazy-load
             */

            __component_helpers__ = __component_helpers__.concat(component._componentHelpers);

            __component_helpers__.map(
                function (_component_helper_) {
                    logger.debug(`Executing ${_component_helper_.name} as component helper for ${component.name}...`);
                    _component_helper_();
                }
            );

        } else {
            // not yet implemented
        }

    }

}

Package("com.qcobjects", [
    Component
]);

(_methods_)(ClassFactory("Component")).map(function (__c__) {
    (_protected_code_)(__c__);
});
