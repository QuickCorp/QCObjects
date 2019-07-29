'use strict';
Package('cl.quickcorp.effects',[
  Class('MainTransitionEffect',Effect,{
    duration:3000,
    defaultParams:{
      alphaFrom:0,
      alphaTo:1
    },
    _new_:function (o){
      logger.info('DECLARING MAIN EFFECT ');
      this.component.defaultParams = this.defaultParams;
    },
    apply: function ({alphaFrom,alphaTo}){
      logger.info('EXECUTING MAIN EFFECT ');
      this.component.body.style.display = 'block';
      _super_('Fade','apply').call(this,this.component.body,alphaFrom,alphaTo);

    }
  })
]);
