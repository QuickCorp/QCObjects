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

export * as AssignPolyfill from "./assign";
export * as __top__ from "./top";
export * as qcobjects from "./MainProcess";
export {_top, resetTop} from "./top";
export { _QC_CLASSES, _QC_PACKAGES, _QC_PACKAGES_IMPORTED, _QC_READY_LISTENERS } from "./PrimaryCollections";
export { _DataStringify } from "./DataStringify";
export { _DOMCreateElement } from "./DOMCreateElement";
export { _methods_, _protected_code_ } from "./introspection";
export { logger, Logger } from "./Logger";
export { _require_, is_phonegap, isBrowser, isNodeCommonJS } from "./platform";
export { subelements } from "./subelements";
export { __is_raw_class__ } from "./is_raw_class";
export { _LegacyCopy } from "./LegacyCopy";
export { _fireAsyncLoad, asyncLoad } from "./asyncLoad";
export { __instanceID } from "./IncrementInstanceID";
export { ObjectName } from "./ObjectName";
export { __getType__ } from "./getType";
export { is_a } from "./is_a";
export { ComplexStorageCache } from "./ComplexStorageCache";
export { waitUntil } from "./waitUntil";
export { _Cast, _CastProps } from "./Cast";
export { isQCObjects_Class, isQCObjects_Object } from "./isQCObjects";
export { Package } from "./Package";
export { ClassFactory } from "./ClassFactory";
export { Export } from "./Export";
export { Class } from "./Class";
export { InheritClass } from "./InheritClass";
export { _super_ } from "./super";
export { shortCode } from "./shortCode";
export { Processor } from "./Processor";
export { New } from "./New";
export { _Ready, ready, Ready } from "./Ready";
export { captureFalseTouch } from "./captureFalseTouch";
export { serviceLoader } from "./serviceLoader";
export { componentLoader } from "./componentLoader";
export { _buildComponentsFromElements_, ComponentURI } from "./ComponentFactory";
export { NamespaceRef } from "./NamespaceRef";
export { setDefaultProcessors } from "./defaultProcessors";
export { Tag, TagElements } from "./Tag";
export { Import } from "./Import";
export { BackendMicroservice } from "./BackendMicroservice";
export { Component } from "./Component";
export { _Crypt } from "./Crypt";
export { DefaultTemplateHandler } from "./DefaultTemplateHandler";
export { SourceJS } from "./SourceJS";
export { SourceCSS } from "./SourceCSS";
export { GlobalSettings } from "./globalSettings";
export { RegisterClass } from "./RegisterClass";
export { _ComponentWidget_, RegisterWidget, RegisterWidgets } from "./WidgetsFactory";
export { CONFIG } from "./CONFIG";
export { Controller } from "./Controller";
export { View } from "./View";
export { ConfigService, JSONService, Service } from "./Service";
export { VO } from "./VO";
export { Effect } from "./Effect";
export { TransitionEffect } from "./TransitionEffect";
export { Timer } from "./Timer";
export { _tag_filter_ } from "./tag_filter";
export { range } from "./range";
export { ArrayCollection, ArrayList } from "./ArrayCollection";
export { DDO } from "./DDO";
export { Toggle } from "./Toggle";
export { findPackageNodePath } from "./findPackageNodePath";
export { getDocumentLayout } from "./DocumentLayout";
export { IQCObjectsElement, IQCObjectsShadowedElement } from "./types/global";
export { __to_number } from "./mathFunctions";
export {_top as global} from "./top";
export {__make_global__} from "./make_global";
export {get, set} from "./top";
export default {};
