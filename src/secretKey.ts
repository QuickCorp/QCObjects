import { isBrowser } from "./platform";

export const _secretKey:string = (isBrowser)?(location.host):("secret");