import { InheritClass } from "./InheritClass";
import { Package } from "./Package";

export class VO extends InheritClass {
    constructor() {
      super(...arguments);
    }
  }

Package("com.qcobjects.valueObjects", [
    VO
  ]);