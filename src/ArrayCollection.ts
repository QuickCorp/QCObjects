import { Class } from "./Class";
import { ClassFactory } from "./ClassFactory";
import { logger } from "./Logger";
import { New } from "./New";

export const ArrayList = Class("ArrayList", Array, []);

export const ArrayCollection = Class("ArrayCollection", Object, {
    source: New(ClassFactory("ArrayList"), []),
    changed(prop: string, value: any) {
      logger.debug("VALUE CHANGED");
      logger.debug(prop);
      logger.debug(value);
    },
    push(value: any) {
      const self = this;
      logger.debug("VALUE ADDED");
      logger.debug(value);
      self.source.push(value);
    },
    pop(value: any) {
      const self = this;
      logger.debug("VALUE POPPED");
      logger.debug(value);
      self.source.pop(value);
    },
    _new_(source: [] | undefined) {
      const self = this;
      let _index = 0;
      self.source = New(ClassFactory("ArrayList"), source);
      for (const _k in self.source) {
        if (!isNaN(_k as any)) {
          logger.debug("binding " + _k.toString());
          (function (_pname) {
            Object.defineProperty(self, _pname, {
              set(value) {
                logger.debug("setting " + _pname + "=" + value);
                self.source[_pname] = value;
                self.changed(_pname, value);
              },
              get() {
                return self.source[_pname];
              }
            });
          })(_k);
          _index++;
        }

      }
      self.source.length = _index;
      Object.defineProperty(self, "length", {
        get() {
          return self.source.length;
        }
      });
    }
  });
