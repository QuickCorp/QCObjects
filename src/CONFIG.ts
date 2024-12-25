import { setBasePath } from "./basePath";
import { _CastProps } from "./Cast";
import { _Crypt, _CryptObject, _DecryptObject } from "./Crypt";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";
import { GlobalProcessor as Processor } from "./Processor";
import { _secretKey } from "./secretKey";
import { Package } from "./Package";
import { InheritClass } from "./InheritClass";
import { ICONFIG } from "@types";
import { ConfigSettings } from "./ConfigSettings";


export class CONFIG extends InheritClass implements ICONFIG {

  get _CONFIG_ENC(): string {
    return ConfigSettings.instance._CONFIG_ENC;
  }

  get _CONFIG(): unknown {
    return ConfigSettings.instance._CONFIG as unknown;
  }

  set(name: string, value: unknown):void {
    logger.debug(`CONFIG.set  ${name}: ${value as string}`);
    // hack to force update basePath from CONFIG
    if (name === "basePath") {
      setBasePath(value as string);
    }
    let _conf;
    try {
      _conf = (
        function (config): any {
          if (config._CONFIG_ENC === null) {
            config._CONFIG_ENC = _Crypt.encrypt(_DataStringify({}), _secretKey);
          }
          const _protectedEnc = config._CONFIG_ENC.valueOf();
          const _protectedConf = config._CONFIG?.valueOf();
          return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
        }
      )(ConfigSettings.instance);
    } catch (e) {
      _conf = {};
      console.error(e);
      logger.debug("failed to encrypt config");
    }

    _conf[name] = value;
    ConfigSettings.instance._CONFIG_ENC = _CryptObject(_conf);
    ConfigSettings.instance.set(name, value);
  }

  get(name: string, _default?: unknown): any {
    let _value;
    try {
      const _conf = (
        function (config): any {
          if (config._CONFIG_ENC === null) {
            config._CONFIG_ENC = _Crypt.encrypt(_DataStringify({}), _secretKey);
          }
          const _protectedEnc = config._CONFIG_ENC.valueOf();
          const _protectedConf = config._CONFIG.valueOf();
          return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
        }
      )(ConfigSettings.instance);
      if (typeof _conf[name] !== "undefined") {
        _value = _conf[name];
      }
    } catch (e) {
      console.error(e);
      logger.debug("Something wrong when trying to get CONFIG values");
      logger.debug("No config value for: " + name);
      _value = _default;
    }
    return Processor.processObject(_value) || _default;
  }

  private static _instance:CONFIG;
  static get instance ():CONFIG {
    if (typeof CONFIG._instance === "undefined") {
      CONFIG._instance = new CONFIG();
    }
    return CONFIG._instance;
  }

  static set(name: string, value: unknown):void {
    (CONFIG.instance.set(name, value));
  }
  static get(name: string, value?: unknown): any {
    return (CONFIG.instance.get(name, value));
  }

}


Package("com.qcobjects", [CONFIG]);