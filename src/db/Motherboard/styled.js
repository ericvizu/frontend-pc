import styled from 'styled-components';

export const Edit = {
  Div: styled.div.attrs({
    className: 'input-group',
  })``,
  Span: styled.span.attrs({ className: 'input-group-text' })`
    height: 70%;
  `,
  Input: styled.input.attrs((props) => ({
    className: 'form-control',
    autoComplete: 'on',
    required: true,
    name: props.id,
  }))`
    height: 70%;
  `,
};
