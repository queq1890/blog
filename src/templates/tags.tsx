import React from 'react';
import { Link, graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

type Props = {
  location: Location;
  data: GatsbyTypes.BlogPostByTagQuery;
  pageContext: GatsbyTypes.SitePageContext;
};

const Tags: React.FC<Props> = ({ pageContext, data, location }) => {
  const { tag } = pageContext;
  const description = `${tag} タグの投稿一覧`;
  const { edges } = data.allMarkdownRemark;
  const siteTitle = data?.site?.siteMetadata?.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={tag} description={description} />

      <h1>{description}</h1>
      <ul>
        {edges.map(({ node }) => {
          const slug = node.fields?.slug ?? '';
          const title = node.frontmatter?.title;

          return (
            <li key={node.fields?.slug}>
              <Link to={slug}>{title}</Link>
            </li>
          );
        })}
      </ul>

      <Link to="/tags">All tags</Link>
    </Layout>
  );
};

export default Tags;
export const pageQuery = graphql`
  query BlogPostByTag($tag: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
