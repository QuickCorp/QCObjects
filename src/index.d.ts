declare module "QCObjects" {
    const _exports: any;
    export = _exports;
}
declare module "index" {
    import QCObjects from "QCObjects";
    export default QCObjects;
}
