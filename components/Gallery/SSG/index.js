import data from '../data'
import { getPlaiceholder } from 'plaiceholder'
export default async function prepareDataForGallery(){
    data.imageProps = await (async ()=>{
        let {img,base64} = await getPlaiceholder(data.image)
        return {
            ...img,
            blurDataURL:base64
        }
    })()
    return data
}