"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._Ready = exports.ready = exports.Ready = void 0;
const CONFIG_1 = require("./CONFIG");
const platform_1 = require("./platform");
const PrimaryCollections_1 = require("./PrimaryCollections");
const top_1 = require("./top");
/**
 * Defines a Custom Ready listener
 */
const Ready = (e) => {
    if (platform_1.isBrowser) {
        PrimaryCollections_1._QC_READY_LISTENERS.push(e.bind(window));
    }
    else if (typeof global !== "undefined") {
        PrimaryCollections_1._QC_READY_LISTENERS.push(e.bind(global));
    }
};
exports.Ready = Ready;
exports.ready = exports.Ready; // case insensitive ready option
/**
 * Default Ready event function for window. Executes all micro ready events of Import calls
 *
 * @param {Object} e
 */
// eslint-disable-next-line no-unused-vars
const _Ready = (e) => {
    const _execReady = () => {
        // eslint-disable-next-line array-callback-return
        PrimaryCollections_1._QC_READY_LISTENERS.map(function (_ready_listener_, _r) {
            if (typeof _ready_listener_ === "function") {
                _ready_listener_();
                PrimaryCollections_1._QC_READY_LISTENERS.splice(_r, 1);
            }
        });
    };
    if (CONFIG_1.CONFIG.get("delayForReady") > 0) {
        if (platform_1.isBrowser) {
            setTimeout(_execReady.bind(window), CONFIG_1.CONFIG.get("delayForReady"));
        }
        else if (typeof global !== "undefined") {
            setTimeout(_execReady.bind(global), CONFIG_1.CONFIG.get("delayForReady"));
        }
    }
    else {
        _execReady.call(top_1._top);
    }
};
exports._Ready = _Ready;
