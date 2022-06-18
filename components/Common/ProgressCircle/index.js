import React from 'react'
import {Circle} from 'rc-progress';
import styles from './styles.module.css'

export default function ProgressCircle({percent,hidden}) {
    let [isShow,setIsShow] = React.useState(true)
    React.useEffect(()=>{
        setTimeout(()=>{
            setIsShow(!hidden)
        },2000)
    },[hidden])
  return (
    <div className={`${styles.progress} ${hidden?styles.hidden:''}`} style={{display:isShow?'flex':'none'}}>
        <div className={styles.circle}>
            <Circle 
            percent={percent}
            strokeColor={{
            '100%': '#732BF5',
            '50%':'#EA3FF7',
            '0%': '#9FFCFD',
            }}
            strokeWidth={6}
            strokeLinecap="round"
            />
        </div>
        <div className={styles.text}>
            <div className={styles.integer}>{Number.parseInt(percent)}</div>
            <div className={styles.dot}>.</div>
            <div className={styles.decimal}>{Number.parseInt((percent-Number.parseInt(percent))*100)}</div>
            <div className={styles.percent}>%</div>
        </div>
    </div>
  )
}
