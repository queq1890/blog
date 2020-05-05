import React from 'react';
import styled, { createGlobalStyle, CSSObject } from 'styled-components';
import { Link } from 'gatsby';
import NetlifyIdentity from './NetlifyIdentity';
import { rhythm, scale } from '../utils/typography';

interface Props {
  location: Location;
  title?: string;
}

const GlobalStyle = createGlobalStyle`
  :root {
    @media (prefers-color-scheme: light) {
      --bg-color: #fff;
      --color: #333
    }

    @media(prefers-color-scheme: dark){
      --bg-color: #333;
      --color: #fff;
    }
  }

  h1, h2, h3, h4 {
    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
  }

  body {
    font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
    background-color: var(--bg-color);
    color: var(--color);
  }

  ul li {
    list-style-position: inside;
  }

  p code.language-text {
    padding-left: .5em;
    padding-right: .5em;
  }
`;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${rhythm(28)};
  padding: ${rhythm(1.5)} ${rhythm(3 / 4)};
`;

const RootHeader = styled.h1`
  ${scale(1.5) as CSSObject};
  margin-bottom: rhythm(1.5);
  margin-top: 0;
`;

const PostHeader = styled.h3`
  margin-top: 0;
`;

const StyledLink = styled(Link)`
  box-shadow: none;
  text-decoration: none;
  color: inherit;
`;

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  let header;

  if (location.pathname === rootPath) {
    header = (
      <RootHeader>
        <StyledLink to="/">{title}</StyledLink>
      </RootHeader>
    );
  } else {
    header = (
      <PostHeader>
        <StyledLink to="/">{title}</StyledLink>
      </PostHeader>
    );
  }

  return (
    <>
      <GlobalStyle />
      <NetlifyIdentity />
      <Container>
        <header>{header}</header>
        <main>{children}</main>
        <footer />
      </Container>
    </>
  );
};

export default Layout;
