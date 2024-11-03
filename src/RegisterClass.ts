import { __getType__ } from "./getType";
import { __make_global__ } from "./make_global";
import { _QC_CLASSES } from "./PrimaryCollections";


export const __register_class__ = function (_class_:any, __namespace?:string):any {
    let name = _class_.name || __getType__(_class_);
    if (name.toLowerCase() === "function" && typeof _class_.__classType !== "undefined"){
        name = _class_.__classType;
    }
    if (typeof _class_.__definition === "undefined") {
        _class_.__definition = {};
    }
    _class_.__definition.__classType = name;
    if (typeof __namespace !== "undefined") {
        _class_.__definition.__namespace = __namespace;
    }
    (_QC_CLASSES as any)[name] = _class_;
    __make_global__((_QC_CLASSES as any)[name]);
    return (_QC_CLASSES as any)[name];
};

export const RegisterClass = function (_class_:any, __namespace?:string):any {
    return __register_class__(_class_, __namespace);
};
__make_global__(RegisterClass);