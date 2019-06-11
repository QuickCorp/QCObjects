#!/usr/bin/env node

"use strict";
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );
const templatePath = path.resolve( __dirname, "./templates/apps/" )+'/';
const package_config = require(absolutePath+'/package.json');


require('qcobjects');
const welcometo = 'Welcome to \n';
const instructions = '';
const logo = ' .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P\' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ';
console.log(welcometo);
console.log(logo);
console.log(instructions);

logger.debugEnabled=true;

require(absolutePath+'/org.quickcorp.qcobjects.cli');

let switchCommander;

Class('Main',Object,{
  _new_:(o)=>{
    let main = this;

    switchCommander = New(SwitchCommander);
    switchCommander.initCommand();

    /*
    let template = New(AppTemplate,{
      compileAndSave:true
    });
    */
    logger.debug('initialized');


  }
});

let __main__ = New(Main,{});
