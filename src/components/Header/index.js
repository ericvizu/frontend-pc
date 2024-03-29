import { FaHome, FaLaptop, FaStore, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={40} />
      </Link>
      <Link to="/motherboard">
        <FaLaptop size={40} />
      </Link>
      <Link to="/cpu">
        <FaLaptop size={40} />
      </Link>
      <Link to="/ram">
        <FaLaptop size={40} />
      </Link>
      <Link to="/gpu">
        <FaLaptop size={40} />
      </Link>
      <Link to="/stock">
        <FaStore size={40} />
      </Link>
      <Link to="/login">
        <FaUser size={36} />
      </Link>
    </Nav>
  );
}
