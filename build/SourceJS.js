"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceJS = void 0;
const basePath_1 = require("./basePath");
const Cast_1 = require("./Cast");
const Class_1 = require("./Class");
const domain_1 = require("./domain");
const DOMCreateElement_1 = require("./DOMCreateElement");
exports.SourceJS = (0, Class_1.Class)("SourceJS", Object, {
    domain: domain_1._domain_,
    basePath: basePath_1._basePath_,
    body: (0, DOMCreateElement_1._DOMCreateElement)("script"),
    type: "text/javascript",
    containerTag: "body",
    url: "",
    data: {},
    async: false,
    external: false,
    set(name, value) {
        this[name] = value;
    },
    get(name, _default) {
        return this[name] || _default;
    },
    status: false,
    done() { },
    fail() { },
    rebuild() {
        const context = this;
        try {
            document.getElementsByTagName(context.containerTag)[0].appendChild((function (s, url, context) {
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
            }).call(this, (0, DOMCreateElement_1._DOMCreateElement)("script"), (this.external) ? (this.url) : (this.basePath + this.url), context));
        }
        catch (e) {
            context.status = false;
            context.fail.call(context, e);
        }
    },
    Cast(o) {
        return (0, Cast_1._Cast)(this, o);
    },
    _new_(properties) {
        this.__new__(properties);
        this.rebuild();
    }
});
