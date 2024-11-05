"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDO = void 0;
const Export_1 = require("./Export");
const InheritClass_1 = require("./InheritClass");
const Logger_1 = require("./Logger");
const ObjectName_1 = require("./ObjectName");
/**
 * Dynamic Data Objects Class
 * Usage:
 * Class('TestDDO',{
 *    data: {},
 *    _new_ (){
 *        this.ddo = New(DDO,{
 *            instance:this,
 *            name:'data',
 *            value:{},
 *            fget (value){
 *                logger.debug('returned value '+ value );
 *            }
 *            })
 *    }
 * });
 *
 */
class DDO extends InheritClass_1.InheritClass {
    constructor({ instance, name, fget, fset, value }) {
        super({
            instance,
            name,
            fget,
            fset,
            value
        });
        this._new_({
            instance,
            name,
            fget,
            fset,
            value
        });
    }
    _new_({ instance, name, fget, fset }) {
        const ddoInstance = this;
        var name = (typeof name === "undefined") ? ((0, ObjectName_1.ObjectName)(ddoInstance)) : (name);
        Object.defineProperty(instance, name, {
            set(val) {
                const _value = val;
                Logger_1.logger.debug("value changed " + name);
                let ret;
                if (typeof fset !== "undefined" && typeof fset === "function") {
                    ret = fset(_value);
                }
                else {
                    ret = _value;
                }
                instance["_" + name] = ret;
            },
            get() {
                const _value = instance["_" + name];
                Logger_1.logger.debug("returning value " + name);
                const is_ddo = (v) => {
                    if (typeof v === "object" && Object.hasOwn(v, "value")) {
                        return v.value;
                    }
                    return v;
                };
                let ret;
                if (typeof fget !== "undefined" && typeof fget === "function") {
                    ret = fget(is_ddo(_value));
                }
                else {
                    ret = is_ddo(_value);
                }
                return ret;
            }
        });
    }
}
exports.DDO = DDO;
(0, Export_1.Export)(DDO);
