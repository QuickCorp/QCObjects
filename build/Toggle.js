"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = void 0;
const InheritClass_1 = require("./InheritClass");
const Logger_1 = require("./Logger");
const Package_1 = require("./Package");
class Toggle extends InheritClass_1.InheritClass {
    _toggle = false;
    _inverse = true;
    _positive = null;
    _negative = null;
    _dispatched = null;
    _args = {};
    constructor(positive, negative, args) {
        super({ positive, negative, args });
        this._new_({ positive, negative, args });
    }
    changeToggle() {
        this._toggle = !(this._toggle);
    }
    _new_({ positive, negative, args }) {
        this._positive = positive;
        this._negative = negative;
        this._args = args;
    }
    fire() {
        const toggle = this;
        var _promise = new Promise(function (resolve, reject) {
            if (typeof toggle._positive === "function" && typeof toggle._negative === "function") {
                if (toggle._inverse) {
                    toggle._dispatched = (toggle._toggle) ? (toggle._negative.bind(toggle)) : (toggle._positive.bind(toggle));
                }
                else {
                    toggle._dispatched = (toggle._toggle) ? (toggle._positive.bind(toggle)) : (toggle._negative.bind(toggle));
                }
                toggle._dispatched?.call(toggle, toggle._args);
                resolve.call(_promise, toggle);
            }
            else {
                Logger_1.logger.debug("Toggle functions are not declared");
                reject.call(_promise, toggle);
            }
            return toggle;
        }).then(function (toggle) {
            toggle.changeToggle();
            return toggle;
        }).catch(function (e) {
            Logger_1.logger.debug(e.toString());
            return toggle;
        }).finally(() => {
            return toggle;
        });
        return _promise;
    }
}
exports.Toggle = Toggle;
(0, Package_1.Package)("com.qcobjects.tools.essentials", [
    Toggle
]);
