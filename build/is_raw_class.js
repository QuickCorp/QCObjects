"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__is_raw_class__ = void 0;
const __is_raw_class__ = (o_c) => {
    return !!((typeof o_c === "function" && o_c.toString().startsWith("class")));
};
exports.__is_raw_class__ = __is_raw_class__;
