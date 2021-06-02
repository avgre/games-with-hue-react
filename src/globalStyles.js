import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  *, *::after, *::before {
    box-sizing: border-box;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    background: #322290;
    color: white;
  }
`;

export default GlobalStyle;
