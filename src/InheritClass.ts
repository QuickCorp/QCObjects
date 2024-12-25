import { type IInheritClass, type IQCObjectsElement, type TBody } from "@types";
import { logger } from "./Logger";
import { __instanceID, IncrementInstanceID } from "./IncrementInstanceID";
import { _CastProps, _Cast } from "./Cast";
import { _DOMCreateElement } from "./DOMCreateElement";
import { __getType__ } from "./getType";
import { _methods_ } from "./introspection";
import { is_a } from "./is_a";
import { isBrowser } from "./platform";
import { _QC_CLASSES } from "./PrimaryCollections";
import { Package } from "./Package";

export class InheritClass implements IInheritClass {
    [key: string]: any;
    __definition: any;
    private _body: TBody;
    public get body(): TBody {
        return this._body;
    }
    public set body(value: TBody) {
        this._body = value;
    }
    childs: any;
    __instanceID!: number;

    constructor(_o_?: any) {

        if (typeof _o_ !== "undefined" && typeof _o_.__definition !== "undefined") {
            this.__definition = {
                ...(_o_.__definition)
            };
        }

        const self: this = this;
        if (typeof _o_ !== "undefined" && _o_ !== null) {
            Object.keys(_o_)
                .filter(function (k) {
                    return isNaN(k as any) && !["__instanceID", "__classType", "__definition"].includes(k);
                })
                .forEach(function (key) {
                    if (typeof self[key] === "function") {
                        self[key] = _o_[key].bind(self);
                    } else {
                        self[key] = _o_[key];
                    }
                });
        }

        IncrementInstanceID();
        if (!self.__instanceID) {
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
        _methods_((_QC_CLASSES as any)[self.__classType]).map(function (m): any {
            self[(m as Function).name] = (m as Function).bind(self);
            return m;
        });
        _methods_(self.__definition).map(function (m): any {
            self[(m as Function).name] = (m as Function).bind(self);
            return m;
        });

        if (self.body) {
            if (typeof self.__definition === "undefined" || (!Object.hasOwn(self.__definition, "body")) || typeof self.__definition.body === "undefined") {
                try {
                    if (isBrowser) {
                        self.body = _DOMCreateElement(self.__definition.__classType);
                    } else {
                        self.body = {};
                    }
                } catch (e: any) {
                    logger.debug(`An error ocurred: ${e}.`);
                    self.body = {};
                }
            } else if (Object.hasOwn(self.__definition, "body")) {
                self.body = self.__definition.body;
            }
        }


        try {
            self.__new__.call(self, _o_);
            if (typeof self === "object" && Object.hasOwn(self, "_new_") && typeof (self._new_ as any).isCalled === "undefined") {
                try {
                    self._new_(_o_);
                    (self._new_ as any).isCalled = true;
                } catch (e: any) {
                    logger.warn(`${self.__classType}._new_() failed with error: ${e}`);
                }
            }
        } catch (e: any) {
            logger.warn(e);
        }
    }

    static get __classType(): any {
        return (Object.getPrototypeOf(this.constructor) as Function).name;
    }

    get __classType(): string {
        return this.constructor.name;
    }


    static hierarchy(__class__: any): any[] {
        const __classType = function (o_c: any): any {
            return (Object.hasOwn(o_c, "__classType")) ? (o_c.__classType) : (__getType__.call(__class__, o_c));
        };
        const __hierarchy__proto__ = (c: any): any[] => {
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


    __namespace?: string | undefined;

    __new__(_o_: any): void {
        _CastProps(_o_, this);
    }

    // eslint-disable-next-line no-unused-vars
    _new_(_o_?: any): void { }

    static getParentClass(): any {
        return Object.getPrototypeOf(this.prototype.constructor);
    }
    getParentClass(): any {
        return (this.constructor as typeof InheritClass).getParentClass();
    }


    static getClass(): any {
        return Object.getPrototypeOf(this.constructor);
    }

    getClass(): any {
        return (this.constructor as typeof InheritClass).getClass();
    }

    css(_css: any): any {
        if (typeof this.body !== "undefined" && typeof this?.body !== "string" && typeof (this?.body as HTMLElement)?.style !== "undefined") {
            logger.debug("body style");
            if (this.body) {
                (this.body as any).style = _Cast(_css, (this?.body as HTMLElement)?.style);
            }
        }
        return (typeof this.body !== "string") ? (this?.body as HTMLElement)?.style : {};
    }

    hierarchy(): any {
        const __instance__ = this;
        return (this.constructor as typeof InheritClass).hierarchy(__instance__);
    }


    append(_child?: any): void {
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
                if (typeof this.body !== "string") {
                    if (typeof (this.body as IQCObjectsElement)?.append !== "undefined") {
                        (this?.body as IQCObjectsElement)?.append(child);
                    } else {
                        throw Error("body.append is undefined. That means the body is not well formed.");
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

    attachIn(tag: any): void {
        if (isBrowser) {
            const tags = (document as any).subelements(tag);
            for (let i = 0, j = tags.length; i < j; i++) {
                tags[i].append(this as any);
            }
        } else {
            throw new Error("attachIn not yet implemented for non browser platforms");
        }
    }

}

Package("com.qcobjects", [InheritClass]);