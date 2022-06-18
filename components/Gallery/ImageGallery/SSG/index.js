import axios from "axios"
import { getPlaiceholder} from "plaiceholder"
import {data} from '../data'


export default async function prepareDataForImageGallery(){
    let imageProps = []

    for(let url of data){
        let {base64,img} = await getPlaiceholder(url)
        imageProps.push({
            ...img,
            blurDataURL:base64
        })
    }
    return imageProps
}