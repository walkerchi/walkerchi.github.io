import React from 'react'
import Image from 'next/image'
import styles from './styles.module.css'

import MarkdownCSRRender from './CSR'

export default function MarkdownRender({frontmatter,content,imageProps}) {
  return (
    <div className={styles['md-render']}>
        <div className={styles.banner}>
          <Image {...imageProps} layout='fill' placeholder='blur' alt="" objectFit='cover'/>
        </div>
        <div className={styles.content}>
          <MarkdownCSRRender content={content} toc={true}/>
        </div>
    </div>
  )
}
