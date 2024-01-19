import { FaHome, FaSignInAlt, FaLaptop } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Nav } from './styled';

export default function Header() {
  return (
    <Nav>
      <Link to="/">
        <FaHome size={30} />
      </Link>
      <Link to="/motherboard">
        <FaLaptop size={30} />
      </Link>
      <Link to="/teste">
        <FaSignInAlt size={30} />
      </Link>
    </Nav>
  );
}
