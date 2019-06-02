#!/usr/bin/env node

"use strict";
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );

require('qcobjects');

CONFIG.set('documentRootFileIndex','index.html');
CONFIG.set('documentRootFileIndex','index.html');
CONFIG.set('useConfigService',false); // this is only true useful for client web side
CONFIG.set('documentRoot','./');
CONFIG.set('serverPort',443);
CONFIG.set('private-key-pem','localhost-privkey.pem');
CONFIG.set('private-cert-pem','localhost-cert.pem');
CONFIG.set('allowHTTP1',true);
CONFIG.set('useTemplate',false);

Import(absolutePath+'/org.quickcorp.qcobjects.main.http2.server');

Class('Main',{
  _new_:()=>{
    const app = New(HTTP2Server);
    app.start();

    logger.debug('initialized');
  }
});

let __main__ = New(Main);
