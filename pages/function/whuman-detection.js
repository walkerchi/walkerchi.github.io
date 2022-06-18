import React from 'react'
import WHumanDetection from '../../components/Function/WHumanDetection'
export default function WHumanDetectionPage() {
  return (<WHumanDetection/>)
}

export async function getStaticProps({locale}) {
  return {
    props:{
      messages:require(`../../locales/${locale}.js`).data,
    }
  }
}