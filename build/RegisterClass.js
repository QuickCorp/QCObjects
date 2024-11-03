"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterClass = exports.__register_class__ = void 0;
const getType_1 = require("./getType");
const make_global_1 = require("./make_global");
const PrimaryCollections_1 = require("./PrimaryCollections");
const __register_class__ = function (_class_, __namespace) {
    let name = _class_.name || (0, getType_1.__getType__)(_class_);
    if (name.toLowerCase() === "function" && typeof _class_.__classType !== "undefined") {
        name = _class_.__classType;
    }
    if (typeof _class_.__definition === "undefined") {
        _class_.__definition = {};
    }
    _class_.__definition.__classType = name;
    if (typeof __namespace !== "undefined") {
        _class_.__definition.__namespace = __namespace;
    }
    PrimaryCollections_1._QC_CLASSES[name] = _class_;
    (0, make_global_1.__make_global__)(PrimaryCollections_1._QC_CLASSES[name]);
    return PrimaryCollections_1._QC_CLASSES[name];
};
exports.__register_class__ = __register_class__;
const RegisterClass = function (_class_, __namespace) {
    return (0, exports.__register_class__)(_class_, __namespace);
};
exports.RegisterClass = RegisterClass;
(0, make_global_1.__make_global__)(exports.RegisterClass);
