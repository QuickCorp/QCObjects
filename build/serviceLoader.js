"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceLoader = void 0;
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
 * @param service a Service object
 */
const serviceLoader = function (service, _async = false) {
    const _serviceLoaderInBrowser = function (service) {
        var _promise = new Promise(function (resolve, reject) {
            Logger_1.logger.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", (0, DataStringify_1._DataStringify)(service.data)).replace("{{URL}}", service.url));
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = service.withCredentials;
            const xhrasync = true; // always async because xhr sync is deprecated
            xhr.open(service.method, service.url, xhrasync);
            for (const header in service.headers) {
                try {
                    if (typeof service.headers[header] !== "function") {
                        xhr.setRequestHeader(header, service.headers[header]);
                    }
                }
                catch (e) {
                    Logger_1.logger.debug("Something went wrong when assign the header " + header);
                    Logger_1.logger.debug(`An error ocurred: ${e}`);
                }
            }
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const response = xhr.responseText;
                    Logger_1.logger.debug("Data received {{DATA}}".replace("{{DATA}}", (0, DataStringify_1._DataStringify)(response)));
                    Logger_1.logger.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service.name));
                    service.template = response;
                    if (service.cached && (typeof cache !== "undefined")) {
                        cache.save(service.name, service.template);
                    }
                    if (typeof service.done === "function") {
                        var standardResponse = {
                            "request": xhr,
                            service
                        };
                        service.done.call(service, standardResponse);
                        resolve.call(_promise, standardResponse);
                    }
                }
                else {
                    if (typeof service.fail === "function") {
                        var standardResponse = {
                            "request": xhr,
                            service
                        };
                        service.fail.call(service, standardResponse);
                        reject.call(_promise, standardResponse);
                    }
                }
            };
            const _directLoad = function () {
                Logger_1.logger.debug("SENDING THE NORMAL REQUEST  ");
                try {
                    xhr.send((0, DataStringify_1._DataStringify)(service.data));
                }
                catch (e) {
                    Logger_1.logger.debug("SOMETHING WRONG WITH REQUEST  ");
                    Logger_1.logger.debug(`An error ocurred: ${e}`);
                    reject.call(_promise, {
                        request: xhr,
                        service
                    });
                }
            };
            if (service.cached) {
                var cache = new ComplexStorageCache_1.ComplexStorageCache({
                    index: service.data,
                    load() {
                        _directLoad.call(this);
                    },
                    alternate(cacheController) {
                        if (service.method === "GET") {
                            service.template = cacheController.cache.getCached(service.name);
                            if (typeof service.done === "function") {
                                const standardResponse = {
                                    "request": xhr,
                                    service
                                };
                                service.done.call(service, standardResponse);
                                resolve.call(_promise, standardResponse);
                            }
                        }
                        else {
                            _directLoad();
                        }
                    }
                });
                top_1._top.lastCache = cache;
            }
            else {
                _directLoad();
            }
            return xhr;
        });
        return _promise;
    };
    const _serviceLoaderInNode = function (service) {
        var _promise = new Promise(function (resolve, reject) {
            if (typeof URL === "undefined") {
                global.URL = ((0, platform_1._require_)("url")).URL;
                // eslint-disable-next-line no-unused-vars
                const URL = global.URL;
            }
            const serviceURL = new URL(service.url);
            var req;
            service.useHTTP2 = Object.hasOwn(service, "useHTTP2") && service.useHTTP2;
            const captureEvents = function (req) {
                Logger_1.logger.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", (0, DataStringify_1._DataStringify)(service.data)).replace("{{URL}}", service.url));
                let dataXML;
                const standardResponse = {
                    "http2Client": client,
                    "request": req,
                    service,
                    "responseHeaders": null
                };
                if (typeof service.data === "object" && service.data !== null) {
                    if (service.useHTTP2) {
                        try {
                            Logger_1.logger.debug("Sending data...");
                            const buffer = new Buffer((0, DataStringify_1._DataStringify)(service.data));
                            req.write(buffer);
                        }
                        catch (e) {
                            Logger_1.logger.debug("It was not possible to send any data");
                            Logger_1.logger.debug(`An error ocurred: ${e}`);
                        }
                    }
                }
                dataXML = "";
                req.on("response", (responseHeaders) => {
                    Logger_1.logger.debug("receiving response...");
                    standardResponse.responseHeaders = responseHeaders;
                    /*
                    for (const name in responseHeaders) {
                      logger.debug(`${name}: ${responseHeaders[name]}`);
                    }
                    */
                    dataXML = "";
                });
                req.on("data", (chunk) => {
                    Logger_1.logger.debug("receiving data...");
                    // do something with the data
                    dataXML += "" + chunk.toString();
                    service.template = dataXML;
                });
                if (service.useHTTP2) {
                    req.resume();
                }
                req.on("end", () => {
                    Logger_1.logger.debug("ending call...");
                    service.template = dataXML;
                    if (Object.hasOwn(service, "useHTTP2") && service.useHTTP2) {
                        client.destroy();
                    }
                    else {
                        req.destroy();
                    }
                    service.done.call(service, standardResponse);
                    resolve.call(_promise, standardResponse);
                });
                if (service.useHTTP2) {
                    req.end();
                }
            };
            try {
                let requestOptions;
                if (service.useHTTP2) {
                    Logger_1.logger.debug("using http2");
                    const http2 = (0, platform_1._require_)("http2");
                    var client = (http2).connect(serviceURL.origin);
                    requestOptions = Object.assign({
                        ":method": service.method,
                        ":path": serviceURL.pathname
                    }, service.options);
                    requestOptions = Object.assign(requestOptions, service.headers);
                    req = client.request(requestOptions);
                    req.setEncoding("utf8");
                    captureEvents(req);
                }
                else {
                    if (serviceURL.protocol === "http:") {
                        const http = (0, platform_1._require_)("http");
                        const request = (http).request;
                        requestOptions = Object.assign({
                            "url": service.url,
                            headers: service.headers
                        }, service.options);
                        req = request(service.url);
                        captureEvents(req);
                    }
                    else if (serviceURL.protocol === "https:") {
                        const https = (0, platform_1._require_)("https");
                        requestOptions = Object.assign({
                            hostname: serviceURL.hostname,
                            port: serviceURL.port,
                            path: serviceURL.pathname,
                            method: service.method,
                            headers: service.headers
                        }, service.options);
                        const _req_ = (https).request(requestOptions, function (req) {
                            captureEvents(req);
                        });
                        _req_.end();
                    }
                    else {
                        const e = "Protocol not supported: " + serviceURL.protocol;
                        Logger_1.logger.debug(e);
                        throw new Error(e);
                    }
                }
            }
            catch (e) {
                Logger_1.logger.debug(e);
                service.fail.call(service, e);
                reject.call(_promise, e);
            }
        }).catch((e) => {
            Logger_1.logger.debug(`Something happened when trying to call the service: ${service.name}. Error: ${e}`);
            service.fail.call(service, e);
        });
        return _promise;
    };
    const _serviceLoaderMockup = function (service) {
        var _promise = new Promise(function (resolve) {
            Logger_1.logger.debug(`Calling mockup service ${service.name} ...`);
            const standardResponse = {
                "request": null,
                service,
                "responseHeaders": service.responseHeaders
            };
            if (typeof service.mockup === "function") {
                service.mockup.call(service, standardResponse);
            }
            else {
                service.done.call(service, standardResponse);
            }
            resolve.call(_promise, standardResponse);
        });
        return _promise;
    };
    const _serviceLoaderLocal = function (service) {
        var _promise = new Promise(function (resolve) {
            Logger_1.logger.debug(`Calling local service ${service.name} ...`);
            const standardResponse = {
                "request": null,
                service,
                "responseHeaders": service.responseHeaders
            };
            if (typeof service.local === "function") {
                service.local.call(service, standardResponse);
            }
            else {
                service.done.call(service, standardResponse);
            }
            resolve.call(_promise, standardResponse);
        });
        return _promise;
    };
    let _ret_;
    switch (service.kind) {
        case "rest":
            if (platform_1.isBrowser) {
                if (typeof _async !== "undefined" && _async) {
                    _ret_ = (0, asyncLoad_1.asyncLoad)(_serviceLoaderInBrowser, [service, _async]);
                }
                else {
                    _ret_ = _serviceLoaderInBrowser(service);
                }
            }
            else {
                _ret_ = _serviceLoaderInNode(service);
            }
            break;
        case "mockup":
            _ret_ = _serviceLoaderMockup(service);
            break;
        case "local":
            _ret_ = _serviceLoaderLocal(service);
            break;
        default:
            Logger_1.logger.debug(`The value of the kind property of the service ${service.name} is not valid`);
            _ret_ = Promise.resolve();
            break;
    }
    return _ret_;
};
exports.serviceLoader = serviceLoader;
