import { logger } from "./Logger";

/**
 * Casts an object to another object class type
 *
 * @param {Object} obj_source
 * @param {Object} obj_dest
 */
export const _Cast = function (obj_source: any, obj_dest: any) {
    for (var v in obj_source) {
        if (typeof obj_source[v] !== "undefined") {
            try {
                obj_dest[v] = obj_source[v];
            } catch (e) {

            }
        }
    }
    return obj_dest;
};

/**
 * Casts an object to another object class type. Only properties
 *
 * @param {Object} obj_source
 * @param {Object} obj_dest
 */
export const _CastProps = function (obj_source: { [x: string]: { bind: (arg0: any) => any; }; }, obj_dest: any) {
    for (var v in obj_source) {
        if (typeof obj_source[v] !== "undefined" && typeof obj_source[v] !== "function") {
            try {
                obj_dest[v] = obj_source[v];
            } catch (e) {
                // DO NOTHING
            }
        } else if (typeof obj_source[v] === "function") {
            try {
                obj_dest[v] = obj_source[v].bind(obj_dest);
            } catch (e) {
                logger.warn(e);
            }
        }
    }
    return obj_dest;
};
