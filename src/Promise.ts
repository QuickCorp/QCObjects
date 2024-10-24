import { _top } from "./top";
export var Promise = _top.Promise;
/**
 * Polyfilling Promise
 */
if (!("Promise" in _top)) {
    _top.Promise = function (_f) {
        var _p = {
            then() { },
            catch() { },
            _then(response) {
                this.then.call(_p, response);
            },
            _catch(response) {
                this.catch.call(_p, response);
            }
        };
        _f.call(_p, _p._then, _p._catch);
        return _p;
    };
}
