import { asyncLoad } from "./asyncLoad";
import { ComplexStorageCache } from "./ComplexStorageCache";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";
import { _require_, isBrowser } from "./platform";

/**
 * Loads a simple component from a template
 *
 * @author: Jean Machuca <correojean@gmail.com>
 * @param service a Service object
 */
export const serviceLoader = function (service, _async = false) {
    var _serviceLoaderInBrowser = function (service, _async) {
        var _promise = new Promise(
            function (resolve, reject) {

                logger.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = service.withCredentials;
                var xhrasync = true; // always async because xhr sync is deprecated
                xhr.open(service.method, service.url, xhrasync);
                for (var header in service.headers) {
                    try {
                        if (typeof service.headers[header] !== "function") {
                            xhr.setRequestHeader(header, service.headers[header]);
                        }
                    } catch (e) {
                        logger.debug("Something went wrong when assign the header " + header);
                    }
                }
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var response = xhr.responseText;
                        logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                        logger.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service.name));
                        service.template = response;
                        if (service.cached && (typeof cache !== "undefined")) {
                            cache.save(service.name, service.template);
                        }
                        if (typeof service.done === "function") {
                            var standardResponse = {
                                "request": xhr,
                                "service": service
                            };
                            service.done.call(service, standardResponse);
                            resolve.call(_promise, standardResponse);
                        }
                    } else {
                        if (typeof service.fail === "function") {
                            var standardResponse = {
                                "request": xhr,
                                "service": service
                            };
                            service.fail.call(service, standardResponse);
                            reject.call(_promise, standardResponse);
                        }
                    }
                };

                var _directLoad = function () {
                    logger.debug("SENDING THE NORMAL REQUEST  ");
                    try {
                        xhr.send(_DataStringify(service.data));
                    } catch (e) {
                        logger.debug("SOMETHING WRONG WITH REQUEST  ");
                        reject.call(_promise, {
                            request: xhr,
                            service: service
                        });
                    }
                };

                if (service.cached) {
                    var cache = new ComplexStorageCache({
                        index: service.data,
                        load(cacheController) {
                            _directLoad.call(this);
                        },
                        alternate(cacheController) {
                            if (service.method === "GET") {
                                service.template = cacheController.cache.getCached(service.name);
                                if (typeof service.done === "function") {
                                    var standardResponse = {
                                        "request": xhr,
                                        "service": service
                                    };
                                    service.done.call(service, standardResponse);
                                    resolve.call(_promise, standardResponse);
                                }
                            } else {
                                _directLoad.call(this);
                            }
                            return;
                        }
                    });
                    global.lastCache = cache;
                } else {
                    _directLoad.call(this);
                }

                return xhr;
            }
        );
        return _promise;
    };

    var _serviceLoaderInNode = function (service, _async) {
        var _promise = new Promise(
            function (resolve, reject) {
                if (typeof URL === "undefined") {
                    global.URL = (_require_("url") as any).URL;
                    let URL = global.URL;
                }
                var serviceURL = new URL(service.url);
                var req;
                service.useHTTP2 = Object.hasOwnProperty.call(service, "useHTTP2") && service.useHTTP2;


                var captureEvents = function (req) {
                    logger.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
                    var dataXML;
                    var standardResponse = {
                        "http2Client": client,
                        "request": req,
                        "service": service,
                        "responseHeaders": null
                    };

                    if (typeof service.data === "object" && service.data !== null) {
                        if (service.useHTTP2) {
                            try {
                                logger.debug("Sending data...");
                                let buffer = new Buffer(_DataStringify(service.data));
                                req.write(buffer);
                            } catch (e) {
                                logger.debug("It was not possible to send any data");
                            }
                        }
                    }

                    dataXML = "";
                    req.on("response", (responseHeaders, flags) => {
                        logger.debug("receiving response...");
                        standardResponse.responseHeaders = responseHeaders;
                        /*
                        for (const name in responseHeaders) {
                          logger.debug(`${name}: ${responseHeaders[name]}`);
                        }
                        */
                        dataXML = "";
                    });
                    req.on("data", (chunk) => {
                        logger.debug("receiving data...");
                        // do something with the data
                        dataXML += "" + chunk.toString();
                        service.template = dataXML;
                    });
                    if (service.useHTTP2) {
                        req.resume();
                    }
                    req.on("end", () => {
                        logger.debug("ending call...");
                        service.template = dataXML;
                        if (Object.hasOwnProperty.call(service, "useHTTP2") && service.useHTTP2) {
                            client.destroy();
                        } else {
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
                    var requestOptions;
                    if (service.useHTTP2) {
                        logger.debug("using http2");
                        var http2 = _require_("http2");
                        var client = (http2 as any).connect(serviceURL.origin);
                        requestOptions = Object.assign({
                            ":method": service.method,
                            ":path": serviceURL.pathname
                        }, service.options);
                        requestOptions = Object.assign(requestOptions, service.headers);
                        req = client.request(requestOptions);
                        req.setEncoding("utf8");
                        captureEvents(req);
                    } else {
                        if (serviceURL.protocol === "http:") {
                            var http = _require_("http");
                            var request = (http as any).request;
                            requestOptions = Object.assign({
                                "url": service.url,
                                headers: service.headers
                            }, service.options);
                            var req = request(service.url);
                            captureEvents(req);
                        } else if (serviceURL.protocol === "https:") {
                            var https = _require_("https");
                            requestOptions = Object.assign({
                                hostname: serviceURL.hostname,
                                port: serviceURL.port,
                                path: serviceURL.pathname,
                                method: service.method,
                                headers: service.headers
                            }, service.options);
                            var _req_ = (https as any).request(requestOptions, function (req) {
                                captureEvents(req);
                            });
                            _req_.end();
                        } else {
                            var e = "Protocol not supported: " + serviceURL.protocol;
                            logger.debug(e);
                            throw new Error(e);
                        }
                    }


                } catch (e) {
                    logger.debug(e);
                    service.fail.call(service, e);
                    reject.call(_promise, e);

                }
            }).catch(function (e) {
                console.log(e);
                logger.debug("Something happened when trying to call the service: " + service.name);
                service.fail.call(service, e);
            });
        return _promise;

    };

    var _serviceLoaderMockup = function (service, _async) {
        var _promise = new Promise(
            function (resolve, reject) {
                logger.debug(`Calling mockup service ${service.name} ...`);
                var standardResponse = {
                    "request": null,
                    "service": service,
                    "responseHeaders": service.responseHeaders
                };
                if (typeof service.mockup === "function") {
                    service.mockup.call(service, standardResponse);
                } else {
                    service.done.call(service, standardResponse);
                }
                resolve.call(_promise, standardResponse);
            });
        return _promise;
    };
    var _serviceLoaderLocal = function (service, _async) {
        var _promise = new Promise(
            function (resolve, reject) {
                logger.debug(`Calling local service ${service.name} ...`);
                var standardResponse = {
                    "request": null,
                    "service": service,
                    "responseHeaders": service.responseHeaders
                };
                if (typeof service.local === "function") {
                    service.local.call(service, standardResponse);
                } else {
                    service.done.call(service, standardResponse);
                }
                resolve.call(_promise, standardResponse);
            });
        return _promise;
    };

    var _ret_;
    switch (service.kind) {
        case "rest":
            if (isBrowser) {
                if (typeof _async !== "undefined" && _async) {
                    _ret_ = asyncLoad(_serviceLoaderInBrowser, arguments);
                } else {
                    _ret_ = _serviceLoaderInBrowser(service, _async);
                }
            } else {
                _ret_ = _serviceLoaderInNode(service, _async);
            }
            break;
        case "mockup":
            _ret_ = _serviceLoaderMockup(service, _async);
            break;
        case "local":
            _ret_ = _serviceLoaderLocal(service, _async);
            break;
        default:
            logger.debug(`The value of the kind property of the service ${service.name} is not valid`);
            break;
    }
    return _ret_;
};
