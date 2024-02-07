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

  h1 {
    font-size: 50px;
}


  body {
    font-family: sans-serif;
    background: ${primaryDarkColor};
    color: ${primaryDarkColor};
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

const GenericButton = styled.button.attrs({
  className: 'btn',
})`
  cursor: pointer;
  //background: ${primaryColor};
  border: none;
  color: #fff;
  padding: 5px 15px;
  border-radius: 4px;
  font-weight: 700;
  margin-left: 10px;
  vertical-align: 50%;
`;

export const Buttons = {
  Reload: styled(GenericButton).attrs({
    className: 'btn-dark',
  })`
    border: 2px solid black;
  `,
  Edit: styled(GenericButton).attrs({
    className: '',
  })`
    background: white;
    border: 2px solid ${editButtonColor};
    color: ${editButtonColor};
  `,
  Delete: styled(GenericButton).attrs({
    className: 'btn-danger',
  })`
    background: ${deleteButtonColor};
    border: 2px solid ${deleteButtonColor};
    color: white;
  `,
  View: styled(GenericButton).attrs({
    className: 'btn-info',
  })`
    border: 2px solid #0dcaf0;
  `,
};
