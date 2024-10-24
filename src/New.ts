    /**
     * Creates an object from a Class definition
     *
     * @param {QC_Object} o
     * @param {Object} args
     */

    export const New = function (__class__, args) {
        args = (arguments.length > 1) ? (args) : ({});
        return (typeof __class__ === "undefined") ? (new Object()) : (new __class__(args));
      };
  
      New.prototype.toString = function () {
        return "New(QCObjectsClassName, args) { [QCObjects native code] }";
      };