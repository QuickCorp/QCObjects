"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._LegacyCopy = void 0;
const is_raw_class_1 = require("./is_raw_class");
const _LegacyCopy = function (obj, _ignore) {
    let _value_;
    switch (true) {
        case typeof obj === "string":
            _value_ = obj;
            break;
        case typeof obj === "number":
            _value_ = obj;
            break;
        case typeof obj === "object":
            _value_ = [{ ...Object.keys(obj).filter(k => !_ignore?.includes(k)) }]
                .map(k => { return { [k]: obj[k] }; })
                .reduce((p, c) => Object.assign(p, c));
            break;
        case typeof obj === "function":
            _value_ = obj.bind({});
            break;
        case (0, is_raw_class_1.__is_raw_class__)(obj):
            _value_ = class extends obj {
            };
            break;
        default:
            break;
    }
    return _value_;
};
exports._LegacyCopy = _LegacyCopy;
