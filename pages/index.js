import React from 'react'

import Banner from '../components/Banner'
import Router from '../components/Router'
import styles from './styles.module.css'
import { getPlaiceholder } from "plaiceholder";
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import {data as bannerConfig} from '../components/Banner/data'
import {data as routerConfig} from '../components/Router/data'



export default function HomePage({imageProps,routerImageProps}) {
  const parallax = React.useRef(null)
  return (
    <div className={styles.home}>
        <Parallax ref={parallax} pages={2} >
          <ParallaxLayer offset={0} speed={-0.5}>
            <Banner imageProps={imageProps}/>
          </ParallaxLayer>
          <ParallaxLayer offset={1} speed={0}>
            {/* <div style={{height:'100vh',width:'100vw',backgroundColor:'blue'}}>
            </div> */}
            <Router routerImageProps={routerImageProps}></Router>
          </ParallaxLayer>
        </Parallax>
    </div>
  )
}





export async function getStaticProps({locale}) {

  const fs = require('fs')
  const path = require('path')

  const { base64:landingBase64, img:landingImg } = await getPlaiceholder(bannerConfig.image);
  let routerImageProps = []
  for(let route of routerConfig){
    let {base64,img} = await getPlaiceholder(route.image);
    routerImageProps.push({
      ...img,
      blurDataURL:base64
    })
  }
  return {
    props: {
      // files,
      imageProps: {
        ...landingImg,
        blurDataURL: landingBase64
      },
      routerImageProps,
      messages:require(`../locales/${locale}.js`).data,
    },
  }
}

