import React from 'react'
import styles from './styles.module.css'
import Me from '../../components/Me'
import {data} from '../../components/Me/data'
import { getPlaiceholder } from 'plaiceholder'
export default function MePage({timelineImageProps}) {
  return (
    <div className={styles.me}>
        <Me timelineImageProps={timelineImageProps}/>
    </div>
  )
}

export async function getStaticProps({locale}) {
    let timelineImageProps = []
    for(let item of data.timeline){
        let {base64,img} = await getPlaiceholder(`/${item.img}`)
        timelineImageProps.push({
            ...img,
            blurDataURL:base64
        })
    }
    return {
      props: {
        timelineImageProps,
        messages:require(`../../locales/${locale}.js`).data,
      },
    }
  }
  
  