"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrementInstanceID = exports.__instanceID = void 0;
/**
 * Primary instance ID of all objects
 */
exports.__instanceID = 0;
const IncrementInstanceID = () => {
    exports.__instanceID = (typeof exports.__instanceID === "undefined" || exports.__instanceID === null) ? (0) : (exports.__instanceID + 1);
};
exports.IncrementInstanceID = IncrementInstanceID;
