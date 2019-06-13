'use strict';
Package('cl.quickcorp.components',[
  Class('MarkdownComponent',Component,{
    dependencies:[],
    name:'markdowncomponent',
    templateURI:"",
    tplsource:'none',
    cached:false,
    controller:null,
    view:null,
    templateHandler: 'MarkdownTemplateHandler',
    _new_:function (o){
      var componentInstance = this;
      _super_('Component','_new_').call(this,o);
      componentInstance.tplsource='default';
      componentInstance.templateURI=ComponentURI({
        'COMPONENTS_BASE_PATH':'',
        'COMPONENT_NAME':'README',
        'TPLEXTENSION':'md',
        'TPL_SOURCE':'default' //here is always default in order to get the right uri
      });
      componentInstance.rebuild().then(function (){
        componentInstance.dependencies.push(New(SourceJS,{external:false,url:'doc/js/prism-okaidia.js',done:function(){}}));
        componentInstance.dependencies.push(New(SourceCSS,{external:false,url:'doc/css/prism-okaidia.css',done:function(){}}));
      }).catch(function (standardResponse){
        logger.debug('Component not rebuilt ');
        console.log(standardResponse);
      });
    }
  })
]);
