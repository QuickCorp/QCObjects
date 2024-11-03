"use strict";
/**
 * Returns the QCObjects Class Factory of a given ClassName
 *
 * @param {String} name
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassFactory = void 0;
const isQCObjects_1 = require("./isQCObjects");
const Package_1 = require("./Package");
const PrimaryCollections_1 = require("./PrimaryCollections");
const ClassFactory = function (className) {
    let _classFactory;
    if (className !== null && className.indexOf(".") > -1) {
        const packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
        const _className = className.split(".").slice(-1).join("");
        const _package = (0, Package_1.Package)(packageName);
        const packageClasses = (typeof _package !== "undefined") ? (_package.filter((classFactory) => {
            return (0, isQCObjects_1.isQCObjects_Class)(classFactory) &&
                (classFactory.__definition.__classType === _className || (typeof classFactory === "function" && !!classFactory.name));
        }).reverse()) : ([]);
        if (packageClasses.length > 0) {
            _classFactory = packageClasses[0];
        }
        else {
            throw Error(`Class ${className} not found.`);
        }
    }
    else if (className !== null && Object.hasOwnProperty.call(PrimaryCollections_1._QC_CLASSES, className)) {
        _classFactory = PrimaryCollections_1._QC_CLASSES[className];
    }
    else {
        throw Error(`Undefined class ${className}. Unable to retrieve the class factory.`);
    }
    return _classFactory;
};
exports.ClassFactory = ClassFactory;
