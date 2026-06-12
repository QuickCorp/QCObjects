import { __getType__ } from "./getType";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";
import { TViewParams } from "types";

export class View extends InheritClass {
    constructor({ component = undefined, dependencies = [] }:TViewParams) {
      super({component, dependencies});
      if (typeof this.component === "undefined" || this.component === "null") {
        throw Error(`${__getType__(this)} must be called with a component`);
      }

    }
  }

Package("com.qcobjects.views", [
    View
]);