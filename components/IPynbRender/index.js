import React from 'react'
import Image from 'next/image'
import CodeCSRRender from './CodeRender/CSR'
import MarkdownCSRRender from '../MarkdownRender/CSR'
import styles from './styles.module.css'
export default function IPynbRender({frontmatter,content,imageProps}) {
  return (
    <div className={styles['ipynb-render']}>
      <div className={styles.banner}>
          <Image {...imageProps} layout='fill' placeholder='blur' alt="" objectFit='cover'/>
      </div>
      <div className={styles.content}>
        {
            content.cells.map((cell,i)=>(
              <div className={styles.cell} key={i}>{
                cell.cell_type=='markdown'
              ?<MarkdownCSRRender 
              content={cell.source} 
              key={i}/>
              :cell.cell_type=='code'
              ?<CodeCSRRender 
              cell={cell} 
              key={i}/>
              :"UNrecognized Cell Type"
                }
              </div>
            ))
        }
        </div>
    </div>
  )
}
