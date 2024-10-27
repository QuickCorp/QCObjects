"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalSettings = void 0;
const ClassFactory_1 = require("./ClassFactory");
const CONFIG_1 = require("./CONFIG");
const InheritClass_1 = require("./InheritClass");
const Logger_1 = require("./Logger");
const New_1 = require("./New");
const Package_1 = require("./Package");
const platform_1 = require("./platform");
const serviceLoader_1 = require("./serviceLoader");
const top_1 = require("./top");
class GlobalSettings extends InheritClass_1.InheritClass {
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
        let _value;
        if (typeof this._GLOBAL[name] !== "undefined") {
            _value = this._GLOBAL[name];
        }
        else if (typeof _default !== "undefined") {
            _value = _default;
        }
        return _value;
    }
    static __start__() {
        const __load__serviceWorker = function () {
            let _promise;
            if (platform_1.isBrowser) {
                _promise = new Promise(function (resolve, reject) {
                    if (("serviceWorker" in navigator) &&
                        (typeof CONFIG_1.CONFIG.get("serviceWorkerURI") !== "undefined")) {
                        CONFIG_1.CONFIG.set("serviceWorkerScope", CONFIG_1.CONFIG.get("serviceWorkerScope") ? (CONFIG_1.CONFIG.get("serviceWorkerScope")) : ("/"));
                        navigator.serviceWorker.register(CONFIG_1.CONFIG.get("serviceWorkerURI"), {
                            scope: CONFIG_1.CONFIG.get("serviceWorkerScope")
                        })
                            .then(function (registration) {
                            Logger_1.logger.debug("Service Worker Registered");
                            resolve.call(_promise, registration);
                        }, function (registration) {
                            Logger_1.logger.debug("Error registering Service Worker");
                            reject.call(_promise, registration);
                        });
                        navigator.serviceWorker.ready.then(function (registration) {
                            Logger_1.logger.debug("Service Worker Ready");
                            resolve.call(_promise, registration);
                        }, function (registration) {
                            Logger_1.logger.debug("Error loading Service Worker");
                            reject.call(_promise, registration);
                        });
                    }
                });
            }
            else {
                _promise = Promise.resolve();
            }
            return _promise;
        };
        const _buildComponents = function () {
            return new Promise((resolve) => {
                if (platform_1.isBrowser) {
                    Logger_1.logger.debug("Starting to building components");
                    try {
                        (0, top_1.buildComponentsStack)();
                    }
                    catch (e) {
                        throw Error(`Something went wrong trying to start components tree: ${e.message}`);
                    }
                    Logger_1.logger.debug("Initializing the service worker");
                    __load__serviceWorker.call(top_1._top)
                        .catch(function (e) {
                        Logger_1.logger.debug(`error loading the service worker ${e}`);
                    });
                }
                resolve();
            });
        };
        Logger_1.logger.debug("Starting to load the config settings...");
        if (CONFIG_1.CONFIG.get("useConfigService", false)) {
            Logger_1.logger.debug("Loading settings using local configuration file...");
            top_1._top.global.configService = (0, New_1.New)((0, ClassFactory_1.ClassFactory)("ConfigService"));
            top_1._top.global.configService.configLoaded = _buildComponents;
            (0, serviceLoader_1.serviceLoader)(top_1._top.global.configService);
        }
        else {
            Logger_1.logger.debug("Starting to load the components...");
            _buildComponents.call(this);
        }
    }
}
exports.GlobalSettings = GlobalSettings;
(0, Package_1.Package)("com.qcobjects", [
    GlobalSettings
]);
