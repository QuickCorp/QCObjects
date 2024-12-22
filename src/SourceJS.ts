import { ISourceJS } from "./types/global";
import { _basePath_ } from "./basePath";
import { _Cast } from "./Cast";
import { _domain_ } from "./domain";
import { _DOMCreateElement } from "./DOMCreateElement";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";
import { logger } from "./Logger";

export class SourceJS extends InheritClass implements ISourceJS {
    domain= _domain_;
    basePath= _basePath_;
    type= "text/javascript";
    containerTag= "body";
    url= "";
    data= {};
    async= false;
    external= false;

    constructor(o:any){
      super(o);
      this.body= _DOMCreateElement("script");

    }
    set(name:string, value:any) {
      this[name] = value;
    }
    get(name:string, _default?:any):any {
      return this[name] || _default;
    }
    status= false;
    done() { }
    fail() { }
    rebuild() {
      const context = this;
      try {
        document.getElementsByTagName(context.containerTag)[0].appendChild(
          (function (s:any, url:string, context:any):any {
            s.type = context.type;
            s.src = url;
            s.crossOrigin = (Object.hasOwn(context, "crossOrigin")) ? (context.crossOrigin) : ("anonymous");
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
      } catch (e:any) {
        context.status = false;
        logger.debug(`An error ocurred: ${e}`);
        context.fail();
      }
    }
    Cast(o:any):any {
      return _Cast(this, o);
    }
    _new_(properties:any) {
      this.__new__(properties);
      this.rebuild();
    }
  }

  Package("com.qcobjects", [SourceJS]);
