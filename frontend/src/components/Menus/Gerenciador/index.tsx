// import { Button } from '../Button'
import { Container, IconeSistema, StyledLink } from './styles'
import { MenuLateral } from "../../MenuLateral";
import { Conteudo } from '../../Home/styles';


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

        <StyledLink to="/Gerenciador/SistemaProdutos">
          <IconeSistema>
            <p>Produtos</p>
          </IconeSistema>
        </StyledLink>

        <IconeSistema>
          <p>Vendas</p>
        </IconeSistema>

      </Conteudo>

    </Container>
  );
}
