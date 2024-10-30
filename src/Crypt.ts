import { _ICrypt } from "types";
import { Base64 } from "./Base64";
import { _DataStringify } from "./DataStringify";
import { InheritClass } from "./InheritClass";
import { Package } from "./Package";
import { _secretKey } from "./secretKey";


export class _Crypt extends InheritClass implements _ICrypt{
    string: string = "";
    key: string = "";
    // eslint-disable-next-line no-unused-vars
    encrypt(_string_: string, key: string): string {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line no-unused-vars
    decrypt(_string_: string, key: string): string {
        throw new Error("Method not implemented.");
    }
    last_string= "";
    last_key= "";
    construct= false;
    _new_(o: { string?: string; key: string; }) {
        const string = o.string;
        let key:string = (o.hasOwnProperty.call(o, "key")) ? (o.key) : ("");
        this.__new__(o);
        key = (key === "") ? (this.__instanceID.toString()) : (key);
        this.last_key = key;
        this.last_string = string as string;
        this.construct = true;
    }
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
    }
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
    } 
    static encrypt(string:string, key:string):string {
        const crypt = new _Crypt({
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._encrypt();
    } 
    static decrypt(string:string, key:string) {
        const crypt = new _Crypt({
            string,
            key: (key !== "") ? (key) : ("12345678ABC")
        });
        return crypt._decrypt();
    }
}

export const _CryptObject = function (o:any):string {
    return _Crypt.encrypt(_DataStringify(o), _secretKey);
};
export const _DecryptObject = function (s:string):any {
    return (s === "") ? ({}) : (JSON.parse(_Crypt.decrypt(s, _secretKey)));
};

Package( "com.qcobjects", [_Crypt]);