import { data } from "../data"
import { getPlaiceholder } from 'plaiceholder'
import axios from 'axios'

async function parseURL(url){
    let extensions = [
        '.pdf','.mp3','.png','.jpg'
    ]
    for(let extension of extensions){
        if(url.endsWith(extension)){
            return url
        }
            
    }
    let response = await axios.get(url,{headers: {
    'Access-Control-Allow-Origin': '*',
    }})
    let location = response.headers['content-location']
    let filename = response.headers['content-disposition'].split('\'\'')[1]
    return location + '/' + filename
}

async function getImageProps(url){
    let {img,base64} = await getPlaiceholder(url)
    return {
        ...img,
        blurDataURL:base64
    }
}


export default async function prepareDataForPdfGallery(){
    let promises = []
    let location = []
    let property = []
    data.imageProps =  getImageProps(data.image)
    promises.push(data.imageProps)
    location.push(data)
    property.push('imageProps')
    data.default.imageProps = await getImageProps(data.default.image)
    for(let lang of Object.keys(data.langs)){
        for(let shelf of data.langs[lang].shelfs){
            for(let collection of shelf.collections){
                for(let book of collection.books){
                    book.url =  parseURL(book.url)
                    promises.push(book.url)
                    location.push(book)
                    property.push('url')
                    if(book.hasOwnProperty('cover')){
                        book.imageProps = getImageProps(book.cover)
                        promises.push(book.imageProps)
                        location.push(book)
                        property.push('imageProps')
                    }else{
                        book.imageProps = data.default.imageProps
                    }
                }
            }
        }
    }
    promises = await Promise.all(promises)
    promises.forEach((promise,i)=>{
        location[i][property[i]] = promise
    })
    return data
}