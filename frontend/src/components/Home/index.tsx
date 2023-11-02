// import { Button } from '../Button'
import { Container, Conteudo, IconeSistema } from './styles'
import { MenuLateral } from "../MenuLateral";
import { useContext } from 'react';
import { GlobalContext } from '../../context/context';
import { Link } from 'react-router-dom';




export function Home() {

  const {
    sistemaUsado,
    setSistemaUsado,
    menuUsado,
    setMenuUsado
  } = useContext(GlobalContext);



  return (
    <Container>
      <MenuLateral />
      <Conteudo>
        {menuUsado === '' &&
          <h1>Bem vindo</h1>
        }

        {menuUsado.toLowerCase() === 'gerenciador' &&
          <>
            <Link to="/SistemaUsuarios">
              <IconeSistema>
                <p>Usuarios</p>
              </IconeSistema>
            </Link>
            <IconeSistema>
              <p>Usuarios</p>
            </IconeSistema>
            <IconeSistema>
              <p>Usuarios</p>
            </IconeSistema>
            <IconeSistema>
              <p>Usuarios</p>
            </IconeSistema>
          </>
        }
      </Conteudo>

    </Container>
  );
}
