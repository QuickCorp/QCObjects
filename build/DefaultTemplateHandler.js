"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTemplateHandler = void 0;
const Logger_1 = require("./Logger");
const Processor_1 = require("./Processor");
const RegisterClass_1 = require("./RegisterClass");
class DefaultTemplateHandler {
    template = "";
    __definition = {};
    static __definition = {};
    component;
    constructor({ component, template }) {
        this.component = component;
        this.template = template;
    }
    assign(data) {
        const templateInstance = this;
        if (typeof templateInstance.component === "undefined") {
            throw new Error("DefaultTemplateHandler.assign: component is undefined");
        }
        if (typeof templateInstance.component.processorHandler === "undefined") {
            throw new Error("DefaultTemplateHandler.assign: component.processorHandler is undefined");
        }
        const processorHandler = templateInstance.component.processorHandler;
        processorHandler.component = templateInstance.component;
        let parsedAssignmentText = (typeof templateInstance.template !== "undefined") ? (templateInstance.template) : ("");
        if (typeof data === "object") {
            [...Object.keys(data)].map((k) => {
                let _value = data[k];
                if (typeof _value === "string" || typeof _value === "number" || (!isNaN(_value))) {
                    try {
                        _value = Processor_1.GlobalProcessor.processObject.bind(processorHandler).call(processorHandler, _value, templateInstance.component);
                        parsedAssignmentText = parsedAssignmentText.replace((new RegExp(`{{${k}}}`, "g")), _value);
                    }
                    catch (e) {
                        Logger_1.logger.warn(`${templateInstance.component?.name} could not parse processors.`);
                        throw Error(`${templateInstance.component?.name} could not parse processors. Reason: ${e.message}`);
                    }
                }
                return k;
            });
        }
        else {
            Logger_1.logger.debug(`${templateInstance.component?.name}.data is not an object`);
        }
        try {
            parsedAssignmentText = Processor_1.GlobalProcessor.processObject.call(processorHandler, parsedAssignmentText, templateInstance.component);
        }
        catch (e) {
            Logger_1.logger.warn(`${templateInstance.component?.name} could not parse processors.`);
            throw Error(`${templateInstance.component?.name} could not parse processors. Reason: ${e.message}`);
        }
        return parsedAssignmentText;
    }
}
exports.DefaultTemplateHandler = DefaultTemplateHandler;
(0, RegisterClass_1.RegisterClass)(DefaultTemplateHandler, "com.qcobjects");
