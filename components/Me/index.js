import React from 'react'
import Image from 'next/image'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import styles from './styles.module.css'
import {data,LIGHT_PALETTE,DARK_PALETTE} from './data'
import { Parallax } from 'rc-scroll-anim';
import { useTranslations } from 'next-intl';
// import imageSrc from '/image/first_frame.jpg'

export default function Me({timelineImageProps}) {
    const t=useTranslations('me')
    let [isLoaded,setIsLoaded] = React.useState(false)
    // console.log(imageSrc)
  return (
    <div className={styles.me}>
        <video className={styles.video} autoPlay loop playsInline muted poster='/image/first_frame.jpg' onLoad={()=>{setIsLoaded(true)}}>
            <source src={require('../../public/video/spaceship.mp4')} type="video/mp4"/>
        </video>
        {
            isLoaded?null:<Image src={'../../public/image/first_frame.jpg'} placeholder='blur' objectFit='cover' className={styles.placeholder} alt=""/>
        }
        <Parallax
        className={styles.title}
        animation={{ blur: '5px' ,playScale: [0.6,1]}}
        >
            {t(data.title)}
        </Parallax>
        <VerticalTimeline>
            {
                data.timeline.map((item,i)=>{
                    let palette = {
                        light:LIGHT_PALETTE,
                        dark:DARK_PALETTE
                    }[item.palette]
                    
                    let fontColor = palette.font||data.palette.item.font
                    let bgColor   = palette.bg||data.palette.item.bg
                    return(
                <VerticalTimelineElement
                    key={i}
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: bgColor, color: fontColor }}
                    contentArrowStyle={{ borderRight: `7px solid  ${bgColor}` ,color:'#fdfdfd'}}
                    date={`${item.startTime} - ${item.endTime||t(data.present)}`}
                    dateClassName={styles[`item-date-${item.palette}`]}
                    iconStyle={{ background: data.palette.icon.bg.get(item.icon), color: data.palette.icon.font }}
                    icon={<div style={{backgroundImage:`url(${item.icon})`}} className={styles['item-icon']}/>}
                >
                    <div className={styles['item-images']}>
                        <Image {...timelineImageProps[i]} placeholder='blur' alt=''/>
                    </div>
                    <h3 className="vertical-timeline-element-title"  style={{color:fontColor}}>
                        {t(item.title)}    
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle" style={{color:fontColor}}>
                        {t(item.subtitle)}
                    </h4>
                    <p>
                        {t(item.content)}                            
                    </p>
                </VerticalTimelineElement>
                )})
            }
        </VerticalTimeline>
    </div>
  )
}


