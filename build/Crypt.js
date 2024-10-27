"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DecryptObject = exports._CryptObject = exports._Crypt = void 0;
const Base64_1 = require("./Base64");
const Class_1 = require("./Class");
const ClassFactory_1 = require("./ClassFactory");
const DataStringify_1 = require("./DataStringify");
const New_1 = require("./New");
const secretKey_1 = require("./secretKey");
exports._Crypt = (0, Class_1.Class)("_Crypt", Object, {
    last_string: "",
    last_key: "",
    construct: false,
    _new_(o) {
        const string = o.string;
        let key = (o.hasOwnProperty.call(o, "key")) ? (o.key) : (null);
        this.__new__(o);
        key = (key === null) ? (this.__instanceID) : (key);
        this.last_key = key;
        this.last_string = string;
        this.construct = true;
    },
    _encrypt() {
        const string = this.string;
        const key = this.key;
        let result = "";
        let char;
        let keychar;
        for (let i = 0; i < string.length; i++) {
            char = string.substr(i, 1);
            keychar = key.substr((i % key.length) - 1, 1);
            char = String.fromCharCode(char.charCodeAt(0) + keychar.charCodeAt(0));
            result += char;
        }
        this.last_string = Base64_1.Base64.encode(result);
        return this.last_string;
    },
    _decrypt() {
        let string = this.string;
        const key = this.key;
        let result = "";
        let char;
        let keychar;
        string = Base64_1.Base64.decode(string);
        for (let i = 0; i < string.length; i++) {
            char = string.substr(i, 1);
            keychar = key.substr((i % key.length) - 1, 1);
            char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
            result += char;
        }
        this.last_string = result;
        return this.last_string;
    },
    encrypt(string, key) {
        const crypt = (0, New_1.New)((0, ClassFactory_1.ClassFactory)("_Crypt"), {
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._encrypt();
    },
    decrypt(string, key) {
        const crypt = (0, New_1.New)((0, ClassFactory_1.ClassFactory)("_Crypt"), {
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._decrypt();
    }
});
const _CryptObject = function (o) {
    return (0, ClassFactory_1.ClassFactory)("_Crypt").encrypt((0, DataStringify_1._DataStringify)(o), secretKey_1._secretKey);
};
exports._CryptObject = _CryptObject;
const _DecryptObject = function (s) {
    return (s === "") ? ({}) : (JSON.parse((0, ClassFactory_1.ClassFactory)("_Crypt").decrypt(s, secretKey_1._secretKey)));
};
exports._DecryptObject = _DecryptObject;
