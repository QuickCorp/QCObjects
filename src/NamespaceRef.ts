import { isQCObjects_Class } from "./isQCObjects";
import { Package } from "./Package";

/**
 * Declare Namespace
 *
 * @param {String} packageName
 * @param {Object} package
 */
export const NamespaceRef = function (namespace) {
    let packageInstance = Package(namespace);
    let classes = packageInstance.filter(c => isQCObjects_Class(c)).map(c => {
        return {
            [c.__definition.__classType]: c
        };
    }).reduce((a, b) => Object.assign(a, b));
    return namespace.split(".").map(c => {
        return {
            [c]: classes
        };
    }).reverse().reduce((a, b) => {
        b[Object.keys(b).join(".")] = a;
        return b;
    });
};
