"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Effect = void 0;
const InheritClass_1 = require("./InheritClass");
const Package_1 = require("./Package");
const introspection_1 = require("./introspection");
const ClassFactory_1 = require("./ClassFactory");
class Effect extends InheritClass_1.InheritClass {
    // eslint-disable-next-line no-unused-vars
    done(...args) {
        throw new Error("Method not implemented.");
    }
    ;
    // eslint-disable-next-line no-unused-vars
    apply(...args) {
        throw new Error("Method not implemented.");
    }
    duration = 1000;
    animate({ timing, draw, duration }) {
        const _self = this;
        const start = performance.now();
        requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1)
                timeFraction = 1;
            // calculate the current animation state
            const progress = timing(timeFraction);
            draw(Math.round(progress * 100)); // draw it
            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
            else {
                // if this is an object with a done method
                if (typeof _self !== "undefined" &&
                    _self !== null &&
                    Object.hasOwn(_self, "done") &&
                    (typeof _self.done).toLowerCase() === "function") {
                    _self.done.call(_self);
                }
            }
        });
    }
}
exports.Effect = Effect;
(0, Package_1.Package)("com.qcobjects.effects.base", [
    Effect
]);
(introspection_1._methods_)((0, ClassFactory_1.ClassFactory)("Effect")).map((__c__) => {
    (introspection_1._protected_code_)(__c__);
    return __c__;
});
