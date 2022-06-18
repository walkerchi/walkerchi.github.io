

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import algoliasearch from 'algoliasearch'

import {data as config} from '../data'
import {hash,walkDir,getImageProps,filepathToPathlist,filepathToURLpath,BASE_IGNORE,EXT} from './utils'
import { getPlaiceholder } from 'plaiceholder'

function uploadToAgolia(files){
    const client = algoliasearch(process.env.APPLICATION_ID, process.env.ADMIN_API_KEY)
    const index = client.initIndex(config.algolia.index)
    let upload = files.map(file=>{
        let ret = {
          id:file.id,
          objectID:file.id,
          name:file.filename,
          title:file.frontmatter.title,
          description:file.frontmatter.description,
          date:file.frontmatter.date,
          image:file.frontmatter.image
        }
        return ret
      })
      index.saveObjects(upload, {
        autoGenerateObjectIDIfNotExist: true
      }).then((e)=>{
        // console.log(e)
      })
}

async function prepareDataForContent(locale){
    let filepaths = walkDir(config.root)
    filepaths = filepaths.filter(filepath=>{
        let parser = path.parse(filepath)
        let tmp   = parser.base.split('.')
        let isIgnore = false
        let matchExt = false
        let isDefault,isLocale
        for(let reg of BASE_IGNORE){
            if(tmp[0].search(reg)==0){
                isIgnore = true
                break
            }
        }
        if(isIgnore)
            return  false
        isDefault = (tmp.length === 2)
        isLocale  = (tmp.length === 3 && tmp[1]===locale)
        if(!isLocale && !isDefault)
            return false
        for(let ext of EXT){
            if(parser.ext === ext){
                matchExt=true 
                break
            }
        }
        if(!matchExt)
            return false 
        return true  
    })
    let files = filepaths.map(filepath=>{
        let parser = path.parse(filepath)

        /* pathlist */
        let pathlist = filepathToPathlist(filepath)
        /* urlpath */
        let urlpath  = filepathToURLpath(filepath)
  
        /*  frontmatter */
        let frontmatter
        if(parser.ext=='.md'){
          frontmatter = matter(fs.readFileSync(filepath,'utf-8')).data
          if(frontmatter === undefined)
            frontmatter = {}
        }else if(parser.ext == '.ipynb'){
          let content = fs.readFileSync(filepath,'utf-8')
          content = JSON.parse(content)
          if(content.cells[0].cell_type=='markdown'){
              frontmatter = matter(content.cells[0].source.join('')).data
              if(frontmatter === undefined)
                frontmatter = {}
          }else{
              frontmatter = {}
          }
        }
        if(frontmatter.date !== undefined && typeof(frontmatter.date) !== 'string'){
          frontmatter.date = frontmatter.date.getFullYear()+'-'+(frontmatter.date.getMonth()+1)+'-'+frontmatter.date.getDate()
        }

        return {
          directory:parser.dir,
          filename:parser.name,
          extname:parser.ext.slice(1),
          filepath,
          pathlist,
          urlpath,
          frontmatter,
          imageProps:getImageProps(frontmatter.image),
          id:hash(urlpath)
        }
    })
    let defaultImageProps = await getImageProps(config.items.image.url)
    let promises = files.map(file=>file.imageProps)
    promises = await Promise.all(promises)
    // console.log(promises)
    files.forEach((file,i)=>{
      if(promises[i])
        file.imageProps = promises[i]
      else  
        file.imageProps = defaultImageProps  
    })

    uploadToAgolia(files)

    return {
        files,
        imageProps:await getImageProps(config.image),
        tree,
    }
}

export default prepareDataForContent
