import { Array, Component, HTMLElement, IProcessor, QCObjectsElement, QCObjectsShadowedElement } from "types/global";
import { CONFIG } from "./CONFIG";
import { InheritClass } from "./InheritClass";
import { __make_global__ } from "./make_global";
import { New } from "./New";
import { RegisterClass } from "./RegisterClass";
import { _top } from "./top";

export class Processor extends InheritClass implements IProcessor{
    __definition?:any = {};
    __classType?:string = "Processor";

    static processors = {
      "config"(component:Component, arg:string) {
        return CONFIG.get(arg, "");
      },
      "ENV"(component:Component, arg:string) {
        return (typeof process !== "undefined") ? (process.env[arg]) : ("");
      },
      "global"(component:Component, arg:string) {
        return (typeof _top !== "undefined") ? ((_top as any)[arg]) : ("");
      }
    };

    static setProcessor(_proc_:Function) {
      if (typeof _proc_ === "function" && _proc_.name !== "") {
        (this.processors as any)[_proc_.name] = _proc_;
      }
    }

    constructor({component}:{component:Component|null}) {
      super({component});
      this.processors = Processor.processors;
      this.process = Processor.process.bind(this);
      this.processObject = Processor.processObject.bind(this);
      this.setProcessor = Processor.setProcessor.bind(this);
      this.execute = Processor.execute.bind(this);
    }

  __instanceID!: number;
  __new__?(): void {
    throw new Error("Method not implemented.");
  }

  __namespace?: string | undefined;
  body?: string | QCObjectsElement | QCObjectsShadowedElement | HTMLElement | null | undefined;
  component!: Component;
  processors: any;
  process(template: string, component: Component) {
    throw new Error("Method not implemented.");
  }

  processObject(obj: any, component: Component) {
    throw new Error("Method not implemented.");
  }

  setProcessor(proc: Function) {
    throw new Error("Method not implemented.");
  }

    static execute(component:Component, processorName:string, args:string) {
      const processorHandler = (typeof component !== "undefined" && component !== null) ? (component.processorHandler) : (this);
      return processorHandler?.processors[processorName].bind(processorHandler).apply(processorHandler, [component, args?.split(",")]);
    }

    static process(template:string, component:Component|null = null) {
      const processorHandler = (component !== null) ? (component.processorHandler) : (New(Processor, { component: null }));
      if (typeof template === "string") {
        Object.keys(processorHandler.processors).map(function (funcName) {
          [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(
            function (procesorMatch) {
              const match0 = `$${funcName}(${procesorMatch[1]})`;
              template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
            }
          );
        });
      }
      return template;
    }

    static processObject(obj:any, component:Component|null = null) {
      let __instance__:Processor| typeof Processor | undefined = (component === null) ? (this) : (component.processorHandler);
      if (typeof __instance__ === "undefined") {
        __instance__ = new Processor({ component });
      }
      if (typeof obj === "object") {
        Object.keys(obj).map(
          function (_k) {
            if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
              obj[_k] = __instance__?.processObject.bind(__instance__)(obj[_k], component as Component);
            } else if (typeof obj[_k] === "string") {
              obj[_k] = __instance__?.process.bind(__instance__)(obj[_k], component as Component);
            }
          }
        );
      } else if (typeof obj === "string") {
        obj = __instance__.process.bind(__instance__)(obj, component as Component);
      }
      return obj;
    }

  }
  Processor.__definition = {};
  Processor.__classType = "Processor";
  RegisterClass(Processor, "com.qcobjects");
  __make_global__(Processor);
