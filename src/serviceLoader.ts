import { asyncLoad } from "./asyncLoad";
import { ComplexStorageCache } from "./ComplexStorageCache";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";
import { _require_, isBrowser } from "./platform";
import { Service } from "./Service";
import { _top } from "./top";

/**
 * Loads a simple component from a template
 *
 * @author: Jean Machuca <correojean@gmail.com>
 * @param service a Service object
 */
export const serviceLoader = function (service:Service, _async = false) {
    const _serviceLoaderInBrowser:(service: Service, _async: any)=> Promise<unknown> = function (service:Service, _async:boolean):Promise<unknown> {
        var _promise = new Promise(
            function (resolve, reject) {

                logger.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
                const xhr = new XMLHttpRequest();
                xhr.withCredentials = service.withCredentials;
                const xhrasync = true; // always async because xhr sync is deprecated
                xhr.open(service.method, service.url, xhrasync);
                for (const header in service.headers) {
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
                        const response = xhr.responseText;
                        logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                        logger.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service.name));
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
                    } else {
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
                    logger.debug("SENDING THE NORMAL REQUEST  ");
                    try {
                        xhr.send(_DataStringify(service.data));
                    } catch (e) {
                        logger.debug("SOMETHING WRONG WITH REQUEST  ");
                        reject.call(_promise, {
                            request: xhr,
                            service
                        });
                    }
                };

                if (service.cached) {
                    var cache = new ComplexStorageCache({
                        index: service.data,
                        load() {
                            _directLoad.call(this);
                        },
                        alternate(cacheController:{ cache: { getCached: (arg0: any) => any; }; }) {
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
                            } else {
                                _directLoad();
                            }
                            
                        }
                    });
                    (_top as any).lastCache = cache;
                } else {
                    _directLoad();
                }

                return xhr;
            }
        );
        return _promise;
    };

    const _serviceLoaderInNode = function (service:Service, _async:boolean) {
        var _promise = new Promise(
            function (resolve, reject) {
                if (typeof URL === "undefined") {
                    global.URL = (_require_("url") as any).URL;
                    const URL = global.URL;
                }
                const serviceURL = new URL(service.url);
                var req;
                service.useHTTP2 = Object.hasOwnProperty.call(service, "useHTTP2") && service.useHTTP2;


                const captureEvents = function (req:any) {
                    logger.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
                    let dataXML:any;
                    const standardResponse = {
                        "http2Client": client,
                        "request": req,
                        service,
                        "responseHeaders": null
                    };

                    if (typeof service.data === "object" && service.data !== null) {
                        if (service.useHTTP2) {
                            try {
                                logger.debug("Sending data...");
                                const buffer = new Buffer(_DataStringify(service.data));
                                req.write(buffer);
                            } catch (e) {
                                logger.debug("It was not possible to send any data");
                            }
                        }
                    }

                    dataXML = "";
                    req.on("response", (responseHeaders:any, flags:any) => {
                        logger.debug("receiving response...");
                        standardResponse.responseHeaders = responseHeaders;
                        /*
                        for (const name in responseHeaders) {
                          logger.debug(`${name}: ${responseHeaders[name]}`);
                        }
                        */
                        dataXML = "";
                    });
                    req.on("data", (chunk:any) => {
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
                    let requestOptions;
                    if (service.useHTTP2) {
                        logger.debug("using http2");
                        const http2 = _require_("http2");
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
                            const http = _require_("http");
                            const request = (http as any).request;
                            requestOptions = Object.assign({
                                "url": service.url,
                                headers: service.headers
                            }, service.options);
                            var req = request(service.url);
                            captureEvents(req);
                        } else if (serviceURL.protocol === "https:") {
                            const https = _require_("https");
                            requestOptions = Object.assign({
                                hostname: serviceURL.hostname,
                                port: serviceURL.port,
                                path: serviceURL.pathname,
                                method: service.method,
                                headers: service.headers
                            }, service.options);
                            const _req_ = (https as any).request(requestOptions, function (req:any) {
                                captureEvents(req);
                            });
                            _req_.end();
                        } else {
                            const e = "Protocol not supported: " + serviceURL.protocol;
                            logger.debug(e);
                            throw new Error(e);
                        }
                    }


                } catch (e:any) {
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

    const _serviceLoaderMockup = function (service:Service, _async:boolean) {
        var _promise = new Promise(
            function (resolve, reject) {
                logger.debug(`Calling mockup service ${service.name} ...`);
                const standardResponse = {
                    "request": null,
                    service,
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
    const _serviceLoaderLocal = function (service:Service, _async:boolean) {
        var _promise = new Promise(
            function (resolve, reject) {
                logger.debug(`Calling local service ${service.name} ...`);
                const standardResponse = {
                    "request": null,
                    service,
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

    let _ret_;
    switch (service.kind) {
        case "rest":
            if (isBrowser) {
                if (typeof _async !== "undefined" && _async) {
                    _ret_ = asyncLoad(_serviceLoaderInBrowser, [service, _async]);
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
