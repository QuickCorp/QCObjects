import { isQCObjects_Class } from "./isQCObjects";
import { _QC_PACKAGES } from "./PrimaryCollections";
import { __register_class__ } from "./RegisterClass";

    /**
     * Defines a package for Class classification
     *
     * @param {Object} namespace
     * @param {Object} classes
     */
    export const Package = function (namespace:string, classes:any[] = []) {
        if (_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, namespace) &&
          typeof (_QC_PACKAGES as any)[namespace] !== "undefined" &&
          (_QC_PACKAGES as any)[namespace].hasOwnProperty.call((_QC_PACKAGES as any)[namespace], "length") &&
          (_QC_PACKAGES as any)[namespace].length > 0 &&
          typeof classes !== "undefined" &&
          classes.hasOwnProperty.call(classes, "length") &&
          classes.length > 0
        ) {
          classes.filter(
            function (_c1) {
              return isQCObjects_Class(_c1);
            }
          ).map(function (_class_) {
            _class_.__definition.__namespace = namespace;
            _class_.__namespace = namespace;
          });
          (_QC_PACKAGES as any)[namespace] = (_QC_PACKAGES as any)[namespace].concat(classes);
        } else if (typeof classes !== "undefined") {
          if (typeof classes === "object" && classes.hasOwnProperty.call(classes, "length")) {
            classes.filter(
              function (_c1) {
                return isQCObjects_Class(_c1);
              }
            ).map(function (_class_) {
              _class_.__definition.__namespace = namespace;
              _class_.__namespace = namespace;
            });
          } else if (isQCObjects_Class(classes)) {
            (classes as any).__definition.__namespace = namespace;
            (classes as any).__namespace = namespace;
          }
          (_QC_PACKAGES as any)[namespace] = classes;
        }
        if (Object.hasOwnProperty.call(_QC_PACKAGES, namespace)) {
          (_QC_PACKAGES as any)[namespace].map(function (_class_:any) {
            __register_class__(_class_, namespace);
          });
        }
        return (Object.hasOwnProperty.call(_QC_PACKAGES, namespace)) ? ((_QC_PACKAGES as any)[namespace]) : (undefined);
      };
      Package.prototype.toString = function () {
        return "Package(namespace, classes) { [QCObjects native code] }";
      };