"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._methods_ = exports._protected_code_ = void 0;
const _protected_code_ = (_) => {
    const __oldtoString = (typeof _.prototype !== "undefined") ? (_.prototype.toString) : (function () {
        return "";
    });
    if (typeof _.prototype !== "undefined") {
        _.prototype.toString = function () {
            const _protected_symbols = [
                "__qcobjects__",
                "__qcobjects_sdk__",
                "__loaded__",
                "ComplexStorageCache",
                "css",
                "append",
                "attachIn",
                "debug",
                "info",
                "warn",
                "QC_Append",
                "set",
                "get",
                "done",
                "componentDone",
                "_new_",
                "__new__",
                "Class",
                "ClassFactory",
                "New",
                "Export",
                "Package",
                "Import",
                "subelements",
                "componentLoader",
                "buildComponents",
                "Controller",
                "View",
                "VO",
                "Service",
                "serviceLoader",
                "JSONService",
                "ConfigService",
                "SourceJS",
                "SourceCSS",
                "ArrayList",
                "ArrayCollection",
                "Effect",
                "Timer",
                "sum",
                "avg",
                "table",
                "max",
                "min",
                "range",
                "matrix",
                "matrix2d",
                "matrix3d",
                "unique",
                "uniqueId",
                "shortCode",
                "NamespaceRef"
            ];
            let _ret_;
            if (_protected_symbols.includes(this.name)) {
                _ret_ = this.name + "{ [QCObjects native code] }";
            }
            else {
                _ret_ = __oldtoString.call(this);
            }
            return _ret_;
        };
    }
};
exports._protected_code_ = _protected_code_;
(exports._protected_code_)(Function);
const _methods_ = function (_) {
    const _m = [];
    for (const i in _) {
        if ((typeof _[i]).toLowerCase() === "function") {
            _m.push(_[i]);
        }
    }
    return _m;
};
exports._methods_ = _methods_;
