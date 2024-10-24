import { __getType__ } from "./getType";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";

export class View extends InheritClass {
    constructor({ component = undefined, dependencies = [] }) {
      super(...arguments);
      if (typeof this.component === "undefined" || this.component === "null") {
        throw Error(`${__getType__(this)} must be called with a component`);
      }

    }
  }

Package("com.qcobjects.views", [
    View
]);