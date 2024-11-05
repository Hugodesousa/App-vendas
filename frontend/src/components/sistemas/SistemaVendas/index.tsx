// import { Button } from '../Button'
import { Container, IconeSistema, StyledLink } from './styles'
import { MenuLateral } from "../../MenuLateral";
import { Conteudo } from '../../Home/styles';


export function SistemaVendas() {

  return (
    <Container>
      <MenuLateral />
      <Conteudo>

        <StyledLink to="/Gerenciador/SistemaUsuarios">
          <IconeSistema>
            <p>Minhas vendas</p>
          </IconeSistema>
        </StyledLink>

        <IconeSistema>
          <p>Todas as vendas</p>
        </IconeSistema>

        <StyledLink to="/Gerenciador/SistemaVendas/CriarVenda">
          <IconeSistema>
            <p>Criar venda</p>
          </IconeSistema>
        </StyledLink>

      </Conteudo>

    </Container>
  );
}
