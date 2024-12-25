"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDocumentLayout = void 0;
const getDocumentLayout = function () {
    const h = (w, h) => {
        return w > h ? "landscape" : null;
    };
    const v = (w, h) => {
        return h > w ? "portrait" : null;
    };
    const square = (w, h) => {
        return w === h ? "square" : null;
    };
    return [
        h(document.documentElement.clientWidth, document.documentElement.clientHeight),
        v(document.documentElement.clientWidth, document.documentElement.clientHeight),
        square(document.documentElement.clientWidth, document.documentElement.clientHeight)
    ].filter(e => e !== null).pop();
};
exports.getDocumentLayout = getDocumentLayout;
