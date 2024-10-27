"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCollection = exports.ArrayList = void 0;
const Class_1 = require("./Class");
const ClassFactory_1 = require("./ClassFactory");
const Logger_1 = require("./Logger");
const New_1 = require("./New");
exports.ArrayList = (0, Class_1.Class)("ArrayList", Array, []);
exports.ArrayCollection = (0, Class_1.Class)("ArrayCollection", Object, {
    source: (0, New_1.New)((0, ClassFactory_1.ClassFactory)("ArrayList"), []),
    changed(prop, value) {
        Logger_1.logger.debug("VALUE CHANGED");
        Logger_1.logger.debug(prop);
        Logger_1.logger.debug(value);
    },
    push(value) {
        const self = this;
        Logger_1.logger.debug("VALUE ADDED");
        Logger_1.logger.debug(value);
        self.source.push(value);
    },
    pop(value) {
        const self = this;
        Logger_1.logger.debug("VALUE POPPED");
        Logger_1.logger.debug(value);
        self.source.pop(value);
    },
    _new_(source) {
        const self = this;
        let _index = 0;
        self.source = (0, New_1.New)((0, ClassFactory_1.ClassFactory)("ArrayList"), source);
        for (const _k in self.source) {
            if (!isNaN(_k)) {
                Logger_1.logger.debug("binding " + _k.toString());
                (function (_pname) {
                    Object.defineProperty(self, _pname, {
                        set(value) {
                            Logger_1.logger.debug("setting " + _pname + "=" + value);
                            self.source[_pname] = value;
                            self.changed(_pname, value);
                        },
                        get() {
                            return self.source[_pname];
                        }
                    });
                })(_k);
                _index++;
            }
        }
        self.source.length = _index;
        Object.defineProperty(self, "length", {
            get() {
                return self.source.length;
            }
        });
    }
});
