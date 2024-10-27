/**
 * QCObjects  2.4
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
 */
/* eslint no-unused-vars: "off" */
/* eslint no-redeclare: "off" */
/* eslint no-empty: "off" */
/* eslint strict: "off" */
/* eslint no-mixed-operators: "off" */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./assign");
const DataStringify_1 = require("./DataStringify");
const DOMCreateElement_1 = require("./DOMCreateElement");
const introspection_1 = require("./introspection");
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
const subelements_1 = require("./subelements");
const top_1 = require("./top");
const asyncLoad_1 = require("./asyncLoad");
const PrimaryCollections_1 = require("./PrimaryCollections");
const ObjectName_1 = require("./ObjectName");
const getType_1 = require("./getType");
const is_a_1 = require("./is_a");
const ComplexStorageCache_1 = require("./ComplexStorageCache");
const waitUntil_1 = require("./waitUntil");
const Cast_1 = require("./Cast");
const isQCObjects_1 = require("./isQCObjects");
const Package_1 = require("./Package");
const ClassFactory_1 = require("./ClassFactory");
const Export_1 = require("./Export");
const Class_1 = require("./Class");
const InheritClass_1 = require("./InheritClass");
const super_1 = require("./super");
const shortCode_1 = require("./shortCode");
const Processor_1 = require("./Processor");
const New_1 = require("./New");
const Ready_1 = require("./Ready");
const captureFalseTouch_1 = require("./captureFalseTouch");
const serviceLoader_1 = require("./serviceLoader");
const componentLoader_1 = require("./componentLoader");
const ComponentFactory_1 = require("./ComponentFactory");
const NamespaceRef_1 = require("./NamespaceRef");
const defaultProcessors_1 = require("./defaultProcessors");
const Tag_1 = require("./Tag");
const Import_1 = require("./Import");
const BackendMicroservice_1 = require("./BackendMicroservice");
const Component_1 = require("./Component");
const Crypt_1 = require("./Crypt");
const DefaultTemplateHandler_1 = require("./DefaultTemplateHandler");
const SourceJS_1 = require("./SourceJS");
const SourceCSS_1 = require("./SourceCSS");
const globalSettings_1 = require("./globalSettings");
const RegisterClass_1 = require("./RegisterClass");
const WidgetsFactory_1 = require("./WidgetsFactory");
const CONFIG_1 = require("./CONFIG");
const Controller_1 = require("./Controller");
const View_1 = require("./View");
const Service_1 = require("./Service");
const VO_1 = require("./VO");
const Effect_1 = require("./Effect");
const TransitionEffect_1 = require("./TransitionEffect");
const Timer_1 = require("./Timer");
const range_1 = require("./range");
const ArrayCollection_1 = require("./ArrayCollection");
const DDO_1 = require("./DDO");
const Toggle_1 = require("./Toggle");
const findPackageNodePath_1 = require("./findPackageNodePath");
const DocumentLayout_1 = require("./DocumentLayout");
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
            if (typeof _top.__qcobjects__ !== "undefined") {
                _top.__qcobjects__.loaded = true;
            }
        }
    }
    if (typeof _top.__qcobjects__.loaded === "undefined") {
        _top.__qcobjects__.loaded = true;
        const global = _top;
        _top.global = global;
        if (!platform_1.isBrowser) {
            const fs = (0, platform_1._require_)("fs");
        }
        if (platform_1.isBrowser) {
            Element.prototype.subelements = subelements_1.subelements;
            HTMLDocument.prototype.subelements = subelements_1.subelements;
            HTMLElement.prototype.subelements = subelements_1.subelements;
            if (typeof ShadowRoot !== "undefined") {
                ShadowRoot.prototype.subelements = subelements_1.subelements;
            }
        }
        Logger_1.logger.debugEnabled = false;
        Logger_1.logger.infoEnabled = true;
        _top.logger = Logger_1.logger;
        /**
         * Basic Type of all elements
         */
        if (platform_1.isBrowser) {
            Element.prototype.find = function (tag) {
                const _self = this;
                const _oo = [];
                const _tags = document.subelements(tag);
                _tags.map(function (_tt, _t) {
                    if ((typeof _tags[_t] !== "undefined") && _tags[_t].parentNode.tagName === _self.parentNode.tagName) {
                        _oo.push((0, Cast_1._Cast)(_tt, (new Object())));
                    }
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
                const _appendVDOM = function (_self, content) {
                    if (typeof document.implementation.createHTMLDocument !== "undefined") {
                        const doc = document.implementation.createHTMLDocument("");
                        doc.innerHTML = content;
                        doc.body.subelements("*").map(function (element) {
                            return _self.append(element);
                        });
                    }
                };
                if (typeof this.innerHTML !== "undefined") {
                    try {
                        this.innerHTML += content;
                    }
                    catch (e) {
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
            Element.prototype.Cast = function QC_Object(_o) {
                _o.__definition.body = this;
                var _o = (0, New_1.New)(_o);
                return _o;
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
                (0, ClassFactory_1.ClassFactory)("Component").route();
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
        const __to_number = function (value) {
            return ((isNaN(value)) ? new Number(0) : new Number(value));
        };
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
            return a.table();
        };
        (introspection_1._protected_code_)(Array.table);
        (introspection_1._protected_code_)(Array.prototype.table);
        Array.prototype.sum = function () {
            return this.reduce(function (prev, current) {
                return (__to_number(prev)) + (__to_number(current));
            }, 0);
        };
        Array.sum = function (a) {
            return a.sum();
        };
        (introspection_1._protected_code_)(Array.sum);
        (introspection_1._protected_code_)(Array.prototype.sum);
        Array.prototype.avg = function () {
            return (this.length < 1) ? (0) : (this.reduce(function (prev, current) {
                return (((__to_number(prev)) + (__to_number(current))) / 2);
            }));
        };
        Array.avg = function (a) {
            return a.avg();
        };
        (introspection_1._protected_code_)(Array.avg);
        (introspection_1._protected_code_)(Array.prototype.avg);
        Array.prototype.min = function () {
            return this.reduce(function (prev, current) {
                return (__to_number(prev) <= __to_number(current)) ? (prev) : (current);
            }, Infinity);
        };
        Array.min = function (a) {
            return a.min();
        };
        (introspection_1._protected_code_)(Array.min);
        (introspection_1._protected_code_)(Array.prototype.min);
        Array.prototype.max = function () {
            return this.reduce(function (prev, current) {
                return (__to_number(prev) >= __to_number(current)) ? (prev) : (current);
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
            const y_func = function (y) {
                return _fillValue;
            };
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
            const y_func = function (y) {
                return Array.from({
                    length: _length
                }, function () {
                    return _fillValue;
                });
            };
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
            return _top.range(0, __instance.length - 1).map(function (i) {
                return __instance[i];
            });
        };
        (introspection_1._protected_code_)(String.prototype.list);
        /**
         * End of array math functions
         */
        (0, ClassFactory_1.ClassFactory)("ArrayList").matrix = Array.matrix;
        (0, ClassFactory_1.ClassFactory)("ArrayList").matrix2d = Array.matrix2d;
        (0, ClassFactory_1.ClassFactory)("ArrayList").matrix3d = Array.matrix3d;
        (introspection_1._protected_code_)((0, ClassFactory_1.ClassFactory)("ArrayList").matrix);
        (introspection_1._protected_code_)((0, ClassFactory_1.ClassFactory)("ArrayList").matrix2d);
        (introspection_1._protected_code_)((0, ClassFactory_1.ClassFactory)("ArrayList").matrix3d);
        (0, defaultProcessors_1.setDefaultProcessors)();
        /**
         * Load every component tag declared in the body
         **/
        (0, Ready_1.Ready)(function () {
            if (!CONFIG_1.CONFIG.get("useSDK")) {
                _top.__start__();
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
        (0, Export_1.Export)((0, ClassFactory_1.ClassFactory)("GlobalSettings"));
        (0, top_1.resetTop)((0, Cast_1._CastProps)((0, New_1.New)((0, ClassFactory_1.ClassFactory)("GlobalSettings")), _top));
        (function (_top) {
            Object.defineProperty(_top, "PackagesNameList", {
                set(val) {
                    Logger_1.logger.debug("PackagesNameList is readonly");
                },
                get() {
                    const _get_packages_names = function (_packages) {
                        let _keys = [];
                        for (const _k in _packages) {
                            if (typeof _packages[_k] !== "undefined" &&
                                typeof _packages[_k] !== "function" &&
                                Object.hasOwnProperty.call(_packages[_k], "length") &&
                                _packages[_k].length > 0) {
                                _keys.push(_k);
                                _keys = _keys.concat(_get_packages_names(_packages[_k]));
                            }
                        }
                        return _keys;
                    };
                    return _get_packages_names(PrimaryCollections_1._QC_PACKAGES);
                }
            });
            Object.defineProperty(_top, "PackagesList", {
                set(value) {
                    Logger_1.logger.debug("PackagesList is readonly");
                },
                get() {
                    return _top.PackagesNameList.map(function (packagename) {
                        const _classesList = (0, Package_1.Package)(packagename);
                        let _ret_;
                        if (_classesList) {
                            _ret_ = {
                                packageName: packagename,
                                classesList: _classesList.filter(function (_packageClass) {
                                    return (0, isQCObjects_1.isQCObjects_Class)(_packageClass);
                                })
                            };
                        }
                        return _ret_;
                    }).filter(function (_p) {
                        return typeof _p !== "undefined";
                    });
                }
            });
            Object.defineProperty(_top, "ClassesList", {
                set(value) {
                    Logger_1.logger.debug("ClassesList is readonly");
                },
                get() {
                    let _classesList = [];
                    _top.PackagesList.map(function (_package_element) {
                        _classesList = _classesList.concat(_package_element.classesList.map(function (_class_element) {
                            return {
                                packageName: _package_element.packageName,
                                className: _package_element.packageName + "." + _class_element.__definition.__classType,
                                classFactory: _class_element
                            };
                        }));
                        return _package_element;
                    });
                    return _classesList;
                }
            });
            Object.defineProperty(_top, "ClassesNameList", {
                set(value) {
                    Logger_1.logger.debug("ClassesNameList is readonly");
                },
                get() {
                    return _top.ClassesList.map(function (_class_element) {
                        return _class_element.className;
                    });
                }
            });
            if (platform_1.isBrowser) {
                // use of GLOBAL word is deprecated in node.js
                // this is only for compatibility purpose with old versions of QCObjects in browsers
                (0, Class_1.Class)("GLOBAL", PrimaryCollections_1._QC_CLASSES.global); // case insensitive for compatibility con old versions;
                (0, Export_1.Export)((0, ClassFactory_1.ClassFactory)("GLOBAL"));
            }
            (0, Export_1.Export)(global);
            if (CONFIG_1.CONFIG.get("useSDK")) {
                (function (_top) {
                    const remoteImportsPath = CONFIG_1.CONFIG.get("remoteImportsPath");
                    const external = (!CONFIG_1.CONFIG.get("useLocalSDK"));
                    CONFIG_1.CONFIG.set("remoteImportsPath", CONFIG_1.CONFIG.get("remoteSDKPath"));
                    let tryImportingSDK = false;
                    let sdkName = "QCObjects-SDK";
                    if (platform_1.isBrowser) {
                        tryImportingSDK = true;
                    }
                    else {
                        const sdkPath = (0, findPackageNodePath_1.findPackageNodePath)("qcobjects-sdk");
                        if (sdkPath !== null) {
                            sdkName = "qcobjects-sdk";
                            tryImportingSDK = true;
                        }
                        else {
                            sdkName = "node_modules/qcobjects-sdk/QCObjects-SDK";
                            tryImportingSDK = true;
                        }
                    }
                    if (tryImportingSDK) {
                        Logger_1.logger.info("Importing SDK... " + sdkName);
                        if (platform_1.isNodeCommonJS && typeof require !== "undefined") {
                            const sdk = (0, platform_1._require_)("qcobjects-sdk");
                        }
                        else {
                            (0, Import_1.Import)(sdkName, function () {
                                if (external) {
                                    Logger_1.logger.debug("QCObjects-SDK.js loaded from remote location");
                                }
                                else {
                                    Logger_1.logger.debug("QCObjects-SDK.js loaded from local");
                                }
                                CONFIG_1.CONFIG.set("remoteImportsPath", remoteImportsPath);
                            }, external);
                        }
                    }
                    else {
                        Logger_1.logger.debug("SDK has not been imported as it is not available at the moment");
                    }
                })(_top);
            }
        })(_top);
        if (platform_1.isBrowser) {
            (0, asyncLoad_1.asyncLoad)(function () {
                (0, Ready_1.Ready)(function () {
                    /*
                     * scroll management custom events
                     * usage: document.addEventListener('percentY90',function(e){console.log(e.detail.percentY)});
                     * possible events: scrollpercent, defaultscroll, percentY0, percentY25, percentY50, percentY75, percentY90
                     */
                    (function (_top) {
                        const lastKnownScrollPosition = 0;
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
            if (typeof _top.global !== "undefined" && Object.hasOwnProperty.call(_top.global, "_fireAsyncLoad")) {
                asyncLoad_1._fireAsyncLoad.call(_top);
            }
            if (typeof _top.global !== "undefined" && Object.hasOwnProperty.call(_top.global, "onload")) {
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
exports.default = {
    BackendMicroservice: BackendMicroservice_1.BackendMicroservice, Logger: Logger_1.Logger, Class: Class_1.Class,
    _Crypt: Crypt_1._Crypt, TagElements: Tag_1.TagElements, DefaultTemplateHandler: DefaultTemplateHandler_1.DefaultTemplateHandler, SourceJS: SourceJS_1.SourceJS,
    SourceCSS: SourceCSS_1.SourceCSS, ArrayList: ArrayCollection_1.ArrayList, ArrayCollection: ArrayCollection_1.ArrayCollection, GlobalSettings: globalSettings_1.GlobalSettings, DDO: DDO_1.DDO,
    ComplexStorageCache: ComplexStorageCache_1.ComplexStorageCache, _ComponentWidget_: WidgetsFactory_1._ComponentWidget_, asyncLoad: asyncLoad_1.asyncLoad,
    RegisterClass: RegisterClass_1.RegisterClass, ComponentURI: ComponentFactory_1.ComponentURI, waitUntil: waitUntil_1.waitUntil, _super_: super_1._super_, _DOMCreateElement: DOMCreateElement_1._DOMCreateElement,
    shortCode: shortCode_1.shortCode, __getType__: getType_1.__getType__, is_a: is_a_1.is_a,
    _DataStringify: DataStringify_1._DataStringify, serviceLoader: serviceLoader_1.serviceLoader, componentLoader: componentLoader_1.componentLoader, ObjectName: ObjectName_1.ObjectName, isQCObjects_Class: isQCObjects_1.isQCObjects_Class, isQCObjects_Object: isQCObjects_1.isQCObjects_Object, NamespaceRef: NamespaceRef_1.NamespaceRef,
    RegisterWidget: WidgetsFactory_1.RegisterWidget, RegisterWidgets: WidgetsFactory_1.RegisterWidgets, range: range_1.range, getDocumentLayout: DocumentLayout_1.getDocumentLayout, Export: Export_1.Export, New: New_1.New, Tag: Tag_1.Tag, Ready: Ready_1.Ready,
    _methods_: introspection_1._methods_, InheritClass: InheritClass_1.InheritClass, Processor: Processor_1.Processor,
    Component: Component_1.Component, CONFIG: CONFIG_1.CONFIG, Controller: Controller_1.Controller, View: View_1.View, Service: Service_1.Service, JSONService: Service_1.JSONService,
    ConfigService: Service_1.ConfigService, VO: VO_1.VO, Effect: Effect_1.Effect, TransitionEffect: TransitionEffect_1.TransitionEffect, Timer: Timer_1.Timer, Toggle: Toggle_1.Toggle,
    logger: Logger_1.logger, global, ClassFactory: ClassFactory_1.ClassFactory, Package: Package_1.Package, Import: Import_1.Import
};
