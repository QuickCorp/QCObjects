"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Export = void 0;
const make_global_1 = require("./make_global");
const Export = function (f) {
    return (0, make_global_1.__make_global__)(f);
};
exports.Export = Export;
exports.Export.prototype.toString = function () {
    return "Export(function or symbol) { [QCObjects native code] }";
};
