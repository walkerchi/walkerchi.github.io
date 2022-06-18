import React from 'react'
import {useRouter} from 'next/router'
import { prepareDataForPdfViewer } from '../../../components/Gallery/PdfGallery/PdfViewer/SSG'
import PdfViewer from '../../../components/Gallery/PdfGallery/PdfViewer'
export default function PdfViewerPage({data}) {
    const router = useRouter()
    // let [init,setInit] = React.useState(false)
    // React.useEffect(()=>{
    //   setInit(true)
    // },[])
    
  return (
    <>
      {
        router.query.url!==undefined
        ?<PdfViewer {...router.query} data={data}/>
        :null
      }
    </>
  )
}

export async function getStaticProps({locale}) {
    return {
      props:{
        data:await prepareDataForPdfViewer(),
        messages:require(`../../../locales/${locale}.js`).data,
      }
    }
  }
