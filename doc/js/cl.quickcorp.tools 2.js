'use strict';
Package('cl.quickcorp.tools',[
  Class('MarkdownTemplateHandler',DefaultTemplateHandler,{
    replaceLinksForRouting:function(template){
      template = template.replace(new RegExp('href="CODE_OF_CONDUCT.md"', 'g'),'href="#CODE_OF_CONDUCT"');
      template = template.replace(new RegExp('href="code_of_conduct.md"', 'g'),'href="#code_of_conduct"');
      template = template.replace(new RegExp('href="CONTRIBUTING.md"', 'g'),'href="#contributing"');
      return template;
    },
    assign:function (data){
      var converter = new showdown.Converter();
      converter.setFlavor('github');
      return this.replaceLinksForRouting(converter.makeHtml(this.template));
    }
  })
]);
