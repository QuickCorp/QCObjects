#!/usr/bin/env node
/* eslint-disable no-undef */

describe("QCObjects Config", function () {
  require("../QCObjects");
  logger.debugEnabled=true;
  logger.infoEnabled=true;
  logger.warnEnabled=true;

  it("Basic Config intance Test Spec", function () {
    logger.debug("starting basic Config intance Test Spec... ");
    CONFIG.set("one", 1);
    var value = CONFIG.get("one");
    expect(value).toEqual(1);
    logger.debug("basic Config intance Test Spec... OK");
  });


  it("Extended Config intance Test Spec", function () {
    logger.debug("starting extended Config intance Test Spec... ");
 //   CONFIG.set("sourceType", "module"); // default is text/javascript and you can change it to module or any other compatible with the browser
 //   CONFIG.set("relativeImportPath", "js/packages/");
 //   CONFIG.set("componentsBasePath", "templates/components/");
 //   CONFIG.set("delayForReady", 1); // delay to wait before executing the first ready event, it includes imports
//    CONFIG.set("preserveComponentBodyTag", false); // don't use <componentBody></componentBody> tag
    CONFIG.set("useConfigService", false); // Load settings from config.json
    CONFIG.set("routingWay","hash"); // routingWay possible values are 'hash','pathname','search'
    CONFIG.set("useSDK",true); // it is recommended to use the SDK that is dynamically loaded, but you can chose not to load it
    CONFIG.set("useLocalSDK",false); // on the frontend side you can chose whether to load the SDK from sdk.qcobjects.dev or from your local website
    CONFIG.set("tplextension","tpl.html"); // this is the file extension to locate the template files (if component.name = 'main' then template name will be main.tpl.html)
    CONFIG.set("asynchronousImportsLoad",true); // it is recommended to load the Import declarations in an asyncronous way
    CONFIG.set("serviceWorkerURI","/sw.js"); //QCObjects will register an launch this service worker automatically to work offline
    logger.debug("extended Config intance Test Spec... OK");
  });


});
