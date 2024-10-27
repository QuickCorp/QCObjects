"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceCSS = void 0;
const basePath_1 = require("./basePath");
const Cast_1 = require("./Cast");
const Class_1 = require("./Class");
const domain_1 = require("./domain");
const DOMCreateElement_1 = require("./DOMCreateElement");
const platform_1 = require("./platform");
exports.SourceCSS = (0, Class_1.Class)("SourceCSS", Object, {
    domain: domain_1._domain_,
    basePath: basePath_1._basePath_,
    body: (0, DOMCreateElement_1._DOMCreateElement)("link"),
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
    done() { },
    rebuild() {
        const context = this;
        if (platform_1.isBrowser) {
            window.document.getElementsByTagName("head")[0].appendChild((function (s, url, context) {
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
            }).call(this, (0, DOMCreateElement_1._DOMCreateElement)("link"), (this.external) ? (this.url) : (this.basePath + this.url), context));
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
