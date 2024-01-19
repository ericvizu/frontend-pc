import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Home() {
  return (
    <Container>
      <Title>Home</Title>
      <Paragrafo> Seja bem-vindo à tela inicial da minha aplicação </Paragrafo>
    </Container>
  );
}
