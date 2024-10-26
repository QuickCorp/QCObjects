import { _DOMCreateElement } from "./DOMCreateElement";
import { Export } from "./Export";
import { _protected_code_ } from "./introspection";

export const _ComponentWidget_ = class extends HTMLElement {
    constructor() {
      super();
      const componentWidget = this;
      const componentName = componentWidget.nodeName.toLowerCase();
      const componentBody = _DOMCreateElement("quick-component");
      const __enabled__atributes__ = componentWidget.getAttributeNames();
      componentBody.setAttribute("name", componentName);

      if (!componentWidget.hasAttribute("shadowed")) {
        componentBody.setAttribute("shadowed", "true");
      }
      __enabled__atributes__.map(function (attributeName) {
        if (componentWidget.hasAttribute(attributeName)) {
          componentBody.setAttribute(attributeName, componentWidget?.getAttribute(attributeName) as any);
          componentWidget.removeAttribute(attributeName);
        }
      });
      const data_attributenames = componentWidget.getAttributeNames().filter(function (a) {
        return a.startsWith("data-");
      }).map(function (a) {
        return a.split("-")[1];
      });
      data_attributenames.map(function (_attribute_name_) {
        componentBody.setAttribute("data-" + _attribute_name_, componentWidget?.getAttribute("data-" + _attribute_name_) as any);
        componentWidget.removeAttribute("data-" + _attribute_name_);
      });
      [...(componentWidget as any).children].map(function (element) {
        componentBody.appendChild(element.cloneNode(true));
        element.remove();
      });

      componentWidget.append(componentBody);
    }
  };
  Export(_ComponentWidget_);
  export const RegisterWidget = function (widgetName:string) {
    customElements.define(widgetName, class extends _ComponentWidget_ { });
  };
  export const RegisterWidgets = function () {
    const widgetList = [...arguments];
    widgetList.filter(function (widgetName) {
      return typeof widgetName === "string";
    }).map(function (widgetName) {
      RegisterWidget(widgetName);
    });
  };
  (_protected_code_)(RegisterWidget);
  (_protected_code_)(RegisterWidgets);
  Export(RegisterWidget);
  Export(RegisterWidgets);
