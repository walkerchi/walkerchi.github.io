import React from 'react'
import Image from 'next/image'
import ReactLoading from "react-loading"
import data from './data'
import styles from './styles.module.css'
export default function WHumanDetection() {
  const [selected,setSelected] = React.useState(0)
  const [isHidden,setIsHidden] = React.useState(false)
  const [isLoading,setIsLoading] = React.useState(true)
  React.useEffect(()=>{
    setIsLoading(true)
  },[selected])
  return (
    <div className={styles['whuman-detection']}>
      {isLoading?<ReactLoading className={styles.loading} type={data.loading.type} color={data.loading.color}/>:null}
      <div className={`${styles.menu} ${isHidden?styles.hidden:''}`}>
        {
          data.detections.map((item,i)=>(
          <div  key={i} className={`${styles.choice} ${selected===i?styles.selected:''}`}
          onClick={()=>{setSelected(i)}}
          >
            <div className={styles.icon}>
              <Image src={item.icon} layout='fill' objectFit='contain'/>
            </div>
          </div>))
        }
        <div className={styles.controller} onClick={()=>{setIsHidden(isHidden=>!isHidden)}}></div>
      </div>
      {
        (()=>{
          let item = data.detections[selected]
          return (
            <div className={styles['item-wrapper']}>
            <item.component onLoad={()=>{setIsLoading(false)}}/>
          </div>
          )
        })()
      }
    </div>
  )
}
