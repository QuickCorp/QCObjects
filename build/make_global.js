"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__make_global__ = void 0;
const platform_1 = require("./platform");
const top_1 = require("./top");
const __make_global__ = function (f) {
    if (typeof f !== "undefined") {
        if (platform_1.isBrowser) {
            try {
                top_1._top[f.name] = f;
                window[f.name] = f;
            }
            catch (e) {
                throw Error(`An error ocurred: ${e}`);
            }
        }
        else if (typeof global !== "undefined") {
            if (!Object.hasOwn(global, f.name)) {
                global[f.name] = f;
            }
        }
    }
};
exports.__make_global__ = __make_global__;
