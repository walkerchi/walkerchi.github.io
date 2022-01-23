import React from 'react';
import './functionLayout.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import { useStaticQuery,graphql,Link } from 'gatsby'
import Img from 'gatsby-image'
export default function FunctionLayout() {
    const data = useStaticQuery(graphql`
    query functionLayout {
        mainImg:file(relativePath: {eq: "4.jpg"}) {
            childImageSharp {
                fluid{
                ...GatsbyImageSharpFluid
                }
            }
        }
    }
    `)
    return <div className='functionlayout-container'>
        <Navbar/>
        <div className='functionlayout-banner'>
            <Img
                className='functionlayout-img'
                fluid={data.mainImg.childImageSharp.fluid}
            />
        </div>
        <div className='functionlayout-router'>
            <div className='functionlayout-head'>
                <h1>Function</h1>
                <p>description</p>
            </div>
            <div className='functionlayout-content'>
                <div>
                    <Link to='markdowneditor' className='item-markdowneditor'>
                        <h1>markdown editor</h1>
                    </Link>
                    <Link to='/function'>
                        <h1>not implemented yet</h1>
                    </Link>
                    <Link to='/function'>
                        <h1>not implemented yet</h1>
                    </Link>
                    <Link to='/function'>
                        <h1>not implemented yet</h1>
                    </Link>
                </div>
            </div>
        </div>
        <Footer/>
    </div>;
}
