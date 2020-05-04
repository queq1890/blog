import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { Link } from 'gatsby';
import NetlifyIdentity from './NetlifyIdentity';
import { rhythm, scale } from '../utils/typography';

const GlobalStyle = createGlobalStyle`
h1, h2, h3, h4 {
  font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
}

body {
  font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
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
  ${scale(1.5)};
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

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
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
  }
}

export default Layout;
