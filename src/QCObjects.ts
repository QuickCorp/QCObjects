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

import "./assign";
import { _DataStringify } from "./DataStringify";
import { _DOMCreateElement } from "./DOMCreateElement";
import { _methods_, _protected_code_ } from "./introspection";
import { logger, Logger } from "./Logger";
import { _require_, is_phonegap, isBrowser, isNodeCommonJS } from "./platform";
import { subelements } from "./subelements";
import { _top, resetTop } from "./top";
import { __is_raw_class__ } from "./is_raw_class";
import { _LegacyCopy } from "./LegacyCopy";
import { _fireAsyncLoad, asyncLoad } from "./asyncLoad";
import { _QC_CLASSES, _QC_PACKAGES, _QC_PACKAGES_IMPORTED, _QC_READY_LISTENERS } from "./PrimaryCollections";
import { __instanceID } from "./IncrementInstanceID";
import { ObjectName } from "./ObjectName";
import { __getType__ } from "./getType";
import { is_a } from "./is_a";
import { ComplexStorageCache } from "./ComplexStorageCache";
import { waitUntil } from "./waitUntil";
import { _Cast, _CastProps } from "./Cast";
import { isQCObjects_Class, isQCObjects_Object } from "./isQCObjects";
import { Package } from "./Package";
import { ClassFactory } from "./ClassFactory";
import { Export } from "./Export";
import { Class } from "./Class";
import { InheritClass } from "./InheritClass";
import { _super_ } from "./super";
import { shortCode } from "./shortCode";
import { Processor } from "./Processor";
import { New } from "./New";
import { _Ready, ready, Ready } from "./Ready";
import { captureFalseTouch } from "./captureFalseTouch";
import { serviceLoader } from "./serviceLoader";
import { componentLoader } from "./componentLoader";
import { _buildComponentsFromElements_, ComponentURI } from "./ComponentFactory";
import { NamespaceRef } from "./NamespaceRef";
import { setDefaultProcessors } from "./defaultProcessors";
import { Tag, TagElements } from "./Tag";
import { Import } from "./Import";
import { BackendMicroservice } from "./BackendMicroservice";
import { Component } from "./Component";
import { _Crypt } from "./Crypt";
import { DefaultTemplateHandler } from "./DefaultTemplateHandler";
import { SourceJS } from "./SourceJS";
import { SourceCSS } from "./SourceCSS";
import { GlobalSettings } from "./globalSettings";
import { RegisterClass } from "./RegisterClass";
import { _ComponentWidget_, RegisterWidget, RegisterWidgets } from "./WidgetsFactory";
import { CONFIG } from "./CONFIG";
import { Controller } from "./Controller";
import { View } from "./View";
import { ConfigService, JSONService, Service } from "./Service";
import { VO } from "./VO";
import { Effect } from "./Effect";
import { TransitionEffect } from "./TransitionEffect";
import { Timer } from "./Timer";
import { _tag_filter_ } from "./tag_filter";
import { range } from "./range";
import { ArrayCollection, ArrayList } from "./ArrayCollection";
import { DDO } from "./DDO";
import { Toggle } from "./Toggle";
import { findPackageNodePath } from "./findPackageNodePath";
import { getDocumentLayout } from "./DocumentLayout";
import { IQCObjectsElement, IQCObjectsShadowedElement } from "types";
import { __to_number } from "./mathFunctions";

