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
  p.githubLink {
  text-align: center;
  padding-top: 50px;
  }
`;

export const Container = styled.section`
  max-width: 80%;
  background: #fff;
  margin: 30px auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  div + div {
    // Two adjacents div
    margin-top: 10px;
  }
  div ~ h5 {
    margin-top: 10px;
  }
  // Remove the arrows from input tag (Chrome, Safari, Edge, Opera)
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
  // Remove the arrows from input tag (Firefox)
  input[type='number'] {
    appearance: textfield;
  }
  td.uppercase {
    text-transform: uppercase;
  }
`;

const GenericTable = styled.table.attrs({
  className: 'table table-hover',
})`
  text-align: center;
  vertical-align: center;
  width: 100%;
`;

export const Tables = {
  Inventory: styled(GenericTable)``,
  View: styled(GenericTable)`
    width: 100%;
    font-size: 30px;
    text-align: left;
  `,
  SelectFilter: styled.select.attrs({
    className: 'form-select form-select-sm',
    defaultValue: '------------',
    name: 'filterSelect',
  })``,
};

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
    padding: 5px 25px;
    background: black;
    height: 70%;
  `,
  Edit: styled(GenericButton).attrs({
    className: 'btn-primary',
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

    &:hover {
      color: white;
    }
  `,
  Cancel: styled(GenericButton).attrs({
    className: 'btn-danger',
  })`
    background: white;
    border: 2px solid red;
    color: red;
    padding: 5px 25px;
  `,
  ResetFilter: styled(GenericButton).attrs({
    className: 'btn-success',
  })`
    padding: 5px 25px;
  `,
};

export const Edit = {
  Card: styled.div.attrs({ className: 'card card-body' })``,
  Label: styled.label.attrs({
    className: 'form-label',
  })`
    // background-color: ${(props) => props.topValue || 'blue'}; // for copying
  `,
  Div: styled.div.attrs({
    className: 'input-group',
  })``,
  Span: styled.span.attrs({ className: 'input-group-text' })``,
  Input: styled.input.attrs((props) => ({
    className: 'form-control',
    autoComplete: 'on',
    required: true,
    name: props.id,
  }))``,
  InputNumber: styled.input.attrs((props) => ({
    type: props.size,
    className: 'form-control',
    required: true,
  }))``,
};
