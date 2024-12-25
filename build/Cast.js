"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._CastProps = exports._Cast = void 0;
const Logger_1 = require("./Logger");
/**
 * Casts an object to another object class type
 *
 * @param {Object} obj_source
 * @param {Object} obj_dest
 */
const _Cast = function (obj_source, obj_dest) {
    for (const v in obj_source) {
        if (typeof obj_source[v] !== "undefined") {
            try {
                obj_dest[v] = obj_source[v];
            }
            catch (e) {
                Logger_1.logger.debug(`An error ocurred: ${e}.`);
                Logger_1.logger.warn(`Unable to cast ${(typeof obj_source).toString()}.${typeof v.toString()} to ${(typeof obj_dest).toString()}.${typeof v.toString()}`);
            }
        }
    }
    return obj_dest;
};
exports._Cast = _Cast;
/**
 * Casts an object to another object class type. Only properties
 *
 * @param {Object} obj_source
 * @param {Object} obj_dest
 */
const _CastProps = function (obj_source, obj_dest, _ignoreError = true) {
    for (const v in obj_source) {
        if (typeof obj_source[v] !== "undefined" && typeof obj_source[v] !== "function") {
            try {
                obj_dest[v] = obj_source[v];
            }
            catch (e) {
                if (!_ignoreError) {
                    Logger_1.logger.debug(`An error ocurred: ${e}.`);
                }
            }
        }
        else if (typeof obj_source[v] === "function") {
            try {
                obj_dest[v] = obj_source[v].bind(obj_dest);
            }
            catch (e) {
                Logger_1.logger.warn(e);
            }
        }
    }
    return obj_dest;
};
exports._CastProps = _CastProps;
