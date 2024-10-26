export const isQCObjects_Object = function (_:any):boolean {
    return (typeof _ === "object" &&
      Object.hasOwnProperty.call(_, "__classType") &&
      (!!_.__instanceID) &&
      Object.hasOwnProperty.call(_, "__definition") &&
      typeof _.__definition !== "undefined"
    ) ? (true) : (false);
  };

  export const isQCObjects_Class = function (_:any):boolean {
    return (typeof _ === "function" &&
      (!_.__instanceID) &&
      (!!_.__definition) &&
      typeof _.__definition !== "undefined" &&
      !!_.__definition.__classType
    ) ? (true) : (false);
  };
