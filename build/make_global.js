"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__make_global__ = void 0;
const top_1 = require("./top");
const __make_global__ = (f) => {
    if (!!f && !!f.name) {
        if (typeof top_1._top !== "undefined" && typeof f !== "undefined" && top_1._top !== null && !Object.hasOwn(top_1._top, f.name)) {
            (0, top_1.set)(f.name, f);
        }
        else if (typeof global !== "undefined") {
            global[f.name] = f;
        }
        else if (typeof globalThis !== "undefined") {
            globalThis[f.name] = f;
        }
    }
};
exports.__make_global__ = __make_global__;
