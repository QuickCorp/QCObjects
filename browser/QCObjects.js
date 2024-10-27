"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/assign.ts
var require_assign = __commonJS({
  "src/assign.ts"() {
    "use strict";
    if (typeof Object.assign !== "function") {
      Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
          "use strict";
          if (target === null) {
            throw new TypeError("Cannot convert undefined or null to object");
          }
          const to = Object(target);
          for (let index = 1; index < arguments.length; index++) {
            const nextSource = arguments[index];
            if (nextSource !== null) {
              for (const nextKey in nextSource) {
                if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                  to[nextKey] = nextSource[nextKey];
                }
              }
            }
          }
          return to;
        },
        writable: true,
        configurable: true
      });
    }
  }
});

// types/global.d.ts
var require_global_d = __commonJS({
  "types/global.d.ts"(exports2, module2) {
    "use strict";
    module2.exports = global;
  }
});

// src/QCObjects.ts
var QCObjects_exports = {};
__export(QCObjects_exports, {
  default: () => QCObjects_default
});
module.exports = __toCommonJS(QCObjects_exports);
var import_assign = __toESM(require_assign());

// src/is_raw_class.ts
var __is_raw_class__ = function(o_c) {
  return !!(typeof o_c === "function" && o_c.toString().startsWith("class"));
};

// src/LegacyCopy.ts
var _LegacyCopy = function(obj) {
  let _value_;
  switch (true) {
    case typeof obj === "string":
      _value_ = obj;
      break;
    case typeof obj === "number":
      _value_ = obj;
      break;
    case typeof obj === "object":
      _value_ = Object.assign({}, obj);
      break;
    case typeof obj === "function":
      _value_ = obj.bind({});
      break;
    case __is_raw_class__(obj):
      _value_ = class extends obj {
      };
      break;
    default:
      break;
  }
  return _value_;
};

// src/DataStringify.ts
var _DataStringify = function(data) {
  const getCircularReplacer = function() {
    const seen = /* @__PURE__ */ new WeakSet();
    let _level = 0;
    return function(key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          _level += 1;
          return _level <= 3 ? _LegacyCopy(value) : null;
        }
        seen.add(value);
      }
      return value;
    };
  };
  return JSON.stringify(data, getCircularReplacer());
};

// src/platform.ts
var import_global = __toESM(require_global_d());
var isDeno = typeof window !== "undefined" && "Deno" in window;
var isBrowser = typeof window !== "undefined" && typeof window.self !== "undefined" && window === window.self && !isDeno;
var isNodeCommonJS = typeof module !== "undefined";
var deno_require = (name) => {
};
var _require_ = (name) => {
  return isDeno ? deno_require(name) : require(name);
};
var is_phonegap = /* @__PURE__ */ function() {
  return typeof import_global.cordova !== "undefined";
}();

// src/DOMCreateElement.ts
var _DOMCreateElement = function(elementName) {
  let _ret_;
  if (isBrowser) {
    _ret_ = document.createElement(elementName);
  } else {
    _ret_ = {};
  }
  return _ret_;
};

// src/introspection.ts
var _protected_code_ = function(_) {
  const __oldtoString = typeof _.prototype !== "undefined" ? _.prototype.toString : function() {
    return "";
  };
  if (typeof _.prototype !== "undefined") {
    _.prototype.toString = function() {
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
      return _ret_;
    };
  }
};
_protected_code_(Function);
var _methods_ = function(_) {
  const _m = [];
  for (const i in _) {
    if ((typeof _[i]).toLowerCase() === "function") {
      _m.push(_[i]);
    }
  }
  return _m;
};

// src/Logger.ts
var Logger = class {
  debugEnabled = true;
  infoEnabled = true;
  warnEnabled = true;
  debug(message) {
    if (this.debugEnabled) {
      console.log("\x1B[35m%s\x1B[0m", `[DEBUG][${performance.now().toLocaleString()}] ${message}`);
    }
  }
  info(message) {
    let color;
    if (this.infoEnabled) {
      if (isBrowser) {
        color = "\x1B[103m%s\x1B[0m";
      } else {
        color = "\x1B[33m%s\x1B[0m";
      }
      console.info(color, `[INFO][${performance.now().toLocaleString()}] ${message}`);
    }
  }
  warn(message) {
    if (this.warnEnabled) {
      console.warn("\x1B[31m%s\x1B[0m", `[WARN][${performance.now().toLocaleString()}] ${message}`);
    }
  }
};
var logger = new Logger();

// src/subelements.ts
var subelements = function subelements2(query) {
  const _self = this;
  return [..._self.querySelectorAll(query)];
};

// src/Cast.ts
var _Cast = function(obj_source, obj_dest) {
  for (const v in obj_source) {
    if (typeof obj_source[v] !== "undefined") {
      try {
        obj_dest[v] = obj_source[v];
      } catch (e) {
        logger.warn(`Unable to cast ${(typeof obj_source).toString()}.${typeof v.toString()} to ${(typeof obj_dest).toString()}.${typeof v.toString()}`);
      }
    }
  }
  return obj_dest;
};
var _CastProps = function(obj_source, obj_dest) {
  for (const v in obj_source) {
    if (typeof obj_source[v] !== "undefined" && typeof obj_source[v] !== "function") {
      try {
        obj_dest[v] = obj_source[v];
      } catch (e) {
      }
    } else if (typeof obj_source[v] === "function") {
      try {
        obj_dest[v] = obj_source[v].bind(obj_dest);
      } catch (e) {
        logger.warn(e);
      }
    }
  }
  return obj_dest;
};

// src/ObjectName.ts
var ObjectName = function(o) {
  let ret = "";
  if (typeof o === "function" && Object.hasOwnProperty.call(o, "name") && o.name !== "") {
    ret = o.name;
  } else if (typeof o !== "undefined" && typeof o.constructor === "function" && o.constructor.name !== "") {
    ret = o.constructor.name;
  } else if (typeof o !== "undefined" && typeof o.constructor === "object") {
    ret = o.constructor.toString().replace(/\[(.*?)\]/g, "$1").split(" ").slice(1).join("");
  }
  return ret;
};

// src/getType.ts
var __getType__ = function __getType__2(o_c) {
  let _ret_ = "";
  switch (true) {
    case (__is_raw_class__(o_c) && !!o_c.name):
      _ret_ = o_c.name;
      break;
    case (typeof o_c === "object" && (!!o_c.constructor && !!o_c.constructor.name) && o_c.constructor.name !== ""):
      _ret_ = o_c.constructor.name;
      break;
    case (!!o_c && !!o_c.__classType && o_c.__classType !== ""):
      _ret_ = o_c.__classType;
      break;
    case (!!o_c && !!o_c.__definition && !!o_c.__definition.__classType && o_c.__definition.__classType !== ""):
      _ret_ = o_c.__definition.__classType;
      break;
    case (typeof o_c === "function" && !!o_c.name):
      _ret_ = o_c.name;
      break;
    default:
      _ret_ = ObjectName(o_c);
      break;
  }
  return _ret_;
};

// src/IncrementInstanceID.ts
var __instanceID = 0;
var IncrementInstanceID = () => {
  __instanceID = typeof __instanceID === "undefined" || __instanceID === null ? 0 : __instanceID + 1;
};

// src/isQCObjects.ts
var isQCObjects_Object = function(_) {
  return !!(typeof _ === "object" && Object.hasOwnProperty.call(_, "__classType") && !!_.__instanceID && Object.hasOwnProperty.call(_, "__definition") && typeof _.__definition !== "undefined");
};
var isQCObjects_Class = function(_) {
  return !!(typeof _ === "function" && !_.__instanceID && !!_.__definition && typeof _.__definition !== "undefined" && !!_.__definition.__classType);
};

// src/is_a.ts
var is_a = function is_a2(obj, typeName) {
  return !!(typeof obj !== "undefined" && obj !== null && ((isQCObjects_Class(obj) || isQCObjects_Object(obj)) && obj.hierarchy().includes(typeName) || __getType__(obj) === typeName || ObjectName(obj) === typeName || typeof obj === typeName));
};

// src/is_forbidden_name.ts
var __is__forbidden_name__ = function(name) {
  return ["__proto__", "prototype", "Object", "Map", "defineProperty", "indexOf", "toString", "__instanceID"].indexOf(name) !== -1;
};

// src/PrimaryCollections.ts
var _QC_CLASSES = {};
var _QC_PACKAGES = {};
var _QC_PACKAGES_IMPORTED = [];
var _QC_READY_LISTENERS = [];

// src/make_global.ts
var __make_global__ = function(f) {
  if (typeof f !== "undefined") {
    if (isBrowser) {
      try {
        _top[f.name] = f;
        window[f.name] = f;
      } catch (e) {
      }
    } else if (typeof global !== "undefined") {
      if (!Object.hasOwnProperty.call(global, f.name)) {
        global[f.name] = f;
      }
    }
  }
};

// src/Class.ts
var Class = function(name = "", type = void 0, definition = void 0) {
  const _types_ = {};
  switch (arguments.length) {
    case 0:
      return class {
      };
    case 1:
      name = arguments[0];
      type = class {
      };
      definition = {};
      break;
    case 2:
      name = arguments[0];
      type = class {
      };
      definition = arguments[1];
      break;
    case 3:
      name = arguments[0];
      type = arguments[1];
      definition = arguments[2];
      break;
    default:
      break;
  }
  if (typeof type !== "function") {
    throw new Error("Class type must be a function or class");
  }
  if (__is__forbidden_name__(name)) {
    throw new Error(`${name} is not an allowed word in the name of a class`);
  }
  if (typeof type.__definition !== "undefined") {
    definition.__definition = Object.assign(_LegacyCopy(type.__definition), type);
  }
  _types_[type.name] = type;
  if (typeof definition === "undefined" || definition === null) {
    definition = {};
  } else {
    definition = _LegacyCopy(definition);
  }
  if (typeof definition.__instanceID !== "undefined") {
    delete definition.__instanceID;
  }
  _QC_CLASSES[name] = class extends _types_[type.name] {
    __classType = name;
    __definition = {
      ...definition
    };
    static hierarchy(__class__) {
      const __classType = function(o_c) {
        return Object.hasOwnProperty.call(o_c, "__classType") ? o_c.__classType : __getType__.call(__class__, o_c);
      };
      const __hierarchy__proto__ = (c) => {
        return typeof c !== "undefined" && typeof c.__proto__ !== "undefined" && c.__proto__ !== null ? (__classType(c) !== "" ? [__classType(c)] : []).concat(__hierarchy__proto__(c.__proto__)) : [];
      };
      if (typeof __class__ === "undefined" || __class__ === null) {
        __class__ = this;
      }
      let __hierarchy = [];
      __hierarchy.push(__classType(__class__));
      __hierarchy = __hierarchy.concat(__hierarchy__proto__(__class__.__proto__));
      return __hierarchy;
    }
    static getParentClass() {
      return Object.getPrototypeOf(this.prototype.constructor);
    }
    constructor() {
      let _o_;
      if (arguments.length > 0) {
        _o_ = {
          ...arguments[0]
        };
      } else {
        _o_ = {};
      }
      super(_o_);
      const self2 = this;
      IncrementInstanceID();
      if (!self2.__instanceID) {
        Object.defineProperty(self2, "__instanceID", {
          value: __instanceID,
          writable: false
        });
      }
      if (typeof self2.__definition !== "undefined") {
        Object.keys(self2.__definition).filter(function(k) {
          return isNaN(k) && !["name", "__instanceID", "__classType", "__definition"].includes(k);
        }).forEach(function(key) {
          if (typeof self2.__definition[key] === "function") {
            self2[key] = self2.__definition[key].bind(self2);
          } else {
            self2[key] = self2.__definition[key];
          }
        });
      }
      _methods_(_QC_CLASSES[self2.__classType]).map(function(m) {
        self2[m.name] = m.bind(self2);
      });
      _methods_(self2.__definition).map(function(m) {
        self2[m.name] = m.bind(self2);
      });
      if (self2.body) {
        if (typeof self2.__definition === "undefined" || !Object.hasOwnProperty.call(self2.__definition, "body") || typeof self2.__definition.body === "undefined") {
          try {
            if (isBrowser) {
              self2.body = _DOMCreateElement(self2.__definition.__classType);
            } else {
              self2.body = {};
            }
          } catch (e) {
            self2.body = {};
          }
        } else if (Object.hasOwnProperty.call(self2.__definition, "body")) {
          self2.body = self2.__definition.body;
        }
      }
      try {
        if (typeof self2.__new__ === "function") {
          self2.__new__.call(self2, _o_);
        } else if (typeof super.__new__ === "function") {
          self2.__new__ = super.__new__.bind(self2);
          self2.__new__.call(self2, _o_);
        }
        if (typeof self2 === "object" && Object.hasOwnProperty.call(self2, "_new_") && typeof self2._new_.isCalled === "undefined") {
          try {
            self2._new_(_o_);
            self2._new_.isCalled = true;
          } catch (e) {
            logger.warn(`${self2.__classType}._new_() failed with error: ${e}`);
          }
        }
      } catch (e) {
        logger.warn(e);
      }
    }
    __new__(_o_) {
      _CastProps(_o_, this);
    }
    _new_(_o_) {
    }
    getClass() {
      return Object.getPrototypeOf(this.constructor);
    }
    css(_css) {
      if (typeof this.body !== "undefined" && this.body.style !== "undefined") {
        logger.debug("body style");
        this.body.style = _Cast(_css, this.body.style);
      }
      return this.body.style;
    }
    hierarchy() {
      const __instance__ = this;
      return this.getClass().hierarchy(__instance__);
    }
    append(child) {
      logger.debug("append: start");
      if (is_a(child, "Component")) {
        logger.debug("append: child is a Component");
        logger.debug(`appending the body of ${child.name}`);
      }
      var child = arguments.length > 0 ? arguments[0] : this.body;
      if (typeof this.body !== "undefined") {
        logger.debug("append element");
        if (arguments.length > 0) {
          logger.debug("append to element");
          this.body.append(child);
          if (typeof this.childs === "undefined") {
            this.childs = [];
          }
          this.childs.push(child);
        } else {
          if (isBrowser) {
            logger.debug("append to body");
            document.body.append(child);
          }
        }
      }
    }
    attachIn(tag) {
      if (isBrowser) {
        const tags = document.subelements(tag);
        for (let i = 0, j = tags.length; i < j; i++) {
          tags[i].append(this);
        }
      } else {
        throw new Error("attachIn not yet implemented for non browser platforms");
      }
    }
  };
  _QC_CLASSES[name] = _CastProps(definition, _QC_CLASSES[name]);
  _QC_CLASSES[name].__definition = definition;
  _QC_CLASSES[name].__definition.__classType = name;
  _QC_CLASSES[name].__definition.__new__ = function __new__(_o_) {
    _CastProps(_o_, this);
  };
  __make_global__(_QC_CLASSES[name]);
  return _QC_CLASSES[name];
};
Class.prototype.toString = function() {
  return "Class(name, type, definition) { [QCObjects native code] }";
};

// src/RegisterClass.ts
var __register_class__ = function(_class_, __namespace) {
  const name = _class_.name || __getType__(_class_);
  if (typeof _class_.__definition === "undefined") {
    _class_.__definition = {};
  }
  _class_.__definition.__classType = name;
  if (typeof __namespace !== "undefined") {
    _class_.__definition.__namespace = __namespace;
  }
  _QC_CLASSES[name] = _class_;
  __make_global__(_QC_CLASSES[name]);
  return _QC_CLASSES[name];
};
var RegisterClass = function(_class_, __namespace) {
  return __register_class__(_class_, __namespace);
};
__make_global__(RegisterClass);

// src/Package.ts
var Package = function(namespace, classes = []) {
  if (_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, namespace) && typeof _QC_PACKAGES[namespace] !== "undefined" && _QC_PACKAGES[namespace].hasOwnProperty.call(_QC_PACKAGES[namespace], "length") && _QC_PACKAGES[namespace].length > 0 && typeof classes !== "undefined" && classes.hasOwnProperty.call(classes, "length") && classes.length > 0) {
    classes.filter(
      function(_c1) {
        return isQCObjects_Class(_c1);
      }
    ).map(function(_class_) {
      _class_.__definition.__namespace = namespace;
      _class_.__namespace = namespace;
    });
    _QC_PACKAGES[namespace] = _QC_PACKAGES[namespace].concat(classes);
  } else if (typeof classes !== "undefined") {
    if (typeof classes === "object" && classes.hasOwnProperty.call(classes, "length")) {
      classes.filter(
        function(_c1) {
          return isQCObjects_Class(_c1);
        }
      ).map(function(_class_) {
        _class_.__definition.__namespace = namespace;
        _class_.__namespace = namespace;
      });
    } else if (isQCObjects_Class(classes)) {
      classes.__definition.__namespace = namespace;
      classes.__namespace = namespace;
    }
    _QC_PACKAGES[namespace] = classes;
  }
  if (Object.hasOwnProperty.call(_QC_PACKAGES, namespace)) {
    _QC_PACKAGES[namespace].map(function(_class_) {
      __register_class__(_class_, namespace);
    });
  }
  return Object.hasOwnProperty.call(_QC_PACKAGES, namespace) ? _QC_PACKAGES[namespace] : void 0;
};
Package.prototype.toString = function() {
  return "Package(namespace, classes) { [QCObjects native code] }";
};

