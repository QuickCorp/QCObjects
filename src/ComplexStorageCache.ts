import { Base64 } from "./Base64";
import { _DataStringify } from "./DataStringify";
import { logger } from "./Logger";

export const ComplexStorageCache = function (params) {
    var object, load, alternate;
    object = params.index;
    if (typeof object !== "undefined") {
      load = params.load;
      alternate = params.alternate;
      var cachedObjectID = this.getID(object);
      var cachedResponse = localStorage.getItem(cachedObjectID);
      if (this.isEmpty(cachedResponse)) {
        var cachedNewResponse = load.call(null, {
          "cachedObjectID": cachedObjectID,
          "cachedResponse": cachedResponse,
          "cache": this
        });
        this.save(object, cachedNewResponse);
        logger.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID));
      } else {
        var alternateResponse = alternate.call(null, {
          "cachedObjectID": cachedObjectID,
          "cachedResponse": cachedResponse,
          "cache": this
        });
        logger.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID));
      }

    } else {
      throw new Error("ComplexStorageCache: index is undefined");
    }
    return this;
  };
  ComplexStorageCache.prototype.getItem = function (cachedObjectID) {
    var retrievedObject = localStorage.getItem(cachedObjectID);
    if (!this.isEmpty(retrievedObject)) {
      return JSON.parse(retrievedObject);
    } else {
      return null;
    }
  };
  ComplexStorageCache.prototype.setItem = function (cachedObjectID, value) {
    localStorage.setItem(cachedObjectID, _DataStringify(value));
  };
  ComplexStorageCache.prototype.isEmpty = function (object) {
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
  };
  ComplexStorageCache.prototype.getID = function (object) {
    var cachedObjectID;
    if (typeof object !== "undefined") {
      cachedObjectID = "cachedObject_" + Base64.encode(_DataStringify(object).replace(/\{|\}|,/g, "_"));
    }
    return cachedObjectID;
  };
  ComplexStorageCache.prototype.save = function (object, cachedNewResponse) {
    var cachedObjectID = this.getID(object);
    logger.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID));
    this.setItem(cachedObjectID, cachedNewResponse);
  };
  ComplexStorageCache.prototype.getCached = function (object) {
    var cachedObjectID = this.getID(object);
    return this.getItem(cachedObjectID);
  };
  ComplexStorageCache.prototype.clear = function () {
    Object.keys(localStorage).filter(function (k) {
      return k.startsWith("cachedObject_");
    }).map(function (c) {
      localStorage.removeItem(c);
    });
  };
