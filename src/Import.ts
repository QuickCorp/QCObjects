import { _basePath_ } from "./basePath";
import { _DataStringify } from "./DataStringify";
import { _DOMCreateElement } from "./DOMCreateElement";
import { findPackageNodePath } from "./findPackageNodePath";
import { logger } from "./Logger";
import { _require_, isBrowser } from "./platform";
import { _QC_PACKAGES, _QC_PACKAGES_IMPORTED, _QC_READY_LISTENERS } from "./PrimaryCollections";
import { _top } from "./top";

/**
 * Imports a script with the package nomenclature
 *
 * @param {Object} packagename
 * @param {Object} ready
 * @param {Boolean} external
 */
export const Import = function () {
    var packagename;
    var ready = function () { };
    var external = false;
    if (arguments.length < 1) {
        return;
    } else if (arguments.length === 1) {
        packagename = arguments[0];
    } else if (arguments.length === 2) {
        packagename = arguments[0];
        ready = arguments[1];
    } else if (arguments.length > 2) {
        packagename = arguments[0];
        ready = arguments[1];
        external = arguments[2];
        logger.debug("[Import] Setting external=" + external.toString() + " resource to import: " + packagename);
    }
    if (external) {
        logger.debug("[Import] Registering external resource to import: " + packagename);
    } else {
        logger.debug("[Import] Registering local resource to import: " + packagename);
    }
    var _promise_import_;
    if (isBrowser) {
        _promise_import_ = new Promise(function (resolve, reject) {

            var allPackagesImported = function () {
                var ret = false;
                var cp = 0;
                for (var p in _QC_PACKAGES) {
                    cp++;
                }
                if (cp < _QC_PACKAGES_IMPORTED.length) {
                    ret = false;
                } else {
                    ret = true;
                }
                return ret;
            };

            var readyImported = function (e) {
                _QC_PACKAGES_IMPORTED.push(ready);
                if (allPackagesImported()) {
                    _QC_PACKAGES_IMPORTED.map(function (_imported_) {
                        _QC_READY_LISTENERS.push(_imported_);
                    });
                }
                if (isBrowser && _top.CONFIG.get("removePackageScriptAfterLoading")) {
                    e.target.remove();
                }
                resolve.call(_promise_import_, {
                    "_imported_": e.target,
                    "_package_name_": packagename
                });
            };

            if (!_QC_PACKAGES.hasOwnProperty.call(_QC_PACKAGES, packagename)) {
                var s1 = _DOMCreateElement("script");
                s1.type = _top.CONFIG.get("sourceType", "text/javascript");
                s1.async = (_top.CONFIG.get("asynchronousImportsLoad")) ? (true) : (false);
                s1.onreadystatechange = function () {
                    if (s1.readyState === "complete") {
                        readyImported.call();
                    }
                };
                s1.onload = readyImported;
                s1.onerror = function (e) {
                    reject.call(_promise_import_, {
                        "_imported_": s1,
                        "_package_name_": packagename
                    });
                };
                s1.src = (external) ? (_top.CONFIG.get("remoteImportsPath") + packagename + ".js") : (_basePath_ + _top.CONFIG.get("relativeImportPath") + packagename + ".js");
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
                var standardNodePath = findPackageNodePath(packagename);
                var packageAbsoluteName = "";
                if (standardNodePath !== null) {
                    packageAbsoluteName = standardNodePath + "/" + packagename;
                } else {
                    var jsNodePath = findPackageNodePath(packagename + ".js");
                    if (jsNodePath !== null) {
                        packageAbsoluteName = jsNodePath + "/" + packagename + ".js";
                    } else {
                        packageAbsoluteName = _basePath_ + _top.CONFIG.get("relativeImportPath") + packagename;
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
