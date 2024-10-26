import { Class } from "./Class";
import { ClassFactory } from "./ClassFactory";
import { Export } from "./Export";
import { New } from "./New";
import { Package } from "./Package";
import { isBrowser } from "./platform";
import { RegisterClass } from "./RegisterClass";

export const TagElements = Class("TagElements", Array, {
    show() {
      this.map(function (element:any) {
        return element.style.opacity = 1;
      });
    },
    hide() {
      this.map(function (element:any) {
        return element.style.opacity = 0;
      });
    },
    effect() {
      var effectArguments = [...arguments].slice(1);
      var effectClass = arguments[0];
      if ((typeof effectClass).toLowerCase() === "string") {
        effectClass = ClassFactory(effectClass);
      }
      this.map(function (element:any) {
        return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
      });
    },
    findElements(elementName:any) {
      var _o = New(ClassFactory("TagElements"));
      if (isBrowser) {
        for (var _k in this) {
          if (typeof _k === "number" && typeof this[_k] !== "function" && this[_k].hasOwnProperty.call(this[_k], "subelements")) {
            _o.push(this[_k].subelements(elementName));
          }
        }
      } else {
        // not yet implemented.
      }
      return _o;
    }
  });

  /**
   * Gets the element of DOM found by tag name
   *
   * @param {Object} tagname
   * @param {Object} innerHTML
   */
  export const Tag = function (tagname:string, innerHTML?:string) {
    var _o = New(ClassFactory("TagElements"));
    if (isBrowser) {
      var o = (document as any).subelements(tagname);
      var addedKeys = [];
      for (var _i = 0; _i < o.length; _i++) {
        if (typeof innerHTML !== "undefined" && o[_i].hasOwnProperty.call(o[_i], "innerHTML")) {
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
    return _o;
  };


  Package("com.qcobjects",[
    TagElements,
    Tag
  ]);