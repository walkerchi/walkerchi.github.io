(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[88],{87981:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[lang]/gallery/images",function(){return n(9102)}])},9821:function(t,e,n){"use strict";n.d(e,{Z:function(){return a}});var r=n(85893),o=n(67294);function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],l=!0,a=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);l=!0);}catch(u){a=!0,o=u}finally{try{l||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function a(t){var e=l(o.useState(void 0===t.blurDataURL),2),n=e[0],i=e[1];return(0,r.jsxs)("div",{className:t.className?t.className:"",style:Object.assign({},"fill"===t.layout?{width:"100%",height:"100%"}:{width:t.width,height:t.height}),children:[(0,r.jsx)("img",{src:t.src,onLoad:function(){console.log("onload"),i(!0)},style:{display:n?"block":"none",width:"100%",height:"100%",objectFit:t.objectFit}}),(0,r.jsx)("img",{src:t.blurDataURL,style:{display:n?"none":"block",width:"100%",height:"100%",objectFit:t.objectFit},onLoad:function(){console.log("blur onload")}})]})}},9102:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSG:function(){return h},default:function(){return f}});var r=n(85893),o=n(67294),i=n(9821),l=n(27271),a=n(77419),u=n.n(a);function c(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function s(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,i=[],l=!0,a=!1;try{for(n=n.call(t);!(l=(r=n.next()).done)&&(i.push(r.value),!e||i.length!==e);l=!0);}catch(u){a=!0,o=u}finally{try{l||null==n.return||n.return()}finally{if(a)throw o}}return i}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return c(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function d(t){var e=t.data,n=s(o.useState(e),2),a=n[0],c=(n[1],s(o.useState(!1),2)),d=c[0],h=c[1],f=s(o.useState(null),2),m=f[0],y=f[1];return o.useEffect((function(){h(document.documentElement.clientWidth<=768),window.addEventListener("resize",(function(){h(document.documentElement.clientWidth<=768)}))}),[]),(0,r.jsxs)("div",{className:u()["image-gallery"],children:[(0,r.jsx)("div",{className:"".concat(u().zoom," ").concat(m?u()["zoom-show"]:u()["zoom-hide"]),onClick:function(){y(null)},children:function(){if(m){var t=document.documentElement.clientWidth/document.documentElement.clientHeight,e={},n=m.width/m.height;if(n>t){var o=document.documentElement.clientWidth;e={width:o,height:o/n}}else{var l=document.documentElement.clientHeight;e={height:l,width:l*n}}return(0,r.jsx)("div",{style:e,children:(0,r.jsx)(i.Z,{src:m.src,blurDataURL:m.blurDataURL,layout:"fill",placeholder:"blur","object-fit":"cover",alt:""})})}return null}()}),(0,r.jsx)(l.R,{items:a,columnGutter:d?10:16,columnWidth:d?150:400,overscanBy:5,render:function(t){var e=t.data,n=e.src,o=e.blurDataURL,l=e.width,a=e.height;return(0,r.jsx)("div",{className:u().card,onClick:function(){y({src:n,blurDataURL:o,width:l,height:a})},children:(0,r.jsx)(i.Z,{src:n,blurDataURL:o,width:l,height:a,placeholder:"blur",alt:""})})}})]})}var h=!0;function f(t){var e=t.data;return(0,r.jsx)(d,{data:e})}},77419:function(t){t.exports={"image-gallery":"styles_image-gallery__Q_J33",card:"styles_card__9cku8",zoom:"styles_zoom__EVPYW","zoom-show":"styles_zoom-show__NzJWV","zoom-hide":"styles_zoom-hide__0XFkT"}}},function(t){t.O(0,[271,774,888,179],(function(){return e=87981,t(t.s=e);var e}));var e=t.O();_N_E=e}]);