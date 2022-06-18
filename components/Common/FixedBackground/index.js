import React from 'react'
import Image from 'next/image'
import styles from './styles.module.css'




export default function MouseMoveBackground({imageProps,scale,anim}){
    scale = scale || -0.02
    anim  = anim===undefined?false:anim
    const [x,setX] = React.useState(null)
    const [y,setY] = React.useState(null)
    const [H,setH] = React.useState(null)
    const [W,setW] = React.useState(null)
    const [init,setInit] = React.useState(false)
    React.useEffect(()=>{
        
        setInit(true)
        setH(window.innerHeight/2)
        setW(window.innerHeight/2)
        window.onmousemove=(e)=>{
            setX((e.clientX-W)*scale)
            setY((e.clientY-H)*scale)
        }
    },[scale,H,W])
    return (
        <div className={`${styles.container} ${init?'':styles['before-init']}`}>
            <div className={styles.background}
            style={{transform:`scale(${1+Math.abs(scale)*2}) translate(${x}px,${y}px)`}}>
                <Image {...imageProps} placeholder='blur' layout='fill' objectFit='cover' alt=''/>
            </div>
        </div>
    )
}
