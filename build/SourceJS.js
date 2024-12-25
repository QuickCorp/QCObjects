"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceJS = void 0;
const basePath_1 = require("./basePath");
const Cast_1 = require("./Cast");
const domain_1 = require("./domain");
const DOMCreateElement_1 = require("./DOMCreateElement");
const InheritClass_1 = require("./InheritClass");
const Package_1 = require("./Package");
const Logger_1 = require("./Logger");
class SourceJS extends InheritClass_1.InheritClass {
    domain = domain_1._domain_;
    basePath = basePath_1._basePath_;
    type = "text/javascript";
    containerTag = "body";
    url = "";
    data = {};
    async = false;
    external = false;
    constructor(o) {
        super(o);
        this.body = (0, DOMCreateElement_1._DOMCreateElement)("script");
    }
    set(name, value) {
        this[name] = value;
    }
    get(name, _default) {
        return this[name] || _default;
    }
    status = false;
    done() { }
    fail() { }
    rebuild() {
        const context = this;
        try {
            document.getElementsByTagName(context.containerTag)[0].appendChild((function (s, url, context) {
                s.type = context.type;
                s.src = url;
                s.crossOrigin = (Object.hasOwn(context, "crossOrigin")) ? (context.crossOrigin) : ("anonymous");
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
            }).call(this, (0, DOMCreateElement_1._DOMCreateElement)("script"), (this.external) ? (this.url) : (this.basePath + this.url), context));
        }
        catch (e) {
            context.status = false;
            Logger_1.logger.debug(`An error ocurred: ${e}`);
            context.fail();
        }
    }
    Cast(o) {
        return (0, Cast_1._Cast)(this, o);
    }
    _new_(properties) {
        this.__new__(properties);
        this.rebuild();
    }
}
exports.SourceJS = SourceJS;
(0, Package_1.Package)("com.qcobjects", [SourceJS]);
