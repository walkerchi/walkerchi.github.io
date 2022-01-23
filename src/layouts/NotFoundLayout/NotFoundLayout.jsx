import React from 'react';
import './notFoundLayout.css'
import Navbar from '../../components/Navbar/Navbar';

export default function NotFoundLayout() {
  return (<div className='notfoundlayout-container'>
    <Navbar/>
    <h1>404</h1>
    <h2>Page not Found :(</h2>
  </div>);
}
