"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._secretKey = void 0;
const platform_1 = require("./platform");
exports._secretKey = (platform_1.isBrowser) ? (location.host) : ("secret");
