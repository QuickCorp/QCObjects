![logo](https://qcobjects.dev/qcobjects_01.png)

[![GitHub license](https://img.shields.io/github/license/QuickCorp/QCObjects.svg)](https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt) [![](https://data.jsdelivr.com/v1/package/npm/qcobjects/badge)](https://www.jsdelivr.com/package/npm/qcobjects)  [![Badge for version for Visual Studio Code extension Quickcorp.QCObjects-vscode](https://vsmarketplacebadge.apphb.com/version/Quickcorp.QCObjects-vscode.svg)](https://marketplace.visualstudio.com/items?itemName=Quickcorp.QCObjects-vscode) [![Documentation Status](https://readthedocs.org/projects/qcobjects/badge/?version=latest)](https://qcobjects.readthedocs.io/?badge=latest) [![GitHub release](https://img.shields.io/github/issues/QuickCorp/QCObjects.svg)](https://github.com/QuickCorp/QCObjects/releases/) [![GitHub stars](https://img.shields.io/github/stars/QuickCorp/QCObjects.svg)](https://github.com/QuickCorp/QCObjects) [![npm version](https://badge.fury.io/js/qcobjects.svg)](https://badge.fury.io/js/qcobjects) ![apm: version](https://flat.badgen.net/apm/v/qcobjects-syntax?params) ![docker pulls](https://img.shields.io/docker/pulls/quickcorp/qcobjects.svg) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](CODE_OF_CONDUCT.md)

[![Become a Patreon ](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/join/qcobjects?)

# QCObjects
------------------------------------
Welcome to [QCObjects](https://qcobjects.dev). An Open-source framework that empowers full-stack developers to make micro-services and micro-frontends into an N-Tier architecture.

With QCObjects devlopers are also able to code front-end and back-end together using a common syntax in pure JavaScript. It is cross-browser, cross-platform and cross-frame.

[QCObjects is being featured by British Herald as today, the most advanced framework for modern software development.](https://britishherald.com/qcobjects-the-first-world-class-tech-framework-made-in-south-america-is-meant-to-make-developers-happier-while-they-code/)

This document is the Main Reference Documentation!

This repository and readme is hosted at [https://qcobjects.dev](https://qcobjects.dev)

Check out the official page of [QCObjects](https://qcobjects.com) at https://qcobjects.com

This project adheres to the Contributor Covenant [code of conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to info@quickcorp.cl.

**Contributors are welcome!**

You can contribute to [QCObjects](https://qcobjects.dev) following the set of guidelines expressed in the file [CONTRIBUTING.md](CONTRIBUTING.md)


_________________________
# Table of Contents

<!-- TOC depthFrom:1 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

- [QCObjects](#qcobjects)
- [Table of Contents](#table-of-contents)
- [Principals](#principals)
- [Main features](#main-features)
- [Progressive Web Apps (PWA) Adopted Features](#progressive-web-apps-pwa-adopted-features)
	- [Prevent Render-blocking resources](#prevent-render-blocking-resources)
	- [On-Demand Resources Load](#on-demand-resources-load)
	- [Lazy-loading of images in components (use lazy-src instead of src attribute in img tag)](#lazy-loading-of-images-in-components-use-lazy-src-instead-of-src-attribute-in-img-tag)
- [Cross Browser Javascript Framework for MVC Patterns](#cross-browser-javascript-framework-for-mvc-patterns)
- [Dynamic Components Architecture](#dynamic-components-architecture)
- [ECMA-262 Specification](#ecma-262-specification)
- [Copyright](#copyright)
- [Demo](#demo)
	- [PWA Live Demo](#pwa-live-demo)
	- [Demo Integrating with Foundation](#demo-integrating-with-foundation)
	- [Demo Integrating with Materializecss](#demo-integrating-with-materializecss)
	- [Demo Using Raw CSS](#demo-using-raw-css)
	- [Example of QCObjects using and manipulating canvas objects](#example-of-qcobjects-using-and-manipulating-canvas-objects)
- [DevBlog](#devblog)
- [Fork](#fork)
- [Become a Sponsor](#become-a-sponsor)
- [Check out the QCObjects SDK](#check-out-the-qcobjects-sdk)
- [Donate](#donate)
- [Installing](#installing)
	- [Using QCObjects with Atom:](#using-qcobjects-with-atom)
	- [Using QCObjects in Visual Studio Code:](#using-qcobjects-in-visual-studio-code)
	- [Installing with NPM:](#installing-with-npm)
	- [Installing the docker playground:](#installing-the-docker-playground)
	- [One-Step Installation Script for Ubuntu 18.x](#one-step-installation-script-for-ubuntu-18x)
	- [One-Step Installation Script for macOS](#one-step-installation-script-for-macos)
	- [Install and test QCObjects on Microsoft Windows OS](#install-and-test-qcobjects-on-microsoft-windows-os)
	- [QCObjects Multi-Cloud Installation](#qcobjects-multi-cloud-installation)
		- [DigitalOcean One-Click Droplet](#digitalocean-one-click-droplet)
		- [AWS Amazon Machine Images (AMI)](#aws-amazon-machine-images-ami)
		- [Amazon Web Services AWS PIB (Private Amazon Machine Image)](#amazon-web-services-aws-pib-private-amazon-machine-image)
	- [Using the development version code in the straight way into HTML5:](#using-the-development-version-code-in-the-straight-way-into-html5)
	- [Using the CDN minified version code from jsDelivr CDN](#using-the-cdn-minified-version-code-from-jsdelivr-cdn)
	- [Using the latest non-minified version from jsDelivr CDN](#using-the-latest-non-minified-version-from-jsdelivr-cdn)
	- [Using UNPKG CDN](#using-unpkg-cdn)
	- [Using CDNJS](#using-cdnjs)
- [Reference](#reference)
	- [Essentials](#essentials)
		- [QC_Object](#qc_object)
		- [ComplexStorageCache](#complexstoragecache)
		- [asyncLoad](#asyncload)
		- [Class](#class)
		- [QC_Append, append method](#qc_append-append-method)
		- [The \_super\_ method](#the-%5C_super%5C_-method)
		- [New](#new)
		- [InheritClass](#inheritclass)
		- [ClassFactory](#classfactory)
		- [\_Crypt](#%5C_crypt)
		- [GLOBAL](#global)
		- [CONFIG](#config)
		- [waitUntil](#waituntil)
		- [Package](#package)
		- [Import](#import)
		- [Export](#export)
		- [Cast](#cast)
		- [Tag](#tag)
		- [Ready](#ready)
		- [Component Class](#component-class)
		- [Component HTML Tag](#component-html-tag)
		- [Controller](#controller)
		- [View](#view)
		- [VO](#vo)
		- [Service](#service)
		- [serviceLoader](#serviceloader)
		- [JSONService](#jsonservice)
		- [ConfigService](#configservice)
		- [SourceJS](#sourcejs)
		- [SourceCSS](#sourcecss)
		- [ArrayList](#arraylist)
		- [ArrayCollection](#arraycollection)
		- [Effect](#effect)
		- [Timer](#timer)
	- [SDK](#sdk)
	- [The QCObjects HTTP2 Built-In Server](#the-qcobjects-http2-built-in-server)
		- [Start serving your files with QCObjects](#start-serving-your-files-with-qcobjects)
		- [Principals of an N-Tier or Multitier architecture](#principals-of-an-n-tier-or-multitier-architecture)
		- [Micro-services Principals](#micro-services-principals)
		- [Backend settings in config.json](#backend-settings-in-configjson)
		- [Backend routing](#backend-routing)
		- [The QCObjects Microservice Class and Package](#the-qcobjects-microservice-class-and-package)
		- [Generating a Self-Signed Certificate with QCObjects](#generating-a-self-signed-certificate-with-qcobjects)
- [Quick Start Guide](#quick-start-guide)
	- [Quick Start your PWA (Progressive Web App)](#quick-start-your-pwa-progressive-web-app)
	- [Quick Start your AMP (Accelerated Mobile Page)](#quick-start-your-amp-accelerated-mobile-page)
- [Start Coding](#start-coding)
	- [Step 1: Start creating a main import file and name it like: cl.quickcorp.js. Put it into packages/js/ file directory](#step-1-start-creating-a-main-import-file-and-name-it-like-clquickcorpjs-put-it-into-packagesjs-file-directory)
	- [Step 2: Then create some services inhereting classes into the file js/packages/cl.quickcorp.services.js :](#step-2-then-create-some-services-inhereting-classes-into-the-file-jspackagesclquickcorpservicesjs-)
	- [Step 3: Now it's time to create the components (cl.quickcorp.components.js)](#step-3-now-its-time-to-create-the-components-clquickcorpcomponentsjs)
	- [Step 4: Once you have done the above components declaration, you will now want to code your controllers (cl.quickcorp.controller.js)](#step-4-once-you-have-done-the-above-components-declaration-you-will-now-want-to-code-your-controllers-clquickcorpcontrollerjs)
	- [Step 5: To use into the HTML5 code you only need to do some settings between script tags:](#step-5-to-use-into-the-html5-code-you-only-need-to-do-some-settings-between-script-tags)
- [QCObjects CLI Tool](#qcobjects-cli-tool)
	- [Usage](#usage)
	- [Options](#options)
	- [Commands](#commands)
	- [Use:](#use)
- [ALPHA RISE Startup](#alpha-rise-startup)

<!-- /TOC -->



# Principals

Here are the principals with QCObjects was made with:

0. You should type in JavaScript to code a JavaScript application.
1. Everything is an object.
2. Every object has a definition.
3. On the front-end side, any object can be stacked into the DOM or Virtual-DOM without the need to re-declare its definition.
4. Every object has a body.
5. A class should be the main definition of an object.
6. A class should be easy typed as an object itself.
7. Your code should be easily organised into packages.
8. Your code should be possible to easily scafold your applications into a clean architecture.
9. A component is an entity that has an object representation, and a tag declaration. The content of a component should be possible to be filled up remotely and locally. As a component is an object, it has a body as well, and the body of the component normally is an stacked instance of a DOM element.
10. A component can be attached to the DOM or detached from it without affecting its functionality.
11. A service call can be extended to scafold its functionality.
12. You should be able to import a package remotely.
13. You should be able to scafold your code and also controlling your savings on the server side by not doing unnecessary calls to remote sources. You should not need to repeat yourself coding this kind of controls.
14. You should be able to code your N-Tier application in a single language or syntax.
15. You should be able to apply any template you want to a component, it doesn't matter the what syntax or language the template was written with.
16. If an HTML tag is already represented by a DOM object instance, you should not need to duplicate this instance definition in order to render its contents.
17. Your HTML main page should be clean. But you should be able to bind what controls the tag behaviour without affecting the HTML syntax.
18. The order of execution of your code should be easily understandable and readable from the code, and the rendering process of every component should have and execution control in as many layers you need.
19. A layered pattern (like MVC or MVCC) should be present for every component. It doesn't matter if you define every layer or not.
20. The behaviour of a component should not be determined by its rendering process.
21. It is necessary a components stack that splits the DOM into a subjacent tree of attached elements. So now it exists and it is called The QCObjects Nested Components Stack.
22. You should be able to extend a component instance. But you should be able to control its dynamic behaviour without affecting its initial declaration.
23. You should be able to apply simultaneous visual effects and animations in an easy way to any DOM element instance.
24. You should be able to control the visual effects and animations either from CSS or JavaScript without affecting the performance.
25. You should be able to control the behaviour of your code Into-the-box and out-of-the-box and survive doing it.

# Main features


- Built-In & custom templates for Progressive Web Apps (PWA) and Accelerated Mobile Pages (AMP)
- Revolutionary UI Effects
- Breakthrough backend micro-services
- The simplicity of a wonderful layout design
- Fully usable CLI tools
- Objects & Components driven architecture
- Front-end and back-end together in a full-stack environment
- Recursive routing for components
- Built-In nested components management
- Fully integrated MVC pattern (Model, View, Controller)
- Dynamic Data Objects
- Based on N-Tier Architecture concepts

# Progressive Web Apps (PWA) Adopted Features

## Prevent Render-blocking resources

To prevent Render-blocking resources, QCObjects has implemented the [Package](#Package) factory function.

## On-Demand Resources Load

With a dynamic components driven architecture, QCObjects is rendering every visual resource that is inside of a component only when the component is building itself, and every component is connected to a tree called global.componentsStack that is actually pointing to every component instance and its subcomponents. Every time a component is rebuilt, visual resources are dynamically reloaded on-demand in the most efficient way, so you can forget all the nasty code that you were needing to controll the resource loading process with other frameworks.

## Lazy-loading of images in components (use lazy-src instead of src attribute in img tag)

Since the version 2.1.251, QCObjects provide an easy way to lazy load the images, using the latest standard for browsers.

```html
<img src="img/preloader.svg" lazy-src="img/myrealimage.png"/>
```

In the above code, a preloader (light-weight) image is used to be loaded in the first instance, and a **lazy-src** attribute is used to set the real image to show after lazy loading process. QCObjects will load all the **<img>** declared tags inside a component in lazy mode if they have a lazy-src attribute, after the component is rebuilt or loaded. Also, QCObjects will use the [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) (when available) to determine whether the lazy-src or src image is visually useful to be showed.

The effect of lazy loading is only high visible on the first time the PWA is loaded. The next time, the speed of loading will be significantly increased making more difficult to the human eye to see the result. However this feature makes a lot of difference in terms of user experience when the internet connection has low speed issues or the images are extremely large. This feature is a part of the recommended features for PWAs writen by [Mozzila Developers Network](https://developer.mozilla.org/) in an article about Progressive loading. You can read that article [here](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Loading)

If you don't want to use lazy loading for images, you can always keep the normal way of loading by not adding the **lazy-src** attribute to the **<img>** tag and using the traditional **src**.


# Cross Browser Javascript Framework for MVC Patterns
----------------------------------------

[QCObjects](https://qcobjects.dev) is a javascript framework designed to make easier everything about the MVC patterns implementation into the pure javascript scope. You don't need to use typescript nor any transpiler to run [QCObjects](https://qcobjects.dev). It runs directly on the browser and it uses pure javascript with no extra dependencies of code. You can make your own components expressed in real native javascript objects or extend a native DOM object to use in your own way. You can also use [QCObjects](https://qcobjects.dev) in conjunction with CSS3 frameworks like [Foundation] (https://foundation.zurb.com), [Bootstrap] (https://getbootstrap.com) and mobile javascript frameworks like [PhoneGap] (https://phonegap.com) and OnsenUI (https://onsen.io)

![screenshot](https://qcobjects.dev/doc/img/components.gif)

# Dynamic Components Architecture

![qcobjects components layout](https://qcobjects.dev/doc/img/QCObjects-Components-Layout.gif)


# ECMA-262 Specification
--------------------------
See
[ECMAScript® 2020 Language Specification](https://tc39.github.io/ecma262/#sec-intro) for reference

# Copyright
-----------

Copyright (c) Jean Machuca and [QuickCorp](https://quickcorp.org) <info@quickcorp.cl>

# Demo
--------------

## PWA Live Demo

Check out a live demo of pure QCObjects based frontend Progressive Web App here:
[PWA QCObjects](https://newapp.qcobjects.dev/)

## Demo Integrating with Foundation

Check out a demo using Foundation components here:
[Demo Using Foundation](https://github.com/QuickCorp/quickobjects_sample1foundation)

## Demo Integrating with Materializecss

Check out a demo using MaterializeCSS here:
[Demo Using Materializecss](https://qln.link)

## Demo Using Raw CSS

Check out a demo using raw CSS:
[Demo Using Raw CSS](https://github.com/QuickCorp/qcobjects_profile_browser)

## Example of QCObjects using and manipulating canvas objects

The following code shows how QCObjects can manipulate canvas objects directly and inside components

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

	    		container = Tag('container')[0].Cast(MyContainer); // cast any javascript dom object to QC_Object class
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

# DevBlog
--------------
The [Official DevBlog of QCObjects](https://devblog.qcobjects.org/) is hosted on [Hashnode](https://hashnode.com/). The DevBlog is personally written by Jean Machuca, the author of [QCObjects](https://qcobjects.com) and and he is explaining in detail how are the best practices and giving the best tips and tricks to use the most advanced features of QCObjects.

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

 [![Become a Patreon ](https://c5.patreon.com/external/logo/become_a_patron_button.png)](https://www.patreon.com/join/qcobjects?)


# Installing
------------


## Using QCObjects with Atom:

```shell
> apm install qcobjects-syntax
```
https://atom.io/packages/qcobjects-syntax

## Using QCObjects in Visual Studio Code:

[![Badge for installs for Visual Studio Code extension Quickcorp.QCObjects-vscode](https://vsmarketplacebadge.apphb.com/version/Quickcorp.QCObjects-vscode.svg)](https://marketplace.visualstudio.com/items?itemName=Quickcorp.QCObjects-vscode)

https://marketplace.visualstudio.com/items?itemName=Quickcorp.QCObjects-vscode

## Installing with NPM:

```shell
> npm install qcobjects-cli -g && npm install qcobjects --save
```
![screenshot2](https://qcobjects.dev/doc/img/QCObjects-Quick-Start.gif)

## Installing the docker playground:

```shell
docker pull -a quickcorp/qcobjects-playground && docker run -it --name qcobjects-playground --rm -it quickcorp/qcobjects-playground
```

![screenshot3](https://qcobjects.dev/doc/img/QCObjects-Docker-Playground.gif)

## One-Step Installation Script for Ubuntu 18.x

WARNING: Do this only in a fresh|blank|brandnew installation of Ubuntu 18.x, don't do it into an existing production environment. You will be asked for sudo grant permission.


```shell
curl -L https://qcobjects.dev/install_qcobjects_ubuntu18x.sh |sh
```

WARNING: I'm not responsible for damaging your infrastructure by using an automated installation script into an unsafe network. Make sure all your repos and scripts are under HTTPS with a valid certificate. For better safe results I recommended you to download the script, edit it for your special needs and then execute it in your machine as local.

## One-Step Installation Script for macOS
Tested on macOS Catalina 10.15.3

```shell
curl -L https://qcobjects.dev/install_qcobjects_macOS.sh | zsh
```

## Install and test QCObjects on Microsoft Windows OS

1.- Install the latest version of NodeJS for Windows from [here](https://nodejs.org/)
2.- From cmd install qcobjects-cli using npm

```powershell
npm i qcobjects-cli -g
```
3.- Create a directory for your project

```powershell
md mynewproject && cd mynewproject
```
4.- Create a new QCObjects Progressive Web Application

```powershell
qcobjects create mynewproject --pwa
```

![screenshot](https://qcobjects.dev/doc/img/QCObjects-running-on-Windows64bit.gif)


## QCObjects Multi-Cloud Installation

QCObjects is natively supported by the most famous cloud providers. In most of them, you can install it and set everything up and running in just one step.

### DigitalOcean One-Click Droplet

If you want to forget apt-get and the config guide. Go straight to deploying your project using a preconfigured 1-Click App including QCObjects CLI, QCObjects-SDK and QCObjects HTTP2 Built-In Server, then spin it up on a Droplet VM or a Kubernetes cluster in 60 seconds or less.

[Create Your Own QCObjects DigitalOcean Droplet here](https://marketplace.digitalocean.com/apps/qcobjects)

### AWS Amazon Machine Images (AMI)

An Amazon Machine Image (AMI) provides the information required to launch an instance. You must specify an AMI when you launch an instance. You can launch multiple instances from a single AMI when you need multiple instances with the same configuration. You can use different AMIs to launch instances when you need instances with different configurations.

An AMI includes the following:

- One or more EBS snapshots, or, for instance-store-backed AMIs, a template for the root volume of the instance (for example, an operating system, an application server, and applications).
- Launch permissions that control which AWS accounts can use the AMI to launch instances.
- A block device mapping that specifies the volumes to attach to the instance when it's launched.

[Start building your QCObjects AMI here](https://aws.amazon.com/marketplace/pp/B07YZRH7VB)

### Amazon Web Services AWS PIB (Private Amazon Machine Image)


A Private Image lets you build a new AMI by installing AWS Marketplace software on an image you choose from the AMIs available to your AWS account, this allows you to better meet internal specifications for security, management and compliance. As with standard AWS Marketplace AMIs, each Private Image will comprise a subscription for the installed product and have software usage billed via AWS Marketplace.

[Start building your QCObjects Amazon Private Image here](https://aws.amazon.com/marketplace/pp/B07YZRH7VB)


## Using the development version code in the straight way into HTML5:

```html
<script type="text/javascript" src="https://qcobjects.dev/QCObjects.js"></script>
```

## Using the CDN minified version code from jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/qcobjects/QCObjects.min.js"></script>
```

## Using the latest non-minified version from jsDelivr CDN

```html
<script src="https://cdn.jsdelivr.net/npm/qcobjects/QCObjects.js"></script>
```

## Using UNPKG CDN

```html
<script src="https://unpkg.com/qcobjects@latest/QCObjects.js"></script>
```

## Using CDNJS

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qcobjects/[VERSION]/QCObjects.js"></script>
```

Where [VERSION] is the corresponding latest version using numeric notation, example: to use version 2.1.420:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qcobjects/2.1.420/QCObjects.js"></script>
```

You don't need to minify QCObjects, but if you still want to use the minified code, you can do this:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/qcobjects/2.1.420/QCObjects.min.js"></script>
```

Again, Change 2.1.420 to the number of the version that you want to use.


# Reference
------------

## Essentials
Here are the essentials symbols and concepts of [QCObjects](https://qcobjects.dev) Reference

### QC_Object

Basic Type of all elements

### ComplexStorageCache

With **ComplexStorageCache** you can handle a cache for any object and save it in the local storage.

#### Usage:
```javascript
var cache = new ComplexStorageCache({
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

Class is a special function to help you to declare a class in an easier and compatible way. It works cross-browser, and I hope ECMA could adopt something like that in the future. To let javascript not to be confuse about this, [QCObjects](https://qcobjects.dev) uses "Class" not "class" (note the Camel Case).

#### Usage:

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


### QC_Append, append method

This is a special method inserted to make your life easier when you want to dynamically manipulate the **DOM**. You can insert even a **Component**, a **QCObjects** Object or a **DOM** Element inside another **HTMLElement**.

##### Usage:
```javascript
[element].append([object or element]);
```
#### Example:
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



### The \_super\_ method

When you extend a QCObjects class from another one, you can use \_super\_ method to get an instance from the main class definition.

#### Usage:
```javascript

_super_('MySuperClass','MySuperMethod').call(this,params)
// where this is the current instance and params are method parameters
```

#### Example:
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

### New

Creates an object instance of a QCObjects class definition.

#### Usage:

```javascript
let objectInstance = New(QCObjectsClassName, properties);
// where properties is a single object with the property values
```
NOTE: In the properties object you can use single values or getter as well but they will be executed once.

#### Example:

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


### InheritClass
A single common used QCObjects class definition.

### ClassFactory
Use **ClassFactory** to get the Class declaration factory instance of a QCObjects Class
You can get either a Class factory from a Package or from the Class queue stack

To retreive the ClassFactory from the Class queue stack you can simply use the name of a Class as calling directly in the code.

#### Example:

```javascript
/* When you declare MyClass using Class() it is instantly added to the Class queue stack
* and you can get the factory either using ClassFactory() or calling the name MyClass straight in the code
*/
Class('MyClass',{
	a:1
})
console.log(MyClass == ClassFactory('MyClass')) // it will show true
```

```javascript
/* On the other hand, ClassFactory() will be so useful when you define a Class into a Package
*/
Package('org.quickcorp.package1',[
	Class('MyClass',{
		a:1
	})
])
console.log(MyClass == ClassFactory('MyClass')) // it will still show true
// The following line will show true as well
console.log(MyClass == ClassFactory('org.quickcorp.package1.MyClass'))
```

```javascript
/* The interesting thing is when you have declared more than one Class using the
* same name MyClass into different packages but with different property default values
* and even properties
*/
Package('org.quickcorp.package1',[
	Class('MyClass',{
		a:1
	})
])
Package('org.quickcorp.package2',[
	Class('MyClass',{
		a:2,
		b:1
	})
])
// The last declaration of MyClass will be the one survival in the Class queue
// so the reference MyClass in the code will point to that one
console.log(MyClass == ClassFactory('MyClass')) // it will still show true

// In this case as the MyClass defined in the org.quickcorp.package1 will not be the same
// as the one in the org.quickcorp.package2, but the MyClass in the package2 is the last one
// The following line will show false
console.log(MyClass == ClassFactory('org.quickcorp.package1.MyClass'))

// The following line will show true
console.log(MyClass == ClassFactory('org.quickcorp.package2.MyClass'))

// The following line will show false
console.log(ClassFactory('org.quickcorp.package1.MyClass') == ClassFactory('org.quickcorp.package2.MyClass'))
```

The above examples are intentionally done to explain and show how the scope of the Class definitions in QCObjects is protected and handled and it is reflected in the use of ClassFactory.

So you are gonna want to use ClassFactory when you need complete control over the scope when extending Classes

**Example**

```javascript
// When normally you extend a Class using the Class queue you do:
Class('MyExtendedClass',MyInheritClass,{
	extendedProp1: 'value of prop',
	extendedProp2: 2
})

```

```javascript
/* But to protect the scope from misleading by reference, you can asure that MyInheritClass
is the one you want to extend by declaring it into a package and then extend it
*/
Package('org.quickcorp.mypackage1',[
	Class('MyInheritClass',{
		sourceProp:1
	}),
])

// The following code is a definition of MyExtendedClass into a different package
// org.quickcorp.package2
// extending MyInheritClass using ClassFactory to retreive the Class from the source package
// org.quickcorp.mypackage1
Package('org.quickcorp.mypackage2',[
	Class('MyExtendedClass',ClassFactory('org.quickcorp.mypackage1.MyInheritClass'),{
		extendedProp1: 'value of prop',
		extendedProp2: 2
	})
])

// this will show the number 1 (as the inherited default value of sourceProp)
console.log(New(MyExtendedClass).sourceProp)

```

### \_Crypt
With \_Crypt you can encode serializable objects by a passphrase

#### Example (1):

```javascript
 var _string = New(_Crypt,{string:'hello world',key:'some encryption md5 key'});
 console.log(_string._encrypt());
 console.log(_string._decrypt()); // decodes encrypted string to the source
 ```
 #### Example (2):

 ```javascript
 _Crypt.encrypt('hola mundo','12345678866');
 _Crypt.decrypt('nqCelFSiq6Wcpw==','12345678866');
```


### GLOBAL

**GLOBAL** is a special QCObjects class to reach the global scope. It has a set and a get method to help you to manage the internal GLOBAL properties.

#### Example:

```javascript
GLOBAL.set('globalProperty1','some value in global scope');
var globalProperty1 = GLOBAL.get('globalProperty1');
```

### CONFIG

CONFIG is a smart class that manages the global settings of your application. You can get the properties either from a config.json or from the memory previously saved by a set() call.

#### Usage from memory:

1.- In your initial code set the CONFIG initial values:
```javascript
CONFIG.set('someSettingProperty','some initial value');
```
2.- Then you can access it from anywhere in your code by using the get method:
```javascript
var someSettingProperty = CONFIG.get('someSettingProperty');
```

#### Usage from config.json:

1.- You need to indicate first that you are using a config.json file by setting the "useConfigService" value to true
```javascript
CONFIG.set('useConfigService',true); // using config.json for custom settings config
```
2.- Once you have set the value above QCObjects will know and look to the next CONFIG settings into the file config.json in the basePath folder of your application.

#### Usage from an encrypted config.json:

There is also a way to use an encrypted config.json file in order to protect your settings robots that can steal unprotected data from your web application (like API keys web crawlers).

To encrypt your json file go to https://config.qcobjects.dev, put your domain and the config.json content. The tool will encrypt your json and you can copy the encrypted content to insert it in your config.json file. QCObjects will know the data is encrypted and the process to decode the data will be transparent for you.


### waitUntil
waitUntil is a helper just in case you are in trouble trying to run a code before a condition is true. The code inside waitUntil will be executed once.

NOTE: This is useful in some cases but an excessive use is not recommended.

#### Usage:
```javascript
waitUntil(()=>{
  // the code that will be executed after the condition is true
},()=>{return condition;});
// where condition is what I want to wait for
```

#### Example:
```javascript
let someVar = 0;
waitUntil(()=>{
  console.log('someVar is present');
},()=>{return typeof someVar != 'undefined';});
// where condition is what I want to wait for
```


### Package
Defines a QCObjects package and returns it.

#### Usage:
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

The packages loading technique present in QCObjects is promise based and also scope oriented. You can ask if a package is loaded simply calling the Package() function passing a package name as an argument.


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

#### Usage:

```javascript
Export('name of symbol');
```

#### Example:
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

### Cast

Use the Cast method of any DOM element to get the properties of another type of object. This is useful to transform an object type to another giving more flexibility in your code.

#### Usage:

```javascript
let resultObject = [element or QCObjects type].Cast(objectToCastFrom);
```

Where objectToCastFrom is an object to get the properties from and put it into the result object returned by Cast.

#### Example:

```javascript
Class('MyOwnClass',{
  prop1:'1',
  prop2:2
});

let obj = document.createElement('div').Cast(MyOwnClass);
```

The above code will create a DOM object and Cast it to MyOwnClass. Because of MyOwnClass is a QCObjects type class, obj will now have a prop1 and prop2 properties, and will now be a QCObjects object instance with a body property that is a div element.

### Tag

Tag is a useful function to select any DOM element using selectors. Tag will always return a list of elements, that you can map, sort, and filter as any other list.

#### Usage:

```javascript
var listOfElements = Tag(selector);
```

Where selector is a DOM query selector.

#### Example:

```html
<!DOCTYPE html>
<html>
    <head>
    	<title>Demo</title>
    	<script type="text/javascript" src="https://qcobjects.dev/QCObjects.js"></script>
    </head>
    <body>
    <div class="myselector">
    <p>Hello world</p>
    </div>
    <script>
    Ready(()=>{
      Tag('.myselector > p').map((element)=>{
        element.innerHTML = 'Hello world! How are you?';
      });
    });
    </script>
    </body>
</html>
```

In the above code, a paragraph element was created inside a div with a css class named myselector by html, and then is  modified dynamically using the QCObjects Tag function. If you are familiar with query selector frameworks like JQuery, you will love this one.

### Ready
Assign a function to run after everything is done by QCObjects and after the window.onload event. Use it to prevent 'undefined' DOM objects error.

#### Usage:
```javascript
Ready(()=>{
  // My init code here!
});
```
Note that if you define dynamic components by using a HTML "component" tag, the dynamic content load will not trigger Ready events. To catch code everytime a dynamic component is loaded, use a Controller done method instead.

You will use Ready implementation mostly when you want to implement QCObjects in conjunction with another framework that needs it.

### Component Class
A QCObjects class type for components.

#### Properties

**[Component].domain**
Returns a string with the domain of your application. It is automatically set by QCObjects at the load time.

**[Component].basePath**
Returns a string with the base path url of your application. It is automatically set by QCObjects at the load time.

NOTE: If you want to change the components base path, you have to use _CONFIG.set('componentsBasePath','new path relative to the domain')_ in your init code.

**[Component].templateURI**
Is a string representing the component template URI relative to the domain. When is set, the component will load a template and append the inner content into the body childs as a part of the DOM. To set this property, it is recommended to use the ComponentURI helper function.

**[Component].tplsource**
Is a string representing the source where the template will be loaded. It can be "default" or "none". A value of "default" will tell QCObjects to load the template from the templateURI content. A value of "none" will tell QCObjects not to load a template from anywhere.

**[Component].url**
Is a string representing the entire url of the component. It is automatically set by QCObjects when the component is instantiated.

**[Component].name**
Is a string representing the name of a component. The name of a component can be any alphanumeric value that identifies the component type. It will be internally used by ComponentURI to build a normalised component template URI.

**[Component].method**
Is a string representing a HTTP or HTTPS method. By default, every component is set to use the "GET" method. In the most of cases, you don't need to change this property.

**[Component].data**
Is an object representing the data of the component. When QCObjects loads a template, it will get every property of data object and bind it to a template label representing the same property inside the template content between double brakets (example: {{prop1}} in the template content will represent data.prop1 in the component instance).
NOTE: To refresh the data bindings it is needed to rebuild the component (see the use of [Component].rebuild() method for more details ).

**[Component].reload**
Is a boolean value that tells QCObjects when to force reload the content of a component from the template or not. If its value is true, the template content will be replacing the current DOM childs of the component body element. If its value is false, the template content will be added after the las component body child.

**[Component].cached**
Is a boolean value that tells QCObjects if the component needs to be cached or not. When a component is cached, the template content loaded from templateURI will be loaded once. You can set this property either as a static property of the Component Class to set the default value for every next component object instance, or setting the individual value of the property in every component definition. In a world where the performance matters, to give more flexibility to the cache behaviour is needed more than ever.

**[Component].routingWay**
Returns a string representing the routing way. Its value can be "hash", "pathname" or "search".
NOTE: To change the routingWay of every component it is recommended to use CONFIG.set('routingWay','value of a valid routing way') in your init code.

**[Component].validRoutingWays**
Returns a list representing the valid routing ways.  QCObjects uses this to internally validate the routingWay which was used to build the component routings.

**[Component].routingNodes**
Returns a NodeList object representing the list of nodes that were loaded by the component routing builder.

**[Component].routings**
Returns a list with the component routings built when the component was instantiated.

**[Component].routingPath**
Returns a string representing the current routing path

**[Component].routingSelected**
Returns an object representing the current routing of the component

**[Component].subcomponents**
Returns a list of components that are childs of the component instance.

**[Component].body**
Is a DOM element representing the body of the component.
NOTE: Every time a component body is set, it will trigger the routings builder for this component.

#### Methods
**[Component].set('prop',value)**
Sets a value for a component property.

**[Component].get('prop')**
Returns the value of a component property

**[Component].rebuild()**
Rebuilds the component. It will force a call for the componentLoader with this component when it's needed.

**[Component].Cast(ClassName or ComponentClassName)**
Returns the cast of a component definition into another one. This is useful to dynamically merge components definitions.

**[Component].route()**
Forces the component routings builder to reload the routings of the component. This will result in a rebuild call when it's needed.

**[Component].fullscreen()**
Puts the component in fullscreen mode.

**[Component].closefullscreen()**
Closes the fullscreen mode.

**[Component].css(css object)**
Sets the css properties for the component.

**[Component].append(component or QCObjects object)**
Appends a component as a child of the current component body

**[Component].attachIn(selector)**
Attaches a current component body to any element in the given selector.

### Component HTML Tag
Is a HTML tag representation of a component instance. Every declaration of a `<component></component>` tag will generate a related instance of a QCObjects component. While a component tag is not an instance itself, you can even define some instance properties by setting the related tag attribute when it is available.

#### Available attributes
Below is a list of the available attributes for a component tag

##### The name Attribute
**`<component name>`**
Sets the name of the related component instance built by QCObjects.

###### Usage:
```html
<component name="name_of_component"></component>
```

###### Example:
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
    	<title>Demo</title>
    	<script type="text/javascript" src="https://qcobjects.dev/QCObjects.js"></script>
    </head>
    <body>
      <!-- this will load the contents of ./templates/main[.tplextension] file -->
      <component name="main"></component>
    </body>
</html>
```

##### The cached Attribute
**`<component cached>`**
Sets the cached property if the related instance of a component.

NOTE: Only a value of "true" can be set in order to tell QCObjects that the component template content has to be cached. Any other value will be interpreted as false.

###### Usage:
```html
<component name="name_of_component" cached="true"></component>
```

##### The data property tag declaration
 **`<component data-property1 data-property2 ...>`**
Sets a static value of a property for the data object in the component instance.

NOTE: Data property tag declaration was thought with the purpose to give some simple way to mocking a dynamic component with template assignments. Don't use it thinking it is a bidirectional way data binding. While you can get a bidirectional way behaviour accesing a data object from a component instance, it is not the same for the component tag. Data property declaration in component tags is only one way data binding because of components tree architecture.

##### The controllerClass Attribute
**`<component controllerClass>`**
Defines a custom Controller Class for the component instance

###### Usage:
```html
<component name="name_of_component" controllerClass="ControllerClassName"></component>
```


##### The viewClass Attribute
 **`<component viewClass>`**
Defines a custom View Class for the component instance

###### Usage:
```html
<component name="name_of_component" viewClass="ViewClassName"></component>
```


##### The componentClass Attribute
**`<component componentClass>`**
Defines a custom Component Class for the component instance

###### Usage:
```html
<component name="name_of_component" componentClass="ComponentClassName"></component>
```

##### The effecClass Attribute
**`<component effectClass>`**
Defines a custom Effect Class for the component instance

###### Usage:
```html
<component name="name_of_component" effectClass="EffectClassName"></component>
```

##### The template-source Attribute
**`<component template-source>`**
Sets the tplsource property of the related instance of a component. Possible values are "none" or "default".

###### Usage:
```html
<component name="name_of_component" template-source="none"></component>
```

##### The tplextension Attribute
**`<component tplextension>`**
Sets the tplextension property of the related instance of a component. Possible values are any file extension. Default value is "html"

###### Usage:
```html
<component name="name_of_component" tplextension="tpl.html"></component>
```


#### ComponentURI
Is a helper function to let you define the templateURI for a component in a normalised way.

##### Example:
```javascript
var templateURI = ComponentURI({
  'COMPONENTS_BASE_PATH':CONFIG.get('componentsBasePath'),
  'COMPONENT_NAME':'main',
  'TPLEXTENSION':"tpl.html",
  'TPL_SOURCE':"default"
});

console.log(templateURI); // this will show something like "templates/components/main.tpl.html" depending on your CONFIG settings
```


#### componentLoader
Loads a component instance in a low level, and appends the component template content to the component body. In the most of cases you won't need to call componentLoader in order to load a component. This is automatically called by QCObjects when it's needed. componentLoader returns a promise that is resolved when the component load is done and rejected when the component load was failed.

##### Usage:
```javascript
 [Promise] componentLoader(componentInstance,load_async)
```

Where componentInstance is a component instance created by _`New(ComponentDefinitionClass)`_

##### Example:
```javascript
componentLoader(componentInstance,load_async).then(
  (successStandardResponse)=>{
    // component load successful
    var request = successStandardResponse.request;
    var component = successStandardResponse.component;
  },(failStandardResponse)=>{
    // component load failed
    var component = failStandardResponse.component;
  });
```


#### buildComponents
Rebuilds every component that is a child element of the DOM element who owns the method. In the most of cases, you won't need to call buildComponents in order to build or rebuild every component in the DOM. This is automatically called by QCObjects when it's needed.

##### Usage:
```javascript
[element].buildComponents()
```

##### Example:
```javascript
document.buildComponents()
```


### Controller
A built-in QCObjects Class to define a controller

### View
A built-in QCObjects View to define a view

### VO
A built-in QCObjects Class to define a value object


### Service
A QCObjects class type for services.


#### Properties

**[Service].domain**
Returns a string with the domain of your application. It is automatically set by QCObjects at the load time.

**[Service].basePath**
Returns a string with the base path url of your application. It is automatically set by QCObjects at the load time.

**[Service].url**
Is a string representing the entire url of the service. It can be absolute or relative to the basePath when it applies. It can be also an external url.

NOTE: To load a service of an external resource you need to specify the external parameter to true using serviceLoader.

**[Service].name**
Is a string representing the name of a component. The name of a service can be any alphanumeric value that identifies the service instance. It isn't a unique ID but only a descriptive name.

**[Service].method**
Is a string representing a HTTP or HTTPS method. Possible values are: "GET", "POST", "PUT", ... any other that is accepted by REST services calls.

**[Service].data**
Is an object representing the data of the service. When QCObjects loads a service. It receives the response and interpretes it as a  template. So once a service response is obtained, it will get every property of data object and bind it to a template label representing the same property inside the template content between double brakets (example: {{prop1}} in the template content will represent data.prop1 in the service instance).


**[Service].cached**
Is a boolean value that tells QCObjects if the service response needs to be cached or not. When a service is cached, the template content loaded from the service url will be loaded only once. You have to set this value to false for every Service instance you define in order to asure the service is loaded from the resource but not the storage cache.

#### Methods
**[Service].set('prop',value)**
Sets a value for a service property.

**[Service].get('prop')**
Returns the value of a service property


### serviceLoader
Loads a service instance and returns a promise that is resolved when the service has a successful response load and is rejected when it fails loading the response.

#### Usage:
```javascript
[Promise] serviceLoader(serviceInstance)
```

#### Example:
```javascript
Class('MyTestService',Service,{
    name:'myservice',
    external:true,
    cached:false,
    method:'GET',
    headers:{'Content-Type':'application/json'},
    url:'https://api.github.com/orgs/QuickCorp/repos',
    withCredentials:false,
    _new_:()=>{
      // service instantiated
    },
    done:()=>{
      // service loaded
    }
});
var service = serviceLoader(New(MyTestService,{
  data:{param1:1}
})).then(
  (successfulResponse)=>{
    // This will show the service response as a plain text
    console.log(successfulResponse.service.template);
  },
  (failedResponse)=>{

  });
```


### JSONService
Is a built-in definition for a JSON Service Class

#### Properties

**[JSONService].domain**
Returns a string with the domain of your application. It is automatically set by QCObjects at the load time.

**[JSONService].basePath**
Returns a string with the base path url of your application. It is automatically set by QCObjects at the load time.

**[JSONService].url**
Is a string representing the entire url of the service. It can be absolute or relative to the basePath when it applies. It can be also an external url.

NOTE: To load a service of an external resource you need to specify the external parameter to true using serviceLoader.

**[JSONService].name**
Is a string representing the name of a component. The name of a service can be any alphanumeric value that identifies the service instance. It isn't a unique ID but only a descriptive name.

**[JSONService].method**
Is a string representing a HTTP or HTTPS method. Possible values are: "GET", "POST", "PUT", ... any other that is accepted by REST services calls.

**[JSONService].data**
Is an object representing the data of the service. When QCObjects loads a service. It receives the response and interpretes it as a  template. So once a service response is obtained, it will get every property of data object and bind it to a template label representing the same property inside the template content between double brakets (example: {{prop1}} in the template content will represent data.prop1 in the service instance).


**[JSONService].cached**
Is a boolean value that tells QCObjects if the service response needs to be cached or not. When a service is cached, the template content loaded from the service url will be loaded only once. You have to set this value to false for every Service instance you define in order to asure the service is loaded from the resource but not the storage cache.

#### Methods
**[JSONService].set('prop',value)**
Sets a value for a service property.

**[JSONService].get('prop')**
Returns the value of a service property

#### Example:
```javascript
Class('MyTestJSONService',JSONService,{
    name:'myJSONservice',
    external:true,
    cached:false,
    method:'GET',
    withCredentials:false,
    url:'https://api.github.com/orgs/QuickCorp/repos',
    _new_:function (){
      // service instantiated
      delete this.headers.charset; // do not send the charset header
    },
    done:function (result){
      _super_('JSONService','done').call(this,result);
    }
});
var service = serviceLoader(New(MyTestJSONService,{
  data:{param1:1}
})).then(
  (successfulResponse)=>{
    // This will show the service response as a JSON object
    console.log(successfulResponse.service.JSONresponse);
  },
  (failedResponse)=>{

  });
```

### ConfigService
Is a built-in Class definition to load the CONFIG settings from a config.json file

#### Example:
```javascript
// To set the config.json file relative url
ConfigService.configFileName='config.json'; // it is done by default
CONFIG.set('useConfigService',true); // using config.json for custom settings config
```


### SourceJS

Use SourceJS as a static Class that is helping you to load external JS dependencies. This is commonly used to load libraries that are external and that not follow the QCObjects packages syntax.

#### Example:
```javascript
Class("MyNewController",Controller,{
	_new_:function (){
		var controller = this;
		controller.dependencies.push(
			New(SourceJS,{
				external:false,
				url:'doc/js/my-js-resource.js',
				done:function(){
					logger.debug("Dependency loaded")
				}})
			);
	}
})
```

### SourceCSS

A static Class that is used to load an external CSS resource.

```javascript
Class("MyNewController",Controller,{
	dependencies:[],
	done (){
		this.dependencies.push(New(SourceCSS,{
			external:false,
			url:CONFIG.get('basePath')+'css/my-css-resource.css'
		}));
	}
});
```

### Effect
### Timer

## List and Math Functions

### ArrayList

A Class definition used to manage lists

```javascript
let myvar = New(ArrayList,[1,2,3]);
```

### ArrayCollection

An extended definition for advanced handling of collections

```javascript
let collection = New(ArrayCollection, {source:[0,1,2]});
```

### [ArrayList or Array].unique

Filters an Array or an ArrayList object to obtain only unique elements.
NOTE: It only filters a single value sequence.

```javascript
let my_unique_list = [0,1,2,1,2].unique()
// will result in: my_unique_list = [ 0, 1, 2 ]
```

### [ArrayList or Array].table

This is intended for shell scripts use only. It shows a table of the values in the list.

```javsascript
["a","b","c","d"].table()
// it will show
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│    0    │  'a'   │
│    1    │  'b'   │
│    2    │  'c'   │
│    3    │  'd'   │
└─────────┴────────┘
```

### [ArrayList or Array].sort

Sorts the elements of the array or list.

```javascript
let my_sorted_array = [3,3,4,0,2,1].sort()
// my_sorted_array = [ 0, 1, 2, 3, 3, 4 ]
```

```javascript
let my_sorted_list = New(ArrayList,{source:[3,3,4,0,2,1]}).source.sort()
// my_sorted_list = [ 0, 1, 2, 3, 3, 4 ]
```


### [ArrayList or Array].sortBy

Sorts a list of objects by a property value.

```javascript
let my_ordered_list = [
												{"b":1,"a":2},
												{"b":2,"a":1},
												{"b":3,"a":3},
											].sortBy("a")
// it will result in
[
	{ b: 2, a: 1 },
	{ b: 1, a: 2 },
	{ b: 3, a: 3 }
]
```

### [ArrayList or Array].matrix

Generates a matrix in one dimension.

#### Usage
**[].matrix (length, [value])** Where **length** is the number of elements and the optional **value** is the value of each element, it can be any value of any type.

```javascript
let matrix = Array.matrix(10);
// matrix = [
  0, 0, 0, 0, 0,
  0, 0, 0, 0, 0
]
```

```javascript
let matrix = ArrayList.matrix(10,1);
// matrix = [
  1, 1, 1, 1, 1,
  1, 1, 1, 1, 1
]
```

```javascript
let a = 1, b = 2;
let c = ArrayList.matrix(10,{a,b})
// c = [
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 },
 { a: 1, b: 2 }
]
```


### [ArrayList or Array].matrix2d

Creates a 2D matrix.

```javsascript
let matrix2d = ArrayList.matrix2d(2,1);
// [ [ 1, 1 ], [ 1, 1 ] ]
```

### [ArrayList or Array].matrix3d

Creates a 3D matrix.

```javascript
let matrix3d = ArrayList.matrix3d(3,"a");
// it will result in a 3x3 matrix with the value "a" on every element
[
  [ [ 'a', 'a', 'a' ], [ 'a', 'a', 'a' ], [ 'a', 'a', 'a' ] ],
  [ [ 'a', 'a', 'a' ], [ 'a', 'a', 'a' ], [ 'a', 'a', 'a' ] ],
  [ [ 'a', 'a', 'a' ], [ 'a', 'a', 'a' ], [ 'a', 'a', 'a' ] ]
]
```

### range

Python like function to create a range list. You can use it in conjunction with ArrayList.matrix, ArrayList.matrix2d and ArrayList.matrix3d to generate complex matrix ranges.
#### Usage

range(length) or range(initialIndex, finalIndex)
range() without any params returns an empty list
range(0) returns a list with one element with value 0


```javascript
logger.debugEnabled=true;

for (var i in range(10)){
	(!isNaN(i) && logger.debug(i))
}

// the above code will show
[DEBUG] 0
[DEBUG] 1
[DEBUG] 2
[DEBUG] 3
[DEBUG] 4
[DEBUG] 5
[DEBUG] 6
[DEBUG] 7
[DEBUG] 8
[DEBUG] 9
[DEBUG] 10
```

```javascript
logger.debugEnabled=true;

// same result will be obtained iterating the range first
for (var i in {...range(10)}){
	logger.debug(i)
}

// the above code will show
[DEBUG] 0
[DEBUG] 1
[DEBUG] 2
[DEBUG] 3
[DEBUG] 4
[DEBUG] 5
[DEBUG] 6
[DEBUG] 7
[DEBUG] 8
[DEBUG] 9
[DEBUG] 10
```

```javascript
// a bit shorter syntax for the same result
range(10).map(n=>logger.debug(n))
```

```javascript
let normalizedMatrix = ArrayList.matrix(3,range(2));
// normalizedMatrix = [ [ 0, 1, 2 ], [ 0, 1, 2 ], [ 0, 1, 2 ] ]
```

```javascript
let my3dmatrix = ArrayList.matrix3d(3,range(0,1));
// my3dmatrix will be
[
  [
    [ [0, 1], [0, 1], [0, 1] ],
    [ [0, 1], [0, 1], [0, 1] ],
    [ [0, 1], [0, 1], [0, 1] ]
  ],
  [
    [ [0, 1], [0, 1], [0, 1] ],
    [ [0, 1], [0, 1], [0, 1] ],
    [ [0, 1], [0, 1], [0, 1] ]
  ],
  [
    [ [0, 1], [0, 1], [0, 1] ],
    [ [0, 1], [0, 1], [0, 1] ],
    [ [0, 1], [0, 1], [0, 1] ]
  ]
]
```

## SDK

### SDK Components

#### org.quickcorp.components.ShadowedComponent

#### org.quickcorp.components.FormField

#### org.quickcorp.components.ButtonField

#### org.quickcorp.components.InputField

#### org.quickcorp.components.TextField

#### org.quickcorp.components.EmailField

#### org.quickcorp.components.GridComponent

#### org.quickcorp.components.ModalEnclosureComponent

#### org.quickcorp.components.ModalComponent

#### org.quickcorp.components.SwaggerUIComponent

#### org.quickcorp.components.splashscreen.VideoSplashScreenComponent

### SDK Controllers

#### org.quickcorp.controllers.GridController

#### org.quickcorp.controllers.DataGridController

#### org.quickcorp.controllers.ModalController

#### org.quickcorp.controllers.FormValidations

#### org.quickcorp.controllers.FormController

#### org.quickcorp.controllers.SwaggerUIController

### SDK Effects

#### org.quickcorp.tools.effects.Move

#### org.quickcorp.tools.effects.MoveXInFromRight

#### org.quickcorp.tools.effects.MoveXInFromLeft

#### org.quickcorp.tools.effects.MoveYInFromBottom

#### org.quickcorp.tools.effects.MoveYInFromTop

#### org.quickcorp.tools.effects.RotateX

#### org.quickcorp.tools.effects.RotateY

#### org.quickcorp.tools.effects.RotateZ

#### org.quickcorp.tools.effects.Rotate

#### org.quickcorp.tools.effects.Fade

#### org.quickcorp.tools.effects.Radius

#### org.quickcorp.tools.effects.Resize

#### org.quickcorp.tools.effects.WipeLeft

#### org.quickcorp.tools.effects.WipeRight

#### org.quickcorp.tools.effects.WipeUp

#### org.quickcorp.tools.effects.WipeDown

### SDK Misc Tools

#### org.quickcorp.tools.canvas.CanvasTool

#### org.quickcorp.tools.layouts.BasicLayout

### SDK Views

#### org.quickcorp.views.GridView

### SDK i18n messages

#### org.quickcorp.i18n_messages.i18n_messages

## The QCObjects HTTP2 Built-In Server

The QCObjects HTTP2 Built-In Server will help you to test your application
in a local environment before to deploy to a production environment.
For production environment it is recommended to use QCObjects HTTP2 Built-In Server under Ubuntu 18.x or newer and NodeJS 12.x or newer.

### Start serving your files with QCObjects

To start using the QCObjects HTTP2 Built-In Server, you just go to your project path and execute the following command line in your bash shell:

```shell
> qcobjects launch mynewapp
```

or

```
> qcobjects-server
```

It will start serving the files inside the folder you are present, unsing a built-in HTTP2 Server with the default configuration settings.


### Principals of an N-Tier or Multitier architecture

QCObjects was designed to work into a professional environment. There are many ways and paradigms to use when you define your software architecture. One recommended is using a Multitier or N-Tier architecture.

The benefits of a Multitier or N-Tier architecture are scalability and reliability of the systems that are demanding higger impact and performance. To go deep into this concepts would unnecessary enlarge this reference document but you can read more about this concepts in the following external links (only for reference and study):

- [Miltitier Architecture](https://en.m.wikipedia.org/wiki/Multitier_architecture)
- [3 Tier Architecture](http://www.tonymarston.net/php-mysql/3-tier-architecture.html)
- [Milti Tier Application](https://www.techopedia.com/definition/23599/multi-tier-application)
- [N Tier Architecture System Concepts and Tips](https://www.guru99.com/n-tier-architecture-system-concepts-tips.html)


### Micro-services Principals

The main goal of a microservice is that you can compact a fragment of backend functionality in a piece of code that can be called remotely from another backend or frontend terminal. Basically you can split a high level backend service into a multiple small micro-services that can complete the task. There are thousands of good examples of this kind of pattern adoption. You can read more about this concept in the following external links (only for reference and study):

- [Microservice Patterns](https://microservices.io)
- [Microservices on Wikipedia](https://en.wikipedia.org/wiki/Microservices)

With QCObjects you can code your microservices in a way more fancy, clean and quick.

### Backend settings in config.json

You can also use config.json in the backend side to make some tunning and custom settings for backend, specially useful for making the microservice routes.

Below is an example of a customised config.json file including the backend settings:

```json
{
  "documentRoot":"/home/qcobjects/projects/mynewapp/",
  "relativeImportPath":"js/packages/",
  "basePath":"/home/qcobjects/projects/mynewapp/",
  "projectPath":"/home/qcobjects/projects/mynewapp/",
  "domain":"mynewapp.qcobjects.com",
  "dataPath":"/etc/qcobjects/data/",
  "private-cert-pem":"/etc/letsencrypt/live/mynewapp.qcobjects.com/fullchain.pem",
  "private-key-pem":"/etc/letsencrypt/live/mynewapp.qcobjects.com/privkey.pem",
  "backend":{
    "routes":[
      {
        "path":"/createaccount",
        "microservice":"org.quickcorp.backend.signup",
        "responseHeaders":{}
      }
    ]
  }
}
```

### Backend routing

Inside your config.json file you can set the backend routes for your microservices.
For every microservice route, a path and a microservice package string is required.

```json
{
  "backend":{
    "routes":[
      {
        "path":"/createaccount",
        "microservice":"org.quickcorp.backend.signup"
      }
    ]
  }
}
```

When you set up the backend routes, the QCObjects HTTP2 Built-In Server will know how to handle the calls for every path defined. For every other path that is undefined by the backend routes settings, the server will handle the call with the default behavior, that is using a static file as response if it exists.
With that in mind you can use QCObjects either to manage and serve static files or dynamically served files when you need it.

### The QCObjects Microservice Class and Package

When you set up a backend route definition, you need to specify a microservice package. This microservice package is a QCObjects definition of a package with a Microservice class extended from a BackendMicroservice class already defined by QCObjects.

Below is an example of a microservice package definition, writen in the file org.quickcorp.backend.signup.js

```javascript
'use strict';
const fs = require('fs');

Package('cl.quickcorp.backend.signup',[
  Class('Microservice',BackendMicroservice,{
    body:{
      "jsonrpc": "2.0",
      "result": "",
      "id": 1
    },
    saveToFile: function (filename,data){
      logger.debug('Writing file: '+filename);
      fs.writeFile(filename, data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    },
    post:function (data){
      let submittedDataPath = CONFIG.get('dataPath'); // this is filled out from qcobjects-server
      let filename = submittedDataPath+'signup/signup'+Date.now().toString()+'.json';
      console.log('DATA RECEIVED: '+data);
      this.saveToFile(filename,data);
    }
  })
]);

```

The above microservice is saving a file with the data received from a post request, and answering a jsonrpc 2.0 standard output. Read more about JSON RPC 2.0 Specification [here](https://www.jsonrpc.org/specification)

QCObjects HTTP2 Built-In Server will make a call to the post() method of the Microservice class definition only when a post request is made to the right path defined into the config.json referencing the name of the package as the initial indexing point of reference.

In order to allow QCObjects understand and execute your microservies in the right way, inside a microservice package, a Microservice class definition is required, and also the Microservice class definition must to extend the BackendMicroservice class that is a part of QCObjects built-in classes.


### Generating a Self-Signed Certificate with QCObjects

```shell
> qcobjects-createcert
```

### Working with a Letsencrypt HTTPS certificate, Certbot and QCObjects

# Quick Start Guide

### Quick Start your PWA (Progressive Web App)

```shell
> qcobjects create --pwa mynewapp
```

### Quick Start your AMP (Accelerated Mobile Page)

```shell
> qcobjects create --amp mynewapp
```


# Start Coding
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
	Class('FormSubmitService',JSONService,{
	    name:'mySubmitService',
	    external:true,
	    cached:false,
	    method:'POST',
	    withCredentials:false,
	    url:'https://api.github.com/orgs/QuickCorp/repos',
	    _new_:function (){
	      // service instantiated
	      delete this.headers.charset; // do not send the charset header
	    },
	    done:function (result){
	      _super_('JSONService','done').call(this,result);
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
	Class('MyCustomComponent',Component,{
	  name:'mycustomcomponent',
	  cached:false,
	  controller:null,
	  view:null,
		templateURI:ComponentURI({
			'COMPONENTS_BASE_PATH':Component.basePath,
			'COMPONENT_NAME':'mycustomcomponent',
			'TPLEXTENSION':'tpl.html',
			'TPL_SOURCE':'default'
		})
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
	Class('MainController',Controller,{
		_new_:function (){
			//TODO: Implement
			logger.debug('MainController Element Initialized');
		}
	}),
	Class('MyAccountController',Controller,{
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

## Step 5: To use into the HTML5 code you only need to do some settings between script tags:

```html
<script>
CONFIG.set('relativeImportPath','js/packages/');
CONFIG.set('componentsBasePath','templates/components/');
CONFIG.set('delayForReady',1); // delay to wait before executing the first ready event, it includes imports
CONFIG.set('preserveComponentBodyTag',false); // don't use <componentBody></componentBody> tag

Import('cl.quickcorp'); # this will import your main file: cl.quickcorp.js into js/packages/ file path
</script>
```

# QCObjects CLI Tool

## Usage

 **qcobjects** [options] [command]

## Options

 *  -V, --version                output the version number
 *  -h, --help                   output usage information

## Commands

 *  **create** [options] <appname>   Creates an app with <appname>
 *  **publish** [options] <appname>  Publishes an app with <appname>
 *  **generate-sw** <appname>        Generates the service worker  <appname>
 *  **launch** <appname>             Launches the application

## Use:
 *  $ qcobjects-cli [command] --help
 *  For detailed information of a command

# ALPHA RISE Startup
--------------------------
![alpha](https://qcobjects.dev/doc/img/ALPHA-RISE.png)

[QCObjects](https://qcobjects.dev) was invited to exhibit as an ALPHA Startup in the RISE Conf Hong Kong 2019. RISE attracts the most dynamic startups from around the world. We'll be showing how [QCObjects](https://qcobjects.dev) is making a real Global Impact to the JavaScript developers life transforming the way for coding.

If you want to find out more about RISE event check out their website [https://riseconf.com](https://riseconf.com)