// src/ClassFactory.ts
var ClassFactory = function(className) {
  let _classFactory;
  if (className !== null && className.indexOf(".") > -1) {
    const packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
    const _className = className.split(".").slice(-1).join("");
    const _package = Package(packageName);
    const packageClasses = typeof _package !== "undefined" ? _package.filter((classFactory) => {
      return isQCObjects_Class(classFactory) && (classFactory.__definition.__classType === _className || typeof classFactory === "function" && !!classFactory.name);
    }).reverse() : [];
    if (packageClasses.length > 0) {
      _classFactory = packageClasses[0];
    } else {
      throw Error(`Class ${className} not found.`);
    }
  } else if (className !== null && Object.hasOwnProperty.call(_QC_CLASSES, className)) {
    _classFactory = _QC_CLASSES[className];
  }
  return _classFactory;
};

// src/basePath.ts
var _basePath_ = function() {
  let _basePath = "";
  if (isBrowser) {
    const baseURI = document.baseURI.split("?")[0].split("/");
    baseURI.pop();
    _basePath = baseURI.join("/") + "/";
  } else {
    let process2;
    try {
      process2 = _require_("process");
    } catch (e) {
    }
    if (typeof process2 !== "undefined") {
      _basePath = `${process2.cwd()}/`;
    } else {
      _basePath = "";
    }
  }
  return _basePath;
}();
var setBasePath = (value) => {
  _basePath_ = value;
};

// src/Base64.ts
var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  encode(e) {
    let t = "";
    let n, r, i, s, o, u, a;
    let f = 0;
    e = Base64._utf8_encode(e);
    while (f < e.length) {
      n = e.charCodeAt(f++);
      r = e.charCodeAt(f++);
      i = e.charCodeAt(f++);
      s = n >> 2;
      o = (n & 3) << 4 | r >> 4;
      u = (r & 15) << 2 | i >> 6;
      a = i & 63;
      if (isNaN(r)) {
        u = a = 64;
      } else if (isNaN(i)) {
        a = 64;
      }
      t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
    }
    return t;
  },
  decode(e) {
    let t = "";
    let n, r, i;
    let s, o, u, a;
    let f = 0;
    e = e.replace(/[^A-Za-z0-9+/=]/g, "");
    while (f < e.length) {
      s = this._keyStr.indexOf(e.charAt(f++));
      o = this._keyStr.indexOf(e.charAt(f++));
      u = this._keyStr.indexOf(e.charAt(f++));
      a = this._keyStr.indexOf(e.charAt(f++));
      n = s << 2 | o >> 4;
      r = (o & 15) << 4 | u >> 2;
      i = (u & 3) << 6 | a;
      t = t + String.fromCharCode(n);
      if (u !== 64) {
        t = t + String.fromCharCode(r);
      }
      if (a !== 64) {
        t = t + String.fromCharCode(i);
      }
    }
    t = Base64._utf8_decode(t);
    return t;
  },
  _utf8_encode(e) {
    e = e.replace(/rn/g, "n");
    let t = "";
    for (let n = 0; n < e.length; n++) {
      const r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
      } else if (r > 127 && r < 2048) {
        t += String.fromCharCode(r >> 6 | 192);
        t += String.fromCharCode(r & 63 | 128);
      } else {
        t += String.fromCharCode(r >> 12 | 224);
        t += String.fromCharCode(r >> 6 & 63 | 128);
        t += String.fromCharCode(r & 63 | 128);
      }
    }
    return t;
  },
  _utf8_decode(e) {
    let t = "";
    let n = 0;
    let r = 0;
    let c2 = 0;
    let c3;
    while (n < e.length) {
      r = e.charCodeAt(n);
      if (r < 128) {
        t += String.fromCharCode(r);
        n++;
      } else if (r > 191 && r < 224) {
        c2 = e.charCodeAt(n + 1);
        t += String.fromCharCode((r & 31) << 6 | c2 & 63);
        n += 2;
      } else {
        c2 = e.charCodeAt(n + 1);
        c3 = e.charCodeAt(n + 2);
        t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
        n += 3;
      }
    }
    return t;
  }
};

// src/InheritClass.ts
var InheritClass = Class("InheritClass", class {
}, {});

// src/New.ts
var New = function(__class__, args = {}) {
  args = arguments.length > 1 ? args : {};
  return typeof __class__ === "undefined" ? new Object() : new __class__(args);
};
New.prototype.toString = function() {
  return "New(QCObjectsClassName, args) { [QCObjects native code] }";
};

// src/secretKey.ts
var _secretKey = isBrowser ? location.host : "secret";

// src/Crypt.ts
var _Crypt = class extends InheritClass {
  last_string = "";
  last_key = "";
  construct = false;
  _new_(o) {
    const string = o.string;
    let key = o.hasOwnProperty.call(o, "key") ? o.key : null;
    this.__new__(o);
    key = key === null ? this.__instanceID : key;
    this.last_key = key;
    this.last_string = string;
    this.construct = true;
  }
  _encrypt() {
    const string = this.string;
    const key = this.key;
    let result = "";
    let char;
    let keychar;
    for (let i = 0; i < string.length; i++) {
      char = string.substr(i, 1);
      keychar = key.substr(i % key.length - 1, 1);
      char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
      result += char;
    }
    this.last_string = Base64.encode(result);
    return this.last_string;
  }
  _decrypt() {
    let string = this.string;
    const key = this.key;
    let result = "";
    let char;
    let keychar;
    string = Base64.decode(string);
    for (let i = 0; i < string.length; i++) {
      char = string.substr(i, 1);
      keychar = key.substr(i % key.length - 1, 1);
      char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
      result += char;
    }
    this.last_string = result;
    return this.last_string;
  }
  encrypt(string, key) {
    const crypt = New(ClassFactory("_Crypt"), {
      string,
      key: key !== "" ? key : "12345678ABC"
    });
    return crypt._encrypt();
  }
  decrypt(string, key) {
    const crypt = New(ClassFactory("_Crypt"), {
      string,
      key: key !== "" ? key : "12345678ABC"
    });
    return crypt._decrypt();
  }
};
var _CryptObject = function(o) {
  return ClassFactory("_Crypt").encrypt(_DataStringify(o), _secretKey);
};
var _DecryptObject = function(s) {
  return s === "" ? {} : JSON.parse(ClassFactory("_Crypt").decrypt(s, _secretKey));
};
Package("com.qcobjects", [_Crypt]);

// src/Processor.ts
var Processor = class _Processor extends InheritClass {
  __definition = {};
  __classType = "Processor";
  static processors = {
    "config"(component, arg) {
      return CONFIG.get(arg, "");
    },
    "ENV"(component, arg) {
      return typeof process !== "undefined" ? process.env[arg] : "";
    },
    "global"(component, arg) {
      return typeof _top !== "undefined" ? _top[arg] : "";
    }
  };
  static setProcessor(_proc_) {
    if (typeof _proc_ === "function" && _proc_.name !== "") {
      this.processors[_proc_.name] = _proc_;
    }
  }
  constructor({ component }) {
    super({ component });
    this.processors = _Processor.processors;
    this.process = _Processor.process.bind(this);
    this.processObject = _Processor.processObject.bind(this);
    this.setProcessor = _Processor.setProcessor.bind(this);
    this.execute = _Processor.execute.bind(this);
  }
  __instanceID;
  __new__() {
    throw new Error("Method not implemented.");
  }
  __namespace;
  body;
  component;
  processors;
  process(template, component) {
    throw new Error("Method not implemented.");
  }
  processObject(obj, component) {
    throw new Error("Method not implemented.");
  }
  setProcessor(proc) {
    throw new Error("Method not implemented.");
  }
  static execute(component, processorName, args) {
    const processorHandler = typeof component !== "undefined" && component !== null ? component.processorHandler : this;
    return processorHandler?.processors[processorName].bind(processorHandler).apply(processorHandler, [component, args?.split(",")]);
  }
  static process(template, component = null) {
    const processorHandler = component !== null ? component.processorHandler : New(_Processor, { component: null });
    if (typeof template === "string") {
      Object.keys(processorHandler.processors).map(function(funcName) {
        [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(
          function(procesorMatch) {
            const match0 = `$${funcName}(${procesorMatch[1]})`;
            template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
          }
        );
      });
    }
    return template;
  }
  static processObject(obj, component = null) {
    let __instance__ = component === null ? this : component.processorHandler;
    if (typeof __instance__ === "undefined") {
      __instance__ = new _Processor({ component });
    }
    if (typeof obj === "object") {
      Object.keys(obj).map(
        function(_k) {
          if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
            obj[_k] = __instance__?.processObject.bind(__instance__)(obj[_k], component);
          } else if (typeof obj[_k] === "string") {
            obj[_k] = __instance__?.process.bind(__instance__)(obj[_k], component);
          }
        }
      );
    } else if (typeof obj === "string") {
      obj = __instance__.process.bind(__instance__)(obj, component);
    }
    return obj;
  }
};
Processor.__definition = {};
Processor.__classType = "Processor";
RegisterClass(Processor, "com.qcobjects");
__make_global__(Processor);

// src/CONFIG.ts
var CONFIG = class extends InheritClass {
  get _CONFIG_ENC() {
    return ClassFactory("ConfigSettings")?.instance?._CONFIG_ENC;
  }
  get _CONFIG() {
    return ClassFactory("ConfigSettings").instance._CONFIG;
  }
  set(name, value) {
    logger.debug(`CONFIG.set  ${name}: ${value}`);
    if (name === "basePath") {
      setBasePath(value);
    }
    let _conf;
    try {
      _conf = function(config) {
        if (config._CONFIG_ENC === null) {
          config._CONFIG_ENC = _Crypt.encrypt(_DataStringify({}), _secretKey);
        }
        const _protectedEnc = config._CONFIG_ENC.valueOf();
        const _protectedConf = config._CONFIG.valueOf();
        return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
      }(ClassFactory("ConfigSettings").instance);
    } catch (e) {
      _conf = {};
      console.error(e);
      logger.debug("failed to encrypt config");
    }
    _conf[name] = value;
    ClassFactory("ConfigSettings").instance._CONFIG_ENC = _CryptObject(_conf);
    if (Object.hasOwnProperty.call(ClassFactory("ConfigSettings").instance, "_CONFIG") && Object.hasOwnProperty.call(ClassFactory("ConfigSettings").instance._CONFIG, name)) {
      ClassFactory("ConfigSettings").instance._CONFIG[name] = value;
    }
  }
  get(name, _default) {
    let _value;
    try {
      const _conf = function(config) {
        if (config._CONFIG_ENC === null) {
          config._CONFIG_ENC = ClassFactory("_Crypt").encrypt(_DataStringify({}), _secretKey);
        }
        const _protectedEnc = config._CONFIG_ENC.valueOf();
        const _protectedConf = config._CONFIG.valueOf();
        return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
      }(ClassFactory("ConfigSettings").instance);
      if (typeof _conf[name] !== "undefined") {
        _value = _conf[name];
      } else if (typeof _default !== "undefined") {
        _value = _default;
      }
    } catch (e) {
      console.error(e);
      logger.debug("Something wrong when trying to get CONFIG values");
      logger.debug("No config value for: " + name);
      _value = _default;
    }
    return Processor.processObject.call(Processor, _value);
  }
};
Package("com.qcobjects", [CONFIG]);

// src/tag_filter.ts
var _tag_filter_ = "quick-component:not([loaded]),component:not([loaded])";

// src/ComponentFactory.ts
var ComponentURI = ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }) => {
  const templateURI = TPL_SOURCE === "default" ? `${COMPONENTS_BASE_PATH}${COMPONENT_NAME}.${TPLEXTENSION}` : "";
  return templateURI;
};
var _buildComponentFromElement_ = function(element, __parent__) {
  const __shadowed_not_set = element.getAttribute("shadowed") === null;
  const __tplsource_attr_not_set = element.getAttribute("template-source") === null;
  const shadowed = element.getAttribute("shadowed") === "true";
  const __cached_not_set = element.getAttribute("cached") === null;
  const cached = element.getAttribute("cached") === "true";
  let tplextension = typeof CONFIG.get("tplextension") !== "undefined" ? CONFIG.get("tplextension") : "html";
  tplextension = element.getAttribute("tplextension") !== null ? element.getAttribute("tplextension") : tplextension;
  let _componentName = element.getAttribute("name");
  const _componentClassName = element.getAttribute("componentClass") !== null ? element.getAttribute("componentClass") : "Component";
  const __componentClassName = CONFIG.get("preserveComponentBodyTag") ? _componentName !== null ? "com.qcobjects.components." + _componentName + ".ComponentBody" : "com.qcobjects.components.ComponentBody" : _componentClassName;
  _componentName = _componentName !== null ? _componentName : ClassFactory(__componentClassName) && typeof ClassFactory(__componentClassName).name !== "undefined" ? ClassFactory(__componentClassName).name : "";
  const __classDefinition = ClassFactory(__componentClassName);
  const __tplsource_prop_set = !!(__componentClassName !== "Component" && (typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string" && __classDefinition.tplsource !== ""));
  const tplsource = __tplsource_attr_not_set && __tplsource_prop_set ? __classDefinition.tplsource : __tplsource_attr_not_set ? "default" : element.getAttribute("template-source");
  logger.debug(`template source for  ${_componentName} is ${tplsource} `);
  logger.debug(`type for ${_componentName} is ${__getType__(__classDefinition)} `);
  let componentURI;
  componentURI = ComponentURI({
    "COMPONENTS_BASE_PATH": CONFIG.get("componentsBasePath"),
    "COMPONENT_NAME": _componentName,
    "TPLEXTENSION": tplextension,
    "TPL_SOURCE": tplsource
  });
  if (CONFIG.get("preserveComponentBodyTag")) {
    Package(_componentName !== "" ? "com.qcobjects.components." + _componentName : "com.qcobjects.components", [
      Class("ComponentBody", ClassFactory("Component"), {
        name: _componentName,
        tplsource,
        tplextension,
        reload: true
      })
    ]);
  }
  const __create_component_instance_ = function() {
    const __shadowed = __shadowed_not_set ? __classDefinition && __classDefinition.shadowed || ClassFactory("Component").shadowed : shadowed;
    const __definition = {
      __parent__,
      name: _componentName,
      cached: __cached_not_set ? ClassFactory("Component").cached : cached,
      shadowed: __shadowed,
      tplextension,
      body: CONFIG.get("preserveComponentBodyTag") ? _DOMCreateElement("componentBody") : element,
      templateURI: componentURI,
      tplsource
    };
    if (typeof _componentName === "undefined" || _componentName === "" || _componentName === null) {
      delete __definition.name;
    }
    if (componentURI === "") {
      delete __definition.templateURI;
    }
    const newComponent2 = New(__classDefinition, __definition);
    if (CONFIG.get("preserveComponentBodyTag")) {
      element.append(newComponent2);
    }
    return newComponent2;
  };
  const newComponent = __create_component_instance_();
  return newComponent;
};
var _buildComponentsFromElements_ = function(elements, __parent__) {
  let componentsBuiltWith = [];
  if (isBrowser) {
    componentsBuiltWith = elements.map(
      function(element) {
        return _buildComponentFromElement_(element, __parent__);
      }
    );
  } else {
    logger.debug("[_buildComponentsFromElements_] not implemented for Non-Browser environments");
  }
  return componentsBuiltWith;
};
var buildComponents = (element, rebuildObjects = false) => {
  const tagFilter = _tag_filter_;
  const elements = element.subelements(tagFilter);
  return _buildComponentsFromElements_(elements, null);
};

// src/top.ts
var _top = typeof self !== "undefined" && self || typeof window !== "undefined" && window || typeof global !== "undefined" && global || void 0;
_top.lastCache = void 0;
var componentsStack = [];
var resetTop = (_top_) => {
  _top = _top_;
};
var buildComponentsStack = () => {
  componentsStack = buildComponents(document);
};

// src/Export.ts
var Export = function(f) {
  return __make_global__(f);
};
Export.prototype.toString = function() {
  return "Export(function or symbol) { [QCObjects native code] }";
};

// src/asyncLoad.ts
var _asyncLoad = [];
function asyncLoad(callback, args) {
  class AsyncCallback {
    func = callback;
    args = args;
    dispatch() {
      this.func.apply(null, ...args);
    }
  }
  _asyncLoad.push(new AsyncCallback());
  return AsyncCallback;
}
var _fireAsyncLoad = function() {
  if (isBrowser) {
    document.addEventListener("readystatechange", () => {
      if (document.readyState === "complete") {
        _asyncLoad.map(function(fc) {
          fc.dispatch.call(fc);
        });
      }
    });
  } else if (typeof _top.global !== "undefined") {
    _asyncLoad.map(function(fc) {
      fc.dispatch.call(fc);
    });
  }
};
Export(asyncLoad);

// src/ComplexStorageCache.ts
var ComplexStorageCache = class {
  constructor(params) {
    let object, load, alternate;
    object = params.index;
    if (typeof object !== "undefined") {
      load = params.load;
      alternate = params.alternate;
      const cachedObjectID = this.getID(object);
      const cachedResponse = localStorage.getItem(cachedObjectID);
      if (this.isEmpty(cachedResponse)) {
        const cachedNewResponse = load.call(null, {
          cachedObjectID,
          cachedResponse,
          "cache": this
        });
        this.save(object, cachedNewResponse);
        logger.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID));
      } else {
        const alternateResponse = alternate.call(null, {
          cachedObjectID,
          cachedResponse,
          "cache": this
        });
        logger.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID));
      }
    } else {
      throw new Error("ComplexStorageCache: index is undefined");
    }
    return this;
  }
  getItem(cachedObjectID) {
    const retrievedObject = localStorage.getItem(cachedObjectID);
    if (!this.isEmpty(retrievedObject)) {
      return JSON.parse(retrievedObject);
    } else {
      return null;
    }
  }
  setItem(cachedObjectID, value) {
    localStorage.setItem(cachedObjectID, _DataStringify(value));
  }
  isEmpty(object) {
    let r = false;
    switch (true) {
      case typeof object === "undefined":
      case (typeof object === "string" && object === ""):
      case (typeof object === "string" && object === "undefined"):
      case (typeof object === "number" && object === 0):
      case object === null:
        r = true;
        break;
      default:
        r = false;
    }
    return r;
  }
  getID(object) {
    let cachedObjectID;
    if (typeof object !== "undefined") {
      cachedObjectID = "cachedObject_" + Base64.encode(_DataStringify(object).replace(/\{|\}|,/g, "_"));
    }
    return cachedObjectID;
  }
  save(object, cachedNewResponse) {
    const cachedObjectID = this.getID(object);
    logger.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID));
    this.setItem(cachedObjectID, cachedNewResponse);
  }
  getCached(object) {
    const cachedObjectID = this.getID(object);
    return this.getItem(cachedObjectID);
  }
  clear() {
    Object.keys(localStorage).filter(function(k) {
      return k.startsWith("cachedObject_");
    }).map(function(c) {
      localStorage.removeItem(c);
    });
  }
};

