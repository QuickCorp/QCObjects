import { IEffect, TEffectParams } from "@types";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";
import { _methods_, _protected_code_ } from "./introspection";
import { ClassFactory } from "./ClassFactory";

class Effect extends InheritClass implements IEffect {
  // eslint-disable-next-line no-unused-vars
  done(...args: any[]): any {
    throw new Error("Method not implemented.");
  };
  // eslint-disable-next-line no-unused-vars
  apply(...args: any[]): void {
    throw new Error("Method not implemented.");
  }
  duration = 1000;


  animate({
    timing,
    draw,
    duration
  }: TEffectParams): void {
    const _self: this = this;

    const start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // calculate the current animation state
      const progress = timing(timeFraction);

      draw(Math.round(progress * 100)); // draw it

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
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


Package("com.qcobjects.effects.base", [
  Effect
]);

(_methods_)(ClassFactory("Effect")).map((__c__): any => {
  (_protected_code_)(__c__);
  return __c__;
});

export { Effect };