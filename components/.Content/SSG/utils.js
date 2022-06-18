import {md5} from 'md5js'
import fs from 'fs'
import path, { dirname } from 'path'
import {getPlaiceholder} from 'plaiceholder'


const LOCALES = [
    'cn','en'
]

const BASE_IGNORE = [
    /__.*__/i,
    /\..*/i
]
const EXT = [
    ".ipynb",
    ".md"
]
const BASE_PATH = 'D:/Project/HomePage/chi-s-page-1/content'

function hash(x){
    return 'uuid'+md5(x)
}

function walkDir(dir){
let returns = []
fs.readdirSync(dir).forEach(filename=>{
    let dirPath = path.join(dir,filename)
    let isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory?returns.push(walkDir(dirPath)):returns.push(dirPath)
})
return returns.flat()
}

async function getImageProps(url){
    if(url === undefined)
        return  null
    const { base64, img } = await getPlaiceholder(url);
    return {
        ...img,
        blurDataURL:base64
    }
}


function filepathToURLpath(filepath){
    let parser = path.parse(filepath)
    let dirlist = parser.dir.split(path.sep).map(i=>i.replace(' ','-'))
    let namelist = parser.name.split('.')
    if(namelist.length > 2){
        console.error(`Unspport filename ${parser.base}`)
    }
    let urlpath = `/${dirlist.join('/')}/${namelist[0]}-${parser.ext.slice(1)}`
    /* urlpath: /content/nature-science */
    return urlpath
}
function filepathToPathlist(filepath){
    let parser = path.parse(filepath)
    let dirlist = parser.dir.split(path.sep)
    let namelist = parser.name.split('.')
    if(namelist.length > 2){
        console.error(`Unspport filename ${parser.base}`)
    }
    return dirlist.concat([namelist[0]])
}
function SlugToFilepath({slug,locale}){
    // console.log('__dirname',__dirname)
    let dirpath    = slug.slice(0,slug.length-1).join(path.sep)
    let namelist   = slug[slug.length-1].split('-')
    let filename   = `${namelist[0]}.${locale}.${namelist[1]}`
    let defaultName= `${namelist[0]}.${namelist[1]}`
    let filepath   = path.join(BASE_PATH,dirpath,filename)
    let defaultFilePath=path.join(BASE_PATH,dirpath,defaultName)
    return fs.existsSync(filepath)?filepath:defaultFilePath
}


export {hash,walkDir,getImageProps,filepathToPathlist,filepathToURLpath,SlugToFilepath,BASE_IGNORE,EXT,LOCALES}
