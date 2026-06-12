"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const basePath_1 = require("./basePath");
const Cast_1 = require("./Cast");
const Crypt_1 = require("./Crypt");
const DataStringify_1 = require("./DataStringify");
const Logger_1 = require("./Logger");
const Processor_1 = require("./Processor");
const secretKey_1 = require("./secretKey");
const Package_1 = require("./Package");
const InheritClass_1 = require("./InheritClass");
const ConfigSettings_1 = require("./ConfigSettings");
class CONFIG extends InheritClass_1.InheritClass {
    get _CONFIG_ENC() {
        return ConfigSettings_1.ConfigSettings.instance._CONFIG_ENC;
    }
    get _CONFIG() {
        return ConfigSettings_1.ConfigSettings.instance._CONFIG;
    }
    set(name, value) {
        Logger_1.logger.debug(`CONFIG.set  ${name}: ${value}`);
        // hack to force update basePath from CONFIG
        if (name === "basePath") {
            (0, basePath_1.setBasePath)(value);
        }
        let _conf;
        try {
            _conf = (function (config) {
                if (config._CONFIG_ENC === null) {
                    config._CONFIG_ENC = Crypt_1._Crypt.encrypt((0, DataStringify_1._DataStringify)({}), secretKey_1._secretKey);
                }
                const _protectedEnc = config._CONFIG_ENC.valueOf();
                const _protectedConf = config._CONFIG?.valueOf();
                return (0, Cast_1._CastProps)(_protectedConf, (0, Crypt_1._DecryptObject)(_protectedEnc));
            })(ConfigSettings_1.ConfigSettings.instance);
        }
        catch (e) {
            _conf = {};
            console.error(e);
            Logger_1.logger.debug("failed to encrypt config");
        }
        _conf[name] = value;
        ConfigSettings_1.ConfigSettings.instance._CONFIG_ENC = (0, Crypt_1._CryptObject)(_conf);
        ConfigSettings_1.ConfigSettings.instance.set(name, value);
    }
    get(name, _default) {
        let _value;
        try {
            const _conf = (function (config) {
                if (config._CONFIG_ENC === null) {
                    config._CONFIG_ENC = Crypt_1._Crypt.encrypt((0, DataStringify_1._DataStringify)({}), secretKey_1._secretKey);
                }
                const _protectedEnc = config._CONFIG_ENC.valueOf();
                const _protectedConf = config._CONFIG.valueOf();
                return (0, Cast_1._CastProps)(_protectedConf, (0, Crypt_1._DecryptObject)(_protectedEnc));
            })(ConfigSettings_1.ConfigSettings.instance);
            if (typeof _conf[name] !== "undefined") {
                _value = _conf[name];
            }
        }
        catch (e) {
            console.error(e);
            Logger_1.logger.debug("Something wrong when trying to get CONFIG values");
            Logger_1.logger.debug("No config value for: " + name);
            _value = _default;
        }
        const processedValue = Processor_1.GlobalProcessor.processObject(_value);
        // Special handling for null values
        if (_value === null && processedValue === null) {
            return null;
        }
        return processedValue || _default;
    }
    static _instance;
    static get instance() {
        if (typeof CONFIG._instance === "undefined") {
            CONFIG._instance = new CONFIG();
        }
        return CONFIG._instance;
    }
    static set(name, value) {
        (CONFIG.instance.set(name, value));
    }
    static get(name, value) {
        return (CONFIG.instance.get(name, value));
    }
}
exports.CONFIG = CONFIG;
(0, Package_1.Package)("com.qcobjects", [CONFIG]);
