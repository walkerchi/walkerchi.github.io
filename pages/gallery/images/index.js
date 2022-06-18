import React from 'react'
import prepareDataForImageGallery from '../../../components/Gallery/ImageGallery/SSG'
import ImageGallery from '../../../components/Gallery/ImageGallery'
export default function ImageGalleryPage({data}) {
  return (
    <ImageGallery data={data}/>
  )
}

export async function getStaticProps({locale}) {
    return {
      props:{
        data:await prepareDataForImageGallery(),
        messages:require(`../../../locales/${locale}.js`).data,
      }
    }
  }
