import { Base64 } from "./Base64";
import { Class } from "./Class";
import { ClassFactory } from "./ClassFactory";
import { _DataStringify } from "./DataStringify";
import { New } from "./New";
import { _secretKey } from "./secretKey";

export const _Crypt = Class("_Crypt", Object, {
    last_string: "",
    last_key: "",
    construct: false,
    _new_(o:any) {
        const string = o.string;
        let key = (o.hasOwnProperty.call(o, "key")) ? (o.key) : (null);
        this.__new__(o);
        key = (key === null) ? (this.__instanceID) : (key);
        this.last_key = key;
        this.last_string = string;
        this.construct = true;
    },
    _encrypt():string {
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
        this.last_string = Base64.encode(result);
        return this.last_string;
    },
    _decrypt():string {
        let string = this.string;
        const key = this.key;
        let result = "";
        let char;
        let keychar;
        string = Base64.decode(string);
        for (let i = 0; i < string.length; i++) {
            char = string.substr(i, 1);
            keychar = key.substr((i % key.length) - 1, 1);
            char = String.fromCharCode(char.charCodeAt(0) - keychar.charCodeAt(0));
            result += char;
        }

        this.last_string = result;
        return this.last_string;
    },
    encrypt(string:string, key:string) {
        const crypt = New(ClassFactory("_Crypt"), {
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._encrypt();
    },
    decrypt(string:string, key:string) {
        const crypt = New(ClassFactory("_Crypt"), {
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._decrypt();
    }
});

export const _CryptObject = function (o:any):string {
    return ClassFactory("_Crypt").encrypt(_DataStringify(o), _secretKey);
};
export const _DecryptObject = function (s:string):any {
    return (s === "") ? ({}) : (JSON.parse(ClassFactory("_Crypt").decrypt(s, _secretKey)));
};
