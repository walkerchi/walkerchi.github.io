(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[612],{94184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)){if(r.length){var i=o.apply(null,r);i&&e.push(i)}}else if("object"===a)if(r.toString===Object.prototype.toString)for(var s in r)n.call(r,s)&&r[s]&&e.push(s);else e.push(r.toString())}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()},72339:function(e){e.exports="walkerchi.github.io/_next/static/images/arrow-9eb8c3455e90b8b0e4b9fe7da3e88ead.svg"},68332:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[lang]/gallery/pdfs/viewer",function(){return r(17987)}])},26183:function(e,t,r){"use strict";r.d(t,{Z:function(){return d}});var n=r(85893),o=r(67294),a=r(9821),i=r(13047),s=r.n(i);function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){l(e,t,r[t])}))}return e}function f(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],i=!0,s=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(c){s=!0,o=c}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return c(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(e){var t=e.imageProps,r=e.scale,i=e.anim;r=r||-.02,i=void 0!==i&&i;var c=f(o.useState(null),2),l=c[0],d=c[1],p=f(o.useState(null),2),y=p[0],h=p[1],m=f(o.useState(null),2),g=m[0],b=m[1],v=f(o.useState(null),2),_=v[0],w=v[1],j=f(o.useState(!1),2),k=j[0],x=j[1];return o.useEffect((function(){x(!0),b(window.innerHeight/2),w(window.innerHeight/2),window.onmousemove=function(e){d((e.clientX-_)*r),h((e.clientY-g)*r)}}),[r,g,_]),(0,n.jsx)("div",{className:"".concat(s().container," ").concat(k?"":s()["before-init"]),children:(0,n.jsx)("div",{className:s().background,style:{transform:"scale(".concat(1+2*Math.abs(r),") translate(").concat(l,"px,").concat(y,"px)")},children:(0,n.jsx)(a.Z,u({},t,{placeholder:"blur",layout:"fill",objectFit:"cover",alt:""}))})})}},9821:function(e,t,r){"use strict";r.d(t,{Z:function(){return s}});var n=r(85893),o=r(67294);function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function i(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],i=!0,s=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(c){s=!0,o=c}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return a(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(e){var t=i(o.useState(void 0===e.blurDataURL),2),r=t[0],a=t[1];return(0,n.jsxs)("div",{className:e.className?e.className:"",style:Object.assign({},"fill"===e.layout?{width:"100%",height:"100%"}:{width:e.width,height:e.height}),children:[(0,n.jsx)("img",{src:e.src,onLoad:function(){console.log("onload"),a(!0)},style:{display:r?"block":"none",width:"100%",height:"100%",objectFit:e.objectFit}}),(0,n.jsx)("img",{src:e.blurDataURL,style:{display:r?"none":"block",width:"100%",height:"100%",objectFit:e.objectFit},onLoad:function(){console.log("blur onload")}})]})}},17987:function(e,t,r){"use strict";r.r(t),r.d(t,{__N_SSG:function(){return B},default:function(){return H}});var n=r(85893),o=r(67294),a=r(11163),i=r(11299),s=r(98352),c=r(28197),l=r(87462),u=r(45987),f=r(94184),d=r.n(f),p={className:"",percent:0,prefixCls:"rc-progress",strokeColor:"#2db7f5",strokeLinecap:"round",strokeWidth:1,style:{},trailColor:"#D9D9D9",trailWidth:1,gapPosition:"bottom"},y=function(){var e=(0,o.useRef)([]),t=(0,o.useRef)(null);return(0,o.useEffect)((function(){var r=Date.now(),n=!1;e.current.forEach((function(e){if(e){n=!0;var o=e.style;o.transitionDuration=".3s, .3s, .3s, .06s",t.current&&r-t.current<100&&(o.transitionDuration="0s, 0s")}})),n&&(t.current=Date.now())})),e.current},h=["className","percent","prefixCls","strokeColor","strokeLinecap","strokeWidth","style","trailColor","trailWidth","transition"],m=function(e){var t=e.className,r=e.percent,n=e.prefixCls,a=e.strokeColor,i=e.strokeLinecap,s=e.strokeWidth,c=e.style,f=e.trailColor,p=e.trailWidth,m=e.transition,g=(0,u.Z)(e,h);delete g.gapPosition;var b=Array.isArray(r)?r:[r],v=Array.isArray(a)?a:[a],_=y(),w=s/2,j=100-s/2,k="M ".concat("round"===i?w:0,",").concat(w,"\n         L ").concat("round"===i?j:100,",").concat(w),x="0 0 100 ".concat(s),S=0;return o.createElement("svg",(0,l.Z)({className:d()("".concat(n,"-line"),t),viewBox:x,preserveAspectRatio:"none",style:c},g),o.createElement("path",{className:"".concat(n,"-line-trail"),d:k,strokeLinecap:i,stroke:f,strokeWidth:p||s,fillOpacity:"0"}),b.map((function(e,t){var r=1;switch(i){case"round":r=1-s/100;break;case"square":r=1-s/2/100;break;default:r=1}var a={strokeDasharray:"".concat(e*r,"px, 100px"),strokeDashoffset:"-".concat(S,"px"),transition:m||"stroke-dashoffset 0.3s ease 0s, stroke-dasharray .3s ease 0s, stroke 0.3s linear"},c=v[t]||v[v.length-1];return S+=e,o.createElement("path",{key:t,className:"".concat(n,"-line-path"),d:k,strokeLinecap:i,stroke:c,strokeWidth:s,fillOpacity:"0",ref:function(e){_[t]=e},style:a})})))};m.defaultProps=p,m.displayName="Line";var g=r(71002),b=r(97685);var v=0,_=!("undefined"===typeof window||!window.document||!window.document.createElement);var w=function(e){var t=o.useState(),r=(0,b.Z)(t,2),n=r[0],a=r[1];return o.useEffect((function(){a("rc_progress_".concat(function(){var e;return _?(e=v,v+=1):e="TEST_OR_SSR",e}()))}),[]),e||n},j=["id","prefixCls","strokeWidth","trailWidth","gapDegree","gapPosition","trailColor","strokeLinecap","style","className","strokeColor","percent"];function k(e){return+e.replace("%","")}function x(e){var t=null!==e&&void 0!==e?e:[];return Array.isArray(t)?t:[t]}var S=100,O=function(e,t,r,n){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:0,a=arguments.length>5?arguments[5]:void 0,i=arguments.length>6?arguments[6]:void 0,s=arguments.length>7?arguments[7]:void 0,c=o>0?90+o/2:-90,l=2*Math.PI*e,u=l*((360-o)/360),f=t/100*360*((360-o)/360),d=0===o?0:{bottom:0,top:180,left:90,right:-90}[a],p=(100-r)/100*u;return"round"===i&&100!==r&&(p+=s/2)>=u&&(p=u-.01),{stroke:"string"===typeof n?n:void 0,strokeDasharray:"".concat(u,"px ").concat(l),strokeDashoffset:p,transform:"rotate(".concat(c+f+d,"deg)"),transformOrigin:"50% 50%",transition:"stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s, stroke-width .06s ease .3s, opacity .3s ease 0s",fillOpacity:0}},N=function(e){var t=e.id,r=e.prefixCls,n=e.strokeWidth,a=e.trailWidth,i=e.gapDegree,s=e.gapPosition,c=e.trailColor,f=e.strokeLinecap,p=e.style,h=e.className,m=e.strokeColor,b=e.percent,v=(0,u.Z)(e,j),_=w(t),N="".concat(_,"-gradient"),A=50-n/2,E=O(A,0,100,c,i,s,f,n),C=x(b),P=x(m),D=P.find((function(e){return e&&"object"===(0,g.Z)(e)})),I=y();return o.createElement("svg",(0,l.Z)({className:d()("".concat(r,"-circle"),h),viewBox:"0 0 ".concat(S," ").concat(S),style:p,id:t},v),D&&o.createElement("defs",null,o.createElement("linearGradient",{id:N,x1:"100%",y1:"0%",x2:"0%",y2:"0%"},Object.keys(D).sort((function(e,t){return k(e)-k(t)})).map((function(e,t){return o.createElement("stop",{key:t,offset:e,stopColor:D[e]})})))),o.createElement("circle",{className:"".concat(r,"-circle-trail"),r:A,cx:50,cy:50,stroke:c,strokeLinecap:f,strokeWidth:a||n,style:E}),function(){var e=0;return C.map((function(t,a){var c=P[a]||P[P.length-1],l=c&&"object"===(0,g.Z)(c)?"url(#".concat(N,")"):void 0,u=O(A,e,t,c,i,s,f,n);return e+=t,o.createElement("circle",{key:a,className:"".concat(r,"-circle-path"),r:A,cx:50,cy:50,stroke:l,strokeLinecap:f,strokeWidth:n,opacity:0===t?0:1,style:u,ref:function(e){I[a]=e}})})).reverse()}())};N.defaultProps=p,N.displayName="Circle";var A=N,E=r(7146),C=r.n(E);function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function D(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],i=!0,s=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(c){s=!0,o=c}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return P(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return P(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function I(e){var t=e.percent,r=e.hidden,a=D(o.useState(!0),2),i=a[0],s=a[1];return o.useEffect((function(){setTimeout((function(){s(!r)}),2e3)}),[r]),(0,n.jsxs)("div",{className:"".concat(C().progress," ").concat(r?C().hidden:""),style:{display:i?"flex":"none"},children:[(0,n.jsx)("div",{className:C().circle,children:(0,n.jsx)(A,{percent:t,strokeColor:{"100%":"#732BF5","50%":"#EA3FF7","0%":"#9FFCFD"},strokeWidth:6,strokeLinecap:"round"})}),(0,n.jsxs)("div",{className:C().text,children:[(0,n.jsx)("div",{className:C().integer,children:Number.parseInt(t)}),(0,n.jsx)("div",{className:C().dot,children:"."}),(0,n.jsx)("div",{className:C().decimal,children:Number.parseInt(100*(t-Number.parseInt(t)))}),(0,n.jsx)("div",{className:C().percent,children:"%"})]})]})}var L=r(26183),W=r(59502),T=r.n(W);function F(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function Z(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function R(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,a=[],i=!0,s=!1;try{for(r=r.call(e);!(i=(n=r.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(c){s=!0,o=c}finally{try{i||null==r.return||r.return()}finally{if(s)throw o}}return a}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return F(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return F(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function U(e){var t=e.url,a=e.data,l=function(e){var t=R(o.useState(null),2),r=t[0],a=t[1],s=R(o.useState(null),2),c=s[0],l=s[1];return(0,n.jsx)(i.T3,function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){Z(e,t,r[t])}))}return e}({},e,{width:r,height:c,onLoadSuccess:function(e){var t=e.width,r=e.height,n=O/t>E/r?E/r:O/t;a(n*t),l(n*r)}}))},u=R(o.useState(null),2),f=u[0],d=u[1],p=R(o.useState(null),2),y=p[0],h=p[1],m=R(o.useState(!1),2),g=m[0],b=m[1],v=R(o.useState(0),2),_=v[0],w=v[1],j=R(o.useState(!1),2),k=j[0],x=j[1],S=R(o.useState(null),2),O=S[0],N=S[1],A=R(o.useState(null),2),E=A[0],C=A[1];return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(L.Z,{imageProps:a.imageProps}),(0,n.jsx)(I,{percent:_,hidden:k}),(0,n.jsxs)(i.BB,{file:t,className:T()["pdf-render"],onLoadProgress:function(e){w(e.loaded/e.total*100)},onLoadSuccess:function(e){var t=e.numPages;h(t);var r=document.querySelector(".swiper"),n=r.offsetWidth,o=r.offsetHeight;N(n),C(o),x(!0)},children:[(0,n.jsxs)("div",{className:"".concat(T()["outline-wrapper"],"  ").concat(g?"":T()["outline-wrapper-close"]),children:[(0,n.jsx)(i.bw,{className:T().outline,onItemClick:function(e){f.slideTo(e.pageIndex,300)}}),(0,n.jsx)("div",{className:T().icon,onClick:function(){b(!g)},children:(0,n.jsx)("div",{style:{backgroundImage:"url("+r(72339)+")"}})})]}),(0,n.jsx)(s.tq,{className:T().pages,effect:"fade",keyboard:{enabled:!0},mousewheel:!0,pagination:{type:"fraction"},onSwiper:d,modules:[c.N1,c.Qr,c.xW,c.Gk,c.tl],children:y?Array.from(new Array(y),(function(e,t){return(0,n.jsx)(s.o5,{className:T()["page-wrapper"],children:(0,n.jsx)(l,{pageNumber:t+1,className:T().page})},t)})):(0,n.jsx)(i.T3,{pageNumber:1})})]})]})}function q(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function M(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){q(e,t,r[t])}))}return e}var B=!0;function H(e){var t=e.data,r=(0,a.useRouter)();return(0,n.jsx)(n.Fragment,{children:void 0!==r.query.url?(0,n.jsx)(U,M({},r.query,{data:t})):null})}},13047:function(e){e.exports={container:"styles_container__AYUPd","before-init":"styles_before-init__q7567",background:"styles_background__cqdQw",init:"styles_init__k3gcP"}},7146:function(e){e.exports={progress:"styles_progress__1H1Sc",circle:"styles_circle__JgQir",hidden:"styles_hidden__E5O2c",text:"styles_text__7RUHJ",integer:"styles_integer__s2meo",dot:"styles_dot__Hdvtf",decimal:"styles_decimal__J0CnK",percent:"styles_percent__1mbzG"}},59502:function(e){e.exports={"pdf-render":"styles_pdf-render__OcX9E","outline-wrapper":"styles_outline-wrapper__cTO3U","outline-wrapper-close":"styles_outline-wrapper-close__B7_9V",icon:"styles_icon__TQ3w_",outline:"styles_outline__3shVl",pages:"styles_pages__oD9lj","page-wrapper":"styles_page-wrapper__XCyij",page:"styles_page__JoX3m"}}},function(e){e.O(0,[819,774,888,179],(function(){return t=68332,e(e.s=t);var t}));var t=e.O();_N_E=t}]);