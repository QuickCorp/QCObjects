import { QCObjectsElement } from "types/global";
import { isBrowser } from "./platform";

export const _DOMCreateElement = function (elementName:string):QCObjectsElement {
    var _ret_;
    if (isBrowser) {
      _ret_ = document.createElement(elementName) as unknown as QCObjectsElement;
    } else {
      _ret_ = {} as QCObjectsElement;
    }
    return _ret_;
  };
