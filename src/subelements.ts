import { QCObjectsElement } from "types/global";

export const subelements = function subelements(query: string): Array<any> {
  return [...this.querySelectorAll(query)];
};