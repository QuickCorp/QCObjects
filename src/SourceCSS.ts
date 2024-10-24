import { _basePath_ } from "./basePath";
import { _Cast } from "./Cast";
import { Class } from "./Class";
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
    set(name, value) {
      this[name] = value;
    },
    get(name) {
      return this[name];
    },
    done() { },
    rebuild() {
      var context = this;
      if (isBrowser) {
        window.document.getElementsByTagName("head")[0].appendChild(
          (function (s, url, context) {
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
    Cast(o) {
      return _Cast(this, o);
    },
    _new_(properties) {
      this.__new__(properties);
      this.rebuild();
    }
  });
