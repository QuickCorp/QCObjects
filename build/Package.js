"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const InheritClass_1 = require("./InheritClass");
const is_raw_class_1 = require("./is_raw_class");
const PrimaryCollections_1 = require("./PrimaryCollections");
const RegisterClass_1 = require("./RegisterClass");
/**
 * Defines a package for Class classification
 *
 * @param {Object} namespace
 * @param {Object} classes
 */
const Package = function (namespace, classes = []) {
    if (Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, namespace) &&
        typeof PrimaryCollections_1._QC_PACKAGES[namespace] !== "undefined" &&
        Object.hasOwn(PrimaryCollections_1._QC_PACKAGES[namespace], "length") &&
        PrimaryCollections_1._QC_PACKAGES[namespace].length > 0 &&
        typeof classes !== "undefined" &&
        Object.hasOwn(classes, "length") &&
        classes.length > 0) {
        classes.filter(function (_c1) {
            return (0, is_raw_class_1.__is_raw_class__)(_c1);
        }).map((_class_) => {
            if (typeof _class_.__definition === "undefined") {
                _class_.__definition = {};
            }
            _class_.__definition.__namespace = namespace;
            _class_.__namespace = namespace;
            return _class_;
        });
        PrimaryCollections_1._QC_PACKAGES[namespace] = PrimaryCollections_1._QC_PACKAGES[namespace].concat(classes);
    }
    else if (typeof classes !== "undefined") {
        if (typeof classes === "object" && Object.hasOwn(classes, "length")) {
            classes.filter(function (_c1) {
                return (0, is_raw_class_1.__is_raw_class__)(_c1);
            }).map((_class_) => {
                if (typeof _class_.__definition === "undefined") {
                    _class_.__definition = {};
                }
                _class_.__definition.__namespace = namespace;
                _class_.__namespace = namespace;
                return _class_;
            });
        }
        else if (classes.prototype instanceof InheritClass_1.InheritClass) {
            if (typeof classes.__definition === "undefined") {
                classes.__definition = {};
            }
            classes.__definition.__namespace = namespace;
            classes.__namespace = namespace;
        }
        PrimaryCollections_1._QC_PACKAGES[namespace] = classes;
    }
    if (Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, namespace)) {
        PrimaryCollections_1._QC_PACKAGES[namespace].map((_class_) => {
            (0, RegisterClass_1.__register_class__)(_class_, namespace);
            return _class_;
        });
    }
    return ((Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, namespace)) ? (PrimaryCollections_1._QC_PACKAGES[namespace]) : (undefined));
};
exports.Package = Package;
exports.Package.prototype.toString = function () {
    return "Package(namespace, classes) { [QCObjects native code] }";
};
