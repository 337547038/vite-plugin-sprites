/**
 * name: vite-plugin-sprites
 * version: 0.2.0
 */
"use strict";var F=Object.create;var d=Object.defineProperty;var H=Object.getOwnPropertyDescriptor;var W=Object.getOwnPropertyNames;var k=Object.getPrototypeOf,z=Object.prototype.hasOwnProperty;var R=(t,e)=>{for(var n in e)d(t,n,{get:e[n],enumerable:!0})},j=(t,e,n,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of W(e))!z.call(t,o)&&o!==n&&d(t,o,{get:()=>e[o],enumerable:!(i=H(e,o))||i.enumerable});return t};var $=(t,e,n)=>(n=t!=null?F(k(t)):{},j(e||!t||!t.__esModule?d(n,"default",{value:t,enumerable:!0}):n,t)),I=t=>j(d({},"__esModule",{value:!0}),t);var q={};R(q,{default:()=>T});module.exports=I(q);var v=$(require("fs"),1),u=$(require("path"),1),x=$(require("images"),1),P=(t,e,n)=>{let i=u.default.join(t,e,n);return u.default.relative(t,i)},N=(t={})=>{let{iconPath:e="/src/assets/icon",root:n="./"}=t,i=u.default.join(n,e);v.default.readdir(i,(o,g)=>{if(o)throw o;let p=g.filter(a=>(a.endsWith(".jpg")||a.endsWith(".png"))&&a!=="sprites.png"),h=p.length,c=0,r=[];console.log(`\u68C0\u6D4B\u5230${h}\u4E2A\u56FE\u7247\u6587\u4EF6\uFF0C\u5F00\u59CB\u8FDB\u884C\u5408\u5E76~`),p.forEach(a=>{let l=P(n,e,a),f=(0,x.default)(l).size();r.push({path:l,width:f.width,height:f.height}),c++,c===h&&O(r,t)})})},O=(t,e)=>{let{root:n="./",savePath:i=e.iconPath||"/src/assets/icon",width:o=500,spacing:g=5,prefix:p="icon-"}=e;t.sort((s,w)=>s.height<w.height);let h=0,c=0,r=0;t.forEach(s=>{s.width+h+g>o?(c+=r+g,h=0,r=0,s.x=s.x||0):s.x=s.x||h,s.height>r&&(r=s.height),s.y=s.y||c,h+=s.width+g});let a=c+r,l=(0,x.default)(o,a),f=P(n,i,"sprites.png"),y=`[class*="${p}"]:before{content:"";background-image: url(./sprites.png); display:flex;align-items: center}
`;t.forEach(s=>{l.draw((0,x.default)(s.path),s.x,s.y);let w=s.path.substring(0,s.path.indexOf(".")),C=s.x?`-${s.x}px`:0,E=s.y?`-${s.y}px`:0;y+=`.${p+w}:before{background-position: ${C} ${E};width: ${s.width}px;height: ${s.height}px}
`});let S=P(n,i,"sprites.css");v.default.writeFile(`${S}`,y,function(s){if(s)throw s;console.log(`\u6210\u529F\u5199\u5165css\u6587\u4EF6\uFF1A${S}`)}),l.save(f),console.log(`\u6210\u529F\u5408\u5E76\u56FE\u7247\uFF1A${f}`)},b=N;var m=t=>({name:"vitePluginSprites",enforce:"pre",configResolved(e){t.root=e.root},buildStart(){b(t)}});m.images=b;var T=m;
