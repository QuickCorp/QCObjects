"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const is_raw_class_1 = require("./is_raw_class");
const PrimaryCollections_1 = require("./PrimaryCollections");
/**
 * Defines a package for Class classification
 *
 * @param {Object} namespace
 * @param {Object} classes
 */
const Package = (namespace, classes = []) => {
    if (Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, namespace) &&
        typeof PrimaryCollections_1._QC_PACKAGES[namespace] !== "undefined" &&
        typeof PrimaryCollections_1._QC_PACKAGES[namespace] !== "string" &&
        Object.hasOwn(PrimaryCollections_1._QC_PACKAGES[namespace], "length") &&
        PrimaryCollections_1._QC_PACKAGES[namespace].length > 0 &&
        typeof classes !== "undefined" &&
        Object.hasOwn(classes, "length") &&
        classes.length > 0) {
        classes.forEach((_class_) => {
            (0, PrimaryCollections_1.__register_class__)(_class_, namespace);
        });
        (0, PrimaryCollections_1.set_QC_PACKAGE)(namespace, PrimaryCollections_1._QC_PACKAGES[namespace].concat(classes));
    }
    else if (typeof classes !== "undefined"
        && typeof classes !== "undefined"
        && Object.hasOwn(classes, "length")
        && classes.length > 0) {
        classes.forEach((_class_) => {
            (0, PrimaryCollections_1.__register_class__)(_class_, namespace);
        });
        (0, PrimaryCollections_1.set_QC_PACKAGE)(namespace, classes);
    }
    else if ((0, is_raw_class_1.__is_raw_class__)(classes)) {
        if (typeof classes.__definition === "undefined") {
            classes.__definition = {};
        }
        classes.__definition.__namespace = namespace;
        classes.__namespace = namespace;
        (0, PrimaryCollections_1.__register_class__)(classes, namespace);
        (0, PrimaryCollections_1.set_QC_PACKAGE)(namespace, [classes]);
    }
    else {
        throw new Error(`An error ocurred. It was not possible to add classes to ${namespace}.`);
    }
    return ((Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, namespace)) ? (PrimaryCollections_1._QC_PACKAGES[namespace]) : []);
};
exports.Package = Package;
