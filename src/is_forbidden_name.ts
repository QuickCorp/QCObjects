/**
 * Internal use to determine the forbidden names for classes
 * Reserved words
 *
 * @param {String} name
 * @param {Object} type
 * @param {Object} definition
 */
export const __is__forbidden_name__ = (name: string):boolean => {
  return (["__proto__", "prototype", "Object", "Map", "defineProperty", "indexOf", "toString", "__instanceID", "function", "Function"].indexOf(name) !== -1);
};
