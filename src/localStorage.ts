export var localStorage:any = window.localStorage;
if (typeof localStorage === "undefined") {

    /* Polyfill for localStorage */
    localStorage = {
        getItem(name) {
            return (Object.hasOwnProperty.call(this, name)) ? (this[name]) : (null);
        },
        setItem(name, value) {
            this[name] = value;
        },
        removeItem(name) {
            delete this[name];
        }
    };
    /* end Polyfill for localStorage */
}