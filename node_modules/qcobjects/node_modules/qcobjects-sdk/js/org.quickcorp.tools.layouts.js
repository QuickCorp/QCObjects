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
  Package('org.quickcorp.tools.layouts',[
    Class('BasicLayout',Object,{
      dependencies:[],
      component:null,
      load:function (){
        this.dependencies.push(New(SourceCSS,{
          external:(CONFIG.get('useLocalSDK'))?(false):(true),
          url:(CONFIG.get('useLocalSDK'))?('css/basic-layout.css'):(CONFIG.get('remoteSDKPath')+'css/basic-layout.css')
        }));
      }
    })
  ]);

}).call(null);
