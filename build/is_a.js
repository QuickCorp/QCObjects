"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is_a = void 0;
const getType_1 = require("./getType");
const isQCObjects_1 = require("./isQCObjects");
const ObjectName_1 = require("./ObjectName");
/**
 * Returns if a class or object is from a determinated type
 * @param {Object} object
 * @param {String} typeName
 */
const is_a = (obj, typeName) => {
    return !!((typeof obj !== "undefined" && obj !== null &&
        ((((0, isQCObjects_1.isQCObjects_Class)(obj) || (0, isQCObjects_1.isQCObjects_Object)(obj)) && (obj.hierarchy().includes(typeName))) ||
            (0, getType_1.__getType__)(obj) === typeName ||
            (0, ObjectName_1.ObjectName)(obj) === typeName ||
            typeof obj === typeName)));
};
exports.is_a = is_a;
