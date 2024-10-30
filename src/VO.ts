import { InheritClass } from "./InheritClass";
import { Package } from "./Package";

export class VO extends InheritClass {}

Package("com.qcobjects.valueObjects", [
    VO
  ]);