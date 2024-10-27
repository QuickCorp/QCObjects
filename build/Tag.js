"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.TagElements = void 0;
const Class_1 = require("./Class");
const ClassFactory_1 = require("./ClassFactory");
const New_1 = require("./New");
const Package_1 = require("./Package");
const platform_1 = require("./platform");
exports.TagElements = (0, Class_1.Class)("TagElements", Array, {
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
        const effectArguments = [...arguments].slice(1);
        let effectClass = arguments[0];
        if ((typeof effectClass).toLowerCase() === "string") {
            effectClass = (0, ClassFactory_1.ClassFactory)(effectClass);
        }
        this.map(function (element) {
            return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
        });
    },
    findElements(elementName) {
        const _o = (0, New_1.New)((0, ClassFactory_1.ClassFactory)("TagElements"));
        if (platform_1.isBrowser) {
            for (const _k in this) {
                if (typeof _k === "number" && typeof this[_k] !== "function" && this[_k].hasOwnProperty.call(this[_k], "subelements")) {
                    _o.push(this[_k].subelements(elementName));
                }
            }
        }
        else {
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
const Tag = function (tagname, innerHTML) {
    const _o = (0, New_1.New)((0, ClassFactory_1.ClassFactory)("TagElements"));
    if (platform_1.isBrowser) {
        const o = document.subelements(tagname);
        const addedKeys = [];
        for (let _i = 0; _i < o.length; _i++) {
            if (typeof innerHTML !== "undefined" && o[_i].hasOwnProperty.call(o[_i], "innerHTML")) {
                o[_i].innerHTML = innerHTML;
            }
            if (addedKeys.indexOf(_i) < 0) {
                _o.push(o[_i]);
                addedKeys.push(_i);
            }
        }
    }
    else {
        // not yet implemented.
    }
    return _o;
};
exports.Tag = Tag;
(0, Package_1.Package)("com.qcobjects", [
    exports.TagElements,
    exports.Tag
]);
