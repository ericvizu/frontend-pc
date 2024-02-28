import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalStyles from './styles/GlobalStyles';
import Header from './components/Header';
import Home from './pages/Home';
import Motherboard from './db/Motherboard';
import EditMotherboard from './db/Motherboard/EditMotherboard';
import ViewMotherboard from './db/Motherboard/ViewMotherboard';
import Cpu from './db/Cpu';
import EditCpu from './db/Cpu/EditCpu';
import ViewCpu from './db/Cpu/ViewCpu';
import Ram from './db/Ram';
import EditRam from './db/Ram/EditRam';
import ViewRam from './db/Ram/ViewRam';
import Stock from './db/Stock';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/motherboard" element={<Motherboard />} />
        <Route path="/motherboard/edit/:id" element={<EditMotherboard />} />
        <Route path="/motherboard/view/:id" element={<ViewMotherboard />} />
        <Route path="/cpu" element={<Cpu />} />
        <Route path="/cpu/edit/:id" element={<EditCpu />} />
        <Route path="/cpu/view/:id" element={<ViewCpu />} />
        <Route path="/ram" element={<Ram />} />
        <Route path="/ram/edit/:id" element={<EditRam />} />
        <Route path="/ram/view/:id" element={<ViewRam />} />
        <Route path="/stock" element={<Stock />} />
      </Routes>
      <GlobalStyles />
    </Router>
  );
}

export default App;
