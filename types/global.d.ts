declare const cordova: any;
interface QCObjectsElement {
    find(tag: string): Element[];
    subelements(tag: string): Element[];
    render (content:string): any;
}

interface Element extends QCObjectsElement {

}

interface Document extends QCObjectsElement {
}

interface ShadowRoot extends QCObjectsElement {

}
