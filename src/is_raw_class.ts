export const __is_raw_class__ = function (o_c:any) {
    return !!((typeof o_c === "function" && o_c.toString().startsWith("class")));
  };
