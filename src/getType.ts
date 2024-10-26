import { __is_raw_class__ } from "./is_raw_class";
import { ObjectName } from "./ObjectName";

    /**
     * Determine the type of the Object for any QCObjects Object
     *
     * @param {Object} object
     */
    export const __getType__ = function __getType__(o_c:any):any {
        let _ret_ = "";
        switch (true) {
          case __is_raw_class__(o_c) && !!o_c.name:
            _ret_ = o_c.name;
            break;
          case typeof o_c === "object" &&
            (!!o_c.constructor &&
              !!o_c.constructor.name)
            && o_c.constructor.name !== "":
            _ret_ = o_c.constructor.name;
            break;
          case (!!o_c && !!o_c.__classType) && o_c.__classType !== "":
            _ret_ = o_c.__classType;
            break;
          case (!!o_c && !!o_c.__definition) && (!!o_c.__definition.__classType) && o_c.__definition.__classType !== "":
            _ret_ = o_c.__definition.__classType;
            break;
          case typeof o_c === "function" && !!o_c.name:
            _ret_ = o_c.name;
            break;
          default:
            _ret_ = ObjectName(o_c);
            break;
        }
        return _ret_;
      };
  