/**
 * name: vite-plugin-sprites
 * version: 0.1.0
 */
"use strict";var E=Object.create;var f=Object.defineProperty;var F=Object.getOwnPropertyDescriptor;var H=Object.getOwnPropertyNames;var I=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty;var L=(e,n)=>{for(var s in n)f(e,s,{get:n[s],enumerable:!0})},y=(e,n,s,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let i of H(n))!k.call(e,i)&&i!==s&&f(e,i,{get:()=>n[i],enumerable:!(o=F(n,i))||o.enumerable});return e};var S=(e,n,s)=>(s=e!=null?E(I(e)):{},y(n||!e||!e.__esModule?f(s,"default",{value:e,enumerable:!0}):s,e)),N=e=>y(f({},"__esModule",{value:!0}),e);var q={};L(q,{default:()=>T});module.exports=N(q);var d=S(require("fs"),1),u=S(require("path"),1),w=require("canvas"),x,b=(e,n)=>{let s=u.default.join(x,e,n);return u.default.relative(x,s)},R=e=>{let{iconPath:n="/src/assets/icon"}=e,s=u.default.join(x,n);d.default.readdir(s,(o,i)=>{if(o)throw o;let p=i.filter(h=>(h.endsWith(".jpg")||h.endsWith(".png"))&&h!=="sprites.png"),c=p.length,g=0,r=[];p.forEach(h=>{let a=new w.Image;a.onload=()=>{r.push({path:h,width:a.width,height:a.height,image:a}),g++,g===c&&G(r,e)},a.src=b(n,h)})})},G=(e,n)=>{let{savePath:s="/src/assets/icon",width:o=500,spacing:i=5,prefix:p="icon-"}=n;e.sort((t,l)=>t.height<l.height?-1:t.height>l.height?1:0);let c=0,g=0,r=0;e.forEach(t=>{t.width+c+i>o?(g+=r+i,c=0,r=0,t.x=t.x||0):t.x=t.x||c,t.height>r&&(r=t.height),t.y=t.y||g,c+=t.width+i});let h=g+r,a=(0,w.createCanvas)(o,h),C=a.getContext("2d"),v=b(s,"sprites.png"),P=`[class*="${p}"]:before{content:"";background-image: url(./sprites.png); display:flex;align-items: center}
`;e.forEach(t=>{C.drawImage(t.image,t.x,t.y,t.width,t.height);let l=t.path.substring(0,t.path.indexOf(".")),W=t.x?`-${t.x}px`:0,j=t.y?`-${t.y}px`:0;P+=`.${p+l}:before{background-position: ${W} ${j};width: ${t.width}px;height: ${t.height}px}
`});let $=b(s,"sprites.css");d.default.writeFile(`${$}`,P,function(t){if(t)throw t;console.log(`\u6210\u529F\u5199\u5165css\u6587\u4EF6:${$}`)});let m=d.default.createWriteStream(v);a.createPNGStream().pipe(m),m.on("finish",()=>console.log(`\u6210\u529F\u5408\u5E76\u56FE\u7247:${v}`))},O=e=>({name:"vitePluginSprites",enforce:"pre",configResolved(n){x=n.root},buildStart(){R(e)},load(){}}),T=O;
