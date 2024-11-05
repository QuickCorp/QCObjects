"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackendMicroservice = void 0;
const basePath_1 = require("./basePath");
const DataStringify_1 = require("./DataStringify");
const domain_1 = require("./domain");
const InheritClass_1 = require("./InheritClass");
const Logger_1 = require("./Logger");
const Package_1 = require("./Package");
class BackendMicroservice extends InheritClass_1.InheritClass {
    stream;
    route;
    headers;
    request;
    constructor({ domain = domain_1._domain_, basePath = basePath_1._basePath_, body = null, stream = null, request = null }) {
        super({
            domain,
            basePath,
            body,
            stream,
            request
        });
        Logger_1.logger.debug("Initializing BackendMicroservice...");
        const microservice = this;
        if (typeof this.body === "undefined") {
            this.body = null;
        }
        if (typeof body !== "undefined") {
            this.body = body;
        }
        this.cors();
        microservice.stream = stream;
        stream?.on("data", (data) => {
            // data from POST, GET
            const requestMethod = request?.method.toLowerCase();
            const supportedMethods = {
                "post": microservice.post.bind(microservice),
            };
            if (Object.hasOwn(supportedMethods, requestMethod)) {
                supportedMethods[requestMethod].call(microservice, data);
            }
        });
        // data from POST, GET
        const requestMethod = request?.method.toLowerCase();
        const supportedMethods = {
            "get": microservice.get.bind(microservice),
            "head": microservice.head.bind(microservice),
            "put": microservice.put.bind(microservice),
            "delete": microservice.delete.bind(microservice),
            "connect": microservice.connect.bind(microservice),
            "options": microservice.options.bind(microservice),
            "trace": microservice.trace.bind(microservice),
            "patch": microservice.patch.bind(microservice)
        };
        if (Object.hasOwn(supportedMethods, requestMethod)) {
            supportedMethods[requestMethod].call(microservice);
        }
    }
    cors() {
        if (this.route.cors) {
            Logger_1.logger.debug("Validating CORS...");
            const { allow_origins, allow_credentials, allow_methods, allow_headers } = this.route.cors;
            const microservice = this;
            if (typeof microservice.headers !== "object") {
                microservice.headers = {};
            }
            if (typeof microservice.route.responseHeaders !== "object") {
                microservice.route.responseHeaders = {};
            }
            if (typeof allow_origins !== "undefined") {
                Logger_1.logger.debug("CORS: allow_origins available. Validating origins...");
                // an example of allow_origins is ['https://example.com','http://www.example.com']
                if (allow_origins === "*" || (typeof microservice.request.headers.origin === "undefined") || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
                    // for compatibility with all browsers allways return a wildcard when the origin is allowed
                    Logger_1.logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
                    microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
                }
                else {
                    Logger_1.logger.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
                    Logger_1.logger.debug("CORS: Forcing to finish the response...");
                    this.body = {};
                    try {
                        this.done();
                    }
                    catch (e) {
                        Logger_1.logger.debug(`It was not possible to finish the call to the microservice: ${e}`);
                    }
                }
            }
            else {
                Logger_1.logger.debug("CORS: no allow_origins available. Allowing all origins...");
                Logger_1.logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
                microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
            }
            if (typeof allow_credentials !== "undefined") {
                Logger_1.logger.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
                microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
            }
            else {
                Logger_1.logger.debug("CORS: No allow_credentials present. Allowing all credentials.");
                microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
            }
            if (typeof allow_methods !== "undefined") {
                Logger_1.logger.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
                microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
            }
            else {
                Logger_1.logger.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
                microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
            }
            if (typeof allow_headers !== "undefined") {
                Logger_1.logger.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
                microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
            }
            else {
                Logger_1.logger.debug("CORS: No allow_headers present. Allowing all headers...");
                microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
            }
        }
        else {
            Logger_1.logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
        }
    }
    head(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.head] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    get(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.get] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    post(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.post] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    put(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.put] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    delete(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.delete] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    connect(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.connect] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    options(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.options] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    trace(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.trace] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    patch(formData) {
        Logger_1.logger.debug(`[BackendMicroservice.patch] Data received: ${(0, DataStringify_1._DataStringify)(formData)}`);
        this.done();
    }
    finishWithBody(stream) {
        try {
            Logger_1.logger.debug("[BackendMicroservice.finishWithBody] Ending the stream...");
            Logger_1.logger.debug(`[BackendMicroservice.finishWithBody] type of body is: ${typeof this.body}`);
            if (typeof this.body !== "string") {
                this.body = (0, DataStringify_1._DataStringify)(this.body);
            }
            Logger_1.logger.debug(`[BackendMicroservice.finishWithBody] \n body: ${this.body} `);
            stream?.write(this.body);
            stream?.end();
            Logger_1.logger.debug("[BackendMicroservice.finishWithBody] Stream ended.");
        }
        catch (e) {
            Logger_1.logger.debug(`[BackendMicroservice.finishWithBody] Something went wrong ending the stream: ${e}`);
        }
    }
    done() {
        Logger_1.logger.debug("[BackendMicroservice.done] Finalizing the response...");
        const microservice = this;
        const stream = microservice.stream;
        try {
            Logger_1.logger.debug("[BackendMicroservice.done] Sending response headers...");
            if (microservice.route.responseHeaders) {
                Logger_1.logger.debug(`[BackendMicroservice.done] Response headers present: ${Object.keys(microservice.route.responseHeaders).join(",")}`);
                stream.respond(microservice.route.responseHeaders);
            }
            else {
                throw Error("[BackendMicroservice.done] No headers present.");
            }
        }
        catch (e) {
            Logger_1.logger.debug(`[BackendMicroservice.done] Something went wrong sending response headers: ${e}`);
        }
        if (microservice.body !== null) {
            try {
                Logger_1.logger.debug("[BackendMicroservice.done] A body of message is present. Finalizing the response...");
                microservice.finishWithBody.call(microservice, stream);
            }
            catch (e) {
                Logger_1.logger.debug(`[BackendMicroservice.done] Something went wrong finalizing the response: ${e}`);
            }
        }
        else {
            Logger_1.logger.debug("[BackendMicroservice.done] No body present. Ending stream...");
            stream.end();
        }
    }
}
exports.BackendMicroservice = BackendMicroservice;
(0, Package_1.Package)("com.qcobjects.api", [
    BackendMicroservice
]);
