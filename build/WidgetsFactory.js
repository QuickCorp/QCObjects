"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterWidgets = exports.RegisterWidget = exports._ComponentWidget_ = void 0;
/* eslint-disable no-unused-vars */
const DOMCreateElement_1 = require("./DOMCreateElement");
const Export_1 = require("./Export");
const introspection_1 = require("./introspection");
const platform_1 = require("./platform");
class QCObjectsWidgetNode {
    writingSuggestions;
    currentCSSZoom;
    ariaColIndexText;
    ariaRowIndexText;
    accessKey;
    accessKeyLabel;
    autocapitalize;
    dir;
    draggable;
    hidden;
    inert;
    innerText;
    lang;
    offsetHeight;
    offsetLeft;
    offsetParent;
    offsetTop;
    offsetWidth;
    outerText;
    popover;
    spellcheck;
    title;
    translate;
    attachInternals() {
        throw new Error("Method not implemented.");
    }
    click() {
        throw new Error("Method not implemented.");
    }
    hidePopover() {
        throw new Error("Method not implemented.");
    }
    showPopover() {
        throw new Error("Method not implemented.");
    }
    togglePopover(force) {
        throw new Error("Method not implemented.");
    }
    addEventListener(type, listener, options) {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type, listener, options) {
        throw new Error("Method not implemented.");
    }
    attributes;
    classList;
    className;
    clientHeight;
    clientLeft;
    clientTop;
    clientWidth;
    id;
    innerHTML;
    localName;
    namespaceURI;
    onfullscreenchange;
    onfullscreenerror;
    outerHTML;
    ownerDocument;
    part;
    prefix;
    scrollHeight;
    scrollLeft;
    scrollTop;
    scrollWidth;
    shadowRoot;
    slot;
    tagName;
    attachShadow(init) {
        throw new Error("Method not implemented.");
    }
    checkVisibility(options) {
        throw new Error("Method not implemented.");
    }
    closest(selectors) {
        throw new Error("Method not implemented.");
    }
    computedStyleMap() {
        throw new Error("Method not implemented.");
    }
    getAttribute(qualifiedName) {
        throw new Error("Method not implemented.");
    }
    getAttributeNS(namespace, localName) {
        throw new Error("Method not implemented.");
    }
    getAttributeNames() {
        throw new Error("Method not implemented.");
    }
    getAttributeNode(qualifiedName) {
        throw new Error("Method not implemented.");
    }
    getAttributeNodeNS(namespace, localName) {
        throw new Error("Method not implemented.");
    }
    getBoundingClientRect() {
        throw new Error("Method not implemented.");
    }
    getClientRects() {
        throw new Error("Method not implemented.");
    }
    getElementsByClassName(classNames) {
        throw new Error("Method not implemented.");
    }
    getElementsByTagName(qualifiedName) {
        throw new Error("Method not implemented.");
    }
    getElementsByTagNameNS(namespace, localName) {
        throw new Error("Method not implemented.");
    }
    getHTML(options) {
        throw new Error("Method not implemented.");
    }
    hasAttribute(qualifiedName) {
        throw new Error("Method not implemented.");
    }
    hasAttributeNS(namespace, localName) {
        throw new Error("Method not implemented.");
    }
    hasAttributes() {
        throw new Error("Method not implemented.");
    }
    hasPointerCapture(pointerId) {
        throw new Error("Method not implemented.");
    }
    insertAdjacentElement(where, element) {
        throw new Error("Method not implemented.");
    }
    insertAdjacentHTML(position, string) {
        throw new Error("Method not implemented.");
    }
    insertAdjacentText(where, data) {
        throw new Error("Method not implemented.");
    }
    matches(selectors) {
        throw new Error("Method not implemented.");
    }
    releasePointerCapture(pointerId) {
        throw new Error("Method not implemented.");
    }
    removeAttribute(qualifiedName) {
        throw new Error("Method not implemented.");
    }
    removeAttributeNS(namespace, localName) {
        throw new Error("Method not implemented.");
    }
    removeAttributeNode(attr) {
        throw new Error("Method not implemented.");
    }
    requestFullscreen(options) {
        throw new Error("Method not implemented.");
    }
    requestPointerLock(options) {
        throw new Error("Method not implemented.");
    }
    scroll(x, y) {
        throw new Error("Method not implemented.");
    }
    scrollBy(x, y) {
        throw new Error("Method not implemented.");
    }
    scrollIntoView(arg) {
        throw new Error("Method not implemented.");
    }
    scrollTo(x, y) {
        throw new Error("Method not implemented.");
    }
    setAttribute(qualifiedName, value) {
        throw new Error("Method not implemented.");
    }
    setAttributeNS(namespace, qualifiedName, value) {
        throw new Error("Method not implemented.");
    }
    setAttributeNode(attr) {
        throw new Error("Method not implemented.");
    }
    setAttributeNodeNS(attr) {
        throw new Error("Method not implemented.");
    }
    setHTMLUnsafe(html) {
        throw new Error("Method not implemented.");
    }
    setPointerCapture(pointerId) {
        throw new Error("Method not implemented.");
    }
    toggleAttribute(qualifiedName, force) {
        throw new Error("Method not implemented.");
    }
    webkitMatchesSelector(selectors) {
        throw new Error("Method not implemented.");
    }
    baseURI;
    childNodes;
    firstChild;
    isConnected;
    lastChild;
    nextSibling;
    nodeName;
    nodeType;
    nodeValue;
    parentElement;
    parentNode;
    previousSibling;
    textContent;
    appendChild(node) {
        throw new Error("Method not implemented.");
    }
    cloneNode(deep) {
        throw new Error("Method not implemented.");
    }
    compareDocumentPosition(other) {
        throw new Error("Method not implemented.");
    }
    contains(other) {
        throw new Error("Method not implemented.");
    }
    getRootNode(options) {
        throw new Error("Method not implemented.");
    }
    hasChildNodes() {
        throw new Error("Method not implemented.");
    }
    insertBefore(node, child) {
        throw new Error("Method not implemented.");
    }
    isDefaultNamespace(namespace) {
        throw new Error("Method not implemented.");
    }
    isEqualNode(otherNode) {
        throw new Error("Method not implemented.");
    }
    isSameNode(otherNode) {
        throw new Error("Method not implemented.");
    }
    lookupNamespaceURI(prefix) {
        throw new Error("Method not implemented.");
    }
    lookupPrefix(namespace) {
        throw new Error("Method not implemented.");
    }
    normalize() {
        throw new Error("Method not implemented.");
    }
    removeChild(child) {
        throw new Error("Method not implemented.");
    }
    replaceChild(node, child) {
        throw new Error("Method not implemented.");
    }
    ELEMENT_NODE;
    ATTRIBUTE_NODE;
    TEXT_NODE;
    CDATA_SECTION_NODE;
    ENTITY_REFERENCE_NODE;
    ENTITY_NODE;
    PROCESSING_INSTRUCTION_NODE;
    COMMENT_NODE;
    DOCUMENT_NODE;
    DOCUMENT_TYPE_NODE;
    DOCUMENT_FRAGMENT_NODE;
    NOTATION_NODE;
    DOCUMENT_POSITION_DISCONNECTED;
    DOCUMENT_POSITION_PRECEDING;
    DOCUMENT_POSITION_FOLLOWING;
    DOCUMENT_POSITION_CONTAINS;
    DOCUMENT_POSITION_CONTAINED_BY;
    DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    dispatchEvent(event) {
        throw new Error("Method not implemented.");
    }
    ariaAtomic;
    ariaAutoComplete;
    ariaBrailleLabel;
    ariaBrailleRoleDescription;
    ariaBusy;
    ariaChecked;
    ariaColCount;
    ariaColIndex;
    ariaColSpan;
    ariaCurrent;
    ariaDescription;
    ariaDisabled;
    ariaExpanded;
    ariaHasPopup;
    ariaHidden;
    ariaInvalid;
    ariaKeyShortcuts;
    ariaLabel;
    ariaLevel;
    ariaLive;
    ariaModal;
    ariaMultiLine;
    ariaMultiSelectable;
    ariaOrientation;
    ariaPlaceholder;
    ariaPosInSet;
    ariaPressed;
    ariaReadOnly;
    ariaRequired;
    ariaRoleDescription;
    ariaRowCount;
    ariaRowIndex;
    ariaRowSpan;
    ariaSelected;
    ariaSetSize;
    ariaSort;
    ariaValueMax;
    ariaValueMin;
    ariaValueNow;
    ariaValueText;
    role;
    animate(keyframes, options) {
        throw new Error("Method not implemented.");
    }
    getAnimations(options) {
        throw new Error("Method not implemented.");
    }
    after(...nodes) {
        throw new Error("Method not implemented.");
    }
    before(...nodes) {
        throw new Error("Method not implemented.");
    }
    remove() {
        throw new Error("Method not implemented.");
    }
    replaceWith(...nodes) {
        throw new Error("Method not implemented.");
    }
    nextElementSibling;
    previousElementSibling;
    childElementCount;
    children;
    firstElementChild;
    lastElementChild;
    append(...nodes) {
        throw new Error("Method not implemented.");
    }
    prepend(...nodes) {
        throw new Error("Method not implemented.");
    }
    querySelector(selectors) {
        throw new Error("Method not implemented.");
    }
    querySelectorAll(selectors) {
        throw new Error("Method not implemented.");
    }
    replaceChildren(...nodes) {
        throw new Error("Method not implemented.");
    }
    assignedSlot;
    attributeStyleMap;
    style;
    contentEditable;
    enterKeyHint;
    inputMode;
    isContentEditable;
    onabort;
    onanimationcancel;
    onanimationend;
    onanimationiteration;
    onanimationstart;
    onauxclick;
    onbeforeinput;
    onbeforetoggle;
    onblur;
    oncancel;
    oncanplay;
    oncanplaythrough;
    onchange;
    onclick;
    onclose;
    oncontextlost;
    oncontextmenu;
    oncontextrestored;
    oncopy;
    oncuechange;
    oncut;
    ondblclick;
    ondrag;
    ondragend;
    ondragenter;
    ondragleave;
    ondragover;
    ondragstart;
    ondrop;
    ondurationchange;
    onemptied;
    onended;
    onerror;
    onfocus;
    onformdata;
    ongotpointercapture;
    oninput;
    oninvalid;
    onkeydown;
    onkeypress;
    onkeyup;
    onload;
    onloadeddata;
    onloadedmetadata;
    onloadstart;
    onlostpointercapture;
    onmousedown;
    onmouseenter;
    onmouseleave;
    onmousemove;
    onmouseout;
    onmouseover;
    onmouseup;
    onpaste;
    onpause;
    onplay;
    onplaying;
    onpointercancel;
    onpointerdown;
    onpointerenter;
    onpointerleave;
    onpointermove;
    onpointerout;
    onpointerover;
    onpointerup;
    onprogress;
    onratechange;
    onreset;
    onresize;
    onscroll;
    onscrollend;
    onsecuritypolicyviolation;
    onseeked;
    onseeking;
    onselect;
    onselectionchange;
    onselectstart;
    onslotchange;
    onstalled;
    onsubmit;
    onsuspend;
    ontimeupdate;
    ontoggle;
    ontouchcancel;
    ontouchend;
    ontouchmove;
    ontouchstart;
    ontransitioncancel;
    ontransitionend;
    ontransitionrun;
    ontransitionstart;
    onvolumechange;
    onwaiting;
    onwebkitanimationend;
    onwebkitanimationiteration;
    onwebkitanimationstart;
    onwebkittransitionend;
    onwheel;
    autofocus;
    dataset;
    nonce;
    tabIndex;
    blur() {
        throw new Error("Method not implemented.");
    }
    focus(options) {
        throw new Error("Method not implemented.");
    }
}
if (platform_1.isBrowser) {
    exports._ComponentWidget_ = class _ComponentWidget_ extends HTMLElement {
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
            __enabled__atributes__.forEach((attributeName) => {
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
            data_attributenames.forEach(function (_attribute_name_) {
                componentBody.setAttribute("data-" + _attribute_name_, componentWidget?.getAttribute("data-" + _attribute_name_));
                componentWidget.removeAttribute("data-" + _attribute_name_);
            });
            [...componentWidget.children].forEach((element) => {
                componentBody.appendChild(element.cloneNode(true));
                element.remove();
            });
            componentWidget.append(componentBody);
        }
    };
}
else {
    exports._ComponentWidget_ = class _ComponentWidget_ extends QCObjectsWidgetNode {
        constructor() {
            super();
            throw new Error("Class not implemented.");
        }
    };
}
(0, Export_1.Export)(exports._ComponentWidget_);
const RegisterWidget = (widgetName) => {
    if (platform_1.isBrowser) {
        customElements.define(widgetName, class extends exports._ComponentWidget_ {
        });
    }
    else {
        throw new Error("RegisterWidget is not implemented for non browser ecosystems yet.");
    }
};
exports.RegisterWidget = RegisterWidget;
const RegisterWidgets = (...args) => {
    const widgetList = [...args];
    widgetList.filter(function (widgetName) {
        return typeof widgetName === "string";
    }).map(function (widgetName) {
        return (0, exports.RegisterWidget)(widgetName);
    });
};
exports.RegisterWidgets = RegisterWidgets;
(introspection_1._protected_code_)(exports.RegisterWidget);
(introspection_1._protected_code_)(exports.RegisterWidgets);
(0, Export_1.Export)(exports.RegisterWidget);
(0, Export_1.Export)(exports.RegisterWidgets);
