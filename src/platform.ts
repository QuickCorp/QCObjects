
export const isDeno:boolean = (typeof window !== "undefined" && "Deno" in window);
export const isBrowser:boolean = (typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self) && !isDeno;
export const isNodeCommonJS:boolean = (typeof module !== "undefined");
// eslint-disable-next-line no-unused-vars
export const deno_require = (name:string):void => { /* not yet implemented */};
export const _require_ = (name:string):any => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return (isDeno)?(deno_require(name)):(require(name));
};
declare const cordova: any;

export const is_phonegap:boolean = (
  function () {
    return (typeof cordova !== "undefined");
  }
)();