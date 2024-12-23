 
/* eslint-disable no-unused-vars */
import { _DOMCreateElement } from "./DOMCreateElement";
import { Export } from "./Export";
import { _protected_code_ } from "./introspection";
import { isBrowser } from "./platform";
import { I_ComponentWidget_ } from "./types/global";

class QCObjectsWidgetNode implements I_ComponentWidget_ {
  writingSuggestions!: string;
  currentCSSZoom!: number;
  ariaColIndexText!: string | null;
  ariaRowIndexText!: string | null;
  accessKey!: string;
  accessKeyLabel!: string;
  autocapitalize!: string;
  dir!: string;
  draggable!: boolean;
  hidden!: boolean;
  inert!: boolean;
  innerText!: string;
  lang!: string;
  offsetHeight!: number;
  offsetLeft!: number;
  offsetParent!: Element | null;
  offsetTop!: number;
  offsetWidth!: number;
  outerText!: string;
  popover!: string | null;
  spellcheck!: boolean;
  title!: string;
  translate!: boolean;
  attachInternals(): ElementInternals {
    throw new Error("Method not implemented.");
  }
  click(): void {
    throw new Error("Method not implemented.");
  }
  hidePopover(): void {
    throw new Error("Method not implemented.");
  }
  showPopover(): void {
    throw new Error("Method not implemented.");
  }
  togglePopover(force?: boolean): boolean {
    throw new Error("Method not implemented.");
  }
  addEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throw new Error("Method not implemented.");
  }
  removeEventListener(type: unknown, listener: unknown, options?: unknown): void {
    throw new Error("Method not implemented.");
  }
  attributes!: NamedNodeMap;
  classList!: DOMTokenList;
  className!: string;
  clientHeight!: number;
  clientLeft!: number;
  clientTop!: number;
  clientWidth!: number;
  id!: string;
  innerHTML!: string;
  localName!: string;
  namespaceURI!: string | null;
  onfullscreenchange!: ((this: Element, ev: Event) => any) | null;
  onfullscreenerror!: ((this: Element, ev: Event) => any) | null;
  outerHTML!: string;
  ownerDocument!: Document;
  part!: DOMTokenList;
  prefix!: string | null;
  scrollHeight!: number;
  scrollLeft!: number;
  scrollTop!: number;
  scrollWidth!: number;
  shadowRoot!: ShadowRoot | null;
  slot!: string;
  tagName!: string;
  attachShadow(init: ShadowRootInit): ShadowRoot {
    throw new Error("Method not implemented.");
  }
  checkVisibility(options?: CheckVisibilityOptions): boolean {
    throw new Error("Method not implemented.");
  }
  closest(selectors: unknown): any {
    throw new Error("Method not implemented.");
  }
  computedStyleMap(): StylePropertyMapReadOnly {
    throw new Error("Method not implemented.");
  }
  getAttribute(qualifiedName: string): string | null {
    throw new Error("Method not implemented.");
  }
  getAttributeNS(namespace: string | null, localName: string): string | null {
    throw new Error("Method not implemented.");
  }
  getAttributeNames(): string[] {
    throw new Error("Method not implemented.");
  }
  getAttributeNode(qualifiedName: string): Attr | null {
    throw new Error("Method not implemented.");
  }
  getAttributeNodeNS(namespace: string | null, localName: string): Attr | null {
    throw new Error("Method not implemented.");
  }
  getBoundingClientRect(): DOMRect {
    throw new Error("Method not implemented.");
  }
  getClientRects(): DOMRectList {
    throw new Error("Method not implemented.");
  }
  getElementsByClassName(classNames: string): HTMLCollectionOf<Element> {
    throw new Error("Method not implemented.");
  }
  getElementsByTagName(qualifiedName: unknown): HTMLCollectionOf<Element> | HTMLCollectionOf<any> {
    throw new Error("Method not implemented.");
  }
  getElementsByTagNameNS(namespace: unknown, localName: unknown): HTMLCollectionOf<any> {
    throw new Error("Method not implemented.");
  }
  getHTML(options?: GetHTMLOptions): string {
    throw new Error("Method not implemented.");
  }
  hasAttribute(qualifiedName: string): boolean {
    throw new Error("Method not implemented.");
  }
  hasAttributeNS(namespace: string | null, localName: string): boolean {
    throw new Error("Method not implemented.");
  }
  hasAttributes(): boolean {
    throw new Error("Method not implemented.");
  }
  hasPointerCapture(pointerId: number): boolean {
    throw new Error("Method not implemented.");
  }
  insertAdjacentElement(where: InsertPosition, element: Element): Element | null {
    throw new Error("Method not implemented.");
  }
  insertAdjacentHTML(position: InsertPosition, string: string): void {
    throw new Error("Method not implemented.");
  }
  insertAdjacentText(where: InsertPosition, data: string): void {
    throw new Error("Method not implemented.");
  }
  matches(selectors: string): boolean {
    throw new Error("Method not implemented.");
  }
  releasePointerCapture(pointerId: number): void {
    throw new Error("Method not implemented.");
  }
  removeAttribute(qualifiedName: string): void {
    throw new Error("Method not implemented.");
  }
  removeAttributeNS(namespace: string | null, localName: string): void {
    throw new Error("Method not implemented.");
  }
  removeAttributeNode(attr: Attr): Attr {
    throw new Error("Method not implemented.");
  }
  requestFullscreen(options?: FullscreenOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  requestPointerLock(options?: PointerLockOptions): Promise<void> {
    throw new Error("Method not implemented.");
  }
  scroll(x?: unknown, y?: unknown): void {
    throw new Error("Method not implemented.");
  }
  scrollBy(x?: unknown, y?: unknown): void {
    throw new Error("Method not implemented.");
  }
  scrollIntoView(arg?: boolean | ScrollIntoViewOptions): void {
    throw new Error("Method not implemented.");
  }
  scrollTo(x?: unknown, y?: unknown): void {
    throw new Error("Method not implemented.");
  }
  setAttribute(qualifiedName: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setAttributeNS(namespace: string | null, qualifiedName: string, value: string): void {
    throw new Error("Method not implemented.");
  }
  setAttributeNode(attr: Attr): Attr | null {
    throw new Error("Method not implemented.");
  }
  setAttributeNodeNS(attr: Attr): Attr | null {
    throw new Error("Method not implemented.");
  }
  setHTMLUnsafe(html: string): void {
    throw new Error("Method not implemented.");
  }
  setPointerCapture(pointerId: number): void {
    throw new Error("Method not implemented.");
  }
  toggleAttribute(qualifiedName: string, force?: boolean): boolean {
    throw new Error("Method not implemented.");
  }
  webkitMatchesSelector(selectors: string): boolean {
    throw new Error("Method not implemented.");
  }
  baseURI!: string;
  childNodes!: NodeListOf<ChildNode>;
  firstChild!: ChildNode | null;
  isConnected!: boolean;
  lastChild!: ChildNode | null;
  nextSibling!: ChildNode | null;
  nodeName!: string;
  nodeType!: number;
  nodeValue!: string | null;
  parentElement!: HTMLElement | null;
  parentNode!: ParentNode | null;
  previousSibling!: ChildNode | null;
  textContent!: string | null;
  appendChild<T extends Node>(node: T): T {
    throw new Error("Method not implemented.");
  }
  cloneNode(deep?: boolean): Node {
    throw new Error("Method not implemented.");
  }
  compareDocumentPosition(other: Node): number {
    throw new Error("Method not implemented.");
  }
  contains(other: Node | null): boolean {
    throw new Error("Method not implemented.");
  }
  getRootNode(options?: GetRootNodeOptions): Node {
    throw new Error("Method not implemented.");
  }
  hasChildNodes(): boolean {
    throw new Error("Method not implemented.");
  }
  insertBefore<T extends Node>(node: T, child: Node | null): T {
    throw new Error("Method not implemented.");
  }
  isDefaultNamespace(namespace: string | null): boolean {
    throw new Error("Method not implemented.");
  }
  isEqualNode(otherNode: Node | null): boolean {
    throw new Error("Method not implemented.");
  }
  isSameNode(otherNode: Node | null): boolean {
    throw new Error("Method not implemented.");
  }
  lookupNamespaceURI(prefix: string | null): string | null {
    throw new Error("Method not implemented.");
  }
  lookupPrefix(namespace: string | null): string | null {
    throw new Error("Method not implemented.");
  }
  normalize(): void {
    throw new Error("Method not implemented.");
  }
  removeChild<T extends Node>(child: T): T {
    throw new Error("Method not implemented.");
  }
  replaceChild<T extends Node>(node: Node, child: T): T {
    throw new Error("Method not implemented.");
  }
  ELEMENT_NODE!: 1;
  ATTRIBUTE_NODE!: 2;
  TEXT_NODE!: 3;
  CDATA_SECTION_NODE!: 4;
  ENTITY_REFERENCE_NODE!: 5;
  ENTITY_NODE!: 6;
  PROCESSING_INSTRUCTION_NODE!: 7;
  COMMENT_NODE!: 8;
  DOCUMENT_NODE!: 9;
  DOCUMENT_TYPE_NODE!: 10;
  DOCUMENT_FRAGMENT_NODE!: 11;
  NOTATION_NODE!: 12;
  DOCUMENT_POSITION_DISCONNECTED!: 1;
  DOCUMENT_POSITION_PRECEDING!: 2;
  DOCUMENT_POSITION_FOLLOWING!: 4;
  DOCUMENT_POSITION_CONTAINS!: 8;
  DOCUMENT_POSITION_CONTAINED_BY!: 16;
  DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC!: 32;
  dispatchEvent(event: Event): boolean {
    throw new Error("Method not implemented.");
  }
  ariaAtomic!: string | null;
  ariaAutoComplete!: string | null;
  ariaBrailleLabel!: string | null;
  ariaBrailleRoleDescription!: string | null;
  ariaBusy!: string | null;
  ariaChecked!: string | null;
  ariaColCount!: string | null;
  ariaColIndex!: string | null;
  ariaColSpan!: string | null;
  ariaCurrent!: string | null;
  ariaDescription!: string | null;
  ariaDisabled!: string | null;
  ariaExpanded!: string | null;
  ariaHasPopup!: string | null;
  ariaHidden!: string | null;
  ariaInvalid!: string | null;
  ariaKeyShortcuts!: string | null;
  ariaLabel!: string | null;
  ariaLevel!: string | null;
  ariaLive!: string | null;
  ariaModal!: string | null;
  ariaMultiLine!: string | null;
  ariaMultiSelectable!: string | null;
  ariaOrientation!: string | null;
  ariaPlaceholder!: string | null;
  ariaPosInSet!: string | null;
  ariaPressed!: string | null;
  ariaReadOnly!: string | null;
  ariaRequired!: string | null;
  ariaRoleDescription!: string | null;
  ariaRowCount!: string | null;
  ariaRowIndex!: string | null;
  ariaRowSpan!: string | null;
  ariaSelected!: string | null;
  ariaSetSize!: string | null;
  ariaSort!: string | null;
  ariaValueMax!: string | null;
  ariaValueMin!: string | null;
  ariaValueNow!: string | null;
  ariaValueText!: string | null;
  role!: string | null;
  animate(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): Animation {
    throw new Error("Method not implemented.");
  }
  getAnimations(options?: GetAnimationsOptions): Animation[] {
    throw new Error("Method not implemented.");
  }
  after(...nodes: (Node | string)[]): void {
    throw new Error("Method not implemented.");
  }
  before(...nodes: (Node | string)[]): void {
    throw new Error("Method not implemented.");
  }
  remove(): void {
    throw new Error("Method not implemented.");
  }
  replaceWith(...nodes: (Node | string)[]): void {
    throw new Error("Method not implemented.");
  }
  nextElementSibling!: Element | null;
  previousElementSibling!: Element | null;
  childElementCount!: number;
  children!: HTMLCollection;
  firstElementChild!: Element | null;
  lastElementChild!: Element | null;
   
  append(...nodes: (Node | string)[]): void {
    throw new Error("Method not implemented.");
  }
   
  prepend(...nodes: (Node | string)[]): void {
    throw new Error("Method not implemented.");
  }
   
  querySelector(selectors: unknown): any {
    throw new Error("Method not implemented.");
  }
   
  querySelectorAll(selectors: unknown): NodeListOf<any> {
    throw new Error("Method not implemented.");
  }
  replaceChildren(...nodes: (Node | string)[]): void {
    throw new Error("Method not implemented.");
  }
  assignedSlot!: HTMLSlotElement | null;
  attributeStyleMap!: StylePropertyMap;
  style!: CSSStyleDeclaration;
  contentEditable!: string;
  enterKeyHint!: string;
  inputMode!: string;
  isContentEditable!: boolean;
  onabort!: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
  onanimationcancel!: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onanimationend!: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onanimationiteration!: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onanimationstart!: ((this: GlobalEventHandlers, ev: AnimationEvent) => any) | null;
  onauxclick!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onbeforeinput!: ((this: GlobalEventHandlers, ev: InputEvent) => any) | null;
  onbeforetoggle!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onblur!: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
  oncancel!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncanplay!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncanplaythrough!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onchange!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onclick!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onclose!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncontextlost!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncontextmenu!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  oncontextrestored!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncopy!: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
  oncuechange!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oncut!: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
  ondblclick!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  ondrag!: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragend!: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragenter!: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragleave!: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragover!: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondragstart!: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondrop!: ((this: GlobalEventHandlers, ev: DragEvent) => any) | null;
  ondurationchange!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onemptied!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onended!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onerror!: OnErrorEventHandler;
  onfocus!: ((this: GlobalEventHandlers, ev: FocusEvent) => any) | null;
  onformdata!: ((this: GlobalEventHandlers, ev: FormDataEvent) => any) | null;
  ongotpointercapture!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  oninput!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  oninvalid!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onkeydown!: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onkeypress!: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onkeyup!: ((this: GlobalEventHandlers, ev: KeyboardEvent) => any) | null;
  onload!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadeddata!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadedmetadata!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onloadstart!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onlostpointercapture!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onmousedown!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseenter!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseleave!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmousemove!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseout!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseover!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onmouseup!: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null;
  onpaste!: ((this: GlobalEventHandlers, ev: ClipboardEvent) => any) | null;
  onpause!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onplay!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onplaying!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onpointercancel!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerdown!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerenter!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerleave!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointermove!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerout!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerover!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onpointerup!: ((this: GlobalEventHandlers, ev: PointerEvent) => any) | null;
  onprogress!: ((this: GlobalEventHandlers, ev: ProgressEvent) => any) | null;
  onratechange!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onreset!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onresize!: ((this: GlobalEventHandlers, ev: UIEvent) => any) | null;
  onscroll!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onscrollend!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onsecuritypolicyviolation!: ((this: GlobalEventHandlers, ev: SecurityPolicyViolationEvent) => any) | null;
  onseeked!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onseeking!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselect!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselectionchange!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onselectstart!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onslotchange!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onstalled!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onsubmit!: ((this: GlobalEventHandlers, ev: SubmitEvent) => any) | null;
  onsuspend!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontimeupdate!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontoggle!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  ontouchcancel?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  ontouchend?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  ontouchmove?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  ontouchstart?: ((this: GlobalEventHandlers, ev: TouchEvent) => any) | null | undefined;
  ontransitioncancel!: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  ontransitionend!: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  ontransitionrun!: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  ontransitionstart!: ((this: GlobalEventHandlers, ev: TransitionEvent) => any) | null;
  onvolumechange!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwaiting!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwebkitanimationend!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwebkitanimationiteration!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwebkitanimationstart!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwebkittransitionend!: ((this: GlobalEventHandlers, ev: Event) => any) | null;
  onwheel!: ((this: GlobalEventHandlers, ev: WheelEvent) => any) | null;
  autofocus!: boolean;
  dataset!: DOMStringMap;
  nonce?: string | undefined;
  tabIndex!: number;
  blur(): void {
    throw new Error("Method not implemented.");
  }
  focus(options?: FocusOptions): void {
    throw new Error("Method not implemented.");
  }

}

export let _ComponentWidget_:CustomElementConstructor;
if (isBrowser) {
  _ComponentWidget_ = class _ComponentWidget_ extends HTMLElement implements I_ComponentWidget_ {
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
      __enabled__atributes__.forEach( (attributeName) => {
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
      data_attributenames.forEach(function (_attribute_name_) {
        componentBody.setAttribute("data-" + _attribute_name_, componentWidget?.getAttribute("data-" + _attribute_name_) as any);
        componentWidget.removeAttribute("data-" + _attribute_name_);
      });
      [...(componentWidget as any).children].forEach( (element) => {
        componentBody.appendChild(element.cloneNode(true));
        element.remove();
      });
  
      componentWidget.append(componentBody);
    }
  };
  
} else {
  _ComponentWidget_ = class _ComponentWidget_ extends QCObjectsWidgetNode {
    constructor (){
      super();
      throw new Error ("Class not implemented.");
    }
  };
}
Export(_ComponentWidget_);
export const RegisterWidget = (widgetName: string):void => {
  if (isBrowser){
    customElements.define(widgetName, class extends _ComponentWidget_ { });
  } else {
    throw new Error ("RegisterWidget is not implemented for non browser ecosystems yet.");
  }
};
export const RegisterWidgets =  (...args: string[]):void  =>{
  const widgetList = [...args];
  widgetList.filter(function (widgetName) {
    return typeof widgetName === "string";
  }).map(function (widgetName) {
    return RegisterWidget(widgetName);
  });
};
(_protected_code_)(RegisterWidget);
(_protected_code_)(RegisterWidgets);
Export(RegisterWidget);
Export(RegisterWidgets);
