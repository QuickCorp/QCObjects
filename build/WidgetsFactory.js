"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterWidgets = exports.RegisterWidget = exports._ComponentWidget_ = void 0;
const DOMCreateElement_1 = require("./DOMCreateElement");
const Export_1 = require("./Export");
const introspection_1 = require("./introspection");
const _ComponentWidget_ = class extends HTMLElement {
    constructor() {
        super();
        const componentWidget = this;
        const componentName = componentWidget.nodeName.toLowerCase();
        const componentBody = (0, DOMCreateElement_1._DOMCreateElement)("quick-component");
        const __enabled__atributes__ = componentWidget.getAttributeNames();
        componentBody.setAttribute("name", componentName);
        if (!componentWidget.hasAttribute("shadowed")) {
            componentBody.setAttribute("shadowed", "true");
        }
        __enabled__atributes__.map(function (attributeName) {
            if (componentWidget.hasAttribute(attributeName)) {
                componentBody.setAttribute(attributeName, componentWidget?.getAttribute(attributeName));
                componentWidget.removeAttribute(attributeName);
            }
        });
        const data_attributenames = componentWidget.getAttributeNames().filter(function (a) {
            return a.startsWith("data-");
        }).map(function (a) {
            return a.split("-")[1];
        });
        data_attributenames.map(function (_attribute_name_) {
            componentBody.setAttribute("data-" + _attribute_name_, componentWidget?.getAttribute("data-" + _attribute_name_));
            componentWidget.removeAttribute("data-" + _attribute_name_);
        });
        [...componentWidget.children].map(function (element) {
            componentBody.appendChild(element.cloneNode(true));
            element.remove();
        });
        componentWidget.append(componentBody);
    }
};
exports._ComponentWidget_ = _ComponentWidget_;
(0, Export_1.Export)(exports._ComponentWidget_);
const RegisterWidget = function (widgetName) {
    customElements.define(widgetName, class extends exports._ComponentWidget_ {
    });
};
exports.RegisterWidget = RegisterWidget;
const RegisterWidgets = function () {
    const widgetList = [...arguments];
    widgetList.filter(function (widgetName) {
        return typeof widgetName === "string";
    }).map(function (widgetName) {
        (0, exports.RegisterWidget)(widgetName);
    });
};
exports.RegisterWidgets = RegisterWidgets;
(introspection_1._protected_code_)(exports.RegisterWidget);
(introspection_1._protected_code_)(exports.RegisterWidgets);
(0, Export_1.Export)(exports.RegisterWidget);
(0, Export_1.Export)(exports.RegisterWidgets);
