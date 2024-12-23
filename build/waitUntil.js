"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitUntil = void 0;
const Logger_1 = require("./Logger");
const waitUntil = (func, exp) => {
    const _waitUntil = (func, exp) => {
        const maxWaitCycles = 2000;
        let _w = 0;
        var _t = setInterval(function () {
            if (exp()) {
                clearInterval(_t);
                func();
                Logger_1.logger.debug("Ejecuting " + func.name + " after wait");
            }
            else {
                if (_w < maxWaitCycles) {
                    _w += 1;
                    Logger_1.logger.debug("WAIT UNTIL " + func.name + " is true, " + _w.toString() + " cycles");
                }
                else {
                    Logger_1.logger.debug("Max execution time for " + func.name + " expression until true");
                    clearInterval(_t);
                }
            }
        }, 1);
    };
    setTimeout(function () {
        _waitUntil(func, exp);
    }, 1);
};
exports.waitUntil = waitUntil;
