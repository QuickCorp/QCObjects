"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._import_ = _import_;
const Logger_1 = require("./Logger");
async function _import_(name) {
    Logger_1.logger.debug(`Importing ${name}...`);
    function isPackage(name) {
        Logger_1.logger.debug(`Validating if ${name} is a package name...`);
        // Simple check to determine if the name is a package
        // This can be enhanced based on your specific needs
        return !name.startsWith(".") && !name.startsWith("/") && !name.includes("/");
    }
    try {
        // Ensure the name has a .js extension if it's not a package
        const hasExtension = /\.[^/\\]+$/.test(name);
        if (!hasExtension && !isPackage(name)) {
            Logger_1.logger.debug(`${name} does not have an extension and is not a package. Adding js extension.`);
            name += ".js";
        }
        const m = await import(name);
        return m;
    }
    catch (error) {
        Logger_1.logger.warn(`Failed to load module: ${error}`);
    }
}
