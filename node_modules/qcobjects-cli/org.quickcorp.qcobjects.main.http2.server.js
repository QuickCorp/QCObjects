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
const absolutePath = path.resolve( __dirname, "./" );
const Handlebars = require('handlebars');

const http2 = require('http2');
const fs = require('fs');
const mime = require("mime");
require(absolutePath+'/org.quickcorp.qcobjects.main.file.js');

Package('org.quickcorp.qcobjects.main.http2.server',[
  Class('PipeLog',{
    pipe:(o)=>{
      var _o = [];
      for (var k in o){
        if (typeof o[k] !== 'undefined'
            && o[k] !== null
            && typeof o[k] !== 'function'){
          try {
            _o.push(''+k+'='+o[k].toString());
          } catch (e){
            // error logging, do nothing
          }
        }
      }
      return _o.join(' ');
    }
  }),
  Class('HTTP2ServerResponse',{
    headers:{
      ':status': 200,
      'content-type': 'text/html'
    },
    body:'',
    request:null,
    fileDispatcher:null,
    sendFile: function (stream, fileName) {
      // read and send file content in the stream

      try {
        const fd = fs.openSync(fileName, "r");
        const stat = fs.fstatSync(fd);
        const headers = {
          "content-length": stat.size,
          "last-modified": stat.mtime.toUTCString(),
          "content-type": mime.getType(fileName)
        };
        stream.respondWithFD(fd, headers);
        stream.on("close", () => {
          console.log("closing file", fileName);
          fs.closeSync(fd);
        });
        stream.end();

      } catch (e){
        if (e.errno==-2){
          const headers = {
            ':status': 404,
            'content-type': 'text/html'
          };
          stream.write('<h1>404 - FILE NOT FOUND</h1>');
          stream.on("close", () => {
            console.log("closing file", fileName);
          });
          stream.end();
        }
      }
    },
    _generateResponse:function (){
      var response = this;
      response.fileDispatcher = New(FileDispatcher,{
        scriptname:response.request.scriptname,
        pathname:response.request.pathname,
        done:function (headers,body,templateURI,isTemplate){
          response.headers = headers;
          var stream = response.stream;
          if (isTemplate){
            response.body = body;
            stream.respond(response.headers);
            stream.write(response.body);
            stream.end();
          } else if (headers[':status']==200){
            response.sendFile(stream,templateURI);
          } else {
            stream.respond(response.headers);
            stream.end();
          }
        }
      });

    },
    _new_:function (o){
      var self = this;
      self.body = '';
      self.stream = o.stream;
      self._generateResponse();

    }
  }),
  Class('HTTP2ServerRequest',{
    scriptname:'',
    path:'',
    method:'',
    url:'',
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '',
    query: '',
    pathname: '',
    path: '',
    href: ''
  }),
  Class('HTTP2Server',{
    request:null,
    response:'',
    server:null,
    scriptname:'',
    start:function (){
      var server = this.server;

      // http2 port is 8443 but normally is used 443 by replacing current https

      const http = require('http');

      const httpServer = http.createServer((req, res) => {
        res.writeHead(301,{Location: `https://${req.headers.host}${req.url}`});
        res.end();
      });

      httpServer.listen(CONFIG.get('serverPortHTTP'));
      server.listen(CONFIG.get('serverPortHTTPS'));
    },
    _new_:function (){
      this.server = http2.createSecureServer({
        key: fs.readFileSync(CONFIG.get('private-key-pem')),
        cert: fs.readFileSync(CONFIG.get('private-cert-pem')),
        allowHTTP1:CONFIG.get('allowHTTP1')
      });
      var server = this.server;

      server.on('error', (err) => console.error(err));

      server.on('session', (session) => {
        // Set altsvc for origin https://example.org:80
        session.altsvc('h2=":8000"', 'http://'+CONFIG.get('domain'));
        session.altsvc('https=":443"','http://'+CONFIG.get('domain'))
        session.origin('http://'+CONFIG.get('domain'));
      });

      server.on('stream', (stream, headers, flags) => {
        stream.session.altsvc('h2=":8000"', stream.id);
        stream.session.altsvc('https=":443"', stream.id);
        this.request = Object.assign(New(HTTP2ServerRequest),require('url').parse(headers[':path']));
        this.request.method = headers[':method'];
        this.request.path = headers[':path'];

        if (this.request.pathname.indexOf('.')<0){
            this.request.scriptname = CONFIG.get('documentRootFileIndex');
        } else {
          this.request.scriptname = this.request.pathname.split('/').reverse()[0];
        }
        this.request.pathname = this.request.pathname.substr(0,this.request.pathname.lastIndexOf('/'));

        logger.debug(PipeLog.pipe(this.request));

        // ...

        this.response = New(HTTP2ServerResponse,{
          stream:stream,
          request:this.request
        });
      });

    }
  })
]);
