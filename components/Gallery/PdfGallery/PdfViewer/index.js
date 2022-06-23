import React from 'react'
import { Document, Outline, Page } from 'react-pdf';
import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard,Controller,EffectFade,Mousewheel,Pagination } from 'swiper'
import ProgressCircle from '../../../Common/ProgressCircle';
import FixedBackground from '../../../Common/FixedBackground'
import styles from './styles.module.css'





export default function PdfViewer({url,data}) {
    const [swiper, setSwiper] = React.useState(null)
    const [numPages, setNumPages] = React.useState(null)
    const [isTocOpen,setIsTocOpen] = React.useState(false)
    const [progress,setProgress] = React.useState(0.)
    const [loaded,setLoaded] = React.useState(false)
    const [W,setW] = React.useState(null)
    const [H,setH] = React.useState(null)
    


    function ScalePage(props){
      let [width,setWidth] = React.useState(null)
      let [height,setHeight] = React.useState(null)
      return(<Page
      {...props}
      width={width}
      height={height}
      onLoadSuccess={(e)=>{
        let w = e.width 
        let h = e.height 
        let scale = W/w>H/h?H/h:W/w 
        setWidth(scale*w)
        setHeight(scale*h)
      }}
      />)
    }

    return (
      <>
      <FixedBackground imageProps={data.imageProps}/>
      <ProgressCircle percent={progress} hidden={loaded}/>
      <Document file={url} 
        className={styles['pdf-render']}
        onLoadProgress={(e)=>{
          setProgress((e.loaded/e.total*100))
        }}
        onLoadSuccess={({numPages})=>{
          setNumPages(numPages)
          const $el = document.querySelector('.swiper')
          const W = $el.offsetWidth
          const H = $el.offsetHeight
          setW(W)
          setH(H)
          setLoaded(true)
        }}
      >
        <div className={`${styles['outline-wrapper']}  ${isTocOpen?'':styles['outline-wrapper-close']}` }>
          <Outline 
          className={styles.outline}
          onItemClick={(e)=>{
            swiper.slideTo(e.pageIndex,300)
            }} />
          <div className={styles.icon} onClick={()=>{setIsTocOpen(!isTocOpen)}}/>
        </div>
        <Swiper 
        className={styles.pages}
        // effect={"fade"}
        keyboard={{
          enabled: true,
        }}
        mousewheel={true}
        pagination={{
          type: "fraction",
        }}
        onSwiper={setSwiper}
        modules={[Keyboard,Controller,
          // EffectFade,
          Mousewheel,Pagination]}
        >
          {
            numPages
            ?Array.from(new Array(numPages),(el,i)=>(
              <SwiperSlide key={i} className={styles['page-wrapper']}>
                <ScalePage 
                pageNumber = {i+1}
                className  = {styles.page}
                />
              </SwiperSlide>
            ))
            :<Page pageNumber={1} />
          }
        </Swiper>
          {/* <ScalePage 
            pageNumber = {i+1}
            className  = {styles.page}
            /> */}
      </Document>
      </>
  )
}
