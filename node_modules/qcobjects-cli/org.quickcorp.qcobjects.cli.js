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
const fs = require('fs');
const path = require('path');
const absolutePath = path.resolve( __dirname, "./" );
const templatePath = path.resolve( __dirname, "./templates/apps/" )+'/';
const templatePwaPath = path.resolve( __dirname, "./templates/pwa/" )+'/';
const package_config = require(absolutePath+'/package.json');
const { exec,execSync } = require('child_process');
const Handlebars = require('handlebars');


logger.debugEnabled=false;
CONFIG.set('node_modules_path','./node_modules/');
CONFIG.set('qcobjectsnewapp_path',CONFIG.get('node_modules_path')+'/qcobjectsnewapp');


Package('org.quickcorp.qcobjects.cli',[
  Class('SwitchCommander',{
    program:require('commander'),
    fileListRecursive : function (dir) {
        var instance = this;
        return (fs.statSync(dir).isDirectory())
            ? (Array.prototype.concat(...fs.readdirSync(dir).map(f =>instance.fileListRecursive(path.join(dir, f))))
            .filter((f)=>{return !f.startsWith('.git')
              && f.lastIndexOf('.DS_Store')==-1
            })
          )
            : (dir);
    },
    generateServiceWorker: function (appName){
      var filelist = ["/"].concat(this.fileListRecursive('./'));
      filelist = filelist.filter(function (fl){return fl!= "sw.js"});
      fs.readFile(templatePwaPath+'/sw.js', function(err, data) {
        const swTemplate = Handlebars.compile(data.toString());
        var swContent = swTemplate({appName: appName,filelist:"\n\t\""+filelist.join("\",\n\t\"")+"\""});
        fs.writeFile('./sw.js', swContent, err => {
          logger.info("Service Worker Generated");
          console.log('')
          console.log('Now simply put:');
          console.log('CONFIG.set(\'serviceWorkerURI\',\'/sw.js\');');
          console.log(' In your init.js file ');
          console.log('')

          process.exit(0);
        });
      });
    },
    copyTemplate: function (){
      var map_files = function (pathname,callback){
        var _filenames = function (pathname){
          fs.readdir(pathname,{withFileTypes:true},function (err,files){
            if (typeof files !== 'undefined'){
              files.filter((f)=>{return f.isFile()}).map((file)=>{
                callback(pathname+'/'+file.name);
                _filenames(pathname+'/'+file.name);
              });
            }
          });
        };
        return _filenames(pathname);
      };
      var map_dirnames = function (pathname,callback){
        var _main_pathnames = [];
        var _dirnames = function (pathname){
          fs.readdir(pathname,{withFileTypes:true},function (err,files){
            var _pathnames = [];
            files.filter((f)=>{return f.isDirectory()}).map((d)=>{
                _pathnames.push(pathname+'/'+d.name);
                callback(pathname+'/'+d.name);
                _dirnames(pathname+'/'+d.name);
              });
            _main_pathnames = _main_pathnames.concat(_pathnames);
          });
          return _main_pathnames;
        }
        return _dirnames(pathname);
      };
      var relativePath = function (dirname){
        return dirname.replace(CONFIG.get('qcobjectsnewapp_path'),'.');
      };
      var copyTemplateFile = function (sourceFileName, destFileName){
        fs.copyFile(sourceFileName, destFileName, (err) => {
          if (err) throw err;
          logger.debug('File '+destFileName+' was created successfully');
        });
      };
      map_dirnames(CONFIG.get('qcobjectsnewapp_path'),(dirname)=>{
        logger.info('Creating path: '+relativePath(dirname));
        fs.mkdir(relativePath(dirname),()=>{
          map_files(dirname,(filename)=>{
            logger.debug('Creating file: '+relativePath(filename));
            copyTemplateFile(filename,relativePath(filename));
          });
        });
      });
      map_files(CONFIG.get('qcobjectsnewapp_path'),(filename)=>{
        if (!['./package.json',
              './package-lock.json',
              './sw.js'].includes(relativePath(filename))){
          logger.info('Creating file: '+relativePath(filename));
          copyTemplateFile(filename,relativePath(filename));
        }
      });

    },
    choiceOption:{
      generateSw: function (_appName){
        let switchCommander = this;
        let appName = (typeof _appName ==='undefined' || _appName === true)?('MyAppName'):(_appName);
        switchCommander.generateServiceWorker(appName);

      },
      create:function (_appName, options){
        let switchCommander = this;
        let appName = (typeof _appName ==='undefined' || _appName === true)?('MyAppName'):(_appName);

        const readline = require('readline');

        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        rl.question('Please tell me your git repository url: \n', (answer) => {
          logger.info(`your git repository url is ${answer}`);
          rl.close();
          let giturl = answer;

          let createAppCommandPWA = "echo \"{\\\"name\\\": \\\""+appName.toLowerCase()+"\\\",\\\"repository\\\": {\\\"type\\\": \\\"git\\\",\\\"url\\\": \\\""+giturl+"\\\"},\\\"description\\\":\\\".\\\",\\\"license\\\": \\\"LGPL-3.0-or-later\\\",\\\"dependencies\\\":{\\\"qcobjectsnewapp\\\":\\\"latest\\\",\\\"qcobjects\\\":\\\"latest\\\"}}\" > package.json";
          let createAppCommandAMP = "echo \"{\\\"name\\\": \\\""+appName.toLowerCase()+"\\\",\\\"repository\\\": {\\\"type\\\": \\\"git\\\",\\\"url\\\": \\\""+giturl+"\\\"},\\\"description\\\":\\\".\\\",\\\"license\\\": \\\"LGPL-3.0-or-later\\\",\\\"dependencies\\\":{\\\"qcobjects-ecommerce-amp\\\":\\\"latest\\\",\\\"qcobjects\\\":\\\"latest\\\"}}\" > package.json";
          let createAppCommand;
          let appTemplateName;

          if (options.createAmp){
            appTemplateName = 'qcobjects-ecommerce-amp';
            createAppCommand = createAppCommandAMP;
          } else {
            appTemplateName = 'qcobjectsnewapp';
            createAppCommand = createAppCommandPWA;
          }
          CONFIG.set('qcobjectsnewapp_path',CONFIG.get('node_modules_path')+'/'+appTemplateName);

          logger.debug(createAppCommand);
          exec(createAppCommand, (err, stdout, stderr) => {
            console.log(stdout);
            exec("npm cache verify && npm i --save-dev ", (err, stdout, stderr) => {
              console.log(stdout);
              Promise.resolve(switchCommander.copyTemplate()).then(()=>{
                logger.info('Good! Your application is getting done. You can play with QCObjects now!');
                logger.info('In about five seconds your server will start...');
                exec("qcobjects-createcert",(err,stdout,stderr)=>{
                  logger.info("Test certificates generated");
                  exec("npm uninstall "+appTemplateName+" --save && npm cache verify",(err,stdout,stderr)=>{
                    switchCommander.generateServiceWorker(appName);
                  });
                });
              });
            });
          });

        });

      },
      publish:function (_appName){
        logger.debug('publish is not yet implemented');
      }
    },
    initCommand: function (){
      let switchCommander = this;
      if (process.argv.length>1){

        this.program
          .version(package_config.version);
        this.program
          .command('create <appname>')
          .description('Creates an app with <appname>')
          .option('--pwa, --create-pwa', 'Creates the progressive web app assets')
          .option('--amp, --create-amp', 'Creates the accelerated mobile pages assets')
          .option('--tests, --create-tests', 'Creates the test suite')
          .action(function(args, options){
              switchCommander.choiceOption.create.call(switchCommander,args,options);
          });
        this.program.command('publish <appname>')
          .description('Publishes an app with <appname>')
          .option('--pwa, --create-pwa', 'Publishes the progressive web app assets')
          .option('--amp, --create-amp', 'Publishes the accelerated mobile pages assets')
          .option('--tests, --create-tests', 'Publishes the test suite')
          .action(function(args, options){
              switchCommander.choiceOption.publish.call(switchCommander,args,options);
          });

        this.program.command('generate-sw  <appname>')
          .description('Generates the service worker  <appname>')
          .action(function(args, options){
              switchCommander.choiceOption.generateSw.call(switchCommander,args,options);
          });
        this.program.command('launch <appname>')
          .description('Launches the application')
          .action(function (args,options){
            logger.info("Launching...");
            setTimeout(()=>{
              logger.info("Go to the browser and open https://localhost ");
              logger.info("Press Ctrl-C to stop serving ");
              exec("qcobjects-server",(err,stdout,stderr)=>{
              });
            },5000);
  //          setTimeout(()=>{
  //            execSync("open -a \"google chrome\" https://localhost");
  //          },6000);

          });

          this.program.on('--help', function(){
            console.log('')
            console.log('Use:');
            console.log('  $ qcobjects-cli [command] --help');
            console.log('  For detailed information of a command ');
            console.log('')
            process.exit(0);
          });
          this.program.on('command:*', function () {
            console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
            process.exit(1);
          });
          this.program.parse(process.argv);
        } else {
          console.log('')
          console.log('Use:');
          console.log('  $ qcobjects-cli [command] --help');
          console.log('  For detailed information of a command ');
          console.log('')
          process.exit(0);

        }

    }
  })
]);
