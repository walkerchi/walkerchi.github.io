import React from 'react'
import { useTranslations } from 'next-intl'
import Image from  'next/image'
import styles from './styles.module.css'
import data from './data'
export default function Footer() {
    const t = useTranslations('index')


    
  return (
    <footer className={styles.footer}>
        <div className={styles.qrcode}>
            <div onClick={(e)=>{
                console.log(e.target)
                 let a = document.createElement("a")
                 a.download = 'qrcode'
                 a.href = qrCanvas.current.toDataURL("image/png")
                 document.body.appendChild(a)
                 a.click()
                 a.remove()
            }}>
                <Image src={data.qrcode} layout='fill' alt=''></Image>
            </div>
        </div>
        <div className={styles.icons}>
            {
                data.icons.map((item,i)=>(
                <div className={styles.icon} key={i}>
                    <div style={{maskImage:'url('+item.icon+')'}} onClick={()=>{item.onClick&&item.onClick(t)}}/>
                    <div >{item.name}</div>
                </div>))
            }
        </div>
    </footer>
  )
}
