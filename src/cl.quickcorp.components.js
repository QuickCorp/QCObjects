'use strict';
Package('cl.quickcorp.components',[
  Class('MarkdownComponent',Component,{
    name:'markdowncomponent',
    url:ComponentURI({
      'COMPONENTS_BASE_PATH':Component.basePath,
      'COMPONENT_NAME':'README',
      'TPLEXTENSION':'md',
      'TPL_SOURCE':'default' //here is always default in order to get the right uri
    }),
    tplsource:'none',
    cached:false,
    controller:null,
    view:null,
    templateHandler: 'MarkdownTemplateHandler',
    _new_:function (o){
      _super_('Component','_new_').call(this,o);
      this.tplsource='default';
      this.rebuild().then(function (){
        // not yet implemented.
      }).catch(function (standardResponse){
        logger.debug('Component not rebuilt');
      });
    }
  })
]);
