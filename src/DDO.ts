import { DDOParams } from "types/global";
import { ClassFactory } from "./ClassFactory";
import { Export } from "./Export";
import { logger } from "./Logger";
import { ObjectName } from "./ObjectName";

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
export class DDO extends ClassFactory("InheritClass") {
    constructor({
        instance,
        name,
        fget,
        fset,
        value
    }:DDOParams) {
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

    _new_({
        instance,
        name,
        fget,
        fset,
        value
    }:DDOParams) {
        var ddoInstance = this;
        var name = (typeof name === "undefined") ? (ObjectName(ddoInstance)) : (name);

        Object.defineProperty(instance, name, {
            set(val) {
                let _value = val;
                logger.debug("value changed " + name);
                var ret;
                if (typeof fset !== "undefined" && typeof fset === "function") {
                    ret = fset(_value);
                } else {
                    ret = _value;
                }
                instance["_" + name] = ret;
                return;
            },
            get() {
                let _value = instance["_" + name];
                logger.debug("returning value " + name);
                var is_ddo = function (v:any) {
                    if (typeof v === "object" && Object.hasOwnProperty.call(v, "value")) {
                        return v.value;
                    }
                    return v;
                };
                var ret;
                if (typeof fget !== "undefined" && typeof fget === "function") {
                    ret = fget(is_ddo(_value));
                } else {
                    ret = is_ddo(_value);
                }
                return ret;
            }
        });
    }

}
Export(DDO);
