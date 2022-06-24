import fs from 'fs'
import path from 'path'
import {md5} from 'md5js'
import _matter from 'gray-matter'
import algoliasearch from 'algoliasearch'
import { ALGOLIA_INDEX,IGNORE,EXT,BASE_PATH} from './config'
import data from './data'
import { getPlaiceholder } from 'plaiceholder'


function hash(x){
    return 'uuid'+md5(x)
}

function bfs(node,callback){
    let queue = [node]
    while(queue.length>0){
        let newQueue = []
        queue.forEach(item=>{
            callback(item)
            if(!item.isLeaf){
                newQueue = newQueue.concat(item.children)
            }
        })
        queue = newQueue
    }
}
function dateToString(date){
    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
}
function matter(filepath){
    if(filepath.endsWith('.md')){
        let content = fs.readFileSync(filepath,'utf-8')
        return _matter(content).data
    }else if(filepath.endsWith('.ipynb')){
        let content = fs.readFileSync(filepath,'utf-8')
        content = JSON.parse(content)
        if(content.cells[0].cell_type=='markdown'){
            return _matter(content.cells[0].source.join('')).data
        }
    }else{
        console.error(`Unsupported File Type ${filepath}`)
    }
    return undefined
}


export function walkDirFlat(dir){
    let paths = []
    bfs(walkDir(dir),(node)=>{
        if(node.isLeaf){
            paths.push(node.path)
        }
    })
    return paths
}
export function walkDir(dir){
    let ret = {
        name:dir,
        path:dir,
        isLeaf:false,
        children:[]
    }
    let paths = [ret.path]
    let objs  = [ret]
    while(paths.length > 0){
        let newPaths = []
        let newObjs  = []
        paths.forEach((_path,i)=>{
            let isIgnore = false
            for(let reg of IGNORE){
                if(objs[i].name.split('.')[0].search(reg)==0){
                    isIgnore = true
                    break
                }
            }
            if(!isIgnore){
                fs.readdirSync(_path).forEach(name=>{
                    let newPath =  path.join(_path,name)
                    if(fs.statSync(newPath).isDirectory()){
                        let newObj = {
                            name:name,
                            path:newPath,
                            isLeaf:false,
                            children:[]
                        }
                        objs[i].children.push(newObj)
                        newPaths.push(newPath)
                        newObjs.push(newObj)
                    }else{
                        let isLegalExt = false 
                        for(let ext of EXT){
                            if(name.endsWith(ext)){
                                isLegalExt=true
                                break
                            }
                        }
                        if(isLegalExt){
                            let newObj = {
                                name:name,
                                path:newPath,
                                isLeaf:true,
                            }
                            objs[i].children.push(newObj)
                        }
                    }
                })
            }
        })
        paths = newPaths 
        objs  = newObjs
    }
    return ret
}
export function pathToURL(filepath){
    /*
    Input:
    ------
        path:content//engineering-science/computer-science/hust_pa.en.md
    Output:
    -------
        url: content/engineering-science/computer-science/hust_pa-md
    */
    let parser = path.parse(filepath)
    let dirlist = parser.dir.split(path.sep)
    let namelist = parser.name.split('.')
    if(namelist.length > 2){
        console.error(`Unspport filename ${parser.base}`)
    }
    let url = `/${dirlist.join('/')}/${namelist[0]}-${parser.ext.slice(1)}`
    return url

}
export function parseFrontmatter(tree){
    bfs(tree,node=>{
        if(node.isLeaf){
            let frontmatter = matter(node.path)
            node.title = frontmatter?.title||data.default.title
            node.description =  frontmatter?.description||data.default.description
            node.date  = frontmatter?.date || data.default.date
            node.image = frontmatter?.image || data.default.image
            if(typeof(node.date) !== 'string'){
                node.date = dateToString(node.date)
            }
        }
    })
    return  tree
}
export async function getNodeImageProps(tree){
    let promises = []
    bfs(tree,node=>{
        if(node.isLeaf){
            promises.push(getPlaiceholder(node.image))
        }
    })
    promises = await Promise.all(promises)
    let i = 0
    bfs(tree,node=>{
        if(node.isLeaf){
            let {img,base64} = promises[i]
            node.imageProps = {
                ...img,
                blurDataURL:base64
            }
            i += 1
        }
    })
    return tree
}
export function assignID(tree){
    bfs(tree,node=>{
        node.id = hash(node.path)
    })
    return tree
}
export function assignURL(tree){
    bfs(tree,node=>{
        if(node.isLeaf){
            node.url = pathToURL(node.path)
        }
    })
}
export function assignLocalePath(tree){
    bfs(tree,node=>{
        let pathList = node.path.split(path.sep).slice(1)
        if(node.isLeaf){
            node.localePath = null
        }else{
            pathList.push('name')
            node.localePath = pathList.join('.')
        }
    })
}
export function uploadToAgolia(tree){
    const client = algoliasearch(process.env.APPLICATION_ID, process.env.ADMIN_API_KEY)
    const index = client.initIndex(ALGOLIA_INDEX)

    let upload = []
    bfs(tree,node=>{
        if(node.isLeaf){
            upload.push({
                id:node.id,
                objectID:node.id,
                name:node.name,
                title:node.title,
                description:node.description,
                date:node.date,
                image:node.image
            })
        }
    })

    index.saveObjects(upload, {
    autoGenerateObjectIDIfNotExist: true
    }).then((e)=>{
    // console.log(e)
    })
}



export function SlugToFilepath({slug,locale}){
    // console.log('__dirname',__dirname)
    
    let dirpath    = slug.slice(0,slug.length-1).join(path.sep)
    let namelist   = slug[slug.length-1].split('-')
    let filename   = `${namelist.slice(0,-1).join('-')}.${locale}.${namelist[namelist.length-1]}`
    let defaultName= `${namelist.slice(0,-1).join('-')}.${namelist[namelist.length-1]}`
    let filepath   = path.join(BASE_PATH,dirpath,filename)
    let defaultFilePath=path.join(BASE_PATH,dirpath,defaultName)
    // console.log('abspath',path.resolve(filepath))
    return fs.existsSync(filepath)?filepath:defaultFilePath
}

export async function getImageProps(url){
    if(url === undefined)
        return  null
    const { base64, img } = await getPlaiceholder(url);
    return {
        ...img,
        blurDataURL:base64
    }
}


