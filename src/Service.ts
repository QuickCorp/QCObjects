import { _basePath_ } from "./basePath";
import { _Crypt } from "./Crypt";
import { _domain_ } from "./domain";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { Package } from "./Package";
import { _secretKey } from "./secretKey";
import { CONFIG } from "./CONFIG";
import { IJSONService, IService, TServiceDoneResponse, TServiceStandardResponse } from "./types/global";

export class Service extends InheritClass implements IService{
    options!: object;
    withCredentials!: boolean;
    useHTTP2: any;
    // eslint-disable-next-line no-unused-vars
    mockup({ request, service }: TServiceStandardResponse): void {
        throw new Error("Method not implemented.");
    }
    name!: string;
    responseHeaders: any;
    // eslint-disable-next-line no-unused-vars
    local({ request, service }: TServiceStandardResponse): void {
        throw new Error("Method not implemented.");
    }
    kind = "rest";
    /* it can be rest, mockup, local */
    domain:string = _domain_;
    basePath:string = _basePath_;
    url = "";
    method = "GET";
    data = {};
    reload = false;
    cached = false;

    headers: any;
    template: unknown;
    
    // eslint-disable-next-line no-unused-vars
    done({ request, service }: TServiceDoneResponse): void {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line no-unused-vars
    fail(...args: any[]): void {
        throw new Error("Method not implemented.");
    }

    set(name:string, value:never):void {
        this[name] = value;
    }

    get(name:string, _default?:never):any {
        return this[name] as never || _default;
    }

}

export class JSONService extends Service implements IJSONService{
    method = "GET";
    cached = false;
    headers = {
        "Content-Type": "application/json",
        "charset": "utf-8"
    };

    JSONresponse?:JSON = undefined;
    done(result:TServiceDoneResponse):void {
        logger.debug("***** RECEIVED RESPONSE:");
        logger.debug(result.service.template as string);
        this.JSONresponse = JSON.parse(result.service.template as string);
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

    configLoaded():Promise<void>{
        throw Error ("Method not implemented.");
    }

    JSONresponse?:JSON = undefined;
    done(result:TServiceDoneResponse):void {
        logger.debug("***** CONFIG LOADED:");
        logger.debug(result.service.template as string);
        this.JSONresponse = JSON.parse(result.service.template as string);
        if (Object.hasOwn(this.JSONresponse as object, "__encoded__")) {
            const decodedValue:string = _Crypt.decrypt((this.JSONresponse as any)?.__encoded__, _secretKey);
            this.JSONresponse = JSON.parse(decodedValue);
        }
        const jsonResponse:any = this.JSONresponse;
        Object.keys(jsonResponse as object).map((k:string) => {
            CONFIG.set(k, (jsonResponse as never)[k]);
            return k;
        });
        this.configLoaded().catch((e:any)=>{throw new Error (`An error ocurred: ${e}`);});
    }

    fail():void {
        this.configLoaded().catch((e:any)=>{throw new Error (`An error ocurred: ${e}`);});
    }

    constructor() {
        super();
        this.set("url", `${this.get("basePath") as string}${this.get("configFileName") as string}` as never);
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
