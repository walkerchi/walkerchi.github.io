import React from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Tilt from 'react-parallax-tilt';
import styles from './styles.module.css'
import {data} from './data'
import { useTranslations } from 'next-intl';
export default function Router(props) {
    let {routerImageProps} = props
    const router = useRouter()
    let t = useTranslations('index')
  return (
    <div className={styles.router}>
        {
            data.map((item,i)=>(
                <Link href={item.to} key={i}>
                    <a className={styles.item}>
                        <Tilt className={styles.tilt} tiltReverse>
                            <Image className={styles.image} {...routerImageProps[i]} layout='fill' placeholder='blur' alt="" objectFit='cover'/>
                            <div className={styles.content}>
                                <h1 className={styles.title}>
                                    {t(item.name)}
                                </h1>
                                <div className={styles.bar}></div>
                                <p className={styles.description}>
                                    {t(item.description)}
                                </p>
                            </div>
                        </Tilt>
                    </a>
                </Link>
            ))
        }
    </div>
  )
}
