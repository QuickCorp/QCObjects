'use strict';
Package('cl.quickcorp.components',[
  Class('MarkdownComponent',Component,{
    name:'markdowncomponent',
    url:'README.md',
    tplsource:'none',
    cached:false,
    controller:null,
    view:null,
    templateHandler: 'MarkdownTemplateHandler',
    _new_:function (o){
      _super_('Component','_new_').call(this,o);
      this.tplsource='default';
      this.rebuild();
    }
  })
]);
