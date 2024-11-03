"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._super_ = void 0;
const ClassFactory_1 = require("./ClassFactory");
/**
 * Returns a method from a superior QCObjects Class
 * It is useful for Class Inheritance in the _new_ and __new__ method constructors
 * @example _super_('MySuperClass','MySuperMethod').call(this,params) #where this is the current instance and params are method parameters
 *
 * @param {String} className
 * @param {String} classMethodName
 * @param {Object} params
 */
const _super_ = function (className, classMethodName) {
    return ((0, ClassFactory_1.ClassFactory)(className))[classMethodName];
};
exports._super_ = _super_;
exports._super_.prototype.toString = function () {
    return "_super_(className,classMethodName,params) { [QCObjects native code] }";
};
