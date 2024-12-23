import { isBrowser } from "./platform";
import process from "node:process";

export var _basePath_:string = (
    function ():string {
      let _basePath:string = "";
      if (isBrowser) {
        const baseURI:string[] = document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
      } else {
        if (typeof process !== "undefined") {
          _basePath = `${(process).cwd()}/`;
        } else {
          _basePath = "";
        }
      }
      return _basePath;
    }
  )();

export const setBasePath = (value:string):void => { _basePath_ = value;};