import { Container, Conteudo } from "../../Home/styles";
import { MenuLateral } from "../../MenuLateral";
import { Button, Title, SystemUser, DivNovoUser } from "./styles";
import { TabelaUsuarios } from "./TabelaUsuarios";
import { Link } from "react-router-dom";



export function SistemaUsuarios() {

  return (

    <Container>
      <MenuLateral />
      <Conteudo>
        <SystemUser>
          <Title>Tabela de Usuários</Title>

          <DivNovoUser>
          

          <Link to="/Gerenciador/SistemaUsuarios/InserirUsuario">

            <Button>+ Novo Usuario</Button>
          </Link>

          </DivNovoUser>

          <TabelaUsuarios />

        </SystemUser>
      </Conteudo>

    </Container>
  )
}