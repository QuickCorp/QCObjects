"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterClass = void 0;
const make_global_1 = require("./make_global");
const PrimaryCollections_1 = require("./PrimaryCollections");
const RegisterClass = function (_class_, __namespace) {
    return (0, PrimaryCollections_1.__register_class__)(_class_, __namespace);
};
exports.RegisterClass = RegisterClass;
(0, make_global_1.__make_global__)(exports.RegisterClass);
