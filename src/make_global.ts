import { _top, set } from "./top";
declare const global:any;
declare const globalThis:any;

export const __make_global__ = (f:any):void => {
    if (!!f && !!f.name) {
        if (typeof _top !== "undefined" && typeof f !== "undefined" && _top !== null && !Object.hasOwn(_top,f.name)) {
            set(f.name, f);
        } else if (typeof global !== "undefined"){
            global[f.name] = f;
        } else if (typeof globalThis !== "undefined"){
            globalThis[f.name] = f;
        }
    
    }

};