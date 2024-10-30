import { IGlobalSettings } from "types";
import { CONFIG } from "./CONFIG";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { Package } from "./Package";
import { isBrowser } from "./platform";
import { serviceLoader } from "./serviceLoader";
import { _top, buildComponentsStack, configService, setConfigService } from "./top";
import { ConfigService } from "./Service";

export class GlobalSettings extends InheritClass implements IGlobalSettings{
  [key: string]: any;

  _GLOBAL:any = {};
  private static _instance:GlobalSettings;
  get instance ():GlobalSettings{
    if (typeof GlobalSettings._instance === "undefined"){
      GlobalSettings._instance = new GlobalSettings();
    }
    return GlobalSettings._instance;
  }

  set(name: string, value: any) {
    this._GLOBAL[name] = value;
  }

  get(name: string, _default?: any):any {
    let _value:any;
    if (typeof this._GLOBAL[name] !== "undefined") {
      _value = this._GLOBAL[name];
    } else if (typeof _default !== "undefined") {
      _value = _default;
    }
    return _value;
  }

  __start__():Promise<any> {
    const __load__serviceWorker = function () {
      let _promise: Promise<ServiceWorkerRegistration> | Promise<unknown>;
      if (isBrowser) {
        _promise = new Promise<ServiceWorkerRegistration>(function (resolve, reject) {
          if (("serviceWorker" in navigator) &&
            (typeof CONFIG.get("serviceWorkerURI") !== "undefined")) {
            CONFIG.set("serviceWorkerScope", CONFIG.get("serviceWorkerScope") ? (CONFIG.get("serviceWorkerScope")) : ("/"));
            navigator.serviceWorker.register(CONFIG.get("serviceWorkerURI"), {
              scope: CONFIG.get("serviceWorkerScope")
            })
              .then(function (registration) {
                logger.debug("Service Worker Registered");
                resolve.call(_promise, registration);
              }, function (registration) {
                logger.debug("Error registering Service Worker");
                reject.call(_promise, registration);
              });
            navigator.serviceWorker.ready.then(function (registration) {
              logger.debug("Service Worker Ready");
              resolve.call(_promise, registration);
            }, function (registration) {
              logger.debug("Error loading Service Worker");
              reject.call(_promise, registration);
            });
          }
        });
      } else {
        _promise = Promise.resolve();
      }
      return _promise;
    };
    const _buildComponents = function () {
      return new Promise<void>((resolve) => {
        if (isBrowser) {
          logger.debug("Starting to building components");
          try {
            buildComponentsStack();
          } catch (e: any) {
            throw Error(`Something went wrong trying to start components tree: ${e.message}`);
          }
          logger.debug("Initializing the service worker");
          __load__serviceWorker.call(_top)
            .catch(function (e) {
              logger.debug(`error loading the service worker ${e}`);
            });
        }
        resolve();
      });
    };

    return new Promise<any> ((resolve) => {
      logger.debug("Starting to load the config settings...");
      if (CONFIG.get("useConfigService", false)) {
        logger.debug("Loading settings using local configuration file...");
        setConfigService(new ConfigService());
        configService.configLoaded = _buildComponents;
        serviceLoader(configService)
        ?.then((standardResponse:any)=> {
          resolve(standardResponse);
        })
        ?.catch ((e:any) => {throw new Error (`An error ocurred while trying to load ${configService.url}: ${e}`);});
      } else {
        logger.debug("Starting to load the components...");
        _buildComponents.call(this)
        .then(()=> {
          resolve({});
        })
        .catch((e:any) => {throw new Error (`An error ocurred while trying to build the components stack. ${e}`);});
      }
  
    });
  }

}

Package("com.qcobjects", [
  GlobalSettings
]);
