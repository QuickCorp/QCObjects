    /**
     * Returns the object or function name
     *
     * @param Object or function
     */
    export const ObjectName = function (o:any) {
        var ret = "";
        if (typeof o === "function" && Object.hasOwnProperty.call(o, "name") && o.name !== "") {
          ret = o.name;
        } else if (typeof o !== "undefined" && typeof o.constructor === "function" && o.constructor.name !== "") {
          ret = o.constructor.name;
        } else if (typeof o !== "undefined" && typeof o.constructor === "object") {
          ret = o.constructor.toString().replace(/\[(.*?)\]/g, "$1").split(" ").slice(1).join("");
        }
        return ret;
      };