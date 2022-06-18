import React from 'react'
import Gallery from '../../components/Gallery'
import prepareDataForGallery from '../../components/Gallery/SSG'
export default function GalleryPage({data}) {
  return (
    <Gallery data={data}/>
  )
}

export async function getStaticProps({locale}) {
  return {
    props:{
      data:await prepareDataForGallery(),
      messages:require(`../../locales/${locale}.js`).data,
    }
  }
}