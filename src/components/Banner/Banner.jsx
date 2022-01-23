import React from 'react'
import './banner.css'

export default function Banner({children,img}) {
    return (
        <div className='banner-container'
            style={{
                backgroundImage:`url(${img})`
            }}
            >
            <div className='banner-glass'>
            {children}
            </div>
        </div>
    )
}
