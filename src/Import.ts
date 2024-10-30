import { _basePath_ } from "./basePath";
import { CONFIG } from "./CONFIG";
import { _DataStringify } from "./DataStringify";
import { _DOMCreateElement } from "./DOMCreateElement";
import { findPackageNodePath } from "./findPackageNodePath";
import { logger } from "./Logger";
import { _require_, isBrowser } from "./platform";
import { _QC_PACKAGES, _QC_PACKAGES_IMPORTED, _QC_READY_LISTENERS } from "./PrimaryCollections";

/**
 * Imports a script with the package nomenclature
 *
 * @param {Object} packagename
 * @param {Object} ready
 * @param {Boolean} external
 */
export const Import = function (packagename:string, ready?:Function, external?:boolean):Promise<{_imported_?:any, _package_name_?:string}> | undefined {

    if (external !== undefined){
        logger.debug(`[Import] Setting external=${external.toString()} resource to import: ${packagename}`);
    }    
    if (external) {
        logger.debug(`[Import] Registering external resource to import: ${packagename}`);
    } else {
        logger.debug(`[Import] Registering local resource to import: ${packagename}`);
    }
    let _promise_import_: Promise<any>;
    if (isBrowser) {
        _promise_import_ = new Promise(function (resolve, reject) {

            const allPackagesImported = function () {
                let ret = false;
                let cp = 0;
                // eslint-disable-next-line no-unused-vars
                for (const p in _QC_PACKAGES) {
                    cp++;
                }
                if (cp < _QC_PACKAGES_IMPORTED.length) {
                    ret = false;
                } else {
                    ret = true;
                }
                return ret;
            };

            const readyImported = function (e: { target: { remove: () => void; }; }) {
                _QC_PACKAGES_IMPORTED.push(ready as never);
                if (allPackagesImported()) {
                    _QC_PACKAGES_IMPORTED.map(function (_imported_) {
                        _QC_READY_LISTENERS.push(_imported_);
                    });
                }
                if (isBrowser && CONFIG.get("removePackageScriptAfterLoading")) {
                    e.target.remove();
                }
                resolve.call(_promise_import_, {
                    "_imported_": e.target,
                    "_package_name_": packagename
                });
            };

            if (!_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, packagename)) {
                const s1:HTMLScriptElement = _DOMCreateElement("script") as unknown as HTMLScriptElement;
                s1.type = CONFIG.get("sourceType", "text/javascript");
                s1.async = !!(CONFIG.get("asynchronousImportsLoad"));
                (s1 as any).onreadystatechange = function () {
                    if ((s1 as any).readyState === "complete") {
                        readyImported(s1 as any);
                    }
                };
                (s1 as any).onload = readyImported;
                s1.onerror = function (e: any) {
                    logger.debug(`An error ocurred: ${e}.`);
                    reject.call(_promise_import_, {
                        "_imported_": s1,
                        "_package_name_": packagename
                    });
                };
                s1.src = (external) ? (CONFIG.get("remoteImportsPath") + packagename + ".js") : (_basePath_ + CONFIG.get("relativeImportPath") + packagename + ".js");
                document.getElementsByTagName("head")[0].appendChild(s1);
            }
        });
        _promise_import_.catch(function () {
            logger.debug("Import: Error loading a package ");
        });

    } else {
        // support to be used in a nodejs environment
        _promise_import_ = new Promise(function (resolve, reject) {
            try {
                const standardNodePath = findPackageNodePath(packagename);
                let packageAbsoluteName = "";
                if (standardNodePath !== null) {
                    packageAbsoluteName = standardNodePath + "/" + packagename;
                } else {
                    const jsNodePath = findPackageNodePath(packagename + ".js");
                    if (jsNodePath !== null) {
                        packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
                    } else {
                        packageAbsoluteName = _basePath_ + CONFIG.get("relativeImportPath") + packagename;
                    }
                }
                try {
                    resolve.call(_promise_import_, {
                        "_imported_": _require_(`${packageAbsoluteName}`),
                        "_package_name_": packagename
                    });
                } catch (e) {
                    reject.call(_promise_import_, {
                        "_imported_": null,
                        "_package_name_": packagename,
                        "error": e
                    });
                }
            } catch (e) {
                reject.call(_promise_import_, {
                    "_imported_": null,
                    "_package_name_": packagename,
                    "error": e
                });
            }
        }).catch(function (e) {
            // something wrong importing a package
            logger.debug("Something happened when importing " + packagename);
            console.warn(e);
        });
    }
    _promise_import_.catch(function (e) {
        logger.warn(_DataStringify(e));
    });
    return _promise_import_;
};
Import.prototype.toString = function () {
    return "Import(packagename,ready,external) { [QCObjects native code] }";
};
