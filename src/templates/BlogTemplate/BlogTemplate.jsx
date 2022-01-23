import React from 'react';
import {graphql} from 'gatsby';
import './blogTemplate.css'
import MarkdownStaticRender from '../../components/MarkdownStaticRender/MarkdownStaticRender';
import Navbar from '../../components/Navbar/Navbar'
import Img from 'gatsby-image'
export default function BlogTemplate({data}) {
  if(data.markdownRemark.frontmatter.bg===undefined||data.markdownRemark.frontmatter.bg===null){
    data.markdownRemark.frontmatter.bg=data.defaultImg
  }
    function changeState($el,state){
      if($el===null){
        console.log(state)
      }
      let classes = $el.className.split(' ')
      if(classes.includes(state)){
          classes.splice(classes.indexOf(state),1)
      }else{
          classes.push(state)
      }
      $el.className=classes.join(" ")
  }
  console.log(data.markdownRemark.frontmatter.title)
    return (
      <div className='blogtemplate-container'>
          <Navbar/>
          <div className='blogtemplate-banner'>
            <Img
              className='blogtemplate-img'
              fluid={data.markdownRemark.frontmatter.bg.childImageSharp.fluid}
            />
          </div>
          <div className='blogtemplate-body'>
            <div className='blogtemplate-content'>
              <div className='blogtemplate-head'>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                <p>{data.markdownRemark.frontmatter.description}</p>
                <span>{data.markdownRemark.frontmatter.date}</span>
              </div>
              <div className='blogtemplate-md'>
                <MarkdownStaticRender source={data.markdownRemark.rawMarkdownBody} hasToc={true}/>
              </div>
            </div>
          </div>
          <div className='blogtemplate-button'
              onClick={()=>{
                changeState(
                  document.querySelector('.table-of-contents'),
                  'table-of-contents-state0')
                changeState(
                  document.querySelector('.blogtemplate-button-img'),
                  'blogtemplate-button-img-state0')
                changeState(
                  document.querySelector('.blogtemplate-button'),
                  'blogtemplate-button-state0')
                changeState(
                  document.querySelector('.blogtemplate-content'),
                  'blogtemplate-content-state0')
                changeState(
                  document.querySelector('.blogtemplate-body'),
                  'blogtemplate-body-state0')
              }}
              >
                <div className='blogtemplate-button-img'></div>
          </div>
      </div>
    );
}

export const data = graphql`
query blogTemplate($fileAbsolutePath: String) {
    markdownRemark(fileAbsolutePath: {eq: $fileAbsolutePath}) {
      rawMarkdownBody
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
    defaultImg:file(relativePath: {eq: "6.jpg"}) {
      childImageSharp {
        fluid{
            ...GatsbyImageSharpFluid
        }
      }
    }
  }
`