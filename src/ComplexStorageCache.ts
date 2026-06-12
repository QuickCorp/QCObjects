import { Base64 } from "./Base64";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";

export class ComplexStorageCache {

  constructor(params: { index: any; load: any; alternate: any; }) {
    let load, alternate;
    const object = params.index;
    if (typeof object !== "undefined") {
      load = params.load;
      alternate = params.alternate;
      const cachedObjectID = this.getID(object);
      const cachedResponse = localStorage.getItem(cachedObjectID as string);
      if (this.isEmpty(cachedResponse)) {
        const cachedNewResponse = load.call(null, {
          cachedObjectID,
          cachedResponse,
          "cache": this
        });
        this.save(object, cachedNewResponse);
        logger.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID as string));
      } else {
        alternate.call(null, {
          cachedObjectID,
          cachedResponse,
          "cache": this
        });
        logger.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID as string));
      }

    } else {
      throw new Error("ComplexStorageCache: index is undefined");
    }
    return this;
  }

  getItem(cachedObjectID: string):any {
    const retrievedObject = localStorage.getItem(cachedObjectID);
    if (!this.isEmpty(retrievedObject)) {
      return JSON.parse(retrievedObject as string);
    } else {
      return null;
    }
  }


  setItem(cachedObjectID: string, value: any):void {
    localStorage.setItem(cachedObjectID, _DataStringify(value));
  }

  isEmpty(object: string | number | null):boolean {
    let r = false;
    switch (true) {
      case (typeof object === "undefined"):
      case (typeof object === "string" && object === ""):
      case (typeof object === "string" && object === "undefined"):
      case (typeof object === "number" && object === 0):
      case (object === null):
        r = true;
        break;
      default:
        r = false;
    }
    return r;
  }


  getID(object: any):string|undefined {
    let cachedObjectID;
    if (typeof object !== "undefined") {
      cachedObjectID = "cachedObject_" + Base64.encode(_DataStringify(object).replace(/\{|\}|,/g, "_"));
    }
    return cachedObjectID;
  }

  save(object: any, cachedNewResponse: any):void {
    const cachedObjectID = this.getID(object);
    logger.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID as string));
    this.setItem(cachedObjectID as string, cachedNewResponse);
  }

  getCached(object: any):any {
    const cachedObjectID = this.getID(object);
    return this.getItem(cachedObjectID as string);
  }

  clear():void {
    Object.keys(localStorage).filter(function (k) {
      return k.startsWith("cachedObject_");
    }).map(function (c):any {
      localStorage.removeItem(c);
      return c;
    });
  }

}
