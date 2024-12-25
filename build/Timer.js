"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const InheritClass_1 = require("./InheritClass");
const Package_1 = require("./Package");
class Timer extends InheritClass_1.InheritClass {
    duration = 1000;
    alive = true;
    thread({ timing, intervalInterceptor, duration }) {
        const timer = this;
        const start = performance.now();
        requestAnimationFrame(function thread(time) {
            // timeFraction goes from 0 to 1
            const elapsed = (time - start);
            let timeFraction = elapsed / duration;
            if (timeFraction > 1)
                timeFraction = 1;
            // calculate the current progress state
            const progress = timing(timeFraction, elapsed);
            intervalInterceptor(Math.round(progress * 100)); // draw it
            if ((timeFraction < 1 || duration === -1) && timer.alive) {
                requestAnimationFrame(thread);
            }
        });
    }
}
exports.Timer = Timer;
(0, Package_1.Package)("com.qcobjects.timing", [
    Timer
]);
