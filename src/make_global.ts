import { isBrowser } from "./platform";
import { _top } from "./top";


export const __make_global__ = function (f:any) {
    if (typeof f !== "undefined") {
        if (isBrowser) {
            try {
                (_top as any)[f.name] = f;
                window[f.name] = f;
            } catch (e:any) { throw Error (`An error ocurred: ${e}`); }
        } else if (typeof global !== "undefined") {
            if (!Object.hasOwnProperty.call(global, f.name)) {
                (global as any)[f.name] = f;
            }
        }
    }

};