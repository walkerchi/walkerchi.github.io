import React from 'react'
import WQrcode from '../../components/Function/WQrcode'
export default function WHumanDetectionPage() {
  return (<WQrcode/>)
}

export async function getStaticProps({locale}) {
  return {
    props:{
      messages:require(`../../locales/${locale}.js`).data,
    }
  }
}