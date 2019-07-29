Package('cl.quickcorp.model',[
	Class('PWAController',Object,{
		component:null,
		_new_:function (o){
			logger.debug('PWAController Element Initialized');
			this.component = o.component;
		},
		done: function (){
			document.head.innerHTML+=this.component.body.innerHTML;
			this.component.body.innerHTML="";
		}
	}),
	Class('MarkdownController',Element,{
		dependencies:[],
		_new_:function (){
			//TODO: Implement
			console.log('MarkdownController Element Initialized');
		},
		done: function (){
			var controller = this;
			controller.dependencies.push(New(SourceJS,{external:false,url:'doc/js/prism-okaidia.js',done:function(){}}));
			controller.dependencies.push(New(SourceCSS,{external:false,url:'doc/css/prism-okaidia.css',done:function(){}}));
		}
	}),
]);
