import React from 'react'
import { useRouter } from 'next/router'
import styles from './styles.module.css'
import Link from 'next/link'
import {data} from './data'
import { useTranslations } from 'next-intl';
import useScrollPosition from '@react-hook/window-scroll'
export default function Navbar() {
    let [status,setStatus] = React.useState(false)
    
    const t = useTranslations('index')
    const router = useRouter()
    const scrollY = useScrollPosition(16)
    // let [hasScroll,setHasScroll] = React.useState(false)
    // React.useEffect(()=>{
    //     function handleScroll(e){
    //         let scrollTop  = document.documentElement.scrollTop      
    //         if(scrollTop > 50){
    //             setHasScroll(true)
    //         }else{
    //             setHasScroll(false)
    //         }
    //     }
    //     window.addEventListener('scroll', handleScroll);
    // },[])
  return (
    <header className={`__navbar ${styles.navbar} ${scrollY>50?styles.affix:''} ${status?styles.background:''}`}>
        <div className={styles.container}>
            <Link href='/'><a className={styles.logo}>
                {/* {data.logo} */}
                </a></Link>
            <div className={`${styles.menu} ${status?styles.show:''}`}>
                <ul className={styles.links}>
                    {
                        data.menu.map((item,i)=>(
                            <li key={i}>
                                <Link href={item.to}>
                                    <a>{t(item.name)}</a>
                                </Link>
                            </li>
                        ))
                    }
                    {
                        <li>
                            <a onClick={()=>{
                                router.push(router.pathname,router.pathname,
                                    {locale:router.locales[(router.locales.indexOf(router.locale)+1)%router.locales.length]})
                            }}>
                                {
                                    router.locale==='cn'
                                    ?"EN"
                                    :"中文"
                                }
                            </a>
                        </li>
                    }
                </ul>
            </div>
            <span className={`${styles.trigger} ${status?styles.active:''}`}
                onClick={()=>{
                    setStatus(!status)
                }}
                >
                <i></i>
                <i></i>
                <i></i>
            </span>
        </div>
    </header>
  )
}
