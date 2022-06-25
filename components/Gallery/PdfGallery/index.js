import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide } from "swiper/react"
import {  Controller,Keyboard,Mousewheel,EffectCoverflow, Pagination,Navigation } from "swiper"
import FixedBackground from '../../Common/FixedBackground'
import styles from './styles.module.css'
export default function PdfGallery({data}) {
  const router = useRouter()
  let [currentShelf,setCurrentShelf] = React.useState(0)
  return (
    <div className={styles['pdf-gallery']}>
      <FixedBackground imageProps={data.imageProps}/>
      <div className={styles.shelfs}>
      {
        data.langs[router.locale].shelfs.map((shelf,i)=>(
          <div 
          className={`${styles.shelf} ${i===currentShelf?styles['shelf-selected']:''}`} 
          key={i} 
          onClick={()=>{setCurrentShelf(i)}}
          >
              {shelf.name}
          </div>
        ))
      }
      </div>
      <Swiper
       direction={"vertical"}
       modules={[ Controller ,Keyboard,Mousewheel,Pagination]}
       slidesPerView={1}
       spaceBetween={30}
       mousewheel={true}
       keyboard={{
        enabled: true,
      }}
       pagination={{
        clickable: true,
      }}
       className={styles.collections}
      >
        {
          data.langs[router.locale].shelfs[currentShelf].collections.map((collection,i)=>(
            <SwiperSlide 
            className={styles.collection}
            key={i}>
              <Swiper
              direction={"horizontal"}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              navigation={true}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
              }}
              keyboard={{
                enabled: true,
              }}
              pagination={true}
              modules={[Keyboard,EffectCoverflow, Pagination,Navigation]}
              className={styles.books}
              > 
                {
                  collection.books.map((book,j)=>(
                  <SwiperSlide className={styles.book} key={j}
                    onClick={()=>{
                      router.push({pathname:'/gallery/pdfs/viewer',query:{url:book.url}})
                    }}
                    > 
                    <div className={styles['book-cover']}>
                      <Image src={book.imageProps.src} blurDataURL={book.imageProps.blurDataURL} layout='fill' placeholder='blur' objectFit='cover' alt=""/>
                    </div>
                    <div className={styles['book-abstract']}>
                      <h1>{book.name}</h1>
                    </div>
                  </SwiperSlide>))
                }
              </Swiper>
              <div className={styles['collection-name']}>
                {collection.name}
              </div>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}
