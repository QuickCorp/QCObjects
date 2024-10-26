import { ClassFactory } from "./ClassFactory";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";
export class Toggle extends InheritClass {
  _toggle = false;
  _inverse = true;
  _positive = null;
  _negative = null;
  _dispatched = null;
  _args = {};

  constructor(...args:any[]) {
    super(args);
    this._new_(args as any);
  }

  changeToggle() {
    this._toggle = (this._toggle) ? (false) : (true);
  }

  _new_({
    positive,
    negative,
    args
  }) {
    this._positive = positive;
    this._negative = negative;
    this._args = args;
  }

  fire() {
    var toggle = this;
    var _promise = new Promise(function (resolve, reject) {

      if (typeof toggle._positive === "function" && typeof toggle._negative === "function") {
        if (toggle._inverse) {
          toggle._dispatched = (toggle._toggle) ? (toggle._negative.bind(toggle)) : (toggle._positive.bind(toggle));
        } else {
          toggle._dispatched = (toggle._toggle) ? (toggle._positive.bind(toggle)) : (toggle._negative.bind(toggle));
        }
        toggle._dispatched.call(toggle, toggle._args);
        resolve.call(_promise, toggle);
      } else {
        logger.debug("Toggle functions are not declared");
        reject.call(_promise, toggle);
      }
    }).then(function (toggle) {
      toggle.changeToggle();
    }).catch(function (e) {
      logger.debug(e.toString());
    });
    return _promise;
  }


}

Package("com.qcobjects.tools.essentials", [
  Toggle
]);
