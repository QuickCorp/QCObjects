    /**
     * Returns the QCObjects Class Factory of a given ClassName
     *
     * @param {String} name
     */

    export const ClassFactory = function (className) {
        var _classFactory;
        if (className !== null && className.indexOf(".") > -1) {
          var packageName = className.split(".").slice(0, className.split(".").length - 1).join(".");
          var _className = className.split(".").slice(-1).join("");
          var _package = Package(packageName);
          var packageClasses = (typeof _package !== "undefined") ? (_package.filter(classFactory => {
            return isQCObjects_Class(classFactory) &&
              (classFactory.__definition.__classType === _className || (typeof classFactory === "function" && !!classFactory.name));
          }).reverse()) : ([]);
          if (packageClasses.length > 0) {
            _classFactory = packageClasses[0];
          } else {
            throw Error(`Class ${className} not found.`);
          }
        } else if (className !== null && Object.hasOwnProperty.call(_QC_CLASSES, className)) {
          _classFactory = _QC_CLASSES[className];
        }
        return _classFactory;
      };
  