// import { Button } from '../Button'
import { Container, Conteudo} from './styles'
import { MenuLateral } from "../MenuLateral";
// import { useContext } from 'react';
// import { GlobalContext } from '../../context/context';
// import { Link } from 'react-router-dom';




export function Home() {

  // const {
  //   sistemaUsado,
  //   setSistemaUsado,
  //   menuUsado,
  //   setMenuUsado
  // } = useContext(GlobalContext);



  return (
    <Container>
      <MenuLateral />
      <Conteudo>

          <h1>Bem vindo</h1>

      </Conteudo>
    </Container>
  );
}
