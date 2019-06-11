'use strict';
Package('cl.quickcorp.tools',[
  Class('MarkdownTemplateHandler',DefaultTemplateHandler,{
    template:'',
    assign:function (data){
      var converter = new showdown.Converter();
      converter.setFlavor('github');
      var parsedAssignmentText = converter.makeHtml(this.template);
      return parsedAssignmentText;
    }
  })
]);
