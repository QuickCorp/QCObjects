import { __getType__ } from "./getType";
import { isQCObjects_Class, isQCObjects_Object } from "./isQCObjects";
import { ObjectName } from "./ObjectName";

    /**
     * Returns if a class or object is from a determinated type
     * @param {Object} object
     * @param {String} typeName
     */
    export const is_a = function is_a(obj:any, typeName:string) {
        return (typeof obj !== "undefined" && obj !== null &&
          (((isQCObjects_Class(obj) || isQCObjects_Object(obj)) && (obj.hierarchy().includes(typeName))) ||
            __getType__(obj) === typeName ||
            ObjectName(obj) === typeName ||
            typeof obj === typeName)) ? (true) : (false);
      };