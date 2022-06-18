import React from 'react'
import C500 from '../components/500'
export default function _500Page() {
  return (
    <C500/>
  )
}

export async function getStaticProps({locale}) {
    return {
      props: {
        messages:require(`../locales/${locale}.js`).data,
      },
    }
  }