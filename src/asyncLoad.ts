import { isBrowser } from "./platform";
import { _top } from "./top";

_top._asyncLoad = [];
export const asyncLoad = function (callback, args) {
  var asyncCallback = {
    "func": callback,
    "args": args,
    "dispatch"() {
      this.func.apply(null, this.args);
    }
  };
  _top._asyncLoad.push(asyncCallback);
  return asyncCallback;
};

export const _fireAsyncLoad = function () {
        if (isBrowser){
            document.addEventListener("readystatechange", () => {
                if (document.readyState === "complete") {
                    _top._asyncLoad.map(function (fc) {
                      fc.dispatch.call(fc);
                    });
                  }
            });
        } else if (typeof _top.global !== "undefined") {
            _top._asyncLoad.map(function (fc) {
                fc.dispatch.call(fc);
              });
        }
    };

_top.asyncLoad = asyncLoad;
