import React from 'react'
import Head from 'next/head'
import Script from 'next/script'
import WPython from '../../components/Function/WPython/index'

export default function WPythonPage() {
  const [onLoad,setOnLoad]=React.useState(false)
  return (<>
  {/* <Head> */}
      <Script 
      strategy='afterInteractive'
      src=
      {'https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js'} 
      onLoad={(e)=>{setOnLoad(true)}}
      />
    {/* </Head> */}
  <WPython onLoad={onLoad}/>
  </>)
}

export async function getStaticProps({locale}) {
  return {
    props:{
      messages:require(`../../locales/${locale}.js`).data,
    }
  }
}