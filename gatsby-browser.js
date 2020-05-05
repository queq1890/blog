const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

const applyTheme = () =>
  isDarkMode
    ? import('prismjs/themes/prism-tomorrow.css')
    : import('prismjs/themes/prism.css');

applyTheme();
