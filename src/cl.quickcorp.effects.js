'use strict';
Package('cl.quickcorp.effects',[
  Class('MainTransitionEffect',Effect,{
    duration:700,
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
      _super_('Fade','apply').call(this,this.component.body,alphaFrom,alphaTo);

    }
  })
]);
