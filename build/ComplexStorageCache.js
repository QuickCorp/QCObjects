"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplexStorageCache = void 0;
const Base64_1 = require("./Base64");
const DataStringify_1 = require("./DataStringify");
const Logger_1 = require("./Logger");
class ComplexStorageCache {
    constructor(params) {
        let load, alternate;
        const object = params.index;
        if (typeof object !== "undefined") {
            load = params.load;
            alternate = params.alternate;
            const cachedObjectID = this.getID(object);
            const cachedResponse = localStorage.getItem(cachedObjectID);
            if (this.isEmpty(cachedResponse)) {
                const cachedNewResponse = load.call(null, {
                    cachedObjectID,
                    cachedResponse,
                    "cache": this
                });
                this.save(object, cachedNewResponse);
                Logger_1.logger.debug("RESPONSE OF {{cachedObjectID}} CACHED".replace("{{cachedObjectID}}", cachedObjectID));
            }
            else {
                alternate.call(null, {
                    cachedObjectID,
                    cachedResponse,
                    "cache": this
                });
                Logger_1.logger.debug("RESPONSE OF {{cachedObjectID}} IS ALREADY CACHED ".replace("{{cachedObjectID}}", cachedObjectID));
            }
        }
        else {
            throw new Error("ComplexStorageCache: index is undefined");
        }
        return this;
    }
    getItem(cachedObjectID) {
        const retrievedObject = localStorage.getItem(cachedObjectID);
        if (!this.isEmpty(retrievedObject)) {
            return JSON.parse(retrievedObject);
        }
        else {
            return null;
        }
    }
    setItem(cachedObjectID, value) {
        localStorage.setItem(cachedObjectID, (0, DataStringify_1._DataStringify)(value));
    }
    isEmpty(object) {
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
    getID(object) {
        let cachedObjectID;
        if (typeof object !== "undefined") {
            cachedObjectID = "cachedObject_" + Base64_1.Base64.encode((0, DataStringify_1._DataStringify)(object).replace(/\{|\}|,/g, "_"));
        }
        return cachedObjectID;
    }
    save(object, cachedNewResponse) {
        const cachedObjectID = this.getID(object);
        Logger_1.logger.debug("CACHING THE RESPONSE OF {{cachedObjectID}} ".replace("{{cachedObjectID}}", cachedObjectID));
        this.setItem(cachedObjectID, cachedNewResponse);
    }
    getCached(object) {
        const cachedObjectID = this.getID(object);
        return this.getItem(cachedObjectID);
    }
    clear() {
        Object.keys(localStorage).filter(function (k) {
            return k.startsWith("cachedObject_");
        }).map(function (c) {
            localStorage.removeItem(c);
            return c;
        });
    }
}
exports.ComplexStorageCache = ComplexStorageCache;
