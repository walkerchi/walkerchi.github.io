import React from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react"
import {  Grid,Keyboard,Mousewheel, Pagination } from "swiper"
import { useMediaQuery } from '@react-hookz/web'
import styles from './styles.module.css'
export default function Blogs({visibleLeaf}) {
  const router = useRouter()
  const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
  return (
    <div className={styles.blogs}>
      <Swiper
      className={styles.cards}
      slidesPerView={2}
      grid={{
        rows: isSmallDevice?1:2,
      }}
      pagination={{
        type: "fraction",
      }}
      keyboard={{
        enabled: true,
      }}
      mousewheel={true}
      // spaceBetween={30}
      slidesPerGroupSkip={0}
      direction={"vertical"}
      modules={[Pagination, Keyboard,Grid,Mousewheel]}
      >
        {
          visibleLeaf.map((node,i)=>(
            <SwiperSlide className={styles.card} key={i}  onClick={()=>{router.push(node.url)}}>
              <div className={styles['card-container']}>
                <div className={styles.background}>
                  <Image {...node.imageProps} placeholder='blur' layout='fill' alt='' objectFit='cover'/>
                </div>
                <div className={styles.text}>
                  <div className={styles.title}>
                    <div
                    dangerouslySetInnerHTML={{__html:node._highlightResult?.title?.value||node.title}}
                    />
                  </div>
                  <div className={styles.description}>
                    <div
                     dangerouslySetInnerHTML={{__html:node._highlightResult?.description?.value||node.description}}
                    />
                  </div>
                  
                </div>
                <div className={styles.date} 
                dangerouslySetInnerHTML={{__html:node._highlightResult?.date?.value||node.date}}
                />
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
