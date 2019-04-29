/**
 * QCObjects  1.0
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
"use strict";
(function() {
  Element.prototype.subelements = Element.prototype.querySelectorAll;
  HTMLDocument.prototype.subelements = HTMLDocument.prototype.querySelectorAll;
  HTMLElement.prototype.subelements = HTMLElement.prototype.querySelectorAll;
	var _top;
	try {
		_top = (typeof window.top != 'undefined')?(window.top):(window);
		_top['_allowed_']=true;
	}catch (e){
		try {
			_top = document;
			_top['_allowed_']=true;
		} catch (e2){
			try {
				_top = global;
				_top['_allowed_']=true;
			} catch (e3){
				_top = {};
				_top['_allowed_']=true;
			}
		}
	}

	 if ( typeof _top.console == 'undefined') {
		 _top.console = function() {
		 };
		 _top.console.prototype.log = function(message) {
		 };
	 };

	 var basePath = (
		 function (){
			 var baseURI = _top.document.baseURI.split('/');
			 baseURI.pop();
			 return baseURI.join('/')+'/';
		 }
	 )();

   var _secretKey = (
		 function (){
			 var __secretKey = _top[(![]+[])[((+!+[])+(+!+[]))]+(typeof ![])[(+!+[])]+(typeof [])[((+!+[])+(+!+[]))*((+!+[])+(+!+[]))]+(![]+[])[(+!+[])]+(!![]+[])[(+[])]+([]+[]+[][[]])[(+[+!+[]+[+[]]])/((+!+[])+(+!+[]))]+(typeof ![])[(+!+[])]+([]+[]+[][[]])[(+!+[])] ]['h'+(typeof ![])[(+!+[])]+(![]+[])[(+!+[]+((+!+[])+(+!+[])))]+(!![]+[])[(+[])]].toLowerCase();
			 return __secretKey;
		 }
	 )();

	 var is_phonegap = (
		 function (){
			 return (typeof cordova != 'undefined')?(true):(false);
		 }
	 )();

	 _top._asyncLoad = [];
	 var asyncLoad = function(callback, args) {
		 var asyncCallback = {
			 'func': callback,
			 'args': args,
			 'dispatch': function() {
				 this.func.apply(null, this.args);
			 }
		 };
		 _top._asyncLoad.push(asyncCallback);
		 return asyncCallback;
	 };
	 document.onreadystatechange = function() {
		 if (document.readyState == "complete") {
			 for (var f in _top._asyncLoad) {
				 var fc = _top._asyncLoad[f];
				 fc.dispatch();
			 }
		 }
	 };
	 _top.asyncLoad = asyncLoad;
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
	 _top.logger = logger;
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
			 var r = 0;
			 var c1 = 0;
			 var c2= 0;
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
	 };
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
			var _tags = document.subelements(tag);
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
				var tags = document.subelements(tag);
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
		Object.__instanceID = (typeof Object.__instanceID == 'undefined' || Object.__instanceID==null)?(0):(Object.__instanceID+1);
		__instanceID = Object.__instanceID;
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
			_top[f.name] = f;
			window[f.name] = f;
		} catch (e){}
	};

  Class('_Crypt',Object,{
   last_string:"",
   last_key:"",
   construct:false,
   _new_:function (o){
     var string = o['string'];
     var key = (o.hasOwnProperty('key'))?(o['key']):(null);
     this.__new__(o);
     key = (key == null)?(this.__instanceID):(key);
     this.last_key = key;
     this.last_string = string;
     this.construct = true;
   },
   _encrypt:function (){
     var string = this.last_string;
     var key = this.last_key;
     var result = '';
     var char;
     var keychar;
     for (var i = 0; i<string.length; i++){
       char = string.substr(i,1);
       keychar = key.substr( (i % key.length)-1, 1);
       char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
       result += char;
     }
     this.last_string = Base64.encode(result);
     return this.last_string;
   },
   _decrypt:function (){
     var string = this.last_string;
     var key = this.last_key;
     var result = '';
     var char;
     var keychar;
     string = Base64.decode(string);
     for (var i = 0; i<string.length; i++){
       char = string.substr(i,1);
       keychar = key.substr( (i % key.length)-1, 1);
       char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
       result += char;
     }

     this.last_string = result;
     return this.last_string;
   },
   encrypt: function (string,key){
     var crypt = New(_Crypt,{
         string:string,
         key:key
       });
     return crypt._encrypt();
   },
   decrypt: function (string,key){
     var crypt = New(_Crypt,{
         string:string,
         key:key
       });
     return crypt._decrypt();
   }
  });

	var _CryptObject = function (o){
		return _Crypt.encrypt(JSON.stringify(o),_secretKey);
	};
	var _DecryptObject = function (s){
		return JSON.parse(_Crypt.decrypt(s,_secretKey));
	};

	Class('CONFIG',Object,{
		_CONFIG:{
			'relativeImportPath':'',
			'asynchronousImportsLoad':false,
			'componentsBasePath':'',
			'delayForReady':0,
			'preserveComponentBodyTag':true,
			'overrideComponentTag':false,
			'useConfigService':false,
      'routingWay':'hash',
      'useSDK':true,
      'useLocalSDK':false,
			'basePath':basePath
		},
		_CONFIG_ENC:_Crypt.encrypt(JSON.stringify({}),_secretKey),
		set:function (name,value){
			var _conf = (
	 		 function (config){
				var _protectedEnc = config._CONFIG_ENC.valueOf();
				var _protectedConf = config._CONFIG.valueOf();
				return _CastProps(_protectedConf,_DecryptObject(_protectedEnc));
	 		 }
	 	 )(this);

			_conf[name]=value;
			this._CONFIG_ENC = _CryptObject(_conf);
			if (this._CONFIG.hasOwnProperty(name)){
				this._CONFIG[name]=value;
			}
		},
		get:function (name){
				var _conf = (
		 		 function (config){
					var _protectedEnc = config._CONFIG_ENC.valueOf();
					var _protectedConf = config._CONFIG.valueOf();
					return _CastProps(_protectedConf,_DecryptObject(_protectedEnc));
		 		 }
		 	 )(this);
			return _conf[name];
		}
	});

	Export(CONFIG);

	/**
	 * Defines a package for Class classification
	 *
	 * @param {Object} namespace
	 * @param {Object} classes
	 */
	var Package = function(namespace, classes) {
    if (_QC_PACKAGES.hasOwnProperty(namespace)
        && _QC_PACKAGES[namespace].hasOwnProperty('length')
        && _QC_PACKAGES[namespace].length>0){
      _QC_PACKAGES[namespace] = _QC_PACKAGES[namespace].concat(classes);
    } else {
      _QC_PACKAGES[namespace] = classes;
    }
    return _QC_PACKAGES[namespace];
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
			s1.async=(CONFIG.get('asynchronousImportsLoad'))?(true):(false);
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
				if (typeof _k ==='number' && typeof this[_k] != 'function' && this[_k].hasOwnProperty('subelements')){
					_o.push(this[_k].subelements(elementName));
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
		var o = document.subelements(tagname);
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
	if (is_phonegap){
		document.addEventListener('deviceready', _Ready, false);
	}

  Class('InheritClass',Object,{});

	Class('Component',Object,{
		domain:window.location.host.toLowerCase(),
    basePath:basePath,
		templateURI:'',
		url:'',
    method:'GET',
    data:{},
    reload:false,
		cached:true,
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
		Cast:function (o){
			return _Cast(this,o);
		},
    routingWay:CONFIG.get('routingWay'),
    validRoutingWays:['pathname','hash','search'],
    routingNodes:[],
    routings:[],
    routingPath:"",
    routingSelected:[],
    _bindroute:function (){
      document.addEventListener('componentsloaded', function(e) {
        Tag('a').map(function (a){
            a.oldclick = a.onclick;
            a.onclick = function (e){
              var _ret_ = true;
              if (!GLOBAL.get('routingPaths')){
                GLOBAL.set('routingPaths',[]);
              }
              var routingWay = CONFIG.get('routingWay');
              var routingPath = e.target[routingWay];
              if (GLOBAL.get('routingPaths').includes(routingPath)
                  && e.target[routingWay] != document.location[routingWay]
                  && e.target.href != document.location.href
                ){
                logger.debug('A ROUTING WAS FOUND: '+routingPath);
                history.pushState({href:e.target.href},e.target.href,e.target.href);
                Component.route();
                _ret_ = false;
              } else {
                logger.debug('NO ROUTING FOUND FOR: '+routingPath);
              }
              e.target.oldclick.call(e.target,e);
              return _ret_;
            };
        });
      });
    },
    route:function (){
      var routingComponents = GLOBAL.componentsStack;
      for (var r=0;r<routingComponents.length;r++){
        var rc = routingComponents[r];
        rc._reroute_();
      }
    },
    _new_:function (properties){
      this.__new__(properties);
      this.routingWay = CONFIG.get('routingWay');
      if (this.validRoutingWays.includes(this.routingWay)){
        var c = Tag('component[name='+properties.name+']')[0];
        if (typeof c != 'undefined'){
          this.innerHTML = c.innerHTML;
          this.routingNodes = c.subelements('routing');
          this.routings = [];
          for (var r=0;r<this.routingNodes.length;r++){
            var routingNode = this.routingNodes[r];
            var attributeNames = routingNode.getAttributeNames();
            var routing = {};
            for (var a=0;a<attributeNames.length;a++){
              routing[attributeNames[a]] = routingNode.getAttribute(attributeNames[a]);
            }
            this.routings.push(routing);
            if (!GLOBAL.get('routingPaths')){
              GLOBAL.set('routingPaths',[]);
            }
            GLOBAL.get('routingPaths').push(routing.path);
          }
        }
      }
      if (!this._reroute_()){
        this.rebuild();
      }
    },
    _reroute_:function (){
      var rc = this;
      var _rebuilt = false;
      if (rc.validRoutingWays.includes(rc.routingWay)){
        rc.routingPath = document.location[rc.routingWay];
        rc.routingSelected=rc.routings.filter(function (routing){return routing.path==rc.routingPath});
        for (var r=0;r<rc.routingSelected.length;r++){
          var routing = rc.routingSelected[r];
          rc.templateURI = '{{COMPONENTS_BASE_PATH}}{{COMPONENT_NAME}}.{{TPLEXTENSION}}'.replace('{{COMPONENT_NAME}}',routing.name.toString()).replace('{{COMPONENTS_BASE_PATH}}',CONFIG.get('componentsBasePath')).replace('{{TPLEXTENSION}}',rc.tplextension);
        }
        if (rc.routingSelected.length>0){
          rc.body.innerHTML='';
          rc.rebuild();
          _rebuilt = true;
        }
      }
      return _rebuilt;
    }
	});

  Class('Controller',Object,{
    dependencies:[],
    component:null
  });

  Class('View',Object,{
    dependencies:[],
    component:null
  });

	Class('Service',Object,{
		domain:window.location.host.toLowerCase(),
    basePath:basePath,
		url:'',
    method:'GET',
    data:{},
    reload:false,
		cached:false,
		set:function (name,value){
			this[name]=value;
		},
		get:function (name){
			return this[name];
		}
	});

	Class('JSONService',Service,{
    method:"GET",
    cached:false,
  	headers: {
  		"Content-Type":"application/json",
      "charset":"utf-8"
  	},
    JSONresponse: null,
    done:function(result){
      logger.debug("***** RECEIVED RESPONSE:");
      logger.debug(result.service.template);
      this.JSONresponse = JSON.parse(result.service.template);
    }
  });

	Class('ConfigService',JSONService,{
    method:"GET",
    cached:false,
		configFileName:'config.json',
  	headers: {
  		"Content-Type":"application/json",
      "charset":"utf-8"
  	},
    JSONresponse: null,
    done:function(result){
      logger.debug("***** CONFIG LOADED:");
      logger.debug(result.service.template);
      this.JSONresponse = JSON.parse(result.service.template);
      if (this.JSONresponse.hasOwnProperty('__encoded__')){
        this.JSONresponse = JSON.parse(_Crypt.decrypt(this.JSONresponse.__encoded__,_secretKey));
      }
			for (var k in this.JSONresponse){
				CONFIG.set(k,this.JSONresponse[k]);
			}
			this.configLoaded.call(this);
    },
		fail:function (result){
			this.configLoaded.call(this);
		},
		_new_:function (o){
			this.set('url',this.get('basePath')+this.get('configFileName'));
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
	    var container = (component.hasOwnProperty('container') && typeof component.container != 'undefined' && component.container != null)?(component.container):(component.body);
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

				var _componentLoaded = function() {
					var successStatus = (is_file)?(0):(200);
	        if (xhr.status === successStatus) {
	          var response = xhr.responseText;
	          logger.debug('Data received {{DATA}}'.replace('{{DATA}}', JSON.stringify(response)));
	          logger.debug('CREATING COMPONENT {{NAME}}'.replace('{{NAME}}', component.name));
	          component.template = response;
						if (component.cached && (typeof cache != 'undefined')){
							cache.save(component.name, component.template);
						}
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
				var is_file = (component.url.startsWith('file:'))?(true):(false);
	      var xhr = new XMLHttpRequest();
	      xhr.open(component.method, component.url,(!is_file));
				if (!is_phonegap && !is_file){
					xhr.setRequestHeader('Content-Type', 'text/html');
				}
				if (!is_file){
					xhr.onload = _componentLoaded;
				}
				var _directLoad = function (){
					logger.debug('SENDING THE NORMAL AJAX CALL ');
					if (is_file){
						xhr.send(null);
						if(xhr.status == 0){
							_componentLoaded.call(this);
						}
					}else{
						xhr.send(JSON.stringify(component.data));
					}
				};

				if (component.cached){
					logger.debug('USING CACHE FOR COMPONENT: '+component.name);
					var cache = new ComplexStorageCache({
		        'index': component.data,
		        'load': function(cacheController) {
							_directLoad.call(this);
		        },
		        'alternate': function(cacheController) {
		          if (component.method == 'GET') {
		            component.template = cacheController.cache.getCached(component.name);
								feedComponent.call(this,component);

		          } else {
								_directLoad.call(this);
		          }
		          return;
		        }
		      });
					GLOBAL.lastCache = cache;
				} else {
					logger.debug('NOT USING CACHE FOR COMPONENT: '+component.name);
					_directLoad.call(this);
				}

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

    if (CONFIG.get('useSDK')){
      GLOBAL.sdk = New(SourceJS,{external:(!CONFIG.get('useLocalSDK'))?(true):(false),
                                 url:(CONFIG.get('useLocalSDK'))?('QCObjects-SDK.js'):('https://sdk.qcobjects.dev/QCObjects-SDK.js'),
                                 done:function(){
                                   if (this.external){
                                     logging.debug('QCObjects-SDK.js loaded from remote location');
                                   } else {
                                     logging.debug('QCObjects-SDK.js loaded from local');
                                   }
                                 },
                                 fail:function (){
                                   if (this.external){
                                     logging.debug('QCObjects-SDK.js NOT loaded from remote location');
                                   } else {
                                     logging.debug('QCObjects-SDK.js NOT loaded from local');
                                   }
                                 }
                                });
    }


	},null);

	Element.prototype.buildComponents = function (rebuildObjects=false){
		var tagFilter = (rebuildObjects)?('component:not([loaded])'):('component');
		var d = this;
		var _buildComponent = function (components){
			var componentsBuiltWith = [];
		  for (var _c = 0;_c<components.length;_c++){
				var data = {};
				var attributenames = components[_c].getAttributeNames().filter(function(a){return a.startsWith('data-')}).map(function(a){return a.split('-')[1]});
				for (var attribute in attributenames){
					data[attributenames[attribute]] = components[_c].getAttribute('data-'+attributenames[attribute]);
				}
				var componentDone = function (){
					var viewName = this.body.getAttribute('viewClass');
					if (viewName != null && _QC_CLASSES.hasOwnProperty(viewName)){
						var _View = _QC_CLASSES[viewName];
						this.view = New(_View,{component:this}); // Initializes the main view for the component
						if (this.view.hasOwnProperty('done') && typeof this.view.done == 'function' ){
							this.view.done.call(this.view);
						}
					}
					var controllerName = this.body.getAttribute('controllerClass');
					if (controllerName != null && _QC_CLASSES.hasOwnProperty(controllerName)){
						var _Controller = _QC_CLASSES[controllerName];
						this.controller = New(_Controller,{component:this}); // Initializes the main controller for the component
						if (this.controller.hasOwnProperty('done') && typeof this.controller.done == 'function' ){
							this.controller.done.call(this.controller);
						}
					}
					this.subcomponents = _buildComponent(this.body.subelements(tagFilter));
					if (CONFIG.get('overrideComponentTag')){
						this.body.outerHTML=this.body.innerHTML;
					}
					this.body.setAttribute('loaded',true);
					if ((Tag('component[loaded=true]').length*100/Tag('component').length)>=100){
						d.dispatchEvent(new CustomEvent('componentsloaded',{detail:{lastComponent:this}}));
					}
				};
				var cached = (components[_c].getAttribute('cached')=='true')?(true):(false);
        var tplextension = (typeof CONFIG.get('tplextension') != 'undefined')?(CONFIG.get('tplextension')):('html');
        tplextension = (components[_c].getAttribute('tplextension')!=null)?(components[_c].getAttribute('tplextension')):(tplextension);
				if (CONFIG.get('preserveComponentBodyTag')){
					Class('ComponentBody',Component,{
			      name:components[_c].getAttribute('name').toString(),
						reload:true
			    });
					var newComponent = New(ComponentBody,{
			      name:components[_c].getAttribute('name').toString(),
						data:data,
						cached:cached,
            tplextension:tplextension,
			      templateURI:'{{COMPONENTS_BASE_PATH}}{{COMPONENT_NAME}}.{{TPLEXTENSION}}'.replace('{{COMPONENT_NAME}}',components[_c].getAttribute('name').toString()).replace('{{COMPONENTS_BASE_PATH}}',CONFIG.get('componentsBasePath')).replace('{{TPLEXTENSION}}',tplextension),
						subcomponents:[]
			    });
					newComponent.done = componentDone;
					components[_c].append(newComponent);
					components[_c].setAttribute('loaded',true);
				} else {
					var _componentClassName = (components[_c].getAttribute('componentClass')!=null)?(components[_c].getAttribute('componentClass')):('Component');
					var newComponent = New(_QC_CLASSES[_componentClassName],{
			      name:components[_c].getAttribute('name').toString(),
						data:data,
						cached:cached,
            tplextension:tplextension,
						body:components[_c],
			      templateURI:'{{COMPONENTS_BASE_PATH}}{{COMPONENT_NAME}}.{{TPLEXTENSION}}'.replace('{{COMPONENT_NAME}}',components[_c].getAttribute('name').toString()).replace('{{COMPONENTS_BASE_PATH}}',CONFIG.get('componentsBasePath')).replace('{{TPLEXTENSION}}',tplextension),
						subcomponents:[]
			    });
					newComponent.done = componentDone;

				}
				componentsBuiltWith.push(newComponent);
		  }
			return componentsBuiltWith;
		};
		var components = d.subelements(tagFilter);
		return _buildComponent(components);
	};

	HTMLDocument.prototype.buildComponents = Element.prototype.buildComponents;
	HTMLElement.prototype.buildComponents = Element.prototype.buildComponents;

	Class('SourceJS',Object,{
		domain:window.location.host.toLowerCase(),
    basePath:basePath,
		body:document.createElement('script'),
		url:'',
    data:{},
		async:false,
		external:false,
		set:function (name,value){
			this[name]=value;
		},
		get:function (name){
			return this[name];
		},
    status:false,
		done:function (){},
    fail:function (){},
		rebuild:function (){
			var context = this;
      try {
        document.getElementsByTagName('body')[0].appendChild(
  				(function (s,url,context){
  					s.type='text/javascript';
  					s.src=url;
  					s.crossOrigin = 'anonymous';
  					s.async=context.async;
  					s.onreadystatechange = function() {
  						if (this.readyState == 'complete') {
  							context.done.call(context);
  						}
  					};
  					s.onload = function (e){
              context.status=true;
              context.done.call(context,e);
            };
            s.onerror = function (e){
              context.status=false;
              context.fail.call(context,e);
            };
  					context.body=s;
  					return s;
  				}).call(this,
  					document.createElement('script'),
  					(this.external)?(this.url):(this.basePath+this.url),context));
      }catch(e){
        context.status=false;
        context.fail.call(context,e);
      }
		},
		Cast:function (o){
			return _Cast(this,o);
		},
		'_new_':function (properties){
			this.__new__(properties);
			this.rebuild();
		}
	});
	Class('SourceCSS',Object,{
		domain:window.location.host.toLowerCase(),
    basePath:basePath,
		body:document.createElement('link'),
		url:'',
    data:{},
		async:false,
		external:false,
		set:function (name,value){
			this[name]=value;
		},
		get:function (name){
			return this[name];
		},
		done:function (){},
		rebuild:function (){
			var context = this;
			document.getElementsByTagName('head')[0].appendChild(
				(function (s,url,context){
					s.type='text/css';
					s.rel='stylesheet';
					s.href=url;
					s.crossOrigin = 'anonymous';
					s.onreadystatechange = function() {
						if (this.readyState == 'complete') {
							context.done.call(context);
						}
					};
					s.onload = context.done;
					context.body=s;
					return s;
				}).call(this,
					document.createElement('link'),
					(this.external)?(this.url):(this.basePath+this.url),context));
		},
		Cast:function (o){
			return _Cast(this,o);
		},
		'_new_':function (properties){
			this.__new__(properties);
			this.rebuild();
		}
	});

  Class('ArrayList',Array,[]);
  Class('ArrayCollection',Object,{
    source:New(ArrayList,[]),
    changed:function(prop,value){
      logger.debug('VALUE CHANGED');
      logger.debug(prop);
      logger.debug(value);
    },
    push:function (value){
      var self = this;
      logger.debug('VALUE ADDED');
      logger.debug(value);
      self.source.push(value);
    },
    pop:function (value){
      var self = this;
      logger.debug('VALUE POPPED');
      logger.debug(value);
      self.source.pop(value);
    },
    _new_:function (source){
      var self = this;
      var _index = 0;
      self.source = New(ArrayList,source);
      for (var _k in self.source){
        if (!isNaN(_k)){
          logger.debug('binding '+_k.toString());
          (function (_pname){
              Object.defineProperty(self,_pname,{
                set(value){
                  logger.debug('setting '+_pname+'='+value);
                  self.source[_pname]=value;
                  self.changed(_pname,value);
                },
                get(){
                  return self.source[_pname];
                }
              });
            })(_k);
            _index++;
        }

      }
      self.source.length=_index;
      Object.defineProperty(self,'length',{
        get(){
          return self.source.length;
        }
      })
    }
  });

  Class('Effect',{
    animate: function ({timing, draw, duration}) {

      let start = performance.now();

      requestAnimationFrame(function animate(time) {
        // timeFraction goes from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // calculate the current animation state
        let progress = timing(timeFraction);

        draw(Math.round(progress*100)); // draw it

        if (timeFraction < 1) {
          requestAnimationFrame(animate);
        }

      });
    }
  });




	/**
	* Load every component tag declared in the body
	**/
	Ready(function (){
    var _buildComponents = function (){
      GLOBAL.componentsStack = document.buildComponents();
    };
    Component._bindroute();
		if (CONFIG.get('useConfigService')){
			GLOBAL.configService = New(ConfigService);
			GLOBAL.configService.configLoaded = _buildComponents;
			serviceLoader(GLOBAL.configService);
		} else {
			_buildComponents.call(this);
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
