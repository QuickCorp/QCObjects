import { isBrowser } from "./platform";
import { _QC_READY_LISTENERS } from "./PrimaryCollections";
import { _top } from "./top";

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

export const ready = Ready; // case insensitive ready option

/**
 * Default Ready event function for window. Executes all micro ready events of Import calls
 *
 * @param {Object} e
 */
export const _Ready = function (e) {
    var _execReady = function () {
        _QC_READY_LISTENERS.map(function (_ready_listener_, _r) {
            if (typeof _ready_listener_ === "function") {
                _ready_listener_.call();
                delete _QC_READY_LISTENERS[_r];
            }
        });
    };
    if (_top.CONFIG.get("delayForReady") > 0) {
        if (isBrowser) {
            setTimeout(_execReady.bind(window), _top.CONFIG.get("delayForReady"));
        } else if (typeof global !== "undefined") {
            setTimeout(_execReady.bind(global), _top.CONFIG.get("delayForReady"));
        }
    } else {
        _execReady.call(_top);
    }
};
