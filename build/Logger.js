"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.Logger = void 0;
const Export_1 = require("./Export");
const platform_1 = require("./platform");
class Logger {
    debugEnabled = true;
    infoEnabled = true;
    warnEnabled = true;
    debug(message) {
        if (this.debugEnabled) {
            console.log("\x1b[35m%s\x1b[0m", `[DEBUG][${performance.now().toLocaleString()}] ${message}`);
        }
    }
    info(message) {
        let color;
        if (this.infoEnabled) {
            if (platform_1.isBrowser) {
                color = "\x1b[103m%s\x1b[0m";
            }
            else {
                color = "\x1b[33m%s\x1b[0m";
            }
            console.info(color, `[INFO][${performance.now().toLocaleString()}] ${message}`);
        }
    }
    warn(message) {
        if (this.warnEnabled) {
            console.warn("\x1b[31m%s\x1b[0m", `[WARN][${performance.now().toLocaleString()}] ${message}`);
        }
    }
}
exports.Logger = Logger;
exports.logger = new Logger();
(0, Export_1.Export)(exports.logger);
