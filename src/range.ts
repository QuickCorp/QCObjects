import { _protected_code_ } from "./introspection";

export const range = function (start:number, stop = 0, step = 1) {
    if (stop === 0 || typeof stop === "undefined") {
      stop = start;
      start = 0;
    }
    return Array.from({
      length: (stop - start) / step + 1
    }, function (_, i) {
      return start + (i * step);
    });
  };
  (_protected_code_)(range);

