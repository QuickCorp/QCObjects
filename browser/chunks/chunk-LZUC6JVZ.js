import{a as w}from"./chunk-HQBIDUJS.js";import{f as h,m as q}from"./chunk-Q3ZBXOFX.js";import{a as _}from"./chunk-QK6IGMSG.js";import{a as i,c as j}from"./chunk-5VYRFZ7X.js";var D=j(d=>{Object.defineProperty(d,"__esModule",{value:!0});d.setDefaultProcessors=void 0;var x=_(),p=h(),O=q(),k=w(),G=i(()=>{(function(m){let $=i((s,r,t)=>{if(typeof s>"u"||s===null)throw Error(`mapper.${r}.${t} does not have a component instance or it is null.`);let n=m.global.get(t),e=s.get(t),a=s.data[t],o=typeof a<"u"?a:typeof e<"u"?e:n,c="";return typeof o<"u"&&typeof o.map<"u"?c=o.map(function(u){let P=[...Object.keys(u)].map(l=>` data-${l}="${typeof u[l]<"u"&&u[l]!==null?u[l].toString():""}"`).join("");return`<quick-component name="${r}" ${P} ></quick-component>`}).join(""):x.logger.debug(`${r}.${t} does not have a map property`),c},"mapper");p.GlobalProcessor.setProcessor($);let f=i(function(s,r,t){let n=`
              /* CSS Document for Mobile Imports */
              @import url("${t}") (orientation:portrait);
              @import url("${t}") (max-width:460px);
              @import url("${t}") (aspect-ratio: 9/16);
              @import url("${t}") (aspect-ratio: 10/16);
              @import url("${t}") (aspect-ratio: 5/8);
              @import url("${t}") (aspect-ratio: 3/4);
              @import url("${t}") (aspect-ratio: 2/3);
              `,a={landscape:`
              @import url("${t}") (orientation:landscape) and (min-width:460px);
              @import url("${t}") (aspect-ratio: 16/9) and (min-width:460px);
              @import url("${t}") (aspect-ratio: 16/10) and (min-width:460px);
              @import url("${t}") (aspect-ratio: 8/5) and (min-width:460px);
              @import url("${t}") (aspect-ratio: 4/3) and (min-width:460px);
              @import url("${t}") (aspect-ratio: 3/2) and (min-width:460px);
              `,portrait:n};return Object.hasOwnProperty.call(a,r)?a[r]:""},"layout");p.GlobalProcessor.setProcessor(f);let g=i((s,r,t,...n)=>{let e=[...n].map(function(o){return{[o.split("=")[0]]:o.split("=")[1]}}).reduce(function(o,c){return Object.assign(o,c)}),a=[...Object.keys(e)].map(function(o){return`${o}=${e[o]}`}).join(" ");return`<component name="${r}" componentClass="${t}" ${a}></component>`},"component");p.GlobalProcessor.setProcessor(g);let b=i((s,r,t,...n)=>{let e=[...n].map(function(o){return{[o.split("=")[0]]:o.split("=")[1]}}).reduce(function(o,c){return Object.assign(o,c)}),a=[...Object.keys(e)].map(function(o){return`${o}=${e[o]}`}).join(" ");return`<quick-component name="${r}" componentClass="${t}" ${a}></quick-component>`},"quick_component");p.GlobalProcessor.setProcessor(b);let y=i((s,r,t)=>(0,k.range)(r).map(function(n){return t.replace("{{index}}",n.toString())}).join(""),"repeat");p.GlobalProcessor.setProcessor(y)})(O._top)},"setDefaultProcessors");d.setDefaultProcessors=G});export{D as a};
//# sourceMappingURL=chunk-LZUC6JVZ.js.map
