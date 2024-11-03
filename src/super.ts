import { ClassFactory } from "./ClassFactory";

/**
 * Returns a method from a superior QCObjects Class
 * It is useful for Class Inheritance in the _new_ and __new__ method constructors
 * @example _super_('MySuperClass','MySuperMethod').call(this,params) #where this is the current instance and params are method parameters
 *
 * @param {String} className
 * @param {String} classMethodName
 * @param {Object} params
 */
export const _super_ = function <T>(className: string, classMethodName: string):T {
  return (ClassFactory(className))[classMethodName] as T;
};
_super_.prototype.toString = function () {
  return "_super_(className,classMethodName,params) { [QCObjects native code] }";
};
