import React from 'react'
import './navbar.css'
import { Link } from 'gatsby'

/*
Navbar
    height:40px;
*/
export default function Navbar() {
    return (
        <div className='navbar-container'>
            <div className='navbar-head'>
                <div className='navbar-head-logo'>
                </div>
                <div className='navbar-head-text'>
                    <Link to='/'>walkerchi</Link>
                </div>
            </div>
            <div className='navbar-router'>
                <Link to='/blog'>blog</Link>
                <Link to='/'>project</Link>
                <Link to='/function'>function</Link>
                <Link to='/'>gallery</Link>
            </div>
        </div>
    )
}

