import styled from 'styled-components';
import { primaryColor } from '../../config/colors';

export const Nav = styled.nav`
  background: ${primaryColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center; // Para centralizar, se ficar feio só tirar esse e o de baixo

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }
`;
