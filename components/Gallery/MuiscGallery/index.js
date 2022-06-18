import React from 'react'
import Image from 'next/image'
import AudioPlayer from 'react-h5-audio-player';
import { Swiper, SwiperSlide } from "swiper/react"
import { useTranslations } from 'next-intl';
import styles from './styles.module.css'





export default function MusicGallery({data}) {
  const t = useTranslations('gallery.musics')
  let [selected,setSelected] = React.useState(null)
  let [selectedAlbum,setSelectedAlbum] = React.useState(Object.keys(data.albums)[0])
  let [isMobile,setIsMobile] = React.useState(false)
  React.useEffect(()=>{

    setIsMobile(document.documentElement.clientWidth<=768)
    setSelected(0)
    window.addEventListener('resize', ()=>{
      setIsMobile(document.documentElement.clientWidth<=768)
      // setSelected(selected)
    })

  },[])


  function _renderController(){
    return (
      <div className={styles.controller}>
      <div className={styles['controller-background']}>
        <Image src={data.albums[selectedAlbum][selected]?.imageProps?.blurDataURL||data.imageProps.blurDataURL} layout='fill' alt="" objectFit='cover' />
      </div>
      <div className={styles['controller-banner']}>
        <Image {...data.albums[selectedAlbum][selected]?.imageProps||data.imageProps} layout='fill' placeholder='blur' alt="" objectFit='cover' />
      </div>
      <div className={styles['controller-text']}> 
        <h1>{data.albums[selectedAlbum][selected]?.name}</h1>
      </div>
      <AudioPlayer
      className={styles['controller-player']}
      autoPlay={false}
      src={data.albums[selectedAlbum][selected]?.url}
      showSkipControls={true} 
      showJumpControls={false} 
      onClickPrevious={()=>{setSelected(selected =>(selected-1+data.albums[selectedAlbum].length)%data.albums[selectedAlbum].length)}}
      onClickNext={()=>{setSelected(selected=>(selected+1)%data.albums[selectedAlbum].length)}}
      onEnded={()=>{setSelected(selected=>(selected+1)%data.albums[selectedAlbum].length)}}
      />
    </div>
    )
  }
  function _renderSongs(){
    return (
      <div className={styles['songs-wrapper']}>
        <div className={styles.songs}>
        {
          data.albums[selectedAlbum].map((item,i)=>(
          <div className={`${styles.song} ${selected===i?styles['song-selected']:''}`} key={i}>
            <div className={styles.icon} onClick={()=>{setSelected(i)}}/>
            <h1>{item.name}</h1>
          </div>))
        }
        </div>
        <div className={styles.albums}>
        {
          Object.keys(data.albums).map((album,i)=>(
          <div className={`${styles.album} ${album===selectedAlbum?styles['album-selected']:''}`} key={i} onClick={()=>{setSelectedAlbum(album)}}>
              {t(album)}
          </div>))
        }
        </div>
      </div>
    )
  }
  function renderController(){
    if(isMobile)
      return (
        <SwiperSlide className={styles['controller-xs']}>
        {_renderController()}
        </SwiperSlide>
      )
    else
      return _renderController()
  }
  function renderSongs(){
    if(isMobile)
      return (
        <SwiperSlide className={styles['songs-xs']}>
          {_renderSongs()}
        </SwiperSlide>
      )
    else
      return _renderSongs()
  }
  function renderContent(){
    if(isMobile)
      return (
        <Swiper className={styles.container}>
          {renderController()}
          {renderSongs()}
        </Swiper>
      )
    else
      return (
        <div className={styles.container}>
          {renderController()}
          {renderSongs()}
        </div>
      )
  }

  return (
    <div className={styles['music-gallery']}>
          <div className={styles.background}>
            <Image {...data.albums[selectedAlbum][selected]?.imageProps||data.imageProps} layout='fill' placeholder='blur' alt="" objectFit='cover' />
          </div>
      {renderContent()}
    </div>
  )
}
