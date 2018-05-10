/**
 * QCObjects  1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 *
 */
"use strict";
(function() {
	 if ( typeof window.console == 'undefined') {
		 window.console = function() {
		 };
		 window.console.prototype.log = function(message) {
		 };
	 };

	 var basePath = (
		 function (){
			 var baseURI = window.document.baseURI.split('/');
			 baseURI.pop();
			 return baseURI.join('/')+'/';
		 }
	 )();

	 window.top._asyncLoad = [];
	 var asyncLoad = function(callback, args) {
		 var asyncCallback = {
			 'func': callback,
			 'args': args,
			 'dispatch': function() {
				 this.func.apply(null, this.args);
			 }
		 };
		 window.top._asyncLoad.push(asyncCallback);
		 return asyncCallback;
	 };
	 document.onreadystatechange = function() {
		 if (document.readyState == "complete") {
			 for (var f in window.top._asyncLoad) {
				 var fc = window.top._asyncLoad[f];
				 fc.dispatch();
			 }
		 }
	 };
	 window.top.asyncLoad = asyncLoad;
	 var Logger = function() {return {
		 debugEnabled:true,
		 infoEnabled:true,
		 warnEnabled:true,
		 debug: function(message) {
			 if (this.debugEnabled){
				 console.log('[DEBUG] ' + message);
			 }
		 },
		 info: function(message) {
			 if (this.infoEnabled){
				 console.log('[INFO] ' + message);
			 }
		 },
		 warn: function(message) {
			 if (this.warnEnabled){
				 console.log('[WARN] ' + message);
			 }
		 }
	 }};
	 var logger = new Logger();
	 window.top.logger = logger;
	 var Base64 = {
		 _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
		 encode: function(e) {
			 var t = "";
			 var n, r, i, s, o, u, a;
			 var f = 0;
			 e = Base64._utf8_encode(e);
			 while (f < e.length) {
				 n = e.charCodeAt(f++);
				 r = e.charCodeAt(f++);
				 i = e.charCodeAt(f++);
				 s = n >> 2;
				 o = (n & 3) << 4 | r >> 4;
				 u = (r & 15) << 2 | i >> 6;
				 a = i & 63;
				 if (isNaN(r)) {
					 u = a = 64
				 } else if (isNaN(i)) {
					 a = 64
				 }
				 t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a)
			 }
			 return t
		 },
		 decode: function(e) {
			 var t = "";
			 var n, r, i;
			 var s, o, u, a;
			 var f = 0;
			 e = e.replace(/[^A-Za-z0-9+/=]/g, "");
			 while (f < e.length) {
				 s = this._keyStr.indexOf(e.charAt(f++));
				 o = this._keyStr.indexOf(e.charAt(f++));
				 u = this._keyStr.indexOf(e.charAt(f++));
				 a = this._keyStr.indexOf(e.charAt(f++));
				 n = s << 2 | o >> 4;
				 r = (o & 15) << 4 | u >> 2;
				 i = (u & 3) << 6 | a;
				 t = t + String.fromCharCode(n);
				 if (u != 64) {
					 t = t + String.fromCharCode(r)
				 }
				 if (a != 64) {
					 t = t + String.fromCharCode(i)
				 }
			 }
			 t = Base64._utf8_decode(t);
			 return t
		 },
		 _utf8_encode: function(e) {
			 e = e.replace(/rn/g, "n");
			 var t = "";
			 for (var n = 0; n < e.length; n++) {
				 var r = e.charCodeAt(n);
				 if (r < 128) {
					 t += String.fromCharCode(r)
				 } else if (r > 127 && r < 2048) {
					 t += String.fromCharCode(r >> 6 | 192);
					 t += String.fromCharCode(r & 63 | 128)
				 } else {
					 t += String.fromCharCode(r >> 12 | 224);
					 t += String.fromCharCode(r >> 6 & 63 | 128);
					 t += String.fromCharCode(r & 63 | 128)
				 }
			 }
			 return t
		 },
		 _utf8_decode: function(e) {
			 var t = "";
			 var n = 0;
			 var r = c1 = c2 = 0;
			 while (n < e.length) {
				 r = e.charCodeAt(n);
				 if (r < 128) {
					 t += String.fromCharCode(r);
					 n++
				 } else if (r > 191 && r < 224) {
					 c2 = e.charCodeAt(n + 1);
					 t += String.fromCharCode((r & 31) << 6 | c2 & 63);
					 n += 2
				 } else {
					 c2 = e.charCodeAt(n + 1);
					 c3 = e.charCodeAt(n + 2);
					 t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
					 n += 3
				 }
			 }
			 return t
		 }
	 }
	 var ComplexStorageCache = function(params) {
		 var object, load, alternate;
		 object = params.index;
		 load = params.load;
		 alternate = params.alternate;
		 var cachedObjectID = this.getID(object);
		 var cachedResponse = localStorage.getItem(cachedObjectID);
		 if (this.isEmpty(cachedResponse)) {
			 var cachedNewResponse = load.call(null, {
				 'cachedObjectID': cachedObjectID,
				 'cachedResponse': cachedResponse,
				 'cache': this
			 });
			 this.save(object, cachedNewResponse);
			 logger.debug('RESPONSE OF {{cachedObjectID}} CACHED'.replace('{{cachedObjectID}}', cachedObjectID));
		 } else {
			 var alternateResponse = alternate.call(null, {
				 'cachedObjectID': cachedObjectID,
				 'cachedResponse': cachedResponse,
				 'cache': this
			 });
			 logger.debug('RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED '.replace('{{cachedObjectID}}', cachedObjectID));
		 }
		 return this;
	 };
	 ComplexStorageCache.prototype.getItem = function(cachedObjectID) {
		 var retrievedObject = localStorage.getItem(cachedObjectID);
		 if (!this.isEmpty(retrievedObject)) {
			 return JSON.parse(retrievedObject);
		 } else {
			 return null;
		 }
	 };
	 ComplexStorageCache.prototype.setItem = function(cachedObjectID, value) {
		 localStorage.setItem(cachedObjectID, JSON.stringify(value));
	 };
	 ComplexStorageCache.prototype.isEmpty = function(object) {
		 var r = false;
		 switch (true) {
			 case (typeof object == 'undefined'):
			 case (typeof object == 'string' && object == ""):
			 case (typeof object == 'string' && object == "undefined"):
			 case (typeof object == 'numeric' && object == 0):
			 case (object == null):
				 r = true;
				 break;
			 default:
				 r = false;
		 }
		 return r;
	 };
	 ComplexStorageCache.prototype.getID = function(object) {
		 var cachedObjectID = 'cachedObject_' + Base64.encode(JSON.stringify(object).replace(',', '_').replace('{', '_').replace('}', '_'));
		 return cachedObjectID;
	 };
	 ComplexStorageCache.prototype.save = function(object, cachedNewResponse) {
		 var cachedObjectID = this.getID(object);
		 logger.debug('CACHING THE RESPONSE OF {{cachedObjectID}} '.replace('{{cachedObjectID}}', cachedObjectID));
		 this.setItem(cachedObjectID, cachedNewResponse);
	 };
	 ComplexStorageCache.prototype.getCached = function(object) {
		 var cachedObjectID = this.getID(object);
		 return this.getItem(cachedObjectID);
	 };
	 ComplexStorageCache.prototype.clear = function() {
		 for (var c in localStorage) {
			 if (c.startsWith('cachedObject_')) {
				 localStorage.removeItem(c);
			 }
		 }
	 };

	var __readyImportLoaded = false;

	/**
	 * Basic Type of all elements
	 */
	var QC_Object = function() {
	};
	QC_Object.prototype = {
		find : function(tag) {
			var _tags = document.querySelectorAll(tag);
			var _oo = [];
			for (var _t in _tags) {
				var _tt = _tags[_t];
				if (( typeof _tags[_t] != 'undefined') && _tags[_t].parentNode.tagName == this.parentNode.tagName) {
					_oo.push(_Cast(_tt, (new QC_Object())));
				}
			}
			return _oo;
		}
	};

	/**
	 * Primary instance ID of all objects
	 */
	var __instanceID;
	// Adaptation of Production steps of ECMA-262, Edition 5, 15.2.3.5
	// Reference: http://es5.github.io/#x15.2.3.5
	Object.create = (function() {

		// make a safe reference to Object.prototype.hasOwnProperty
		var hasOwn = Object.prototype.hasOwnProperty;

		return function(O) {
			// 1. If Type(O) is not Object or Null throw a TypeError exception.
			if ( typeof O != 'object') {
				throw TypeError('Object prototype may only be an Object or null. The type is ' + typeof (O));
			}

			// 2. Let obj be the result of creating a new object as if by the
			//		expression new Object() where Object is the standard built-in
			//		constructor with that name
			// 3. Set the [[Prototype]] internal property of obj to O.
			QC_Object.prototype = O;
			var obj = new QC_Object();
			QC_Object.prototype = null;
			// Let's not keep a stray reference to O...

			// 4. If the argument Properties is present and not undefined, add
			//		own properties to obj as if by calling the standard built-in
			//		function Object.defineProperties with arguments obj and
			//		Properties.
			if (arguments.length > 1) {
				// Object.defineProperties does ToObject on its first argument.
				var Properties = Object(arguments[1]);
				for (var prop in Properties) {
					if (hasOwn.call(Properties, prop)) {
						obj[prop] = Properties[prop];
					}
				}
			}

			// 5. Return obj
			return obj;
		};
	})();

	var _QC_CLASSES = {};
	var _QC_PACKAGES = {};
	var _QC_PACKAGES_IMPORTED = [];
	var _QC_READY_LISTENERS = [];

	/**
	 * Returns the object or function name
	 *
	 * @param Object or function
	 */
	var ObjectName = function (o){
		var ret = '';
		if (typeof o.constructor == 'function'){
			ret = o.constructor.name;
		} else if (typeof o.constructor == 'object'){
			ret = o.constructor.toString().split(' ')[1].replace(']','');
		}
		return ret;
	};

	/**
	 * Casts an object to another object class type
	 *
	 * @param {Object} obj_source
	 * @param {Object} obj_dest
	 */
	var _Cast = function(obj_source, obj_dest) {
		for (var v in obj_source) {
			if ( typeof obj_source[v] != 'undefined') {
				try {
					obj_dest[v] = obj_source[v];
				}catch (e){

				}
			}
		}
		return obj_dest;
	};

	/**
	 * Casts an object to another object class type. Only properties
	 *
	 * @param {Object} obj_source
	 * @param {Object} obj_dest
	 */
	var _CastProps = function(obj_source, obj_dest) {
		for (var v in obj_source) {
			if ( typeof obj_source[v] != 'undefined' &&  typeof obj_source[v] != 'function') {
				try {
					obj_dest[v] = obj_source[v];
				}catch (e){

				}
			}
		}
		return obj_dest;
	};

	/**
	 * Creates new object class  of another object
	 *
	 * @param {String} name
	 * @param {Object} type
	 * @param {Object} definition
	 */
	var Class = function(name, type, definition) {
		var o;
		var name = arguments[0];
		var type = (arguments.length>2)?(arguments[1]):(HTMLElement);
		var definition =  (arguments.length>2)?(arguments[2]):(
			(arguments.length>1)?(arguments[1]):({})
		);

		if (typeof type=='undefined'){
			type = HTMLElement; // defaults to HTMLElement type
		} else {
			definition = _Cast(
				(typeof definition=='undefined')?({}):(definition),
				(typeof type['__definition'] != 'undefined')?(type.__definition):({})
			);
		}

		type = (type.hasOwnProperty('prototype')) ? (type.prototype) : (type);

		if (typeof definition != 'undefined' && !definition.hasOwnProperty('__new__')){
			definition['__new__'] = function (properties){
				_CastProps(properties,this);
				logger.debug('__NEW__');
			};
		}

		if (typeof definition != 'undefined' && !definition.hasOwnProperty('css')){
			definition['css'] = function QC_CSS3(_css){
				if (typeof this['body'] != 'undefined' && this['body']['style'] != 'undefined'){
					logger.debug('body style');
					this['body']['style']  = _Cast(_css,this['body']['style']);
				}
			};
		}

		Element.prototype.append = function QC_Append(child){
			if (typeof child.__definition != 'undefined' && typeof child.__definition.__classType != 'undefined' && typeof child.body){
				this.appendChild(child.body);
			} else{
				this.appendChild(child);
			}
		};

		if (typeof definition != 'undefined' && !definition.hasOwnProperty('append')){
			definition['append'] = function QC_Append(){
				var child = (arguments.length>0)?(arguments[0]):(this['body']);
				if (typeof this['body'] != 'undefined'){
					logger.debug('append element');
					if (arguments.lenght>0){
						logger.debug('append to element');
						this['body'].append(child);
						if (typeof this['childs']=='undefined'){
							this['childs']=[];
						}
						this['childs'].push(child);
					} else {
						logger.debug('append to body');
						document.body.append(child);
					}
				}
			};
		}


		if (typeof definition != 'undefined' && !definition.hasOwnProperty('attachIn')){
			definition['attachIn'] = function QC_AttachIn(tag){
				var tags = document.querySelectorAll(tag);
				for(var i=0,j=tags.length; i<j; i++){
						tags[i].append(this);
				};

			};
		}


		o = Object.create(type, definition);
		o['__definition'] = definition;
		o['__definition']['__classType']=name;
		_QC_CLASSES[name] = o;
		window[name] = o;
		return window[name];
	};

	/**
	 * Creates an object from a Class definition
	 *
	 * @param {QC_Object} o
	 * @param {Object} args
	 */
	var New = function(c, args) {
		__instanceID = (typeof __instanceID == 'undefined' || __instanceID==null)?(0):(__instanceID++);
		var c_new = Object.create(c.constructor.prototype,c.__definition);
		c_new.__definition = _Cast({'__instanceID':__instanceID},c.__definition);
		c_new['__instanceID'] = __instanceID;
		c_new.__definition['__instanceID']=__instanceID;
		if (c_new.hasOwnProperty('__new__')) {
			if (typeof c_new != 'undefined' && !c_new.__definition.hasOwnProperty('body')){
				try{
					c_new['body'] = _Cast(c_new['__definition'],document.createElement(c_new.__definition.__classType));
					c_new['body']['style'] = _Cast(c_new.__definition,c_new['body']['style']);

				}catch (e){

				}
			} else if (c_new.__definition.hasOwnProperty('body')){
				c_new['body'] = c_new.__definition.body;
			}
			logger.debug('llamada a new' + c_new.__definition.__classType);
//			console.trace();
			c_new.__new__(args);
			if (c_new.hasOwnProperty('_new_')){
				c_new._new_(args);
			}
		}
		return c_new;
	};

	var Export = function (f){
		try {
			window.top[f.name] = f;
			window[f.name] = f;
		} catch (e){}
	};

	Class('CONFIG',Object,{
		_CONFIG:{
			'relativeImportPath':'',
			'componentsBasePath':'',
			'delayForReady':0,
			'preserveComponentBodyTag':true,
			'basePath':basePath
		},
		set:function (name,value){
			this._CONFIG[name]=value;
		},
		get:function (name){
			return this._CONFIG[name];
		},
	});

	Export(CONFIG);

	/**
	 * Defines a package for Class classification
	 *
	 * @param {Object} namespace
	 * @param {Object} classes
	 */
	var Package = function(namespace, classes) {
		_QC_PACKAGES[namespace] = classes;
	};

	/**
	 * Imports a script with the package nomenclature
	 *
	 * @param {Object} packagename
	 * @param {Object} ready
	 */
	var Import = function(packagename, ready) {
		var allPackagesImported = function() {
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
		var readyImported = function(e) {
			if (!__readyImportLoaded){
				_QC_PACKAGES_IMPORTED.push(ready);
				if (allPackagesImported()) {
					for (var _r in _QC_PACKAGES_IMPORTED) {
						_QC_READY_LISTENERS.push(_QC_PACKAGES_IMPORTED[_r]);
					}
				}
				__readyImportLoaded = true;
			}
		};
		if (!_QC_PACKAGES.hasOwnProperty(packagename)) {
			var s1 = document.createElement('script');
			s1.type = 'text/javascript';
			s1.src = basePath + CONFIG.get('relativeImportPath') + packagename + '.js';
			s1.onreadystatechange = function() {
				if (this.readyState == 'complete') {
					readyImported.call();
				}
			};
			s1.onload = readyImported;
			document.getElementsByTagName('head')[0].appendChild(s1);
		}
	};




	/**
	* Adds a Cast functionaly to every Element of DOM
	*/
	Element.prototype.Cast = function QC_Object(_o) {
		_o.__definition.body = this;
		var _o = New(_o);
		return _o;
	};

	Class('TagElements',Array,{
		findElements:function (elementName){
			var _o = New(TagElements);
			for (var _k in this){
				if (typeof _k ==='number' && typeof this[_k] != 'function' && this[_k].hasOwnProperty('querySelectorAll')){
					_o.push(this[_k].querySelectorAll(elementName));
				}
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
	var Tag = function(tagname, innerHTML) {
		var o = document.querySelectorAll(tagname);
		var _o = New(TagElements);
		var addedKeys = []
		for (var _i=0;_i<o.length;_i++){
			if ( typeof innerHTML != 'undefined' && o[_i].hasOwnProperty('innerHTML')) {
				o[_i].innerHTML = innerHTML;
			}
			if (addedKeys.indexOf(_i)<0){
				_o.push(o[_i]);
				addedKeys.push(_i);
			}
		}
		return _o;
	};

	/**
	 * Defines a Custom Ready listener
	 */
	function Ready(e){
		_QC_READY_LISTENERS.push(e.bind(window));
	}
	var ready = Ready; // case insensitive ready option

	/**
	 * Default Ready event function for window. Executes all micro ready events of Import calls
	 *
	 * @param {Object} e
	 */
	var _Ready = function(e) {
		var _execReady = function (){
			for (var _r in _QC_READY_LISTENERS) {
				if ( typeof _QC_READY_LISTENERS[_r] == 'function') {
					_QC_READY_LISTENERS[_r].call();
					delete _QC_READY_LISTENERS[_r];
				}
			}
		};
		if (CONFIG.get('delayForReady')>0){
			setTimeout(_execReady.bind(window),CONFIG.get('delayForReady'));
		} else {
			_execReady.call(window);
		};
	};

	window.onload = _Ready;

	Class('Component',Object,{
		domain:window.location.host.toLowerCase(),
    basePath:basePath,
		templateURI:'',
		url:'',
    method:'GET',
    data:{},
    reload:false,
		set:function (name,value){
			this[name]=value;
		},
		get:function (name){
			return this[name];
		},
		rebuild:function (){
			this.set('url',this.get('basePath')+this.get('templateURI'));
			if (typeof this.get('templateURI') !='undefined' && this.get('templateURI') != ""){
				componentLoader(this,false);
			}
		},
		'_new_':function (properties){
			this.__new__(properties);
			this.rebuild();
		}
	});

	Class('Service',Object,{
		domain:window.location.host.toLowerCase(),
    basePath:basePath,
		url:'',
    method:'GET',
    data:{},
    reload:false,
		set:function (name,value){
			this[name]=value;
		},
		get:function (name){
			return this[name];
		}
	});

	Class('VO',Object,{});

	/**
	* Loads a simple component from a template
	*
	* @author: Jean Machuca <correojean@gmail.com>
	* @param component a Component object
	*/
	var componentLoader = function(component, _async) {
		var _componentLoader = function(component, _async) {
	    var container = component.body;
	    if (container != null) {
				var feedComponent = function (component){
					var parsedAssignmentText = component.template;
					for (var k in component.data) {
						parsedAssignmentText = parsedAssignmentText.replace('{{' + k + '}}', component.data[k]);
					}
					component.innerHTML = parsedAssignmentText;
					if (component.reload) {
						logger.debug('FORCED RELOADING OF CONTAINER FOR COMPONENT {{NAME}}'.replace('{{NAME}}', component.name));
						container.innerHTML = component.innerHTML;
					} else {
						logger.debug('ADDING COMPONENT {{NAME}} '.replace('{{NAME}}', component.name));
						container.innerHTML += component.innerHTML;
					}
					if (typeof component.done === 'function') {
						component.done.call(component, {
							'request': xhr,
							'component': component
						});
					}
				};
	      logger.debug('LOADING COMPONENT DATA {{DATA}} FROM {{URL}}'.replace('{{DATA}}', JSON.stringify(component.data)).replace('{{URL}}', component.url));
	      var xhr = new XMLHttpRequest();
	      xhr.open(component.method, component.url,true);
	      xhr.setRequestHeader('Content-Type', 'text/html');
	      xhr.onload = function() {
	        if (xhr.status === 200) {
	          var response = xhr.responseText;
	          logger.debug('Data received {{DATA}}'.replace('{{DATA}}', JSON.stringify(response)));
	          logger.debug('CREATING COMPONENT {{NAME}}'.replace('{{NAME}}', component.name));
	          component.template = response;
						cache.save(component.name, component.template);
						feedComponent.call(this,component);
	        } else {
	          if (typeof component.fail === 'function') {
	            component.fail.call(component, {
	              'request': xhr,
	              'component': component
	            });
	          }
	        }
	      };

				var cache = new ComplexStorageCache({
	        'index': component.name,
	        'load': function(cacheController) {
	          logger.debug('SENDING THE NORMAL AJAX CALL ');
	          xhr.send(JSON.stringify(component.data));
	        },
	        'alternate': function(cacheController) {
	          if (component.method == 'GET') {
	            component.template = cacheController.cache.getCached(component.name);
							feedComponent.call(this,component);
	          } else {
	            logger.debug('SENDING THE NORMAL AJAX CALL ');
	            xhr.send(JSON.stringify(component.data));
	          }
	          return;
	        }
	      });
				GLOBAL.lastCache = cache;

//	      xhr.send(JSON.stringify(component.data));

	      return xhr;
	    } else {
				logger.debug('CONTAINER DOESNT EXIST')
			}
	  };

		if (typeof _async != 'undefined' && _async){
			asyncLoad(_componentLoader, arguments);
		} else {
			_componentLoader(component,_async);
		}
	};

	/**
	* Loads a simple component from a template
	*
	* @author: Jean Machuca <correojean@gmail.com>
	* @param service a Service object
	*/
	var serviceLoader = function(service, _async) {
		var _serviceLoader = function(service, _async) {
      logger.debug('LOADING SERVICE DATA {{DATA}} FROM {{URL}}'.replace('{{DATA}}', JSON.stringify(service.data)).replace('{{URL}}', service.url));
      var xhr = new XMLHttpRequest();
//			xhr.withCredentials = service.headers.hasOwnProperty('Authorization');
			xhr.withCredentials = true;
      xhr.open(service.method, service.url,true);
			for (var header in service.headers){
				xhr.setRequestHeader(header, service.headers[header]);
			}
      xhr.onload = function() {
        if (xhr.status === 200) {
          var response = xhr.responseText;
          logger.debug('Data received {{DATA}}'.replace('{{DATA}}', JSON.stringify(response)));
          logger.debug('CREATING SERVICE {{NAME}}'.replace('{{NAME}}', service.name));
          service.template = response;
					if (service.cached && (typeof cache != 'undefined')){
						cache.save(service.name, service.template);
					}
					if (typeof service.done === 'function') {
						service.done.call(service, {
							'request': xhr,
							'service': service
						});
					}
        } else {
          if (typeof service.fail === 'function') {
            service.fail.call(service, {
              'request': xhr,
              'service': service
            });
          }
        }
      };

			var _directLoad = function (){
				logger.debug('SENDING THE NORMAL AJAX CALL ');
				xhr.send(JSON.stringify(service.data));
			};

			if (service.cached){
				var cache = new ComplexStorageCache({
	        'index': service.data,
	        'load': function(cacheController) {
						_directLoad.call(this);
	        },
	        'alternate': function(cacheController) {
	          if (service.method == 'GET') {
	            service.template = cacheController.cache.getCached(service.name);
							if (typeof service.done === 'function') {
								service.done.call(service, {
									'request': xhr,
									'service': service
								});
							}
	          } else {
							_directLoad.call(this);
	          }
	          return;
	        }
	      });
				GLOBAL.lastCache = cache;
			} else {
				_directLoad.call(this);
			}

      return xhr;

	  };

		if (typeof _async != 'undefined' && _async){
			asyncLoad(_serviceLoader, arguments);
		} else {
			_serviceLoader(service,_async);
		}
	};

	Export(serviceLoader);
	Export(componentLoader);


	asyncLoad(function (){

		Class('GLOBAL',Object,{
			_GLOBAL:{},
			set:function (name,value){
				this._GLOBAL[name]=value;
			},
			get:function (name){
				return this._GLOBAL[name];
			},
		});

		Export(GLOBAL);

	},null);

	/**
	* Load every component tag declared in the body
	**/
	Ready(function (){
		var _buildComponent = function (components){
		  for (var _c = 0;_c<components.length;_c++){
				var data = {};
				var attributenames = components[_c].getAttributeNames().filter(function(a){return a.startsWith('data-')}).map(function(a){return a.split('-')[1]});
				for (var attribute in attributenames){
					data[attributenames[attribute]] = components[_c].getAttribute('data-'+attributenames[attribute]);
				}
				if (CONFIG.get('preserveComponentBodyTag')){
					Class('ComponentBody',Component,{
			      name:components[_c].getAttribute('name').toString(),
						reload:true
			    });
					var newComponent = New(ComponentBody,{
			      name:components[_c].getAttribute('name').toString(),
						data:data,
			      templateURI:'{{COMPONENTS_BASE_PATH}}{{COMPONENT_NAME}}.html'.replace('{{COMPONENT_NAME}}',components[_c].getAttribute('name').toString()).replace('{{COMPONENTS_BASE_PATH}}',CONFIG.get('componentsBasePath'))
			    });
					newComponent.done = function (){
						_buildComponent(this.body.querySelectorAll('component:not([loaded])'));
					};
					components[_c].append(newComponent);
				} else {
					var newComponent = New(Component,{
			      name:components[_c].getAttribute('name').toString(),
						data:data,
			      templateURI:'{{COMPONENTS_BASE_PATH}}{{COMPONENT_NAME}}.html'.replace('{{COMPONENT_NAME}}',components[_c].getAttribute('name').toString()).replace('{{COMPONENTS_BASE_PATH}}',CONFIG.get('componentsBasePath'))
			    });
					newComponent.done = function (){
						components[_c].innerHTML=this.body.innerHTML;
						_buildComponent(this.body.querySelectorAll('component:not([loaded])'));
					};

				}
				components[_c].setAttribute('loaded',true);
		  }
		};
		var components = document.querySelectorAll('component:not([loaded])');
		while (components.length>0){
			_buildComponent(components);
			components = document.querySelectorAll('component:not([loaded])');
		}
	});

	/*
	Public variables and functions
	*/
	Export(Export);/* exports the same Export function once */
	Export(Import);
	Export(Package);
	Export(Class);
	Export(New);
	Export(Tag);
	Export(Ready);
	Export(ready);

}).call(null);
