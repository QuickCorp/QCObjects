import { Base64 } from "./Base64";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";

export class ComplexStorageCache {

  constructor(params: { index: any; load: any; alternate: any; }) {
    var object, load, alternate;
    object = params.index;
    if (typeof object !== "undefined") {
      load = params.load;
      alternate = params.alternate;
      var cachedObjectID = this.getID(object);
      var cachedResponse = localStorage.getItem(cachedObjectID as string);
      if (this.isEmpty(cachedResponse)) {
        var cachedNewResponse = load.call(null, {
          "cachedObjectID": cachedObjectID,
          "cachedResponse": cachedResponse,
          "cache": this
        });
        this.save(object, cachedNewResponse);
        logger.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID as string));
      } else {
        var alternateResponse = alternate.call(null, {
          "cachedObjectID": cachedObjectID,
          "cachedResponse": cachedResponse,
          "cache": this
        });
        logger.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID as string));
      }

    } else {
      throw new Error("ComplexStorageCache: index is undefined");
    }
    return this;
  }

  getItem(cachedObjectID: string) {
    var retrievedObject = localStorage.getItem(cachedObjectID);
    if (!this.isEmpty(retrievedObject)) {
      return JSON.parse(retrievedObject as string);
    } else {
      return null;
    }
  }


  setItem(cachedObjectID: string, value: any) {
    localStorage.setItem(cachedObjectID, _DataStringify(value));
  }

  isEmpty(object: string | number | null) {
    var r = false;
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


  getID(object: any) {
    var cachedObjectID;
    if (typeof object !== "undefined") {
      cachedObjectID = "cachedObject_" + Base64.encode(_DataStringify(object).replace(/\{|\}|,/g, "_"));
    }
    return cachedObjectID;
  }

  save(object: any, cachedNewResponse: any) {
    var cachedObjectID = this.getID(object);
    logger.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID as string));
    this.setItem(cachedObjectID as string, cachedNewResponse);
  }

  getCached(object: any) {
    var cachedObjectID = this.getID(object);
    return this.getItem(cachedObjectID as string);
  }

  clear() {
    Object.keys(localStorage).filter(function (k) {
      return k.startsWith("cachedObject_");
    }).map(function (c) {
      localStorage.removeItem(c);
    });
  }

}
