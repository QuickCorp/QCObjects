import { ClassFactory } from "./ClassFactory";
import { InheritClass } from "./InheritClass";
import { logger } from "./Logger";
import { Package } from "./Package";
export class Toggle extends InheritClass {
  _toggle = false;
  _inverse = true;
  _positive:Function|null = null;
  _negative:Function|null = null;
  _dispatched:Function|null = null;
  _args = {};

  constructor(positive: Function, negative: Function, args: Array<any>) {
    super({positive, negative, args});
    this._new_({positive, negative, args});
  }

  changeToggle() {
    this._toggle = (this._toggle) ? (false) : (true);
  }

  _new_({
    positive,
    negative,
    args
  }:{positive: Function, negative: Function, args: Array<any>}) {
    this._positive = positive;
    this._negative = negative;
    this._args = args;
  }

  fire():Promise<Toggle> {
    var toggle = this;
    var _promise = new Promise<Toggle>(function (resolve, reject) {

      if (typeof toggle._positive === "function" && typeof toggle._negative === "function") {
        if (toggle._inverse) {
          toggle._dispatched = (toggle._toggle) ? (toggle._negative.bind(toggle)) : (toggle._positive.bind(toggle));
        } else {
          toggle._dispatched = (toggle._toggle) ? (toggle._positive.bind(toggle)) : (toggle._negative.bind(toggle));
        }
        toggle._dispatched?.call(toggle, toggle._args);
        resolve.call(_promise, toggle);
      } else {
        logger.debug("Toggle functions are not declared");
        reject.call(_promise, toggle as Toggle);
      }
      return toggle;
    }).then(function (toggle:Toggle) {
      toggle.changeToggle();
      return toggle;
    }).catch(function (e) {
      logger.debug(e.toString());
      return toggle;
    }).finally(()=> {
      return toggle;
    });
    return _promise;
  }


}

Package("com.qcobjects.tools.essentials", [
  Toggle
]);
