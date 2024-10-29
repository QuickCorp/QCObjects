import {IComponent, IProcessor } from "types";
import { CONFIG } from "./CONFIG";
import { InheritClass } from "./InheritClass";
import { New } from "./New";
import { _top } from "./top";
import { Component } from "./Component";
import { Package } from "./Package";

export class Processor extends InheritClass implements IProcessor {
  constructor({ component }: { component: IComponent | null }) {
    super({ component });
    this.processors = Object.assign (this.processors,Processor.instance.processors);
  }

  processors:any = {
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

  static get instance ():Processor {
    return new Processor({component:null});
  }

  setProcessor(_proc_: Function) {
    if (typeof _proc_ === "function" && _proc_.name !== "") {
      this.processors[_proc_.name] = _proc_;
    }
  }

  component!: IComponent|null;


   execute(component: IComponent, processorName: string, args: string):string {
    const processorHandler = (typeof component !== "undefined" && component !== null) ? (component.processorHandler) : (this);
    return processorHandler?.processors[processorName].bind(processorHandler).apply(processorHandler, [component, args?.split(",")]) as string;
  }

   process(template: string, component: IComponent | null = null) {
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

   processObject(obj: any, component: IComponent | null = null):any {
    let __instance__: Processor | IProcessor | undefined = (component === null) ? (this) : (component.processorHandler);
    if (typeof __instance__ === "undefined") {
      __instance__ = new Processor({ component });
    }
    if (typeof obj === "object") {
      Object.keys(obj).map(
         (_k) => {
          if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
            obj[_k] = __instance__?.processObject.bind(__instance__)(obj[_k], component as IComponent);
          } else if (typeof obj[_k] === "string") {
            obj[_k] = __instance__?.process.bind(__instance__)(obj[_k], component as IComponent);
          }
          return _k;
        }
      );
    } else if (typeof obj === "string") {
      obj = __instance__.process.bind(__instance__)(obj, component as IComponent);
    }
    return obj;
  }

}

export const GlobalProcessor:Processor = Processor.instance;

Package("com.qcobjects", [Processor]);