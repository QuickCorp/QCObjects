import { CONFIG } from "./CONFIG";
import { isBrowser } from "./platform";
import { _QC_READY_LISTENERS } from "./PrimaryCollections";
import { _top } from "./top";

/**
 * Defines a Custom Ready listener
 */
export const Ready = function Ready(e:any) {
    if (isBrowser) {
        _QC_READY_LISTENERS.push(e.bind(window) as never);
    } else if (typeof global !== "undefined") {
        _QC_READY_LISTENERS.push(e.bind(global) as never);
    }
};

export const ready = Ready; // case insensitive ready option

/**
 * Default Ready event function for window. Executes all micro ready events of Import calls
 *
 * @param {Object} e
 */
// eslint-disable-next-line no-unused-vars
export const _Ready = function (e:any) {
    const _execReady = function () {
        // eslint-disable-next-line array-callback-return
        _QC_READY_LISTENERS.map(function (_ready_listener_, _r):any {
            if (typeof _ready_listener_ === "function") {
                (_ready_listener_ as Function)();
                _QC_READY_LISTENERS.splice(_r, 1);
            }
        });
    };
    if (CONFIG.get("delayForReady") > 0) {
        if (isBrowser) {
            setTimeout(_execReady.bind(window), CONFIG.get("delayForReady"));
        } else if (typeof global !== "undefined") {
            setTimeout(_execReady.bind(global), CONFIG.get("delayForReady"));
        }
    } else {
        _execReady.call(_top);
    }
};
