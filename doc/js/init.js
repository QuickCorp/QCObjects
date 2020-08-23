logger.debugEnabled=true;
Component.cached=false;


CONFIG.set('relativeImportPath', 'doc/js/');
CONFIG.set('componentsBasePath', 'doc/templates/components/');
CONFIG.set('delayForReady', 1); // delay to wait before executing the first ready event, it includes imports
CONFIG.set('preserveComponentBodyTag', false); // don't use <componentBody></componentBody> tag
CONFIG.set('useConfigService', false); // Load settings from config.json
CONFIG.set('routingWay','hash');
CONFIG.set('useSDK',true);
CONFIG.set('useLocalSDK',false);
CONFIG.set('asynchronousImportsLoad',true);
CONFIG.set('tplextension','tpl.html');
CONFIG.set('serviceWorkerURI','/sw.js');
CONFIG.set('github_buttons_uri','https://buttons.github.io/buttons');

Import ('cl.quickcorp');
Ready(function() {
  function forceClearCache(){
    var cacheStorage = new ComplexStorageCache({
                                index:'index',
                                load:(cacheController)=>{},
                                alternate: (cacheController)=>{}
                              });
    cacheStorage.clear();
  }
  forceClearCache(); // force clear cache on startup

});
