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
	Class('MainController',Element,{
		__new__:function (){
			//TODO: Implement
			console.log('MainController Element Initialized');
		}
	}),
]);
