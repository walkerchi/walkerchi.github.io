import { getPlaiceholder } from 'plaiceholder'
import axios from 'axios'
import data from './data'

async function parseURL(url){
    if(url.endsWith('.mp3')){
        return url
    }else{
        let response = await axios.get(url)
        console.log(reponse.headers)
        let location = response.headers['content-location']
        let filename = response.headers['content-disposition'].split('\'\'')[1]
        return location + '/' + filename
    }
}


export default async function prepareDataForMusicGallery(){
    let {img,base64} = await getPlaiceholder(data.image)
    data.imageProps = {
        ...img,
        blurDataURL:base64
    }
    let promises = []
    let location = []
    let property = []
    for(let album of Object.keys(data.albums)){
        for(let item of data.albums[album]){
            item.url = parseURL(item.url)
            promises.push(item.url)
            location.push(item)
            property.push('url')
            if(item.cover){
                item.imageProps = (async ()=>{
                    let {img,base64} = await getPlaiceholder(item.cover)
                    return {
                        ...img,
                        blurDataURL:base64
                    }
                })()
                promises.push(item.imageProps)
                location.push(item)
                property.push('imageProps')
            }else{
                item.imageProps = data.imageProps
            }
        }
    }

    promises= await Promise.all(promises)
    promises.forEach((promise,i)=>{
        location[i][property[i]] = promise
    })
    return data
}