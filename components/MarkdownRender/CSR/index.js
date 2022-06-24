import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathJax from 'rehype-mathjax'
import rehypeSlug from 'rehype-slug'
import rehypeToc from "@jsdevtools/rehype-toc"
import rehypeReact from 'rehype-react'
import styles from './styles.module.css'
import useScrollPosition from '@react-hook/window-scroll'
import {data as config} from './data'



function NextLink({ children, href }) {
    let tmp = href.split('/')
    tmp = tmp[tmp.length-1]
    if(tmp.includes('#')){
      let id = tmp.slice(tmp.indexOf('#'))
      return(
      <a className={`${styles['toc-item']}`}
          href={id}
      >
        {children}
      </a>)   
    }else{
      return (
        <Link href={href}>
          <a>
            {children}
          </a>
        </Link>
      )
    }
  }
function NextImage(imageProps){
  let {src,height,width,blurdataurl} =  imageProps
    return( 
    <span style={{display:"flex",flexDirection:'column',alignItems:"center",justifyContent:"center"}}>
      <Image src={src} blurDataURL={blurdataurl} 
      // layout='fill' 
      width={width}
      height={height}
      placeholder='blur' alt="" objectFit='cover'/>
    </span> 
    )
}
function Toc({children}){
  let scrollY = useScrollPosition(16)
  let [isOpen,setIsOpen] = React.useState(false)
  // let [hasScroll,setHasScroll] = React.useState(false)
  // React.useEffect(()=>{
  //   function handleScroll(e){
  //     let scrollTop  = document.documentElement.scrollTop      
  //     if(scrollTop > 50){
  //         setHasScroll(true)
  //     }else{
  //         setHasScroll(false)
  //     }
  // }
  // window.addEventListener('scroll', handleScroll);
  // },[])
  return (
  <div className={`${styles['toc-open']} ${isOpen?'':styles['toc-close']} ${scrollY>50?styles['has-scroll']:''}`}>
    <nav className="toc">
      {children}
    </nav>
    <div
    className={styles.arrow} 
    onClick={()=>{
          setIsOpen(!isOpen)}}>
      <div style={{backgroundImage:`url(${config.arrow})`}} />
    </div>
  </div>)
}


const Render = unified()
                .use(rehypeParse)
                .use(rehypeHighlight)
                .use(rehypeMathJax)
                .use(rehypeReact,{
                    createElement: React.createElement,
                    components:{
                        a:NextLink,
                        img:NextImage
                    }
                })

const RenderWithToc = unified()
              .use(rehypeParse)
              .use(rehypeHighlight)
              .use(rehypeMathJax)
              .use(rehypeSlug)
              .use(rehypeToc)
              .use(rehypeReact,{
                  createElement: React.createElement,
                  components:{
                      a:NextLink,
                      img:NextImage,
                      nav:Toc
                  }
              })

export default function MarkdownCSRRender({content,toc}) {
    // content = pako.ungzip(content,{to:'string'})
    let [html,setHTML] = React.useState(null)
    let render = (toc||false)?RenderWithToc:Render

    React.useEffect(()=>{
        render
        .process(content)
        .then(e=>{
          e = e.result.props.children[0].props.children[1].props.children
          setHTML(e)})
        },[])
  return (
    <div className={styles['md']}>
        {html}
    </div>
  )
}
