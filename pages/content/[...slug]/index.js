import React from 'react'
import IPynbRender from '../../../components/IPynbRender'
import MarkdownRender from '../../../components/MarkdownRender'
import MarkdownSSGRender from '../../../components/MarkdownRender/SSG'
import CodeSSGRender,{getHistory} from '../../../components/IPynbRender/CodeRender/SSG'
import {data as MdConfig} from '../../../components/MarkdownRender/data'
import {data as IpyConfig} from '../../../components/IPynbRender/data'
import genPathForSlug from '../../../components/Content/SSG/genPathForSlug'
import { SlugToFilepath,getImageProps } from '../../../components/Content/SSG/utils'

// SM_MS_TOKEN = "W1JYfxzHHQoGd08NWGg4eimJQXvyUjHE"


export default function ContentPage(props) {
  const {renderType} = props
  return renderType == 'ipy'?<IPynbRender {...props}/>
          :renderType == 'md'?<MarkdownRender {...props}/>
          :(<div>
            Unsupport renderType:{renderType}
          </div>)
}



export const getStaticPaths = ({ params }) => {
  return{
    paths:genPathForSlug(),
    fallback: 'blocking',
  }
}

export async function getStaticProps({params:{slug},locale,locales,defaultLocale}) {
  const fs = require('fs')
  const matter = require('gray-matter')

  let content = fs.readFileSync(SlugToFilepath({slug,locale}),'utf-8')
  let renderType,frontmatter,imageUrl
  if(slug[slug.length-1].endsWith('-ipynb')){
  // if is ipython
    renderType = 'ipy'
    content = JSON.parse(content)
    // cut frontmatter
    if(content.cells[0].cell_type=='markdown'){
        let parser = matter(content.cells[0].source.join(''))
        frontmatter = parser.data
        content.cells[0].source = parser.content
        if(frontmatter === undefined)
          frontmatter = {}
    }else{
        frontmatter = {}
    }
    // SSG render
    for(let cell of content.cells){
      if(cell.cell_type == 'markdown'){
        cell.source = await MarkdownSSGRender({markdown:Array.isArray(cell.source)?cell.source.join(''):cell.source,toc:false})
      }else if(cell.cell_type == 'code'){
        cell = await CodeSSGRender(cell)
      }
    }
    // image Url 
    imageUrl = frontmatter.image || IpyConfig.image.url
    
  }else if(slug[slug.length-1].endsWith('-md')){
  // if is markdown
    content =  matter(content)
    frontmatter = content.data
    content = await MarkdownSSGRender({markdown:content.content,toc:true})
    renderType='md'

    // image Url 
    imageUrl = frontmatter.image || MdConfig.image.url

  }

  if(frontmatter.date!== undefined && typeof(frontmatter.date)!=='string'){
    frontmatter.date = frontmatter.date.getFullYear()+'-'+(frontmatter.date.getMonth()+1)+'-'+frontmatter.date.getDate()
  }
  return  {
    props:{
      frontmatter,
      content,
      renderType,
      imageProps:await getImageProps(imageUrl),
      messages:require(`../../../locales/${locale}.js`).data,
    }
  }


  // return {
  //   props:{
  //     ... await prepareDataForSlug({slug,locale}),
  //     messages:require(`../../../locales/${locale}.js`).data
  //   }
  // }


  // const path = require('path')
  // const fs = require('fs')
  // const matter = require('gray-matter')
  // const {getPlaiceholder} = require('plaiceholder')

  // let {
  //   params:{
  //     slug
  //   },
  //   locales,
  //   locale,
  //   defaultLocale
  // } = props

  // slug.unshift('content')
  // let filename = slug[slug.length-1]
  // filename = filename.split('-')
  // filename = filename.slice(0,-1).join('-') + '.'+filename[filename.length-1]
  // slug[slug.length-1]=filename
  // let content = fs.readFileSync('D:/Project/HomePage/chi-s-page-1/'+path.join(...slug),'utf-8')
  // let renderType,frontmatter,imageUrl
  // if(slug[slug.length-1].endsWith('.ipynb')){
  // // if is ipython
  //   renderType = 'ipy'
  //   content = JSON.parse(content)
  //   // cut frontmatter
  //   if(content.cells[0].cell_type=='markdown'){
  //       let parser = matter(content.cells[0].source.join(''))
  //       frontmatter = parser.data
  //       content.cells[0].source = parser.content
  //       if(frontmatter === undefined)
  //         frontmatter = {}
  //   }else{
  //       frontmatter = {}
  //   }
  //   // SSG render
  //   for(let cell of content.cells){
  //     if(cell.cell_type == 'markdown'){
        
  //       cell.source = await MarkdownSSGRender({markdown:Array.isArray(cell.source)?cell.source.join(''):cell.source,toc:false})
  //     }else if(cell.cell_type == 'code'){
  //       cell = await CodeSSGRender(cell)
  //     }
  //   }
  //   // image Url 
  //   imageUrl = frontmatter.image || IpyConfig.image.url
    
  // }else if(slug[slug.length-1].endsWith('.md')){
  // // if is markdown
  //   content =  matter(content)
  //   frontmatter = content.data
  //   content = await MarkdownSSGRender({markdown:content.content,toc:true})
  //   renderType='md'

  //   // image Url 
  //   imageUrl = frontmatter.image || MdConfig.image.url

  // }else{
  // // unkown file  type
  //   renderType='unkown'
  // }

  // if(frontmatter.date!== undefined && typeof(frontmatter.date)!=='string'){
  //   frontmatter.date = frontmatter.date.getFullYear()+'-'+(frontmatter.date.getMonth()+1)+'-'+frontmatter.date.getDate()
  // }
  // let {base64,img} = await getPlaiceholder(imageUrl)
  // let imageProps = {
  //   ...img,
  //   blurDataURL:base64
  // }

  // return {
  //   props: {
  //     frontmatter,
  //     content,
  //     renderType,
  //     imageProps,
  //     messages:require(`../../../locales/${locale}.js`).data,
  //   },
  // }
}
