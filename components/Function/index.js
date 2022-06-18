import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import styles from './styles.module.css'

export default function Function({data}) {
  const t = useTranslations('function')
  const router = useRouter()
  return (
  <div className={styles.function}>
    <div className={styles.container}>
      {data.functions.map((node,i)=>(
      <div className={styles.block} key={i} onClick={()=>{router.push(node.url)}}>
        <div className={styles.image}>
          <Image src={node.icon} layout='fill' alt='' objectFit='contain'/>
        </div>
        <div className={styles.text}>
          <div>{node.name}</div>
        </div>
      </div>))}
    </div>     
  </div>
  )
}
