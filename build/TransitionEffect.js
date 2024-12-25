"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionEffect = void 0;
const Effect_1 = require("./Effect");
const Logger_1 = require("./Logger");
const Package_1 = require("./Package");
const ClassFactory_1 = require("./ClassFactory");
class TransitionEffect extends Effect_1.Effect {
    duration = 385;
    defaultParams = {
        alphaFrom: 0,
        alphaTo: 1,
        angleFrom: 180,
        angleTo: 0,
        radiusFrom: 0,
        radiusTo: 30,
        scaleFrom: 0,
        scaleTo: 1
    };
    fitToHeight = false;
    fitToWidth = false;
    component;
    effects;
    apply({ alphaFrom, alphaTo, angleFrom, angleTo, radiusFrom, radiusTo, scaleFrom, scaleTo }) {
        const _transition_ = this;
        Logger_1.logger.info("EXECUTING TransitionEffect  ");
        const componentRoot = _transition_.component.componentRoot;
        if (typeof componentRoot !== "undefined" && componentRoot !== null) {
            if (_transition_.fitToHeight) {
                componentRoot.height = (typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null) ? (componentRoot.offsetParent?.scrollHeight) : (componentRoot.getBoundingClientRect().height);
            }
            if (_transition_.fitToWidth) {
                componentRoot.width = (typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null) ? (componentRoot.offsetParent?.scrollWidth) : (componentRoot.getBoundingClientRect().width);
            }
            if (_transition_.component.shadowed) {
                componentRoot.host.style.display = "block";
            }
            else {
                componentRoot.style.display = "block";
            }
            _transition_.effects.map((effectClassName) => {
                const __effectClass__ = (0, ClassFactory_1.ClassFactory)(effectClassName);
                const effectObj = new __effectClass__({});
                const effectClassMethod = effectObj.apply.bind(_transition_);
                const componentHost = (_transition_.component.shadowed) ? (componentRoot.host) : (componentRoot);
                const effectParams = {
                    alphaFrom,
                    alphaTo,
                    angleFrom,
                    angleTo,
                    radiusFrom,
                    radiusTo,
                    scaleFrom,
                    scaleTo
                };
                effectClassMethod(componentHost, ...Object.values(effectParams));
                return effectClassName;
            });
        }
    }
}
exports.TransitionEffect = TransitionEffect;
(0, Package_1.Package)("com.qcobjects.effects.transitions.base", [
    TransitionEffect
]);
