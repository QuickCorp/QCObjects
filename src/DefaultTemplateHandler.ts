import { DefaultTemplateHandlerParams } from "types/global";
import { logger } from "./Logger";
import { GlobalProcessor as Processor } from "./Processor";
import { RegisterClass } from "./RegisterClass";

export class DefaultTemplateHandler {
    template = "";
    __definition = {};
    static __definition = {};
    component;

    constructor({ component, template }:DefaultTemplateHandlerParams) {
      this.component = component;
      this.template = template;
    }

    assign(data:any) {
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
        [...Object.keys(data)].map( (k):any => {
          let _value = data[k];
          if (typeof _value === "string" || typeof _value === "number" || (!isNaN(_value))) {
            try {
              _value = Processor.processObject.bind(processorHandler).call(processorHandler, _value, templateInstance.component);
              parsedAssignmentText = parsedAssignmentText.replace((new RegExp(`{{${k}}}`, "g")), _value);
            } catch (e:any) {
              logger.warn(`${templateInstance.component.name} could not parse processors.`);
              throw Error(`${templateInstance.component.name} could not parse processors. Reason: ${e.message}`);
            }
          }
          return k;
        });
      } else {
        logger.debug(`${templateInstance.component.name}.data is not an object`);
      }
      try {
        parsedAssignmentText = Processor.processObject.call(processorHandler, parsedAssignmentText, templateInstance.component);
      } catch (e:any) {
        logger.warn(`${templateInstance.component.name} could not parse processors.`);
        throw Error(`${templateInstance.component.name} could not parse processors. Reason: ${e.message}`);
      }
      return parsedAssignmentText;
    }

  }
  RegisterClass(DefaultTemplateHandler, "com.qcobjects");
