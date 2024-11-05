"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const getType_1 = require("./getType");
const InheritClass_1 = require("./InheritClass");
const Package_1 = require("./Package");
class View extends InheritClass_1.InheritClass {
    constructor({ component = undefined, dependencies = [] }) {
        super({ component, dependencies });
        if (typeof this.component === "undefined" || this.component === "null") {
            throw Error(`${(0, getType_1.__getType__)(this)} must be called with a component`);
        }
    }
}
exports.View = View;
(0, Package_1.Package)("com.qcobjects.views", [
    View
]);
