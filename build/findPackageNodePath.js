"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPackageNodePath = void 0;
const CONFIG_1 = require("./CONFIG");
const Export_1 = require("./Export");
const Logger_1 = require("./Logger");
const platform_1 = require("./platform");
const node_fs_1 = __importDefault(require("node:fs"));
const findPackageNodePath = function (packagename) {
    let sdkPath = null;
    if (!platform_1.isBrowser) {
        try {
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
                return (node_fs_1.default).existsSync(p + "/" + packagename);
            });
            if (sdkPaths.length > 0) {
                sdkPath = sdkPaths[0];
                Logger_1.logger.info(packagename + " is Installed.");
            }
            else {
                sdkPath = "";
                Logger_1.logger.info(`${packagename} is not in a standard path.`);
            }
        }
        catch (e) {
            // do nothing
            console.log(e);
        }
    }
    return sdkPath;
};
exports.findPackageNodePath = findPackageNodePath;
(0, Export_1.Export)(exports.findPackageNodePath);
