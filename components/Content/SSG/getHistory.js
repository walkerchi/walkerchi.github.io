import fs from 'fs'
import axios from "axios"
import { HISTORY_FILENAME as FILENAME } from './config'

export default async function getHistory(){
    let filenames = []
    let res = await axios.get('https://sm.ms/api/v2/upload_history',
    {
        params:{
            page:1
        },
        headers:{
            Authorization:process.env.SMMS_TOKEN,
            "Content-Type":'multipart/form-data'
        }
    })
    filenames = filenames.concat(res.data.data.map(image=>({filename:image.filename,url:image.url})))
    let maxPage = res.data.TotalPages
    for(let i=2;i<=maxPage;i++){
        res = await axios.get('https://sm.ms/api/v2/upload_history',
        {
            params:{
                page:i
            },
            headers:{
                Authorization:process.env.SMMS_TOKEN,
                "Content-Type":'multipart/form-data'
            }
        })
        filenames = filenames.concat(res.data.data.map(image=>({filename:image.filename,url:image.url})))
    }
    let data = {}
    filenames.forEach((item)=>{
        data[item.filename] = item.url
    })
    fs.writeFileSync(FILENAME,JSON.stringify(data))
}