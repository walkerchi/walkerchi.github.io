import React from 'react'
import Image from 'next/image'
import styles from './styles.module.css'

export default function Banner(props) {
    let {imageProps} = props
    let [init,setInit] = React.useState(false)
    let [hidden,setHidden] = React.useState(false)
    React.useEffect(()=>{
        setTimeout(()=>{
            setInit(true)
            setTimeout(()=>{
                setHidden(true)
            },2000)
        },500)
    },[])
  return (
    <div className={`${styles.banner} ${init?styles['open-state']:''}`}>
        <div className={styles.container}>
            <Image {...imageProps} layout='fill' placeholder='blur' alt="" objectFit='cover'/>
        </div>
        <svg className={styles["svg-center"]} style={{display:hidden?'none':'block'}} width="200" height="200">
            <path
            className={styles["path-center"]}
            d="M 100 100 m -100 0 a 100 100 0 1 0 200 0 a 100 100 0 1 0 -200 0"
            ></path>
        </svg>
        <svg className={styles["svg-borders"]} style={{display:hidden?'none':'block'}} width="10000" height="5000">
            <path
                className={styles["path-borders"]}
                d="M 5000 2500 m -174 0 a 174 174 0 1 0 348 0 a 174 174 0 1 0 -348 0"
            ></path>
            <path
                className={styles["path-borders"]}
                d="M 5000 2500 m -323 0 a 323 323 0 1 0 646 0 a 323 323 0 1 0 -646 0"
            ></path>
            <path
                className={styles["path-borders"]}
                d="M 5000 2500 m -472 0 a 472 472 0 1 0 944 0 a 472 472 0 1 0 -944 0"
            ></path>
            <path
                className={styles["path-borders"]}
                d="M 5000 2500 m -621 0 a 621 621 0 1 0 1242 0 a 621 621 0 1 0 -1242 0"
            ></path>
            <path
                className={styles["path-borders"]}
                d="M 5000 2500 m -770 0 a 770 770 0 1 0 1540 0 a 770 770 0 1 0 -1540 0"
            ></path>
        </svg>
    </div>
  )
}
