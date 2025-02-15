import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Home() {
  return (
    <Container>
      <Title>Bem-vindo</Title>
      <Paragrafo>
        {' '}
        Página inicial do meu projeto fullstack relativo a um Banco de Dados
        sobre peças de Computador.
      </Paragrafo>
      <p className="githubLink">
        github:{' '}
        <a target="_blank" href="https://github.com/ericvizu" rel="noreferrer">
          ericvizu
        </a>
        <br />
        front-end:{' '}
        <a
          target="_blank"
          href="https://github.com/ericvizu/frontend-pc"
          rel="noreferrer"
        >
          front-end
        </a>
        ; back-end:{' '}
        <a
          target="_blank"
          href="https://github.com/ericvizu/backend-pc"
          rel="noreferrer"
        >
          back-end
        </a>
      </p>
    </Container>
  );
}
