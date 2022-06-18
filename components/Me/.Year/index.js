import React from 'react'
import styles from './styles.module.css'

export default function Year({year}) {
  return (
    <div className={styles.year}>
        <div className={styles.title}>{year}</div>
        <div className={styles['months-wrapper']}>
            <ul className={styles.months}>
                {
                    Array.from({length:12},(x,i)=>i+1).reverse().map(i=>(
                        <li className={styles.month} key={i}>{i}</li>
                    ))
                }
            </ul>
        </div>
    </div>
  )
}
