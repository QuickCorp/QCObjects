import { asyncLoad } from "./asyncLoad";
import { ComplexStorageCache } from "./ComplexStorageCache";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";
import { _require_, is_phonegap, isBrowser } from "./platform";
import { _top } from "./top";

/**
 * Loads a simple component from a template
 *
 * @author: Jean Machuca <correojean@gmail.com>
 * @param component a Component object
 */
export const componentLoader = function (component, _async) {
    var __promise__;
    var _componentLoaderInBrowser = function (component, _async) {
        __promise__ = new Promise(function (resolve, reject) {
            var _promise = component.__promise__;
            var container = (Object.hasOwnProperty.call(component, "container") && typeof component.container !== "undefined" && component.container !== null) ? (component.container) : (component.body);
            if (container !== null) {
                var _feedComponent_ = function (component) {
                    component.feedComponent();
                    var standardResponse = {
                        "request": xhr,
                        "component": component
                    };
                    resolve.call(_promise, standardResponse);
                };
                logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component.data)).replace("{{URL}}", component.url));

                var _componentLoaded = function () {
                    var successStatus = (is_file) ? (0) : (200);
                    if (xhr.status === successStatus) {
                        var response = xhr.responseText;
                        logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                        logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
                        component.template = response;
                        if (component.cached && (typeof cache !== "undefined")) {
                            cache.save(component.name, component.template);
                        }
                        _feedComponent_.call(this, component);
                    } else {
                        var standardResponse = {
                            "request": xhr,
                            "component": component
                        };
                        reject.call(_promise, standardResponse);

                    }
                };
                if (typeof component.template === "string" && component.template !== "") {
                    // component already has a template it does not need to be reloaded
                    _feedComponent_.call(this, component);
                } else {
                    var is_file = (component.url.startsWith("file:")) ? (true) : (false);
                    var xhr = new XMLHttpRequest();
                    if (!is_file) {
                        try {
                            logger.debug("Calling the url of component in async mode.");
                            xhr.open(component.method, component.url, true);
                        } catch (e) {
                            logger.debug("Last try has failed... The component cannot be loaded.");
                        }
                    } else {
                        if ("fetch" in _top) {
                            logger.debug("I can use fetch...");
                            logger.debug("It is a file to be loaded, so I will try to use fetch");
                            var _p = fetch(component.url).then(response => {
                                logger.debug("I got a response from fetch, so I'll feed the component");
                                response.text().then(text => {
                                    component.template = text;
                                    _feedComponent_.call(this, component);
                                });
                            });
                        }
                    }
                    if (!is_phonegap && !is_file) {
                        xhr.setRequestHeader("Content-Type", "text/html");
                    }
                    if (!is_file) {
                        xhr.onload = _componentLoaded;
                    }
                    var _directLoad = function (is_file) {
                        is_file = (typeof is_file === "undefined" || !is_file) ? (false) : (true);
                        logger.debug("SENDING THE NORMAL REQUEST  ");
                        if (is_file) {
                            if (!("fetch" in _top)) {
                                logger.debug("I have to try to load the file using xhr...  ");
                                xhr.send(null);
                                if (xhr.status === XMLHttpRequest.DONE) {
                                    _componentLoaded.call(this);
                                }
                            }
                        } else {
                            logger.debug("Trying to send the data to the component...  ");
                            xhr.send(_DataStringify(component.data));
                        }
                    };

                    if (component.cached && (!is_file)) {
                        logger.debug("USING CACHE FOR COMPONENT: " + component.name);
                        var cache = new ComplexStorageCache({
                            index: component.cacheIndex,
                            load(cacheController) {
                                _directLoad.call(this, is_file);
                            },
                            alternate(cacheController) {
                                if (component.method === "GET") {
                                    component.template = cacheController.cache.getCached(component.cacheIndex);
                                    _feedComponent_.call(this, component);
                                } else {
                                    _directLoad.call(this, is_file);
                                }
                                return;
                            }
                        });
                        global.lastCache = cache;
                    } else {
                        logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
                        _directLoad.call(this, is_file);
                    }

                }
            } else {
                logger.debug("CONTAINER DOESNT EXIST");
            }
        });
        __promise__.then(function (standardResponse) {
            return component.__done__().then(function () {
                var _ret_;
                if (typeof component.done === "function") {
                    _ret_ = component.done.call(component, standardResponse);
                }
                return Promise.resolve(_ret_);
            });
        }, function (standardResponse) {
            var _ret_;
            if (typeof component.fail === "function") {
                _ret_ = component.fail.call(component, standardResponse);
            }
            return Promise.reject(_ret_);
        }).catch(function (e) {
            logger.debug("Something wrong loading the component");
        });
        return __promise__;
    };
    var _componentLoaderInNode = function (component, _async) {
        __promise__ = new Promise(function (resolve, reject) {
            var _promise = __promise__;
            var _feedComponent_ = function (component) {
                component.feedComponent();
                var standardResponse = {
                    "request": null,
                    "component": component
                };
                resolve.call(_promise, standardResponse);
            };
            logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component.data)).replace("{{URL}}", component.url));

            var _componentLoaded = function (err, responseText) {
                if (!err) {
                    var response = responseText.toString();
                    logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                    logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
                    component.template = response;
                    if (component.cached && (typeof cache !== "undefined")) {
                        cache.save(component.name, component.template);
                    }
                    _feedComponent_.call(this, component);
                } else {
                    var standardResponse = {
                        "request": null,
                        "component": component
                    };
                    reject.call(_promise, standardResponse);
                }
            };
            if (typeof component.template === "string" && component.template !== "") {
                // component already has a template it does not need to be reloaded
                _feedComponent_.call(this, component);
            } else {
                logger.debug("Loading the component as a local file in server...");
                var _directLoad = function (is_file) {
                    const fs = _require_("fs");
                    logger.debug("SENDING THE NORMAL REQUEST  ");
                    (fs as any).readFile(component.url, _componentLoaded);
                };

                if (component.cached) {
                    logger.debug("USING CACHE FOR COMPONENT: " + component.name);
                    var cache = new ComplexStorageCache({
                        index: component.cacheIndex,
                        load(cacheController) {
                            _directLoad.call(this);
                        },
                        alternate(cacheController) {
                            if (component.method === "GET") {
                                component.template = cacheController.cache.getCached(component.cacheIndex);
                                _feedComponent_.call(this, component);
                            } else {
                                _directLoad.call(this);
                            }
                            return;
                        }
                    });
                    global.lastCache = cache;
                } else {
                    logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
                    _directLoad.call(this);
                }

            }
        });
        __promise__.then(function (standardResponse) {
            return component.__done__().then(function () {
                var _ret_;
                if (typeof component.done === "function") {
                    _ret_ = component.done.call(component, standardResponse);
                }
                return Promise.resolve(_ret_);
            });
        }, function (standardResponse) {
            var _ret_;
            if (typeof component.fail === "function") {
                _ret_ = component.fail.call(component, standardResponse);
            }
            return Promise.reject(_ret_);
        }).catch(function (e) {
            logger.debug(`Something wrong loading the component: ${e}`);
        });
        return __promise__;
    };

    var _ret_;
    if (isBrowser) {
        if (typeof _async !== "undefined" && _async) {
            _ret_ = asyncLoad(_componentLoaderInBrowser, arguments);
        } else {
            _ret_ = _componentLoaderInBrowser(component, _async);
        }
    } else {
        _ret_ = _componentLoaderInNode(component, _async);
    }
    return _ret_;
};