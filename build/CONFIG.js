"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONFIG = void 0;
const basePath_1 = require("./basePath");
const Cast_1 = require("./Cast");
const Class_1 = require("./Class");
const ClassFactory_1 = require("./ClassFactory");
const Crypt_1 = require("./Crypt");
const DataStringify_1 = require("./DataStringify");
const Logger_1 = require("./Logger");
const Processor_1 = require("./Processor");
const secretKey_1 = require("./secretKey");
exports.CONFIG = (0, Class_1.Class)("CONFIG", Object, {
    get _CONFIG_ENC() {
        return (0, ClassFactory_1.ClassFactory)("ConfigSettings").instance._CONFIG_ENC;
    },
    get _CONFIG() {
        return (0, ClassFactory_1.ClassFactory)("ConfigSettings").instance._CONFIG;
    },
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
                    config._CONFIG_ENC = (0, ClassFactory_1.ClassFactory)("_Crypt").encrypt((0, DataStringify_1._DataStringify)({}), secretKey_1._secretKey);
                }
                const _protectedEnc = config._CONFIG_ENC.valueOf();
                const _protectedConf = config._CONFIG.valueOf();
                return (0, Cast_1._CastProps)(_protectedConf, (0, Crypt_1._DecryptObject)(_protectedEnc));
            })((0, ClassFactory_1.ClassFactory)("ConfigSettings").instance);
        }
        catch (e) {
            _conf = {};
            console.error(e);
            Logger_1.logger.debug("failed to encrypt config");
        }
        _conf[name] = value;
        (0, ClassFactory_1.ClassFactory)("ConfigSettings").instance._CONFIG_ENC = (0, Crypt_1._CryptObject)(_conf);
        if (Object.hasOwnProperty.call((0, ClassFactory_1.ClassFactory)("ConfigSettings").instance, "_CONFIG") && Object.hasOwnProperty.call((0, ClassFactory_1.ClassFactory)("ConfigSettings").instance._CONFIG, name)) {
            (0, ClassFactory_1.ClassFactory)("ConfigSettings").instance._CONFIG[name] = value;
        }
    },
    get(name, _default) {
        let _value;
        try {
            const _conf = (function (config) {
                if (config._CONFIG_ENC === null) {
                    config._CONFIG_ENC = (0, ClassFactory_1.ClassFactory)("_Crypt").encrypt((0, DataStringify_1._DataStringify)({}), secretKey_1._secretKey);
                }
                const _protectedEnc = config._CONFIG_ENC.valueOf();
                const _protectedConf = config._CONFIG.valueOf();
                return (0, Cast_1._CastProps)(_protectedConf, (0, Crypt_1._DecryptObject)(_protectedEnc));
            })((0, ClassFactory_1.ClassFactory)("ConfigSettings").instance);
            if (typeof _conf[name] !== "undefined") {
                _value = _conf[name];
            }
            else if (typeof _default !== "undefined") {
                _value = _default;
            }
        }
        catch (e) {
            console.error(e);
            Logger_1.logger.debug("Something wrong when trying to get CONFIG values");
            Logger_1.logger.debug("No config value for: " + name);
            _value = _default;
        }
        return Processor_1.Processor.processObject.call(Processor_1.Processor, _value);
    }
});