(function __qcobjects__(_top: any) {
  if (typeof Object.defineProperty !== "undefined" && typeof _top !== "undefined") {
    try {
      Object.defineProperty(_top, "__qcobjects__", {
        enumerable: true,
        configurable: false,
        writable: false,
        value: __qcobjects__,
      });
    } catch (e) {
      if (typeof _top.__qcobjects__ !== "undefined") {
        _top.__qcobjects__.loaded = true;
      }
    }
  }
  if (typeof _top.__qcobjects__.loaded === "undefined") {
    _top.__qcobjects__.loaded = true;

    const global = _top;
    _top.global = global;

    if (!isBrowser) {
      const fs = _require_("fs");
    }

    if (isBrowser) {
      (Element as unknown as IQCObjectsElement).prototype.subelements = subelements;
      (Document as unknown as IQCObjectsElement).prototype.subelements = subelements;
      (HTMLElement as unknown as IQCObjectsElement).prototype.subelements = subelements;
      if (typeof ShadowRoot !== "undefined") {
        (ShadowRoot as unknown as IQCObjectsShadowedElement).prototype.subelements = subelements;
      }
    }


    logger.debugEnabled = false;
    logger.infoEnabled = true;
    _top.logger = logger;

    /**
     * Basic Type of all elements
     */
    if (isBrowser) {
      (Element as unknown as IQCObjectsElement).prototype.find = function (tag: string): IQCObjectsElement[] {
        const _self = this;
        const _oo:IQCObjectsElement[] = [];
        const _tags = (document as unknown as IQCObjectsElement).subelements(tag);
        _tags.map( (_tt, _t) => {
          if ((typeof _tags[_t] !== "undefined") && (_tags[_t].parentNode as Element).tagName === _self.parentNode.tagName) {
            _oo.push(_Cast(_tt, (new Object())));
          }
          return _tt;
        });
        return _oo;
      };
    }

    if (isBrowser) {
      Element.prototype.append = function QC_Append(child) {
        if (isQCObjects_Object(child) || typeof (child as any).body !== "undefined") {
          this.appendChild((child as any).body);
        } else {
          this.appendChild(child as any);
        }
      };

      /**
       * A replacement for direct using of innerHTML
       * use: [element].render('content') where 'content' is the string corresponding
       * to the DOM to insert in the element
       **/
      (Element as unknown as IQCObjectsElement).prototype.render = function QC_Render(content:string) {
        const _self = this;
        const _appendVDOM = (_self:any, content:string):any => {
          if (typeof document.implementation.createHTMLDocument !== "undefined") {
            const doc = document.implementation.createHTMLDocument("");
            doc.body.innerHTML = content;
            (doc.body as unknown as IQCObjectsElement).subelements("*").map( (element):any => {
              return _self.append(element);
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
      /**
       * Adds a Cast functionality to every Element of DOM
       */
      (Element as unknown as IQCObjectsElement).prototype.Cast = function QC_Cast<T>(_o: T): T {
        const _self: any = this;
        return _Cast(_self, _o) as T;
      };
    }



    if (isBrowser) {
      window.onload = _Ready;
      if (is_phonegap) {
        document.addEventListener("deviceready", _Ready, captureFalseTouch as any);
      }
    } else {
      global.onload = _Ready;
    }

    if (isBrowser) {
      window.addEventListener("popstate", function (popStateEvent) {
        popStateEvent.stopImmediatePropagation();
        popStateEvent.stopPropagation();
        Component.route()
        .catch((e:any) => {throw new Error (`An error ocurred when trying to load initial routes. ${e}`);});
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
  
    /**
     * Array math functions
     */
    (Array as any).prototype.unique = function <T>(this: T[]): T[]{
      return this.filter(function (value:any, index:any, self:any) {
        return self.indexOf(value) === index;
      });
    };
    (Array as any).unique = function <T>(a: Array<T>): T[] {
      return (a as any).unique() as T[];
    };
    (_protected_code_)((Array as any).unique);
    (_protected_code_)((Array as any).prototype.unique);
    (Array as any).prototype.table = function ():void {
      console.table(this);
    };
    (Array as any).table = function (a:any):void {
      a.table();
      return;
    };
    (_protected_code_)((Array as any).table);
    (_protected_code_)((Array as any).prototype.table);
    (Array as any).prototype.sum = function ():number {
      return this.reduce(function (prev:any, current:any) {
        return (__to_number(prev)) + (__to_number(current));
      }, 0) as number;
    };
    (Array as any).sum = function (a:any):number {
      return a.sum() as number;
    };
    (_protected_code_)((Array as any).sum);
    (_protected_code_)((Array as any).prototype.sum);
    (Array as any).prototype.avg = function ():number {
      return (this.length < 1) ? (0) : (this.reduce(function (prev:any, current:any) {
        return (((__to_number(prev)) + (__to_number(current))) / 2);
      })) as number;
    };
    (Array as any).avg = function (a:any):number {
      return a.avg() as number;
    };
    (_protected_code_)((Array as any).avg);
    (_protected_code_)((Array as any).prototype.avg);
    (Array as any).prototype.min = function ():number {
      return this.reduce(function (prev:number, current:number) {
        return (__to_number(prev) <= __to_number(current)) ? (prev) : (current);
      }, Infinity) as number;
    };
    (Array as any).min = function (a:any):number {
      return a.min() as number;
    };
    (_protected_code_)((Array as any).min);
    (_protected_code_)((Array as any).prototype.min);
    (Array as any).prototype.max = function ():number {
      return this.reduce(function (prev:number, current:number) {
        return (__to_number(prev) >= __to_number(current)) ? (prev) : (current);
      }, 0) as number;
    };
    (Array as any).max = function (a:any):number {
      return a.max() as number;
    };
    (_protected_code_)((Array as any).max);
    (_protected_code_)((Array as any).prototype.max);
    (Array as any).prototype.sortBy = function (propName:string, sortAsc = true):Array<any>[] {
      const sort_function = (sortAsc) ? (
        function (prev:any, current:any) {
          return current[propName] < prev[propName] ? 1 : -1;
        }
      ) : (
        function (prev:any, current:any) {
          return current[propName] > prev[propName] ? 1 : -1;
        }
      );
      return this.sort(sort_function) as Array<any>[];
    };
    (Array as any).sortBy = function (a:any, propName:string, sortAsc = true):Array<any>[] {
      return a.sortBy(propName, sortAsc) as Array<any>[];
    };
    (_protected_code_)((Array as any).sortBy);
    (_protected_code_)((Array as any).prototype.sortBy);

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
    (Array as any).prototype.matrix = function (_length:number, _fillValue = 0) {
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
    (Array as any).matrix = function <T>(a:any, _length:number, _fillValue = 0):T[] {
      return a.matrix(_length, _fillValue) as T[];
    };

    (_protected_code_)((Array as any).matrix);
    (_protected_code_)((Array as any).prototype.matrix);


    (Array as any).prototype.matrix2d = function (_length:number, _fillValue = 0) {
      const y_func = function (y:any) {
        return _fillValue;
      };
      const x_func = function (x:any) {
        return Array.from({
          length: _length
        }, y_func);
      };
      return Array.from({
        length: _length
      }, x_func);
    };
    (Array as any).matrix2d = function <T>(a:any, _length:number, _fillValue = 0):T[][] {
      return a.matrix2d(_length, _fillValue) as T[][];
    };

    (_protected_code_)((Array as any).matrix2d);
    (_protected_code_)((Array as any).prototype.matrix2d);

    (Array as any).prototype.matrix3d = function (_length:number, _fillValue = 0) {
      const y_func = function (y:any) {
        return Array.from({
          length: _length
        }, function () {
          return _fillValue;
        });
      };
      const x_func = function (x:any) {
        return Array.from({
          length: _length
        }, y_func);
      };
      return Array.from({
        length: _length
      }, x_func);
    };

    (Array as any).matrix3d = function <T>(a:any, _length:number, _fillValue = 0):T[][][] {
      return a.matrix3d(_length, _fillValue) as T[][][];
    };


    (_protected_code_)((Array as any).matrix3d);
    (_protected_code_)((Array as any).prototype.matrix3d);



    (String as unknown as any).prototype.list = function ():string[] {
      const __instance = this;
      return _top.range(0, __instance.length - 1).map(function <T>(i:any):T {
        return __instance[i] as T;
      }) as string[];
    };
    (_protected_code_)((String as unknown as any).prototype.list);



    /**
     * End of array math functions
     */



    setDefaultProcessors();


    /**
     * Load every component tag declared in the body
     **/
    Ready(function () {
      if (!CONFIG.get("useSDK")) {
        _top.__start__();
      }
    });

    /*
    Public variables and functions
    */
    Export(Export); /* exports the same Export function once */
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

    resetTop(_CastProps(New(ClassFactory("GlobalSettings")), _top));

    (function (_top) {

      Object.defineProperty(_top, "PackagesNameList", {
        set(val) {
          logger.debug("PackagesNameList is readonly");
          
        },
        get() {
          const _get_packages_names = function <T>(_packages:any):T[] {
            let _keys:any[] = [];
            for (const _k of _packages) {
              if (
                typeof _packages[_k] !== "undefined" &&
                typeof _packages[_k] !== "function" &&
                Object.hasOwnProperty.call(_packages[_k], "length") &&
                _packages[_k].length > 0
              ) {
                _keys.push(_k);
                _keys = _keys.concat(_get_packages_names(_packages[_k]));
              }
            }
            return _keys as T[];
          };
          return _get_packages_names(_QC_PACKAGES);
        }
      });

      Object.defineProperty(_top, "PackagesList", {
        set(value) {
          logger.debug("PackagesList is readonly");
          
        },
        get():any {
          return _top.PackagesNameList.map(function <T>(packagename:string):T {
            const _classesList:any[] = Package(packagename) as any[];
            let _ret_:any = undefined;
            if (_classesList) {
              _ret_= {
                packageName: packagename,
                classesList: _classesList.filter(function (_packageClass:any):boolean {
                  return isQCObjects_Class(_packageClass);
                })
              };
            }
            return _ret_ as T;
          }).filter(function (_p:any):boolean {
            return typeof _p !== "undefined";
          });
        }
      });

      Object.defineProperty(_top, "ClassesList", {
        set(value) {
          logger.debug("ClassesList is readonly");
          
        },
        get():any {
          let _classesList:any[] = [];
          _top.PackagesList.map(function <T>(_package_element:any):T {
            _classesList = _classesList.concat(_package_element.classesList.map(
              function (_class_element:any) {
                return {
                  packageName: _package_element.packageName,
                  className: _package_element.packageName + "." + _class_element.__definition.__classType,
                  classFactory: _class_element
                };
              }
            ));
            return _package_element as T;
          });

          return _classesList;
        }
      });

      Object.defineProperty(_top, "ClassesNameList", {
        set(value) {
          logger.debug("ClassesNameList is readonly");
          
        },
        get():any {
          return _top.ClassesList.map(function <T>(_class_element:any):T {
            return _class_element.className as T;
          });
        }
      });

      if (isBrowser) {
        // use of GLOBAL word is deprecated in node.js
        // this is only for compatibility purpose with old versions of QCObjects in browsers
        Class("GLOBAL", (_QC_CLASSES as any).global); // case insensitive for compatibility con old versions;
        Export(ClassFactory("GLOBAL"));
      }
      Export(global);

      if (CONFIG.get("useSDK")) {
        (function (_top) {
          const remoteImportsPath = CONFIG.get("remoteImportsPath");
          const external = (!CONFIG.get("useLocalSDK"));
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
              Import(sdkName, function () {
                if (external) {
                  logger.debug("QCObjects-SDK.js loaded from remote location");
                } else {
                  logger.debug("QCObjects-SDK.js loaded from local");
                }
                CONFIG.set("remoteImportsPath", remoteImportsPath);
              }, external)
              ?.catch ((e:any) => {throw new Error (`An error ocurred when trying to import: ${e}`);});
            }
          } else {
            logger.debug("SDK has not been imported as it is not available at the moment");
          }
        })(_top);
      }
    })(_top);

    if (isBrowser) {
      asyncLoad(function ():any {
        Ready(function () {

          /*
           * scroll management custom events
           * usage: document.addEventListener('percentY90',function(e){console.log(e.detail.percentY)});
           * possible events: scrollpercent, defaultscroll, percentY0, percentY25, percentY50, percentY75, percentY90
           */

          (function (_top) {
            const lastKnownScrollPosition = 0;
            let ticking = false;
            const scrollHeight = Math.max(
              document.body.scrollHeight, document.documentElement.scrollHeight,
              document.body.offsetHeight, document.documentElement.offsetHeight,
              document.body.clientHeight, document.documentElement.clientHeight
            );

            const scrollWidth = Math.max(
              document.body.scrollWidth, document.documentElement.scrollWidth,
              document.body.offsetWidth, document.documentElement.offsetWidth,
              document.body.clientWidth, document.documentElement.clientWidth
            );

            function scrollDispatcher(event:any) {
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
              }).map(function <T>(pY:T):T {
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

    if (!isBrowser) {
      if (typeof _top.global !== "undefined" && Object.hasOwnProperty.call(_top.global, "_fireAsyncLoad")) {
        _fireAsyncLoad.call(_top);
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
      if (isBrowser && CONFIG.get("secureObjects", false)) {
        Ready(function () {
          __freeze__();
        });
      } else if (CONFIG.get("secureObjects", false)) {
        __freeze__();
      }
    })(isBrowser);
  }

})(_top);


const QCObjects = {
  BackendMicroservice, Logger, logger, Class,
  _Crypt, TagElements, DefaultTemplateHandler, SourceJS,
  SourceCSS, ArrayList, ArrayCollection, GlobalSettings, DDO,
  ComplexStorageCache, _ComponentWidget_, asyncLoad,
  RegisterClass, ComponentURI, waitUntil, _super_, _DOMCreateElement,
  shortCode, __getType__, is_a,
  _DataStringify, serviceLoader, componentLoader, ObjectName, isQCObjects_Class, isQCObjects_Object, NamespaceRef,
  RegisterWidget, RegisterWidgets, range, getDocumentLayout, Export, New, Tag, Ready,
  _methods_, InheritClass, Processor,
  Component, CONFIG, Controller, View, Service, JSONService,
  ConfigService, VO, Effect, TransitionEffect, Timer, Toggle, global, ClassFactory, Package, Import
};

export default QCObjects;