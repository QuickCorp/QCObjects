import { _CastProps } from "./Cast";
import { ClassFactory } from "./ClassFactory";
import { Export } from "./Export";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { New } from "./New";
import { Package } from "./Package";
import { isBrowser } from "./platform";
import { serviceLoader } from "./serviceLoader";
import { _top, resetTop } from "./top";

export class GlobalSettings extends InheritClass {
    _GLOBAL = {};
    __definition = {};
    __classType = "GlobalSettings";

    constructor() {
      super(...arguments);
      this.set = GlobalSettings.set.bind(this);
      this.get = GlobalSettings.get.bind(this);
      this.__start__ = GlobalSettings.__start__.bind(this);
    }

    static set(name, value) {
      this._GLOBAL[name] = value;
    }

    static get(name, _default) {
      var _value;
      if (typeof this._GLOBAL[name] !== "undefined") {
        _value = this._GLOBAL[name];
      } else if (typeof _default !== "undefined") {
        _value = _default;
      }
      return _value;
    }

    static __start__() {
      var __load__serviceWorker = function () {
        var _promise;
        if (isBrowser) {
          _promise = new Promise(function (resolve, reject) {
            if (("serviceWorker" in navigator) &&
              (typeof _top.CONFIG.get("serviceWorkerURI") !== "undefined")) {
              _top.CONFIG.set("serviceWorkerScope", _top.CONFIG.get("serviceWorkerScope") ? (_top.CONFIG.get("serviceWorkerScope")) : ("/"));
              navigator.serviceWorker.register(_top.CONFIG.get("serviceWorkerURI"), {
                scope: _top.CONFIG.get("serviceWorkerScope")
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
        }
        return _promise;
      };
      var _buildComponents = function () {
        return new Promise<void>((resolve, reject) => {
          if (isBrowser) {
            logger.debug("Starting to building components");
            try {
              _top.componentsStack = document.buildComponents.call(document);
            } catch (e) {
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
      logger.debug("Starting to load the config settings...");
      if (_top.CONFIG.get("useConfigService", false)) {
        logger.debug("Loading settings using local configuration file...");
        _top.global.configService = New(ClassFactory("ConfigService"));
        _top.global.configService.configLoaded = _buildComponents;
        serviceLoader(_top.global.configService);
      } else {
        logger.debug("Starting to load the components...");
        _buildComponents.call(this);
      }
    }

  }

Package("com.qcobjects", [
    GlobalSettings
  ]);
