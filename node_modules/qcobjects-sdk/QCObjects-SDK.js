/**
 * QCObjects SDK 1.0
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
  var isBrowser = typeof self !== 'undefined' && typeof window !== 'undefined' &&  window === self;
  var remoteImportsPath = CONFIG.get('remoteImportsPath');
  var external = (!CONFIG.get('useLocalSDK'))?(true):(false);
  CONFIG.set('remoteImportsPath','https://sdk.qcobjects.dev/js/');
  var _imports_;
  if (isBrowser){
    _imports_ = [
      Import('org.quickcorp.models',function (){},external),
      Import('org.quickcorp.components',function (){},external),
      Import('org.quickcorp.controllers',function (){},external),
      Import('org.quickcorp.views',function (){},external),
      Import('org.quickcorp.effects',function (){},external),
      Import('org.quickcorp.tools.canvas',function (){},external),
      Import('org.quickcorp.tools.layouts',function (){},external)
    ];
  } else {
    // non-browsers environment

    var _relative_path_ = 'node_modules/qcobjects-sdk/js/';
    _imports_ = [
      Import(_relative_path_+'org.quickcorp.models',function (){},external),
      Import(_relative_path_+'org.quickcorp.components',function (){},external),
      Import(_relative_path_+'org.quickcorp.controllers',function (){},external),
      Import(_relative_path_+'org.quickcorp.views',function (){},external),
      Import(_relative_path_+'org.quickcorp.effects',function (){},external),
      Import(_relative_path_+'org.quickcorp.tools.canvas',function (){},external),
      Import(_relative_path_+'org.quickcorp.tools.layouts',function (){},external)
    ];
  }
  global._sdk_ = Promise.all(_imports_).then(function (){
    CONFIG.set('useSDK',true);
    CONFIG.set('remoteImportsPath',remoteImportsPath);

    global.__start__();

  });


}).call(null);
