"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceRef = void 0;
const isQCObjects_1 = require("./isQCObjects");
const Package_1 = require("./Package");
/**
 * Declare Namespace
 *
 * @param {String} packageName
 * @param {Object} package
 */
const NamespaceRef = function (namespace) {
    const packageInstance = (0, Package_1.Package)(namespace) || [];
    const classes = packageInstance.filter((c) => (0, isQCObjects_1.isQCObjects_Class)(c)).map((c) => {
        return {
            [c.__definition.__classType]: c
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    }).reduce((a, b) => { return Object.assign(a, b); });
    return namespace.split(".").map(c => {
        return {
            [c]: classes
        };
    }).reverse().reduce((a, b) => {
        b[Object.keys(b).join(".")] = a;
        return b;
    });
};
exports.NamespaceRef = NamespaceRef;
