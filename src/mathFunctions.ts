export const __to_number = function (value:any): number  {
    return ((isNaN(value)) ? (new Number(0) as number) : (new Number(value) as number));
};