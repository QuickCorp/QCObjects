"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalProcessor = exports.Processor = void 0;
const CONFIG_1 = require("./CONFIG");
const InheritClass_1 = require("./InheritClass");
const New_1 = require("./New");
const top_1 = require("./top");
const Package_1 = require("./Package");
class Processor extends InheritClass_1.InheritClass {
    static _instance;
    constructor({ component, processors }) {
        super({ component });
        if (typeof processors !== "undefined") {
            this.processors = Object.assign(processors, Processor.instance.processors);
        }
    }
    processors = {
        "config"(component, arg) {
            return CONFIG_1.CONFIG.get(arg, "");
        },
        "ENV"(component, arg) {
            return (typeof process !== "undefined") ? process.env[arg] : ("");
        },
        "global"(component, arg) {
            return (typeof top_1._top !== "undefined") ? top_1._top[arg] : ("");
        }
    };
    static get instance() {
        if (typeof Processor._instance === "undefined") {
            Processor._instance = new Processor({ component: null });
        }
        return Processor._instance;
    }
    static setProcessor(_proc_) {
        if (typeof _proc_ === "function" && _proc_.name !== "") {
            Processor.instance.processors[_proc_.name] = _proc_;
        }
    }
    setProcessor(_proc_) {
        if (typeof _proc_ === "function" && _proc_.name !== "") {
            this.processors[_proc_.name] = _proc_;
        }
    }
    static getProcessor(_procName_) {
        return Processor.instance.processors[_procName_];
    }
    static getProcessorNames() {
        return Object.keys(Processor.instance.processors);
    }
    component;
    execute(component, processorName, args) {
        const processorHandler = (typeof component !== "undefined" && component !== null) ? (component.processorHandler) : (this);
        return processorHandler?.processors[processorName].bind(processorHandler).apply(processorHandler, [component, args?.split(",")]);
    }
    static process(template, component = null) {
        return Processor.instance.process(template, component);
    }
    process(template, component = null) {
        const processorHandler = (component !== null) ? (component.processorHandler) : ((0, New_1.New)(Processor, { component: null }));
        if (typeof template === "string") {
            Object.keys(processorHandler.processors).map((funcName) => {
                return [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(function (procesorMatch) {
                    const match0 = `$${funcName}(${procesorMatch[1]})`;
                    template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
                    return procesorMatch;
                });
            });
        }
        return template;
    }
    static processObject(obj, component) {
        if (obj === null || obj === undefined) {
            return obj;
        }
        return Processor.instance.processObject(obj, component);
    }
    processObject(obj, component = null) {
        // If obj is null or undefined, return it as is
        if (obj === null || obj === undefined) {
            return obj;
        }
        let __instance__ = (component === null) ? (this) : (component.processorHandler);
        if (typeof __instance__ === "undefined") {
            __instance__ = new Processor({ component });
        }
        if (typeof obj === "object") {
            Object.keys(obj).map((_k) => {
                if (typeof obj[_k] === "object" && !Object.hasOwn(obj[_k], "call")) {
                    obj[_k] = __instance__?.processObject.bind(__instance__)(obj[_k], component);
                }
                else if (typeof obj[_k] === "string") {
                    obj[_k] = __instance__?.process.bind(__instance__)(obj[_k], component);
                }
                return _k;
            });
        }
        else if (typeof obj === "string") {
            obj = __instance__.process.bind(__instance__)(obj, component);
        }
        return obj;
    }
}
exports.Processor = Processor;
exports.GlobalProcessor = Processor.instance;
(0, Package_1.Package)("com.qcobjects", [Processor]);
