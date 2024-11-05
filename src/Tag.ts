import { IQCObjectsElement, ITagElements } from "types";
import { ClassFactory } from "./ClassFactory";
import { New } from "./New";
import { Package } from "./Package";
import { isBrowser } from "./platform";
import { Effect } from "./Effect";
import { ArrayList } from "./ArrayCollection";

export class TagElements extends ArrayList implements ITagElements {
    show() {
      this.map(function (element:any) {
        return element.style.opacity = 1;
      });
    }
    hide() {
      this.map(function (element:any) {
        return element.style.opacity = 0;
      });
    }
    effect<T>(...args:T[]) {
      const effectArguments = [...args].slice(1);
      const effectClassName = args[0] as string;
      let effectClass = undefined;
      if ((typeof effectClassName).toLowerCase() === "string") {
        effectClass = ClassFactory(effectClassName);
      }
      this.map(function <T>(element:any):T {
        return ((effectClass as Effect).apply as Function).apply(effectClass, [element].concat(effectArguments)) as T;
      });
    }
    findElements(elementName:any):any {
      const _o = New(ClassFactory("TagElements"));
      if (isBrowser) {
        for (const _k in this) {
          if (typeof _k === "number" && typeof this[_k] !== "function" && Object.hasOwn(this[_k], "subelements")) {
            _o.push(this[_k].subelements(elementName));
          }
        }
      } else {
        // not yet implemented.
      }
      return _o;
    }
  }

  /**
   * Gets the element of DOM found by tag name
   *
   * @param {Object} tagname
   * @param {Object} innerHTML
   */
  export const Tag = function <T>(tagname:string, innerHTML?:string): T[] {
    const _o = New(TagElements);
    if (isBrowser) {
      const o = (document as unknown as IQCObjectsElement).subelements(tagname);
      const addedKeys = [];
      for (let _i = 0; _i < o.length; _i++) {
        if (typeof innerHTML !== "undefined" && Object.hasOwn(o[_i], "innerHTML")) {
          o[_i].innerHTML = innerHTML;
        }
        if (addedKeys.indexOf(_i) < 0) {
          _o.push(o[_i]);
          addedKeys.push(_i);
        }
      }
    } else {
      // not yet implemented.
    }
    return _o as T[];
  };


  Package("com.qcobjects",[
    TagElements,
    Tag
  ]);