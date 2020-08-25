import React from "react";
import { Link, graphql } from "gatsby";

import Bio from "../components/bio";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { rhythm } from "../utils/typography";

interface Props {
  data: GatsbyTypes.BlogIndexQuery;
  location: Location;
}

const onClick = async () => {
  const data = await fetch("https://vimeo.com/api/v2/video/52187103.json")
    .then((res) => res.json())
    .then((data) => data);

  console.log(data);
};

const BlogIndex: React.FC<Props> = ({ data, location }) => {
  const siteTitle = data?.site?.siteMetadata?.title;
  const posts = data.allMarkdownRemark.edges;

  return (
    <Layout location={location} title={siteTitle}>
      <button onClick={onClick}>aaaa</button>
      <img src="https://img.youtube.com/vi/pcNrFB9HAA4/0.jpg" alt="aaa" />
      <SEO
        title="All posts"
        keywords={["blog", "gatsby", "javascript", "react"]}
        image="/images/profile-pic.jpg"
      />
      <Bio />
      {posts.map(({ node }) => {
        const title = node?.frontmatter?.title;

        return (
          node?.fields?.slug && (
            <div key={node?.fields?.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: "none" }} to={node?.fields?.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node?.frontmatter?.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node?.excerpt as string,
                }}
              />
            </div>
          )
        );
      })}
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`;
