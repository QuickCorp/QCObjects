import { Base64 } from "./Base64";
import { _basePath_ } from "./basePath";
import { _Cast } from "./Cast";
import { ClassFactory } from "./ClassFactory";
import { ComponentURI } from "./ComponentFactory";
import { _DataStringify } from "./DataStringify";
import { _DOMCreateElement } from "./DOMCreateElement";
import { __getType__ } from "./getType";
import { _methods_, _protected_code_ } from "./introspection";
import { is_a } from "./is_a";
import { isQCObjects_Object } from "./isQCObjects";
import { logger } from "./Logger";
import { New } from "./New";
import { Package } from "./Package";
import { isBrowser } from "./platform";
import { Processor } from "./Processor";
import { __routing_params__, __valid_routing_way__, __valid_routings__ } from "./routings";
import { _top } from "./top";
export class Component extends ClassFactory("InheritClass") {
    validRoutingWays = ["pathname", "hash", "search"];
    basePath = _basePath_;
    domain = _domain_;
    templateHandler = "DefaultTemplateHandler";
    processorHandler = null;
    routingWay = null;
    routingNodes = [];
    routings = [];
    routingPath = "";
    routingPaths = [];
    _componentHelpers = [];
    subcomponents = [];
    splashScreenComponent = undefined;
    controller = undefined;
    view = undefined;
    effect = undefined;
    method = "GET";
    cached = true;
    __promise__ = null;
    __namespace = undefined;

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
        _body = _DOMCreateElement("div"),
        __promise__ = null,
        __shadowRoot,
        body,
        shadowRoot,
        splashScreenComponent,
        controller,
        view
    }) {
        if (arguments.length < 1) {
            throw Error(`No arguments in component. You must at least give one argument.`);
        }
        super({
            __parent__,
            templateURI,
            template,
            tplextension,
            tplsource,
            url,
            name,
            method,
            data,
            reload,
            shadowed,
            cached,
            _body,
            __promise__,
            __shadowRoot,
            body,
            shadowRoot,
            splashScreenComponent,
            controller,
            view
        });
        var self = this;

        if (typeof self.name === "undefined") {
            logger.warn("A name is not defined for " + __getType__(self));
        }

        self.routingWay = _top.CONFIG.get("routingWay");

        self.processorHandler = New(Processor, {
            component: self
        });

        /* assign body data attributes to data */
        self.data = (typeof self.data === "undefined" || self.data === null) ? ({}) : (self.data);
        self.data = Object.assign(self.data, self.dataAttributes);

        self.createServiceInstance()
            .then(function (serviceResponse) {
                if (typeof self.__new__ === "function") {
                    self.__new__.call(self, self);
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
                            });
                    });

            });

    }

    set body(value) {
        var self = this;
        self._body = value;
    }

    get body() {
        var self = this;
        return self._body;
    }

    set cacheIndex(value) {
        // readonly
        logger.debug("[cacheIndex] This property is readonly");
    }

    get cacheIndex() {
        var self = this;
        var __routing_path__ = _DataStringify(self.routingPath);
        return Base64.encode(self.name + __routing_path__);
    }

    set parsedAssignmentText(value) {
        // readonly
        logger.debug("[parsedAssignmentText] This property is readonly");
    }

    get parsedAssignmentText() {
        var self = this;
        self._parsedAssignmentText = self.parseTemplate(self.template);
        if (typeof self._parsedAssignmentText === "undefined") {
            throw Error(`[Component][${this.name}][parsedAssignmentText] Could not generate content!`);
        }
        return self._parsedAssignmentText;
    }


    set shadowRoot(value) {
        var self = this;
        if (typeof self.__shadowRoot == "undefined") {
            self.__shadowRoot = value;
        } else {
            logger.debug("[shadowRoot] This property can only be assigned once!");
        }
    }

    get shadowRoot() {
        var self = this;
        return self.__shadowRoot;
    }


    set routingSelected(value) {
        logger.debug("[routingSelected] This is a read-only property of the component");
    }

    get routingSelected() {
        var self = this;
        return __valid_routings__(self.routings, self.routingPath);
    }

    set routingParams(value) {
        logger.debug("[routingParams] This is a read-only property of the component");
    }

    get routingParams() {
        var component = this;
        return [{}].concat(component.routingSelected.map(function (routing) {
            return __routing_params__(routing, component.routingPath);
        })).reduce(function (accumulator, colData, index) {
            return Object.assign(accumulator, colData);
        });
    }

    createServiceInstance() {
        var component = this;
        var body = component.body;
        var data = this.data;
        var __serviceClass;
        var __classDefinition = component.getClass().__definition;
        var _serviceClassName = (isBrowser && body.getAttribute("serviceClass") !== null) ? (body.getAttribute("serviceClass")) : (null);

        return new Promise(function (resolve, reject) {
            /* __enable_service_class__ = true by default */
            var __enable_service_class__ = (
                (Object.hasOwnProperty.call(body, "enableServiceClass") && body.enableServiceClass) ||
                (!Object.hasOwnProperty.call(body, "enableServiceClass"))
            ) ? (true) : (false);
            var _response_to_data_ = (isBrowser && body.getAttribute("response-to") !== null && body.getAttribute("response-to") === "data") ? (true) : (false);
            var _response_to_template_ = (isBrowser && body.getAttribute("response-to") !== null && body.getAttribute("response-to") === "template") ? (true) : (false);

            if (__enable_service_class__ && _serviceClassName !== null) {
                __serviceClass = ClassFactory(_serviceClassName);
            }
            if (!_response_to_data_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
                _response_to_data_ = (__classDefinition.responseTo === "data") ? (true) : (false);
            } else if (!_response_to_data_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
                _response_to_data_ = (ClassFactory("Component").responseTo === "data") ? (true) : (false);
            }
            if (!_response_to_template_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
                _response_to_template_ = (__classDefinition.responseTo === "template") ? (true) : (false);
            } else if (!_response_to_template_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
                _response_to_template_ = (ClassFactory("Component").responseTo === "template") ? (true) : (false);
            }

            if (typeof __serviceClass !== "undefined" &&
                (typeof __enable_service_class__ !== "undefined" &&
                    __enable_service_class__ === true) &&
                (_response_to_data_ || _response_to_template_)
            ) {
                logger.info("Loading service " + _serviceClassName);
                var serviceInstance = New(__serviceClass, {
                    data: data
                });
                serviceLoader(serviceInstance).then(function ({
                    request,
                    service
                }) {
                    var serviceResponse;
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
                }, function (rejectedResponse) {
                    logger.debug(`Service loading rejected for ${_serviceClassName} in ${component.name}`);
                    reject(rejectedResponse);
                }).catch(function (e) {
                    logger.debug("Something went wroing while trying to load the service " + _serviceClassName);
                    throw Error(`Error loading ${_serviceClassName} for ${component.name}. Detail: ${e}`);
                });
            } else {
                resolve(null);
            }
        });
    }

    _bindroute_() {
        var _component_ = this;
        if (!_component_._bindroute_.loaded) {
            if (isBrowser) {

                _component_.hostElements("a").map(function (a) {
                    a.oldclick = a.onclick;
                    a.onclick = function (e) {
                        var _ret_ = true;
                        if (!_top.global.get("routingPaths")) {
                            _top.global.set("routingPaths", []);
                        }
                        var routingWay = _top.CONFIG.get("routingWay");
                        var routingPath = e.target[routingWay];
                        if (_top.global.get("routingPaths").includes(routingPath) &&
                            e.target[routingWay] !== document.location[routingWay] &&
                            e.target.href !== document.location.href
                        ) {
                            logger.debug("A ROUTING WAS FOUND: " + routingPath);
                            window.history.pushState({
                                href: e.target.href
                            }, e.target.href, e.target.href);
                            ClassFactory("Component").route();
                            _ret_ = false;
                        } else {
                            logger.debug("NO ROUTING FOUND FOR: " + routingPath);
                        }
                        if (typeof e.target.oldclick !== "undefined" && typeof e.target.oldclick === "function") {
                            e.target.oldclick.call(e.target, e);
                        }
                        return _ret_;
                    };
                    return null;
                });

            } else {
                // not yet implemented.
            }
            this._bindroute_.loaded = true;
        } else {
            logger.debug(`Routes already bound to popstate events for ${_component_.name}`);
        }

    }

    done(standardResponse) {
        var _ret_;
        if (typeof standardResponse !== "undefined") {
            var { request, component } = standardResponse;
            _ret_ = Promise.resolve({ request, component });
        }
        return _ret_;
    }

    createControllerInstance() {
        var _Controller;
        if (isBrowser) {
            if (typeof this.body === "undefined") {
                throw new Error("The component has no body");
            }
            var controllerName = this.body.getAttribute("controllerClass");
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
                    if (typeof this.controller.done === "function") {
                        try {
                            this.controller.done.call(this.controller);
                        } catch (e) {
                            throw Error(e);
                        }
                    } else {
                        logger.debug(`${controllerName} does not have a done() method.`);
                        reject(`${controllerName} does not have a done() method.`);
                    }
                    if (typeof this.controller.createRoutingController === "function") {
                        this.controller.createRoutingController.call(this.controller);
                    } else {
                        logger.debug(`${controllerName} does not have a createRoutingController() method.`);
                    }
                }
            }
            resolve({ component: this, controller: this.controller });
        });
    }

    createEffectInstance() {
        var _component_ = this;
        return new Promise(function (resolve, reject) {
            if (isBrowser) {
                var effectClassName = _component_.body.getAttribute("effectClass");
                var applyEffectTo = _component_.body.getAttribute("apply-effect-to");
                applyEffectTo = (applyEffectTo !== null) ? (applyEffectTo) : ("load");
                if (effectClassName !== null && applyEffectTo === "observe") {
                    _component_.applyObserveTransitionEffect(effectClassName);
                } else if (effectClassName !== null && applyEffectTo === "load") {
                    _component_.applyTransitionEffect(effectClassName);
                }
            }
            resolve({ component: _component_, effect: _component_.effect });
        });
    }

    createViewInstance() {
        var _component_ = this;
        return new Promise(function (resolve, reject) {
            var viewName = (isBrowser) ? (_component_.body.getAttribute("viewClass")) : (null);
            if (viewName !== null) {
                var _View = ClassFactory(viewName);
                if (typeof _View !== "undefined") {
                    _component_.view = New(_View, {
                        component: _component_
                    }); // Initializes the main view for the component
                    if (Object.hasOwnProperty.call(_component_.view, "done") && typeof _component_.view.done === "function") {
                        _component_.view.done.call(_component_.view);
                    }
                }

            }
            resolve({ component: _component_, view: _component_.view });

        });
    }

    __done__() {
        var _component_ = this;
        var componentDone = function () {
            if (typeof _component_ === "undefined") {
                throw new Error("componentDone() has lost its context");
            }
            if (typeof _component_.body === "undefined") {
                throw new Error("The component has no body");
            }
            _component_.createViewInstance();
            _component_.createControllerInstance();
            _component_.createEffectInstance();

            logger.debug(`Trying to run component helpers for ${_component_.name}...`);
            try {
                _component_.runComponentHelpers();
                logger.debug(`Component helpers for ${_component_.name} executed.`);
            } catch (e) {
                logger.debug(`Component helpers for ${_component_.name} could not be executed.`);
                throw Error(e);
            }

            _component_.subcomponents = _component_.__buildSubComponents__();

            _component_._bindroute_();
            if (isBrowser) {
                _component_.body.setAttribute("loaded", true);
            }
        };

        return new Promise(function (resolve, reject) {
            try {
                resolve(componentDone.call(_component_));
            } catch (e) {
                reject(e);
            }
        });

    }

    hostElements(tagFilter) {
        var _component_ = this;
        var elementList = [];
        if (isBrowser) {
            elementList = (_component_.shadowed && (typeof _component_.shadowRoot !== "undefined")) ? (
                _component_.shadowRoot.subelements(tagFilter)
            ) : (
                _component_.body.subelements(tagFilter)
            );

        }
        return elementList;
    }

    get subtags() {
        var _component_ = this;
        var tagFilter = _tag_filter_;
        return _component_.hostElements(tagFilter);
    }

    get bodyAttributes() {
        var _component_ = this;
        var c = _component_.body;
        return (isBrowser) ? ([...c.getAttributeNames()].map(a => { return { [a]: c.getAttribute(a) }; }).reduce((accumulator, colData, index) => { return Object.assign(accumulator, colData); })) : ({});
    }

    get dataAttributes() {
        var _component_ = this;
        var c = _component_.body;
        return (isBrowser) ? ([{}].concat([...c.getAttributeNames()].filter(n => n.startsWith("data-")).map(a => { return { [a.split("-")[1]]: c.getAttribute(a) }; })).reduce((accumulator, colData, index) => { return Object.assign(accumulator, colData); })) : ({});
    }

    __buildSubComponents__(rebuildObjects = false) {
        var _component_ = this;
        var elementList = _component_.subtags;
        if (!rebuildObjects) {
            elementList = elementList.filter(t => t.getAttribute("loaded") !== "true");
        }
        if ((typeof _component_ !== "undefined") || _component_.subcomponents.length < 1) {
            _component_.subcomponents = _buildComponentsFromElements_(elementList, _component_);
        }
        return _component_.subcomponents;
    }

    fail(standardResponse) {
        var _ret_;
        if (typeof standardResponse !== "undefined") {
            var { error, component } = standardResponse;
            _ret_ = Promise.resolve({ error, component });
        }
        return _ret_;
    }

    set(name, value) {
        this[name] = value;
    }

    get(name) {
        return this[name];
    }

    feedComponent() {
        var _component_ = this;
        logger.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
        var _feedComponent_InBrowser = function (_component_) {
            if (typeof _component_.container === "undefined" && typeof _component_.body === "undefined") {
                logger.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_.name));
                return;
            }
            var container = (typeof _component_.container === "undefined" || _component_.container === null) ? (_component_.body) : (_component_.container);
            var parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
            if (_component_.shadowed) {
                logger.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_.name));
                logger.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                var tmp_shadowContainer = _DOMCreateElement("div");
                container.subelements("[slot]").map(
                    function (c) {
                        if (c.parentElement === container) {
                            tmp_shadowContainer.appendChild(c);
                        }
                    });
                logger.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                var shadowContainer = _DOMCreateElement("div");
                shadowContainer.classList.add("shadowHost");
                try {
                    _component_.shadowRoot = shadowContainer.attachShadow({
                        mode: "open"
                    });
                } catch (e) {
                    try {
                        logger.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_.name));
                        _component_.shadowRoot = shadowContainer.shadowRoot;
                    } catch (e) {
                        logger.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_.name));
                    }
                }
                if (typeof _component_.shadowRoot !== "undefined" && _component_.shadowRoot !== null) {
                    if (_component_.reload) {
                        logger.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                        shadowContainer.shadowRoot.innerHTML = _component_.innerHTML;
                    } else {
                        tmp_shadowContainer.innerHTML = _component_.parseTemplate(tmp_shadowContainer.innerHTML);
                        logger.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                        shadowContainer.shadowRoot.innerHTML += _component_.innerHTML;
                    }
                    logger.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                    shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
                    logger.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_.name));
                    var qs = container.querySelector(".shadowHost");
                    if (!(typeof qs !== "undefined" && qs !== null)) {
                        container.appendChild(shadowContainer);
                    } else {
                        logger.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_.name));
                        _component_.shadowRoot.innerHTML = shadowContainer.shadowRoot.innerHTML;
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

        var _feedComponent_InNode = function (_component_) {
            var parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
        };

        var _ret_;
        if (!is_a(_component_, "Component")) {
            logger.warn("Trying to feed a non component object");
            return;
        }
        if (isBrowser) {
            _ret_ = _feedComponent_InBrowser(_component_);
        } else {
            _ret_ = _feedComponent_InNode(_component_);
        }
        return _ret_;
    }

    rebuild() {
        var _component = this;
        var _promise = new Promise(function (resolve, reject) {
            if (typeof _component === "undefined" || _component === null) {
                reject("Component is undefined");
            }
            if (isQCObjects_Object(_component) && is_a(_component, "Component")) {
                switch (true) {
                    case (_component.get("tplsource") === "none"):
                        logger.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
                        var standardResponse = {
                            request: null,
                            component: _component
                        };
                        _component.__done__().then(function () {
                            if (typeof _component.done === "function") {
                                _component.done.call(_component, standardResponse);
                            }
                            resolve.call(_promise, standardResponse);
                        }, function () {
                            reject.call(_promise, standardResponse);
                        });
                        break;
                    case (_component.get("tplsource") === "inline"):
                        logger.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
                        (async function (_component) {
                            _component.feedComponent.bind(_component)();
                        })(_component);
                        var standardResponse = {
                            request: null,
                            component: _component
                        };
                        _component.__done__().then(function () {
                            if (typeof _component.done === "function") {
                                _component.done.call(_component, standardResponse);
                            }
                            resolve.call(_promise, standardResponse);
                        }, function () {
                            reject.call(_promise, standardResponse);
                        });
                        break;
                    case (_component.get("tplsource") === "default" &&
                        _component.get("templateURI") !== ""):
                        _component.set("url", _component.get("basePath") + _component.get("templateURI"));
                        componentLoader(_component, false).then(
                            function (standardResponse) {
                                resolve.call(_promise, standardResponse);
                            },
                            function (standardResponse) {
                                reject.call(_promise, standardResponse);
                            });
                        break;
                    case (_component.get("tplsource") === "external" &&
                        _component.get("templateURI") !== ""):
                        _component.set("url", _component.get("templateURI"));
                        componentLoader(_component, false).then(
                            function (standardResponse) {
                                resolve.call(_promise, standardResponse);
                            },
                            function (standardResponse) {
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

    Cast(oClass) {
        /* Cast method for components has been deprecated. Don't use this method, it is available only for compatibility purposes */
        let o = _methods_(oClass).map(m => m.name.replace(/bound /g, "")).map(m => {
            return {
                [m]: oClass[m].bind(this)
            };
        }).reduce((c, p) => Object.assign(c, p), {});
        return _Cast(this, o);
    }

    static route() {
        var componentClass = this; /* is can be class or object*/
        var _route_promise_;
        var isValidInstance = (isQCObjects_Object(componentClass) && is_a(componentClass, "Component")) ? (true) : (false);
        var __route__ = function (componentList) {
            var _componentNames_ = [];
            var _promises_ = componentList.filter(function (rc) {
                return typeof rc !== "undefined";
            }).map(function (rc) {
                if (typeof rc.name !== "undefined") {
                    _componentNames_.push(rc.name);
                } else {
                    throw new Error(__getType__(rc) + " does not have a name");
                }
                return new Promise(function (resolve, reject) {
                    var _promise_;
                    if (typeof rc !== "undefined" && !!rc._reroute_) {
                        _promise_ = rc._reroute_()
                            .then(function () {
                                rc.reload = true;
                                return rc.rebuild();
                            })
                            .then(function (_rc_) {
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
                                    resolve(rc);
                                }
                            });
                    } else if (typeof rc !== "undefined") {
                        reject("Component " + rc.name + " is not an instance of Component");
                    }
                    return _promise_;
                });
            });
            return Promise.all(_promises_)
                .then(function () {
                    logger.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
                }).catch(function (err) {
                    logger.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
                });
        };
        if (isValidInstance || !!_top.componentsStack) {
            if (isValidInstance) {
                logger.debug("loading routings for instance " + componentClass.name);
            }
            _route_promise_ = __route__.call(componentClass, (isValidInstance) ? (componentClass.subcomponents) : (_top.componentsStack));
        } else {
            logger.debug("An undetermined result expected if load routings. So will not be loaded this time.");
            throw Error(`There is no valid instance and no components stack available to apply rountings`);
        }
        return _route_promise_;
    }

    fullscreen() {
        if (isBrowser) {
            var elem = this.body;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                /* Firefox */
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                /* Chrome, Safari & Opera */
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                /* IE/Edge */
                elem.msRequestFullscreen();
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

    _generateRoutingPaths(componentBody) {
        var component = this;
        return new Promise<void>(function (resolve, reject) {
            if (isBrowser) {
                if (__valid_routing_way__(component.validRoutingWays, component.routingWay)) {
                    if (typeof componentBody !== "undefined") {
                        component.innerHTML = componentBody.innerHTML;
                        component.routingNodes = componentBody.subelements("routing");
                        component.routings = [];
                        component.routingNodes.map(function (routingNode, r) {
                            var attributeNames = routingNode.getAttributeNames();
                            var routing = {};
                            attributeNames.map(function (attributeName, a) {
                                routing[attributeNames[a]] = routingNode.getAttribute(attributeNames[a]);
                            });
                            component.routings.push(routing);
                            if (!component.routingPaths) {
                                component.routingPaths = [];
                            }
                            if (!component.routingPaths.includes(routing.path)) {
                                component.routingPaths.push(routing.path);
                            }
                            if (!_top.global.get("routingPaths")) {
                                _top.global.set("routingPaths", []);
                            }
                            if (!_top.global.get("routingPaths").includes(routing.path)) {
                                _top.global.get("routingPaths").push(routing.path);
                            }
                        });
                    }
                }
            } else {
                // not yet implemented.
            }
            resolve();

        });
    }

    parseTemplate(template) {
        var _self = this;
        var _parsedAssignmentText;
        var value = template;
        if (Object.hasOwnProperty.call(_self, "templateHandler")) {
            var templateHandlerName = _self.templateHandler;
            logger.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
            var templateHandlerClass = ClassFactory(templateHandlerName);
            var templateInstance = New(templateHandlerClass, {
                component: _self,
                template: value
            });
            templateInstance.component = _self;
            var selfData = _self.data;
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

    _reroute_() {
        /* This method set the selected routing and makes the switch to the templateURI */
        var rc = this;
        return new Promise(function (resolve, reject) {
            if (isBrowser) {
                if (__valid_routing_way__(rc.validRoutingWays, rc.routingWay)) {
                    rc.routingPath = document.location[rc.routingWay];
                    rc.routingSelected.map(function (routing, r) {
                        var componentURI = ComponentURI({
                            "COMPONENTS_BASE_PATH": _top.CONFIG.get("componentsBasePath"),
                            "COMPONENT_NAME": routing.name.toString(),
                            "TPLEXTENSION": (Object.hasOwnProperty.call(routing, "tplextension")) ? (routing.tplextension) : (rc.tplextension),
                            "TPL_SOURCE": "default" /* here is always default in order to get the right uri */
                        });
                        rc.templateURI = componentURI;
                    });
                    if (rc.routingSelected.length > 0) {
                        rc.template = "";
                        rc.body.innerHTML = "";
                    }
                }
            }
            resolve(rc);

        });
    }

    lazyLoadImages() {
        if (isBrowser) {
            var component = this;
            var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
            var _imgLazyLoaded = [..._componentRoot.subelements("img[lazy-src]")];
            var _lazyLoadImages = function (image) {
                image.setAttribute("src", image.getAttribute("lazy-src"));
                image.onload = () => {
                    image.removeAttribute("lazy-src");
                };
            };
            if ("IntersectionObserver" in window) {
                var observer = new IntersectionObserver((items, observer) => {
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
            } else {
                _imgLazyLoaded.map(_lazyLoadImages);
            }

        } else {
            // not yet implemented
        }
        return null;
    }

    applyTransitionEffect(effectClassName) {
        var _Effect = ClassFactory(effectClassName);
        if (typeof _Effect === "undefined") {
            throw Error(`${effectClassName} not found.`);
        }
        if (typeof _Effect !== "undefined" && is_a(_Effect, "TransitionEffect")) {
            this.effect = New(_Effect, {
                component: this
            });
            this.effect.apply(this.effect.defaultParams);
        } else {
            logger.debug(`${effectClassName} is ${__getType__(_Effect)} but is not a TransitionEffect`);
        }
    }

    applyObserveTransitionEffect(effectClassName) {
        if (isBrowser) {
            var component = this;
            var _componentRoot = (component.shadowed) ? (component.shadowRoot.host) : (component.body);
            var _applyEffect_ = function (element) {
                component.applyTransitionEffect(effectClassName);
            };
            if ("IntersectionObserver" in window) {
                var observer = new IntersectionObserver((items, observer) => {
                    items.forEach((item) => {
                        if (item.isIntersecting) {
                            _applyEffect_(item.target);
                            observer.unobserve(item.target);
                        }
                    });
                });
                observer.observe(_componentRoot);
            } else {
                _applyEffect_(_componentRoot);
            }
        } else {
            // not yet implemented
        }
        return null;
    }

    scrollIntoHash() {
        if (isBrowser) {
            var component = this;
            if (document.location.hash !== "") {
                var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
                _componentRoot.subelements(document.location.hash).map(
                    function (element) {
                        if (typeof element.scrollIntoView === "function") {
                            element.scrollIntoView(
                                _top.CONFIG.get("scrollIntoHash", {
                                    behavior: "auto",
                                    block: "top",
                                    inline: "top"
                                })
                            );
                        }
                    }
                );
            }
        } else {
            // not yet implemented
        }
    }

    i18n_translate() {
        if (isBrowser) {
            if (_top.CONFIG.get("use_i18n")) {
                var component = this;
                var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
                var lang1 = _top.CONFIG.get("lang", "en");
                var lang2 = navigator.language.slice(0, 2);
                var i18n = _top.global.get("i18n");
                if ((lang1 !== lang2) && (typeof i18n === "object" && Object.hasOwnProperty.call(i18n, "messages"))) {
                    var callback_i18n = function () {
                        var component = this;
                        return new Promise<void>(function (resolve, reject) {
                            var messages = i18n.messages.filter(function (message) {
                                return Object.hasOwnProperty.call(message, lang1) && Object.hasOwnProperty.call(message, lang2);
                            });
                            _componentRoot.subelements("ul,li,h1,h2,h3,a,b,p,input,textarea,summary,details,option,component")
                                .map(function (element) {
                                    messages.map(function (message) {
                                        var _innerHTML = element.innerHTML;
                                        _innerHTML = _innerHTML.replace(new RegExp(`${message[lang1]}`, "g"), message[lang2]);
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
                    });

                }
            }
        } else {
            // not yet implemented
        }
    }

    addComponentHelper(componentHelper) {
        var component = this;
        component._componentHelpers.push(componentHelper);
    }

    runComponentHelpers() {
        if (isBrowser) {
            var component = this;
            var __component_helpers__ = [];
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
