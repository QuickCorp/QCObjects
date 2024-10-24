/**
 * Primary instance ID of all objects
 */
export var __instanceID;
export var _QC_CLASSES = {};
export var _QC_PACKAGES = {};
export var _QC_PACKAGES_IMPORTED = [];
export var _QC_READY_LISTENERS = [];

export const IncrementInstanceID = () => {
    __instanceID = (typeof __instanceID === "undefined" || __instanceID === null) ? (0) : (__instanceID + 1);
};