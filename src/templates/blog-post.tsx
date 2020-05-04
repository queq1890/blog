import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

interface Props {
  data: GatsbyTypes.BlogPostBySlugQuery;
  location: Location;
  pageContext: GatsbyTypes.SitePageContext;
}

const BlogPostTemplate: React.FC<Props> = ({ data, location, pageContext }) => {
  const post = data.markdownRemark;
  const siteTitle = data?.site?.siteMetadata?.title;
  const { previous, next } = pageContext;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post?.frontmatter?.title}
        description={post?.excerpt}
        image={post?.frontmatter?.image}
      />
      <h1>{post?.frontmatter?.title}</h1>
      <p
        style={{
          ...scale(-1 / 5),
          display: 'block',
          marginBottom: rhythm(1),
          marginTop: rhythm(-1),
        }}
      >
        {post?.frontmatter?.date}
      </p>
      <div dangerouslySetInnerHTML={{ __html: post?.html as string }} />

      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous?.fields?.slug && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous?.frontmatter?.title}
            </Link>
          )}
        </li>
        <li>
          {next?.fields?.slug && (
            <Link to={next.fields.slug} rel="next">
              {next?.frontmatter?.title} →
            </Link>
          )}
        </li>
      </ul>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        image
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
