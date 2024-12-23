export const __is_raw_class__ = (o_c: any): boolean => {
  return !!((typeof o_c === "function" && o_c.toString().startsWith("class")));
};
