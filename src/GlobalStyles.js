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
`;

export default GlobalStyle;
