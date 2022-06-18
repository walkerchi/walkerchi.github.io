import React from 'react'
import prepareDataForPdfGallery from '../../../components/Gallery/PdfGallery/SSG'
import PdfGallery from '../../../components/Gallery/PdfGallery'
export default function PdfGalleryPage({data}) {
  return (
    <PdfGallery data={data}/>
  )
}

export async function getStaticProps({locale}) {
    return {
      props:{
        data:await prepareDataForPdfGallery(),
        messages:require(`../../../locales/${locale}.js`).data,
      }
    }
  }
