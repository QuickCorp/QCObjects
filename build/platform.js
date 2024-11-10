"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_phonegap = exports._require_ = exports.deno_require = exports.isNodeCommonJS = exports.isBrowser = exports.isDeno = void 0;
const _import_1 = require("./_import_");
const Logger_1 = require("./Logger");
exports.isDeno = (typeof window !== "undefined" && "Deno" in window);
exports.isBrowser = (typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self) && !exports.isDeno;
exports.isNodeCommonJS = (typeof module !== "undefined");
// eslint-disable-next-line no-unused-vars
const deno_require = (name) => { };
exports.deno_require = deno_require;
const _require_ = (name) => {
    return (exports.isDeno) ? ((0, exports.deno_require)(name)) : (((name) => {
        let r;
        try {
            (async () => {
                r = await (0, _import_1._import_)(name);
            })().then((m) => {
                r = (m && m.default) || m;
            })
                .catch((e) => {
                Logger_1.logger.warn(`An error ocurred: ${e}`);
            });
        }
        catch (e) {
            Logger_1.logger.debug(`An error ocurred importing module. ${e}`);
            r = { export: {} };
        }
        return r;
    })(name));
};
exports._require_ = _require_;
exports.is_phonegap = (function () {
    return (typeof cordova !== "undefined");
})();
