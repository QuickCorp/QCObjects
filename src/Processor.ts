import { InheritClass } from "./InheritClass";
import { __make_global__ } from "./make_global";
import { New } from "./New";
import { RegisterClass } from "./RegisterClass";
import { _top } from "./top";

class Processor extends InheritClass {
    component = null;
    __definition = {};
    __classType = "Processor";

    static processors = {
      "config"(component, arg) {
        return _top.CONFIG.get(arg, "");
      },
      "ENV"(component, arg) {
        return (typeof process !== "undefined") ? (process.env[arg]) : ("");
      },
      "global"(component, arg) {
        return (typeof global !== "undefined") ? (global[arg]) : ("");
      }
    };
    static setProcessor(_proc_) {
      if (typeof _proc_ === "function" && _proc_.name !== "") {
        this.processors[_proc_.name] = _proc_;
      }
    }

    constructor({component}) {
      super({component});
      this.processors = Processor.processors;
      this.process = Processor.process.bind(this);
      this.processObject = Processor.processObject.bind(this);
      this.setProcessor = Processor.setProcessor.bind(this);
      this.execute = Processor.execute.bind(this);
    }

    static execute(component, processorName, args) {
      var processorHandler = (typeof component !== "undefined" && component !== null) ? (component.processorHandler) : (this);
      return processorHandler.processors[processorName].bind(processorHandler).apply(processorHandler, [component, ...args.split(",")]);
    }

    static process(template, component = null) {
      var processorHandler = (component !== null) ? (component.processorHandler) : (New(Processor, { component: null }));
      if (typeof template === "string") {
        Object.keys(processorHandler.processors).map(function (funcName) {
          [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(
            function (procesorMatch) {
              var match0 = `$${funcName}(${procesorMatch[1]})`;
              template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
            }
          );
        });
      }
      return template;
    }

    static processObject(obj, component = null) {
      var __instance__ = (component === null) ? (this) : (component.processorHandler);
      if (typeof __instance__ === "undefined") {
        __instance__ = new Processor({ component: component });
      }
      if (typeof obj === "object") {
        Object.keys(obj).map(
          function (_k) {
            if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
              obj[_k] = __instance__.processObject.bind(__instance__)(obj[_k], component);
            } else if (typeof obj[_k] === "string") {
              obj[_k] = __instance__.process.bind(__instance__)(obj[_k], component);
            }
          }
        );
      } else if (typeof obj === "string") {
        obj = __instance__.process.bind(__instance__)(obj, component);
      }
      return obj;
    }

  }
  Processor.__definition = {};
  Processor.__classType = "Processor";
  RegisterClass(Processor, "com.qcobjects");
  __make_global__(Processor);
