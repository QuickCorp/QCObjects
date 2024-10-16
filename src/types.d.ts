declare module "QCObjects" {
    export function __qcobjects__(_top: any): void;
    const _top: any;
    let _default: {
        __qcobjects__: (_top: any) => void;
        global: any;
    } | {
        default: {
            __qcobjects__: (_top: any) => void;
            global: any;
        };
        __qcobjects__: (_top: any) => void;
        global: any;
    };
    export { _default as default, _top as global };
}
declare module "index" {
    import QCObjects from "QCObjects";
    export default QCObjects;
}
