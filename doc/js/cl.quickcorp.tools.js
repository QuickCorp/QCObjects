'use strict';
Package('cl.quickcorp.tools',[
  Class('MarkdownTemplateHandler',DefaultTemplateHandler,{
    assign:function (data){
      var converter = new showdown.Converter();
      converter.setFlavor('github');
      return converter.makeHtml(this.template);
    }
  })
]);
