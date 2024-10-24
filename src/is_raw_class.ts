export const __is_raw_class__ = function (o_c) {
    return (typeof o_c === "function" && o_c.toString().startsWith("class")) ? (true) : (false);
  };
