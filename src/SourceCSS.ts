import { _basePath_ } from "./basePath";
import { _Cast } from "./Cast";
import { Class } from "./Class";
import { _domain_ } from "./domain";
import { _DOMCreateElement } from "./DOMCreateElement";
import { isBrowser } from "./platform";

export const SourceCSS = Class("SourceCSS", Object, {
    domain: _domain_,
    basePath: _basePath_,
    body: _DOMCreateElement("link"),
    url: "",
    data: {},
    async: false,
    external: false,
    set(name:string, value:any) {
      this[name] = value;
    },
    get(name:string, _default?:any) {
      return this[name] || _default;
    },
    done() { },
    rebuild() {
      var context = this;
      if (isBrowser) {
        window.document.getElementsByTagName("head")[0].appendChild(
          (function (s:any, url:string, context:any) {
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
    },
    Cast(o:any) {
      return _Cast(this, o);
    },
    _new_(properties:any) {
      this.__new__(properties);
      this.rebuild();
    }
  });
