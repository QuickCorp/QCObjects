'use strict';
Package('cl.quickcorp.components',[
  Class('MarkdownComponent',Component,{
    name:'markdowncomponent',
    templateURI:'../../README.md',
    cached:false,
    controller:null,
    view:null,
    templateHandler: 'MarkdownTemplateHandler',
    _new_:function (o){
      _super_('Component','_new_').call(this,o);
    }
  })
]);
