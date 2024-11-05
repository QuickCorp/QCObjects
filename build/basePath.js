"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBasePath = exports._basePath_ = void 0;
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
exports._basePath_ = (function () {
    let _basePath = "";
    if (platform_1.isBrowser) {
        const baseURI = document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
    }
    else {
        let process;
        try {
            process = (0, platform_1._require_)("process");
        }
        catch (e) {
            Logger_1.logger.debug(`An error ocurred: ${e}.`);
            // not a process module
        }
        if (typeof process !== "undefined") {
            _basePath = `${(process).cwd()}/`;
        }
        else {
            _basePath = "";
        }
    }
    return _basePath;
})();
const setBasePath = (value) => { exports._basePath_ = value; };
exports.setBasePath = setBasePath;
