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
import { _require_, isBrowser, isDeno, isNodeCommonJS } from "./platform";
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
import { isQCObjects_Object } from "./isQCObjects";
import { Package } from "./Package";
import { ClassFactory } from "./ClassFactory";
import { Export } from "./Export";
import { Class } from "./Class";

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

      var _secretKey = location.host;

    } else {
      // This is only for code integrity purpose using non-browser implementations
      // like using node.js
      var _secretKey = "secret";
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
            doc.innerHTML = content;
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


    /**
     * Creates an object from a Class definition
     *
     * @param {QC_Object} o
     * @param {Object} args
     */

    var New = function (__class__, args) {
      args = (arguments.length > 1) ? (args) : ({});
      return (typeof __class__ === "undefined") ? (new Object()) : (new __class__(args));
    };

    New.prototype.toString = function () {
      return "New(QCObjectsClassName, args) { [QCObjects native code] }";
    };

    if (!isBrowser) {
      var findPackageNodePath = function (packagename) {
        const fs = _require_("fs");
        var sdkPath = null;
        try {
          var sdkPaths = [
            `${_top.CONFIG.get("projectPath")}${_top.CONFIG.get("relativeImportPath")}`,
            `${_top.CONFIG.get("basePath")}${_top.CONFIG.get("relativeImportPath")}`,
            `${_top.CONFIG.get("projectPath")}`,
            `${_top.CONFIG.get("basePath")}`,
            `${_top.CONFIG.get("relativeImportPath")}`,
            `${process.cwd()}${_top.CONFIG.get("relativeImportPath")}`,
            `${process.cwd()}/node_modules/` + packagename,
            `${process.cwd()}/node_modules`,
            `${process.cwd()}`,
            "node_modules",
            "./",
            ""
          ].concat(module.paths);
          sdkPaths = sdkPaths.filter(p => {
            return fs.existsSync(p + "/" + packagename);
          });
          if (sdkPaths.length > 0) {
            sdkPath = sdkPaths[0];
            logger.info(packagename + " is Installed.");
          } else {
            //          logger.debug(packagename + ' is not in a standard path.');
          }
        } catch (e) {
          // do nothing
          console.log(e);
        }
        return sdkPath;
      };
      Export(findPackageNodePath);
    }

    Class("_Crypt", Object, {
      last_string: "",
      last_key: "",
      construct: false,
      _new_(o) {
        var string = o["string"];
        var key = (o.hasOwnProperty.call(o, "key")) ? (o["key"]) : (null);
        this.__new__(o);
        key = (key === null) ? (this.__instanceID) : (key);
        this.last_key = key;
        this.last_string = string;
        this.construct = true;
      },
      _encrypt() {
        var string = this.string;
        var key = this.key;
        var result = "";
        var char;
        var keychar;
        for (var i = 0; i < string.length; i++) {
          char = string.substr(i, 1);
          keychar = key.substr((i % key.length) - 1, 1);
          char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
          result += char;
        }
        this.last_string = Base64.encode(result);
        return this.last_string;
      },
      _decrypt() {
        var string = this.string;
        var key = this.key;
        var result = "";
        var char;
        var keychar;
        string = Base64.decode(string);
        for (var i = 0; i < string.length; i++) {
          char = string.substr(i, 1);
          keychar = key.substr((i % key.length) - 1, 1);
          char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
          result += char;
        }

        this.last_string = result;
        return this.last_string;
      },
      encrypt(string, key) {
        var crypt = New(ClassFactory("_Crypt"), {
          string: string,
          key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._encrypt();
      },
      decrypt(string, key) {
        var crypt = New(ClassFactory("_Crypt"), {
          string: string,
          key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._decrypt();
      }
    });

    var _CryptObject = function (o) {
      return ClassFactory("_Crypt").encrypt(_DataStringify(o), _secretKey);
    };
    var _DecryptObject = function (s) {
      return (s === "") ? ({}) : (JSON.parse(ClassFactory("_Crypt").decrypt(s, _secretKey)));
    };

    var shortCode = function () {
      var length = 1000;
      var code1 = ClassFactory("_Crypt").encrypt((Math.random() * length).toString().replace(".", ""), (new Date()).getTime().toString());
      var code2 = ClassFactory("_Crypt").encrypt((Math.random() * length).toString().replace(".", ""), (new Date((new Date()).getTime() - 1000 * 1000)).getTime().toString());
      var shortCode = code2.list().map((o1, index) => {
        return code1.list()[index] === o1 ? null : o1;
      }).filter(c => c !== null).join("");
      return shortCode;
    };
    var uniqueId = shortCode;
    Class("InheritClass", class { }, {});

    class Processor extends ClassFactory("InheritClass") {
      component = null;
      __definition = {};
      __classType = "Processor";

      static processors = {
        "config"(component, arg) {
          return _top.CONFIG.get(arg, "");
        },
        "ENV"(component, arg) {
          return (typeof process !== "undefined") ? (process.env[arg]) : ("");
        },
        "global"(component, arg) {
          return (typeof global !== "undefined") ? (global[arg]) : ("");
        }
      };
      static setProcessor(_proc_) {
        if (typeof _proc_ === "function" && _proc_.name !== "") {
          this.processors[_proc_.name] = _proc_;
        }
      }

      constructor() {
        super(...arguments);
        this.processors = Processor.processors;
        this.process = Processor.process.bind(this);
        this.processObject = Processor.processObject.bind(this);
        this.setProcessor = Processor.setProcessor.bind(this);
        this.execute = Processor.execute.bind(this);
      }

      static execute(component, processorName, args) {
        var processorHandler = (typeof component !== "undefined" && component !== null) ? (component.processorHandler) : (this);
        return processorHandler.processors[processorName].bind(processorHandler).apply(processorHandler, [component, ...args.split(",")]);
      }

      static process(template, component = null) {
        var processorHandler = (component !== null) ? (component.processorHandler) : (New(Processor, { component: null }));
        if (typeof template === "string") {
          Object.keys(processorHandler.processors).map(function (funcName) {
            [...template.matchAll(new RegExp("\\$" + funcName + "\\((.*)\\).*", "g"))].map(
              function (procesorMatch) {
                var match0 = `$${funcName}(${procesorMatch[1]})`;
                template = template.replace(match0, processorHandler.execute.bind(processorHandler).call(processorHandler, component, funcName, procesorMatch[1]));
              }
            );
          });
        }
        return template;
      }

      static processObject(obj, component = null) {
        var __instance__ = (component === null) ? (this) : (component.processorHandler);
        if (typeof __instance__ === "undefined") {
          __instance__ = new Processor({ component: component });
        }
        if (typeof obj === "object") {
          Object.keys(obj).map(
            function (_k) {
              if (typeof obj[_k] === "object" && !obj[_k].hasOwnProperty.call(obj[_k], "call")) {
                obj[_k] = __instance__.processObject.bind(__instance__)(obj[_k], component);
              } else if (typeof obj[_k] === "string") {
                obj[_k] = __instance__.process.bind(__instance__)(obj[_k], component);
              }
            }
          );
        } else if (typeof obj === "string") {
          obj = __instance__.process.bind(__instance__)(obj, component);
        }
        return obj;
      }

    }
    Processor.__definition = {};
    Processor.__classType = "Processor";
    RegisterClass(Processor, "com.qcobjects");
    __make_global__(Processor);


    class ConfigSettings {
      static _instance = null;
      static _CONFIG_ENC = null;
      static get instance() {

        if (this._instance === null) {
          var _config_settings = new ConfigSettings();
          _config_settings._CONFIG = {
            "relativeImportPath": "",
            "remoteImportsPath": "",
            "remoteSDKPath": "https://sdk.qcobjects.dev/",
            "asynchronousImportsLoad": false,
            "removePackageScriptAfterLoading": true,
            "componentsBasePath": "",
            "delayForReady": 0,
            "preserveComponentBodyTag": false,
            "useConfigService": false,
            "routingWay": "hash",
            "useSDK": true,
            "useLocalSDK": false,
            "basePath": _basePath_
          };
          _config_settings._CONFIG_ENC = null;
          this._instance = _config_settings;
        }

        return this._instance;
      }

      static set instance(value) {
        this._instance = value;
      }
    }
    _QC_CLASSES["ConfigSettings"] = ConfigSettings;

    Class("CONFIG", Object, {

      get _CONFIG_ENC() {
        return ClassFactory("ConfigSettings").instance._CONFIG_ENC;
      },

      get _CONFIG() {
        return ClassFactory("ConfigSettings").instance._CONFIG;
      },

      set(name, value) {
        logger.debug(`CONFIG.set  ${name}: ${value}`);
        // hack to force update basePath from CONFIG
        if (name === "basePath") {
          _basePath_ = value;
        }
        var _conf;
        try {
          _conf = (
            function (config) {
              if (config._CONFIG_ENC === null) {
                config._CONFIG_ENC = ClassFactory("_Crypt").encrypt(_DataStringify({}), _secretKey);
              }
              var _protectedEnc = config._CONFIG_ENC.valueOf();
              var _protectedConf = config._CONFIG.valueOf();
              return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
            }
          )(ClassFactory("ConfigSettings").instance);
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
      },
      get(name, _default) {
        var _value;
        try {
          var _conf = (
            function (config) {
              if (config._CONFIG_ENC === null) {
                config._CONFIG_ENC = ClassFactory("_Crypt").encrypt(_DataStringify({}), _secretKey);
              }
              var _protectedEnc = config._CONFIG_ENC.valueOf();
              var _protectedConf = config._CONFIG.valueOf();
              return _CastProps(_protectedConf, _DecryptObject(_protectedEnc));
            }
          )(ClassFactory("ConfigSettings").instance);
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
    });

    Export(waitUntil);
    Export(_super_);
    Export(ComplexStorageCache);
    Export(ClassFactory);
    Export(_DOMCreateElement);
    Export(shortCode);
    Export(__getType__);
    Export(is_a);




    Package("com.qcobjects", [Processor]);

    /**
     * Declare Namespace
     *
     * @param {String} packageName
     * @param {Object} package
     */
    var NamespaceRef = function (namespace) {
      let packageInstance = Package(namespace);
      let classes = packageInstance.filter(c => isQCObjects_Class(c)).map(c => {
        return {
          [c.__definition.__classType]: c
        };
      }).reduce((a, b) => Object.assign(a, b));
      return namespace.split(".").map(c => {
        return {
          [c]: classes
        };
      }).reverse().reduce((a, b) => {
        b[Object.keys(b)] = a;
        return b;
      });
    };


    /**
     * Imports a script with the package nomenclature
     *
     * @param {Object} packagename
     * @param {Object} ready
     * @param {Boolean} external
     */
    var Import = function () {
      var packagename;
      var ready = function () { };
      var external = false;
      if (arguments.length < 1) {
        return;
      } else if (arguments.length === 1) {
        packagename = arguments[0];
      } else if (arguments.length === 2) {
        packagename = arguments[0];
        ready = arguments[1];
      } else if (arguments.length > 2) {
        packagename = arguments[0];
        ready = arguments[1];
        external = arguments[2];
        logger.debug("[Import] Setting external=" + external.toString() + " resource to import: " + packagename);
      }
      if (external) {
        logger.debug("[Import] Registering external resource to import: " + packagename);
      } else {
        logger.debug("[Import] Registering local resource to import: " + packagename);
      }
      var _promise_import_;
      if (isBrowser) {
        _promise_import_ = new Promise(function (resolve, reject) {

          var allPackagesImported = function () {
            var ret = false;
            var cp = 0;
            for (var p in _QC_PACKAGES) {
              cp++;
            }
            if (cp < _QC_PACKAGES_IMPORTED.length) {
              ret = false;
            } else {
              ret = true;
            }
            return ret;
          };

          var readyImported = function (e) {
            _QC_PACKAGES_IMPORTED.push(ready);
            if (allPackagesImported()) {
              _QC_PACKAGES_IMPORTED.map(function (_imported_) {
                _QC_READY_LISTENERS.push(_imported_);
              });
            }
            if (isBrowser && _top.CONFIG.get("removePackageScriptAfterLoading")) {
              e.target.remove();
            }
            resolve.call(_promise_import_, {
              "_imported_": e.target,
              "_package_name_": packagename
            });
          };

          if (!_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, packagename)) {
            var s1 = _DOMCreateElement("script");
            s1.type = _top.CONFIG.get("sourceType", "text/javascript");
            s1.async = (_top.CONFIG.get("asynchronousImportsLoad")) ? (true) : (false);
            s1.onreadystatechange = function () {
              if (s1.readyState === "complete") {
                readyImported.call();
              }
            };
            s1.onload = readyImported;
            s1.onerror = function (e) {
              reject.call(_promise_import_, {
                "_imported_": s1,
                "_package_name_": packagename
              });
            };
            s1.src = (external) ? (_top.CONFIG.get("remoteImportsPath") + packagename + ".js") : (_basePath_ + _top.CONFIG.get("relativeImportPath") + packagename + ".js");
            document.getElementsByTagName("head")[0].appendChild(s1);
          }
        });
        _promise_import_.catch(function () {
          logger.debug("Import: Error loading a package ");
        });

      } else {
        // support to be used in a nodejs environment
        _promise_import_ = new Promise(function (resolve, reject) {
          try {
            var standardNodePath = findPackageNodePath(packagename);
            var packageAbsoluteName = "";
            if (standardNodePath !== null) {
              packageAbsoluteName = standardNodePath + "/" + packagename;
            } else {
              var jsNodePath = findPackageNodePath(packagename + ".js");
              if (jsNodePath !== null) {
                packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
              } else {
                packageAbsoluteName = _basePath_ + _top.CONFIG.get("relativeImportPath") + packagename;
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
        }).catch(function (e) {
          // something wrong importing a package
          logger.debug("Something happened when importing " + packagename);
          console.warn(e);
        });
      }
      _promise_import_.catch(function (e) {
        logger.warn(_DataStringify(e));
      });
      return _promise_import_;
    };
    Import.prototype.toString = function () {
      return "Import(packagename,ready,external) { [QCObjects native code] }";
    };

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

    Class("TagElements", Array, {
      show() {
        this.map(function (element) {
          return element.style.opacity = 1;
        });
      },
      hide() {
        this.map(function (element) {
          return element.style.opacity = 0;
        });
      },
      effect() {
        var effectArguments = [...arguments].slice(1);
        var effectClass = arguments[0];
        if ((typeof effectClass).toLowerCase() === "string") {
          effectClass = ClassFactory(effectClass);
        }
        this.map(function (element) {
          return effectClass.apply.apply(effectClass, [element].concat(effectArguments));
        });
      },
      findElements(elementName) {
        var _o = New(ClassFactory("TagElements"));
        if (isBrowser) {
          for (var _k in this) {
            if (typeof _k === "number" && typeof this[_k] !== "function" && this[_k].hasOwnProperty.call(this[_k], "subelements")) {
              _o.push(this[_k].subelements(elementName));
            }
          }
        } else {
          // not yet implemented.
        }
        return _o;
      }
    });

    /**
     * Gets the element of DOM found by tag name
     *
     * @param {Object} tagname
     * @param {Object} innerHTML
     */
    var Tag = function (tagname, innerHTML) {
      var _o = New(ClassFactory("TagElements"));
      if (isBrowser) {
        var o = document.subelements(tagname);
        var addedKeys = [];
        for (var _i = 0; _i < o.length; _i++) {
          if (typeof innerHTML !== "undefined" && o[_i].hasOwnProperty.call(o[_i], "innerHTML")) {
            o[_i].innerHTML = innerHTML;
          }
          if (addedKeys.indexOf(_i) < 0) {
            _o.push(o[_i]);
            addedKeys.push(_i);
          }
        }
      } else {
        // not yet implemented.
      }
      return _o;
    };

    /**
     * Defines a Custom Ready listener
     */
    function Ready(e) {
      if (isBrowser) {
        _QC_READY_LISTENERS.push(e.bind(window));
      } else if (typeof global !== "undefined") {
        _QC_READY_LISTENERS.push(e.bind(global));
      }
    }
    var ready = Ready; // case insensitive ready option

    /**
     * Default Ready event function for window. Executes all micro ready events of Import calls
     *
     * @param {Object} e
     */
    var _Ready = function (e) {
      var _execReady = function () {
        _QC_READY_LISTENERS.map(function (_ready_listener_, _r) {
          if (typeof _ready_listener_ === "function") {
            _ready_listener_.call();
            delete _QC_READY_LISTENERS[_r];
          }
        });
      };
      if (_top.CONFIG.get("delayForReady") > 0) {
        if (isBrowser) {
          setTimeout(_execReady.bind(window), _top.CONFIG.get("delayForReady"));
        } else if (typeof global !== "undefined") {
          setTimeout(_execReady.bind(global), _top.CONFIG.get("delayForReady"));
        }
      } else {
        _execReady.call(_top);
      }
    };

    if (isBrowser) {
      window.onload = _Ready;
      if (is_phonegap) {
        document.addEventListener("deviceready", _Ready, captureFalse);
      }
    } else {
      global.onload = _Ready;
    }

    /**
     * Dynamic Data Objects Class
     * Usage:
     * Class('TestDDO',{
     *    data: {},
     *    _new_ (){
     *        this.ddo = New(DDO,{
     *            instance:this,
     *            name:'data',
     *            value:{},
     *            fget (value){
     *                logger.debug('returned value '+ value );
     *            }
     *            })
     *    }
     * });
     *
     */
    class DDO extends ClassFactory("InheritClass") {
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
        var ddoInstance = this;
        var name = (typeof name === "undefined") ? (ObjectName(ddoInstance)) : (name);

        Object.defineProperty(instance, name, {
          set(val) {
            let _value = val;
            logger.debug("value changed " + name);
            var ret;
            if (typeof fset !== "undefined" && typeof fset === "function") {
              ret = fset(_value);
            } else {
              ret = _value;
            }
            instance["_" + name] = ret;
            return;
          },
          get() {
            let _value = instance["_" + name];
            logger.debug("returning value " + name);
            var is_ddo = function (v) {
              if (typeof v === "object" && Object.hasOwnProperty.call(v, "value")) {
                return v.value;
              }
              return v;
            };
            var ret;
            if (typeof fget !== "undefined" && typeof fget === "function") {
              ret = fget(is_ddo(_value));
            } else {
              ret = is_ddo(_value);
            }
            return ret;
          }
        });
      }

    }
    Export(DDO);

    class DefaultTemplateHandler {
      template = "";
      __definition = {};
      constructor({ component, template }) {
        this.component = component;
        this.template = template;
      }
      assign(data) {
        var templateInstance = this;
        if (typeof templateInstance.component === "undefined") {
          throw new Error("DefaultTemplateHandler.assign: component is undefined");
        }
        if (typeof templateInstance.component.processorHandler === "undefined") {
          throw new Error("DefaultTemplateHandler.assign: component.processorHandler is undefined");
        }
        var processorHandler = templateInstance.component.processorHandler;
        processorHandler.component = templateInstance.component;
        var parsedAssignmentText = (typeof templateInstance.template !== "undefined") ? (templateInstance.template) : ("");
        if (typeof data === "object") {
          [...Object.keys(data)].map(function (k) {
            var _value = data[k];
            if (typeof _value === "string" || typeof _value === "number" || (!isNaN(_value))) {
              try {
                _value = Processor.processObject.bind(processorHandler).call(processorHandler, _value, templateInstance.component);
                parsedAssignmentText = parsedAssignmentText.replace((new RegExp(`{{${k}}}`, "g")), _value);
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

    }
    DefaultTemplateHandler.__definition = {};
    RegisterClass(DefaultTemplateHandler, "com.qcobjects");

    var __routing_params__ = function (routing, routingPath) {
      let standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
      return {
        ...[...routingPath.matchAll((new RegExp(standardRoutingPath, "g")))][0]["groups"]
      };
    };

    var __valid_routings__ = function (routings, routingPath) {
      return routings.filter(function (routing) {
        var standardRoutingPath = routing.path.replace(/{(.*?)}/g, "(?<$1>.*)");
        return (new RegExp(standardRoutingPath, "g")).test(routingPath);
      }).reverse();
    };
    var __valid_routing_way__ = function (validRoutingWays, routingWay) {
      return validRoutingWays.includes(routingWay);
    };

    var _buildComponentFromElement_ = function (element, __parent__) {
      var __shadowed_not_set = (element.getAttribute("shadowed") === null) ? (true) : (false);
      var __tplsource_attr_not_set = (element.getAttribute("template-source") === null) ? (true) : (false);
      var shadowed = (element.getAttribute("shadowed") === "true") ? (true) : (false);
      var __cached_not_set = (element.getAttribute("cached") === null) ? (true) : (false);
      var cached = (element.getAttribute("cached") === "true") ? (true) : (false);
      var tplextension = (typeof _top.CONFIG.get("tplextension") !== "undefined") ? (_top.CONFIG.get("tplextension")) : ("html");
      tplextension = (element.getAttribute("tplextension") !== null) ? (element.getAttribute("tplextension")) : (tplextension);
      var _componentName = element.getAttribute("name");
      var _componentClassName = (element.getAttribute("componentClass") !== null) ? (element.getAttribute("componentClass")) : ("Component");
      let __componentClassName = (_top.CONFIG.get("preserveComponentBodyTag")) ? (
        (_componentName !== null) ? ("com.qcobjects.components." + _componentName + ".ComponentBody") : ("com.qcobjects.components.ComponentBody")
      ) : (_componentClassName);
      _componentName = (_componentName !== null) ? (_componentName) : (
        (ClassFactory(__componentClassName) &&
          typeof ClassFactory(__componentClassName).name !== "undefined"
        ) ? (
          ClassFactory(__componentClassName).name
        ) : ("")
      );
      var __classDefinition = ClassFactory(__componentClassName);
      var __tplsource_prop_set = (__componentClassName !== "Component" && ((typeof __classDefinition !== "undefined" && typeof __classDefinition.tplsource === "string") && __classDefinition.tplsource !== "")) ? (true) : (false);
      var tplsource = (__tplsource_attr_not_set && __tplsource_prop_set) ? (__classDefinition.tplsource) : ((__tplsource_attr_not_set) ? ("default") : (element.getAttribute("template-source")));
      logger.debug(`template source for  ${_componentName} is ${tplsource} `);
      logger.debug(`type for ${_componentName} is ${__getType__(__classDefinition)} `);

      var componentURI;
      componentURI = ComponentURI({
        "COMPONENTS_BASE_PATH": _top.CONFIG.get("componentsBasePath"),
        "COMPONENT_NAME": _componentName,
        "TPLEXTENSION": tplextension,
        "TPL_SOURCE": tplsource
      });
      if (_top.CONFIG.get("preserveComponentBodyTag")) {
        Package((_componentName !== "") ? ("com.qcobjects.components." + _componentName + "") : ("com.qcobjects.components"), [
          Class("ComponentBody", ClassFactory("Component"), {
            name: _componentName,
            tplsource: tplsource,
            tplextension: tplextension,
            reload: true
          })
        ]);
      }

      var __create_component_instance_ = function () {
        var __shadowed = (__shadowed_not_set) ? ((__classDefinition && __classDefinition.shadowed) || ClassFactory("Component").shadowed) : (shadowed);
        var __definition = {
          __parent__: __parent__,
          name: _componentName,
          cached: (__cached_not_set) ? (ClassFactory("Component").cached) : (cached),
          shadowed: __shadowed,
          tplextension: tplextension,
          body: (_top.CONFIG.get("preserveComponentBodyTag")) ? (_DOMCreateElement("componentBody")) : (element),
          templateURI: componentURI,
          tplsource: tplsource
        };
        if (typeof _componentName === "undefined" || _componentName === "" || _componentName === null) {
          /* this allows to use the original property defined
          in the component definition if it is not present in the tag */
          delete __definition.name;
        }
        if (componentURI === "") {
          /* this allows to use the original property defined
          in the component definition if it is not present in the tag */
          delete __definition.templateURI;
        }
        var newComponent = New(__classDefinition, __definition);

        if (_top.CONFIG.get("preserveComponentBodyTag")) {
          element.append(newComponent);
        }
        return newComponent;
      };
      var newComponent = __create_component_instance_.call(this);
      return newComponent;
    };

    var _buildComponentsFromElements_ = function (elements, __parent__) {
      var componentsBuiltWith = [];
      if (isBrowser) {
        componentsBuiltWith = elements.map(
          function (element) {
            return _buildComponentFromElement_(element, __parent__);
          }
        );
      } else {
        logger.debug("[_buildComponentsFromElements_] not implemented for Non-Browser environments");
      }
      return componentsBuiltWith;
    };


    Package("com.qcobjects", [
      class Component extends ClassFactory("InheritClass") {
        validRoutingWays = ["pathname", "hash", "search"];
        basePath = _basePath_;
        domain = _domain_;
        templateHandler = "DefaultTemplateHandler";
        processorHandler = null;
        routingWay = null;
        routingNodes = [];
        routings = [];
        routingPath = "";
        routingPaths = [];
        _componentHelpers = [];
        subcomponents = [];
        splashScreenComponent = undefined;
        controller = undefined;
        view = undefined;
        effect = undefined;
        method = "GET";
        cached = true;
        __promise__ = null;
        __namespace = undefined;

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
            throw Error(`No arguments in component. You must at least give one argument.`);
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
          var self = this;

          if (typeof self.name === "undefined") {
            logger.warn("A name is not defined for " + __getType__(self));
          }

          self.routingWay = _top.CONFIG.get("routingWay");

          self.processorHandler = New(Processor, {
            component: self
          });

          /* assign body data attributes to data */
          self.data = (typeof self.data === "undefined" || self.data === null) ? ({}) : (self.data);
          self.data = Object.assign(self.data, self.dataAttributes);

          self.createServiceInstance()
            .then(function (serviceResponse) {
              if (typeof self.__new__ === "function") {
                self.__new__.call(self, self);
              }

              self._generateRoutingPaths(self.body)
                .then(function () {
                  self._reroute_()
                    .then(function () {
                      return self.rebuild()
                        .then(function () {
                          logger.info(`Component._new_ The component ${self.name} was built successfully!`);
                        }).catch(function (standardResponse) {
                          logger.warn(`Component._new_ Something went wrong building the component ${self.name}`);
                          console.error(standardResponse);
                        });
                    });
                });

            });

        }

        set body(value) {
          var self = this;
          self._body = value;
        }

        get body() {
          var self = this;
          return self._body;
        }

        set cacheIndex(value) {
          // readonly
          logger.debug("[cacheIndex] This property is readonly");
        }

        get cacheIndex() {
          var self = this;
          var __routing_path__ = _DataStringify(self.routingPath);
          return Base64.encode(self.name + __routing_path__);
        }

        set parsedAssignmentText(value) {
          // readonly
          logger.debug("[parsedAssignmentText] This property is readonly");
        }

        get parsedAssignmentText() {
          var self = this;
          self._parsedAssignmentText = self.parseTemplate(self.template);
          if (typeof self._parsedAssignmentText === "undefined") {
            throw Error(`[Component][${this.name}][parsedAssignmentText] Could not generate content!`);
          }
          return self._parsedAssignmentText;
        }


        set shadowRoot(value) {
          var self = this;
          if (typeof self.__shadowRoot == "undefined") {
            self.__shadowRoot = value;
          } else {
            logger.debug("[shadowRoot] This property can only be assigned once!");
          }
        }

        get shadowRoot() {
          var self = this;
          return self.__shadowRoot;
        }


        set routingSelected(value) {
          logger.debug("[routingSelected] This is a read-only property of the component");
        }

        get routingSelected() {
          var self = this;
          return __valid_routings__(self.routings, self.routingPath);
        }

        set routingParams(value) {
          logger.debug("[routingParams] This is a read-only property of the component");
        }

        get routingParams() {
          var component = this;
          return [{}].concat(component.routingSelected.map(function (routing) {
            return __routing_params__(routing, component.routingPath);
          })).reduce(function (accumulator, colData, index) {
            return Object.assign(accumulator, colData);
          });
        }

        createServiceInstance() {
          var component = this;
          var body = component.body;
          var data = this.data;
          var __serviceClass;
          var __classDefinition = component.getClass().__definition;
          var _serviceClassName = (isBrowser && body.getAttribute("serviceClass") !== null) ? (body.getAttribute("serviceClass")) : (null);

          return new Promise(function (resolve, reject) {
            /* __enable_service_class__ = true by default */
            var __enable_service_class__ = (
              (Object.hasOwnProperty.call(body, "enableServiceClass") && body.enableServiceClass) ||
              (!Object.hasOwnProperty.call(body, "enableServiceClass"))
            ) ? (true) : (false);
            var _response_to_data_ = (isBrowser && body.getAttribute("response-to") !== null && body.getAttribute("response-to") === "data") ? (true) : (false);
            var _response_to_template_ = (isBrowser && body.getAttribute("response-to") !== null && body.getAttribute("response-to") === "template") ? (true) : (false);

            if (__enable_service_class__ && _serviceClassName !== null) {
              __serviceClass = ClassFactory(_serviceClassName);
            }
            if (!_response_to_data_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
              _response_to_data_ = (__classDefinition.responseTo === "data") ? (true) : (false);
            } else if (!_response_to_data_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
              _response_to_data_ = (ClassFactory("Component").responseTo === "data") ? (true) : (false);
            }
            if (!_response_to_template_ && __classDefinition && Object.hasOwnProperty.call(__classDefinition, "responseTo")) {
              _response_to_template_ = (__classDefinition.responseTo === "template") ? (true) : (false);
            } else if (!_response_to_template_ && Object.hasOwnProperty.call(ClassFactory("Component"), "responseTo")) {
              _response_to_template_ = (ClassFactory("Component").responseTo === "template") ? (true) : (false);
            }

            if (typeof __serviceClass !== "undefined" &&
              (typeof __enable_service_class__ !== "undefined" &&
                __enable_service_class__ === true) &&
              (_response_to_data_ || _response_to_template_)
            ) {
              logger.info("Loading service " + _serviceClassName);
              var serviceInstance = New(__serviceClass, {
                data: data
              });
              serviceLoader(serviceInstance).then(function ({
                request,
                service
              }) {
                var serviceResponse;
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
              }, function (rejectedResponse) {
                logger.debug(`Service loading rejected for ${_serviceClassName} in ${component.name}`);
                reject(rejectedResponse);
              }).catch(function (e) {
                logger.debug("Something went wroing while trying to load the service " + _serviceClassName);
                throw Error(`Error loading ${_serviceClassName} for ${component.name}. Detail: ${e}`);
              });
            } else {
              resolve(null);
            }
          });
        }

        _bindroute_() {
          var _component_ = this;
          if (!_component_._bindroute_.loaded) {
            if (isBrowser) {

              _component_.hostElements("a").map(function (a) {
                a.oldclick = a.onclick;
                a.onclick = function (e) {
                  var _ret_ = true;
                  if (!_top.global.get("routingPaths")) {
                    _top.global.set("routingPaths", []);
                  }
                  var routingWay = _top.CONFIG.get("routingWay");
                  var routingPath = e.target[routingWay];
                  if (_top.global.get("routingPaths").includes(routingPath) &&
                    e.target[routingWay] !== document.location[routingWay] &&
                    e.target.href !== document.location.href
                  ) {
                    logger.debug("A ROUTING WAS FOUND: " + routingPath);
                    window.history.pushState({
                      href: e.target.href
                    }, e.target.href, e.target.href);
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
              // not yet implemented.
            }
            this._bindroute_.loaded = true;
          } else {
            logger.debug(`Routes already bound to popstate events for ${_component_.name}`);
          }

        }

        done(standardResponse) {
          var _ret_;
          if (typeof standardResponse !== "undefined") {
            var { request, component } = standardResponse;
            _ret_ = Promise.resolve({ request, component });
          }
          return _ret_;
        }

        createControllerInstance() {
          var _Controller;
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
          var _component_ = this;
          return new Promise(function (resolve, reject) {
            if (isBrowser) {
              var effectClassName = _component_.body.getAttribute("effectClass");
              var applyEffectTo = _component_.body.getAttribute("apply-effect-to");
              applyEffectTo = (applyEffectTo !== null) ? (applyEffectTo) : ("load");
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
          var _component_ = this;
          return new Promise(function (resolve, reject) {
            var viewName = (isBrowser) ? (_component_.body.getAttribute("viewClass")) : (null);
            if (viewName !== null) {
              var _View = ClassFactory(viewName);
              if (typeof _View !== "undefined") {
                _component_.view = New(_View, {
                  component: _component_
                }); // Initializes the main view for the component
                if (Object.hasOwnProperty.call(_component_.view, "done") && typeof _component_.view.done === "function") {
                  _component_.view.done.call(_component_.view);
                }
              }

            }
            resolve({ component: _component_, view: _component_.view });

          });
        }

        __done__() {
          var _component_ = this;
          var componentDone = function () {
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
              _component_.body.setAttribute("loaded", true);
            }
          };

          return new Promise(function (resolve, reject) {
            try {
              resolve(componentDone.call(_component_));
            } catch (e) {
              reject(e);
            }
          });

        }

        hostElements(tagFilter) {
          var _component_ = this;
          var elementList = [];
          if (isBrowser) {
            elementList = (_component_.shadowed && (typeof _component_.shadowRoot !== "undefined")) ? (
              _component_.shadowRoot.subelements(tagFilter)
            ) : (
              _component_.body.subelements(tagFilter)
            );

          }
          return elementList;
        }

        get subtags() {
          var _component_ = this;
          var tagFilter = _tag_filter_;
          return _component_.hostElements(tagFilter);
        }

        get bodyAttributes() {
          var _component_ = this;
          var c = _component_.body;
          return (isBrowser) ? ([...c.getAttributeNames()].map(a => { return { [a]: c.getAttribute(a) }; }).reduce((accumulator, colData, index) => { return Object.assign(accumulator, colData); })) : ({});
        }

        get dataAttributes() {
          var _component_ = this;
          var c = _component_.body;
          return (isBrowser) ? ([{}].concat([...c.getAttributeNames()].filter(n => n.startsWith("data-")).map(a => { return { [a.split("-")[1]]: c.getAttribute(a) }; })).reduce((accumulator, colData, index) => { return Object.assign(accumulator, colData); })) : ({});
        }

        __buildSubComponents__(rebuildObjects = false) {
          var _component_ = this;
          var elementList = _component_.subtags;
          if (!rebuildObjects) {
            elementList = elementList.filter(t => t.getAttribute("loaded") !== "true");
          }
          if ((typeof _component_ !== "undefined") || _component_.subcomponents.length < 1) {
            _component_.subcomponents = _buildComponentsFromElements_(elementList, _component_);
          }
          return _component_.subcomponents;
        }

        fail(standardResponse) {
          var _ret_;
          if (typeof standardResponse !== "undefined") {
            var { error, component } = standardResponse;
            _ret_ = Promise.resolve({ error, component });
          }
          return _ret_;
        }

        set(name, value) {
          this[name] = value;
        }

        get(name) {
          return this[name];
        }

        feedComponent() {
          var _component_ = this;
          logger.debug(`[Component][${this.name}][feedComponent] start feeding component...`);
          var _feedComponent_InBrowser = function (_component_) {
            if (typeof _component_.container === "undefined" && typeof _component_.body === "undefined") {
              logger.warn("COMPONENT {{NAME}} has an undefined container and body".replace("{{NAME}}", _component_.name));
              return;
            }
            var container = (typeof _component_.container === "undefined" || _component_.container === null) ? (_component_.body) : (_component_.container);
            var parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
            if (_component_.shadowed) {
              logger.debug("COMPONENT {{NAME}} is shadowed".replace("{{NAME}}", _component_.name));
              logger.debug("Preparing slots for Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
              var tmp_shadowContainer = _DOMCreateElement("div");
              container.subelements("[slot]").map(
                function (c) {
                  if (c.parentElement === container) {
                    tmp_shadowContainer.appendChild(c);
                  }
                });
              logger.debug("Creating shadowedContainer for COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
              var shadowContainer = _DOMCreateElement("div");
              shadowContainer.classList.add("shadowHost");
              try {
                _component_.shadowRoot = shadowContainer.attachShadow({
                  mode: "open"
                });
              } catch (e) {
                try {
                  logger.debug("Shadowed COMPONENT {{NAME}} is repeated".replace("{{NAME}}", _component_.name));
                  _component_.shadowRoot = shadowContainer.shadowRoot;
                } catch (e) {
                  logger.warn("Shadowed COMPONENT {{NAME}} is not allowed on this browser".replace("{{NAME}}", _component_.name));
                }
              }
              if (typeof _component_.shadowRoot !== "undefined" && _component_.shadowRoot !== null) {
                if (_component_.reload) {
                  logger.debug("FORCED RELOADING OF CONTAINER FOR Shadowed COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                  shadowContainer.shadowRoot.innerHTML = _component_.innerHTML;
                } else {
                  tmp_shadowContainer.innerHTML = _component_.parseTemplate(tmp_shadowContainer.innerHTML);
                  logger.debug("ADDING Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                  shadowContainer.shadowRoot.innerHTML += _component_.innerHTML;
                }
                logger.debug("ADDING Slots to Shadowed COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                shadowContainer.innerHTML += tmp_shadowContainer.innerHTML;
                logger.debug("APPENDING Shadowed COMPONENT {{NAME}} to Container ".replace("{{NAME}}", _component_.name));
                var qs = container.querySelector(".shadowHost");
                if (!(typeof qs !== "undefined" && qs !== null)) {
                  container.appendChild(shadowContainer);
                } else {
                  logger.debug("Shadowed Container for COMPONENT {{NAME}} is already present in the tree ".replace("{{NAME}}", _component_.name));
                  _component_.shadowRoot.innerHTML = shadowContainer.shadowRoot.innerHTML;
                }
              } else {
                logger.warn("Shadowed COMPONENT {{NAME}} is bad configured".replace("{{NAME}}", _component_.name));
              }
            } else {
              if (_component_.reload) {
                logger.debug("FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}".replace("{{NAME}}", _component_.name));
                container.innerHTML = _component_.innerHTML;
              } else if (container && _component_) {
                logger.debug("ADDING COMPONENT {{NAME}} ".replace("{{NAME}}", _component_.name));
                container.innerHTML += _component_.innerHTML;
              } else {
                logger.warn("COMPONENT {{NAME}} is not added to the DOM".replace("{{NAME}}", _component_.name));
              }
            }

          };

          var _feedComponent_InNode = function (_component_) {
            var parsedAssignmentText = _component_.parsedAssignmentText;
            _component_.innerHTML = parsedAssignmentText;
          };

          var _ret_;
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
          var _component = this;
          var _promise = new Promise(function (resolve, reject) {
            if (typeof _component === "undefined" || _component === null) {
              reject("Component is undefined");
            }
            if (isQCObjects_Object(_component) && is_a(_component, "Component")) {
              switch (true) {
                case (_component.get("tplsource") === "none"):
                  logger.debug("Component " + _component.name + " has specified template-source=none, so no template load was done");
                  var standardResponse = {
                    request: null,
                    component: _component
                  };
                  _component.__done__().then(function () {
                    if (typeof _component.done === "function") {
                      _component.done.call(_component, standardResponse);
                    }
                    resolve.call(_promise, standardResponse);
                  }, function () {
                    reject.call(_promise, standardResponse);
                  });
                  break;
                case (_component.get("tplsource") === "inline"):
                  logger.debug("Component " + _component.name + " has specified template-source=inline, so it is assumed that template is already declared");
                  (async function (_component) {
                    _component.feedComponent.bind(_component)();
                  })(_component);
                  var standardResponse = {
                    request: null,
                    component: _component
                  };
                  _component.__done__().then(function () {
                    if (typeof _component.done === "function") {
                      _component.done.call(_component, standardResponse);
                    }
                    resolve.call(_promise, standardResponse);
                  }, function () {
                    reject.call(_promise, standardResponse);
                  });
                  break;
                case (_component.get("tplsource") === "default" &&
                  _component.get("templateURI") !== ""):
                  _component.set("url", _component.get("basePath") + _component.get("templateURI"));
                  componentLoader(_component, false).then(
                    function (standardResponse) {
                      resolve.call(_promise, standardResponse);
                    },
                    function (standardResponse) {
                      reject.call(_promise, standardResponse);
                    });
                  break;
                case (_component.get("tplsource") === "external" &&
                  _component.get("templateURI") !== ""):
                  _component.set("url", _component.get("templateURI"));
                  componentLoader(_component, false).then(
                    function (standardResponse) {
                      resolve.call(_promise, standardResponse);
                    },
                    function (standardResponse) {
                      reject.call(_promise, standardResponse);
                    });
                  break;
                case _component.get("tplsource") === "default" && _component.get("templateURI", "") === "":
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
          /* Cast method for components has been deprecated. Don't use this method, it is available only for compatibility purposes */
          let o = _methods_(oClass).map(m => m.name.replace(/bound /g, "")).map(m => {
            return {
              [m]: oClass[m].bind(this)
            };
          }).reduce((c, p) => Object.assign(c, p), {});
          return _Cast(this, o);
        }

        static route() {
          var componentClass = this; /* is can be class or object*/
          var _route_promise_;
          var isValidInstance = (isQCObjects_Object(componentClass) && is_a(componentClass, "Component")) ? (true) : (false);
          var __route__ = function (componentList) {
            var _componentNames_ = [];
            var _promises_ = componentList.filter(function (rc) {
              return typeof rc !== "undefined";
            }).map(function (rc) {
              if (typeof rc.name !== "undefined") {
                _componentNames_.push(rc.name);
              } else {
                throw new Error(__getType__(rc) + " does not have a name");
              }
              return new Promise(function (resolve, reject) {
                var _promise_;
                if (typeof rc !== "undefined" && !!rc._reroute_) {
                  _promise_ = rc._reroute_()
                    .then(function () {
                      rc.reload = true;
                      return rc.rebuild();
                    })
                    .then(function (_rc_) {
                      if (Object.hasOwnProperty.call(rc, "subcomponents") &&
                        typeof rc.subcomponents !== "undefined" &&
                        rc.subcomponents.length > 0
                      ) {
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
            return Promise.all(_promises_)
              .then(function () {
                logger.debug("ROUTING COMPLETED FOR " + _componentNames_.join(", "));
              }).catch(function (err) {
                logger.warn("ROUTING FAILED FOR " + _componentNames_.join(", ") + ": " + err);
              });
          };
          if (isValidInstance || !!_top.componentsStack) {
            if (isValidInstance) {
              logger.debug("loading routings for instance " + componentClass.name);
            }
            _route_promise_ = __route__.call(componentClass, (isValidInstance) ? (componentClass.subcomponents) : (_top.componentsStack));
          } else {
            logger.debug("An undetermined result expected if load routings. So will not be loaded this time.");
            throw Error(`There is no valid instance and no components stack available to apply rountings`);
          }
          return _route_promise_;
        }

        fullscreen() {
          if (isBrowser) {
            var elem = this.body;
            if (elem.requestFullscreen) {
              elem.requestFullscreen();
            } else if (elem.mozRequestFullScreen) {
              /* Firefox */
              elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
              /* Chrome, Safari & Opera */
              elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
              /* IE/Edge */
              elem.msRequestFullscreen();
            }
          } else {
            // not yet implemented.
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
            // noy yet implemented.
          }
        }

        _generateRoutingPaths(componentBody) {
          var component = this;
          return new Promise(function (resolve, reject) {
            if (isBrowser) {
              if (__valid_routing_way__(component.validRoutingWays, component.routingWay)) {
                if (typeof componentBody !== "undefined") {
                  component.innerHTML = componentBody.innerHTML;
                  component.routingNodes = componentBody.subelements("routing");
                  component.routings = [];
                  component.routingNodes.map(function (routingNode, r) {
                    var attributeNames = routingNode.getAttributeNames();
                    var routing = {};
                    attributeNames.map(function (attributeName, a) {
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
              // not yet implemented.
            }
            resolve();

          });
        }

        parseTemplate(template) {
          var _self = this;
          var _parsedAssignmentText;
          var value = template;
          if (Object.hasOwnProperty.call(_self, "templateHandler")) {
            var templateHandlerName = _self.templateHandler;
            logger.debug(`[Component][${this.name}][parseTemplate] Attempting to use ${templateHandlerName} ...`);
            var templateHandlerClass = ClassFactory(templateHandlerName);
            var templateInstance = New(templateHandlerClass, {
              component: _self,
              template: value
            });
            templateInstance.component = _self;
            var selfData = _self.data;
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
          /* This method set the selected routing and makes the switch to the templateURI */
          var rc = this;
          return new Promise(function (resolve, reject) {
            if (isBrowser) {
              if (__valid_routing_way__(rc.validRoutingWays, rc.routingWay)) {
                rc.routingPath = document.location[rc.routingWay];
                rc.routingSelected.map(function (routing, r) {
                  var componentURI = ComponentURI({
                    "COMPONENTS_BASE_PATH": _top.CONFIG.get("componentsBasePath"),
                    "COMPONENT_NAME": routing.name.toString(),
                    "TPLEXTENSION": (Object.hasOwnProperty.call(routing, "tplextension")) ? (routing.tplextension) : (rc.tplextension),
                    "TPL_SOURCE": "default" /* here is always default in order to get the right uri */
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
            var component = this;
            var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
            var _imgLazyLoaded = [..._componentRoot.subelements("img[lazy-src]")];
            var _lazyLoadImages = function (image) {
              image.setAttribute("src", image.getAttribute("lazy-src"));
              image.onload = () => {
                image.removeAttribute("lazy-src");
              };
            };
            if ("IntersectionObserver" in window) {
              var observer = new IntersectionObserver((items, observer) => {
                items.forEach((item) => {
                  if (item.isIntersecting) {
                    _lazyLoadImages(item.target);
                    observer.unobserve(item.target);
                  }
                });
              });
              _imgLazyLoaded.map(function (img) {
                return observer.observe(img);
              });
            } else {
              _imgLazyLoaded.map(_lazyLoadImages);
            }

          } else {
            // not yet implemented
          }
          return null;
        }

        applyTransitionEffect(effectClassName) {
          var _Effect = ClassFactory(effectClassName);
          if (typeof _Effect === "undefined") {
            throw Error(`${effectClassName} not found.`);
          }
          if (typeof _Effect !== "undefined" && is_a(_Effect, "TransitionEffect")) {
            this.effect = New(_Effect, {
              component: this
            });
            this.effect.apply(this.effect.defaultParams);
          } else {
            logger.debug(`${effectClassName} is ${__getType__(_Effect)} but is not a TransitionEffect`);
          }
        }

        applyObserveTransitionEffect(effectClassName) {
          if (isBrowser) {
            var component = this;
            var _componentRoot = (component.shadowed) ? (component.shadowRoot.host) : (component.body);
            var _applyEffect_ = function (element) {
              component.applyTransitionEffect(effectClassName);
            };
            if ("IntersectionObserver" in window) {
              var observer = new IntersectionObserver((items, observer) => {
                items.forEach((item) => {
                  if (item.isIntersecting) {
                    _applyEffect_(item.target);
                    observer.unobserve(item.target);
                  }
                });
              });
              observer.observe(_componentRoot);
            } else {
              _applyEffect_(_componentRoot);
            }
          } else {
            // not yet implemented
          }
          return null;
        }

        scrollIntoHash() {
          if (isBrowser) {
            var component = this;
            if (document.location.hash !== "") {
              var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
              _componentRoot.subelements(document.location.hash).map(
                function (element) {
                  if (typeof element.scrollIntoView === "function") {
                    element.scrollIntoView(
                      _top.CONFIG.get("scrollIntoHash", {
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
            // not yet implemented
          }
        }

        i18n_translate() {
          if (isBrowser) {
            if (_top.CONFIG.get("use_i18n")) {
              var component = this;
              var _componentRoot = (component.shadowed) ? (component.shadowRoot) : (component.body);
              var lang1 = _top.CONFIG.get("lang", "en");
              var lang2 = navigator.language.slice(0, 2);
              var i18n = _top.global.get("i18n");
              if ((lang1 !== lang2) && (typeof i18n === "object" && Object.hasOwnProperty.call(i18n, "messages"))) {
                var callback_i18n = function () {
                  var component = this;
                  return new Promise(function (resolve, reject) {
                    var messages = i18n.messages.filter(function (message) {
                      return Object.hasOwnProperty.call(message, lang1) && Object.hasOwnProperty.call(message, lang2);
                    });
                    _componentRoot.subelements("ul,li,h1,h2,h3,a,b,p,input,textarea,summary,details,option,component")
                      .map(function (element) {
                        messages.map(function (message) {
                          var _innerHTML = element.innerHTML;
                          _innerHTML = _innerHTML.replace(new RegExp(`${message[lang1]}`, "g"), message[lang2]);
                          element.innerHTML = _innerHTML;
                          return null;
                        });
                        return element;
                      });
                    resolve();
                  });
                };
                callback_i18n.call(component).then(function () {
                  logger.debug("i18n loaded for component: " + component.name);
                });

              }
            }
          } else {
            // not yet implemented
          }
        }

        addComponentHelper(componentHelper) {
          var component = this;
          component._componentHelpers.push(componentHelper);
        }

        runComponentHelpers() {
          if (isBrowser) {
            var component = this;
            var __component_helpers__ = [];
            /*
             * BEGIN use i18n translation
             */
            __component_helpers__.push(component.i18n_translate.bind(component));
            /*
             * END use i18n translation
             */

            /*
             * BEGIN component scrollIntoHash
             */
            __component_helpers__.push(component.scrollIntoHash.bind(component));
            /*
             * END component scrollIntoHash
             */

            /*
             * BEGIN component images lazy-load
             */

            __component_helpers__.push(component.lazyLoadImages.bind(component));

            /*
             * END component images lazy-load
             */

            __component_helpers__ = __component_helpers__.concat(component._componentHelpers);

            __component_helpers__.map(
              function (_component_helper_) {
                logger.debug(`Executing ${_component_helper_.name} as component helper for ${component.name}...`);
                _component_helper_();
              }
            );

          } else {
            // not yet implemented
          }

        }

      }

    ]);

    (_methods_)(ClassFactory("Component")).map(function (__c__) {
      (_protected_code_)(__c__);
    });

    if (isBrowser) {
      window.addEventListener("popstate", function (popStateEvent) {
        popStateEvent.stopImmediatePropagation();
        popStateEvent.stopPropagation();
        ClassFactory("Component").route();
      });
    }

    Package("com.qcobjects.controllers", [
      class Controller extends ClassFactory("InheritClass") {
        component = null;
        dependencies = [];
        constructor({
          component,
          dependencies
        }) {
          super({ component, dependencies });
          this.component = component;
          this.dependencies = dependencies;
          if (typeof this.component === "undefined" || this.component === "null") {
            throw Error(`${__getType__(this)} must be called with a component`);
          }
        }

        routingSelectedAttr(attrName) {
          return this.component.routingSelected.map(function (r) {
            return r[attrName];
          }).filter(function (v) {
            return v;
          }).pop();
        }

        isTouchable() {
          return ("ontouchstart" in window) ||
            (navigator.MaxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);
        }

        onpress(subelementSelector, handler) {
          try {
            if (this.isTouchable()) {
              this.component.body.subelements(subelementSelector)[0].addEventListener("touchstart", handler, {
                passive: true
              });
            } else {
              this.component.body.subelements(subelementSelector)[0].addEventListener("click", handler, {
                passive: true
              });
            }
          } catch (e) {
            logger.debug("No button to assign press event");
          }
        }

        createRoutingController() {
          var controller = this;
          var component = controller.component;
          var controllerName = controller.routingSelectedAttr("controllerclass");
          if (typeof controllerName !== "undefined") {
            var _Controller = ClassFactory(controllerName);
            if (typeof _Controller !== "undefined") {
              component.routingController = New(_Controller, {
                component: component
              }); // Initializes the main controller for the component
              if (Object.hasOwnProperty.call(component.routingController, "done") && typeof component.routingController.done === "function") {
                component.routingController.done.call(component.routingController);
              }
            }
          }
        }

        done() { }
      }
    ]);

    Package("com.qcobjects.views", [
      class View extends ClassFactory("InheritClass") {
        constructor({ component = undefined, dependencies = [] }) {
          super(...arguments);
          if (typeof this.component === "undefined" || this.component === "null") {
            throw Error(`${__getType__(this)} must be called with a component`);
          }

        }
      }
    ]);

    Package("com.qcobjects.api", [
      class Service extends ClassFactory("InheritClass") {
        kind = "rest";
        /* it can be rest, mockup, local */
        domain = _domain_;
        basePath = _basePath_;
        url = "";
        method = "GET";
        data = {};
        reload = false;
        cached = false;

        constructor() {
          super(...arguments);
        }

        set(name, value) {
          this[name] = value;
        }

        get(name) {
          return this[name];
        }

      }

    ]);

    Package("com.qcobjects.api.services", [
      class JSONService extends ClassFactory("Service") {
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

        constructor() {
          super(...arguments);
        }

      }
    ]);

    Package("com.qcobjects.api.config", [
      class ConfigService extends ClassFactory("JSONService") {
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
            this.JSONresponse = JSON.parse(ClassFactory("_Crypt").decrypt(this.JSONresponse.__encoded__, _secretKey));
          }
          for (var k in this.JSONresponse) {
            _top.CONFIG.set(k, this.JSONresponse[k]);
          }
          this.configLoaded.call(this);
        }
        fail(result) {
          this.configLoaded.call(this);
        }

        constructor() {
          super(...arguments);
          this.set("url", this.get("basePath") + this.get("configFileName"));
        }
      }
    ]);

    Package("com.qcobjects.valueObjects", [
      class VO extends ClassFactory("InheritClass") {
        constructor() {
          super(...arguments);
        }
      }
    ]);

    /**
     * Returns a standarized uri for a component
     * @example
     * templateURI = ComponentURI({'COMPONENTS_BASE_PATH':'','COMPONENT_NAME':'','TPLEXTENSION':'','TPL_SOURCE':''})
     * @author: Jean Machuca <correojean@gmail.com>
     * @param params an object with the params to build the uri path
     */
    var ComponentURI = ({ TPL_SOURCE, COMPONENTS_BASE_PATH, COMPONENT_NAME, TPLEXTENSION }) => {
      const templateURI = (TPL_SOURCE === "default") ? (`${COMPONENTS_BASE_PATH}${COMPONENT_NAME}.${TPLEXTENSION}`) : ("");
      return templateURI;
    };

    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param component a Component object
     */
    var componentLoader = function (component, _async) {
      var __promise__;
      var _componentLoaderInBrowser = function (component, _async) {
        __promise__ = new Promise(function (resolve, reject) {
          var _promise = component.__promise__;
          var container = (Object.hasOwnProperty.call(component, "container") && typeof component.container !== "undefined" && component.container !== null) ? (component.container) : (component.body);
          if (container !== null) {
            var _feedComponent_ = function (component) {
              component.feedComponent();
              var standardResponse = {
                "request": xhr,
                "component": component
              };
              resolve.call(_promise, standardResponse);
            };
            logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component.data)).replace("{{URL}}", component.url));

            var _componentLoaded = function () {
              var successStatus = (is_file) ? (0) : (200);
              if (xhr.status === successStatus) {
                var response = xhr.responseText;
                logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
                component.template = response;
                if (component.cached && (typeof cache !== "undefined")) {
                  cache.save(component.name, component.template);
                }
                _feedComponent_.call(this, component);
              } else {
                var standardResponse = {
                  "request": xhr,
                  "component": component
                };
                reject.call(_promise, standardResponse);

              }
            };
            if (typeof component.template === "string" && component.template !== "") {
              // component already has a template it does not need to be reloaded
              _feedComponent_.call(this, component);
            } else {
              var is_file = (component.url.startsWith("file:")) ? (true) : (false);
              var xhr = new XMLHttpRequest();
              if (!is_file) {
                try {
                  logger.debug("Calling the url of component in async mode.");
                  xhr.open(component.method, component.url, true);
                } catch (e) {
                  logger.debug("Last try has failed... The component cannot be loaded.");
                }
              } else {
                if ("fetch" in _top) {
                  logger.debug("I can use fetch...");
                  logger.debug("It is a file to be loaded, so I will try to use fetch");
                  var _p = fetch(component.url).then(response => {
                    logger.debug("I got a response from fetch, so I'll feed the component");
                    response.text().then(text => {
                      component.template = text;
                      _feedComponent_.call(this, component);
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
              var _directLoad = function (is_file) {
                is_file = (typeof is_file === "undefined" || !is_file) ? (false) : (true);
                logger.debug("SENDING THE NORMAL REQUEST  ");
                if (is_file) {
                  if (!("fetch" in _top)) {
                    logger.debug("I have to try to load the file using xhr...  ");
                    xhr.send(null);
                    if (xhr.status === XMLHttpRequest.DONE) {
                      _componentLoaded.call(this);
                    }
                  }
                } else {
                  logger.debug("Trying to send the data to the component...  ");
                  xhr.send(_DataStringify(component.data));
                }
              };

              if (component.cached && (!is_file)) {
                logger.debug("USING CACHE FOR COMPONENT: " + component.name);
                var cache = new ComplexStorageCache({
                  index: component.cacheIndex,
                  load(cacheController) {
                    _directLoad.call(this, is_file);
                  },
                  alternate(cacheController) {
                    if (component.method === "GET") {
                      component.template = cacheController.cache.getCached(component.cacheIndex);
                      _feedComponent_.call(this, component);
                    } else {
                      _directLoad.call(this, is_file);
                    }
                    return;
                  }
                });
                global.lastCache = cache;
              } else {
                logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
                _directLoad.call(this, is_file);
              }

            }
          } else {
            logger.debug("CONTAINER DOESNT EXIST");
          }
        });
        __promise__.then(function (standardResponse) {
          return component.__done__().then(function () {
            var _ret_;
            if (typeof component.done === "function") {
              _ret_ = component.done.call(component, standardResponse);
            }
            return Promise.resolve(_ret_);
          });
        }, function (standardResponse) {
          var _ret_;
          if (typeof component.fail === "function") {
            _ret_ = component.fail.call(component, standardResponse);
          }
          return Promise.reject(_ret_);
        }).catch(function (e) {
          logger.debug("Something wrong loading the component");
        });
        return __promise__;
      };
      var _componentLoaderInNode = function (component, _async) {
        __promise__ = new Promise(function (resolve, reject) {
          var _promise = __promise__;
          var _feedComponent_ = function (component) {
            component.feedComponent();
            var standardResponse = {
              "request": null,
              "component": component
            };
            resolve.call(_promise, standardResponse);
          };
          logger.debug("LOADING COMPONENT DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(component.data)).replace("{{URL}}", component.url));

          var _componentLoaded = function (err, responseText) {
            if (!err) {
              var response = responseText.toString();
              logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
              logger.debug("CREATING COMPONENT {{NAME}}".replace("{{NAME}}", component.name));
              component.template = response;
              if (component.cached && (typeof cache !== "undefined")) {
                cache.save(component.name, component.template);
              }
              _feedComponent_.call(this, component);
            } else {
              var standardResponse = {
                "request": null,
                "component": component
              };
              reject.call(_promise, standardResponse);
            }
          };
          if (typeof component.template === "string" && component.template !== "") {
            // component already has a template it does not need to be reloaded
            _feedComponent_.call(this, component);
          } else {
            logger.debug("Loading the component as a local file in server...");
            var _directLoad = function (is_file) {
              const fs = _require_("fs");
              logger.debug("SENDING THE NORMAL REQUEST  ");
              fs.readFile(component.url, _componentLoaded);
            };

            if (component.cached) {
              logger.debug("USING CACHE FOR COMPONENT: " + component.name);
              var cache = new ComplexStorageCache({
                index: component.cacheIndex,
                load(cacheController) {
                  _directLoad.call(this);
                },
                alternate(cacheController) {
                  if (component.method === "GET") {
                    component.template = cacheController.cache.getCached(component.cacheIndex);
                    _feedComponent_.call(this, component);
                  } else {
                    _directLoad.call(this);
                  }
                  return;
                }
              });
              global.lastCache = cache;
            } else {
              logger.debug("NOT USING CACHE FOR COMPONENT: " + component.name);
              _directLoad.call(this);
            }

          }
        });
        __promise__.then(function (standardResponse) {
          return component.__done__().then(function () {
            var _ret_;
            if (typeof component.done === "function") {
              _ret_ = component.done.call(component, standardResponse);
            }
            return Promise.resolve(_ret_);
          });
        }, function (standardResponse) {
          var _ret_;
          if (typeof component.fail === "function") {
            _ret_ = component.fail.call(component, standardResponse);
          }
          return Promise.reject(_ret_);
        }).catch(function (e) {
          logger.debug(`Something wrong loading the component: ${e}`);
        });
        return __promise__;
      };

      var _ret_;
      if (isBrowser) {
        if (typeof _async !== "undefined" && _async) {
          _ret_ = asyncLoad(_componentLoaderInBrowser, arguments);
        } else {
          _ret_ = _componentLoaderInBrowser(component, _async);
        }
      } else {
        _ret_ = _componentLoaderInNode(component, _async);
      }
      return _ret_;
    };

    /**
     * Loads a simple component from a template
     *
     * @author: Jean Machuca <correojean@gmail.com>
     * @param service a Service object
     */
    var serviceLoader = function (service, _async) {
      var _serviceLoaderInBrowser = function (service, _async) {
        var _promise = new Promise(
          function (resolve, reject) {

            logger.debug("LOADING SERVICE DATA {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = service.withCredentials;
            var xhrasync = true; // always async because xhr sync is deprecated
            xhr.open(service.method, service.url, xhrasync);
            for (var header in service.headers) {
              try {
                if (typeof service.headers[header] !== "function") {
                  xhr.setRequestHeader(header, service.headers[header]);
                }
              } catch (e) {
                logger.debug("Something went wrong when assign the header " + header);
              }
            }
            xhr.onload = function () {
              if (xhr.status === 200) {
                var response = xhr.responseText;
                logger.debug("Data received {{DATA}}".replace("{{DATA}}", _DataStringify(response)));
                logger.debug("CREATING SERVICE {{NAME}}".replace("{{NAME}}", service.name));
                service.template = response;
                if (service.cached && (typeof cache !== "undefined")) {
                  cache.save(service.name, service.template);
                }
                if (typeof service.done === "function") {
                  var standardResponse = {
                    "request": xhr,
                    "service": service
                  };
                  service.done.call(service, standardResponse);
                  resolve.call(_promise, standardResponse);
                }
              } else {
                if (typeof service.fail === "function") {
                  var standardResponse = {
                    "request": xhr,
                    "service": service
                  };
                  service.fail.call(service, standardResponse);
                  reject.call(_promise, standardResponse);
                }
              }
            };

            var _directLoad = function () {
              logger.debug("SENDING THE NORMAL REQUEST  ");
              try {
                xhr.send(_DataStringify(service.data));
              } catch (e) {
                logger.debug("SOMETHING WRONG WITH REQUEST  ");
                reject.call(_promise, {
                  request: xhr,
                  service: service
                });
              }
            };

            if (service.cached) {
              var cache = new ComplexStorageCache({
                index: service.data,
                load(cacheController) {
                  _directLoad.call(this);
                },
                alternate(cacheController) {
                  if (service.method === "GET") {
                    service.template = cacheController.cache.getCached(service.name);
                    if (typeof service.done === "function") {
                      var standardResponse = {
                        "request": xhr,
                        "service": service
                      };
                      service.done.call(service, standardResponse);
                      resolve.call(_promise, standardResponse);
                    }
                  } else {
                    _directLoad.call(this);
                  }
                  return;
                }
              });
              global.lastCache = cache;
            } else {
              _directLoad.call(this);
            }

            return xhr;
          }
        );
        return _promise;
      };

      var _serviceLoaderInNode = function (service, _async) {
        var _promise = new Promise(
          function (resolve, reject) {
            if (typeof URL === "undefined") {
              global.URL = _require_("url").URL;
              let URL = global.URL;
            }
            var serviceURL = new URL(service.url);
            var req;
            service.useHTTP2 = Object.hasOwnProperty.call(service, "useHTTP2") && service.useHTTP2;


            var captureEvents = function (req) {
              logger.debug("LOADING SERVICE DATA (non-browser) {{DATA}} FROM {{URL}}".replace("{{DATA}}", _DataStringify(service.data)).replace("{{URL}}", service.url));
              var dataXML;
              var standardResponse = {
                "http2Client": client,
                "request": req,
                "service": service,
                "responseHeaders": null
              };

              if (typeof service.data === "object" && service.data !== null) {
                if (service.useHTTP2) {
                  try {
                    logger.debug("Sending data...");
                    let buffer = new Buffer(_DataStringify(service.data));
                    req.write(buffer);
                  } catch (e) {
                    logger.debug("It was not possible to send any data");
                  }
                }
              }

              dataXML = "";
              req.on("response", (responseHeaders, flags) => {
                logger.debug("receiving response...");
                standardResponse.responseHeaders = responseHeaders;
                /*
                for (const name in responseHeaders) {
                  logger.debug(`${name}: ${responseHeaders[name]}`);
                }
                */
                dataXML = "";
              });
              req.on("data", (chunk) => {
                logger.debug("receiving data...");
                // do something with the data
                dataXML += "" + chunk.toString();
                service.template = dataXML;
              });
              if (service.useHTTP2) {
                req.resume();
              }
              req.on("end", () => {
                logger.debug("ending call...");
                service.template = dataXML;
                if (Object.hasOwnProperty.call(service, "useHTTP2") && service.useHTTP2) {
                  client.destroy();
                } else {
                  req.destroy();
                }
                service.done.call(service, standardResponse);
                resolve.call(_promise, standardResponse);
              });
              if (service.useHTTP2) {
                req.end();
              }

            };

            try {
              var requestOptions;
              if (service.useHTTP2) {
                logger.debug("using http2");
                var http2 = _require_("http2");
                var client = http2.connect(serviceURL.origin);
                requestOptions = Object.assign({
                  ":method": service.method,
                  ":path": serviceURL.pathname
                }, service.options);
                requestOptions = Object.assign(requestOptions, service.headers);
                req = client.request(requestOptions);
                req.setEncoding("utf8");
                captureEvents(req);
              } else {
                if (serviceURL.protocol === "http:") {
                  var http = _require_("http");
                  var request = http.request;
                  requestOptions = Object.assign({
                    "url": service.url,
                    headers: service.headers
                  }, service.options);
                  var req = request(service.url);
                  captureEvents(req);
                } else if (serviceURL.protocol === "https:") {
                  var https = _require_("https");
                  requestOptions = Object.assign({
                    hostname: serviceURL.hostname,
                    port: serviceURL.port,
                    path: serviceURL.pathname,
                    method: service.method,
                    headers: service.headers
                  }, service.options);
                  var _req_ = https.request(requestOptions, function (req) {
                    captureEvents(req);
                  });
                  _req_.end();
                } else {
                  var e = "Protocol not supported: " + serviceURL.protocol;
                  logger.debug(e);
                  throw new Error(e);
                }
              }


            } catch (e) {
              logger.debug(e);
              service.fail.call(service, e);
              reject.call(_promise, e);

            }
          }).catch(function (e) {
            console.log(e);
            logger.debug("Something happened when trying to call the service: " + service.name);
            service.fail.call(service, e);
          });
        return _promise;

      };

      var _serviceLoaderMockup = function (service, _async) {
        var _promise = new Promise(
          function (resolve, reject) {
            logger.debug(`Calling mockup service ${service.name} ...`);
            var standardResponse = {
              "request": null,
              "service": service,
              "responseHeaders": service.responseHeaders
            };
            if (typeof service.mockup === "function") {
              service.mockup.call(service, standardResponse);
            } else {
              service.done.call(service, standardResponse);
            }
            resolve.call(_promise, standardResponse);
          });
        return _promise;
      };
      var _serviceLoaderLocal = function (service, _async) {
        var _promise = new Promise(
          function (resolve, reject) {
            logger.debug(`Calling local service ${service.name} ...`);
            var standardResponse = {
              "request": null,
              "service": service,
              "responseHeaders": service.responseHeaders
            };
            if (typeof service.local === "function") {
              service.local.call(service, standardResponse);
            } else {
              service.done.call(service, standardResponse);
            }
            resolve.call(_promise, standardResponse);
          });
        return _promise;
      };

      var _ret_;
      switch (service.kind) {
        case "rest":
          if (isBrowser) {
            if (typeof _async !== "undefined" && _async) {
              _ret_ = asyncLoad(_serviceLoaderInBrowser, arguments);
            } else {
              _ret_ = _serviceLoaderInBrowser(service, _async);
            }
          } else {
            _ret_ = _serviceLoaderInNode(service, _async);
          }
          break;
        case "mockup":
          _ret_ = _serviceLoaderMockup(service, _async);
          break;
        case "local":
          _ret_ = _serviceLoaderLocal(service, _async);
          break;
        default:
          logger.debug(`The value of the kind property of the service ${service.name} is not valid`);
          break;
      }
      return _ret_;
    };
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
      var _ComponentWidget_ = class extends HTMLElement {
        constructor() {
          super(...arguments);
          const componentWidget = this;
          const componentName = componentWidget.nodeName.toLowerCase();
          const componentBody = _DOMCreateElement("quick-component");
          const __enabled__atributes__ = componentWidget.getAttributeNames();
          componentBody.setAttribute("name", componentName);

          if (!componentWidget.hasAttribute("shadowed")) {
            componentBody.setAttribute("shadowed", "true");
          }
          __enabled__atributes__.map(function (attributeName) {
            if (componentWidget.hasAttribute(attributeName)) {
              componentBody.setAttribute(attributeName, componentWidget.getAttribute(attributeName));
              componentWidget.removeAttribute(attributeName);
            }
          });
          var data_attributenames = componentWidget.getAttributeNames().filter(function (a) {
            return a.startsWith("data-");
          }).map(function (a) {
            return a.split("-")[1];
          });
          data_attributenames.map(function (_attribute_name_) {
            componentBody.setAttribute("data-" + _attribute_name_, componentWidget.getAttribute("data-" + _attribute_name_));
            componentWidget.removeAttribute("data-" + _attribute_name_);
          });
          [...componentWidget.children].map(function (element) {
            componentBody.appendChild(element.cloneNode(true));
            element.remove();
          });

          componentWidget.append(componentBody);
        }
      };
      Export(_ComponentWidget_);
      var RegisterWidget = function (widgetName) {
        customElements.define(widgetName, class extends _ComponentWidget_ { });
      };
      var RegisterWidgets = function () {
        var widgetList = [...arguments];
        widgetList.filter(function (widgetName) {
          return typeof widgetName === "string";
        }).map(function (widgetName) {
          RegisterWidget(widgetName);
        });
      };
      (_protected_code_)(RegisterWidget);
      (_protected_code_)(RegisterWidgets);
      Export(RegisterWidget);
      Export(RegisterWidgets);

    } else {
      // not yet implemented.
    }

    if (!isBrowser) {

      Package("com.qcobjects.api", [
        class BackendMicroservice extends ClassFactory("InheritClass") {

          constructor({
            domain = _domain_,
            basePath = _basePath_,
            body = null,
            stream = null,
            request = null
          }) {
            super(...arguments);
            logger.debug("Initializing BackendMicroservice...");
            let microservice = this;
            if (typeof this.body === "undefined") {
              this.body = null;
            }
            if (typeof body !== "undefined") {
              this.body = body;
            }
            this.cors();
            microservice.stream = stream;
            stream.on("data", (data) => {
              // data from POST, GET
              var requestMethod = request.method.toLowerCase();
              var supportedMethods = {
                "post": microservice.post,
              };
              if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
                supportedMethods[requestMethod].call(microservice, data);
              }
            });

            // data from POST, GET
            var requestMethod = request.method.toLowerCase();
            var supportedMethods = {
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
              let {
                allow_origins,
                allow_credentials,
                allow_methods,
                allow_headers
              } = this.route.cors;
              var microservice = this;
              if (typeof microservice.headers !== "object") {
                microservice.headers = {};
              }
              if (typeof microservice.route.responseHeaders !== "object") {
                microservice.route.responseHeaders = {};
              }
              if (typeof allow_origins !== "undefined") {
                logger.debug("CORS: allow_origins available. Validating origins...");
                // an example of allow_origins is ['https://example.com','http://www.example.com']
                if (allow_origins === "*" || (typeof microservice.request.headers.origin === "undefined") || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
                  // for compatibility with all browsers allways return a wildcard when the origin is allowed
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
                logger.debug(`CORS: No allow_headers present. Allowing all headers...`);
                microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
              }
            } else {
              logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
            }
          }


          head(formData) {
            this.done();
          }

          get(formData) {
            logger.debug(`[BackendMicroservice.get] Data received: ${_DataStringify(formData)}`);
            this.done();
          }

          post(formData) {
            this.done();
          }

          put(formData) {
            this.done();
          }

          delete(formData) {
            this.done();
          }

          connect(formData) {
            this.done();
          }

          options(formData) {
            this.done();
          }

          trace(formData) {
            this.done();
          }

          patch(formData) {
            this.done();
          }

          finishWithBody(stream) {
            try {
              logger.debug("[BackendMicroservice.finishWithBody] Ending the stream...");
              logger.debug(`[BackendMicroservice.finishWithBody] type of body is: ${typeof this.body}`);
              if (typeof this.body !== "string") {
                this.body = _DataStringify(this.body);
              }
              logger.debug(`[BackendMicroservice.finishWithBody] \n body: ${this.body} `);
              stream.write(this.body);
              stream.end();
              logger.debug(`[BackendMicroservice.finishWithBody] Stream ended.`);
            } catch (e) {
              logger.debug(`[BackendMicroservice.finishWithBody] Something went wrong ending the stream: ${e}`);
            }
          }

          done() {
            logger.debug(`[BackendMicroservice.done] Finalizing the response...`);
            var microservice = this;
            var stream = microservice.stream;
            try {
              logger.debug(`[BackendMicroservice.done] Sending response headers...`);
              if (microservice.route.responseHeaders) {
                logger.debug(`[BackendMicroservice.done] Response headers present: ${Object.keys(microservice.route.responseHeaders)}`);
                stream.respond(microservice.route.responseHeaders);
              } else {
                throw Error(`[BackendMicroservice.done] No headers present.`);
              }
            } catch (e) {
              logger.debug(`[BackendMicroservice.done] Something went wrong sending response headers: ${e}`);
            }
            if (microservice.body !== null) {
              try {
                logger.debug(`[BackendMicroservice.done] A body of message is present. Finalizing the response...`);
                microservice.finishWithBody.call(microservice, stream);
              } catch (e) {
                logger.debug(`[BackendMicroservice.done] Something went wrong finalizing the response: ${e}`);
              }
            } else {
              logger.debug("[BackendMicroservice.done] No body present. Ending stream...");
              stream.end();
            }
          }


        }
      ]);


    }

    Class("SourceJS", Object, {
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
      get(name) {
        return this[name];
      },
      status: false,
      done() { },
      fail() { },
      rebuild() {
        var context = this;
        try {
          document.getElementsByTagName(context.containerTag)[0].appendChild(
            (function (s, url, context) {
              s.type = context.type;
              s.src = url;
              s.crossOrigin = (Object.hasOwnProperty.call(context, "crossOrigin")) ? (context.crossOrigin) : ("anonymous");
              s.async = context.async;
              s.onreadystatechange = function () {
                if (this.readyState === "complete") {
                  context.done.call(context);
                }
              };
              s.onload = function (e) {
                context.status = true;
                context.done.call(context, e);
              };
              s.onerror = function (e) {
                context.status = false;
                context.fail.call(context, e);
              };
              context.body = s;
              return s;
            }).call(this,
              _DOMCreateElement("script"),
              (this.external) ? (this.url) : (this.basePath + this.url), context));
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
    Class("SourceCSS", Object, {
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
      get(name) {
        return this[name];
      },
      done() { },
      rebuild() {
        var context = this;
        if (isBrowser) {
          window.document.getElementsByTagName("head")[0].appendChild(
            (function (s, url, context) {
              s.type = "text/css";
              s.rel = "stylesheet";
              s.href = url;
              s.crossOrigin = "anonymous";
              s.onreadystatechange = function () {
                if (this.readyState === "complete") {
                  context.done.call(context);
                }
              };
              s.onload = context.done;
              context.body = s;
              return s;
            }).call(this,
              _DOMCreateElement("link"),
              (this.external) ? (this.url) : (this.basePath + this.url), context));
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


    Class("ArrayList", Array, []);
    ClassFactory("ArrayList").matrix = Array.matrix;
    ClassFactory("ArrayList").matrix2d = Array.matrix2d;
    ClassFactory("ArrayList").matrix3d = Array.matrix3d;
    (_protected_code_)(ClassFactory("ArrayList").matrix);
    (_protected_code_)(ClassFactory("ArrayList").matrix2d);
    (_protected_code_)(ClassFactory("ArrayList").matrix3d);

    Class("ArrayCollection", Object, {
      source: New(ClassFactory("ArrayList"), []),
      changed(prop, value) {
        logger.debug("VALUE CHANGED");
        logger.debug(prop);
        logger.debug(value);
      },
      push(value) {
        var self = this;
        logger.debug("VALUE ADDED");
        logger.debug(value);
        self.source.push(value);
      },
      pop(value) {
        var self = this;
        logger.debug("VALUE POPPED");
        logger.debug(value);
        self.source.pop(value);
      },
      _new_(source) {
        var self = this;
        var _index = 0;
        self.source = New(ClassFactory("ArrayList"), source);
        for (var _k in self.source) {
          if (!isNaN(_k)) {
            logger.debug("binding " + _k.toString());
            (function (_pname) {
              Object.defineProperty(self, _pname, {
                set(value) {
                  logger.debug("setting " + _pname + "=" + value);
                  self.source[_pname] = value;
                  self.changed(_pname, value);
                },
                get() {
                  return self.source[_pname];
                }
              });
            })(_k);
            _index++;
          }

        }
        self.source.length = _index;
        Object.defineProperty(self, "length", {
          get() {
            return self.source.length;
          }
        });
      }
    });

    Package("com.qcobjects.effects.base", [
      class Effect extends ClassFactory("InheritClass") {
        duration = 1000;

        constructor() {
          super(...arguments);
        }

        animate({
          timing,
          draw,
          duration
        }) {

          let start = performance.now();

          requestAnimationFrame(function animate(time) {
            // timeFraction goes from 0 to 1
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            // calculate the current animation state
            let progress = timing(timeFraction);

            draw(Math.round(progress * 100)); // draw it

            if (timeFraction < 1) {
              requestAnimationFrame(animate);
            } else {
              // if this is an object with a done method
              if (typeof this !== "undefined" &&
                this !== null &&
                Object.hasOwnProperty.call(this, "done") &&
                (typeof this.done).toLowerCase() === "function") {
                this.done.call(this);
              }
            }

          });
        }

      }
    ]);

    Package("com.qcobjects.effects.transitions.base", [

      class TransitionEffect extends ClassFactory("Effect") {
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
          super(...arguments);
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
          var _transition_ = this;
          logger.info("EXECUTING TransitionEffect  ");
          var componentRoot = (_transition_.component.shadowed) ? (_transition_.component.shadowRoot.host) : (_transition_.component.body);
          if (_transition_.fitToHeight) {
            componentRoot.height = (typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null) ? (componentRoot.offsetParent.scrollHeight) : (componentRoot.getBoundingClientRect().height);
          }
          if (_transition_.fitToWidth) {
            componentRoot.width = (typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null) ? (componentRoot.offsetParent.scrollWidth) : (componentRoot.getBoundingClientRect().width);
          }
          componentRoot.style.display = "block";
          _transition_.effects.map(function (effectClassName, eff) {
            var __effectClass__ = ClassFactory(effectClassName);
            var effectObj = new __effectClass__({});
            var effectClassMethod = effectObj.apply;
            var args = [componentRoot].concat(Object.values({
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

      }
    ]);

    Package("com.qcobjects.timing", [
      class Timer extends ClassFactory("InheritClass") {

        constructor() {
          super(...arguments);
        }

        duration = 1000;
        alive = true;
        thread({
          timing,
          intervalInterceptor,
          duration
        }) {
          var timer = this;

          let start = performance.now();

          requestAnimationFrame(function thread(time) {
            // timeFraction goes from 0 to 1
            let elapsed = (time - start);
            let timeFraction = elapsed / duration;
            if (timeFraction > 1) timeFraction = 1;

            // calculate the current progress state
            let progress = timing(timeFraction, elapsed);

            intervalInterceptor(Math.round(progress * 100)); // draw it

            if ((timeFraction < 1 || duration === -1) && timer.alive) {
              requestAnimationFrame(thread);
            }

          });
        }


      }
    ]);

    Package("com.qcobjects.tools.essentials", [
      class Toggle extends ClassFactory("InheritClass") {
        _toggle = false;
        _inverse = true;
        _positive = null;
        _negative = null;
        _dispatched = null;
        _args = {};

        constructor() {
          super(...arguments);
          this._new_(...arguments);
        }

        changeToggle() {
          this._toggle = (this._toggle) ? (false) : (true);
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
          var toggle = this;
          var _promise = new Promise(function (resolve, reject) {

            if (typeof toggle._positive === "function" && typeof toggle._negative === "function") {
              if (toggle._inverse) {
                toggle._dispatched = (toggle._toggle) ? (toggle._negative.bind(toggle)) : (toggle._positive.bind(toggle));
              } else {
                toggle._dispatched = (toggle._toggle) ? (toggle._positive.bind(toggle)) : (toggle._negative.bind(toggle));
              }
              toggle._dispatched.call(toggle, toggle._args);
              resolve.call(_promise, toggle);
            } else {
              logger.debug("Toggle functions are not declared");
              reject.call(_promise, toggle);
            }
          }).then(function (toggle) {
            toggle.changeToggle();
          }).catch(function (e) {
            logger.debug(e.toString());
          });
          return _promise;
        }


      }

    ]);

    // Set Processors
    (function (_top) {

      let mapper = function (componentInstance, componentName, valueName) {
        /*
         * Mapper processor
         * @usage
         *        $mapper(<componentName>,<valueName>)
         *
         * Where componentName is the name of the component (same value as in attribute tag name) without quotes
         * and valueName is the name of the variable that contains the value to map, it can be either a property of
         * the component instance, the data object or a global value
         */

        var self = this;
        if (typeof componentInstance === "undefined" || componentInstance === null) {
          throw Error(`mapper.${componentName}.${valueName} does not have a component instance or it is null.`);
        }
        let globalValue = _top.global.get(valueName);
        let componentValue = componentInstance.get(valueName);
        let dataValue = componentInstance.data[valueName];
        let list = (typeof dataValue !== "undefined") ? (dataValue) : ((typeof componentValue !== "undefined") ? (componentValue) : (globalValue));
        let listItems = "";
        if (typeof list !== "undefined" && typeof list["map"] !== "undefined") {
          listItems = list.map(function (element) {
            let dataItems = [...Object.keys(element)].map(k => ` data-${k}="${(typeof element[k] !== "undefined" && element[k] !== null) ? (element[k].toString()) : ("")}"`).join("");
            return `<quick-component name="${componentName}" ${dataItems} ></quick-component>`;
          }).join("");
        } else {
          logger.debug(`${componentName}.${valueName} does not have a map property`);
        }
        return listItems;
      };
      Processor.setProcessor(mapper);

      let layout = function (componentInstance, layoutname, cssfile) {
        /*
         * Layout processor
         * @usage
         *        $layout(<layoutname>, <cssfile>)
         * Where layoutname can be "portrait" or "landscape" without quotes
         * cssfile is the uri for the css file to import
         */

        var layout_portrait = `
        /* CSS Document for Mobile Imports */
        @import url("${cssfile}") (orientation:portrait);
        @import url("${cssfile}") (max-width:460px);
        @import url("${cssfile}") (aspect-ratio: 9/16);
        @import url("${cssfile}") (aspect-ratio: 10/16);
        @import url("${cssfile}") (aspect-ratio: 5/8);
        @import url("${cssfile}") (aspect-ratio: 3/4);
        @import url("${cssfile}") (aspect-ratio: 2/3);
        `;
        var layout_landscape = `
        @import url("${cssfile}") (orientation:landscape) and (min-width:460px);
        @import url("${cssfile}") (aspect-ratio: 16/9) and (min-width:460px);
        @import url("${cssfile}") (aspect-ratio: 16/10) and (min-width:460px);
        @import url("${cssfile}") (aspect-ratio: 8/5) and (min-width:460px);
        @import url("${cssfile}") (aspect-ratio: 4/3) and (min-width:460px);
        @import url("${cssfile}") (aspect-ratio: 3/2) and (min-width:460px);
        `;
        var layout_code = {
          "landscape": layout_landscape,
          "portrait": layout_portrait
        };

        return (Object.hasOwnProperty.call(layout_code, layoutname)) ? (layout_code[layoutname]) : ("");
      };

      Processor.setProcessor(layout);

      let component = function () {
        /*
         * component processor
         * @usage
         *        $component(name=<name>, componentClass=<componentClass>, ...)
         * Returns a component tag declaration like:
         * <component name=<name> ...></component>
         */
        let arg = [...arguments].slice(1).map(function (a) {
          return {
            [a.split("=")[0]]: a.split("=")[1]
          };
        }).reduce(function (k1, k2) {
          return Object.assign(k1, k2);
        });
        let attrs = [...Object.keys(arg)].map(function (a) {
          return `${a}=${arg[a]}`;
        }).join(" ");
        return `<component ${attrs}></component>`;
      };

      Processor.setProcessor(component);

      let quick_component = function () {
        /*
         * component processor
         * @usage
         *        $quick_component(name=<name>, componentClass=<componentClass>, ...)
         * Returns a component tag declaration like:
         * <quick-component name=<name> ...></quick-component>
         */
        let arg = [...arguments].slice(1).map(function (a) {
          return {
            [a.split("=")[0]]: a.split("=")[1]
          };
        }).reduce(function (k1, k2) {
          return Object.assign(k1, k2);
        });
        let attrs = [...Object.keys(arg)].map(function (a) {
          return `${a}=${arg[a]}`;
        }).join(" ");
        return `<quick-component ${attrs}></quick-component>`;
      };

      Processor.setProcessor(quick_component);


      let repeat = function (componentInstance, length, text) {
        /*
         * Repeat processor
         * @usage
         *        $repeat(<length>, <text>)
         * Where length is the number of occurrences of text
         */
        return _top.range(length).map(
          function (index) {
            return text.replace("{{index}}", index.toString());
          }
        ).join("");
      };

      Processor.setProcessor(repeat);

    })(_top);


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
      Package("com.qcobjects", [
        class GlobalSettings extends ClassFactory("InheritClass") {
          _GLOBAL = {};
          __definition = {};
          __classType = "GlobalSettings";

          constructor() {
            super(...arguments);
            this.set = GlobalSettings.set.bind(this);
            this.get = GlobalSettings.get.bind(this);
            this.__start__ = GlobalSettings.__start__.bind(this);
          }

          static set(name, value) {
            this._GLOBAL[name] = value;
          }

          static get(name, _default) {
            var _value;
            if (typeof this._GLOBAL[name] !== "undefined") {
              _value = this._GLOBAL[name];
            } else if (typeof _default !== "undefined") {
              _value = _default;
            }
            return _value;
          }

          static __start__() {
            var __load__serviceWorker = function () {
              var _promise;
              if (isBrowser) {
                _promise = new Promise(function (resolve, reject) {
                  if (("serviceWorker" in navigator) &&
                    (typeof _top.CONFIG.get("serviceWorkerURI") !== "undefined")) {
                    _top.CONFIG.set("serviceWorkerScope", _top.CONFIG.get("serviceWorkerScope") ? (_top.CONFIG.get("serviceWorkerScope")) : ("/"));
                    navigator.serviceWorker.register(_top.CONFIG.get("serviceWorkerURI"), {
                      scope: _top.CONFIG.get("serviceWorkerScope")
                    })
                      .then(function (registration) {
                        logger.debug("Service Worker Registered");
                        resolve.call(_promise, registration);
                      }, function (registration) {
                        logger.debug("Error registering Service Worker");
                        reject.call(_promise, registration);
                      });
                    navigator.serviceWorker.ready.then(function (registration) {
                      logger.debug("Service Worker Ready");
                      resolve.call(_promise, registration);
                    }, function (registration) {
                      logger.debug("Error loading Service Worker");
                      reject.call(_promise, registration);
                    });
                  }
                });
              }
              return _promise;
            };
            var _buildComponents = function () {
              return new Promise((resolve, reject) => {
                if (isBrowser) {
                  logger.debug("Starting to building components");
                  try {
                    _top.componentsStack = document.buildComponents.call(document);
                  } catch (e) {
                    throw Error(`Something went wrong trying to start components tree: ${e.message}`);
                  }
                  logger.debug("Initializing the service worker");
                  __load__serviceWorker.call(_top)
                    .catch(function (e) {
                      logger.debug(`error loading the service worker ${e}`);
                    });
                }
                resolve();
              });
            };
            logger.debug("Starting to load the config settings...");
            if (_top.CONFIG.get("useConfigService", false)) {
              logger.debug("Loading settings using local configuration file...");
              _top.global.configService = New(ClassFactory("ConfigService"));
              _top.global.configService.configLoaded = _buildComponents;
              serviceLoader(_top.global.configService);
            } else {
              logger.debug("Starting to load the components...");
              _buildComponents.call(this);
            }
          }

        }
      ]);
      Export(ClassFactory("GlobalSettings"));
      global = New(ClassFactory("GlobalSettings"));
      _top = _CastProps(global, _top);

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