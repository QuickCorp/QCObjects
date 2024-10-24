import { _basePath_ } from "./basePath";
import { _QC_CLASSES } from "./PrimaryCollections";

class ConfigSettings {
    _CONFIG:any;
    static _instance = null;
    static _CONFIG_ENC = null;
    static get instance() {

      if (this._instance === null) {
        var _config_settings = new ConfigSettings();
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
          "basePath": _basePath_
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
  _QC_CLASSES["ConfigSettings"] = ConfigSettings;
