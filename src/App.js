import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import Motherboard from './db/Motherboard';
import EditMotherboard from './db/Motherboard/EditMotherboard';
import ViewMotherboard from './db/Motherboard/ViewMotherboard';
import Stock from './db/Stock';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/motherboard" element={<Motherboard />} />
        <Route
          exact
          path="/motherboard/edit/:id"
          element={<EditMotherboard />}
        />
        <Route
          exact
          path="/motherboard/view/:id"
          element={<ViewMotherboard />}
        />
        <Route exact path="/stock" element={<Stock />} />
      </Routes>
      <GlobalStyles />
    </Router>
  );
}

export default App;
