import { ISourceCSS, TBody } from "./types/global";
import { _basePath_ } from "./basePath";
import { _Cast } from "./Cast";
import { _domain_ } from "./domain";
import { _DOMCreateElement } from "./DOMCreateElement";
import { InheritClass } from "./InheritClass";
import { isBrowser } from "./platform";
import { Package } from "./Package";

export class SourceCSS extends InheritClass implements ISourceCSS {
  domain: string = _domain_;
  basePath: string = _basePath_;
  url = "";
  data = {};
  async = false;
  external = false;

  constructor(o: any) {
    super(o);
    this.body = _DOMCreateElement("link") as TBody;
  }
  fail(): void {
    throw new Error("Method not implemented.");
  }
  Cast(o: any): any {
    return _Cast(this, o);
  }
  set(name: string, value: any): void {
    this[name] = value;
  }
  get(name: string, _default?: any): any {
    return this[name] || _default;
  }
  done(): void { }
  rebuild(): void {
    const context = this;
    if (isBrowser) {
      window.document.getElementsByTagName("head")[0].appendChild(
        (function (s: any, url: string, context: any): any {
          s.type = "text/css";
          s.rel = "stylesheet";
          s.href = url;
          s.crossOrigin = "anonymous";
          s.onreadystatechange = function () {
            if (this.readyState === "complete") {
              context.done.call(context);
            }
          };
          s.onload = context.done;
          context.body = s;
          return s;
        }).call(this,
          _DOMCreateElement("link"),
          (this.external) ? (this.url) : (this.basePath + this.url), context));
    }
  }
}

Package("com.qcobjects", [SourceCSS]);