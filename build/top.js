"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfigService = exports.configService = exports.buildComponentsStack = exports.resetTop = exports.componentsStack = exports._top = void 0;
const ComponentFactory_1 = require("./ComponentFactory");
exports._top = ((typeof self !== "undefined" && self) ||
    (typeof window !== "undefined" && window) ||
    (typeof global !== "undefined" && global) ||
    this);
exports._top.lastCache = undefined;
exports.componentsStack = [];
const resetTop = (_top_) => {
    exports._top = _top_;
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
