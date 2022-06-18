import React from 'react'
import Image from 'next/image'
import { Parallax } from 'rc-scroll-anim';
import styles from './styles.module.css'
function getPosition(year,time){
    return (year-time.getFullYear())*100 + (12-time.getMonth()-1) * 100 / 12 
}
function dateToString(date){
    if(date === undefined){
        return "Now"
    }else{
        return `${date.getFullYear()}-${date.getMonth()}`
    }
}

export default function Event({endYear,startTime,endTime,title,description,imageProps}) {
    let [hover,setHover] = React.useState(false)
    startTime = new Date(startTime)
    let bottom = getPosition(endYear,startTime)
    let top;
    if(endTime === undefined){
        top = 0
        endTime = new Date(`${endYear}-${12}`)
    }else{
        endTime = new Date(endTime)
        top = getPosition(endYear,endTime)
    }
    let numMonths = ((endTime.getMonth()-startTime.getMonth()) + (endTime.getFullYear()-startTime.getFullYear()) * 12) 
    let width = 300/numMonths + 200 
    let alpha = Math.log10(numMonths+5)-0.65
    alpha = alpha>1?1:alpha<0?0:alpha
    let hue = Number.parseInt(alpha*255)
    
    return (
    <Parallax
        style = {{
            width:`${width}px`,
            top:`${top}vh`,
            height:`${bottom-top}vh`,
            borderColor:`hsla(${hue},75%,75%,${hover?1:alpha})`,
            transform:'translateX(200px)',
            opacity:0

        }}
        className={styles.event}
        animation={{x:0, opacity:1,playScale:[0,0.5]}}
        onMouseEnter={()=>{
            setHover(true)
        }}
        onMouseLeave={()=>{
            setHover(false)
        }}
    >
        <div className={styles.image}>
            <Image {...imageProps} objectFit='contain' layout='fill' placeholder='blur'></Image>
        </div>
        <div className={styles.content}>
            <div className={styles.title}>
                {title}
            </div>
            <div className={styles.time}>
                {dateToString(startTime)}
                <div></div>
                {dateToString(endTime)}
            </div>
            <div className={styles.description}>
                {description}
            </div>
        </div>
       
    </Parallax>
  )
}
