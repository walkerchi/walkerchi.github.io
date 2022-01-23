/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve:`gatsby-transformer-remark`,
      options:{
        plugin:[
          // 'gatsby-remark-mathjax',
          // 'gatsby-remark-mermaid',
          // 'gatsby-remark-prismjs'
        ]
      }
    },
    {
      resolve:`gatsby-source-filesystem`,
      options:{
        name:`blog`,
        path:`${__dirname}/static/blog`
      }
    },
    {
      resolve:`gatsby-source-filesystem`,
      options:{
        name:`images`,
        path:`${__dirname}/src/images`
      }
    },
    {
      resolve:`gatsby-source-filesystem`,
      options:{
        name:`musics`,
        path:`${__dirname}/src/musics`
      }
    },{
      resolve:`gatsby-plugin-manifest`,
      options:{
        name:`walkerchi-icon`,
        short_name:`walker`,
        start_url:`/`,
        background_color:`#333`,
        theme_color:`#a569bd`,
        display:`minimal-ui`,
        icon:`src/images/icons/taichi.white.svg`
      }
    }
  ],
}