// src/waitUntil.ts
var waitUntil = function(func, exp) {
  const _waitUntil = function(func2, exp2) {
    const maxWaitCycles = 2e3;
    let _w = 0;
    var _t = setInterval(function() {
      if (exp2()) {
        clearInterval(_t);
        func2();
        logger.debug("Ejecuting " + func2.name + " after wait");
      } else {
        if (_w < maxWaitCycles) {
          _w += 1;
          logger.debug("WAIT UNTIL " + func2.name + " is true, " + _w.toString() + " cycles");
        } else {
          logger.debug("Max execution time for " + func2.name + " expression until true");
          clearInterval(_t);
        }
      }
    }, 1);
  };
  setTimeout(function() {
    _waitUntil(func, exp);
  }, 1);
};

// src/super.ts
var _super_ = function(className, classMethodName) {
  return ClassFactory(className)[classMethodName];
};
_super_.prototype.toString = function() {
  return "_super_(className,classMethodName,params) { [QCObjects native code] }";
};

// src/shortCode.ts
var shortCode = function() {
  const length = 1e3;
  const code1 = _Crypt.encrypt((Math.random() * length).toString().replace(".", ""), (/* @__PURE__ */ new Date()).getTime().toString());
  const code2 = _Crypt.encrypt((Math.random() * length).toString().replace(".", ""), new Date((/* @__PURE__ */ new Date()).getTime() - 1e3 * 1e3).getTime().toString());
  const shortCode2 = code2.list().map((o1, index) => {
    return code1.list()[index] === o1 ? null : o1;
  }).filter((c) => c !== null).join("");
  return shortCode2;
};

// src/Ready.ts
var Ready = function Ready2(e) {
  if (isBrowser) {
    _QC_READY_LISTENERS.push(e.bind(window));
  } else if (typeof global !== "undefined") {
    _QC_READY_LISTENERS.push(e.bind(global));
  }
};
var ready = Ready;
var _Ready = function(e) {
  const _execReady = function() {
    _QC_READY_LISTENERS.map(function(_ready_listener_, _r) {
      if (typeof _ready_listener_ === "function") {
        _ready_listener_();
        delete _QC_READY_LISTENERS[_r];
      }
    });
  };
  if (CONFIG.get("delayForReady") > 0) {
    if (isBrowser) {
      setTimeout(_execReady.bind(window), CONFIG.get("delayForReady"));
    } else if (typeof global !== "undefined") {
      setTimeout(_execReady.bind(global), CONFIG.get("delayForReady"));
    }
  } else {
    _execReady.call(_top);
  }
};

// src/captureFalseTouch.ts
var supportsPassive = false;
var captureFalseTouch = () => {
  return supportsPassive ? {
    passive: true
  } : false;
};
if (isBrowser) {
  try {
    const opts = Object.defineProperty({}, "passive", {
      get() {
        supportsPassive = true;
        return supportsPassive;
      }
    });
    window.addEventListener("testPassive", null, opts);
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {
    supportsPassive = false;
  }
} else {
  supportsPassive = false;
}

// src/serviceLoader.ts
var serviceLoader = function(service, _async = false) {
  const _serviceLoaderInBrowser = function(service2) {
    var _promise = new Promise(
      function(resolve, reject) {
        logger.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service2.data)).replace("{{URL}}", service2.url));
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = service2.withCredentials;
        const xhrasync = true;
        xhr.open(service2.method, service2.url, xhrasync);
        for (const header in service2.headers) {
          try {
            if (typeof service2.headers[header] !== "function") {
              xhr.setRequestHeader(header, service2.headers[header]);
            }
          } catch (e) {
            logger.debug("Something went wrong when assign the header " + header);
          }
        }
        xhr.onload = function() {
          if (xhr.status === 200) {
            const response = xhr.responseText;
            logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
            logger.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service2.name));
            service2.template = response;
            if (service2.cached && typeof cache !== "undefined") {
              cache.save(service2.name, service2.template);
            }
            if (typeof service2.done === "function") {
              var standardResponse = {
                "request": xhr,
                service: service2
              };
              service2.done.call(service2, standardResponse);
              resolve.call(_promise, standardResponse);
            }
          } else {
            if (typeof service2.fail === "function") {
              var standardResponse = {
                "request": xhr,
                service: service2
              };
              service2.fail.call(service2, standardResponse);
              reject.call(_promise, standardResponse);
            }
          }
        };
        const _directLoad = function() {
          logger.debug("SENDING THE NORMAL REQUEST  ");
          try {
            xhr.send(_DataStringify(service2.data));
          } catch (e) {
            logger.debug("SOMETHING WRONG WITH REQUEST  ");
            reject.call(_promise, {
              request: xhr,
              service: service2
            });
          }
        };
        if (service2.cached) {
          var cache = new ComplexStorageCache({
            index: service2.data,
            load() {
              _directLoad.call(this);
            },
            alternate(cacheController) {
              if (service2.method === "GET") {
                service2.template = cacheController.cache.getCached(service2.name);
                if (typeof service2.done === "function") {
                  const standardResponse = {
                    "request": xhr,
                    service: service2
                  };
                  service2.done.call(service2, standardResponse);
                  resolve.call(_promise, standardResponse);
                }
              } else {
                _directLoad();
              }
            }
          });
          _top.lastCache = cache;
        } else {
          _directLoad();
        }
        return xhr;
      }
    );
    return _promise;
  };
  const _serviceLoaderInNode = function(service2) {
    var _promise = new Promise(
      function(resolve, reject) {
        if (typeof URL === "undefined") {
          global.URL = _require_("url").URL;
          const URL2 = global.URL;
        }
        const serviceURL = new URL(service2.url);
        var req;
        service2.useHTTP2 = Object.hasOwnProperty.call(service2, "useHTTP2") && service2.useHTTP2;
        const captureEvents = function(req2) {
          logger.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service2.data)).replace("{{URL}}", service2.url));
          let dataXML;
          const standardResponse = {
            "http2Client": client,
            "request": req2,
            service: service2,
            "responseHeaders": null
          };
          if (typeof service2.data === "object" && service2.data !== null) {
            if (service2.useHTTP2) {
              try {
                logger.debug("Sending data...");
                const buffer = new Buffer(_DataStringify(service2.data));
                req2.write(buffer);
              } catch (e) {
                logger.debug("It was not possible to send any data");
              }
            }
          }
          dataXML = "";
          req2.on("response", (responseHeaders) => {
            logger.debug("receiving response...");
            standardResponse.responseHeaders = responseHeaders;
            dataXML = "";
          });
          req2.on("data", (chunk) => {
            logger.debug("receiving data...");
            dataXML += "" + chunk.toString();
            service2.template = dataXML;
          });
          if (service2.useHTTP2) {
            req2.resume();
          }
          req2.on("end", () => {
            logger.debug("ending call...");
            service2.template = dataXML;
            if (Object.hasOwnProperty.call(service2, "useHTTP2") && service2.useHTTP2) {
              client.destroy();
            } else {
              req2.destroy();
            }
            service2.done.call(service2, standardResponse);
            resolve.call(_promise, standardResponse);
          });
          if (service2.useHTTP2) {
            req2.end();
          }
        };
        try {
          let requestOptions;
          if (service2.useHTTP2) {
            logger.debug("using http2");
            const http2 = _require_("http2");
            var client = http2.connect(serviceURL.origin);
            requestOptions = Object.assign({
              ":method": service2.method,
              ":path": serviceURL.pathname
            }, service2.options);
            requestOptions = Object.assign(requestOptions, service2.headers);
            req = client.request(requestOptions);
            req.setEncoding("utf8");
            captureEvents(req);
          } else {
            if (serviceURL.protocol === "http:") {
              const http = _require_("http");
              const request = http.request;
              requestOptions = Object.assign({
                "url": service2.url,
                headers: service2.headers
              }, service2.options);
              req = request(service2.url);
              captureEvents(req);
            } else if (serviceURL.protocol === "https:") {
              const https = _require_("https");
              requestOptions = Object.assign({
                hostname: serviceURL.hostname,
                port: serviceURL.port,
                path: serviceURL.pathname,
                method: service2.method,
                headers: service2.headers
              }, service2.options);
              const _req_ = https.request(requestOptions, function(req2) {
                captureEvents(req2);
              });
              _req_.end();
            } else {
              const e = "Protocol not supported: " + serviceURL.protocol;
              logger.debug(e);
              throw new Error(e);
            }
          }
        } catch (e) {
          logger.debug(e);
          service2.fail.call(service2, e);
          reject.call(_promise, e);
        }
      }
    ).catch(function(e) {
      console.log(e);
      logger.debug("Something happened when trying to call the service: " + service2.name);
      service2.fail.call(service2, e);
    });
    return _promise;
  };
  const _serviceLoaderMockup = function(service2) {
    var _promise = new Promise(
      function(resolve) {
        logger.debug(`Calling mockup service ${service2.name} ...`);
        const standardResponse = {
          "request": null,
          service: service2,
          "responseHeaders": service2.responseHeaders
        };
        if (typeof service2.mockup === "function") {
          service2.mockup.call(service2, standardResponse);
        } else {
          service2.done.call(service2, standardResponse);
        }
        resolve.call(_promise, standardResponse);
      }
    );
    return _promise;
  };
  const _serviceLoaderLocal = function(service2) {
    var _promise = new Promise(
      function(resolve) {
        logger.debug(`Calling local service ${service2.name} ...`);
        const standardResponse = {
          "request": null,
          service: service2,
          "responseHeaders": service2.responseHeaders
        };
        if (typeof service2.local === "function") {
          service2.local.call(service2, standardResponse);
        } else {
          service2.done.call(service2, standardResponse);
        }
        resolve.call(_promise, standardResponse);
      }
    );
    return _promise;
  };
  let _ret_;
  switch (service.kind) {
    case "rest":
      if (isBrowser) {
        if (typeof _async !== "undefined" && _async) {
          _ret_ = asyncLoad(_serviceLoaderInBrowser, [service, _async]);
        } else {
          _ret_ = _serviceLoaderInBrowser(service);
        }
      } else {
        _ret_ = _serviceLoaderInNode(service);
      }
      break;
    case "mockup":
      _ret_ = _serviceLoaderMockup(service);
      break;
    case "local":
      _ret_ = _serviceLoaderLocal(service);
      break;
    default:
      logger.debug(`The value of the kind property of the service ${service.name} is not valid`);
      _ret_ = Promise.resolve();
      break;
  }
  return _ret_;
};

// src/componentLoader.ts
var componentLoader = function(component, _async) {
  let __promise__;
  const _componentLoaderInBrowser = function(component2, _async2) {
    __promise__ = new Promise(function(resolve, reject) {
      const _promise = component2.__promise__;
      const container = Object.hasOwnProperty.call(component2, "container") && typeof component2.container !== "undefined" && component2.container !== null ? component2.container : component2.body;
      if (container !== null) {
        const _feedComponent_ = function(component3) {
          component3.feedComponent();
          const standardResponse = {
            "request": xhr,
            component: component3
          };
          resolve.call(_promise, standardResponse);
        };
        logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component2.data)).replace("{{URL}}", component2.url));
        const _componentLoaded = function() {
          const successStatus = is_file ? 0 : 200;
          if (xhr.status === successStatus) {
            const response = xhr.responseText;
            logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
            logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component2.name));
            component2.template = response;
            if (component2.cached && typeof cache !== "undefined") {
              cache.save(component2.name, component2.template);
            }
            _feedComponent_.call(this, component2);
          } else {
            const standardResponse = {
              "request": xhr,
              component: component2
            };
            reject.call(_promise, standardResponse);
          }
        };
        if (typeof component2.template === "string" && component2.template !== "") {
          _feedComponent_(component2);
        } else {
          var is_file = !!component2.url.startsWith("file:");
          var xhr = new XMLHttpRequest();
          if (!is_file) {
            try {
              logger.debug("Calling the url of component in async mode.");
              xhr.open(component2.method, component2.url, true);
            } catch (e) {
              logger.debug("Last try has failed... The component cannot be loaded.");
            }
          } else {
            if ("fetch" in _top) {
              logger.debug("I can use fetch...");
              logger.debug("It is a file to be loaded, so I will try to use fetch");
              const _p = fetch(component2.url).then((response) => {
                logger.debug("I got a response from fetch, so I'll feed the component");
                response.text().then((text) => {
                  component2.template = text;
                  _feedComponent_(component2);
                });
              });
            }
          }
          if (!is_phonegap && !is_file) {
            xhr.setRequestHeader("Content-Type", "text/html");
          }
          if (!is_file) {
            xhr.onload = _componentLoaded;
          }
          const _directLoad = function(is_file2) {
            is_file2 = !(typeof is_file2 === "undefined" || !is_file2);
            logger.debug("SENDING THE NORMAL REQUEST  ");
            if (is_file2) {
              if (!("fetch" in _top)) {
                logger.debug("I have to try to load the file using xhr...  ");
                xhr.send(null);
                if (xhr.status === XMLHttpRequest.DONE) {
                  _componentLoaded();
                }
              }
            } else {
              logger.debug("Trying to send the data to the component...  ");
              xhr.send(_DataStringify(component2.data));
            }
          };
          if (component2.cached && !is_file) {
            logger.debug("USING CACHE FOR COMPONENT: " + component2.name);
            var cache = new ComplexStorageCache({
              index: component2.cacheIndex,
              load(cacheController) {
                _directLoad.call(this, is_file);
              },
              alternate(cacheController) {
                if (component2.method === "GET") {
                  component2.template = cacheController.cache.getCached(component2.cacheIndex);
                  _feedComponent_.call(this, component2);
                } else {
                  _directLoad.call(this, is_file);
                }
              }
            });
            _top.lastCache = cache;
          } else {
            logger.debug("NOT USING CACHE FOR COMPONENT: " + component2.name);
            _directLoad(is_file);
          }
        }
      } else {
        logger.debug("CONTAINER DOESNT EXIST");
      }
    });
    __promise__.then(function(standardResponse) {
      return component2.__done__().then(function() {
        let _ret_2;
        if (typeof component2.done === "function") {
          _ret_2 = component2.done.call(component2, standardResponse);
        }
        return Promise.resolve(_ret_2);
      });
    }, function(standardResponse) {
      let _ret_2;
      if (typeof component2.fail === "function") {
        _ret_2 = component2.fail.call(component2, standardResponse);
      }
      return Promise.reject(_ret_2);
    }).catch(function(e) {
      logger.debug("Something wrong loading the component");
    });
    return __promise__;
  };
  const _componentLoaderInNode = function(component2, _async2) {
    __promise__ = new Promise(function(resolve, reject) {
      const _promise = __promise__;
      const _feedComponent_ = function(component3) {
        component3.feedComponent();
        const standardResponse = {
          "request": null,
          component: component3
        };
        resolve.call(_promise, standardResponse);
      };
      logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component2.data)).replace("{{URL}}", component2.url));
      const _componentLoaded = function(err, responseText) {
        if (!err) {
          const response = responseText.toString();
          logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
          logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component2.name));
          component2.template = response;
          if (component2.cached && typeof cache !== "undefined") {
            cache.save(component2.name, component2.template);
          }
          _feedComponent_(component2);
        } else {
          const standardResponse = {
            "request": null,
            component: component2
          };
          reject.call(_promise, standardResponse);
        }
      };
      if (typeof component2.template === "string" && component2.template !== "") {
        _feedComponent_(component2);
      } else {
        logger.debug("Loading the component as a local file in server...");
        const _directLoad = function() {
          const fs = _require_("fs");
          logger.debug("SENDING THE NORMAL REQUEST  ");
          fs.readFile(component2.url, _componentLoaded);
        };
        if (component2.cached) {
          logger.debug("USING CACHE FOR COMPONENT: " + component2.name);
          var cache = new ComplexStorageCache({
            index: component2.cacheIndex,
            load(cacheController) {
              _directLoad();
            },
            alternate(cacheController) {
              if (component2.method === "GET") {
                component2.template = cacheController.cache.getCached(component2.cacheIndex);
                _feedComponent_.call(this, component2);
              } else {
                _directLoad.call(this);
              }
            }
          });
          _top.lastCache = cache;
        } else {
          logger.debug("NOT USING CACHE FOR COMPONENT: " + component2.name);
          _directLoad();
        }
      }
    });
    __promise__.then(function(standardResponse) {
      return component2.__done__().then(function() {
        let _ret_2;
        if (typeof component2.done === "function") {
          _ret_2 = component2.done.call(component2, standardResponse);
        }
        return Promise.resolve(_ret_2);
      });
    }, function(standardResponse) {
      let _ret_2;
      if (typeof component2.fail === "function") {
        _ret_2 = component2.fail.call(component2, standardResponse);
      }
      return Promise.reject(_ret_2);
    }).catch(function(e) {
      logger.debug(`Something wrong loading the component: ${e}`);
    });
    return __promise__;
  };
  let _ret_;
  if (isBrowser) {
    if (typeof _async !== "undefined" && _async) {
      _ret_ = asyncLoad(_componentLoaderInBrowser, [component, _async]);
    } else {
      _ret_ = _componentLoaderInBrowser(component, _async);
    }
  } else {
    _ret_ = _componentLoaderInNode(component, _async);
  }
  return _ret_;
};

