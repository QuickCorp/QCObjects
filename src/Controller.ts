import { IController, IComponent, TControllerParams, IQCObjectsElement, IQCObjectsShadowedElement } from "types";
import { ClassFactory } from "./ClassFactory";
import { __getType__ } from "./getType";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { New } from "./New";
import { Package } from "./Package";
import { isBrowser } from "./platform";

export class Controller extends InheritClass implements IController{

  component!: IComponent ;
  dependencies?: any[] = [];
  constructor({
    component,
    dependencies
  }: TControllerParams) {
    super({ component, dependencies });
    this.component = component;
    this.dependencies = dependencies;
    if (typeof this.component === "undefined" || this.component === null) {
      throw Error(`${__getType__(this)} must be called with a component`);
    }
  }
  // eslint-disable-next-line no-unused-vars
  fail?(...args: [...args: any[]]  ): void {
    throw new Error("Method not implemented.");
  }


  routingSelectedAttr(attrName: string):any {
    return this.component?.routingSelected.map( (r: any):any => {
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
    if (isBrowser){
      try {
        if (this.isTouchable()) {
          ((this.component?.componentRoot as IQCObjectsElement| IQCObjectsShadowedElement)?.subelements(subelementSelector) as any[])[0].addEventListener("touchstart", handler, {
            passive: true
          });
        } else {
          ((this.component?.componentRoot as IQCObjectsElement | IQCObjectsShadowedElement)?.subelements(subelementSelector) as any[])[0].addEventListener("click", handler, {
            passive: true
          });
        }
      } catch (e:any) {
        logger.debug(`An error ocurred: ${e}.`);
        logger.debug("No button to assign press event");
      }
  
    }
  }

  createRoutingController() {
    const controller = this;
    const component = controller.component;
    const controllerName = controller.routingSelectedAttr("controllerclass");
    if (typeof controllerName !== "undefined") {
      const _Controller = ClassFactory(controllerName) as IController;
      if (typeof _Controller !== "undefined" && component !== null) {
        component.routingController = New(_Controller, {
          component
        }) as IController; // Initializes the main controller for the component
        if (typeof component.routingController !== "undefined" 
          &&  Object.hasOwnProperty.call(component.routingController, "done") 
          && typeof component.routingController.done === "function") {
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
