
import {ROOT} from './config'
import {walkDir,assignID,parseFrontmatter, uploadToAgolia,getNodeImageProps,getImageProps, assignURL,assignLocalePath} from './utils'
import data from './data'



async function prepareDataForContent(locale){
    let tree = walkDir(ROOT)
    assignID(tree)
    assignURL(tree)
    assignLocalePath(tree)
    parseFrontmatter(tree)
    uploadToAgolia(tree)
    await getNodeImageProps(tree)

    return {
        tree,
        imageProps:await getImageProps(data.image)
    }
}

export default prepareDataForContent
