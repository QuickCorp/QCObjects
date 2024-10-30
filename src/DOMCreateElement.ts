import { IQCObjectsElement } from "types/global";
import { isBrowser } from "./platform";

export const _DOMCreateElement = function (elementName:string):IQCObjectsElement {
    let _ret_;
    if (isBrowser) {
      _ret_ = document.createElement(elementName) as unknown as IQCObjectsElement;
    } else {
      _ret_ = {} as IQCObjectsElement;
    }
    return _ret_;
  };
