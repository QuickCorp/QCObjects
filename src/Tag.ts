import { Class } from "./Class";
import { ClassFactory } from "./ClassFactory";
import { New } from "./New";
import { isBrowser } from "./platform";

export const TagElements = Class("TagElements", Array, {
    show() {
      this.map(function (element) {
        return element.style.opacity = 1;
      });
    },
    hide() {
      this.map(function (element) {
        return element.style.opacity = 0;
      });
    },
    effect() {
      var effectArguments = [...arguments].slice(1);
      var effectClass = arguments[0];
      if ((typeof effectClass).toLowerCase() === "string") {
        effectClass = ClassFactory(effectClass);
      }
      this.map(function (element) {
        return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
      });
    },
    findElements(elementName) {
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
  export const Tag = function (tagname, innerHTML) {
    var _o = New(ClassFactory("TagElements"));
    if (isBrowser) {
      var o = document.subelements(tagname);
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
