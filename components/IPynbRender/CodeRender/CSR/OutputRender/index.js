import React from 'react'
import Image from 'next/image'
import styles from './styles.module.css'

export default function OutputRender({output}) {
    // console.log(output)
  return (
    <div className={styles.output}>
        {
            output.type   == 'image/png'
            ||output.type == 'image/jpeg'
            ||output.type == 'image/gif'
            ?(
            <Image src={output.data} {...output.imageProps} alt="" />
            )
            :output.type  == 'image/svg+xml'
            ||output.type == 'text/html'
            // ||output.type == 'stream'
            ?(
            <div className={styles.text} dangerouslySetInnerHTML={{__html:output.data}}/>
            )
            :output.type == 'stream'
            ?(
                <div  className={styles.text}>{output.data}</div>
            )
            :output.type == 'application/vnd.jupyter.widget-view+json'
            ?(
                "Unsupport for application/vnd.jupyter.widget-view+json"
            ):(
                "UNrecognized output type"
            )
        }
    </div>
  )
}