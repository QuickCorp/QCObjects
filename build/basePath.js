"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBasePath = exports._basePath_ = void 0;
const platform_1 = require("./platform");
const node_process_1 = __importDefault(require("node:process"));
exports._basePath_ = (function () {
    let _basePath = "";
    if (platform_1.isBrowser) {
        const baseURI = document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
    }
    else {
        if (typeof node_process_1.default !== "undefined") {
            _basePath = `${(node_process_1.default).cwd()}/`;
        }
        else {
            _basePath = "";
        }
    }
    return _basePath;
})();
const setBasePath = (value) => { exports._basePath_ = value; };
exports.setBasePath = setBasePath;
