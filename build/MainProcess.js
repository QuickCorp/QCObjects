"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const top_1 = require("./top");
const asyncLoad_1 = require("./asyncLoad");
const captureFalseTouch_1 = require("./captureFalseTouch");
const Cast_1 = require("./Cast");
const Class_1 = require("./Class");
const ClassFactory_1 = require("./ClassFactory");
const Component_1 = require("./Component");
const ComponentFactory_1 = require("./ComponentFactory");
const componentLoader_1 = require("./componentLoader");
const CONFIG_1 = require("./CONFIG");
const DataStringify_1 = require("./DataStringify");
const defaultProcessors_1 = require("./defaultProcessors");
const Export_1 = require("./Export");
const Import_1 = require("./Import");
const introspection_1 = require("./introspection");
const isQCObjects_1 = require("./isQCObjects");
const Logger_1 = require("./Logger");
const mathFunctions_1 = require("./mathFunctions");
const NamespaceRef_1 = require("./NamespaceRef");
const New_1 = require("./New");
const ObjectName_1 = require("./ObjectName");
const Package_1 = require("./Package");
const platform_1 = require("./platform");
const Ready_1 = require("./Ready");
const serviceLoader_1 = require("./serviceLoader");
const Tag_1 = require("./Tag");
const Processor_1 = require("./Processor");
const is_a_1 = require("./is_a");
const getType_1 = require("./getType");
const shortCode_1 = require("./shortCode");
const DOMCreateElement_1 = require("./DOMCreateElement");
const ComplexStorageCache_1 = require("./ComplexStorageCache");
const super_1 = require("./super");
const waitUntil_1 = require("./waitUntil");
const subelements_1 = require("./subelements");
const globalSettings_1 = require("./globalSettings");
const loadSDK_1 = __importDefault(require("./loadSDK"));
const range_1 = require("./range");
(function __qcobjects__(_top) {
    if (typeof Object.defineProperty !== "undefined" && typeof _top !== "undefined") {
        try {
            Object.defineProperty(_top, "__qcobjects__", {
                enumerable: true,
                configurable: false,
                writable: false,
                value: __qcobjects__,
            });
        }
        catch (e) {
            Logger_1.logger.debug(`An error ocurred: ${e}`);
            if (typeof _top.__qcobjects__ !== "undefined") {
                _top.__qcobjects__.loaded = true;
            }
        }
    }
    if (typeof _top.__qcobjects__.loaded === "undefined") {
        _top.__qcobjects__.loaded = true;
        if (platform_1.isBrowser) {
            Element.prototype.subelements = subelements_1.subelements;
            Document.prototype.subelements = subelements_1.subelements;
            HTMLElement.prototype.subelements = subelements_1.subelements;
            if (typeof ShadowRoot !== "undefined") {
                ShadowRoot.prototype.subelements = subelements_1.subelements;
            }
        }
        Logger_1.logger.debugEnabled = false;
        Logger_1.logger.infoEnabled = true;
        /**
         * Basic Type of all elements
         */
        if (platform_1.isBrowser) {
            Element.prototype.find = function (tag) {
                const _self = this;
                const _oo = [];
                const _tags = document.subelements(tag);
                _tags.map((_tt, _t) => {
                    if ((typeof _tags[_t] !== "undefined") && _tags[_t].parentNode.tagName === _self.parentNode.tagName) {
                        _oo.push((0, Cast_1._Cast)(_tt, (new Object())));
                    }
                    return _tt;
                });
                return _oo;
            };
        }
        if (platform_1.isBrowser) {
            Element.prototype.append = function QC_Append(child) {
                if ((0, isQCObjects_1.isQCObjects_Object)(child) || typeof child.body !== "undefined") {
                    this.appendChild(child.body);
                }
                else {
                    this.appendChild(child);
                }
            };
            /**
             * A replacement for direct using of innerHTML
             * use: [element].render('content') where 'content' is the string corresponding
             * to the DOM to insert in the element
             **/
            Element.prototype.render = function QC_Render(content) {
                const _self = this;
                const _appendVDOM = (_self, content) => {
                    if (typeof document.implementation.createHTMLDocument !== "undefined") {
                        const doc = document.implementation.createHTMLDocument("");
                        doc.body.innerHTML = content;
                        doc.body.subelements("*").map((element) => {
                            return _self.append(element);
                        });
                    }
                };
                if (typeof this.innerHTML !== "undefined") {
                    try {
                        this.innerHTML += content;
                    }
                    catch (e) {
                        Logger_1.logger.debug(`An error ocurred: ${e}`);
                        _appendVDOM(_self, content);
                    }
                }
                else {
                    _appendVDOM(_self, content);
                }
            };
        }
        (0, Export_1.Export)(waitUntil_1.waitUntil);
        (0, Export_1.Export)(super_1._super_);
        (0, Export_1.Export)(ComplexStorageCache_1.ComplexStorageCache);
        (0, Export_1.Export)(ClassFactory_1.ClassFactory);
        (0, Export_1.Export)(DOMCreateElement_1._DOMCreateElement);
        (0, Export_1.Export)(shortCode_1.shortCode);
        (0, Export_1.Export)(getType_1.__getType__);
        (0, Export_1.Export)(is_a_1.is_a);
        (0, Package_1.Package)("com.qcobjects", [Processor_1.Processor]);
        if (platform_1.isBrowser) {
            /**
             * Adds a Cast functionality to every Element of DOM
             */
            Element.prototype.Cast = function QC_Cast(_o) {
                const _self = this;
                return (0, Cast_1._Cast)(_self, _o);
            };
        }
        if (platform_1.isBrowser) {
            window.onload = Ready_1._Ready;
            if (platform_1.is_phonegap) {
                document.addEventListener("deviceready", Ready_1._Ready, captureFalseTouch_1.captureFalseTouch);
            }
        }
        else {
            global.onload = Ready_1._Ready;
        }
        if (platform_1.isBrowser) {
            window.addEventListener("popstate", function (popStateEvent) {
                popStateEvent.stopImmediatePropagation();
                popStateEvent.stopPropagation();
                Component_1.Component.route()
                    .catch((e) => { throw new Error(`An error ocurred when trying to load initial routes. ${e}`); });
            });
        }
        (0, Export_1.Export)(serviceLoader_1.serviceLoader);
        (0, Export_1.Export)(componentLoader_1.componentLoader);
        (0, Export_1.Export)(ComponentFactory_1.ComponentURI);
        (0, Export_1.Export)(ObjectName_1.ObjectName);
        (0, Export_1.Export)(DataStringify_1._DataStringify);
        (0, Export_1.Export)(isQCObjects_1.isQCObjects_Class);
        (0, Export_1.Export)(isQCObjects_1.isQCObjects_Object);
        (0, Export_1.Export)(NamespaceRef_1.NamespaceRef);
        /**
         * Array math functions
         */
        // eslint-disable-next-line no-unused-vars
        Array.prototype.unique = function () {
            return this.filter(function (value, index, self) {
                return self.indexOf(value) === index;
            });
        };
        Array.unique = function (a) {
            return a.unique();
        };
        (introspection_1._protected_code_)(Array.unique);
        (introspection_1._protected_code_)(Array.prototype.unique);
        Array.prototype.table = function () {
            console.table(this);
        };
        Array.table = function (a) {
            a.table();
            return;
        };
        (introspection_1._protected_code_)(Array.table);
        (introspection_1._protected_code_)(Array.prototype.table);
        Array.prototype.sum = function () {
            return this.reduce(function (prev, current) {
                return ((0, mathFunctions_1.__to_number)(prev)) + ((0, mathFunctions_1.__to_number)(current));
            }, 0);
        };
        Array.sum = function (a) {
            return a.sum();
        };
        (introspection_1._protected_code_)(Array.sum);
        (introspection_1._protected_code_)(Array.prototype.sum);
        Array.prototype.avg = function () {
            return (this.length < 1) ? (0) : (this.reduce(function (prev, current) {
                return ((((0, mathFunctions_1.__to_number)(prev)) + ((0, mathFunctions_1.__to_number)(current))) / 2);
            }));
        };
        Array.avg = function (a) {
            return a.avg();
        };
        (introspection_1._protected_code_)(Array.avg);
        (introspection_1._protected_code_)(Array.prototype.avg);
        Array.prototype.min = function () {
            return this.reduce(function (prev, current) {
                return ((0, mathFunctions_1.__to_number)(prev) <= (0, mathFunctions_1.__to_number)(current)) ? (prev) : (current);
            }, Infinity);
        };
        Array.min = function (a) {
            return a.min();
        };
        (introspection_1._protected_code_)(Array.min);
        (introspection_1._protected_code_)(Array.prototype.min);
        Array.prototype.max = function () {
            return this.reduce(function (prev, current) {
                return ((0, mathFunctions_1.__to_number)(prev) >= (0, mathFunctions_1.__to_number)(current)) ? (prev) : (current);
            }, 0);
        };
        Array.max = function (a) {
            return a.max();
        };
        (introspection_1._protected_code_)(Array.max);
        (introspection_1._protected_code_)(Array.prototype.max);
        Array.prototype.sortBy = function (propName, sortAsc = true) {
            const sort_function = (sortAsc) ? (function (prev, current) {
                return current[propName] < prev[propName] ? 1 : -1;
            }) : (function (prev, current) {
                return current[propName] > prev[propName] ? 1 : -1;
            });
            return this.sort(sort_function);
        };
        Array.sortBy = function (a, propName, sortAsc = true) {
            return a.sortBy(propName, sortAsc);
        };
        (introspection_1._protected_code_)(Array.sortBy);
        (introspection_1._protected_code_)(Array.prototype.sortBy);
        /**
         * Extends the Array prototype to include a method that creates a matrix (2D array)
         * with specified dimensions and fill value.
         *
         * @param {number} _length - The number of rows in the matrix.
         * @param {any} [_fillValue=0] - The value to fill the matrix with (default is 0).
         * @returns {Array<Array<any>>} A 2D array (matrix) filled with the specified value.
         *
         * @example
         * // Create a 3x3 matrix filled with zeros
         * const matrix = [].matrix(3);
         * console.log(matrix);
         * // Output: [0, 0, 0]
         *
         * @example
         * // Create a 2x4 matrix filled with a specific value
         * const matrix = [].matrix(2, 5);
         * console.log(matrix);
         * // Output: [5, 5]
         *
         * @example
         * // Create a 4x2 matrix filled with null values
         * const matrix = [].matrix(4, null);
         * console.log(matrix);
         * // Output: [null, null, null, null]
         */
        Array.prototype.matrix = function (_length, _fillValue = 0) {
            // eslint-disable-next-line no-unused-vars
            const x_func = function (x = undefined) {
                return _fillValue;
            };
            return Array.from({
                length: _length
            }, x_func);
        };
        /**
         * Creates a matrix (2D array) from a given array.
         *
         * This function extends the Array constructor by adding a static method
         * that generates a matrix with specified dimensions and fill value.
         *
         * @function
         * @param {Array} a - The input array used to generate the matrix.
         * @param {number} _length - The length of the matrix (number of rows).
         * @param {number} [_fillValue=0] - The value to fill the matrix with (default is 0).
         * @returns {Array} A 2D array (matrix) created from the input parameters.
         *
         * @example
         * const myMatrix = Array.matrix(2, 5);
         * // myMatrix will be [5, 5, 5]
         */
        Array.matrix = function (a, _length, _fillValue = 0) {
            return a.matrix(_length, _fillValue);
        };
        (introspection_1._protected_code_)(Array.matrix);
        (introspection_1._protected_code_)(Array.prototype.matrix);
        Array.prototype.matrix2d = function (_length, _fillValue = 0) {
            // eslint-disable-next-line no-unused-vars
            const y_func = function (y) {
                return _fillValue;
            };
            // eslint-disable-next-line no-unused-vars
            const x_func = function (x) {
                return Array.from({
                    length: _length
                }, y_func);
            };
            return Array.from({
                length: _length
            }, x_func);
        };
        Array.matrix2d = function (a, _length, _fillValue = 0) {
            return a.matrix2d(_length, _fillValue);
        };
        (introspection_1._protected_code_)(Array.matrix2d);
        (introspection_1._protected_code_)(Array.prototype.matrix2d);
        Array.prototype.matrix3d = function (_length, _fillValue = 0) {
            // eslint-disable-next-line no-unused-vars
            const y_func = function (y) {
                return Array.from({
                    length: _length
                }, function () {
                    return _fillValue;
                });
            };
            // eslint-disable-next-line no-unused-vars
            const x_func = function (x) {
                return Array.from({
                    length: _length
                }, y_func);
            };
            return Array.from({
                length: _length
            }, x_func);
        };
        Array.matrix3d = function (a, _length, _fillValue = 0) {
            return a.matrix3d(_length, _fillValue);
        };
        (introspection_1._protected_code_)(Array.matrix3d);
        (introspection_1._protected_code_)(Array.prototype.matrix3d);
        String.prototype.list = function () {
            const __instance = this;
            return (0, range_1.range)(0, __instance.length - 1).map(function (i) {
                return __instance[i];
            });
        };
        (introspection_1._protected_code_)(String.prototype.list);
        /**
         * End of array math functions
         */
        (0, defaultProcessors_1.setDefaultProcessors)();
        /**
         * Load every component tag declared in the body
         **/
        (0, Ready_1.Ready)(function () {
            if (!CONFIG_1.CONFIG.get("useSDK")) {
                globalSettings_1.GlobalSettings.__start__()
                    .catch((e) => {
                    throw Error(e);
                });
            }
        });
        /*
        Public variables and functions
        */
        (0, Export_1.Export)(Export_1.Export); /* exports the same Export function once */
        (0, Export_1.Export)(Import_1.Import);
        (0, Export_1.Export)(Package_1.Package);
        (0, Export_1.Export)(Class_1.Class);
        (0, Export_1.Export)(New_1.New);
        (0, Export_1.Export)(Tag_1.Tag);
        (0, Export_1.Export)(Ready_1.Ready);
        (0, Export_1.Export)(Ready_1.ready);
        (0, Export_1.Export)(platform_1.isBrowser);
        (0, Export_1.Export)(introspection_1._methods_);
        (0, Export_1.Export)(globalSettings_1.GlobalSettings);
        (loadSDK_1.default)();
        if (platform_1.isBrowser) {
            (0, asyncLoad_1.asyncLoad)(function () {
                (0, Ready_1.Ready)(function () {
                    /*
                     * scroll management custom events
                     * usage: document.addEventListener('percentY90',function(e){console.log(e.detail.percentY)});
                     * possible events: scrollpercent, defaultscroll, percentY0, percentY25, percentY50, percentY75, percentY90
                     */
                    (function (_top) {
                        let ticking = false;
                        const scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
                        const scrollWidth = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth, document.body.clientWidth, document.documentElement.clientWidth);
                        function scrollDispatcher(event) {
                            const percentY = Math.round(_top.scrollY * 100 / scrollHeight);
                            const percentX = Math.round(_top.scrollX * 100 / scrollWidth);
                            const scrollPercentEventEvent = new CustomEvent("scrollpercent", {
                                detail: {
                                    percentX,
                                    percentY
                                }
                            });
                            event.target.dispatchEvent(scrollPercentEventEvent);
                            let secondaryEventName = "defaultscroll";
                            const __valid_scrolls__ = [0, 5, 10, 25, 50, 75, 90, 95, 100];
                            __valid_scrolls__.filter(function (p) {
                                return p === percentY;
                            }).map(function (pY) {
                                secondaryEventName = "percentY" + percentY.toString();
                                const secondaryCustomEvent = new CustomEvent(secondaryEventName, {
                                    detail: {
                                        percentX,
                                        percentY
                                    }
                                });
                                event.target.dispatchEvent(secondaryCustomEvent);
                                return pY;
                            });
                        }
                        document.addEventListener("scroll", function (event) {
                            if (!ticking) {
                                requestAnimationFrame(function () {
                                    scrollDispatcher(event);
                                    ticking = false;
                                });
                                ticking = true;
                            }
                        });
                    })(_top);
                });
            }, []);
        }
        if (!platform_1.isBrowser) {
            if (typeof _top.global !== "undefined" && Object.hasOwn(_top.global, "_fireAsyncLoad")) {
                asyncLoad_1._fireAsyncLoad.call(_top);
            }
            if (typeof _top.global !== "undefined" && Object.hasOwn(_top.global, "onload")) {
                _top.global.onload.call(_top);
            }
        }
        /* Freezing Object && Object.prototype to prevent prototype pollution risks */
        (function (isBrowser) {
            const __freeze__ = function () {
                Object.freeze(Object.prototype);
                Object.freeze(Object);
            };
            if (isBrowser && CONFIG_1.CONFIG.get("secureObjects", false)) {
                (0, Ready_1.Ready)(function () {
                    __freeze__();
                });
            }
            else if (CONFIG_1.CONFIG.get("secureObjects", false)) {
                __freeze__();
            }
        })(platform_1.isBrowser);
    }
})(top_1._top);
