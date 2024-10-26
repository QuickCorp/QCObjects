import { _basePath_ } from "./basePath";
import { _Cast } from "./Cast";
import { Class } from "./Class";
import { _domain_ } from "./domain";
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
    set(name:string, value:any) {
      this[name] = value;
    },
    get(name:string, _default?:any) {
      return this[name] || _default;
    },
    status: false,
    done() { },
    fail() { },
    rebuild() {
      var context = this;
      try {
        document.getElementsByTagName(context.containerTag)[0].appendChild(
          (function (s:any, url:string, context:any) {
            s.type = context.type;
            s.src = url;
            s.crossOrigin = (Object.hasOwnProperty.call(context, "crossOrigin")) ? (context.crossOrigin) : ("anonymous");
            s.async = context.async;
            s.onreadystatechange = function () {
              if (this.readyState === "complete") {
                context.done.call(context);
              }
            };
            s.onload = function (e:any) {
              context.status = true;
              context.done.call(context, e);
            };
            s.onerror = function (e:any) {
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
    Cast(o:any) {
      return _Cast(this, o);
    },
    _new_(properties:any) {
      this.__new__(properties);
      this.rebuild();
    }
  });
