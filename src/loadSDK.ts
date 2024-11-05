import { CONFIG } from "./CONFIG";
import { findPackageNodePath } from "./findPackageNodePath";
import { Import } from "./Import";
import { logger } from "./Logger";
import { _require_, isBrowser, isNodeCommonJS } from "./platform";

function loadSDK() {
    if (CONFIG.get("useSDK")) {
        (function () {
            const remoteImportsPath = CONFIG.get("remoteImportsPath");
            const external = (!CONFIG.get("useLocalSDK"));
            CONFIG.set("remoteImportsPath", CONFIG.get("remoteSDKPath"));

            let tryImportingSDK = false;
            let sdkName = "QCObjects-SDK";
            if (isBrowser) {
                tryImportingSDK = true;
            } else {
                const sdkPath = findPackageNodePath("qcobjects-sdk");
                if (sdkPath !== null) {
                    sdkName = "qcobjects-sdk";
                    tryImportingSDK = true;
                } else if (sdkPath !== ""){
                    sdkName = "node_modules/qcobjects-sdk/QCObjects-SDK";
                    tryImportingSDK = true;
                } else {
                    tryImportingSDK = false;
                }
            }

            if (tryImportingSDK) {
                logger.info("Importing SDK... " + sdkName);
                if (isNodeCommonJS && typeof require !== "undefined") {
                    const sdk = _require_("qcobjects-sdk");
                    if (sdk) {
                        logger.debug("QCObjects SDK was loaded OK.");
                    } else {
                        logger.debug("QCObjects SDK could not be imported.");
                    }
                } else {
                    Import(sdkName, function () {
                        if (external) {
                            logger.debug("QCObjects-SDK.js loaded from remote location");
                        } else {
                            logger.debug("QCObjects-SDK.js loaded from local");
                        }
                        CONFIG.set("remoteImportsPath", remoteImportsPath);
                    }, external)
                        ?.catch((e: any) => { throw new Error(`An error ocurred when trying to import: ${e}`); });
                }
            } else {
                logger.debug("SDK has not been imported as it is not available at the moment");
            }
        })();
    }

}

export default loadSDK;
