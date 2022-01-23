import React from 'react';
import {graphql} from 'gatsby'
import './pptTemplate.css';

import MarkdownStaticRender from '../../components/MarkdownStaticRender/MarkdownStaticRender'



export default function PPTTemplate({data}) {
  return (<div className='ppttemplate-container'>
      <MarkdownStaticRender source={data.markdownRemark.rawMarkdownBody} isPPT={true}/>
  </div>);
}
export const data = graphql`
query PPTTemplate($fileAbsolutePath: String) {
    markdownRemark(fileAbsolutePath: {eq: $fileAbsolutePath}) {
      rawMarkdownBody
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        description
        title
      }
    }
  }
`