"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shortCode = void 0;
const Crypt_1 = require("./Crypt");
const shortCode = () => {
    const length = 1000;
    const code1 = Crypt_1._Crypt.encrypt((Math.random() * length).toString().replace(".", ""), (new Date()).getTime().toString());
    const code2 = Crypt_1._Crypt.encrypt((Math.random() * length).toString().replace(".", ""), (new Date((new Date()).getTime() - 1000 * 1000)).getTime().toString());
    const shortCode = [...code2].map((o1, index) => {
        return [...code1][index] === o1 ? null : o1;
    }).filter((c) => c !== null).join("");
    return shortCode;
};
exports.shortCode = shortCode;
