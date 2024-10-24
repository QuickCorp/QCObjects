import { ClassFactory } from "./ClassFactory";
import { __getType__ } from "./getType";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { New } from "./New";
import { Package } from "./Package";

export class Controller extends InheritClass {
    component = null;
    dependencies = [];
    constructor({
      component,
      dependencies
    }) {
      super({ component, dependencies });
      this.component = component;
      this.dependencies = dependencies;
      if (typeof this.component === "undefined" || this.component === "null") {
        throw Error(`${__getType__(this)} must be called with a component`);
      }
    }

    routingSelectedAttr(attrName) {
      return this.component.routingSelected.map(function (r) {
        return r[attrName];
      }).filter(function (v) {
        return v;
      }).pop();
    }

    isTouchable() {
      return ("ontouchstart" in window) ||
        ((navigator as any).MaxTouchPoints > 0) ||
        ((navigator as any).msMaxTouchPoints > 0);
    }

    onpress(subelementSelector, handler) {
      try {
        if (this.isTouchable()) {
          this.component.body.subelements(subelementSelector)[0].addEventListener("touchstart", handler, {
            passive: true
          });
        } else {
          this.component.body.subelements(subelementSelector)[0].addEventListener("click", handler, {
            passive: true
          });
        }
      } catch (e) {
        logger.debug("No button to assign press event");
      }
    }

    createRoutingController() {
      var controller = this;
      var component = controller.component;
      var controllerName = controller.routingSelectedAttr("controllerclass");
      if (typeof controllerName !== "undefined") {
        var _Controller = ClassFactory(controllerName);
        if (typeof _Controller !== "undefined") {
          component.routingController = New(_Controller, {
            component: component
          }); // Initializes the main controller for the component
          if (Object.hasOwnProperty.call(component.routingController, "done") && typeof component.routingController.done === "function") {
            component.routingController.done.call(component.routingController);
          }
        }
      }
    }

    done() { }
  }

Package("com.qcobjects.controllers", [
    Controller
  ]);
