// import { Button } from '../Button'
import { Container, Conteudo, IconeSistema, StyledLink } from './styles'
import { MenuLateral } from "../../MenuLateral";


export function Gerenciador() {

  return (
    <Container>
      <MenuLateral />
      <Conteudo>

            <StyledLink to="/Gerenciador/SistemaUsuarios">
              <IconeSistema>
                <p>Usuarios</p>
              </IconeSistema>
            </StyledLink>
            <IconeSistema>
              <p>Usuarios</p>
            </IconeSistema>
            <IconeSistema>
              <p>Usuarios</p>
            </IconeSistema>
            <IconeSistema>
              <p>Usuarios</p>
            </IconeSistema>
        
      </Conteudo>

    </Container>
  );
}
