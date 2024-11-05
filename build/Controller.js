"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const ClassFactory_1 = require("./ClassFactory");
const getType_1 = require("./getType");
const InheritClass_1 = require("./InheritClass");
const Logger_1 = require("./Logger");
const New_1 = require("./New");
const Package_1 = require("./Package");
const platform_1 = require("./platform");
class Controller extends InheritClass_1.InheritClass {
    component;
    dependencies = [];
    constructor({ component, dependencies }) {
        super({ component, dependencies });
        this.component = component;
        this.dependencies = dependencies;
        if (typeof this.component === "undefined" || this.component === null) {
            throw Error(`${(0, getType_1.__getType__)(this)} must be called with a component`);
        }
    }
    // eslint-disable-next-line no-unused-vars
    fail(...args) {
        throw new Error("Method not implemented.");
    }
    routingSelectedAttr(attrName) {
        return this.component?.routingSelected.map((r) => {
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
        if (platform_1.isBrowser) {
            try {
                if (this.isTouchable()) {
                    (this.component?.componentRoot?.subelements(subelementSelector))[0].addEventListener("touchstart", handler, {
                        passive: true
                    });
                }
                else {
                    (this.component?.componentRoot?.subelements(subelementSelector))[0].addEventListener("click", handler, {
                        passive: true
                    });
                }
            }
            catch (e) {
                Logger_1.logger.debug(`An error ocurred: ${e}.`);
                Logger_1.logger.debug("No button to assign press event");
            }
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
                if (typeof component.routingController !== "undefined"
                    && Object.hasOwn(component.routingController, "done")
                    && typeof component.routingController.done === "function") {
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
