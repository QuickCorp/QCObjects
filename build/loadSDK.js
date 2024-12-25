"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CONFIG_1 = require("./CONFIG");
const findPackageNodePath_1 = require("./findPackageNodePath");
const Import_1 = require("./Import");
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
const loadSDK = () => {
    if (CONFIG_1.CONFIG.get("useSDK")) {
        (function () {
            const remoteImportsPath = CONFIG_1.CONFIG.get("remoteImportsPath");
            const external = (!CONFIG_1.CONFIG.get("useLocalSDK"));
            CONFIG_1.CONFIG.set("remoteImportsPath", CONFIG_1.CONFIG.get("remoteSDKPath"));
            let tryImportingSDK = false;
            let sdkName = "QCObjects-SDK";
            if (platform_1.isBrowser) {
                tryImportingSDK = true;
            }
            else {
                const sdkPath = (0, findPackageNodePath_1.findPackageNodePath)("qcobjects-sdk");
                if (sdkPath !== null) {
                    sdkName = "qcobjects-sdk";
                    tryImportingSDK = true;
                }
                else if (sdkPath !== "") {
                    sdkName = "node_modules/qcobjects-sdk/QCObjects-SDK";
                    tryImportingSDK = true;
                }
                else {
                    tryImportingSDK = false;
                }
            }
            if (tryImportingSDK) {
                Logger_1.logger.info("Importing SDK... " + sdkName);
                if (platform_1.isNodeCommonJS && typeof require !== "undefined") {
                    const sdk = (0, platform_1._require_)("qcobjects-sdk");
                    if (sdk) {
                        Logger_1.logger.debug("QCObjects SDK was loaded OK.");
                    }
                    else {
                        Logger_1.logger.debug("QCObjects SDK could not be imported.");
                    }
                }
                else {
                    (0, Import_1.Import)(sdkName, function () {
                        if (external) {
                            Logger_1.logger.debug("QCObjects-SDK.js loaded from remote location");
                        }
                        else {
                            Logger_1.logger.debug("QCObjects-SDK.js loaded from local");
                        }
                        CONFIG_1.CONFIG.set("remoteImportsPath", remoteImportsPath);
                    }, external)
                        ?.catch((e) => { throw new Error(`An error ocurred when trying to import: ${e}`); });
                }
            }
            else {
                Logger_1.logger.debug("SDK has not been imported as it is not available at the moment");
            }
        })();
    }
};
exports.default = loadSDK;
