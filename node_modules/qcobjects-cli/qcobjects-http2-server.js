#!/usr/bin/env node

"use strict";
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );

require('qcobjects');

CONFIG.set('documentRootFileIndex','index.html');
CONFIG.set('projectPath',`${process.cwd()}/`);
CONFIG.set('useConfigService',false); // this is only true useful for client web side
CONFIG.set('documentRoot','./');
CONFIG.set('serverPortHTTP',80);
CONFIG.set('serverPortHTTPS',443);
CONFIG.set('private-key-pem','localhost-privkey.pem');
CONFIG.set('private-cert-pem','localhost-cert.pem');
CONFIG.set('allowHTTP1',true);
CONFIG.set('useTemplate',false);
CONFIG.set('domain','localhost');

try {
  const _config = require(CONFIG.get('projectPath')+'config.json');
  logger.debug('Loading settings from your config.json');
  for (var k in _config){
    CONFIG.set(k,_config[k]);
  }
}catch (e){
  logger.debug('No config.json file in your project');
}

require(absolutePath+'/org.quickcorp.qcobjects.main.http2.server.js');

Class('Main',{
  _new_:()=>{
    const app = New(HTTP2Server);
    app.start();

    logger.debug('initialized');
  }
});

let __main__ = New(Main);
