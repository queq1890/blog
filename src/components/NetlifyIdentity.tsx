import React from 'react';
import { Helmet } from 'react-helmet';

const NetlifyIdentity = () => (
  <Helmet>
    <script>{`if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }`}</script>
  </Helmet>
);

export default NetlifyIdentity;
