"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get = exports.set = exports.setConfigService = exports.configService = exports.buildComponentsStack = exports.resetTop = exports.componentsStack = exports._top = void 0;
const ComponentFactory_1 = require("./ComponentFactory");
const Cast_1 = require("./Cast");
const globalSettings_1 = require("./globalSettings");
const Class_1 = require("./Class");
const ClassFactory_1 = require("./ClassFactory");
const Export_1 = require("./Export");
const platform_1 = require("./platform");
const PrimaryCollections_1 = require("./PrimaryCollections");
const Logger_1 = require("./Logger");
exports._top = ((typeof module !== "undefined" && typeof module.exports !== "undefined" && module.exports) ||
    (typeof global !== "undefined" && global) ||
    (typeof globalThis !== "undefined" && globalThis) ||
    (typeof window !== "undefined" && window) ||
    (typeof self !== "undefined" && self !== null && self) ||
    this);
exports._top.lastCache = undefined;
exports.componentsStack = [];
const resetTop = () => {
    const globalSettings = globalSettings_1.GlobalSettings.instance;
    exports._top = (0, Cast_1._CastProps)(globalSettings, exports._top, true);
};
exports.resetTop = resetTop;
const buildComponentsStack = () => {
    exports.componentsStack = (0, ComponentFactory_1.buildComponents)(document);
};
exports.buildComponentsStack = buildComponentsStack;
const setConfigService = (_configService) => {
    exports._top.global.configService = _configService;
    exports.configService = _configService;
};
exports.setConfigService = setConfigService;
const set = (name, value) => {
    exports._top[name] = value;
};
exports.set = set;
const get = (name, _defaultValue) => {
    return exports._top[name] || _defaultValue;
};
exports.get = get;
(0, exports.resetTop)();
const _define_props = function (_top) {
    if (!Object.hasOwn(_top, "PackagesList")) {
        Object.defineProperty(_top, "PackagesList", {
            // eslint-disable-next-line no-unused-vars
            set: (value) => {
                Logger_1.logger.debug("PackagesList is readonly");
            },
            get: () => {
                return (0, PrimaryCollections_1.getPackagesList)();
            }
        });
    }
    if (!Object.hasOwn(_top, "PackagesNameList")) {
        Object.defineProperty(_top, "PackagesNameList", {
            // eslint-disable-next-line no-unused-vars
            set: (val) => {
                Logger_1.logger.debug("PackagesNameList is readonly");
            },
            get: () => {
                return (0, PrimaryCollections_1.getPackagesNamesList)();
            }
        });
    }
    if (!Object.hasOwn(_top, "ClassesList")) {
        Object.defineProperty(_top, "ClassesList", {
            // eslint-disable-next-line no-unused-vars
            set: (value) => {
                Logger_1.logger.debug("ClassesList is readonly");
            },
            get: () => {
                return (0, PrimaryCollections_1.getClassesList)();
            }
        });
    }
    if (!Object.hasOwn(_top, "ClassesNameList")) {
        Object.defineProperty(_top, "ClassesNameList", {
            // eslint-disable-next-line no-unused-vars
            set(value) {
                Logger_1.logger.debug("ClassesNameList is readonly");
            },
            get: () => {
                return (0, PrimaryCollections_1.getClassesNamesList)();
            }
        });
    }
};
if (platform_1.isBrowser) {
    // use of GLOBAL word is deprecated in node.js
    // this is only for compatibility purpose with old versions of QCObjects in browsers
    (0, Class_1.Class)("GLOBAL", PrimaryCollections_1._QC_CLASSES.global); // case insensitive for compatibility con old versions;
    (0, Export_1.Export)((0, ClassFactory_1.ClassFactory)("GLOBAL"));
}
if (platform_1.isBrowser && typeof window !== "undefined") {
    (0, exports.set)("global", window);
}
else if (platform_1.isBrowser && typeof globalThis !== "undefined") {
    (0, exports.set)("global", globalThis);
}
_define_props(exports._top);
