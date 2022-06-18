// import fs from 'fs'
// import md5 from 'md5js'
// import axios from 'axios'
// import sharp from "sharp"

export default async function CodeSSGRender(cell){
    const fs = require('fs')
    const md5 = require('md5js')
    const axios = require('axios')
    const sharp = require('sharp')
    cell.source = cell.source.join('')
    if(Array.isArray(cell.outputs)){
        for(let output of cell.outputs){
            if(output.output_type === 'stream'){
                // console.log(output.data)
                output.data = output.text.join('')
                delete output.name
                delete output.text
                output.type = 'stream'
            }else{
                let keys = Object.keys(output.data)
                keys.pop('text/plain')
                let output_type = keys[0]
                output.data = output.data[output_type]
                output.type = output_type

                if(
                    output_type == 'image/png'||
                    output_type == 'image/jpeg'||
                    output_type == 'image/gif'
                ){
                    const scale = 100
                    let history = fs.readFileSync('existsImageFilename.json','utf-8')
                    history = JSON.parse(history)
                    let buffer= Buffer.from(output.data,'base64')
                    let ext = '.'+output_type.split('/')[1]
                    let filename = md5.md5(output.data)+ext
                    let url
                    if(!(filename in history)){
                        fs.writeFileSync(filename,buffer)
                        axios.post('https://sm.ms/api/v2/upload',
                            ({
                                smfile:fs.createReadStream(filename),
                                format:'json'
                            }),{
                                headers:{
                                    "Content-Type":"multipart/form-data",
                                    Authorization:process.env.SMMS_TOKEN  
                                }
                            }).then(res=>{
                                url = res.message.url
                                fs.unlinkSync(filename)
                            })
                    }else{
                        url = history[filename]
                    }
                   
                    let image = sharp(buffer)
                    let metadata= await image.metadata()
                    let blurImageBuffer = await image.resize(Math.floor(metadata.width/scale),Math.floor(metadata.height/scale)).toBuffer()
                    output.imageProps = {
                        width:metadata.width,
                        height:metadata.height,
                        blurDataURL: 'data:'+output_type+';base64,'+blurImageBuffer.toString('base64')
                    }
                    // output.data = 'data:'+output_type+';base64,'+output.data
                    output.data = url
                    //console.log(output)
                }else if(output_type == 'text/html'){
                    output.data = output.data.join('')   
                }
            }
            delete output.output_type
        }
    }
    // console.log(cell)
    return cell
}