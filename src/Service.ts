import { HTMLElement, IService, QCObjectsElement, QCObjectsShadowedElement, ServiceDoneResponse } from "types/global";
import { _basePath_ } from "./basePath";
import { _Crypt } from "./Crypt";
import { _domain_ } from "./domain";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { Package } from "./Package";
import { _secretKey } from "./secretKey";
import { CONFIG } from "./CONFIG";

export class Service extends InheritClass implements IService{
    kind = "rest";
    /* it can be rest, mockup, local */
    domain = _domain_;
    basePath = _basePath_;
    url = "";
    method = "GET";
    data = {};
    reload = false;
    cached = false;

    headers: any;
    template: unknown;
    
    // eslint-disable-next-line no-unused-vars
    done({ request, service }: ServiceDoneResponse): void {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line no-unused-vars
    fail(...args: any[]): void {
        throw new Error("Method not implemented.");
    }
    __instanceID!: number;
    __classType?: string | undefined;
    __definition?: any;
    __new__?(): void {
        throw new Error("Method not implemented.");
    }
    __namespace?: string | undefined;
    body?: string | QCObjectsElement | QCObjectsShadowedElement | HTMLElement | null | undefined;

    set(name:string, value:never) {
        this[name] = value;
    }

    get(name:string, _default?:never) {
        return this[name] as never || _default;
    }

}

export class JSONService extends Service {
    method = "GET";
    cached = false;
    headers = {
        "Content-Type": "application/json",
        "charset": "utf-8"
    };

    JSONresponse:unknown = null;
    done(result:ServiceDoneResponse) {
        logger.debug("***** RECEIVED RESPONSE:");
        logger.debug(result.service.template);
        this.JSONresponse = JSON.parse(result.service.template);
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
        const jsonResponse:any = this.JSONresponse;
        for (const k in jsonResponse) {
            CONFIG.set(k, jsonResponse[k]);
        }
        this.configLoaded();
    }

    fail() {
        this.configLoaded();
    }

    constructor() {
        super();
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
