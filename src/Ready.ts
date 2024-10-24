import { isBrowser } from "./platform";
import { _QC_READY_LISTENERS } from "./PrimaryCollections";

/**
 * Defines a Custom Ready listener
 */
export const Ready = function Ready(e) {
    if (isBrowser) {
        _QC_READY_LISTENERS.push(e.bind(window));
    } else if (typeof global !== "undefined") {
        _QC_READY_LISTENERS.push(e.bind(global));
    }
}
