import { logger } from "./Logger";
import { _require_, isBrowser } from "./platform";

export var _basePath_ = (
    function () {
      let _basePath = "";
      if (isBrowser) {
        const baseURI = document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
      } else {
        let process;
        try {
          process = _require_("process");
        } catch (e:any) {
          logger.debug(`An error ocurred: ${e}.`);
          // not a process module
        }
        if (typeof process !== "undefined") {
          _basePath = `${(process).cwd()}/`;
        } else {
          _basePath = "";
        }
      }
      return _basePath;
    }
  )();

export const setBasePath = (value:string) => { _basePath_ = value;};