
import {walkDir,filepathToURLpath,LOCALES} from './utils'

function genPathForSlug(){
    let filepaths = walkDir('content')
    let urlpaths = filepaths.map(filepathToURLpath)
    urlpaths = Array.from(new Set(urlpaths))
    urlpaths = urlpaths.map(urlpath=>{
    urlpath = urlpath.split('/').slice(2)
        return LOCALES.map(locale=>({
            params:{slug:urlpath},
            locale
        }))
    }).flat()
    return urlpaths
}

export default genPathForSlug