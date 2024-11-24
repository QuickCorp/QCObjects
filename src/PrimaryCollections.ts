import { T_QC_CLASSES, T_QC_PACKAGES } from "types";
import { __getType__ } from "./getType";
import { __make_global__ } from "./make_global";

export var _QC_CLASSES: T_QC_CLASSES = {};
export var _QC_PACKAGES: T_QC_PACKAGES = {};
export var _QC_PACKAGES_IMPORTED: any[] = [];
export var _QC_READY_LISTENERS: any[] = [];

export const __register_class__ = function (_class_: any, __namespace?: string): any {
    const __classType = __getType__(_class_);
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
    _QC_CLASSES[name] = _class_;
    __make_global__(_class_);
    return _QC_CLASSES[name];
};

export const get_QC_CLASS = (name:string):any => {
    return _QC_CLASSES[name];
};

const _get_packages_names = function <T>(_packages: any): T[] {
    let _keys: any[] = [];
    for (const _k of Object.keys(_packages)) {
        if (
            typeof _packages[_k] !== "undefined" &&
            typeof _packages[_k] !== "function" &&
            Object.hasOwn(_packages[_k], "length") &&
            _packages[_k].length > 0
        ) {
            _keys.push(_k);
            _keys = _keys.concat(_get_packages_names(_packages[_k]));
        }
    }
    return _keys as T[];
};


export const getPackagesNamesList = (): any[] => {
    return _get_packages_names(_QC_PACKAGES);
};

export const getPackagesList = (): any[] => {
    return [...getPackagesNamesList()].map(<T>(packagename: string): T => {
        const _classesList: any[] = _QC_PACKAGES[packagename] as any[];
        let _ret_: any = undefined;
        if (_classesList) {
            _ret_ = {
                packageName: packagename,
                classesList: _classesList.filter(function (): boolean {
                    return true;
                })
            };
        }
        return _ret_ as T;
    }).filter(function (_p: any): boolean {
        return typeof _p !== "undefined";
    });
};

export const getClassesList = (): any[] => {
    let _classesList: any[] = [];
    [...getPackagesList()].forEach(function <T>(_package_element: any): T {
        _classesList = _classesList.concat(_package_element.classesList.map(
            (_class_element: any) => {
                return {
                    packageName: _package_element.packageName,
                    className: `${_package_element.packageName}.${__getType__(_class_element)}`,
                    classFactory: _class_element
                };
            }
        ));
        return _package_element as T;
    });

    return _classesList;
};

export const getClassesNamesList = (): any[] => {
    return [...getClassesList()].map(<T>(_class_element: any): T => {
        return _class_element.className as T;
    });
};

export const set_QC_PACKAGE = (packageName: string, _qc_packages: any[]) => {
    _QC_PACKAGES[packageName] = _qc_packages;
};

