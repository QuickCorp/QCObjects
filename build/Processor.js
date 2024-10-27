"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Processor = void 0;
const CONFIG_1 = require("./CONFIG");
const InheritClass_1 = require("./InheritClass");
const make_global_1 = require("./make_global");
const New_1 = require("./New");
const RegisterClass_1 = require("./RegisterClass");
const top_1 = require("./top");
class Processor extends InheritClass_1.InheritClass {
    __definition = {};
    __classType = "Processor";
    static processors = {
        "config"(component, arg) {
            return CONFIG_1.CONFIG.get(arg, "");
        },
        "ENV"(component, arg) {
            return (typeof process !== "undefined") ? (process.env[arg]) : ("");
        },
        "global"(component, arg) {
            return (typeof top_1._top !== "undefined") ? (top_1._top[arg]) : ("");
        }
    };
    static setProcessor(_proc_) {
        if (typeof _proc_ === "function" && _proc_.name !== "") {
            this.processors[_proc_.name] = _proc_;
        }
    }
    constructor({ component }) {
        super({ component });
        this.processors = Processor.processors;
        this.process = Processor.process.bind(this);
        this.processObject = Processor.processObject.bind(this);
        this.setProcessor = Processor.setProcessor.bind(this);
        this.execute = Processor.execute.bind(this);
    }
    __instanceID;
    __new__() {
        throw new Error("Method not implemented.");
    }
    __namespace;
    body;
    component;
    processors;
    process(template, component) {
        throw new Error("Method not implemented.");
    }
    processObject(obj, component) {
        throw new Error("Method not implemented.");
    }
    setProcessor(proc) {
        throw new Error("Method not implemented.");
    }
    static execute(component, processorName, args) {
        const processorHandler = (typeof component !== "undefined" && component !== null) ? (component.processorHandler) : (this);
        return processorHandler?.processors[processorName].bind(processorHandler).apply(processorHandler, [component, args?.split(",")]);
    }
    static process(template, component = null) {
        const processorHandler = (component !== null) ? (component.processorHandler) : ((0, New_1.New)(Processor, { component: null }));
        if (typeof template === "string") {
            Object.keys(processorHandler.processors).map(function (funcName) {
                [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(function (procesorMatch) {
                    const match0 = `$${funcName}(${procesorMatch[1]})`;
                    template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
                });
            });
        }
        return template;
    }
    static processObject(obj, component = null) {
        let __instance__ = (component === null) ? (this) : (component.processorHandler);
        if (typeof __instance__ === "undefined") {
            __instance__ = new Processor({ component });
        }
        if (typeof obj === "object") {
            Object.keys(obj).map(function (_k) {
                if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
                    obj[_k] = __instance__?.processObject.bind(__instance__)(obj[_k], component);
                }
                else if (typeof obj[_k] === "string") {
                    obj[_k] = __instance__?.process.bind(__instance__)(obj[_k], component);
                }
            });
        }
        else if (typeof obj === "string") {
            obj = __instance__.process.bind(__instance__)(obj, component);
        }
        return obj;
    }
}
exports.Processor = Processor;
Processor.__definition = {};
Processor.__classType = "Processor";
(0, RegisterClass_1.RegisterClass)(Processor, "com.qcobjects");
(0, make_global_1.__make_global__)(Processor);
