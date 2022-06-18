import React from 'react'
import _404 from '../components/404'
export default function _404Page() {
  return (
    <_404/>
  )
}

export async function getStaticProps({locale}) {
    return {
      props: {
        messages:require(`../locales/${locale}.js`).data,
      },
    }
  }