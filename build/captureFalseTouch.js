"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.captureFalseTouch = exports.supportsPassive = void 0;
const platform_1 = require("./platform");
exports.supportsPassive = false;
const captureFalseTouch = () => {
    return (exports.supportsPassive) ? ({
        passive: true
    }) : (false);
};
exports.captureFalseTouch = captureFalseTouch;
// Test via a getter in the options object to see if the passive property is accessed
if (platform_1.isBrowser) {
    try {
        const opts = Object.defineProperty({}, "passive", {
            get() {
                exports.supportsPassive = true;
                return exports.supportsPassive;
            }
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    }
    catch (e) {
        exports.supportsPassive = false;
    }
}
else {
    exports.supportsPassive = false;
}
