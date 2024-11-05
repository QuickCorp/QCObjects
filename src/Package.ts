import { InheritClass } from "./InheritClass";
import { __is_raw_class__ } from "./is_raw_class";
import { _QC_PACKAGES } from "./PrimaryCollections";
import { __register_class__ } from "./RegisterClass";

/**
 * Defines a package for Class classification
 *
 * @param {Object} namespace
 * @param {Object} classes
 */
export const Package = function (namespace: string, classes: any[] = []): any[] | undefined {
  if (Object.hasOwn(_QC_PACKAGES, namespace) &&
    typeof (_QC_PACKAGES as any)[namespace] !== "undefined" &&
    Object.hasOwn((_QC_PACKAGES as any)[namespace], "length") &&
    (_QC_PACKAGES as any)[namespace].length > 0 &&
    typeof classes !== "undefined" &&
    Object.hasOwn(classes, "length") &&
    classes.length > 0
  ) {
    classes.filter(
      function (_c1) {
        return __is_raw_class__(_c1);
      }
    ).map(<T>(_class_: any): T => {
      if (typeof _class_.__definition === "undefined") {
        _class_.__definition = {};
      }
    _class_.__definition.__namespace = namespace;
      _class_.__namespace = namespace;
      return _class_ as T;
    });
    (_QC_PACKAGES as any)[namespace] = (_QC_PACKAGES as any)[namespace].concat(classes);
  } else if (typeof classes !== "undefined") {
    if (typeof classes === "object" && Object.hasOwn(classes, "length")) {
      classes.filter(
        function (_c1) {
          return __is_raw_class__(_c1);
        }
      ).map(<T>(_class_: any): T => {
        if (typeof _class_.__definition === "undefined") {
          _class_.__definition = {};
        }
        _class_.__definition.__namespace = namespace;
        _class_.__namespace = namespace;
        return _class_ as T;
      });
    } else if ((classes as any).prototype instanceof InheritClass) {
      if (typeof (classes as any).__definition === "undefined") {
        (classes as any).__definition = {};
      }
    (classes as any).__definition.__namespace = namespace;
      (classes as any).__namespace = namespace;
    }
    (_QC_PACKAGES as any)[namespace] = classes;
  }
  if (Object.hasOwn(_QC_PACKAGES, namespace)) {
    (_QC_PACKAGES as any)[namespace].map(<T>(_class_: any): T => {
      __register_class__(_class_, namespace);
      return _class_ as T;
    });
  }
  return ((Object.hasOwn(_QC_PACKAGES, namespace)) ? ((_QC_PACKAGES as any)[namespace]) : (undefined)) as any[] | undefined;
};
Package.prototype.toString = function () {
  return "Package(namespace, classes) { [QCObjects native code] }";
};