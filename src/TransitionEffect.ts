import { TransitionEffectParams } from "types/global";
import { Effect } from "./Effect";
import { logger } from "./Logger";
import { Package } from "./Package";
import { ClassFactory } from "./ClassFactory";

export class TransitionEffect extends Effect {
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
  effects = [];

  constructor() {
    super();
    logger.info("DECLARING TransitionEffect  ");
    this.component.defaultParams = this.defaultParams;
  }

  apply({
    alphaFrom,
    alphaTo,
    angleFrom,
    angleTo,
    radiusFrom,
    radiusTo,
    scaleFrom,
    scaleTo
  }: TransitionEffectParams) {
    const _transition_ = this;
    logger.info("EXECUTING TransitionEffect  ");
    const componentRoot = (_transition_.component.shadowed) ? (_transition_.component.shadowRoot.host) : (_transition_.component.body);
    if (_transition_.fitToHeight) {
      componentRoot.height = (typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null) ? (componentRoot.offsetParent.scrollHeight) : (componentRoot.getBoundingClientRect().height);
    }
    if (_transition_.fitToWidth) {
      componentRoot.width = (typeof componentRoot.offsetParent === "object" && componentRoot.offsetParent !== null) ? (componentRoot.offsetParent.scrollWidth) : (componentRoot.getBoundingClientRect().width);
    }
    componentRoot.style.display = "block";
    _transition_.effects.map(function (effectClassName, eff) {
      const __effectClass__ = ClassFactory(effectClassName);
      const effectObj = new __effectClass__({});
      const effectClassMethod = effectObj.apply;
      const args = [componentRoot].concat(Object.values({
        alphaFrom,
        alphaTo,
        angleFrom,
        angleTo,
        radiusFrom,
        radiusTo,
        scaleFrom,
        scaleTo
      }));
      effectClassMethod.apply(_transition_, args);
    });
  }

}

Package("com.qcobjects.effects.transitions.base", [
  TransitionEffect
]);
