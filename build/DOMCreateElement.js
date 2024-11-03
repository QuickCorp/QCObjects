"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DOMCreateElement = void 0;
const platform_1 = require("./platform");
const _DOMCreateElement = function (elementName) {
    let _ret_;
    if (platform_1.isBrowser) {
        _ret_ = document.createElement(elementName);
    }
    else {
        _ret_ = {};
    }
    return _ret_;
};
exports._DOMCreateElement = _DOMCreateElement;
