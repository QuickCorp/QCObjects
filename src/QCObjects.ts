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