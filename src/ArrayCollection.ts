import { IArrayCollection, IArrayList } from "@types";
import { ClassFactory } from "./ClassFactory";
import { logger } from "./Logger";
import { New } from "./New";
import { __to_number } from "./mathFunctions";


export class ArrayList extends Array implements IArrayList {
  prototype: any;

  unique ():any[] {
    return this.filter(function (value:any, index:any, self:any) {
      return self.indexOf(value) === index;
    });
  };

  table(): void {
      console.table(this);
  };
  sum(): number {
    return this.reduce( (prev:any, current:any):number => {
      return (__to_number(prev)) + (__to_number(current));
    }, 0) as number;
  }
  avg(): number {
    return (this.length < 1) ? (0) : (this.reduce( (prev:any, current:any):number => {
      return (((__to_number(prev)) + (__to_number(current))) / 2);
    })) as number;
  }
  min(): number {
    return this.reduce( (prev:any, current:any):number => {
      return (__to_number(prev) <= __to_number(current)) ? (prev) : (current);
    }, Infinity) as number;
  }
  max(): number {
    return this.reduce( (prev:any, current:any):number => {
      return (__to_number(prev) >= __to_number(current)) ? (prev) : (current);
    }, 0) as number;
  }
  sortBy(propName: string, sortAsc?: boolean): any[] {
    const sort_function = (sortAsc) ? (
      function (prev:any, current:any) {
        return current[propName] < prev[propName] ? 1 : -1;
      }
    ) : (
      function (prev:any, current:any) {
        return current[propName] > prev[propName] ? 1 : -1;
      }
    );
    return this.sort(sort_function);
  }
  matrix(length: number, fillValue?: number): any[] {
    const x_func = () => {
      return fillValue;
    };
    return Array.from({
      length: length
    }, x_func);
  }
  matrix2d(length: number, fillValue?: number): any[][] {
    const y_func = function () {
      return fillValue;
    };
    const x_func = function () {
      return Array.from({
        length
      }, y_func);
    };
    return Array.from({
      length
    }, x_func);
  }
  matrix3d(length: number, fillValue?: number): any[][][] {
    const y_func = function () {
      return Array.from({
        length
      }, function () {
        return fillValue;
      });
    };
    const x_func = function () {
      return Array.from({
        length
      }, y_func);
    };
    return Array.from({
      length
    }, x_func);
  }


}

export class ArrayCollection implements IArrayCollection {
  source :ArrayList = New(ArrayList, []);
  changed(prop: string, value: any):void {
    logger.debug("VALUE CHANGED");
    logger.debug(prop);
    logger.debug(value);
  }
  push(value: any):number {
    const self = this;
    logger.debug("VALUE ADDED");
    logger.debug(value);
    return self.source.push(value);
  }
  pop():any {
    const self = this;
    logger.debug("VALUE POPPED");
    return self.source.pop();
  }
  _new_(source: ArrayList):void {
    const self = this;
    let _index = 0;
    self.source = New(ClassFactory("ArrayList"), source);
    for (const _k in self.source) {
      if (!isNaN(_k as any)) {
        logger.debug("binding " + _k.toString());
        (function (_pname:any) {
          Object.defineProperty(self, _pname, {
            set(value) {
              logger.debug("setting " + _pname + "=" + value);
              self.source[_pname] = value;
              self.changed(_pname, value);
            },
            get():unknown {
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
}

