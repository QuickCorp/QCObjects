import { __is_raw_class__ } from "./is_raw_class";

export const _LegacyCopy = function (obj) {
    var _value_;
    switch (true) {
      case typeof obj === "string":
        _value_ = obj;
        break;
      case typeof obj === "number":
        _value_ = obj;
        break;
      case typeof obj === "object":
        _value_ = Object.assign({}, obj);
        break;
      case typeof obj === "function":
        _value_ = obj.bind({});
        break;
      case __is_raw_class__(obj):
        _value_ = class extends obj { };
        break;
      default:
        break;
    }
    return _value_;
  };
