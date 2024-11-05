import { Container, Conteudo} from './styles'
import { MenuLateral } from "../MenuLateral";


export function Home() {

  return (
    <Container>
      <MenuLateral />
      <Conteudo>

          <h1>Bem vindo</h1>

      </Conteudo>
    </Container>
  );
}
