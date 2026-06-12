"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const Base64_1 = require("./Base64");
const basePath_1 = require("./basePath");
const Cast_1 = require("./Cast");
const ClassFactory_1 = require("./ClassFactory");
const ComponentFactory_1 = require("./ComponentFactory");
const DataStringify_1 = require("./DataStringify");
const domain_1 = require("./domain");
const DOMCreateElement_1 = require("./DOMCreateElement");
const getType_1 = require("./getType");
const InheritClass_1 = require("./InheritClass");
const introspection_1 = require("./introspection");
const is_a_1 = require("./is_a");
const isQCObjects_1 = require("./isQCObjects");
const Logger_1 = require("./Logger");
const New_1 = require("./New");
const Package_1 = require("./Package");
const platform_1 = require("./platform");
const Processor_1 = require("./Processor");
const routings_1 = require("./routings");
const top_1 = require("./top");
const CONFIG_1 = require("./CONFIG");
const serviceLoader_1 = require("./serviceLoader");
const tag_filter_1 = require("./tag_filter");
const componentLoader_1 = require("./componentLoader");
class Component extends InheritClass_1.InheritClass {
    static shadowed = false;
    static cached = true;
    name;
    templateURI;
    url;
    tplsource;
    tplextension;
    template;
    validRoutingWays = ["pathname", "hash", "search"];
    basePath = basePath_1._basePath_;
    domain = domain_1._domain_;
    templateHandler = "DefaultTemplateHandler";
    processorHandler;
    routingWay = null;
    routingNodes = [];
    routings = [];
    routingPath = "";
    routingPaths = [];
    _componentHelpers = [];
    subcomponents = [];
    splashScreenComponent = undefined;
    controller = undefined;
    routingController = undefined;
    view = undefined;
    effect = undefined;
    effectClass;
    method = "GET";
    cached = true;
    __promise__ = null;
    data;
    __namespace = undefined;
    _parsedAssignmentText;
    __shadowRoot;
    _serviceClassName = null;
    enableServiceClass = true;
    serviceInstance;
    serviceData;
    shadowed = false;
    container;
    innerHTML;
    reload;
    static subcomponents;
    assignRoutingParams = true;
    responseTo;
    static responseTo;
    constructor({ __parent__, templateURI = "", template, tplsource = "default", tplextension, url = "", name = "", method = "GET", data = {}, reload = false, shadowed = false, cached = true, enableServiceClass, assignRoutingParams = true, _body = (0, DOMCreateElement_1._DOMCreateElement)("div"), __promise__ = null, __shadowRoot, body, shadowRoot, splashScreenComponent, controller, view }) {
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
        if (typeof name !== "undefined") {
            self.name = name;
        }
        if (typeof self.name === "undefined" && typeof name === "undefined") {
            Logger_1.logger.warn("A name is not defined for " + (0, getType_1.__getType__)(self));
        }
        self.routingWay = CONFIG_1.CONFIG.get("routingWay");
        self.processorHandler = new Processor_1.Processor({
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
                        Logger_1.logger.info(`Component._new_ The component ${self.name} was built successfully!`);
                    }).catch(function (standardResponse) {
                        Logger_1.logger.warn(`Component._new_ Something went wrong building the component ${self.name}`);
                        console.error(`Component._new_ Something went wrong building the component ${self.name}`, standardResponse);
                    });
                }).catch((e) => {
                    throw Error(`Unexpected error ${e}`);
                });
            }).catch((e) => {
                throw Error(`Unexpected error ${e}`);
            });
        }).catch((e) => {
            throw Error(`Unexpected error. ${e}`);
        });
    }
    set cacheIndex(value) {
        // readonly
        Logger_1.logger.debug("[cacheIndex] This property is readonly");
    }
    get cacheIndex() {
        const self = this;
        const __routing_path__ = (0, DataStringify_1._DataStringify)(self.routingPath);
        return Base64_1.Base64.encode(self.name + __routing_path__);
    }
    set parsedAssignmentText(value) {
        // readonly
        Logger_1.logger.debug("[parsedAssignmentText] This property is readonly");
    }
    get parsedAssignmentText() {
        const self = this;
        self._parsedAssignmentText = self.parseTemplate(self.template);
        if (typeof self._parsedAssignmentText === "undefined") {
            throw Error(`[Component][${this.name}][parsedAssignmentText] Could not generate content!`);
        }
        return self._parsedAssignmentText;
    }
    set shadowRoot(value) {
        const self = this;
        if (typeof self.__shadowRoot === "undefined") {
            self.__shadowRoot = value;
        }
        else {
            Logger_1.logger.debug("[shadowRoot] This property can only be assigned once!");
        }
    }
    get shadowRoot() {
        const self = this;
        return self.__shadowRoot;
    }
    set routingSelected(value) {
        Logger_1.logger.debug("[routingSelected] This is a read-only property of the component");
    }
    get routingSelected() {
        const self = this;
        return (0, routings_1.__valid_routings__)(self.routings, self.routingPath);
    }
    set routingParams(value) {
        Logger_1.logger.debug("[routingParams] This is a read-only property of the component");
    }
    get routingParams() {
        const component = this;
        return [{}].concat(component.routingSelected.map(function (routing) {
            return (0, routings_1.__routing_params__)(routing, component.routingPath);
        })).reduce(function (accumulator, colData) {
            return Object.assign(accumulator, colData);
        });
    }
    set serviceClassName(_serviceClassName) {
        this._serviceClassName = _serviceClassName;
    }
    get serviceClassName() {
        let _serviceClassName = "";
        if (platform_1.isBrowser) {
            _serviceClassName = (this.body.getAttribute("serviceClass") !== null) ? (this.body.getAttribute("serviceClass")) : (this._serviceClassName);
        }
        else {
            _serviceClassName = this._serviceClassName;
        }
        return _serviceClassName;
    }
    get responseToData() {
        let _response_to_data_ = false;
        if (platform_1.isBrowser) {
            const responseToAttr = this.body.getAttribute("response-to");
            _response_to_data_ = responseToAttr === "data" || this.responseTo === "data";
        }
        else {
            _response_to_data_ = this.responseTo === "data";
        }
        return _response_to_data_;
    }
    get responseToTemplate() {
        let _response_to_template_ = false;
        if (platform_1.isBrowser) {
            const responseToAttr = this.body.getAttribute("response-to");
            _response_to_template_ = responseToAttr === "template" || this.responseTo === "template";
        }
        else {
            _response_to_template_ = this.responseTo === "template";
        }
        return _response_to_template_;
    }
    createServiceInstance() {
        const component = this;
        let data = this.data;
        let __serviceClass;
        const __classDefinition = component.getClass().__definition;
        const _serviceClassName = component.serviceClassName;
        return new Promise(function (resolve, reject) {
            /* __enable_service_class__ = true by default */
            const __enable_service_class__ = component.enableServiceClass;
            let _response_to_data_ = component.responseToData;
            let _response_to_template_ = component.responseToTemplate;
            if (__enable_service_class__ && _serviceClassName !== null) {
                __serviceClass = (0, ClassFactory_1.ClassFactory)(_serviceClassName);
            }
            if (!_response_to_data_ && __classDefinition && Object.hasOwn(__classDefinition, "responseTo")) {
                _response_to_data_ = (__classDefinition.responseTo === "data");
            }
            else if (!_response_to_data_ && Object.hasOwn((0, ClassFactory_1.ClassFactory)("Component"), "responseTo")) {
                _response_to_data_ = ((0, ClassFactory_1.ClassFactory)("Component").responseTo === "data");
            }
            if (!_response_to_template_ && __classDefinition && Object.hasOwn(__classDefinition, "responseTo")) {
                _response_to_template_ = (__classDefinition.responseTo === "template");
            }
            else if (!_response_to_template_ && Object.hasOwn((0, ClassFactory_1.ClassFactory)("Component"), "responseTo")) {
                _response_to_template_ = ((0, ClassFactory_1.ClassFactory)("Component").responseTo === "template");
            }
            if (typeof __serviceClass !== "undefined" &&
                (typeof __enable_service_class__ !== "undefined" &&
                    __enable_service_class__ === true) &&
                (_response_to_data_ || _response_to_template_)) {
                Logger_1.logger.info("Loading service " + _serviceClassName);
                const serviceInstance = (0, New_1.New)(__serviceClass, {
                    data
                });
                (0, serviceLoader_1.serviceLoader)(serviceInstance)?.then(function ({ service }) {
                    let serviceResponse;
                    if (typeof service.JSONresponse !== "undefined" && service.JSONresponse !== null) {
                        serviceResponse = service.JSONresponse;
                    }
                    else {
                        serviceResponse = service.template;
                    }
                    if (_response_to_data_) {
                        if (typeof data === "object" && typeof serviceResponse === "object") {
                            data = Object.assign(data, serviceResponse);
                        }
                        else {
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
                }, function (rejectedResponse) {
                    Logger_1.logger.debug(`Service loading rejected for ${_serviceClassName} in ${component.name}`);
                    reject(rejectedResponse);
                }).catch(function (e) {
                    Logger_1.logger.debug("Something went wroing while trying to load the service " + _serviceClassName);
                    throw Error(`Error loading ${_serviceClassName} for ${component.name}. Detail: ${e}`);
                });
            }
            else {
                resolve(null);
            }
        });
    }
    _bindroute_() {
        const _component_ = this;
        if (!_component_._bindroute_.loaded) {
            if (platform_1.isBrowser) {
                _component_.hostElements("a").map(function (a) {
                    a.oldclick = a.onclick;
                    a.onclick = function (e) {
                        let _ret_ = true;
                        if (!top_1._top.global.get("routingPaths")) {
                            top_1._top.global.set("routingPaths", []);
                        }
                        const routingWay = CONFIG_1.CONFIG.get("routingWay");
                        const routingPath = e.target[routingWay];
                        if (top_1._top.global.get("routingPaths").includes(routingPath) &&
                            e.target[routingWay] !== location[routingWay] &&
                            e.target.href !== document.location.href) {
                            Logger_1.logger.debug("A ROUTING WAS FOUND: " + routingPath);
                            window.history.pushState({
                                href: e.target.href
                            }, e?.target?.href, e.target.href);
                            Component.route().catch((e) => { throw Error(`Unexpected error: ${e}`); });
                            _ret_ = false;
                        }
                        else {
                            Logger_1.logger.debug("NO ROUTING FOUND FOR: " + routingPath);
                        }
                        if (typeof e.target.oldclick !== "undefined" && typeof e.target.oldclick === "function") {
                            e.target.oldclick.call(e.target, e);
                        }
                        return _ret_;
                    };
                    return null;
                });
            }
            else {
                // not yet implemented.
            }
            _component_._bindroute_.loaded = true;
        }
        else {
            Logger_1.logger.debug(`Routes already bound to popstate events for ${_component_.name}`);
        }
    }
    done(standardResponse) {
        const _ret_ = new Promise((resolve) => {
            if (typeof standardResponse !== "undefined") {
                const { request, component } = standardResponse;
                resolve({ request, component });
            }
            else {
                resolve({ request: undefined, component: undefined });
            }
        });
        return _ret_;
    }
    createControllerInstance() {
        let _Controller;
        if (platform_1.isBrowser) {
            if (typeof this.body === "undefined") {
                throw new Error("The component has no body");
            }
            var controllerName = this.body.getAttribute("controllerClass");
            if (!controllerName) {
                controllerName = "Controller";
            }
            _Controller = (0, ClassFactory_1.ClassFactory)(controllerName);
            if (typeof _Controller !== "undefined") {
                this.controller = (0, New_1.New)(_Controller, {
                    component: this
                });
            }
        }
        return new Promise((resolve, reject) => {
            if (platform_1.isBrowser) {
                if (typeof _Controller !== "undefined" && typeof this.controller !== "undefined") {
                    if (typeof (this.controller).done === "function") {
                        try {
                            this.controller.done.call(this.controller);
                        }
                        catch (e) {
                            throw Error(e);
                        }
                    }
                    else {
                        Logger_1.logger.debug(`${controllerName} does not have a done() method.`);
                        reject(new Error(`${controllerName} does not have a done() method.`));
                    }
                    if (typeof this.controller.createRoutingController === "function") {
                        this.controller.createRoutingController.call(this.controller);
                    }
                    else {
                        Logger_1.logger.debug(`${controllerName} does not have a createRoutingController() method.`);
                    }
                }
            }
            resolve({ component: this, controller: this.controller });
        });
    }
    createEffectInstance() {
        const _component_ = this;
        return new Promise(function (resolve) {
            if (platform_1.isBrowser) {
                const effectClassName = _component_.body?.getAttribute("effectClass");
                let applyEffectTo = _component_.body?.getAttribute("apply-effect-to");
                applyEffectTo = (applyEffectTo !== null) ? (applyEffectTo) : ("load");
                if (effectClassName !== null && applyEffectTo === "observe") {
                    _component_.applyObserveTransitionEffect(effectClassName);
                }
                else if (effectClassName !== null && applyEffectTo === "load") {
                    _component_.applyTransitionEffect(effectClassName);
                }
            }
            resolve({ component: _component_, effect: _component_.effect });
        });
    }
    createViewInstance() {
        const _component_ = this;
        return new Promise(function (resolve) {
            const viewName = (platform_1.isBrowser) ? (_component_.body.getAttribute("viewClass")) : (null);
            if (viewName !== null) {
                const _View = (0, ClassFactory_1.ClassFactory)(viewName);
                if (typeof _View !== "undefined") {
                    _component_.view = (0, New_1.New)(_View, {
                        component: _component_
                    }); // Initializes the main view for the component
                    if (Object.hasOwn(_component_.view, "done") && typeof _component_.view?.done === "function") {
                        _component_.view?.done.call(_component_.view);
                    }
                }
            }
            resolve({ component: _component_, view: _component_.view });
        });
    }
    __done__() {
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
                .catch((e) => {
                throw new Error(`Unknown error ${e}.`);
            });
            Logger_1.logger.debug(`Trying to run component helpers for ${_component_.name}...`);
            try {
                _component_.runComponentHelpers();
                Logger_1.logger.debug(`Component helpers for ${_component_.name} executed.`);
            }
            catch (e) {
                Logger_1.logger.debug(`Component helpers for ${_component_.name} could not be executed.`);
                throw Error(e);
            }
            _component_.subcomponents = _component_.__buildSubComponents__();
            _component_._bindroute_();
            if (platform_1.isBrowser) {
                _component_.body.setAttribute("loaded", "true");
            }
        };
        return new Promise(function (resolve, reject) {
            try {
                resolve(componentDone.call(_component_));
            }
            catch (e) {
                reject(new Error(e));
            }
        });
    }
    hostElements(tagFilter) {
        const _component_ = this;
        let elementList = [];
        if (platform_1.isBrowser) {
            elementList = (_component_.shadowed && (typeof _component_.shadowRoot !== "undefined")) ? _component_.shadowRoot.subelements(tagFilter) : (_component_.body.subelements(tagFilter));
        }
        return elementList;
    }
    get subtags() {
        const _component_ = this;
        const tagFilter = tag_filter_1._tag_filter_;
        return _component_.hostElements(tagFilter);
    }
    get bodyAttributes() {
        const _component_ = this;
        const c = _component_.body;
        return (platform_1.isBrowser) ? ([...c.getAttributeNames()].map(a => { return { [a]: c.getAttribute(a) }; }).reduce((accumulator, colData) => { return Object.assign(accumulator, colData); })) : ({});
    }
    get dataAttributes() {
        const _component_ = this;
        const c = _component_.body;
        return (platform_1.isBrowser) ? ([{}].concat([...c.getAttributeNames()].filter(n => n.startsWith("data-")).map(a => { return { [a.split("-")[1]]: c.getAttribute(a) }; })).reduce((accumulator, colData) => { return Object.assign(accumulator, colData); })) : ({});
    }
    __buildSubComponents__(rebuildObjects = false) {
        const _component_ = this;
        let elementList = _component_.subtags;
        if (!rebuildObjects) {
            elementList = elementList.filter((t) => t.getAttribute("loaded") !== "true");
        }
        if ((typeof _component_ !== "undefined") || _component_.subcomponents.length < 1) {
            _component_.subcomponents = (0, ComponentFactory_1._buildComponentsFromElements_)(elementList, _component_);
        }
        return _component_.subcomponents;
    }
    fail(standardResponse) {
        const _ret_ = new Promise((resolve, reject) => {
            if (typeof standardResponse !== "undefined") {
                const { error, component } = standardResponse;
                resolve({ error, component });
            }
            else {
                reject(new Error(" Unknown error."));
            }
        });
        return _ret_;
    }
    set(key, value) {
        this[key] = value;
    }
    get(key, _defaultValue) {
        return this[key] || _defaultValue;
    }
    feedComponent() {
        const _component_ = this;
        Logger_1.logger.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
        const _feedComponent_InBrowser = function (_component_) {
            if (typeof _component_.container === "undefined" && typeof _component_.body === "undefined") {
                Logger_1.logger.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_.name));
                return;
            }
            const container = (typeof _component_.container === "undefined" || _component_.container === null) ? (_component_.body) : (_component_.container);
            const parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
            if (_component_.shadowed) {
                Logger_1.logger.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_.name));
                Logger_1.logger.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                const tmp_shadowContainer = (0, DOMCreateElement_1._DOMCreateElement)("div");
                container.subelements("[slot]").map((c) => {
                    if (c.parentElement === container) {
                        tmp_shadowContainer.appendChild(c);
                    }
                    return c;
                });
                Logger_1.logger.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                const shadowContainer = (0, DOMCreateElement_1._DOMCreateElement)("div");
                shadowContainer.classList.add("shadowHost");
                try {
                    _component_.shadowRoot = shadowContainer.attachShadow({
                        mode: "open"
                    });
                }
                catch (e) {
                    Logger_1.logger.debug(`An error ocurred: ${e}.`);
                    try {
                        Logger_1.logger.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_.name));
                        _component_.shadowRoot = shadowContainer.shadowRoot;
                    }
                    catch (e) {
                        Logger_1.logger.debug(`An error ocurred: ${e}.`);
                        Logger_1.logger.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_.name));
                    }
                }
                if (typeof _component_.shadowRoot !== "undefined" && _component_.shadowRoot !== null) {
                    if (_component_.reload) {
                        Logger_1.logger.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                        if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                            shadowContainer.shadowRoot.innerHTML = _component_.innerHTML;
                        }
                    }
                    else {
                        tmp_shadowContainer.innerHTML = _component_.parseTemplate(tmp_shadowContainer.innerHTML);
                        Logger_1.logger.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                        if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
                            shadowContainer.shadowRoot.innerHTML += _component_.innerHTML;
                        }
                    }
                    Logger_1.logger.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                    shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
                    Logger_1.logger.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_.name));
                    const qs = container.querySelector(".shadowHost");
                    if (!(typeof qs !== "undefined" && qs !== null)) {
                        container.appendChild(shadowContainer);
                    }
                    else {
                        Logger_1.logger.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_.name));
                        if (_component_.shadowRoot !== null && shadowContainer.shadowRoot !== null) {
                            _component_.shadowRoot.innerHTML = shadowContainer.shadowRoot.innerHTML;
                        }
                    }
                }
                else {
                    Logger_1.logger.warn("Shadowed COMPONENT {{NAME}} is bad configured".replace("{{NAME}}", _component_.name));
                }
            }
            else {
                if (_component_.reload) {
                    Logger_1.logger.debug("FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                    container.innerHTML = _component_.innerHTML;
                }
                else if (container && _component_) {
                    Logger_1.logger.debug("ADDING COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                    container.innerHTML += _component_.innerHTML;
                }
                else {
                    Logger_1.logger.warn("COMPONENT {{NAME}} is not added to the DOM".replace("{{NAME}}", _component_.name));
                }
            }
        };
        const _feedComponent_InNode = function (_component_) {
            const parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
        };
        let _ret_;
        if (!(0, is_a_1.is_a)(_component_, "Component")) {
            Logger_1.logger.warn("Trying to feed a non component object");
            return Promise.reject(new Error(`Trying to feed a non component object ${typeof _component_}`));
        }
        return new Promise((resolve, reject) => {
            if (platform_1.isBrowser) {
                try {
                    _ret_ = _feedComponent_InBrowser(_component_);
                    resolve(_ret_);
                }
                catch (e) {
                    reject(new Error(e));
                }
            }
            else {
                try {
                    _ret_ = _feedComponent_InNode(_component_);
                    resolve(_ret_);
                }
                catch (e) {
                    reject(new Error(e));
                }
            }
        });
    }
    rebuild() {
        const _component = this;
        var _promise = new Promise(function (resolve, reject) {
            if (typeof _component === "undefined" || _component === null) {
                reject(new Error("Component is undefined"));
            }
            if ((0, isQCObjects_1.isQCObjects_Object)(_component) && (0, is_a_1.is_a)(_component, "Component")) {
                switch (true) {
                    case (_component.get("tplsource") === "none"):
                        Logger_1.logger.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
                        var standardResponse = {
                            request: undefined,
                            component: _component
                        };
                        _component.__done__().then(function () {
                            if (typeof _component.done === "function") {
                                _component.done.call(_component, standardResponse)
                                    .catch((e) => {
                                    Logger_1.logger.debug(`It was an error while calling done() in ${_component.name}: ${e}`);
                                });
                            }
                            resolve.call(_promise, standardResponse);
                        }, function () {
                            reject.call(_promise, standardResponse);
                        });
                        break;
                    case (_component.get("tplsource") === "inline"):
                        Logger_1.logger.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
                        (async (_component) => {
                            await _component.feedComponent.bind(_component)();
                        })(_component)
                            .catch((e) => {
                            Logger_1.logger.debug(`It was not possible to feed the component ${_component.name}: ${e}`);
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
                        ((0, componentLoader_1.componentLoader)(_component, false))?.then(function (standardResponse) {
                            resolve.call(_promise, standardResponse);
                        }, function (standardResponse) {
                            reject.call(_promise, standardResponse);
                        });
                        break;
                    case (_component.get("tplsource") === "external" &&
                        _component.get("templateURI") !== ""):
                        _component.set("url", _component.get("templateURI"));
                        ((0, componentLoader_1.componentLoader)(_component, false)).then(function (standardResponse) {
                            resolve.call(_promise, standardResponse);
                        }, function (standardResponse) {
                            reject.call(_promise, standardResponse);
                        });
                        break;
                    case _component.get("tplsource") === "default" && _component.get("templateURI", "") === "":
                        Logger_1.logger.debug(`Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                        reject.call(_promise, `Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
                        break;
                    default:
                        Logger_1.logger.debug("Component " + _component.name + " will not be rebuilt because no templateURI is present");
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
    Cast(oClass) {
        /* Cast method for components has been deprecated. Don't use this method, it is available only for compatibility purposes */
        const o = (0, introspection_1._methods_)(oClass).map((m) => m.name.replace(/bound /g, "")).map(m => {
            return {
                [m]: oClass[m].bind(this)
            };
        }).reduce((c, p) => Object.assign(c, p), {});
        return (0, Cast_1._Cast)(this, o);
    }
    route() {
        return this.constructor.route();
    }
    static route() {
        const componentClass = this; /* is can be class or object */
        let _route_promise_;
        const isValidInstance = !!(((0, isQCObjects_1.isQCObjects_Object)(componentClass) && (0, is_a_1.is_a)(componentClass, "Component")));
        const __route__ = function (componentList) {
            const _componentNames_ = [];
            const _promises_ = componentList.filter(function (rc) {
                return typeof rc !== "undefined";
            }).map(function (rc) {
                if (typeof rc.name !== "undefined") {
                    _componentNames_.push(rc.name);
                }
                else {
                    throw new Error((0, getType_1.__getType__)(rc) + " does not have a name");
                }
                return new Promise(function (resolve, reject) {
                    if (typeof rc !== "undefined" && !!rc._reroute_) {
                        rc._reroute_()
                            .then(function () {
                            rc.reload = true;
                            rc.rebuild()
                                .then(() => {
                                resolve();
                            })
                                .catch((e) => {
                                Logger_1.logger.debug(`Error ${e}`);
                            });
                            return;
                        })
                            .then(function () {
                            if (Object.hasOwn(rc, "subcomponents") &&
                                typeof rc.subcomponents !== "undefined" &&
                                rc.subcomponents.length > 0) {
                                Logger_1.logger.debug("LOOKING FOR ROUTINGS IN SUBCOMPONENTS FOR: " + rc.name);
                                return __route__.call(rc, rc.subcomponents);
                            }
                            else {
                                Logger_1.logger.debug("No subcomponents to look for routings in: " + rc.name);
                                if (rc.subtags.length > 0) {
                                    rc.subcomponents = rc.__buildSubComponents__(true);
                                }
                                resolve();
                            }
                        }).catch((e) => {
                            Logger_1.logger.debug(`Error: ${e}`);
                        });
                    }
                    else if (typeof rc !== "undefined") {
                        reject(new Error("Component " + rc.name + " is not an instance of Component"));
                    }
                    return;
                });
            });
            return Promise.all(_promises_)
                .then(function () {
                Logger_1.logger.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
            }).catch(function (err) {
                Logger_1.logger.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
            });
        };
        if (isValidInstance || !!top_1.componentsStack) {
            if (isValidInstance) {
                Logger_1.logger.debug("loading routings for instance " + componentClass.name);
            }
            _route_promise_ = __route__.call(componentClass, (isValidInstance) ? (componentClass.subcomponents) : (top_1.componentsStack));
        }
        else {
            Logger_1.logger.debug("An undetermined result expected if load routings. So will not be loaded this time.");
            throw Error("There is no valid instance and no components stack available to apply rountings");
        }
        return _route_promise_;
    }
    fullscreen() {
        if (platform_1.isBrowser) {
            const elem = this.body;
            if (elem.requestFullscreen) {
                elem.requestFullscreen()
                    .catch((e) => {
                    throw new Error(`An error ocurred when requesting fullscreen: ${e}`);
                });
            }
            else if (elem.mozRequestFullScreen) {
                /* Firefox */
                elem.mozRequestFullScreen();
            }
            else if (elem.webkitRequestFullscreen) {
                /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            }
            else if (elem.msRequestFullscreen) {
                /* IE/Edge */
                elem.msRequestFullscreen();
            }
        }
        else {
            // not yet implemented.
        }
    }
    closefullscreen() {
        if (platform_1.isBrowser) {
            if (document.exitFullscreen) {
                document.exitFullscreen()
                    .catch((e) => { throw new Error(`An error ocurred when trying to exit fullscrenn ${e}.`); });
            }
            else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            }
            else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        else {
            // noy yet implemented.
        }
    }
    _generateRoutingPaths(componentBody) {
        const component = this;
        return new Promise(function (resolve) {
            if (platform_1.isBrowser) {
                if ((0, routings_1.__valid_routing_way__)(component.validRoutingWays, component.routingWay || "")) {
                    if (typeof componentBody !== "undefined") {
                        component.innerHTML = componentBody?.innerHTML;
                        component.routingNodes = componentBody?.subelements("routing");
                        component.routings = [];
                        component.routingNodes.map((routingNode) => {
                            const attributeNames = routingNode.getAttributeNames();
                            const routing = {};
                            attributeNames.map((attributeName, a) => {
                                routing[attributeNames[a]] = routingNode.getAttribute(attributeNames[a]);
                                return attributeName;
                            });
                            component.routings.push(routing);
                            if (!component.routingPaths) {
                                component.routingPaths = [];
                            }
                            if (!component.routingPaths.includes(routing.path)) {
                                component.routingPaths.push(routing.path);
                            }
                            if (!top_1._top.global.get("routingPaths")) {
                                top_1._top.global.set("routingPaths", []);
                            }
                            if (!top_1._top.global.get("routingPaths").includes(routing.path)) {
                                top_1._top.global.get("routingPaths").push(routing.path);
                            }
                            return routingNode;
                        });
                    }
                }
            }
            else {
                // not yet implemented.
            }
            resolve();
        });
    }
    parseTemplate(template) {
        const _self = this;
        let _parsedAssignmentText;
        const value = template;
        if (Object.hasOwn(_self, "templateHandler")) {
            const templateHandlerName = _self.templateHandler;
            Logger_1.logger.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
            const templateHandlerClass = (0, ClassFactory_1.ClassFactory)(templateHandlerName);
            const templateInstance = (0, New_1.New)(templateHandlerClass, {
                component: _self,
                template: value
            });
            templateInstance.component = _self;
            let selfData = _self.data;
            if (Object.hasOwn(_self, "assignRoutingParams") && _self.assignRoutingParams) {
                try {
                    selfData = Object.assign(selfData, _self.routingParams);
                }
                catch (e) {
                    Logger_1.logger.debug(`An error ocurred: ${e}.`);
                    Logger_1.logger.debug("[parseTemplate] it was not possible to assign the routing params to the template");
                }
            }
            _parsedAssignmentText = templateInstance.assign(selfData);
        }
        else {
            Logger_1.logger.debug(`[Component][${this.name}][parseTemplate] No value for templateHandler. Using raw content...`);
            _parsedAssignmentText = value;
        }
        return _parsedAssignmentText;
    }
    _reroute_() {
        /* This method set the selected routing and makes the switch to the templateURI */
        const rc = this;
        return new Promise(function (resolve) {
            if (platform_1.isBrowser) {
                if ((0, routings_1.__valid_routing_way__)(rc.validRoutingWays, rc.routingWay || "")) {
                    rc.routingPath = location[rc.routingWay];
                    rc.routingSelected.map((routing) => {
                        const componentURI = (0, ComponentFactory_1.ComponentURI)({
                            "COMPONENTS_BASE_PATH": CONFIG_1.CONFIG.get("componentsBasePath"),
                            "COMPONENT_NAME": routing.name.toString(),
                            "TPLEXTENSION": (Object.hasOwn(routing, "tplextension")) ? (routing.tplextension || "") : (rc.tplextension),
                            "TPL_SOURCE": "default" /* here is always default in order to get the right uri */
                        });
                        rc.templateURI = componentURI;
                        return routing;
                    });
                    if (rc.routingSelected.length > 0) {
                        rc.template = "";
                        if (typeof rc.body !== "undefined" && rc.body !== null) {
                            rc.body.innerHTML = "";
                        }
                    }
                }
            }
            resolve(rc);
        });
    }
    lazyLoadImages() {
        if (platform_1.isBrowser) {
            const component = this;
            const _componentRoot = component.componentRoot;
            if (typeof _componentRoot !== "undefined" && _componentRoot !== null) {
                const _imgLazyLoaded = [..._componentRoot.subelements("img[lazy-src]")];
                const _lazyLoadImages = function (image) {
                    image.setAttribute("src", image.getAttribute("lazy-src")?.toString());
                    image.onload = () => {
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
                        return observer.observe(img);
                    });
                }
                else {
                    _imgLazyLoaded.map(_lazyLoadImages);
                }
            }
        }
        else {
            // not yet implemented
        }
        return null;
    }
    applyTransitionEffect(effectClassName) {
        const _Effect = (0, ClassFactory_1.ClassFactory)(effectClassName);
        if (typeof _Effect === "undefined") {
            throw Error(`${effectClassName} not found.`);
        }
        if (typeof _Effect !== "undefined" && (0, is_a_1.is_a)(_Effect, "TransitionEffect")) {
            this.effect = (0, New_1.New)(_Effect, {
                component: this
            });
            this.effect?.apply(this.effect?.defaultParams);
        }
        else {
            Logger_1.logger.debug(`${effectClassName} is ${(0, getType_1.__getType__)(_Effect)} but is not a TransitionEffect`);
        }
    }
    applyObserveTransitionEffect(effectClassName) {
        if (platform_1.isBrowser) {
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
                observer.observe(_componentRoot);
            }
            else {
                _applyEffect_();
            }
        }
        else {
            // not yet implemented
        }
    }
    get componentRoot() {
        return (this.shadowed) ? (this.shadowRoot) : (this.body);
    }
    scrollIntoHash() {
        if (platform_1.isBrowser) {
            const component = this;
            if (document.location.hash !== "") {
                const _componentRoot = component.componentRoot;
                (_componentRoot?.subelements(document.location.hash)).map((element) => {
                    if (typeof element.scrollIntoView === "function") {
                        element.scrollIntoView(CONFIG_1.CONFIG.get("scrollIntoHash", {
                            behavior: "auto",
                            block: "top",
                            inline: "top"
                        }));
                    }
                    return element;
                });
            }
        }
        else {
            // not yet implemented
        }
    }
    i18n_translate() {
        if (platform_1.isBrowser) {
            if (CONFIG_1.CONFIG.get("use_i18n")) {
                const component = this;
                const _componentRoot = component.componentRoot;
                const lang1 = CONFIG_1.CONFIG.get("lang", "en");
                const lang2 = navigator.language.slice(0, 2);
                const i18n = top_1._top.global.get("i18n");
                if ((lang1 !== lang2) && (typeof i18n === "object" && Object.hasOwn(i18n, "messages"))) {
                    const callback_i18n = () => {
                        return new Promise(function (resolve) {
                            const messages = i18n.messages.filter(function (message) {
                                return Object.hasOwn(message, lang1) && Object.hasOwn(message, lang2);
                            });
                            (_componentRoot?.subelements("ul,li,h1,h2,h3,a,b,p,input,textarea,summary,details,option,component"))
                                .map((element) => {
                                messages.map(function (message) {
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
                        Logger_1.logger.debug("i18n loaded for component: " + component.name);
                    }).catch((e) => { throw new Error(`An error ocurred when parsing i18n: ${e}.`); });
                }
            }
        }
        else {
            // not yet implemented
        }
    }
    addComponentHelper(componentHelper) {
        const component = this;
        component._componentHelpers.push(componentHelper);
    }
    runComponentHelpers() {
        if (platform_1.isBrowser) {
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
            __component_helpers__.map((_component_helper_) => {
                Logger_1.logger.debug(`Executing ${_component_helper_.name} as component helper for ${component.name}...`);
                _component_helper_();
                return _component_helper_;
            });
        }
        else {
            // not yet implemented
        }
    }
}
exports.Component = Component;
(0, Package_1.Package)("com.qcobjects", [
    Component
]);
(introspection_1._methods_)((0, ClassFactory_1.ClassFactory)("Component")).map((__c__) => {
    (introspection_1._protected_code_)(__c__);
    return __c__;
});
