"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.set_QC_PACKAGE = exports.getClassesNamesList = exports.getClassesList = exports.getPackagesList = exports.getPackagesNamesList = exports.get_QC_CLASS = exports.__register_class__ = exports._QC_READY_LISTENERS = exports._QC_PACKAGES_IMPORTED = exports._QC_PACKAGES = exports._QC_CLASSES = void 0;
const getType_1 = require("./getType");
const make_global_1 = require("./make_global");
exports._QC_CLASSES = {};
exports._QC_PACKAGES = {};
exports._QC_PACKAGES_IMPORTED = [];
exports._QC_READY_LISTENERS = [];
const __register_class__ = function (_class_, __namespace) {
    const __classType = (0, getType_1.__getType__)(_class_);
    let name = _class_.name || __classType;
    if (name.toLowerCase() === "function") {
        name = __classType;
    }
    if (typeof _class_.__definition === "undefined") {
        _class_.__definition = {};
    }
    _class_.__definition.__classType = __classType;
    if (typeof __namespace !== "undefined") {
        _class_.__definition.__namespace = __namespace;
    }
    exports._QC_CLASSES[name] = _class_;
    (0, make_global_1.__make_global__)(_class_);
    return exports._QC_CLASSES[name];
};
exports.__register_class__ = __register_class__;
const get_QC_CLASS = (name) => {
    return exports._QC_CLASSES[name];
};
exports.get_QC_CLASS = get_QC_CLASS;
const _get_packages_names = function (_packages) {
    let _keys = [];
    for (const _k of Object.keys(_packages)) {
        if (typeof _packages[_k] !== "undefined" &&
            typeof _packages[_k] !== "function" &&
            Object.hasOwn(_packages[_k], "length") &&
            _packages[_k].length > 0) {
            _keys.push(_k);
            _keys = _keys.concat(_get_packages_names(_packages[_k]));
        }
    }
    return _keys;
};
const getPackagesNamesList = () => {
    return _get_packages_names(exports._QC_PACKAGES);
};
exports.getPackagesNamesList = getPackagesNamesList;
const getPackagesList = () => {
    return [...(0, exports.getPackagesNamesList)()].map((packagename) => {
        const _classesList = exports._QC_PACKAGES[packagename];
        let _ret_ = undefined;
        if (_classesList) {
            _ret_ = {
                packageName: packagename,
                classesList: _classesList.filter(function () {
                    return true;
                })
            };
        }
        return _ret_;
    }).filter(function (_p) {
        return typeof _p !== "undefined";
    });
};
exports.getPackagesList = getPackagesList;
const getClassesList = () => {
    let _classesList = [];
    [...(0, exports.getPackagesList)()].forEach(function (_package_element) {
        _classesList = _classesList.concat(_package_element.classesList.map((_class_element) => {
            return {
                packageName: _package_element.packageName,
                className: `${_package_element.packageName}.${(0, getType_1.__getType__)(_class_element)}`,
                classFactory: _class_element
            };
        }));
        return _package_element;
    });
    return _classesList;
};
exports.getClassesList = getClassesList;
const getClassesNamesList = () => {
    return [...(0, exports.getClassesList)()].map((_class_element) => {
        return _class_element.className;
    });
};
exports.getClassesNamesList = getClassesNamesList;
const set_QC_PACKAGE = (packageName, _qc_packages) => {
    exports._QC_PACKAGES[packageName] = _qc_packages;
};
exports.set_QC_PACKAGE = set_QC_PACKAGE;
