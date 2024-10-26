import { isBrowser } from "./platform";

export let supportsPassive = false;
export const captureFalseTouch = () => {
    return (supportsPassive) ? ({
        passive: true
    }) : (false);
};

// Test via a getter in the options object to see if the passive property is accessed
if (isBrowser) {
    try {
        const opts = Object.defineProperty({}, "passive", {
            get() {
                supportsPassive = true;
                return supportsPassive;
            }
        });
        (window as any).addEventListener("testPassive", null, opts);
        (window as any).removeEventListener("testPassive", null, opts);
    } catch (e) {
        supportsPassive = false;
    }

} else {
    supportsPassive = false;
}