/**
 * Primary instance ID of all objects
 */
export var __instanceID;

export const IncrementInstanceID = () => {
    __instanceID = (typeof __instanceID === "undefined" || __instanceID === null) ? (0) : (__instanceID + 1);
};
