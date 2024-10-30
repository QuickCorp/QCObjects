import { logger } from "./Logger";
import { GlobalProcessor as Processor } from "./Processor";
import { _top } from "./top";
import { range } from "./range";
import { IComponent } from "types";

// Set Processors
export const setDefaultProcessors = () => {
    (function (_top) {

        const mapper = (componentInstance:IComponent, componentName:string, valueName:string):string => {
            /*
             * Mapper processor
             * @usage
             *        $mapper(<componentName>,<valueName>)
             *
             * Where componentName is the name of the component (same value as in attribute tag name) without quotes
             * and valueName is the name of the variable that contains the value to map, it can be either a property of
             * the component instance, the data object or a global value
             */
    
            if (typeof componentInstance === "undefined" || componentInstance === null) {
                throw Error(`mapper.${componentName}.${valueName} does not have a component instance or it is null.`);
            }
            const globalValue = _top.global.get(valueName);
            const componentValue = componentInstance.get(valueName);
            const dataValue = componentInstance.data[valueName];
            const list = (typeof dataValue !== "undefined") ? (dataValue) : ((typeof componentValue !== "undefined") ? (componentValue) : (globalValue));
            let listItems = "";
            if (typeof list !== "undefined" && typeof list.map !== "undefined") {
                listItems = list.map(function (element:HTMLElement) {
                    const dataItems = [...Object.keys(element)].map(k => ` data-${k}="${(typeof (element as any)[k] !== "undefined" && (element as any)[k] !== null) ? ((element as any)[k].toString()) : ("")}"`).join("");
                    return `<quick-component name="${componentName}" ${dataItems} ></quick-component>`;
                }).join("");
            } else {
                logger.debug(`${componentName}.${valueName} does not have a map property`);
            }
            return listItems;
        };
        Processor.setProcessor(mapper);
    
        const layout = function (componentInstance:IComponent, layoutname:string, cssfile:string):string {
            /*
             * Layout processor
             * @usage
             *        $layout(<layoutname>, <cssfile>)
             * Where layoutname can be "portrait" or "landscape" without quotes
             * cssfile is the uri for the css file to import
             */
    
            const layout_portrait = `
              /* CSS Document for Mobile Imports */
              @import url("${cssfile}") (orientation:portrait);
              @import url("${cssfile}") (max-width:460px);
              @import url("${cssfile}") (aspect-ratio: 9/16);
              @import url("${cssfile}") (aspect-ratio: 10/16);
              @import url("${cssfile}") (aspect-ratio: 5/8);
              @import url("${cssfile}") (aspect-ratio: 3/4);
              @import url("${cssfile}") (aspect-ratio: 2/3);
              `;
            const layout_landscape = `
              @import url("${cssfile}") (orientation:landscape) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 16/9) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 16/10) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 8/5) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 4/3) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 3/2) and (min-width:460px);
              `;
            const layout_code = {
                "landscape": layout_landscape,
                "portrait": layout_portrait
            };
    
            return (Object.hasOwnProperty.call(layout_code, layoutname)) ? ((layout_code as any)[layoutname] as string) : ("");
        };
    
        Processor.setProcessor(layout);
    
        const component = (componentInstance:IComponent ,name:string, componentClass:string, ...args:string[]):string => {
            /*
             * component processor
             * @usage
             *        $component(name=<name>, componentClass=<componentClass>, ...)
             * Returns a component tag declaration like:
             * <component name=<name> ...></component>
             */
            const arg = [...args].map(function (a) {
                return {
                    [a.split("=")[0]]: a.split("=")[1]
                };
            }).reduce(function (k1, k2) {
                return Object.assign(k1, k2);
            });
            const attrs = [...Object.keys(arg)].map(function (a) {
                return `${a}=${arg[a as any]}`;
            }).join(" ");
            return `<component name="${name}" componentClass="${componentClass}" ${attrs}></component>`;
        };
    
        Processor.setProcessor(component);
    
        const quick_component = (componentInstance: IComponent,name:string, componentClass:string, ...args:string[]):string => {
            /*
             * component processor
             * @usage
             *        $quick_component(name=<name>, componentClass=<componentClass>, ...)
             * Returns a component tag declaration like:
             * <quick-component name=<name> ...></quick-component>
             */
            const arg = [...args].map(function (a) {
                return {
                    [a.split("=")[0]]: a.split("=")[1]
                };
            }).reduce(function (k1, k2) {
                return Object.assign(k1, k2);
            });
            const attrs = [...Object.keys(arg)].map(function (a) {
                return `${a}=${arg[a as any]}`;
            }).join(" ");
            return `<quick-component name="${name}" componentClass="${componentClass}" ${attrs}></quick-component>`;
        };
    
        Processor.setProcessor(quick_component);
    
    
        const repeat = (componentInstance:IComponent, length:number, text:string):string => {
            /*
             * Repeat processor
             * @usage
             *        $repeat(<length>, <text>)
             * Where length is the number of occurrences of text
             */
            return range(length).map(
                function (index) {
                    return text.replace("{{index}}", index.toString());
                }
            ).join("");
        };
    
        Processor.setProcessor(repeat);
    
    })(_top);
    
};

