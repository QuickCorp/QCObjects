import { _require_, isBrowser } from "./platform";
import { _top } from "./top";

export var _basePath_ = (
    function () {
      var _basePath = "";
      if (isBrowser) {
        var baseURI = _top.document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
      } else {
        var process;
        try {
          process = _require_("process");
        } catch (e) {
          // not a process module
        }
        if (typeof process !== "undefined") {
          _basePath = `${process.cwd()}/`;
        } else {
          _basePath = "";
        }
      }
      return _basePath;
    }
  )();

export const setBasePath = (value:string) => { _basePath_ = value;}