// src/NamespaceRef.ts
var NamespaceRef = function(namespace) {
  const packageInstance = Package(namespace);
  const classes = packageInstance.filter((c) => isQCObjects_Class(c)).map((c) => {
    return {
      [c.__definition.__classType]: c
    };
  }).reduce((a, b) => Object.assign(a, b));
  return namespace.split(".").map((c) => {
    return {
      [c]: classes
    };
  }).reverse().reduce((a, b) => {
    b[Object.keys(b).join(".")] = a;
    return b;
  });
};

// src/range.ts
var range = function(start, stop = 0, step = 1) {
  if (stop === 0 || typeof stop === "undefined") {
    stop = start;
    start = 0;
  }
  return Array.from({
    length: (stop - start) / step + 1
  }, function(_, i) {
    return start + i * step;
  });
};
_protected_code_(range);

// src/defaultProcessors.ts
var setDefaultProcessors = () => {
  (function(_top2) {
    const mapper = function(componentInstance, componentName, valueName) {
      if (typeof componentInstance === "undefined" || componentInstance === null) {
        throw Error(`mapper.${componentName}.${valueName} does not have a component instance or it is null.`);
      }
      const globalValue = _top2.global.get(valueName);
      const componentValue = componentInstance.get(valueName);
      const dataValue = componentInstance.data[valueName];
      const list = typeof dataValue !== "undefined" ? dataValue : typeof componentValue !== "undefined" ? componentValue : globalValue;
      let listItems = "";
      if (typeof list !== "undefined" && typeof list.map !== "undefined") {
        listItems = list.map(function(element) {
          const dataItems = [...Object.keys(element)].map((k) => ` data-${k}="${typeof element[k] !== "undefined" && element[k] !== null ? element[k].toString() : ""}"`).join("");
          return `<quick-component name="${componentName}" ${dataItems} ></quick-component>`;
        }).join("");
      } else {
        logger.debug(`${componentName}.${valueName} does not have a map property`);
      }
      return listItems;
    };
    Processor.setProcessor(mapper);
    const layout = function(componentInstance, layoutname, cssfile) {
      const layout_portrait = `
              /* CSS Document for Mobile Imports */
              @import url("${cssfile}") (orientation:portrait);
              @import url("${cssfile}") (max-width:460px);
              @import url("${cssfile}") (aspect-ratio: 9/16);
              @import url("${cssfile}") (aspect-ratio: 10/16);
              @import url("${cssfile}") (aspect-ratio: 5/8);
              @import url("${cssfile}") (aspect-ratio: 3/4);
              @import url("${cssfile}") (aspect-ratio: 2/3);
              `;
      const layout_landscape = `
              @import url("${cssfile}") (orientation:landscape) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 16/9) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 16/10) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 8/5) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 4/3) and (min-width:460px);
              @import url("${cssfile}") (aspect-ratio: 3/2) and (min-width:460px);
              `;
      const layout_code = {
        "landscape": layout_landscape,
        "portrait": layout_portrait
      };
      return Object.hasOwnProperty.call(layout_code, layoutname) ? layout_code[layoutname] : "";
    };
    Processor.setProcessor(layout);
    const component = function() {
      const arg = [...arguments].slice(1).map(function(a) {
        return {
          [a.split("=")[0]]: a.split("=")[1]
        };
      }).reduce(function(k1, k2) {
        return Object.assign(k1, k2);
      });
      const attrs = [...Object.keys(arg)].map(function(a) {
        return `${a}=${arg[a]}`;
      }).join(" ");
      return `<component ${attrs}></component>`;
    };
    Processor.setProcessor(component);
    const quick_component = function() {
      const arg = [...arguments].slice(1).map(function(a) {
        return {
          [a.split("=")[0]]: a.split("=")[1]
        };
      }).reduce(function(k1, k2) {
        return Object.assign(k1, k2);
      });
      const attrs = [...Object.keys(arg)].map(function(a) {
        return `${a}=${arg[a]}`;
      }).join(" ");
      return `<quick-component ${attrs}></quick-component>`;
    };
    Processor.setProcessor(quick_component);
    const repeat = function(componentInstance, length, text) {
      return range(length).map(
        function(index) {
          return text.replace("{{index}}", index.toString());
        }
      ).join("");
    };
    Processor.setProcessor(repeat);
  })(_top);
};

// src/Tag.ts
var TagElements = Class("TagElements", Array, {
  show() {
    this.map(function(element) {
      return element.style.opacity = 1;
    });
  },
  hide() {
    this.map(function(element) {
      return element.style.opacity = 0;
    });
  },
  effect() {
    const effectArguments = [...arguments].slice(1);
    let effectClass = arguments[0];
    if ((typeof effectClass).toLowerCase() === "string") {
      effectClass = ClassFactory(effectClass);
    }
    this.map(function(element) {
      return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
    });
  },
  findElements(elementName) {
    const _o = New(ClassFactory("TagElements"));
    if (isBrowser) {
      for (const _k in this) {
        if (typeof _k === "number" && typeof this[_k] !== "function" && this[_k].hasOwnProperty.call(this[_k], "subelements")) {
          _o.push(this[_k].subelements(elementName));
        }
      }
    } else {
    }
    return _o;
  }
});
var Tag = function(tagname, innerHTML) {
  const _o = New(ClassFactory("TagElements"));
  if (isBrowser) {
    const o = document.subelements(tagname);
    const addedKeys = [];
    for (let _i = 0; _i < o.length; _i++) {
      if (typeof innerHTML !== "undefined" && o[_i].hasOwnProperty.call(o[_i], "innerHTML")) {
        o[_i].innerHTML = innerHTML;
      }
      if (addedKeys.indexOf(_i) < 0) {
        _o.push(o[_i]);
        addedKeys.push(_i);
      }
    }
  } else {
  }
  return _o;
};
Package("com.qcobjects", [
  TagElements,
  Tag
]);

// src/findPackageNodePath.ts
var findPackageNodePath = function(packagename) {
  let sdkPath = null;
  if (!isBrowser) {
    const fs = _require_("fs");
    try {
      let sdkPaths = [
        `${CONFIG.get("projectPath")}${CONFIG.get("relativeImportPath")}`,
        `${CONFIG.get("basePath")}${CONFIG.get("relativeImportPath")}`,
        `${CONFIG.get("projectPath")}`,
        `${CONFIG.get("basePath")}`,
        `${CONFIG.get("relativeImportPath")}`,
        `${process.cwd()}${CONFIG.get("relativeImportPath")}`,
        `${process.cwd()}/node_modules/` + packagename,
        `${process.cwd()}/node_modules`,
        `${process.cwd()}`,
        "node_modules",
        "./",
        ""
      ].concat(module.paths);
      sdkPaths = sdkPaths.filter((p) => {
        return fs.existsSync(p + "/" + packagename);
      });
      if (sdkPaths.length > 0) {
        sdkPath = sdkPaths[0];
        logger.info(packagename + " is Installed.");
      } else {
      }
    } catch (e) {
      console.log(e);
    }
  }
  return sdkPath;
};
Export(findPackageNodePath);

// src/Import.ts
var Import = function(packagename, ready2, external) {
  if (external !== void 0) {
    logger.debug(`[Import] Setting external=${external.toString()} resource to import: ${packagename}`);
  }
  if (external) {
    logger.debug(`[Import] Registering external resource to import: ${packagename}`);
  } else {
    logger.debug(`[Import] Registering local resource to import: ${packagename}`);
  }
  let _promise_import_;
  if (isBrowser) {
    _promise_import_ = new Promise(function(resolve, reject) {
      const allPackagesImported = function() {
        let ret = false;
        let cp = 0;
        for (const p in _QC_PACKAGES) {
          cp++;
        }
        if (cp < _QC_PACKAGES_IMPORTED.length) {
          ret = false;
        } else {
          ret = true;
        }
        return ret;
      };
      const readyImported = function(e) {
        _QC_PACKAGES_IMPORTED.push(ready2);
        if (allPackagesImported()) {
          _QC_PACKAGES_IMPORTED.map(function(_imported_) {
            _QC_READY_LISTENERS.push(_imported_);
          });
        }
        if (isBrowser && CONFIG.get("removePackageScriptAfterLoading")) {
          e.target.remove();
        }
        resolve.call(_promise_import_, {
          "_imported_": e.target,
          "_package_name_": packagename
        });
      };
      if (!_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, packagename)) {
        const s1 = _DOMCreateElement("script");
        s1.type = CONFIG.get("sourceType", "text/javascript");
        s1.async = !!CONFIG.get("asynchronousImportsLoad");
        s1.onreadystatechange = function() {
          if (s1.readyState === "complete") {
            readyImported(s1);
          }
        };
        s1.onload = readyImported;
        s1.onerror = function(e) {
          reject.call(_promise_import_, {
            "_imported_": s1,
            "_package_name_": packagename
          });
        };
        s1.src = external ? CONFIG.get("remoteImportsPath") + packagename + ".js" : _basePath_ + CONFIG.get("relativeImportPath") + packagename + ".js";
        document.getElementsByTagName("head")[0].appendChild(s1);
      }
    });
    _promise_import_.catch(function() {
      logger.debug("Import: Error loading a package ");
    });
  } else {
    _promise_import_ = new Promise(function(resolve, reject) {
      try {
        const standardNodePath = findPackageNodePath(packagename);
        let packageAbsoluteName = "";
        if (standardNodePath !== null) {
          packageAbsoluteName = standardNodePath + "/" + packagename;
        } else {
          const jsNodePath = findPackageNodePath(packagename + ".js");
          if (jsNodePath !== null) {
            packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
          } else {
            packageAbsoluteName = _basePath_ + CONFIG.get("relativeImportPath") + packagename;
          }
        }
        try {
          resolve.call(_promise_import_, {
            "_imported_": _require_(`${packageAbsoluteName}`),
            "_package_name_": packagename
          });
        } catch (e) {
          reject.call(_promise_import_, {
            "_imported_": null,
            "_package_name_": packagename,
            "error": e
          });
        }
      } catch (e) {
        reject.call(_promise_import_, {
          "_imported_": null,
          "_package_name_": packagename,
          "error": e
        });
      }
    }).catch(function(e) {
      logger.debug("Something happened when importing " + packagename);
      console.warn(e);
    });
  }
  _promise_import_.catch(function(e) {
    logger.warn(_DataStringify(e));
  });
  return _promise_import_;
};
Import.prototype.toString = function() {
  return "Import(packagename,ready,external) { [QCObjects native code] }";
};

// src/domain.ts
var _domain_ = typeof location !== "undefined" && location.hostname !== "" ? location.hostname : "localhost";

