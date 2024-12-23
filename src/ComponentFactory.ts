import { IQCObjectsElement, TComponentURIParams } from "./types/global";
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
import { _tag_filter_ } from "./tag_filter";

/**
 * Returns a standarized uri for a component
 * @example
 * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
 * @author: Jean Machuca <correojean@gmail.com>
 * @param params an object with the params to build the uri path
 */
export const ComponentURI = ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }:TComponentURIParams):string => {
    const templateURI = (TPL_SOURCE === "default") ? (`${COMPONENTS_BASE_PATH}${COMPONENT_NAME}.${TPLEXTENSION}`) : ("");
    return templateURI;
};

export const _buildComponentFromElement_ = (element: Element, __parent__: any):Component => {
    const __shadowed_not_set = (element.getAttribute("shadowed") === null);
    const __tplsource_attr_not_set = (element.getAttribute("template-source") === null);
    const shadowed = (element.getAttribute("shadowed") === "true");
    const __cached_not_set = (element.getAttribute("cached") === null);
    const cached = (element.getAttribute("cached") === "true");
    let tplextension = (typeof CONFIG.get("tplextension") !== "undefined") ? (CONFIG.get("tplextension")) : ("html");
    tplextension = (element.getAttribute("tplextension") !== null) ? (element.getAttribute("tplextension")) : (tplextension);
    let _componentName = element.getAttribute("name");
    const _componentClassName = (element.getAttribute("componentClass") !== null) ? (element.getAttribute("componentClass")) : ("Component");
    const __componentClassName = (CONFIG.get("preserveComponentBodyTag")) ? (
        (_componentName !== null) ? ("com.qcobjects.components." + _componentName + ".ComponentBody") : ("com.qcobjects.components.ComponentBody")
    ) : (_componentClassName);
    _componentName = (_componentName !== null) ? (_componentName) : (
        (ClassFactory(__componentClassName as string) &&
            typeof (ClassFactory(__componentClassName as string) as unknown as typeof Component).name !== "undefined"
        ) ? (
            (ClassFactory(__componentClassName as string) as unknown as Component).name
        ) : ("")
    );
    const __classDefinition = ClassFactory(__componentClassName as string) as Component;
    const __tplsource_prop_set = !!((__componentClassName !== "Component" && ((typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string") && __classDefinition.tplsource !== "")));
    const tplsource = (__tplsource_attr_not_set && __tplsource_prop_set) ? (__classDefinition.tplsource) : ((__tplsource_attr_not_set) ? ("default") : (element.getAttribute("template-source")));
    logger.debug(`template source for  ${_componentName} is ${tplsource} `);
    logger.debug(`type for ${_componentName} is ${__getType__(__classDefinition)} `);

    const componentURI: string = ComponentURI({
        "COMPONENTS_BASE_PATH": CONFIG.get("componentsBasePath"),
        "COMPONENT_NAME": _componentName ,
        "TPLEXTENSION": tplextension,
        "TPL_SOURCE": tplsource as string
    });
    if (CONFIG.get("preserveComponentBodyTag")) {
        Package((_componentName !== "") ? ("com.qcobjects.components." + _componentName + "") : ("com.qcobjects.components"), [
            Class("ComponentBody", Component, {
                name: _componentName,
                tplsource,
                tplextension,
                reload: true
            })
        ]);
    }

    const __create_component_instance_ = function ():Component {
        const __shadowed = (__shadowed_not_set) ? ((__classDefinition && __classDefinition.shadowed) || Component.shadowed) : (shadowed);
        const __definition = {
            __parent__,
            name: _componentName,
            cached: (__cached_not_set) ? (Component.cached) : (cached),
            shadowed: __shadowed,
            tplextension,
            body: (CONFIG.get("preserveComponentBodyTag")) ? (_DOMCreateElement("componentBody")) : (element),
            templateURI: componentURI,
            tplsource
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
        const newComponent = New(__classDefinition, __definition) as Component;

        if (CONFIG.get("preserveComponentBodyTag")) {
            if (typeof newComponent !== "undefined") {
                element.append(newComponent.body as string | Node);
            }
        }
        return newComponent;
    };
    const newComponent = __create_component_instance_();
    return newComponent;
};

export const _buildComponentsFromElements_ = (elements: HTMLElement[], __parent__: Component | null):Component[] => {
    let componentsBuiltWith:Component[] = [];
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

export const buildComponents = (element:HTMLElement):Component[] => {
    const tagFilter = _tag_filter_;
    const elements = (element as unknown as IQCObjectsElement).subelements(tagFilter) as HTMLElement[];
    return _buildComponentsFromElements_(elements, null);
};