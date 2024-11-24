import { __make_global__ } from "./make_global";
import { __register_class__ } from "./PrimaryCollections";



export const RegisterClass = function (_class_:any, __namespace?:string):any {
    return __register_class__(_class_, __namespace);
};
__make_global__(RegisterClass);