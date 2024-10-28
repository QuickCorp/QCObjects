import { setBasePath } from "./basePath";
import { _CastProps } from "./Cast";
import { ClassFactory } from "./ClassFactory";
import { _Crypt, _CryptObject, _DecryptObject } from "./Crypt";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";
import { Processor } from "./Processor";
import { _secretKey } from "./secretKey";
import { Package } from "./Package";
import { InheritClass } from "./InheritClass";
import { ICONFIG } from "types";


export class CONFIG extends InheritClass implements ICONFIG{
  __definition!: any;

  get _CONFIG_ENC():string {
    return ClassFactory("ConfigSettings")?.instance?._CONFIG_ENC as string;
  }

  get _CONFIG():unknown {
    return ClassFactory("ConfigSettings").instance._CONFIG as unknown;
  }

  set(name: string, value: unknown) {
    logger.debug(`CONFIG.set  ${name}: ${value as string}`);
    // hack to force update basePath from CONFIG
    if (name === "basePath") {
      setBasePath(value as string);
    }
    let _conf;
    try {
      _conf = (
        function (config) :any{
          if (config._CONFIG_ENC === null) {
            config._CONFIG_ENC = _Crypt.encrypt(_DataStringify({}), _secretKey);
          }
          const _protectedEnc = config._CONFIG_ENC.valueOf();
          const _protectedConf = config._CONFIG.valueOf();
          return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
        }
      )(ClassFactory("ConfigSettings").instance);
    } catch (e) {
      _conf = {};
      console.error(e);
      logger.debug("failed to encrypt config");
    }

    _conf[name] = value;
    ClassFactory("ConfigSettings").instance._CONFIG_ENC = _CryptObject(_conf);
    if (Object.hasOwnProperty.call(ClassFactory("ConfigSettings").instance, "_CONFIG") && Object.hasOwnProperty.call(ClassFactory("ConfigSettings").instance._CONFIG, name)) {
      ClassFactory("ConfigSettings").instance._CONFIG[name] = value;
    }
  }

  get(name: string, _default: unknown):any {
    let _value;
    try {
      const _conf = (
        function (config):any {
          if (config._CONFIG_ENC === null) {
            config._CONFIG_ENC = ClassFactory("_Crypt").encrypt(_DataStringify({}), _secretKey) as string;
          }
          const _protectedEnc = config._CONFIG_ENC.valueOf();
          const _protectedConf = config._CONFIG.valueOf();
          return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
        }
      )(ClassFactory("ConfigSettings").instance);
      if (typeof _conf[name] !== "undefined") {
        _value = _conf[name];
      } else if (typeof _default !== "undefined") {
        _value = _default;
      }
    } catch (e) {
      console.error(e);
      logger.debug("Something wrong when trying to get CONFIG values");
      logger.debug("No config value for: " + name);
      _value = _default;
    }
    return Processor.processObject.call(Processor, _value);
  }

  static set (name:string, value:unknown){
    (new CONFIG().set(name, value));
  }  
  static get (name:string, value?:unknown):any{
    return (new CONFIG().set(name, value));
  }

}


  Package("com.qcobjects", [CONFIG]);