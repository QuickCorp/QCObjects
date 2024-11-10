import { logger } from "./Logger";

async function _import_(name:string):Promise<any> {
    logger.debug(`Importing ${name}...`);
    function isPackage(name:string) {
      logger.debug(`Validating if ${name} is a package name...`);
      // Simple check to determine if the name is a package
      // This can be enhanced based on your specific needs
      return !name.startsWith(".") && !name.startsWith("/") && !name.includes("/");
    }
  
    try {
      // Ensure the name has a .js extension if it's not a package
      const hasExtension = /\.[^/\\]+$/.test(name);
      if (!hasExtension && !isPackage(name)) {
        logger.debug(`${name} does not have an extension and is not a package. Adding js extension.`);
        name += ".js";
      }
  
      const m:any = await import(name);
      return m;
    } catch (error:any) {
      logger.warn(`Failed to load module: ${error}`);
    }
  }
  
export {_import_};