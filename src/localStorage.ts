export var localStorage:any = window.localStorage;
if (typeof localStorage === "undefined") {

    /* Polyfill for localStorage */
    localStorage = {
        getItem(name:string):any {
            return (Object.hasOwn(this, name)) ? (this[name]) : (null);
        },
        setItem(name:string, value:any) {
            this[name] = value;
        },
        removeItem(name:string) {
            delete this[name];
        }
    };
    /* end Polyfill for localStorage */
}