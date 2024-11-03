import { _basePath_ } from "./basePath";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";

type TConfigSettings = {
  [key: string]: any,
  relativeImportPath:string,
  remoteImportsPath:string,
  remoteSDKPath:string,
  asynchronousImportsLoad:boolean,
  removePackageScriptAfterLoading:boolean,
  componentsBasePath:string,
  delayForReady:number,
  preserveComponentBodyTag:false,
  useConfigService:false,
  routingWay:string,
  useSDK:boolean,
  useLocalSDK:boolean,
  basePath:string
};


export class ConfigSettings extends InheritClass {
  public _CONFIG: TConfigSettings = {
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
  private static _instance: ConfigSettings;
  public _CONFIG_ENC = "";

  

  static get instance() {

    if (typeof ConfigSettings._instance === "undefined") {
      ConfigSettings._instance = new ConfigSettings();
    }

    return ConfigSettings._instance;
  }


}

Package("com.qcobjects", [ConfigSettings]);
