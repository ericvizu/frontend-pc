import styled, { createGlobalStyle } from 'styled-components';
import {
  primaryColor,
  primaryDarkColor,
  editButtonColor,
  deleteButtonColor,
} from '../config/colors';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background: ${primaryDarkColor};
    color: ${primaryDarkColor};
  }

  button {
    cursor: pointer;
    background: ${primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    margin-left: 10px;
    vertical-align: 80%;
  }

`;

export const Container = styled.section`
  max-width: 80%;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Table = styled.table`
  text-align: center;
  vertical-align: center;
  width: 100%;
`;

const GenericButton = styled.button`
  cursor: pointer;
  background: ${primaryColor};
  border: none;
  color: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 700;
  margin-left: 10px;
  vertical-align: 80%;
`;

export const Buttons = {
  Reload: styled(GenericButton)``,
  View: styled(GenericButton)`
    background: white;
    border: 2px solid ${editButtonColor};
    color: ${editButtonColor};
  `,
  Delete: styled(GenericButton)`
    background: ${deleteButtonColor};
    border: 2px solid ${deleteButtonColor};
    color: white;
  `,
};
