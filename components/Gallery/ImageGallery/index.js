import React from 'react'
import Image from 'next/image'
import { Masonry } from "masonic";
import styles from './styles.module.css'



export default function ImageGallery({data}) {
    const [items,setItems] = React.useState(data)
    let [isMobile,setIsMobile] = React.useState(false)
    let [selected,setSelected] = React.useState(null)
    
    React.useEffect(()=>{
        setIsMobile(document.documentElement.clientWidth<=768)
        window.addEventListener('resize', ()=>{
            setIsMobile(document.documentElement.clientWidth<=768)
        })
    },[])

    function Card({ data: {src,blurDataURL,width,height } }){
        return (
        <div className={styles.card} onClick={()=>{
            setSelected({src:src,blurDataURL:blurDataURL,width:width,height:height})
        }}>
          <Image src={src} blurDataURL={blurDataURL} width={width} height={height} placeholder='blur' alt=""/>
        </div>)
    }

    

  return (
    <div className={styles['image-gallery']}>
        <div className={`${styles.zoom} ${selected?styles['zoom-show']:styles['zoom-hide']}`} onClick={()=>{setSelected(null)}}>
            {(()=>{
                
                if(selected){
                    let windowRatio = document.documentElement.clientWidth/document.documentElement.clientHeight
                    let appendStyles = {}
                    let ratio = selected.width/selected.height
                    if(ratio > windowRatio){
                        let width = document.documentElement.clientWidth
                        appendStyles = {width,height:width/ratio}
                    }else{
                        let height = document.documentElement.clientHeight
                        appendStyles = {height,width:height*ratio}
                    }
                    return (
                    <div style={appendStyles}>
                        <Image src={selected.src} blurDataURL={selected.blurDataURL} layout='fill' placeholder='blur' object-fit='cover' alt=""/>
                    </div>)
                }
                else
                    return null
            })()}
        </div>
         <Masonry
          // Provides the data for our grid items
          items={items}
          // Adds 8px of space between the grid cells
          columnGutter={isMobile?10:16}
          // Sets the minimum column width to 172px
          columnWidth={isMobile?150:400}
          // Pre-renders 5 windows worth of content
          overscanBy={5}
          // This is the grid item component
          render={Card}
        />
    </div>
  )
}
