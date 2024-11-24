"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Class = void 0;
const PrimaryCollections_1 = require("./PrimaryCollections");
const Cast_1 = require("./Cast");
const DOMCreateElement_1 = require("./DOMCreateElement");
const getType_1 = require("./getType");
const IncrementInstanceID_1 = require("./IncrementInstanceID");
const introspection_1 = require("./introspection");
const is_a_1 = require("./is_a");
const is_forbidden_name_1 = require("./is_forbidden_name");
const LegacyCopy_1 = require("./LegacyCopy");
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
const top_1 = require("./top");
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
const Class = (name, _type, _definition) => {
    const _types_ = {};
    let type, definition;
    switch (true) {
        case !name && !_type && !_definition:
            return class {
            };
        case !!name && !_type && !_definition:
            type = class {
            };
            definition = {};
            break;
        case !!name && !_type && !!_definition:
            type = class {
            };
            definition = _definition;
            break;
        case !!name && !!_type && !!_definition:
            type = _type;
            definition = _definition;
            break;
        default:
            return class {
            };
    }
    if (typeof name !== "string") {
        throw new Error("Class name must be a string");
    }
    if (typeof type !== "function") {
        throw new Error("Class type must be a function or class");
    }
    if ((0, is_forbidden_name_1.__is__forbidden_name__)(name)) {
        throw new Error(`${name} is not an allowed word in the name of a class`);
    }
    if (typeof type.__definition === "object"
        && type.__definition
        && Object.keys(type.__definition).length !== 0) {
        definition.__definition = Object.assign((0, LegacyCopy_1._LegacyCopy)(type.__definition, ["name"]), type);
    }
    _types_[type.name] = type;
    if (typeof definition === "undefined" || definition === null) {
        definition = {};
    }
    else {
        definition = { ...definition };
    }
    /* hack to prevent duplicate __instanceID */
    if (typeof definition.__instanceID !== "undefined") {
        delete definition.__instanceID;
    }
    PrimaryCollections_1._QC_CLASSES[name] = class extends _types_[type.name] {
        __instanceID;
        __namespace;
        __definition = {
            ...definition
        };
        childs;
        _body;
        get body() {
            return this._body;
        }
        set body(value) {
            this._body = value;
        }
        static get __classType() {
            return Object.getPrototypeOf(this.constructor).name;
        }
        get __classType() {
            return this.constructor.name;
        }
        static hierarchy(__class__) {
            const __classType = function (o_c) {
                return (Object.hasOwn(o_c, "__classType")) ? (o_c.__classType) : (getType_1.__getType__.call(__class__, o_c));
            };
            const __hierarchy__proto__ = (c) => {
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
        static getParentClass() {
            return Object.getPrototypeOf(this.prototype.constructor);
        }
        constructor(_o_) {
            super(_o_ || {});
            const self = this;
            (0, IncrementInstanceID_1.IncrementInstanceID)();
            if (!self.__instanceID) {
                Object.defineProperty(self, "__instanceID", {
                    value: IncrementInstanceID_1.__instanceID,
                    writable: false
                });
            }
            if (typeof self.__definition !== "undefined") {
                Object.keys(self.__definition).filter(function (k) {
                    return isNaN(k) && !["name", "__instanceID", "__classType", "__definition"].includes(k);
                }).forEach(function (key) {
                    if (typeof self.__definition[key] === "function") {
                        self[key] = self.__definition[key].bind(self);
                    }
                    else {
                        self[key] = self.__definition[key];
                    }
                });
            }
            (0, introspection_1._methods_)(PrimaryCollections_1._QC_CLASSES[self.__classType]).map(function (m) {
                self[m.name] = m.bind(self);
                return m;
            });
            (0, introspection_1._methods_)(self.__definition).map(function (m) {
                self[m.name] = m.bind(self);
                return m;
            });
            if (self.body) {
                if (typeof self.__definition === "undefined" || (!Object.hasOwn(self.__definition, "body")) || typeof self.__definition.body === "undefined") {
                    try {
                        if (platform_1.isBrowser) {
                            self.body = (0, DOMCreateElement_1._DOMCreateElement)(self.__definition.__classType);
                        }
                        else {
                            self.body = {};
                        }
                    }
                    catch (e) {
                        Logger_1.logger.debug(`An error ocurred: ${e}.`);
                        self.body = {};
                    }
                }
                else if (Object.hasOwn(self.__definition, "body")) {
                    self.body = self.__definition.body;
                }
            }
            try {
                if (typeof self.__new__ === "function") {
                    self.__new__.call(self, _o_);
                }
                else if (typeof super.__new__ === "function") {
                    self.__new__ = super.__new__.bind(self);
                    self.__new__.call(self, _o_);
                }
                if (typeof self === "object" && Object.hasOwn(self, "_new_") && typeof self._new_.isCalled === "undefined") {
                    try {
                        self._new_(_o_);
                        self._new_.isCalled = true;
                    }
                    catch (e) {
                        Logger_1.logger.warn(`${self.__classType}._new_() failed with error: ${e}`);
                    }
                }
            }
            catch (e) {
                Logger_1.logger.warn(e);
            }
        }
        __new__(_o_) {
            (0, Cast_1._CastProps)(_o_, this);
        }
        // eslint-disable-next-line no-unused-vars
        _new_(_o_) { }
        getClass() {
            return Object.getPrototypeOf(this.constructor);
        }
        css(_css) {
            if (typeof this.body !== "undefined" && typeof this?.body !== "string" && typeof this?.body?.style !== "undefined") {
                Logger_1.logger.debug("body style");
                if (this.body) {
                    this.body.style = (0, Cast_1._Cast)(_css, this?.body?.style);
                }
            }
            return (typeof this.body !== "string") ? this?.body?.style : {};
        }
        hierarchy() {
            const __instance__ = this;
            return this.getClass()?.hierarchy(__instance__);
        }
        append(_child) {
            const child = _child || this.body;
            Logger_1.logger.debug("append: start");
            if ((0, is_a_1.is_a)(child, "Component")) {
                Logger_1.logger.debug("append: child is a Component");
                Logger_1.logger.debug(`appending the body of ${child.name}`);
            }
            if (typeof this.body !== "undefined") {
                Logger_1.logger.debug("append element");
                if (arguments.length > 0) {
                    Logger_1.logger.debug("append to element");
                    if (typeof this.body !== "string") {
                        if (typeof this.body?.append !== "undefined") {
                            this?.body?.append(child);
                        }
                        else {
                            throw Error("body.append is undefined. That means the body is not well formed.");
                        }
                    }
                    else {
                        this.append(child);
                    }
                    if (typeof this.childs === "undefined") {
                        this.childs = [];
                    }
                    this.childs.push(child);
                }
                else {
                    if (platform_1.isBrowser) {
                        Logger_1.logger.debug("append to body");
                        document.body.append(child);
                    }
                }
            }
        }
        attachIn(tag) {
            if (platform_1.isBrowser) {
                const tags = document.subelements(tag);
                for (let i = 0, j = tags.length; i < j; i++) {
                    tags[i].append(this);
                }
            }
            else {
                throw new Error("attachIn not yet implemented for non browser platforms");
            }
        }
    };
    // remove the keys from definition that exist in the prototype
    PrimaryCollections_1._QC_CLASSES[name] = (0, Cast_1._CastProps)(definition, PrimaryCollections_1._QC_CLASSES[name]);
    PrimaryCollections_1._QC_CLASSES[name].__definition = definition;
    PrimaryCollections_1._QC_CLASSES[name].__definition.__classType = name;
    top_1._top[name] = PrimaryCollections_1._QC_CLASSES[name];
    return PrimaryCollections_1._QC_CLASSES[name];
};
exports.Class = Class;
if (typeof exports.Class.prototype !== "undefined") {
    exports.Class.prototype.toString = function () {
        return "Class(name, type, definition) { [QCObjects native code] }";
    };
}
