import { TAsyncLoadCallback } from "./types/global";
import { Export } from "./Export";
import { isBrowser } from "./platform";
import { _top } from "./top";

export const _asyncLoad:any[] = [];
export function asyncLoad(callback: TAsyncLoadCallback, args?: any[]): any {

  class AsyncCallback {
    func:TAsyncLoadCallback;
    args?:any[];
    constructor(callback: TAsyncLoadCallback, args: any[] = []) {
      this.func = callback;
      this.args = args;
    }    
    dispatch() {
      ((this as AsyncCallback).func as Function).apply(this, ...args as [], this);
    }
  }
  _asyncLoad.push((new AsyncCallback(callback, args)) as unknown as never);
  return AsyncCallback;
}

export const _fireAsyncLoad = ():void => {
        if (isBrowser){
            document.addEventListener("readystatechange", () => {
                if (document.readyState === "complete") {
                    // eslint-disable-next-line array-callback-return
                    _asyncLoad.map(function (fc) {
                      (fc).dispatch.call(fc);
                    });
                  }
            });
        } else if (typeof _top.global !== "undefined") {
            // eslint-disable-next-line array-callback-return
            _asyncLoad.map(function (fc) {
                (fc).dispatch.call(fc);
              });
        }
    };

Export(asyncLoad);