"use strict";
/**
 * Returns the QCObjects Class Factory of a given ClassName
 *
 * @param {String} name
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassFactory = void 0;
const is_raw_class_1 = require("./is_raw_class");
const PrimaryCollections_1 = require("./PrimaryCollections");
const ClassFactory = (className) => {
    let _classFactory;
    if (typeof className === "undefined" || className === null) {
        throw Error("You need to pass a parameter {className}");
    }
    if (className !== null && className.indexOf(".") !== -1) {
        const packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
        const _className = className.split(".").slice(-1).join("");
        const _package = PrimaryCollections_1._QC_PACKAGES[packageName] || [];
        const packageClasses = _package.filter((classFactory) => {
            return ((0, is_raw_class_1.__is_raw_class__)(classFactory));
        }).reverse();
        if (packageClasses.length > 0) {
            _classFactory = packageClasses[0];
        }
        else {
            throw Error(`Class ${_className} not found. Found classes: ${JSON.stringify(packageClasses)} in package ${packageName}`);
        }
    }
    else if (className !== null) {
        _classFactory = (0, PrimaryCollections_1.get_QC_CLASS)(className);
        if (typeof _classFactory === "undefined") {
            throw new Error(`${className} is undefined.`);
        }
    }
    else {
        throw Error(`className is null. Unable to retrieve the class factory.\n Not found in: \n ${Object.keys(PrimaryCollections_1._QC_CLASSES).join("\n")}`);
    }
    return _classFactory;
};
exports.ClassFactory = ClassFactory;
