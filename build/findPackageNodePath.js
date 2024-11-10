"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPackageNodePath = void 0;
const _import_1 = require("./_import_");
const CONFIG_1 = require("./CONFIG");
const Export_1 = require("./Export");
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
const findPackageNodePath = function (packagename) {
    let sdkPath = null;
    if (!platform_1.isBrowser) {
        let fs;
        (async () => {
            fs = await (0, _import_1._import_)("node:fs");
        })().then(() => {
            let sdkPaths = [
                `${CONFIG_1.CONFIG.get("projectPath")}${CONFIG_1.CONFIG.get("relativeImportPath")}`,
                `${CONFIG_1.CONFIG.get("basePath")}${CONFIG_1.CONFIG.get("relativeImportPath")}`,
                `${CONFIG_1.CONFIG.get("projectPath")}`,
                `${CONFIG_1.CONFIG.get("basePath")}`,
                `${CONFIG_1.CONFIG.get("relativeImportPath")}`,
                `${process.cwd()}${CONFIG_1.CONFIG.get("relativeImportPath")}`,
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
                Logger_1.logger.info(packagename + " is Installed.");
            }
            else {
                sdkPath = "";
                Logger_1.logger.info(`${packagename} is not in a standard path.`);
            }
        })
            .catch((e) => {
            throw new Error(e);
        });
    }
    return sdkPath;
};
exports.findPackageNodePath = findPackageNodePath;
(0, Export_1.Export)(exports.findPackageNodePath);
