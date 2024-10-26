export const getDocumentLayout = function ():string|undefined {
    const h = (w:number, h:number) => {
      return w > h ? "landscape" : null;
    };
    const v = (w:number, h:number) => {
      return h > w ? "portrait" : null;
    };
    const square = (w:number, h:number) => {
      return w === h ? "square" : null;
    };
    return [
      h(document.documentElement.clientWidth, document.documentElement.clientHeight),
      v(document.documentElement.clientWidth, document.documentElement.clientHeight),
      square(document.documentElement.clientWidth, document.documentElement.clientHeight)
    ].filter(e => e !== null).pop();
  };
