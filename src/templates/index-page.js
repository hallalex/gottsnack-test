import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from "gatsby-image"
import Layout from '../components/Layout'
import Zoom from 'react-reveal/Zoom' // Fade and cascade effect


// Saved these components for future use
// import Features from '../components/Features' 
// import BlogRoll from '../components/BlogRoll'


export const IndexPageTemplate = ({
         image,
         bannerImage,
         title,
         heading,
         subheading,
         mainpitch,
         description,
         intro
       }) => (
         <div style={{ overflowX: 'hidden' }}>
         <Zoom cascade>
           <div
             className="full-width-image margin-top-0"
             style={{
               backgroundImage: `url(${
                 !!image.childImageSharp
                   ? image.childImageSharp.fixed.src
                   : image
               })`,
             }}
           >
             <div
               className="fade-in"
               style={{
                 display: "flex",
                 height: "150px",
                 lineHeight: "1",
                 justifyContent: "space-around",
                 alignItems: "left",
                 flexDirection: "column"
               }}
             >
               <h1
                 className="has-text-weight-bold is-size-3-mobile is-size-2-tablet is-size-1-widescreen"
                 style={{
                   boxShadow:
                     "rgba(243,142,34, .7) 0.5rem 0px 0px, rgba(243,142,34, .7) -0.5rem 0px 0px",
                   backgroundColor: "rgba(243,142,34, .7)",
                   color: "white",
                   lineHeight: "1",
                   padding: "0.05rem",                   
                 }}
               >
                 {title}
               </h1>
               <h3
                 className="has-text-weight-bold is-size-5-mobile is-size-5-tablet is-size-4-widescreen"
                 style={{
                   boxShadow:
                     "rgba(243,142,34, .7) 0.5rem 0px 0px, rgba(243,142,34, .7) -0.5rem 0px 0px",
                   backgroundColor: "rgba(243,142,34, .7)",
                   color: "white",
                   lineHeight: "1",
                   padding: "0.25em"
                 }}
               >
                 {subheading}
               </h3>
               <div className="container">
                <div className="section section1">
                  <div className="column is-12 has-text-centered">
                  </div>
                </div>
              </div>
             </div> 
             </div>
           </Zoom>            
           <div className="container">
           <iframe src="https://mixlr.com/users/7034928/embed?color=f38e00&autoplay=true" width="100%" height="180px" scrolling="no" frameborder="no" marginheight="0" marginwidth="0"></iframe><small><a href="http://mixlr.com/gott-snack" style={{color:'#1a1a1a', textAlign:'left', fontFamily:'Helvetica, sans-serif', fontSize:'11px' }}></a></small>
           </div>          
           <section className="section section--gradient">
             <div className="container">
               <div className="section">
                 <div className="columns">
                   <div className="column is-10 is-offset-1">
                     <div className="content">
                       <div className="content">
                      
                         <div className="tile fade-in">
                           <h1 className="title">{mainpitch.title}</h1>
                         </div>
                           

                          <div className="tile">
                            <h3 className="subtitle">{mainpitch.description}</h3>
                          </div>
 
                       </div>
                       <div className="columns">
              
                         <div className="column is-12">
                           <h3 className="has-text-weight-semibold is-size-3">
                             {heading}
                           </h3>
                           <p>{description}</p>
                         </div>
                       </div>
                       <div className="container">
                       <div className="section section1">
                         <div className="column is-12 has-text-centered">
                           <a
                             className="btn live-btn"
                             href="https://www.patreon.com/gottsnack"
                             target="_blank"
                           >
                             Stötta oss på Patreon!
                           </a>
                         </div>                        
                       </div>
                     </div>
                     <div className="container">
                       <div className="section section1">
                         <div className="column is-12 has-text-centered">
                           <a
                             href="https://www.podstore.se/podstore/gott-snack/"
                             target="_blank"
                           >
                            <Img fluid={bannerImage.childImageSharp.fluid} />
                           </a>
                         </div>                        
                       </div>
                     </div>
                       {/*}                
                       <Features gridItems={intro.blurbs} />
                       <div className="column is-12">
                         <h3 className="has-text-weight-semibold is-size-2">
                           Latest stories
                         </h3>
                         <BlogRoll />
                         <div className="column is-12 has-text-centered">
                           <Link className="btn" to="/blog">
                             Read more
                           </Link>
                         </div>
                       </div>
                       */}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           </section>
          
         </div>
       );

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  bannerImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  mainpitch: PropTypes.object,
  description: PropTypes.string,
  intro: PropTypes.shape({
    blurbs: PropTypes.array,
  }),
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        bannerImage={frontmatter.bannerImage}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {           
            fixed(width: 1075, height: 800, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        bannerImage {
          childImageSharp {           
            fluid(fit: COVER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`
