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
              <p>Clientes</p>
            </IconeSistema>
            <IconeSistema>
              <p>Fornecedores</p>
            </IconeSistema>
            <IconeSistema>
              <p>Produtos</p>
            </IconeSistema>
            <IconeSistema>
              <p>Vendas</p>
            </IconeSistema>
        
      </Conteudo>

    </Container>
  );
}
