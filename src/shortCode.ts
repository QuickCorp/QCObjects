import { _Crypt } from "./Crypt";

export const shortCode = function () {
    const length = 1000;
    const code1 = _Crypt.encrypt((Math.random() * length).toString().replace(".", ""), (new Date()).getTime().toString());
    const code2 = _Crypt.encrypt((Math.random() * length).toString().replace(".", ""), (new Date((new Date()).getTime() - 1000 * 1000)).getTime().toString());
    const shortCode = code2.list().map((o1:any, index:any) => {
      return code1.list()[index] === o1 ? null : o1;
    }).filter((c:any) => c !== null).join("");
    return shortCode;
  };
