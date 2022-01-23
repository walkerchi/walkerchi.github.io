const path = require('path')
exports.createPages = async ({graphql,actions})=>{
    const {data}= await graphql(`
    query gatsbyNodeQuery {
        allMarkdownRemark {
          nodes {
            fileAbsolutePath
            frontmatter{
                type
            }
          }
        }
      }
    `)
    function path2url(p){
        console.log('abs')
        console.log(p)
        p = p.split('/')
        p = p.slice(p.indexOf('blog'))
        console.log(p)
        if(p[p.length-1].toLowerCase()==='readme.md'){
            p.pop()
        }else{
            p[p.length-1]=p[p.length-1].split('.').slice(0,-1).join('.')
        }
        p = p.join('/')
        console.log('url')
        console.log(p)
        return p
    }
    data.allMarkdownRemark.nodes.forEach(node=>{
        let abspath = node.fileAbsolutePath.split('/')
        // assert the md file is in blog folder and filename not begin with "_"
        console.log(node.frontmatter)
        if(abspath.includes('blog') &&  !abspath[abspath.length-1].startsWith("_")){
            if(node.frontmatter.type===undefined||node.frontmatter.type===null){
                actions.createPage({
                    path:'/'+path2url(node.fileAbsolutePath),
                    component: path.resolve('./src/templates/BlogTemplate/BlogTemplate.jsx'),
                    context:{fileAbsolutePath:node.fileAbsolutePath}
                })
            }else if(node.frontmatter.type.toLowerCase()==="ppt"){
                actions.createPage({
                    path:'/'+path2url(node.fileAbsolutePath),
                    component: path.resolve('./src/templates/PPTTemplate/PPTTemplate.jsx'),
                    context:{fileAbsolutePath:node.fileAbsolutePath}
                })
            }else{
                console.log(`unrecongnize type ${node.frontmatter.type}`)
            }
        }
    })

}

// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    
//     actions.setWebpackConfig({
//       node: {
//         fs: 'empty'
//       }
//     })  
//     if(stage === 'build-html'){
//       actions.setWebpackConfig({
//         module: {
//           rules: [
//           {
//             test:  /markdown-it/,
//             use: loaders.null()
//           },{
//             test: /@ispicyfish\/markdown-it-mermaid/,
//             use: loaders.null()
//           },{
//               test:/markdown-it-revealjs/,
//               use: loaders.null()
//           }]
//         }
//       })
//     }
//   }