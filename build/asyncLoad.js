"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._fireAsyncLoad = exports._asyncLoad = void 0;
exports.asyncLoad = asyncLoad;
const Export_1 = require("./Export");
const platform_1 = require("./platform");
const top_1 = require("./top");
exports._asyncLoad = [];
function asyncLoad(callback, args) {
    class AsyncCallback {
        func;
        args;
        constructor(callback, args = []) {
            this.func = callback;
            this.args = args;
        }
        dispatch() {
            this.func.apply(this, ...args, this);
        }
    }
    exports._asyncLoad.push((new AsyncCallback(callback, args)));
    return AsyncCallback;
}
const _fireAsyncLoad = () => {
    if (platform_1.isBrowser) {
        document.addEventListener("readystatechange", () => {
            if (document.readyState === "complete") {
                // eslint-disable-next-line array-callback-return
                exports._asyncLoad.map(function (fc) {
                    (fc).dispatch.call(fc);
                });
            }
        });
    }
    else if (typeof top_1._top.global !== "undefined") {
        // eslint-disable-next-line array-callback-return
        exports._asyncLoad.map(function (fc) {
            (fc).dispatch.call(fc);
        });
    }
};
exports._fireAsyncLoad = _fireAsyncLoad;
(0, Export_1.Export)(asyncLoad);
