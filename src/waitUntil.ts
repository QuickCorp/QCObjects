import { logger } from "./Logger";

export const waitUntil = function (func:Function, exp:Function) {
    var _waitUntil = function (func:Function, exp:Function) {
      var maxWaitCycles = 2000;
      var _w = 0;
      var _t = setInterval(function () {
        if (exp()) {
          clearInterval(_t);
          func();
          logger.debug("Ejecuting " + func.name + " after wait");
        } else {
          if (_w < maxWaitCycles) {
            _w += 1;
            logger.debug("WAIT UNTIL " + func.name + " is true, " + _w.toString() + " cycles");
          } else {
            logger.debug("Max execution time for " + func.name + " expression until true");
            clearInterval(_t);
          }
        }
      }, 1);
    };
    setTimeout(function () {
      _waitUntil(func, exp);
    }, 1);
  };
