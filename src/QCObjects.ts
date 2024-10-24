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
/*eslint no-unused-vars: "off"*/
/*eslint no-redeclare: "off"*/
/*eslint no-empty: "off"*/
/*eslint strict: "off"*/

/*eslint no-mixed-operators: "off"*/

"use strict";

import "./assign";
import { Promise } from "./Promise";
import { Base64 } from "./Base64";
import { _DataStringify } from "./DataStringify";
import { _DOMCreateElement } from "./DOMCreateElement";
import { _methods_, _protected_code_ } from "./introspection";
import { localStorage } from "./localStorage";
import { logger, Logger } from "./Logger";
import { _require_, is_phonegap, isBrowser, isDeno, isNodeCommonJS } from "./platform";
import { subelements } from "./subelements";
import { _top } from "./top";
import { __is_raw_class__ } from "./is_raw_class";
import { _LegacyCopy } from "./LegacyCopy";
import { _fireAsyncLoad, asyncLoad } from "./asyncLoad";
import { _QC_CLASSES, _QC_PACKAGES, _QC_PACKAGES_IMPORTED, _QC_READY_LISTENERS } from "./PrimaryCollections";
import { __instanceID, IncrementInstanceID } from "./IncrementInstanceID";
import { ObjectName } from "./ObjectName";
import { __getType__ } from "./getType";
import { is_a } from "./is_a";
import { ComplexStorageCache } from "./ComplexStorageCache";
import { waitUntil } from "./waitUntil";
import { _Cast } from "./Cast";
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
import { _Ready, Ready } from "./Ready";
import { captureFalseTouch } from "./captureFalseTouch";
import { serviceLoader } from "./serviceLoader";
import { componentLoader } from "./componentLoader";
import { _buildComponentsFromElements_, ComponentURI } from "./ComponentFactory";
import { NamespaceRef } from "./NamespaceRef";
import { setDefaultProcessors } from "./defaultProcessors";

