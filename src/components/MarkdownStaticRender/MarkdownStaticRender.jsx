import React,{useEffect,useRef,useState} from 'react';
import './markdownStaticRender.css';
import '../../styles/markdownStyle.css';
// import 'github-markdown-css/github-markdown.css'
// import '../../styles/mathjaxConfig.css';
// import './mathjax-config';
import "mathjax/es5/tex-svg";
// import mermaid from 'mermaid';
import MarkdownIt from 'markdown-it';
import 'highlight.js/styles/docco.css'
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import mermaid from "mermaid";

mermaid.initialize({ startOnLoad: true });
// import 'katex/dist/katex.min.css'

// import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
/*
    support 
        mathjax(latex)  yes
        mermaid         yes
        code-highlight  yes
        emoj            yes
        ppt             yes
*/

// mermaid.initialize({startOnLoad:true});





export default function MarkdownRender({source,hasToc,isPPT,isStatic}) {
    // console.log(source)
    // console.log(`isPPT:${isPPT}`)
    // hljs.initHighlightingOnLoad();
    
    
    // let offCanvas = document.querySelector('#offCanvas')
    // if(!offCanvas){
    //     offCanvas=document.createElement('div');
    //     offCanvas.setAttribute('id','offCanvas');
    //     document.body.appendChild(offCanvas);
    // }
    
      const markdown = new MarkdownIt({
        html: true,
        xhtmlOut: false,
        breaks: false,
        langPrefix: "language-",
        linkify: true,
        typographer: false,
        quotes: "“”‘’",
      })
      .use(require('markdown-it-anchor').default)
      .use(require("markdown-it-table-of-contents"),{includeLevel:[1,2,3,4]})
      .use(require('markdown-it-emoji'),{shortcuts:{
      "smile":[":)",":-)"],
      "laughing":":D" ,
      ":sweat_smile:":"CNM",
    }})
      //.use(require('@ispicyfish/markdown-it-mermaid'))
      //.use(require('@liradb2000/markdown-it-mermaid'))
    //   .use(require('markdown-it-graphviz'))
      .use(require('markdown-it-highlightjs'))
      .use(require('markdown-it-mathjax3'),{tex: {
        inlineMath: [
          ["$", "$"],
          ["\\\\(", "\\\\)"],
          ["$$", "$$"]
        ],
        displayMath: [
          ["$$", "$$"],
          ["\\\\[", "\\\\]"]
        ],
        processEscapes: true
      }})
      .use(require('markdown-it-revealjs'))

      if(hasToc){
        source = "\n[[toc]]\n\n"+source
      }
      if(isPPT){
          console.log('isPPT')
          markdown.enable('revealjs')
      }else{
          console.log('isPDF')
          markdown.disable('revealjs')
      }

      const ele = useRef(null);
  
      console.log('before render')
      let html = markdown.render(source||"")
      console.log('after render')
      useEffect(()=>{
        let offcanvas = document.querySelector('#offcanvas');
        if (!offcanvas){
          offcanvas = document.createElement('div');
          offcanvas.setAttribute('id', 'offcanvas');
          document.body.appendChild(offcanvas);
        }
        ele.current.querySelectorAll(".language-mermaid").forEach(($el, idx) => {
          mermaid.mermaidAPI.render(
            `chart-${idx}`,
            $el.textContent,
            (svgCode) => {
              $el.innerHTML = svgCode;
            },
            offcanvas
          );
        });
        if(isPPT){
          let Reveal = require('reveal.js').default
          console.log(Reveal)
          let deck = new Reveal({
              // plugins: [ Markdown ]
          })
          deck.initialize();
        }
      },[isPPT,ele])
    
    return  <div className={`markdownrender-container ${isPPT?'':'markdown'}`} dangerouslySetInnerHTML={{__html:html}} ref={ele}></div>

}
