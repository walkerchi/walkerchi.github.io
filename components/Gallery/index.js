import React from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import styles from './styles.module.css'
import { useTranslations } from 'next-intl';
import FixedBackground from '../Common/FixedBackground'

export default function Gallery({data}) {
    const t = useTranslations('gallery')
    const router = useRouter()
  return (
    <div className={styles.gallery}>
        <FixedBackground imageProps={data.imageProps}/>
        <div className={styles.sections}>
            <section className={styles.images} onClick={()=>{router.push('/gallery/images')}}>
                <div className={styles.text}>{t(data.images)}</div>
            </section>
            <section className={styles.pdfs} onClick={()=>{router.push('/gallery/pdfs')}}>
                <div className={styles.text}>{t(data.pdfs)}</div>
            </section>
            <section className={styles.musics} onClick={()=>{router.push('/gallery/musics')}}>
                <div className={styles.text}>{t(data.musics)}</div>
            </section>
            <section className={styles.others} onClick={()=>{router.push('/gallery/others')}}>
                <div className={styles.text}>{t(data.others)}</div>
            </section>
        </div>
    </div>
  )
}
