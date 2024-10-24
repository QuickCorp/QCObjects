import { _Cast, _CastProps } from "./Cast";
import { _DOMCreateElement } from "./DOMCreateElement";
import { __getType__ } from "./getType";
import { __instanceID, IncrementInstanceID } from "./IncrementInstanceID";
import { _methods_ } from "./introspection";
import { is_a } from "./is_a";
import { __is__forbidden_name__ } from "./is_forbidden_name";
import { _LegacyCopy } from "./LegacyCopy";
import { logger } from "./Logger";
import { isBrowser } from "./platform";
import { _QC_CLASSES } from "./PrimaryCollections";
import { _top } from "./top";

    /**
     * Creates new object class  of another object
     *
     * @param {String} name
     * @param {Object} type
     * @param {Object} definition
     */
    export const Class = function () {
        var _types_ = {};
        var name, type, definition;
  
        switch (arguments.length) {
          case 0:
            return class { };
          case 1:
            name = arguments[0];
            type = class { };
            definition = {};
            break;
          case 2:
            name = arguments[0];
            type = class { };
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
  
        if (__is__forbidden_name__.call(this, name)) {
          throw new Error(`${name} is not an allowed word in the name of a class`);
        }
  
        if (typeof type["__definition"] !== "undefined") {
          definition["__definition"] = Object.assign(_LegacyCopy(type.__definition), type);
        }
  
        _types_[type.name] = type;
  
        if (typeof definition === "undefined" || definition === null) {
          definition = {};
        } else {
          definition = _LegacyCopy(definition);
        }
  
        /* hack to prevent duplicate __instanceID */
        if (typeof definition["__instanceID"] !== "undefined") {
          delete definition["__instanceID"];
        }
  
        _QC_CLASSES[name] = class extends _types_[type.name] {
          __classType = name;
          __definition = {
            ...definition
          };
  
          static hierarchy(__class__) {
            var __classType = function (o_c) {
              return (Object.hasOwnProperty.call(o_c, "__classType")) ? (o_c.__classType) : (__getType__.call(__class__, o_c));
            };
            var __hierarchy__proto__ = (c) => {
              return (typeof c !== "undefined" && typeof c.__proto__ !== "undefined" && c.__proto__ !== null) ? (((__classType(c) !== "") ? ([__classType(c)]) : ([])).concat(__hierarchy__proto__(c.__proto__))) : ([]);
            };
  
            if (typeof __class__ === "undefined" || __class__ === null) {
              __class__ = this;
            }
            var __hierarchy = [];
            __hierarchy.push(__classType(__class__));
            __hierarchy = __hierarchy.concat(__hierarchy__proto__(__class__.__proto__));
            return __hierarchy;
          }
  
          static getParentClass() {
            return Object.getPrototypeOf(this.prototype.constructor);
          }
  
          constructor() {
            var _o_;
            if (arguments.length > 0) {
              _o_ = {
                ...arguments[0]
              };
            } else {
              _o_ = {};
            }
            super(_o_);
  
            let self = this;
            IncrementInstanceID();
            if (!(self as any).__instanceID) {
              Object.defineProperty(self, "__instanceID", {
                value: __instanceID,
                writable: false
              });
            }
  
            if (typeof self.__definition !== "undefined") {
              Object.keys(self.__definition).filter(function (k) {
                return isNaN(k) && !["name", "__instanceID", "__classType", "__definition"].includes(k);
              }).forEach(function (key) {
                if (typeof self.__definition[key] === "function") {
                  self[key] = self.__definition[key].bind(self);
                } else {
                  self[key] = self.__definition[key];
                }
              });
            }
            _methods_(_QC_CLASSES[self.__classType]).map(function (m) {
              self[m.name] = m.bind(self);
            });
            _methods_(self.__definition).map(function (m) {
              self[m.name] = m.bind(self);
            });
  
            if (!!self["body"]) {
              if (typeof self.__definition === "undefined" || (!Object.hasOwnProperty.call(self.__definition, "body")) || typeof self.__definition.body === "undefined") {
                try {
                  if (isBrowser) {
                    self["body"] = _DOMCreateElement(self.__definition.__classType);
                  } else {
                    self["body"] = {};
                  }
                } catch (e) {
                  self["body"] = {};
                }
              } else if (Object.hasOwnProperty.call(self.__definition, "body")) {
                self["body"] = self.__definition.body;
              }
            }
  
  
            try {
              if (typeof self.__new__ === "function") {
                self.__new__.call(self, _o_);
              } else if (typeof super.__new__ === "function") {
                self.__new__ = super.__new__.bind(self);
                self.__new__.call(self, _o_);
              }
              if (typeof self === "object" && Object.hasOwnProperty.call(self, "_new_") && typeof (self._new_ as any).isCalled === "undefined") {
                try {
                  self._new_.call(self, _o_);
                  (self._new_ as any).isCalled = true;
                } catch (e) {
                  logger.warn(`${self.__classType}._new_() failed with error: ${e}`);
                }
              }
            } catch (e) {
              logger.warn(e);
            }
          }
  
          __new__(_o_) {
            _CastProps(_o_, this);
          }
          _new_() { }
  
          getClass() {
            return Object.getPrototypeOf(this.constructor);
          }
  
          css(_css) {
            if (typeof this["body"] !== "undefined" && this["body"]["style"] !== "undefined") {
              logger.debug("body style");
              this["body"]["style"] = _Cast(_css, this["body"]["style"]);
            }
            return this["body"]["style"];
          }
  
          hierarchy() {
            var __instance__ = this;
            return this.getClass().hierarchy(__instance__);
          }
  
  
          append(child) {
            logger.debug("append: start");
            if (is_a(child, "Component")) {
              logger.debug("append: child is a Component");
              logger.debug(`appending the body of ${child.name}`);
            }
            var child = (arguments.length > 0) ? (arguments[0]) : (this["body"]);
            if (typeof this["body"] !== "undefined") {
              logger.debug("append element");
              if (arguments.length > 0) {
                logger.debug("append to element");
                this["body"].append(child);
                if (typeof this["childs"] === "undefined") {
                  this["childs"] = [];
                }
                this["childs"].push(child);
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
              var tags = document.subelements(tag);
              for (var i = 0, j = tags.length; i < j; i++) {
                tags[i].append(this as any);
              }
            } else {
              throw new Error("attachIn not yet implemented for non browser platforms");
            }
          }
  
        };
  
        // remove the keys from definition that exist in the prototype
  
        _QC_CLASSES[name] = _CastProps(definition, _QC_CLASSES[name]);
        _QC_CLASSES[name]["__definition"] = definition;
        _QC_CLASSES[name]["__definition"]["__classType"] = name;
        _QC_CLASSES[name]["__definition"]["__new__"] = function __new__(_o_) {
          _CastProps(_o_, this);
        };
  
        _top[name] = _QC_CLASSES[name];
  
        return _top[name];
      };
  
      Class.prototype.toString = function () {
        return "Class(name, type, definition) { [QCObjects native code] }";
      };
  