import { IQCObjectsElement } from "types";
import { isBrowser } from "./platform";

export const _DOMCreateElement = function (elementName:string, props?:any[], children?:any):IQCObjectsElement {
    let _ret_;
    if (isBrowser) {
      _ret_ = _DOMCreateComplexElement(elementName, props, children) as unknown as IQCObjectsElement;
    } else {
      _ret_ = {} as IQCObjectsElement;
    }
    return _ret_;
  };


const ComplexTypeCall = (_type:Function, {props, children}:{props?:any[], children?:any}):IQCObjectsElement => {
    return _type({props, children}) as IQCObjectsElement;
};
export const _DOMCreateComplexElement = (_type:string|Function, props?:any[], children?:any) => {

    if (typeof _type !== "string") {
        return ComplexTypeCall(_type, {props,children});
    }
    const element = document.createElement(_type);

    if (props) {
        Object.entries(props).forEach(([key, value]) => {
            if (typeof value === "string" || typeof value === "number") {
                element.setAttribute(key, value.toString());
            } else if (typeof value === "function" && key.toLowerCase().startsWith("on")) {
                element.addEventListener(key.slice(2).toLowerCase(), value.bind(element));
            }
        });
    }

    if (Array.isArray(children)) {
        children.filter((child => child instanceof Node)).forEach(child => {
            element.appendChild(child);
        });
    } else if (children instanceof Node) {
        element.appendChild(children);
    } else if (typeof children === "string") {
        element.innerHTML = children;
    }

    return element;
};
