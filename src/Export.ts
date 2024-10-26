import { __make_global__ } from "./make_global";

export const Export = function (f:any) {
    return __make_global__(f);
  };
  Export.prototype.toString = function () {
    return "Export(function or symbol) { [QCObjects native code] }";
  };
