![logo](qcobjects_01.png)

# QCObjects
----------------

## Cross Browser Javascript Framework for MVC Patterns
----------------------------------------
QCObjects is a javascript framework designed to make easier everything about the MVC patterns implementation into the pure javascript scope. You don't need to use typescript nor any transpiler to run QCObjects. It runs directly on the browser and it uses pure javascript with no extra dependencies of code. You can make your own components expressed in real native javascript objects or extend a native DOM object to use in your own way. You can also use QCObjects in conjunction with CSS3 frameworks like [Foundation] (https://foundation.zurb.com), [Bootstrap] (http://getbootstrap.com) and mobile javascript frameworks like [PhoneGap] (https://phonegap.com) and OnsenUI (https://onsen.io)

![screenshot](doc/img/components.gif)


_________________________
# Table of Contents

<!-- TOC -->

- [QCObjects](#qcobjects)
  - [Cross Browser Javascript Framework for MVC Patterns](#cross-browser-javascript-framework-for-mvc-patterns)
- [Table of Contents](#table-of-contents)
- [ALPHA RISE Startup](#alpha-rise-startup)
- [ECMA-262 Specification](#ecma-262-specification)
- [Demo](#demo)
  - [Demo Using Foundation](#demo-using-foundation)
  - [Demo Using Materializecss](#demo-using-materializecss)
  - [Demo Using Raw CSS](#demo-using-raw-css)
  - [Another Basic Demo example: The simpliest demo example:](#another-basic-demo-example-the-simpliest-demo-example)
- [Fork](#fork)
- [Become a Sponsor](#become-a-sponsor)
- [Check out the QCObjects SDK](#check-out-the-qcobjects-sdk)
- [Donate](#donate)
- [Installing](#installing)
  - [Using QCObjects with Atom:](#using-qcobjects-with-atom)
  - [Using QCObjects in Visual Studio Code:](#using-qcobjects-in-visual-studio-code)
  - [Installing with NPM:](#installing-with-npm)
  - [Using the code in the straight way into HTML5:](#using-the-code-in-the-straight-way-into-html5)
- [Quick Start](#quick-start)
  - [Step 1: Start creating a main import file and name it like: cl.quickcorp.js. Put it into packages/js/ file directory](#step-1-start-creating-a-main-import-file-and-name-it-like-clquickcorpjs-put-it-into-packagesjs-file-directory)
  - [Step 2: Then create some services inhereting classes into the file js/packages/cl.quickcorp.services.js :](#step-2-then-create-some-services-inhereting-classes-into-the-file-jspackagesclquickcorpservicesjs-)
  - [Step 3: Now it's time to create the components (cl.quickcorp.components.js)](#step-3-now-its-time-to-create-the-components-clquickcorpcomponentsjs)
  - [Step 4: Once you have done the above components declaration, you will now want to code your controllers (cl.quickcorp.controller.js)](#step-4-once-you-have-done-the-above-components-declaration-you-will-now-want-to-code-your-controllers-clquickcorpcontrollerjs)
- [Reference](#reference)
  - [Essentials](#essentials)
    - [QC_Object](#qc_object)
    - [ComplexStorageCache](#complexstoragecache)
    - [asyncLoad](#asyncload)
    - [Class](#class)
      - [QC_Append](#qc_append)
      - [_super_](#_super_)
      - [InheritClass](#inheritclass)
      - [_Crypt](#_crypt)
      - [GLOBAL](#global)
      - [waitUntil](#waituntil)
    - [Package](#package)
    - [Import](#import)
    - [Export](#export)
    - [Tag](#tag)
    - [Ready](#ready)
    - [Component](#component)
      - [ComponentURI](#componenturi)
      - [componentLoader](#componentloader)
      - [buildComponents](#buildcomponents)
    - [Controller](#controller)
    - [View](#view)
    - [VO](#vo)
    - [Service](#service)
    - [JSONService](#jsonservice)
    - [ConfigService](#configservice)
    - [SourceJS](#sourcejs)
    - [SourceCSS](#sourcecss)
    - [ArrayList](#arraylist)
    - [ArrayCollection](#arraycollection)
    - [Timer](#timer)

<!-- /TOC -->

_________________________



# ALPHA RISE Startup
--------------------------
![alpha](doc/img/ALPHA-RISE.png)

QCObjects was invited to exhibit as an ALPHA Startup in the RISE Conf Hong Kong 2019. RISE attracts the most dynamic startups from around the world. We'll be showing how QCObjects is making a real Global Impact to the JavaScript developers life transforming the way for coding.

If you want to find out more about RISE event check out their website [https://riseconf.com](https://riseconf.com)

# ECMA-262 Specification
--------------------------
See
[ECMAScript® 2020 Language Specification](https://tc39.github.io/ecma262/#sec-intro) for reference

Copyright
--------------
Copyright (c) Jean Machuca and QuickCorp <info@quickcorp.cl>

# Demo
--------------

## Demo Using Foundation

Check out a demo using Foundation components here:
[Demo Using Foundation](https://github.com/QuickCorp/quickobjects_sample1foundation)

## Demo Using Materializecss

Check out a demo using MaterializeCSS here:
[Demo Using Materializecss](https://qln.link)

## Demo Using Raw CSS

Check out a demo using raw CSS:
[Demo Using Raw CSS](https://github.com/QuickCorp/qcobjects_profile_browser)

## Another Basic Demo example: The simpliest demo example:

```html
<!DOCTYPE html>
<html>
    <head>
    	<title>Demo</title>
    	<script type="text/javascript" src="https://qcobjects.dev/QCObjects.js"></script>
    	<script type="text/javascript">
    		var canvas1,canvas2,canvas3,container;
        CONFIG.set('relativeImportPath','src/');

    		/**
    		 * Main import sentence.
    		 */
    		Import('cl.quickcorp',function (){

    			/**
    			 * Super Container MyOwnBody
    			 */
	    		Class('MyOwnBody',HTMLBodyElement,{
	    			customAttr:'custom',
	    			body:document.body  // breakes default body element and replace with them
	    		});

	    		/**
	    		 * Another custom class definition
	    		 */
	    		Class('MyContainer',HTMLElement,{
	    			width:400,
	    			height:400,
	    			customAttr:'custom attr container'
	    		});


	    		/**
	    		 * Another custom class definition
	    		 */
	    		Class('canvas',HTMLCanvasElement,{
	    			customAttr:'custom'
	    		});

	    		/**
	    		 * Another custom class definition
	    		 */
	    		Class('MyCanvas2',HTMLCanvasElement,{});

	    		body = New(MyOwnBody); // binds to body
	    		body.css({backgroundColor:'#ccc'});

	    		container = document.getElementsByTagName('container')[0].Cast(MyContainer); // cast any javascript dom object to QC_Object class
	    		container.css({backgroundColor:'red'}); // access binding in two directions to dom objects

	    		/**
	    		 * Instance a new custom canvas
	    		 */
	    		canvas1 = New(canvas,{
            width:100,
            height:100,
          });
	    		canvas2 = New(canvas,{
            width:200,
	    			height:100,
          });
	    		canvas3 = New(canvas,{
            width:300,
	    			height:50,
          });

	    		canvas1.css({backgroundColor:'#000000'}); // like jquery and another style access
          canvas1.body.style.backgroundColor='#000000'; // standard javascript style access
	    		canvas2.body.style.backgroundColor='#0044AA'; // standard javascript style access
	    		canvas3.body.style.backgroundColor='green'; // standard javascript style access

	    		canvas1.append(); //append canvas1 to body
	    		canvas2.attachIn('container'); // attach or append to specific tag containers
	    		container.append(canvas3); // append canvas3 to custom tag binding

//	    		canvas1.body.remove(); // remove canvas1 from dom
	    		body.append(canvas3); // append canvas3 to body

          // using components
          var c1 = New(Component,{'templateURI':'templatesample.html',cached:false});
          document.body.append(c1); // appends the c1 to the body


    		});

    	</script>
    </head>
    <body>
    	<container id="contentLoader" ></container>
    </body>
</html>
```

# Fork
--------------
Please fork this project or make a link to this project into your README.md file. Read the LICENSE.txt file before you use this code.

# Become a Sponsor
------------------
If you want to become a sponsor for this wonderful project you can do it [here](https://sponsorsignup.qcobjects.dev/)

# Check out the QCObjects SDK
----------------------------
You can check out the [QCObjects SDK](https://sdk.qcobjects.dev/) and follow the examples to make your own featured components


# Donate
--------------

If you like this code please [DONATE](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UUTDBUQHCS4PU&source=url)!

 [![paypal](https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UUTDBUQHCS4PU&source=url)


# Installing
------------


## Using QCObjects with Atom:

```shell
> apm install qcobjects-syntax
```
https://atom.io/packages/qcobjects-syntax

## Using QCObjects in Visual Studio Code:

https://marketplace.visualstudio.com/items?itemName=Quickcorp.QCObjects-vscode

## Installing with NPM:

```shell
> npm install qcobjects
```

## Using the code in the straight way into HTML5:

```html
<script type="text/javascript" src="https://qcobjects.dev/QCObjects.js"></script>
```

# Quick Start
## Step 1: Start creating a main import file and name it like: cl.quickcorp.js. Put it into packages/js/ file directory

```javascript
"use strict";
/*
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


Import ('external/libs');
Import ('cl.quickcorp.model');
Import ('cl.quickcorp.components');
Import ('cl.quickcorp.controller');
Import ('cl.quickcorp.view');

Package('cl.quickcorp',[
  Class('FormValidator',Object,{

  }),
]);

```

## Step 2: Then create some services inhereting classes into the file js/packages/cl.quickcorp.services.js :

```javascript
"use strict";
/*
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


Package('cl.quickcorp.service',[
  Class('JsonService',{
    method:"GET",
    cached:false,
  	headers: {
  		"Content-Type":"application/json",
      "charset":"utf-8"
  	},
    JSONresponse: null,
    done:function(result){
      console.log("***** RECEIVED RESPONSE:");
      console.log(result.service.template);
      this.JSONresponse = JSON.parse(result.service.template);
      alert(this.template);
    }
  }),
  Class('FormSubmitService',{
    method:"POST",
    cached:false,
    headers: {
      "Content-Type":"application/json"
    },
    JSONresponse: null,
    done: function(result) {
      console.log("***** CALLED FormSubmitService");
      this.JSONresponse = JSON.parse(result.service.template);
      //TODO success case
      console.log("***** SUCCESS!")
      console.log(this.JSONresponse);
    },
    fail: function(result) {
      //TODO negative case
      console.log("***** ERROR");
    }

  })

])
```

## Step 3: Now it's time to create the components (cl.quickcorp.components.js)

```javascript
"use strict";
/*
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
Package('cl.quickcorp.components',[
  Class('FormField',Component,{
    cached:false,
    reload:true,
  	createBindingEvents:function (){
  		var _executeBinding = this.executeBinding;
  		var thisobj = this;
  		var _objList = this.body.querySelectorAll(this.fieldType);
  		for (var _datak=0;_datak<_objList.length;_datak++){
  			var _obj = _objList[_datak];
  			_obj.addEventListener('change',function(e){
  				logger.debug('Executing change event binding');
  				thisobj.executeBindings();
  			});
  			_obj.addEventListener('keydown',function(e){
  				logger.debug('Executing keydown event binding');
  					thisobj.executeBindings();
  			});
  		}
  	},
  	executeBinding:function (_obj){
  		var _datamodel = _obj.getAttribute('data-field');
  		logger.debug('Binding '+_datamodel+' for '+this.name);
  		this.data[_datamodel]=_obj.value;
  	},
  	executeBindings:function (){
      var _objList = this.body.querySelectorAll(this.fieldType);
  		for (var _datak=0;_datak<_objList.length;_datak++){
  			var _obj = _objList[_datak];
  			var _datamodel = _obj.getAttribute('data-field');
        logger.debug('Binding '+_datamodel+' for '+this.name);
  			this.data[_datamodel]=_obj.value;
  		}
  	},
    done:function (){
      var thisobj = this;
      thisobj.executeBindings();
  		thisobj.createBindingEvents();
      logger.debug('Field loaded: '+thisobj.fieldType+'[name='+thisobj.name+']');
    }
  }),
  Class('ButtonField',FormField,{
  	fieldType:'button'
  }),
  Class('InputField',FormField,{
  	fieldType:'input'
  }),
  Class('TextField',FormField,{
  	fieldType:'textarea'
  }),
  Class('EmailField',FormField,{
  	fieldType:'input'
  })
]);
```

## Step 4: Once you have done the above components declaration, you will now want to code your controllers (cl.quickcorp.controller.js)


```javascript
"use strict";
/*
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
Package('cl.quickcorp.controller',[
	Class('MainController',Object,{
		_new_:function (){
			//TODO: Implement
			logger.debug('MainController Element Initialized');
		}
	}),
	Class('MyAccountController',Object,{
		component: null,
		done:function (){
			var controller = this;



			logger.debug('MyAccountController Element Initialized');
			this.component.body.setAttribute('loaded',true);

		},
		_new_:function (o){
			//TODO: Implement
			this.component = o.component;

		}
	}),
]);
```

## Step 5: To use into the HTML5 code you only need to do some settings between script tags:

```html
<script>
CONFIG.set('relativeImportPath','js/packages/');
CONFIG.set('componentsBasePath','templates/components/');
CONFIG.set('delayForReady',1); // delay to wait before executing the first ready event, it includes imports
CONFIG.set('preserveComponentBodyTag',false); // don't use <componentBody></componentBody> tag

Import('cl.quickcorp'); # this will import your main file: cl.quickcorp.js into js/packages/ file path
</script>
```
-------------------------------

# Reference

## Essentials

### QC_Object

Basic Type of all elements

### ComplexStorageCache

With **CompletStorageCache** you can handle a cache for any object and save it in the local storage.

#### Usage:
```javascript
var cache = new CompletStorageCache({
                      index:object.id, // Object Index
                      load:(cacheController)=>{}, // A function to execute for the first time
                      alternate: (cacheController)=>{} // The alternate function to execute from the second time the source coude is loaded
                      });
```

#### Example:
```javascript
var dataObject = {id:1,
                  prop1:1,
                  prop2:2
                };

var cache = new ComplexStorageCache({
    index: dataObject.id,
    load: (cacheController) => {
      dataObject = {
              id:dataObject.id,
              prop1:dataObject.prop1*2, // changing a property value
              prop2:dataObject.prop2
            };
      return dataObject;
    },
    alternate: (cacheController) => {
      dataObject = cacheController.cache.getCached(dataObject.id); // setting dataObject with the cached value
      return;
    }
  });

// Next time you can get the object from the cache
var dataObjectCopyFromCache = cache.getCached(dataObject.id);
console.log(dataObjectCopyFromCache); // will show the very same object value than dataObject
```

### asyncLoad
The **asyncLoad** function loads a code once in async mode. This is useful to asure some initial process don't replicate its execution and aren't loaded after sensitive code.
#### Usage:
```javascript
asyncLoad(()=>{
  // my code here
},args);
// Where args is an array of arguments, it can be the "arguments" special object
```

#### Example:
```javascript

let doSomething = (arg1,arg2)=>{
  asyncLoad((arg1,arg2)=>{
    console.log(arg1);
    console.log(arg2);
  },arguments);
};

doSomething(1,2); // the code of doSomething will be executed once after the rest of asyncLoad queue of functions and before the execution of Ready event.

```


### Class

This is NOT the class definition of ECMAScript 2015 (see [class ECMAScript 2015](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) for reference).

Class is a special function to help you to declare a class in an easier and compatible way. It works cross-browser, and I hope ECMA could adopt something like that in the future. To let javascript not to be confuse about this, QCObjects uses "Class" not "class" (note the Camel Case).

#### Usage:
```javascript
Class('MyClassName',MyClassDefinition);
```
Where **MyClassDefinition** is an object with a QCObjects  **prototype**

#### Example:
```javascript
Class('MyClassName',InheritClass,{
  propertyName1:0, // just to declare purpose
  propertyName2:'',
  classMethod1: function (){
    // some code here
    // note you can use "this" object
    return this.propertyName1;
  },
  classMethod2: function () {
    // some code here
    return this.propertyName2;
  }
});

var newObject = New(MyClassName,{
    propertyName1:1, // this initializes the value in 1
    propertyName2:"some value"
});
console.log(newObject.classMethod1()); // this will show number 1
console.log(newObject.classMethod2()); // this will show "some value"

```


#### QC_Append, append method

This is a special method inserted to make your life easier when you want to dynamically manipulate the **DOM**. You can insert even a **Component**, a **QCObjects** Object or a **DOM** Element inside another **HTMLElement**.

##### Usage:
```javascript
[element].append([object or element]);
```
##### Example:
```javascript
// This will create a QCObjects class named "canvas" extending a HTMLCanvasElement with a customAttr property that has a "custom" value
Class('canvas',HTMLCanvasElement,{
  customAttr:'custom'
});

// This will declare an instance canvas1 from the class canvas
let canvas1 = New(canvas,{
            width:100,
            height:100,
          });

// This will append the canvas1 object to the document body
document.body.append(canvas1);

```



#### The \_super\_ method

When you extend a QCObjects class from another one, you can use \_super\_ method to get an instance from the main class definition.

##### Usage:
```javascript

_super_('MySuperClass','MySuperMethod').call(this,params)
// where this is the current instance and params are method parameters
```

##### Example:
```javascript
Class('MySuperiorClass',InheritClass,{
  propertyName1:0, // just to declare purpose
  propertyName2:'',
  classMethod1: function (){
    // some code here
    // note you can use "this" object
    return this.propertyName1;
  },
});

Class('MyClassName',MySuperiorClass,{
  propertyName1:0, // just to declare purpose
  propertyName2:'',
  classMethod2: function () {
    // The next line will execute classMethod1 from MySuperiorClass
    // but using the current instance of MyClassName1
    return _super_('MySuperiorClass','classMethod1').call(this);
  }
});

var newObject = New(MyClassName,{
    propertyName1:1, // this initializes the value in 1
    propertyName2:"some value"
});
console.log(newObject.classMethod2()); // this will show the number 1
```


#### New

Creates an object instance of a QCObjects class definition.

##### Usage:

```javascript
let objectInstance = New(QCObjectsClassName, properties);
// where properties is a single object with the property values
```
NOTE: In the properties object you can use single values or getter as well but they will be executed once.

##### Example:
```javascript
Class('MyCustomClass',Object);
let objectInstance = New(MyCustomClass,{
  prop1:1,
  get randomNumber(){ // this getter will be executed once
    return Math.random();
  }
});

console.log(objectInstance.randomNumber); // it will show console.log(objectInstance.prop1); // it will show number 1
```


#### InheritClass
A single common used QCObjects class definition.

#### \_Crypt
With \_Crypt you can encode serializable objects by a passphrase

##### Example (1):

```javascript

 var _string = New(_Crypt,{string:'hello world',key:'some encryption md5 key'});
 console.log(_string._encrypt());
 console.log(_string._decrypt()); // decodes encrypted string to the source
 ```
 ##### Example (2):

 ```javascript
 _Crypt.encrypt('hola mundo','12345678866');
 _Crypt.decrypt('nqCelFSiq6Wcpw==','12345678866');
```


#### GLOBAL
**GLOBAL** is a special QCObjects class to reach the global scope. It has a set and a get method to help you to manage the internal GLOBAL properties.

##### Example:
```javascript
GLOBAL.set('globalProperty1','some value in global scope');
var globalProperty1 = GLOBAL.get('globalProperty1');
```


#### CONFIG
CONFIG is a smart class that manages the global settings of your application. You can get the properties either from a config.json or from the memory previously saved by a set() call.

##### Usage from memory:

1.- In your initial code set the CONFIG initial values:
```javascript
CONFIG.set('someSettingProperty','some initial value');
```
2.- Then you can access it from anywhere in your code by using the get method:
```javascript
var someSettingProperty = CONFIG.get('someSettingProperty');
```

##### Usage from config.json:

1.- You need to indicate first that you are using a config.json file by setting the "useConfigService" value to true
```javascript
CONFIG.set('useConfigService',true); // using config.json for custom settings config
```
2.- Once you have set the value above QCObjects will know and look to the next CONFIG settings into the file config.json in the basePath folder of your application.

##### Usage from an encrypted config.json:

There is also a way to use an encrypted config.json file in order to protect your settings robots that can steal unprotected data from your web application (like API keys web crawlers).

To encrypt your json file go to https://config.qcobjects.dev, put your domain and the config.json content. The tool will encrypt your json and you can copy the encrypted content to insert it in your config.json file. QCObjects will know the data is encrypted and the process to decode the data will be transparent for you.


#### waitUntil
waitUntil is a helper just in case you are in trouble trying to run a code before a condition is true. The code inside waitUntil will be executed once.

NOTE: This is useful in some cases but an excessive use is not recommended.

##### Usage:
```javascript
waitUntil(()=>{
  // the code that will be executed after the condition is true
},()=>{return condition;});
// where condition is what I want to wait for
```

##### Example:
```javascript
let someVar = 0;
waitUntil(()=>{
  console.log('someVar is present');
},()=>{return typeof someVar != 'undefined';});
// where condition is what I want to wait for
```


### Package
Defines a QCObjects package and returns it.

#### Usage:
```javascript
Package('packageName',[packageContent]);
```
Where packageContent is an array of QCObjects Classes. If you only pass the packageName param you will get the previously declared package content.

#### Example (1):
```javascript
'use strict';
Package('org.quickcorp.main',[
  Class('Main',InheritClass,{
    propertyName1:'propertyValue1',
  }),
  Class('MyCustomClass',InheritClass,{
    propertyName2:'propertyValue2',
  }),
]);
```
#### Example (2):
```javascript
let mainPackage = Package('org.quickcorp.main'); // this will return the previously declared content of package 'org.quickcorp.main'
// mainPackage[0] will be the Main class definition.
// This is useful for code introspection
```

### Import
Imports a package from another JS file

#### Usage:
```javascript
Import (packagename,[ready],[external]);
```
Where packagename is the name of the package, ready is a function that will be executed after the package is loaded, and external is a boolean value that indicates if the JS file is in the same origin or it is from another external resource.

#### Example (1):
```javascript
Import('org.quickcorp.main');
```
The above code will try to import a JS fila named 'org.quickcorp.main.js' from the path specified in the **relativeImportPath** settings value present in your **CONFIG**. Inside the JS file you have to define a package by using Package('org.quickcorp.main',[Class1, Class2...])

#### Example (2):
```javascript
Import('org.quickcorp.main',function (){
  console.log('remote import is loaded');
},true);
```
The above code this time is trying to load the same package but using an external path defined by the **remoteImportsPath** setting present in your **CONFIG**

NOTE: In both examples above you have not use or specify the ".js" extension. This it's used by default and can't be changed by security reasons.

### Export
Put a symbol (var or function) in the global scope.

#### Usage:
```javascript
Export('name of symbol');
```

##### Example:
```javascript
(()=>{
  // this is local scope
  let someFunction = (someLocalParam)=>{
    console.log(someLocalParam);
  };
  Export(someFunction); // now, someFunction is in the top level scope.
})();


// this is the top level scope
someFunction('this works');
```


### Cast

### Tag

### Ready

### Component
#### ComponentURI

#### componentLoader

#### buildComponents

### Controller

### View

### VO


### Service

#### serviceLoader

### JSONService
### ConfigService
### SourceJS
### SourceCSS
### ArrayList
### ArrayCollection
### Effect
### Timer

## SDK
