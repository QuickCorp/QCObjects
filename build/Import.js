"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Import = void 0;
const basePath_1 = require("./basePath");
const CONFIG_1 = require("./CONFIG");
const DataStringify_1 = require("./DataStringify");
const DOMCreateElement_1 = require("./DOMCreateElement");
const findPackageNodePath_1 = require("./findPackageNodePath");
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
const PrimaryCollections_1 = require("./PrimaryCollections");
/**
 * Imports a script with the package nomenclature
 *
 * @param {Object} packagename
 * @param {Object} ready
 * @param {Boolean} external
 */
const Import = function (packagename, ready, external) {
    if (external !== undefined) {
        Logger_1.logger.debug(`[Import] Setting external=${external.toString()} resource to import: ${packagename}`);
    }
    if (external) {
        Logger_1.logger.debug(`[Import] Registering external resource to import: ${packagename}`);
    }
    else {
        Logger_1.logger.debug(`[Import] Registering local resource to import: ${packagename}`);
    }
    let _promise_import_;
    if (platform_1.isBrowser) {
        _promise_import_ = new Promise(function (resolve, reject) {
            const allPackagesImported = function () {
                let ret = false;
                let cp = 0;
                // eslint-disable-next-line no-unused-vars
                for (const p in PrimaryCollections_1._QC_PACKAGES) {
                    cp++;
                }
                if (cp < PrimaryCollections_1._QC_PACKAGES_IMPORTED.length) {
                    ret = false;
                }
                else {
                    ret = true;
                }
                return ret;
            };
            const readyImported = function (e) {
                PrimaryCollections_1._QC_PACKAGES_IMPORTED.push(ready);
                if (allPackagesImported()) {
                    PrimaryCollections_1._QC_PACKAGES_IMPORTED.map((_imported_) => {
                        return PrimaryCollections_1._QC_READY_LISTENERS.push(_imported_);
                    });
                }
                if (platform_1.isBrowser && CONFIG_1.CONFIG.get("removePackageScriptAfterLoading")) {
                    e.target.remove();
                }
                resolve.call(_promise_import_, {
                    "_imported_": e.target,
                    "_package_name_": packagename
                });
            };
            if (!Object.hasOwn(PrimaryCollections_1._QC_PACKAGES, packagename)) {
                const s1 = (0, DOMCreateElement_1._DOMCreateElement)("script");
                s1.type = CONFIG_1.CONFIG.get("sourceType", "text/javascript");
                s1.async = !!(CONFIG_1.CONFIG.get("asynchronousImportsLoad"));
                s1.onreadystatechange = function () {
                    if (s1.readyState === "complete") {
                        readyImported(s1);
                    }
                };
                s1.onload = readyImported;
                s1.onerror = function (e) {
                    Logger_1.logger.debug(`An error ocurred: ${e}.`);
                    reject.call(_promise_import_, {
                        "_imported_": s1,
                        "_package_name_": packagename
                    });
                };
                s1.src = (external) ? (CONFIG_1.CONFIG.get("remoteImportsPath") + packagename + ".js") : (basePath_1._basePath_ + CONFIG_1.CONFIG.get("relativeImportPath") + packagename + ".js");
                document.getElementsByTagName("head")[0].appendChild(s1);
            }
        });
        _promise_import_.catch(function () {
            Logger_1.logger.debug("Import: Error loading a package ");
        });
    }
    else {
        // support to be used in a nodejs environment
        _promise_import_ = new Promise(function (resolve, reject) {
            try {
                const standardNodePath = (0, findPackageNodePath_1.findPackageNodePath)(packagename);
                let packageAbsoluteName = "";
                if (standardNodePath !== null) {
                    packageAbsoluteName = standardNodePath + "/" + packagename;
                }
                else {
                    const jsNodePath = (0, findPackageNodePath_1.findPackageNodePath)(packagename + ".js");
                    if (jsNodePath !== null) {
                        packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
                    }
                    else {
                        packageAbsoluteName = basePath_1._basePath_ + CONFIG_1.CONFIG.get("relativeImportPath") + packagename;
                    }
                }
                try {
                    resolve.call(_promise_import_, {
                        "_imported_": (0, platform_1._require_)(`${packageAbsoluteName}`),
                        "_package_name_": packagename
                    });
                }
                catch (e) {
                    reject.call(_promise_import_, {
                        "_imported_": null,
                        "_package_name_": packagename,
                        "error": e
                    });
                }
            }
            catch (e) {
                reject.call(_promise_import_, {
                    "_imported_": null,
                    "_package_name_": packagename,
                    "error": e
                });
            }
        }).catch(function (e) {
            // something wrong importing a package
            Logger_1.logger.debug("Something happened when importing " + packagename);
            console.warn(e);
        });
    }
    _promise_import_.catch(function (e) {
        Logger_1.logger.warn((0, DataStringify_1._DataStringify)(e));
    });
    return _promise_import_;
};
exports.Import = Import;
exports.Import.prototype.toString = function () {
    return "Import(packagename,ready,external) { [QCObjects native code] }";
};
