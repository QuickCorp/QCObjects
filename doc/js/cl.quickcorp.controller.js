'use strict';
Import('installer');

Package('org.quickcorp.custom.controllers', [
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
  Class('MainController', Controller, {
    dependencies: [],
    component: null,
    _new_: function(o) {
      this.__new__(o);
      var controller = this;
      //TODO: Implement
    },
    done: function() {
      var controller = this;

      /*
			Timer.thread({
		      duration:300,
		      timing(timeFraction,elapsed){
		        return timeFraction;
		      },
		      intervalInterceptor(progress){
								if (progress>=100 && !Component._bindroute.__assigned){
									controller.component.route();
								}
		      }
		  });
			*/


    }
  }),
  Class('PWAController', Object, {
    component: null,
    _new_: function(o) {
      logger.debug('PWAController Element Initialized');
      this.component = o.component;
    },
    done: function() {
      document.head.innerHTML += this.component.body.innerHTML;
      this.component.body.innerHTML = "";
    }
  }),
  Class('SideMarkdownController', Object, {
    dependencies: [],
    _new_: function() {
      //TODO: Implement
      console.log('MarkdownController Element Initialized');
    },
    done: function() {
      var controller = this;
      var component = controller.component;
      var subcomponent = New(SideMarkdownComponent,{
        name:'markdownsidebar',
        body:document.createElement('div')
      });
      component.subcomponents.push(subcomponent);
      component.body.subelements('.navcontent')[0].append(subcomponent.body);
    }
  }),
  Class('SideNavController', SideMarkdownController, {
    dependencies: [],
    component: null,
    visibility: false,
    effect: null,
    open: function() {
      if (this.effect != null) {
        this.effect.apply(this.component.body, 0, 1);
      }
      this.component.body.style.width = "100%";
      this.component.body.style.overflowX = "visible";
      this.component.body.parentElement.subelements('.navbtn')[0].style.display = 'none';
      this.component.body.parentElement.subelements('.closebtn')[0].style.display = 'block';
      this.visibility = true;
      Tag('#forkme_banner').map(e=>e.style.display='none');
      return this.visibility;
    },
    close: function() {
      if (this.effect != null) {
        this.effect.apply(this.component.body, 1, 0);
      }
      this.component.body.style.width = "0px";
      this.component.body.style.overflowX = "hidden";
      this.component.body.parentElement.subelements('.navbtn')[0].style.display = 'block';
      this.component.body.parentElement.subelements('.closebtn')[0].style.display = 'none';
      this.visibility = false;
      Tag('#forkme_banner').map(e=>e.style.display='block');
      return this.visibility;
    },
    toggle: function() {
      if (this.visibility) {
        this.close();
      } else {
        this.open();
      }
    },
    _new_: function(o) {
      _super_('SideMarkdownController','_new_').call(this);
      var controller = this;
      global._sdk_.then(function() {
        controller.effect = New(Fade, {
          duration: 300
        });
      });
      global.sideNavController = this;
      global.sideNavController.close();
      //TODO: Implement

    },
    done: function (){
      this.component.body.subelements('ul>li>a').map(element=>{
        element.addEventListener('click',function (event){
          global.sideNavController.close();
        })
      });

      _super_('SideMarkdownController','done').call(this);
    }
  }),
  Class('HeaderController', Controller, {
    dependencies: [],
    component: null,
    installer: null,
    loadInstallerButton: function() {
      this.installer = new Installer(this.component.body.subelements('#installerbutton')[0]);
    },
    _new_: function(o) {
      this.__new__(o);
      //TODO: Implement
    },
    done: function() {
//      this.loadInstallerButton();

    }
  }),
  Class('ReadmeMarkdownController',Controller,{
    dependencies:[],
    done: function (){
      var controller = this;
      controller.dependencies.push(New(SourceJS,{external:false,url:'js/prism-okaidia.js',done:function(){}}));
			controller.dependencies.push(New(SourceCSS,{external:false,url:'css/prism-okaidia.css',done:function(){}}));

    }
  }),
  Class('DownloadButtonController',Controller,{
    dependencies:[],
    component:null,
    clickHandler:function (){
      logger.debug("Download button clicked");
      location.href='#download';
    },
    done: function (){
      logger.debug("download button controller");
      var controller = this;
      var component = controller.component;
      var _componentRoot = (component.shadowed)?(component.shadowRoot):(component.body);
      _componentRoot.subelements("button.download").map(function (element){
        element.addEventListener("click",function (){
          logger.debug("clicked download button");
          controller.clickHandler.call(controller);
        });
      });
    }
  })
]);
