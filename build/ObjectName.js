"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectName = void 0;
/**
 * Returns the object or function name
 *
 * @param Object or function
 */
const ObjectName = (o) => {
    let ret = "";
    if (typeof o === "function" && Object.hasOwn(o, "name") && o.name !== "") {
        ret = o.name;
    }
    else if (typeof o !== "undefined" && typeof o.constructor === "function" && o.constructor.name !== "") {
        ret = o.constructor.name;
    }
    else if (typeof o !== "undefined" && typeof o.constructor === "object") {
        ret = o.constructor.toString().replace(/\[(.*?)\]/g, "$1").split(" ").slice(1).join("");
    }
    return ret;
};
exports.ObjectName = ObjectName;
