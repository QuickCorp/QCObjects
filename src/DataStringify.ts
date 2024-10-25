import { _LegacyCopy } from "./LegacyCopy";

export const _DataStringify = function (data:any) {
    const getCircularReplacer = function () {
      const seen = new WeakSet();
      let _level = 0;
      return function (key:string, value:any) {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            _level += 1;
            return (_level <= 3) ? (_LegacyCopy(value)) : (null);
          }
          seen.add(value);
        }
        return value;
      };
    };
    return JSON.stringify(data, getCircularReplacer());
  };
