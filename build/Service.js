"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = exports.JSONService = exports.Service = void 0;
const basePath_1 = require("./basePath");
const Crypt_1 = require("./Crypt");
const domain_1 = require("./domain");
const InheritClass_1 = require("./InheritClass");
const Logger_1 = require("./Logger");
const Package_1 = require("./Package");
const secretKey_1 = require("./secretKey");
const CONFIG_1 = require("./CONFIG");
class Service extends InheritClass_1.InheritClass {
    options;
    withCredentials;
    useHTTP2;
    // eslint-disable-next-line no-unused-vars
    mockup({ request, service }) {
        throw new Error("Method not implemented.");
    }
    name;
    responseHeaders;
    // eslint-disable-next-line no-unused-vars
    local({ request, service }) {
        throw new Error("Method not implemented.");
    }
    kind = "rest";
    /* it can be rest, mockup, local */
    domain = domain_1._domain_;
    basePath = basePath_1._basePath_;
    url = "";
    method = "GET";
    data = {};
    reload = false;
    cached = false;
    headers;
    template;
    // eslint-disable-next-line no-unused-vars
    done({ request, service }) {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line no-unused-vars
    fail(...args) {
        throw new Error("Method not implemented.");
    }
    set(name, value) {
        this[name] = value;
    }
    get(name, _default) {
        return this[name] || _default;
    }
}
exports.Service = Service;
class JSONService extends Service {
    method = "GET";
    cached = false;
    headers = {
        "Content-Type": "application/json",
        "charset": "utf-8"
    };
    JSONresponse = undefined;
    done(result) {
        Logger_1.logger.debug("***** RECEIVED RESPONSE:");
        Logger_1.logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
    }
}
exports.JSONService = JSONService;
class ConfigService extends JSONService {
    method = "GET";
    cached = false;
    configFileName = "config.json";
    headers = {
        "Content-Type": "application/json",
        "charset": "utf-8"
    };
    configLoaded() {
        throw Error("Method not implemented.");
    }
    JSONresponse = undefined;
    done(result) {
        Logger_1.logger.debug("***** CONFIG LOADED:");
        Logger_1.logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
        if (Object.hasOwn(this.JSONresponse, "__encoded__")) {
            const decodedValue = Crypt_1._Crypt.decrypt(this.JSONresponse?.__encoded__, secretKey_1._secretKey);
            this.JSONresponse = JSON.parse(decodedValue);
        }
        const jsonResponse = this.JSONresponse;
        Object.keys(jsonResponse).map((k) => {
            CONFIG_1.CONFIG.set(k, jsonResponse[k]);
            return k;
        });
        this.configLoaded().catch((e) => { throw new Error(`An error ocurred: ${e}`); });
    }
    fail() {
        this.configLoaded().catch((e) => { throw new Error(`An error ocurred: ${e}`); });
    }
    constructor() {
        super();
        this.set("url", `${this.get("basePath")}${this.get("configFileName")}`);
    }
}
exports.ConfigService = ConfigService;
(0, Package_1.Package)("com.qcobjects.api", [
    Service
]);
(0, Package_1.Package)("com.qcobjects.api.services", [
    JSONService
]);
(0, Package_1.Package)("com.qcobjects.api.config", [
    ConfigService
]);
