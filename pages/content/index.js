import React from 'react'
import Content from '../../components/Content'
import prepareDataForContent from '../../components/Content/SSG/prepareDataForContent'
import getHistory from '../../components/Content/SSG/getHistory'


export default function ContentPage({data}) {
  return <Content data={data}/>
}

export async function getStaticProps({locale}) {
    await getHistory()
    return {
      props:{
        data:await prepareDataForContent(locale),
        messages:require(`../../locales/${locale}.js`).data,
      }
    }
  }