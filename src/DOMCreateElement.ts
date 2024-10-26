import { isBrowser } from "./platform";

export const _DOMCreateElement = function (elementName:string) {
    var _ret_;
    if (isBrowser) {
      _ret_ = document.createElement(elementName);
    } else {
      _ret_ = {};
    }
    return _ret_;
  };
