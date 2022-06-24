import React from 'react'
import { Document, Outline, Page } from 'react-pdf';
import { CSSTransition,SwitchTransition } from 'react-transition-group';
import { useHotkeys } from 'react-hotkeys-hook'
import { useSwipeable } from 'react-swipeable';
import ProgressCircle from '../../../Common/ProgressCircle';
import FixedBackground from '../../../Common/FixedBackground'
import styles from './styles.module.css'
import next from 'next';





export default function PdfViewer({url,data}) {
    // let [numPages, setNumPages] = React.useState(null)
    const [isTocOpen,setIsTocOpen] = React.useState(false)
    const [progress,setProgress] = React.useState(0.)
    const [loaded,setLoaded] = React.useState(false)
    const [pageInd,setPageInd] = React.useState(0)
    const [W,setW] = React.useState(null)
    const [H,setH] = React.useState(null)
    const [renderedPageInd, setRenderedPageInd] = React.useState(null)

    const isLoading = renderedPageInd !== pageInd;

    let numPages = React.useRef(null)
    
    function lastPage(){
      console.log('last page')
      numPages&&setPageInd(pageInd=>(pageInd-1+numPages.current)%numPages.current)
      console.log(pageInd+' '+numPages.current)
    }
    function nextPage(){
      console.log('next page')
      numPages&&setPageInd(pageInd=>(pageInd+1)%numPages.current)
      console.log(pageInd+' '+numPages.current)
    }

    useHotkeys('left,top', lastPage)
    useHotkeys('right,down', nextPage)
    const handlers = useSwipeable({
      onSwipedLeft:lastPage,
      onSwipedRight:nextPage
    })


    function ScalePage(props){
      // let [width,setWidth] = React.useState(null)
      // let [height,setHeight] = React.useState(null)
      let width = React.useRef(null)
      let height =  React.useRef(null)
      return(<Page
      {...props}
      width={width}
      height={height}
      onLoadSuccess={(e)=>{
        console.log(e)
        let w = e.width 
        let h = e.height 
        let scale = W/w>H/h?H/h:W/w 
        // setWidth(scale*w)
        // setHeight(scale*h)
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
        onLoadSuccess={({numPages:_numPages,...others})=>{
          console.log(others)
          // setNumPages(()=>_numPages)
          numPages.current =  _numPages
          // console.log(_numPages)
          // console.log(numPages)
          const $el = document.querySelector('.'+styles.pages)
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
            console.log(e)
            setPageInd(e.pageIndex)
            }} />
          <div className={styles.icon} onClick={()=>{setIsTocOpen(!isTocOpen)}}/>
        </div>
        <div className={styles.pages} {...handlers}>
        {/* <SwitchTransition mode="out-in">
            <CSSTransition classNames={styles['page-wrapper']}
                timeout={500}
                key={pageInd}>
                {
                    <Page 
                    pageNumber = {pageInd+1}
                    className  = {styles.page}
                    />
                }
            </CSSTransition>
          </SwitchTransition> */}
           {isLoading && renderedPageInd ? (
              <Page 
                key={renderedPageInd}
                className={`${styles['prev-page']} ${styles.page}`} 
                pageNumber={renderedPageInd+1} 
              />
            ) : null}
            <Page
              key={pageInd}
              pageNumber={pageInd+1}
              onRenderSuccess={() => setRenderedPageInd(pageInd)}
            />
          <div className={styles.bottom}>
            <div className={styles.prev} onClick={lastPage}></div>
            <div className={styles.fraction}>{pageInd+1}/{numPages.current}</div>
            <div className={styles.next} onClick={nextPage}></div>
          </div>
        </div>
      </Document>
      </>
  )
}
