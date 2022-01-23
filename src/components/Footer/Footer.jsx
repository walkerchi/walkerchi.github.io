import React from 'react'
import copy from 'copy-to-clipboard'
import email from '../../images/icons/email.white.svg'
import github from '../../images/icons/github.white.svg'
import zhihu from '../../images/icons/zhihu.white.svg'
import './footer.css'
export default function Footer() {
    function emailClickHandler(){
        copy("walkerchi@foxmail.com")
        alert("复制成功")
    }
    return (
        <div className='footer-container'>
            <div className='footer-router'>
                <li>
                    <img src={email} onClick={emailClickHandler}/>
                </li>
                <li>
                    <a href="https://www.github.com">
                    <img src={github}></img>
                    </a>
                </li>
                <li>
                    <a href="/">
                    <img src={zhihu}></img>
                    </a>
                </li>
            </div>
            <div className='footer-text'>
                copyright © walkerchi
            </div>
        </div>
    )
}