(function __qcobjects__(_top: any): void {
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

    var global = _top;
    _top.global = global;

    if (!isBrowser) {
      const fs = _require_("fs");
    }

    if (isBrowser) {
      Element.prototype.subelements = subelements;
      HTMLDocument.prototype.subelements = subelements;
      HTMLElement.prototype.subelements = subelements;
      if (typeof ShadowRoot !== "undefined") {
        ShadowRoot.prototype.subelements = subelements;
      }
    }
    if (isBrowser) {
      try {
        _top = (typeof window.top !== "undefined") ? (window.top) : (window);
        _top["_allowed_"] = true;
      } catch (e) {
        try {
          _top = document;
          _top["_allowed_"] = true;
        } catch (e2) {
          try {
            _top = global;
            _top["_allowed_"] = true;
          } catch (e3) {
            _top = {};
            _top["_allowed_"] = true;
          }
        }
      }
    } else if (typeof global !== "undefined") {
      _top = global;
    }
    var _domain_, _basePath_;
    var _tag_filter_ = "quick-component:not([loaded]),component:not([loaded])";
    if (isBrowser) {
      if (typeof _top.console === "undefined") {
        _top.console = function () { };
        _top.console.prototype.log = function (message) { };
      }

      _domain_ = (
        function () {
          return (typeof document !== "undefined" && document.domain !== "") ? (document.domain) : ("localhost");
        }
      )();

    } else {
      // This is only for code integrity purpose using non-browser implementations
      // like using node.js
      _domain_ = "localhost";
    }


    logger.debugEnabled = false;
    logger.infoEnabled = true;
    _top.logger = logger;

    /**
     * Basic Type of all elements
     */
    if (isBrowser) {
      Element.prototype.find = function (tag: string): Element[] {
        var _oo = [];
        var _tags = document.subelements(tag);
        _tags.map(function (_tt, _t) {
          if ((typeof _tags[_t] !== "undefined") && (_tags[_t].parentNode as Element).tagName === this.parentNode.tagName) {
            _oo.push(_Cast(_tt, (new Object())));
          }
        });
        return _oo;
      };
    }


    if (isBrowser) {
      Element.prototype.append = function QC_Append(child) {
        if (isQCObjects_Object(child) || typeof (child as any).body !== "undefined") {
          this.appendChild((child as any).body);
        } else {
          this.appendChild(child);
        }
      };

      /**
       * A replacement for direct using of innerHTML
       * use: [element].render('content') where 'content' is the string corresponding
       * to the DOM to insert in the element
       **/
      Element.prototype.render = function QC_Render(content) {
        var _self = this;
        var _appendVDOM = function (_self, content) {
          if (typeof document.implementation.createHTMLDocument !== "undefined") {
            var doc = document.implementation.createHTMLDocument("");
            (doc as any).innerHTML = content;
            doc.body.subelements("*").map(function (element) {
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
      Element.prototype.Cast = function QC_Object(_o) {
        _o.__definition.body = this;
        var _o = New(_o);
        return _o;
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


    if (isBrowser) {

      Element.prototype.buildComponents = function (rebuildObjects = false) {
        var tagFilter = _tag_filter_;
        var d = this;
        var elements = d.subelements(tagFilter);
        return _buildComponentsFromElements_(elements, null);
      };

      HTMLDocument.prototype.buildComponents = Element.prototype.buildComponents;
      HTMLElement.prototype.buildComponents = Element.prototype.buildComponents;

    } else {
      // not yet implemented.
    }



    /**
     * Array math functions
     */
    var __to_number = function (value) {
      return (isNaN(value)) ? (new Number(0)) : (new Number(value));
    };
    Array.prototype.unique = function () {
      return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
      });
    };
    Array.unique = function (a) {
      return a.unique();
    };
    (_protected_code_)(Array.unique);
    (_protected_code_)(Array.prototype.unique);
    Array.prototype.table = function () {
      console.table(this);
    };
    Array.table = function (a) {
      return a.table();
    };
    (_protected_code_)(Array.table);
    (_protected_code_)(Array.prototype.table);
    Array.prototype.sum = function () {
      return this.reduce(function (prev, current) {
        return __to_number(prev) + __to_number(current);
      }, 0);
    };
    Array.sum = function (a) {
      return a.sum();
    };
    (_protected_code_)(Array.sum);
    (_protected_code_)(Array.prototype.sum);
    Array.prototype.avg = function () {
      return (this.length < 1) ? (0) : (this.reduce(function (prev, current) {
        return ((__to_number(prev) + __to_number(current)) / 2);
      }));
    };
    Array.avg = function (a) {
      return a.avg();
    };
    (_protected_code_)(Array.avg);
    (_protected_code_)(Array.prototype.avg);
    Array.prototype.min = function () {
      return this.reduce(function (prev, current) {
        return (__to_number(prev) <= __to_number(current)) ? (prev) : (current);
      }, Infinity);
    };
    Array.min = function (a) {
      return a.min();
    };
    (_protected_code_)(Array.min);
    (_protected_code_)(Array.prototype.min);
    Array.prototype.max = function () {
      return this.reduce(function (prev, current) {
        return (__to_number(prev) >= __to_number(current)) ? (prev) : (current);
      }, 0);
    };
    Array.max = function (a) {
      return a.max();
    };
    (_protected_code_)(Array.max);
    (_protected_code_)(Array.prototype.max);
    Array.prototype.sortBy = function (propName, sortAsc = true) {
      var sort_function = (sortAsc) ? (
        function (prev, current) {
          return current[propName] < prev[propName] ? 1 : -1;
        }
      ) : (
        function (prev, current) {
          return current[propName] > prev[propName] ? 1 : -1;
        }
      );
      return this.sort(sort_function);
    };
    Array.sortBy = function (a, propName, sortAsc = true) {
      return a.sortBy(propName, sortAsc);
    };
    (_protected_code_)(Array.sortBy);
    (_protected_code_)(Array.prototype.sortBy);

    Array.matrix = function (_length, _fillValue = 0) {
      var x_func = function (x) {
        return _fillValue;
      };
      return Array.from({
        length: _length
      }, x_func);
    };
    (_protected_code_)(Array.matrix);

    Array.matrix2d = function (_length, _fillValue = 0) {
      var y_func = function (y) {
        return _fillValue;
      };
      var x_func = function (x) {
        return Array.from({
          length: _length
        }, y_func);
      };
      return Array.from({
        length: _length
      }, x_func);
    };
    (_protected_code_)(Array.matrix2d);

    Array.matrix3d = function (_length, _fillValue = 0) {
      var y_func = function (y) {
        return Array.from({
          length: _length
        }, function () {
          return _fillValue;
        });
      };
      var x_func = function (x) {
        return Array.from({
          length: _length
        }, y_func);
      };
      return Array.from({
        length: _length
      }, x_func);
    };
    (_protected_code_)(Array.matrix3d);

    _top.range = function (start, stop = 0, step = 1) {
      if (stop === 0 || typeof stop === "undefined") {
        stop = start;
        start = 0;
      }
      return Array.from({
        length: (stop - start) / step + 1
      }, function (_, i) {
        return start + (i * step);
      });
    };
    (_protected_code_)(_top.range);

    String.prototype.list = function () {
      var __instance = this;
      return _top.range(0, __instance.length - 1).map(function (i) {
        return __instance[i];
      });
    };
    (_protected_code_)(String.prototype.list);

    _top.getDocumentLayout = function () {
      var h = (w, h) => {
        return w > h ? "landscape" : null;
      };
      var v = (w, h) => {
        return h > w ? "portrait" : null;
      };
      var square = (w, h) => {
        return w === h ? "square" : null;
      };
      return [
        h(document.documentElement.clientWidth, document.documentElement.clientHeight),
        v(document.documentElement.clientWidth, document.documentElement.clientHeight),
        square(document.documentElement.clientWidth, document.documentElement.clientHeight)
      ].filter(e => e !== null).pop();
    };


    /**
     * End of array math functions
     */


    ClassFactory("ArrayList").matrix = Array.matrix;
    ClassFactory("ArrayList").matrix2d = Array.matrix2d;
    ClassFactory("ArrayList").matrix3d = Array.matrix3d;
    (_protected_code_)(ClassFactory("ArrayList").matrix);
    (_protected_code_)(ClassFactory("ArrayList").matrix2d);
    (_protected_code_)(ClassFactory("ArrayList").matrix3d);


    setDefaultProcessors();


    /**
     * Load every component tag declared in the body
     **/
    Ready(function () {
      if (!_top.CONFIG.get("useSDK")) {
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

    (function (_top) {

      Object.defineProperty(_top, "PackagesNameList", {
        set(val) {
          logger.debug("PackagesNameList is readonly");
          return;
        },
        get() {
          var _get_packages_names = function (_packages) {
            var _keys = [];
            for (var _k in _packages) {
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
            return _keys;
          };
          return _get_packages_names(_QC_PACKAGES);
        }
      });

      Object.defineProperty(_top, "PackagesList", {
        set(value) {
          logger.debug("PackagesList is readonly");
          return;
        },
        get() {
          return _top.PackagesNameList.map(function (packagename) {
            let _classesList = Package(packagename);
            let _ret_;
            if (_classesList) {
              _ret_ = {
                packageName: packagename,
                classesList: _classesList.filter(function (_packageClass) {
                  return isQCObjects_Class(_packageClass);
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
          logger.debug("ClassesList is readonly");
          return;
        },
        get() {
          var _classesList = [];
          _top.PackagesList.map(function (_package_element) {
            _classesList = _classesList.concat(_package_element.classesList.map(
              function (_class_element) {
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

      Object.defineProperty(_top, "ClassesNameList", {
        set(value) {
          logger.debug("ClassesNameList is readonly");
          return;
        },
        get() {
          return _top.ClassesList.map(function (_class_element) {
            return _class_element.className;
          });
        }
      });

      if (isBrowser) {
        // use of GLOBAL word is deprecated in node.js
        // this is only for compatibility purpose with old versions of QCObjects in browsers
        Class("GLOBAL", _QC_CLASSES["global"]); // case insensitive for compatibility con old versions;
        Export(ClassFactory("GLOBAL"));
      }
      Export(global);

      if (_top.CONFIG.get("useSDK")) {
        (function (_top) {
          var remoteImportsPath = _top.CONFIG.get("remoteImportsPath");
          var external = (!_top.CONFIG.get("useLocalSDK")) ? (true) : (false);
          _top.CONFIG.set("remoteImportsPath", _top.CONFIG.get("remoteSDKPath"));

          var tryImportingSDK = false;
          var sdkName = "QCObjects-SDK";
          if (isBrowser) {
            tryImportingSDK = true;
          } else {
            var sdkPath = findPackageNodePath("qcobjects-sdk");
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
              let sdk = require("qcobjects-sdk");
            } else {
              Import(sdkName, function () {
                if (external) {
                  logger.debug("QCObjects-SDK.js loaded from remote location");
                } else {
                  logger.debug("QCObjects-SDK.js loaded from local");
                }
                _top.CONFIG.set("remoteImportsPath", remoteImportsPath);
              }, external);
            }
          } else {
            logger.debug("SDK has not been imported as it is not available at the moment");
          }
        })(_top);
      }
    })(_top);

    if (isBrowser) {
      asyncLoad(function () {
        Ready(function () {

          /*
           * scroll management custom events
           * usage: document.addEventListener('percentY90',function(e){console.log(e.detail.percentY)});
           * possible events: scrollpercent, defaultscroll, percentY0, percentY25, percentY50, percentY75, percentY90
           */

          (function (_top) {
            let lastKnownScrollPosition = 0;
            let ticking = false;
            let scrollHeight = Math.max(
              document.body.scrollHeight, document.documentElement.scrollHeight,
              document.body.offsetHeight, document.documentElement.offsetHeight,
              document.body.clientHeight, document.documentElement.clientHeight
            );

            let scrollWidth = Math.max(
              document.body.scrollWidth, document.documentElement.scrollWidth,
              document.body.offsetWidth, document.documentElement.offsetWidth,
              document.body.clientWidth, document.documentElement.clientWidth
            );

            function scrollDispatcher(event) {
              var percentY = Math.round(_top.scrollY * 100 / scrollHeight);
              var percentX = Math.round(_top.scrollX * 100 / scrollWidth);
              var scrollPercentEventEvent = new CustomEvent("scrollpercent", {
                detail: {
                  percentX: percentX,
                  percentY: percentY
                }
              });
              event.target.dispatchEvent(scrollPercentEventEvent);
              var secondaryEventName = "defaultscroll";
              var __valid_scrolls__ = [0, 5, 10, 25, 50, 75, 90, 95, 100];
              __valid_scrolls__.filter(function (p) {
                return p === percentY;
              }).map(function (pY) {
                secondaryEventName = "percentY" + percentY.toString();
                var secondaryCustomEvent = new CustomEvent(secondaryEventName, {
                  detail: {
                    percentX: percentX,
                    percentY: percentY
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
      }, null);
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
      var __freeze__ = function () {
        Object.freeze(Object.prototype);
        Object.freeze(Object);
      };
      if (isBrowser && _top.CONFIG.get("secureObjects", false)) {
        Ready(function () {
          __freeze__();
        });
      } else if (_top.CONFIG.get("secureObjects", false)) {
        __freeze__();
      }
    })(isBrowser);
  }
})(_top);

export default _top;