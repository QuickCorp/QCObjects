import { TimerParams } from "types/global";
import { ClassFactory } from "./ClassFactory";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";

export class Timer extends InheritClass {

    constructor() {
      super(...arguments);
    }

    duration = 1000;
    alive = true;
    thread({
      timing,
      intervalInterceptor,
      duration
    }:TimerParams) {
      var timer = this;

      let start = performance.now();

      requestAnimationFrame(function thread(time) {
        // timeFraction goes from 0 to 1
        let elapsed = (time - start);
        let timeFraction = elapsed / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current progress state
        let progress = timing(timeFraction, elapsed);

        intervalInterceptor(Math.round(progress * 100)); // draw it

        if ((timeFraction < 1 || duration === -1) && timer.alive) {
          requestAnimationFrame(thread);
        }

      });
    }


  }

Package("com.qcobjects.timing", [
    Timer
  ]);
