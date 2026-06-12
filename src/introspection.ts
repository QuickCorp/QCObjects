export const _protected_code_ = (_: any): void => {
  const __oldtoString = (typeof _.prototype !== "undefined") ? (_.prototype.toString) : (function () {
    return "";
  });
  if (typeof _.prototype !== "undefined") {
    _.prototype.toString = function (): string {
      const _protected_symbols = [
        "__qcobjects__",
        "__qcobjects_sdk__",
        "__loaded__",
        "ComplexStorageCache",
        "css",
        "append",
        "attachIn",
        "debug",
        "info",
        "warn",
        "QC_Append",
        "set",
        "get",
        "done",
        "componentDone",
        "_new_",
        "__new__",
        "Class",
        "ClassFactory",
        "New",
        "Export",
        "Package",
        "Import",
        "subelements",
        "componentLoader",
        "buildComponents",
        "Controller",
        "View",
        "VO",
        "Service",
        "serviceLoader",
        "JSONService",
        "ConfigService",
        "SourceJS",
        "SourceCSS",
        "ArrayList",
        "ArrayCollection",
        "Effect",
        "Timer",
        "sum",
        "avg",
        "table",
        "max",
        "min",
        "range",
        "matrix",
        "matrix2d",
        "matrix3d",
        "unique",
        "uniqueId",
        "shortCode",
        "NamespaceRef"
      ];
      let _ret_;
      if (_protected_symbols.includes(this.name)) {
        _ret_ = this.name + "{ [QCObjects native code] }";
      } else {
        _ret_ = __oldtoString.call(this);
      }
      return _ret_ as string;
    };
  }
};
(_protected_code_)(Function);
export const _methods_ = function <T>(_: any): T[] {
  const _m = [];
  for (const i in _) {
    if ((typeof _[i]).toLowerCase() === "function") {
      _m.push(_[i]);
    }
  }
  return _m as T[];
};
