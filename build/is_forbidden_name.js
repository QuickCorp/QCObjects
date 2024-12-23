"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__is__forbidden_name__ = void 0;
/**
 * Internal use to determine the forbidden names for classes
 * Reserved words
 *
 * @param {String} name
 * @param {Object} type
 * @param {Object} definition
 */
const __is__forbidden_name__ = (name) => {
    return (["__proto__", "prototype", "Object", "Map", "defineProperty", "indexOf", "toString", "__instanceID", "function", "Function"].indexOf(name) !== -1);
};
exports.__is__forbidden_name__ = __is__forbidden_name__;
