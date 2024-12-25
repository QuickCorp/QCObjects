"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQCObjects_Class = exports.isQCObjects_Object = void 0;
const InheritClass_1 = require("./InheritClass");
const isQCObjects_Object = function (_) {
    return (!!((typeof _ === "object" &&
        Object.hasOwn(_, "__classType") &&
        (!!_.__instanceID) &&
        Object.hasOwn(_, "__definition") &&
        typeof _.__definition !== "undefined"))) || _ instanceof InheritClass_1.InheritClass;
};
exports.isQCObjects_Object = isQCObjects_Object;
const isQCObjects_Class = function (_) {
    return (!!((typeof _ === "function" &&
        (!_.__instanceID) &&
        (!!_.__definition) &&
        typeof _.__definition !== "undefined" &&
        !!_.__definition.__classType))) || _.prototype instanceof InheritClass_1.InheritClass;
};
exports.isQCObjects_Class = isQCObjects_Class;
