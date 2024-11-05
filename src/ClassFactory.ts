/**
 * Returns the QCObjects Class Factory of a given ClassName
 *
 * @param {String} name
 */

import { isQCObjects_Class } from "./isQCObjects";
import { Package } from "./Package";
import { _QC_CLASSES } from "./PrimaryCollections";
import { TClassFactory } from "types";

export const ClassFactory:TClassFactory =  (className:string):any => {
    let _classFactory;
    if (typeof className === "undefined" || className === null) {
        throw Error ("You need to pass a parameter {className}");
    }
    if (className !== null && className.indexOf(".") > -1) {
        const packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
        const _className = className.split(".").slice(-1).join("");
        const _package = Package(packageName);
        const packageClasses = (typeof _package !== "undefined") ? (_package.filter((classFactory:any) => {
            return isQCObjects_Class(classFactory) &&
                (classFactory.__definition.__classType === _className || (typeof classFactory === "function" && !!classFactory.name));
        }).reverse()) : ([]);
        if (packageClasses.length > 0) {
            _classFactory = packageClasses[0];
        } else {
            throw Error(`Class ${className} not found. Found classes: ${JSON.stringify(packageClasses)} in package ${packageName}`);
        }
    } else if (className !== null && Object.hasOwn(_QC_CLASSES, className)) {
        _classFactory = _QC_CLASSES[className];
    } else {
        throw Error(`Unable to determine class ${className}. Unable to retrieve the class factory.`);
    }
    return _classFactory;
};
