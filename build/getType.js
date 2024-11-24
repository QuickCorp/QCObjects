"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__getType__ = void 0;
const is_raw_class_1 = require("./is_raw_class");
const ObjectName_1 = require("./ObjectName");
/**
 * Determine the type of the Object for any QCObjects Object
 *
 * @param {Object} object
 */
const __getType__ = function __getType__(o_c) {
    let _ret_ = "";
    switch (true) {
        case typeof o_c === "object" &&
            (!!o_c.constructor &&
                !!o_c.constructor.name)
            && o_c.constructor.name !== "":
            _ret_ = o_c.constructor.name;
            break;
        case typeof o_c === "function" && !!o_c.name:
            _ret_ = o_c.name;
            break;
        case (0, is_raw_class_1.__is_raw_class__)(o_c) && !!o_c.name:
            _ret_ = o_c.name;
            break;
        case (!!o_c && !!o_c.__classType) && o_c.__classType !== "":
            _ret_ = o_c.__classType;
            break;
        case (!!o_c && !!o_c.__definition) && (!!o_c.__definition.__classType) && o_c.__definition.__classType !== "":
            _ret_ = o_c.__definition.__classType;
            break;
        default:
            _ret_ = (0, ObjectName_1.ObjectName)(o_c);
            break;
    }
    return _ret_;
};
exports.__getType__ = __getType__;
