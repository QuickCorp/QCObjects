import { Component } from "./Component";
import { Export } from "./Export";
import { isBrowser } from "./platform";
import { _top } from "./top";

export const _asyncLoad = [];
export const asyncLoad = function (callback: { (component: Component, _async?: any) : Promise<any>;
                                              (service: any, _async?: any): Promise<unknown>
                                                }, args?: any[]) {
  var asyncCallback = {
    "func": callback,
    "args": args,
    "dispatch"() {
      this.func.apply(null, ...args as []);
    }
  };
  _asyncLoad.push(asyncCallback as unknown as never);
  return asyncCallback;
};

export const _fireAsyncLoad = function () {
        if (isBrowser){
            document.addEventListener("readystatechange", () => {
                if (document.readyState === "complete") {
                    _asyncLoad.map(function (fc) {
                      (fc as any).dispatch.call(fc);
                    });
                  }
            });
        } else if (typeof _top.global !== "undefined") {
            _asyncLoad.map(function (fc) {
                (fc as any).dispatch.call(fc);
              });
        }
    };

Export(asyncLoad);