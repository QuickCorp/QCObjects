import { _QC_CLASSES } from "./PrimaryCollections";
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
import { IQCObjectsElement, TBody, TClass } from "types";
import { InheritClass } from "./InheritClass";
import { _top } from "./top";

/**
 * Creates new object class  of another object
 *
 * @param {String} name
 * @param {Object} type
 * @param {Object} definition
 * 
 * @example 
 * Class (name, type, definition)
 * Class (name, type)
 * Class (name, definition)
 * Class ()
 * 
 * 
 * const MyClass = Class ("MyComponent", Component, {
 *  name: "one_component",
 *  method1 : () => {console.log ("done") }
 * })
 * const myClassInstance = new MyClass ({name: "one_component"})
 * 
 * const MyClass = Class ("MyService",{
 *  name: "myservice",
 * })
 * 
 * const myClassInstance = new MyClass ({name: "myservice"})
 */



export const Class:TClass = (_name?:string, _type?: unknown, _definition?: unknown):InheritClass => {
  const _types_ = {};
  let name:string, type:unknown, definition:unknown;

  switch (true) {
    case !_name && !_type && !_definition:
      return class {} as unknown as InheritClass;
    case !!_name && !_type && !_definition:
      name = _name;
      type = class {};
      definition = {};
      break;
    case !!_name && !_type && !!_definition :
      name = _name;
      type = class {};
      definition = _definition;
      break;
    case !!_name && !!_type && !!_definition:
      name = _name;
      type = _type;
      definition = _definition;
      break;
    default:
      return class {} as unknown as InheritClass;
  }

  if (typeof type !== "function") {
    throw new Error("Class type must be a function or class");
  }

  if (__is__forbidden_name__(name)) {
    throw new Error(`${name} is not an allowed word in the name of a class`);
  }

  if (typeof (type as any).__definition !== "undefined") {
    (definition as any).__definition = Object.assign(_LegacyCopy((type as any).__definition), type);
  }

  (_types_ as any)[type.name] = type;

  if (typeof definition === "undefined" || definition === null) {
    definition = {};
  } else {
    definition = _LegacyCopy(definition);
  }

  /* hack to prevent duplicate __instanceID */
  if (typeof (definition as any).__instanceID !== "undefined") {
    delete (definition as any).__instanceID;
  }

  _QC_CLASSES[_name] = class extends (_types_ as any)[type.name] {
    __instanceID!: number;
    __namespace?: string | undefined;
    __definition:any = {
      ...(definition as any)
    };
    childs: any;
    private _body: TBody;
    public get body(): TBody {
        return this._body;
    }
    public set body(value: TBody) {
        this._body = value;
    }

    static get __classType(): any {
      return (Object.getPrototypeOf(this.constructor) as Function).name;
    }

    get __classType(): string {
      return this.constructor.name;
    }

    static hierarchy(__class__:any):any[] {
      const __classType = function (o_c:any):any {
        return (Object.hasOwnProperty.call(o_c, "__classType")) ? (o_c.__classType) : (__getType__.call(__class__, o_c));
      };
      const __hierarchy__proto__ = (c:any):any[] => {
        return (typeof c !== "undefined" && typeof c.__proto__ !== "undefined" && c.__proto__ !== null) ? (((__classType(c) !== "") ? ([__classType(c)]) : ([])).concat(__hierarchy__proto__(c.__proto__))) : ([]);
      };

      if (typeof __class__ === "undefined" || __class__ === null) {
        __class__ = this;
      }
      let __hierarchy = [];
      __hierarchy.push(__classType(__class__));
      __hierarchy = __hierarchy.concat(__hierarchy__proto__(__class__.__proto__));
      return __hierarchy;
    }

    static getParentClass():any {
      return Object.getPrototypeOf(this.prototype.constructor);
    }

    constructor(_o_?:any) {
      super(_o_ || {});

      const self = this;
      IncrementInstanceID();
      if (!(self as any).__instanceID) {
        Object.defineProperty(self, "__instanceID", {
          value: __instanceID,
          writable: false
        });
      }

      if (typeof self.__definition !== "undefined") {
        Object.keys(self.__definition).filter(function (k) {
          return isNaN(k as any) && !["name", "__instanceID", "__classType", "__definition"].includes(k);
        }).forEach(function (key) {
          if (typeof self.__definition[key] === "function") {
            self[key] = self.__definition[key].bind(self);
          } else {
            self[key] = self.__definition[key];
          }
        });
      }
      _methods_(_QC_CLASSES[self.__classType]).map(function <T>(m:unknown):T {
        self[(m as Function).name] = (m as Function).bind(self);
        return m as T;
      });
      _methods_(self.__definition).map(function (m):any {
        self[(m as Function).name] = (m as Function).bind(self);
        return m;
      });

      if (self.body) {
        if (typeof self.__definition === "undefined" || (!Object.hasOwnProperty.call(self.__definition, "body")) || typeof self.__definition.body === "undefined") {
          try {
            if (isBrowser) {
              self.body = _DOMCreateElement(self.__definition.__classType);
            } else {
              self.body = {};
            }
          } catch (e:any) {
            logger.debug(`An error ocurred: ${e}.`);
            self.body = {};
          }
        } else if (Object.hasOwnProperty.call(self.__definition, "body")) {
          self.body = self.__definition.body;
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
            self._new_(_o_);
            (self._new_ as any).isCalled = true;
          } catch (e:any) {
            logger.warn(`${self.__classType}._new_() failed with error: ${e}`);
          }
        }
      } catch (e:any) {
        logger.warn(e);
      }
    }

    __new__(_o_:any) {
      _CastProps(_o_, this);
    }

    // eslint-disable-next-line no-unused-vars
    _new_(_o_?:any) { }

    getClass():any {
      return Object.getPrototypeOf(this.constructor);
    }

    css(_css: any): any {
      if (typeof this.body !== "undefined" && typeof this?.body !== "string" && typeof (this?.body as HTMLElement)?.style !== "undefined") {
          logger.debug("body style");
          if (this.body){
              (this.body as any).style = _Cast(_css, (this?.body as HTMLElement)?.style);
          }
      }
      return (typeof this.body !== "string")? (this?.body as HTMLElement)?.style :{};
    }

    hierarchy():any {
      const __instance__ = this;
      return this.getClass().hierarchy(__instance__);
    }


    append(_child?: any) {
      const child: any = _child || this.body;
      logger.debug("append: start");
      if (is_a(child, "Component")) {
          logger.debug("append: child is a Component");
          logger.debug(`appending the body of ${child.name}`);
      }
      if (typeof this.body !== "undefined") {
          logger.debug("append element");
          if (arguments.length > 0) {
              logger.debug("append to element");
              if (typeof this.body !== "string"){
                  if (typeof (this.body as IQCObjectsElement)?.append !== "undefined") {
                      (this?.body as IQCObjectsElement)?.append(child);
                  } else {
                      throw Error ("body.append is undefined. That means the body is not well formed.");
                  }
              } else {
                  this.append(child);
              }
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

    attachIn(tag: any) {
      if (isBrowser) {
          const tags = (document as any).subelements(tag);
          for (let i = 0, j = tags.length; i < j; i++) {
              tags[i].append(this as any);
          }
      } else {
          throw new Error("attachIn not yet implemented for non browser platforms");
      }
    }

  };

  // remove the keys from definition that exist in the prototype

  _QC_CLASSES[_name] = _CastProps(definition, _QC_CLASSES[_name]);
  _QC_CLASSES[_name].__definition = definition;
  _QC_CLASSES[_name].__definition.__classType = _name;
  _QC_CLASSES[_name].__definition.__new__ = function __new__(_o_:any) {
    _CastProps(_o_, this);
  };

  (_top as any)[_name] = _QC_CLASSES[_name];

  return _QC_CLASSES[_name] as InheritClass;
};
if (typeof Class.prototype !== "undefined"){
  Class.prototype.toString = function () {
    return "Class(name, type, definition) { [QCObjects native code] }";
  };
}

