import { __is_raw_class__ } from "./is_raw_class";
import {_QC_PACKAGES, set_QC_PACKAGE, __register_class__ } from "./PrimaryCollections";

/**
 * Defines a package for Class classification
 *
 * @param {Object} namespace
 * @param {Object} classes
 */
export const Package = (namespace: string, classes: any[] = []): any[] => {

  if (Object.hasOwn(_QC_PACKAGES, namespace) &&
    typeof _QC_PACKAGES[namespace] !== "undefined" &&
    typeof _QC_PACKAGES[namespace] !== "string" &&
    Object.hasOwn(_QC_PACKAGES[namespace], "length") &&
    _QC_PACKAGES[namespace].length > 0 &&
    typeof classes !== "undefined" &&
    Object.hasOwn(classes, "length") &&
    classes.length > 0
  ) {
    classes.forEach((_class_: any) => {
      __register_class__(_class_, namespace);
    });
    set_QC_PACKAGE(namespace, _QC_PACKAGES[namespace].concat(classes));
  } else if (typeof classes !== "undefined"
    && typeof classes !== "undefined"
    && Object.hasOwn(classes, "length")
    && classes.length > 0) {
    classes.forEach((_class_: any) => {
      __register_class__(_class_, namespace);
    });
    set_QC_PACKAGE(namespace, classes);
  } else if (__is_raw_class__(classes)) {
    if (typeof (classes as any).__definition === "undefined") {
      (classes as any).__definition = {};
    }
    (classes as any).__definition.__namespace = namespace;
    (classes as any).__namespace = namespace;
    __register_class__(classes, namespace);
    set_QC_PACKAGE(namespace, [classes]);
  } else {
    throw new Error (`An error ocurred. It was not possible to add classes to ${namespace}.`);
  }
  return ((Object.hasOwn(_QC_PACKAGES, namespace)) ? (_QC_PACKAGES[namespace]) : []) as any[] | [];
};
