#!/usr/bin/env node

"use strict";
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );
const templatePath = path.resolve( __dirname, "./templates/apps/" )+'/';

require('qcobjects');
logger.debugEnabled=false;

Import(templatePath+'spa-local');


Class('Main',{
  _new_:(o)=>{
    let template = New(AppTemplate,{
      compileAndSave:true
    });
    logger.debug('initialized');
  }
});

let __main__ = New(Main);
