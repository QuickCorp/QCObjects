import { isBrowser } from "./platform";

export const _secretKey = (isBrowser)?(location.host):("secret");