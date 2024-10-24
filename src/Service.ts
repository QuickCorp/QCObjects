import { _basePath_ } from "./basePath";
import { _Crypt } from "./Crypt";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { Package } from "./Package";
import { _secretKey } from "./secretKey";
import { _top } from "./top";

export class Service extends InheritClass {
    kind = "rest";
    /* it can be rest, mockup, local */
    domain = _domain_;
    basePath = _basePath_;
    url = "";
    method = "GET";
    data = {};
    reload = false;
    cached = false;

    constructor(...args) {
        super(args);
    }

    set(name, value) {
        this[name] = value;
    }

    get(name) {
        return this[name];
    }

}

export class JSONService extends Service {
    method = "GET";
    cached = false;
    headers = {
        "Content-Type": "application/json",
        "charset": "utf-8"
    };
    JSONresponse = null;
    done(result) {
        logger.debug("***** RECEIVED RESPONSE:");
        logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
    }

    constructor(...args) {
        super(args);
    }

}

export class ConfigService extends JSONService {
    method = "GET";
    cached = false;
    configFileName = "config.json";
    headers = {
        "Content-Type": "application/json",
        "charset": "utf-8"
    };
    JSONresponse = null;
    done(result) {
        logger.debug("***** CONFIG LOADED:");
        logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
        if (Object.hasOwnProperty.call(this.JSONresponse, "__encoded__")) {
            this.JSONresponse = JSON.parse(_Crypt.decrypt(this.JSONresponse.__encoded__, _secretKey));
        }
        for (var k in this.JSONresponse) {
            _top.CONFIG.set(k, this.JSONresponse[k]);
        }
        this.configLoaded.call(this);
    }
    fail(result) {
        this.configLoaded.call(this);
    }

    constructor() {
        super(...arguments);
        this.set("url", this.get("basePath") + this.get("configFileName"));
    }
}


Package("com.qcobjects.api", [
    Service
]);

Package("com.qcobjects.api.services", [
    JSONService
]);

Package("com.qcobjects.api.config", [
    ConfigService
]);
