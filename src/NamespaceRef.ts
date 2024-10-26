import { isQCObjects_Class } from "./isQCObjects";
import { Package } from "./Package";

/**
 * Declare Namespace
 *
 * @param {String} packageName
 * @param {Object} package
 */
export const NamespaceRef = function (namespace:string) {
    let packageInstance = Package(namespace);
    let classes = packageInstance.filter((c:any) => isQCObjects_Class(c)).map((c:any) => {
        return {
            [c.__definition.__classType]: c
        };
    }).reduce((a:any, b:any) => Object.assign(a, b));
    return namespace.split(".").map(c => {
        return {
            [c]: classes
        };
    }).reverse().reduce((a, b) => {
        b[Object.keys(b).join(".")] = a;
        return b;
    });
};
