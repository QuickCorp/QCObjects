"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = exports.setConfigService = exports.configService = exports.buildComponentsStack = exports.resetTop = exports.componentsStack = exports._top = void 0;
const ComponentFactory_1 = require("./ComponentFactory");
const Cast_1 = require("./Cast");
const globalSettings_1 = require("./globalSettings");
exports._top = ((typeof module !== "undefined" && typeof module.exports !== "undefined" && module.exports) ||
    (typeof global !== "undefined" && global) ||
    (typeof globalThis !== "undefined" && globalThis) ||
    (typeof window !== "undefined" && window) ||
    (typeof self !== "undefined" && self) ||
    this);
exports._top.lastCache = undefined;
exports.componentsStack = [];
const resetTop = () => {
    const globalSettings = new globalSettings_1.GlobalSettings();
    exports._top = (0, Cast_1._CastProps)(globalSettings, exports._top);
};
exports.resetTop = resetTop;
const buildComponentsStack = () => {
    exports.componentsStack = (0, ComponentFactory_1.buildComponents)(document);
};
exports.buildComponentsStack = buildComponentsStack;
const setConfigService = (_configService) => {
    exports._top.global.configService = _configService;
    exports.configService = _configService;
};
exports.setConfigService = setConfigService;
const set = (name, value) => {
    exports._top.set(name, value);
};
exports.set = set;
const get = (name, _defaultValue) => {
    return exports._top.get(name, _defaultValue);
};
exports.get = get;
