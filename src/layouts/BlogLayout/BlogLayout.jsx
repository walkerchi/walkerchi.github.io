import React,{useState,useEffect} from 'react'
import {graphql,useStaticQuery,Link} from 'gatsby'
import './bloglayout.css'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Img from  'gatsby-image'

export default function BlogLayout(){
        const data=useStaticQuery(graphql`
        query BlogLayoutQuery {
            allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
                nodes {
                    id
                    fileAbsolutePath
                    frontmatter {
                        date(formatString: "YYYY-MM-DD")
                        description
                        title
                        bg{
                            childImageSharp {
                                fluid {
                                    ...GatsbyImageSharpFluid
                                }
                              }
                        }
                    }
                }
            }
            defaultImg:file(relativePath: {eq: "6.jpg"}) {
                childImageSharp {
                  fluid{
                      ...GatsbyImageSharpFluid
                  }
                }
            }
            mainImg:file(relativePath:{eq:"2.png"}){
                childImageSharp{
                    fluid{
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
        `)    

        function path2url(p){
            p = p.split('/')
            p = p.slice(p.indexOf('blog')+1)
            if(p[p.length-1].toLowerCase()==='readme.md'){
                p.pop()
            }else{
                p[p.length-1]=p[p.length-1].split('.').slice(0,-1).join('.')
            }
            p = p.join('/')
            return p
        }
        let nodes =   data.allMarkdownRemark.nodes.filter(node=>{
                let path = node.fileAbsolutePath.split('/')
                let ret = path.includes('blog') && !path[path.length-1].startsWith("_")
                return ret
                })
        nodes = nodes.map(node=>{
                node.uuid=node.fileAbsolutePath.replaceAll('.','-').replaceAll('/','-').replaceAll(':','');
                node.url=path2url(node.fileAbsolutePath)
                if(node.frontmatter.bg===null){
                    node.frontmatter.bg = data.defaultImg
                }
                if(node.frontmatter.title===null||node.frontmatter.title===""){
                    node.frontmatter.title = "no title"
                }
                if(node.frontmatter.description===null){
                    node.frontmatter.description = "no description"
                }
                if(node.frontmatter.date ===null){
                    node.frontmatter.date = "no date"
                }
                return node
            })
        

        function changeState(item,state){
            let classes = item.className.split(' ')
            if(classes.includes(state)){
                classes.splice(classes.indexOf(state),1)
            }else{
                classes.push(state)
            }
            item.className=classes.join(' ')
        }

        function bloglayoutClickHandler(e){
            if(e.target.id==='sidebar-button-img'){
                let $el =  document.querySelector('.bloglayout-router')
                changeState($el,'bloglayout-router-hidden')
            }
        }

        return (
            <div className='bloglayout-container' onClick={bloglayoutClickHandler}>
                <Navbar/>
                <div className='bloglayout-banner'>
                    <Img
                    className='bloglayout-banner-img'
                    fluid={data.mainImg.childImageSharp.fluid}
                    />
                </div>
                <Sidebar md_nodes={nodes}/>
                
                <div className='bloglayout-router'>
                    <div className='bloglayout-router-text'>
                        <h1>Blog</h1>
                        <p>this is description</p>
                    </div>
                    <div className='bloglayout-router-to'>
                    {
                        nodes.map(node=>{
                            return <Link 
                                className='bloglayout-item'
                                id={node.uuid+"-item"} 
                                to={node.url}
                                key={node.id}
                                title={node.frontmatter.title}
                                >
                                <Img
                                className='bloglayout-img' 
                                fluid={node.frontmatter.bg.childImageSharp.fluid}
                                />
                                <div className='bloglayout-content'>
                                    <h1>{node.frontmatter.title}</h1>
                                    <p className='item-description'>{node.frontmatter.description}</p>
                                    <p className='item-path'>{node.url}</p>
                                    <p className='item-date'>{node.frontmatter.date}</p>
                                </div>
                            </Link>
                        })
                    }
                    </div>
                </div>
            </div>
        )
}


