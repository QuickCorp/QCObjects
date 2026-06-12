"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildComponents = exports._buildComponentsFromElements_ = exports._buildComponentFromElement_ = exports.ComponentURI = void 0;
const Class_1 = require("./Class");
const ClassFactory_1 = require("./ClassFactory");
const Component_1 = require("./Component");
const CONFIG_1 = require("./CONFIG");
const DOMCreateElement_1 = require("./DOMCreateElement");
const getType_1 = require("./getType");
const Logger_1 = require("./Logger");
const New_1 = require("./New");
const Package_1 = require("./Package");
const platform_1 = require("./platform");
const tag_filter_1 = require("./tag_filter");
/**
 * Returns a standarized uri for a component
 * @example
 * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
 * @author: Jean Machuca <correojean@gmail.com>
 * @param params an object with the params to build the uri path
 */
const ComponentURI = ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }) => {
    const templateURI = (TPL_SOURCE === "default") ? (`${COMPONENTS_BASE_PATH}${COMPONENT_NAME}.${TPLEXTENSION}`) : ("");
    return templateURI;
};
exports.ComponentURI = ComponentURI;
const _buildComponentFromElement_ = (element, __parent__) => {
    const __shadowed_not_set = (element.getAttribute("shadowed") === null);
    const __tplsource_attr_not_set = (element.getAttribute("template-source") === null);
    const shadowed = (element.getAttribute("shadowed") === "true");
    const __cached_not_set = (element.getAttribute("cached") === null);
    const cached = (element.getAttribute("cached") === "true");
    let tplextension = (typeof CONFIG_1.CONFIG.get("tplextension") !== "undefined") ? (CONFIG_1.CONFIG.get("tplextension")) : ("html");
    tplextension = (element.getAttribute("tplextension") !== null) ? (element.getAttribute("tplextension")) : (tplextension);
    let _componentName = element.getAttribute("name");
    const _componentClassName = (element.getAttribute("componentClass") !== null) ? (element.getAttribute("componentClass")) : ("Component");
    const __componentClassName = (CONFIG_1.CONFIG.get("preserveComponentBodyTag")) ? ((_componentName !== null) ? ("com.qcobjects.components." + _componentName + ".ComponentBody") : ("com.qcobjects.components.ComponentBody")) : (_componentClassName);
    _componentName = (_componentName !== null) ? (_componentName) : (((0, ClassFactory_1.ClassFactory)(__componentClassName) &&
        typeof (0, ClassFactory_1.ClassFactory)(__componentClassName).name !== "undefined") ? ((0, ClassFactory_1.ClassFactory)(__componentClassName).name) : (""));
    const __classDefinition = (0, ClassFactory_1.ClassFactory)(__componentClassName);
    const __tplsource_prop_set = !!((__componentClassName !== "Component" && ((typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string") && __classDefinition.tplsource !== "")));
    const tplsource = (__tplsource_attr_not_set && __tplsource_prop_set) ? (__classDefinition.tplsource) : ((__tplsource_attr_not_set) ? ("default") : (element.getAttribute("template-source")));
    Logger_1.logger.debug(`template source for  ${_componentName} is ${tplsource} `);
    Logger_1.logger.debug(`type for ${_componentName} is ${(0, getType_1.__getType__)(__classDefinition)} `);
    const componentURI = (0, exports.ComponentURI)({
        "COMPONENTS_BASE_PATH": CONFIG_1.CONFIG.get("componentsBasePath"),
        "COMPONENT_NAME": _componentName,
        "TPLEXTENSION": tplextension,
        "TPL_SOURCE": tplsource
    });
    if (CONFIG_1.CONFIG.get("preserveComponentBodyTag")) {
        (0, Package_1.Package)((_componentName !== "") ? ("com.qcobjects.components." + _componentName + "") : ("com.qcobjects.components"), [
            (0, Class_1.Class)("ComponentBody", Component_1.Component, {
                name: _componentName,
                tplsource,
                tplextension,
                reload: true
            })
        ]);
    }
    const __create_component_instance_ = function () {
        const __shadowed = (__shadowed_not_set) ? ((__classDefinition && __classDefinition.shadowed) || Component_1.Component.shadowed) : (shadowed);
        const __definition = {
            __parent__,
            name: _componentName,
            cached: (__cached_not_set) ? (Component_1.Component.cached) : (cached),
            shadowed: __shadowed,
            tplextension,
            body: (CONFIG_1.CONFIG.get("preserveComponentBodyTag")) ? ((0, DOMCreateElement_1._DOMCreateElement)("componentBody")) : (element),
            templateURI: componentURI,
            tplsource
        };
        if (typeof _componentName === "undefined" || _componentName === "" || _componentName === null) {
            /* this allows to use the original property defined
            in the component definition if it is not present in the tag */
            delete __definition.name;
        }
        if (componentURI === "") {
            /* this allows to use the original property defined
            in the component definition if it is not present in the tag */
            delete __definition.templateURI;
        }
        const newComponent = (0, New_1.New)(__classDefinition, __definition);
        if (CONFIG_1.CONFIG.get("preserveComponentBodyTag")) {
            if (typeof newComponent !== "undefined") {
                element.append(newComponent.body);
            }
        }
        return newComponent;
    };
    const newComponent = __create_component_instance_();
    return newComponent;
};
exports._buildComponentFromElement_ = _buildComponentFromElement_;
const _buildComponentsFromElements_ = (elements, __parent__) => {
    let componentsBuiltWith = [];
    if (platform_1.isBrowser) {
        componentsBuiltWith = elements.map(function (element) {
            return (0, exports._buildComponentFromElement_)(element, __parent__);
        });
    }
    else {
        Logger_1.logger.debug("[_buildComponentsFromElements_] not implemented for Non-Browser environments");
    }
    return componentsBuiltWith;
};
exports._buildComponentsFromElements_ = _buildComponentsFromElements_;
const buildComponents = (element) => {
    const tagFilter = tag_filter_1._tag_filter_;
    const elements = element.subelements(tagFilter);
    return (0, exports._buildComponentsFromElements_)(elements, null);
};
exports.buildComponents = buildComponents;
