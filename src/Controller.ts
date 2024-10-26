import { ControllerParams, HTMLElement, IController, QCObjectsElement } from "types/global";
import { ClassFactory } from "./ClassFactory";
import { __getType__ } from "./getType";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { New } from "./New";
import { Package } from "./Package";
import { Component } from "./Component";

export class Controller extends InheritClass implements IController{
  __instanceID!: number;
  component: Component | null = null;
  dependencies?: any[] = [];
  constructor({
    component,
    dependencies
  }: ControllerParams) {
    super({ component, dependencies });
    this.component = component;
    this.dependencies = dependencies;
    if (typeof this.component === "undefined" || this.component === null) {
      throw Error(`${__getType__(this)} must be called with a component`);
    }
  }

  body?: QCObjectsElement | HTMLElement | undefined;

  routingSelectedAttr(attrName: string) {
    return this.component?.routingSelected.map(function (r: any) {
      return r[attrName];
    }).filter(function (v: any) {
      return v;
    }).pop();
  }

  isTouchable() {
    return ("ontouchstart" in window) ||
      ((navigator as any).MaxTouchPoints > 0) ||
      ((navigator as any).msMaxTouchPoints > 0);
  }

  onpress(subelementSelector: string, handler: Function) {
    try {
      if (this.isTouchable()) {
        (this.component?.body.subelements(subelementSelector) as any[])[0].addEventListener("touchstart", handler, {
          passive: true
        });
      } else {
        (this.component?.body.subelements(subelementSelector) as any[])[0].addEventListener("click", handler, {
          passive: true
        });
      }
    } catch (e) {
      logger.debug("No button to assign press event");
    }
  }

  createRoutingController() {
    const controller = this;
    const component = controller.component;
    const controllerName = controller.routingSelectedAttr("controllerclass");
    if (typeof controllerName !== "undefined") {
      const _Controller = ClassFactory(controllerName);
      if (typeof _Controller !== "undefined" && component !== null) {
        component.routingController = New(_Controller, {
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

Package("com.qcobjects.controllers", [
  Controller
]);
