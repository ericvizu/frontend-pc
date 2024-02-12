import { Title, Paragrafo } from './styled';
import { Container } from '../../styles/GlobalStyles';

export default function Home() {
  return (
    <Container>
      <Title>Home</Title>
      <Paragrafo> Welcome to the homepage of my application. </Paragrafo>
    </Container>
  );
}
