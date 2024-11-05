"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigSettings = void 0;
const basePath_1 = require("./basePath");
const InheritClass_1 = require("./InheritClass");
const Package_1 = require("./Package");
class ConfigSettings extends InheritClass_1.InheritClass {
    _CONFIG = {
        "relativeImportPath": "",
        "remoteImportsPath": "",
        "remoteSDKPath": "https://sdk.qcobjects.dev/",
        "asynchronousImportsLoad": false,
        "removePackageScriptAfterLoading": true,
        "componentsBasePath": "",
        "delayForReady": 0,
        "preserveComponentBodyTag": false,
        "useConfigService": false,
        "routingWay": "hash",
        "useSDK": true,
        "useLocalSDK": false,
        "basePath": basePath_1._basePath_
    };
    static _instance;
    _CONFIG_ENC = "";
    set(name, value) {
        this._CONFIG[name] = value;
    }
    get(name, _defaultValue) {
        return this._CONFIG[name] || _defaultValue;
    }
    static get instance() {
        if (typeof ConfigSettings._instance === "undefined") {
            ConfigSettings._instance = new ConfigSettings();
        }
        return ConfigSettings._instance;
    }
}
exports.ConfigSettings = ConfigSettings;
(0, Package_1.Package)("com.qcobjects", [ConfigSettings]);
