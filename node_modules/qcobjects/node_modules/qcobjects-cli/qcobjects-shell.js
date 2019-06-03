#!/usr/bin/env node

"use strict";
const welcometo = 'Welcome to \n';
const instructions = 'Type:\n .exit to quit\n .help for see a quick guide\n And any other command to execute like pure javascript \n All the QCObjects stuff is already loaded for you';
//const logo = ' .88888.    a88888b.  .88888.  dP       oo                     dP            \r\nd8\'   `8b  d8\'   `88 d8\'   `8b 88                              88            \r\n88     88  88        88     88 88d888b. dP .d8888b. .d8888b. d8888P .d8888b. \r\n88  db 88  88        88     88 88\'  `88 88 88ooood8 88\'  `\"\"   88   Y8ooooo. \r\nY8.  Y88P  Y8.   .88 Y8.   .8P 88.  .88 88 88.  ... 88.  ...   88         88 \r\n `8888PY8b  Y88888P\'  `8888P\'  88Y8888\' 88 `88888P\' `88888P\'   dP   `88888P\' \r\noooooooooooooooooooooooooooooooooooooooo88~oooooooooooooooooooooooooooooooooo\r\n                                        dP    ';
const logo = ' .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P\' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ';
const util = require('util');
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );

const package_config = require(absolutePath+'/package.json');
const vm = require('vm');
require('qcobjects');
let sandbox = {
  require:require,
  module:module,
  __dirname:'./',
  __filename:'qcobjects-shell-file.js'
};
global.context = vm.createContext(sandbox);


const runScript = (code,logOutput=false)=>{
  const options = {filename:sandbox.__filename};

  const backgroundRunScript = (code)=>{
    var output = vm.runInContext(code,global.context,options);
    return output;
  }

  var output = backgroundRunScript(code);


  if (logOutput && typeof output !== 'undefined'){
    console.log(output);
  }
}

const syncGlobal = ()=>{
  var s = 'Object.assign(this,this.constructor.constructor(\'return this\')())';
  runScript(s);
}


const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY)
  process.stdin.setRawMode(true);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'QCObjects v'+package_config.version+'> '
});

const protected_symbols = [ 'clearInterval',
  'clearTimeout',
  'setInterval',
  'setTimeout',      'queueMicrotask',
   'clearImmediate',        'setImmediate',          '_asyncLoad',
   '_fireAsyncLoad',           'asyncLoad',              'logger',
           '_Crypt',              'CONFIG',           'waitUntil',
          '_super_', 'ComplexStorageCache',         'TagElements',
           'onload',        'InheritClass',           'Component',
       'Controller',                'View',             'Service',
      'JSONService',       'ConfigService',                  'VO',
    'serviceLoader',     'componentLoader',        'ComponentURI',
         'SourceJS',           'SourceCSS',           'ArrayList',
  'ArrayCollection',              'Effect',               'Timer',
           'Export',              'Import',             'Package',
            'Class',                 'New',                 'Tag',
            'Ready',             'Contact',           'FormField',
      'ButtonField',          'InputField',           'TextField',
       'EmailField',       'GridComponent',      'GridController',
         'GridView',                'Move',             'RotateX',
          'RotateY',             'RotateZ',              'Rotate',
             'Fade',              'Radius',          'CanvasTool',
      'BasicLayout'
]

const preloaded_scripts = [
  "require('qcobjects')",
  "Object.assign(this,this.constructor.constructor(\'return this\')())"
];

for (var k in preloaded_scripts){
  runScript(preloaded_scripts[k].trim());
}


console.log(welcometo);
console.log(logo);
console.log(instructions);
rl.prompt(true);

rl.on('line', (line) => {
  var codeline = line.trim();
  switch (true) {
    case codeline=='hello':
      console.log('world!');
      break;
    case codeline=='.exit':
      rl.close();
      break;
    default:
      try{
        runScript(codeline,true);
        syncGlobal(sandbox);
      }catch (e){
        console.log('An exeption ocurred while trying to run your awesome code! ');
        console.log(e);
      }
      break;
  }
  rl.prompt();
}).on('close', () => {
  console.log('Thank you for using QCObjects.');
  console.log('Have a nice day!');
  process.exit(0);
});
