import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://cdn.jsdelivr.net/npm/pretendard/dist/web/static/pretendard.css');

  * {
    font-family: 'Pretendard', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Pretendard', Arial, sans-serif;
    line-height: 1.6;
    background-color: #f9f9f9;
    color: #333;
  }

  @font-face {
    font-family: 'SUIT';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'SUIT', Arial, sans-serif;
    line-height: 1.6;
    background-color: #f9f9f9;
    color: #333;
  }
`;

export default GlobalStyle;
