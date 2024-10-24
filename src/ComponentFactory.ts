import { ComponentURIParams } from "types/global";
import { Class } from "./Class";
import { ClassFactory } from "./ClassFactory";
import { Component } from "./Component";
import { CONFIG } from "./CONFIG";
import { _DOMCreateElement } from "./DOMCreateElement";
import { __getType__ } from "./getType";
import { logger } from "./Logger";
import { New } from "./New";
import { Package } from "./Package";
import { isBrowser } from "./platform";
import { _top } from "./top";

/**
 * Returns a standarized uri for a component
 * @example
 * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
 * @author: Jean Machuca <correojean@gmail.com>
 * @param params an object with the params to build the uri path
 */
export const ComponentURI = ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }:ComponentURIParams) => {
    const templateURI = (TPL_SOURCE === "default") ? (`${COMPONENTS_BASE_PATH}${COMPONENT_NAME}.${TPLEXTENSION}`) : ("");
    return templateURI;
};

export const _buildComponentFromElement_ = function (element: { getAttribute: (arg0: string) => string | null; append: (arg0: any) => void; }, __parent__: any) {
    var __shadowed_not_set = (element.getAttribute("shadowed") === null) ? (true) : (false);
    var __tplsource_attr_not_set = (element.getAttribute("template-source") === null) ? (true) : (false);
    var shadowed = (element.getAttribute("shadowed") === "true") ? (true) : (false);
    var __cached_not_set = (element.getAttribute("cached") === null) ? (true) : (false);
    var cached = (element.getAttribute("cached") === "true") ? (true) : (false);
    var tplextension = (typeof CONFIG.get("tplextension") !== "undefined") ? (CONFIG.get("tplextension")) : ("html");
    tplextension = (element.getAttribute("tplextension") !== null) ? (element.getAttribute("tplextension")) : (tplextension);
    var _componentName = element.getAttribute("name");
    var _componentClassName = (element.getAttribute("componentClass") !== null) ? (element.getAttribute("componentClass")) : ("Component");
    let __componentClassName = (CONFIG.get("preserveComponentBodyTag")) ? (
        (_componentName !== null) ? ("com.qcobjects.components." + _componentName + ".ComponentBody") : ("com.qcobjects.components.ComponentBody")
    ) : (_componentClassName);
    _componentName = (_componentName !== null) ? (_componentName) : (
        (ClassFactory(__componentClassName as string) &&
            typeof ClassFactory(__componentClassName as string).name !== "undefined"
        ) ? (
            ClassFactory(__componentClassName as string).name
        ) : ("")
    );
    var __classDefinition = ClassFactory(__componentClassName as string);
    var __tplsource_prop_set = (__componentClassName !== "Component" && ((typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string") && __classDefinition.tplsource !== "")) ? (true) : (false);
    var tplsource = (__tplsource_attr_not_set && __tplsource_prop_set) ? (__classDefinition.tplsource) : ((__tplsource_attr_not_set) ? ("default") : (element.getAttribute("template-source")));
    logger.debug(`template source for  ${_componentName} is ${tplsource} `);
    logger.debug(`type for ${_componentName} is ${__getType__(__classDefinition)} `);

    var componentURI: string;
    componentURI = ComponentURI({
        "COMPONENTS_BASE_PATH": CONFIG.get("componentsBasePath"),
        "COMPONENT_NAME": _componentName as string,
        "TPLEXTENSION": tplextension,
        "TPL_SOURCE": tplsource
    });
    if (CONFIG.get("preserveComponentBodyTag")) {
        Package((_componentName !== "") ? ("com.qcobjects.components." + _componentName + "") : ("com.qcobjects.components"), [
            Class("ComponentBody", ClassFactory("Component"), {
                name: _componentName,
                tplsource: tplsource,
                tplextension: tplextension,
                reload: true
            })
        ]);
    }

    var __create_component_instance_ = function () {
        var __shadowed = (__shadowed_not_set) ? ((__classDefinition && __classDefinition.shadowed) || ClassFactory("Component").shadowed) : (shadowed);
        var __definition = {
            __parent__: __parent__,
            name: _componentName,
            cached: (__cached_not_set) ? (ClassFactory("Component").cached) : (cached),
            shadowed: __shadowed,
            tplextension: tplextension,
            body: (CONFIG.get("preserveComponentBodyTag")) ? (_DOMCreateElement("componentBody")) : (element),
            templateURI: componentURI,
            tplsource: tplsource
        };
        if (typeof _componentName === "undefined" || _componentName === "" || _componentName === null) {
            /* this allows to use the original property defined
            in the component definition if it is not present in the tag */
            delete (__definition as any).name;
        }
        if (componentURI === "") {
            /* this allows to use the original property defined
            in the component definition if it is not present in the tag */
            delete (__definition as any).templateURI;
        }
        var newComponent = New(__classDefinition, __definition);

        if (CONFIG.get("preserveComponentBodyTag")) {
            element.append(newComponent);
        }
        return newComponent;
    };
    var newComponent = __create_component_instance_();
    return newComponent;
};

export const _buildComponentsFromElements_ = function (elements: any[], __parent__: Component | null) {
    var componentsBuiltWith = [];
    if (isBrowser) {
        componentsBuiltWith = elements.map(
            function (element: any) {
                return _buildComponentFromElement_(element, __parent__);
            }
        );
    } else {
        logger.debug("[_buildComponentsFromElements_] not implemented for Non-Browser environments");
    }
    return componentsBuiltWith;
};