// src/BackendMicroservice.ts
var BackendMicroservice = class extends InheritClass {
  body;
  stream;
  route;
  headers;
  request;
  constructor({
    domain = _domain_,
    basePath = _basePath_,
    body = null,
    stream = null,
    request = null
  }) {
    super({
      domain,
      basePath,
      body,
      stream,
      request
    });
    logger.debug("Initializing BackendMicroservice...");
    const microservice = this;
    if (typeof this.body === "undefined") {
      this.body = null;
    }
    if (typeof body !== "undefined") {
      this.body = body;
    }
    this.cors();
    microservice.stream = stream;
    stream?.on("data", (data) => {
      const requestMethod2 = request?.method.toLowerCase();
      const supportedMethods2 = {
        "post": microservice.post
      };
      if (Object.hasOwnProperty.call(supportedMethods2, requestMethod2)) {
        supportedMethods2[requestMethod2].call(microservice, data);
      }
    });
    const requestMethod = request?.method.toLowerCase();
    const supportedMethods = {
      "get": microservice.get,
      "head": microservice.head,
      "put": microservice.put,
      "delete": microservice.delete,
      "connect": microservice.connect,
      "options": microservice.options,
      "trace": microservice.trace,
      "patch": microservice.patch
    };
    if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
      supportedMethods[requestMethod].call(microservice);
    }
  }
  cors() {
    if (this.route.cors) {
      logger.debug("Validating CORS...");
      const {
        allow_origins,
        allow_credentials,
        allow_methods,
        allow_headers
      } = this.route.cors;
      const microservice = this;
      if (typeof microservice.headers !== "object") {
        microservice.headers = {};
      }
      if (typeof microservice.route.responseHeaders !== "object") {
        microservice.route.responseHeaders = {};
      }
      if (typeof allow_origins !== "undefined") {
        logger.debug("CORS: allow_origins available. Validating origins...");
        if (allow_origins === "*" || typeof microservice.request.headers.origin === "undefined" || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
          logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
          microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
        } else {
          logger.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
          logger.debug("CORS: Forcing to finish the response...");
          this.body = {};
          try {
            this.done();
          } catch (e) {
            logger.debug(`It was not possible to finish the call to the microservice: ${e}`);
          }
        }
      } else {
        logger.debug("CORS: no allow_origins available. Allowing all origins...");
        logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
        microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
      }
      if (typeof allow_credentials !== "undefined") {
        logger.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
        microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
      } else {
        logger.debug("CORS: No allow_credentials present. Allowing all credentials.");
        microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
      }
      if (typeof allow_methods !== "undefined") {
        logger.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
        microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
      } else {
        logger.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
        microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
      }
      if (typeof allow_headers !== "undefined") {
        logger.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
        microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
      } else {
        logger.debug("CORS: No allow_headers present. Allowing all headers...");
        microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
      }
    } else {
      logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
    }
  }
  head(formData) {
    logger.debug(`[BackendMicroservice.head] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  get(formData) {
    logger.debug(`[BackendMicroservice.get] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  post(formData) {
    logger.debug(`[BackendMicroservice.post] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  put(formData) {
    logger.debug(`[BackendMicroservice.put] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  delete(formData) {
    logger.debug(`[BackendMicroservice.delete] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  connect(formData) {
    logger.debug(`[BackendMicroservice.connect] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  options(formData) {
    logger.debug(`[BackendMicroservice.options] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  trace(formData) {
    logger.debug(`[BackendMicroservice.trace] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  patch(formData) {
    logger.debug(`[BackendMicroservice.patch] Data received: ${_DataStringify(formData)}`);
    this.done();
  }
  finishWithBody(stream) {
    try {
      logger.debug("[BackendMicroservice.finishWithBody] Ending the stream...");
      logger.debug(`[BackendMicroservice.finishWithBody] type of body is: ${typeof this.body}`);
      if (typeof this.body !== "string") {
        this.body = _DataStringify(this.body);
      }
      logger.debug(`[BackendMicroservice.finishWithBody] 
 body: ${this.body} `);
      stream?.write(this.body);
      stream?.end();
      logger.debug("[BackendMicroservice.finishWithBody] Stream ended.");
    } catch (e) {
      logger.debug(`[BackendMicroservice.finishWithBody] Something went wrong ending the stream: ${e}`);
    }
  }
  done() {
    logger.debug("[BackendMicroservice.done] Finalizing the response...");
    const microservice = this;
    const stream = microservice.stream;
    try {
      logger.debug("[BackendMicroservice.done] Sending response headers...");
      if (microservice.route.responseHeaders) {
        logger.debug(`[BackendMicroservice.done] Response headers present: ${Object.keys(microservice.route.responseHeaders)}`);
        stream.respond(microservice.route.responseHeaders);
      } else {
        throw Error("[BackendMicroservice.done] No headers present.");
      }
    } catch (e) {
      logger.debug(`[BackendMicroservice.done] Something went wrong sending response headers: ${e}`);
    }
    if (microservice.body !== null) {
      try {
        logger.debug("[BackendMicroservice.done] A body of message is present. Finalizing the response...");
        microservice.finishWithBody.call(microservice, stream);
      } catch (e) {
        logger.debug(`[BackendMicroservice.done] Something went wrong finalizing the response: ${e}`);
      }
    } else {
      logger.debug("[BackendMicroservice.done] No body present. Ending stream...");
      stream.end();
    }
  }
};
Package("com.qcobjects.api", [
  BackendMicroservice
]);

// src/routings.ts
var __routing_params__ = function(routing, routingPath) {
  const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
  return {
    ...[...routingPath.matchAll(new RegExp(standardRoutingPath, "g"))][0].groups
  };
};
var __valid_routings__ = function(routings, routingPath) {
  return routings.filter(function(routing) {
    const standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
    return new RegExp(standardRoutingPath, "g").test(routingPath);
  }).reverse();
};
var __valid_routing_way__ = function(validRoutingWays, routingWay) {
  return validRoutingWays.includes(routingWay);
};

// src/Component.ts
var Component = class extends InheritClass {
  __instanceID;
  name;
  _body;
  templateURI;
  tplsource;
  tplextension;
  template;
  validRoutingWays = ["pathname", "hash", "search"];
  basePath = _basePath_;
  domain = _domain_;
  templateHandler = "DefaultTemplateHandler";
  processorHandler;
  routingWay = null;
  routingNodes = [];
  routings = [];
  routingPath = "";
  routingPaths = [];
  _componentHelpers = [];
  subcomponents = [];
  splashScreenComponent = void 0;
  controller = void 0;
  view = void 0;
  effect = void 0;
  effectClass;
  method = "GET";
  cached = true;
  __promise__ = null;
  data;
  __namespace = void 0;
  constructor({
    __parent__,
    templateURI = "",
    template,
    tplsource = "default",
    tplextension,
    url = "",
    name = "",
    method = "GET",
    data = {},
    reload = false,
    shadowed = false,
    cached = true,
    _body = _DOMCreateElement("div"),
    __promise__ = null,
    __shadowRoot,
    body,
    shadowRoot,
    splashScreenComponent,
    controller,
    view
  }) {
    if (arguments.length < 1) {
      throw Error("No arguments in component. You must at least give one argument.");
    }
    super({
      __parent__,
      templateURI,
      template,
      tplextension,
      tplsource,
      url,
      name,
      method,
      data,
      reload,
      shadowed,
      cached,
      _body,
      __promise__,
      __shadowRoot,
      body,
      shadowRoot,
      splashScreenComponent,
      controller,
      view
    });
    const self2 = this;
    if (typeof self2.name === "undefined") {
      logger.warn("A name is not defined for " + __getType__(self2));
    }
    self2.routingWay = CONFIG.get("routingWay");
    self2.processorHandler = New(Processor, {
      component: self2
    });
    self2.data = typeof self2.data === "undefined" || self2.data === null ? {} : self2.data;
    self2.data = Object.assign(self2.data, self2.dataAttributes);
    self2.createServiceInstance().then(function(serviceResponse) {
      if (typeof self2.__new__ === "function") {
        self2.__new__.call(self2, self2);
      }
      self2._generateRoutingPaths(self2.body).then(function() {
        self2._reroute_().then(function() {
          return self2.rebuild().then(function() {
            logger.info(`Component._new_ The component ${self2.name} was built successfully!`);
          }).catch(function(standardResponse) {
            logger.warn(`Component._new_ Something went wrong building the component ${self2.name}`);
            console.error(standardResponse);
          });
        });
      });
    });
  }
  set body(value) {
    const self2 = this;
    self2._body = value;
  }
  get body() {
    const self2 = this;
    return self2._body;
  }
  set cacheIndex(value) {
    logger.debug("[cacheIndex] This property is readonly");
  }
  get cacheIndex() {
    const self2 = this;
    const __routing_path__ = _DataStringify(self2.routingPath);
    return Base64.encode(self2.name + __routing_path__);
  }
  set parsedAssignmentText(value) {
    logger.debug("[parsedAssignmentText] This property is readonly");
  }
  get parsedAssignmentText() {
    const self2 = this;
    self2._parsedAssignmentText = self2.parseTemplate(self2.template);
    if (typeof self2._parsedAssignmentText === "undefined") {
      throw Error(`[Component][${this.name}][parsedAssignmentText] Could not generate content!`);
    }
    return self2._parsedAssignmentText;
  }
  set shadowRoot(value) {
    const self2 = this;
    if (typeof self2.__shadowRoot === "undefined") {
      self2.__shadowRoot = value;
    } else {
      logger.debug("[shadowRoot] This property can only be assigned once!");
    }
  }
  get shadowRoot() {
    const self2 = this;
    return self2.__shadowRoot;
  }
  set routingSelected(value) {
    logger.debug("[routingSelected] This is a read-only property of the component");
  }
  get routingSelected() {
    const self2 = this;
    return __valid_routings__(self2.routings, self2.routingPath);
  }
  set routingParams(value) {
    logger.debug("[routingParams] This is a read-only property of the component");
  }
  get routingParams() {
    const component = this;
    return [{}].concat(component.routingSelected.map(function(routing) {
      return __routing_params__(routing, component.routingPath);
    })).reduce(function(accumulator, colData, index) {
      return Object.assign(accumulator, colData);
    });
  }
  createServiceInstance() {
    const component = this;
    const body = component.body;
    let data = this.data;
    let __serviceClass;
    const __classDefinition = component.getClass().__definition;
    const _serviceClassName = isBrowser && body.getAttribute("serviceClass") !== null ? body.getAttribute("serviceClass") : null;
    return new Promise(function(resolve, reject) {
      const __enable_service_class__ = !!(Object.hasOwnProperty.call(body, "enableServiceClass") && body.enableServiceClass || !Object.hasOwnProperty.call(body, "enableServiceClass"));
      let _response_to_data_ = !!(isBrowser && body.getAttribute("response-to") !== null && body.getAttribute("response-to") === "data");
      let _response_to_template_ = !!(isBrowser && body.getAttribute("response-to") !== null && body.getAttribute("response-to") === "template");
      if (__enable_service_class__ && _serviceClassName !== null) {
        __serviceClass = ClassFactory(_serviceClassName);
      }
      if (!_response_to_data_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
        _response_to_data_ = __classDefinition.responseTo === "data";
      } else if (!_response_to_data_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
        _response_to_data_ = ClassFactory("Component").responseTo === "data";
      }
      if (!_response_to_template_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
        _response_to_template_ = __classDefinition.responseTo === "template";
      } else if (!_response_to_template_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
        _response_to_template_ = ClassFactory("Component").responseTo === "template";
      }
      if (typeof __serviceClass !== "undefined" && (typeof __enable_service_class__ !== "undefined" && __enable_service_class__ === true) && (_response_to_data_ || _response_to_template_)) {
        logger.info("Loading service " + _serviceClassName);
        const serviceInstance = New(__serviceClass, {
          data
        });
        serviceLoader(serviceInstance)?.then(function({
          request,
          service
        }) {
          let serviceResponse;
          if (typeof service.JSONresponse !== "undefined" && service.JSONresponse !== null) {
            serviceResponse = service.JSONresponse;
          } else {
            serviceResponse = service.template;
          }
          if (_response_to_data_) {
            if (typeof data === "object" && typeof serviceResponse === "object") {
              data = Object.assign(data, serviceResponse);
            } else {
              data = serviceResponse;
            }
            component.data = data;
          }
          component.serviceInstance = serviceInstance;
          component.serviceData = data;
          if (_response_to_template_) {
            component.template = serviceResponse;
          }
          resolve(serviceResponse);
        }, function(rejectedResponse) {
          logger.debug(`Service loading rejected for ${_serviceClassName} in ${component.name}`);
          reject(rejectedResponse);
        }).catch(function(e) {
          logger.debug("Something went wroing while trying to load the service " + _serviceClassName);
          throw Error(`Error loading ${_serviceClassName} for ${component.name}. Detail: ${e}`);
        });
      } else {
        resolve(null);
      }
    });
  }
  _bindroute_() {
    const _component_ = this;
    if (!_component_._bindroute_.loaded) {
      if (isBrowser) {
        _component_.hostElements("a").map(function(a) {
          a.oldclick = a.onclick;
          a.onclick = function(e) {
            let _ret_ = true;
            if (!_top.global.get("routingPaths")) {
              _top.global.set("routingPaths", []);
            }
            const routingWay = CONFIG.get("routingWay");
            const routingPath = e.target[routingWay];
            if (_top.global.get("routingPaths").includes(routingPath) && e.target[routingWay] !== location[routingWay] && e.target.href !== document.location.href) {
              logger.debug("A ROUTING WAS FOUND: " + routingPath);
              window.history.pushState({
                href: e.target.href
              }, e?.target?.href, e.target.href);
              ClassFactory("Component").route();
              _ret_ = false;
            } else {
              logger.debug("NO ROUTING FOUND FOR: " + routingPath);
            }
            if (typeof e.target.oldclick !== "undefined" && typeof e.target.oldclick === "function") {
              e.target.oldclick.call(e.target, e);
            }
            return _ret_;
          };
          return null;
        });
      } else {
      }
      _component_._bindroute_.loaded = true;
    } else {
      logger.debug(`Routes already bound to popstate events for ${_component_.name}`);
    }
  }
  done(standardResponse) {
    const _ret_ = new Promise((resolve, reject) => {
      if (typeof standardResponse !== "undefined") {
        const { request, component } = standardResponse;
        resolve({ request, component });
      } else {
        resolve({ request: void 0, component: void 0 });
      }
    });
    return _ret_;
  }
  createControllerInstance() {
    let _Controller;
    if (isBrowser) {
      if (typeof this.body === "undefined") {
        throw new Error("The component has no body");
      }
      var controllerName = this.body.getAttribute("controllerClass");
      if (!controllerName) {
        controllerName = "Controller";
      }
      _Controller = ClassFactory(controllerName);
      if (typeof _Controller !== "undefined") {
        this.controller = New(_Controller, {
          component: this
        });
      }
    }
    return new Promise((resolve, reject) => {
      if (isBrowser) {
        if (typeof _Controller !== "undefined" && typeof this.controller !== "undefined") {
          if (typeof this.controller.done === "function") {
            try {
              this.controller.done.call(this.controller);
            } catch (e) {
              throw Error(e);
            }
          } else {
            logger.debug(`${controllerName} does not have a done() method.`);
            reject(`${controllerName} does not have a done() method.`);
          }
          if (typeof this.controller.createRoutingController === "function") {
            this.controller.createRoutingController.call(this.controller);
          } else {
            logger.debug(`${controllerName} does not have a createRoutingController() method.`);
          }
        }
      }
      resolve({ component: this, controller: this.controller });
    });
  }
  createEffectInstance() {
    const _component_ = this;
    return new Promise(function(resolve, reject) {
      if (isBrowser) {
        const effectClassName = _component_.body.getAttribute("effectClass");
        let applyEffectTo = _component_.body.getAttribute("apply-effect-to");
        applyEffectTo = applyEffectTo !== null ? applyEffectTo : "load";
        if (effectClassName !== null && applyEffectTo === "observe") {
          _component_.applyObserveTransitionEffect(effectClassName);
        } else if (effectClassName !== null && applyEffectTo === "load") {
          _component_.applyTransitionEffect(effectClassName);
        }
      }
      resolve({ component: _component_, effect: _component_.effect });
    });
  }
  createViewInstance() {
    const _component_ = this;
    return new Promise(function(resolve, reject) {
      const viewName = isBrowser ? _component_.body.getAttribute("viewClass") : null;
      if (viewName !== null) {
        const _View = ClassFactory(viewName);
        if (typeof _View !== "undefined") {
          _component_.view = New(_View, {
            component: _component_
          });
          if (Object.hasOwnProperty.call(_component_.view, "done") && typeof _component_.view?.done === "function") {
            _component_.view?.done.call(_component_.view);
          }
        }
      }
      resolve({ component: _component_, view: _component_.view });
    });
  }
  __done__() {
    const _component_ = this;
    const componentDone = function() {
      if (typeof _component_ === "undefined") {
        throw new Error("componentDone() has lost its context");
      }
      if (typeof _component_.body === "undefined") {
        throw new Error("The component has no body");
      }
      _component_.createViewInstance();
      _component_.createControllerInstance();
      _component_.createEffectInstance();
      logger.debug(`Trying to run component helpers for ${_component_.name}...`);
      try {
        _component_.runComponentHelpers();
        logger.debug(`Component helpers for ${_component_.name} executed.`);
      } catch (e) {
        logger.debug(`Component helpers for ${_component_.name} could not be executed.`);
        throw Error(e);
      }
      _component_.subcomponents = _component_.__buildSubComponents__();
      _component_._bindroute_();
      if (isBrowser) {
        _component_.body.setAttribute("loaded", "true");
      }
    };
    return new Promise(function(resolve, reject) {
      try {
        resolve(componentDone.call(_component_));
      } catch (e) {
        reject(e);
      }
    });
  }
  hostElements(tagFilter) {
    const _component_ = this;
    let elementList = [];
    if (isBrowser) {
      elementList = _component_.shadowed && typeof _component_.shadowRoot !== "undefined" ? _component_.shadowRoot.subelements(tagFilter) : _component_.body.subelements(tagFilter);
    }
    return elementList;
  }
  get subtags() {
    const _component_ = this;
    const tagFilter = _tag_filter_;
    return _component_.hostElements(tagFilter);
  }
  get bodyAttributes() {
    const _component_ = this;
    const c = _component_.body;
    return isBrowser ? [...c.getAttributeNames()].map((a) => {
      return { [a]: c.getAttribute(a) };
    }).reduce((accumulator, colData, index) => {
      return Object.assign(accumulator, colData);
    }) : {};
  }
  get dataAttributes() {
    const _component_ = this;
    const c = _component_.body;
    return isBrowser ? [{}].concat([...c.getAttributeNames()].filter((n) => n.startsWith("data-")).map((a) => {
      return { [a.split("-")[1]]: c.getAttribute(a) };
    })).reduce((accumulator, colData, index) => {
      return Object.assign(accumulator, colData);
    }) : {};
  }
  __buildSubComponents__(rebuildObjects = false) {
    const _component_ = this;
    let elementList = _component_.subtags;
    if (!rebuildObjects) {
      elementList = elementList.filter((t) => t.getAttribute("loaded") !== "true");
    }
    if (typeof _component_ !== "undefined" || _component_.subcomponents.length < 1) {
      _component_.subcomponents = _buildComponentsFromElements_(elementList, _component_);
    }
    return _component_.subcomponents;
  }
  fail(standardResponse) {
    const _ret_ = new Promise((resolve, reject) => {
      if (typeof standardResponse !== "undefined") {
        const { error, component } = standardResponse;
        resolve({ error, component });
      } else {
        reject();
      }
    });
    return _ret_;
  }
  set(name, value) {
    this[name] = value;
  }
  get(name, _defaultValue) {
    return this[name] || _defaultValue;
  }
  feedComponent() {
    const _component_ = this;
    logger.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
    const _feedComponent_InBrowser = function(_component_2) {
      if (typeof _component_2.container === "undefined" && typeof _component_2.body === "undefined") {
        logger.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_2.name));
        return;
      }
      const container = typeof _component_2.container === "undefined" || _component_2.container === null ? _component_2.body : _component_2.container;
      const parsedAssignmentText = _component_2.parsedAssignmentText;
      _component_2.innerHTML = parsedAssignmentText;
      if (_component_2.shadowed) {
        logger.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_2.name));
        logger.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
        const tmp_shadowContainer = _DOMCreateElement("div");
        container.subelements("[slot]").map(
          function(c) {
            if (c.parentElement === container) {
              tmp_shadowContainer.appendChild(c);
            }
          }
        );
        logger.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
        const shadowContainer = _DOMCreateElement("div");
        shadowContainer.classList.add("shadowHost");
        try {
          _component_2.shadowRoot = shadowContainer.attachShadow({
            mode: "open"
          });
        } catch (e) {
          try {
            logger.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_2.name));
            _component_2.shadowRoot = shadowContainer.shadowRoot;
          } catch (e2) {
            logger.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_2.name));
          }
        }
        if (typeof _component_2.shadowRoot !== "undefined" && _component_2.shadowRoot !== null) {
          if (_component_2.reload) {
            logger.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
            if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
              shadowContainer.shadowRoot.innerHTML = _component_2.innerHTML;
            }
          } else {
            tmp_shadowContainer.innerHTML = _component_2.parseTemplate(tmp_shadowContainer.innerHTML);
            logger.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
            if (shadowContainer !== null && shadowContainer.shadowRoot !== null) {
              shadowContainer.shadowRoot.innerHTML += _component_2.innerHTML;
            }
          }
          logger.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
          shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
          logger.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_2.name));
          const qs = container.querySelector(".shadowHost");
          if (!(typeof qs !== "undefined" && qs !== null)) {
            container.appendChild(shadowContainer);
          } else {
            logger.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_2.name));
            if (_component_2.shadowRoot !== null && shadowContainer.shadowRoot !== null) {
              _component_2.shadowRoot.innerHTML = shadowContainer.shadowRoot.innerHTML;
            }
          }
        } else {
          logger.warn("Shadowed COMPONENT {{NAME}} is bad configured".replace("{{NAME}}", _component_2.name));
        }
      } else {
        if (_component_2.reload) {
          logger.debug("FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}".replace("{{NAME}}", _component_2.name));
          container.innerHTML = _component_2.innerHTML;
        } else if (container && _component_2) {
          logger.debug("ADDING COMPONENT {{NAME}} ".replace("{{NAME}}", _component_2.name));
          container.innerHTML += _component_2.innerHTML;
        } else {
          logger.warn("COMPONENT {{NAME}} is not added to the DOM".replace("{{NAME}}", _component_2.name));
        }
      }
    };
    const _feedComponent_InNode = function(_component_2) {
      const parsedAssignmentText = _component_2.parsedAssignmentText;
      _component_2.innerHTML = parsedAssignmentText;
    };
    let _ret_;
    if (!is_a(_component_, "Component")) {
      logger.warn("Trying to feed a non component object");
      return;
    }
    if (isBrowser) {
      _ret_ = _feedComponent_InBrowser(_component_);
    } else {
      _ret_ = _feedComponent_InNode(_component_);
    }
    return _ret_;
  }
  rebuild() {
    const _component = this;
    var _promise = new Promise(function(resolve, reject) {
      if (typeof _component === "undefined" || _component === null) {
        reject("Component is undefined");
      }
      if (isQCObjects_Object(_component) && is_a(_component, "Component")) {
        switch (true) {
          case _component.get("tplsource") === "none":
            logger.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
            var standardResponse = {
              request: void 0,
              component: _component
            };
            _component.__done__().then(function() {
              if (typeof _component.done === "function") {
                _component.done.call(_component, standardResponse);
              }
              resolve.call(_promise, standardResponse);
            }, function() {
              reject.call(_promise, standardResponse);
            });
            break;
          case _component.get("tplsource") === "inline":
            logger.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
            (async function(_component2) {
              _component2.feedComponent.bind(_component2)();
            })(_component);
            var standardResponse = {
              request: void 0,
              component: _component
            };
            _component.__done__().then(function() {
              if (typeof _component.done === "function") {
                _component.done(standardResponse);
              }
              resolve.call(_promise, standardResponse);
            }, function() {
              reject.call(_promise, standardResponse);
            });
            break;
          case (_component.get("tplsource") === "default" && _component.get("templateURI") !== ""):
            _component.set("url", _component.get("basePath") + _component.get("templateURI"));
            componentLoader(_component, false)?.then(
              function(standardResponse2) {
                resolve.call(_promise, standardResponse2);
              },
              function(standardResponse2) {
                reject.call(_promise, standardResponse2);
              }
            );
            break;
          case (_component.get("tplsource") === "external" && _component.get("templateURI") !== ""):
            _component.set("url", _component.get("templateURI"));
            componentLoader(_component, false).then(
              function(standardResponse2) {
                resolve.call(_promise, standardResponse2);
              },
              function(standardResponse2) {
                reject.call(_promise, standardResponse2);
              }
            );
            break;
          case (_component.get("tplsource") === "default" && _component.get("templateURI", "") === ""):
            logger.debug(`Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
            reject.call(_promise, `Component ${_component.name} template-source is ${_component.get("tplsource")} and no templateURI is present`);
            break;
          default:
            logger.debug("Component " + _component.name + " will not be rebuilt because no templateURI is present");
            reject.call(_promise, {
              request: null,
              component: _component
            });
            break;
        }
      }
    });
    return _promise;
  }
  Cast(oClass) {
    const o = _methods_(oClass).map((m) => m.name.replace(/bound /g, "")).map((m) => {
      return {
        [m]: oClass[m].bind(this)
      };
    }).reduce((c, p) => Object.assign(c, p), {});
    return _Cast(this, o);
  }
  static route() {
    const componentClass = this;
    let _route_promise_;
    const isValidInstance = !!(isQCObjects_Object(componentClass) && is_a(componentClass, "Component"));
    const __route__ = function(componentList) {
      const _componentNames_ = [];
      const _promises_ = componentList.filter(function(rc) {
        return typeof rc !== "undefined";
      }).map(function(rc) {
        if (typeof rc.name !== "undefined") {
          _componentNames_.push(rc.name);
        } else {
          throw new Error(__getType__(rc) + " does not have a name");
        }
        return new Promise(function(resolve, reject) {
          let _promise_;
          if (typeof rc !== "undefined" && !!rc._reroute_) {
            _promise_ = rc._reroute_().then(function() {
              rc.reload = true;
              return rc.rebuild();
            }).then(function(_rc_) {
              if (Object.hasOwnProperty.call(rc, "subcomponents") && typeof rc.subcomponents !== "undefined" && rc.subcomponents.length > 0) {
                logger.debug("LOOKING FOR ROUTINGS IN SUBCOMPONENTS FOR: " + rc.name);
                return __route__.call(rc, rc.subcomponents);
              } else {
                logger.debug("No subcomponents to look for routings in: " + rc.name);
                if (rc.subtags.length > 0) {
                  rc.subcomponents = rc.__buildSubComponents__(true);
                }
                resolve(rc);
              }
            });
          } else if (typeof rc !== "undefined") {
            reject("Component " + rc.name + " is not an instance of Component");
          }
          return _promise_;
        });
      });
      return Promise.all(_promises_).then(function() {
        logger.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
      }).catch(function(err) {
        logger.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
      });
    };
    if (isValidInstance || !!componentsStack) {
      if (isValidInstance) {
        logger.debug("loading routings for instance " + componentClass.name);
      }
      _route_promise_ = __route__.call(componentClass, isValidInstance ? componentClass.subcomponents : componentsStack);
    } else {
      logger.debug("An undetermined result expected if load routings. So will not be loaded this time.");
      throw Error("There is no valid instance and no components stack available to apply rountings");
    }
    return _route_promise_;
  }
  fullscreen() {
    if (isBrowser) {
      const elem = this.body;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
    }
  }
  closefullscreen() {
    if (isBrowser) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
    }
  }
  _generateRoutingPaths(componentBody) {
    const component = this;
    return new Promise(function(resolve, reject) {
      if (isBrowser) {
        if (__valid_routing_way__(component.validRoutingWays, component.routingWay || "")) {
          if (typeof componentBody !== "undefined") {
            component.innerHTML = componentBody.innerHTML;
            component.routingNodes = componentBody.subelements("routing");
            component.routings = [];
            component.routingNodes.map(function(routingNode, r) {
              const attributeNames = routingNode.getAttributeNames();
              const routing = {};
              attributeNames.map(function(attributeName, a) {
                routing[attributeNames[a]] = routingNode.getAttribute(attributeNames[a]);
              });
              component.routings.push(routing);
              if (!component.routingPaths) {
                component.routingPaths = [];
              }
              if (!component.routingPaths.includes(routing.path)) {
                component.routingPaths.push(routing.path);
              }
              if (!_top.global.get("routingPaths")) {
                _top.global.set("routingPaths", []);
              }
              if (!_top.global.get("routingPaths").includes(routing.path)) {
                _top.global.get("routingPaths").push(routing.path);
              }
            });
          }
        }
      } else {
      }
      resolve();
    });
  }
  parseTemplate(template) {
    const _self = this;
    let _parsedAssignmentText;
    const value = template;
    if (Object.hasOwnProperty.call(_self, "templateHandler")) {
      const templateHandlerName = _self.templateHandler;
      logger.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
      const templateHandlerClass = ClassFactory(templateHandlerName);
      const templateInstance = New(templateHandlerClass, {
        component: _self,
        template: value
      });
      templateInstance.component = _self;
      let selfData = _self.data;
      if (Object.hasOwnProperty.call(_self, "assignRoutingParams") && _self.assignRoutingParams) {
        try {
          selfData = Object.assign(selfData, _self.routingParams);
        } catch (e) {
          logger.debug("[parseTemplate] it was not possible to assign the routing params to the template");
        }
      }
      _parsedAssignmentText = templateInstance.assign(selfData);
    } else {
      logger.debug(`[Component][${this.name}][parseTemplate] No value for templateHandler. Using raw content...`);
      _parsedAssignmentText = value;
    }
    return _parsedAssignmentText;
  }
  _reroute_() {
    const rc = this;
    return new Promise(function(resolve, reject) {
      if (isBrowser) {
        if (__valid_routing_way__(rc.validRoutingWays, rc.routingWay || "")) {
          rc.routingPath = location[rc.routingWay];
          rc.routingSelected.map(function(routing, r) {
            const componentURI = ComponentURI({
              "COMPONENTS_BASE_PATH": CONFIG.get("componentsBasePath"),
              "COMPONENT_NAME": routing.name.toString(),
              "TPLEXTENSION": Object.hasOwnProperty.call(routing, "tplextension") ? routing.tplextension || "" : rc.tplextension,
              "TPL_SOURCE": "default"
              /* here is always default in order to get the right uri */
            });
            rc.templateURI = componentURI;
          });
          if (rc.routingSelected.length > 0) {
            rc.template = "";
            rc.body.innerHTML = "";
          }
        }
      }
      resolve(rc);
    });
  }
  lazyLoadImages() {
    if (isBrowser) {
      const component = this;
      const _componentRoot = component.shadowed ? component.shadowRoot : component.body;
      const _imgLazyLoaded = [..._componentRoot.subelements("img[lazy-src]")];
      const _lazyLoadImages = function(image) {
        image.setAttribute("src", image.getAttribute("lazy-src")?.toString());
        image.onload = () => {
          image.removeAttribute("lazy-src");
        };
      };
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((items, observer2) => {
          items.forEach((item) => {
            if (item.isIntersecting) {
              _lazyLoadImages(item.target);
              observer2.unobserve(item.target);
            }
          });
        });
        _imgLazyLoaded.map(function(img) {
          return observer.observe(img);
        });
      } else {
        _imgLazyLoaded.map(_lazyLoadImages);
      }
    } else {
    }
    return null;
  }
  applyTransitionEffect(effectClassName) {
    const _Effect = ClassFactory(effectClassName);
    if (typeof _Effect === "undefined") {
      throw Error(`${effectClassName} not found.`);
    }
    if (typeof _Effect !== "undefined" && is_a(_Effect, "TransitionEffect")) {
      this.effect = New(_Effect, {
        component: this
      });
      this.effect?.apply(this.effect?.defaultParams);
    } else {
      logger.debug(`${effectClassName} is ${__getType__(_Effect)} but is not a TransitionEffect`);
    }
  }
  applyObserveTransitionEffect(effectClassName) {
    if (isBrowser) {
      const component = this;
      const _componentRoot = component.shadowed ? component.shadowRoot.host : component.body;
      const _applyEffect_ = function(element) {
        component.applyTransitionEffect(effectClassName);
      };
      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((items, observer2) => {
          items.forEach((item) => {
            if (item.isIntersecting) {
              _applyEffect_(item.target);
              observer2.unobserve(item.target);
            }
          });
        });
        observer.observe(_componentRoot);
      } else {
        _applyEffect_(_componentRoot);
      }
    } else {
    }
  }
  scrollIntoHash() {
    if (isBrowser) {
      const component = this;
      if (document.location.hash !== "") {
        const _componentRoot = component.shadowed ? component.shadowRoot : component.body;
        _componentRoot.subelements(document.location.hash).map(
          function(element) {
            if (typeof element.scrollIntoView === "function") {
              element.scrollIntoView(
                CONFIG.get("scrollIntoHash", {
                  behavior: "auto",
                  block: "top",
                  inline: "top"
                })
              );
            }
          }
        );
      }
    } else {
    }
  }
  i18n_translate() {
    if (isBrowser) {
      if (CONFIG.get("use_i18n")) {
        const component = this;
        const _componentRoot = component.shadowed ? component.shadowRoot : component.body;
        const lang1 = CONFIG.get("lang", "en");
        const lang2 = navigator.language.slice(0, 2);
        const i18n = _top.global.get("i18n");
        if (lang1 !== lang2 && (typeof i18n === "object" && Object.hasOwnProperty.call(i18n, "messages"))) {
          const callback_i18n = function() {
            const component2 = this;
            return new Promise(function(resolve, reject) {
              const messages = i18n.messages.filter(function(message) {
                return Object.hasOwnProperty.call(message, lang1) && Object.hasOwnProperty.call(message, lang2);
              });
              _componentRoot.subelements("ul,li,h1,h2,h3,a,b,p,input,textarea,summary,details,option,component").map(function(element) {
                messages.map(function(message) {
                  let _innerHTML = element.innerHTML;
                  _innerHTML = _innerHTML.replace(new RegExp(`${message[lang1]}`, "g"), message[lang2]);
                  element.innerHTML = _innerHTML;
                  return null;
                });
                return element;
              });
              resolve();
            });
          };
          callback_i18n.call(component).then(function() {
            logger.debug("i18n loaded for component: " + component.name);
          });
        }
      }
    } else {
    }
  }
  addComponentHelper(componentHelper) {
    const component = this;
    component._componentHelpers.push(componentHelper);
  }
  runComponentHelpers() {
    if (isBrowser) {
      const component = this;
      let __component_helpers__ = [];
      __component_helpers__.push(component.i18n_translate.bind(component));
      __component_helpers__.push(component.scrollIntoHash.bind(component));
      __component_helpers__.push(component.lazyLoadImages.bind(component));
      __component_helpers__ = __component_helpers__.concat(component._componentHelpers);
      __component_helpers__.map(
        function(_component_helper_) {
          logger.debug(`Executing ${_component_helper_.name} as component helper for ${component.name}...`);
          _component_helper_();
        }
      );
    } else {
    }
  }
};
Package("com.qcobjects", [
  Component
]);
_methods_(ClassFactory("Component")).map(function(__c__) {
  _protected_code_(__c__);
});

// src/DefaultTemplateHandler.ts
var DefaultTemplateHandler = class {
  template = "";
  __definition = {};
  static __definition = {};
  component;
  constructor({ component, template }) {
    this.component = component;
    this.template = template;
  }
  assign(data) {
    const templateInstance = this;
    if (typeof templateInstance.component === "undefined") {
      throw new Error("DefaultTemplateHandler.assign: component is undefined");
    }
    if (typeof templateInstance.component.processorHandler === "undefined") {
      throw new Error("DefaultTemplateHandler.assign: component.processorHandler is undefined");
    }
    const processorHandler = templateInstance.component.processorHandler;
    processorHandler.component = templateInstance.component;
    let parsedAssignmentText = typeof templateInstance.template !== "undefined" ? templateInstance.template : "";
    if (typeof data === "object") {
      [...Object.keys(data)].map(function(k) {
        let _value = data[k];
        if (typeof _value === "string" || typeof _value === "number" || !isNaN(_value)) {
          try {
            _value = Processor.processObject.bind(processorHandler).call(processorHandler, _value, templateInstance.component);
            parsedAssignmentText = parsedAssignmentText.replace(new RegExp(`{{${k}}}`, "g"), _value);
          } catch (e) {
            logger.warn(`${templateInstance.component.name} could not parse processors.`);
            throw Error(`${templateInstance.component.name} could not parse processors. Reason: ${e.message}`);
          }
        }
      });
    } else {
      logger.debug(`${templateInstance.component.name}.data is not an object`);
    }
    try {
      parsedAssignmentText = Processor.processObject.call(processorHandler, parsedAssignmentText, templateInstance.component);
    } catch (e) {
      logger.warn(`${templateInstance.component.name} could not parse processors.`);
      throw Error(`${templateInstance.component.name} could not parse processors. Reason: ${e.message}`);
    }
    return parsedAssignmentText;
  }
};
RegisterClass(DefaultTemplateHandler, "com.qcobjects");

// src/SourceJS.ts
var SourceJS = Class("SourceJS", Object, {
  domain: _domain_,
  basePath: _basePath_,
  body: _DOMCreateElement("script"),
  type: "text/javascript",
  containerTag: "body",
  url: "",
  data: {},
  async: false,
  external: false,
  set(name, value) {
    this[name] = value;
  },
  get(name, _default) {
    return this[name] || _default;
  },
  status: false,
  done() {
  },
  fail() {
  },
  rebuild() {
    const context = this;
    try {
      document.getElementsByTagName(context.containerTag)[0].appendChild(
        function(s, url, context2) {
          s.type = context2.type;
          s.src = url;
          s.crossOrigin = Object.hasOwnProperty.call(context2, "crossOrigin") ? context2.crossOrigin : "anonymous";
          s.async = context2.async;
          s.onreadystatechange = function() {
            if (this.readyState === "complete") {
              context2.done.call(context2);
            }
          };
          s.onload = function(e) {
            context2.status = true;
            context2.done.call(context2, e);
          };
          s.onerror = function(e) {
            context2.status = false;
            context2.fail.call(context2, e);
          };
          context2.body = s;
          return s;
        }.call(
          this,
          _DOMCreateElement("script"),
          this.external ? this.url : this.basePath + this.url,
          context
        )
      );
    } catch (e) {
      context.status = false;
      context.fail.call(context, e);
    }
  },
  Cast(o) {
    return _Cast(this, o);
  },
  _new_(properties) {
    this.__new__(properties);
    this.rebuild();
  }
});

// src/SourceCSS.ts
var SourceCSS = Class("SourceCSS", Object, {
  domain: _domain_,
  basePath: _basePath_,
  body: _DOMCreateElement("link"),
  url: "",
  data: {},
  async: false,
  external: false,
  set(name, value) {
    this[name] = value;
  },
  get(name, _default) {
    return this[name] || _default;
  },
  done() {
  },
  rebuild() {
    const context = this;
    if (isBrowser) {
      window.document.getElementsByTagName("head")[0].appendChild(
        function(s, url, context2) {
          s.type = "text/css";
          s.rel = "stylesheet";
          s.href = url;
          s.crossOrigin = "anonymous";
          s.onreadystatechange = function() {
            if (this.readyState === "complete") {
              context2.done.call(context2);
            }
          };
          s.onload = context2.done;
          context2.body = s;
          return s;
        }.call(
          this,
          _DOMCreateElement("link"),
          this.external ? this.url : this.basePath + this.url,
          context
        )
      );
    }
  },
  Cast(o) {
    return _Cast(this, o);
  },
  _new_(properties) {
    this.__new__(properties);
    this.rebuild();
  }
});

// src/globalSettings.ts
var GlobalSettings = class _GlobalSettings extends InheritClass {
  _GLOBAL = {};
  __definition = {};
  __classType = "GlobalSettings";
  constructor() {
    super(...arguments);
    this.set = _GlobalSettings.set.bind(this);
    this.get = _GlobalSettings.get.bind(this);
    this.__start__ = _GlobalSettings.__start__.bind(this);
  }
  static set(name, value) {
    this._GLOBAL[name] = value;
  }
  static get(name, _default) {
    let _value;
    if (typeof this._GLOBAL[name] !== "undefined") {
      _value = this._GLOBAL[name];
    } else if (typeof _default !== "undefined") {
      _value = _default;
    }
    return _value;
  }
  static __start__() {
    const __load__serviceWorker = function() {
      let _promise;
      if (isBrowser) {
        _promise = new Promise(function(resolve, reject) {
          if ("serviceWorker" in navigator && typeof CONFIG.get("serviceWorkerURI") !== "undefined") {
            CONFIG.set("serviceWorkerScope", CONFIG.get("serviceWorkerScope") ? CONFIG.get("serviceWorkerScope") : "/");
            navigator.serviceWorker.register(CONFIG.get("serviceWorkerURI"), {
              scope: CONFIG.get("serviceWorkerScope")
            }).then(function(registration) {
              logger.debug("Service Worker Registered");
              resolve.call(_promise, registration);
            }, function(registration) {
              logger.debug("Error registering Service Worker");
              reject.call(_promise, registration);
            });
            navigator.serviceWorker.ready.then(function(registration) {
              logger.debug("Service Worker Ready");
              resolve.call(_promise, registration);
            }, function(registration) {
              logger.debug("Error loading Service Worker");
              reject.call(_promise, registration);
            });
          }
        });
      } else {
        _promise = Promise.resolve();
      }
      return _promise;
    };
    const _buildComponents = function() {
      return new Promise((resolve) => {
        if (isBrowser) {
          logger.debug("Starting to building components");
          try {
            buildComponentsStack();
          } catch (e) {
            throw Error(`Something went wrong trying to start components tree: ${e.message}`);
          }
          logger.debug("Initializing the service worker");
          __load__serviceWorker.call(_top).catch(function(e) {
            logger.debug(`error loading the service worker ${e}`);
          });
        }
        resolve();
      });
    };
    logger.debug("Starting to load the config settings...");
    if (CONFIG.get("useConfigService", false)) {
      logger.debug("Loading settings using local configuration file...");
      _top.global.configService = New(ClassFactory("ConfigService"));
      _top.global.configService.configLoaded = _buildComponents;
      serviceLoader(_top.global.configService);
    } else {
      logger.debug("Starting to load the components...");
      _buildComponents.call(this);
    }
  }
};
Package("com.qcobjects", [
  GlobalSettings
]);

// src/WidgetsFactory.ts
var _ComponentWidget_ = class extends HTMLElement {
  constructor() {
    super();
    const componentWidget = this;
    const componentName = componentWidget.nodeName.toLowerCase();
    const componentBody = _DOMCreateElement("quick-component");
    const __enabled__atributes__ = componentWidget.getAttributeNames();
    componentBody.setAttribute("name", componentName);
    if (!componentWidget.hasAttribute("shadowed")) {
      componentBody.setAttribute("shadowed", "true");
    }
    __enabled__atributes__.map(function(attributeName) {
      if (componentWidget.hasAttribute(attributeName)) {
        componentBody.setAttribute(attributeName, componentWidget?.getAttribute(attributeName));
        componentWidget.removeAttribute(attributeName);
      }
    });
    const data_attributenames = componentWidget.getAttributeNames().filter(function(a) {
      return a.startsWith("data-");
    }).map(function(a) {
      return a.split("-")[1];
    });
    data_attributenames.map(function(_attribute_name_) {
      componentBody.setAttribute("data-" + _attribute_name_, componentWidget?.getAttribute("data-" + _attribute_name_));
      componentWidget.removeAttribute("data-" + _attribute_name_);
    });
    [...componentWidget.children].map(function(element) {
      componentBody.appendChild(element.cloneNode(true));
      element.remove();
    });
    componentWidget.append(componentBody);
  }
};
Export(_ComponentWidget_);
var RegisterWidget = function(widgetName) {
  customElements.define(widgetName, class extends _ComponentWidget_ {
  });
};
var RegisterWidgets = function() {
  const widgetList = [...arguments];
  widgetList.filter(function(widgetName) {
    return typeof widgetName === "string";
  }).map(function(widgetName) {
    RegisterWidget(widgetName);
  });
};
_protected_code_(RegisterWidget);
_protected_code_(RegisterWidgets);
Export(RegisterWidget);
Export(RegisterWidgets);

// src/Controller.ts
var Controller = class extends InheritClass {
  __instanceID;
  component = null;
  dependencies = [];
  constructor({
    component,
    dependencies
  }) {
    super({ component, dependencies });
    this.component = component;
    this.dependencies = dependencies;
    if (typeof this.component === "undefined" || this.component === null) {
      throw Error(`${__getType__(this)} must be called with a component`);
    }
  }
  body;
  routingSelectedAttr(attrName) {
    return this.component?.routingSelected.map(function(r) {
      return r[attrName];
    }).filter(function(v) {
      return v;
    }).pop();
  }
  isTouchable() {
    return "ontouchstart" in window || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
  }
  onpress(subelementSelector, handler) {
    try {
      if (this.isTouchable()) {
        (this.component?.body.subelements(subelementSelector))[0].addEventListener("touchstart", handler, {
          passive: true
        });
      } else {
        (this.component?.body.subelements(subelementSelector))[0].addEventListener("click", handler, {
          passive: true
        });
      }
    } catch (e) {
      logger.debug("No button to assign press event");
    }
  }
  createRoutingController() {
    const controller = this;
    const component = controller.component;
    const controllerName = controller.routingSelectedAttr("controllerclass");
    if (typeof controllerName !== "undefined") {
      const _Controller2 = ClassFactory(controllerName);
      if (typeof _Controller2 !== "undefined" && component !== null) {
        component.routingController = New(_Controller2, {
          component
        });
        if (Object.hasOwnProperty.call(component.routingController, "done") && typeof component.routingController.done === "function") {
          component.routingController.done.call(component.routingController);
        }
      }
    }
  }
  done() {
  }
};
Package("com.qcobjects.controllers", [
  Controller
]);

// src/View.ts
var View = class extends InheritClass {
  constructor({ component = void 0, dependencies = [] }) {
    super(...arguments);
    if (typeof this.component === "undefined" || this.component === "null") {
      throw Error(`${__getType__(this)} must be called with a component`);
    }
  }
};
Package("com.qcobjects.views", [
  View
]);

// src/Service.ts
var Service = class extends InheritClass {
  kind = "rest";
  /* it can be rest, mockup, local */
  domain = _domain_;
  basePath = _basePath_;
  url = "";
  method = "GET";
  data = {};
  reload = false;
  cached = false;
  headers;
  template;
  // eslint-disable-next-line no-unused-vars
  done({ request, service }) {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line no-unused-vars
  fail(...args) {
    throw new Error("Method not implemented.");
  }
  __instanceID;
  __classType;
  __definition;
  __new__() {
    throw new Error("Method not implemented.");
  }
  __namespace;
  body;
  set(name, value) {
    this[name] = value;
  }
  get(name, _default) {
    return this[name] || _default;
  }
};
var JSONService = class extends Service {
  method = "GET";
  cached = false;
  headers = {
    "Content-Type": "application/json",
    "charset": "utf-8"
  };
  JSONresponse = null;
  done(result) {
    logger.debug("***** RECEIVED RESPONSE:");
    logger.debug(result.service.template);
    this.JSONresponse = JSON.parse(result.service.template);
  }
};
var ConfigService = class extends JSONService {
  method = "GET";
  cached = false;
  configFileName = "config.json";
  headers = {
    "Content-Type": "application/json",
    "charset": "utf-8"
  };
  JSONresponse = null;
  done(result) {
    logger.debug("***** CONFIG LOADED:");
    logger.debug(result.service.template);
    this.JSONresponse = JSON.parse(result.service.template);
    if (Object.hasOwnProperty.call(this.JSONresponse, "__encoded__")) {
      const decodedValue = _Crypt.decrypt(this.JSONresponse?.__encoded__, _secretKey);
      this.JSONresponse = JSON.parse(decodedValue);
    }
    const jsonResponse = this.JSONresponse;
    Object.keys(jsonResponse).map((k) => {
      CONFIG.set(k, jsonResponse[k]);
    });
    this.configLoaded();
  }
  fail() {
    this.configLoaded();
  }
  constructor() {
    super();
    this.set("url", `${this.get("basePath")}${this.get("configFileName")}`);
  }
};
Package("com.qcobjects.api", [
  Service
]);
Package("com.qcobjects.api.services", [
  JSONService
]);
Package("com.qcobjects.api.config", [
  ConfigService
]);

// src/VO.ts
var VO = class extends InheritClass {
  constructor() {
    super(...arguments);
  }
};
Package("com.qcobjects.valueObjects", [
  VO
]);

// src/Effect.ts
var Effect = class extends InheritClass {
  duration = 1e3;
  constructor() {
    super(...arguments);
  }
  animate({
    timing,
    draw,
    duration
  }) {
    const _self = this;
    const start = performance.now();
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      const progress = timing(timeFraction);
      draw(Math.round(progress * 100));
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } else {
        if (typeof _self !== "undefined" && _self !== null && Object.hasOwnProperty.call(_self, "done") && (typeof _self.done).toLowerCase() === "function") {
          _self.done.call(_self);
        }
      }
    });
  }
};
Package("com.qcobjects.effects.base", [
  Effect
]);

// src/TransitionEffect.ts
var TransitionEffect = class extends Effect {
  duration = 385;
  defaultParams = {
    alphaFrom: 0,
    alphaTo: 1,
    angleFrom: 180,
    angleTo: 0,
    radiusFrom: 0,
    radiusTo: 30,
    scaleFrom: 0,
    scaleTo: 1
  };
  fitToHeight = false;
  fitToWidth = false;
  effects = [];
  constructor() {
    super();
    logger.info("DECLARING TransitionEffect  ");
    this.component.defaultParams = this.defaultParams;
  }
  apply({
    alphaFrom,
    alphaTo,
    angleFrom,
    angleTo,
    radiusFrom,
    radiusTo,
    scaleFrom,
    scaleTo
  }) {
    const _transition_ = this;
    logger.info("EXECUTING TransitionEffect  ");
    const componentRoot = _transition_.component.shadowed ? _transition_.component.shadowRoot.host : _transition_.component.body;
    if (_transition_.fitToHeight) {
      componentRoot.height = typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null ? componentRoot.offsetParent.scrollHeight : componentRoot.getBoundingClientRect().height;
    }
    if (_transition_.fitToWidth) {
      componentRoot.width = typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null ? componentRoot.offsetParent.scrollWidth : componentRoot.getBoundingClientRect().width;
    }
    componentRoot.style.display = "block";
    _transition_.effects.map(function(effectClassName, eff) {
      const __effectClass__ = ClassFactory(effectClassName);
      const effectObj = new __effectClass__({});
      const effectClassMethod = effectObj.apply;
      const args = [componentRoot].concat(Object.values({
        alphaFrom,
        alphaTo,
        angleFrom,
        angleTo,
        radiusFrom,
        radiusTo,
        scaleFrom,
        scaleTo
      }));
      effectClassMethod.apply(_transition_, args);
    });
  }
};
Package("com.qcobjects.effects.transitions.base", [
  TransitionEffect
]);

// src/Timer.ts
var Timer = class extends InheritClass {
  constructor() {
    super(...arguments);
  }
  duration = 1e3;
  alive = true;
  thread({
    timing,
    intervalInterceptor,
    duration
  }) {
    const timer = this;
    const start = performance.now();
    requestAnimationFrame(function thread(time) {
      const elapsed = time - start;
      let timeFraction = elapsed / duration;
      if (timeFraction > 1) timeFraction = 1;
      const progress = timing(timeFraction, elapsed);
      intervalInterceptor(Math.round(progress * 100));
      if ((timeFraction < 1 || duration === -1) && timer.alive) {
        requestAnimationFrame(thread);
      }
    });
  }
};
Package("com.qcobjects.timing", [
  Timer
]);

// src/ArrayCollection.ts
var ArrayList = Class("ArrayList", Array, []);
var ArrayCollection = Class("ArrayCollection", Object, {
  source: New(ClassFactory("ArrayList"), []),
  changed(prop, value) {
    logger.debug("VALUE CHANGED");
    logger.debug(prop);
    logger.debug(value);
  },
  push(value) {
    const self2 = this;
    logger.debug("VALUE ADDED");
    logger.debug(value);
    self2.source.push(value);
  },
  pop(value) {
    const self2 = this;
    logger.debug("VALUE POPPED");
    logger.debug(value);
    self2.source.pop(value);
  },
  _new_(source) {
    const self2 = this;
    let _index = 0;
    self2.source = New(ClassFactory("ArrayList"), source);
    for (const _k in self2.source) {
      if (!isNaN(_k)) {
        logger.debug("binding " + _k.toString());
        (function(_pname) {
          Object.defineProperty(self2, _pname, {
            set(value) {
              logger.debug("setting " + _pname + "=" + value);
              self2.source[_pname] = value;
              self2.changed(_pname, value);
            },
            get() {
              return self2.source[_pname];
            }
          });
        })(_k);
        _index++;
      }
    }
    self2.source.length = _index;
    Object.defineProperty(self2, "length", {
      get() {
        return self2.source.length;
      }
    });
  }
});

// src/DDO.ts
var DDO = class extends ClassFactory("InheritClass") {
  constructor({
    instance,
    name,
    fget,
    fset,
    value
  }) {
    super({
      instance,
      name,
      fget,
      fset,
      value
    });
    this._new_({
      instance,
      name,
      fget,
      fset,
      value
    });
  }
  _new_({
    instance,
    name,
    fget,
    fset,
    value
  }) {
    const ddoInstance = this;
    var name = typeof name === "undefined" ? ObjectName(ddoInstance) : name;
    Object.defineProperty(instance, name, {
      set(val) {
        const _value = val;
        logger.debug("value changed " + name);
        let ret;
        if (typeof fset !== "undefined" && typeof fset === "function") {
          ret = fset(_value);
        } else {
          ret = _value;
        }
        instance["_" + name] = ret;
      },
      get() {
        const _value = instance["_" + name];
        logger.debug("returning value " + name);
        const is_ddo = function(v) {
          if (typeof v === "object" && Object.hasOwnProperty.call(v, "value")) {
            return v.value;
          }
          return v;
        };
        let ret;
        if (typeof fget !== "undefined" && typeof fget === "function") {
          ret = fget(is_ddo(_value));
        } else {
          ret = is_ddo(_value);
        }
        return ret;
      }
    });
  }
};
Export(DDO);

// src/Toggle.ts
var Toggle = class extends InheritClass {
  _toggle = false;
  _inverse = true;
  _positive = null;
  _negative = null;
  _dispatched = null;
  _args = {};
  constructor(positive, negative, args) {
    super({ positive, negative, args });
    this._new_({ positive, negative, args });
  }
  changeToggle() {
    this._toggle = !this._toggle;
  }
  _new_({
    positive,
    negative,
    args
  }) {
    this._positive = positive;
    this._negative = negative;
    this._args = args;
  }
  fire() {
    const toggle = this;
    var _promise = new Promise(function(resolve, reject) {
      if (typeof toggle._positive === "function" && typeof toggle._negative === "function") {
        if (toggle._inverse) {
          toggle._dispatched = toggle._toggle ? toggle._negative.bind(toggle) : toggle._positive.bind(toggle);
        } else {
          toggle._dispatched = toggle._toggle ? toggle._positive.bind(toggle) : toggle._negative.bind(toggle);
        }
        toggle._dispatched?.call(toggle, toggle._args);
        resolve.call(_promise, toggle);
      } else {
        logger.debug("Toggle functions are not declared");
        reject.call(_promise, toggle);
      }
      return toggle;
    }).then(function(toggle2) {
      toggle2.changeToggle();
      return toggle2;
    }).catch(function(e) {
      logger.debug(e.toString());
      return toggle;
    }).finally(() => {
      return toggle;
    });
    return _promise;
  }
};
Package("com.qcobjects.tools.essentials", [
  Toggle
]);

// src/DocumentLayout.ts
var getDocumentLayout = function() {
  const h = (w, h2) => {
    return w > h2 ? "landscape" : null;
  };
  const v = (w, h2) => {
    return h2 > w ? "portrait" : null;
  };
  const square = (w, h2) => {
    return w === h2 ? "square" : null;
  };
  return [
    h(document.documentElement.clientWidth, document.documentElement.clientHeight),
    v(document.documentElement.clientWidth, document.documentElement.clientHeight),
    square(document.documentElement.clientWidth, document.documentElement.clientHeight)
  ].filter((e) => e !== null).pop();
};

// src/QCObjects.ts
var import_global2 = __toESM(require_global_d());
(function __qcobjects__(_top2) {
  if (typeof Object.defineProperty !== "undefined" && typeof _top2 !== "undefined") {
    try {
      Object.defineProperty(_top2, "__qcobjects__", {
        enumerable: true,
        configurable: false,
        writable: false,
        value: __qcobjects__
      });
    } catch (e) {
      if (typeof _top2.__qcobjects__ !== "undefined") {
        _top2.__qcobjects__.loaded = true;
      }
    }
  }
  if (typeof _top2.__qcobjects__.loaded === "undefined") {
    _top2.__qcobjects__.loaded = true;
    const global2 = _top2;
    _top2.global = global2;
    if (!isBrowser) {
      const fs = _require_("fs");
    }
    if (isBrowser) {
      import_global2.Element.prototype.subelements = subelements;
      HTMLDocument.prototype.subelements = subelements;
      import_global2.HTMLElement.prototype.subelements = subelements;
      if (typeof import_global2.ShadowRoot !== "undefined") {
        import_global2.ShadowRoot.prototype.subelements = subelements;
      }
    }
    logger.debugEnabled = false;
    logger.infoEnabled = true;
    _top2.logger = logger;
    if (isBrowser) {
      import_global2.Element.prototype.find = function(tag) {
        const _self = this;
        const _oo = [];
        const _tags = document.subelements(tag);
        _tags.map(function(_tt, _t) {
          if (typeof _tags[_t] !== "undefined" && _tags[_t].parentNode.tagName === _self.parentNode.tagName) {
            _oo.push(_Cast(_tt, new Object()));
          }
        });
        return _oo;
      };
    }
    if (isBrowser) {
      import_global2.Element.prototype.append = function QC_Append(child) {
        if (isQCObjects_Object(child) || typeof child.body !== "undefined") {
          this.appendChild(child.body);
        } else {
          this.appendChild(child);
        }
      };
      import_global2.Element.prototype.render = function QC_Render(content) {
        const _self = this;
        const _appendVDOM = function(_self2, content2) {
          if (typeof document.implementation.createHTMLDocument !== "undefined") {
            const doc = document.implementation.createHTMLDocument("");
            doc.innerHTML = content2;
            doc.body.subelements("*").map(function(element) {
              return _self2.append(element);
            });
          }
        };
        if (typeof this.innerHTML !== "undefined") {
          try {
            this.innerHTML += content;
          } catch (e) {
            _appendVDOM(_self, content);
          }
        } else {
          _appendVDOM(_self, content);
        }
      };
    }
    Export(waitUntil);
    Export(_super_);
    Export(ComplexStorageCache);
    Export(ClassFactory);
    Export(_DOMCreateElement);
    Export(shortCode);
    Export(__getType__);
    Export(is_a);
    Package("com.qcobjects", [Processor]);
    if (isBrowser) {
      import_global2.Element.prototype.Cast = function QC_Object(_o) {
        _o.__definition.body = this;
        var _o = New(_o);
        return _o;
      };
    }
    if (isBrowser) {
      window.onload = _Ready;
      if (is_phonegap) {
        document.addEventListener("deviceready", _Ready, captureFalseTouch);
      }
    } else {
      global2.onload = _Ready;
    }
    if (isBrowser) {
      window.addEventListener("popstate", function(popStateEvent) {
        popStateEvent.stopImmediatePropagation();
        popStateEvent.stopPropagation();
        ClassFactory("Component").route();
      });
    }
    Export(serviceLoader);
    Export(componentLoader);
    Export(ComponentURI);
    Export(ObjectName);
    Export(_DataStringify);
    Export(isQCObjects_Class);
    Export(isQCObjects_Object);
    Export(NamespaceRef);
    const __to_number = function(value) {
      return isNaN(value) ? new Number(0) : new Number(value);
    };
    import_global2.Array.prototype.unique = function() {
      return this.filter(function(value, index, self2) {
        return self2.indexOf(value) === index;
      });
    };
    import_global2.Array.unique = function(a) {
      return a.unique();
    };
    _protected_code_(import_global2.Array.unique);
    _protected_code_(import_global2.Array.prototype.unique);
    import_global2.Array.prototype.table = function() {
      console.table(this);
    };
    import_global2.Array.table = function(a) {
      return a.table();
    };
    _protected_code_(import_global2.Array.table);
    _protected_code_(import_global2.Array.prototype.table);
    import_global2.Array.prototype.sum = function() {
      return this.reduce(function(prev, current) {
        return __to_number(prev) + __to_number(current);
      }, 0);
    };
    import_global2.Array.sum = function(a) {
      return a.sum();
    };
    _protected_code_(import_global2.Array.sum);
    _protected_code_(import_global2.Array.prototype.sum);
    import_global2.Array.prototype.avg = function() {
      return this.length < 1 ? 0 : this.reduce(function(prev, current) {
        return (__to_number(prev) + __to_number(current)) / 2;
      });
    };
    import_global2.Array.avg = function(a) {
      return a.avg();
    };
    _protected_code_(import_global2.Array.avg);
    _protected_code_(import_global2.Array.prototype.avg);
    import_global2.Array.prototype.min = function() {
      return this.reduce(function(prev, current) {
        return __to_number(prev) <= __to_number(current) ? prev : current;
      }, Infinity);
    };
    import_global2.Array.min = function(a) {
      return a.min();
    };
    _protected_code_(import_global2.Array.min);
    _protected_code_(import_global2.Array.prototype.min);
    import_global2.Array.prototype.max = function() {
      return this.reduce(function(prev, current) {
        return __to_number(prev) >= __to_number(current) ? prev : current;
      }, 0);
    };
    import_global2.Array.max = function(a) {
      return a.max();
    };
    _protected_code_(import_global2.Array.max);
    _protected_code_(import_global2.Array.prototype.max);
    import_global2.Array.prototype.sortBy = function(propName, sortAsc = true) {
      const sort_function = sortAsc ? function(prev, current) {
        return current[propName] < prev[propName] ? 1 : -1;
      } : function(prev, current) {
        return current[propName] > prev[propName] ? 1 : -1;
      };
      return this.sort(sort_function);
    };
    import_global2.Array.sortBy = function(a, propName, sortAsc = true) {
      return a.sortBy(propName, sortAsc);
    };
    _protected_code_(import_global2.Array.sortBy);
    _protected_code_(import_global2.Array.prototype.sortBy);
    import_global2.Array.prototype.matrix = function(_length, _fillValue = 0) {
      const x_func = function(x = void 0) {
        return _fillValue;
      };
      return import_global2.Array.from({
        length: _length
      }, x_func);
    };
    import_global2.Array.matrix = function(a, _length, _fillValue = 0) {
      return a.matrix(_length, _fillValue);
    };
    _protected_code_(import_global2.Array.matrix);
    _protected_code_(import_global2.Array.prototype.matrix);
    import_global2.Array.prototype.matrix2d = function(_length, _fillValue = 0) {
      const y_func = function(y) {
        return _fillValue;
      };
      const x_func = function(x) {
        return import_global2.Array.from({
          length: _length
        }, y_func);
      };
      return import_global2.Array.from({
        length: _length
      }, x_func);
    };
    import_global2.Array.matrix2d = function(a, _length, _fillValue = 0) {
      return a.matrix2d(_length, _fillValue);
    };
    _protected_code_(import_global2.Array.matrix2d);
    _protected_code_(import_global2.Array.prototype.matrix2d);
    import_global2.Array.prototype.matrix3d = function(_length, _fillValue = 0) {
      const y_func = function(y) {
        return import_global2.Array.from({
          length: _length
        }, function() {
          return _fillValue;
        });
      };
      const x_func = function(x) {
        return import_global2.Array.from({
          length: _length
        }, y_func);
      };
      return import_global2.Array.from({
        length: _length
      }, x_func);
    };
    import_global2.Array.matrix3d = function(a, _length, _fillValue = 0) {
      return a.matrix3d(_length, _fillValue);
    };
    _protected_code_(import_global2.Array.matrix3d);
    _protected_code_(import_global2.Array.prototype.matrix3d);
    import_global2.String.prototype.list = function() {
      const __instance = this;
      return _top2.range(0, __instance.length - 1).map(function(i) {
        return __instance[i];
      });
    };
    _protected_code_(import_global2.String.prototype.list);
    ClassFactory("ArrayList").matrix = import_global2.Array.matrix;
    ClassFactory("ArrayList").matrix2d = import_global2.Array.matrix2d;
    ClassFactory("ArrayList").matrix3d = import_global2.Array.matrix3d;
    _protected_code_(ClassFactory("ArrayList").matrix);
    _protected_code_(ClassFactory("ArrayList").matrix2d);
    _protected_code_(ClassFactory("ArrayList").matrix3d);
    setDefaultProcessors();
    Ready(function() {
      if (!CONFIG.get("useSDK")) {
        _top2.__start__();
      }
    });
    Export(Export);
    Export(Import);
    Export(Package);
    Export(Class);
    Export(New);
    Export(Tag);
    Export(Ready);
    Export(ready);
    Export(isBrowser);
    Export(_methods_);
    Export(ClassFactory("GlobalSettings"));
    resetTop(_CastProps(New(ClassFactory("GlobalSettings")), _top2));
    (function(_top3) {
      Object.defineProperty(_top3, "PackagesNameList", {
        set(val) {
          logger.debug("PackagesNameList is readonly");
        },
        get() {
          const _get_packages_names = function(_packages) {
            let _keys = [];
            for (const _k in _packages) {
              if (typeof _packages[_k] !== "undefined" && typeof _packages[_k] !== "function" && Object.hasOwnProperty.call(_packages[_k], "length") && _packages[_k].length > 0) {
                _keys.push(_k);
                _keys = _keys.concat(_get_packages_names(_packages[_k]));
              }
            }
            return _keys;
          };
          return _get_packages_names(_QC_PACKAGES);
        }
      });
      Object.defineProperty(_top3, "PackagesList", {
        set(value) {
          logger.debug("PackagesList is readonly");
        },
        get() {
          return _top3.PackagesNameList.map(function(packagename) {
            const _classesList = Package(packagename);
            let _ret_;
            if (_classesList) {
              _ret_ = {
                packageName: packagename,
                classesList: _classesList.filter(function(_packageClass) {
                  return isQCObjects_Class(_packageClass);
                })
              };
            }
            return _ret_;
          }).filter(function(_p) {
            return typeof _p !== "undefined";
          });
        }
      });
      Object.defineProperty(_top3, "ClassesList", {
        set(value) {
          logger.debug("ClassesList is readonly");
        },
        get() {
          let _classesList = [];
          _top3.PackagesList.map(function(_package_element) {
            _classesList = _classesList.concat(_package_element.classesList.map(
              function(_class_element) {
                return {
                  packageName: _package_element.packageName,
                  className: _package_element.packageName + "." + _class_element.__definition.__classType,
                  classFactory: _class_element
                };
              }
            ));
            return _package_element;
          });
          return _classesList;
        }
      });
      Object.defineProperty(_top3, "ClassesNameList", {
        set(value) {
          logger.debug("ClassesNameList is readonly");
        },
        get() {
          return _top3.ClassesList.map(function(_class_element) {
            return _class_element.className;
          });
        }
      });
      if (isBrowser) {
        Class("GLOBAL", _QC_CLASSES.global);
        Export(ClassFactory("GLOBAL"));
      }
      Export(global2);
      if (CONFIG.get("useSDK")) {
        (function(_top4) {
          const remoteImportsPath = CONFIG.get("remoteImportsPath");
          const external = !CONFIG.get("useLocalSDK");
          CONFIG.set("remoteImportsPath", CONFIG.get("remoteSDKPath"));
          let tryImportingSDK = false;
          let sdkName = "QCObjects-SDK";
          if (isBrowser) {
            tryImportingSDK = true;
          } else {
            const sdkPath = findPackageNodePath("qcobjects-sdk");
            if (sdkPath !== null) {
              sdkName = "qcobjects-sdk";
              tryImportingSDK = true;
            } else {
              sdkName = "node_modules/qcobjects-sdk/QCObjects-SDK";
              tryImportingSDK = true;
            }
          }
          if (tryImportingSDK) {
            logger.info("Importing SDK... " + sdkName);
            if (isNodeCommonJS && typeof require !== "undefined") {
              const sdk = _require_("qcobjects-sdk");
            } else {
              Import(sdkName, function() {
                if (external) {
                  logger.debug("QCObjects-SDK.js loaded from remote location");
                } else {
                  logger.debug("QCObjects-SDK.js loaded from local");
                }
                CONFIG.set("remoteImportsPath", remoteImportsPath);
              }, external);
            }
          } else {
            logger.debug("SDK has not been imported as it is not available at the moment");
          }
        })(_top3);
      }
    })(_top2);
    if (isBrowser) {
      asyncLoad(function() {
        Ready(function() {
          (function(_top3) {
            const lastKnownScrollPosition = 0;
            let ticking = false;
            const scrollHeight = Math.max(
              document.body.scrollHeight,
              document.documentElement.scrollHeight,
              document.body.offsetHeight,
              document.documentElement.offsetHeight,
              document.body.clientHeight,
              document.documentElement.clientHeight
            );
            const scrollWidth = Math.max(
              document.body.scrollWidth,
              document.documentElement.scrollWidth,
              document.body.offsetWidth,
              document.documentElement.offsetWidth,
              document.body.clientWidth,
              document.documentElement.clientWidth
            );
            function scrollDispatcher(event) {
              const percentY = Math.round(_top3.scrollY * 100 / scrollHeight);
              const percentX = Math.round(_top3.scrollX * 100 / scrollWidth);
              const scrollPercentEventEvent = new CustomEvent("scrollpercent", {
                detail: {
                  percentX,
                  percentY
                }
              });
              event.target.dispatchEvent(scrollPercentEventEvent);
              let secondaryEventName = "defaultscroll";
              const __valid_scrolls__ = [0, 5, 10, 25, 50, 75, 90, 95, 100];
              __valid_scrolls__.filter(function(p) {
                return p === percentY;
              }).map(function(pY) {
                secondaryEventName = "percentY" + percentY.toString();
                const secondaryCustomEvent = new CustomEvent(secondaryEventName, {
                  detail: {
                    percentX,
                    percentY
                  }
                });
                event.target.dispatchEvent(secondaryCustomEvent);
              });
            }
            document.addEventListener("scroll", function(event) {
              if (!ticking) {
                requestAnimationFrame(function() {
                  scrollDispatcher(event);
                  ticking = false;
                });
                ticking = true;
              }
            });
          })(_top2);
        });
      }, []);
    }
    if (!isBrowser) {
      if (typeof _top2.global !== "undefined" && Object.hasOwnProperty.call(_top2.global, "_fireAsyncLoad")) {
        _fireAsyncLoad.call(_top2);
      }
      if (typeof _top2.global !== "undefined" && Object.hasOwnProperty.call(_top2.global, "onload")) {
        _top2.global.onload.call(_top2);
      }
    }
    (function(isBrowser2) {
      const __freeze__ = function() {
        Object.freeze(Object.prototype);
        Object.freeze(Object);
      };
      if (isBrowser2 && CONFIG.get("secureObjects", false)) {
        Ready(function() {
          __freeze__();
        });
      } else if (CONFIG.get("secureObjects", false)) {
        __freeze__();
      }
    })(isBrowser);
  }
})(_top);
var QCObjects_default = {
  BackendMicroservice,
  Logger,
  Class,
  _Crypt,
  TagElements,
  DefaultTemplateHandler,
  SourceJS,
  SourceCSS,
  ArrayList,
  ArrayCollection,
  GlobalSettings,
  DDO,
  ComplexStorageCache,
  _ComponentWidget_,
  asyncLoad,
  RegisterClass,
  ComponentURI,
  waitUntil,
  _super_,
  _DOMCreateElement,
  shortCode,
  __getType__,
  is_a,
  _DataStringify,
  serviceLoader,
  componentLoader,
  ObjectName,
  isQCObjects_Class,
  isQCObjects_Object,
  NamespaceRef,
  RegisterWidget,
  RegisterWidgets,
  range,
  getDocumentLayout,
  Export,
  New,
  Tag,
  Ready,
  _methods_,
  InheritClass,
  Processor,
  Component,
  CONFIG,
  Controller,
  View,
  Service,
  JSONService,
  ConfigService,
  VO,
  Effect,
  TransitionEffect,
  Timer,
  Toggle,
  logger,
  global,
  ClassFactory,
  Package,
  Import
};
