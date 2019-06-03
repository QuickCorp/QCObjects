/**
 * QCObjects CLI 0.0.6
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
const path = require('path');
const fs = require('fs');
const mime = require("mime");

const absolutePath = path.resolve( __dirname, "./" );
const Handlebars = require('handlebars');

Package('org.quickcorp.qcobjects.main.file',[
  Class('FileDispatcher',{
    name:CONFIG.get('documentRootFileIndex'),
    template:'',
    templateURI:CONFIG.get('documentRootFileIndex'),
    headers:{},
    body:'',
    filename:'',
    file_extension:function (){
      return this.filename.substr(this.filename.indexOf("."));
    },
    isTemplate:function (){
      return CONFIG.get('useTemplate') && (this.file_extension()=='.html' || this.file_extension() == '.tpl.html');
    },
    _done:function (){
      var appTemplateInstance = this;
      const source = appTemplateInstance.template;
      if (appTemplateInstance.isTemplate()){
        const template = Handlebars.compile(source);
        appTemplateInstance.body = template({title: 'QCObjects'});
      } else {
        appTemplateInstance.body = source;
      }

      if (['.png',
            '.jpg',
            '.jpeg',
            '.json',
            '.html',
            '.tpl.html',
            '.css',
            '.js',
            '.svg'].includes(appTemplateInstance.file_extension())){
        appTemplateInstance.headers['content-type']=mime.getType(appTemplateInstance.templateURI);
        appTemplateInstance.done.call(appTemplateInstance,
                                      appTemplateInstance.headers,
                                      appTemplateInstance.body,
                                      appTemplateInstance.templateURI,
                                      appTemplateInstance.isTemplate());
      } else {
        appTemplateInstance.done.call(appTemplateInstance,
                                      {
                                        ':status': 403,
                                        'content-type': 'text/plain'
                                      },
                                      'FORBIDDEN','notfound.html',false);
      }
    },
    done:function (headers,body){},
    _new_:function (o){
      var scriptname = o.scriptname;
      this.filename = scriptname;
      var pathname = (o.pathname !== '')?(o.pathname+'/'):('');
      var appTemplateInstance = this;
      appTemplateInstance.done = o.done;
      appTemplateInstance.templateURI = CONFIG.get('documentRoot')+pathname+scriptname;
      appTemplateInstance.templateURI = appTemplateInstance.templateURI.replace('//','/');

      if (appTemplateInstance.isTemplate()){
        fs.readFile(appTemplateInstance.templateURI, function(err, data) {
          logger.debug('reading data from '+appTemplateInstance.templateURI);
          if (typeof data !== 'undefined'){
            appTemplateInstance.template = data.toString();
            appTemplateInstance._done.call(appTemplateInstance);
          } else {
            appTemplateInstance.headers = {
              ':status': 404,
              'content-type': 'text/html'
            };
            appTemplateInstance.done.call(appTemplateInstance,
                                          appTemplateInstance.headers,
                                          'FILE NOT FOUND','notfound.html',false);
            logger.debug('file not found');
          }
        });
      } else {
        appTemplateInstance.headers[':status']=200;
        appTemplateInstance.headers['content-type']=mime.getType(appTemplateInstance.templateURI);
        appTemplateInstance.done.call(appTemplateInstance,
                                      appTemplateInstance.headers,
                                      '',appTemplateInstance.templateURI,false);
      }

      logger.info('FileDispatcher initialized');
    }
  })
]);
