"use strict";
/**
 * Creates an object from a Class definition
 *
 * @param {QC_Object} o
 * @param {Object} args
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.New = void 0;
const New = function (__class__, args = {}) {
    args = (arguments.length > 1) ? (args) : ({});
    return (typeof __class__ === "undefined") ? (new Object()) : (new __class__(args));
};
exports.New = New;
exports.New.prototype.toString = function () {
    return "New(QCObjectsClassName, args) { [QCObjects native code] }";
};
