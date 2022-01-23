import React, { useEffect, useState } from 'react'
import { Link,graphql, useStaticQuery } from 'gatsby'
import './homelayout.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Img from 'gatsby-image'

export default function HomeLayout({children}) {
    const data=useStaticQuery( graphql`
    query homeLayout {
        mainImg: file(relativePath: {eq: "1.jpg"}) {
          id
          childImageSharp {
            fluid{
            ...GatsbyImageSharpFluid
            }
          }
        }
        blogImg:file(relativePath:{eq:"2.png"}){
         id 
          childImageSharp{
            fluid{
            ...GatsbyImageSharpFluid
            }
          }
        }
        projectImg:file(relativePath:{eq:"5.jpg"}){
            id 
            childImageSharp{
              fluid{
               ...GatsbyImageSharpFluid
              }
            }
        }
        functionImg:file(relativePath:{eq:"4.jpg"}){
            id 
            childImageSharp{
              fluid{
              ...GatsbyImageSharpFluid
              }
            }
        }
        galleryImg:file(relativePath:{eq:"3.jpg"}){
            id 
            childImageSharp{
              fluid{
               ...GatsbyImageSharpFluid
              }
            }
        }
      }
      
    `)
    // console.log('homelayout-data')
    // console.log(data)
    // let [init,setInit]=useState(false)
    // useEffect(()=>{
    //     if(!init){
    //         document.querySelector('.home-router-img').children[0].innerHTML = `
           
    //         `
    //         setInit(true)
    //     }
    // },[init])
    return (
        <div className='home-container'>
            <Navbar/>
            <div className='home-banner'>
                <Img 
                    className='home-head-img'
                    fluid={data.mainImg.childImageSharp.fluid}
                />
            </div>
            <div className='home-pad'>
                <div className='home-head-text'>
                    <h1>
                        Walkerchi
                    </h1>
                    <h2>
                        --welcome
                    </h2>
                </div>
            </div>
            <div className='home-router'>
                <Link to='/blog'>
                    <Img
                        className='home-router-img' 
                        fluid={data.blogImg.childImageSharp.fluid}
                    />
                    <div class='home-router-img-mask home-router-to-blog'>
                        <div class='home-router-text'>
                            <h1>Blog</h1>
                            <p>This is the blog</p>
                        </div>
                    </div>
                    
                </Link>
    
                <Link to='/'>
                    <Img
                        className='home-router-img'
                        fluid={data.projectImg.childImageSharp.fluid}
                    />
                    <div class='home-router-img-mask home-router-to-project'>
                        <div className='home-router-text'>
                            <h1>Project</h1>
                            <p>This is the project</p>
                        </div>
                    </div>
                </Link>
                <Link to='/function'>
                    <Img
                        className='home-router-img'
                        fluid={data.functionImg.childImageSharp.fluid}
                    />
                    <div class='home-router-img-mask home-router-to-function'>
                        <div className='home-router-text'>
                            <h1>Function</h1>
                            <p>This is the function</p>
                        </div>
                    </div>
                </Link>
                <Link to='/'>
                    <Img
                        className='home-router-img'
                        fluid={data.galleryImg.childImageSharp.fluid}
                    />
                    <div class='home-router-img-mask home-router-to-gallery'>
                            <div className='home-router-text'>
                                <h1>Gallery</h1>
                                <p>This is the gallery</p>
                            </div>    
                    </div>
                </Link> 
            </div>
            {children}
            <Footer/>
        </div>
    )
}

