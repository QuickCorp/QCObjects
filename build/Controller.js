"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const ClassFactory_1 = require("./ClassFactory");
const getType_1 = require("./getType");
const InheritClass_1 = require("./InheritClass");
const Logger_1 = require("./Logger");
const New_1 = require("./New");
const Package_1 = require("./Package");
class Controller extends InheritClass_1.InheritClass {
    __instanceID;
    component = null;
    dependencies = [];
    constructor({ component, dependencies }) {
        super({ component, dependencies });
        this.component = component;
        this.dependencies = dependencies;
        if (typeof this.component === "undefined" || this.component === null) {
            throw Error(`${(0, getType_1.__getType__)(this)} must be called with a component`);
        }
    }
    body;
    routingSelectedAttr(attrName) {
        return this.component?.routingSelected.map(function (r) {
            return r[attrName];
        }).filter(function (v) {
            return v;
        }).pop();
    }
    isTouchable() {
        return ("ontouchstart" in window) ||
            (navigator.MaxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
    }
    onpress(subelementSelector, handler) {
        try {
            if (this.isTouchable()) {
                (this.component?.body.subelements(subelementSelector))[0].addEventListener("touchstart", handler, {
                    passive: true
                });
            }
            else {
                (this.component?.body.subelements(subelementSelector))[0].addEventListener("click", handler, {
                    passive: true
                });
            }
        }
        catch (e) {
            Logger_1.logger.debug("No button to assign press event");
        }
    }
    createRoutingController() {
        const controller = this;
        const component = controller.component;
        const controllerName = controller.routingSelectedAttr("controllerclass");
        if (typeof controllerName !== "undefined") {
            const _Controller = (0, ClassFactory_1.ClassFactory)(controllerName);
            if (typeof _Controller !== "undefined" && component !== null) {
                component.routingController = (0, New_1.New)(_Controller, {
                    component
                }); // Initializes the main controller for the component
                if (Object.hasOwnProperty.call(component.routingController, "done") && typeof component.routingController.done === "function") {
                    component.routingController.done.call(component.routingController);
                }
            }
        }
    }
    done() { }
}
exports.Controller = Controller;
(0, Package_1.Package)("com.qcobjects.controllers", [
    Controller
]);
