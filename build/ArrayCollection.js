"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayCollection = exports.ArrayList = void 0;
const ClassFactory_1 = require("./ClassFactory");
const Logger_1 = require("./Logger");
const New_1 = require("./New");
const mathFunctions_1 = require("./mathFunctions");
class ArrayList extends Array {
    prototype;
    unique() {
        return this.filter(function (value, index, self) {
            return self.indexOf(value) === index;
        });
    }
    ;
    table() {
        console.table(this);
    }
    ;
    sum() {
        return this.reduce((prev, current) => {
            return ((0, mathFunctions_1.__to_number)(prev)) + ((0, mathFunctions_1.__to_number)(current));
        }, 0);
    }
    avg() {
        return (this.length < 1) ? (0) : (this.reduce((prev, current) => {
            return ((((0, mathFunctions_1.__to_number)(prev)) + ((0, mathFunctions_1.__to_number)(current))) / 2);
        }));
    }
    min() {
        return this.reduce((prev, current) => {
            return ((0, mathFunctions_1.__to_number)(prev) <= (0, mathFunctions_1.__to_number)(current)) ? (prev) : (current);
        }, Infinity);
    }
    max() {
        return this.reduce((prev, current) => {
            return ((0, mathFunctions_1.__to_number)(prev) >= (0, mathFunctions_1.__to_number)(current)) ? (prev) : (current);
        }, 0);
    }
    sortBy(propName, sortAsc) {
        const sort_function = (sortAsc) ? (function (prev, current) {
            return current[propName] < prev[propName] ? 1 : -1;
        }) : (function (prev, current) {
            return current[propName] > prev[propName] ? 1 : -1;
        });
        return this.sort(sort_function);
    }
    matrix(length, fillValue) {
        const x_func = () => {
            return fillValue;
        };
        return Array.from({
            length: length
        }, x_func);
    }
    matrix2d(length, fillValue) {
        const y_func = function () {
            return fillValue;
        };
        const x_func = function () {
            return Array.from({
                length
            }, y_func);
        };
        return Array.from({
            length
        }, x_func);
    }
    matrix3d(length, fillValue) {
        const y_func = function () {
            return Array.from({
                length
            }, function () {
                return fillValue;
            });
        };
        const x_func = function () {
            return Array.from({
                length
            }, y_func);
        };
        return Array.from({
            length
        }, x_func);
    }
}
exports.ArrayList = ArrayList;
class ArrayCollection {
    source = (0, New_1.New)(ArrayList, []);
    changed(prop, value) {
        Logger_1.logger.debug("VALUE CHANGED");
        Logger_1.logger.debug(prop);
        Logger_1.logger.debug(value);
    }
    push(value) {
        const self = this;
        Logger_1.logger.debug("VALUE ADDED");
        Logger_1.logger.debug(value);
        return self.source.push(value);
    }
    pop() {
        const self = this;
        Logger_1.logger.debug("VALUE POPPED");
        return self.source.pop();
    }
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
}
exports.ArrayCollection = ArrayCollection;
