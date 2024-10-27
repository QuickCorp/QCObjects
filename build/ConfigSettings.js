"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basePath_1 = require("./basePath");
const RegisterClass_1 = require("./RegisterClass");
class ConfigSettings {
    _CONFIG;
    static _instance = null;
    static _CONFIG_ENC = null;
    static get instance() {
        if (this._instance === null) {
            const _config_settings = new ConfigSettings();
            _config_settings._CONFIG = {
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
            ConfigSettings._CONFIG_ENC = null;
            this._instance = _config_settings;
        }
        return this._instance;
    }
    static set instance(value) {
        this._instance = value;
    }
}
(0, RegisterClass_1.RegisterClass)(ConfigSettings, "com.qcobjects");
