"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DataStringify = void 0;
const LegacyCopy_1 = require("./LegacyCopy");
const _DataStringify = (data) => {
    const getCircularReplacer = function () {
        const seen = new WeakSet();
        let _level = 0;
        return function (key, value) {
            if (typeof value === "object" && value !== null) {
                if (seen.has(value)) {
                    _level += 1;
                    return (_level <= 3) ? ((0, LegacyCopy_1._LegacyCopy)(value)) : (null);
                }
                seen.add(value);
            }
            return value;
        };
    };
    return JSON.stringify(data, getCircularReplacer());
};
exports._DataStringify = _DataStringify;
