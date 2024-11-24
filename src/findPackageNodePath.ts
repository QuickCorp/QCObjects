import { CONFIG } from "./CONFIG";
import { Export } from "./Export";
import { logger } from "./Logger";
import { isBrowser } from "./platform";

export const findPackageNodePath = function (packagename:string):string|null {
    let sdkPath = null;
    if (!isBrowser) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const fs = require("fs");
        try {
            let sdkPaths = [
                `${CONFIG.get("projectPath")}${CONFIG.get("relativeImportPath")}`,
                `${CONFIG.get("basePath")}${CONFIG.get("relativeImportPath")}`,
                `${CONFIG.get("projectPath")}`,
                `${CONFIG.get("basePath")}`,
                `${CONFIG.get("relativeImportPath")}`,
                `${process.cwd()}${CONFIG.get("relativeImportPath")}`,
                `${process.cwd()}/node_modules/` + packagename,
                `${process.cwd()}/node_modules`,
                `${process.cwd()}`,
                "node_modules",
                "./",
                ""
            ].concat(module.paths);
            sdkPaths = sdkPaths.filter(p => {
                return (fs).existsSync(p + "/" + packagename);
            });
            if (sdkPaths.length > 0) {
                sdkPath = sdkPaths[0];
                logger.info(packagename + " is Installed.");
            } else {
                sdkPath = "";
                logger.info(`${packagename} is not in a standard path.`);
            }
        } catch (e) {
            // do nothing
            console.log(e);
        }

    }
    return sdkPath;
};
Export(findPackageNodePath);
