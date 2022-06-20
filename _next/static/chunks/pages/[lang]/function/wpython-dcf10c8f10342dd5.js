(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[761],{46642:function(e){e.exports="./_next/static/images/correct-d21f59c8956bf5e410922b2218476913.svg"},97562:function(e){e.exports="./_next/static/images/delete-48e8e74025e2c847ad982546900afc42.svg"},85700:function(e){e.exports="./_next/static/images/edit-e6bf9b43b46044c67170a1efc52a2592.svg"},91199:function(e){e.exports="./_next/static/images/markdown-77332aeb07ccab4fc34315e9bc9979b0.svg"},61551:function(e){e.exports="./_next/static/images/play-f74ac7f2725f545e758ea803caf32db6.svg"},78452:function(e){e.exports="./_next/static/images/python-203a57c7c23356980be9b0bbe77d0584.svg"},36874:function(e){e.exports="./_next/static/images/restart-6c98cc08f535767f22896f629d1f7756.svg"},69999:function(e){e.exports="./_next/static/images/switch-270b5cef34df35abcc47ced297951369.svg"},7610:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[lang]/function/wpython",function(){return n(85752)}])},85752:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return me},default:function(){return ve}});var r=n(85893),o=n(67294),s=(n(9008),n(4298)),i=n.n(s),c=n(34051),a=n.n(c),l=n(733),u=n.n(l),d={__init__:'\n    import matplotlib\n    import matplotlib.pyplot as plt\n    import numpy as np\n    import scipy\n    import sklearn \n    matplotlib.use("module://matplotlib.backends.html5_canvas_backend")\n    ',packages:[{name:"autograd"},{name:"numpy"},{name:"scikit-learn"},{name:"scipy"},{name:"sympy"},{name:"networkx"},{name:"matplotlib"},{name:"tqdm"}]},f=n(33345),p=n(50013),y=n(51618),h=n.n(y);function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function g(e){return(g=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function b(e,t){return!t||"object"!==w(t)&&"function"!==typeof t?m(e):t}function _(e,t){return(_=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var w=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function k(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=g(e);if(t){var o=g(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return b(this,n)}}var j=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_(e,t)}(c,e);var t,o,s,i=k(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e)).code="",t.run=t.run.bind(m(t)),t.edit=t.edit.bind(m(t)),t.switch=t.switch.bind(m(t)),t.select=t.select.bind(m(t)),t.delete=t.delete.bind(m(t)),t}return t=c,(o=[{key:"run",value:function(){this.props.update(this.code),this.props.run()}},{key:"edit",value:function(){this.props.edit()}},{key:"switch",value:function(){this.props.switch()}},{key:"select",value:function(e){this.props.select(),e.stopPropagation()}},{key:"delete",value:function(){this.props.delete()}},{key:"render",value:function(){var e=this;return(0,r.jsxs)("div",{className:"".concat(h().cell," ").concat(this.props.isSelected?h().selected:""),onClick:this.select,children:[(0,r.jsxs)("div",{className:"".concat(h()["change-to-".concat(this.props.isPython?"markdown":"python")]," ").concat(h().icon),onClick:this.switch,children:[(0,r.jsx)("span",{style:{backgroundImage:"url("+n(69999)+")"}}),(0,r.jsx)("div",{style:this.props.isPython?{maskImage:"url("+n(91199)+")"}:{backgroundImage:"url("+n(78452)+")"}})]}),(0,r.jsx)("div",{className:"".concat(h().delete," ").concat(h().icon),onClick:this.delete,children:(0,r.jsx)("div",{style:{backgroundImage:"url("+n(97562)+")"}})}),this.props.isPython?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"".concat(h()["run-cell"]," ").concat(h().icon),onClick:this.run,children:(0,r.jsx)("div",{style:{backgroundImage:"url("+n(61551)+")"}})}),(0,r.jsx)(f.ZP,{className:"".concat(h()["python-code"]," ").concat(h().code),value:this.code,height:"300px",theme:"dark",editable:!0,readOnly:!1,extensions:[(0,p.V)()],onChange:function(t){e.code=t}}),(0,r.jsxs)("div",{className:h()["python-output"],children:[(0,r.jsx)("div",{dangerouslySetInnerHTML:{__html:this.props.output}}),(0,r.jsx)("div",{id:"output-".concat(this.props.id)})]})]}):this.props.isRendered?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"".concat(h()["markdown-edit"]," ").concat(h().icon),onClick:this.edit,children:(0,r.jsx)("div",{style:{backgroundImage:"url("+n(85700)+")"}})}),(0,r.jsx)("div",{className:h()["markdown-output"],dangerouslySetInnerHTML:{__html:this.props.output}})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"".concat(h()["markdown-render"]," ").concat(h().icon),onClick:this.run,children:(0,r.jsx)("div",{style:{backgroundImage:"url("+n(46642)+")"}})}),(0,r.jsx)(f.ZP,{className:"".concat(h()["markdown-code"]," ").concat(h().code),value:this.code,height:"300px",theme:"dark",editable:!0,readOnly:!1,onChange:function(t){e.code=t}})]})]})}}])&&v(t.prototype,o),s&&v(t,s),c}(o.Component),x=n(34733),C=n(89274),P=n(93797),O=n(38522),S=n(44897),N=n(62947),R=n(72226),I=n(85997),M=n(13917);function A(e,t,n,r,o,s,i){try{var c=e[s](i),a=c.value}catch(l){return void n(l)}c.done?t(a):Promise.resolve(a).then(r,o)}function E(e){return function(){var t=this,n=arguments;return new Promise((function(r,o){var s=e.apply(t,n);function i(e){A(s,r,o,i,c,"next",e)}function c(e){A(s,r,o,i,c,"throw",e)}i(void 0)}))}}function L(){for(var e="uuid",t=0;t<3;++t)e+=Math.random().toString(36).slice(2);return e}function T(){return(T=E(a().mark((function e(t){var n;return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.l)().use(C.Z).use(P.Z).use(O.Z).use(S.Z).use(N.Z,{allowDangerousHtml:!0}).use(R.Z).use(I.Z).use(M.Z).process(t);case 2:return n=e.sent,e.abrupt("return",String(n));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var B=n(9180),Z=n.n(B);function U(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function F(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function V(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function D(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function G(e){return(G=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function H(e,t){return!t||"object"!==z(t)&&"function"!==typeof t?F(e):t}function K(e,t){return(K=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function W(e){return function(e){if(Array.isArray(e))return U(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return U(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return U(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var z=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function X(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=G(e);if(t){var o=G(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return H(this,n)}}var $=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&K(e,t)}(a,e);var t,s,i,c=X(a);function a(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,a),(t=c.call(this,e)).state={selectedCell:null,cells:[]},t.cellsRef=o.createRef({}),t.appendCell=t.appendCell.bind(F(t)),t.appendPython=t.appendPython.bind(F(t)),t.appendMarkdown=t.appendMarkdown.bind(F(t)),t.restart=t.restart.bind(F(t)),t.runAll=t.runAll.bind(F(t)),t.updateCell=t.updateCell.bind(F(t)),t.deleteCell=t.deleteCell.bind(F(t)),t.selectCell=t.selectCell.bind(F(t)),t.runCell=t.runCell.bind(F(t)),t.switchCell=t.switchCell.bind(F(t)),t}return t=a,s=[{key:"appendCell",value:function(e){null===this.state.selectedCell?(console.log("appendCell push outer"),this.setState((function(t){var n=W(t.cells);return n.push(e),{cells:n}}))):this.setState((function(t){var n=t.cells,r=t.selectedCell,o=W(n);return o.splice(r+1,0,e),{cells:o}}))}},{key:"appendPython",value:function(){this.appendCell({id:L(),isPython:!0,code:"",output:null})}},{key:"appendMarkdown",value:function(){this.appendCell({id:L(),isMarkdown:!0,isRendered:!1,code:"",output:null})}},{key:"restart",value:function(){this.props.restart()}},{key:"runAll",value:function(){for(var e=0;e<this.state.cells.length;++e)(this.state.cells[e].isPython||this.state.cells[e].isMarkdown&&!this.state.cells[e].isRendered)&&this.cellsRef.current[e].run()}},{key:"editCell",value:function(e){this.setState((function(t){var n=W(t.cells);return n[e].isRendered=!1,{cells:n}}))}},{key:"updateCell",value:function(e,t){this.setState((function(n){var r=W(n.cells);return r[e].code=t,{cells:r}}))}},{key:"deleteCell",value:function(e){this.setState((function(t){var n=W(t.cells);return n.splice(e,1),{cells:n}}))}},{key:"selectCell",value:function(e){console.log(e),this.setState({selectedCell:e})}},{key:"runCell",value:function(e){var t=this;this.setState((function(n){var r=W(n.cells),o=r[e];if(o.isPython){o.output=t.props.runPython(o.code);var s=document.getElementsByTagName("body")[0].lastChild;if(s.id&&s.id.startsWith("matplotlib")){var i=document.getElementById("output-".concat(o.id));console.log(i),i.childNodes.length>0&&i.removeChild(i.children[0]),i.appendChild(s),t.props.runPython('plt.close("all")')}}else if(o.isMarkdown){var c=t;(function(e){return T.apply(this,arguments)})(o.code).then((function(t){c.setState((function(n){var r=W(n.cells),o=r[e];return o.output=t,o.isRendered=!0,{cells:r}}))}))}return{cells:r}}))}},{key:"switchCell",value:function(e){this.setState((function(t){var n=W(t.cells),r=n[e];return r.isPython?n[e]={id:r.id,isMarkdown:!0,code:r.code,output:null}:r.isMarkdown&&(n[e]={id:r.id,isPython:!0,code:r.code,output:null}),console.log(n),{cells:n}}))}},{key:"render",value:function(){var e=this,t=this;return this.cellsRef.current=[],(0,r.jsxs)("div",{className:Z().container,onClick:function(){e.selectCell(null)},children:[(0,r.jsxs)("div",{className:Z().controller,children:[(0,r.jsx)("div",{className:"".concat(Z()["append-python"]," ").concat(Z().icon),onClick:this.appendPython,children:(0,r.jsx)("div",{style:{backgroundImage:"url("+n(78452)+")"}})}),(0,r.jsx)("div",{className:"".concat(Z()["append-markdown"]," ").concat(Z().icon),onClick:this.appendMarkdown,children:(0,r.jsx)("div",{style:{maskImage:"url("+n(91199)+")"}})}),(0,r.jsx)("div",{className:"".concat(Z().restart," ").concat(Z().icon),onClick:this.restart,children:(0,r.jsx)("div",{style:{backgroundImage:"url("+n(36874)+")"}})}),(0,r.jsx)("div",{className:"".concat(Z()["run-all"]," ").concat(Z().icon),onClick:this.runAll,children:(0,r.jsx)("div",{style:{backgroundImage:"url("+n(61551)+")"}})})]}),(0,r.jsx)("div",{className:Z().cells,children:this.state.cells.map((function(n,o){return(0,r.jsx)(j,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){D(e,t,n[t])}))}return e}({},n,{ref:function(t){e.cellsRef.current[o]=t},update:function(e){t.updateCell(o,e)},run:function(){t.runCell(o)},edit:function(){t.editCell(o)},switch:function(){t.switchCell(o)},delete:function(){t.deleteCell(o)},select:function(){t.selectCell(o)},isSelected:o===t.state.selectedCell}),n.id)}))})]})}}],s&&V(t.prototype,s),i&&V(t,i),a}(o.Component),q=n(70582);function J(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var Q=n(75680),Y=n.n(Q);function ee(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function te(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function ne(e,t,n,r,o,s,i){try{var c=e[s](i),a=c.value}catch(l){return void n(l)}c.done?t(a):Promise.resolve(a).then(r,o)}function re(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function oe(e){return(oe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function se(e,t){return!t||"object"!==ae(t)&&"function"!==typeof t?te(e):t}function ie(e,t){return(ie=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function ce(e){return function(e){if(Array.isArray(e))return ee(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"===typeof e)return ee(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ee(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var ae=function(e){return e&&"undefined"!==typeof Symbol&&e.constructor===Symbol?"symbol":typeof e};function le(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=oe(e);if(t){var o=oe(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return se(this,n)}}var ue,de,fe=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&ie(e,t)}(c,e);var t,n,s,i=le(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e)).t=t.props.t,t.state={messages:["Loading From CDN"],isLoading:!0},t.cells=o.createRef(null),t.pyodide=null,t.console=[],t.restart=t.restart.bind(te(t)),t.onLoad=t.onLoad.bind(te(t)),t.appendMesssage=t.appendMesssage.bind(te(t)),t.runPython=t.runPython.bind(te(t)),t.getLoadingMessage=t.getLoadingMessage.bind(te(t)),t}return t=c,n=[{key:"componentDidMount",value:function(){}},{key:"getLoadingMessage",value:function(){return this.state.messages[this.state.messages.length-1]}},{key:"appendMesssage",value:function(e){this.setState((function(t){var n=ce(t.messages);return n.push(e),{messages:n}}))}},{key:"restart",value:function(){var e=this;console.log(globalThis),this.setState({isLoading:!0}),globalThis.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/dev/full/",stdout:function(t){e.console.push(t)}}).then((function(t){var n=e;e.appendMesssage(e.t("loading.loading-packages"));var r=d.packages.map(function(){var e,n=(e=a().mark((function e(n){return a().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.loadPackage(n.name);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})),function(){var t=this,n=arguments;return new Promise((function(r,o){var s=e.apply(t,n);function i(e){ne(s,r,o,i,c,"next",e)}function c(e){ne(s,r,o,i,c,"throw",e)}i(void 0)}))});return function(e){return n.apply(this,arguments)}}());Promise.all(r).then((function(){n.appendMesssage(n.t("loading.finish")),n.pyodide=t,n.setState({isLoading:!1}),n.runPython(d.__init__),n.cells.current.appendPython()}))}))}},{key:"onLoad",value:function(){this.appendMesssage(this.t("loading.init-pyodide")),this.setState({isLoading:!0}),this.restart()}},{key:"runPython",value:function(e){try{this.console=[];var t=this.pyodide.runPython(e);return t=t||this.console.join("<br/>")}catch(n){return console.log(n),String(n)}}},{key:"render",value:function(){return(0,r.jsxs)("div",{className:Y().wpython,children:[this.state.isLoading?(0,r.jsxs)("div",{className:Y().loading,children:[(0,r.jsx)(u(),{type:"cubes",color:"#fff"}),(0,r.jsx)("div",{className:Y().message,children:this.getLoadingMessage()})]}):null,(0,r.jsx)($,{ref:this.cells,restart:this.restart,runPython:this.runPython})]})}}],n&&re(t.prototype,n),s&&re(t,s),c}(o.Component),pe=(ue=fe,de="function.wpython",function(e){var t=o.useRef(null);return o.useEffect((function(){e.onLoad&&t.current.onLoad()}),[e.onLoad]),(0,r.jsx)(ue,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),r.forEach((function(t){J(e,t,n[t])}))}return e}({ref:t},e,{t:(0,q.T_)(de)}))});function ye(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function he(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,s=[],i=!0,c=!1;try{for(n=n.call(e);!(i=(r=n.next()).done)&&(s.push(r.value),!t||s.length!==t);i=!0);}catch(a){c=!0,o=a}finally{try{i||null==n.return||n.return()}finally{if(c)throw o}}return s}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return ye(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(n);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return ye(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}var me=!0;function ve(){var e=he(o.useState(!1),2),t=e[0],n=e[1];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i(),{strategy:"afterInteractive",src:"https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js",onLoad:function(e){n(!0)}}),(0,r.jsx)(pe,{onLoad:t})]})}},51618:function(e){e.exports={icon:"styles_icon__tAPss","change-to-markdown":"styles_change-to-markdown__E9sdT","change-to-python":"styles_change-to-python__8Isoi","run-cell":"styles_run-cell__muIVV","markdown-edit":"styles_markdown-edit__K5pjw","markdown-render":"styles_markdown-render__FWSkV",delete:"styles_delete__zRIhT",cell:"styles_cell__y6W0B","markdown-output":"styles_markdown-output__CarzL",code:"styles_code__zlQmc","python-code":"styles_python-code__GFvc3","markdown-code":"styles_markdown-code__XsdN1","python-output":"styles_python-output__UJ__K",selected:"styles_selected__gbGP_"}},9180:function(e){e.exports={container:"styles_container__UNNvW",controller:"styles_controller__Ivwf2",icon:"styles_icon__KUmM4","append-markdown":"styles_append-markdown__6rVFZ","append-python":"styles_append-python__U1JOj",cells:"styles_cells__3PUYL"}},75680:function(e){e.exports={wpython:"styles_wpython___CHsG",loading:"styles_loading__0vBIT",message:"styles_message__2MlgK","loading-message-enter":"styles_loading-message-enter__k304h","loading-message-enter-active":"styles_loading-message-enter-active__sC4qd","loading-message-exit":"styles_loading-message-exit__SGHxV","loading-message-exit-active":"styles_loading-message-exit-active__4BIrf"}}},function(e){e.O(0,[762,879,443,568,201,733,680,774,888,179],(function(){return t=7610,e(e.s=t);var t}));var t=e.O();_N_E=t}]);