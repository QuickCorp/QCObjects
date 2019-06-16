/**
 * QCObjects SDK 1.0
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
"use strict";
(function() {
  Package('org.quickcorp.components',[
    Class('FormField',Component,{
      cached:false,
      reload:true,
      createBindingEvents:function (){
        var _executeBinding = this.executeBinding;
        var thisobj = this;
        if (typeof this.fieldType =='undefined' || this.fieldType == null ){
          var _objList = this.body.subelements('*[data-field]'); // every child with data-field set
        } else {
          var _objList = this.body.subelements(this.fieldType+'[data-field]'); // every child with data-field set and tagname is equal to fieldType property
        }
        for (var _datak=0;_datak<_objList.length;_datak++){
          var _obj = _objList[_datak];
          _obj.addEventListener('change',function(e){
            logger.debug('Executing change event binding');
            thisobj.executeBindings();
          });
          _obj.addEventListener('keydown',function(e){
            logger.debug('Executing keydown event binding');
              thisobj.executeBindings();
          });
        }
      },
      executeBinding:function (_obj){
        var _datamodel = _obj.getAttribute('data-field');
        logger.debug('Binding '+_datamodel+' for '+this.name);
        this.data[_datamodel]=_obj.value;
      },
      executeBindings:function (){
        if (typeof this.fieldType =='undefined' || this.fieldType == null ){
          var _objList = this.body.subelements('*[data-field]'); // every child with data-field set
        } else {
          var _objList = this.body.subelements(this.fieldType+'[data-field]'); // every child with data-field set and tagname is equal to fieldType property
        }
        for (var _datak=0;_datak<_objList.length;_datak++){
          var _obj = _objList[_datak];
          var _datamodel = _obj.getAttribute('data-field');
          logger.debug('Binding '+_datamodel+' for '+this.name);
          this.data[_datamodel]=_obj.value;
        }
      },
      done:function (){
        var thisobj = this;
        thisobj.executeBindings();
        thisobj.createBindingEvents();
        logger.debug('Field loaded: '+thisobj.fieldType+'[name='+thisobj.name+']');
      }
    }),
    Class('ButtonField',FormField,{
      fieldType:'button'
    }),
    Class('InputField',FormField,{
      fieldType:'input'
    }),
    Class('TextField',FormField,{
      fieldType:'textarea'
    }),
    Class('EmailField',FormField,{
      fieldType:'input'
    }),
    Class('GridComponent',Component,{
      name:'grid',
      cached:false,
      controller:null,
      view:null,
      rows:3,
      cols:3,
      reload:true,
      template:'',
      templateURI:'',
      data:{},
      body:null
    })
  ]);

}).call(null);
