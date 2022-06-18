import data from '../data'
import { getPlaiceholder } from 'plaiceholder'


export async function prepareDataForPdfViewer(){
    let {img,base64} = await getPlaiceholder(data.image)
    data.imageProps = {
        ...img,
        blurDataURL:base64
    }
    return data
}