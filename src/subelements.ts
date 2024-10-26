export const subelements = function subelements(this: any, query: string): any[] {
  const _self = this;
  return [..._self.querySelectorAll(query)];
};