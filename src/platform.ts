import { cordova } from "types/global";

export const isDeno:boolean = (typeof window !== "undefined" && "Deno" in window);
export const isBrowser:boolean = (typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self) && !isDeno;
export const isNodeCommonJS:boolean = (typeof module !== "undefined") ? (true): (false);
export const deno_require = (name:string):void => { /* not yet implemented */};
export const _require_ = (name:string):void => {
  return (isDeno)?(deno_require(name)):(require(name));
};

export const is_phonegap:boolean = (
  function () {
    return (typeof cordova !== "undefined") ? (true) : (false);
  }
)();