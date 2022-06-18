
import {pathToURL, walkDirFlat} from './utils'
import {ROOT,LOCALES} from './config'

function genPathForSlug(){
    let paths = walkDirFlat(ROOT)
    let urls = paths.map(pathToURL)
    urls = Array.from(new Set(urls))
    urls = urls.map(url=>{
        url = url.split('/').slice(2)
        return LOCALES.map(locale=>({
            params:{slug:url},
            locale
        }))
    }).flat()
    return urls
}

export default genPathForSlug