/**
 * QCObjects  2.4
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
 */
/* eslint no-unused-vars: "off" */
/* eslint no-redeclare: "off" */
/* eslint no-empty: "off" */
/* eslint strict: "off" */
/* eslint no-mixed-operators: "off" */
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports._buildComponentsFromElements_ = exports.componentLoader = exports.serviceLoader = exports.captureFalseTouch = exports.Ready = exports.ready = exports._Ready = exports.New = exports.Processor = exports.shortCode = exports._super_ = exports.InheritClass = exports.Class = exports.Export = exports.ClassFactory = exports.Package = exports.isQCObjects_Object = exports.isQCObjects_Class = exports._CastProps = exports._Cast = exports.waitUntil = exports.ComplexStorageCache = exports.is_a = exports.__getType__ = exports.ObjectName = exports.__instanceID = exports.asyncLoad = exports._fireAsyncLoad = exports._LegacyCopy = exports.__is_raw_class__ = exports.subelements = exports.isNodeCommonJS = exports.isBrowser = exports.is_phonegap = exports._require_ = exports.Logger = exports.logger = exports._protected_code_ = exports._methods_ = exports._DOMCreateElement = exports._DataStringify = exports._QC_READY_LISTENERS = exports._QC_PACKAGES_IMPORTED = exports._QC_PACKAGES = exports._QC_CLASSES = exports.resetTop = exports._top = exports.qcobjects = exports.__top__ = exports.AssignPolyfill = void 0;
exports.set = exports.get = exports.__make_global__ = exports.global = exports.__to_number = exports.getDocumentLayout = exports.findPackageNodePath = exports.Toggle = exports.DDO = exports.ArrayList = exports.ArrayCollection = exports.range = exports._tag_filter_ = exports.Timer = exports.TransitionEffect = exports.Effect = exports.VO = exports.Service = exports.JSONService = exports.ConfigService = exports.View = exports.Controller = exports.CONFIG = exports.RegisterWidgets = exports.RegisterWidget = exports._ComponentWidget_ = exports.RegisterClass = exports.GlobalSettings = exports.SourceCSS = exports.SourceJS = exports.DefaultTemplateHandler = exports._Crypt = exports.Component = exports.BackendMicroservice = exports.Import = exports.TagElements = exports.Tag = exports.setDefaultProcessors = exports.NamespaceRef = exports.ComponentURI = void 0;
exports.AssignPolyfill = __importStar(require("./assign"));
exports.__top__ = __importStar(require("./top"));
exports.qcobjects = __importStar(require("./MainProcess"));
var top_1 = require("./top");
Object.defineProperty(exports, "_top", { enumerable: true, get: function () { return top_1._top; } });
Object.defineProperty(exports, "resetTop", { enumerable: true, get: function () { return top_1.resetTop; } });
var PrimaryCollections_1 = require("./PrimaryCollections");
Object.defineProperty(exports, "_QC_CLASSES", { enumerable: true, get: function () { return PrimaryCollections_1._QC_CLASSES; } });
Object.defineProperty(exports, "_QC_PACKAGES", { enumerable: true, get: function () { return PrimaryCollections_1._QC_PACKAGES; } });
Object.defineProperty(exports, "_QC_PACKAGES_IMPORTED", { enumerable: true, get: function () { return PrimaryCollections_1._QC_PACKAGES_IMPORTED; } });
Object.defineProperty(exports, "_QC_READY_LISTENERS", { enumerable: true, get: function () { return PrimaryCollections_1._QC_READY_LISTENERS; } });
var DataStringify_1 = require("./DataStringify");
Object.defineProperty(exports, "_DataStringify", { enumerable: true, get: function () { return DataStringify_1._DataStringify; } });
var DOMCreateElement_1 = require("./DOMCreateElement");
Object.defineProperty(exports, "_DOMCreateElement", { enumerable: true, get: function () { return DOMCreateElement_1._DOMCreateElement; } });
var introspection_1 = require("./introspection");
Object.defineProperty(exports, "_methods_", { enumerable: true, get: function () { return introspection_1._methods_; } });
Object.defineProperty(exports, "_protected_code_", { enumerable: true, get: function () { return introspection_1._protected_code_; } });
var Logger_1 = require("./Logger");
Object.defineProperty(exports, "logger", { enumerable: true, get: function () { return Logger_1.logger; } });
Object.defineProperty(exports, "Logger", { enumerable: true, get: function () { return Logger_1.Logger; } });
var platform_1 = require("./platform");
Object.defineProperty(exports, "_require_", { enumerable: true, get: function () { return platform_1._require_; } });
Object.defineProperty(exports, "is_phonegap", { enumerable: true, get: function () { return platform_1.is_phonegap; } });
Object.defineProperty(exports, "isBrowser", { enumerable: true, get: function () { return platform_1.isBrowser; } });
Object.defineProperty(exports, "isNodeCommonJS", { enumerable: true, get: function () { return platform_1.isNodeCommonJS; } });
var subelements_1 = require("./subelements");
Object.defineProperty(exports, "subelements", { enumerable: true, get: function () { return subelements_1.subelements; } });
var is_raw_class_1 = require("./is_raw_class");
Object.defineProperty(exports, "__is_raw_class__", { enumerable: true, get: function () { return is_raw_class_1.__is_raw_class__; } });
var LegacyCopy_1 = require("./LegacyCopy");
Object.defineProperty(exports, "_LegacyCopy", { enumerable: true, get: function () { return LegacyCopy_1._LegacyCopy; } });
var asyncLoad_1 = require("./asyncLoad");
Object.defineProperty(exports, "_fireAsyncLoad", { enumerable: true, get: function () { return asyncLoad_1._fireAsyncLoad; } });
Object.defineProperty(exports, "asyncLoad", { enumerable: true, get: function () { return asyncLoad_1.asyncLoad; } });
var IncrementInstanceID_1 = require("./IncrementInstanceID");
Object.defineProperty(exports, "__instanceID", { enumerable: true, get: function () { return IncrementInstanceID_1.__instanceID; } });
var ObjectName_1 = require("./ObjectName");
Object.defineProperty(exports, "ObjectName", { enumerable: true, get: function () { return ObjectName_1.ObjectName; } });
var getType_1 = require("./getType");
Object.defineProperty(exports, "__getType__", { enumerable: true, get: function () { return getType_1.__getType__; } });
var is_a_1 = require("./is_a");
Object.defineProperty(exports, "is_a", { enumerable: true, get: function () { return is_a_1.is_a; } });
var ComplexStorageCache_1 = require("./ComplexStorageCache");
Object.defineProperty(exports, "ComplexStorageCache", { enumerable: true, get: function () { return ComplexStorageCache_1.ComplexStorageCache; } });
var waitUntil_1 = require("./waitUntil");
Object.defineProperty(exports, "waitUntil", { enumerable: true, get: function () { return waitUntil_1.waitUntil; } });
var Cast_1 = require("./Cast");
Object.defineProperty(exports, "_Cast", { enumerable: true, get: function () { return Cast_1._Cast; } });
Object.defineProperty(exports, "_CastProps", { enumerable: true, get: function () { return Cast_1._CastProps; } });
var isQCObjects_1 = require("./isQCObjects");
Object.defineProperty(exports, "isQCObjects_Class", { enumerable: true, get: function () { return isQCObjects_1.isQCObjects_Class; } });
Object.defineProperty(exports, "isQCObjects_Object", { enumerable: true, get: function () { return isQCObjects_1.isQCObjects_Object; } });
var Package_1 = require("./Package");
Object.defineProperty(exports, "Package", { enumerable: true, get: function () { return Package_1.Package; } });
var ClassFactory_1 = require("./ClassFactory");
Object.defineProperty(exports, "ClassFactory", { enumerable: true, get: function () { return ClassFactory_1.ClassFactory; } });
var Export_1 = require("./Export");
Object.defineProperty(exports, "Export", { enumerable: true, get: function () { return Export_1.Export; } });
var Class_1 = require("./Class");
Object.defineProperty(exports, "Class", { enumerable: true, get: function () { return Class_1.Class; } });
var InheritClass_1 = require("./InheritClass");
Object.defineProperty(exports, "InheritClass", { enumerable: true, get: function () { return InheritClass_1.InheritClass; } });
var super_1 = require("./super");
Object.defineProperty(exports, "_super_", { enumerable: true, get: function () { return super_1._super_; } });
var shortCode_1 = require("./shortCode");
Object.defineProperty(exports, "shortCode", { enumerable: true, get: function () { return shortCode_1.shortCode; } });
var Processor_1 = require("./Processor");
Object.defineProperty(exports, "Processor", { enumerable: true, get: function () { return Processor_1.Processor; } });
var New_1 = require("./New");
Object.defineProperty(exports, "New", { enumerable: true, get: function () { return New_1.New; } });
var Ready_1 = require("./Ready");
Object.defineProperty(exports, "_Ready", { enumerable: true, get: function () { return Ready_1._Ready; } });
Object.defineProperty(exports, "ready", { enumerable: true, get: function () { return Ready_1.ready; } });
Object.defineProperty(exports, "Ready", { enumerable: true, get: function () { return Ready_1.Ready; } });
var captureFalseTouch_1 = require("./captureFalseTouch");
Object.defineProperty(exports, "captureFalseTouch", { enumerable: true, get: function () { return captureFalseTouch_1.captureFalseTouch; } });
var serviceLoader_1 = require("./serviceLoader");
Object.defineProperty(exports, "serviceLoader", { enumerable: true, get: function () { return serviceLoader_1.serviceLoader; } });
var componentLoader_1 = require("./componentLoader");
Object.defineProperty(exports, "componentLoader", { enumerable: true, get: function () { return componentLoader_1.componentLoader; } });
var ComponentFactory_1 = require("./ComponentFactory");
Object.defineProperty(exports, "_buildComponentsFromElements_", { enumerable: true, get: function () { return ComponentFactory_1._buildComponentsFromElements_; } });
Object.defineProperty(exports, "ComponentURI", { enumerable: true, get: function () { return ComponentFactory_1.ComponentURI; } });
var NamespaceRef_1 = require("./NamespaceRef");
Object.defineProperty(exports, "NamespaceRef", { enumerable: true, get: function () { return NamespaceRef_1.NamespaceRef; } });
var defaultProcessors_1 = require("./defaultProcessors");
Object.defineProperty(exports, "setDefaultProcessors", { enumerable: true, get: function () { return defaultProcessors_1.setDefaultProcessors; } });
var Tag_1 = require("./Tag");
Object.defineProperty(exports, "Tag", { enumerable: true, get: function () { return Tag_1.Tag; } });
Object.defineProperty(exports, "TagElements", { enumerable: true, get: function () { return Tag_1.TagElements; } });
var Import_1 = require("./Import");
Object.defineProperty(exports, "Import", { enumerable: true, get: function () { return Import_1.Import; } });
var BackendMicroservice_1 = require("./BackendMicroservice");
Object.defineProperty(exports, "BackendMicroservice", { enumerable: true, get: function () { return BackendMicroservice_1.BackendMicroservice; } });
var Component_1 = require("./Component");
Object.defineProperty(exports, "Component", { enumerable: true, get: function () { return Component_1.Component; } });
var Crypt_1 = require("./Crypt");
Object.defineProperty(exports, "_Crypt", { enumerable: true, get: function () { return Crypt_1._Crypt; } });
var DefaultTemplateHandler_1 = require("./DefaultTemplateHandler");
Object.defineProperty(exports, "DefaultTemplateHandler", { enumerable: true, get: function () { return DefaultTemplateHandler_1.DefaultTemplateHandler; } });
var SourceJS_1 = require("./SourceJS");
Object.defineProperty(exports, "SourceJS", { enumerable: true, get: function () { return SourceJS_1.SourceJS; } });
var SourceCSS_1 = require("./SourceCSS");
Object.defineProperty(exports, "SourceCSS", { enumerable: true, get: function () { return SourceCSS_1.SourceCSS; } });
var globalSettings_1 = require("./globalSettings");
Object.defineProperty(exports, "GlobalSettings", { enumerable: true, get: function () { return globalSettings_1.GlobalSettings; } });
var RegisterClass_1 = require("./RegisterClass");
Object.defineProperty(exports, "RegisterClass", { enumerable: true, get: function () { return RegisterClass_1.RegisterClass; } });
var WidgetsFactory_1 = require("./WidgetsFactory");
Object.defineProperty(exports, "_ComponentWidget_", { enumerable: true, get: function () { return WidgetsFactory_1._ComponentWidget_; } });
Object.defineProperty(exports, "RegisterWidget", { enumerable: true, get: function () { return WidgetsFactory_1.RegisterWidget; } });
Object.defineProperty(exports, "RegisterWidgets", { enumerable: true, get: function () { return WidgetsFactory_1.RegisterWidgets; } });
var CONFIG_1 = require("./CONFIG");
Object.defineProperty(exports, "CONFIG", { enumerable: true, get: function () { return CONFIG_1.CONFIG; } });
var Controller_1 = require("./Controller");
Object.defineProperty(exports, "Controller", { enumerable: true, get: function () { return Controller_1.Controller; } });
var View_1 = require("./View");
Object.defineProperty(exports, "View", { enumerable: true, get: function () { return View_1.View; } });
var Service_1 = require("./Service");
Object.defineProperty(exports, "ConfigService", { enumerable: true, get: function () { return Service_1.ConfigService; } });
Object.defineProperty(exports, "JSONService", { enumerable: true, get: function () { return Service_1.JSONService; } });
Object.defineProperty(exports, "Service", { enumerable: true, get: function () { return Service_1.Service; } });
var VO_1 = require("./VO");
Object.defineProperty(exports, "VO", { enumerable: true, get: function () { return VO_1.VO; } });
var Effect_1 = require("./Effect");
Object.defineProperty(exports, "Effect", { enumerable: true, get: function () { return Effect_1.Effect; } });
var TransitionEffect_1 = require("./TransitionEffect");
Object.defineProperty(exports, "TransitionEffect", { enumerable: true, get: function () { return TransitionEffect_1.TransitionEffect; } });
var Timer_1 = require("./Timer");
Object.defineProperty(exports, "Timer", { enumerable: true, get: function () { return Timer_1.Timer; } });
var tag_filter_1 = require("./tag_filter");
Object.defineProperty(exports, "_tag_filter_", { enumerable: true, get: function () { return tag_filter_1._tag_filter_; } });
var range_1 = require("./range");
Object.defineProperty(exports, "range", { enumerable: true, get: function () { return range_1.range; } });
var ArrayCollection_1 = require("./ArrayCollection");
Object.defineProperty(exports, "ArrayCollection", { enumerable: true, get: function () { return ArrayCollection_1.ArrayCollection; } });
Object.defineProperty(exports, "ArrayList", { enumerable: true, get: function () { return ArrayCollection_1.ArrayList; } });
var DDO_1 = require("./DDO");
Object.defineProperty(exports, "DDO", { enumerable: true, get: function () { return DDO_1.DDO; } });
var Toggle_1 = require("./Toggle");
Object.defineProperty(exports, "Toggle", { enumerable: true, get: function () { return Toggle_1.Toggle; } });
var findPackageNodePath_1 = require("./findPackageNodePath");
Object.defineProperty(exports, "findPackageNodePath", { enumerable: true, get: function () { return findPackageNodePath_1.findPackageNodePath; } });
var DocumentLayout_1 = require("./DocumentLayout");
Object.defineProperty(exports, "getDocumentLayout", { enumerable: true, get: function () { return DocumentLayout_1.getDocumentLayout; } });
var mathFunctions_1 = require("./mathFunctions");
Object.defineProperty(exports, "__to_number", { enumerable: true, get: function () { return mathFunctions_1.__to_number; } });
var top_2 = require("./top");
Object.defineProperty(exports, "global", { enumerable: true, get: function () { return top_2._top; } });
var make_global_1 = require("./make_global");
Object.defineProperty(exports, "__make_global__", { enumerable: true, get: function () { return make_global_1.__make_global__; } });
var top_3 = require("./top");
Object.defineProperty(exports, "get", { enumerable: true, get: function () { return top_3.get; } });
Object.defineProperty(exports, "set", { enumerable: true, get: function () { return top_3.set; } });
