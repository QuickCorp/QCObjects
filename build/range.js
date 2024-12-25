"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.range = void 0;
const introspection_1 = require("./introspection");
const range = (start, stop = 0, step = 1) => {
    if (stop === 0 || typeof stop === "undefined") {
        stop = start;
        start = 0;
    }
    return Array.from({
        length: (stop - start) / step + 1
    }, function (_, i) {
        return start + (i * step);
    });
};
exports.range = range;
(introspection_1._protected_code_)(exports.range);
