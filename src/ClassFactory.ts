/**
 * Returns the QCObjects Class Factory of a given ClassName
 *
 * @param {String} name
 */

import { __is_raw_class__ } from "./is_raw_class";
import { _QC_CLASSES, _QC_PACKAGES, get_QC_CLASS } from "./PrimaryCollections";
import { TClassFactory } from "types";

export const ClassFactory:TClassFactory =  (className:string):any => {
    let _classFactory;
    if (typeof className === "undefined" || className === null) {
        throw Error ("You need to pass a parameter {className}");
    }
    if (className !== null && className.indexOf(".") !== -1) {
        const packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
        const _className = className.split(".").slice(-1).join("");
        const _package = _QC_PACKAGES[packageName] || [];
        const packageClasses = _package.filter((classFactory:any) => {
            return (__is_raw_class__(classFactory));
        }).reverse();
        if (packageClasses.length > 0) {
            _classFactory = packageClasses[0];
        } else {
            throw Error(`Class ${_className} not found. Found classes: ${JSON.stringify(packageClasses)} in package ${packageName}`);
        }
    } else if (className !== null) {
        _classFactory = get_QC_CLASS(className);
        if (typeof _classFactory === "undefined"){
            throw new Error (`${className} is undefined.`);            
        }
    } else {
        throw Error(`className is null. Unable to retrieve the class factory.\n Not found in: \n ${Object.keys(_QC_CLASSES).join("\n")}`);
    }
    return _classFactory;
};
