import {IProcessor, IQCObjectsElement, IQCObjectsShadowedElement } from "types";
import { CONFIG } from "./CONFIG";
import { InheritClass } from "./InheritClass";
import { New } from "./New";
import { _top } from "./top";
import { Component } from "./Component";
import { Package } from "./Package";

export class Processor extends InheritClass implements IProcessor {

  static processors = {
    "config"(component: Component, arg: string):string {
      return CONFIG.get(arg, "") as string;
    },
    "ENV"(component: Component, arg: string):string {
      return (typeof process !== "undefined") ? (process.env[arg] as string) : ("");
    },
    "global"(component: Component, arg: string):string {
      return (typeof _top !== "undefined") ? ((_top as any)[arg] as string) : ("");
    }
  };

  static setProcessor(_proc_: Function) {
    if (typeof _proc_ === "function" && _proc_.name !== "") {
      (this.processors as any)[_proc_.name] = _proc_;
    }
  }

  constructor({ component }: { component: Component | null }) {
    super({ component });
    this.processors = Processor.processors;
  }
  component: Component;

  __instanceID!: number;
  __new__?(): void {
    throw new Error("Method not implemented.");
  }

  __namespace?: string | undefined;
  body?: string | IQCObjectsElement | IQCObjectsShadowedElement | HTMLElement | null | undefined;
  processors: any;


   execute(component: Component, processorName: string, args: string):string {
    const processorHandler = (typeof component !== "undefined" && component !== null) ? (component.processorHandler) : (this);
    return processorHandler?.processors[processorName].bind(processorHandler).apply(processorHandler, [component, args?.split(",")]) as string;
  }

   process(template: string, component: Component | null = null) {
    const processorHandler = (component !== null) ? (component.processorHandler) : (New(Processor, { component: null }));
    if (typeof template === "string") {
      Object.keys(processorHandler.processors).map(function (funcName) {
        [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(
          function (procesorMatch) {
            const match0 = `$${funcName}(${procesorMatch[1]})`;
            template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
            return procesorMatch;
          }
        );
      });
    }
    return template;
  }

   processObject(obj: any, component: Component | null = null) {
    let __instance__: Processor | typeof Processor | undefined = (component === null) ? (this) : (component.processorHandler);
    if (typeof __instance__ === "undefined") {
      __instance__ = new Processor({ component });
    }
    if (typeof obj === "object") {
      Object.keys(obj).map(
         (_k) => {
          if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
            obj[_k] = __instance__?.processObject.bind(__instance__)(obj[_k], component as Component);
          } else if (typeof obj[_k] === "string") {
            obj[_k] = __instance__?.process.bind(__instance__)(obj[_k], component as Component);
          }
          return _k;
        }
      );
    } else if (typeof obj === "string") {
      obj = __instance__.process.bind(__instance__)(obj, component as Component);
    }
    return obj;
  }

}

Package("com.qcobjects", [Processor]);