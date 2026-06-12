"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentLoader = void 0;
const asyncLoad_1 = require("./asyncLoad");
const ComplexStorageCache_1 = require("./ComplexStorageCache");
const DataStringify_1 = require("./DataStringify");
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
const top_1 = require("./top");
/**
 * Loads a simple component from a template
 *
 * @author: Jean Machuca <correojean@gmail.com>
 * @param component a Component object
 */
const componentLoader = function (component, _async) {
    let __promise__;
    const _componentLoaderInBrowser = function (component) {
        __promise__ = new Promise(function (resolve, reject) {
            const _promise = component.__promise__;
            const container = (Object.hasOwn(component, "container") && typeof component.container !== "undefined" && component.container !== null) ? (component.container) : (component.body);
            if (container !== null) {
                const _feedComponent_ = function (component) {
                    component.feedComponent();
                    const standardResponse = {
                        "request": xhr,
                        component
                    };
                    resolve.call(_promise, standardResponse);
                };
                Logger_1.logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", (0, DataStringify_1._DataStringify)(component.data)).replace("{{URL}}", component.url));
                const _componentLoaded = function () {
                    const successStatus = (is_file) ? (0) : (200);
                    if (xhr.status === successStatus) {
                        const response = xhr.responseText;
                        Logger_1.logger.debug("Data received {{DATA}}".replace("{{DATA}}", (0, DataStringify_1._DataStringify)(response)));
                        Logger_1.logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
                        component.template = response;
                        if (component.cached && (typeof cache !== "undefined")) {
                            cache.save(component.name, component.template);
                        }
                        _feedComponent_(component);
                    }
                    else {
                        const standardResponse = {
                            "request": xhr,
                            component
                        };
                        reject.call(_promise, standardResponse);
                    }
                };
                if (typeof component.template === "string" && component.template !== "") {
                    // component already has a template it does not need to be reloaded
                    _feedComponent_(component);
                }
                else {
                    var is_file = !!(component.url.startsWith("file:"));
                    var xhr = new XMLHttpRequest();
                    if (!is_file) {
                        try {
                            Logger_1.logger.debug("Calling the url of component in async mode.");
                            xhr.open(component.method, component.url, true);
                        }
                        catch (e) {
                            Logger_1.logger.debug(`An error ocurred: ${e}.`);
                            Logger_1.logger.debug("Last try has failed... The component cannot be loaded.");
                        }
                    }
                    else {
                        if ("fetch" in top_1._top) {
                            Logger_1.logger.debug("I can use fetch...");
                            Logger_1.logger.debug("It is a file to be loaded, so I will try to use fetch");
                            fetch(component.url).then(response => {
                                Logger_1.logger.debug("I got a response from fetch, so I'll feed the component");
                                response.text().then(text => {
                                    component.template = text;
                                    _feedComponent_(component);
                                })
                                    .catch((e) => { throw new Error(`An error ocurred: ${e}`); });
                            }).catch((e) => { throw new Error(`An error ocurred: ${e}`); });
                        }
                    }
                    if (!platform_1.is_phonegap && !is_file) {
                        xhr.setRequestHeader("Content-Type", "text/html");
                    }
                    if (!is_file) {
                        xhr.onload = _componentLoaded;
                    }
                    const _directLoad = function (is_file) {
                        is_file = !((typeof is_file === "undefined" || !is_file));
                        Logger_1.logger.debug("SENDING THE NORMAL REQUEST  ");
                        if (is_file) {
                            if (!("fetch" in top_1._top)) {
                                Logger_1.logger.debug("I have to try to load the file using xhr...  ");
                                xhr.send(null);
                                if (xhr.status === XMLHttpRequest.DONE) {
                                    _componentLoaded();
                                }
                            }
                        }
                        else {
                            Logger_1.logger.debug("Trying to send the data to the component...  ");
                            xhr.send((0, DataStringify_1._DataStringify)(component.data));
                        }
                    };
                    if (component.cached && (!is_file)) {
                        Logger_1.logger.debug("USING CACHE FOR COMPONENT: " + component.name);
                        var cache = new ComplexStorageCache_1.ComplexStorageCache({
                            index: component.cacheIndex,
                            load() {
                                _directLoad.call(this, is_file);
                            },
                            alternate(cacheController) {
                                if (component.method === "GET") {
                                    component.template = cacheController.cache.getCached(component.cacheIndex);
                                    _feedComponent_.call(this, component);
                                }
                                else {
                                    _directLoad.call(this, is_file);
                                }
                            }
                        });
                        top_1._top.lastCache = cache;
                    }
                    else {
                        Logger_1.logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
                        _directLoad(is_file);
                    }
                }
            }
            else {
                Logger_1.logger.debug("CONTAINER DOESNT EXIST");
            }
        });
        __promise__.then(function (standardResponse) {
            return component.__done__().then(function () {
                let _ret_;
                if (typeof component.done === "function") {
                    _ret_ = component.done.call(component, standardResponse);
                }
                return Promise.resolve(_ret_);
            });
        }, function (standardResponse) {
            if (typeof component.fail === "function") {
                component.fail.call(component, standardResponse)
                    .catch((e) => { throw new Error(`${e}`); });
            }
            return Promise.reject(new Error("An error ocurred"));
        }).catch(function (e) {
            Logger_1.logger.debug("Something wrong loading the component");
            throw new Error(`An error ocurred: ${e}`);
        });
        return __promise__;
    };
    const _componentLoaderInNode = function (component) {
        __promise__ = new Promise(function (resolve, reject) {
            const _promise = __promise__;
            const _feedComponent_ = function (component) {
                component.feedComponent()
                    .catch((e) => {
                    throw new Error(`An error ocurred trying to feed the component: ${component.name}. Error: ${e}`);
                });
                const standardResponse = {
                    "request": null,
                    component
                };
                resolve.call(_promise, standardResponse);
            };
            Logger_1.logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", (0, DataStringify_1._DataStringify)(component.data)).replace("{{URL}}", component.url));
            const _componentLoaded = function (err, responseText) {
                if (!err) {
                    const response = responseText.toString();
                    Logger_1.logger.debug("Data received {{DATA}}".replace("{{DATA}}", (0, DataStringify_1._DataStringify)(response)));
                    Logger_1.logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
                    component.template = response;
                    if (component.cached && (typeof cache !== "undefined")) {
                        cache.save(component.name, component.template);
                    }
                    _feedComponent_(component);
                }
                else {
                    const standardResponse = {
                        "request": null,
                        component
                    };
                    reject.call(_promise, standardResponse);
                }
            };
            if (typeof component.template === "string" && component.template !== "") {
                // component already has a template it does not need to be reloaded
                _feedComponent_(component);
            }
            else {
                Logger_1.logger.debug("Loading the component as a local file in server...");
                const _directLoad = function () {
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    const { readFile } = require("node:fs");
                    Logger_1.logger.debug("SENDING THE NORMAL REQUEST  ");
                    readFile(component.url, _componentLoaded);
                };
                if (component.cached) {
                    Logger_1.logger.debug("USING CACHE FOR COMPONENT: " + component.name);
                    var cache = new ComplexStorageCache_1.ComplexStorageCache({
                        index: component.cacheIndex,
                        load() {
                            _directLoad();
                        },
                        alternate(cacheController) {
                            if (component.method === "GET") {
                                component.template = cacheController.cache.getCached(component.cacheIndex);
                                _feedComponent_.call(this, component);
                            }
                            else {
                                _directLoad.call(this);
                            }
                        }
                    });
                    top_1._top.lastCache = cache;
                }
                else {
                    Logger_1.logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
                    _directLoad();
                }
            }
        });
        __promise__.then(function (standardResponse) {
            return component.__done__().then(function () {
                let _ret_;
                if (typeof component.done === "function") {
                    _ret_ = component.done.call(component, standardResponse);
                }
                return Promise.resolve(_ret_);
            });
        }, function (standardResponse) {
            if (typeof component.fail === "function") {
                component.fail.call(component, standardResponse)
                    .catch((e) => { throw new Error(`An error ocurred: ${e}`); });
            }
            return Promise.reject(new Error("An error ocurred."));
        }).catch(function (e) {
            Logger_1.logger.debug(`Something wrong loading the component: ${e}`);
        });
        return __promise__;
    };
    let _ret_;
    if (platform_1.isBrowser) {
        if (typeof _async !== "undefined" && _async) {
            _ret_ = (0, asyncLoad_1.asyncLoad)(_componentLoaderInBrowser, [component, _async]);
        }
        else {
            _ret_ = _componentLoaderInBrowser(component);
        }
    }
    else {
        _ret_ = _componentLoaderInNode(component);
    }
    return _ret_;
};
exports.componentLoader = componentLoader;
