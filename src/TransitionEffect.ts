import { Effect } from "./Effect";
import { logger } from "./Logger";
import { Package } from "./Package";
import { ClassFactory } from "./ClassFactory";
import { ITransitionEffect, IComponent, TTransitionEffectParams } from "types";

export class TransitionEffect extends Effect implements ITransitionEffect{
  duration = 385;
  defaultParams = {
    alphaFrom: 0,
    alphaTo: 1,
    angleFrom: 180,
    angleTo: 0,
    radiusFrom: 0,
    radiusTo: 30,
    scaleFrom: 0,
    scaleTo: 1
  };

  fitToHeight = false;
  fitToWidth = false;

  component!: IComponent;
  effects!: string[];

  apply({
    alphaFrom,
    alphaTo,
    angleFrom,
    angleTo,
    radiusFrom,
    radiusTo,
    scaleFrom,
    scaleTo
  }: TTransitionEffectParams):void {
    const _transition_ = this;
    logger.info("EXECUTING TransitionEffect  ");
    const componentRoot =_transition_.component.componentRoot;

    if (typeof componentRoot !== "undefined" && componentRoot !== null){
      if (_transition_.fitToHeight) {
        (componentRoot as any).height = (typeof (componentRoot as HTMLElement).offsetParent === "object" && (componentRoot as HTMLElement).offsetParent !== null) ? ((componentRoot as HTMLElement).offsetParent?.scrollHeight) : ((componentRoot as HTMLElement).getBoundingClientRect().height);
      }
      if (_transition_.fitToWidth) {
        (componentRoot as any).width = (typeof (componentRoot as HTMLElement).offsetParent === "object" && (componentRoot as HTMLElement).offsetParent !== null) ? ((componentRoot as HTMLElement).offsetParent?.scrollWidth) : ((componentRoot as HTMLElement).getBoundingClientRect().width);
      }
      if (_transition_.component.shadowed){
        ((componentRoot as ShadowRoot).host as HTMLElement).style.display = "block";
      } else {
        (componentRoot as HTMLElement).style.display = "block";
      }
      _transition_.effects.map( (effectClassName:string):string => {

        const __effectClass__ = ClassFactory(effectClassName) as unknown as typeof Effect;
        const effectObj = new __effectClass__({});
        const effectClassMethod = effectObj.apply.bind(_transition_);
        const componentHost = (_transition_.component.shadowed)? ((componentRoot as ShadowRoot).host) : (componentRoot);
        const effectParams = {
          alphaFrom,
          alphaTo,
          angleFrom,
          angleTo,
          radiusFrom,
          radiusTo,
          scaleFrom,
          scaleTo
        };        
        effectClassMethod(componentHost,...Object.values(effectParams));
        return effectClassName;
      });
  
    }

  }

}

Package("com.qcobjects.effects.transitions.base", [
  TransitionEffect
]);
