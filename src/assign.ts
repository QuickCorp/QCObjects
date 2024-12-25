    // Object.assign Polyfilling
    // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
    if (typeof Object.assign !== "function") {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
          // eslint-disable-next-line no-unused-vars
          value: function assign(target: null, varArgs: any):any { // .length of function is 2
            "use strict";
            if (target === null) { // TypeError if undefined or null
              throw new TypeError("Cannot convert undefined or null to object");
            }
  
            const to = Object(target);
  
            for (let index = 1; index < arguments.length; index++) {
              // eslint-disable-next-line prefer-rest-params
              const nextSource = arguments[index];
  
              if (nextSource !== null) { // Skip over if undefined or null
                for (const nextKey in nextSource) {
                  // Avoid bugs when hasOwnProperty is shadowed
                  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                  }
                }
              }
            }
            return to;
          },
          writable: true,
          configurable: true
        });
      }
export {};