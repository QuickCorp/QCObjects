import { ClassFactory } from "./ClassFactory";

export const shortCode = function () {
    var length = 1000;
    var code1 = ClassFactory("_Crypt").encrypt((Math.random() * length).toString().replace(".", ""), (new Date()).getTime().toString());
    var code2 = ClassFactory("_Crypt").encrypt((Math.random() * length).toString().replace(".", ""), (new Date((new Date()).getTime() - 1000 * 1000)).getTime().toString());
    var shortCode = code2.list().map((o1, index) => {
      return code1.list()[index] === o1 ? null : o1;
    }).filter(c => c !== null).join("");
    return shortCode;
  };
