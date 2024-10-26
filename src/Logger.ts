import { isBrowser } from "./platform";

export class Logger {
    debugEnabled = true;
    infoEnabled = true;
    warnEnabled = true;
    debug(message:string) {
        if (this.debugEnabled) {
            console.log("\x1b[35m%s\x1b[0m", `[DEBUG][${performance.now().toLocaleString()}] ${message}`);
        }
    }

    info(message:string) {
        let color;
        if (this.infoEnabled) {
            if (isBrowser) {
                color = "\x1b[103m%s\x1b[0m";
            } else {
                color = "\x1b[33m%s\x1b[0m";
            }
            console.info(color, `[INFO][${performance.now().toLocaleString()}] ${message}`);
        }
    }

    warn(message:string) {
        if (this.warnEnabled) {
            console.warn("\x1b[31m%s\x1b[0m", `[WARN][${performance.now().toLocaleString()}] ${message}`);
        }
    }
}

export const logger = new Logger();
