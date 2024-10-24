import { ClassFactory } from "./ClassFactory";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";
export class Effect extends InheritClass {
  duration = 1000;

  constructor() {
    super(...arguments);
  }

  animate({
    timing,
    draw,
    duration
  }) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      // calculate the current animation state
      let progress = timing(timeFraction);

      draw(Math.round(progress * 100)); // draw it

      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        // if this is an object with a done method
        if (typeof this !== "undefined" &&
          this !== null &&
          Object.hasOwnProperty.call(this, "done") &&
          (typeof this.done).toLowerCase() === "function") {
          this.done.call(this);
        }
      }

    });
  }

}


Package("com.qcobjects.effects.base", [
  Effect
  ]);
