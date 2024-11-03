"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subelements = void 0;
const subelements = function subelements(query) {
    const _self = this;
    return [..._self.querySelectorAll(query)];
};
exports.subelements = subelements;
