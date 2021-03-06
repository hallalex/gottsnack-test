import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Zoom from 'react-reveal/Zoom' // Fade and cascade effect

class StaffRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
          <Zoom cascade> 
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`staff-card blog-list-item tile is-child box notification`}
              >
                <header>
                  {post.frontmatter.featuredimage ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.title}
                    </Link>
                    {/*} Saved for future use ... 
                    <span className="subtitle is-size-5 is-block">
                     {post.frontmatter.date}
                    </span>
                      */}
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" 
                  to={post.fields.slug}
                  style={{ display: 'none' }} //remove to show. Saved for future use. 
                  >
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          </Zoom>
          ))}
      </div>
    )
  }
}

StaffRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
        query StaffRollQuery {
            allMarkdownRemark(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { templateKey: { eq: "staff-post" } } }
            ) {
            edges {
                node {
                excerpt(pruneLength: 400)
                id
                fields {
                    slug
                }
                frontmatter {
                    title
                    templateKey
                    date(formatString: "MMMM DD, YYYY")
                    featuredpost
                    featuredimage {
                    childImageSharp {
                        fluid(maxWidth: 120, quality: 100) {
                        ...GatsbyImageSharpFluid
                        }
                      }
                    }
                  }
                }
              }
            }
        }
    `}
    render={(data, count) => <StaffRoll data={data} count={count} />}
  />
)
