/**
 * QCObjects  1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 *
 */

var __readyImportLoaded = false;

/**
 * Primary instance ID of all objects
 */
var __instanceID = 0;
// Adaptation of Production steps of ECMA-262, Edition 5, 15.2.3.5
// Reference: http://es5.github.io/#x15.2.3.5
Object.create = (function() {
	// To save on memory, use a shared constructor
	function QC_Object() {
	};

	// make a safe reference to Object.prototype.hasOwnProperty
	var hasOwn = Object.prototype.hasOwnProperty;

	return function(O) {
		// 1. If Type(O) is not Object or Null throw a TypeError exception.
		if ( typeof O != 'object') {
			throw TypeError('Object prototype may only be an Object or null. The type is ' + typeof (0));
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
 * Creates new object class  of another object
 *
 * @param {String} name
 * @param {Object} type
 * @param {Object} definition
 */
var Class = function(name, type, definition) {
	var o;
	if ( typeof type != 'undefined') {
		type = (type.hasOwnProperty('prototype')) ? (type.prototype) : (type);

		if (typeof definition != 'undefined' && !definition.hasOwnProperty('__new__')){
			definition['__new__'] = function (){
				console.log('__NEW__ en tipo definido');
			};
		}
		
		o = Object.create(type, definition);
	} else {
		o = Object.create(definition);
		if (!o.hasOwnProperty('__new__')) {
			o['__new__'] = function() {
			};
		}
	}
	o['__definition'] = definition;
	o['__definition']['__classType']=name;
	_QC_CLASSES[name] = o;
	eval('' + name + ' = _QC_CLASSES[\'' + name + '\'];');
	return o;
};

/**
 * Creates an object from a Class definition
 *
 * @param {QC_Object} o
 * @param {Object} args
 */
var New = function(c, args) {
	__instanceID = __instanceID++;
	c_new = Object.create(c.constructor.prototype,c.__definition);
	c_new['__instanceID'] = __instanceID;
	if (c_new.hasOwnProperty('__new__')) {
//		if (typeof c_new != 'undefined' && !c_new.hasOwnProperty('body')){
		if (typeof c_new != 'undefined'){
			try{
				c_new['body'] = _Cast(c_new['__definition'],document.createElement('canvas'));
				
			}catch (e){
				
			}
		}
		console.log('llamada a new');
		console.trace();
		if (typeof c_new != 'undefined' && c_new.hasOwnProperty('body')){
			console.log('Append Child');
			document.body.appendChild(c_new['body']);
		}
		c_new.__new__(args);
	}
	return c_new;
};

if ( typeof console == 'undefined') {
	var console = function() {
	};
	console.prototype.log = function(message) {
	};
}

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
		s1 = document.createElement('script');
		s1.type = 'text/javascript';
		s1.src = 'src/' + packagename + '.js';
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
 * Basic Type of all elements
 */
var QC_Object = function() {
};
QC_Object.prototype = {
	find : function(tag) {
		var _tags = document.getElementsByTagName(tag);
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
 * Gets the element of DOM found by tag name
 * 
 * @param {Object} tagname
 * @param {Object} innerHTML
 */
var Tag = function(tagname, innerHTML) {
	tagname = tagname.toString().toLowerCase();
	o = document.getElementsByTagName(tagname);
	_o = [];
	if ( typeof innerHTML != 'undefined') {
		for (var _v in o) {
			var __v1 = o[_v];
			__v1.innerHTML = innerHTML;
		}
	}
	for (_vv in o) {
		if ( typeof o[_vv] != 'undefined') {
			var __v = o[_vv];
			_o.push(_Cast(__v, (new QC_Object())));
		}
	}

	return _o;
};

/**
 * Default Ready event function for window. Executes all micro ready events of Import calls
 * 
 * @param {Object} e
 */
var Ready = function(e) {
	for (var _r in _QC_READY_LISTENERS) {
		if ( typeof _QC_READY_LISTENERS[_r] == 'function') {
			_QC_READY_LISTENERS[_r].call();
			delete _QC_READY_LISTENERS[_r];
		}
	}
};

window.onload = Ready;
