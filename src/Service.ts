import { ServiceDoneResponse } from "types/global";
import { _basePath_ } from "./basePath";
import { _Crypt } from "./Crypt";
import { _domain_ } from "./domain";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { Package } from "./Package";
import { _secretKey } from "./secretKey";
import { _top } from "./top";
import { CONFIG } from "./CONFIG";

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

    constructor(...args:any[]) {
        super(args);
    }

    set(name:string, value:any) {
        this[name] = value;
    }

    get(name:any, _default?:any) {
        return this[name] || _default;
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
    done(result:ServiceDoneResponse) {
        logger.debug("***** RECEIVED RESPONSE:");
        logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
    }

    constructor(...args:any[]) {
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
    done(result:ServiceDoneResponse) {
        logger.debug("***** CONFIG LOADED:");
        logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
        if (Object.hasOwnProperty.call(this.JSONresponse, "__encoded__")) {
            this.JSONresponse = JSON.parse(_Crypt.decrypt((this.JSONresponse as any)?.__encoded__, _secretKey));
        }
        var jsonResponse:any = this.JSONresponse;
        for (var k in jsonResponse) {
            CONFIG.set(k, jsonResponse[k]);
        }
        this.configLoaded.call(this);
    }
    fail(...args:any[]) {
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
