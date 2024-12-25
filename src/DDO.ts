import { TDDOParams } from "@types";
import { Export } from "./Export";
import { InheritClass } from "./InheritClass";
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
export class DDO extends InheritClass {
    constructor({
        instance,
        name,
        fget,
        fset,
        value
    }:TDDOParams) {
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
        fset
    }:TDDOParams):void {
        const ddoInstance = this;
        var name = (typeof name === "undefined") ? (ObjectName(ddoInstance)) : (name);

        Object.defineProperty(instance, name, {
            set(val) {
                const _value = val;
                logger.debug("value changed " + name);
                let ret;
                if (typeof fset !== "undefined" && typeof fset === "function") {
                    ret = fset(_value);
                } else {
                    ret = _value;
                }
                instance["_" + name] = ret;
                
            },
            get():any {
                const _value = instance["_" + name];
                logger.debug("returning value " + name);
                const is_ddo =  (v:any):any => {
                    if (typeof v === "object" && Object.hasOwn(v, "value")) {
                        return v.value;
                    }
                    return v;
                };
                let ret;
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
