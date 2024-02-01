import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import Motherboard from './db/Motherboard';
import Stock from './db/Stock';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/motherboard" element={<Motherboard />} />
        <Route exact path="/stock" element={<Stock />} />
      </Routes>
      <GlobalStyles />
    </Router>
  );
}

export default App;
