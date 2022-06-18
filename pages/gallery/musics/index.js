import React from 'react'
import prepareDataForMusicGallery from '../../../components/Gallery/MuiscGallery/SSG'
import MusicGallery from '../../../components/Gallery/MuiscGallery'
export default function MusicGalleryPage({data}) {
  return (
    <MusicGallery data={data}/>
  )
}

export async function getStaticProps({locale}) {
    return {
      props:{
        data:await prepareDataForMusicGallery(),
        messages:require(`../../../locales/${locale}.js`).data,
      }
    }
  }
