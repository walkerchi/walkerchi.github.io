(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[38],{56853:function(t){t.exports="./_next/static/images/arrow-eba84ad50e6943d2ecc6dd61be651822.svg"},61719:function(t,e,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[lang]/content",function(){return r(18625)}])},9821:function(t,e,r){"use strict";r.d(e,{Z:function(){return o}});var n=r(85893),a=r(67294);function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function c(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,a,i=[],c=!0,o=!1;try{for(r=r.call(t);!(c=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);c=!0);}catch(s){o=!0,a=s}finally{try{c||null==r.return||r.return()}finally{if(o)throw a}}return i}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return i(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function o(t){var e=c(a.useState(void 0===t.blurDataURL),2),r=e[0],i=e[1];return(0,n.jsxs)("div",{className:t.className?t.className:"",style:Object.assign({},"fill"===t.layout?{width:"100%",height:"100%"}:{width:t.width,height:t.height}),children:[(0,n.jsx)("img",{src:t.src,onLoad:function(){console.log("onload"),i(!0)},style:{display:r?"block":"none",width:"100%",height:"100%",objectFit:t.objectFit}}),(0,n.jsx)("img",{src:t.blurDataURL,style:{display:r?"none":"block",width:"100%",height:"100%",objectFit:t.objectFit},onLoad:function(){console.log("blur onload")}})]})}},18625:function(t,e,r){"use strict";r.r(e),r.d(e,{__N_SSG:function(){return K},default:function(){return B}});var n=r(85893),a=r(67294),i=r(98352),c=r(28197),o=r(70582),s=r(79649),l=r.n(s);function u(t,e){for(var r=[t];r.length>0;){var n=[];r.forEach((function(t){e(t),t.isLeaf||(n=n.concat(t.children))})),r=n}}function d(t,e){var r=[];return u(t,(function(t){t.isLeaf||r.push(e(t))})),r}function f(t,e){var r=[];return u(t,(function(t){r.push(e(t))})),r}function _(t){var e=[];return u(t,(function(t){t.isLeaf&&e.push(t)})),e}function h(t){var e=[],r=[];return function(t,e){var r=[t];for(e(null,t);r.length>0;){var n=[];r.forEach((function(t){t.isLeaf||(t.children.forEach((function(r){e(t,r)})),n=n.concat(t.children))})),r=n}}(t,(function(t,n){e.push(t),r.push(n.id)})),new Map(e.map((function(t,e){return[r[e],t]})))}function p(t){return new Map(f(t,(function(t){return[t.id,t]})))}function y(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function m(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,a,i=[],c=!0,o=!1;try{for(r=r.call(t);!(c=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);c=!0);}catch(s){o=!0,a=s}finally{try{c||null==r.return||r.return()}finally{if(o)throw a}}return i}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return y(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return y(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function v(t){var e=t.tree,i=(t.focusID,t.setFocusID),c=function(t,e){v((function(r){var n=x.get(t);return r.map((function(t,r){return r===n?e:t}))}))},s=function(t){return y[x.get(t)]},u=m(a.useState(!1),2),f=u[0],_=u[1],p=m(a.useState(d(e,(function(t){return!1}))),2),y=p[0],v=p[1],g=d(e,(function(t){return t.id})),x=new Map(Array.from(g,(function(t,e){return[t,e]}))),b=new Map(d(e,(function(t){return[t.id,t]}))),j=h(e),w=(0,o.T_)("content");return(0,n.jsxs)("div",{className:"".concat(l()["tree-menu-wrapper"]," ").concat(f?"":l()["tree-menu-wrapper-close"]),children:[(0,n.jsx)("div",{className:l()["tree-menu"],children:e.children.map((function t(r){return(0,n.jsxs)("div",{className:l()["node-wrapper"],children:[(0,n.jsx)("div",{className:l()["node-text"],onClick:function(){i(r.id),r.isLeaf||(v(d(e,(function(t){return!1}))),function(t){for(var e=b.get(t);null!==e&&void 0!==e;)c(e.id,!0),e=j.get(e.id)}(r.id),s(r.id)&&c(r.id,!1))},children:r.isLeaf?r.title:w(r.localePath)}),r.isLeaf?null:(0,n.jsx)("div",{className:"".concat(l()["node-children"]," ").concat(s(r.id)?"":l()["node-children-close"]),children:r.children.map(t)})]},r.id)}))}),(0,n.jsx)("div",{className:l().icon,onClick:function(){_(!f)},children:(0,n.jsx)("div",{style:{backgroundImage:"url("+r(56853)+")"}})})]})}var g=r(25675),x=r.n(g),b=r(3860),j=r(40798),w=r(95092),S={H:2e3,W:2e3,margin:200,circle:{r:{dir:30,ipy:30,md:30,__selected__:150}},text:{x:{dir:-20,ipy:-20,md:-20,__selected__:10},y:{dir:-10,ipy:-10,md:-10,__selected__:0},scale:{__selected__:1.5},anchor:{dir:"end",ipy:"start",md:"start",__selected__:"middle"}}},N=r(27825),A=r.n(N);function I(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function k(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function L(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(t){return Object.getOwnPropertyDescriptor(r,t).enumerable})))),n.forEach((function(e){k(t,e,r[e])}))}return t}function D(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,a,i=[],c=!0,o=!1;try{for(r=r.call(t);!(c=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);c=!0);}catch(s){o=!0,a=s}finally{try{c||null==r.return||r.return()}finally{if(o)throw a}}return i}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return I(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return I(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function O(t){var e=t.tree,r=t.imageProps,i=t.focusID,c=t.setVisibleLeaf,s=(0,b.a)("only screen and (max-width : 768px)"),l=(0,j.i)(),u=(0,o.T_)("content"),d=D(a.useState(!1),2),h=d[0],y=d[1],m=a.useRef(i),v=new Map(f(e,(function(t){var e;return e=t.isLeaf?t.name.endsWith(".md")?"md":t.name.endsWith(".ipynb")?"ipy":"unknown":"dir",[t.id,e]}))),g=a.useRef(null),N=p(e);return a.useEffect((function(){if(!h){var t=function(t,e){var r=S.W,n=S.H,a=S.margin,i=new Map(f(t,(function(t){var e;return e=t.isLeaf?t.name.endsWith(".md")?"md":t.name.endsWith(".ipynb")?"ipy":"unknown":"dir",[t.id,e]})));t=w.bT9(t);var c=w.Ys("#container").append("svg").attr("class",A().svg).attr("id","graph").attr("width",r).attr("height",n),o=w.G_s().size([r-2*a,n-2*a]).separation((function(t,e){return(t.parent==e.parent?1:2)/t.depth}))(t),s=o.descendants(),l=o.links(),u=c.append("g").attr("transform","translate(".concat(a,",").concat(a,")")),d=(u.selectAll(".link").data(l).join("path").attr("class",A()["tree-link"]).attr("d",w.h5h().x((function(t){return t.y})).y((function(t){return t.x}))),u.selectAll(".node").data(s).join("g").attr("class",A()["tree-node"]).attr("transform",(function(t){return"translate(".concat(t.y,",").concat(t.x,")")})));return d.append("circle").attr("r",(function(t){return S.circle.r[i.get(t.data.id)]})).attr("class",(function(t){return A()["tree-circ-"+i.get(t.data.id)]})).attr("id",(function(t){return"circle"+t.data.id})),d.append("text").attr("class",(function(t){return A()["tree-text-"+i.get(t.data.id)]})).attr("id",(function(t){return"text"+t.data.id})).text((function(t){return t.data.isLeaf?t.data.title:e(t.data.localePath)})).attr("dx",(function(t){return t.children?-13:13})).attr("dy",".35em").attr("text-anchor",(function(t){return S.text.anchor[i.get(t.data.id)]})).attr("transform",(function(t){return"translate(".concat(S.text.x[i.get(t.data.id)],",").concat(S.text.y[i.get(t.data.id)],")")})),{node:d}}(e,u);g.current=new Map(t.node._groups[0].map((function(t){return[t.__data__.data.id,{y:t.__data__.x,x:t.__data__.y}]}))),y(!0)}var r;r=document.querySelector("#circle"+m.current);var n=v.get(m.current);r.setAttribute("r",S.circle.r[n]),(r=document.querySelector("#text"+m.current)).setAttribute("transform","translate(".concat(S.text.x[n],",").concat(S.text.y[n],")")),r.setAttribute("text-anchor",S.text.anchor[n]),(r=document.querySelector("#circle"+i)).setAttribute("r",S.circle.r.__selected__),(r=document.querySelector("#text"+i)).setAttribute("transform","translate(".concat(S.text.x.__selected__,",").concat(S.text.y.__selected__,") scale(").concat(S.text.scale.__selected__,")")),r.setAttribute("text-anchor",S.text.anchor.__selected__),m.current=i;var a=g.current.get(i),o=a.x,d=a.y,p=l.height/2-d,x=l.width/2-o;(r=document.querySelector("#graph")).setAttribute("style","transform:translate(".concat(x-S.margin,"px,").concat(p-S.margin,"px) scale(1);")),(r=document.querySelector("#background")).setAttribute("style","transform:translate(".concat(x/20,"px,").concat(p/20,"px) scale(").concat(s?2:1.6,");")),c(_(N.get(i)))}),[h,i]),(0,n.jsx)("div",{id:"container",className:A().container,children:(0,n.jsx)("div",{id:"background",className:A().background,children:(0,n.jsx)(x(),L({},r,{placeholder:"blur",alt:"",layout:"fill",objectFit:"cover"}))})})}var P=r(11163),E=r(9821),M=r(1914),R=r.n(M);function T(t){var e=t.visibleLeaf,r=(0,P.useRouter)(),a=(0,b.a)("only screen and (max-width : 768px)");return(0,n.jsx)("div",{className:R().blogs,children:(0,n.jsx)(i.tq,{className:R().cards,slidesPerView:2,grid:{rows:a?1:2},pagination:{type:"fraction"},keyboard:{enabled:!0},mousewheel:!0,slidesPerGroupSkip:0,direction:"vertical",modules:[c.tl,c.N1,c.rj,c.Gk],children:e.map((function(t,e){var a,c,o,s,l,u;return(0,n.jsx)(i.o5,{className:R().card,onClick:function(){r.push("/"+r.asPath.split("/")[1]+t.url)},children:(0,n.jsxs)("div",{className:R()["card-container"],children:[(0,n.jsx)("div",{className:R().background,children:(0,n.jsx)(E.Z,{src:t.imageProps.src,blurDataURL:t.imageProps.blurDataURL,placeholder:"blur",layout:"fill",alt:"",objectFit:"cover"})}),(0,n.jsxs)("div",{className:R().text,children:[(0,n.jsx)("div",{className:R().title,children:(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:(null===(a=t._highlightResult)||void 0===a||null===(c=a.title)||void 0===c?void 0:c.value)||t.title}})}),(0,n.jsx)("div",{className:R().description,children:(0,n.jsx)("div",{dangerouslySetInnerHTML:{__html:(null===(o=t._highlightResult)||void 0===o||null===(s=o.description)||void 0===s?void 0:s.value)||t.description}})})]}),(0,n.jsx)("div",{className:R().date,dangerouslySetInnerHTML:{__html:(null===(l=t._highlightResult)||void 0===l||null===(u=l.date)||void 0===u?void 0:u.value)||t.date}})]})},e)}))})})}var C=r(68062),F=r.n(C);function U(t){var e=t.tree,r=t.focusID,a=t.setFocusID,i=(0,o.T_)("content"),c=h(e),s=p(e);return(0,n.jsxs)("div",{className:F()["crumb-menu"],children:[(0,n.jsx)("div",{className:F()["current-path"],children:function(t){for(var e=s.get(t),r=[];null!==e;)r.push(e),e=c.get(e.id);return r.reverse(),r}(r).map((function(t,e){return(0,n.jsx)("div",{className:F()["current-path-node"],onClick:function(){a(t.id)},children:t.isLeaf?t.title:i(t.name)},e)}))}),(0,n.jsx)("div",{className:F()["next-path"],children:s.get(r).isLeaf?null:s.get(r).children.map((function(t,e){return(0,n.jsx)("div",{className:F()["next-path-node"],onClick:function(){a(t.id)},children:t.isLeaf?t.title:i(t.name)},e)}))})]})}var q=r(24955),G=r.n(q),H={attributesToRetrieve:["name","title","description"],hitsPerPage:10},W=r(57748),V=r.n(W),X=G()("5C1Z9Q4AJW","24f7dca973c7bd88d2a677fe2b13cc90").initIndex("chi-s-page-1");function Y(t){var e=t.tree,r=t.focusID,a=t.setVisibleLeaf,i=h(e),c=p(e);return(0,n.jsx)("div",{className:V().searchbar,children:(0,n.jsx)("input",{onChange:function(t){var e=t.target.value;X.search(e,H).then((function(t){var e=t.hits.filter((function(t){return function(t,e){for(var r=c.get(e);null!==r&&void 0!==r;){if(t===r.id)return!0;r=i.get(r.id)}return!1}(r,t.objectID)})).map((function(t){var e=c.get(t.objectID);return e._highlightResult=t._highlightResult,e}));a(e)}))}})})}var Q=r(21279),Z=r.n(Q);function $(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function z(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,a,i=[],c=!0,o=!1;try{for(r=r.call(t);!(c=(n=r.next()).done)&&(i.push(n.value),!e||i.length!==e);c=!0);}catch(s){o=!0,a=s}finally{try{c||null==r.return||r.return()}finally{if(o)throw a}}return i}}(t,e)||function(t,e){if(!t)return;if("string"===typeof t)return $(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);"Object"===r&&t.constructor&&(r=t.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return $(t,e)}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(t){var e=t.data,r=e.tree,i=(0,b.a)("only screen and (max-width : 768px)"),c=z(a.useState(_(r)),2),o=c[0],s=c[1],l=z(a.useState(r.id),2),u=l[0],d=l[1];return(0,n.jsxs)("div",{className:Z().container,children:[i?null:(0,n.jsx)(v,{tree:r,focusID:u,setFocusID:d}),(0,n.jsx)(O,{tree:r,setVisibleLeaf:s,imageProps:e.imageProps,focusID:u}),i?(0,n.jsx)(U,{tree:r,focusID:u,setFocusID:d}):null,(0,n.jsx)(Y,{tree:r,setVisibleLeaf:s,focusID:u}),(0,n.jsx)(T,{visibleLeaf:o})]})}var K=!0;function B(t){var e=t.data;return(0,n.jsx)(J,{data:e})}},1914:function(t){t.exports={blogs:"styles_blogs__P0x71",cards:"styles_cards__gQMec",card:"styles_card__Edy5l","card-container":"styles_card-container__XD7Rb",background:"styles_background__yIQg_",text:"styles_text__k5SGN",title:"styles_title__Ie_8e",description:"styles_description__lxggk",date:"styles_date__UaDpX"}},68062:function(t){t.exports={"crumb-menu":"styles_crumb-menu__vNpgG","current-path":"styles_current-path__Fqjdj","next-path":"styles_next-path__E_7da","current-path-node":"styles_current-path-node__SeS6j","next-path-node":"styles_next-path-node__tjzrv"}},27825:function(t){t.exports={container:"styles_container__vL4a_",background:"styles_background__O1uXg",svg:"styles_svg__N8DLm","tree-link":"styles_tree-link__Nxx5c","tree-node":"styles_tree-node__rZ_6s","tree-text-ipy":"styles_tree-text-ipy__AaDv4","tree-text-md":"styles_tree-text-md__jkojG","tree-text-dir":"styles_tree-text-dir__IuzsS","tree-circ-ipy":"styles_tree-circ-ipy__emIjn","tree-circ-md":"styles_tree-circ-md__wtsG3","tree-circ-dir":"styles_tree-circ-dir__YK5jr"}},57748:function(t){t.exports={searchbar:"styles_searchbar__xH0YX"}},79649:function(t){t.exports={"tree-menu-wrapper":"styles_tree-menu-wrapper___wOi_","tree-menu-wrapper-close":"styles_tree-menu-wrapper-close___uLdI","tree-menu":"styles_tree-menu__fstUR","node-wrapper":"styles_node-wrapper__tWYhY","node-text":"styles_node-text__hqY3_","node-children":"styles_node-children__HvVH_","node-children-close":"styles_node-children-close__Qvw_j",icon:"styles_icon__SMl5G"}},21279:function(t){t.exports={container:"styles_container__4uy0_"}}},function(t){t.O(0,[675,819,747,774,888,179],(function(){return e=61719,t(t.s=e);var e}));var e=t.O();_N_E=e}]);