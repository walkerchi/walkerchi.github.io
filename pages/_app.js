import '../styles/globals.css'
import '../styles/markdown.css'
import '../styles/pdf.css'
import 'react-vertical-timeline-component/style.min.css';
import 'highlight.js/styles/github-dark-dimmed.css'
import 'react-h5-audio-player/lib/styles.css';
import 'swiper/css';
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/grid"
// import "swiper/css/effect-cards"
import "swiper/css/effect-fade"
import 'rc-scroll-anim/assets/index.css';
import 'nprogress/nprogress.css'
import Head from 'next/head'
import Router from 'next/router'
import { DefaultSeo  } from 'next-seo';
import NProgress from 'nprogress'
import Navbar from '../components/Navbar'
// import SEO from '../next-seo.config'
import {SwitchTransition,CSSTransition} from 'react-transition-group'
import {NextIntlProvider} from 'next-intl';
import { pdfjs } from 'react-pdf';
import React from 'react';
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

Router.onRouteChangeStart=()=>NProgress.start()
Router.onRouteChangeComplete=()=>NProgress.done()
Router.onRouteChangeError=()=>NProgress.done()


function MyApp({ Component, pageProps,router }) {
  let [isFocus,setIsFocus] = React.useState(true)
  React.useEffect(()=>{
    document.onfocus=()=>{setIsFocus(true)}
    document.onblur=()=>{setIsFocus(false)}
  },[])
  return(
    <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: "100vh",
      width: "100vw",
  }}
    >
      <Head>
        <link rel="logo icon" href="/walkerchi_simple.svg" />
      </Head>
      <NextIntlProvider messages={pageProps.messages}>
      <DefaultSeo 
        title={isFocus?"🚀Walkerchiᕕ( ᐛ )ᕗ ":"🌙(￣o￣) . z Z"}
        description={"Walker Chi Home Page"}
      />
      <Navbar/>
      {/* <LazyMotion features={domAnimation}>
        <AnimatePresence exitBeforeEnter >
          <m.div
            key={router.route.concat('Slide right')}
            style={{
              display: "flex",
              position: "absolute",
              height: "100%",
              width: "100vw"
            }}
            initial={{
              opacity: 0,
                left: "-100%",
                scale: 0.6
            }}
            animate={{
              opacity: 1,
              left: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              left: "100%",
              scale: 0.6
            }}
            transition={{
                duration: 0.7
            }}
          >
            
              <Component {...pageProps} />
            
          </m.div>
        </AnimatePresence>
      </LazyMotion> */}
       <SwitchTransition mode='out-in'>
        <CSSTransition key={router.pathname} classNames="page" timeout={300}>
          <Component {...pageProps} />
        </CSSTransition>
      </SwitchTransition>
      </NextIntlProvider>
  </div>
  )
}

export default MyApp
