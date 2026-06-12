export const subelements = function subelements<T>(this: any, query: string): T[] {
  const _self = this;
  return [..._self.querySelectorAll(query)] as T[];
};