import { BrowserRouter, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Navigation from './components/navigation';
import Menu from './pages/menu';

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
