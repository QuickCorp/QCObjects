"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DOMCreateComplexElement = exports._DOMCreateElement = void 0;
const platform_1 = require("./platform");
const _DOMCreateElement = function (elementName, props, children) {
    let _ret_;
    if (platform_1.isBrowser) {
        _ret_ = (0, exports._DOMCreateComplexElement)(elementName, props, children);
    }
    else {
        _ret_ = {};
    }
    return _ret_;
};
exports._DOMCreateElement = _DOMCreateElement;
const ComplexTypeCall = (_type, { props, children }) => {
    return _type({ props, children });
};
const _DOMCreateComplexElement = (_type, props, children) => {
    if (typeof _type !== "string") {
        return ComplexTypeCall(_type, { props, children });
    }
    const element = document.createElement(_type);
    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (typeof value === "string" || typeof value === "number") {
                element.setAttribute(key, value.toString());
            }
            else if (typeof value === "function" && key.toLowerCase().startsWith("on")) {
                element.addEventListener(key.slice(2).toLowerCase(), value.bind(element));
            }
        });
    }
    if (Array.isArray(children)) {
        children.filter((child => child instanceof Node)).forEach(child => {
            element.appendChild(child);
        });
    }
    else if (children instanceof Node) {
        element.appendChild(children);
    }
    else if (typeof children === "string") {
        element.innerHTML = children;
    }
    return element;
};
exports._DOMCreateComplexElement = _DOMCreateComplexElement;
