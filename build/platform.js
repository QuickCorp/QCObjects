"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_phonegap = exports._require_ = exports.deno_require = exports.isNodeCommonJS = exports.isBrowser = exports.isDeno = void 0;
const global_1 = require("types/global");
exports.isDeno = (typeof window !== "undefined" && "Deno" in window);
exports.isBrowser = (typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self) && !exports.isDeno;
exports.isNodeCommonJS = (typeof module !== "undefined");
// eslint-disable-next-line no-unused-vars
const deno_require = (name) => { };
exports.deno_require = deno_require;
const _require_ = (name) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return (exports.isDeno) ? ((0, exports.deno_require)(name)) : (require(name));
};
exports._require_ = _require_;
exports.is_phonegap = (function () {
    return (typeof global_1.cordova !== "undefined");
})();
