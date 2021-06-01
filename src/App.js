import { BrowserRouter, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Navigation from './navigation';
import Menu from './menu';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navigation />
      <Route path="/" exact component={Menu} />
    </BrowserRouter>
  );
}

export default App;
