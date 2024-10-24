import { _basePath_ } from "./basePath";
import { Class } from "./Class";
import { _DOMCreateElement } from "./DOMCreateElement";

export const SourceJS = Class("SourceJS", Object, {
    domain: _domain_,
    basePath: _basePath_,
    body: _DOMCreateElement("script"),
    type: "text/javascript",
    containerTag: "body",
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
    status: false,
    done() { },
    fail() { },
    rebuild() {
      var context = this;
      try {
        document.getElementsByTagName(context.containerTag)[0].appendChild(
          (function (s, url, context) {
            s.type = context.type;
            s.src = url;
            s.crossOrigin = (Object.hasOwnProperty.call(context, "crossOrigin")) ? (context.crossOrigin) : ("anonymous");
            s.async = context.async;
            s.onreadystatechange = function () {
              if (this.readyState === "complete") {
                context.done.call(context);
              }
            };
            s.onload = function (e) {
              context.status = true;
              context.done.call(context, e);
            };
            s.onerror = function (e) {
              context.status = false;
              context.fail.call(context, e);
            };
            context.body = s;
            return s;
          }).call(this,
            _DOMCreateElement("script"),
            (this.external) ? (this.url) : (this.basePath + this.url), context));
      } catch (e) {
        context.status = false;
        context.fail.call(context, e);
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
