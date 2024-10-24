declare module "platform" {
    export const isDeno: boolean;
    export const isBrowser: boolean;
    export const isNodeCommonJS: boolean;
    export const deno_require: (name: string) => void;
    export const _require_: (name: string) => void;
    export const is_phonegap: boolean;
}
declare module "QCObjects" {
    const _top: any;
    export default _top;
}
declare module "index" {
    import QCObjects from "QCObjects";
    export default QCObjects;
}
