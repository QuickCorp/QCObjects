/**
 * Primary instance ID of all objects
 */
export var __instanceID = 0;

export const IncrementInstanceID = (): void => {
    __instanceID = (typeof __instanceID === "undefined" || __instanceID === null) ? (0) : (__instanceID + 1);
};
