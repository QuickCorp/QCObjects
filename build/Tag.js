"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = exports.TagElements = void 0;
const ClassFactory_1 = require("./ClassFactory");
const New_1 = require("./New");
const Package_1 = require("./Package");
const platform_1 = require("./platform");
const ArrayCollection_1 = require("./ArrayCollection");
class TagElements extends ArrayCollection_1.ArrayList {
    show() {
        this.map(function (element) {
            return element.style.opacity = 1;
        });
    }
    hide() {
        this.map(function (element) {
            return element.style.opacity = 0;
        });
    }
    effect(...args) {
        const effectArguments = [...args].slice(1);
        const effectClassName = args[0];
        let effectClass = undefined;
        if ((typeof effectClassName).toLowerCase() === "string") {
            effectClass = (0, ClassFactory_1.ClassFactory)(effectClassName);
        }
        this.map(function (element) {
            return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
        });
    }
    findElements(elementName) {
        const _o = (0, New_1.New)((0, ClassFactory_1.ClassFactory)("TagElements"));
        if (platform_1.isBrowser) {
            for (const _k in this) {
                if (typeof _k === "number" && typeof this[_k] !== "function" && Object.hasOwn(this[_k], "subelements")) {
                    _o.push(this[_k].subelements(elementName));
                }
            }
        }
        else {
            // not yet implemented.
        }
        return _o;
    }
}
exports.TagElements = TagElements;
/**
 * Gets the element of DOM found by tag name
 *
 * @param {Object} tagname
 * @param {Object} innerHTML
 */
const Tag = function (tagname, innerHTML) {
    const _o = (0, New_1.New)(TagElements);
    if (platform_1.isBrowser) {
        const o = document.subelements(tagname);
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
    }
    else {
        // not yet implemented.
    }
    return _o;
};
exports.Tag = Tag;
(0, Package_1.Package)("com.qcobjects", [
    TagElements,
    exports.Tag
]);
