import { BrowserRouter, Route } from 'react-router-dom';
import GlobalStyle from './globalStyles';
import Navigation from './components/navigation';
import Menu from './pages/menu';
import Settings from './pages/settings';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Navigation />
      <Route path="/" exact component={Menu} />
      <Route path="/settings" exact component={Settings} />
    </BrowserRouter>
  );
}

export default App;
