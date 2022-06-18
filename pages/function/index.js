import React from 'react'
import prepareDataForFunction from '../../components/Function/SSG'
import Function from '../../components/Function'

export default function FunctionPage({data}) {
  return (<Function data={data}/>)
}

export async function getStaticProps({locale}) {
  return {
    props:{
      data:await prepareDataForFunction(),
      messages:require(`../../locales/${locale}.js`).data,
    }
  }
}