"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._DecryptObject = exports._CryptObject = exports._Crypt = void 0;
const Base64_1 = require("./Base64");
const DataStringify_1 = require("./DataStringify");
const InheritClass_1 = require("./InheritClass");
const Package_1 = require("./Package");
const secretKey_1 = require("./secretKey");
class _Crypt extends InheritClass_1.InheritClass {
    string = "";
    key = "";
    // eslint-disable-next-line no-unused-vars
    encrypt(_string_, key) {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line no-unused-vars
    decrypt(_string_, key) {
        throw new Error("Method not implemented.");
    }
    last_string = "";
    last_key = "";
    construct = false;
    _new_(o) {
        const string = o.string;
        let key = (Object.hasOwn(o, "key")) ? (o.key) : ("");
        this.__new__(o);
        key = (key === "") ? (this.__instanceID.toString()) : (key);
        this.last_key = key;
        this.last_string = string;
        this.construct = true;
    }
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
    }
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
    }
    static encrypt(string, key) {
        const crypt = new _Crypt({
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._encrypt();
    }
    static decrypt(string, key) {
        const crypt = new _Crypt({
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._decrypt();
    }
}
exports._Crypt = _Crypt;
const _CryptObject = function (o) {
    return _Crypt.encrypt((0, DataStringify_1._DataStringify)(o), secretKey_1._secretKey);
};
exports._CryptObject = _CryptObject;
const _DecryptObject = function (s) {
    return (s === "") ? ({}) : (JSON.parse(_Crypt.decrypt(s, secretKey_1._secretKey)));
};
exports._DecryptObject = _DecryptObject;
(0, Package_1.Package)("com.qcobjects", [_Crypt]);
