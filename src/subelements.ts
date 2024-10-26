export const subelements = function subelements(this: any, query: string): any[] {
  var _self = this;
  return [..._self.querySelectorAll(query)];
};