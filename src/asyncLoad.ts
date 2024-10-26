import { Service } from "types/global";
import { Component } from "./Component";
import { Export } from "./Export";
import { isBrowser } from "./platform";
import { _top } from "./top";

export const _asyncLoad = [];
export function asyncLoad(callback: (component: Component, _async?: any) => Promise<any>, args?: any[]): any;
export function asyncLoad(callback: (service: Service, _async?: any) => Promise<unknown>, args?: any[]): any;
export function asyncLoad(callback: (_async?: any) => any, args?: any[]): any;
export function asyncLoad(callback: any, args?: any[]): any {

  class AsyncCallback {
    func = callback;
    args = args;
    dispatch() {
      (this.func).apply(null, ...args as []);
    }
  }
  _asyncLoad.push((new AsyncCallback()) as unknown as never);
  return AsyncCallback;
}

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