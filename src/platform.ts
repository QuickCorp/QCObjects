import { _import_ } from "./_import_";
import { logger } from "./Logger";

export const isDeno:boolean = (typeof window !== "undefined" && "Deno" in window);
export const isBrowser:boolean = (typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self) && !isDeno;
export const isNodeCommonJS:boolean = (typeof module !== "undefined");
// eslint-disable-next-line no-unused-vars
export const deno_require = (name:string):void => { /* not yet implemented */};
export const _require_ = (name:string):any => {
   
  return (isDeno)?(deno_require(name)):(
    ( (name):any => {
      let r:any;
      try {
        (async () => {
          r = await _import_(name);
        })().then((m:any) => {
          r = (m && m.default) || m;
        })
        .catch ((e:any) => {
          logger.warn(`An error ocurred: ${e}`);
        });

      } catch (e:any) {
        logger.debug(`An error ocurred importing module. ${e}`);
        r = {export:{}};
      }
      return r;
    }  ) (name)
  );
};
declare const cordova: any;

export const is_phonegap:boolean = (
  function () {
    return (typeof cordova !== "undefined");
  }
)();