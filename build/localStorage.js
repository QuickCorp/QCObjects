"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStorage = void 0;
exports.localStorage = window.localStorage;
if (typeof exports.localStorage === "undefined") {
    /* Polyfill for localStorage */
    exports.localStorage = {
        getItem(name) {
            return (Object.hasOwn(this, name)) ? (this[name]) : (null);
        },
        setItem(name, value) {
            this[name] = value;
        },
        removeItem(name) {
            delete this[name];
        }
    };
    /* end Polyfill for localStorage */
}
