(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[590],{10397:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[lang]/gallery/musics",function(){return t(23870)}])},23870:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return v},default:function(){return g}});var r=t(85893),l=t(67294),s=t(25675),o=t.n(s),c=t(96352),a=t(98352),u=t(70582),i=t(21963),d=t.n(i);function m(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function _(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function f(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){_(e,n,t[n])}))}return e}function b(e,n){return function(e){if(Array.isArray(e))return e}(e)||function(e,n){var t=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=t){var r,l,s=[],o=!0,c=!1;try{for(t=t.call(e);!(o=(r=t.next()).done)&&(s.push(r.value),!n||s.length!==n);o=!0);}catch(a){c=!0,l=a}finally{try{o||null==t.return||t.return()}finally{if(c)throw l}}return s}}(e,n)||function(e,n){if(!e)return;if("string"===typeof e)return m(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(t);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return m(e,n)}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function y(e){var n,t=e.data,s=function(){var e,n,l,s,a;return(0,r.jsxs)("div",{className:d().controller,children:[(0,r.jsx)("div",{className:d()["controller-background"],children:(0,r.jsx)(o(),{src:(null===(e=t.albums[j][g])||void 0===e||null===(n=e.imageProps)||void 0===n?void 0:n.blurDataURL)||t.imageProps.blurDataURL,layout:"fill",alt:"",objectFit:"cover"})}),(0,r.jsx)("div",{className:d()["controller-banner"],children:(0,r.jsx)(o(),f({},(null===(l=t.albums[j][g])||void 0===l?void 0:l.imageProps)||t.imageProps,{layout:"fill",placeholder:"blur",alt:"",objectFit:"cover"}))}),(0,r.jsx)("div",{className:d()["controller-text"],children:(0,r.jsx)("h1",{children:null===(s=t.albums[j][g])||void 0===s?void 0:s.name})}),(0,r.jsx)(c.Z,{className:d()["controller-player"],autoPlay:!1,src:null===(a=t.albums[j][g])||void 0===a?void 0:a.url,showSkipControls:!0,showJumpControls:!1,onClickPrevious:function(){h((function(e){return(e-1+t.albums[j].length)%t.albums[j].length}))},onClickNext:function(){h((function(e){return(e+1)%t.albums[j].length}))},onEnded:function(){h((function(e){return(e+1)%t.albums[j].length}))}})]})},i=function(){return(0,r.jsxs)("div",{className:d()["songs-wrapper"],children:[(0,r.jsx)("div",{className:d().songs,children:t.albums[j].map((function(e,n){return(0,r.jsxs)("div",{className:"".concat(d().song," ").concat(g===n?d()["song-selected"]:""),children:[(0,r.jsx)("div",{className:d().icon,onClick:function(){h(n)}}),(0,r.jsx)("h1",{children:e.name})]},n)}))}),(0,r.jsx)("div",{className:d().albums,children:Object.keys(t.albums).map((function(e,n){return(0,r.jsx)("div",{className:"".concat(d().album," ").concat(e===j?d()["album-selected"]:""),onClick:function(){x(e)},children:y(e)},n)}))})]})},m=function(){return w?(0,r.jsx)(a.o5,{className:d()["controller-xs"],children:s()}):s()},_=function(){return w?(0,r.jsx)(a.o5,{className:d()["songs-xs"],children:i()}):i()},y=(0,u.T_)("gallery.musics"),v=b(l.useState(null),2),g=v[0],h=v[1],p=b(l.useState(Object.keys(t.albums)[0]),2),j=p[0],x=p[1],N=b(l.useState(!1),2),w=N[0],k=N[1];return l.useEffect((function(){k(document.documentElement.clientWidth<=768),h(0),window.addEventListener("resize",(function(){k(document.documentElement.clientWidth<=768)}))}),[]),(0,r.jsxs)("div",{className:d()["music-gallery"],children:[(0,r.jsx)("div",{className:d().background,children:(0,r.jsx)(o(),f({},(null===(n=t.albums[j][g])||void 0===n?void 0:n.imageProps)||t.imageProps,{layout:"fill",placeholder:"blur",alt:"",objectFit:"cover"}))}),w?(0,r.jsxs)(a.tq,{className:d().container,children:[m(),_()]}):(0,r.jsxs)("div",{className:d().container,children:[m(),_()]})]})}var v=!0;function g(e){var n=e.data;return(0,r.jsx)(y,{data:n})}},21963:function(e){e.exports={"music-gallery":"styles_music-gallery__KGpyj",background:"styles_background__7LQ5d",container:"styles_container__Nmj4R",controller:"styles_controller__tpU9T","controller-background":"styles_controller-background__4dLV8","controller-banner":"styles_controller-banner__rwP1v","controller-text":"styles_controller-text__ttQsv","controller-player":"styles_controller-player__7P8sj","songs-wrapper":"styles_songs-wrapper__DbDYk",albums:"styles_albums__oEHSt",album:"styles_album___8RDd","album-selected":"styles_album-selected__VNEqv",songs:"styles_songs__EKrXd",song:"styles_song__yO2qA","song-selected":"styles_song-selected__rmG6j",icon:"styles_icon__LiA1u","controller-xs":"styles_controller-xs__Hwf_l","songs-xs":"styles_songs-xs__WoNHm"}}},function(e){e.O(0,[675,819,352,774,888,179],(function(){return n=10397,e(e.s=n);var n}));var n=e.O();_N_E=n}]);