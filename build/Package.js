"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const isQCObjects_1 = require("./isQCObjects");
const PrimaryCollections_1 = require("./PrimaryCollections");
const RegisterClass_1 = require("./RegisterClass");
/**
 * Defines a package for Class classification
 *
 * @param {Object} namespace
 * @param {Object} classes
 */
const Package = function (namespace, classes = []) {
    if (PrimaryCollections_1._QC_PACKAGES.hasOwnProperty.call(PrimaryCollections_1._QC_PACKAGES, namespace) &&
        typeof PrimaryCollections_1._QC_PACKAGES[namespace] !== "undefined" &&
        PrimaryCollections_1._QC_PACKAGES[namespace].hasOwnProperty.call(PrimaryCollections_1._QC_PACKAGES[namespace], "length") &&
        PrimaryCollections_1._QC_PACKAGES[namespace].length > 0 &&
        typeof classes !== "undefined" &&
        classes.hasOwnProperty.call(classes, "length") &&
        classes.length > 0) {
        classes.filter(function (_c1) {
            return (0, isQCObjects_1.isQCObjects_Class)(_c1);
        }).map(function (_class_) {
            _class_.__definition.__namespace = namespace;
            _class_.__namespace = namespace;
        });
        PrimaryCollections_1._QC_PACKAGES[namespace] = PrimaryCollections_1._QC_PACKAGES[namespace].concat(classes);
    }
    else if (typeof classes !== "undefined") {
        if (typeof classes === "object" && classes.hasOwnProperty.call(classes, "length")) {
            classes.filter(function (_c1) {
                return (0, isQCObjects_1.isQCObjects_Class)(_c1);
            }).map(function (_class_) {
                _class_.__definition.__namespace = namespace;
                _class_.__namespace = namespace;
            });
        }
        else if ((0, isQCObjects_1.isQCObjects_Class)(classes)) {
            classes.__definition.__namespace = namespace;
            classes.__namespace = namespace;
        }
        PrimaryCollections_1._QC_PACKAGES[namespace] = classes;
    }
    if (Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, namespace)) {
        PrimaryCollections_1._QC_PACKAGES[namespace].map(function (_class_) {
            (0, RegisterClass_1.__register_class__)(_class_, namespace);
        });
    }
    return ((Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, namespace)) ? (PrimaryCollections_1._QC_PACKAGES[namespace]) : (undefined));
};
exports.Package = Package;
exports.Package.prototype.toString = function () {
    return "Package(namespace, classes) { [QCObjects native code] }";
};
