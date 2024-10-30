import { ITimer, TTimerParams } from "types";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";

export class Timer extends InheritClass implements ITimer {


    duration = 1000;
    alive = true;
    thread({
      timing,
      intervalInterceptor,
      duration
    }:TTimerParams) {
      const timer = this;

      const start = performance.now();

      requestAnimationFrame(function thread(time) {
        // timeFraction goes from 0 to 1
        const elapsed = (time - start);
        let timeFraction = elapsed / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current progress state
        const progress = timing(timeFraction, elapsed);

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
