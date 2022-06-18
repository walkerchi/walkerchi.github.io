import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import { Keyboard,Controller,EffectFade,Mousewheel,Pagination } from 'swiper'
import TreeMenu from './CSR/TreeMenu'
import Graph from './CSR/Graph'
import Blogs from './CSR/Blogs'
import CrumbMenu from './CSR/CrumbMenu'
import SearchBar from './CSR/SearchBar'
import { getLeaf } from './CSR/utils'
import styles from './styles.module.css'
import { useMediaQuery } from '@react-hookz/web'
export default function Content({data}) {
    let tree = data.tree
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)')
    const [visibleLeaf,setVisibleLeaf] = React.useState(getLeaf(tree))
    // let [focusID,setFocusID] = React.useState(null)
    const [focusID,setFocusID] = React.useState(tree.id)
    // setFocusID(tree.id)
   return (
    <div className={styles.container}>
        {isSmallDevice?null:<TreeMenu tree={tree} focusID={focusID} setFocusID={setFocusID}/>}
        <Graph tree={tree} setVisibleLeaf={setVisibleLeaf} imageProps={data.imageProps} focusID={focusID}/>
        {isSmallDevice?<CrumbMenu tree={tree} focusID={focusID} setFocusID={setFocusID}/>:null}
        <SearchBar tree={tree} setVisibleLeaf={setVisibleLeaf} focusID={focusID}/>  
        <Blogs visibleLeaf={visibleLeaf}/>
    </div>
  )
}
